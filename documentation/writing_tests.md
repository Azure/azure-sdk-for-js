# Writing tests for the Azure SDK for JS/TS

## Index

- [Introduction](#introduction)
- [Engineering setup](#engineering-setup)
- [Recommended tools](#recommended-tools)
  - [Mocha](#mocha)
  - [Chai](#chai)
  - [Rollup](#rollup)
  - [Karma](#karma)
  - [Recorder](#recorder)
- [Structure of tests](#structure-of-tests)
- [Individual tests](#individual-tests)

## Introduction

## Engineering setup

## Recommended tools

Writing tests for JavaScript and TypeScript requires testing tools, such as a test framework, an assertion library, and a way to bundle and run these tests in various environments. The JavaScript community has many overlapping tools that one could pick to fulfill any of these tasks. To ensure that the testing experience across the Azure SDK for JS/TS is consistent and reliable, we've picked the following external testing tools:

- [Mocha](https://www.npmjs.com/package/mocha), which offers us a well known and stable test framework for both NodeJS and browser tests.
- [Chai](https://www.npmjs.com/package/chai), a well known assertion library for Node and the browser.
- [Rollup](https://www.npmjs.com/package/rollup), to bundle JavaScript for different environments, which helps us write a single TypeScript source and trust it will compile correctly for Node and the browser.
- [Karma](https://www.npmjs.com/package/karma), which allows us to run our tests in multiple browsers.

We've also come up with our own internal tools:

- The [Recorder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder) is a tool that helps us run our live tests against static recordings obtained from a previous successful run, which aims to ensure that our code hasn't changed while benefitting from not having to reach out to real live services.

Now, let's see how we're using the mentioned tools.

### Mocha

Mocha is a well known JavaScript test framework that runs in NodeJS and in the browser. If you're new to Mocha, we recommend you to dive into [Mocha's documentation](https://mochajs.org/).

In this section, we'll explore how the Azure SDK for JS is using mocha, what versions we're using, how we're configuring it, and other recommendations on how to use this library.

#### Mocha in our dependencies

Since we're using [Rush](https://rushjs.io/), we're forced to use the same version of our packages in each one of the projects inside of this repository. If you want to add `mocha` as a dev dependency to a new project inside of this repository, first make sure you are in the root folder of that project, then you can run the following command:

```
rush add --dev -p mocha
```

To enhance the `mocha` experience, we're using the following packages:

- [`@types/mocha`](https://www.npmjs.com/package/@types/mocha), the type definitions for mocha.
- [`mocha-multi`](https://www.npmjs.com/package/mocha-multi), a way to get multiple reporters working with mocha.
- [`mocha-junit-reporter`](https://www.npmjs.com/package/mocha-junit-reporter), which produces JUnit-style XML test results.
- [`nyc`](https://www.npmjs.com/package/nyc) is [Istanbul](https://istanbul.js.org/)'s command line interface.
- [`esm`](https://www.npmjs.com/package/esm), a popular ECMAScript module loader.
- [`source-map-support`](https://www.npmjs.com/package/source-map-support), which provides [source map](https://github.com/mozilla/source-map) support for stack traces in node via the [V8 stack trace API](https://github.com/v8/v8/wiki/Stack-Trace-API).

A full `rush add` command that includes `mocha` and all of the previous dependencies follows:

```
rush add --dev -p mocha @types/mocha mocha-multi mocha-junit-reporter nyc esm source-map-support
```

We'll explore how we use these dependencies up next.

#### Configuring Mocha

Mocha is used by our test scripts in our `package.json` files. We typically invoke it with some common parameters, and some parameters that help us specify different test targets and different ways to debug the tests.

If we only consider the common parameters sent to mocha, we can see the following:

```
mocha --require esm --require source-map-support/register --reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=- --timeout 180000 --full-trace
```

Let's understand what's going on:

- `--require esm` requires the `esm` ECMAScript module loader.
- `--require source-map-support/register` requires the `source-map-support/register`, to support [source map](https://github.com/mozilla/source-map) for stack traces in node.
- `--reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=-` which allows us to both use the `spec` reporter to output a hierarchical nested view of the test cases, and also produces the JUnit-style XML test results.
- `--timeout 180000`, which specifies the maximum time each single test case can take. More on that on the next section.
- `--full-trace`, which enables full stack traces, since Mocha by default shortens the stack traces.

That command by itself is still missing two things: the actual test files and a way to generate code coverage. These two missing pieces can vary depending on what we're trying to test and how we're trying to debug the tests.

Code coverage can be added by placing `nyc` at the beginning of the line. Keep in mind that `nyc` will **obscure the stack traces**, so it's preferable to make separate `package.json` scripts, one for automated testing through CI, with `nyc`, and another one for developers running tests, without `nyc`.

Then we have to point mocha to our test files. If you're **not** using `nyc`, you can point to the bundled test file (bundled with rollup, which we will see later), typically at `dist-test/index.node.js`. If you are using `nyc`, point mocha to the files built by the TypeScript compiler, normally at `dist-esm/test/*.test.js`.

You can look at how Mocha's configuration is present in our [template project's package.json file](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/package.json).

#### Handling timeouts

All of the tests in the Azure SDK repository should have a timeout. In the previous section, we have discussed how this timeout is defined for mocha, though the parameter `--timeout` with an additional milliseconds amount, which is sent during the invocation of mocha. Now we will define how to know how many milliseconds to pass to this parameter.

New projects inside of this repository can take a safe guess based on how much the tests on average take locally. **Existing projects** should instead follow these steps to **get a reasonable timeout from past test executions**:

1. Go to our CI pipelines, at: https://dev.azure.com/azure-sdk/internal/_build
2. Pick the pipeline of the project you're working on. You will end up in a page with a path similar to `/azure-sdk/internal/_build?definitionId=XYZ&_a=summary`.
3. Click on any previous build. The path will look similar to `/azure-sdk/internal/_build/results?buildId=XYZ&view=results`.
4. Press the tab `Test`. You will see something like _Picture One_ below.
5. Press on the `x` button at the right of the filters. It is visible at the bottom right of _Picture One_. If you hover on it, you will see the message "Clear filters".
6. Under that filter bar, now you will see all of your individual test cases. They should appear sorted from greater to lower.
7. Click on the test with the greater duration. A new division will appear in the layout of the website. You will see something like _Picture Two_.
8. Click on the "History" tab of that new division of the website. You will see two bar chart with the history of durations of that test case you picked. See _Picture Three_.
9. Hover over the highest of the bars. You will see the duration that this test took on that build. Take a note of this duration.
10. **Convert that duration to milliseconds and double it. Pick a number equal or near to that duration as your timeout.**

The pictures:

- Picture One: Pressing the `Test` tab of a CI build.

![image](https://user-images.githubusercontent.com/417016/76654121-ac39c180-6540-11ea-9496-42bdee3bba25.png)

- Picture Two: Pressing on the slowest of the tests.

![image](https://user-images.githubusercontent.com/417016/76654504-7943fd80-6541-11ea-9e4f-bbee3dd4ca68.png)

- Picture Three: Looking at the history of the slowest of the tests.

![image](https://user-images.githubusercontent.com/417016/76654813-3cc4d180-6542-11ea-8407-c5de1b4a7520.png)

#### On the usage of before, beforeEach, after and afterEach

Mocha's `before` and `beforeEach` are methods that allow you to specify functions that should be executed either before all of the tests run or before each test runs, respectively. Similarly, `after` and `afterEach` exist so that developers can specify functions that should be executed after all tests run or after each test runs, respectively.

We recommend using `beforeEach` rather than `before`, just as much as we recommend using `afterEach` rather than `after`. The idea is that each one of your test cases should not depend on a state that is shared with other tests. Use `beforeEach` to execute tasks that will prepare the resources needed for each test to run cleanly, and `afterEach` to tear down or clean those settings before the next test runs.

We typically use `beforeEach` and `afterEach` to set up and tear down our test recorder. You can learn more about it in the section: [The Recorder](#the-recorder).

#### Other general recommendations

Mocha has many interesting features. Here's a list of our general recommendations on how to use some of these features:

- **On describes:**  
  Mocha's `describe` allows you to group test cases, even in nested groups. Take advantage of this. Group tests not only by the file that contains them, but also by what they're testing within that separation.
- **On async:**  
  Most of our test cases are asynchronous. Mocha allows you to write async test cases by calling `it` with an async function. Take this to your advantage. Use async functions on your test cases as much as possible. If all of your test cases use asynchronous functions, it will make them look and behave more consistently.
- **On arrow function expressions:**  
  Even though Mocha lets you write tests with arrow function expressions, as in `it("my test", async () => {})`, we recommend to use standard functions, as in `it("my test", async function () {})`, because standard functions have bindings to the execution context through the `this` keyword. Mocha's execution context is **necessary** to use the recorder, and it allows you to obtain the test name and other information that can be useful for your test cases. Mocha also discourages the use of arrow functions, which can be seen here: https://mochajs.org/#arrow-functions

### Chai

Chai is an assertion library, similar to Node's built-in `assert`. While `assert` is a module that belongs to NodeJS's standard library, it was mainly designed to write tests for the NodeJS's core, and [it has been discouraged from being used as a dependency](https://github.com/nodejs/node/issues/4532). Chai is very popular and widely used for both NodeJS and the browser. You can read more about Chai through their main website: https://www.chaijs.com/

Chai makes testing much easier by providing an extensive list of assertions that can run against your code. This list of assertions can be seen in detail by going to their assertion style guide: <https://www.chaijs.com/guide/styles/>

Another important learning resource for Chai is: Chai Assertions for Promises <https://www.chaijs.com/plugins/chai-as-promised/>.

#### Our recommended Chai assertion style

The Azure SDK for JavaScript (and TypeScript) prefers Chai's Assert style. For example:

```ts
import { assert } from "chai";

let foo = "bar";
let beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert.typeOf(foo, "string");
assert.typeOf(foo, "string", "foo is a string");
assert.equal(foo, "bar", "foo equals to `bar`");
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
```

#### Chai in our dependencies

Since we're using [Rush](https://rushjs.io/), we're forced to use the same version of our packages in each one of the projects inside of this repository. If you want to add `chai` as a dev dependency to a new project inside of this repository, first make sure you are in the root folder of that project, then you can run the following command:

```
rush add --dev -p chai
```

Since we're using TypeScript, make sure to also add the types:

```
rush add --dev -p @types/chai
```

### Rollup

Rollup is a module bundler for JavaScript. It uses the new standardized format for code modules included in the ES6 revision of JavaScript. This will eventually be possible natively everywhere, but Rollup lets you do it today.

We use Rollup to take the result of the TypeScript compiler and carefully bundle it differently depending on the target platform (NodeJS or the browsers) with:

- The source maps available from out compiled TypeScript and our dependencies.
- Without specific sections of code that exist only for a specific platform.
- To transform the necessary dependencies from our node_modules, from CommonJS to ES6. 
- With a banner including Microsoft's copyright at the top of the generated file.
- With the consideration necessary to output a working JavaScript file compatible with browsers.
- With special settings necessary to run our tests in the browser.

If you want to learn more about Rollup, you can read the Rollup guide at: https://rollupjs.org/guide/en/

#### Rollup in our dependencies

Since we're using [Rush](https://rushjs.io/), we're forced to use the same version of our packages in each one of the projects inside of this repository. If you want to add `chai` as a dev dependency to a new project inside of this repository, first make sure you are in the root folder of that project, then you can run the following command:

```
rush add --dev -p rollup
```

To fulfill our needs, we use Rollup with some plugins. They're the following:

- [`@rollup/plugin-commonjs`](https://www.npmjs.com/package/@rollup/plugin-commonjs):
  A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle.
- [`@rollup/plugin-json`](https://www.npmjs.com/package/@rollup/plugin-json):
  A Rollup plugin which Converts `.json` files to ES6 modules.
- [`@rollup/plugin-multi-entry`](https://www.npmjs.com/package/@rollup/plugin-multi-entry):
  A Rollup plugin which allows use of multiple entry points for a bundle.
- [`@rollup/plugin-node-resolve`](https://www.npmjs.com/package/@rollup/plugin-node-resolve):
  A Rollup plugin which locates modules using the [Node resolution algorithm](https://nodejs.org/api/modules.html#modules_all_together), for using third party modules in `node_modules`.
- [`@rollup/plugin-replace`](https://www.npmjs.com/package/@rollup/plugin-replace):
  A Rollup plugin which replaces strings in files while bundling.
- [`rollup-plugin-shim`](https://www.npmjs.com/package/rollup-plugin-shim):
  Plugin for rollup to provide a shim implementation for a module. Replaces required dependencies with the specified string instead, especially useful for shimming small dev-time APIs with a big footprint you don't want in production.
- [`rollup-plugin-sourcemaps`](https://www.npmjs.com/package/rollup-plugin-sourcemaps):
  Rollup plugin for loading files with existing source maps. Inspired by [webpack/source-map-loader](https://github.com/webpack-contrib/source-map-loader).
- [`rollup-plugin-terser`](https://www.npmjs.com/package/rollup-plugin-terser):
  Rollup plugin to minify generated ECMAScript bundles. Uses [terser](https://github.com/terser/terser) under the hood.
- [`rollup-plugin-visualizer`](https://www.npmjs.com/package/rollup-plugin-visualizer):
  A Rollup plugin that generates visualizations that help analyze our Rollup bundle to see which modules are taking up space.

To install them all together with Rollup, you can run the following command:

```
rush add --dev -p rollup @rollup/plugin-commonjs @rollup/plugin-json @rollup/plugin-multi-entry @rollup/plugin-node-resolve @rollup/plugin-replace rollup-plugin-shim rollup-plugin-sourcemaps rollup-plugin-terser rollup-plugin-visualizer 
```

You can see these dependencies at work in our [template project's package.json](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/package.json).

#### Configuring Rollup

Running `rollup` inside of a `package.json` script will automatically pick up the `rollup.config.js` file. What this file exports will define the configurations that `rollup` will use to make the bundle. We typically build for both Node and the browsers with the following script:

```json
  "build:nodebrowser": "rollup 2>&1",
```

Note that we add `2>&1` to hide the output of `rollup`.

Our `rollup.config.js` allows us to specify wether we want to do only the Node bundle, or only the browsers bundle, or both, by loading both configurations from a separate file, then picking either configuration, or both, depending on environment variables, `ONLY_NODE` to keep the NodeJS configuration, `ONLY_BROWSER` to keep the browser configuration, or neither to keep both. As follows:

```ts
import * as base from "./rollup.base.config";

const inputs = [];

if (!process.env.ONLY_BROWSER) {
  inputs.push(base.nodeConfig());
}

if (!process.env.ONLY_NODE) {
  inputs.push(base.browserConfig());
}

export default inputs;
```

The file `rollup.base.config.js` that should exist in the same directory, loads the plugins that these configuration needs, then exports functions to generate both configurations (for Node and for the browsers), according to how they're invoked from `rollup.config.js`. The summarized structure of a `rollup.base.config.js` can be seen below:

```ts
import nodeResolve from "@rollup/plugin-node-resolve";
import multiEntry from "@rollup/plugin-multi-entry";
// More imports...

export function nodeConfig(test = false) {
  const baseConfig = {
    // Properties of baseConfig...
  }
  if (test) {
    // Altering baseConfig if we want to build the test bundle...
  }
  return baseConfig;
}
export function browserConfig(test = false) {
  const baseConfig = {
    // Properties of baseConfig...
  }
  if (test) {
    // Altering baseConfig if we want to build the test bundle...
  }
  return baseConfig;
}
```

In the previous snippet, you'll see that our configuration functions accept a `test` parameter that allows us to change the rollup configuration in case we want to generate a bundle with our tests. For that purpose, we employ a separate `package.json` script that consumes a separate configuration file for rollup, `rollup.test.config.js`:

```json
  "build:test": "rollup -c rollup.test.config.js 2>&1",
```

Our rollup test configuration file simply loads the base configuration file and exports both the Node and the Browser configurations, but generated appropriately to run our tests, by passing a boolean truth as the first parameter:

```ts
import * as base from "./rollup.base.config";

export default [base.nodeConfig(true), base.browserConfig(true)];
```

You can see this setup at work in our template project:

- [rollup.config.js](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/rollup.config.js).
- [rollup.base.config.js](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/rollup.base.config.js).
- [rollup.test.config.js](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/rollup.test.config.js).
- And also in how we use these by looking at any mention of `rollup` on the [template project's package.json](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/package.json).

### Karma

Karma is a tool that allows us to run the same TypeScript tests we run on node, but on the browsers. The Karma runner as a tool has a considerably low barrier of entry, but it is also pretty extensive. We recommend going through the following resources to learn more about Karma:

- About Karma's [configuration file](http://karma-runner.github.io/4.0/config/configuration-file.html).
- About Karma's handling of [files](http://karma-runner.github.io/4.0/config/files.html).
- About Karma's support for [browsers](http://karma-runner.github.io/4.0/config/browsers.html).
- About Karma's [preprocessors](http://karma-runner.github.io/4.0/config/preprocessors.html).
- About Karma's [plugins](http://karma-runner.github.io/4.0/config/plugins.html).

#### Karma in our dependencies

Since we're using [Rush](https://rushjs.io/), we're forced to use the same version of our packages in each one of the projects inside of this repository. If you want to add `karma` as a dev dependency to a new project inside of this repository, first make sure you are in the root folder of that project, then you can run the following command:

```
rush add --dev -p karma
```

To fulfill our needs, we use Karma with some plugins. They're the following:

- [`karma-coverage`](https://www.npmjs.com/package/karma-coverage):
  Generate code coverage using [Istanbul](https://github.com/gotwarlost/istanbul).
- [`karma-env-preprocessor`](https://www.npmjs.com/package/karma-env-preprocessor):
  It's a Karma preprocessor which makes environment variables available to our tests.
- [`karma-json-preprocessor`](https://www.npmjs.com/package/karma-json-preprocessor):
  It's a Karma preprocessor for converting JSON files into JS variables.
- [`karma-json-to-file-reporter`](https://www.npmjs.com/package/karma-json-to-file-reporter):
  It's a Karma reporter that save JSON messages from log to file. We use this to create real local files while executing tests in the browser. It's specifically used by our [Recorder](https://github.com/sadasant/azure-sdk-for-js/blob/master/sdk/test-utils/recorder/README.md).
- [`karma-junit-reporter`](https://www.npmjs.com/package/karma-junit-reporter):
  It's a Karma reporter for the [JUnit XML format](https://llg.cubic.org/docs/junit/).
- [`karma-mocha`](https://www.npmjs.com/package/karma-mocha):
  It's an adapter for the [Mocha](http://mochajs.org/) testing framework.
- [`karma-mocha-reporter`](https://www.npmjs.com/package/karma-mocha-reporter):
  It's a Karma reporter plugin with mocha style logging.
- [`karma-remap-istanbul`](https://www.npmjs.com/package/karma-remap-istanbul):
  A Karma reporter that enables remapped reports on watch.
- [`karma-chrome-launcher`](https://www.npmjs.com/package/karma-chrome-launcher):
  Launcher for Google Chrome, Google Chrome Canary and Google Chromium.

To install them all together with Karma, you can run the following command:

```
rush add --dev -p karma karma-coverage karma-env-preprocessor karma-json-preprocessor karma-json-to-file-reporter karma-junit-reporter karma-mocha karma-mocha-reporter karma-remap-istanbul karma-chrome-launcher
```

You can see these dependencies at work in our [template project's package.json](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/package.json).

#### Configuring Karma

Karma is used by our browser test scripts in our `package.json` files. We usually only pass one parameter, `--single-run`, which tells Karma to start and capture all configured browsers, run tests and then exit with an exit code of 0 or 1 depending on whether all tests passed or any tests failed.

```json
  "integration-test:browser": "karma start --single-run",
```

Karma will default to interpret the file `karma.conf.js`, which should be available at the root of the project. You may specify a different `karma.conf.js` for different test groups:

```json
  "integration-test:browser": "karma start --single-run karma.integration.config.js",
  "unit-test:browser": "karma start --single-run karma.unit.config.js",
```

An example of a Karma file that can be used can be seen in the following path: <https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/karma.conf.js>

You should pay special attention to the lines with the following content:

- Ensure that the browser built file, made by rollup, is referenced as an element of the `files` array property. It should look like `dist-test/index.browser.js`, [as you can see in the template file](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/karma.conf.js#L31).
- The `preprocessors` property object should specify what files will have test coverage, which should look like `"dist-test/index.browser.js": ["coverage"]`, and what files can be imported/required even though they're JSON files, which should look like `"recordings/browsers/**/*.json": ["json"]`.
- Make sure that the timeouts are reasonably similar to the timeouts specified on your Mocha configuration. You will be placing the same number of milliseconds on the properties: `browserNoActivityTimeout`, and in `client: { mocha: { timeout: /* here */ } }`, and you can specify less milliseconds on `browserDisconnectTimeout`.

Besides the default contents of that Karma configuration file, you can consider the following additions:

- You might benefit from loading [`dotenv`](https://www.npmjs.com/package/dotenv), to specify your environment variables in a local file that shouldn't be tracked by Git. If you decide to use that extra dependency, make sure to load the `.env` file at the top-most of the file, right after any imports or requires. The line that loads the `.env` file might look like: `require("dotenv").config({ path: "../.env" });`.
- In some computers, specially Linux boxes without a graphical environment, tests might not run unless you specifically load a headless Chrome, which should look like this:
```js
  browsers: ["ChromeHeadlessNoSandbox"],
  customLaunchers: {
    ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
    }
  }
```
- Most of our tests focus on checking that our code preemptively works on browsers, even before our services support authentication methods compatible with browsers. For this reason, it's important to disable the browser's web security when necessary. This is done by sending the flag `--disable-web-security`. Combined with `ChromeHeadlessNoSandbox`, it should look like this:
```js
  browsers: ["ChromeHeadlessNoSandbox"],
  customLaunchers: {
    ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-web-security"]
    }
  }
```
- You might want to avoid logging from the browser, since [the recorder](#the-recorder) uses the logging output to create files. You can omit logs using the `browserConsoleLogOptions` property, which you can conditionally apply, as in the following snippet:
```js
  browserConsoleLogOptions: {
    terminal: !process.env.TEST_MODE
  },
```

You can see an example [karma.config.js in our template project](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/karma.conf.js).

### The Recorder

The Azure SDK for JavaScript and TypeScript uses a custom utility to record tests that hit the live endpoints, so that these tests can be executed almost instantly, against these recordings, instead of hitting the live services. This tool is called [@azure/test-utils-recorder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder). It's an unpublished package that can be added using rush, as follows:

```
rush add --dev -p @azure/test-utils-recorder
```

You can read more about the recorder in its readme: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder

## Structure of tests

## Individual tests
