"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
exports.command = "receive";
exports.describe = "Sends messages to an eventhub.";
exports.builder = {
    p: {
        alias: "partitions",
        describe: "Comma seperated partition IDs.",
        default: "0",
        string: true,
        coerce: ((arg) => {
            if (typeof arg === "string")
                return arg.split(",").map((x) => { return x.trim(); });
            else
                return arg;
        })
    },
    g: {
        alias: "consumer",
        describe: "Consumer group name",
        default: "$default",
        string: true
    },
    o: {
        alias: "offset",
        describe: "Starting offset",
        default: "-1",
        string: true
    },
    f: {
        alias: "full-event-data",
        describe: "Display the complete EventData object.",
        default: false,
        boolean: true
    }
};
function validateArgs(argv) {
    if (!argv) {
        throw new Error(`argv cannot be null or undefined.`);
    }
    if (!argv.connStr && (!argv.key || !argv.keyName || !argv.address)) {
        throw new Error(`Either provide --conn-str OR (--address "sb://{yournamespace}.servicebus.windows.net" --key-name "<shared-access-key-name>" --key "<shared-access-key-value>")`);
    }
}
async function handler(argv) {
    try {
        validateArgs(argv);
        let partitionIds = argv.partitions;
        const consumerGroup = argv.consumer;
        const offset = argv.offset;
        const duration = argv.duration;
        let client;
        let connectionString = argv.connStr;
        if (!connectionString) {
            let address = argv.address;
            if (!address.endsWith("/"))
                address += "/";
            if (!address.startsWith("sb://"))
                address = "sb://" + address;
            connectionString = `Endpoint=${address};SharedAccessKeyName=${argv.keyName};SharedAccessKey=${argv.key}`;
        }
        client = lib_1.EventHubClient.createFromConnectionString(connectionString, argv.hub);
        if (!partitionIds) {
            partitionIds = await client.getPartitionIds();
        }
        console.log("PartitionIds in the eventhub '%s' are: ", argv.hub, partitionIds);
        if (duration) {
            console.log(">>>>>>>>>>>> Performance benchmark mode. <<<<<<<<<<<<<<<<");
            console.log("Will be receiving messages only from partition: '0'.");
            let receiver = await client.createReceiver("0", { consumerGroup: consumerGroup, eventPosition: lib_1.EventPosition.fromOffset(offset, true) });
            console.log(`Created Receiver: "${receiver.name}" for partition: "0" in consumer group: "${consumerGroup}" in event hub "${argv.hub}".`);
            let datas = await receiver.receive(500000, duration);
            console.log(`Received ${datas.length} messages in ${duration} seconds @ ${Math.floor(datas.length / duration)} messages/second.`);
        }
        else {
            for (let id of partitionIds) {
                let receiver = await client.createReceiver(id, { consumerGroup: consumerGroup, eventPosition: lib_1.EventPosition.fromOffset(offset, true) });
                console.log(`Created Receiver: "${receiver.name}" for partition: "${id}" in consumer group: "${consumerGroup}" in event hub "${argv.hub}".`);
                receiver.on("message", (m) => {
                    if (m.body) {
                        console.log("----------------------------------------------------------");
                        console.log("[Receiver - %s]", receiver.name);
                        console.log("EnqueuedTime - %s", m.enqueuedTimeUtc.toString());
                        console.log("Received message body - ", m.body.toString());
                    }
                    if (argv.fullEventData) {
                        console.log("Corresponding EventData object: %o", m);
                    }
                });
                console.log(`Attached message handler for receiver - "${receiver.name}"`);
            }
        }
    }
    catch (err) {
        return Promise.reject(err);
    }
}
exports.handler = handler;
