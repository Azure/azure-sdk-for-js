// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createOpenAI } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

const testMode = (process.env.TEST_MODE ?? "playback").toLowerCase();
const isLive = testMode === "live";

describe("files - basic", () => {
  let recorder: Recorder;
  let openai: Awaited<ReturnType<typeof createOpenAI>>;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    openai = await createOpenAI();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  async function uploadFileAndWait(): Promise<Awaited<ReturnType<typeof openai.files.retrieve>>> {
    const dataUrl = new URL("../data/training_set.jsonl", import.meta.url);
    const response = await fetch(dataUrl);
    const fileBlob = await response.blob();

    console.log(`Uploading file`);
    const created = await openai.files.create({
      file: new File([fileBlob], "training_set.jsonl", { type: "application/jsonl" }),
      purpose: "fine-tune",
    });
    console.log(`Uploaded file with ID: ${created.id}`);

    const pollMs = 2000;
    const timeoutMs = 5 * 60 * 1000;
    const start = Date.now();

    while (true) {
      const retrieved = await openai.files.retrieve(created.id);
      const status = (retrieved as any).status;
      console.log(`File ${created.id} current status: ${status}`);

      if (status === "processed") {
        console.log(`File ${created.id} processed successfully.`);
        return retrieved;
      }

      if (status === "failed") {
        throw new Error(
          `File ${created.id} import failed: ${(retrieved as any).status_details || "Unknown reason"}`,
        );
      }

      if (Date.now() - start > timeoutMs) {
        throw new Error(
          `File ${created.id} import did not complete within ${timeoutMs / 1000}s. Last status: ${status}`,
        );
      }

      await new Promise((resolve) => setTimeout(resolve, pollMs));
    }
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
    assert.equal((got as any).status, "processed");
    console.log(`Retrieved metadata for file ID: ${got.id}`);

    // Retrieve content
    console.log(`Retrieving content for file ID: ${uploadedFile.id}`);
    const contentResponse = await openai.files.content(uploadedFile.id);
    const buf = Buffer.from(await (contentResponse as any).arrayBuffer());
    const text = buf.toString("utf-8");
    console.log(`Retrieved file content (first 200 chars):\n${text.slice(0, 200)}...`);
    assert.include(text, `"messages":`);
    assert.include(text, `"system"`);
    assert.include(text, `"assistant"`);

    // List
    console.log(`Listing files to verify presence of file ID: ${uploadedFile.id}`);
    const listed = await openai.files.list();
    assert.isArray(listed.data);
    const found = listed.data.find((f: any) => f.id === uploadedFile.id);
    assert.isNotNull(found);
    console.log(`Verified uploaded file ID ${uploadedFile.id} appears in list.`);

    // Delete
    console.log(`Deleting file ID: ${uploadedFile.id}`);
    const deleted = await openai.files.delete(uploadedFile.id);
    assert.isTrue(deleted?.deleted === true, "expected file to be deleted");
    console.log(`Deleted file with ID: ${uploadedFile.id}`);
  });
});
