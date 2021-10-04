# Release History

## 1.0.0 (Unreleased)

## 2021-09-27

- `TestProxyClient` now takes the test context to determine the location of the recordings. [#17388](https://github.com/Azure/azure-sdk-for-js/pull/17388)
- Adds a server for the tests, to play the role of an actual service to be able to test the proxy-tool end-to-end.
  [#17388](https://github.com/Azure/azure-sdk-for-js/pull/17388)

## 2021-07-17

- Building the unified recorder prototype leveraging the proxy-tool, works for both core-v1 and core-v2 SDKs. Shows data-tables and storage-queue as examples for core-v2 and core-v1 respectively.
  [#15826](https://github.com/Azure/azure-sdk-for-js/pull/15826)
