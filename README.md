<p align="center"> <img src="src/assets/logo.png" /> </p>

**BENZIN** is a powerful React Material components library. It supplies you with cool pre-defined style, while assuring that your project will follow all [Material Design guidelines](https://material.io/).


# Getting started
## Installation
You can easily add **BENZIN** to your project with `npm`:
```bash
$ npm install react-benzin
```
**BENZIN** works best in kick-starting new projects and allows you to focus on the functionality, while all the beauty will be maintained by our library.

**TIP:** *Create-React-App with Typescript* is your GO-TO in most of the cases. [Learn more.](https://create-react-app.dev/docs/adding-typescript/)

You can find a minimal usage example [here](src/index.tsx).

## Functionality
**BENZIN** provides you with a bunch of cool components that greatly integrate with each other. 

[Explore](src/lib) `src/lib/` folder to see what's available. Documentation is yet to come, but for now you can enjoy type definitons.

[Chrono-Cube](https://github.com/eug-vs/chrono-cube/) will also be a great example of usage, since it's the actual project which inspired us to create **BENZIN**.
 
 
# Explore NPM package online
https://www.npmjs.com/package/react-benzin 


# Development
## Running live demo
To run a live example, clone a repo and execute following commands:
```bash
$ npm i
$ npm start
```
It's worth noticing that presence of React-App in this repo forces us to split some configurations. For example, we have 2 `Typescript` configs: one for `react-scripts` to run live-demo, and the other one to build *distribution files*.

## Running tests
```bash
$ npm test
```
**NOTE**: this command assures that `ESlint` does not throw any warnings and exits with a *non-zero status code* otherwise. That means `CircleCI` tests would fail *even if a single warning is present*. Therefore, you should always locally test your changes before publishing them.

