# Release History

## 1.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

- renames `SchemaDescription`'s `group` to `groupName`
- renames `SchemaId` to `SchemaProperties`
- renames `getSchemaById` to `getSchema`
- renames `GetSchemaByIdOptions` to `GetSchemaOptions`
- `getSchema` and `getSchemaProperties` no longer return `undefined` if the schema was not registered
- renames `content` to `definition`, `serializationType` to `format`, and `KnownSerializationType` to `KnownSchemaFormat`

### Bugs Fixed

### Other Changes

- remove caching from the client. The customer can rely on the one in the serializer package such as `@azure/schema-registry-avro` or write their own that makes most sense in their application.

## 1.0.0-beta.2 (2021-08-17)

### Features Added

- Support caching of registered schemas and send requests to the service only if the cache does not have the looked-up schema/schema ID.

### Breaking Changes

- Change SchemaRegistryClient.getSchemaId and SchemaRegistryClient.getSchemaById to return `undefined` instead of throwing when schema is not found ([Issue #15130](https://github.com/Azure/azure-sdk-for-js/issues/15130))
- Move generated client to use @azure/core-rest-pipeline. For more information about Core V2, please refer to [the documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core#core-v1-and-core-v2). 
  - With this change, the response types no longer contain the raw response `_response`. To access the raw response, an `onResponse` callback has to be passed in the request options bag.

    ```typescript
    let createResult: FullOperationResponse | undefined;
    await client.getSchemaById(id, { onResponse: (response) => (createResult = response) });
    ```

### Bug Fixes

- Fix issue with newlines and certain other characters in schema. ([Issue 15131](https://github.com/Azure/azure-sdk-for-js/issues/15131))

## 1.0.0-beta.1 (2020-09-08)

- Initial preview release
