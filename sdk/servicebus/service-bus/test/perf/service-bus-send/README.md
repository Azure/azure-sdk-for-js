# Overview
Measures the maximum throughput of `sender.send()` in package `@azure/service-bus`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=4`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
1. Create a queue inside the namespace.
1. Set env vars `SERVICE_BUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
1. `npm install`
1. `ts-node app.ts [maxInflightMessages] [totalMessages]`
1. Example: `ts-node app.ts 1000 1000000`
