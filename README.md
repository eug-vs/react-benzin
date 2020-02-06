<p align="center"><img src="src/assets/icon.svg" /></p>
<h1 align="center"> BENZIN </h1>
 
[React](https://reactjs.org/) Material components library. It supplies you with cool pre-defined style, while assuring that your project will follow all [Material Design guidelines](https://material.io/).

[![](https://img.shields.io/github/v/release/eug-vs/react-benzin)](https://github.com/eug-vs/react-benzin/releases)
[![](https://img.shields.io/circleci/build/github/eug-vs/react-benzin)](https://github.com/eug-vs/react-benzin/commits/develop)
[![](https://img.shields.io/david/eug-vs/react-benzin)](https://github.com/eug-vs/react-benzin/network/dependencies)
[![](https://img.shields.io/github/languages/code-size/eug-vs/react-benzin)](https://github.com/eug-vs/react-benzin/releases)
[![](https://img.shields.io/npm/l/react-benzin)](https://github.com/eug-vs/react-benzin/blob/develop/LICENSE.md)


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

## Building
We've decided to use `Typescript compiler` to transpile our code, since we think `Babel` is a bit of an overkill here.
```bash
$ npm run build
``` 
This command will generate `dist/` folder ready for distribution, which you of course can explore. Note that `tsc` creates type definitions (`.d.ts`) for every corresponding `.js` file. It's very useful because consumers also get access to them.

## Deploying
Deploying to `npm` is fully automated through **CircleCI**: simply tag a commit as a Release and it will do the job.
