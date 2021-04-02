## Getting started with samples

## Install the library

Run the below in your samples folder to install the npm package for Event Processor Host library.

```bash
npm install @azure/event-processor-host
```

## Get connection string & Event Hubs name

- In the [Azure Portal](https://portal.azure.com), go to **Dashboard > Event Hubs > _your-eventhubs-namespace_**.
- If you don't have a Event Hubs resource, then Here are the docs which would help you create a EventHubs/Iothub resources in the portal:
  - [Azure Event Hubs - NodeJS DOCS](https://docs.microsoft.com/azure/event-hubs/event-hubs-node-get-started-send).
  - [Azure IoT Hubs - NodeJS DOCS](https://docs.microsoft.com/azure/iot-hub/iot-hub-node-node-module-twin-getstarted).
- Note down the "Primary Connection String" of **RootManageSharedAccessKey** at **Shared access policies** under **Settings** tab.
- Find the "Event Hubs" tab right under "Entities" at **_your-eventhubs-namespace_**, create a Event Hub and note down its name.
  > _Note : **RootManageSharedAccessKey** is automatically created for the namespace and has permissions for the entire namespace. If you want to use restricted access, refer [Shared Access Signatures](https://docs.microsoft.com/rest/api/eventhub/generate-sas-token), create the Access Keys exclusive to the specific Event Hubs._
- You would also need an Azure Storage Account when working with Event Processor Host. The docs are at
  [Create a storage account](https://docs.microsoft.com/azure/storage/common/storage-quickstart-create-account?tabs=azure-portal). After the storage account is created, find the connection string at **Access keys** tab in the **Settings** section.

Before running a sample, update it with the connection string and the hub name you have noted down above.

## Running a sample

Copy the sample to your samples folder and use `node` to run it.

```bash
node sample.js
```

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-processor-host%2Fsamples%2FREADME.png)
