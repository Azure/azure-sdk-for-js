// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { DocumentAnalysisClient } from "../../src/documentAnalysisClient";
import { DocumentModelAdministrationClient } from "../../src/documentModelAdministrationClient";

import { assert } from "@azure/test-utils";
import { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { OperationTracingOptions } from "@azure/core-tracing";
import { CopyAuthorization } from "../../src/generated";

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
  h: (...args: Args) => Promise<void>
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
describe("supports tracing", function () {
  describe("DocumentAnalysisClient", function () {
    let dac: DocumentAnalysisClient;

    beforeEach(function () {
      dac = new DocumentAnalysisClient("https://example.com", new AzureKeyCredential("fake"), {
        httpClient: fakeHttpClient,
      });
    });

    it("beginAnalyzeDocument", () =>
      assert.supportsTracing(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dac.beginAnalyzeDocument("test", "test", options);
        }),
        ["DocumentAnalysisClient.beginAnalyzeDocument"]
      ));
  });

  describe("DocumentModelAdministrationClient", function () {
    let dmac: DocumentModelAdministrationClient;

    beforeEach(function () {
      dmac = new DocumentModelAdministrationClient(
        "https://example.com",
        new AzureKeyCredential("fake"),
        {
          httpClient: fakeHttpClient,
        }
      );
    });

    it("getModel", () =>
      assert.supportsTracing(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.getDocumentModel("test", options);
        }),
        ["DocumentModelAdministrationClient.getDocumentModel"]
      ));

    it("getOperation", () =>
      assert.supportsTracing(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.getOperation("test", options);
        }),
        ["DocumentModelAdministrationClient.getOperation"]
      ));

    it("getInfo", () =>
      assert.supportsTracing(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.getResourceDetails(options);
        }),
        ["DocumentModelAdministrationClient.getResourceDetails"]
      ));

    it("deleteModel", () =>
      assert.supportsTracing(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.deleteDocumentModel("test", options);
        }),
        ["DocumentModelAdministrationClient.deleteDocumentModel"]
      ));

    it("beginBuildDocumentModel", () =>
      assert.supportsTracing(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await (await dmac.beginBuildDocumentModel("test", "test", "neural", options)).poll();
        }),
        ["DocumentModelAdministrationClient.beginBuildDocumentModel"]
      ));

    it("beginComposeDocumentModel", () =>
      assert.supportsTracing(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.beginComposeDocumentModel("test", [], options);
        }),
        ["DocumentModelAdministrationClient.beginComposeDocumentModel"]
      ));

    it("getCopyAuthorization", () =>
      assert.supportsTracing(
        fakeIt(async (options: { tracingOptions?: OperationTracingOptions }) => {
          await dmac.getCopyAuthorization("test", options);
        }),
        ["DocumentModelAdministrationClient.getCopyAuthorization"]
      ));

    it("beginCopyModel", () =>
      assert.supportsTracing(
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
            options
          );
        }),
        ["DocumentModelAdministrationClient.beginCopyModel"]
      ));
  });
});
