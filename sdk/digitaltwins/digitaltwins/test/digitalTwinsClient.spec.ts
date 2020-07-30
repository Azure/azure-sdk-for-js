// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, expect } from "chai";
import * as sinon from "sinon";
import {
  TokenCredential,
  OperationOptions,
  RequestOptionsBase,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import {
  DigitalTwinsAddOptionalParams,
  DigitalTwinsUpdateOptionalParams,
  DigitalTwinsDeleteMethodOptionalParams,
  DigitalTwinsAddRelationshipOptionalParams,
  DigitalTwinsDeleteRelationshipOptionalParams,
  DigitalTwinModelsGetByIdOptionalParams,
  DigitalTwinModelsAddOptionalParams,
  EventRoute,
  EventRoutesAddOptionalParams
} from "../src/generated/models";
import { DigitalTwinsClient } from "../src/index";

describe("DigitalTwinsClient", () => {
  let operationOptions: OperationOptions;
  let url: string;
  let tokenCredential: TokenCredential;
  let testClient: DigitalTwinsClient;
  let testTwinId: string;
  let testRelationshipId: string;
  let testJsonString: string;
  let testJsonPatch: any[];
  let testComponentPath: string;
  let testPayload: any;
  let testMessageId: string;
  let testModelId: string;
  let testModels: any[];
  let testEventRouteId: string;
  let testEndpointName: string;
  let testFilter: string;

  beforeEach(async function() {
    operationOptions = {
      requestOptions: {
        customHeaders: { ["x-ms-parameter-location"]: "client" },
        timeout: 42
      }
    };
    url = "https://aaa.xxx.azure.net";
    tokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345
        })
    };
    testClient = new DigitalTwinsClient(url, tokenCredential);
    testTwinId = "test_twin_id";
    testRelationshipId = "test_relationship_id";
    testJsonString = "{op: add, path: targetTemperature, value: 42}";
    testJsonPatch = [{ op: "add", path: "/targetTemperature", value: 42 }];
    testComponentPath = "test_component_path";
    testPayload = 42;
    testMessageId = "test_message_id";
    testModelId = "test_model_id";
    testModels = [{ model1: "model1" }, { model2: "model2" }];
    testEventRouteId = "test_event_route_id";
    testEndpointName = "test_endpoint_name";
    testFilter = "*.*";
  });

  it(`Constructor creates an instance of the DigitalTwinsClient`, function() {
    assert.instanceOf(testClient, DigitalTwinsClient);
  });

  it("getDigitalTwin calls the getById method with twinId on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getById");
    testClient.getDigitalTwin(testTwinId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId));
  });

  it("getDigitalTwin calls the getById method with twinId and converted options on the generated client", function() {
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const stub = sinon.stub(testClient["client"].digitalTwins, "getById");
    testClient.getDigitalTwin(testTwinId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, requestOptionBase));
    assert.equal(operationOptions.requestOptions?.customHeaders, requestOptionBase.customHeaders);
  });

  it("getDigitalTwin returns a promise of the generated code return value", async () => {
    const testReturn = {
      etag: "return_etag",
      body: "return_body"
    };
    sinon.stub(testClient["client"].digitalTwins, "getById").resolves(testReturn);
    const retVal = await testClient.getDigitalTwin(testTwinId);
    assert.equal(retVal.etag, testReturn.etag);
    assert.equal(retVal.body, testReturn.body);
  });

  it("getDigitalTwin rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "getById").rejects(testError);
    await testClient.getDigitalTwin(testTwinId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("upsertDigitalTwin calls the add method with twinId and twinJson on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "add");
    testClient.upsertDigitalTwin(testTwinId, testJsonString);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testJsonString));
  });

  it("upsertDigitalTwin calls the add method with twinId, twinJson and converted options on the generated client if update disabled", function() {
    const enableUpdate = false;
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinsAddOptionalParams = requestOptionBase;
    expectedOptions.ifNoneMatch = "*";

    const stub = sinon.stub(testClient["client"].digitalTwins, "add");
    testClient.upsertDigitalTwin(testTwinId, testJsonString, enableUpdate, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testJsonString, expectedOptions));
  });

  it("upsertDigitalTwin calls the add method with twinId, twinJson and converted options on the generated client if update enabled", function() {
    const enableUpdate: boolean = true;
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinsAddOptionalParams = requestOptionBase;

    const stub = sinon.stub(testClient["client"].digitalTwins, "add");
    testClient.upsertDigitalTwin(testTwinId, testJsonString, enableUpdate, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testJsonString, expectedOptions));
  });

  it("upsertDigitalTwin returns a promise of the generated code return value", async () => {
    const testReturn = {
      etag: "return_etag",
      body: "return_body"
    };
    sinon.stub(testClient["client"].digitalTwins, "add").resolves(testReturn);
    const retVal = await testClient.upsertDigitalTwin(testTwinId, testJsonString);
    assert.equal(retVal.etag, testReturn.etag);
    assert.equal(retVal.body, testReturn.body);
  });

  it("upsertDigitalTwin rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "add").rejects(testError);
    await testClient.upsertDigitalTwin(testTwinId, testJsonString).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("updateDigitalTwin calls the update method with twinId, jsonPatch and converted options on the generated client", function() {
    const etag: string = "test_etag";
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinsUpdateOptionalParams = requestOptionBase;
    expectedOptions.ifMatch = etag;

    const stub = sinon.stub(testClient["client"].digitalTwins, "update");
    testClient.updateDigitalTwin(testTwinId, testJsonPatch, etag, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testJsonPatch, expectedOptions));
  });

  it("updateDigitalTwin returns a promise of the generated code return value", async () => {
    const testReturn = {
      etag: "return_etag"
    };
    sinon.stub(testClient["client"].digitalTwins, "update").resolves(testReturn);
    const retVal = await testClient.updateDigitalTwin(testTwinId, testJsonString);
    assert.equal(retVal.etag, testReturn.etag);
  });

  it("updateDigitalTwin rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "update").rejects(testError);
    await testClient.updateDigitalTwin(testTwinId, testJsonString).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("deleteDigitalTwin calls the deleteMethod method with twinId and converted options on the generated client", function() {
    const etag: string = "test_etag";
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinsDeleteMethodOptionalParams = requestOptionBase;
    expectedOptions.ifMatch = etag;

    const stub = sinon.stub(testClient["client"].digitalTwins, "deleteMethod");
    testClient.deleteDigitalTwin(testTwinId, etag, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, expectedOptions));
  });

  it("deleteDigitalTwin returns a promise of the generated code return value", async () => {
    sinon.stub(testClient["client"].digitalTwins, "deleteMethod").resolves();
    const retVal = await testClient.deleteDigitalTwin(testTwinId);
    assert.equal(retVal, undefined);
  });

  it("deleteDigitalTwin rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "deleteMethod").rejects(testError);
    await testClient.deleteDigitalTwin(testTwinId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("getComponent calls the getComponent method with twinId, componentPath and converted options on the generated client", function() {
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );

    const stub = sinon.stub(testClient["client"].digitalTwins, "getComponent");
    testClient.getComponent(testTwinId, testComponentPath, requestOptionBase);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testComponentPath, requestOptionBase));
  });

  it("getComponent returns a promise of the generated code return value", async () => {
    sinon.stub(testClient["client"].digitalTwins, "getComponent").resolves();
    const retVal = await testClient.getComponent(testTwinId, testComponentPath);
    assert.equal(retVal, undefined);
  });

  it("getComponent rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "getComponent").rejects(testError);
    await testClient.getComponent(testTwinId, testComponentPath).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("updateComponent calls the updateComponent method with twinId, componentPath, jsonPatch and converted options on the generated client", function() {
    const etag: string = "test_etag";
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinsUpdateOptionalParams = requestOptionBase;
    expectedOptions.ifMatch = etag;
    expectedOptions.patchDocument = testJsonPatch;

    const stub = sinon.stub(testClient["client"].digitalTwins, "updateComponent");
    testClient.updateComponent(
      testTwinId,
      testComponentPath,
      testJsonPatch,
      etag,
      operationOptions
    );
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testComponentPath, expectedOptions));
  });

  it("updateComponent returns a promise of the generated code return value", async () => {
    const testReturn = {
      etag: "return_etag"
    };
    sinon.stub(testClient["client"].digitalTwins, "updateComponent").resolves(testReturn);
    const retVal = await testClient.updateComponent(testTwinId, testComponentPath);
    assert.equal(retVal.etag, testReturn.etag);
  });

  it("updateComponent rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "updateComponent").rejects(testError);
    await testClient.updateComponent(testTwinId, testComponentPath).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("getRelationship calls the getRelationshipById method with twinId and relationshipId on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getRelationshipById");
    testClient.getRelationship(testTwinId, testRelationshipId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId));
  });

  it("getRelationship calls the getRelationshipById method with twinId, relationshipId and converted options on the generated client", function() {
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const stub = sinon.stub(testClient["client"].digitalTwins, "getRelationshipById");
    testClient.getRelationship(testTwinId, testRelationshipId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, requestOptionBase));
    assert.equal(operationOptions.requestOptions?.customHeaders, requestOptionBase.customHeaders);
  });

  it("getRelationship returns a promise of the generated code return value", async () => {
    const testReturn = {
      etag: "return_etag",
      body: "return_body"
    };
    sinon.stub(testClient["client"].digitalTwins, "getRelationshipById").resolves(testReturn);
    const retVal = await testClient.getRelationship(testTwinId, testRelationshipId);
    assert.equal(retVal.etag, testReturn.etag);
    assert.equal(retVal.body, testReturn.body);
  });

  it("getRelationship rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "getRelationshipById").rejects(testError);
    await testClient.getRelationship(testTwinId, testRelationshipId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("upsertRelationship calls the addRelationship method with twinId and twinJson on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "addRelationship");
    testClient.upsertRelationship(testTwinId, testRelationshipId, testJsonString);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId));
  });

  it("upsertRelationship calls the addRelationship method with twinId, relationshipId, relationshipJson and converted options on the generated client if update disabled", function() {
    const enableUpdate = false;
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinsAddRelationshipOptionalParams = requestOptionBase;
    expectedOptions.ifNoneMatch = "*";
    expectedOptions.relationship = testJsonString;

    const stub = sinon.stub(testClient["client"].digitalTwins, "addRelationship");
    testClient.upsertRelationship(
      testTwinId,
      testRelationshipId,
      testJsonString,
      enableUpdate,
      operationOptions
    );
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, expectedOptions));
  });

  it("upsertRelationship calls the addRelationship method with twinId, relationshipId, relationshipJson and converted options on the generated client if update enabled", function() {
    const enableUpdate: boolean = true;
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinsAddOptionalParams = requestOptionBase;

    const stub = sinon.stub(testClient["client"].digitalTwins, "addRelationship");
    testClient.upsertRelationship(
      testTwinId,
      testRelationshipId,
      testJsonString,
      enableUpdate,
      operationOptions
    );
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, expectedOptions));
  });

  it("upsertRelationship returns a promise of the generated code return value", async () => {
    const testReturn = {
      etag: "return_etag",
      body: "return_body"
    };
    sinon.stub(testClient["client"].digitalTwins, "addRelationship").resolves(testReturn);
    const retVal = await testClient.upsertRelationship(
      testTwinId,
      testRelationshipId,
      testJsonString
    );
    assert.equal(retVal.etag, testReturn.etag);
    assert.equal(retVal.body, testReturn.body);
  });

  it("upsertRelationship rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "addRelationship").rejects(testError);
    await testClient
      .upsertRelationship(testTwinId, testRelationshipId, testJsonPatch)
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("updateRelationship calls the updateRelationship method with twinId, jsonPatch and converted options on the generated client", function() {
    const testJsonPatch: any = "digitalTwin Json";
    const etag: string = "test_etag";
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinsUpdateOptionalParams = requestOptionBase;
    expectedOptions.ifMatch = etag;
    expectedOptions.patchDocument = testJsonPatch;

    const stub = sinon.stub(testClient["client"].digitalTwins, "updateRelationship");
    testClient.updateRelationship(
      testTwinId,
      testRelationshipId,
      testJsonPatch,
      etag,
      operationOptions
    );
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, expectedOptions));
  });

  it("updateRelationship returns a promise of the generated code return value", async () => {
    const testReturn = {
      etag: "return_etag"
    };
    sinon.stub(testClient["client"].digitalTwins, "updateRelationship").resolves(testReturn);
    const retVal = await testClient.updateRelationship(
      testTwinId,
      testRelationshipId,
      testJsonPatch
    );
    assert.equal(retVal.etag, testReturn.etag);
  });

  it("updateRelationship rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "updateRelationship").rejects(testError);
    await testClient
      .updateRelationship(testTwinId, testRelationshipId, testJsonPatch)
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("deleteRelationship calls the deleteRelationship method with twinId, relationshipId and converted options on the generated client", function() {
    const etag: string = "test_etag";
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinsDeleteRelationshipOptionalParams = requestOptionBase;
    expectedOptions.ifMatch = etag;

    const stub = sinon.stub(testClient["client"].digitalTwins, "deleteRelationship");
    testClient.deleteRelationship(testTwinId, testRelationshipId, etag, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, expectedOptions));
  });

  it("deleteRelationship returns a promise of the generated code return value", async () => {
    sinon.stub(testClient["client"].digitalTwins, "deleteRelationship").resolves();
    const retVal = await testClient.deleteRelationship(testTwinId, testRelationshipId);
    assert.equal(retVal, undefined);
  });

  it("deleteRelationship rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "deleteRelationship").rejects(testError);
    await testClient.deleteRelationship(testTwinId, testRelationshipId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("publishTelemetry returns a promise of the generated code return value", async () => {
    sinon.stub(testClient["client"].digitalTwins, "sendTelemetry").resolves();
    const retVal = await testClient.publishTelemetry(testTwinId, testPayload, testMessageId);
    assert.equal(retVal, undefined);
  });

  it("publishTelemetry rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "sendTelemetry").rejects(testError);
    await testClient.publishTelemetry(testTwinId, testPayload).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("publishComponentTelemetry returns a promise of the generated code return value", async () => {
    sinon.stub(testClient["client"].digitalTwins, "sendComponentTelemetry").resolves();
    const retVal = await testClient.publishComponentTelemetry(
      testTwinId,
      testComponentPath,
      testPayload,
      testMessageId
    );
    assert.equal(retVal, undefined);
  });

  it("publishComponentTelemetry rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwins, "sendComponentTelemetry").rejects(testError);
    await testClient
      .publishComponentTelemetry(testTwinId, testComponentPath, testPayload)
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("getModel calls the getById method with modelId on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].digitalTwinModels, "getById");
    testClient.getModel(testTwinId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId));
  });

  it("getModel calls the getById method with twinId and converted options on the generated client", function() {
    const includeModelDefinition: boolean = true;
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinModelsGetByIdOptionalParams = requestOptionBase;
    expectedOptions.includeModelDefinition = includeModelDefinition;

    const stub = sinon.stub(testClient["client"].digitalTwinModels, "getById");
    testClient.getModel(testModelId, includeModelDefinition, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testModelId, expectedOptions));
    assert.equal(operationOptions.requestOptions?.customHeaders, requestOptionBase.customHeaders);
  });

  it("getModel returns a promise of the generated code return value", async () => {
    const testReturn = {
      id: "return_display_name",
      model: "return_model"
    };
    sinon.stub(testClient["client"].digitalTwinModels, "getById").resolves(testReturn);
    const retVal = await testClient.getModel(testModelId);
    assert.equal(retVal.id, testReturn.id);
    assert.equal(retVal.model, testReturn.model);
  });

  it("getModel rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwinModels, "getById").rejects(testError);
    await testClient.getModel(testModelId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("createModels calls the add method with twinId and twinJson on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].digitalTwinModels, "add");
    const expectedOptions: DigitalTwinModelsAddOptionalParams = {};
    expectedOptions.models = testModels;
    testClient.createModels(testModels);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(expectedOptions));
  });

  it("createModels calls the add method with converted options on the generated client", function() {
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: DigitalTwinModelsAddOptionalParams = requestOptionBase;
    expectedOptions.models = testModels;

    const stub = sinon.stub(testClient["client"].digitalTwinModels, "add");
    testClient.createModels(testModels, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(expectedOptions));
  });

  it("createModels returns a promise of the generated code return value", async () => {
    const testReturn = [
      {
        id: "return_id",
        model: "return_model"
      }
    ];
    sinon.stub(testClient["client"].digitalTwinModels, "add").resolves(testReturn);
    const retVal = await testClient.createModels(testModels);
    assert.equal(retVal[0].id, testReturn[0].id);
    assert.equal(retVal[0].model, testReturn[0].model);
  });

  it("createModels rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwinModels, "add").rejects(testError);
    await testClient.createModels(testModels).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("decomissionModel calls the update method with converted options on the generated client", function() {
    const expectedOptions: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );

    const stub = sinon.stub(testClient["client"].digitalTwinModels, "update");
    testClient.decomissionModel(testModelId, testJsonPatch, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testModelId, testJsonPatch, expectedOptions));
  });

  it("decomissionModel returns a promise of the generated code return value", async () => {
    const testReturn = [
      {
        id: "return_id",
        model: "return_model"
      }
    ];
    sinon.stub(testClient["client"].digitalTwinModels, "update").resolves(testReturn);
    const retVal = await testClient.decomissionModel(testModelId, testJsonPatch);
    assert.equal(retVal[0].id, testReturn[0].id);
    assert.equal(retVal[0].model, testReturn[0].model);
  });

  it("decomissionModel rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwinModels, "update").rejects(testError);
    await testClient.decomissionModel(testModelId, testJsonPatch).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("deleteModel calls the deleteMethod method with modelId and converted options on the generated client", function() {
    const expectedOptions: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );

    const stub = sinon.stub(testClient["client"].digitalTwinModels, "deleteMethod");
    testClient.deleteModel(testModelId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testModelId, expectedOptions));
  });

  it("deleteModel returns a promise of the generated code return value", async () => {
    const testReturn = [
      {
        id: "return_id",
        model: "return_model"
      }
    ];
    sinon.stub(testClient["client"].digitalTwinModels, "deleteMethod").resolves(testReturn);
    const retVal = await testClient.deleteModel(testModelId);
    assert.equal(retVal[0].id, testReturn[0].id);
    assert.equal(retVal[0].model, testReturn[0].model);
  });

  it("deleteModel rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].digitalTwinModels, "deleteMethod").rejects(testError);
    await testClient.deleteModel(testModelId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("getEventRoute calls the getById method with modelId on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].eventRoutes, "getById");
    testClient.getEventRoute(testEventRouteId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId));
  });

  it("getEventRoute calls the getById method with twinId and converted options on the generated client", function() {
    const expectedOptions: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );

    const stub = sinon.stub(testClient["client"].eventRoutes, "getById");
    testClient.getEventRoute(testEventRouteId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId, expectedOptions));
    assert.equal(operationOptions.requestOptions?.customHeaders, expectedOptions.customHeaders);
  });

  it("getEventRoute returns a promise of the generated code return value", async () => {
    const testReturn = {
      id: "return_display_name",
      endpointName: "return_endpointName"
    };
    sinon.stub(testClient["client"].eventRoutes, "getById").resolves(testReturn);
    const retVal = await testClient.getEventRoute(testEventRouteId);
    assert.equal(retVal.id, testReturn.id);
    assert.equal(retVal.endpointName, testReturn.endpointName);
  });

  it("getEventRoute rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].eventRoutes, "getById").rejects(testError);
    await testClient.getEventRoute(testEventRouteId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("upsertEventRoute calls the add method with eventRouteId on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].eventRoutes, "add");
    testClient.upsertEventRoute(testEventRouteId, testJsonString);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId));
  });

  it("upsertEventRoute calls the add method with eventRouteId and converted options on the generated client", function() {
    const requestOptionBase: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );
    const expectedOptions: EventRoutesAddOptionalParams = requestOptionBase;
    const eventRoute: EventRoute = {
      endpointName: testEndpointName,
      filter: testFilter
    };
    expectedOptions.eventRoute = eventRoute;

    const stub = sinon.stub(testClient["client"].eventRoutes, "add");
    testClient.upsertEventRoute(testEventRouteId, testEndpointName, testFilter, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId, expectedOptions));
  });

  it("upsertEventRoute returns a promise of the generated code return value", async () => {
    const testReturn = {
      etag: "return_etag",
      body: "return_body"
    };
    sinon.stub(testClient["client"].eventRoutes, "add").resolves(testReturn);
    const retVal = await testClient.upsertEventRoute(testEventRouteId, testEndpointName);
    assert.equal(retVal.etag, testReturn.etag);
    assert.equal(retVal.body, testReturn.body);
  });

  it("upsertEventRoute rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].eventRoutes, "add").rejects(testError);
    await testClient.upsertEventRoute(testEventRouteId, testEndpointName).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("deleteEventRoute calls the deleteMethod method with eventRouteId and converted options on the generated client", function() {
    const expectedOptions: RequestOptionsBase = operationOptionsToRequestOptionsBase(
      operationOptions
    );

    const stub = sinon.stub(testClient["client"].eventRoutes, "deleteMethod");
    testClient.deleteEventRoute(testEventRouteId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId, expectedOptions));
  });

  it("deleteEventRoute returns a promise of the generated code return value", async () => {
    const testReturn = [
      {
        id: "return_id",
        model: "return_model"
      }
    ];
    sinon.stub(testClient["client"].eventRoutes, "deleteMethod").resolves(testReturn);
    const retVal = await testClient.deleteEventRoute(testEventRouteId);
    assert.equal(retVal[0].id, testReturn[0].id);
    assert.equal(retVal[0].model, testReturn[0].model);
  });

  it("deleteEventRoute rejects the promise if the generated code rejects it", async () => {
    const testError = new Error("Promise Rejected");
    sinon.stub(testClient["client"].eventRoutes, "deleteMethod").rejects(testError);
    await testClient.deleteEventRoute(testEventRouteId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });
});
