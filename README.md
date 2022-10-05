# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Live Site](#live-site)
- [Getting Started With Create React App](#getting-started-with-create-react-app)
  - [npm install create-react-app my-app](#npm-install-create-react-app-my-app)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Live Site

You can see the web application live by visiting [here](https://ip-address-web-tracker.netlify.app)

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm install create-react-app my-app`
You run the above in your code editor's terminal after cloning this repo from GitHub. Before running the above, ensure you mount the parent directory of this repo so that react can successfully install in the right directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![](https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_900,f_auto/Screenshots/klbglgt05epjnfjr0drt.jpg)

### Links

- Solution URL: [IP Address Web Tracker](https://www.frontendmentor.io/solutions/ip-address-tracker-built-with-react-ajWB03HpMn)
- Live Site URL: [IP Address Web Tracker](https://ip-address-web-tracker.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) - JS library  
- [IP-API](https://ip-api.com/) - An IP Address Tracker API
- [IP GeoLocation](https://app.ipgeolocation.io/) - An IP Address Tracker API
- [Leaflet JS](https://leafletjs.com/reference.html) - an open-source JavaScript library
for mobile-friendly interactive maps

### What I learned
```css
/*Importing CSS files to the App.css file in React*/
    @import "MapHook.css"
```
```js
/*Inserting a desired character or string in-between a string...in this case ";"*/
      let timeZone;
      let tempTimeZone = data.time_zone.current_time.slice(-5);
      timeZone = [tempTimeZone.slice(0, 3), ":", tempTimeZone.slice(3)].join('');
```
```
      Making and creating a "_redirects" file to help solve the issue of serving http content over a https which eventually throws a CORBS error. 
      This is only applicable to netlify
      
      - Place the _redirects file in the root of the whole application folder or public folder if you are using React.
      - In the _redirects file, write, 
      "/api/* http://addressofapi.com/json/:splat 200!"
      - In the fetch function or function handling the api calling, replace the "http://addressofapi.com/json" with "api"..which was the name given in the _redirects file..it can be any name by the way..not necessarily "api".
```
```js
    /*The use of Regex (Regular Expressions) in loops or control flow statements such as "if" as conditions*/
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(tempvalue)){ 
        //Regex for validating IP addresses
        lookForValidIPAddress(`&ip=${tempvalue}`);
    } else if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(tempvalue)) { 
        //Regex for validating Domain names 
        lookForValidDomain(tempvalue);
    } else {
        alert('Invalid Email Address or Domain Name');
    }
```

## Author

- Website - [Okoli Akachukwu](https://www.linkedin.com/in/okoli-akachukwu-6b321b178/)
- Frontend Mentor - [@CodeDeveloper19](https://www.frontendmentor.io/profile/CodeDeveloper19)

