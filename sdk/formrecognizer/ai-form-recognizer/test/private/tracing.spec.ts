// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import {
  DocumentAnalysisClient,
  DocumentModelAdministrationClient,
} from "@azure/ai-form-recognizer";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import type { OperationTracingOptions } from "@azure/core-tracing";
import type { CopyAuthorization, FormRecognizerRequestBody } from "@azure/ai-form-recognizer";
import { describe, it, expect, beforeEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({ toSupportTracing });

// #region FakeClient

// This request faking system allows us to interrupt a request right as it's about to go out the wire. It's useful
// for testing certain aspects of the _request_ pipeline (in this case, tracing), by allowing us to avoid needing to
// fully record tests to check that spans are constructed like we expect. The `fakeHttpClient` simply throws a
// `RequestSent` error, and the `fakeIt` higher-order helper checks for that error and simply returns if it was thrown.
// Other errors are re-thrown, so only requests that send successfully exit normally.

class RequestSent extends Error {
  constructor(public request: PipelineRequest) {
    super();
  }
}

const fakeHttpClient: HttpClient = {
  sendRequest(req) {
    throw new RequestSent(req);
  },
};

function fakeIt<Args extends unknown[]>(
  h: (...args: Args) => Promise<void>,
): (...args: Args) => Promise<void> {
  return async (...args) => {
    try {
      await h(...args);
    } catch (e: any) {
      if (!(e instanceof RequestSent)) throw e;
    }
  };
}

// #endregion

/**
 * Check that method spans are created correctly.
 */
describe("supports tracing", () => {
  describe("DocumentAnalysisClient", () => {
    let dac: DocumentAnalysisClient;

    beforeEach(() => {
      dac = new DocumentAnalysisClient("https://example.com", new AzureKeyCredential("fake"), {
        httpClient: fakeHttpClient,
      });
    });

    it("beginAnalyzeDocument", async () => {
      await expect(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dac.beginAnalyzeDocument(
            "test",
            "test" as unknown as FormRecognizerRequestBody,
            options,
          );
        }),
      ).toSupportTracing(["DocumentAnalysisClient.beginAnalyzeDocument"]);
    });
  });

  describe("DocumentModelAdministrationClient", () => {
    let dmac: DocumentModelAdministrationClient;

    beforeEach(() => {
      dmac = new DocumentModelAdministrationClient(
        "https://example.com",
        new AzureKeyCredential("fake"),
        {
          httpClient: fakeHttpClient,
        },
      );
    });

    it("getModel", async () => {
      await expect(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.getDocumentModel("test", options);
        }),
      ).toSupportTracing(["DocumentModelAdministrationClient.getDocumentModel"]);
    });

    it("getOperation", async () => {
      await expect(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.getOperation("test", options);
        }),
      ).toSupportTracing(["DocumentModelAdministrationClient.getOperation"]);
    });

    it("getInfo", async () => {
      await expect(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.getResourceDetails(options);
        }),
      ).toSupportTracing(["DocumentModelAdministrationClient.getResourceDetails"]);
    });

    it("deleteModel", async () => {
      await expect(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.deleteDocumentModel("test", options);
        }),
      ).toSupportTracing(["DocumentModelAdministrationClient.deleteDocumentModel"]);
    });

    it("beginBuildDocumentModel", async () => {
      await expect(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await (await dmac.beginBuildDocumentModel("test", "test", "neural", options)).poll();
        }),
      ).toSupportTracing(["DocumentModelAdministrationClient.beginBuildDocumentModel"]);
    });

    it("beginComposeDocumentModel", async () => {
      await expect(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.beginComposeDocumentModel("test", [], options);
        }),
      ).toSupportTracing(["DocumentModelAdministrationClient.beginComposeDocumentModel"]);
    });

    it("getCopyAuthorization", async () => {
      await expect(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.getCopyAuthorization("test", options);
        }),
      ).toSupportTracing(["DocumentModelAdministrationClient.getCopyAuthorization"]);
    });

    it("beginCopyModel", async () => {
      await expect(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.beginCopyModelTo(
            "test",
            {
              targetModelId: "test",
              targetModelLocation: "test",
              targetResourceId: "test",
              targetResourceRegion: "test",
              accessToken: "test",
              expirationDateTime: new Date(),
            } as CopyAuthorization,
            options,
          );
        }),
      ).toSupportTracing(["DocumentModelAdministrationClient.beginCopyModel"]);
    });
  });
});
