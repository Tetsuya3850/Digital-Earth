A portfolio template written by React and Node/Express. <br />
https://portfolioreact.herokuapp.com/ <br />
(Since app is deployed to heroku as free plan, initial load is REALLY SLOW...)

## Features

* Basic portfolio design <br />
  Top page includes sections for logo, title, main image, list of projects. <br />
  Projects are linked to project page for further information.

* Minimal Content Management System with Node API server <br />
  By filling out necessary information at /add, you could add new projects without writing any code. <br />
  The form includes minimal validation function as well.

* Scalable architecture <br />
  Even when the number of projects scale up, the app looks fine. <br />
  The top page shows only 3 projects first and loads 6 more every time "load more" button is clicked. <br />
  Also, project page randomly displays 2 other projects for further discovery.

## Set Up
This project contains a Node API server and a React app generated with create-react-app under `client/`.

To run, first install dependencies for both:

```
$ npm i && cd client && npm i && cd ..
```

Then boot both the server and the client:

```
$ npm start
```

## To Do
  1. Enrich CMS function <br />
     For the time being, only 'add' is implemented. <br />
     Functions such as 'edit' and 'delete' should be implemented.

  2. Strengthen form validation <br />
     URL validation is the first to work on. <br />
     Also, improve the regex for producing url so that unexpected errors don't occur.

  3. Relearn React Router from basics <br />
     When back button is used to return to the top page, project links do not show. <br />
     Same issue when the home button is used. This is temporally solved by adding reload function.
