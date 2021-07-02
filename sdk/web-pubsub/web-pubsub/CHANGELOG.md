# Release History

## 1.0.0-beta.3 (Unreleased)

### Breaking Changes

- `hasUser` has been removed from `GroupClient` as that operation is no longer supported by the service.
- Updated to have void returns for most operations. If you were previously using `RestResponse`, you can instead use the `onResponse` callback in the operation options. See README for an example.

## 1.0.0-beta.2 (2021-05-19)

Remove "url" dependency

## 1.0.0-beta.1 (2021-04-23)

This is the first release of the @azure/web-pubsub package.
