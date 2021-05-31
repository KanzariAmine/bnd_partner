# BND Partner

## Technologies Used
- React JS
- Node JS
- MongoDB
- Redis
- JWT

## Installation

#### Step 1: Clone the repo

```sh
$ git clone https://github.com/KanzariAmine/bnd_partner.git
```
#### Step 2: Install the dependencies

```sh
$ npm install
```

#### Step 3: Generate ACCESS_TOKEN_SECRET and  REFRESH_TOKEN_SECRET for JWT

```sh
$ node ./helpers/generate_keys.js
```
#### Step 4: Run Redis Server (Linux Ubuntu)

```sh
$ redis-server
```

#### Step 5: Run backend and frontend

```sh
$ bnd_partners/backend
$ yarn dev
