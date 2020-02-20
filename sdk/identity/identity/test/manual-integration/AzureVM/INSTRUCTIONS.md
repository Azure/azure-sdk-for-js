# prerequisite tools
- Azure CLI

# Azure resources
This test requires instances of these Azure resources:
- Azure Key Vault
- Azure Managed Identity
  - with secrets/set and secrets/delete permission for the Key Vault
- Azure Virtual Machine with system-assigned identity
- Azure Virtual Machine with user-assigned identity
  - don't use the same VM twice

The rest of this section is a walkthrough of deploying these resources.

## Set environment variables to simplify copy-pasting
- RESOURCE_GROUP
  - name of an Azure resource group
  - must be unique in the Azure subscription
  - e.g. 'identity-test-rg'
- VM_NAME_SYSTEM_ASSIGNED
  - name of an Azure Virtual machine with a system-assigned identity
  - must be unique in the resource group
  - e.g. 'identity-test-vm-system'
- VM_NAME_USER_ASSIGNED
  - name of an Azure Virtual machine with a user-assigned identity
  - must be unique in the resource group
  - e.g. 'identity-test-vm-user'
- MANAGED_IDENTITY_NAME
  - name of the user-assigned identity
  - 3-128 alphanumeric characters
  - must be unique in the resource group
- KEY_VAULT_NAME
  - 3-24 alphanumeric characters
  - must begin with a letter
  - must be globally unique

## resource group
```sh
az group create -n $RESOURCE_GROUP --location westus2
```

## Managed identity
Create the identity:
```sh
az identity create \
    -n $MANAGED_IDENTITY_NAME \
    -g $RESOURCE_GROUP \
    -l westus2
```

## Virtual machines
With system-assigned identity:
```sh
az vm create \
    -n $VM_NAME_SYSTEM_ASSIGNED \
    -g $RESOURCE_GROUP \
    --image UbuntuLTS \
    --assign-identity \
    --size Standard_DS1_v2 \
    -l westus2 \
    --generate-ssh-keys
```

With user-assigned identity:
```sh
az vm create \
    -n $VM_NAME_USER_ASSIGNED \
    -g $RESOURCE_GROUP \
    --image UbuntuLTS \
    --assign-identity $(az identity show -g $RESOURCE_GROUP -n $MANAGED_IDENTITY_NAME -o tsv --query id) \
    --size Standard_DS1_v2 \
    -l westus2 \
    --generate-ssh-keys
```

## Key Vault:
```sh
az keyvault create -g $RESOURCE_GROUP -n $KEY_VAULT_NAME --sku standard
```

Allow the VM with system-assigned identity to access the Key Vault's secrets:
```sh
az keyvault set-policy -n $KEY_VAULT_NAME \
    --object-id $(az vm show -n $VM_NAME_SYSTEM_ASSIGNED -g $RESOURCE_GROUP --query identity.principalId -o tsv) \
    --secret-permissions set delete
```

Do the same for the user-assigned identity:
```sh
az keyvault set-policy -n $KEY_VAULT_NAME \
    --object-id $(az identity show -g $RESOURCE_GROUP -n $MANAGED_IDENTITY_NAME --query principalId -o tsv) \
    --secret-permissions set delete
```

# Install dependencies

## gather VM ids
```sh
export VM_ID_SYSTEM_ASSIGNED=$(az vm show -g $RESOURCE_GROUP -n $VM_NAME_SYSTEM_ASSIGNED -o tsv --query id) \
       VM_ID_USER_ASSIGNED=$(az vm show -g $RESOURCE_GROUP -n $VM_NAME_USER_ASSIGNED -o tsv --query id) && \
export VM_IDS="$VM_ID_SYSTEM_ASSIGNED $VM_ID_USER_ASSIGNED"
```

### Build the webapp
```
```

```
cd azure-sdk-for-js\sdk\identity\identity\test\manual-integration\webjobs\App_Data
```

Install the requirements:
```
node install
```

Build the job:
```
tsc -p .
```


## install prerequisites
```sh
echo -e `az vm run-command invoke \
    --ids $VM_IDS \
    --command-id RunShellScript \
    --scripts "sudo apt update && sudo apt install typescript \
               git clone https://github.com/azure/azure-sdk-for-js --single-branch --branch master --depth 1 && \
               cd azure-sdk-for-js/sdk/identity/identity/test/manual-integration/AzureVM && \
               node install && \
               tsc -p .`
```

# Run tests
Do this for each VM, that is to say, once passing `--ids $VM_ID_SYSTEM_ASSIGNED` and again
passing `--ids $VM_ID_USER_ASSIGNED`:

## Node
```sh
echo -e `az vm run-command invoke \
    --ids $VM_ID_SYSTEM_ASSIGNED \
    --command-id RunShellScript \
    --scripts "cd azure-sdk-for-js/sdk/identity/identity/test/manual-integration/AzureVM && \
               export AZURE_IDENTITY_TEST_VAULT_URL=https://$KEY_VAULT_NAME.vault.azure.net && \
               python2 -m pytest -v --log-level=DEBUG"`
```

Locally run:

```
az keyvault secret show -n "secret-name" --vault-name "$($KEY_VAULT_NAME)"
```

# Delete Azure resources
```sh
az group delete -n $RESOURCE_GROUP -y --no-wait
```
