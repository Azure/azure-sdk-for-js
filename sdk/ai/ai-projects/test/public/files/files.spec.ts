// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createOpenAI } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createReadStream } from "node:fs";
import { join } from "node:path";

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

  async function uploadFileAndWait(
    filePath: string,
  ): Promise<Awaited<ReturnType<typeof openai.files.retrieve>>> {
    const created = await openai.files.create({
      file: createReadStream(filePath),
      purpose: "fine-tune",
    });

    // Poll until the file is processed (as per sample)
    const pollMs = 2000;
    const timeoutMs = 5 * 60 * 1000;
    const start = Date.now();

    while (true) {
      const retrieved = await openai.files.retrieve(created.id);
      if ((retrieved as any).status === "processed") return retrieved;
      if ((retrieved as any).status === "failed") {
        throw new Error(
          `File ${retrieved.id} import failed: ${(retrieved as any).status_details || "Unknown reason"}`,
        );
      }
      if (Date.now() - start > timeoutMs) {
        throw new Error(
          `File ${retrieved.id} import did not complete within ${timeoutMs / 1000}s. Last status: ${(retrieved as any).status}`,
        );
      }
      await new Promise((resolve) => setTimeout(resolve, pollMs));
    }
  }

  it.skipIf(!isLive)("should upload, get, read content, list, and delete a file", async () => {
    const dataPath = join(__dirname, "data", "training_set.jsonl");

    // Create (upload) and wait until processed
    const uploadedFile = await uploadFileAndWait(dataPath);
    assert.isNotNull(uploadedFile);
    assert.isString(uploadedFile.id);

    // Retrieve metadata
    const got = await openai.files.retrieve(uploadedFile.id);
    assert.isNotNull(got);
    assert.equal(got.id, uploadedFile.id);
    assert.equal((got as any).status, "processed");

    // Retrieve content
    const contentResponse = await openai.files.content(uploadedFile.id);
    const buf = Buffer.from(await (contentResponse as any).arrayBuffer());
    const text = buf.toString("utf-8");
    assert.include(text, `"messages":`);
    assert.include(text, `"system"`);
    assert.include(text, `"assistant"`);

    // List
    const listed = await openai.files.list();
    assert.isArray(listed.data);
    const found = listed.data.find((f: any) => f.id === uploadedFile.id);
    assert.isNotNull(found);

    // Delete
    const deleted = await openai.files.delete(uploadedFile.id);
    assert.isTrue(deleted?.deleted === true, "expected file to be deleted");
  });
});
