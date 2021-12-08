# Release History

## 1.0.0 (Unreleased)

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
