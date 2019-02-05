## Getting started with samples ##

## Installing the library
- Run the below to install the npm package for Azure Service Bus library
```bash
npm install @azure/service-bus@1.0.0-preview.1
```
- Install typescript, ts-node globally (required for running the samples)
```bash
npm i -g typescript
npm i -g ts-node
```

## Before executing a sample
- Go to the [Azure Portal](https://portal.azure.com).
- Here are the docs which would help you create a service bus resource in the portal : [ServiceBus - NodeJS DOCS](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-nodejs-how-to-use-queues).
- In the portal, go to **Dashboard > Service Bus > _your-servicebus-namespace_**.
- Note down the "Primary Connection String" of **RootManageSharedAccessKey** at **Shared access policies** under **Settings** tab.
- To work with Queues, find the "Queues" tab right under "Entities" at **_your-servicebus-namespace_**, create a Queue and note down its name.
- To work with Topics, find the "Topics" tab right under "Entities" at **_your-servicebus-namespace_**, create a Topic. Go to **_your-servicebus-namespace_ > _your-topic_**, create subscriptions for the topic. Note down the names of the topic and subscriptions.
> _Note : **RootManageSharedAccessKey** is automatically created for the namespace and has permissions for the entire namespace. If you want to use restricted access, refer [Shared Access Signatures](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-sas), create the Access Keys exclusive to the specific created Queue/Topic._

Before running a sample, update it with the connection string and the queue/topic/subscription names you have noted down above.

## Executing a sample
- The samples are to be run using ts-node, after changing your current working directory to the `examples` folder.

```bash
cd examples
ts-node samples\<sample>.ts
```
- For debugging:
[VS Code - Debugging](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) -  Update the `Debug sample` configuration in `launch.json` by changing the `program` attrbute to point to the sample you want to debug.
```bash
"program": "${workspaceFolder}/examples/samples/<sample>.ts"
```