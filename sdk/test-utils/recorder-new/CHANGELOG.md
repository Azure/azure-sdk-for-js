# Release History

## 1.0.0 (Unreleased)

## 2021-10-15

- Add sanitizers method to support
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
- Testing - All the tests are run in the `recorder-new` folder run in all three modes - "record", "playback" and "live"

## 2021-09-27

- `TestProxyClient` now takes the test context to determine the location of the recordings. [#17388](https://github.com/Azure/azure-sdk-for-js/pull/17388)
- Adds a server for the tests, to play the role of an actual service to be able to test the proxy-tool end-to-end.
  [#17388](https://github.com/Azure/azure-sdk-for-js/pull/17388)

## 2021-07-17

- Building the unified recorder prototype leveraging the proxy-tool, works for both core-v1 and core-v2 SDKs. Shows data-tables and storage-queue as examples for core-v2 and core-v1 respectively.
  [#15826](https://github.com/Azure/azure-sdk-for-js/pull/15826)
