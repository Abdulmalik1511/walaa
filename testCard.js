// Wait until the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function () {
    // QR Code generation and Stamp card logic
    const cardTitle = "Walla";
    const cardDescription = "Your card description goes here.";
    const initialStampCount = 8; // Initial number of stamps
    let currentStampCount = initialStampCount; // Track the remaining stamps
    const stampIcon = '❤️'; // Icon representing a stamp

    // Create QR code and attach to the 'qr-code' div
    const qrCodeElement = document.getElementById('qr-code');

    if (qrCodeElement) {
        const qrCode = new QRious({
            element: qrCodeElement,
            size: 130, // Adjust size to fit the card better
            value: 'https://www.example.com/redeem-stamp' // Replace with the actual URL or value to trigger reduction
        });
    } else {
        console.error('QR code element not found');
    }

    // Create Stamp Card
    const stampCardContainer = document.getElementById('stamp-card');

    if (stampCardContainer) {
        // Function to render stamps based on the remaining count
        function renderStamps() {
            stampCardContainer.innerHTML = ""; // Clear existing stamps

            for (let i = 0; i < initialStampCount; i++) {
                const stamp = document.createElement('div');
                stamp.classList.add('stamp');
                stamp.innerHTML = stampIcon;
                if (i < currentStampCount) {
                    stamp.classList.add('active');
                }
                stamp.id = `stamp-${i}`;
                stampCardContainer.appendChild(stamp);
            }
        }

        // Function to update the card when QR code is scanned or clicked
        function updateCard() {
            if (currentStampCount > 0) {
                currentStampCount -= 1; // Reduce one stamp
                renderStamps(); // Re-render the stamps based on the new count
                alert(`Stamp redeemed! You now have ${currentStampCount} stamps left.`);
            } else {
                alert('No more stamps left to redeem!');
            }
        }

        // Initial rendering of stamps
        renderStamps();

        // Simulate QR code scan by clicking the QR code container
        qrCodeElement.addEventListener('click', () => {
            updateCard(); // Update the card on click (to simulate a scan)
        });
    } else {
        console.error('Stamp card container not found');
    }
});
