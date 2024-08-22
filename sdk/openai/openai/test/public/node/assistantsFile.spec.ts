// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils-vitest";
import { assert, describe, beforeEach, it } from "vitest";
import OpenAI, { AzureOpenAI, toFile } from "openai";
import { createClient } from "../utils/createClient.js";
import { APIVersion } from "../utils/utils.js";

describe("OpenAIAssistants", () => {
  matrix([[APIVersion.Preview]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;

      beforeEach(async function () {
        client = createClient(apiVersion, "vision");
      });

      describe("all CRUD APIs", function () {
        it("uploads, gets, and lists a file", async function () {
          const filename = "sample_file_for_upload.jsonl";
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

          const fileList = await client.files.list();
          assert.isNotEmpty(fileList.data);
          assert.isNotNull(fileList.data[0].id);
        });
      });
    });
  });
});
