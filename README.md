# Garage App

## Project Score: 380 / 400  


## Live Demo  
Project is deployed in my GitHub account: https://github.com/Shushanik01/Async-race-project.git 

---

## Checklist

###  Basic Structure (80 points)
- [x] **Two Views (10 points)** 
- [x] **Garage View Content (30 points)** 
- [x] **Winners View Content (10 points)**
- [x] **Persistent State (30 points)** 

---

###  Garage View (90 points)
- [x] **CRUD Operations (20 points)** 
- [-] **Color Selection (10 points)** 
- [x] **Random Car Creation (20 points)** 
- [x] **Car Management Buttons (10 points)** 
- [x] **Pagination (10 points)** 
- [x] **Empty Garage Message (10 points)** 
- [-] **Auto Previous Page (10 points)** 

---

### Winners View (50 points)
- [x] **Display Winners (15 points)** 
- [x] **Pagination (10 points)** 
- [x] **Winners Table (15 points)** 
- [x] **Sorting Functionality (10 points)** — sort by wins և by best time (asc/desc)

---

###  Race (170 points)
- [x] **Start Engine Animation (20 points)** 
- [x] **Stop Engine Animation (20 points)** 
- [x] **Responsive Animation (30 points)** 
- [x] **Start Race Button (10 points)** 
- [x] **Reset Race Button (15 points)** 
- [x] **Winner Announcement (5 points)** 
- [x] **Button States (20 points)** 
- [x] **Action Control During Race (50 points)** 

---

###  Prettier & ESLint (10 points)
- [x] **Prettier Setup (5 points)** 
- [x] **ESLint Config (5 points)** 

---

# 🏎️ Async Race - Cyberpunk Edition

**Score: ___/400 pts**  
**Live Demo: [Deploy your app and add link here]**

A futuristic racing simulation game built with React 19, TypeScript, Redux Toolkit, React Router, Framer Motion and Material-UI, featuring real-time car racing with API-driven mechanics and cyberpunk aesthetics.

## Features

### Core Functionality
- **Real-time Racing Engine**: Physics-based racing with API-driven car mechanics
- **Car Management**: Full CRUD operations for cars with custom names and colors
- **Random Car Generation**: Generate up to 100 cars instantly with predefined models
- **Winners System**: Persistent winner tracking with best times and win counts
- **Race Controls**: Start individual cars or race all cars simultaneously
- **Responsive Racing Track**: Visual progress tracking with animated race tracks

### UI/UX Features
- **Cyberpunk Theme**: Neon-styled interface with glowing borders and effects
- **Smooth Animations**: Framer Motion animations for page transitions and UI elements
- **Interactive Race Visualization**: Real-time car movement with progress indicators
- **Winner Modals**: Celebration animations for race winners
- **Pagination**: Navigate through large car collections
- **Responsive Design**: Mobile-optimized interface

### Technical Features
- **TypeScript**: Full type safety across the entire codebase
- **Redux Toolkit**: Centralized state management for cars and winners
- **Real-time API**: RESTful API with race engine simulation
- **Error Handling**: Comprehensive error handling and user feedback
- **Code Splitting**: Optimized component structure

##  Technology Stack

### Frontend
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Material-UI 7.3.2** - Modern component library
- **Redux Toolkit 2.9.0** - State management
- **React Router 7.9.0** - Client-side routing
- **Framer Motion 12.23.12** - Smooth animations
- **Emotion** - CSS-in-JS styling


## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

 **Install and start UI (new terminal)**
   ```bash
   cd async-race-ui
   npm install
   npm start
   ```
   UI will run on `http://localhost:3001` (or next available port)

 **Open your browser**
   Navigate to `http://localhost:3001` to start racing!


### Getting Started
1. **Create Your First Car**: Use the car creation form to add a new vehicle
2. **Customize**: Choose car name and color using the color picker
3. **Generate Fleet**: Use "GENERATE 100 CARS" for instant car collection

