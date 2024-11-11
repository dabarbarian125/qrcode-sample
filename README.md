# QR Code Generator Service with Node.js and Express.js

In today's digital world, **QR codes** are widely used to share information efficiently and conveniently. This project aims to develop a **QR Code Generation API** service using **Node.js** and **Express.js**. The API allows users to generate QR codes with customizable data inputs while following RESTful API principles.

## Features
- **Generate QR Codes**: Create QR codes from text, URLs, or other data formats.
- **Customizable Data**: Encode product details like Product ID and Price into QR codes.
- **RESTful API**: Follow industry standards to expose QR code generation as an API service.
- **Separation of Concerns**: Well-defined layers such as Controllers, Routes, and Services to maintain modularity and readability.

## Prerequisites
- **Node.js** and npm (or yarn) installed
- Basic understanding of **Node.js**, **Express.js**, and **JavaScript**

## How QR Codes Work
- **Data Encoding**: Data (such as text, URL, contact information) is encoded into binary, which is then arranged in a 2D grid.
- **Error Correction**: QR codes use error correction algorithms to ensure that even if part of the code is damaged, it can still be read.
- **Reading and Decoding**: A smartphone camera or QR reader decodes the data, including error correction bits, and extracts the original information.

## Approach to Create QR Code Generator Service
- **app.js**: Contains the basic server setup and configuration.
- **routes.js**: Defines all API endpoints, enabling organized management of numerous routes.
- **controller.js**: The main entry point for incoming requests, handling authentication, validation, and response.
- **service.js**: Contains business logic, including the QR code generation logic using the `qrcode` library.

## Project Structure
```
qr-code-generator/
|-- server/
    |-- app.js
    |-- routes.js
    |-- controller.js
    |-- service.js
|-- client/
    |-- index.html
    |-- script.js
```

## Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd qr-code-generator
   ```

2. **Set Up Server**:
   - Create a `server` folder and navigate into it:
   ```bash
   mkdir server
   cd server
   npm init -y
   ```

3. **Install Dependencies**:
   ```bash
   npm install express qrcode body-parser cors
   ```

   **Updated `package.json`** dependencies will look like:
   ```json
   "dependencies": {
       "body-parser": "^1.20.2",
       "cors": "^2.8.5",
       "express": "^4.18.2",
       "qrcode": "^1.5.3"
   }
   ```

## Backend Example Code (service.js)
```js
const QRCode = require('qrcode');

exports.formatData = (data) => {
    const qrCodeText = `Product ID: ${data.id}, Price: $${data.price}`;
    return qrCodeText;
};

exports.generateQRCode = async (qrCodeText) => {
    const options = {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        margin: 1
    };

    const qrCodeBuffer = await QRCode.toBuffer(qrCodeText, options);
    return qrCodeBuffer;
};
```

## Running the Application
1. **Start the Server**:
   - Navigate to the server folder and run:
   ```bash
   node app.js
   ```

2. **Create Frontend Client**:
   - Go to the root folder and create a `client` folder to add the HTML and JavaScript for interacting with the backend.
   
3. **Example Frontend Code (script.js)**:
   ```js
   document.getElementById('qr-form').addEventListener('submit', function (e) {
       e.preventDefault();

       const id = document.getElementById('qr-id').value;
       const price = document.getElementById('qr-price').value;
       const data = { id, price };

       fetch('http://localhost:3000/generate-qr', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ data })
       })
           .then(response => response.blob())
           .then(blob => {
               const qrImage = document.createElement('img');
               const qrImageUrl = URL.createObjectURL(blob);
               qrImage.src = qrImageUrl;
               const qrResultDiv = document.getElementById('qr-result');
               qrResultDiv.innerHTML = '';
               qrResultDiv.appendChild(qrImage);
           })
           .catch(error => console.error('Error generating QR code:', error));
   });
   ```

## Accessing the Application
- Visit **http://localhost:3000** to use the QR code generation service.
- Enter product details, and click submit to receive the QR code.

## License
This project is licensed under the **MIT License**.

## Acknowledgments
- Thanks to **GeeksforGeeks** for the inspiration and foundational steps for creating this project.

