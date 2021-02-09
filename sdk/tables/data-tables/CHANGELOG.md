# Release History

## 1.0.0-beta.6 (Unreleased)


## 1.0.0-beta.5 (2021-02-09)

- Move generated client to use @azure/core-https. For more information about Core V2 read [here](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core#core-v1-and-core-v2). [#12548](https://github.com/Azure/azure-sdk-for-js/pull/12548)

## 1.0.0-beta.4 (2021-01-12)

- Fix issue that prevented support for Azure Storage Emulator and Azurite [#13165](https://github.com/Azure/azure-sdk-for-js/pull/13165)

### Breaking Changes

- Don't deserialize DateTime into a JavaScript Date to avoid losing precision [#12650](https://github.com/Azure/azure-sdk-for-js/pull/12650)

## 1.0.0-beta.3 (2020-11-12)

### Breaking Changes

- Provide more idiomatic names for System properties, rename `odata.etag` to `etag` and `Timestamp` to `timestamp` [#12060](https://github.com/Azure/azure-sdk-for-js/pull/12060)

## 1.0.0-beta.2 (2020-10-06)

- Add support for Entity Group Transactions (Batch) [#11551](https://github.com/Azure/azure-sdk-for-js/pull/11551).

## 1.0.0-beta.1 (2020-09-08)

This is the first beta of the `@azure/data-tables` client library. The Azure Tables client library can seamlessly target either Azure Table storage or Azure Cosmos DB table service endpoints with no code changes.
