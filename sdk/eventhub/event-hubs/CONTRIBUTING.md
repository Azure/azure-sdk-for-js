# Contributing

For details on developer inner-loop workflow and contributing guide see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md)

## Contributing Code
To contribute code you need to issue a Pull Request against the develop branch. 




## Building the library
- Install typescript, ts-node globally (optional, but very useful)
```
npm i -g typescript
npm i -g ts-node
```
- Clone the repo, cd to the sub folder for event hubs and install the dependencies
```
git clone https://github.com/azure/azure-sdk-for-js.git
cd azure-sdk-for-js/sdk/eventhub/event-hubs
npm install
```
- Build the project
```
npm run build
```

## Run/Debug tests

If you want to run or debug tests in this project, please see our [Test README](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/testhub/README.md).

## AMQP Dependencies ##
The Event Hubs library depends on the [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving events over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.