### Racing
1. **Individual Racing**: Click "START" on any car to begin racing
2. **Race All**: Use "START RACE" to race all cars simultaneously
3. **Race Controls**: Stop individual cars or reset all races
4. **Winners**: First car to finish wins and gets saved to winners table

### Winners Page
- View all race winners with statistics
- Sort by wins or best time
- See total race statistics

##  Project Architecture

```
async-race/
├── async-race-api/                 # Backend API Server
│   ├── index.js                   # JSON Server + Race Engine
│   ├── package.json               # API dependencies
│   └── README.md                  # API documentation
│
└── async-race-ui/                 # Frontend React Application
    ├── public/
    │   ├── images/                # Car images (car1.webp - car5.png)
    │   └── index.html             # HTML template
    │
    ├── src/
    │   ├── Api/                   # API Service Layer
    │   │   ├── garageApi.ts       # Car CRUD operations
    │   │   ├── useApiRaceEngine.ts # Racing engine hook
    │   │   └── winnerApiService.ts # Winners API
    │   │
    │   ├── components/            # React Components
    │   │   ├── Garage/           # Garage page components
    │   │   │   ├── CarCreationForm.tsx
    │   │   │   ├── CarListItem.tsx
    │   │   │   ├── GaragePage.tsx
    │   │   │   ├── RaceControlsSection.tsx
    │   │   │   └── WinnerModal.tsx
    │   │   ├── Layout/           # App layout
    │   │   │   └── Layout.tsx
    │   │   ├── Winners/          # Winners page
    │   │   │   └── WinnersPage.tsx
    │   │   └── shared/           # Reusable components
    │   │       └── CustomPagination.tsx
    │   │
    │   ├── Store/                # Redux Store
    │   │   ├── index.ts          # Store configuration
    │   │   ├── garageSlice.ts    # Cars state management
    │   │   └── winnersSlice.ts   # Winners state management
    │   │
    │   ├── Styles/               # Styling
    │   │   ├── neon.css          # Cyberpunk CSS animations
    │   │   └── theme.ts          # Material-UI theme
    │   │
    │   ├── Utils/                # Utilities
    │   │   ├── carGenerator.ts   # Car name/color generation
    │   │   └── constants.ts      # App constants
    │   │
    │   ├── App.tsx               # Main App component
    │   └── index.tsx             # Application entry point
    │
    ├── package.json              # Dependencies
    └── tsconfig.json             # TypeScript configuration
```

##  API Documentation

## Base URL
`http://localhost:3000`

##  Styling & Theme

### Cyberpunk Color Palette
- **Primary Cyan**: `#00ffff` - Main UI elements
- **Secondary Pink**: `#ff00ff` - Highlights and accents  
- **Dark Navy**: `#0f0f23` - Background
- **Neon Green**: `#00ff00` - Success states
- **Orange**: `#ff6600` - Warning states

### CSS Features
- **Neon Effects**: Glowing borders and text shadows
- **Smooth Animations**: CSS transitions and keyframes
- **Responsive Grid**: Flexible layouts for all screen sizes
- **Custom Components**: Material-UI theme overrides

### Typography
- **Primary Font**: Orbitron (futuristic)
- **Fallback**: Roboto Mono, monospace

##  Development

### Available Scripts
```bash
npm start          
npm build         
npm test           
npm eject        

```

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code linting rules
- **Prettier**: Code formatting (recommended)

##  Deployment

### Frontend (Netlify/Vercel)
```bash
cd async-race-ui
npm run build

```
### Environment Variables
```bash
# Frontend
REACT_APP_API_URL='http://localhost:3000'

# Backend  
PORT=3000
NODE_ENV=production
```

### Common Issues

**CORS Errors**
- Ensure API server is running on port 3000
- Check CORS configuration in API index.js

##  Acknowledgments

- Material-UI for excellent components
- Framer Motion for smooth animations
- Create React App for build tooling
- JSON Server for rapid API prototyping
- EPAM for backend server and opportunity

---
