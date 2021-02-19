# Release History

## 1.0.0-beta.2 (Unreleased)

- Changed from exposing `DefaultHttpsClient` as a class directly, to providing `createDefaultHttpsClient()` to instantiate the appropriate runtime class.
- Fix an issue when passing in proxy hosts. There's some difference between the previous `tunnel.HttpsOverHttpsOptions` and `HttpsProxyAgentOptions`, in particular the former's `host` property includes both the protocol and the host parts, while the later have separate `host` and `protocol` properties.

## 1.0.0-beta.1 (2021-02-04)

- Changes from `core-http`:
  - First release of new Pipeline model, see README for details.
  - ServiceClient and related AutoRest functionality moved out to `core-client`.
  - XML functionality moved out to `core-xml`.
  - Removal of node-fetch dependency.
  - Switched to use `https-proxy-agent` for proxy support.
  - Dropped IE support.
  - Stopped exporting various helper/utility methods.
  - All function parameters are now interfaces.
  - Remove rpRegistrationPolicy.
  - Remove keepAlivePolicy
  - Let clients add ndJsonPolicy manually
  - Disable redirects by removing the policy instead of an option
  - Invert response decompression policy
  - Remove request cloning, to optimize pipeline allocations.
- Add ms-cv header used as correlation vector (used for distributed tracing) to list of non-redacted headers so that clients can share this header for debugging purposes. [PR 13541](https://github.com/Azure/azure-sdk-for-js/pull/13541)
