# Migration Guide

This document outlines key differences between the legacy recorder and the new Unified Recorder client. The Unified Recorder replaces the existing `nock/nise`-based recorder with a solution that uses the language-agnostic [test proxy server].

## Prerequisites

- [Docker] is required, as the [test proxy server] is run in a container during testing. When running the tests, ensure the Docker daemon is running and you have permission to use it. For WSL 2, running `sudo service docker start` and `sudo usermod -aG docker $USER` should be sufficient.

## Upgrading to the Unified Recorder

The new recorder is version 2.0.0 of the `@azure-tools/test-recorder` package. Update the test-recorder dependency in your package.json file as follows:

```json
{
  // ...
  "devDependencies": {
    // ...
    "@azure-tools/test-credential": "^1.0.0", // If you're using `@azure/identity` in your tests
    "@azure-tools/test-recorder": "^2.0.0"
  }
}
```

Once you've updated the dependency version, run `rush update` and you are ready to start using the new recorder. The new recorder's API is similar to the legacy recorder. Differences will be discussed below.

## Changes to NPM scripts

For the unified recorder client library to work, the [test proxy server] must be active while you are running your tests. Helpers have been added to the `dev-tool` package which manage starting and stopping the test proxy server before and after your tests are run.

Update your test scripts based on the following examples:

| Script                     | Before migration                                                                                                                                                                         | After migration                                                                                                  |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `unit-test:browser`        | `karma start --single-run`                                                                                                                                                               | `dev-tool run test:browser`                                                                                      |
| `unit-test:node`           | `mocha -r esm -r ts-node/register --reporter ../../../common/tools/mocha-multi-reporter.js --timeout 1200000 --full-trace --exclude \"test/**/browser/*.spec.ts\" \"test/**/*.spec.ts\"` | `dev-tool run test:node-ts-input -- --timeout 1200000 --exclude 'test/**/browser/*.spec.ts' 'test/**/*.spec.ts'` |
| `integration-test:browser` | `karma start --single-run`                                                                                                                                                               | `dev-tool run test:browser`                                                                                      |
| `integration-test:node`    | `nyc mocha -r esm --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --timeout 5000000 \"dist-esm/test/{,!(browser)/**/}*.spec.js\"`         | `dev-tool run test:node-js-input -- --timeout 5000000 'dist-esm/test/**/*.spec.js'`                              |

Note the difference between the dev-tool `node-ts-input` and `node-js-input` commands:

- `node-ts-input` runs the tests using `ts-node`, without code coverage.
- `node-js-input` runs the tests using the built JavaScript output, and generates coverage reporting using `nyc`.

Compare with the older test runs to make sure you're running all the tests/files as before.

## Initializing the recorder

The approach taken to initialize the recorder depends on whether the SDK being tested uses Core v1 ([`core-http`]) or Core v2 ([`core-rest-pipeline`]). If your SDK is on Core v2, read on. If you're still on Core v1, [jump to the section on Core v1 below](#for-core-v1-sdks).

### For Core v2 SDKs

The recorder is implemented as a custom policy which should be attached to your client's pipeline. Firstly, initialize the recorder:

```ts
import { Recorder } from "@azure-tools/test-recorder";

let recorder: Recorder;

/*
 * Note the use of function() instead of the arrow syntax. We need access to `this` so we
 * can pass test information from Mocha to the recorder.
 */
beforeEach(function (this: Context) {
  recorder = new Recorder(this.currentTest);
});
```

To enable the recorder, you should then initialize your SDK client as normal and use the recorder's `configureClientOptions` method. This method will add the necessary policies to the client options' `additionalPolicies` array for the recording to be enabled. Note that for this method to work, the `additionalPolicies` options has to be part of the client options.

```ts
const client = new MyServiceClient(
  /* ... insert options here ... */,
  recorder.configureClientOptions({ /* any additional options to pass through */ }),
);
```

### For Core v1 SDKs

The recorder library provides a custom `HttpClient` that is then passed to the SDK. This client needs to be initialized as follows:

```ts
let recorder: Recorder;

/*
 * Note the use of function() instead of the arrow syntax. We need access to `this` so we
 * can pass test information from Mocha to the recorder.
 */
beforeEach(function (this: Context) {
  recorder = new Recorder(this.currentTest);
});
```

When initialising your client in your test, you should pass in the recorder as follows:

