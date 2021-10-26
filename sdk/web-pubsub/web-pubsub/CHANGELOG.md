# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

- Support for DefaultAzureCredential
- Added generateClientToken method to the `HubClient`.
- Added support for reverse proxies, enabling usage of Web Pubsub with Azure API Management.

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.3 (2021-07-07)

### Breaking Changes

- `hasUser` has been removed from `GroupClient` as that operation is no longer supported by the service.
- Updated to have void returns for most operations. If you were previously using `RestResponse`, you can instead use the `onResponse` callback in the operation options. See README for an example.

## 1.0.0-beta.2 (2021-05-19)

Remove "url" dependency

## 1.0.0-beta.1 (2021-04-23)

This is the first release of the @azure/web-pubsub package.
