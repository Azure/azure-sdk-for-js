# Release History

## 1.1.0 (2022-05-10)

### Features Added

- Added support for distributed tracing using OpenTelemetry - please refer to the [@azure/opentelemetry-instrumentation-azure-sdk](https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk) package for instructions.

### Other Changes

- `SchemaProperties` now includes `name` and `groupName` for the schema name and its group respectively.

## 1.0.1 (2021-11-17)

### Bugs Fixed

- Disable client-side validation of schema names and leave that to the service.

## 1.0.0 (2021-11-10)

### Features Added

- an option to customize the API version has been added to `SchemaRegistryClientOptions`. 

### Breaking Changes

- The type `Schema` no longer extends `SchemaProperties`, instead, it now has two properties, one for the schema definition and one for its properties.
- `Schema.schemaDefinition` has been renamed to `Schema.definition`.
- `SchemaDescription.schemaDefinition` has been renamed to `SchemaDescription.definition`.
- `getSchema` and `getSchemaProperties` no longer return `undefined`. If a schema is not found, an error will be thrown.
- `SchemaProperties` no longer includes the `version`.

### Other Changes

- This is the initial general availability release of the schema registry package and the API version defaults to 2021-10.

## 1.0.0-beta.3 (2021-10-05)

### Breaking Changes

- renames `SchemaDescription`'s `group` to `groupName`
- renames `SchemaId` to `SchemaProperties`
- renames `getSchemaById` to `getSchema`
- renames `GetSchemaByIdOptions` to `GetSchemaOptions`
- renames `content` to `schemaDefinition`, `serializationType` to `format`, and `KnownSerializationType` to `KnownSchemaFormat`

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
