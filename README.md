# Weekly Meal Planner

> ⚠️ **Note:** This is incomplete work and is no longer under active development.

A web application for managing recipes and meal planning built with Node.js, Express, and MongoDB.

## Features

- **Recipe Management**: Create, view, edit, and delete recipes
- **Recipe Organization**: Organize recipes by course (Antipasto, Primo, Secondo, Contorno, Dessert) and category (Pollo, Carne, Pesce)
- **Recipe Details**: Track ingredients, instructions, servings, and related recipes
- **Web Interface**: Bootstrap-powered responsive UI with carousel navigation

## Technology Stack

- **Backend**: Node.js with Express framework
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: Pug (formerly Jade)
- **Frontend**: Bootstrap 4, jQuery, Font Awesome icons
- **Validation**: express-validator for form validation
- **Development**: Nodemon, Browser-sync for live reloading

## Project Structure

```
├── app.js                     # Main application setup
├── bin/www                    # Server startup script
├── controllers/
│   └── recipeController.js    # Recipe CRUD operations
├── models/
│   ├── recipe.js             # Recipe schema
│   └── week.js               # Week model (unused)
├── routes/
│   ├── index.js              # Home route
│   └── recipes.js            # Recipe routes
├── views/                    # Pug templates
├── public/                   # Static assets
└── package.json              # Dependencies and scripts
```

## Database Schema

### Recipe Model
- `name`: Recipe name (required, unique)
- `servings`: Number of servings
- `course`: Course type (Antipasto, Primo, Secondo, Contorno, Dessert)
- `category`: Food category (Pollo, Carne, Pesce)
- `servedWith`: Array of related recipe references
- `ingredients`: Array of ingredient strings
- `instructions`: Cooking instructions

## Available Scripts

- `npm start` - Start the production server
- `npm run debug` - Start development server with nodemon and browser-sync
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix

## Routes

- `GET /` - Home page
- `GET /recipes` - List all recipes grouped by course
- `GET /recipe/create` - Recipe creation form
- `POST /recipe/create` - Create new recipe
- `GET /recipe/:id` - View recipe details
- `GET /recipe/:id/update` - Recipe edit form
- `POST /recipe/:id/update` - Update recipe
- `POST /recipe/:id/delete` - Delete recipe

## Development Setup

1. Install dependencies: `npm install`
2. Configure MongoDB connection in `app.js`
3. Start development server: `npm run debug`
4. Access application at `http://localhost:3001` (browser-sync proxy)

## Notes

- The application connects to a hardcoded MongoDB Atlas connection string
- Italian language is used for course and category names
- Form validation includes duplicate name checking and required field validation
- The UI features a carousel-based navigation for browsing recipes by course

---

*This project was built as a learning exercise and remains in an incomplete state.*