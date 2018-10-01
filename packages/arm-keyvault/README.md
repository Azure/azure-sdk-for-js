# Microsoft Azure SDK for JavaScript - Key Vault Management

This project provides a JavaScript package for managing vaults on Azure Key Vault. Right now it supports:
- **Node.js version: 6.x.x or higher**
- **REST API version: 2015-06-01**

## Features

- Manage vaults: create, update, delete, list and get.

## How to Install

```bash
npm install arm-keyvault
```

## Detailed Sample
A sample that can be cloned and run can be found [here](https://github.com/Azure-Samples/key-vault-node-getting-started).

## How to Use

The following example creates a new vault.

```TypeScript
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { KeyVaultManagementClient, KeyVaultManagementModels } from "azure-arm-keyvault";

// Interactive Login
const client;
msRestNodeAuth.interactiveLogin().then((credentials) => {
  client = new KeyVaultManagementClient(credentials, "<your-subscription-id>");
  return client.vaults.list();
}).then((vaults) => {
  console.dir(vaults, {depth: null, colors: true});
  return;
}).then(() => {
  const resourceGroup = "<resource group name>";
  const vaultName = "myNewVault";
  const parameters: KeyVaultManagementModels.VaultCreateOrUpdateParameters = {
    location : "East US",
    properties : {
      sku : {
        family : "A",
        name : "standard"
      },
      accessPolicies : [],
      enabledForDeployment : false,
      tenantId : "<tenant GUID>"
    },
    tags : {}
  };
  console.info('Creating vault...');
  return client.vaults.createOrUpdate(resourceGroup, vaultName, parameters);
}).then((vault: KeyVaultManagementModels.VaultsCreateOrUpdateResponse) => {
  console.dir(vault, {depth: null, colors: true});
  return;
}).catch((err: Error) => {
  console.log('An error occured');
  console.dir(err, {depth: null, colors: true});
  return;
});
```

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [Microsoft Azure SDK for JavaScript - KeyVault](https://github.com/Azure/azure-sdk-for-js/tree/master/packages/keyvault)
