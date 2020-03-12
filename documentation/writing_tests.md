# Writing tests for the Azure SDK for JS/TS

## Index

- [Introduction](#introduction)
- [Engineering setup](#engineering-setup)
- [Recommended tools](#recommended-tools)
  - [Mocha](#mocha)
  - [Chai](#chai)
  - [Rollup](#rollup)
  - [Karma](#karma)
  - [The SDK's own test utilities](#the-sdk-s-own-test-utilities)
- [package.json scripts](#package-json-scripts)
- [Structure of tests](#structure-of-tests)
- [Individual tests](#individual-tests)

## Introduction

## Engineering setup

## Recommended tools

Writing tests for JavaScript and TypeScript requires testing tools, such as a test framework, an assertion library and a way to bundle and run these tests on various environments. The JavaScript community has many overlapping tools that one could pick to fulfill any of these tasks. To ensure that the testing experience across the Azure SDK for JS/TS is consistent and reliable,
we've picked the following external testing tools:

- [Mocha](https://www.npmjs.com/package/mocha), which offers us a well known and stable test framework for both NodeJS and browser tests.
- [Chai](https://www.npmjs.com/package/chai), a well known assertion library for Node and the browser.
- [Rollup](https://www.npmjs.com/package/rollup), to bundle JavaScript for different environments, which helps us write a single TypeScript source and trust it will compile correctly for Node and the browser.
- [Karma](https://www.npmjs.com/package/karma), which allows us to run our tests in multiple browsers.

We've also come up with our own internal tools, which follow:

- The [Recorder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder) is a tool that helps us run our live tests against static recordings obtained from a previous successful run, which aims to ensure that our code hasn't changed while benefitting from not having to reach out to real live services.

Keep in mind that, over time, we might continue to expand these lists.

Now, let's see how we're using the mentioned tools.

### Mocha

Mocha is a well known JavaScript test framework that runs in NodeJS and in the browser. If you're new to Mocha, we recommend you to dive into [Mocha's documentation](https://mochajs.org/).

In this section, we'll explore how the Azure SDK for JS is using mocha, what versions we're using,how we're configuring it and any other recommendation on how to used this library.

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

That command by itself is still missing two things: the actual test files and a way to generate code coverage.
These two missing pieces can vary depending on what we're trying to test and how we're trying to debug the tests.

Code coverage can be added by placing `nyc` at the beginning of the line.
Keep in mind that `nyc` will **obscure the stack traces**, so it's preferable to
make separate `package.json` scripts, one for automated testing through CI, with `nyc`,
and another one for developers running tests, without `nyc`.

Then we have to point mocha to our test files. If you're **not** using `nyc`, you can point to the
bundled test file (bundled with rollup, which we will see later), typically at `dist-test/index.node.js`.
If you are using `nyc`, point mocha to the files built by the TypeScript compiler, normally at `dist-esm/test/*.test.js`.

With these considerations in mind, you can see how your package.json scripts should look at the section:
[package.json scripts](#package-json-scripts).

#### Handling timeouts

All of the tests in the Azure SDK repository should have a timeout. In the previous section, we have discussed how this timeout is defined for mocha, though the parameter `--timeout` with an additional milliseconds amount, which is sent during the invocation of mocha. Now we will define how to know how many milliseconds to pass to this parameter.

New projects inside of this repository can take a safe guess based on how much the tests on average take locally. **Existing projects** should instead...

    TODO: ASK ENGINEERING HOW TO GET THE MAX TIME PER TESTS

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

### Rollup

### Karma

### The Recorder

## package.json scripts

Your package.json test scripts related to mocha should end up looking like this:

```
"integration-test:browser": "karma start --single-run",
"integration-test:node": "nyc mocha -r esm --require source-map-support/register --reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=- --timeout 180000 --full-trace dist-esm/test/*.test.js",
"integration-test:node:no-timeout": "nyc mocha -r esm --require source-map-support/register --reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=- --no-timeouts --full-trace dist-esm/test/*.test.js",
"integration-test": "npm run integration-test:node && npm run integration-test:browser",
"unit-test:browser": "karma start --single-run",
"unit-test:node": "mocha --require source-map-support/register --reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=- --timeout 180000 --full-trace dist-test/index.node.js",
"unit-test:node:no-timeout": "mocha --require source-map-support/register --reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=- --no-timeouts --full-trace dist-test/index.node.js",
"unit-test": "npm run unit-test:node && npm run unit-test:browser",
"test:browser": "npm run clean && npm run build:test && npm run unit-test:browser",
"test:node": "npm run clean && npm run build:test && npm run unit-test:node",
"test": "npm run clean && npm run build:test && npm run unit-test",
```

## Structure of tests

## Individual tests