<!-- dev-tool snippets ignore -->

# Migration Guide

This document shows the customers of v1 on how to migrate their code to use the v2 libraries.

- The v2 libraries have migrated to use `@azure/core-rest-pipeline`. For more information, please refer to [the documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core#core-v1-and-core-v2). As a result of this migration:
  - The response types no longer contain the raw response `_response`. To access the raw response, an `onResponse` callback has to be passed in the request options bag, for example:
    ```typescript
    let rawResponse: FullOperationResponse | undefined;
    await client.operationName(/* ...parameters... */, {
      onResponse: (response) => (rawResponse = response),
    });
    ```
  - Client methods that previously returned `RestResponse` now return `void`. In the event the operation fails, a `RestError` will still be thrown. To access the raw HTTP response, use the `onResponse` callback described above.
- Digital Twin objects returned from operations no longer have their properties wrapped in a `body` property.
