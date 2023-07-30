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

// Helper function to get the dominant color of an image using a canvas
function getDominantColor(imageUrl) {
    return new Promise(resolve => {
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.src = imageUrl;
        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const color = getDominantColorFromImageData(imageData);
            resolve(color);
        };
    });
}

// Helper function to get the dominant color from image data
function getDominantColorFromImageData(imageData) {
    const colorMap = new Map();
    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const color = rgbToHex(r, g, b);
        colorMap.set(color, (colorMap.get(color) || 0) + 1);
    }
    return [...colorMap.entries()].reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}

const slideImages = document.querySelectorAll(".slide-image");
let currentSlide = 0;

function showSlide(slideIndex) {
    slideImages.forEach((image, index) => {
        if (index === slideIndex) {
            image.classList.add("active");
            // Get the dominant color of the current slide's image and set it as the header text color
            getDominantColor(image.src).then(color => {
                document.documentElement.style.setProperty("--header-text-color", invertColor(color));
                document.getElementById("social-heading").style.color = invertColor(color);
            });
        } else {
            image.classList.remove("active");
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideImages.length;
    showSlide(currentSlide);
}

function startSlideshow() {
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

startSlideshow();

// Add your desired JavaScript code here
// You can use JavaScript to handle scrolling and animations

// Example: Hiding header on scroll
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector("header").style.top = "0";
    } else {
        if (currentScrollPos > window.innerHeight * 0.25) {
            document.querySelector("header").style.top = "-50px"; // Adjust this value based on the header's height
        }
    }
    prevScrollpos = currentScrollPos;
};
