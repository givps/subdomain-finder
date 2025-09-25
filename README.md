# 🔎 Subdomain Finder

A simple web app to automatically discover subdomains of any given domain.  
Built with **HTML**, **CSS**, and **JavaScript** only—no backend—so it can be hosted on GitHub Pages or any static server.

## ✨ Features
- **Real-Time Search**: Enter a domain, click **Search**, and see the list of discovered subdomains.
- **A–Z Sorting**: Results are automatically sorted alphabetically.
- **Quick Filter**: A live filter box to quickly narrow down results.
- **Active/Inactive Status**: Each subdomain is checked with a `HEAD` request to detect whether it’s active.
- **Clean & Responsive UI**: Dark, high-contrast text for readability on both desktop and mobile.

## 🚀 How to Use
1. **Clone or download** this repository.
2. Ensure the three files below are in the same folder:
- **├── index.html**
- **├── style.css**
- **└── app.js**
3. Open `index.html` in a browser, or upload the entire folder to a static hosting service such as **GitHub Pages**.
## 📂 Project Structure
- **├── index.html** – # Main HTML structure
- **├── style.css** – # Page styling
- **└── app.js** – # JavaScript logic for fetching and checking subdomains

## 🛠️ Technologies
- **HTML5** – Page structure  
- **CSS3** – Responsive styling and color theme  
- **Vanilla JavaScript** – Fetch API to query data and check subdomain status  

## 🌐 Data Source
Subdomains are retrieved from:
- **[crt.sh](https://crt.sh/)** – Certificate Transparency (CT) logs that list all TLS/SSL certificates issued for a domain.  
  API endpoint used: https://crt.sh/?q=%25.<domain>&output=json

`%25.` is the URL-encoded wildcard (`%`).

Active/inactive status is determined by:
- **Fetch API** using a `HEAD` request to `https://<subdomain>`.

## ⚠️ Notes
- Results depend entirely on Certificate Transparency data.  
Not all subdomains will appear, especially those without public TLS certificates.
- The “active” check uses HTTPS (`HEAD` to `https://<subdomain>`).  
Subdomains serving HTTP only may be shown as *inactive*.

## 📜 License
Use and modify this project as needed.  
Example license: [MIT](https://opensource.org/licenses/MIT)

---

Made with ❤️ using pure HTML, CSS, and JavaScript.
