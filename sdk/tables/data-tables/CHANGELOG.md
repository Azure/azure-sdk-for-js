# Release History

## 12.0.0-beta.3 (2021-05-17)

- Update and Upsert operations have "merge" as default update mode. [#14956](https://github.com/Azure/azure-sdk-for-js/pull/14956)
- Expose Table Service url as a public client property. [#14956](https://github.com/Azure/azure-sdk-for-js/pull/14956)
- Make list and get entity methods have a default template type of `Record` for better UX. [#14956](https://github.com/Azure/azure-sdk-for-js/pull/14956)

### Breaking Changes

- Enable Type conversion of `DateTime -> Date` and `Int64 -> bigint` by default. Allow disabling type conversion with `disableTypeConversion` option in the get and list operations. [#15307](https://github.com/Azure/azure-sdk-for-js/pull/15307)
- Node.js v8 support is dropped as it has reached end of life [#14956](https://github.com/Azure/azure-sdk-for-js/pull/15307)
- Rename Batch to Transaction and redesign submitTransaction to provide a more declarative interface. [#15250](https://github.com/Azure/azure-sdk-for-js/pull/15250)
- createTable and deleteTable don't throw on 409 or 404 respectively. Return type becomes `Promise<void>`. [#14956](https://github.com/Azure/azure-sdk-for-js/pull/14956)
- Clean up method options. [#14956](https://github.com/Azure/azure-sdk-for-js/pull/14956)
- Remove continuation tokens from options on list methods. [#14956](https://github.com/Azure/azure-sdk-for-js/pull/14956)

## 12.0.0-beta.2 (2021-04-06)

- Update open-telemetry dependency to 1.0.0-rc.0 [#14208](https://github.com/Azure/azure-sdk-for-js/pull/14208)
- Update @azure/core-client and @azure/core-rest-pipeline dependencies to 1.0.0 [#14318](https://github.com/Azure/azure-sdk-for-js/pull/14318)

## 12.0.0-beta.1 (2021-03-09)

- Exclude browser unsupported headers when building a Batch request in the browser [#13955](https://github.com/Azure/azure-sdk-for-js/pull/13955)
- Make connection string keys case-insensitive [#13954](https://github.com/Azure/azure-sdk-for-js/pull/13954)

## 1.0.0-beta.5 (2021-02-09)

### Breaking Changes

- Move generated client to use @azure/core-rest-pipeline. For more information about Core V2 read [here](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core#core-v1-and-core-v2). [#12548](https://github.com/Azure/azure-sdk-for-js/pull/12548).
  - With this change, the response types no longer contain the raw response `_response`. To access the raw response, an `onResponse` callback has to be passed in the request options bag.
    ```typescript
    let createResult: FullOperationResponse | undefined;
    await client.createEntity(testEntity, { onResponse: (response) => (createResult = response) });
    ```

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
