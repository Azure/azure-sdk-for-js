// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { DocumentAnalysisClient } from "../../src/documentAnalysisClient";
import { DocumentModelAdministrationClient } from "../../src/documentModelAdministrationClient";

import { assert } from "@azure-tools/test-utils";
import { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { CopyAuthorization } from "../../src/generated";
import { FormRecognizerRequestBody } from "../../src/lro/analysis";
import Sinon from "sinon";
import { tracingClient } from "../../src/tracing";

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
describe("supports tracing", function () {
  afterEach(function () {
    Sinon.restore();
  });

  describe("DocumentAnalysisClient", function () {
    let dac: DocumentAnalysisClient;

    beforeEach(function () {
      dac = new DocumentAnalysisClient("https://example.com", new AzureKeyCredential("fake"), {
        httpClient: fakeHttpClient,
      });
    });

    it("beginAnalyzeDocument", async () => {
      const withSpanSpy = Sinon.spy(tracingClient, "withSpan");

      await fakeIt(async () => {
        await dac.beginAnalyzeDocument("test", "test" as unknown as FormRecognizerRequestBody);
      })();

      const expected = [
        "DocumentAnalysisClient.beginAnalyzeDocument",
        "DocumentAnalysisClient.createAnalysisPoller-start",
      ];

      const actual = withSpanSpy.getCalls().map((call) => call.args[0]);
      assert.sameOrderedMembers(actual, expected);
    });
  });

  describe("DocumentModelAdministrationClient", function () {
    let dmac: DocumentModelAdministrationClient;

    beforeEach(function () {
      dmac = new DocumentModelAdministrationClient(
        "https://example.com",
        new AzureKeyCredential("fake"),
        {
          httpClient: fakeHttpClient,
        },
      );
    });

    it("getModel", async () => {
      const withSpanSpy = Sinon.spy(tracingClient, "withSpan");

      await fakeIt(async () => {
        await dmac.getDocumentModel("test");
      })();

      const expected = ["DocumentModelAdministrationClient.getDocumentModel"];

      const actual = withSpanSpy.getCalls().map((call) => call.args[0]);
      assert.sameOrderedMembers(actual, expected);
    });

    it("getOperation", async () => {
      const withSpanSpy = Sinon.spy(tracingClient, "withSpan");

      await fakeIt(async () => {
        await dmac.getOperation("test");
      })();

      const expected = ["DocumentModelAdministrationClient.getOperation"];

      const actual = withSpanSpy.getCalls().map((call) => call.args[0]);
      assert.sameOrderedMembers(actual, expected);
    });

    it("getInfo", async () => {
      const withSpanSpy = Sinon.spy(tracingClient, "withSpan");

      await fakeIt(async () => {
        await dmac.getResourceDetails();
      })();

      const expected = ["DocumentModelAdministrationClient.getResourceDetails"];

      const actual = withSpanSpy.getCalls().map((call) => call.args[0]);
      assert.sameOrderedMembers(actual, expected);
    });

    it("deleteModel", async () => {
      const withSpanSpy = Sinon.spy(tracingClient, "withSpan");

      await fakeIt(async () => {
        await dmac.deleteDocumentModel("test");
      })();

      const expected = ["DocumentModelAdministrationClient.deleteDocumentModel"];

      const actual = withSpanSpy.getCalls().map((call) => call.args[0]);
      assert.sameOrderedMembers(actual, expected);
    });

    it("beginBuildDocumentModel", async () => {
      const withSpanSpy = Sinon.spy(tracingClient, "withSpan");

      await fakeIt(async () => {
        await dmac.beginBuildDocumentModel("test", "test", "neural");
      })();

      const expected = [
        "DocumentModelAdministrationClient.beginBuildDocumentModel",
        "DocumentModelAdministrationClient.createDocumentModelPoller-start",
      ];

      const actual = withSpanSpy.getCalls().map((call) => call.args[0]);
      assert.sameOrderedMembers(actual, expected);
    });

    it("beginComposeDocumentModel", async () => {
      const withSpanSpy = Sinon.spy(tracingClient, "withSpan");

      await fakeIt(async () => {
        await dmac.beginComposeDocumentModel("test", []);
      })();

      const expected = [
        "DocumentModelAdministrationClient.beginComposeDocumentModel",
        "DocumentModelAdministrationClient.createDocumentModelPoller-start",
      ];

      const actual = withSpanSpy.getCalls().map((call) => call.args[0]);

      assert.sameOrderedMembers(actual, expected);
    });

    it("getCopyAuthorization", async () => {
      const withSpanSpy = Sinon.spy(tracingClient, "withSpan");

      await fakeIt(async () => {
        await dmac.getCopyAuthorization("test");
      })();

      const expected = ["DocumentModelAdministrationClient.getCopyAuthorization"];

      const actual = withSpanSpy.getCalls().map((call) => call.args[0]);

      assert.sameOrderedMembers(actual, expected);
    });

    it("beginCopyModel", async () => {
      const withSpanSpy = Sinon.spy(tracingClient, "withSpan");

      await fakeIt(async () => {
        await dmac.beginCopyModelTo("test", {
          targetModelId: "test",
          targetModelLocation: "test",
          targetResourceId: "test",
          targetResourceRegion: "test",
          accessToken: "test",
          expirationDateTime: new Date(),
        } as CopyAuthorization);
      })();

      const expected = [
        "DocumentModelAdministrationClient.beginCopyModel",
        "DocumentModelAdministrationClient.createDocumentModelPoller-start",
      ];

      const actual = withSpanSpy.getCalls().map((call) => call.args[0]);

      assert.sameOrderedMembers(actual, expected);
    });
  });
});
