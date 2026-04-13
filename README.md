# OmniPOS: The Hybrid Offline Billing Solution

> A modern, offline-first Point of Sale (POS) system designed for real-world retail environments—where internet is unreliable, budgets are tight, and efficiency matters.

---

## The "Why" (Business Niche)

Small retail businesses—kiosks, mini-marts, and local shops—face real challenges:

*  Expensive POS hardware (barcode scanners, terminals, printers)
*  Heavy reliance on internet connectivity
*  Downtime = lost sales

**OmniPOS changes the game.**

It’s built with a simple idea:

> *What if your existing devices could become a full POS system?*

With OmniPOS:

* Your **PC becomes the command center**
* Your **smartphone becomes a wireless barcode scanner**
* Your **business keeps running—even offline**

No cloud dependency. No expensive hardware. Just smart software.

---

##  Key Features

* **Offline-Sync**
  Works seamlessly without internet. Data syncs locally and stays consistent.

*  **Hybrid Scanning**
  Turn any smartphone into a wireless barcode scanner for your desktop system.

*  **Thermal Receipt Printing**
  Print clean, professional receipts using standard thermal printers.

*  **Smart Inventory Management**
  Track stock levels, sales, and product movement in real-time.

*  **Flexible Modes**
  Use it:

  * Standalone on PC
  * Standalone on Mobile
  * Linked (Phone + PC together)

---

## Tech Stack

### Backend

* **Python**
* **FastAPI** (fast, modern API framework)

### Frontend

* **JavaScript**
* **React** (UI layer)
* **Electron** (desktop app wrapper)

### Database

* **SQLite**

  > Lightweight, fast, and perfect for offline-first applications.

---

## How it Works (The “Magic”)

OmniPOS doesn’t rely on the cloud—it creates its own local ecosystem.

Here’s the trick:

1. The PC runs a **local FastAPI server**
2. Your phone connects to the **same Wi-Fi network**
3. The phone communicates directly with the PC via **local IP**
4. When you scan a barcode on your phone:

   * It sends the data instantly to the PC
   * The PC processes it like a physical scanner input

> Result: Real-time scanning without internet, servers, or delays.

---

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-joakimtech/omnipos.git
cd omnipos
```

---

### Backend Setup (Python + FastAPI)

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

###  Frontend Setup (React + Electron)

```bash
cd frontend

# Install dependencies
npm install
```

---

###  Run the Development Environment

```bash
# Start backend (from root directory)
uvicorn app.main:app --reload

# Start frontend (from /frontend directory)
npm run dev
```

---

## Usage Instructions

### Switching Modes

OmniPOS supports flexible operation modes:

#### Standalone PC Mode

* Run the desktop app
* Use keyboard/manual input or USB scanner

#### Standalone Mobile Mode

* Launch the mobile interface
* Manage sales directly from your phone

#### Linked Mode (Recommended)

1. Ensure both devices are on the same Wi-Fi
2. Start backend server on PC
3. Connect phone using the PC’s local IP
4. Start scanning 

---

## Developer’s Note

Building OmniPOS wasn’t just about writing code—it was about solving a real problem.

Many small businesses don’t need “enterprise software.”
They need something **reliable, affordable, and practical**.

This project bridges:

* The power of desktop systems
*  The convenience of mobile devices

And does it in a way that works **even when the internet doesn’t**.

If you’ve ever seen a shop struggle with slow systems or downtime—this is for them.

---

## Contributing

Contributions, ideas, and feedback are welcome!

```bash
# Fork the repo
# Create a feature branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add your feature"

# Push and open a PR
```

---

## License

MIT License – feel free to use, modify, and build on top of OmniPOS.

---

## Final Thought

> *Technology should adapt to people—not the other way around.*

OmniPOS is built to fit into real-life business environments, not ideal ones.

---
