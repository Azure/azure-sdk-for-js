# Azure Search provisioning library for JavaScript

`@azure/provisioning-search` provides typed Azure Search resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-search @azure/provisioning-core
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-search` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

```ts snippet:ReadmeSampleCreateSearchService
import { Stack } from "@azure/provisioning-core";
import { SearchService } from "@azure/provisioning-search";
import { serialize } from "@azure/provisioning-core/serialization";

const stack = new Stack("search-deployment", {
  targetScope: "resourceGroup",
  location: "eastus",
});
const searchService = new SearchService(stack, {
  name: "my-unique-search-service",
  location: "eastus",
  sku: { name: "basic" },
  properties: {
    replicaCount: 1,
    partitionCount: 1,
    disableLocalAuth: true,
  },
});
stack.outputs.add("searchServiceId", "string", searchService.id);
console.log(JSON.stringify(serialize(stack), null, 2));
```

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-search`.
Shared model, input, and view types are available from `@azure/provisioning-search/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
