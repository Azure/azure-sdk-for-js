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

Writing tests for JavaScript and TypeScript requires testing tools,
such as a test framework, an assertion library and a way to bundle and run these tests on various environments.
The JavaScript community has many overlapping tools that one could pick to fulfill any of these tasks.
To ensure that the testing experience across the Azure SDK for JS/TS is consistent and reliable,
we've picked the following external testing tools:

- [Mocha](https://www.npmjs.com/package/mocha), which offers us a well known and stable test framework
  for both NodeJS and browser tests.
- [Chai](https://www.npmjs.com/package/chai), a well known assertion library for Node and the browser.
- [Rollup](https://www.npmjs.com/package/rollup), to bundle JavaScript for different environments,
  which helps us write a single TypeScript source and trust it will compile correctly for Node and the browser.
- [Karma](https://www.npmjs.com/package/karma), which allows us to run our tests in multiple browsers.

We've also come up with our own internal tools, which follow:

- The [Recorder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder)
  is a tool that helps us run our live tests against static recordings obtained from a previous successful run,
  which aims to ensure that our code hasn't changed while benefitting from not having to reach out to real live services.

Keep in mind that, over time, we might continue to expand these lists.

Now, let's see how we're using the mentioned tools.

### Mocha

Mocha is a well known JavaScript test framework that runs in NodeJS and in the browser.
If you're new to Mocha, we recommend you to dive into [Mocha's documentation](https://mochajs.org/).

In this section, we'll explore how the Azure SDK for JS is using mocha, what versions we're using,
how we're configuring it and any other recommendation on how to used this library.

#### Mocha in our dependencies

Since we're using [Rush](https://rushjs.io/), we're forced to use the same version of our packages
in each one of the projects inside of this repository. If you want to add `mocha` as a dev dependency
to a new project inside of this repository, first make sure you are in the root folder of that project,
then you can run the following command:

```
rush add --dev -p mocha
```

To enhance the `mocha` experience, we're using the following packages:

- [`@types/mocha`](https://www.npmjs.com/package/@types/mocha), the type definitions for mocha.
- [`mocha-multi`](https://www.npmjs.com/package/mocha-multi), a way to get multiple reporters working with mocha.
- [`mocha-junit-reporter`](https://www.npmjs.com/package/mocha-junit-reporter), which produces JUnit-style XML test results.
- [`nyc`](https://www.npmjs.com/package/nyc) is [Istanbul](https://istanbul.js.org/)'s command line interface.
- [`esm`](https://www.npmjs.com/package/esm), a popular ECMAScript module loader.
- [`source-map-support`](https://www.npmjs.com/package/source-map-support),
  which provides [source map](https://github.com/mozilla/source-map) support for stack traces in node
  via the [V8 stack trace API](https://github.com/v8/v8/wiki/Stack-Trace-API).

A full `rush add` command that includes `mocha` and all of the previous dependencies follows:

```
rush add --dev -p mocha @types/mocha mocha-multi mocha-junit-reporter nyc esm source-map-support
```

We'll explore how we use these dependencies up next.

#### Configuring Mocha

Mocha is used by our test scripts in our `package.json` files. We typically invoke it with some common parameters,
and some parameters that help us specify different test targets and different ways to debug the tests.

If we only consider the common parameters sent to mocha, we can see the following:

```
mocha --require esm --require source-map-support/register --reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=- --timeout 180000 --full-trace
```

Let's understand what's going on:

- `--require esm` requires the `esm` ECMAScript module loader.
- `--require source-map-support/register` requires the `source-map-support/register`,
  to support [source map](https://github.com/mozilla/source-map) for stack traces in node.
- `--reporter mocha-multi --reporter-options spec=-,mocha-junit-reporter=-`
  which allows us to both use the `spec` reporter to output a hierarchical nested view of the test cases,
  and also produces the JUnit-style XML test results.
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

#### On the usage of before and beforeEach

#### Other general recommendations

- On describes.
- On async.
- On fat arrow functions.

### Chai

### Rollup

### Karma

### The SDK's own test utilities

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