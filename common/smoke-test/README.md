# Azure Smoke Test for JavaScript
This sample code is a smoke test to ensure that Azure Preview for JS work while loaded into the same process by performing 2 or more actions with them.

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
## Key concepts


## Examples
All the classes in this sample has a `Run()` method as entry point, and do not depend on each other. 

It is possible to run them individually:
```javascript
import {KeyVaultSecrets} from "./KeyVaultTest";

await KeyVaultSecrets.Run();
```

They can be included in other projects by moving the class in it:
```javascript
import {KeyVaultSecrets} from "./KeyVaultTest";

...

function myTests(){
    console.log("Smoke Test imported from other project");
    await KeyVaultSecrets.Run();
}

myTests();
otherFunction();
...
```

The classes can be used as base code and be changed to satisfied specific needs. For example, the method `EventHubs.SendAndReceiveEvents()` can be change to only send events from an array given from a parameter:
```javascript
    private static async SendEvents(events:string[]){
        const producerOptions = {
            partitionId : EventHubs.partitionId[0]
        }
        const producer = EventHubs.client.createProducer(producerOptions);
        
        events.forEach(async event => {
            await producer.send({ body: event });
        });
    }
```

**Note:** The methods in the classes are not necessary independent on each other, and the order matters. For example, in order to run `BlobStorage.CleanUp();`, the method `BlobStorage.UploadBlob();` must be run before, since in the other way it will fail because there is not going to be a blob to delete.

## Troubleshooting
### Async-lock
Set the `esModuleInterop` property to true in the tsconfig.json file.

### Authentication
Be sure to set the environment variables and credentials required before running the sample.

## Next steps
Check the [Azure SDK for JS Repository](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk) for more samples inside the sdk folder.

## Contributing
If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsamples%2FSmokeTest%2FREADME.png)
