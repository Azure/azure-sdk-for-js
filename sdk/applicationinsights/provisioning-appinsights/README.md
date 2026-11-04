# Azure Insights provisioning library for JavaScript

`@azure/provisioning-appinsights` provides typed Azure Insights resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-appinsights @azure/provisioning-core
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-appinsights` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

The following example defines a web Application Insights component.

```ts snippet:ReadmeSampleCreateComponent
import { Stack } from "@azure/provisioning-core";
import { Component } from "@azure/provisioning-appinsights";

const stack = new Stack("application-insights", {
  targetScope: "resourceGroup",
  location: "eastus",
});
new Component(stack, {
  name: "example-appinsights",
  kind: "web",
  properties: {
    applicationType: "web",
  },
});
```

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-appinsights`.
Shared model, input, and view types are available from `@azure/provisioning-appinsights/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
