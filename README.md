# simple-test-nd

Simple test with Playwright + Typescript

## Table of contents

- [Technologies](#technologies)
- [Setup](#setup)

## Technologies

Project is created with:

- Node version: 22.7.4,
- Typescript version: 5.5.4,
- Playwright version: 1.47.2,
- ts-node version: 10.9.2,
- typescript-eslint version: 8.7.0,
- dotenv version: 16.4.5

## Setup

To run this project you will need 'npm' + 'node' installed on your device.

1. Install project dependencies, by running this command in project root directory:

```
npm i
```

2. Create test.env file in project config directory. That file should contain: email, password and baseUrl

```
EMAIL=
PASSWORD=
BASE_URL=
```

3. Build project by executing command in terminal:

```
npm run build
```

4. To run test, execute command in terminal:

```
npm run test
```
