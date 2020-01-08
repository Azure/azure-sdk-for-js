# Release History

## 12.0.0-preview.7 (2020.01)

- Bug fix - Name properties on clients now support more kinds of endpoints(IPv4/v6 hosts, single word domains). [PR #6753](https://github.com/Azure/azure-sdk-for-js/pull/6753)
- Share a single httpClient among clients. [PR #6657](https://github.com/Azure/azure-sdk-for-js/pull/6657)
  Currently clients share their parent client's pipeline. But when the pipeline doesn't have a http client specified, a `DefaultHttpClient` will be created for each of the clients. This leads to memory leaks and exhaustion of TCP connections when many clients are created with `keepAlive` option enabled because each client creates a long-live http connection. This change creates a default http client instance to share among all clients if none is specified in the pipeline options.

## 12.0.0-preview.6 (2019-12-04)

- Initial Release. API version 2019-02-02 supported. Please see the README for information on the new design.
