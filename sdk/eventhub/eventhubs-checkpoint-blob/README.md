## Template for Azure Node Libraries

This template serves as a starting point for JavaScript libraries targeting both Node and the Browser and implemented in TypeScript.

## Building the Template

Once you clone this template, you can build the package with the following commands:

```sh
npm install
npm run build
```

Run tests via:

```sh
npm test
```

## Implementation Details

The overall build pipeline looks like the following:

1. TypeScript builds all source files under `./src` to ECMAScript Modules (ESM) under `./dist-esm`
2. Rollup builds `./dist-esm` to an optimized single file at `./dist/index.js` as the Node entry point.
3. Rollup builds `./dist-esm` to an optimized browser bundle under `./browser/index.js`.

Tests follow a similar pipeline, however output folders have the `test-` prefix.


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/template/template/README.png)
