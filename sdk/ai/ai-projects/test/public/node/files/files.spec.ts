// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../../src/index.js";
import type { OpenAI } from "openai/client";

const isLive = isLiveMode();

describe("files - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let openai: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    openai = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  async function uploadFileAndWait(): Promise<Awaited<ReturnType<typeof openai.files.retrieve>>> {
    const dataUrl = new URL("./data/training_set.jsonl", import.meta.url);
    const fs = await import("fs");
    console.log(`Uploading file`);
    const created = await openai.files.create({
      file: fs.createReadStream(dataUrl),
      purpose: "fine-tune",
    });

    console.log(`Uploaded file with ID: ${created.id}`);

    return openai.files.retrieve(created.id);
  }

  it.skipIf(!isLive)("should upload, get, read content, list, and delete a file", async () => {
    // Create (upload) and wait until processed
    console.log(`Starting file upload.`);
    const uploadedFile = await uploadFileAndWait();
    assert.isNotNull(uploadedFile);
    assert.isString(uploadedFile.id);
    console.log(`Uploaded and processed file ID: ${uploadedFile.id}`);

    // Retrieve metadata
    console.log(`Retrieving metadata for file ID: ${uploadedFile.id}`);
    const got = await openai.files.retrieve(uploadedFile.id);
    assert.isNotNull(got);
    assert.equal(got.id, uploadedFile.id);
    console.log(`Retrieved metadata for file ID: ${got.id}`);

    // Retrieve content
    console.log(`Retrieving content for file ID: ${uploadedFile.id}`);
    const contentResponse = await openai.files.content(uploadedFile.id);
    const buf = Buffer.from(await contentResponse.arrayBuffer());
    const text = buf.toString("utf-8");
    console.log(`Retrieved file content (first 200 chars):\n${text.slice(0, 200)}...`);
    assert.include(text, `"messages":`);
    assert.include(text, `"system"`);
    assert.include(text, `"assistant"`);

    // List
    console.log(`Listing files to verify presence of file ID: ${uploadedFile.id}`);
    const listed = await openai.files.list();
    assert.isArray(listed.data);
    const found = listed.data.find((f) => f.id === uploadedFile.id);
    assert.isNotNull(found);
    console.log(`Verified uploaded file ID ${uploadedFile.id} appears in list.`);

    // Delete
    console.log(`Deleting file ID: ${uploadedFile.id}`);
    const deleted = await openai.files.delete(uploadedFile.id);
    assert.isTrue(deleted?.deleted === true, "expected file to be deleted");
    console.log(`Deleted file with ID: ${uploadedFile.id}`);
  });
});
