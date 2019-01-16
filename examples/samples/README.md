## Getting started with samples ##

## Building the library
- Clone the repo and cd to the repo directory
```bash
git clone https://github.com/azure/azure-service-bus-node.git
cd azure-service-bus-node
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
- Here are the docs which would help you create a service bus resource in the portal : [ServiceBus - NodeJS DOCS](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-nodejs-how-to-use-queues).
- In the portal, go to **Dashboard > Service Bus > _your-servicebus-namespace_**.
- Note down the "Primary Connection String" of **RootManageSharedAccessKey** at **Shared access policies** under **Settings** tab.
- To work with Queues, find the "Queues" tab right under "Entities" at **_your-servicebus-namespace_**, create a Queue and note down its name for the next step.
- To work with Topics, find the "Topics" tab right under "Entities" at **_your-servicebus-namespace_**, create a Topic. Go to **_your-servicebus-namespace_ > _your-topic_**, create subscriptions for the topic. Note down the names of the topic and subscriptions for the next step.
> _Note : **RootManageSharedAccessKey** is automatically created for the namespace and has permissions for the entire namespace. If you want to use restricted access, refer [Shared Access Signatures](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-sas), create the Access Keys exclusive to the specific created Queue/Topic._

Create a `.env` file in the root folder with the following contents. Replace the `<string>` with your corresponding values. (These environment variables will be loaded into `process.env` when running the samples)
```typescript
SERVICEBUS_CONNECTION_STRING=<Primary-Connection-String>
QUEUE_NAME=<Name-of-the-Queue>
TOPIC_NAME=<Name-of-the-Topic>
SUBSCRIPTION_NAME1=<Subscription-1>
SUBSCRIPTION_NAME2=<Subscription-2>
SUBSCRIPTION_NAME3=<Subscription-3>
```

## Executing a sample
- If you've already installed ts-node, you should be able to execute the typescript samples as follows:
```bash
cd examples
ts-node samples\<sample>.ts
```
- For debugging:
[VS Code - Debugging](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) -  Update the `Debug sample` configuration in `launch.json` by changing the `program` attrbute to point to the sample you want to debug.
```bash
"program": "${workspaceFolder}/examples/samples/<sample>.ts"
```