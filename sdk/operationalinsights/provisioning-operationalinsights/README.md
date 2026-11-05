# Azure Operational Insights provisioning library for JavaScript

`@azure/provisioning-operationalinsights` provides typed Azure Operational Insights resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-operationalinsights @azure/provisioning-core
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-operationalinsights` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

```ts snippet:ReadmeSampleCreateWorkspace
import { Stack } from "@azure/provisioning-core";
import { Workspace } from "@azure/provisioning-operationalinsights";
import { serialize } from "@azure/provisioning-core/serialization";

const stack = new Stack("log-analytics-deployment", {
  targetScope: "resourceGroup",
  location: "eastus",
});
const workspace = new Workspace(stack, {
  name: "my-log-analytics-workspace",
  location: "eastus",
  properties: {
    sku: { name: "PerGB2018" },
    retentionInDays: 30,
  },
});
stack.outputs.add("workspaceId", "string", workspace.id);
console.log(JSON.stringify(serialize(stack), null, 2));
```

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-operationalinsights`.
Shared model, input, and view types are available from `@azure/provisioning-operationalinsights/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
