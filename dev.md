# Dev docs

Info on how to build the SDK and run the samples

## Pre-reqs

- [Node v6 or above](https://nodejs.org/en/)
    - Recommend using Node 8 LTS
    - Recommend using a Node version manager ([nvm-windows](https://github.com/coreybutler/nvm-windows/releases), [nvm (mac/linux)](https://github.com/creationix/nvm/), [n (mac/linux)](https://github.com/tj/n)) 
- npm (comes with Node)(all tooling is done via npm scripts)
- All OS's should be supported (but only tested on Windows so far)(Requires a Cosmos Emulator running on a Windows container on your machine or local network)
- (Recommended) [VS Code](https://code.visualstudio.com/)
- Cosmos DB (Azure or Local Emulator) (emulator only works on Windows, right now, so mac/linux needs a cloud instance)

## Building the SDK

1. Install dependencies `npm i`
2. Build library `npm run build`

## Testing the SDK

Only a subset of tests are working at the moment (due to API changes, theoretically 😉).

1. Build the SDK (see above)
2. Run all tests `npm run test`

You can also run the tests via VS Code. There should already be a launch.json for launching the mocha tests. You can modify the `-g` setting to run a specific test. (aka change `.*` to `validate database CRUD` or whatever your test cases are called)

# Samples

Build the SDK and make sure the tests run before you try any samples (they depend on the SDK)

- [TodoApp](./samples/TodoApp)

We recommend using [VS code's multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces) for testing the samples, especially if you're using the samples to test the SDK. There is a `launch.json` for the samples thave have been updated and multi-root workspaces will show all `launch.json`s.