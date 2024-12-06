// Sample saved cards data (you would normally get this data from a server or local storage)
const savedCards = [
   
];
  
   //localStorage.clear();


// Function to render the saved cards on the My Cards page
// Function to render saved cards on the My Cards page
// Function to render saved cards on the My Cards page
function renderSavedCards() {
    const cardsContainer = document.querySelector('.cards-container');

    // Retrieve saved cards from local storage
    const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];

    // Clear any existing cards
    cardsContainer.innerHTML = '';

    // Iterate through the savedCards array and create card elements
    savedCards.forEach((card, index) => {
        // Create card container with phone background
        const cardElement = document.createElement('div');
        cardElement.className = 'card'; // Set initial card class

        // Create card preview inside the phone frame
        const cardPreview = document.createElement('div');
        cardPreview.style.backgroundColor = card.bgColor; // Set the card background color
        cardPreview.style.width = '250px';
        cardPreview.style.height = '500px';
        cardPreview.style.borderRadius = '20px';
        cardPreview.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
        cardPreview.style.display = 'flex';
        cardPreview.style.flexDirection = 'column';
        cardPreview.style.alignItems = 'center';
        cardPreview.style.justifyContent = 'center';
        cardPreview.style.padding = '20px';

        // Create and append card logo if available
        if (card.logo) {
            const cardLogo = document.createElement('img');
            cardLogo.src = card.logo;
            cardLogo.alt = 'Card Logo';
            cardLogo.className = 'logo-preview';
            cardPreview.appendChild(cardLogo);
        }

        // Create and append card title
        const cardTitle = document.createElement('h3');
        cardTitle.innerText = card.title;
        cardPreview.appendChild(cardTitle);

        // Create and append card description
        const cardDescription = document.createElement('p');
        cardDescription.innerText = card.description;
        cardPreview.appendChild(cardDescription);

        // Create and append card stamps
        const stampsContainer = document.createElement('div');
        stampsContainer.style.display = 'flex';
        stampsContainer.style.flexWrap = 'wrap';
        stampsContainer.style.justifyContent = 'center';

        // Create stamps based on the specified number
        for (let i = 0; i < card.stampCount; i++) {
            const stamp = document.createElement('div');
            stamp.className = 'stamp';
            stamp.style.backgroundColor = card.stampColor;
            stamp.innerHTML = `<img src="./icons_image/${card.icon}.png" class="icon-image-preview" alt="${card.icon}">`;
            stampsContainer.appendChild(stamp);
        }
        cardPreview.appendChild(stampsContainer);

        // Create and append QR code if available
        if (card.qrCode) {
            const qrCodeElement = document.createElement('img');
            qrCodeElement.src = card.qrCode; // Use the saved QR code path
            qrCodeElement.alt = 'QR Code';
            qrCodeElement.className = 'qr-code';
            cardPreview.appendChild(qrCodeElement);
        }

        // Append card preview to the card container
        cardElement.appendChild(cardPreview);

        // Append card to the main container
        cardsContainer.appendChild(cardElement);

        // Apply the fly-in effect with a delay
        setTimeout(() => {
            cardElement.classList.add('fly-in'); // Apply fly-in class after delay
        }, index * 500); // Adjust the delay as needed (500ms per card)
    });
}

// Load the saved cards on page load
document.addEventListener('DOMContentLoaded', renderSavedCards);


// Load the saved cards on page load
document.addEventListener('DOMContentLoaded', renderSavedCards);

// Load the saved cards on page load
document.addEventListener('DOMContentLoaded', renderSavedCards);
