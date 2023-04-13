## Overview

The purpose of this design document is to outline the multi-api version strategy for Azure SDK for JavaScript. This strategy is intended to support multiple service API versions in the same library. The design will use a layered approach with three layers, namely Rest Level, Modular Client, and Classical Client. Each layer builds on top of each other, and each layer is exposed as a sub-path export with ES Modules and conditional exports.

## Layers

### Rest Level Library

The Rest Level layer will provide strong typing to the REST API and ensure that requests and responses conform to the API's schema. It will generate client code based on the API's specification, which developers can use to interact with the REST API. The Rest Level layer will not abstract away the details of REST communication, but rather provide a strongly typed interface to the API's resources.

This layer will produce the smallest bundle possible. For more information please refer to [Azure REST libraries for JavaScript](https://devblogs.microsoft.com/azure-sdk/azure-rest-libraries-for-javascript/)

### Modular Library

The Modular libary layer will provide a higher-level client that is more convenient to use than the REST level client. It will provide a set of composable, modular functions that allow developers to build their own custom workflows. The Modular client layer will make use of the REST level client to perform REST calls.

This provides a nice middle ground between high level API while enabling optima tree-shaking for bundlers to produce small bundles.

For more information about how this is desinged and implemented in the Azure Sdk for JavaScript you can read [Modular Development with the Azure SDK](https://github.com/Azure/azure-sdk-for-js/blob/main/design/modular-development.md)

### Classical Client

The Classical client layer will provide a more traditional, object-oriented API that wraps the functionality of the Modular client layer. This layer will be more convenient for developers who are used to working with object-oriented APIs.

This layer provides a familiar interface with Azure SDK, and optimizes for discoverability. The downside is that bundlers can't optimize too much for bundle size, however it will be easy for customers to migrate from a Classical Client to the Modular Layer when/if they need to.
## Multi-API Version Strategy

When we need to support multiple Service API versions in the same library, our strategy is to generate additional sub-exports for each supported Service API version. The root `/api` and `/rest` will export the newest supported version. This means we will generate N times where N is the number of versions supported. This shouldn't be a problem for bundle size as bundlers should be able to leverage tree shaking to remove all the unused branches.

## Adding new versions
For example, a library that supports v1, v2, and v3 would have the following exports:

### V3
- `@azure/foo`
- `@azure/foo/api`
- `@azure/foo/rest`
- `@azure/foo/v3`
- `@azure/foo/v3/api`
- `@azure/foo/v3/rest`

### V2
- `@azure/foo/v2`
- `@azure/foo/v2/api`
- `@azure/foo/v2/rest`

### V1
- `@azure/foo/v1`
- `@azure/foo/v1/api`
- `@azure/foo/v1/rest`

When a v4 is available, the export will now be:

### V4
- `@azure/foo`
- `@azure/foo/api`
- `@azure/foo/rest`
- `@azure/foo/v4`
- `@azure/foo/v4/api`
- `@azure/foo/v4/rest`

### V3
- `@azure/foo/v3`
- `@azure/foo/v3/api`
- `@azure/foo/v3/rest`

### V2
- `@azure/foo/v2`
- `@azure/foo/v2/api`
- `@azure/foo/v2/rest`

### V1
- `@azure/foo/v1`
- `@azure/foo/v1/api`
- `@azure/foo/v1/rest`

The version-specific exports will provide backwards compatibility for older versions of the API. Developers can choose to use the latest version of the API by importing from the root `/api` and `/rest` paths or use a specific version by importing from the corresponding version-specific paths.

## Conclusion

This design document outlines the multi-API version strategy for Azure SDK for JavaScript. The strategy provides version-specific exports to ensure backwards compatibility for older versions of the API while allowing developers to use the latest version of the API. The three-layered approach of Rest Level,
