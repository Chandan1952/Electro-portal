require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// ✅ CORS Setup
app.use(
  cors({
    origin: "https://electro-portal-client.onrender.com",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Session Middleware (MongoDB Store)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true, // ✅ Force session to be saved on every request
    saveUninitialized: true, // ✅ Save session even if it’s empty
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: { 
      secure: process.env.NODE_ENV === "production" ? true : false, // ✅ Allow local development
      httpOnly: true,
      sameSite: "Lax",
    }
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));





//********************REGISTRATION-AND-FORGET-PASSWORD-PAGE************************


// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// ✅ Register API
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    req.session.userId = newUser._id;

    // ✅ Return userId so frontend can save to localStorage
    res.status(201).json({
      message: "User registered successfully.",
      userId: newUser._id,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});






// Route to handle "Forgot-Password" form submissions
app.post('/forgot-password', async function (req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: 'No account found with this email.' });
    }

    // Instead of sending an email, redirect user to password reset form
    return res.json({ success: true, redirectUrl: `/reset-password?email=${email}` });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error processing password reset request.' });
  }
});


// Route to handle "Reset-Password" form submissions
app.post('/reset-password', async function (req, res) {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: 'No account found with this email.' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashedPassword;
    await existingUser.save();

    return res.json({ success: true, message: 'Password updated successfully. You can now log in.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating password.' });
  }
});


//***********************************************************************





//**************************USER-DASHBOARD-PAGE************************


// ✅ Login API
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username }, { email: username }] // allow login by username or email
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ Save user to session
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    res.status(200).json({
      message: "Login successful.",
      user: req.session.user, // 👈 return it here
    });
    
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// 🔹 GET USER DETAILS (Authenticated)
app.get('/api/user', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({
      username: req.session.user.username,
      email: req.session.user.email,
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});




// 🟢 Check if User is Logged In
app.get("/api/auth/check", (req, res) => {
  res.json({ isAuthenticated: !!req.session.userId });
});

// 🔹 PUT USER UPDATED DETAILS (Authenticated)
app.put("/update-users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Route for handling "User-Change-Password" form submissions
app.put("/api/change-password", async (req, res) => {
  const { oldPassword, newPassword } = req.body; // Ensure field names match frontend
  const userId = req.session.userId; // Get logged-in user ID

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: "Password changed successfully!" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // default cookie name for express-session
    res.status(200).json({ message: 'Logged out successfully' });
  });
});





// **Hardcoded Admin Credentials** (For Development Only)
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin";


// **Admin-Login Route**
app.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    req.session.adminEmail = email; // Store admin session
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});


// **Admin-Details-Authentication**
app.get("/api/admin", (req, res) => {
  // Simulating an authenticated admin (Replace with real authentication)
  const adminDetails = { name: "Admin", email: "admin@gmail.com" };
  res.json(adminDetails);
});


// **Admin-Session-Verification**
app.get("/admin-verify", (req, res) => {
  if (req.session.adminEmail === ADMIN_EMAIL) {
    return res.json({ isAdmin: true, email: ADMIN_EMAIL });
  }
  return res.status(401).json({ error: "Unauthorized" });
});


