import React, { useState } from "react";

const CustomerReview = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const totalReviews = 3;
  const ratingsCount = { 5: 1, 4: 2, 3: 0, 2: 0, 1: 0 };
  const avgRating = 4.3;

  const renderStars = (value) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        style={{
          cursor: "pointer",
          color: (hoverRating || rating) > i ? "#ffc107" : "#ddd",
          fontSize: 24,
        }}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(i + 1)}
      >
        ★
      </span>
    ));
  };

  return (
    <div style={{ padding: 20, display: "flex", gap: 40 }}>
      {/* Left Section */}
      <div style={{ width: "50%" }}>
        <h3>Based on {totalReviews} reviews</h3>
        <h1>{avgRating.toFixed(1)}</h1>
        <p>overall</p>
        {Object.entries(ratingsCount)
          .sort((a, b) => b[0] - a[0])
          .map(([stars, count]) => (
            <div
              key={stars}
              style={{ display: "flex", alignItems: "center", marginBottom: 5 }}
            >
              <span style={{ width: 60 }}>{`${stars} stars`}</span>
              <div
                style={{
                  height: 8,
                  background: "#eee",
                  flexGrow: 1,
                  margin: "0 10px",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    width: `${(count / totalReviews) * 100}%`,
                    background: "#ffc107",
                    height: "100%",
                    borderRadius: 4,
                  }}
                />
              </div>
              <span>{count}</span>
            </div>
          ))}
      </div>

      {/* Right Section - Review Form */}
      <div style={{ width: "50%" }}>
        <h3>Add a review</h3>

        <div>
          <p style={{ marginBottom: 5 }}>Your Rating</p>
          {renderStars()}
        </div>

        <div style={{ margin: "15px 0" }}>
          <textarea
            rows="4"
            placeholder="Your Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 10 }}
          />
        </div>

        <input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 10 }}
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 10 }}
        />
        <label style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Save my name, email, and website in this browser for the next time I comment.
        </label>

        <button
          style={{
            padding: "10px 20px",
            borderRadius: 20,
            background: "#eee",
            cursor: "pointer",
          }}
          onClick={() => alert("Review submitted (demo only)")}
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default CustomerReview;