```ts
const client = new MyServiceClient(
  /* ... insert options here ... */,
  recorder.configureClientOptionsCoreV1({ /* any additional options to pass through */ }),
);
```

This will allow requests to be intercepted and redirected to the proxy tool.

## Starting and stopping the recorder

The way that the recorder is started and stopped has changed slightly. At the beginning of your test (or in a `beforeEach` block), start the recorder as follows:

```ts
await recorder.start({
  envSetupForPlayback: {
    // Your environment variables (equivalent to the old recorder's replaceableVariables option). See the section on environment variables below for detail
  },
  // Other options, e.g. sanitizers (which replace the customizationsOnRecordings option)
});
```

And at the end of your test (or in an `afterEach` block), stop the recorder:

```ts
await recorder.stop();
```

It is important that `recorder.stop()` is called, or otherwise the next test will throw an error when trying to start the already started recorder. Additionally, it is important that both the `start` and `stop` calls are awaited, for similar reasons.

## XHRHttpClient

The legacy recorder didn't support recording browser calls made through the Fetch API. As a result, when fetch API was introduced in `core-rest-pipeline` a workaround was applied to the libraries not yet migrated to the new recorder, this workaround needs to be removed as part of the migration. Make the following changes, typically located in `utils/recordedClient.ts`

```diff
- const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();
```

```diff
- recorder.configureClientOptions({ httpClient, ...options })
+ recorder.configureClientOptions(options)
```

## Environment variables

In the legacy recorder, the `replaceableVariables` option could be used to specify environment variables that would be replaced in the recording and set during playback. This could be used to ensure that secrets and user-specific options do not appear in the recording body.

The Unified Recorder client provides this functionality through the use of the `envSetupForPlayback` option, which is passed when `recorder.start` is called. Like the legacy recorder, it takes in an object mapping environment variables to what they should be replaced with in the recording. For example:

```ts
await recorder.start({
  envSetupForPlayback: {
    TABLES_SAS_CONNECTION_STRING: "fakeConnectionString",
  },
});
```

Under the hood, this is powered by the Unified Recorder's sanitizer functionality.

**⚠️Important:** To access environment variables, you must use the `env` export made available from the **new** recorder. This ensures that environment variables are sourced from the correct location (using `process.env` and `dotenv` in Node, and using `window.__env__` via karma in the browser), and also means that the environment variables set in `envSetupForPlayback` are used in playback mode.

`recorder.start()` internally sets up the environment variables for playback.
So, make sure to have the `recorder.start()` call before you use any environment variables in your tests.

## Recorder variables

If you want to compute a value at record time and re-use it during playback, the Unified Recorder's variable functionality is for you. This API lets you declare variables which are stored with the recording at record time. During playback, instead of computing the variable afresh, the value will be retrieved from the recording. A use case of this might be to set a value randomly during record time that needs to be the same during playback.

Here is an example:

```ts
const queueName = recorder.variable("queueName", "queue-${Math.floor(Math.random * 1000)}");
// Assume that we have a client that has a createQueue method.
await client.createQueue(queueName);
```

In this example, the name of the queue used in the recording is randomized. However, in playback, instead of using the value passed into `recorder.variable`, the value will be retrieved from the recording file. This means that the name of the queue will be consistent between record and playback modes.

## Customizations on recordings

A powerful feature of the legacy recorder was its `customizationsOnRecordings` option, which allowed for arbitrary replacements to be made to recordings. The new recorder's analog to this is the sanitizer functionality.

### General sanitizers

For a simple find/replace, `generalSanitizers` can be used. For example:

```ts
await recorder.addSanitizers({
  generalSanitizers: [
    {
      target: "find", // With `regex` unspecified, this matches a plaintext string
      value: "replace",
    },
    {
      regex: true, // Enable regex matching
      target: "[Rr]egex", // This is a .NET regular expression that will be compiled by the proxy tool.
      value: "replace",
    },
    // add additional sanitizers here as required
  ],
});
```

This example has two sanitizers:

- The first sanitizer replaces all instances of "find" in the recording with "replace".
- The second example demonstrates the use of a regular expression for replacement, where anything matching the .NET regular expression `[Rr]egex` (i.e. "Regex" and "regex") would be replaced with "replace".

### ConnectionStringSanitizer

