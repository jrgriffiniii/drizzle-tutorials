# Drizzle Tutorials

[![CircleCI](https://circleci.com/gh/jrgriffiniii/drizzle-tutorials/tree/main.svg?style=svg)](https://circleci.com/gh/jrgriffiniii/drizzle-tutorials/tree/main)

A set of Ethereum dApp tutorials implemented using Solidity and the Drizzle Suite.

## Requirements

- Node.js (14.17.4 or the latest LTS Fermium release)
- Yarn (1.22.11 or the latest 1.22.z release)

## Development

### Installing the Dependencies

```bash
$ yarn install
```

### Initializing the Test Network

```bash
$ yarn run ganache-cli
```

### Deploying the Smart Contracts

```bash
$ yarn migrate
```

## Deploying the dApp

First, please change to the dApp directory:

```bash
$ cd app
```

Once prepared, one may then proceed to deploying the [dApp](./app/README.md).

## Development

### Linting the Source Code Files

```bash
$ yarn lint
```

### Executing the Test Suites

```bash
$ yarn test
```
