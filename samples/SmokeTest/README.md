# Azure Smoke Tests for JavaScript
This sample code is a smoke test to ensure that Azure Preview for JS work while loaded into the same process.

Libraries tested:
* keyvault-secrets
* identity
* storage-blob
* event-hubs
* cosmos _(Last version released)_

## Getting started
### Setup Azure resources
For this sample, it is necessary to create/have the following resources in the [Azure Portal](https://portal.azure.com/):
* **App registration**: Register a new app or use an existing one.
  * Under _Certificates & secrets_ create a new **client secret** and store the value in a safe place.
* **Key Vaults**: Create a new Key Vault resource or use an existing one.
  * Under _Access policies_, add the app registrated in the previous step.
* **Storage acounts**: Create a container in a new or existing storage account. The container in this sample is named "mycontainer", if you want to use other name you can change the value in `BlobStorage.ts` file:
`const containerName = "mycontainer";`
* **Event Hubs**: Create an event hub inside a new or existing Event Hubs Namespace. The container in this sample is named "myeventhub", if you want to use other name you can change the value in `EventHubsTest.ts` file: `let eventHubName = "myeventhub";`
* **Azure Cosmos DB**: Create a new account or use an existing one.

### Azure credentials
The following environment variables are needed:
* From **App Registration**, in the _Overview_ section:
    * AZURE_TENANT_ID: The directory tentant ID.
    * AZURE_CLIENT_ID: The application ID.
    * AZURE_CLIENT_SECRET: The client secret stored previusly when creating the _client secret_.

* From **Key Vault**, in the _Overview_ section:
  * AZURE_PROJECT_URL: The DNS Name

* From **Event Hubs**, in _Shared access policies_ section:
  * EVENT_HUBS_CONNECTION_STRING: Connection string from a policy

* From **Storage Account**, in the _Access Keys_ section:
  * STORAGE_ACCOUNT_NAME.
  * STORAGE_ACCOUNT_KEY.

* From **Azure Cosmos DB**, in the _Keys_ section, select the _Read-Write Keys_ tab:
  * COSMOS_ENDPOINT: URI.
  * COSMOS_KEY: Primary or secondary key.

```javascript
//Bash code to create the environment variables
export AZURE_CLIENT_ID=""
export AZURE_CLIENT_SECRET=""
export AZURE_TENANT_ID=""
export EVENT_HUBS_CONNECTION_STRING=""
export AZURE_PROJECT_URL=""
export STORAGE_ACCOUNT_NAME=""
export STORAGE_ACCOUNT_KEY=""
export COSMOS_ENDPOINT=""
export COSMOS_KEY=""
```

#### Alternative to environment variables:
It is possible to write the credentials in the code, the only environment variables required are the App registration ones.

```javascript
const masterKey = process.env["COSMOS_KEY"] || "<YourKey>";
```

### Running the console app
[NodeJS](https://nodejs.org/en/) 10.16.0 LTS and [Typescript](https://www.typescriptlang.org/#download-links) version 3.5.2 were used to run this sample.
 
In the \SmokeTest\ directory:
1. Compile TS code
```
tsc
```

2. Run app.js with node
```
node app.js
```
## Key Concepts

## Examples

## Troubleshooting
### Async-lock
Set the `esModuleInterop` property to true in the tsconfig.json file.

### Credentials
Be sure to set the environment variables and credentials required before running the sample.

## Next steps
Check the [Azure SDK for JS Repository](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk) for more samples inside the sdk folder.
## Contributing
This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

If you'd like to contribute to this library, please read the contributing guide to learn more about how to build and test the code.

This project has adopted the Microsoft Open Source Code of Conduct. For more information see the Code of Conduct FAQ or contact opencode@microsoft.com with any additional questions or comments.