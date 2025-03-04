// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it } from "vitest";
import { type OpenAI, toFile } from "openai";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import { APIVersion, withDeployments } from "../../utils/utils.js";
import { assertBatch, assertNonEmptyArray } from "../../utils/asserts.js";
import { delay } from "@azure/core-util";
import type { FileObject } from "openai/resources/index";
import type { ClientsAndDeploymentsInfo } from "../../utils/types.js";

describe("Batches", () => {
  matrix([[APIVersion.Preview]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientAndDeployments: ClientsAndDeploymentsInfo;

      beforeEach(async () => {
        clientAndDeployments = createClientsAndDeployments(
          apiVersion,
          {},
          { sku: { name: "GlobalBatch" } },
        );
      });

      describe("batches.create", function () {
        async function createBatchFile(
          client: OpenAI,
          deploymentName: string,
        ): Promise<FileObject> {
          const inputObject = `{ "custom_id": "request-1", "method": "POST", "url": "/v1/chat/completions", "body": { "model": "${deploymentName}", "messages": [{ "role": "system", "content": "You are a helpful assistant." }, { "role": "user", "content": "What is 2+2?" }] } }`;
          const file = await client.files.create({
            file: await toFile(Buffer.from(inputObject), "batch.jsonl"),
            purpose: "batch",
          });
          // TODO: Remove delay once batch no longer returns error for pending file
          await delay(5000);
          return file;
        }

        it("CRUD operations", async () => {
          await withDeployments(
            clientAndDeployments,
            async (client, deploymentName) => {
              const batches = [];
              const file = await createBatchFile(client, deploymentName);
              // Create a batch file
              const batch = await client.batches.create({
                endpoint: "/v1/chat/completions",
                input_file_id: file.id,
                completion_window: "24h",
              });
              batches.push(batch);
              await client.files.del(file.id);

              const listedBatches = await client.batches.list({ limit: 5 });
              for (const listedBatch of listedBatches.data) {
                assertBatch(listedBatch);
              }

              // Retrieve batch
              const retrievedBatch = await client.batches.retrieve(batch.id);
              batches.push(retrievedBatch);
              // Can only cancel batch if it is in one of the following states
              if (["validating", "in_progress", "finalizing"].includes(batch.status)) {
                const cancelledBatch = await client.batches.cancel(batch.id);
                batches.push(cancelledBatch);
              }
              return batches;
            },
            async (batches) => {
              assertNonEmptyArray(batches, assertBatch);
            },
          );
        });
      });
    });
  });
});
