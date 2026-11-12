# Azure Cognitive Services provisioning library for JavaScript

`@azure/provisioning-cognitiveservices` provides typed Azure Cognitive Services resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-cognitiveservices @azure/provisioning-core
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-cognitiveservices` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

The following example defines a multi-service Cognitive Services account in a resource-group-scoped stack, then serializes the definition to JSON. Replace the custom subdomain name with a globally unique value.

```ts snippet:ReadmeSampleCreateAccount
import { Stack } from "@azure/provisioning-core";
import { Account } from "@azure/provisioning-cognitiveservices";
import { serialize } from "@azure/provisioning-core/serialization";

const stack = new Stack("cognitive-services-deployment", {
  targetScope: "resourceGroup",
  location: "eastus",
});
const account = new Account(stack, {
  name: "my-cognitive-services",
  location: "eastus",
  kind: "CognitiveServices",
  sku: { name: "S0" },
  properties: {
    customSubDomainName: "my-unique-cognitive-services",
    disableLocalAuth: true,
  },
});
stack.outputs.add("accountId", "string", account.id);
console.log(JSON.stringify(serialize(stack), null, 2));
```

This only produces an infrastructure definition; it does not deploy resources to Azure.

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-cognitiveservices`.
Shared model, input, and view types are available from `@azure/provisioning-cognitiveservices/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
