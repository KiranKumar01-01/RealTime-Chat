# 💬 REAL-TIME CHAT APPLICATION

A modern, full-stack **Real-Time Chat Application** built with scalable architecture and a beautiful UI.  
It enables users to communicate instantly with **secure authentication, real-time messaging, and rich features**.

---

## 🚀 Features

- 🔐 Custom JWT Authentication (no third-party auth)
- ⚡ Real-time Messaging using Socket.IO
- 🟢 Online / Offline User Presence
- 🔔 Notification Sounds (toggle supported)
- 📨 Welcome Emails (Resend API)
- 🗂️ Image Uploads (Cloudinary)
- 🚦 API Rate Limiting (Arcjet)
- 🎨 Modern UI (React + Tailwind + DaisyUI)
- 🧠 Zustand State Management
- 📱 Fully Responsive Design
- 🧑‍💻 Clean Git Workflow (PRs, branches)

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js  
- Tailwind CSS  
- DaisyUI  
- Zustand  

### ⚙️ Backend
- Node.js  
- Express.js  

### 🗄️ Database
- MongoDB  

### 🔄 Real-Time
- Socket.IO  

### ☁️ Services
- Cloudinary  
- Resend  
- Arcjet  


### 🔐 Signup Page 
<img width="1908" height="960" alt="Screenshot 2026-03-21 212423" src="https://github.com/user-attachments/assets/23c0a112-3a71-45fc-a2fc-3e372683562e" />


### 🔑 Login Page
<img width="1913" height="947" alt="Screenshot 2026-03-21 212501" src="https://github.com/user-attachments/assets/38b87c94-1139-47ea-b5d6-f043ed4af192" />


### 💬 Chat UI
<img width="1914" height="887" alt="Screenshot 2026-03-23 214708" src="https://github.com/user-attachments/assets/77eab0d7-2dfb-4da1-b9d4-8ed2da5ba522" />



## 🚀 Features

- 🔐 Custom JWT Authentication (no third-party auth)
- ⚡ Real-time Messaging using Socket.IO
- 🟢 Online / Offline User Presence
- 🔔 Notification Sounds (toggle supported)
- 📨 Welcome Emails (Resend API)
- 🗂️ Image Uploads (Cloudinary)
- 🚦 API Rate Limiting (Arcjet)
- 🎨 Modern UI (React + Tailwind + DaisyUI)
- 🧠 Zustand State Management
- 📱 Fully Responsive Design
- 🧑‍💻 Clean Git Workflow (PRs, branches)



🧠 How It Works (Detailed)

🔐 AUTHENTICATION FLOW
** The authentication system is implemented using JWT (JSON Web Tokens) to ensure secure and stateless user sessions.

Step-by-step process:

1.User Registration
  * User enters name, email, and password.
  * Password is hashed using bcrypt before storing in MongoDB.
  * This ensures even if the database is compromised, passwords remain secure.
    
2.Login Process
  * User submits email & password.
  * Backend compares entered password with hashed password using bcrypt.
  * If valid → a JWT token is generated.
    
3.Token Handling
  * JWT contains user ID and metadata.
  * Sent to frontend and stored (usually in cookies or localStorage).
  *Every request to protected routes includes this token.

4.Protected Routes
  * Middleware verifies JWT before allowing access.
  * If token is invalid/expired → request is rejected.

👉 Why JWT?
  * Stateless (no session storage needed)
  * Scalable for large applications
  * Fast authentication



⚡ REAL-TIME MESSAGING (SOCKET.IO)
Real-time communication is handled using WebSockets via Socket.IO, allowing instant message delivery.

Working flow:

1.When user logs in → a socket connection is established.
2.Each user gets a unique socket ID.
3.When user sends a message:
  * Message is emitted using socket.emit()
  * Server receives and forwards it using socket.to(receiver).emit()
4.Receiver gets message instantly without refresh.

👉 Key Advantage:
  * No HTTP polling
  * Bi-directional communication
  * Ultra-fast message delivery



🟢 PRESENCE SYSTEM (ONLINE / OFFLINE STATUS)
This system tracks whether users are active in real time.

How it works:
1.When user connects → their socket ID is stored
2.Backend maintains a list/map of:
  userId → socketId
3.When user disconnects:
  * Socket event disconnect is triggered
  * User is marked offline
4.Frontend updates UI:
  * 🟢 Green dot → Online
  * ⚫ Grey → Offline

👉 Real-time sync ensures accuracy across all users



🔔 NOTIFICATIONS & SOUNDS
Enhances user experience with real-time alerts.

Implementation:

1.When a new message arrives:
  * Event is triggered from socket
2.Frontend:
  * Plays notification sound
  * Updates unread message count
3.Toggle Feature:
  * User can enable/disable sounds
  * Stored in state (Zustand or local storage)

👉 Improves UX similar to WhatsApp/Telegram behavior



📨 EMAIL INTEGRATION (RESEND API)
Automated email system for onboarding users.

Flow:
1.After successful signup:
  * Backend triggers Resend API
2.Sends:
  * Welcome email
  * Confirmation message
3.Email contains:
  * User name
  * App intro

👉 Why Resend?

  * Developer-friendly API
  * Fast email delivery
  * Easy integration


🗂️ IMAGE UPLOAD FLOW (CLOUDINARY)
Handles media sharing in chats.

Step-by-step:
1.User selects image
2.Frontend sends file to backend
3.Backend uploads image to Cloudinary
4.Cloudinary returns a secure URL
5.URL is stored in MongoDB
6.Message contains image URL → displayed in chat

👉 Benefits:
  * No heavy storage on server
  * Fast CDN delivery
  * Optimized images


🚦 SECURITY & RATE LIMITING (ARCJET)
Prevents abuse and protects APIs.

How it works:
1.Every API request passes through Arcjet middleware
2.It:
  * Tracks request frequency per user/IP
  * Blocks excessive requests
3.If limit exceeded:
  * Request is denied (429 Too Many Requests)

👉 Why important?
  * Prevents spam attacks
  * Protects server resources
  * Improves app stability
