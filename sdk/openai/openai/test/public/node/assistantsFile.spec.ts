// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { assert, describe, beforeEach, it } from "vitest";
import { type OpenAI, toFile } from "openai";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import { APIVersion } from "../../utils/utils.js";

describe("Assistants", () => {
  matrix([[APIVersion.Preview]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: OpenAI;

      beforeEach(async () => {
        client = createClientsAndDeployments(apiVersion, { assistants: "true" })
          .clientsAndDeployments[0].client;
      });

      describe("all CRUD APIs", function () {
        it("uploads, gets, and lists a file assistant", async () => {
          const filename = "sample_file_for_upload.json";
          const text =
            "The word 'apple' uses the code 442345, while the word 'banana' uses the code 673457.";
          const file = await toFile(Buffer.from(text), filename);
          const uploadedFile = await client.files.create({
            file,
            purpose: "assistants",
          });
          assert.isNotNull(uploadedFile.id);
          assert.equal(uploadedFile.filename, filename);
          assert.equal(uploadedFile.bytes, file.size);

          const fileList = await client.files.list({ limit: 5 });
          assert.isNotEmpty(fileList.data);
          assert.isNotNull(fileList.data[0].id);

          const fileDeleted = await client.files.del(uploadedFile.id);
          assert.isTrue(fileDeleted.deleted);
          assert.equal(fileDeleted.id, uploadedFile.id);
        });
      });
    });
  });
});
