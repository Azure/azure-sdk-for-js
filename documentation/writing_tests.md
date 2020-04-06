# Writing tests for the Azure SDK for JS/TS

The Azure SDK for JavaScript and TypeScript allows users to communicate and control their Azure resources. The development of the Azure SDK should be taken with uttermost care, not only to provide the best API clients to our customers, but also to ensure that the software is reliable through stable, succinct and comprehensible tests. For that purpose, we've made this document to define how tests should be written. 

## Index

- [Engineering setup](#engineering-setup)
    - [Engineering goals](#engineering-goals)
    - [CI and nightly test configuration](#ci-and-nightly-test-configuration)
    - [Delivering live tests to our users](#delivering-live-tests-to-our-users)
- [Recommended tools](#recommended-tools)
    - [Mocha](#mocha)
        - [Mocha in our dependencies](#mocha-in-our-dependencies)
        - [Configuring Mocha](#configuring-mocha)
        - [Code coverage with Mocha and nyc](#code-coverage-with-mocha-and-nyc)
        - [Handling timeouts](#handling-timeouts)
    - [Chai](#chai)
    - [Rollup](#rollup)
    - [Karma](#karma)
    - [Recorder](#recorder)
- [Test folder structure](#test-folder-structure)
    - [Testing cloud resources](#testing-cloud-resources)
    - [Public or internal tests](#public-or-internal-tests)
    - [Testing API functionalities](#testing-api-functionalities)
- [Shared and reusable code](#shared-and-reusable-code)
    - [Preparing all of the test cases](#preparing-all-of-the-test-cases)
    - [Preparing some of the test cases](#preparing-some-of-the-test-cases)
    - [Universal utilities](#universal-utilities)
- [Writing test cases](#writing-test-cases)
    - [What a test is actually testing](#what-a-test-is-actually-testing)
    - [Test titles](#test-titles)
    - [Inner parts of a test](#inner-parts-of-a-test)
    - [Using conditionals](#using-conditionals)
    - [Using delays](#using-delays)
    - [Exceptions and edge cases](#exceptions-and-edge-cases)
    - [How tests should look](#how-tests-should-look)
- [Getting feedback](#getting-feedback)



## Engineering setup

The Azure SDK tests are valuable due to many factors. They work as a way to verify that our code is correct, just as much as a way to share how to use our code with our customers. To monitor that our tests are working correctly, they are triggered by automatic systems that help us verify that our commits are correct, or check that the services we're targeting don't show unexpected behaviors, all of which help us have a better level of confidence before releasing anything to the public. 

For our Engineering Systems to pick up our tests appropriately, our packages must be configured according to their guidelines. In this section we will go through some of these concepts, and provide links that expand them in detail. We will be covering:

- [Engineering goals](#engineering-goals).
- [CI and nightly test configuration](#ci-and-nightly-test-configuration).
- [Delivering live tests to our users](#delivering-live-tests-to-our-users).

### Engineering goals

Though the tests for the Azure SDK for JavaScript and TypeScript must target live resources, we should make sure they only do so when necessary. For this purpose, we must keep in mind the following guidelines:

- Tests should not be flaky. Tests should pass regardless of who's executing it, when they are running, and how many times they run.
- Tests should create the resources they are testing.
- While writing tests, use your own personal resources for setting up the context in which each test will create their own resources. For example, it is valid to have a static KeyVault while writing KeyVault tests, and then a given test can create a KeyVault Key before validating any of the functionalities of the KeyVault Key. Ask your team to see if there's a resource already in place for test development.
- Any resource that is not created by the tests must be defined in an [ARM template](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview), so that anyone can build a copy of them. This ARM template will be used by the CI pipelines during builds. We'll examine how to set this up in the [CI and nightly test configuration](#ci-and-nightly-test-configuration) section.
- Avoid calling to timed delays (like `setTimeout`) to assert that a change happened in the live resources. Also avoid locking the main thread until the resource responds. You can read more about [_using delays_ in this section](#using-delays).
- The resources created in the tests should be unique. Running the same test in parallel, multiple times, should not break them.

You can read more recommendations through the following link: [Best Practices for writing tests that target live resources](https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/51/Testing-Guidelines).

### CI and nightly test configuration

To ensure that our tests are executed in the test [Azure DevOps pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) that have been previously configured by our team, some configuration files are necessary.

A file named `ci.yml` should be added by the Engineering Systems team at the service level (the common parent of the clients of a specific service), for example at the `keyvault/` level of `keyvault/keyvault-keys`. This file will trigger all of the validation builds that happen during pull requests and after any pull request is merged into master.

Some examples of the `ci.yml` file can be found at:

- [sdk/identity/ci.yml](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/ci.yml).
- [sdk/keyvault/ci.yml](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/ci.yml).
- [sdk/storage/ci.yml](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/ci.yml).
- [sdk/servicebus/ci.yml](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/ci.yml).

For live tests (which run nightly), we need to provide two files, `test-resources.json` and `tests.yml`. `test-resources.json` must exist either at the package folder level, or at the service level, which will contain an [ARM template](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) of the resources needed to run all of the tests of these clients. All of the `test-resources.json` files inside of the service folder will be used to deploy resources on every build. The `tests.yml` file must be placed at the package folder, which is in charge of specifying when to run the tests for this package, what environments to use to run the tests, and how to run the tests. You can learn how to write these files by following the guide: [Creating live tests](https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/48/Create-a-new-Live-Test-pipeline?anchor=creating-live-tests).

Some examples can be found at: 

- [sdk/keyvault/test-resources.json](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/test-resources.json).
- [sdk/storage/test-resources.json](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/test-resources.json).
- [sdk/servicebus/test-resources.json](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/test-resources.json).

These files will deal with the environment variables needed by your tests. Some of these environment variables are quite standard. Generally speaking, the SDK tests will use information from the tenant and the client of the resources that the tests are working with. To effectively provide these to the automated tests, we need to enable the pipeline to use some specific configuration.

First you must go to https://dev.azure.com/azure-sdk/ and look for the builds that have been configured to target your project, then:

- Click the pipeline you want to test on PR.
- Press the "Edit" button at the top right corner.
- Press the three dot menu at the top right corner. A menu will drop down. Press the "Triggers" option from that menu.
- A page will load with an horizontal menu near the top-center with the following options: "YAML", "Variables", "Triggers" and "History".
- Click the Variables option of that menu.
- Click on "Variable Groups".
- If the variable group you want to select is not visible in that page, add it: You'll see a button that will say "🔗 Link variable group". Click it, then use the "🔍 search" input and type the name `Secrets for Resource Provisioner`, and then link it.

It should end up looking something like this:

![image](https://user-images.githubusercontent.com/417016/72285413-f8e54700-363a-11ea-959e-cb1bc4c074ba.png)

Once the CI is properly configured, you can test that the live tests pipelines work by submitting a comment to a pull request with the name of the pipeline, which will be similar to `js - event-hubs - tests` or `js - keyvault-keys - tests`.

### Delivering live tests to our users

The `test-resources.json` can be used by our users to set up their own test resources. We go through how it's being used with our PowerShell scripts in our [README](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#integration-testing-with-live-services), though we recommend using the same ARM template to expose a "Deploy Button" in the `README.md` of your project. The button will look like this one for KeyVault-Keys:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftests-resources.json)

Which contains the following code:

```md
[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftests-resources.json)
```

You'll see that the way this works is that there's an azure endpoint with this structure `https://portal.azure.com/#create/Microsoft.Template/uri/` that has an encoded URL at the end of it. In that case, this one: `https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftests-resources.json`.

Once clicked, the deploy button will load a form at Azure that should ask some basic information, and then allow anyone to deploy the same set of resources, already properly configured, to their accounts. This form is automatically generated from the ARM template, so to help our users go through it in detail, and also to inform them of the resources they will be creating, we recommend writing these details in a new file in your project's folder, called `TEST_RESOURCES_README.md` and linking it from your `README.md`. Here's an example that applies to all of our KeyVault clients: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/TEST_RESOURCES_README.md



## Recommended tools

Writing tests for JavaScript and TypeScript requires testing tools, such as a test framework, an assertion library, and a way to bundle and run these tests in various environments. The JavaScript community has many overlapping tools that one could pick to fulfill any of these tasks. To ensure that the testing experience across the Azure SDK for JS/TS is consistent and reliable, we've picked the following external testing tools:

- [Mocha](https://www.npmjs.com/package/mocha), which offers a well known and stable test framework for both NodeJS and the browser.
- [Chai](https://www.npmjs.com/package/chai), a well known assertion library for Node and the browser.
- [Rollup](https://www.npmjs.com/package/rollup), to bundle JavaScript for different environments, which helps us write a single TypeScript source and trust it will compile correctly for Node and the browser.
- [Karma](https://www.npmjs.com/package/karma), which allows us to run our tests in multiple browsers.

We've also come up with our own internal tools:

- The [Recorder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder) is a tool that helps us run our live tests against static recordings obtained from a previous successful run, which aims to ensure that our code hasn't changed while benefitting from not having to reach out to live services.

Now, let's see how we're using the mentioned tools.

### Mocha

Mocha is a well known JavaScript test framework that runs in NodeJS and in the browser. If you're new to Mocha, we recommend you to dive into [Mocha's documentation](https://mochajs.org/).

In this section, we'll explore how the Azure SDK for JS is using mocha, what versions we're using, how we're configuring it, and other recommendations on how to use this library.

#### Mocha in our dependencies

Since we're using [Rush](https://rushjs.io/), we're forced to use the same version of our packages in each one of the projects inside of this repository. If you want to add `mocha` as a dev dependency to a new project inside of this repository, first make sure you are in the root folder of that project, then you can run the following command:

```
rush add --dev -p mocha
```

We're using the following Mocha plugins and related dependencies:

- [`@types/mocha`](https://www.npmjs.com/package/@types/mocha) provides the type definitions for mocha.
- [`mocha-junit-reporter`](https://www.npmjs.com/package/mocha-junit-reporter), which produces JUnit-style XML test results.
- [`nyc`](https://www.npmjs.com/package/nyc) is [Istanbul](https://istanbul.js.org/)'s command line interface.
- [`esm`](https://www.npmjs.com/package/esm), a popular ECMAScript module loader.
- [`source-map-support`](https://www.npmjs.com/package/source-map-support), which provides [source map](https://github.com/mozilla/source-map) support for stack traces in node via the [V8 stack trace API](https://github.com/v8/v8/wiki/Stack-Trace-API).

A full `rush add` command that includes `mocha` and all of the previous dependencies follows:

```
rush add --dev -p mocha @types/mocha mocha-junit-reporter nyc esm source-map-support
```

#### Configuring Mocha

Mocha is used by our test scripts in our `package.json` files. We typically invoke it with some common parameters, and some parameters that help us specify different test targets and different ways to debug the tests.

If we only consider the common parameters sent to mocha, we can see the following:

```
mocha -r esm --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --timeout 180000 --full-trace
```

Let's understand what's going on:

- `--require esm` requires the `esm` ECMAScript module loader.
- `--require source-map-support/register` requires the `source-map-support/register`, to support [source map](https://github.com/mozilla/source-map) for stack traces in node.
- `--reporter ../../../common/tools/mocha-multi-reporter.js` uses a local script which allows us to both use the `spec` reporter to output a hierarchical nested view of the test cases, and also the `mocha-junit-reporter` reporter, which produces JUnit-style XML test results.
- `--timeout 180000`, which specifies the maximum time each single test case can take. More on that on the [Handling timeouts](#handling-timeouts) section.
- `--full-trace`, which enables full stack traces, since Mocha by default shortens the stack traces.

That command by itself is still missing two things: the actual test files and a way to generate code coverage. These two missing pieces can vary depending on what we're trying to test and how we're trying to debug the tests.

Code coverage can be added by placing `nyc` at the beginning of the line. Keep in mind that `nyc` will **obscure the stack traces**, so it's preferable to make separate `package.json` scripts, one for automated testing through CI, with `nyc`, and another one for developers running tests, without `nyc`.

Then we have to point mocha to our test files. If you're **not** using `nyc`, you can point to the bundled test file (bundled with rollup, which we will see later), typically at `dist-test/index.node.js`. If you are using `nyc`, point mocha to the files built by the TypeScript compiler, normally at `dist-esm/test/*.test.js`.

We will end up with the following scripts (be aware that the target tests files might change).

```json
    "integration-test:node": "nyc mocha -r esm --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --timeout 180000 --full-trace dist-esm/test/*.test.js",
    "unit-test:node": "mocha --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --timeout 180000 --full-trace dist-test/index.node.js",
```

Keep in mind that Mocha will be directly called from our `package.json` scripts only for our node tests. For our browser tests, we will be using [Karma](#karma).

You can look at how Mocha's configuration is present in our [template project's package.json file](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/package.json).

#### Code coverage with Mocha and nyc

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

Since we're using [Rush](https://rushjs.io/), we have to use the same version of our packages in each one of the projects inside of this repository. If you want to add `chai` as a dev dependency to a new project inside of this repository, first make sure you are in the root folder of that project, then you can run the following command:

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



## Test folder structure

Tests for the Azure SDK for JavaScript and TypeScript should be all executed using the NPM command `test`, they should be stored in the `test` folder, they must be written in TypeScript, in files that will end in `.spec.ts`. Our [recommended tools](#recommended-tools) should provide the test framework and proper ways of compiling and bundling our tests correctly. They should be able to run and be debugged on the environments we're targeting, which are currently only NodeJS and the browsers.

To help developers specify the target environment they will be testing, we will specify these scripts in the `package.json`:

```json
  "test:browser": "karma start --single-run",
  "test:node": "mocha -r esm --require source-map-support/register --reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=- --timeout 180000 --full-trace dist-esm/test/*.test.js",
```

Besides the target environment, tests may or may not target live resources, and either should target public or internal code. To navigate through these concepts, we will make clear distinctions of what we will be testing, based on three main aspects:

- [Testing cloud resources](#testing-cloud-resources).
- [Public or internal tests](#public-or-internal-tests).
- [Testing API functionalities](#testing-api-functionalities).

We will continue by elaborating on these three distinctions in the next section.

Keep in mind that [test titles](#test-titels) may include information about the environment they're targeting, what resources they're testing and any other distinction up to the good judgement of the developer. For more information, check out the section: [Writing test cases](#writing-test-cases).

### Testing cloud resources

By making use of [the recorder](#the-recorder), we're allowed to write tests targeting real live resources, and then run them instantly against a local copy of the server responses by specifying the `TEST_MODE` environment variable to either `record`, `live` or `playback`. Not specifying the environment variable will be considered `playback`, since we want to be able to run the tests by default without having to set up real resources.

### Public or internal tests

Tests can also either target internal code or code that is part of the public API of our projects. We will separate where these tests are located by dividing them in folders, as follows:

```
project/
  test/
    internal/
      internal_method.spec.ts
    public/
      public_method.spec.ts
```

Keep in mind that...

- **Internal** tests should:
  - Never target external resources.
  - Not invoke or use [the recorder](#the-recorder), nor benefit from using the recorder.
  - May use mocks.
  - Avoid targeting code that **is** part of the public API of the project, unless necessary to test some other internal functionality.
  - Should not provide potentially useful information for consumers of the project they're testing.
- **Public** tests should:
  - Target public facing API methods or properties.
  - Benefit from using [the recorder](#the-recorder).
  - Not use custom mocks.
  - Be written in a user-friendly approach, similar to samples.

For more information about writing individual test cases, you might go to our [Writing test cases](#writing-test-cases) section.

### Testing API functionalities

Tests should also be grouped by the functionality they're testing. Even though they might be testing _internal_ or _public_ code, they could be grouped in folders up to the good judgement of the developers, which may look as follows:

```
project/
  test/
    internal/
      some_internal_functionality/
        part_of_internal_functionality.spec.ts
        other_aspect_of_internal_functionality.spec.ts
      lone_internal_method.spec.ts
    public/
      some_public_functionality/
        part_of_public_functionality.spec.ts
        other_aspect_of_public_functionality.spec.ts
      public_method.spec.ts
```



## Shared and reusable code

Before writing individual test cases, we should explore what indications we should follow while writing reusable code.  Ideally, tests should be written clearly. While they should focus on ensuring the correct behavior of a targeted functionality, they should be able to be read with minimal context. Though it will be common to run into scenarios in which we will want to avoid repeating ourselves, to balance between clarity and practicality, we'll set up the following minimal rules on writing reusable code:

- [Preparing all of the test cases](#preparing-all-of-the-test-cases), where we will take a look at how to write re-usable code that will conform a valuable setup for all of the test cases in a given file.
- [Preparing some of the test cases](#preparing-some-of-the-test-cases), where we will go through examples of how to write re-usable code that might be used to set up some of the test cases.
- [Universal utilities](#universal-utilities), where we will see how to approach tools that could potentially be used by tests outside of the project in which the tests are hosted.

If a certain piece of code doesn't match any of these three categories, it should not be moved out of the test cases, and instead it should exist in full, inside of each test case. Let's see some quick examples of code outside of these three categories:

**Anti-pattern 1**, code that displays information (wether values or method names) that are absolutely related to the intention of the test, as follows:

```ts
// This function only calls a client's method "A".
async function callsClientMethodA(client) {
  await client.A();
}

describe("a set of tests", async function() {
  it("can effectively call the client's method A", async function() {
    const client = null; // Let's say we actually have a client here.

    // The function invoked below hides exactly what we want to test.
    await callsClientMethodA(client);
  });
});
```

Instead, this code should be written inside of the test case, as follows:

```ts
describe("a set of tests", function() {
  it("can effectively call the client's method A", async function() {
    const client = null; // Let's say we actually have a client here.
    await client.A(); // Method "A" is clearly invoked inside of this test.
  });
});
```

**Anti-pattern 2**, code that is preparing something that is only relevant for one test case, as follows:

```ts
async function doSomePriorWork(client) {
  // Any code that won't be used outside of a specific test case.
  // Perhaps some client methods, like:
  await client.work();
  await client.workSomeMore();
  // Or some generation of values, like:
  const random = Math.random();
  // The return value or type is not important for this example.
}

describe("a set of tests", function() {
  it("can call client's method A with some prior work", async function() {
    const client = null; // Let's say we actually have a client here.
    await doSomePriorWork(client); // No other test case uses "doSomePriorWork".
    await client.A();
  });
});
```

Code that is intended to do preparations that are only specific for a single test case should be inside of that test case, as follows:

```ts
describe("a set of tests", function() {
  it("can call client's method A with some prior work", async function() {
    const client = null; // Let's say we actually have a client here.

    // Prior work goes here...
    // Perhaps some client methods, like:
    await client.work();
    await client.workSomeMore();
    // Or some generation of values, like:
    const random = Math.random();

    await client.A();
  });
});
```

Let's see some good and bad examples of reusable code in the three categories described above.

### Preparing all of the test cases

Re-usable code that will conform a valuable setup for all of the test cases in a given file should be placed in any of the Mocha methods `before`, `beforeEach`, `after` or `afterEach`, considering that:

- `before` and `beforeEach` should be used to define things that will be usable while the tests are running.
- `after` and `afterEach` should be used to tear down things that have been created in `before` and `beforeEach`.

Code in either of these methods can be abstracted away into utility functions that may live outside of each test file **only if** these pieces of code are relevant to more than one test file.

One specific example of code that **must** live in the `beforeEach` section is [the recorder](#the-recorder)'s initialization, and later in the `afterEach` section, the recorder's destruction. The following example can be seen in [the recorder's readme](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/test-utils/recorder/README.md):

```ts
  beforeEach(async function() {
    recorder = record(this);
    const credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    const keyVaultUrl = "https://myKeyVault.vault.azure.net";
    client = new KeysClient(keyVaultUrl, credential);
  });

  afterEach(function () {
    recorder.stop();
  });
```

### Preparing some of the test cases

Some test cases might need some common setup to properly work. If at least more than one of these tests exist in a single file, their setup can be moved out of each test case into a function (or outside constant), as long as the function (or constant) is declared inside of that same test file, and as long as the common code is sufficiently large. For readability purposes, if the common code is less than four lines long (as an arbitrary reasonable estimate), it will be clearer if it's left repeated in each test case.

Let's define an example in which a SDK client might need several lines of setup in two specific tests:

```ts
describe("some group of functionalities", function() {
  let client;

  beforeEach(function() {
    recorder = record(this);
    client = new Client();
  });

  afterEach(function () {
    recorder.stop();
  });

  it("should test A with a proper setup", async function() {
    client.prepare({
      propertyA: 1,
      propertyB: 2,
      propertyC: 3,
      propertyD: 4,
    });

    const result = await client.A();
    assert.ok(result.value);
  });

  it("should test B with a proper setup", async function() {
    client.prepare({
      propertyA: 1,
      propertyB: 2,
      propertyC: 3,
      propertyD: 4,
    });

    const result = await client.B();
    assert.ok(result.value);
  });
});
```

It is possible to move the common setup code to a function in the same file, as in the following example code:

```ts
describe("some group of functionalities", function() {
  let client: Client;

  beforeEach(function() {
    recorder = record(this);
    client = new Client();
  });

  afterEach(function () {
    recorder.stop();
  });

  function defaultPrepareClient(client: Client) {
    client.prepare({
      propertyA: 1,
      propertyB: 2,
      propertyC: 3,
      propertyD: 4,
    });
  }

  it("should test A with a proper setup", async function() {
    defaultPrepareClient(client);
    const result = await client.A();
    assert.ok(result.value);
  });

  it("should test B with a proper setup", async function() {
    defaultPrepareClient(client);
    const result = await client.B();
    assert.ok(result.value);
  });
});
```

### Universal utilities

In case that a specific utility function might be useful for more than one test case, and more than one test file, and even potentially in more than one project, this code should be moved away from each client into a common private package in the [test-utils](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/) folder. If the package doesn't exist, it should be created.

Let's say we have a test utility that we call `retry.ts`, with the following content:

```ts
import { delay } from "@azure/test-utils-recorder";

/**
 * A simple abstraction to retry, and exponentially de-escalate retrying, a
 * given async function until it is fulfilled.
 * @param {() => Promise<T>} target The async function you want to retry
 * @param {number} delayInMS The delay in milliseconds between each retry, defaults to 1000
 * @param {number} timeout Maximum time we'll let this lapse before we quit retrying, defaults to Infinity
 * @param {number} increaseFactor Increase factor of each retry, defaults to 1
 * @returns {Promise<any>} Resolved promise
 */
export async function retry<T>(
  target: () => Promise<T>,
  delayInMS: number = 1000,
  timeout: number = Infinity,
  increaseFactor: number = 1
): Promise<any> {
  const start = new Date().getTime();
  let updatedDelay = delayInMS;
  while (new Date().getTime() - start < timeout) {
    try {
      return await target();
    } catch {
      await delay(updatedDelay);
      updatedDelay *= increaseFactor;
    }
  }
  return null;
}
```

This code is clearly not specifically related to any of our projects. Moving it out into a common project will help it be more easily discovered, not only for other developers to find it, but also to avoid having to upload this code at all, if there happens to be an already existing tool that can be used for the same purpose.



## Writing test cases

While considering possible differences in the [Shared and reusable code](#shared-and-reusable-code) that tests might have, or where they might be placed in the [Test folder structure](#test-folder-structure), test should be similar in each one of our projects. We can ensure some level of homogeneity through the use of our [Recommended tools](#recommended-tools), though we still need to explore what are the indications on writing each test case.

In this section we will be examining our recommendations of:

- [What a test is actually testing](#what-a-test-is-actually-testing), where we will examine how many different things each test should be mainly doing.
- [Test titles](#test-titles), where we will examine how to properly phrase what each test is doing, and how to make them easier to discover through pattern matching.
- [Inner parts of a test](#inner-parts-of-a-test), where we will go through how the bodies of each test case should generally be.
- [Using conditionals](#using-conditionals), in which we will focus on minimizing the possibility of having tests that might run differently depending on external factors.
- [Using delays](#using-delays).
- [Exceptions and edge cases](#exceptions-and-edge-cases), where will examine how to address all of the possible exceptions and edge cases (which might be too many to test).
- [How tests should look](#how-tests-should-look), in which we will focus on what would be the aesthetic goal of our tests, to develop an inner sense of measure of how far we might be from our common goal.

Let's go through each item of this list.

### What a test is actually testing

Each individual test case of the entire Azure SDK for JavaScript and TypeScript should mainly focus on one specific functionality. By functionality we mean that, after any required setup, each test case should check the results of a either a single operation, or at least a single function call (considering that constructors are function calls). Let's expand this further with examples.

Let's say we have a client that has has three main functionalities: a constructor, a method `A` that can onl be accessed through the use of the instantiated client, and a method `AB` that is only valuable after `A` is called, like in the following example:

```ts
export class ClientMethodDependency {
  public history: string[];

  constructor() {
    this.history = ["constructor"];
  }

  A(): void {
    this.history.push("A");
  }

  AB(): void {
    if (this.history[this.history.length - 1] !== "A") {
      throw new Error("A should have been called");
    }
    this.history.push("B");
  }
}
```

We could write three tests, as follows:

```ts
describe("Tests for the ClientMethodDependency class", function() {

  it("The ClientMethodDependency should initialize and set its history property properly", function() {
    const client = new ClientMethodDependency();
    assert.deepEqual(client.history, ["constructor"]);
  });

  it("The ClientMethodDependency's A method should alter the client's history", function() {
    const client = new ClientMethodDependency();
    client.A();
    assert.deepEqual(client.history, ["constructor", "A"]);
  });

  it("The ClientMethodDependency's AB method should throw if it's called before A", function() {
    const client = new ClientMethodDependency();
    assert.throws(client.AB);
  });

  it("The ClientMethodDependency's AB method should alter the client's history after A is called", function() {
    const client = new ClientMethodDependency();
    client.A();
    assert.deepEqual(client.history, ["constructor", "A"]);
    client.AB();
    assert.deepEqual(client.history, ["constructor", "A", "AB"]);
  });

});
```

Each test's goal is to verify the behavior of a single functionality, even though some have to rely on a more complex setup than others.

If there are no function calls in a test, a single test case must compare the values of properties with similar names and similar values, for example:

```ts
import { version } from "../some/path/constants.ts";

describe("testing some of the client's public properties", function() {
  let client: Client;

  beforeEach(function() {
    recorder = record(this);
    client = new Client();
  });

  afterEach(function () {
    recorder.stop();
  });

  it("should have a valid version", function() {
    assert.equal(client.version, version)
  });
});
```

It's valid to test more than one property out of a single function, like in the following example:

```ts
describe("testing the client's basic methods", function() {
  let client: Client;

  beforeEach(function() {
    recorder = record(this);
    client = new Client();
  });

  afterEach(function () {
    recorder.stop();
  });

  it("should test A", async function() {
    const result = await client.A();
    assert.ok(result.value);
    assert.ok(result.createdAt instanceof Date);
    assert.ok(result.updatedAt instanceof Date);
    // And other properties...
  });
});
```

### Test titles

Test files contain `describe` blocks and `it` blocks. The first property that these functions receive will be the title of the group of tests, and the title of each test, respectively for `describe` and `it`. Let's explore these separately:

- The titles sent to the `describe` calls should represent what the collection of its inner test cases (`it` calls) are testing.
- The titles sent to each `it` call should represent what each specific test case is testing.

Therefore, `describe` titles should be written to reflect something that each of its `it` test cases (or inner `describe` blocks) share in common.

Let's build up an example. Given the following code, which will exist in a file named `internalClass.ts`:

```ts
export class InternalClass {
  returnsTrue(): boolean {
    return true;
  }
}

export class InternalInheritedClass extends InternalClass {
  returnsFalse(): boolean {
    return false;
  }
}
```

We could group all of the possible tests for that pair of classes in a single file. Let's say we call this test file `internalClass.spec.ts`. The outermost `describe` would have a general description of what are these classes related to. If these are all of our internal classes, we can set the title as `Tests for the internal classes`. Inside of that `describe`, we can set two inner `describe` blocks, one for `InternalClass` and another one for `InternalInheritedClass`, as follows:

```ts
describe("Tests for the internal classes", function() {

  describe("Tests for the InternalClass", function() {
    // ...
  });

  describe("Tests for the InternalInheritedClass", function() {
    // ...
  });

});
```

Inside of the inner describes, each test case would focus on asserting one specific behavior. For `InternalClass`, we would first assert that the class' constructor works as expected, then test it's `returnsTrue` method. For `InternalInheritedClass`, we would first assert that the class' constructor works as expected, then test it's inherited `returnsTrue` method, then it's `returnFalse` method. As follows:

```ts
describe("Tests for the internal classes", function() {

  describe("Tests for the InternalClass", function() {
    it("The InternalClass should be able to be initialized", function() {
      const Internal = new InternalClass();
      assert.exists(Internal);
    });

    it("The InternalClass's returnsTrue should return true", function() {
      const Internal = new InternalClass();
      const result: boolean = Internal.returnsTrue();
      assert.isTrue(result);
    });
  });

  describe("Tests for the InternalInheritedClass", function() {
    it("The InternalInheritedClass should be able to be initialized", function() {
      const Internal = new InternalInheritedClass();
      assert.exists(Internal);
    });

    it("The InternalInheritedClass's returnsTrue should return true", function() {
      const Internal = new InternalInheritedClass();
      const result: boolean = Internal.returnsTrue();
      assert.isTrue(result);
    });

    it("The InternalInheritedClass's returnsFalse should return false", function() {
      const Internal = new InternalInheritedClass();
      const result: boolean = Internal.returnsFalse();
      assert.isFalse(result);
    });
  });

});
```

In addition to being expressive, test titles might have specific hashtags (as in, words preceded by the pound sign), to facilitate pattern matching.

You can see a working example of tests for internal code in our [test/internal/ folder in our template project](../sdk/template/template/test/internal/).

#### Pattern matching test titles

`mocha` allows us to only run certain tests as long as they match a given query, with the following arguments:

```
Test Filters
  --fgrep, -f   Only run tests containing this string                   [string]
  --grep, -g    Only run tests matching this string or regexp           [string]
  --invert, -i  Inverts --grep and --fgrep matches                     [boolean]
```

To be able to filter tests through pattern matching with any of these filters, the `describe` and `it` titles can have any hashtag, but preferably one or more of the following:

- `#browser` for tests that are only expected to run in the browser.
- `#node` for tests that are only expected to run on NodeJS.
- `#live` for tests that should only run live and not be recorded, nor played back.

### Inner parts of a test

While writing test cases, it will be easier to think of the test case's contents as if there were three clear divisions:

- The first lines of the test should deal with setting up the necessary variables and values that will be used for the main functionality that will be tested.
- The body of the test should focus on using these values to trigger the main functionality that is being tested.
- The last set of lines should be focused on comparing the results obtained, to confirm that they are in the expected shape, or contain the expected values.

### Using conditionals

Ideally, each test case should only have one possible behavior. To minimize unexpected outcomes, conditionals should be avoided. The only case in which conditionals are encouraged is to specify when to skip a test. Some tests might only run in a browser, or only run in NodeJS, or only run live (no record or playback), for this purpose, conditionals can be used. For example:

```ts
import { isNode } from "@azure/core-http";

describe("testing the client's basic methods", function() {
  let client: Client;

  beforeEach(function() {
    recorder = record(this);
    client = new Client();
  });

  afterEach(function () {
    recorder.stop();
  });

  it("should test A #node", function() {
    if (!isNode) {
      return this.skip();
    }
    // Test contents..
  });

  it("should test B #browser", function() {
    if (isNode) {
      return this.skip();
    }
    // Test contents..
  });

  it("should test C #live", function() {
    if (process.env.TEST_MODE) {
      return this.skip();
    }
    // Test contents..
  });
});
```

In case conditionals might appear to be necessary in other scenarios, consider separating the test case into as many test cases as necessary first.

You can see a working example of conditionals in our [conditionals.spec.ts test in our template project](../sdk/template/template/test/public/conditionals.spec.ts).

### Using delays

The API methods that we provide should always provide a way for users to know when an operation finishes. For this reason, any method that doesn't immediately respond with a completed operation should use our [Long Running Operations strategy (core-lro)](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/core-lro).

If any method can't use `core-lro` within reasonable time, and thus we are inclined to use a different delay strategy, we should always wait until the next possible operation is can be fulfilled.

For example, in `@azure/keyvault-keys` we provide a method to purge keys that has not been moved to use `core-lro`. To check that it has finished, we do a while loop where we try to make the next operation until it passes:

```ts
import { delay } from "@azure/test-utils-recorder";
// ...

describe("Keys client - restore keys and recover backups", () => {
  // ...
  it("can restore a key with a given backup", async function() {
    // ...
    await client.createKey(keyName, "RSA");
    const backup = await client.backupKey(keyName);
    await client.purgeDeletedKey(keyName);
    while (true) {
      try {
        await client.restoreKeyBackup(backup as Uint8Array);
        break;
      } catch (e) {
        console.log("Can't restore the key since it's not fully deleted:", e.message);
        console.log("Retrying in one second...");
        // This delay method comes from the recorder
        await delay(1000);
      }
    }
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    // ...
  });
  // ...
});
```

Keep in mind that Mocha will have a timeout configuration that will prevent this to run up forever.

The specific `delay` method used in the code above comes from the [Recorder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder), so that in playback, there will be no delay at all, and tests will pass as soon as possible.

### Exceptions and edge cases

While testing the Azure SDK clients for JavaScript and TypeScript, we should document each client method exceptions through the use of `@throws` in the TypeDoc documentation, and avoid writing test cases for exceptions. Test cases should focus on demonstrating the public API of the service. Exceptions should be documented.

Similarly, the public API surface of our clients will contain a large set of properties resulting from any of the methods that our clients implement. Tests should not focus on verifying that each property of of our clients exist. While tests can check that the values of properties are expected, they should include only as many properties as it can be relevant for the use case that each test case is representing. For this purpose we should also take advantage of strict types. If our types can be descriptive and thorough, and our internal code is not skipping through the types (through the use of `any`), we will be able to trust that our API is behaving reasonably well.

As a final note on this regard, as we develop clients for the SDKs, we will encounter edge cases in the services we are testing. Edge cases should be reported and documented, but our tests should preferably avoid having to go through them, unless we can identify some of these cases as valuable resources for our customers.

### How tests should look

In general, the tests of the Azure SDK for JavaScript and TypeScript should be considered useful resources that demonstrate how to use the functionalities that our clients offer, and how these are expected to behave. Our test cases should assert that we are providing well constructed features to our users, and our users should be able to go through our tests, understand them with minimal effort, and use our test code to their advantage. Our tests should therefore be _empowering everyone_.

You may take the following questions as an exercise to help determine if your tests are clear enough. When answering them, try to provide reasons that might be convincing to yourself and someone you might request review from:

- When someone sees our projects, are they guided to look at our tests for examples of how to use our APIs?
- Are we explaining or linking to explanations of how to run our tests with or without live resources?
    - In case users want to run tests against live resources, are we providing means for easily setting up these resources, as well as an explanation of what resources will need to be purchased for the tests to run?
- When our test folders are opened, do people know how to distinguish between our internal tests and the tests that they will be able to use as references for our APIs?
- Are the names of the folders, the file names and the individual test cases relevant to what each test, and each group of tests are testing?
- If a test file is opened, can people follow through what's going on without having to open other files? (comments should help).
- Upon examining an individual test, is it clear...
    - Under which conditions this test might be executed?
    - What portion of the test is dedicated to the preparation of the resources needed to execute the target test case?
    - What is the target test case? (preferably, what method of the API we're testing and why).
    - Why the assertions are meaningful?
- Regardless of where or when our tests run, are they as fast as possible? Do they finish in reasonable time?

If all of these questions have reasonably convincing answers, you can feel confident that your tests are good enough for an external review.

## Getting feedback

Writing tests the right way can be quite challenging. Make sure to make pull request throughout the process and ask for feedback from your team. Ask them questions about how easy is to follow through, from the perspective of a new user. Once you write them, monitor how they behave through our Engineering Systems. Don't be afraid to ask our Engineering Systems team about feedback to your tests, they will provide great insight on how to optimize for performance, by helping you potentially reduce the number of resources used and the overall duration of your tests. Making your tests constantly better is your responsibility as a developer, but you have all of your team at your back. Together, we can make our tests are as good as they can possibly be.
