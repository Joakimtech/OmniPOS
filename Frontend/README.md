
# OmniPOS Frontend: Desktop Billing Interface

This repository contains the desktop-wrapped frontend for **OmniPOS**. It is an offline-first, high-performance billing dashboard built to turn a standard PC into a powerful retail command center.

## Tech Stack
This project leverages a modern "Desktop-Web" hybrid stack:

* **React (JavaScript):** The core UI engine used for building the dynamic, state-driven billing dashboard.
* **Vite:** The lightning-fast build tool providing Hot Module Replacement (HMR) for a seamless developer experience.
* **Electron:** The desktop wrapper that bridges the gap between web code and the PC's native operating system.
* **CSS (Flexbox/Grid):** For a responsive, professional layout that adapts to various screen resolutions.
* **Node.js & npm:** For managing the ecosystem of desktop-level dependencies.


## Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) (LTS) installed before beginning.

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/your-joakimtech/omnipos-Frontend.git
cd omnipos-Frontend

# Install all dependencies
npm install
``` 

### 2. Required Desktop Tools
If you haven't already, ensure the desktop-bridging tools are installed:
```bash
npm install --save-dev cross-env wait-on
```

## How to Run (Development Mode)

Running a hybrid app requires starting the "web engine" first, followed by the "desktop shell." You will need **two terminal tabs** open in your IDE.

### **Step 1: Start the React Engine (Terminal 1)**
This launches the Vite development server.
```bash
npm run dev
```
*Wait until you see the `Local: http://localhost:5173/` link.*

### **Step 2: Launch the Electron Window (Terminal 2)**
Open a new terminal tab and run the desktop command:
```bash
npm run electron:start
```

## Key Frontend Features
* **Dual-Terminal Workflow:** Optimized for real-time development and instant UI updates.
* **Local-First UI:** Built to remain responsive without any external API calls.
* **Hardware Ready:** Engineered with a shell that can communicate directly with thermal printers and USB scanners.
* **Modern Syntax:** Utilizes `.cjs` entry points to ensure compatibility between modern ES Modules and the Electron Main process.

## Developer's Note
By combining the speed of React with the accessibility of Electron, we've created a UI that isn't just a "website in a box," but a dedicated tool for real-world retail environments.

---
#### An ELECTRON window like this should pop up after running the commands  in the two terminals to show that (react + vite) are working well.
<img width="1540" height="965" alt="image" src="https://github.com/user-attachments/assets/67d85b77-1f96-402e-9f6b-b095e0766590" />

#### added theme toggle button in the Scanner app on the phone.
* **Light Theme**
 <img width="1657" height="800" alt="image" src="https://github.com/user-attachments/assets/29b78bbc-ce67-4f7c-b25f-2b9abc98501f" />
 
* **Dark Theme**
  <br>
<img width="1541" height="809" alt="image" src="https://github.com/user-attachments/assets/b259a8bf-32c5-4e71-8c1c-c565ec6c0cb8" />
