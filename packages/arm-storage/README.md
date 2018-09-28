# Microsoft Azure SDK for JavaScript - Storage Management

This project provides a JavaScript package that makes it easy to manage Microsoft Azure Storage Resources.Right now it supports:
- **Node.js version: 6.x.x or higher**

## How to Install

```bash
npm install @azure/arm-storage
```
## A working sample
A sample that can be cloned and is ready to used can be found over [here](https://github.com/Azure-Samples/storage-node-resource-provider-getting-started).

## How to Use

### Authentication, client creation and listing storageAccounts as an example

```typescript
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { StorageManagementClient, StorageManagementModels } from "@azure/arm-storage";

// Interactive Login
msRestNodeAuth.interactiveLogin()
  .then((credentials: msRestNodeAuth.TokenCredentialsBase) => {
    const client = new StorageManagementClient(credentials, "your-subscription-id");
    return client.storageAccounts.list();
  })
  .then((result: StorageManagementModels.StorageAccountsListResponse) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

### Create the StorageManagementClient

```typescript
import { StorageManagementClient } from "@azure/arm-storage";
const client = new StorageManagementClient(credentials, "your-subscription-id");
```

## Create a storageAccount

```typescript
import { StorageManagementModels } from "@azure/arm-storage";
const createParameters: StorageManagementModels.StorageAccountCreateParameters = {
  location: 'West US',
  sku: {
    name: 'Standard_LRS'
  },
  kind: 'Storage'
  tags: {
    tag1: 'val1',
    tag2: 'val2'
  }
};
client.storageAccounts.create(groupName, accountName, createParameters)
  .then((result: StorageManagementModels.StorageAccountsCreateResponse) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## Get properties of a storageAccount

```typescript
client.storageAccounts.getProperties(groupName, accountName)
  .then((result: StorageManagementModels.StorageAccountsGetPropertiesResponse) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## List all the storage accounts in a specific resource group

```typescript
client.storageAccounts.listByResourceGroup(groupName)
  .then((result: StorageManagementModels.StorageAccountsListByResourceGroupResponse) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## List all the storage accounts in the current subscription

```javascript
client.storageAccounts.list()
  .then((result: StorageManagementModels.StorageAccountsListResponse) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## Regenerate the storage account keys of a storage account

```typescript
client.storageAccounts.regenerateKey(groupName, accountName, 'key1')
  .then((result: StorageManagementModels.StorageAccountsRegenerateKeyResponse) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## Delete a storageAccount

```typescript
import * as msRest from "ms-rest-js";
client.storageAccounts.deleteMethod(groupName, accountName)
  .then((result: msRest.RestResponse) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## Related projects

- [Microsoft Azure SDK for JavaScript - All-up](https://github.com/WindowsAzure/azure-sdk-for-js)
