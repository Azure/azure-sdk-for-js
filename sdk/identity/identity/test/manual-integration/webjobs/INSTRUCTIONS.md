## Instructions

Follow these instructions using PowerShell.

### set environment variables to simplify copy-pasting
- RESOURCE_GROUP
  - name of an Azure resource group
  - must be unique in the Azure subscription
  - e.g. 'pod-identity-test'
- KEY_VAULT_NAME
  - 3-24 alphanumeric characters
  - must begin with a letter
  - must be globally unique
- MANAGED_IDENTITY_NAME
  - 3-128 alphanumeric characters
  - must be unique in the resource group
- WEB_APP_NAME
  - 3-24 alphanumeric characters
  - must begin with a letter
- PLAN_NAME
  - name of the app service plan
  - must be unique in the resource group
  - e.g. 'identity-test-app-service-plan'
- PLAN_SKU
  - the type of the plan
  - Choose 'S1', # Allowed values are B1, B2, B3, D1, F1, FREE, P1, P1V2, P2, P2V2, P3, P3V2, S1, S2, S3, SHARED.
- LOCATION
  - location of the resources
  - e.g. "West US 2"
- APP_NAME_SYSTEM_ASSIGNED
  - name of an Azure App Service
  - must be unique in the resource group
  - e.g. 'identity-test-app-system'
- APP_NAME_USER_ASSIGNED
  - name of an Azure App Service
  - must be unique in the resource group
  - e.g. 'identity-test-app-user'

## App Service

Create the app service plan
```
az appservice plan create -n $PLAN_NAME -g $RESOURCE_GROUP -l $LOCATION --sku $PLAN_SKU
```

Create a web app
```
az webapp create -n $APP_NAME_SYSTEM_ASSIGNED -g $RESOURCE_GROUP --plan $PLAN_NAME -r '"node|10.15"'
```

Enable System assigned identity on the web app.
```
az webapp identity assign --name $APP_NAME_SYSTEM_ASSIGNED --resource-group $RESOURCE_GROUP
```

### Resource Group
```sh
az group create -n $RESOURCE_GROUP --location westus2
```

### Managed Identity
Create the managed identity:
```sh
az identity create -g $RESOURCE_GROUP -n $MANAGED_IDENTITY_NAME
```

Save its `clientId`, `id` (ARM URI), and `principalId` (object ID) for later:
```sh
$MANAGED_IDENTITY_PRINCIPAL_ID=az identity show -g $RESOURCE_GROUP -n $MANAGED_IDENTITY_NAME --query principalId -o tsv
```

### Key Vault
Create the Vault:
```sh
az keyvault create -g $RESOURCE_GROUP -n $KEY_VAULT_NAME --sku standard
```

Add an access policy for the managed identity:
```sh
az keyvault set-policy -n $KEY_VAULT_NAME --object-id $MANAGED_IDENTITY_PRINCIPAL_ID --secret-permissions set delete
```

### Web App
```
az webapp config appsettings set -g $RESOURCE_GROUP -n $APP_NAME_SYSTEM_ASSIGNED --settings KEY_VAULT_NAME=$KEY_VAULT_NAME
```

### Build the webapp
```
git clone https://github.com/azure/azure-sdk-for-js --single-branch --branch master --depth 1
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

Zip the App_Data directory, and all its contents, into "AzureTestJob.zip"


### Upload the job
```
$user = az webapp deployment list-publishing-profiles -n $APP_NAME_SYSTEM_ASSIGNED -g $RESOURCE_GROUP `
    --query "[?publishMethod=='MSDeploy'].userName" -o tsv

$pass = az webapp deployment list-publishing-profiles -n $APP_NAME_SYSTEM_ASSIGNED -g $RESOURCE_GROUP `
    --query "[?publishMethod=='MSDeploy'].userPWD" -o tsv

$creds = "$($user):$($pass)"
$encodedCreds = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($creds))
$basicAuthValue = "Basic $encodedCreds"
$Headers = @{
    Authorization = $basicAuthValue
}

Invoke-WebRequest -Uri https://$APP_NAME_SYSTEM_ASSIGNED.scm.azurewebsites.net/api/zipdeploy -Headers $Headers -InFile .\AzureTestJob.zip -ContentType "multipart/form-data" -Method Post

```

### Trigger the job

```
az webapp webjob triggered run -w AzureTestJob -g $RESOURCE_GROUP -n $APP_NAME_SYSTEM_ASSIGNED
```

### Test the job completed successfully

```
az keyvault secret show -n "secret-name" --vault-name "$($KEY_VAULT_NAME)"
```

# Delete Azure resources
After running tests, delete the resources provisioned earlier:
```sh
az group delete -n $RESOURCE_GROUP -y --no-wait
```