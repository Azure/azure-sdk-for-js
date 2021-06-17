import Spark, { getLongRunningPoller } from "../src";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "dotenv";

config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  const client = Spark(endpoint, new DefaultAzureCredential());

  // Create new spark batch job.
  const createJobOperation = await client
    .path("/batches")
    .post({ body: { name: "testBatch", file: "test.txt" } });

  // We can use the helper poller provided with the library to poll
  // periodically and wait until the operation is done.
  const poller = getLongRunningPoller(client, createJobOperation);

  // Wait until the create operation is finished
  const createResult = await poller.pollUntilDone();

  console.log(createResult);

  const result = await client.path("/sessions").get();

  for (const batch of result.body.sessions ?? []) {
    console.log(batch);
  }
}

main().catch(console.error);
