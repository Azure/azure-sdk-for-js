## Getting started with samples ##

## Building the library
- Clone the repo and cd to the repo directory
```bash
git clone https://github.com/Azure/azure-event-hubs-node.git
cd client
```
- Install typescript, ts-node globally (required for running the samples)
```bash
npm i -g typescript
npm i -g ts-node
```
- NPM install from the root of the package
```bash
npm i
```
- Build the project
```bash
npm run build
```

## Before executing a sample
- Go to the [Azure Portal](https://portal.azure.com).
- Here are the docs which would help you create a event hubs and eventhub/iothub resources in the portal : [Azure Event Hubs - NodeJS DOCS](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-node-get-started-send).
- In the portal, go to **Dashboard > Event Hubs > _your-eventhubs-namespace_**.
- Note down the "Primary Connection String" of **RootManageSharedAccessKey** at **Shared access policies** in the **Settings** section.
- Note down the name of the event hub that you created
> _Note : **RootManageSharedAccessKey** is automatically created for the namespace and has permissions for the entire namespace. If you want to use restricted access, refer [Shared Access Signatures](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-sas), create the Access Keys exclusive to the specific created Queue/Topic._

Before running a sample, update it with the connection string and the hub name you have noted down above.
- to load environment variables from an `.env` file, please refer to [NPM dotenv package](https://www.npmjs.com/package/dotenv) for more details

## Executing a sample
- The samples are to be run using ts-node, after changing your current working directory to the `examples` folder.

```bash
cd examples
ts-node <sample>.ts
```
- For debugging:
[VS Code - Debugging](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) -  Update the `Client Example` configuration in `launch.json` by changing the `program` attrbute to point to the sample you want to debug.
```bash
"program": "${workspaceFolder}/examples/<sample>.ts"
```