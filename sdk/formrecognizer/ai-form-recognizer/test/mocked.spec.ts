// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { HttpHeaders, WebResource } from "@azure/core-http";
import { GeneratedClient } from "../src/generated/generatedClient";
import { FormTrainingClient, AzureKeyCredential, CustomFormModelInfo } from "../src";
import { GeneratedClientListCustomModelsResponse } from "../src/generated/models";

function getGeneratedClientMock(): GeneratedClient {
  const client = new GeneratedClient("endpointUrl", undefined);
  return client;
}

describe("Mock tests", function() {
  describe("FormTrainingClient", function() {
    const modelInfo1: CustomFormModelInfo = {
      modelId: "id1",
      status: "ready",
      trainingStartedOn: new Date("2020/01/01"),
      trainingCompletedOn: new Date("2020/01/02")
    };
    const modelInfo2: CustomFormModelInfo = {
      modelId: "id2",
      status: "ready",
      trainingStartedOn: new Date("2020/02/01"),
      trainingCompletedOn: new Date("2020/02/02")
    };
    const modelInfo3: CustomFormModelInfo = {
      modelId: "id3",
      status: "ready",
      trainingStartedOn: new Date("2020/03/01"),
      trainingCompletedOn: new Date("2020/03/02")
    };
    const modelInfo4: CustomFormModelInfo = {
      modelId: "id4",
      status: "ready",
      trainingStartedOn: new Date("2020/04/01"),
      trainingCompletedOn: new Date("2020/04/02")
    };
    const firstPage: GeneratedClientListCustomModelsResponse = {
      modelList: [modelInfo1, modelInfo2],
      _response: {
        request: new WebResource("url", "GET"),
        status: 200,
        headers: new HttpHeaders(),
        bodyAsText: "",
        parsedBody: { modelList: [modelInfo1, modelInfo2] }
      }
    };
    const secondPage: GeneratedClientListCustomModelsResponse = {
      modelList: [modelInfo3, modelInfo4],
      _response: {
        request: new WebResource("url", "GET"),
        status: 200,
        headers: new HttpHeaders(),
        bodyAsText: "",
        parsedBody: { modelList: [modelInfo3, modelInfo4] }
      }
    };

    it("should list models when there are only one page of results", async function() {
      const trainingClient = new FormTrainingClient(
        "https://endpoint",
        new AzureKeyCredential("key")
      );
      const generatedClient = getGeneratedClientMock();

      const listStub = sinon.stub(generatedClient, "listCustomModels");
      listStub.returns(Promise.resolve(firstPage));
      (trainingClient as any).client = generatedClient;
      const result: CustomFormModelInfo[] = [];
      for await (const m of trainingClient.listCustomModels()) {
        result.push(m);
      }

      assert.equal(result.length, 2, "Expecting two models");
      assert.equal(result[0].modelId, "id1");
      assert.equal(result[1].modelId, "id2");
    });

    it("should list models when there are more than one page of results", async function() {
      const trainingClient = new FormTrainingClient(
        "https://endpoint",
        new AzureKeyCredential("key")
      );
      const generatedClient = getGeneratedClientMock();

      const listStub = sinon.stub(generatedClient, "listCustomModels");
      listStub.returns(Promise.resolve({ ...firstPage, nextLink: "nextLink" }));
      const listNextStub = sinon.stub(generatedClient, "listCustomModelsNext");
      listNextStub.returns(Promise.resolve(secondPage));
      (trainingClient as any).client = generatedClient;

      const result: CustomFormModelInfo[] = [];
      for await (const m of trainingClient.listCustomModels()) {
        result.push(m);
      }

      assert.equal(result.length, 4, "Expecting four models");
      assert.equal(result[0].modelId, "id1");
      assert.equal(result[1].modelId, "id2");
      assert.equal(result[2].modelId, "id3");
      assert.equal(result[3].modelId, "id4");
    });

    it("should return the page from continuation token", async function() {
      const trainingClient = new FormTrainingClient(
        "https://endpoint",
        new AzureKeyCredential("key")
      );
      const generatedClient = getGeneratedClientMock();

      const listNextStub = sinon.stub(generatedClient, "listCustomModelsNext");
      listNextStub.returns(Promise.resolve(secondPage));
      (trainingClient as any).client = generatedClient;

      const result: CustomFormModelInfo[] = [];
      for await (const page of trainingClient
        .listCustomModels()
        .byPage({ continuationToken: "nextLink" })) {
        for (const m of page.modelList || []) {
          result.push(m);
        }
      }

      assert.equal(result.length, 2, "Expecting two models from second page");
      assert.equal(result[0].modelId, "id3");
      assert.equal(result[1].modelId, "id4");
    });
  });
});
