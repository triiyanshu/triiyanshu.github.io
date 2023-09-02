// Helper function to convert RGB to Hex
function rgbToHex(r, g, b) {
    return "#" + ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
}

// Helper function to invert the color
function invertColor(color) {
    const hexColor = color.substring(1); // Remove the leading #
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const invertedR = 255 - r;
    const invertedG = 255 - g;
    const invertedB = 255 - b;
    return rgbToHex(invertedR, invertedG, invertedB);
}

// Get the dominant color of a given image URL and apply it to the header background color
function setHeaderBackgroundColor(imageUrl) {
    getDominantColor(imageUrl).then(color => {
        document.querySelector(".header").style.backgroundColor = color;
    });
}

// Call the function to set the initial header background color based on the first image
setHeaderBackgroundColor("Images/bg1.jpg");
