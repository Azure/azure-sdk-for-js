# Bundling Azure SDK libraries for a browser

To use Azure SDK libraries on a website, you need to convert your code to work inside the browser. You do this using a tool called a **bundler**. This process takes JavaScript code written using [Node.js](https://nodejs.org/) conventions and converts it into a format that is understood by browsers.

This document will walk you through the steps required to bundle Azure SDK libraries for your website.

## Install prerequisites

In order to install Azure SDK libraries, you will need to install Node.js and a bundler of your choice onto your development machine.

### Node.js

First, download and install Node.js from the official website: https://nodejs.org/en/

Once it is installed correctly, you will be able to use it with the `node` command on the command-line:

```
node --version
```

### NPM

The [Node Package Manager](https://npmjs.com) (npm) is included when you install Node. You can access it from the command-line, similar to Node:

```
npm --version
```

## Setting up your project

If you already have a project with a package.json file set up, skip to the next section. If not, first let's make a new directory for your project, and change into it.

```
mkdir example
cd example
```

Now let's [set up a package.json file](https://docs.npmjs.com/creating-a-package-json-file) to configure npm:

```
npm init -y
```

Follow the prompts and npm will generate a starter [package.json](https://docs.npmjs.com/files/package.json) for you.

Now we can install Azure SDK packages. The Azure SDK is composed of many separate packages. You can pick and choose which you need based on the services you intend to use.

For example, if you wish to use the Blob functionality provided by Azure's Storage service, you can install the `@azure/storage-blob` package:

```
npm install --save @azure/storage-blob
```

## Choosing a bundler

Below we show examples of using three popular bundlers: [Webpack](https://webpack.js.org), [Rollup](https://rollupjs.org/), and [Parcel](https://parceljs.org/). The JavaScript ecosystem has a number of other bundlers available as well. Any bundler will likely work well for your project, but each has its own strengths and weaknesses you may wish to consider. If you haven't picked a bundler yet, Webpack is the most commonly used option.

## Using Webpack

First, you need to install [webpack](https://webpack.js.org/) globally:

```
npm install -g webpack webpack-cli
```

Once this is done, you can use webpack by configuring your project in the way that webpack expects.

### Webpack with JavaScript

In order to use Azure SDK libraries inside JS, you need to import code from the package you installed earlier. By default, Webpack will look for a file named `index.js` inside of a `src` folder from where it is run. Create `src/index.js` with the following content:

```js
// src/index.js
const { BlobServiceClient } = require("@azure/storage-blob");
// Now do something interesting with BlobServiceClient :)
```

Now invoke webpack on the command-line:

```
webpack --mode=development
```

This will create a **bundled** version of your code along with the Azure SDK functionality your code depends on. It writes out the brower-compatible bundle to `dist/main.js` by default.

Now you can use this bundle inside an html page via a script tag:

```html
<script src="./dist/main.js"></script>
```

If you want to customize the name or location of your input file, the bundled files, or many other options that webpack provides, you can [create a webpack.config.js configuration file](https://webpack.js.org/concepts/configuration/#simple-configuration).

### Webpack with TypeScript

First, you need to install [TypeScript](https://typescriptlang.org) and a [Webpack loader](https://webpack.js.org/loaders/) for TypeScript:

```
npm install --save-dev typescript ts-loader
```

Now let's create a very basic [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file to configure TypeScript. If you've already configured TypeScript, you can skip this step. Save the following `tsconfig.json` file next to your `package.json` file you created earlier:

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "strict": true,
    "module": "es6",
    "moduleResolution": "node",
    "target": "es6"
  }
}
```

For more information on configuring TypeScript with Webpack, check out [Webpack's TypeScript guide](https://webpack.js.org/guides/typescript/).

Similar to our JS example above, let's create an `index.ts` file that imports from `@azure/storage-blob`:

```ts
// src/index.ts
import { BlobServiceClient } from "@azure/storage-blob";
// Now do something interesting with BlobServiceClient :)
```

The last step we need to perform before we can run `webpack` and produce bundled output is set up a basic `webpack.config.js` file:

```js
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

Now you can invoke webpack on the command-line:

```
webpack --mode=development
```

This will create a **bundled** version of your code plus the Azure SDK functionality that your code depends on and write it out to a `dist` subfolder inside a file named `bundle.js` (as configured in `webpack.config.js`.)

Now you can use this bundled output file inside an html page via a script tag:

```html
<script src="./dist/bundle.js"></script>
```

## Using Rollup

First, you need to install [rollup](https://rollupjs.org/) globally:

```
npm install -g rollup
```

Once this is done, you can use rollup by configuring your project in the way that rollup expects.

### Rollup with JavaScript

In order to use Azure SDK libraries inside JS, you need to import code from the package you installed earlier. Create `src/index.js` with the following content:

```js
// src/index.js
const { BlobServiceClient } = require("@azure/storage-blob");
// Now do something interesting with BlobServiceClient :)
```

Now we need to configure Rollup to take the above code and turn it into a bundle. Save the following `rollup.config.js` file next to your `package.json` file you created earlier:

```js
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import shim from "rollup-plugin-shim";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "main"
  },
  plugins: [
    shim({
      fs: `
      export function stat() { }
      export function createReadStream() { }
      export function createWriteStream() { }
    `,
      os: `
      export const type = 1;
      export const release = 1;
    `,
      util: `
        export function promisify() { }
    `
    }),
    resolve({
      preferBuiltins: false,
      mainFields: ["module", "browser"]
    }),
    cjs({
      namedExports: {
        events: ["EventEmitter"],
      }
    }),
    json()
  ]
};
```

The above configuration may need to change based on which SDK packages your code references. If you want to customize rollup's configuration file further, you can see [all supported options in their documentation](https://rollupjs.org/guide/en/#configuration-files).

We also need to install the plugins we referenced in the above file:

```
npm install --save-dev @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-json rollup-plugin-shim
```

Now that we have our config file and necessary plugins installed, we can run rollup:

```
rollup --config
```

This will create a **bundled** version of your code along with the Azure SDK functionality your code depends on. It writes out the brower-compatible bundle to `dist/bundle.js` as configured above.

Now you can use this bundle inside an html page via a script tag:

```html
<script src="./dist/bundle.js"></script>
```

### Rollup with TypeScript

First, you need to install [TypeScript](https://typescriptlang.org):

```
npm install --save-dev typescript
```

Now let's create a very basic [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file to configure TypeScript. If you've already configured TypeScript, you can skip this step. Save the following `tsconfig.json` file next to your `package.json` file you created earlier:

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "strict": true,
    "module": "es6",
    "moduleResolution": "node",
    "target": "es6"
  }
}
```

Similar to our JS example above, let's create an `index.ts` file that imports from `@azure/storage-blob`:

```ts
// src/index.ts
import { BlobServiceClient } from "@azure/storage-blob";
// Now do something interesting with BlobServiceClient :)
```

Now we need to configure Rollup to take the above code and turn it into a bundle. Save the following `rollup.config.js` file next to your `package.json` file you created earlier:

```js
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import shim from "rollup-plugin-shim";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "main"
  },
  plugins: [
    shim({
      fs: `
      export function stat() { }
      export function createReadStream() { }
      export function createWriteStream() { }
    `,
      os: `
      export const type = 1;
      export const release = 1;
    `,
      util: `
        export function promisify() { }
    `
    }),
    resolve({
      preferBuiltins: false,
      mainFields: ["module", "browser"]
    }),
    cjs({
      namedExports: {
        events: ["EventEmitter"]
      }
    }),
    json(),
    typescript()
  ]
};
```

The above configuration may need to change based on which SDK packages your code references. If you want to customize rollup's configuration file further, you can see [all supported options in their documentation](https://rollupjs.org/guide/en/#configuration-files).

We also need to install the plugins we referenced in the above file:

```
npm install --save-dev @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-json rollup-plugin-shim rollup-plugin-typescript2
```

Now that we have our config file and necessary plugins installed, we can run rollup:

```
rollup --config
```

This will create a **bundled** version of your code along with the Azure SDK functionality your code depends on. It writes out the brower-compatible bundle to `dist/bundle.js` as configured above.

Now you can use this bundled output file inside an html page via a script tag:

```html
<script src="./dist/bundle.js"></script>
```

## Using Parcel

First, you need to install [parcel](https://parceljs.org/) globally:

```
npm install -g parcel-bundler
```

Once this is done, you can use parcel by configuring your project in the way that parcel expects.

### Parcel with Javascript

Parcel uses [browserslist](https://github.com/browserslist/browserslist) to configure what polyfills are needed when bundling. Azure SDK libraries generally target the ES2015 version of JavaScript and use some modern features of JavaScript, including [generators](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*), so let's edit `package.json` to target the latest version of three popular browsers:

```json
"browserslist": [
    "last 1 Chrome version",
    "last 1 Firefox version",
    "last 1 Edge version"
  ],
```

In order to use Azure SDK libraries inside JS, you need to import code from the package you installed earlier.

To accomplish this, let's create two files, `index.js` and `index.html`:

```js
// index.js
const { BlobServiceClient } = require("@azure/storage-blob");
// Now do something interesting with BlobServiceClient :)
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

Now you can invoke parcel on the command-line:

```
parcel index.html
```

This will bundle your code and create a local development server for your page at `http://localhost:1234`. Changes you make to `index.js` will automatically get reflected on the dev server.

If you wish to bundle your page without using the local development server, you can do this by passing the `build` command:

```
parcel build index.html
```

This will emit a compiled version of `index.html`, as well as any included script files, to the `dist` directory.

### Parcel with TypeScript

Parcel uses [browserslist](https://github.com/browserslist/browserslist) to configure what polyfills are needed when bundling. The Azure SDK uses some modern features of JavaScript, including [async functions](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function), so let's edit `package.json` to target the latest version of three popular browsers:

```json
"browserslist": [
    "last 1 Chrome version",
    "last 1 Firefox version",
    "last 1 Edge version"
  ],
```

Next, you need to install [TypeScript](https://typescriptlang.org):

```
npm install --save-dev typescript
```

Now let's create a very basic [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file to configure TypeScript:

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "strict": true,
    "module": "es6",
    "moduleResolution": "node",
    "target": "es6"
  }
}
```

For more information on using Parcel with TypeScript, check out the [TypeScript guide in Parcel's documentation](https://parceljs.org/languages/typescript/)

Similar to our JS example above, let's create an `index.ts` file that imports from `@azure/storage-blob`:

```ts
// index.ts
import { BlobServiceClient } from "@azure/storage-blob";
// Now do something interesting with BlobServiceClient :)
```

and also an `index.html` that references it:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <body>
    <script src="./index.ts"></script>
  </body>
</html>
```

Now you can invoke parcel on the command-line:

```
parcel index.html
```

This will bundle your code and create a local development server for your page at `http://localhost:1234`. Changes you make to `index.js` will automatically get reflected on the dev server.

If you wish to bundle your page without using the local development server, you can do this by passing the `build` command:

```
parcel build index.html
```

This will emit a compiled version of `index.html`, as well as any included script files, to the `dist` directory.

## Examples

For real working examples of using each bundler with both TypeScript and JavaScript, please look at the [samples/Bundling](https://github.com/Azure/azure-sdk-for-js/tree/main/samples/Bundling) folder in this repository.
