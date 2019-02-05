## Building the library
- Clone the repo and cd to the repo directory
```
git clone https://github.com/azure/azure-service-bus-node.git
cd azure-service-bus-node
```
- Install typescript, ts-node globally (optional, but very useful)
```
npm i -g typescript
npm i -g ts-node
```
- NPM install from the root of the package
```
npm i
```
- Build the project
```
npm run build
```

## Run/Debug tests 

If you want to run or debug tests in this project, please see our [Test README](https://github.com/Azure/azure-service-bus-node/blob/master/test/README.md).

## AMQP Dependencies ##
It depends on [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving messages over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.