A `ConnectionStringSanitizer` can be used to strip all occurrences of a connection string from a recording. Its usage is very similar to the `GeneralRegexSanitizer`. For example:

```ts
recorder.addSanitizers({
  connectionStringSanitizers: [
    {
      actualConnString: /* the actual connection string to be replaced, usually passed in as an environment variable */,
      fakeConnString: /* a mock connection string to replace actualConnString with */,
    },
  ],
});
```

### RemoveHeaderSanitizer

`RemoveHeaderSanitizer` can be used to remove specific headers from the recordings as follows:

```ts
recorder.addSanitizers({
  removeHeaderSanitizer: {
    headersForRemoval: ["Header1", "Header2" /* ... */],
  },
});
```

Other sanitizers for more complex use cases are also available.

## AAD and the new `NoOpCredential`

The new recorder does not record AAD traffic at present. As such, tests with clients using AAD should make use of the new `@azure-tools/test-credential` package.

This package provides a `NoOpCredential` implementation of `TokenCredential` which makes no network requests, and should be used in playback mode. The provided `createTestCredential` helper will handle switching between `NoOpCredential` in playback and `ClientSecretCredential` when recording for you:

```ts
import { createTestCredential } from "@azure-tools/test-credential";

const credential = createTestCredential();

// Create your client using the test credential.
new MyServiceClient(<endpoint>, credential);
```

Since AAD traffic is not recorded by the new recorder, there is no longer a need to remove AAD credentials from the recording using a sanitizer.

## Browser tests and modifications to Karma configuration

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
      ,
      /* ... */ "RECORDINGS_RELATIVE_PATH", // Add this!
    ],

    /* ... */
  });
};
```

The following configuration options in `karma.config.js` are unnecessary and should be **removed**:

```ts
// imports - to be deleted
const {
  jsonRecordingFilterFunction,
  isPlaybackMode,
  isSoftRecordMode,
  isRecordMode,
} = require("@azure-tools/test-recorder");

// plugins - to be removed
      "karma-json-to-file-reporter",
      "karma-json-preprocessor",

// files section - snippet to remove
     .concat(isPlaybackMode() || isSoftRecordMode() ? ["recordings/browsers/**/*.json"] : [])

// preprocessors - to be removed
      "recordings/browsers/**/*.json": ["json"],

// reporters - to be removed
      "json-to-file"

/* ... */
// jsonToFileReporter - to be removed
jsonToFileReporter: {
  filter: jsonRecordingFilterFunction,  outputPath: ".",
}

/* ... */
// log options - to be removed
browserConsoleLogOptions: {
  terminal: !isRecordMode(),
}
```

Remove the following "devDependencies" from `package.json`

```js
   "karma-json-preprocessor": "^0.3.3",
   "karma-json-to-file-reporter": "^1.0.1",
```

## Migrating your recordings

Once you have made the necessary code changes, it is time to re-record your tests using the Unified Recorder to complete the migration. To do this, first **delete** the directory containing the old recordings (the `recordings` folder). Then, run your tests with the `TEST_MODE` environment variable to `record`.

If everything succeeds, the new recordings will be made available in the `recordings` directory. Inspect them to make sure everything looks OK (no secrets present, etc.), and then run the tests in playback mode to ensure everything is passing. If you're running into issues, check out the [Troubleshooting section](#troubleshooting).

## Troubleshooting

If you run into issues while migrating your package, some of the following troubleshooting steps may help:

### Viewing test proxy log output

`dev-tool` by default outputs logs from the test proxy to `test-proxy-output.log` in your package's root directory. These logs can be inspected to see what requests were made to the proxy tool.

### Viewing more detailed logs by running the proxy tool manually

If you desire, you can run the proxy tool docker image manually before running your tests. This allows you to specify a different log level (debug in the below example), allowing for more detailed logs to be viewed. Do this by running:

```bash
docker run -v <your azure-sdk-for-js repository root>:/srv/testproxy -p 5001:5001 -p 5000:5000 -e Logging__LogLevel__Microsoft=Debug azsdkengsys.azurecr.io/engsys/testproxy-lin:latest
```

Once you've done this, you can run your tests in a separate terminal. `dev-tool` will detect that a test proxy container is already running and will point requests to the Docker container you started.

[docker]: https://docker.com/
[`core-rest-pipeline`]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-rest-pipeline
[`core-http`]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-http
[test proxy server]: https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy
