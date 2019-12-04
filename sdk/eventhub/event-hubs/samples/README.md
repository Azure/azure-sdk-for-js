## Getting started with samples ##

The samples in this folder are for version 5.0.0 and above of this library. If you are using version 2.1.0 or lower, then please use [samples for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples) instead

## Install the library

Run the below in your samples folder to install the npm package for Event Hubs library.
```bash
npm install
```

## Get connection string & Event Hubs name
- In the [Azure Portal](https://portal.azure.com), go to **Dashboard > Event Hubs > _your-eventhubs-namespace_**.
- If you don't have an Event Hubs resource you can create one using the Azure portal:
  - [Azure Event Hubs - NodeJS DOCS](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-node-get-started-send).
  - [Azure IoT Hubs - NodeJS DOCS](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-module-twin-getstarted).
- Note the "Primary Connection String" of **RootManageSharedAccessKey** at **Shared access policies** under **Settings** tab.
- Find the "Event Hubs" tab right under "Entities" at **_your-eventhubs-namespace_**, create a Event Hub and note down its name.
> _Note : **RootManageSharedAccessKey** is automatically created for the namespace and has permissions for the entire namespace. If you want to use restricted access, refer [Shared Access Signatures](https://docs.microsoft.com/en-us/rest/api/eventhub/generate-sas-token), create the Access Keys exclusive to the specific Event Hubs._

Before running a sample, update it with the connection string and the Event Hub name you have noted above.

## Running samples

1. Copy this folder to your machine.
2. Install dependencies for the samples project.
  
    ```bash
    npm install
    ```

3. Rename the `sample.env` file to `.env`
4. Open the `.env` file in a text editor and fill in values related to the 
   sample you'd like to run.
5. Run the samples using ts-node:

   For example, to run the `sendEvents.ts` sample:

   ```bash
   npx ts-node sendEvents.ts
   ```

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-hubs%2Fsamples%2FREADME.png)
