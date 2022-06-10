# Azure @azure-tools/test-recorder library for JavaScript

The Azure SDK for JavaScript is composed of a multitude of libraries that attempt to deliver a common, homogenous SDK to make use of all of the services that Azure can provide. Among the challenges of such a goal, we have some that are specific to tests, some of which we can summarize in the following questions:

- How to write live tests that can work as unit tests?
- How to ensure that tests are as fast as they can be?
- How to avoid writing mocked versions of our HTTP API?
- How to protect sensitive data from our live tests?
- How to write tests that support parallelism?
- How to write isomorphic tests for NodeJS and the Browsers?

Our recorder tool package `@azure-tools/test-recorder` attempts to provide an answer for those questions.

**Note: In case you're depending on `@azure-tools/test-recorder@1.x.y` and want to migrate your tests to version 2, follow the [migration guide to recorder v2 from v1](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/MIGRATION.md)**

This library provides interfaces and helper methods to equip the SDKs in the `azure-sdk-for-js` repo with the recording and playback capabilities for the tests, it targets HTTP requests in both Node.js and the Browsers.

`@azure-tools/test-recorder`, as part of the Test Utils available in this repository, it is supposed to be added only as a devDependency and should be used only for the tests of an sdk.

This tool helps to record and playback the tests in the JS repo by leveraging the unified out-of-process test proxy server.

## Index

