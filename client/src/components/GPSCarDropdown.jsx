// GPSCarDropdown.js
import React from "react";

const styles = {
    container: {
        display: "flex",
        padding: "24px",
        backgroundColor: "#fff",
        color: "#111827",
        justifyContent: "space-between",
        gap: "40px",
        fontSize: "14px",
        width: "90%",
    },
    column: {
        minWidth: "180px",
    },
    title: {
        fontWeight: "bold",
            marginBottom: 10,
            fontSize: 16,
            color: "#111827",
    },
    item: {
        color: "#374151",
        marginBottom: 6,
        cursor: "pointer",
        fontSize: 12,
        transition: "color 0.3s ease, text-decoration 0.3s ease",

    },
    imageContainer: {
        maxWidth: "300px",
        alignSelf: "center",
    },
    image: {
        maxWidth: "100%",
        height: "auto",
    },
};

const GPSCarDropdown = () => {
    return (
        <div style={styles.container}>
            <div style={styles.column}>
                <div style={styles.title}>Car Audios</div>
                <div style={styles.item}>Music Systems</div>
                <div style={styles.item}>Video Systems</div>
                <div style={styles.item}>Speakers</div>
                <div style={styles.item}>Car Monitors</div>
                <div style={styles.item}>Car Parts</div>
                <div style={styles.item}>Monitoring</div>
                <div style={styles.item}>Network Jammers</div>
                <div style={styles.item}>Car Accessories</div>
                <div style={styles.item}>Car Electronics</div>
                <div style={styles.item}>All Audio Products</div>
                <div style={styles.item}>Accessories</div>
            </div>

            <div style={styles.column}>
                <div style={styles.title}>GPS & Accessories</div>
                <div style={styles.item}>Gps Tracking Devices</div>
                <div style={styles.item}>GPS Networking Devices</div>
                <div style={styles.item}>GPS Tracking Sensors</div>
                <div style={styles.item}>GPS Monitoring</div>
                <div style={styles.item}>GPS Jammers</div>
                <div style={styles.item}>GPS Anti-Tracker</div>
                <div style={styles.item}>GPS Accessories</div>
                <div style={styles.item}>GPS Devices</div>
                <div style={styles.item}>GPS Trackers</div>
            </div>

            <div style={styles.column}>
                <div style={styles.title}>Accessories & Parts</div>
                <div style={styles.item}>Car Accessories</div>
                <div style={styles.item}>Car Electronics</div>
                <div style={styles.item}>Car Parts</div>
                <div style={styles.item}>Car & Bike Care</div>
                <div style={styles.item}>All Car Products</div>

                <div style={{ ...styles.title, marginTop: "16px" }}>Shop By Price</div>
                <div style={styles.item}>Below Rs. 100$</div>
                <div style={styles.item}>101$ - 199$</div>
                <div style={styles.item}>200$ - 299$</div>
                <div style={styles.item}>300$ - 399$</div>
                <div style={styles.item}>400$ and Above</div>
            </div>

            <div style={styles.column}>
                <div style={styles.title}>Shop By Brand</div>
                <div style={styles.item}>Sony</div>
                <div style={styles.item}>Pioneer</div>
                <div style={styles.item}>JBL</div>
                <div style={styles.item}>Kenwood</div>
                <div style={styles.item}>Clarion</div>
                <div style={styles.item}>Alpine</div>
                <div style={styles.item}>Bang & Olufsen</div>
                <div style={styles.item}>Blaupunkt</div>
                <div style={styles.item}>Bose</div>
                <div style={styles.item}>Boston Acoustics</div>
                <div style={styles.item}>Infinity</div>
            </div>

            <div style={styles.imageContainer}>
                <img
                    src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/megamenu-image12.png" // Update with actual path
                    alt="GPS Audio"
                    style={styles.image}
                />
            </div>
        </div>
    );
};

export default GPSCarDropdown;
