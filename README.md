#Azure Event Hub Client for Node.js  

[![NPM Badge](https://badge.fury.io/js/azure-event-hubs.svg)](https://www.npmjs.com/package/azure-event-hubs)

The Node version is split into two pieces, both under the `[root]/node` directory. The `send_receive` directory contains the `azure-event-hubs` npm, with the ability to create an `EventHubClient` and `Sender` and `Receiver` from that. The `event_processor_host` directory (TBD) contains code to mimic and interoperate with the .NET `EventProcessorHost` class, managing receivers for each partition via blob leases and allowing checkpointing of offsets for easy restarts.

Please see the `README.md` in each directory for usage and additional details - they are managed there to ensure appropriate documentation in the npm releases. 
