// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it } from "vitest";
import OpenAI, { AzureOpenAI, toFile } from "openai";
import { createClient } from "../utils/createClient.js";
import {
  APIVersion,
  DeploymentInfo,
  getDeployments,
  maxRetriesOption,
  withDeployments,
} from "../utils/utils.js";
import { FileObject } from "openai/resources/files.mjs";
import { assertBatch } from "../utils/asserts.js";

describe("OpenAIAssistants", () => {
  matrix([[APIVersion.Preview]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;
      let file: FileObject;
      let deployments: DeploymentInfo[] = [];

      beforeEach(async function () {
        client = createClient(apiVersion, "completions", maxRetriesOption);
        deployments = await getDeployments("vision");
      });

      describe("all CRUD APIs", function () {
        async function createBatchFile(deploymentName: string) {
          const inputObject = `{ "custom_id": "request-1", "method": "POST", "url": "/v1/chat/completions", "body": { "model": "${deploymentName}", "messages": [{ "role": "system", "content": "You are a helpful assistant." }, { "role": "user", "content": "What is 2+2?" }] } }`;
          file = await client.files.create({
            file: await toFile(Buffer.from(inputObject), "batch.jsonl"),
            purpose: "batch",
          });
          while (file.status !== "processed") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            file = await client.files.retrieve(file.id);
          }
          return file;
        }

        it("CRUD operation for batch", async function () {
          await withDeployments(
            deployments,
            async (deploymentName) => {
              file = await createBatchFile(deploymentName);
              // Create a batch file
              const batch = await client.batches.create({
                endpoint: "/v1/chat/completions",
                input_file_id: file.id,
                completion_window: "24h",
              });
              assertBatch(batch);

              // Retrieve batch
              const retrievedBatch = await client.batches.retrieve(batch.id);
              assertBatch(retrievedBatch);

              await client.files.del(file.id);
              return client.batches.cancel(batch.id);
            },
            (batch) => {
              assertBatch(batch);
            },
          );
        });

        it("list operation for batch", async function () {
          const listedBatches = await client.batches.list();
          for await (const listedBatch of listedBatches) {
            assertBatch(listedBatch);
          }
        });
      });
    });
  });
});
