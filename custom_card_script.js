// Global variable to store uploaded logo data
let uploadedLogo = "";

// Function to create or update the card preview
function createCard() {
    // Get form values or set default values
    const cardTitle = document.getElementById('card-title').value || "Your Card Title";
    const cardDescription = document.getElementById('card-description').value || "Your card description goes here.";
    const stampCount = document.querySelector('input[name="stamp-count"]:checked')?.value || 7; // Default stamp count
    const stampIcon = document.querySelector('input[name="stamp-icon"]:checked')?.value || 'coffee'; // Default stamp icon
    const stampColor = document.getElementById('stamp-color').value || "#FFD700"; // Default stamp color (gold)
    const bgColor = document.getElementById('bg-color').value || "#d89298"; // Default background color (white)

    // Get the card preview container
    const cardPreview = document.getElementById('card-preview');

    // Set the background color of the card
    cardPreview.style.backgroundColor = bgColor;

    // Clear previous stamps and elements
    cardPreview.innerHTML = '';

    // Display uploaded logo if available
    if (uploadedLogo) {
        const logoElement = document.createElement('img');
        logoElement.src = uploadedLogo;
        logoElement.alt = 'Uploaded Logo';
        logoElement.className = 'logo-preview';
        cardPreview.appendChild(logoElement);
    }

    // Create title element at the top
    const cardTitleElement = document.createElement('h3');
    cardTitleElement.innerText = cardTitle;
    cardTitleElement.className = 'card-title';
    cardPreview.appendChild(cardTitleElement);

    // Create description element
    const cardDescElement = document.createElement('p');
    cardDescElement.innerText = cardDescription;
    cardDescElement.className = 'card-description';
    cardPreview.appendChild(cardDescElement);

    // Define the icon for the selected stamp type using images
    let icon = '';
    if (stampIcon === 'coffee') {
        icon = '<img src="icons_image/coffee.png" class="icon-image-preview" alt="Coffee Cup">';
    } else if (stampIcon === 'star') {
        icon = '<img src="icons_image/star.png" class="icon-image-preview" alt="Star">';
    } else if (stampIcon === 'heart') {
        icon = '<img src="icons_image/heart.png" class="icon-image-preview" alt="Hart">'; // Corrected 'hart' to 'heart'
    } else if (stampIcon === 'check') {
        icon = '<img src="./icons_image/check.png" class="icon-image-preview" alt="Checkmark">';
    }

    // Create stamps based on the specified number
    const stampsContainer = document.createElement('div');
    stampsContainer.style.display = 'flex';
    stampsContainer.style.flexWrap = 'wrap';
    stampsContainer.style.justifyContent = 'center';

    for (let i = 0; i < stampCount; i++) {
        const stamp = document.createElement('div');
        stamp.className = 'stamp';
        stamp.style.backgroundColor = stampColor;
        stamp.innerHTML = icon; // Insert the selected icon as an image inside the stamp
        stampsContainer.appendChild(stamp);
    }
    cardPreview.appendChild(stampsContainer);

    // Add QR code image
    const qrCode = document.createElement('img');
    qrCode.src = 'image/qr.png'; // Replace with the path to your QR code image
    qrCode.alt = 'QR Code';
    qrCode.className = 'qr-code';
    cardPreview.appendChild(qrCode);
}

// Function to handle logo upload and preview
function uploadLogo(event) {
    const reader = new FileReader();
    reader.onload = function() {
        uploadedLogo = reader.result; // Store the uploaded logo data
        createCard(); // Update the card preview with the uploaded logo
    };
    reader.readAsDataURL(event.target.files[0]); // Read the uploaded file
}

// Add event listeners to update preview in real-time
document.getElementById('card-title').addEventListener('input', createCard);
document.getElementById('card-description').addEventListener('input', createCard);
document.getElementById('stamp-color').addEventListener('input', createCard);
document.getElementById('bg-color').addEventListener('input', createCard);
document.querySelectorAll('input[name="stamp-icon"]').forEach(radio => {
    radio.addEventListener('change', createCard); // Corrected event listener for stamp icons
});
document.querySelectorAll('input[name="stamp-count"]').forEach(radio => {
    radio.addEventListener('change', createCard);
});

// Create default card preview on page load
document.addEventListener('DOMContentLoaded', createCard);
// Function to reset the card to default values
function resetCard() {
    document.getElementById('stamp-card-form').reset(); // Reset the form fields
    uploadedLogo = ""; // Clear the uploaded logo
    createCard(); // Re-create the card with default values
}
// Function to save the card design to local storage
function saveCard() {
    // Get the form values
    const cardTitle = document.getElementById('card-title').value;
    const cardDescription = document.getElementById('card-description').value;
    const stampCount = document.querySelector('input[name="stamp-count"]:checked')?.value;
    const stampIcon = document.querySelector('input[name="stamp-icon"]:checked')?.value;
    const stampColor = document.getElementById('stamp-color').value;
    const bgColor = document.getElementById('bg-color').value;

    // Create a card object to store these values
    const cardData = {
        title: cardTitle,
        description: cardDescription,
        stampCount: stampCount,
        icon: stampIcon,
        stampColor: stampColor,
        bgColor: bgColor,
        logo: uploadedLogo, // Store the uploaded logo
        qrCode: 'image/qr.png' // Add QR code path (update this if the path changes)

    };

    // Retrieve existing cards from local storage
    let savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    
    // Add the new card to the saved cards array
    savedCards.push(cardData);

    // Save the updated array back to local storage
    localStorage.setItem('savedCards', JSON.stringify(savedCards));

    alert("Card saved successfully! You can view it in 'My Cards' page.");
}




