// code for side bar toggle with menu button 
var btn = document.querySelector('.toggle');
var btnst = true;
btn.onclick = function() {
  if(btnst == true) {
    document.querySelector('.toggle span').classList.add('toggle');
    document.getElementById('sidebar').classList.add('sidebarshow');
    btnst = false;
  }else if(btnst == false) {
    document.querySelector('.toggle span').classList.remove('toggle');
    document.getElementById('sidebar').classList.remove('sidebarshow');
    btnst = true;
  }
}














// scrolltriger toward the clicked element  
function scrollToElement(elementSelector, instance = 0) {
    // Select all elements that match the given selector
    const elements = document.querySelectorAll(elementSelector);
    // Check if there are elements matching the selector and if the requested instance exists
    if (elements.length > instance) {
        // Scroll to the specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("tools");
const link2 = document.getElementById("tempalets");
const link3 = document.getElementById("canvas");

link1.addEventListener('click', () => {
    scrollToElement('.header');
});

tempalets.addEventListener('click', () => {
    // Scroll to the second element with "header" class
    scrollToElement('#hero2', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('');
    // write the id of canvas page here 
});







// code for colorpicker from image 
const pickBtn = document.getElementById("pick-btn");
const fileInput = document.getElementById("file");
const image = document.getElementById("image");
const hexInput = document.getElementById("hex-input");
const rgbInput = document.getElementById("rgb-input");
const pickedColor = document.getElementById("picked-color");

// Initialize Eyedropper if supported
const initEyeDropper = () => {
    if ("EyeDropper" in window) {
        pickBtn.classList.remove("hide");
        const eyeDropper = new EyeDropper();
        // Event listener for color selection
        pickBtn.addEventListener("click", async () => {
            try {
                const colorValue = await eyeDropper.open();
                // Convert colorValue.sRGBHex to lowercase to ensure propper parsing
                const hexValue = colorValue.sRGBHex.toLowerCase();
                const rgbValue = hexToRgb(hexValue);
                result.style.display = "grid";
                hexInput.value = hexValue;
                rgbInput.value = rgbValue;
                pickedColor.style.backgroundColor = hexValue;
            } catch {
                alert("Your browser doesn't support Eyedropper Api!");
            }
        });
    } else {
        alert("Your browser doesn't support Eyedropper Api!");
    }
};
// Event listener for file input
fileInput.addEventListener("change", () => {
    result.style.display = "none";
    const reader = new FileReader();
    reader.onload = () => image.setAttribute("src", reader.result);
    reader.readAsDataURL(fileInput.files[0]);
});
// Function to copy text to clipboard
const copyToClipboard = (textId) => {
    const textElement = document.getElementById(textId);
    textElement.select();
    document.execCommand("copy");
};
// RGB conversion function
const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
};
// Initialize Eyedropper
window.onload = initEyeDropper;












// code for gredient genrator 

const gradientBox = document.querySelector(".gradient-box");
const selectMenu = document.querySelector(".select-box select");
const colorInputs = document.querySelectorAll(".colors input");
const textarea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");

const getRandomColor = () => {
    // Generating a random color in hexadecimal format. Example: #5665E9
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${randomHex}`;
}

const generateGradient = (isRandom) => {
    if(isRandom) { // If isRandom is true, update the colors inputs value with random color
        colorInputs[0].value = getRandomColor();
        colorInputs[1].value = getRandomColor();
    }
    // Creating a gradient string using the select menu value with color input values
    const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value}, ${colorInputs[1].value})`;
    gradientBox.style.background = gradient;
    textarea.value = `background: ${gradient};`;
}

const copyCode = () => {
    // Copying textarea value and updating the copy button text
    navigator.clipboard.writeText(textarea.value);
    copyBtn.innerText = "Code Copied";
    setTimeout(() => copyBtn.innerText = "Copy Code", 1600);
}

colorInputs.forEach(input => {
    // Calling generateGradient function on each color input clicks
    input.addEventListener("input", () => generateGradient(false));
});

selectMenu.addEventListener("change", () => generateGradient(false));
refreshBtn.addEventListener("click", () => generateGradient(true));
copyBtn.addEventListener("click", copyCode);
