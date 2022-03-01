# Release History

## 2.0.0 (Unreleased)

## 2022-02-15

- Bug Fix - Fixed the bug where the `recordingId` was being ignored in the add-sanitizer requests which led the test level sanitizers to be treated as session level sanitizers.
  [#20393](https://github.com/Azure/azure-sdk-for-js/pull/20393)
- `CustomDefaultMatcher`- exposes the default matcher in a customizable way. Currently, this includes enabling/disabling body match, adding additional excluded headers, and enable/disable matching the order of query params in the requests.
  [#20404](https://github.com/Azure/azure-sdk-for-js/pull/20404)

## 2022-02-04

- [#19920](https://github.com/Azure/azure-sdk-for-js/pull/19920) Added support for adding polices as part of the client options with the new "additionalPolicies" array.
  By leveraging the new option, `configureClientOptions` method is added to the `Recorder`.

  [#20175](https://github.com/Azure/azure-sdk-for-js/pull/20175)

  - With the support from the new `Recorder#configureClientOptions` method, we no longer need the `Recorder#configureClient` that used to access the private "pipeline" object internal to the client to add/modify the policies.
  - [#20175](https://github.com/Azure/azure-sdk-for-js/pull/20175) removes the `Recorder#configureClient` along with the new addition.

## 2022-01-27

Add support for the new string sanitizers, including **breaking changes**:

- Removed the `Sanitizer` class, instead making the `addSanitizers` function in `sanitizer.ts` take in a `HttpClient` and recording ID as parameter.
- Refactored the `addSanitizers` function to call smaller functions for each sanitizer (some of which are a bit FP-style) instead of using if statements + special cases. Hopefully this will make things a bit easier to maintain.
- Some other minor refactors (e.g. extracting duplicated `createRecordingRequest` function into a utility).
- Add support for the string sanitizers in what I think is the most logical way, but there is a **breaking change**:
  - When calling `addSanitizers`, instead of specifying `generalRegexSanitizers: [...]` etc., you now specify `generalSanitizers: [...]`. Both regex sanitizers and string sanitizers can be used in this way, for example:

```ts
recorder.addSanitizers({
  generalSanitizers: [
    {
      regex: true, // Regex matching is enabled by setting the 'regex' option to true.
      target: ".*regex",
      value: "sanitized",
    },
    {
      // Note that `regex` defaults to false and doesn't need to be specified when working with bare strings.
      // In my experience, this is the most common scenario anyway.
      target: "Not a regex",
      value: "sanitized",
    },
  ],
});
```

[#19954](https://github.com/Azure/azure-sdk-for-js/pull/19954)

## 2022-01-06

- Renaming the package `@azure-tools/test-recorder-new@1.0.0` as `@azure-tools/test-recorder@2.0.0`.
  [#19561](https://github.com/Azure/azure-sdk-for-js/pull/19561)

## 1.0.0 (Unreleased)

## 2021-12-27

- Allows passing `undefined` as keys in the sanitizer options so that devs don't have to add additional checks if a certain env variable exists in playback.
- Exports `delay`
  - waits for expected time in record/live modes
  - no-op in playback

[#19561](https://github.com/Azure/azure-sdk-for-js/pull/19561)

## 2021-12-17

- Refactoring the test proxy http clients for better clarity for the end users [#19446](https://github.com/Azure/azure-sdk-for-js/pull/19446)

  - Client rename `TestProxyHttpClient` -> `Recorder`
  - Removing the separate `TestProxyHttpClientCoreV1`
    - Instead of passing the whole client as the `httpClient` for core-v1 sdks, users are now expected to call `recorder.configureClientOptionsCoreV1` on the client options while passing to the respective client(where `recorder` is an instantiation of `Recorder`). This modifies the httpClient in the options to allow redirecting the requests to the test-proxy tool.
  - Duplicated helpers from old recorder to not depend on old recorder package.. with an intention to replace the recorder package as 2.0 and not merge since the old recorder is published already
  - Makes the following members of `Recorder` private
    - `httpClient`
    - `redirectRequest`
    - `recorderHttpPolicy`
    - `createHttpClientCoreV1`

- Moving `NoOpCredential` to the new `@azure-tools/test-credential` package.

## 2021-12-15

- Change the API for using variables. Variables can now be accessed using the syntax:

  ```ts
  const variable = recorder.variable(<variable name>, <value in record mode>);
  ```

  A shorthand is also added for when accessing a variable a second time in
  the same test, which does not require an initial value be set, e.g.:

  ```ts
  recorder.variable("variableName", <value in record mode>);

  // later on in your code
  const value = recorder.variable("variableName");
  ```

  [#19388](https://github.com/Azure/azure-sdk-for-js/pull/19388)

## 2021-12-14

- Add `configureClient` method to the `TestProxytHttpClient` to allow instrumenting the client with the recorder policy which helps in enabling the recorder to redirect the requests of your tests to the proxy tool.
  - Also un-exports `recorderHttpPolicy` function.
    [#19362](https://github.com/Azure/azure-sdk-for-js/pull/19362)

## 2021-12-13

- Add support for `setMatcher`, which can be used to instruct the proxy tool to ignore headers (using `HeaderlessMatcher`) or the request body (using `BodilessMatcher`) when matching requests to recordings.

  Example:

  ```ts
  await recorder.setMatcher("HeaderlessMatcher");
  ```

## 2021-12-10

- Loads the .env file using with the help of "dotenv" by default.
  [#19139](https://github.com/Azure/azure-sdk-for-js/pull/19139)

## 2021-11-30

- Adds NoOp AAD Credential for playback `NoOpCredential`. Using this as your AAD credential in playback mode would avoid the AAD traffic in playback.
  [#18904](https://github.com/Azure/azure-sdk-for-js/pull/18904)

## 2021-11-08

- Allows storing dynamically created variables in record mode. The recorder registers the variables as part of the recording and stores their values in the recording file. Using the `variables` in playback mode produces the key-value pairs that were stored in the recording file.

  Example:

  ```ts
  if (!isPlaybackMode()) {
    recorder.variables["random-1"] = `random-${Math.ceil(Math.random() * 1000 + 1000)}`;
  }
  ```

  Use `recorder.variables["random-1"]` to access the value of the variable after setting it. The variable can be accessed in all three modes -- record, playback, and live -- as long as it is set in record mode before it is accessed.

## 2021-10-15

[#17379](https://github.com/Azure/azure-sdk-for-js/pull/17379)

- Added `addSanitizers` method to support
  - BodyKeySanitizer
  - BodyRegexSanitizer
  - GeneralRegexSanitizer
  - HeaderRegexSanitizer
  - RemoveHeaderSanitizer
  - UriRegexSanitizer
  - UriSubscriptionIdSanitizer
  - Connection String sanitizer
- Adds `SanitizerOptions`, env setup for playback as the options of the `start()` method
  - Applies `generalRegexSanitizers` on the env setup for playback options by default to eliminate any plain text secrets in the recordings
- Testing - All the tests are run in the `recorder-new` folder run in all three modes - "record", "playback" and "live" everytime the test commands are run

## 2021-09-27

[#17388](https://github.com/Azure/azure-sdk-for-js/pull/17388)

- `TestProxyClient` now takes the test context to determine the location of the recordings.
- Adds a server for the tests, to play the role of an actual service to be able to test the proxy-tool end-to-end.

## 2021-07-17

- Building the unified recorder prototype leveraging the proxy-tool, works for both core-v1 and core-v2 SDKs. Shows data-tables and storage-queue as examples for core-v2 and core-v1 respectively.
  [#15826](https://github.com/Azure/azure-sdk-for-js/pull/15826)
