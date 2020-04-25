# BS Trivia

[![Netlify Status](https://api.netlify.com/api/v1/badges/5236bbb6-5439-4ffa-8c8f-62996823c0d9/deploy-status)](https://app.netlify.com/sites/priceless-poincare-e3ed14/deploys)

Yet another simple trivia game made by [BS](https://berksevgi95.github.io/me/) and bootstrapped by [Create React App](https://github.com/facebook/create-react-app).

[Click](https://priceless-poincare-e3ed14.netlify.app/) to check demo

## Get Started

Before running the application, node dependencies should be installed with:
```
yarn install
```
To start application, run:
```
yarn start
```
To build and obtain ready-to-use deploy of the project, run:
```
yarn build
```
To test the project, run: 
```
yarn test
```
To show test coverage of the project, run:
```
yarn test --coverage  --watchAll=false
```

## Introduction

BS Trivia is a simple web application which provides perfect trivia game experience with its simplicity. All you have to do is press "Start" button and enjoy it!

## Features

<ul>
    <li>Customizable question querying</li>
    <li>Responsive design</li>
    <li>Cross browser testing via BrowserStack (Microsoft Internet Explorer 11, Microsoft Edge 80, Mozilla Firefox 74, Google Chrome 80, Apple Safari 13)</li>
</ul>

## Technical Overview

BS Trivia has simple backend operations, it basically fetches questions from [Open Trivia Database](https://opentdb.com/) API, shows them and evaluate with respect to its basic rules.

### Dependencies

Dependencies used in this project for operational purposes are listed below:

<ul>
    <li><b>react@16.13.1</b> A JavaScript library for building user interfaces</li>
    <li><b>react-dom@16.13.1</b> Provides DOM-specific methods that can be used at the top level of React app</li>
    <li><b>react-router-dom@5.1.2</b> Declarative routing library for React</li>
    <li><b>axios@0.19.2</b> Promise based HTTP client for the browser and node.js</li>
    <li><b>enzyme@3.11.0</b> JavaScript Testing utility for React that makes it easier to test React Components' output.</li>
    <li><b>jest-canvas-mock@2.2.0</b> Canvas mocking when run unit test cases with jest.</li>
    <li><b>node-sass@4.13.1</b> A library that provides binding for Node.js to LibSass</li>
    <li><b>react-lottie@1.2.3</b> Lottie animation view for React</li>
    <li><b>react-absolute-selector@1.0.1</b> A fixed-positioned, globally accessible, movable and minimal selector component written by <a href="https://github.com/berksevgi95">@berksevgi95</a> (yeah, it's me)</li>
</ul>

Additionally, I also included a library of components called "bs-ui" that is not yet ready to serve on npm. Repo link is [here](https://github.com/berksevgi95/bs-ui)

### Folder Layout

Folder layout of the whole project is structured with principles of [this](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1) article.

### Application Layout
Application consist of 3 fundamental views: Welcome, Questions and Result. These 3 views wrapped with `<Route />` DOM in `App.js` to make them rendered based on [single page concepts](https://dzone.com/articles/how-single-page-web-applications-actually-work).

```
<Router>
    <Switch>
        <Route path="/welcome">
            <WelcomeView />
        </Route>
        <Route path="/questions">
            <QuestionsView />
        </Route>
        <Route path="/result">
            <ResultView />
        </Route>
        <Route exact path="/">
            <Redirect to="/welcome" />
        </Route>
    </Switch>
</Router>
```

#### WelcomeView
Simple 'Welcome' screen of the application which is responsible for redirecting questions screen

#### QuestionsView
Main component of the application, displays questions & answers and manages remaining time & question joker. There are 3 steps to be respectively executed by QuestionsView within whole lifecycle:

<ul>
    <li>Fetches questions from the Open Trivia API. If any problem occured or fetched empty question array, displays error message</li>
    <li>Starts the timer and shows related question</li>
    <li>If user chooses the correct answer, then it will show "correct answer" content, if not, then it will show "false answer" content</li>
</ul>

These logics are provided with React Hooks, each mechanism (timer, questions, etc.) are kept in `useState` method of React context API as shown in code.

In addition to provide question mechanisms, there is one extra component which called as `Question` defined to the application to manage each question itself. `Question` takes question object that come from `QuestionView` state, states correct and incorrect answers and shuffle them into an array, then renders with proper UI.

Question <b>jokers</b> are also executed in `Question` component with using React `ref` element. A simple `useImperativeHandle` method which helps to create context that can be publicly accesible with React `ref`'s is defined in the component. Joker mechanism is provided by passing a `ref` element to a `Question` component, the `ref` will access the `joker()` method of `Question` component and runs it, and finally joker is became used.

#### ResultsView
`ResultsView` is used for displaying result which contains points and success of the previous question session. 

### Test Coverage

As of now, the application has the following test coverage percentage rates:


File                      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------------------|----------|----------|----------|----------|-------------------|
All files                 |    76.19 |    71.67 |    80.43 |    75.35 |                   |
 components/button        |      100 |      100 |      100 |      100 |                   |
  Button.tsx              |      100 |      100 |      100 |      100 |                   |
 components/modal         |      100 |      100 |      100 |      100 |                   |
  Modal.tsx               |      100 |      100 |      100 |      100 |                   |
 components/radiobutton   |      100 |      100 |      100 |      100 |                   |
  Radiobutton.tsx         |      100 |      100 |      100 |      100 |                   |
 components/select        |      100 |      100 |      100 |      100 |                   |
  Select.tsx              |      100 |      100 |      100 |      100 |                   |
 models                   |      100 |      100 |      100 |      100 |                   |
  ECategory.ts            |      100 |      100 |      100 |      100 |                   |
  EDifficulty.ts          |        0 |        0 |        0 |        0 |                   |
  IQuestion.ts            |        0 |        0 |        0 |        0 |                   |
 utils                    |      100 |      100 |      100 |      100 |                   |
  shuffle.ts              |      100 |      100 |      100 |      100 |                   |
 views                    |      100 |      100 |      100 |      100 |                   |
  App.tsx                 |      100 |      100 |      100 |      100 |                   |
 views/questions          |    53.33 |    52.94 |       50 |    53.33 |                   |
  QuestionsView.tsx       |    53.33 |    52.94 |       50 |    53.33 |... 25,226,227,255 |
 views/questions/question |      100 |     87.5 |      100 |      100 |                   |
  Question.tsx            |      100 |     87.5 |      100 |      100 |                28 |
 views/result             |      100 |      100 |      100 |      100 |                   |
  ResultView.tsx          |      100 |      100 |      100 |      100 |                   |
 views/welcome            |      100 |      100 |      100 |      100 |                   |
  WelcomeView.tsx         |      100 |      100 |      100 |      100 |                   |


## Reviews

### How did I decide on the technical and architectural choices used as part of my solution?

My concerns such as providing maintainability, reliability and simplicity, trying to apply modern software development trends like KISS, DRY, etc. made me design this architecture, but most importantly, this implementation is based on Single Responsibility princible which states that every module or class should have responsibility for a single part of the functionality provided by the software and that responsibility should be entirely encapsulated by the class.

### Are there any improvements I could make to my submission?

Like every software, definitely yes. First of all, I would try to make the app dockerized and deploy it to a simple CI/CD pipeline to automized development cycle.

### What would I do differently if I had more time?

If I had more time,I would start to deploy my "bs-ui" component library to npm with full code coverage scoring status and import it to this application.

In addition, I would fix the "prop-type" error for my component `react-absolute-selector` and make it more optimized for mobile screens.
