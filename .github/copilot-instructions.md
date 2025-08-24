<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# GameScope Project Instructions

## Project Overview
GameScope is a React web application for discovering video games using the RAWG Video Games Database API. The project uses React with functional components, React Router for navigation, TailwindCSS for styling, and Axios for API calls.

## Key Features Implemented
- ✅ React with functional components and React Router for navigation
- ✅ Global layout with dark mode toggle
- ✅ Responsive UI (desktop + mobile)
- ✅ Home page with search functionality
- ✅ Game cards displaying cover, title, release year, rating, platforms
- ✅ Pagination for loading more games
- ✅ Game details page (/game/:id) with full information
- ✅ Components: SearchBar, GameCard, GameList, GameDetails, Pagination, DarkModeToggle
- ✅ TailwindCSS styling with dark theme by default
- ✅ Loading states and error handling

## Development Guidelines
- Use functional components with React hooks
- Follow React Router patterns for navigation
- Utilize TailwindCSS classes for all styling
- Implement proper error handling and loading states
- Maintain responsive design principles
- Use the established component structure

## API Integration
- RAWG Video Games Database API is configured in `src/services/gameAPI.js`
- Users need to obtain their own API key from rawg.io
- API endpoints include game search, popular games, game details, screenshots, and trailers

## File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── services/      # API service layer
├── App.jsx        # Main application component
├── main.jsx       # Application entry point
└── index.css      # Global styles with Tailwind directives
```

## Next Steps for Enhancement
- Add more game filtering options (by genre, platform, rating)
- Implement user favorites/wishlist functionality
- Add infinite scroll as alternative to pagination
- Enhance error handling with retry mechanisms
- Add loading skeletons for better UX
- Implement game comparison features
