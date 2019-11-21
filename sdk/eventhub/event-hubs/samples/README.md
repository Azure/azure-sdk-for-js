## Getting started with samples ##

The samples in this folder are for version 5.0.0 and above of this library. If you are using version 2.1.0 or lower, then please use [samples for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples) instead

## Install the library

Run the below in your samples folder to install the npm package for Event Hubs library.
```bash
npm install @azure/event-hubs@next
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

## Running a sample

Start by copying the sample into a npm project.
```bash
mkdir event-hubs-samples
cd event-hubs-samples
npm init
# copy sample into this directory
```

If you don't have Typescript installed, then use `npm` to install it first.
```bash
npm install -g typescript
```

Install the `@azure/event-hubs@next` package into your project, as well as any other dependencies you might need.
```bash
npm install --save @azure/event-hubs@next
```

One way to run Typescript samples is to use `ts-node`. To install `ts-node`, run the below in your sample folder
```bash
npm install ts-node
```

Use `ts-node` to run the sample copied previously.
```bash
ts-node sample.ts
```


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-hubs%2Fsamples%2FREADME.png)
