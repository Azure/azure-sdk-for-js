// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates example of bulk stream operations.
 */

import * as dotenv from "dotenv";
dotenv.config();

import { handleError, finish, logStep } from "./Shared/handleError";
import type {
    OperationInput,
} from "@azure/cosmos";
import {
    CosmosClient
} from "@azure/cosmos";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";


async function run(): Promise<void> {
    const containerId = "bulkStreamerContainer";
    const client = new CosmosClient({
        key: key,
        endpoint: endpoint,
    });
    const { database } = await client.databases.create({ id: ("bulkStreamer db") });
    logStep(`Creating multi-partition container '${containerId}' with partition key /key`);
    const { container } = await database.containers.create({
        id: containerId,
        partitionKey: {
            paths: ["/key"],
            version: 2,
        },
        throughput: 1000,
    });

    logStep("Preparing 10 'Create' operations")
    const createOperations: OperationInput[] = Array.from({ length: 10 }, (_, index) => ({
        operationType: "Create",
        resourceBody: {
            id: `doc${index + 1}`,
            name: `sample${index + 1}`,
            key: `${index + 1}`,
        },
    }));

    logStep("Preparing a 'Read' operation for 'doc1'")
    const readOperation: OperationInput = { operationType: "Read", id: "doc1", partitionKey: "1" };

    logStep(`Getting a Bulk Streamer instance`);
    const bulkStreamer = container.items.getBulkStreamer();

    // an operation or a list of operations could be provided as input to addOperations
    logStep("Adding the list of 'Create' operations to the Bulk Streamer");
    bulkStreamer.addOperations(createOperations);
    logStep("Adding a single 'Read' operation to the Bulk Streamer...")
    bulkStreamer.addOperations(readOperation);

    logStep("Ending the bulk stream");
    const response = await bulkStreamer.endStream();
    console.log("Bulk Response: ", response);

    await finish();
}

run().catch(handleError);
