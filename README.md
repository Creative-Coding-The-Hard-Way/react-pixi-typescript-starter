# React+p5.js Typescript Browser Starter

An opinionated starter project for using typescript, react, and p5.js in the
browser.

To get started use this repository as a template, run `npm run develop`, and
make your changes in [./src/sketch.ts](./src/sketch.ts)

## TODO

1. update `package.json` and replace the `publicURL` with the name of
   your repository
2. update the project name in `package.json`
3. update the github url in `package.json`

## Commands

- `npm run develop`
  - start an interactive server which live-reloads changes
- `npm run build`
  - run the production build
- `npm run check`
  - run the typescript compiler to check types in the project

## Directory Structure Overview

- `./src` - The main TS application. This is the index, the app, any css
  modules, etc. This is where you should put your code when building something
  new.
- `./lib` - Is the P5+React wrapper logic. This defines the `Sketch` component
  and the `P5Sketch` abstract class which can be overridden to interact with
  the P5 sketch.
- `./site` - The root html and css for the site. This also includes site
  metadata like the favicon and manifest.

## Tools

- p5.js
- react
- valtio
- Parcel
- Typescript
- eslint
- prettier
- husky
