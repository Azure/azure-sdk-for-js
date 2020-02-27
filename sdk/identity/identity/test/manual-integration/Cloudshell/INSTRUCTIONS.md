# Testing azure-identity in Azure Cloud Shell

# Open Azure Cloud Shell
https://shell.azure.com/

# Create an Azure Key Vault

## set environment variables to simplify copy-pasting
- RESOURCE_GROUP
  - name of an Azure resource group
  - must be unique in the Azure subscription
  - e.g. 'cloudshell-identity-test'
- KEY_VAULT_NAME
  - 3-24 alphanumeric characters
  - must begin with a letter
  - must be globally unique

## create a resource group
```sh
az group create -n $RESOURCE_GROUP --location westus2
```

## create the Key Vault
```sh
az keyvault create -g $RESOURCE_GROUP -n $KEY_VAULT_NAME --sku standard
```

The tests expect the vault's URI in an environment variable:
```sh
$AZURE_IDENTITY_TEST_VAULT_URL=az keyvault show -g $RESOURCE_GROUP -n $KEY_VAULT_NAME --query properties.vaultUri | tr -d '"'
```

# Run the tests

### Build the webapp
```
git clone https://github.com/azure/azure-sdk-for-js --single-branch --branch master --depth 1
```

```
cd azure-sdk-for-js\sdk\identity\identity\test\manual-integration\webjobs\App_Data
```

Install the requirements:
```
npm install
```

Build the job:
```
tsc -p .
```

## In virtual environment:

### Run tests
```sh
node index
```

### Deactivate
```sh
deactivate
```

# Delete Azure resources
After running tests, delete the resources provisioned earlier:
```sh
az group delete -n $RESOURCE_GROUP -y --no-wait
```
