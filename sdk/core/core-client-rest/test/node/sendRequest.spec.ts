// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createEmptyPipeline,
  createHttpHeaders,
  type PipelineResponse,
} from "@azure/core-rest-pipeline";
import { assert, describe, it } from "vitest";
import { sendRequest } from "../../src/sendRequest.js";
import { Readable } from "stream";

describe("sendRequest (Node-only)", () => {
  describe("FormData content", () => {
    it("should handle request body as FormData with a Node stream", async () => {
      const fileContent = Buffer.from("Hello World!", "utf8");
      const fileStream = Readable.from(fileContent);

      const mockPipeline = createEmptyPipeline();

      mockPipeline.sendRequest = async (_client, request) => {
        // no way to access the actual stream from the file in Node in this test without relying on core-rest-pipeline implementation detail
        // so we just verify that the object looks like a file and has the right name
        const file = request.formData?.file as File;
        assert.equal(file.name, "blob");
        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", "https://example.org/", mockPipeline, {
        body: {
          file: fileStream,
        },
        contentType: "multipart/form-data",
      });
    });
  });
});