// **Admin-Dashboard-Statistics**
app.get("/admin-dashboard", async (req, res) => {
  if (req.session.adminEmail !== ADMIN_EMAIL) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  try {
    const regUsers = await User.countDocuments();
    const listedVehicles = await Vehicle.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const listedBrands = await Brand.countDocuments();
    const subscribers = await Subscription.countDocuments();
    const queries = await Query.countDocuments();
    const testimonials = await Testimonial.countDocuments();

    res.json({
      stats: {
        regUsers,
        listedVehicles,
        totalBookings,
        listedBrands,
        subscribers,
        queries,
        testimonials,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});


// **Admin Logout**
app.post("/admin-logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully" });
});











//************************IMAGE-MULTER-MIDDLEWARE*************************************************

// Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Serve static images
app.use("/uploads", express.static(uploadDir));


//**********************************************************************************

const bannerSchema = new mongoose.Schema({
  smallHeading: { type: String, required: true },
  mainHeading: { type: String, required: true },
  discount: { type: String, required: true },
  imageSrc: { type: String, required: true },
  buttonText: { type: String, required: true },
}, { timestamps: true });


const Banner = mongoose.model('Banner', bannerSchema);


// POST: create banner with image
app.post('/api/banners', upload.single('image'), async (req, res) => {
  try {
    const { smallHeading, mainHeading, discount, buttonText } = req.body;
    const imageSrc = req.file ? `/uploads/${req.file.filename}` : '';

    if (!smallHeading || !mainHeading || !discount || !buttonText || !imageSrc) {
      return res.status(400).json({ message: 'All fields including image are required' });
    }

    const newBanner = new Banner({
      smallHeading,
      mainHeading,
      discount,
      buttonText,
      imageSrc,
    });

    await newBanner.save();
    res.status(201).json({ message: 'Banner created', banner: newBanner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while saving banner' });
  }
});

// GET /api/banners - Get all banners (optional)
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch banners' });
  }
});

// PUT update banner
app.put('/api/banners/:id', (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  let banners = loadBanners();
  const index = banners.findIndex((b) => b._id === id);
  if (index === -1) return res.status(404).json({ message: 'Banner not found' });

  banners[index] = { ...banners[index], ...updated };
  saveBanners(banners);
  res.json(banners[index]);
});

// DELETE banner
app.delete('/api/banners/:id', (req, res) => {
  const { id } = req.params;
  let banners = loadBanners();
  const index = banners.findIndex((b) => b._id === id);
  if (index === -1) return res.status(404).json({ message: 'Banner not found' });

  banners.splice(index, 1);
  saveBanners(banners);
  res.json({ message: 'Banner deleted' });
});















const AdsSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    sub: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ads = mongoose.model('Ads', AdsSchema);




// GET all ads
app.get('/api/ads', async (req, res) => {
  try {
    const ads = await Ads.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new ad
app.post('/api/ads', upload.single('image'), async (req, res) => {
  try {
    const { heading, sub } = req.body;
    const imgPath = '/uploads/' + req.file.filename;

    const newAd = new Ads({
      heading,
      sub,
      img: imgPath
    });

    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(500).json({ message: 'Error creating ad' });
  }
});

// PUT update ad
app.put('api/ads/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, sub } = req.body;
    const ad = await Ads.findById(id);

    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    if (req.file) {
      // Delete old image
      if (ad.img && fs.existsSync('.' + ad.img)) {
        fs.unlinkSync('.' + ad.img);
      }
      ad.img = '/uploads/ads/' + req.file.filename;
    }

    ad.heading = heading;
    ad.sub = sub;
    await ad.save();

    res.json(ad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating ad' });
  }
});

// DELETE ad
app.delete('/api/ads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ads.findById(id);

    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    if (ad.img && fs.existsSync('.' + ad.img)) {
      fs.unlinkSync('.' + ad.img);
    }

    await Ads.findByIdAndDelete(id);
    res.json({ message: 'Ad deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting ad' });
  }
});











const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, enum: ['Featured', 'On Sale', 'Top Rated'], default: 'Featured' },
  productCategoryName: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);



// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    // Add public path for images
    const formatted = products.map(p => ({
      ...p.toObject(),
      image: `${req.protocol}://${req.get('host')}/${p.imageUrl}`
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// CREATE product
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { title, price, originalPrice, category, productCategoryName } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    const product = new Product({
      title,
      price,
      originalPrice,
      category,
      productCategoryName,
      imageUrl: `uploads/${req.file.filename}`
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Remove image file
    fs.unlink(product.imageUrl, err => {
      if (err) console.warn('Failed to delete image:', err);
    });

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// UPDATE product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, price, originalPrice, category } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.file) {
      // Delete old image
      fs.unlink(product.imageUrl, err => {
        if (err) console.warn('Failed to delete old image:', err);
      });
      product.imageUrl = req.file.path;
    }

    product.title = title;
    product.price = price;
    product.originalPrice = originalPrice;
    product.category = category;

    await product.save();
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Express backend
app.get('/api/products/:id', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      product = await ProductsCategory.findById(req.params.id);
    }

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});








const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: String,
  rating: Number,
  img: String,
  category: {
    type: String,
    enum: ['featured', 'topSelling', 'onSale'],
    required: true,
  },
}, { timestamps: true });

const ProductsCategory = mongoose.model('ProductsCategory', productsSchema);

app.get('/products', async (req, res) => {
  try {
    const featured = await ProductsCategory.find({ category: 'featured' });
    const topSelling = await ProductsCategory.find({ category: 'topSelling' });
    const onSale = await ProductsCategory.find({ category: 'onSale' });

    res.json({
      featured,
      topSelling,
      onSale,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/products', upload.single('img'), async (req, res) => {
  try {
    const { name, price, oldPrice, rating, category } = req.body;

    const newProduct = new ProductsCategory({
      name,
      price,
      oldPrice,
      rating,
      img: `uploads/${req.file.filename}`,
      category, // ✅ include category here
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

app.put('/products/:id', upload.single('img'), async (req, res) => {
  try {
    const { name, price, oldPrice, rating, category } = req.body;
    const img = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateFields = {
      name,
      price,
      oldPrice,
      rating,
      category, // ✅ include this
    };

    if (img) updateFields.img = img;

    const updatedProduct = await ProductsCategory.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.delete('/products/:id', async (req, res) => {
  try {
    await ProductsCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

// Cart Schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);


// Add to Cart API
app.post("/api/cart/add", async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.user || !req.session.user._id) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const userId = req.session.user._id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required." });
    }

    // Check if productId is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    // Proceed with cart logic
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity if product already in cart
    } else {
      cart.items.push({ productId, quantity }); // Add new item if it's not in cart
    }

    // Save the cart
    await cart.save();

    // Fetch the updated cart with populated product details
    const updatedCart = await Cart.findOne({ userId }).populate('items.productId');

    res.status(200).json({ message: "Item added to cart", cart: updatedCart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.get('/api/cart', async (req, res) => {
  try {
    // Check if the user is logged in via session
    if (!req.session.user || !req.session.user._id) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    // Fetch cart for the logged-in user and populate product details
    const cart = await Cart.findOne({ userId: req.session.user._id }).populate('items.productId');

    if (!cart) {
      return res.status(200).json({ items: [], total: 0 });
    }

    // Format cart items and calculate total price
    const items = cart.items.map((item) => {
      if (item.productId) {
        return {
          product: {
            _id: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            imageUrl: item.productId.imageUrl,
          },
          quantity: item.quantity,
        };
      } else {
        console.error('Product missing for item', item);
        return null; // If productId is missing, return null to filter later
      }
    }).filter(item => item !== null); // Filter out any null items

    // Calculate total price
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    res.status(200).json({ items, total });
  } catch (err) {
    console.error('Failed to get cart:', err);
    res.status(500).json({ message: 'Failed to get cart' });
  }
});


// Cart Update API
app.put("/api/cart/update", async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.user || !req.session.user._id) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const userId = req.session.user._id;
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Items are required to update the cart." });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Update cart items
    items.forEach((updatedItem) => {
      const existingItem = cart.items.find(
        (item) => item.productId === updatedItem.productId
      );

      if (existingItem) {
        existingItem.quantity = updatedItem.quantity; // Update the quantity
      } else {
        cart.items.push({
          productId: updatedItem.productId,
          quantity: updatedItem.quantity,
        }); // Add new item if not already in cart
      }
    });

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully.", cart });
  } catch (err) {
    console.error("Update cart error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});




// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
