# Testing Identity in Azure Functions

## Prerequisites

-

- An Azure Key Vault.

### Install Azure Functions

> **Note:**

## Give the Azure Functions access to the key vault

## Run the azure-identity Tests on the Azure Functions

> **Note:** The following steps are specific to JavaScript.

In a terminal window, run:

```bash
git clone https://github.com/Azure/azure-sdk-for-js --single-branch --depth 1
cd azure-sdk-for-js/sdk/identity/identity/test/manual-integration/AzureArc
```

Set the environment variable `KEYVAULT_URI` to the vault URI of your key vault.

Install dependencies:

```bash
npm install
```

Compile the test file using TypeScript:

```bash
npm run build
```

Run the test file:

```bash
node dist/index.js
```

az group create --name AzureFunctionsIdentity-rg --location westus2

az storage account create --name storageidentityfunctions --location westus2 --resource-group AzureFunctionsIdentity-rg --sku Standard_LRS

az functionapp create --resource-group AzureFunctionsIdentity-rg --consumption-plan-location westus2 --runtime node --runtime-version 12 --functions-version 3 --name identityendtoendtest --storage-account storageidentityfunctions
