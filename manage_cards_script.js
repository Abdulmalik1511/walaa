window.onload = function() {
    function scanCards() {
        const qrReaderElement = document.getElementById("qr-reader");

        if (!qrReaderElement) {
            console.error("The 'qr-reader' element is not found in the DOM.");
            return;
        }

        qrReaderElement.innerHTML = ""; // Clear any previous scanner instance

        // Initialize the QR code scanner
        const html5QrCode = new Html5Qrcode("qr-reader");

        // Success callback function
        function onScanSuccess(decodedText, decodedResult) {
            alert(`Scan successful: ${decodedText}`);

            // Update card data based on the scanned QR code text
            updateCardData(decodedText);

            // Stop scanning after success
            html5QrCode.stop().then(() => {
                console.log("Scanning stopped.");
            }).catch(err => {
                console.error("Error stopping the scan.", err);
            });
        }

        // Error callback function
        function onScanFailure(error) {
            console.warn(`QR scanning failed: ${error}`);
        }

        // Start scanning using the back camera
        html5QrCode.start(
            { facingMode: "environment" },  // Use back camera for better QR detection
            { fps: 10, qrbox: { width: 250, height: 250 } },  // Frame rate and scanning box dimensions
            onScanSuccess,
            onScanFailure
        ).catch(err => {
            console.error("Unable to start scanning.", err);
        });
    }

    // Function to dynamically update card data
    function updateCardData(scannedData) {
        // Example: Parse the scanned data to get card information
        // For simplicity, assume the QR code text is in JSON format
        try {
            const cardData = JSON.parse(scannedData);

            // Find or create the card information section in the DOM
            const container = document.querySelector(".container");

            // Create a new card-info section or update an existing one
            const cardInfoDiv = document.createElement("div");
            cardInfoDiv.classList.add("card-info");

            // Populate the card information with scanned data
            cardInfoDiv.innerHTML = `
                <h3>Customer Name: ${cardData.name}</h3>
                <p>Email: ${cardData.email}</p>
                <p>Number of Cards: ${cardData.numOfCards}</p>
            `;

            // Append or update the card information in the container
            container.appendChild(cardInfoDiv);
        } catch (error) {
            console.error("Failed to parse scanned QR data: ", error);
        }
    }

    // Assign scanCards function to global scope to access it from the button
    window.scanCards = scanCards;
};
