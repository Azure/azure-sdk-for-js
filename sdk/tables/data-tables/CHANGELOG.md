# Release History

## 12.1.2 (2021-09-07)

### Bugs Fixed

- Fix `disableTypeConversion` to also apply for booleans and convert value to string when there is no type metadata. [#17385](https://github.com/Azure/azure-sdk-for-js/pull/17385)

## 12.1.1 (2021-08-10)

### Bugs Fixed

- Fixed inconsistent return type for number and strings when setting `disableTypeConversion` option. [#16736](https://github.com/Azure/azure-sdk-for-js/pull/16736)
- Fix [#15854](https://github.com/Azure/azure-sdk-for-js/issues/15701) when submitting transactions by ensuring the `allowInsecureConnection` client option is respected. [#16587](https://github.com/Azure/azure-sdk-for-js/pull/16587)

### Other Changes

- Update dependency of `@azure/core-xml`. [#16816](https://github.com/Azure/azure-sdk-for-js/pull/16816)

## 12.1.0 (2021-07-07)

### Acknowledgments

Thank you to our developer community members who helped to make the Azure Tables client library better with their contributions to this release:

- Eros Stein _([GitHub](https://github.com/eestein))_

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- Support for Azure Active Directory (AAD) authorization has been added to `TableServiceClient` and `TableClient`. This enables use of `TokenCredential` credentials. Note: Only Azure Storage API endpoints currently support AAD authorization. [#15852](https://github.com/Azure/azure-sdk-for-js/pull/15852)

### Fixed

- Fix [#15664](https://github.com/Azure/azure-sdk-for-js/issues/15701), adding check to make sure we always have only one forward slash (`/`) added to the end of the URL [#15698](https://github.com/Azure/azure-sdk-for-js/pull/15698) (A community contribution, courtesy of _[eestein](https://github.com/eestein))_
- Fix [#15701](https://github.com/Azure/azure-sdk-for-js/issues/15701) by improving error handling and reporting on `submitTransaction`. [#15852](https://github.com/Azure/azure-sdk-for-js/pull/15852)
- Fix [#15921](https://github.com/Azure/azure-sdk-for-js/issues/15921) incorrect `url` import and missing browser mapping for `computeHMACSHA256` [#15944](https://github.com/Azure/azure-sdk-for-js/pull/15944)
- Fix [#15854]https://github.com/Azure/azure-sdk-for-js/issues/15854) by setting `allowInsecureConnection` to true when using the development connection string.

## 12.0.0 (2021-06-09)

- Added support for generating SAS tokens using an `AzureNamedKeyCredential` [#15564](https://github.com/Azure/azure-sdk-for-js/pull/15564)
- Use @azure/core-auth `AzureSASCredendial` [#15564](https://github.com/Azure/azure-sdk-for-js/pull/15564)
- Fix submit transaction issue [15403](https://github.com/Azure/azure-sdk-for-js/issues/15403) when sending multiple transactions. [#15493](https://github.com/Azure/azure-sdk-for-js/pull/15493)
- Fix date serialization on `getAccessPolicy` and `setAccessPolicy` Table client methods. [#15633](https://github.com/Azure/azure-sdk-for-js/pull/15633)

### Breaking Changes

- Use @azure/core-auth `AzureNamedKeyCredential` [#15529](https://github.com/Azure/azure-sdk-for-js/pull/15529)

## 12.0.0-beta.3 (2021-05-17)

- Update and Upsert operations have "merge" as default update mode. [#14956](https://github.com/Azure/azure-sdk-for-js/pull/14956)
- Expose Table Service url as a public client property. [#14956](https://github.com/Azure/azure-sdk-for-js/pull/14956)
- Make list and get entity methods have a default template type of `Record` for better UX. [#14956](https://github.com/Azure/azure-sdk-for-js/pull/14956)

### Breaking Changes

- Enable Type conversion of `DateTime -> Date` and `Int64 -> bigint` by default. Allow disabling type conversion with `disableTypeConversion` option in the get and list operations. [#15307](https://github.com/Azure/azure-sdk-for-js/pull/15307)
- Node.js v8 support is dropped as it has reached end of life [#15307](https://github.com/Azure/azure-sdk-for-js/pull/15307)
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

- Move generated client to use @azure/core-rest-pipeline. For more information about Core V2 read [here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core#core-v1-and-core-v2). [#12548](https://github.com/Azure/azure-sdk-for-js/pull/12548).
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
