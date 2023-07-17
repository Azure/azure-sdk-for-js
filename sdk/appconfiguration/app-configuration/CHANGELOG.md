# Release History
## 1.5.0-beta.2 (Unreleased)

### Breaking Changes

### Features Added

### Bugs Fixed

### Other Changes

## 1.5.0-beta.1 (2023-07-14)

### Features Added

- With the new preview API version `2022-11-01-preview`, added configuration settings snapshot feature that allows users to create a point-in-time snapshot of their configuration store.
  [#24535](https://github.com/Azure/azure-sdk-for-js/pull/24535)

## 1.4.1 (2023-04-24)

### Features Added
- Added dependency on `@azure/logger` to help with debugging. [#23860](https://github.com/Azure/azure-sdk-for-js/pull/23860)

### Bugs Fixed

- "\0" as the `labelFilter` in the listing methods `AppConfgurationClient#listConfigurationSettings` would return the settings without any labels. Docs were updated to reflect that.
  [#21309](https://github.com/Azure/azure-sdk-for-js/pull/21039)
- [#25463](https://github.com/Azure/azure-sdk-for-js/pull/25463) If the app configuration endpoint ends withs a slash(`/`), the requests made using the `AppConfigurationClient` hit 401 error owing to `Bearer error="invalid_token", error_description="Authorization token failed validation"`. The issue is fixed as part of [#20766](https://github.com/Azure/azure-sdk-for-js/pull/20766).

### Other Changes

- Update `@azure/core-paging` dependency to the latest version (1.4.0). Notable changes include using the `getPagedAsyncIterator` method. [#23479](https://github.com/Azure/azure-sdk-for-js/pull/23479)

- Provide helpful debugging error message for `412` status code with `Setting was already present`. [#24207](https://github.com/Azure/azure-sdk-for-js/pull/24207)

## 1.4.0-beta.1 (2022-05-10)

### Features Added

- Migrated from using `@azure/core-http` to depend on newer version of Core libraries `@azure/core-client` and `@azure/core-rest-pipeline` which bring better maintainability and performance. [#20766](https://github.com/Azure/azure-sdk-for-js/pull/20766). See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move.
  - As part of the migration to `@azure/core-client` and `@azure/core-rest-pipeline`,
    through the operation options, the methods such as `AppConfgurationClient#addConfigurationSetting` can take a callback (`onResponse`) to access the HTTP response. See [Change to the \_response property](https://github.com/Azure/autorest.typescript/wiki/%60core-http%60-dependency-migration-to-%60core-client%60-%60core-rest-pipeline%60#change-to-the-_response-property).

### Bugs Fixed

- Fix an issue where React-Native is loading the wrong file. Adding a `react-native` mapping to point to the ESM entrypoint file. [PR #21119](https://github.com/Azure/azure-sdk-for-js/pull/21119)

### Other Changes

- Updated our `@azure/core-tracing` dependency to the latest version (1.0.0).

  - Notable changes include Removal of `@opentelemetry/api` as a transitive dependency and ensuring that the active context is properly propagated.
  - Customers who would like to continue using OpenTelemetry driven tracing should visit our [OpenTelemetry Instrumentation](https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk) package for instructions.

- Move to depend on `@azure/core-util` for SHA256 Digest and HMAC computing.

## 1.3.1 (2021-12-14)

### Bugs Fixed

- Using this SDK with the resources from Sovereign clouds (AzureUSGovernment/AzureChinaCloud) would have failed with an authorization error.
  Has been fixed in [#17583](https://github.com/Azure/azure-sdk-for-js/pull/17583)

### Other Changes

- Throws a better error message if provided invalid connection strings such as `undefined` to the `AppConfigurationClient` constructor. [#18356](https://github.com/Azure/azure-sdk-for-js/pull/18356)

## 1.3.0 (2021-07-26)

### Features Added

- Added "continuationToken" option for the `byPage` APIs of the listing methods (`listConfigurationSettings` and the `listRevisions`), this lets you keep track of where to continue the iterator from.
  [#16472](https://github.com/Azure/azure-sdk-for-js/pull/16472)
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.

### Bugs Fixed

- Throttling may have resulted in retrying the request indefinitely if the service responded with `retry-after-ms` header in the error for each retried request. The behaviour has been changed to retry for a maximum of 3 times by default from [#16376](https://github.com/Azure/azure-sdk-for-js/pull/16376).
  - Additionally, [#16376](https://github.com/Azure/azure-sdk-for-js/pull/16376) also exposes retryOptions on the `AppConfigurationClient`'s client options, which lets you configure the `maxRetries` and the `maxRetryDelayInMs`.
  - More resources - [App Configuration | Throttling](https://docs.microsoft.com/azure/azure-app-configuration/rest-api-throttling) and [App Configuration | Requests Quota](https://docs.microsoft.com/azure/azure-app-configuration/faq#which-app-configuration-tier-should-i-use)

## 1.2.0 (2021-07-07)

### Features Added

- Special configuration settings - feature flag and secret reference are now supported. 🎉

  - For types, use `ConfigurationSetting<FeatureFlagValue>` and `ConfigurationSetting<SecretReferenceValue>`.
  - Use `parseFeatureFlag` and `parseSecretReference` methods to parse the configuration settings into feature flag and secret reference respectively.

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Fixed

- High request rate would result in throttling. SDK would retry on the failed requests based on the service suggested time from the `retry-after-ms` header in the error response. If there are too many parallel requests, retries for all of them may also result in a high request rate entering into a state which might seem like the application is perpetually not responding.
  - [#15721](https://github.com/Azure/azure-sdk-for-js/pull/15721) allows the user-provided abortSignal to be taken into account to abort the requests sooner.
  - More resources - [App Configuration | Throttling](https://docs.microsoft.com/azure/azure-app-configuration/rest-api-throttling) and [App Configuration | Requests Quota](https://docs.microsoft.com/azure/azure-app-configuration/faq#which-app-configuration-tier-should-i-use)

## 1.2.0-beta.2 (2021-06-08)

- With [#15136](https://github.com/Azure/azure-sdk-for-js/pull/15136), if the key of a feature flag(setting with `contentType="application/vnd.microsoft.appconfig.ff+json;charset=utf-8"`) doesn't start with `".appconfig.featureflag/"` (featureFlagPrefix), SDK adds the prefix before sending the request.
- New design for feature flags and secret references,
  - New types for FeatureFlag and SecretReference - `ConfigurationSetting<FeatureFlagValue>` and `ConfigurationSetting<SecretReferenceValue>`
  - Upon using `getConfigurationSetting`(or add/update), use `parseFeatureFlag` and `parseSecretReference` methods to access the properties(to translate `ConfigurationSetting` into the types above).
  - Helper method `isFeatureFlag` (and `isSecretReference`) checks the contentType and return boolean values.

## 1.2.0-beta.1 (2021-04-06)

### New Features

- New `SecretReferenceConfigurationSetting` and `FeatureFlagConfigurationSetting`types to represent configuration settings that references KeyVault Secret reference and feature flag respectively.
  [#14342](https://github.com/Azure/azure-sdk-for-js/pull/14342)
- Added `updateSyncToken` method to `AppConfigurationClient` to be able to provide external synchronization tokens.
  [#14507](https://github.com/Azure/azure-sdk-for-js/pull/14507)

## 1.1.1 (2021-03-25)

- Fix issues with `select`ing fields to be returned from `listConfigurationSettings`, `listConfigurationRevisions`
  and `getConfigurationSetting` where `last_modified` and `content_type` could not properly be passed in.
  [PR #13258](https://github.com/Azure/azure-sdk-for-js/pull/13258)

## 1.1.0 (2020-07-07)

- Adding browser support for the latest versions of Chrome, Edge and Firefox.

## 1.0.1 (2020-02-19)

- The underlying filter behavior has changed for `listConfigurationSettings` and `listRevisions`.
  Inline documentation has been revised to accommodate it.

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
      userAgentPrefix: "MyUserAgent",
    },
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
await client.addConfigurationSetting("MyKey", {
  label: "MyLabel",
  value: "MyValue",
});
await client.setConfigurationSetting("MyKey", {
  label: "MyLabel",
  value: "MyValue",
});
await client.deleteConfigurationSetting("MyKey", { label: "MyLabel" });
```

Now in preview.4:

```typescript
// 1.0.0-preview.4
await client.getConfigurationSetting({ key: "MyKey", label: "MyLabel" });
await client.addConfigurationSetting({
  key: "MyKey",
  label: "MyLabel",
  value: "MyValue",
});
await client.setConfigurationSetting({
  key: "MyKey",
  label: "MyLabel",
  value: "MyValue",
});
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
