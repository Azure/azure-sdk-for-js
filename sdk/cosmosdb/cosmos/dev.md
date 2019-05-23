# Dev docs

```bash
# Info on how to build the SDK and run the samples

npm i          # install dependencies and tools
npm run build  # builds the project
npm run test   # runs the tests

# see below prereqs, more commands, and config options
```

## Pre-reqs

- [Node v6 or above](https://nodejs.org/en/)
  - Recommend using Node 8 LTS
  - Recommend using a Node version manager ([nvm-windows](https://github.com/coreybutler/nvm-windows/releases), [nvm (mac/linux)](https://github.com/creationix/nvm/), [n (mac/linux)](https://github.com/tj/n))
- npm (comes with Node)(all tooling is done via npm scripts)
- All OS's should be supported (emulator only runs on windows)
- (Recommended) [VS Code](https://code.visualstudio.com/)
- Cosmos DB (Azure or Local Emulator) (emulator only works on Windows, right now, so mac/linux needs a cloud instance)

## Available commands

```
Lifecycle scripts included in @azure/cosmos:
  test
    mocha -r ./src/test/common/setup.ts ./lib/test/ --recursive --timeout 100000 -i -g .*ignore.js

available via `npm run-script`:
  clean
    rimraf lib
  lint
    tslint --project tsconfig.json
  format
    prettier --write --config .prettierrc.json "src/**/*.ts"
  check-format
    prettier --list-different --config .prettierrc.json "src/**/*.ts"
  compile
    echo Using TypeScript && tsc --version && tsc --pretty
  compile-prod
    echo Using TypeScript && tsc --version && tsc -p tsconfig.prod.json --pretty
  docs
    typedoc --excludePrivate --exclude "**/test/**" --mode file --out ./lib/docs ./src
  pack
    webpack -d
  pack-prod
    webpack -p
  build
    npm run clean && npm run check-format && npm run lint && npm run compile && npm run docs && npm run pack
  build-prod
    npm run clean && npm run check-format && npm run lint && npm run compile-prod && npm run docs && npm run pack-prod
  test-ts
    mocha -r ts-node/register -r ./src/test/common/setup.ts ./src/test/**/*.spec.ts --recursive --timeout 100000 -i -g .*ignore.js
  test-browser
    karma start ./karma.config.js --single-run
```

## Building the SDK

1. Install dependencies `npm i`
2. Build library `npm run build`

## Testing the SDK

1. Build the SDK (see above)
2. Run all tests `npm run test`

The above assumes you have the local emulator installed. If you need to use a remote endpoint, check out the `ACCOUNT_HOST` and `ACCOUNT_KEY` below.

### Test config

Extra environment variables you can use:

- `MOCHA_TIMEOUT`: time in milliseconds before timeout (default is different per test, mostly 10-20 seconds). Useful to set to 999999 during debugging.
- `ACCOUNT_HOST`: account endpoint for testing (default is the emulator running on localhost:8081
- `ACCOUNT_KEY`: masterkey for testing (default is the emulators default key)
- `TESTS_MULTIREGION`: enables tests that require a multi-region write enabled database account with at least two regions, and disables tests that won't work with multi-region write enabled.

## VS Code

You can also run the tests via VS Code. There should already be a launch.json for launching the mocha tests. You can modify the `-g` setting to run a specific test. (aka change `.*` to `.*validate database CRUD.*` or whatever your test cases are called)

You can also build via the configured tasks (`build` does a full build, and `compile` just does a typescript compile with no linting, formatting, etc.)

# Samples

Build the SDK and make sure the tests run before you try any samples (they depend on the SDK)

- [TodoApp](./samples/TodoApp)

We recommend using [VS code's multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces) for testing the samples, especially if you're using the samples to test the SDK. There is a `launch.json` for the samples thave have been updated and multi-root workspaces will show all `launch.json`s.
