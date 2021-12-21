# Migration Guide

This document outlines key differences between the legacy recorder and the new Unified Recorder client. The Unified Recorder replaces the existing `nock`-based recorder with a solution that uses the language-agnostic [test proxy server].

## Prerequisites

- [Docker] is required, as the [test proxy server] is run in a container during testing.

## Installing the Unified Recorder

The first step is to install the unified recorder client library in your package by running

```bash
$ rush add --dev -p @azure-tools/test-recorder-new
```

You will use this library to control the recorder from your tests. The API is similar to the legacy recorder. Differences will be discussed below.

## Changes to NPM scripts

For the unified recorder client library to work, the [test proxy server] must be active while you are running your tests. Helpers have been added to the `dev-tool` package which manage starting and stopping the test proxy server before and after your tests are run.

Update your test scripts based on the following examples:

| Script              | Before migration                                                                                                                                                                         | After migration                                                                                                                        |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `unit-test:browser` | `karma start --single-run`                                                                                                                                                               | `dev-tool run test:browser`                                                                                                            |
| `unit-test:node`    | `mocha -r esm -r ts-node/register --reporter ../../../common/tools/mocha-multi-reporter.js --timeout 1200000 --full-trace --exclude \"test/**/browser/*.spec.ts\" \"test/**/*.spec.ts\"` | `dev-tool run test:node-ts-input --mocha=\"--timeout 1200000 --full-trace --exclude 'test/**/browser/*.spec.ts' 'test/**/*.spec.ts'\"` |

## Initializing the recorder

The approach taken to initialize the recorder depends on whether the SDK being tested uses Core v1 ([`core-http`]) or Core v2 ([`core-rest-pipeline`]). If your SDK is on Core v2, read on. If you're still on Core v1, [jump to the section on Core v1 below](#for-core-v1-sdks).

### For Core v2 SDKs

The recorder is implemented as a custom policy which should be attached to your client's pipeline. Firstly, initialize the recorder:

```ts
let recorder: Recorder;

/*
 * Note the use of function() instead of the arrow syntax. We need access to `this` so we
 * can pass test information from Mocha to the recorder.
 */
beforeEach(function(this: Context) {
  recorder = new Recorder(this.currentTest);
});
```

To enable the recorder, you should then initialize your SDK client as normal and use the recorder's `configureClient` method. This method will attach the necessary policies to the client for recording to be enabled.

```ts
const client = /* ... initialize your client as normal ... */;
// recorderHttpPolicy is provided as an export from the test-recorder-new package.
recorder.configureClient(client);
```

### For Core v1 SDKs

The recorder library provides a custom `HttpClient` that is then passed to the SDK. This client needs to be initialized as follows:

```ts
let recorder: Recorder;

/*
 * Note the use of function() instead of the arrow syntax. We need access to `this` so we
 * can pass test information from Mocha to the recorder.
 */
beforeEach(function(this: Context) {
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

The way that the recorder is started and stopped has changed slightly. At the beginning of your test, start the recorder as follows:

```ts
await recorder.start({
  envSetupForPlayback: {
    // Your environment variables (equivalent to the old recorder's replaceableVariables option). See the section on environment variables below for detail
  }
  // Other options, e.g. sanitizers (which replace the customizationsOnRecordings option)
});
```

And at the end of your test, stop the recorder:

```ts
await recorder.stop();
```

It is important that `recorder.stop()` is called, or otherwise the next test will throw an error when trying to start the already started recorder. Additionally, it is important that both the `start` and `stop` calls are awaited, for similar reasons.

## Environment variables

In the legacy recorder, the `replaceableVariables` option could be used to specify environment variables that would be replaced in the recording and set during playback. This could be used to ensure that secrets and user-specific options do not appear in the recording body.

The Unified Recorder client provides this functionality through the use of the `envSetupForPlayback` option, which is passed when `recorder.start` is called. Like the legacy recorder, it takes in an object mapping environment variables to what they should be replaced with in the recording. For example:

```ts
await recorder.start({
  envSetupForPlayback: {
    TABLES_SAS_CONNECTION_STRING: "fakeConnectionString"
  }
});
```

Under the hood, this is powered by the Unified Recorder's sanitizer functionality.

**⚠️Important:** To access environment variables, you must use the `env` export made available from the **new** recorder. This ensures that environment variables are sourced from the correct location (using `process.env` and `dotenv` in Node, and using `window.__env__` via Mocha in the browser), and also means that the environment variables set in `envSetupForPlayback` are used in playback mode.

## Recorder variables

If you want to compute a value at record time and re-use it during playback, the Unified Recorder's variable functionality is for you. This API lets you declare variables which are stored with the recording at record time. During playback, instead of computing the variable afresh, the value will be retrieved from the recording. A use case of this might be to set a value randomly during record time that needs to be the same during playback.

Here is an example:

```ts
const queueName = recorder.variable("queueName", "queue-${Math.floor(Math.random * 1000)}");
// Assume that we have a client that has a createQueue method.
client.createQueue(queueName);
```

In this example, the name of the queue used in the recording is randomized. However, in playback, instead of using the value passed into `recorder.variable`, the value will be retrieved from the recording file. This means that the name of the queue will be consistent between recording and playback.

## Customizations on recordings

A powerful feature of the legacy recorder was its `customizationsOnRecordings` option, which allowed for arbitrary replacements to be made to recordings. The new recorder's analog to this is the sanitizer functionality.

For a simple find/replace, a `GeneralRegexSanitizer` can be used. For example:

```ts
recorder.addSanitizers({
  generalRegexSanitizers: [
    regex: "find",
    value: "replace"
  ],
});
```

This example would replace all instances of `find` in the recording with `replace`.

Other sanitizers for more complex use cases are also available.

## AAD and the new `NoOpCredential`

The new recorder does not record AAD traffic at present. As such, tests with clients using AAD should make use of the new `NoOpCredential` provided by the `@azure-tools/test-credential` when in playback mode. The `createTestCredential` helper also exported by the `test-credential` package will handle switching between NoOpCredential in playback and ClientSecretCredential when recording for you:

```ts
const credential = createTestCredential();

// You may now pass the created credential to your client.
```

Since AAD traffic is not recorded by the new recorder, there is no longer a need to remove AAD credentials from the recording using a sanitizer.

## Browser tests and modifications to Karma configuration

When running browser tests, the recorder relies on an environment variable to determine where to save the recordings. Add this snippet to your `karma.conf.js`:

```ts
const { relativeRecordingsPath } = require("@azure-tools/test-recorder-new");

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();
```

And then, again in `karma.conf.js`, add the variable to the list of environment variables:

```ts
module.exports = function(config) {
  config.set({
    /* ... */

    envPreprocessor: [
      ,
      /* ... */ "RECORDINGS_RELATIVE_PATH" // Add this!
    ]

    /* ... */
  });
};
```

The following configuration options in `karma.config.js` should be **removed**:

```ts
browserConsoleLogOptions: {
  terminal: !isRecordMode(),
}

/* ... */

jsonToFileReporter: {
  filter: jsonRecordingFilterFunction,  outputPath: ".",
}
```

[docker]: https://docker.com/
[`core-rest-pipeline`]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-rest-pipeline
[`core-http`]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-http
[test proxy server]: https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy
