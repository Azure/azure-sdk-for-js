## Azure SDK for JavaScript's test-utils-recorder

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

Our test-utils-recorder attempts to provide an answer for those questions,
as you'll be able to see throughout this README.
 
This library provides interfaces and helper methods to equip the SDKs in the
azure-sdk-for-js repo with the recording and playback capabilities for the
tests, it targets HTTP requests in both Node.js and the Browsers.

test-utils-recorder, as part of the Test Utils available in this repository, it
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

- To **record** means to intercept any HTTP request, store it in a file, then
  store the response received from the live resource that was originally
  targeted. We use a couple of mechanisms to do this for NodeJS and the
  browser. The output files are stored in `recordings/node/*` and in
  `recordings/browser/*`, which are relative to the root of the project you're
  be working on.
- To **playback** means to intercept any HTTP request and to respond it with the
  stored response of a previously recorded matching request.

## Getting started

We're about to go through how to set up your project to use the test-utils-recorder.
We'll be using git and [rush](https://rushjs.io). We understand that both tools
can be challenging to use, but we expect you to know how to use them by the
time you decide to use this package. If you encounter any problem with these
tools, please make sure to check at their documentation first, but we're also
happy to answer any question! We appreciate that you're reading this 💙

Keep in mind that test-utils-recorder is not a published package. It is only intended to be used
by our libraries (at least for now).

### Installing the package

To install the test-utils-recorder package, you'll need to start by cloning our
azure-sdk-for-js repository. One way of doing this is by using the git command
line interface, as follows:

    cd /path/to/my/github/repositories
    git clone https://github.com/Azure/azure-sdk-for-js/

Having cloned this repository, let's set it up by running the following rush commands:

    cd azure-sdk-for-js
    rush update
    rush install
    rush build

This will optimistically assume you're in a fresh clone.

From this point forward, we'll assume that you're developing (perhaps
contributing!) to one of our libraries. So, your next step is to change
directory to the path relevant to your project. Let's say you want to add
test-utils-recorder to the package `@azure/keyvault-keys` (it already uses test-utils-recorder,
but bear with us), you'll be doing the following:

    cd sdk/keyvault/keyvault-keys

One there, you can add the test-utils-recorder package by running the following rush command:

    rush add -p @azure/test-utils-recorder

And you're ready! Now you can use the common recorder in your code, as shown below:

```typescript
import * as commonRecorder from "@azure/test-utils-recorder";
```

The common recorder provides the following public methods and properties:

