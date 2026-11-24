# Azure Storage provisioning library for JavaScript

`@azure/provisioning-storage` provides typed Azure Storage resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-storage @azure/provisioning-core
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-storage` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

The following example defines a storage account and blob container in a resource-group-scoped stack, then serializes the definition to JSON. The storage account name must be globally unique and contain 3 to 24 lowercase letters and digits.

```ts snippet:ReadmeSampleCreateStorageAccount
import { Stack } from "@azure/provisioning-core";
import { StorageAccount, BlobService, Container } from "@azure/provisioning-storage";
import { serialize } from "@azure/provisioning-core/serialization";

const stack = new Stack("storage-deployment", {
  targetScope: "resourceGroup",
  location: "eastus",
});
const storageAccount = new StorageAccount(stack, {
  name: "myuniquestorageaccount",
  location: "eastus",
  sku: { name: "Standard_LRS" },
  kind: "StorageV2",
});
const blobService = new BlobService(storageAccount, {});
new Container(blobService, {
  name: "my-container",
});
stack.outputs.add("storageAccountId", "string", storageAccount.id);
console.log(JSON.stringify(serialize(stack), null, 2));
```

This only produces an infrastructure definition; it does not deploy resources to Azure.

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-storage`.
Shared model, input, and view types are available from `@azure/provisioning-storage/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
