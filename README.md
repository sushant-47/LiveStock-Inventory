# Catalog

https://sushant-47.github.io/LiveStock-Inventory

Created using:
- Angular v20.3.9
- Angular CDK v20.2.10
- Rxjs v7.8.2
- Typescript v5.9.3
- Angular CLI v20.3.8

Best viewed on Laptop, Desktop with minimum resolution 1366 x 768 using Chrome, Edge latest version.

View [**DEVELOPMENT.md**](./DEVELOPMENT.md) file for Design choice, Approach followed and libraries used for Catalog development.

## Installation
Install Project dependencies using:
- node v24.11.0
- npm v11.6.1

## Development server
To start a local development server, run:

```bash
nvm use # cd into project directory
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

> `data` folder contains mock data for backend.

## Testing
Install `@nx/jest` plugin for testing:
- npm x -- nx add @nx/jest
- npm x -- nx g @nx/jest:configuration --project=<project-name>

Add `moduleNameMapper` for tsconfig paths in `jest.config.ts`.

To run all tests in nx workspace, execute command:

```bash
npm test
```


## Deploy to Github Pages
1. Build application in production mode:
```bash
ng build --output-path docs --base-href /LiveStock-Inventory/
```
2. Publish using `/docs` as root.
3. Move all files from `/docs/browser/` to `/docs/`.
