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
