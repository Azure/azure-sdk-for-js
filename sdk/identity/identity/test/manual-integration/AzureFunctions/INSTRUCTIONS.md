# Testing Identity in Azure Functions

## Configuration

Before you begin, you must have the following:

- An Azure account with an active subscription
- The Azure Functions Core Tools version 3.x
- Node.js, Active LTS version
- One of the following tools for creating Azure resources:
  - Azure CLI version 2.4 or later
  - Azure PowerShell version 5.0 or later

## Prerequisites

Verify your prerequisites, which depend on whether you are using Azure CLI or Azure PowerShell for creating Azure resources

For Azure CLI,

1. In a terminal or command window, run `func --version` to check that the Azure Functions Core Tools are version 3.x.
2. Run `az --version` to check that the Azure CLI version is 2.4 or later.
3. Run `az login` to sign in to Azure and verify an active subscription.

For Azure PowerShell,

1. In a terminal or command window, run `func --version` to check that the Azure Functions Core Tools are version 3.x.
2. Run `(Get-Module -ListAvailable Az).Version` and verify version 5.0 or later.
3. Run `Connect-AzAccount` to sign in to Azure and verify an active subscription.

### Run Locally

1. Run the following commands in your console from the root folder `IdentityTest`

```
cd IdentityTest
npm install
npm start
```

Towards the end of the output, you'll see this:

```
Functions:

        KeyvaultAuthentication: [GET] http://localhost:7071/api/KeyvaultAuthentication
```

Note:
If KeyvaultAuthentication doesn't appear as shown above, you likely started the host from outside the root folder of the project. In that case, use Ctrl+C to stop the host, navigate to the project's root folder, and run the previous command again.

2. Copy the URL of your KeyvaultAuthentication function from this output to a browser and append the query string `?name=<your-name>`, making the full URL like

```
http://localhost:7071/api/KeyvaultAuthentication
```

The browser should display a message like:

```
Successfully authenticated with keyvault
```

The terminal in which you started your project also shows log output as you make requests.

3. When you're ready, use Ctrl+C and choose y to stop the functions host.

## Deploy to Azure

1. Clone the repository azure-sdk-for-js

2. `cd sdk\identity\identity\test\manual-integration\AzureFunctions`

3. Follow the instructions here to create a Resource group and deploy it:

```
az group create --name <RESOURCE_GROUP_NAME> --location <resource_location>
az deployment group create --resource-group <RESOURCE_GROUP_NAME> --template-file ./arm-template.json
```

4. Run the following commands in your console from the root folder `IdentityTest`

   ```
   cd IdentityTest
   npm install
   npm run build
   ```

5. Publish the function app

   ```
   func azure functionapp publish <FUNCTION_APP_NAME> --typescript
   ```

   The `<FUNCTION_APP_NAME>` will basically be something like - `<RESOURCE_GROUP_NAME>fnapp`

   Take note of the invoke url that shows up on console.

## Run the azure-identity Tests on the Azure Functions

Go to the invoke url which will be in the following format -

```
https://<func app name>.azurewebsites.net/api/KeyvaultAuthentication
```

It will display the message -

```
Successfully authenticated with keyvault
```

## Clean up resources

Use the following command to delete the resource group and all its contained resources to avoid incurring further costs

`az group delete --name <RESOURCE_GROUP_NAME>`
