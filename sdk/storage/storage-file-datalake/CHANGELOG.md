# Release History

## 12.0.0-preview.7 (Unreleased)

- Share a single httpClient among clients. [PR #6657](https://github.com/Azure/azure-sdk-for-js/pull/6657)
  Currently clients share their parent client's pipeline. But when the pipeline doesn't have a httpClient specified, a `DefaultHttpClient` will be created for each of the clients. This change create a default http client instance to share among all clients if none is specified.

## 12.0.0-preview.6 (2019-12-04)

- Initial Release. API version 2019-02-02 supported. Please see the README for information on the new design.
