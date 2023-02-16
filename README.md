# Autocomplete frontend test

### Non-Functional Requirements
- You cannot use any 3rd party libraries - only pure React and internal DOM functions.
- You should use typescript and write proper interfaces and types.
- It should have basic working CSS. No need for anything fancy (such as drop-shadows etc), but should look decent.
- No external state management libraries, only native React method.
- Use only functional component with hooks.
- The function to filter the data should be asynchronous. You can use mock data (such as a JSON array), but the function which uses it should be asynchronous (similar to a real REST call).

### Functional Requirements
- Highlight the matching part of the text, in addition to showing it.
- Load data using a real API call to some resource.
- You need to handle all non-standard/edge use-cases - it should have a perfect user-experience.

### Application structure
- `pages` 
  - `api` 
    - `top-albums.tsx` - Next.js server-side API route.
    - `top-albums.json` - Mock data JSON array.
  - `index.tsx` - Next.js entrypoint page.
- `styles`
  - `autocomplete.css` - Autocomplete CSS Stylesheet.
- `lib`
  - `Demo` - React function component that demonstrates the autocomplete interface.
  - `Autocomplete` - React function component with the autocomplete implementation.

I chose Next.js mainly for its JavaScript bundling mechanism and for the quicker setup it provides for this test.

### Running the app
- Clone this repo
- `npm install` to install all dependencies
- `npm run dev` to start the local server

The app should now be up and running at http://localhost:3000 🚀