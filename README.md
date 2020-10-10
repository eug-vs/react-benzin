<p align="center"><img src="src/assets/icon.svg" /></p>
<h1 align="center"> BENZIN </h1>

<p align="center">
 <a href="https://reactjs.org/">React</a> <a href="https://material-ui.com/">Material</a> library for content-display featuring Markdown rendering.
</p>
<p align="center">
 <img src="https://img.shields.io/npm/v/react-benzin?logo=npm" />
 <img src="https://img.shields.io/circleci/build/github/eug-vs/react-benzin?logo=circleci" />
 <img src="https://img.shields.io/david/eug-vs/react-benzin" />
 <img src="https://img.shields.io/github/languages/code-size/eug-vs/react-benzin" />
 <img src="https://img.shields.io/npm/l/react-benzin" />
</p>

# Getting started
## Installation
You can easily add **BENZIN** to your project with `npm`:
```bash
$ npm install react-benzin
```
**TIP:** **BENZIN** is designed to work in Material-UI environment, so it's best to use them together:
```bash
$ npm @material-ui/core
```

![Preview screenshot](https://user-images.githubusercontent.com/51545008/95653266-209d0900-0b00-11eb-9a0a-f3aa81c878e5.png)

You can find a minimal usage example [here](src/index.tsx).

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
Publishing to `npm` is fully automated through **CircleCI** - package is deployed on every push into `master`. Therefore only release *PR*'s should be merged into `master` branch.

Deploying to `gh-pages` is automatically performed on every commit into `develop` branch.