- [Key concepts](#key-concepts)
- [Getting started](#getting-started)
  - [Installing the package](#installing-the-package)
  - [Configuring your project](#configuring-your-project)
  - [TEST_MODE](#test_mode)
- [Using the `Recorder`](#using-the-recorder)
  - [Recorder#variable()](#recordervariable)
  - [Environment Variables](#environment-variables)
  - [`@azure-tools/test-credential` package and the NoOpCredential](#azure-toolstest-credential-package-and-the-noopcredential)
  - [karma.conf - for the browser tests](#karmaconf---for-the-browser-tests)
- [Examples](#examples)
  - [How to record](#how-to-record)
  - [How to playback](#how-to-playback)
  - [Update existing recordings](#update-existing-recordings)
  - [Skipping tests](#skipping-tests)
  - [Securing sensitive data](#securing-sensitive-data)
  - [Supporting parallelism](#supporting-parallelism)
  - [Isomorphic tests](#isomorphic-tests)
  - [Many ways to run the test-proxy tool](#many-ways-to-run-the-test-proxy-tool)
- [Troubleshooting](#troubleshooting)
- [Next steps](#next-steps)
- [Contributing](#contributing)

## Key concepts

- To **record** means to intercept any HTTP request, store it in a file, then store the response received from the live resource that was originally targeted. We leverage the unified out-of-process test proxy server that is built for this use case. The output files are stored in `recordings/node/*` and in `recordings/browsers/*`, which are relative to the root of the project you're working on.
- To **playback** means to intercept any HTTP request and to respond it with the stored response of a previously recorded matching request.
- **Sensitive information** means content that should not be shared publicly. Content like passwords, unique identifiers or personal information should be cleaned up from the recordings. Some functionality is provided to fix this problem. You can read more at [securing sensitive data](#securing-sensitive-data).

## Getting started

We're about to go through how to set up your project to use the `@azure-tools/test-recorder` package.

**_Note: If you're new to this repository, follow the [ContributingGuide.md](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn how to setup/build the repo and to create/test an SDK in the [Azure/azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) repository._**

### Installing the package

From this point forward, we'll assume that you're developing (perhaps contributing!) to one of the azure-sdk-for-js's libraries. So, your next step is to change directory to the path relevant to your project. Let's say you want to add the `@azure-tools/test-recorder` package to `@azure/data-tables` (it already uses test-recorder, but bear with us), you'll be doing the following to install the package:

```bash
cd sdk/tables/data-tables
rush add -p @azure-tools/test-recorder@^2.0.0 --dev
```

If you are using `@azure/identity` in your tests, also install `"@azure-tools/test-credential"` package.

```bash
rush add -p @azure-tools/test-credential@^1.0.0 --dev
```

With a following `rush update`, you may see something like below.

```json
{
  // ... your package.json properties
  "devDependencies": {
    // ... your devDependencies
    "@azure-tools/test-credential": "^1.0.0", // If you are using `@azure/identity` in your tests
    "@azure-tools/test-recorder": "^2.0.0"
    // ... more of your devDependencies
  }
  // ... more of your package.json properties
}
```

And you're ready! Now you can use the test recorder in your code, as shown below:

```typescript
import { Recorder } from "@azure-tools/test-recorder";
```

Or, if you know what you want to import, you can also do the following:

```typescript
import { Recorder, RecorderStartOptions, env, SanitizerOptions } from "@azure-tools/test-recorder";
```

### Configuring your project

Having the recorder as a devDependency means that you'll be able to start recording tests right away by using the `Recorder` class.

The test-recorder provides the `Recorder` class that deals with recording and playing back the network requests, depending on the value assigned to the `TEST_MODE` environment variable.

- If `TEST_MODE` equals to `record`, it will automatically store network requests in a plain text file in the folder `recordings` at the root of your library (it is `sdk/tables/data-tables` in our example).
- This package assumes that the tests in the sdk are leveraging
  [mocha](https://mochajs.org/) and [rollup](https://rollupjs.org/guide/en/)
  (and [karma](https://karma-runner.github.io/latest/index.html) test runner for browser tests) as suggested by the [template](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/template/template) package in the repo.

#### package.json scripts

For the unified recorder client library to work, the [test proxy server](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy) must be active while you are running your tests. Helpers have been added to the `dev-tool` package which manage starting and stopping the test proxy server before and after your tests are run.

The following commands run the tests with the default configs and concurrently starts(runs) the test-proxy tool in a detached process in the background in record/playback modes if it is not already active. Additionally, more options can be passed to override the default configs.

- `dev-tool run test:node-js-input -- --timeout 5000000 'dist-esm/test/**/*.spec.js'`
- `dev-tool run test:node-ts-input -- --timeout 1200000 --exclude 'test/**/browser/*.spec.ts' 'test/**/*.spec.ts'`
- `dev-tool run test:browser`
  Read more at [dev-tool commands #usage](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/dev-tool/README.md#usage)

The test-proxy tool is run at ports 5000(for HTTP) and 5001(for HTTPS) unless you specify `TEST_PROXY_HTTP_PORT` as an environment variable, in which case that will be picked.

Test scripts

```json
{
  // ... your package.json scripts section
  "integration-test:node": "...",
  "unit-test:node": "..."
  // ... more of your package.json scripts
}
```

Your test scripts (in `package.json`) should be based on the following examples:

| script name                | command                                                                                                          |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `unit-test:browser`        | `dev-tool run test:browser`                                                                                      |
| `unit-test:node`           | `dev-tool run test:node-ts-input -- --timeout 1200000 --exclude 'test/**/browser/*.spec.ts' 'test/**/*.spec.ts'` |
| `integration-test:browser` | `dev-tool run test:browser`                                                                                      |
| `integration-test:node`    | `dev-tool run test:node-js-input -- --timeout 5000000 'dist-esm/test/**/*.spec.js'`                              |

Note the difference between the dev-tool `node-ts-input` and `node-js-input` commands:

- `node-ts-input` runs the tests using `ts-node`, without code coverage.
- `node-js-input` runs the tests using the built JavaScript output, and generates coverage reporting using `nyc`.

Read more at [dev-tool commands #usage](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/dev-tool/README.md#usage)

#### Prerequisites

- [Docker](https://docker.com/) is required, as the [test proxy server](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy) is run in a container during testing. When running the tests, ensure the Docker daemon is running and you have permission to use it. 

Check [docker.com/get-started](https://www.docker.com/get-started/) to download and install docker desktop on your machine.

For WSL 2, running `sudo service docker start` and `sudo usermod -aG docker $USER` should be sufficient.

If for some reason, you have trouble running the test-proxy tool in your environment using the `dev-tool` commands as suggested above, please read [many ways to run the test-proxy tool](#many-ways-to-run-the-test-proxy-tool) to unblock yourself sooner.

### TEST_MODE

By using recorder with your clients, the requests are redirected to the test-proxy tool to either save them or replay them.
Interactions with the test-proxy tool vary based on what the `TEST_MODE` environment variable is.

| TEST_MODE  | What?                                                                                                                                                                                           |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `record`   | Stores network requests with the help of test-proxy tool in a plain text file in the folder `recordings` at the root of your repository (example: root of the `sdk/tables/data-tables` project) |
| `playback` | Stored requests/responses are utilized by the test-proxy tool when the requests are redirected to it instead of reaching the service                                                            |
| `live`     | Recorder and its methods are no-ops here, requests directly reach the service instead of being redirected at the test-proxy tool layer                                                          |

## Using the `Recorder`

Inside a mocha test (either in the `beforeEach` or in the test body itself), you will need to instantiate the `Recorder` as below to leverage its functionalities.

```js
let recorder: Recorder;

beforeEach(async function (this: Mocha.Context) {
  recorder = new Recorder(this.currentTest);
});
```

The tested client needs to install the recording policy that redirects requests to the test-proxy tool first before they go to the service. This is done by simply passing the client options bag through the `recorder.configureClientOptions` helper:

```js
const client = new AnyCoreV2Client(/** args **/, recorder.configureClientOptions(/** client options **/));
```

_Note: If your client relies on `@azure/core-http` instead of the core-v2 libraries(i.e., `@azure/core-client` and `@azure/core-rest-pipeline`), please use `recorder.configureClientOptionsCoreV1()` instead of `recorder.configureClientOptions()`._

Recording starts with the `recorder.start()` method.

```js
await recorder.start(/** recorderOptions go here **/);
```

Recorder options will typically contain the environment setup needed for the `playback` mode, and the sanitizers that help with masking the sensitive information in the recordings, more on the recorder options below.

Any requests that are made using the above `client (AnyCoreV2Client)` will be redirected to the test-proxy tool before they reach the service, the requests and responses will be recorded and saved when `recorder.stop()` is called in `record` mode.

Likewise, in `playback` mode, the saved responses are utilized by the test-proxy tool when the requests are redirected to it instead of reaching the service.

```js
await recorder.stop();
```

- Call this method to ping the test-proxy tool with a stop request, this helps to stop recording, saves the recording file in record mode.

_Note: Instantiating, starting, and stopping the recorder all have no effect in the `live` mode (`TEST_MODE=live`). In `live` mode, the redirection to the test-proxy tool doesn't happen and the requests are sent to the services as usual._

### Recorder#variable()

To handle the dynamic/generated values for testing that are created as part of the tests, to make sure the requests in the `playback` mode match the ones in the `record` mode, you can leverage the `Recorder#variable` function.

For example, when resources are created dynamically, the name of the resource that is generated would vary in record and playback modes.
This is not ideal for playing back the requests/responses because the requests wouldn't match with what was saved in the recording in record mode.

For such cases, you can leverage the `recorder.variable()` method. It acts differently based on what the TEST_MODE is.

```js
// variable method
recorder.variable("table-name", `table${Math.ceil(Math.random() * 1000 + 1000)}`)

// Shows up in the recording as
  "Variables": {
    "table-name": "table1662"
  }
```

- Lets you register a variable to be stored with the recording. The behavior of this function depends on whether the recorder is in record/live mode or in playback mode.

- In record mode, the function will store the value provided with the recording as a variable and return that value.

- In playback mode, the function will fetch the value from the variables stored as part of the recording and return the retrieved variable, throwing an error if it is not found.

- In live mode, no recordings are saved, just returns the provided value.

### Environment variables

`@azure-tools/test-recorder` exports `env` which loads the environment variables from the correct location (using `process.env` and `dotenv` in Node, and using `window.__env__` via karma in the browser), and also means that the environment variables set in `envSetupForPlayback` are used in playback mode.

- `recorder.start()` internally sets up the environment variables for playback. So, make sure to have the `recorder.start()` call before you use any environment variables in your tests.
- To use an environment variable in a test, just do `env["NAME_OF_THE_VARIABLE"]`.
- Recorder also exports a `assertEnvironmentVariable` global method, which can be used to retrieve the environment variables.
  The function `assertEnvironmentVariable("NAME_OF_THE_VARIABLE")` either returns the value or throws an error saying the variable is not defined in your environment.
  (This function comes handy when your function args expect a non-undefined value but the environment variable may not be defined in the runtime.)

### `@azure-tools/test-credential` package and the NoOpCredential

We do not record the AAD traffic since it is typically noise that is not needed for testing the SDK(unless we are testing the `@azure/identity` package directly which uses the `@azure-tools/test-recorder` differently to record the tests).

- Tests with clients using AAD should make use of the new `@azure-tools/test-credential` package.
- This package provides a `NoOpCredential` implementation of `TokenCredential` which makes no network requests, and should be used in `playback mode`.
- The provided `createTestCredential` helper will handle switching between `NoOpCredential` in playback and `ClientSecretCredential` when recording for you:

```ts
import { createTestCredential } from "@azure-tools/test-credential";

const credential = createTestCredential();

// Create your client using the test credential.
new MyServiceClient(<endpoint>, credential);
```

Since AAD traffic is not recorded by the new recorder, there are no AAD credentials to remove from the recording using a sanitizer.

### karma.conf - for the browser tests

When running browser tests, the recorder relies on an environment variable to determine where to save the recordings. Add this snippet to your `karma.conf.js`:

```ts
const { relativeRecordingsPath } = require("@azure-tools/test-recorder");

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();
```

And then, again in `karma.conf.js`, add the variable to the list of environment variables:

```ts
module.exports = function (config) {
  config.set({
    /* ... */

    envPreprocessor: [
      // variables
      "RECORDINGS_RELATIVE_PATH", // Add this!
      "TEST_PROXY_HTTP_PORT", // Optional (Incase you need a port other than 5000)
      // more variables
    ],

    /* ... */
  });
};
```

## Examples

### How to record

To record your tests,

- make sure to set the environment variable `TEST_MODE` to `record`

  ```sh
  # Windows
  set TEST_MODE=record

  # Linux / Mac
  export TEST_MODE=record
  ```

- then in your code, instantiate the `Recorder`
- call `#start()` function with the recorder options
- modify the client options using the `#configureClientOptions()` method
- then make calls with your client as needed
- call `#stop()` function to save the recording in a file

In the following example, we'll use the recorder with the client from `@azure/data-tables`:

_[Example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/template/template/test/public/configurationClient.spec.ts) from the template project if you want to check out._

```typescript
import { RecorderStartOptions, Recorder, env } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { TableServiceClient } from "@azure/data-tables";

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    TABLES_URL: "https://fakeaccount.table.core.windows.net",
  },
  sanitizerOptions: {
    bodySanitizers: [
      {
        target: encodeURIComponent(env.TABLES_URL ?? ""),
        value: encodeURIComponent(`https://fakeaccount.table.core.windows.net`),
      },
    ],
  },
};

describe(`TableServiceClient tests`, () => {
  let recorder: Recorder;
  let credential;

  beforeEach(async function () {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    credential = createTestCredential();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create new table, then delete", async () => {
    const tableName = recorder.variable(
      "table-name",
      `table${Math.ceil(Math.random() * 1000 + 1000)}`
    );
    const client = new TableServiceClient(
      env["TABLES_URL"],
      credential,
      recorder.configureClientOptions({})
    );
    await client.createTable(tableName);
    await client.deleteTable(tableName);
  });
});
```

- After running this test with the `TEST_MODE` environment variable set to
  `record`, the recorder assisted by the test-proxy tool will create a recording file located in `recordings/node/tableserviceclient_tests/recording_should_create_new_table_then_delete.json` with the contents of the HTTP requests as well as the responses.

- You'll see in the code above that we're invoking `recorder.stop`. This is so that, after each test, we can stop recording and the test file can be generated.

- We recommend instantiating/starting the new recorder in the `beforeEach` block and stopping the recorder on `afterEach` to make sure that the generated files are smaller and easier to understand than by having them all in one chunk.

### Securing Sensitive Data

Live tests need to do sensitive operations, like authenticating with your Azure endpoints, keys, secrets, etc. These are generally contained in the environment variables which are used as part of the tests.

We must secure them and not let them leak into our recordings. To avoid storing the sensitive info in the recordings, we use the sanitizers to mask the values with the fake ones or remove them, `RecorderStartOptions` helps us here.

#### `RecorderStartOptions`

`RecorderStartOptions` has two components, `envSetupForPlayback` and the `sanitizers` which you'd have seen in the previous snippet.

For a live test to be run, we typically need the test secrets, which are usally stored as Environment variables.

And since in playback mode, the requests don't reach the service, we don't actually need to have/share the test secrets to run the tests in playback mode.

Another angle to this is that the recordings store the requests, which would contain the sensitive information related to the endpoints, tokens, keys, secrets, credentials, etc that are parts of the supposedly secretive environment variables or derivatives of them.

We try our best to make sure the sensitive information is not leaked anywhere with the help of `envSetupForPlayback` and `Sanitizers`.

#### `envSetupForPlayback`

`envSetupForPlayback` expects key-value pairs, with keys signifying the names of the environment variables, and the values would be the fake ones that you'd like to map/swap the originals with.

```js
  envSetupForPlayback: {
    TABLES_URL: "https://fakeaccount.table.core.windows.net",
  }
```

Used in record and playback modes. No effect in live mode.

- The key-value pairs will be used as the environment variables in playback mode.
- If the environment variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode.

#### `Sanitizers`

| Sanitizers                  | How does it look? Example??                                                                                                                                                     | What does it do?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generalSanitizer`          | `{ regex: true, target: "abc+def", value: "fakeValue" }`                                                                                                                        | Offers a general regex replace across request/response Body, Headers, and URI. For the body, this means regex applying to the raw JSON.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `bodySanitizer`             | `{ regex: true, target: "(.*)&SECRET=(?<secret_content>[^&]*)&(.*)", value: fakeSecretValue, groupForReplace: "secret_content" }`                                               | Offers regex replace within a returned body. Specifically, this means regex applying to the raw JSON. If you are attempting to simply replace a specific key, the `bodyKeySanitizer` is probably the way to go.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `headerSanitizer`           | `{ key: "your_uuid", value: sanitizedValue }`                                                                                                                                   | Can be used for multiple purposes:<br/>1) To replace a key with a specific value, do not set "regex" value.<br/>2) To do a simple regex replace operation, define arguments "key", "value", and "regex"<br/>3) To do a targeted substitution of a specific group, define all arguments "key", "value", and "regex"                                                                                                                                                                                                                                                                                                                                         |
| `uriSanitizer`              | `{ target: secretEndpoint, value: fakeEndpoint}`                                                                                                                                | General use sanitizer for cleaning URIs via regex. Runs a regex replace on the member of your choice.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `connectionStringSanitizer` | `{`<br/> `actualConnString: env.TABLES_CONN_STRING,` <br/>`fakeConnString: "Endpoint=https://fakeaccountname.net/;SharedAccessSignature=st=2021-08-03&sig=fakesigval"` <br/>`}` | Internally, <br/>- connection strings are parsed and<br/>- each part of the connection string is mapped with its corresponding fake value<br/>- `generalRegexSanitizer` is applied for each of the parts with the real and fake values that are parsed                                                                                                                                                                                                                                                                                                                                                                                                     |
| `bodyKeySanitizer`          | `{ jsonPath: "$.bodyProvided.secret_info", regex: secretValue, value: fakeSecretValue }`                                                                                        | This sanitizer offers regex update of a specific JTokenPath.<br/><br/> EG: "TableName" within a json response body having its value replaced by whatever substitution is offered.<br/> This simply means that if you are attempting to replace a specific key wholesale, this sanitizer will be simpler<br/> than configuring a BodyRegexSanitizer that has to match against the full "KeyName": "Value" that is part of the json structure.<br/><br/> Further reading is available [here](https://www.newtonsoft.com/json/help/html/SelectToken.htm#SelectTokenJSONPath).<br/><br/> If the body is NOT a JSON object, this sanitizer will NOT be applied. |
| `removeHeaderSanitizer`     | `{ headersForRemoval: ["X-Content-Type-Options"] }`                                                                                                                             | A simple sanitizer that should be used to clean out one or multiple headers by their key. Removes headers from before saving a recording.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `resetSanitizer`            | `true`                                                                                                                                                                          | This clears the sanitizers that are added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Sanitizers can be added in two different ways.

1. Pass them as part of the `recorder.start({ envSetupForPlayback, sanitizerOptions })` call. Sanitizers are applied on the recordings in record mode before they are saved.
2. Call `recorder.addSanitizers(sanitizerOptions, ["record", "playback"])`. This way, the same sanitizer would be applied in both record and playback modes.

### How to playback

Once you have recorded something, you can run your tests again with `TEST_MODE` set to `playback`.

You'll notice how the tests succeed much faster. That's because the requests don't reach the service endpoints, the recorder assisted by the test-proxy tool will respond every request with their matching copy stored in the recordings.

### Update existing recordings

Once you have your recorded files, to update them after changing one of the tests, simply re-run the tests with `TEST_MODE` set to `record`. This will override previously existing files.

> **Note:** If you rename the file of the test, or the name of the test, the
> path of the recording will change. Make sure to delete the recordings
> corresponding to the deleted tests. If at any point in time you lose your
> recordings, don't worry. Running your tests with `TEST_MODE=record` will
> re-generate them.

### Skipping tests

Writing live tests can take considerable time, specially since each time you want to check that everything works fine, you potentially need to run again every test. You can specify what test to run by following Mocha's approach of setting certain tests to `it.only`, and also to skip specific tests with `it.skip`.

If you launch the `recorder` in record mode with some of these changes (and given that you activate the recorder on `beforeEach`), only the files that relate to the changed tests will be updated. Skipped tests won't update their recordings.

This way, you can focus on fixing a specific set of tests with `.only`, then remove all the `.only` calls and trust that the playback will keep confirming that the unaffected tests are fine and green.

You can also skip specific tests with the following.

```js
import { isLiveMode } from "@azure-tools/test-recorder";

it("test-title", function (this: Mocha.Context) {
  // isPlaybackMode() and isRecordMode() methods are also available from recorder.
  if (!isLiveMode()) this.skip(); // This skips the test in record and playback modes
  // Test goes here...
  // ...
});
```

### Supporting parallelism

A common issue while running integration tests is that, sometimes two individuals or machines might try to run the same set of tests against the same resource.

This is not directly related to the `@azure-tools/test-recorder` package, but if you're getting into issues because of concurrent conflicting requests, we strongly suggest using randomly generated strings as prefixes or suffixes for the resources you create.

Refer to [Recorder#variable()](#recordervariable) section to handle the dynamic/generated values for testing that are created as part of the tests, to make sure the requests in the `playback` mode match the ones in the `record` mode.

Since new resources are likely to get accumulated because some tests would crash or fail for any reason, make sure you delete the resources that are not cleared.

### Isomorphic tests

`@azure/test-utils-recorder` does support running tests in the browser. If you use Karma, as long as your karma configuration is correct, your tests should work both on NodeJS and in the browsers!

### Troubleshooting

Besides the usual debugging of your code and tests, if you ever encounter a problem while recording your tests, make sure to read the output in the recordings. If the output is not what you expected, please follow up the [contributing](#contributing) guidelines on how to write an issue for us. We'll make sure to handle it as soon as we find the time.

If you run into issues while running the tests in record/playback modes, some of the following troubleshooting steps may help:

#### Viewing test proxy log output

`dev-tool` by default outputs logs from the test proxy to `test-proxy-output.log` in your package's root directory. These logs can be inspected to see what requests were made to the proxy tool.

#### Viewing more detailed logs by running the proxy tool manually

If you desire, you can run the proxy tool docker image manually before running your tests, refer to the [many ways to run the test-proxy tool](#many-ways-to-run-the-test-proxy-tool). This allows you to specify a different log level (debug in the below example), allowing for more detailed logs to be viewed. Do this by running:

```bash
docker run -v <your azure-sdk-for-js repository root>:/srv/testproxy -p 5001:5001 -p 5000:5000 -e Logging__LogLevel__Microsoft=Debug azsdkengsys.azurecr.io/engsys/testproxy-lin:latest
```

If port 5000 is already being used in your machine, you can specify any other port such as 2345:5000 in the args, and make sure to have the environment variable `TEST_PROXY_HTTP_PORT` set as the specified port(2345 in this case).

Once you've done this, you can run your tests in a separate terminal. `dev-tool` will detect that a test proxy container is already running and will point requests to the Docker container you started.

### Many ways to run the test-proxy tool

#### With the `dev-tool` commands

- The following commands run the tests with the default configs, and concurrently runs the proxy tool in record/playback modes if it is not already active. Additionally, more options can be passeed to override the default configs.
  - `dev-tool run test:node-js-input -- --timeout 5000000 'dist-esm/test/**/*.spec.js'`
  - `dev-tool run test:node-ts-input -- --timeout 1200000 --exclude 'test/**/browser/*.spec.ts' 'test/**/*.spec.ts'`
  - `dev-tool run test:browser`
    Read more at [dev-tool commands #usage](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/dev-tool/README.md#usage)

Follow the below two methods if you wish to run the proxy tool yourself without relying on the `dev-tool` commands.

#### With the `docker run` command

- Run this command

  > `docker run -v /workspaces/azure-sdk-for-js/:/srv/testproxy -p 5001:5001 -p 5000:5000 azsdkengsys.azurecr.io/engsys/testproxy-lin:latest`

  Map the root directory of the azure-sdk-for-js repo to `/srv/testproxy` inside the container for an accurate location while generating recordings.

  Add `--add-host host.docker.internal:host-gateway` for linux to access host's network(to access `localhost`) through `host.docker.internal`.
  Docker for Windows and Mac support `host.docker.internal` as a functioning alias for localhost.

  If the above command doesn't work directly, try [Troubleshooting Access to Public Container Registry](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#troubleshooting-access-to-public-container-registry).

  Reference: [Using Test Proxy with docker container](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#build-and-run)

  If port 5000 is already being used in your machine, you can specify any other port such as 2345:5000 in the args, and make sure to have the environment variable `TEST_PROXY_HTTP_PORT` set as the specified port(2345 in this case) so that the recorder knows which port to hit.

#### (OR) With the `dotnet tool`

- Install [.Net 5.0](https://dotnet.microsoft.com/download)
- Install test-proxy
  > `dotnet tool install azure.sdk.tools.testproxy --global --add-source https://pkgs.dev.azure.com/azure-sdk/public/_packaging/azure-sdk-for-net/nuget/v3/index.json --version 1.0.0-dev*`
- After successful installation, run the tool:

  > `test-proxy --storage-location <root-of-the-repo>`

  [ `root-of-the-repo example` - `/workspaces/azure-sdk-for-js` if you're on codespaces, `C:/Users/username/projects/azure-sdk-for-js/` on windows, etc]

  Reference: [Azure SDK Tools Test Proxy](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy)

### Next steps

The test-recorder(v2.0) might not be used yet in each one of the libraries in the `azure-sdk-for-js` repository (we're working on it). In the mean time, an easy way to find where we're using this package is by going through the following search link:
<https://github.com/Azure/azure-sdk-for-js/search?q=test-recorder>

### Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see logs from the recorder client, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling the `setLogLevel` function in the `@azure/logger` package.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Frecorder%2FREADME.png)
