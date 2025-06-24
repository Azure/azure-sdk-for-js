// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - files", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and projectsClient operations are accessible", async function () {
    assert.isNotNull(projectsClient);
  });

  it("should list files", async function () {
    const files = await projectsClient.files.list();
    assert.isNotEmpty(files);
  });

  it("should upload file", async function () {
    const fileContent = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
    const file = await projectsClient.files.upload(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    assert.isNotEmpty(file);
  });

  it("should upload file and poll (through original method)", async function () {
    const fileContent = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
    const filePoller = projectsClient.files.uploadAndPoll(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    const initialState = filePoller.poll();
    assert.isNotNull(initialState);
    const file = await filePoller.pollUntilDone();
    assert.notInclude(["uploaded", "pending", "running"], file.status);
    assert.isNotEmpty(file);
  });

  it("should upload file and poll (through creation method)", async function () {
    const fileContent = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
    const filePoller = projectsClient.files.uploadAndPoll(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    const initialState = filePoller.poll();
    assert.isNotNull(initialState);
    const file = await filePoller.pollUntilDone();
    assert.notInclude(["uploaded", "pending", "running"], file.status);
    assert.isNotEmpty(file);
  });

  it("should delete file", async function () {
    const fileContent = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
    const file = await projectsClient.files.upload(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    const deleted = await projectsClient.files.delete(file.id);
    assert.isNotNull(deleted);
  });

  it("should retrieve file", async function () {
    const fileContent = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
    const file = await projectsClient.files.upload(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    const _file = await projectsClient.files.get(file.id);
    assert.isNotEmpty(_file);
    assert.equal(_file.id, file.id);
    await projectsClient.files.delete(file.id);
  });
});
