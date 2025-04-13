import React from "react";

const LaptopDesktopDropdown = () => {
    return (
        <>
            <style>
                {`
          .dropdown-container {
  display: flex;
  flex-wrap: nowrap;         /* Important: keeps columns in one line */
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  gap: 50px;
  justify-content: flex-start; /* Ensures natural flow left to right */
  align-items: flex-start;
  min-width: 1000px;
  z-index: 100;
}


         .dropdown-column {
  flex: 1;
  flex-shrink: 0;
}


          .dropdown-heading {
          
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 16px;
            color: #111827;
          }

          .dropdown-item {
            color: #374151;
            margin-bottom: 6px;
            cursor: pointer;
            font-size: 12px;
            line-height: 1.5;
            transition: color 0.2s ease;
          }

          .dropdown-item:hover {
            color: #1f2937;
            text-decoration: underline;
          }

.dropdown-image {
  width: 350;
  border-radius: 10px;
  margin-bottom: 15px;
  max-width: 400px;
  display: block;
}


        `}
            </style>

            <div className="dropdown-container">
                {/* Column 1: Laptops */}
                <div className="dropdown-column">
                    <div className="dropdown-heading">Laptops</div>
                    <div className="dropdown-item">Thin and Light Laptops</div>
                    <div className="dropdown-item">2-in-1 Laptops</div>
                    <div className="dropdown-item">Gaming Laptops</div>
                    <div className="dropdown-item">Budget Laptops</div>
                    <div className="dropdown-item">Business Laptops</div>

                    <div className="dropdown-heading" style={{ marginTop: 24 }}>Shop By Brand</div>
                    <div className="dropdown-item">Apple</div>
                    <div className="dropdown-item">HP</div>
                    <div className="dropdown-item">Dell</div>
                    <div className="dropdown-item">Lenovo</div>
                    <div className="dropdown-item">Acer</div>
                </div>

                {/* Column 2: Tablets & Accessories */}
                <div className="dropdown-column">
                    <div className="dropdown-heading">Tablets</div>
                    <div className="dropdown-item">Lenovo</div>
                    <div className="dropdown-item">Apple</div>
                    <div className="dropdown-item">Samsung</div>
                    <div className="dropdown-item">Micromax</div>
                    <div className="dropdown-item">iBall</div>

                    <div className="dropdown-heading" style={{ marginTop: 24 }}>PC Accessories</div>
                    <div className="dropdown-item">Keyboards</div>
                    <div className="dropdown-item">Mice</div>
                    <div className="dropdown-item">Laptop Bags</div>
                    <div className="dropdown-item">PC Speakers</div>
                    <div className="dropdown-item">Batteries</div>
                </div>

                {/* Column 3: Processors & Price */}
                <div className="dropdown-column">
                    <div className="dropdown-heading">Processors</div>
                    <div className="dropdown-item">Intel</div>
                    <div className="dropdown-item">AMD</div>
                    <div className="dropdown-item">Qualcomm</div>
                    <div className="dropdown-item">IBM</div>
                    <div className="dropdown-item">Motorola</div>

                    <div className="dropdown-heading" style={{ marginTop: 24 }}>Shop By Price</div>
                    <div className="dropdown-item">Below $500</div>
                    <div className="dropdown-item">$500 - $699</div>
                    <div className="dropdown-item">$700 - $799</div>
                    <div className="dropdown-item">$800 - $899</div>
                    <div className="dropdown-item">$900 and Above</div>
                </div>

                {/* Column 4: Best Processors */}
                <div className="dropdown-column">
                    <div className="dropdown-heading">Best Processors</div>
                    <div className="dropdown-item">Intel Core i9-7980XE</div>
                    <div className="dropdown-item">AMD Ryzen Threadripper 1950X</div>
                    <div className="dropdown-item">AMD Ryzen 5 1600X</div>
                    <div className="dropdown-item">Intel Core i7-8700K</div>
                    <div className="dropdown-item">AMD Ryzen 7 1800X</div>
                    <div className="dropdown-item">Intel Core i5-7600K</div>
                    <div className="dropdown-item">AMD Ryzen 3 1300X</div>
                    <div className="dropdown-item">Intel Core i7-7820X</div>
                    <div className="dropdown-item">AMD Ryzen 4 1100X</div>
                    <div className="dropdown-item">Intel Core i3-7280K</div>
                </div>

                {/* Column 5: Images */}
                <div className="dropdown-column">
                    <img
                        src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/megamenu-image2-1.png"
                        alt="Laptop Banner"
                        className="dropdown-image"
                    />
                </div>
            </div>
        </>
    );
};

export default LaptopDesktopDropdown;