- `record`: Which deals with recording and playing back the network requests,
  depending on the value assigned to the `TEST_MODE` environment variable.
  If `TEST_MODE` equals to `record`, it will automatically store every network
  request in a plain text file in the folder `recordings` at the root of your
  repository (which for our example case is the root of the
  `@azure/keyvault/keyvault-keys` repository). It must be used inside of Mocha's
  tests, since it uses [nise](https://www.npmjs.com/package/nise) under the hood.
  It also returns an object with a method `stop()`, which will allow you to control when
  you want the recorder to stop re-routing your http requests.
- `env`, which exposes the environment variable's object from either NodeJS or
  the browser (useful on isomorphic tests).
- `delay`, which is an asynchronous function that will resolve once the given milliseconds have elapsed,
  but only while the `TEST_MODE` is not `playback`, since you want to make sure you can run the playback tests
  as fast as possible.
- `isRecordMode`, which is a shorthand for checking if the environment variable
  `TEST_MODE` is set to `record`.
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

Having the common recorder as a dependency means that you'll be able to start
recording tests right away by using the exported method `record`. We'll get
into the details further down this document. This function will do recordings,
or will play back previous recordings, depending on an environment variable:
`TEST_MODE`. If the environment variable `TEST_MODE` is empty, `record` (and most
of the functions provided by test-utils-recorder) won't be doing anything. You'll need
to set this environment variable to `record` to start recording, and then to
`playback` to play the recordings back at your code.

#### package.json scripts

You can write scripts in your `package.json` to
make it easier to switch from record mode to playback mode, on a meaningful context, as follows:

    "integration-test:node": "mocha myNodeTests.js",
    "unit-test:node": "TEST_MODE=playback npm run integration-test:node",
    "test:node:record": "TEST_MODE=record npm run integration-test:node"


Once your tests run, new files will be created in the `recordings/*` folder.
These files will have names that are relative to the tests that you have.
There might be cases in which the recordins get outdated with the test files, so you might also want to
add a way to clear the recordings on your `package.json`, like the following one:

    "clear-recordings": "rm -fr recordings",

#### Karma configuration

To make sure you're able to do record and playback on your browser tests, make
sure to configure Karma properly.

The recordings are separated between NodeJS recordings and browser recordings,
so to use them on Karma, You'll at least need to add the recordings to your
`files` array in your `karma.conf.js`, as follows:

    files: [
      // ... you might have other things here. Keep them.
      "recordings/browsers/**/*.json"
    ],

Same goes on the `preprocessors` array:

    preprocessors: {
      // ... you might have other things here. Keep them.
      "recordings/browsers/**/*.json": ["json"]
    },

You can also tell Karma to hide console.logs in during the playbacks in the browsers by adding
the following configuration property:

    browserConsoleLogOptions: {
      terminal: process.env.TEST_MODE !== "record"
    },

#### Environment variables

Since we make use of the `TEST_MODE` environment variables, we recommend you to
take control of how you deal with environment variables for your tests. One way
of doing this is with the [dotenv](https://www.npmjs.com/package/dotenv)
project, which is what we mostly use in our packages. dotenv comes with its own
issues, since it might act unexpectedly in relation with already assigned
environment variables. dotenv doesn't replace any environment variable that is
set by another source, so keep that in mind.

For how to hide sensitive information related to environment variables, check
out our example called [Securing sensitive data](#securing-sensitive-data).

## Examples

### How to record

To record your tests, make sure to call to the `record` function exported from
the test-utils-recorder, then call it before the http request you want to make
happens. In the following example, we'll be starting to record before
authenticating our KeyVault client:

```typescript
import { env, record, Recorder } from "@azure/test-utils-recorder";
import { KeysClient } from "@azure/keyvault-keys";

describe("My test", () => {
  let recorder: Recorder;
  let client: KeysClient;

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

  afterEach(function () {
    recorder.stop();
  });
});
```

If you run the previous test with Mocha, and you set the `TEST_MODE`
environment variable to `record`, the common recorder will create a recording file located in
`recordings/node/my_test/recording_before_each_hook.js` with the contents of the HTTP request
as well as the contents of the HTTP response.

You'll see in the code above that we're calling to `recorder.stop`. This is so
that, after each test, we can stop recording and the test file can be
generated. We recommend creating new recorders on `beforeEach` and stopping the
recorder on `afterEach` to make sure that the generated files are smaller and
easier to understand than by having them all in one chunk.

> **Note:** By this point you might have noticed that the values in the environment variables will be stored in the recordings.
> We'll make sure this doesn't happen in the [Securing sensitive data](#securing-sensitive-data) example.

To add recorded tests, feel free to extend this file with as many subsequent
`it()` calls as you need, each one of them is going to end up in their appropriate file.

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

  afterEach(function () {
    recorder.stop();
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
set to `playback`.  You'll notice how they pass much faster. This time, they
will not reach out to the remote address, but instead they will respond every
request according to their matching copy stored in the recordings.

### Update existing recordings

Once you have your recorded files, to update them after changing one of the tests, simply
re-run the tests with `TEST_MODE` set to `record`. This will overwrite previously existing files.

> **Note:** If you rename the file of the test, or the name of the test, the path
> of the recording will change. If you do these kind of changes, make sure to delete your recordings folder.
> The common recorder will re-generate only the updated tests.

### Skipping tests

Writing live tests can take considerable time, specially since each time you
want to check that everything works fine, you potentially need to run again
every test. With the common recorder, you can specify what test to run by following Mocha's
approach of setting certain tests to `it.only`, and also to skip specific tests
with `it.skip`.  If you launch the recorder in record mode with some of these
changes (and given that you activate the recorder on `beforeEach`), only the
files that relate to the changed tests will be updated.  Skipped tests won't
update their recordings. This way, you can focus on fixing a specific set of
test with `.only`, then remove all the `.only` calls and trust that the playback will
keep confirming that the unaffected tests are fine and green.

### Securing sensitive data

Live tests need to do sensitive operations, like authenticating with your Azure
credentials.  To protect this information from the recordings, the
test-utils-recorder provides the following functions:

- `setReplaceableVariables`, which will allow you to hide sensitive content
  from the environment variables (more on that later).
- `setReplacements`, which will allow you to hide sensitive content by doing
  pattern matching in the output files.
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
import { setReplaceableVariables } from "@azure/test-utils-recorder";

// Do this inside of the beforeEach, before you start recording.
setReplaceableVariables({
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
  KEYVAULT_NAME: "keyvault_name"
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
setReplacements([
  (recording: string): string =>
    recording.replace(/mango/g, "bananas"),
]);
```

#### skipQueryParams

Some HTTP requests migth have parameters with sensitive information. To get
them out of your recordings, you can call to `skipQueryParams` with a key-value
plain object where you specify the name of the query parameter you want to replace,
and the value you want to end up storing, as follows:

```typescript
skipQueryParams({
  myQueryParameter: "theValueIWantStoredInMyRecordings",
  anotherQueryParameter: "theOtherValueIWantStoredInMyRecordings",
});
```

### Ever-changing tests

Sometimes, your tests will do requests with unpredictable code.
The best way to ensure that your ever-changing tests pass on playback mode is to
use `setReplacements` or `skipQueryParams` to avoid having the changing contents
as part of your recordings.

### Supporting parallelism

A common issue while running integration tests is that, sometimes two persons
or machines might try to run the same set of tests against the same resource.
This is not directly related to the test-utils-recorder package, but if you're
getting into issues because of concurrent conflicting requests, we understand,
and we might be able to help by providing you with the following suggestions:

1. Use randomly generated strings as prefixes or suffixes for the resources you
create.  This will help you, but it will also only work so far, since new
resources are likely to get accumulated, even if you set code to delete them in
between tests, since some tests will eventually fail and crash your program.
2. Set up a separate program as part of your CI to automatically create and
destroy new resources each time you run a test. It doesn't sound easy, but it
might be a better solution.  You'll need to make sure to clear resources in
case this program fails.

These ideas come with their own issue and things to consider, so please take them
as ideas. We understand that might not be an easy problem to fix.

### Isomorphic tests

The test-utils-recorder does support running in the browser. If you use Karma,
as long as your karma configuration is correct, your tests should work both on
NodeJS and in the browsers!

## Troubleshooting

Besides the usual debugging of your code and tests, if you ever encounter a
problem while recording your tests, make sure to read the output in the
recordings. If the output is not what you expected, please follow up the
[contributing](#contributing) guidelines on how to write an issue for us. We'll
make sure to handle it as soon as we find the time.

## Next steps

The common recorder might not be used yet in each one of our libraries (we're working on it).
In the mean time, an easy way to find where we're using this package is by going through the following search link:
<https://github.com/Azure/azure-sdk-for-js/search?q=test-utils-recorder>

## Contributing

This project welcomes contributions and suggestions. Please read the
[contributing guidelines](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md)
for detailed information about how to contribute and what to expect while contributing.


### Testing

To run our tests, first install the dependencies (with `npm install` or `rush install`),
then run the unit tests with: `npm run unit-test`.

---

Thank you for your time!

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/test-utils/recorder/README.png)
