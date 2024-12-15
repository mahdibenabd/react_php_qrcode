# ReactJS PHP QR Code Project

This project combines a React front end with PHP backend, utilizing QR codes for various functionalities.

## Prerequisites

- Ensure you have Node.js installed to run the React project.
- For PHP, make sure you have a web server installed (e.g., Apache, Nginx) and PHP installed on your system.

## Running the React Project

1. **Navigate to the React project directory:**

`cd path/to/your/reactjs_php_qrcode`

2. **Install the project dependencies using npm:**

`npm install`

3. **Start the React development server:**

`npm start`


- This will start the React development server on `http://localhost:3000`.

## Setting Up the PHP Backend

1. **Install XAMPP or WAMPServer** if you haven't already:
   - For XAMPP: Download and install XAMPP from [XAMPP's official website](https://www.apachefriends.org/index.html) and enable Apache in the control panel.
   - For WAMPServer: Download and install WAMPServer from [WAMPServer's official website](https://www.wampserver.com/en/) and start the server.

2. **Place your PHP files in the `htdocs` directory** (if using XAMPP) or the `www` directory (if using WAMPServer).

3. **Run your PHP server**:
   - **For XAMPP**: Start Apache from the XAMPP control panel.
   - **For WAMPServer**: Start Apache from the WAMPServer control panel.

4. **Update the React app to point to your PHP URL**:
    - Open `src/App.js` and modify the fetch URL in the fetch request to your PHP URL, replacing `localhost` with your local server if necessary: `const response = await fetch("http://localhost/api/qr_service.php"`