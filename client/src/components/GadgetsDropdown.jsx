import React from "react";

const GadgetsDropdown = () => {
    const styles = {
        container: {
            display: "flex",
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
            gap: "50px",
            minWidth: "1000px",
            flexWrap: "nowrap",
            alignItems: "flex-start",
            zIndex: 100,
        },
        column: {
            flex: 1,
            minWidth: "180px",
        },
        heading: {
            fontWeight: "bold",
            marginBottom: 10,
            fontSize: 16,
            color: "#111827",
        },
        listItem: {
            color: "#374151",
            marginBottom: 6,
            cursor: "pointer",
            fontSize: 12,
            transition: "color 0.3s ease, text-decoration 0.3s ease",
        },
        image: {
            width: "300",
            maxWidth: "150px",
            borderRadius: "10px",
            marginBottom: "15px",
            display: "block",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
        },
        imageColumn: {
            flex: 1,
            maxWidth: "350px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    };

    return (
        <div style={styles.container}>
            {/* 3 Content Columns */}
            {[...Array(3)].map((_, colIdx) => (
                <div style={styles.column} key={colIdx}>
                    {colIdx === 0 && (
                        <>
                            <div style={styles.heading}>Computers & Accessories</div>
                            <div className="listItem" style={styles.listItem}>
                                Laptops, Desktops & Monitors
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Networking & Internet Devices
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Computer Accessories
                            </div>
                            <div style={{ ...styles.heading, marginTop: 20 }}>Peripherals</div>
                            <div className="listItem" style={styles.listItem}>
                                Hard Drives
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Pen Drives & Memory Cards
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Printers & Ink
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Mouse
                            </div>
                        </>
                    )}
                    {colIdx === 1 && (
                        <>
                            <div style={styles.heading}>Cameras</div>
                            <div className="listItem" style={styles.listItem}>
                                DSLR
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Lenses
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Security & Surveillance
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Binoculars & Telescopes
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Camcorders
                            </div>
                            <div style={{ ...styles.heading, marginTop: 20 }}>Watches</div>
                            <div className="listItem" style={styles.listItem}>
                                Men's Watches
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Women's Watches
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Premium Watches
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Kids Watches
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Deals on Watches
                            </div>
                        </>
                    )}
                    {colIdx === 2 && (
                        <>
                            <div style={styles.heading}>Accessories</div>
                            <div className="listItem" style={styles.listItem}>
                                Mouses
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Keyboards
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Hardrives
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Headphones
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Speakers
                            </div>
                            <div style={{ ...styles.heading, marginTop: 20 }}>Gadgets</div>
                            <div className="listItem" style={styles.listItem}>
                                Fire TV Stick
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Google Chromecast
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Set Top
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Accessories
                            </div>
                            <div className="listItem" style={styles.listItem}>
                                Deals of the Day
                            </div>
                        </>
                    )}
                </div>
            ))}

            {/* Image Column */}
            <div style={styles.imageColumn}>
                <img
                    src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/megamenu-image8.png"
                    alt="Computer"
                    style={styles.image}
                />
                <img
                    src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/megamenu-image5.png"
                    alt="Watch"
                    style={styles.image}
                />
                <img
                    src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/megamenu-image6.png"
                    alt="Gadget"
                    style={styles.image}
                />
            </div>
            {/* CSS for hover effects */}
            <style>{`
        .listItem:hover {
          color: #2563eb;
          text-decoration: underline;
        } 
      `}</style>

        </div>
    );
};

export default GadgetsDropdown;
