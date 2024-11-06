// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Azure Batch quickstart sample
 */

import createClient, {
  BatchClient,
  CreateJobParameters,
  CreatePoolParameters,
  CreateTaskParameters,
  isUnexpected,
  paginate,
} from "@azure-rest/batch";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from "dotenv";
dotenv.config();

const batchAccountEndpoint = process.env["BATCH_ACCOUNT_ENDPOINT"] || "<batch account endpoint>";
const poolName = "samplepool";
const jobId = "samplejob2";

async function main() {
  const credentials = new DefaultAzureCredential();
  const client = createClient(batchAccountEndpoint, credentials);

  await createPool(client);

  await createJob(client);

  await submitTasks(client);

  await listTasks(client);

  await waitForTasks(client);

  await cleanup(client);
}

async function createPool(client: BatchClient) {
  const poolParams: CreatePoolParameters = {
    body: {
      id: poolName,
      vmSize: "Standard_D1_v2",
      virtualMachineConfiguration: {
        nodeAgentSKUId: "batch.node.windows amd64",
        imageReference: {
          publisher: "microsoftwindowsserver",
          offer: "windowsserver",
          sku: "2022-datacenter",
        },
      },
      networkConfiguration: {
        enableAcceleratedNetworking: true,
      },
      targetDedicatedNodes: 1,
    },
    contentType: "application/json; odata=minimalmetadata",
  };
  const result = await client.path("/pools").post(poolParams);
  if (isUnexpected(result)) {
    console.log(result.body);
    throw new Error(`Failed to create pool: ${result.body.message}`);
  }
  console.log(`Pool ${poolName} created`);
}

async function createJob(client: BatchClient) {
  const jobAddParam: CreateJobParameters = {
    body: {
      id: jobId,
      poolInfo: { poolId: poolName },
    },
    contentType: "application/json; odata=minimalmetadata",
  };

  const result = await client.path("/jobs").post(jobAddParam);
  if (isUnexpected(result)) {
    throw new Error(`Failed to create job: ${result.body.message}`);
  }
  console.log(`Job ${jobId} created`);
}

async function submitTasks(client: BatchClient) {
  for (let i = 1; i < 6; i++) {
    const addTaskParam: CreateTaskParameters = {
      body: {
        id: `task${i}`,
        commandLine: `cmd /c echo task-${i} > result.txt`,
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const addTaskResult = await client.path("/jobs/{jobId}/tasks", jobId).post(addTaskParam);
    if (isUnexpected(addTaskResult)) {
      throw new Error(`Failed to add task ${i}: ${addTaskResult.body.message}`);
    }
    console.log(`Task ${i} added`);
  }
}

async function listTasks(client: BatchClient) {
  const result = await client
    .path("/jobs/{jobId}/tasks", jobId)
    .get({ queryParameters: { maxresults: 1 } });
  if (isUnexpected(result)) {
    throw new Error(`Failed to list tasks: ${result.body.message}`);
  }
  console.log("Tasks first result:", result.body.value?.length);
  const taskAsyncIterator = paginate(client, result);

  for await (const task of taskAsyncIterator) {
    console.log(`- ${task.id}, state: ${task.state}`);
  }
}

async function waitForTasks(client: BatchClient) {
  console.log("Waiting for tasks to complete");
  while (true) {
    const result = await client
      .path("/jobs/{jobId}/tasks", jobId)
      .get({ queryParameters: { maxresults: 1 } });
    if (isUnexpected(result)) {
      throw new Error(`Failed to list tasks: ${result.body.message}`);
    }
    const taskAsyncIterator = paginate(client, result);
    let isAllCompleted = true;
    for await (const task of taskAsyncIterator) {
      if (task.state !== "completed") {
        console.log(`- ${task.id}, state: ${task.state}`);
        isAllCompleted = false;
        break;
      }
    }
    if (isAllCompleted) {
      console.log("All tasks completed");
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

async function cleanup(client: BatchClient) {
  const result = await client.path("/pools/{poolId}", poolName).delete();
  if (isUnexpected(result)) {
    throw new Error(`Failed to delete pool: ${result.body.message}`);
  }
  console.log(`Pool ${poolName} deleted`);
}

main().catch(console.error);
