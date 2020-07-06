# Release History

## 1.1.0 (2020-07-07)

- Adding browser support for the latest versions of Chrome, Edge and Firefox.

## 1.0.1 (2020-02-19)

- The underlying filter behavior has changed for `listConfigurationSettings` and `listRevisions`.
  Inline documentation has been revised to accomodate it.

## 1.0.0 (2020-01-06)

This release marks the general availability of the `@azure/app-configuration` package.

- Fixed issue [#6528](https://github.com/Azure/azure-sdk-for-js/pull/6528) where
  the proper user agent header (`x-ms-useragent`) wasn't being sent when we were
  running in a browser.
- Allow developers to prepend additional information to the user agent header.

  Example:

  ```typescript
  new AppConfigurationClient(connectionString, {
    userAgentOptions: {
      userAgentPrefix: "MyUserAgent"
    }
  });
  ```

## 1.0.0-preview.10 (2019-12-10)

- Specifying filters for listConfigurationSettings() or listRevisions() is
  now done with the `keyFilter` or `labelFilter` strings rather than `keys`
  and `labels` as they were previously.
- Fixed issue [#6408](https://github.com/Azure/azure-sdk-for-js/issues/6408) where
  throttling wasn't properly implemented, causing failures when sending many
  concurrent requests.

## 1.0.0-preview.9 (2019-12-03)

- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`.
- Added support for TokenCredential in `AppConfigurationClient`, allowing
  credentials from the `@azure/identity` package for authentication.
- Added support for sync-tokens, providing a consistent view of your App
  Configuration service even when doing rapid sets/updates and reads.

## 1.0.0-preview.7 (2019-11-01)

- Updated to use the latest versions of the `@azure/core-*` packages
- Added a listRevisions.ts sample to show how the listRevisions() API works

## 1.0.0-preview.6 (2019-10-22)

Breaking changes from 1.0.0-preview.5:

- The `ConfigurationSetting`'s `locked` property has been renamed to `readOnly` to match the nomenclature used throughout
  the SDK.
- `listConfigurationSettings` and `listRevisions` now take `readOnly` as a value in `fields`, rather than `locked`.

## 1.0.0-preview.5 (2019-10-09)

- Updated to use the latest version of `@azure/core-tracing`, `@azure/core-http` and `@azure/core-arm` packages

## 1.0.0-preview.4 (2019-10-08)

### Breaking changes from 1.0.0-preview.3:

This release brings our interface a bit closer to what is offered in the
Azure SDKs for C# and Java for AppConfig.

This affects the `getConfigurationSetting`, `addConfigurationSetting`,
`setConfigurationSetting` and `deleteConfigurationSetting` methods which
no longer take a `key` parameter and instead take an object.

In previous previews:

```typescript
// 1.0.0-preview.3 and below
await client.getConfigurationSetting("MyKey", { label: "MyLabel" });
await client.addConfigurationSetting("MyKey", { label: "MyLabel", value: "MyValue" });
await client.setConfigurationSetting("MyKey", { label: "MyLabel", value: "MyValue" });
await client.deleteConfigurationSetting("MyKey", { label: "MyLabel" });
```

Now in preview.4:

```typescript
// 1.0.0-preview.4
await client.getConfigurationSetting({ key: "MyKey", label: "MyLabel" });
await client.addConfigurationSetting({ key: "MyKey", label: "MyLabel", value: "MyValue" });
await client.setConfigurationSetting({ key: "MyKey", label: "MyLabel", value: "MyValue" });
await client.deleteConfigurationSetting({ key: "MyKey", label: "MyLabel" });
```

### Enhancements

- `listConfigurationSettings` and `listRevisions` have been changed to return `PagedAsyncIterableIterator`'s,
  allowing their results to be iterated by page (also returning HTTP response information) or as an
  iterator of ConfigurationSetting.
- `setReadOnly` and `clearReadOnly` let you mark a setting as read-only (or make it writeable) again,
  protecting against accidental changes.

## 1.0.0-preview.3 (2019-09-23)

- Typings file was incorrectly packaged (#5217)

## 1.0.0-preview.2 (2019-09-13)

Republishing as the readme is not properly showing up on npmjs. No other changes.

## 1.0.0-preview.1 (2019-09-12)

This is the first release of the @azure/app-configuration package.

This package contains the `AppConfigurationClient` to talk to the Azure
App Configuration managed service, with initial support for create, read,
update, delete and search operations with configuration settings.
