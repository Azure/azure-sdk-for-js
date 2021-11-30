## Azure test-recorder SDK client library for JavaScript

### **Note: This project is a test utility that assits with testing the packages maintained at the Azure SDK for JavaScript repository. This is not intended for the public utilization.**

The Azure SDK for JavaScript is composed of a multitude of repositories that
attempt to deliver a common, homogenous SDK to make use of all of the services
that Azure can provide. Among the challenges of such a goal, we have some that
are specific to tests, some of which we can summarize in the following
questions:

- How to write live tests that can work as unit tests?
- How to ensure that tests are as fast as they can be?
- How to avoid writing mocked versions of our HTTP API?
- How to protect sensitive data from our live tests?
- How to write tests that support parallelism?
- How to write isomorphic tests for NodeJS and the Browsers?

Our non-published package `@azure-tools/test-recorder` attempts to provide an
answer for those questions, as you'll be able to see throughout this README.

This library provides interfaces and helper methods to equip the SDKs in the
azure-sdk-for-js repo with the recording and playback capabilities for the
tests, it targets HTTP requests in both Node.js and the Browsers.

test-recorder, as part of the Test Utils available in this repository, it
is supposed to be added only as a devDependency and should be used only for the
tests of an sdk.

## Index

- [Key concepts](#key-concepts).
- [Getting started](#getting-started).
  - [Installing the package](#installing-the-package).
  - [Configuring your project](#configuring-your-project).
- [Examples](#examples).
  - [How to record](#how-to-record).
  - [How to playback](#how-to-playback).
  - [Updating existing recordings](#updating-existing-recordings).
  - [Skipping tests](#skipping-tests).
  - [Securing sensitive data](#securing-sensitive-data).
  - [Ever-changing tests](#ever-changing-tests).
  - [Supporting parallelism](#supporting-parallelism).
  - [Isomorphic tests](#isomorphic-tests).
- [Troubleshooting](#troubleshooting).
- [Next steps](#next-steps).
- [Contributing](#contributing).

## Key concepts

- To **record** means to intercept any HTTP request (specifically, every
  http.request call and browser's XMLHttpRequest calls), store it in a file,
  then store the response received from the live resource that was originally
  targeted. We use a couple of mechanisms to do this for NodeJS and the
  browser. The output files are stored in `recordings/node/*` and in
  `recordings/browser/*`, which are relative to the root of the project you're
  working on.
- To **playback** means to intercept any HTTP request and to respond it with the
  stored response of a previously recorded matching request.
- **Sensitive information** means content that should not be shared publicly.
  Content like passwords, unique identifiers or personal information should be
  cleaned up from the recordings. Some functionality is provided to fix this
  problem. You can read more at [Securing sensitive data](#securing-sensitive-data).

## Getting started

We're about to go through how to set up your project to use the
`@azure-tools/test-recorder` package.

This document assumes familiarity with [git](https://git-scm.com) and [rush](https://rushjs.io).
You can read more about how we use rush in the following links:

- Rush used for [Project Orchestration](https://github.com/sadasant/azure-sdk-for-js/blob/master/CONTRIBUTING.md#project-orchestration).
- [Rush for NPM users](https://github.com/sadasant/azure-sdk-for-js/blob/master/CONTRIBUTING.md#rush-for-npm-users).

Keep in mind that `@azure-tools/test-recorder` is not a published package. It
is only intended to be used by the libraries in the azure-sdk-for-js repository
(at least for now).

### Installing the package

To install the `@azure-tools/test-recorder` package, you'll need to start by
cloning our azure-sdk-for-js repository. One way of doing this is by using the
git command line interface, as follows:

```bash
cd /path/to/my/github/repositories
git clone https://github.com/Azure/azure-sdk-for-js/
```

Having cloned this repository, let's set it up by running the following rush commands:

```bash
cd azure-sdk-for-js
rush update
rush install
rush build
```

This will optimistically assume you're in a fresh clone.

From this point forward, we'll assume that you're developing (perhaps
contributing!) to one of the azure-sdk-for-js's libraries. So, your next step
is to change directory to the path relevant to your project. Let's say you want
to add the `@azure-tools/test-recorder` package to `@azure/keyvault-keys` (it
already uses test-recorder, but bear with us), you'll be doing the
following:

```bash
cd sdk/keyvault/keyvault-keys
```

Once there, you can add the test-recorder package by changing your package.json
to include the following line in the devDependencies:

```bash
{
  // ... your package.json properties
  "devDependencies": {
    // ... your devDependencies
    "@azure-tools/test-recorder": "1.0.0",
    // ... more of your devDependencies
  },
  // ... more of your package.json properties
}
```

After that, we recommend you to update rush and install the dependencies again, as follows:

```bash
rush update && rush install
```

And you're ready! Now you can use the common recorder in your code, as shown below:

```typescript
import * as commonRecorder from "@azure-tools/test-recorder";
```

Or, if you know what functions you want to import, you can also do the following:

```typescript
import { record, env, delay } from "@azure-tools/test-recorder";
```

The common recorder provides the following public methods and properties:

- `record()`: Which deals with recording and playing back the network requests,
  depending on the value assigned to the `TEST_MODE` environment variable. If
  `TEST_MODE` equals to `record` or `soft-record`, it will automatically store network requests
  in a plain text file in the folder `recordings` at the root of your
  repository (which for our example case is the root of the
  `@azure/keyvault/keyvault-keys` repository).
  This package assumes that the tests in the sdk are leveraging
  [mocha](https://mochajs.org/) and [rollup](https://rollupjs.org/guide/en/)
  (and [karma](https://karma-runner.github.io/latest/index.html) test runner
  for browser tests) as suggested by the [template](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/template/template)
  package in the repo. It also returns an object with a method `stop()`, which
  will allow you to control when you want the recorder to stop re-routing your
  http requests.
- `Recorder`: The return of the `record()` method is going to be an instance of the
  `Recorder`, which has some useful functions: `stop`, `skip`, `getUniqueName`,
  and `newDate`. `stop` will stop the recorder from storing a copy of the HTTP
  requests and responses. `skip` will pause the recorder only during the test
  from which skip was called. `getUniqueName` allows you to get unique strings,
  which you can use to create unique resources, so that you can run the same
  set of live tests in parallel without colliding. And `newDate` will allow you
  to generate dates that don't change during playback.
- `env`, which exposes the environment variable's object from either NodeJS or
  the browser (useful on isomorphic tests).
- `delay`, which is an asynchronous function that will resolve once the given milliseconds have elapsed,
  but only while the `TEST_MODE` is not `playback`, since you want to make sure you can run the playback tests
  as fast as possible.
- `isRecordMode`, which is a shorthand for checking if the environment variable
  `TEST_MODE` is set to `record` or `soft-record`.
- `isSoftRecordMode`, which is a shorthand for checking if the environment
  variable `TEST_MODE` is set to `soft-record` only.
- `isPlaybackMode`, which is a shorthand for checking if the environment
  variable `TEST_MODE` is set to `playback`.
- `setReplaceableVariables`, which will allow you to hide sensitive content
  from the environment variables (more on that later).
- `setReplacements`, which will allow you to hide sensitive content by doing
  pattern matching in the output files.
- `skipQueryParams`, since query parameters may contain sensitive information,
  the array provided to method will signal what query parameters to remove from
  the recordings.

### Configuring your project

Having the common recorder as a devDependency means that you'll be able to start
recording tests right away by using the exported method `record()`. We'll get
into the details further down this document. This function will do recordings,
or will play back previous recordings, depending on an environment variable:
`TEST_MODE`. If the environment variable `TEST_MODE` is empty, `record()` (and most
of the functions provided by test-recorder) won't be doing anything. You'll need
to set the `TEST_MODE` environment variable to `record` (or `soft-record`) to start recording, and then to
`playback` to play the recordings back at your code.

#### package.json scripts

You can write scripts in your `package.json` to
make it easier to switch from record mode to playback mode, on a meaningful context, as follows:

```json
{
  // ... your package.json properties
  "integration-test:node": "mocha myNodeTests.js",
  "unit-test:node": "TEST_MODE=playback npm run integration-test:node",
  "test:node:record": "TEST_MODE=record npm run integration-test:node"
  // ... more of your package.json properties
}
```

Once your tests run, new files will be created in the `recordings/*` folder.
These files will have names that are relative to the tests that you have.
There might be cases in which the recordings get outdated with the test files, so you might also want to
add a way to clear the recordings on your `package.json`, like the following one:

```json
{
  // ... your package.json properties
  "clear-recordings": "rm -fr recordings"
  // ... more of your package.json properties
}
```

#### Environment variables

Since we make use of the `TEST_MODE` environment variable, we recommend you to
take control of how you deal with environment variables for your tests. If you
don't want to set environment variables, you can use a tool like
[dotenv](https://www.npmjs.com/package/dotenv) to set them for you. Remember to
do one or the other, not both, as dotenv will not overwrite your existing
environment variables.

#### Karma configuration

To make sure you're able to do record and playback on your browser tests, make
sure to configure Karma properly.

The recordings are separated between NodeJS recordings and browser recordings,
so to use them on Karma, You'll at least need to add the recordings to your
`files` array in your `karma.conf.js`, as follows:

```typescript
config.set({
  // ... more configuration properties here
  files: [
    // ... you might have other things here. Keep them.
    "recordings/browsers/**/*.json"
  ]
  // ... more configuration properties here
});
```

Same goes on the `preprocessors` array:

```typescript
config.set({
  // ... more configuration properties here
  preprocessors: {
    // ... you might have other things here. Keep them.
    "recordings/browsers/**/*.json": ["json"]
  }
  // ... more configuration properties here
});
```

You will also need to set the following configuration so that Karma passes the
correct environment variables to the browser runtime:

```typescript
config.set({
  // ... more configuration properties here
  envPreprocessor: [
    // ... you might have other things here. Keep them.
    "TEST_MODE"
  ]
  // ... more configuration properties here
});
```

As an optional step, you can also tell Karma to hide console.logs in during the
playbacks in the browsers by adding the following configuration property:

```typescript
config.set({
  // ... more configuration properties here
  browserConsoleLogOptions: {
    terminal: process.env.TEST_MODE !== "record"
  }
  // ... more configuration properties here
});
```

For a more detailed and opinionated approach, please check out the following
section of our guidelines:
[Setting up karma.conf.js file in the SDK](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/GUIDELINES.md#setting-up-karmaconfjs-file-in-the-sdk).

## Examples

### How to record

To record your tests, make sure to set the environment variable `TEST_MODE` to
`record` or `soft-record`, then in your code, call to the `record()` function exported from
`@azure-tools/test-recorder`, then call it before the http request you want to
make. In the following example, we'll invoke the `record()` method before
authenticating our KeyVault client:

```typescript
import { env, record, Recorder } from "@azure-tools/test-recorder";
import { KeysClient } from "@azure/keyvault-keys";

describe("My test", () => {
  let recorder: Recorder;
  let client: KeysClient;

  beforeEach(async function() {
    recorder = record(this);

    // This is an example of how the environment variables are used
    const credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    // This example also shows that HTTP requests must be made after the record() method is called.
    const keyVaultUrl = "https://myKeyVault.vault.azure.net";
    client = new KeysClient(keyVaultUrl, credential);
  });

  afterEach(async function() {
    await recorder.stop();
  });
});
```

After running this test with the `TEST_MODE` environment variable set to
`record`, the common recorder will create a recording file located in
`recordings/node/my_test/recording_before_each_hook.js` with the contents of
the HTTP request as well as the contents of the HTTP response.

If `TEST_MODE` is set to `soft-record` instead, the recorder will only create
this recording file if the test has changed from a previous execution.

You'll see in the code above that we're invoking `recorder.stop`. This is so
that, after each test, we can stop recording and the test file can be
generated. We recommend creating new recorders on `beforeEach` and stopping the
recorder on `afterEach` to make sure that the generated files are smaller and
easier to understand than by having them all in one chunk.

> **Note:** By this point you might have noticed that the values in the environment variables will be stored in the recordings.
> We'll make sure this doesn't happen in the [Securing sensitive data](#securing-sensitive-data) example.

To add recorded tests, feel free to extend this file with as many subsequent
`it()` calls as you need. Any HTTP request in these tests will be added to the
recordings.

```typescript
  beforeEach(async function() {
    recorder = record(that);
    const credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    const keyVaultUrl = "https://myKeyVault.vault.azure.net";
    client = new KeysClient(keyVaultUrl, credential);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("my first test", async function() {
    const result = await client.createKey("First key", "RSA");
    assert.equal(result.name, "First key");
  });

  it("my second test", async function() {
    const result = await client.createKey("Second key", "RSA");
    assert.equal(result.name, "Second key");
  });

  // And so on...
});
```

### How to playback

Once you have recorded something, you can run your tests again with `TEST_MODE`
set to `playback`. You'll notice how they pass much faster. This time, they
will not reach out to the remote address, but instead they will respond every
request according to their matching copy stored in the recordings.

### Update existing recordings

Once you have your recorded files, to update them after changing one of the tests, simply
re-run the tests with `TEST_MODE` set to `record`. This will overwrite previously existing files.
Or re run the tests with `TEST_MODE` set to `soft-record` to only overwrite the files related to
tests that have changed.

> **Note:** If you rename the file of the test, or the name of the test, the
> path of the recording will change. Make sure to delete the recordings
> corresponding to the deleted tests. If at any point in time you lose your
> recordings, don't worry. Running your tests with `TEST_MODE=recording` will
> re-generate them.

### Skipping tests

Writing live tests can take considerable time, specially since each time you
want to check that everything works fine, you potentially need to run again
every test. With the common recorder, you can specify what test to run by following Mocha's
approach of setting certain tests to `it.only`, and also to skip specific tests
with `it.skip`. If you launch the recorder in record mode with some of these
changes (and given that you activate the recorder on `beforeEach`), only the
files that relate to the changed tests will be updated. Skipped tests won't
update their recordings. This way, you can focus on fixing a specific set of
test with `.only`, then remove all the `.only` calls and trust that the playback will
keep confirming that the unaffected tests are fine and green.

You can also skip specific tests with `recorder.skip(runtime?: "node" | "browser")`,
which will skip the test in node or browser runtimes based on the `{runtime}`
argument. If the `{runtime}` is undefined, the test will be skipped in both the
node and browser runtimes. This method has no effect if the TEST_MODE
environment variable is neither "record" nor "playback". You can read more
about this feature [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/GUIDELINES.md#skipping-a-test).

### Securing sensitive data

Live tests need to do sensitive operations, like authenticating with your Azure
credentials. To protect this information from the recordings,
`@azure-tools/test-recorder` provides the following functions:

- `setReplaceableVariables`, which will allow you to hide sensitive content
  from the environment variables (more on that later).
- `setReplacements`, which will allow you to hide sensitive content by doing
  pattern matching in the recordings of the tests' HTTP requests.
- `skipQueryParams`, since query parameters may contain sensitive information,
  the array provided to method will signal what query parameters to remove from
  the recordings.

Let's see some examples.

#### setReplaceableVariables

This method will allow you to specify what environment variables have sensitive information.
Give to this function a plain object composed of the names of the environment
variables that can't be stored in the recordings, with the values you want to
store instead. To solve this issue in our previous example test, you may do the following:

```typescript
// You'll be most certainly importing more than this method.
import { setReplaceableVariables } from "@azure-tools/test-recorder";

// Do this inside of the beforeEach, before you start recording.
setReplaceableVariables({
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
  KEYVAULT_URI: "https://keyvault_name.vault.azure.net"
});
```

If you record the tests with that change, you should see the values of those
environment variables replaced with their safe counterpart.

#### setReplacements

A more generic way to clean up your recordings is by providing you with the
final string of the recording, to which you'll be able to make arbitrary
changes. The `setReplacements` method expects to receive an array of functions, all of which will receive
the recorded string and return a string.

Let's say your project can't include the word `mango`. You will be able to get rid of it with the following code inside your `beforeEach`:

```typescript
setReplacements([(recording: string): string => recording.replace(/mango/g, "bananas")]);
```

This lets you have control over the generated recordings and filter any
sensitive information even before checking them in a pull request.

#### skipQueryParams

Some HTTP requests might have parameters with sensitive information. To get
them out of your recordings, you can call to `skipQueryParams` with an array of strings
where you specify the names of the query parameter you want to remove.

For example, given that we find this query parameters in our recordings:
`?sv=2018-11-09&sr=c&sig=<sig>&sktid=<sktid>&skv=2018-11-09&se=2019-08-07T07%3A00%3A00Z&sp=rwdl`,
if we don't want the parameters "sr", "sig" and "sp" to appear in these files, we can do the following:

```typescript
skipQueryParams(["sr", "sig", "sp"]);
```

### Ever-changing tests

Sometimes, your tests will do requests with unpredictable code.
The best way to ensure that your ever-changing tests pass on playback mode is to
use `setReplacements` or `skipQueryParams` to avoid having the changing contents
as part of your recordings.

### Supporting parallelism

A common issue while running integration tests is that, sometimes two persons
or machines might try to run the same set of tests against the same resource.
This is not directly related to the `@azure-tools/test-recorder` package, but
if you're getting into issues because of concurrent conflicting requests, we
understand, and we might be able to help by providing you with the following
suggestions:

1. Use randomly generated strings as prefixes or suffixes for the resources you
   create. This will help you, but it will also only work so far, since new
   resources are likely to get accumulated, even if you set code to delete them in
   between tests, since some tests will eventually fail and crash your program.
2. Set up a separate program as part of your CI to automatically create and
   destroy new resources each time you run a test. It doesn't sound easy, but it
   might be a better solution. You'll need to make sure to clear resources in
   case this program fails.

These ideas come with their own issue and things to consider, so please take them
as ideas. We understand that might not be an easy problem to fix.

### Isomorphic tests

`@azure-tools/test-recorder` does support running tests in the browser. If you
use Karma, as long as your karma configuration is correct, your tests should
work both on NodeJS and in the browsers!

## Troubleshooting

Besides the usual debugging of your code and tests, if you ever encounter a
problem while recording your tests, make sure to read the output in the
recordings. If the output is not what you expected, please follow up the
[contributing](#contributing) guidelines on how to write an issue for us. We'll
make sure to handle it as soon as we find the time.

## Next steps

The common recorder might not be used yet in each one of the libraries in the
azure-sdk-for-js repository (we're working on it). In the mean time, an easy
way to find where we're using this package is by going through the following
search link:
<https://github.com/Azure/azure-sdk-for-js/search?q=test-recorder>

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Frecorder%2FREADME.png)
