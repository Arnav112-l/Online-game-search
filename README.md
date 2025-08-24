# GameScope

A modern React web application for discovering video games using the RAWG Video Games Database API.

## Features

- **Search Games**: Find games by name with real-time search
- **Game Discovery**: Browse popular and trending games
- **Game Details**: View comprehensive information including:
  - Full descriptions
  - Screenshots gallery
  - Game trailers
  - Genres and platforms
  - Release dates and ratings
  - Developer and publisher info
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Pagination**: Navigate through large sets of game results

## Tech Stack

- **React** - Frontend framework with functional components
- **React Router** - Navigation and routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- RAWG API Key (get one at [rawg.io](https://rawg.io/apidocs))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gamescope
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API Key:
   - Open `src/services/gameAPI.js`
   - Replace `YOUR_RAWG_API_KEY` with your actual RAWG API key

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Configuration

To use the RAWG API, you need to:

1. Visit [RAWG API Documentation](https://rawg.io/apidocs)
2. Sign up for a free account
3. Get your API key
4. Update the `API_KEY` constant in `src/services/gameAPI.js`

## Project Structure

```
src/
├── components/
│   ├── DarkModeToggle.jsx    # Theme toggle component
│   ├── GameCard.jsx          # Individual game card
│   ├── GameList.jsx          # Grid of game cards
│   ├── Header.jsx            # App header with navigation
│   ├── Pagination.jsx        # Page navigation
│   └── SearchBar.jsx         # Search input component
├── pages/
│   ├── Home.jsx              # Main page with search and games
│   └── GameDetails.jsx       # Individual game details page
├── services/
│   └── gameAPI.js            # API service layer
├── App.jsx                   # Main app component
├── main.jsx                  # App entry point
└── index.css                 # Global styles with Tailwind
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
