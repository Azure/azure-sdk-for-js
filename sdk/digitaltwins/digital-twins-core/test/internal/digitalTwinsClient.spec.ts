// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, expect } from "chai";
import * as sinon from "sinon";
import {
  TokenCredential,
  OperationOptions,
  HttpOperationResponse,
  HttpResponse,
  WebResource,
  HttpHeaders,
} from "@azure/core-http";
import {
  DigitalTwinsUpdateOptionalParams,
  DigitalTwinsDeleteOptionalParams,
  DigitalTwinsUpdateComponentOptionalParams,
  DigitalTwinsAddRelationshipOptionalParams,
  DigitalTwinsUpdateRelationshipOptionalParams,
  DigitalTwinsDeleteRelationshipOptionalParams,
  DigitalTwinModelsGetByIdOptionalParams,
  DigitalTwinModelsAddOptionalParams,
  EventRoute,
  EventRoutesAddOptionalParams,
  EventRoutesDeleteOptionalParams,
  EventRoutesGetByIdOptionalParams,
  DigitalTwinModelsDeleteOptionalParams,
  DigitalTwinModelsUpdateOptionalParams,
  DigitalTwinsGetRelationshipByIdOptionalParams,
  DigitalTwinsGetComponentOptionalParams,
  DigitalTwinsAddOptionalParams,
  DigitalTwinsGetByIdOptionalParams,
} from "../../src/generated/models";
import { DigitalTwinsClient } from "../../src/index";
import { createSpan } from "../../src/tracing";
import { getSpanContext } from "@azure/core-tracing";

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
  let testIfMatch: string;
  let testDefaultOperationalResponse: HttpOperationResponse;
  let testDefaultResponse: HttpResponse;
  let testBody: any;
  let testHeaders: any;
  let testError: Error;
  let decommissionPatch: any[];

  beforeEach(async function () {
    operationOptions = {
      requestOptions: {
        customHeaders: { ["x-ms-parameter-location"]: "client" },
        timeout: 42,
      },
    };
    url = "https://aaa.xxx.azure.net";
    tokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    testFilter = "*.*";
    testIfMatch = "test_ifmatch";
    testEndpointName = "test_endpoint_name";
    testDefaultOperationalResponse = {
      status: 200,
      request: new WebResource(),
      headers: new HttpHeaders(),
    };
    testDefaultResponse = {
      status: 200,
      request: new WebResource(),
      headers: new HttpHeaders(),
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
    testBody = "test_body";
    testHeaders = {
      etag: testIfMatch,
    };
    testError = new Error("Promise Rejected");
    decommissionPatch = [{ op: "replace", path: "/decommissioned", value: true }];
  });

  it(`Constructor creates an instance of the DigitalTwinsClient`, function () {
    assert.instanceOf(testClient, DigitalTwinsClient);
  });

  it("getDigitalTwin calls the getById method with twinId on the generated client if there is no option defined", function () {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getById");
    const digitalTwinsGetByIdOptionalParams: DigitalTwinsGetByIdOptionalParams = {};
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-getDigitalTwin",
      digitalTwinsGetByIdOptionalParams
    );
    testClient.getDigitalTwin(testTwinId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, operationOptionsSinonMatcher(updatedOptions)));
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("getDigitalTwin calls the getById method with twinId and converted options on the generated client", function () {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getById");
    const digitalTwinsGetByIdOptionalParams: DigitalTwinsGetByIdOptionalParams = operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-getDigitalTwin",
      digitalTwinsGetByIdOptionalParams
    );
    testClient.getDigitalTwin(testTwinId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, operationOptionsSinonMatcher(updatedOptions)));
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("getDigitalTwin returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testBody + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "getById").resolves(testReturn);
    const retVal = await testClient.getDigitalTwin(testTwinId);
    assert.deepEqual(retVal, testReturn);
  });

  it("getDigitalTwin rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "getById").rejects(testError);
    await testClient.getDigitalTwin(testTwinId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("upsertDigitalTwin calls the add method with twinId and twinJson on the generated client if there is no option defined", function () {
    const stub = sinon.stub(testClient["client"].digitalTwins, "add");
    const digitalTwinsAddOptionalParams: DigitalTwinsAddOptionalParams = {};
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-upsertDigitalTwin",
      digitalTwinsAddOptionalParams
    );
    testClient.upsertDigitalTwin(testTwinId, JSON.stringify(testJsonString));
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(testTwinId, testJsonString, operationOptionsSinonMatcher(updatedOptions))
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("upsertDigitalTwin returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testBody + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "add").resolves(testReturn);
    const retVal = await testClient.upsertDigitalTwin(testTwinId, JSON.stringify(testJsonString));
    assert.deepEqual(retVal, testReturn);
  });

  it("upsertDigitalTwin rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "add").rejects(testError);
    await testClient
      .upsertDigitalTwin(testTwinId, JSON.stringify(testJsonString))
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("updateDigitalTwin calls the update method with twinId, jsonPatch and converted options on the generated client", function () {
    const digitalTwinsUpdateOptionalParams: DigitalTwinsUpdateOptionalParams = operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-updateDigitalTwin",
      digitalTwinsUpdateOptionalParams
    );
    const stub = sinon.stub(testClient["client"].digitalTwins, "update");
    testClient.updateDigitalTwin(testTwinId, testJsonPatch, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(testTwinId, testJsonPatch, operationOptionsSinonMatcher(updatedOptions))
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("updateDigitalTwin returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "update").resolves(testReturn);
    const retVal = await testClient.updateDigitalTwin(testTwinId, testJsonString);
    assert.deepEqual(retVal, testReturn);
  });

  it("updateDigitalTwin rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "update").rejects(testError);
    await testClient.updateDigitalTwin(testTwinId, testJsonString).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("deleteDigitalTwin calls the deleteMethod method with twinId and converted options on the generated client", function () {
    const digitalTwinsDeleteOptionalParams: DigitalTwinsDeleteOptionalParams = operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-deleteDigitalTwin",
      digitalTwinsDeleteOptionalParams
    );
    const stub = sinon.stub(testClient["client"].digitalTwins, "delete");
    testClient.deleteDigitalTwin(testTwinId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, operationOptionsSinonMatcher(updatedOptions)));
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("deleteDigitalTwin returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse,
    };
    sinon.stub(testClient["client"].digitalTwins, "delete").resolves(testReturn);
    const retVal = await testClient.deleteDigitalTwin(testTwinId);
    assert.deepEqual(retVal, testReturn);
  });

  it("deleteDigitalTwin rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "delete").rejects(testError);
    await testClient.deleteDigitalTwin(testTwinId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("getComponent calls the getComponent method with twinId, componentPath and converted options on the generated client", function () {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getComponent");
    const digitalTwinsGetComponentOptionalParams: DigitalTwinsGetComponentOptionalParams =
      operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-getComponent",
      digitalTwinsGetComponentOptionalParams
    );
    testClient.getComponent(testTwinId, testComponentPath, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(testTwinId, testComponentPath, operationOptionsSinonMatcher(updatedOptions))
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("getComponent returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testBody + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "getComponent").resolves(testReturn);
    const retVal = await testClient.getComponent(testTwinId, testComponentPath);
    assert.deepEqual(retVal, testReturn);
  });

  it("getComponent rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "getComponent").rejects(testError);
    await testClient.getComponent(testTwinId, testComponentPath).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("updateComponent calls the updateComponent method with twinId, componentPath, jsonPatch and converted options on the generated client", function () {
    const digitalTwinsUpdateComponentOptionalParams: DigitalTwinsUpdateComponentOptionalParams =
      operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-updateComponent",
      digitalTwinsUpdateComponentOptionalParams
    );
    const stub = sinon.stub(testClient["client"].digitalTwins, "updateComponent");
    testClient.updateComponent(testTwinId, testComponentPath, testJsonPatch, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(
        testTwinId,
        testComponentPath,
        testJsonPatch,
        operationOptionsSinonMatcher(updatedOptions)
      )
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("updateComponent returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "updateComponent").resolves(testReturn);
    const retVal = await testClient.updateComponent(testTwinId, testComponentPath, testJsonPatch);
    assert.deepEqual(retVal, testReturn);
  });

  it("updateComponent rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "updateComponent").rejects(testError);
    await testClient
      .updateComponent(testTwinId, testComponentPath, testJsonPatch)
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("getRelationship calls the getRelationshipById method with twinId and relationshipId on the generated client if there is no option defined", function () {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getRelationshipById");
    const digitalTwinsGetRelationshipByIdOptionalParams: DigitalTwinsGetRelationshipByIdOptionalParams =
      {};
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-getRelationship",
      digitalTwinsGetRelationshipByIdOptionalParams
    );
    testClient.getRelationship(testTwinId, testRelationshipId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(testTwinId, testRelationshipId, operationOptionsSinonMatcher(updatedOptions))
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("getRelationship calls the getRelationshipById method with twinId, relationshipId and options on the generated client", function () {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getRelationshipById");
    const digitalTwinsGetRelationshipByIdOptionalParams: DigitalTwinsGetRelationshipByIdOptionalParams =
      operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-getRelationship",
      digitalTwinsGetRelationshipByIdOptionalParams
    );
    testClient.getRelationship(testTwinId, testRelationshipId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(testTwinId, testRelationshipId, operationOptionsSinonMatcher(updatedOptions))
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("getRelationship returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testBody + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "getRelationshipById").resolves(testReturn);
    const retVal = await testClient.getRelationship(testTwinId, testRelationshipId);
    assert.deepEqual(retVal, testReturn);
  });

  it("getRelationship rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "getRelationshipById").rejects(testError);
    await testClient.getRelationship(testTwinId, testRelationshipId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("upsertRelationship calls the addRelationship method with twinId, relationshipId, relationshipJson and converted options on the generated client", function () {
    const stub = sinon.stub(testClient["client"].digitalTwins, "addRelationship");
    const digitalTwinsAddRelationshipOptionalParams: DigitalTwinsAddRelationshipOptionalParams =
      operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-upsertRelationship",
      digitalTwinsAddRelationshipOptionalParams
    );
    testClient.upsertRelationship(testTwinId, testRelationshipId, testJsonString, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(
        testTwinId,
        testRelationshipId,
        testJsonString,
        operationOptionsSinonMatcher(updatedOptions)
      )
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("upsertRelationship returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testBody + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "addRelationship").resolves(testReturn);
    const retVal = await testClient.upsertRelationship(
      testTwinId,
      testRelationshipId,
      testJsonString
    );
    assert.deepEqual(retVal, testReturn);
  });

  it("upsertRelationship rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "addRelationship").rejects(testError);
    await testClient
      .upsertRelationship(testTwinId, testRelationshipId, testJsonPatch)
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("updateRelationship calls the updateRelationship method with twinId, jsonPatch and converted options on the generated client", function () {
    const digitalTwinsUpdateRelationshipOptionalParams: DigitalTwinsUpdateRelationshipOptionalParams =
      operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-updateRelationship",
      digitalTwinsUpdateRelationshipOptionalParams
    );
    const stub = sinon.stub(testClient["client"].digitalTwins, "updateRelationship");
    testClient.updateRelationship(testTwinId, testRelationshipId, testJsonPatch, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(
        testTwinId,
        testRelationshipId,
        testJsonPatch,
        operationOptionsSinonMatcher(updatedOptions)
      )
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("updateRelationship returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "updateRelationship").resolves(testReturn);
    const retVal = await testClient.updateRelationship(
      testTwinId,
      testRelationshipId,
      testJsonPatch
    );
    assert.deepEqual(retVal, testReturn);
  });

  it("updateRelationship rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "updateRelationship").rejects(testError);
    await testClient
      .updateRelationship(testTwinId, testRelationshipId, testJsonPatch)
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("deleteRelationship calls the deleteRelationship method with twinId, relationshipId and converted options on the generated client", function () {
    const digitalTwinsDeleteRelationshipOptionalParams: DigitalTwinsDeleteRelationshipOptionalParams =
      operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-deleteRelationship",
      digitalTwinsDeleteRelationshipOptionalParams
    );
    const stub = sinon.stub(testClient["client"].digitalTwins, "deleteRelationship");
    testClient.deleteRelationship(testTwinId, testRelationshipId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(testTwinId, testRelationshipId, operationOptionsSinonMatcher(updatedOptions))
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("deleteRelationship returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse,
    };
    sinon.stub(testClient["client"].digitalTwins, "deleteRelationship").resolves(testReturn);
    const retVal = await testClient.deleteRelationship(testTwinId, testRelationshipId);
    assert.deepEqual(retVal, testReturn);
  });

  it("deleteRelationship rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "deleteRelationship").rejects(testError);
    await testClient.deleteRelationship(testTwinId, testRelationshipId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("publishTelemetry returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse,
    };
    sinon.stub(testClient["client"].digitalTwins, "sendTelemetry").resolves(testReturn);
    const retVal = await testClient.publishTelemetry(testTwinId, testPayload, testMessageId);
    assert.deepEqual(retVal, testReturn);
  });

  it("publishTelemetry rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "sendTelemetry").rejects(testError);
    await testClient.publishTelemetry(testTwinId, testPayload, testMessageId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("publishComponentTelemetry returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse,
    };
    sinon.stub(testClient["client"].digitalTwins, "sendComponentTelemetry").resolves(testReturn);
    const retVal = await testClient.publishComponentTelemetry(
      testTwinId,
      testComponentPath,
      testPayload,
      testMessageId
    );
    assert.deepEqual(retVal, testReturn);
  });

  it("publishComponentTelemetry rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "sendComponentTelemetry").rejects(testError);
    await testClient
      .publishComponentTelemetry(testTwinId, testComponentPath, testPayload, testMessageId)
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("getModel calls the getById method with twinId and converted options on the generated client", function () {
    const includeModelDefinition: boolean = true;
    const digitalTwinModelsGetByIdOptionalParams: DigitalTwinModelsGetByIdOptionalParams =
      operationOptions;
    digitalTwinModelsGetByIdOptionalParams.includeModelDefinition = includeModelDefinition;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-getModel",
      digitalTwinModelsGetByIdOptionalParams
    );

    const stub = sinon.stub(testClient["client"].digitalTwinModels, "getById");
    testClient.getModel(
      testModelId,
      includeModelDefinition,
      digitalTwinModelsGetByIdOptionalParams
    );
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testModelId, operationOptionsSinonMatcher(updatedOptions)));
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("getModel rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwinModels, "getById").rejects(testError);
    await testClient.getModel(testModelId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("createModels calls the add method with converted options on the generated client", function () {
    const stub = sinon.stub(testClient["client"].digitalTwinModels, "add");
    const digitalTwinModelsAddOptionalParams: DigitalTwinModelsAddOptionalParams = operationOptions;
    digitalTwinModelsAddOptionalParams.models = testModels;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-createModels",
      digitalTwinModelsAddOptionalParams
    );
    testClient.createModels(testModels, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(operationOptionsSinonMatcher(updatedOptions)));
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("createModels rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwinModels, "add").rejects(testError);
    await testClient.createModels(testModels).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("decomissionModel calls the update method with modelId, patchJson and options on the generated client", function () {
    const stub = sinon.stub(testClient["client"].digitalTwinModels, "update");
    const digitalTwinModelsUpdateOptionalParams: DigitalTwinModelsUpdateOptionalParams =
      operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-decomissionModel",
      digitalTwinModelsUpdateOptionalParams
    );
    testClient.decomissionModel(testModelId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(
      stub.calledWith(testModelId, decommissionPatch, operationOptionsSinonMatcher(updatedOptions))
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("decomissionModel returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse,
    };
    sinon.stub(testClient["client"].digitalTwinModels, "update").resolves(testReturn);
    const retVal = await testClient.decomissionModel(testModelId);
    assert.deepEqual(retVal, testReturn);
  });

  it("decomissionModel rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwinModels, "update").rejects(testError);
    await testClient.decomissionModel(testModelId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("deleteModel calls the deleteMethod method with modelId and options on the generated client", function () {
    const stub = sinon.stub(testClient["client"].digitalTwinModels, "delete");
    const digitalTwinModelsDeleteOptionalParams: DigitalTwinModelsDeleteOptionalParams =
      operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-deleteModel",
      digitalTwinModelsDeleteOptionalParams
    );
    testClient.deleteModel(testModelId, updatedOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testModelId, operationOptionsSinonMatcher(updatedOptions)));
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("deleteModel returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse,
    };
    sinon.stub(testClient["client"].digitalTwinModels, "delete").resolves(testReturn);
    const retVal = await testClient.deleteModel(testModelId);
    assert.deepEqual(retVal, testReturn);
  });

  it("deleteModel rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwinModels, "delete").rejects(testError);
    await testClient.deleteModel(testModelId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("getEventRoute calls the getById method with modelId on the generated client if there is no option defined", function () {
    const stub = sinon.stub(testClient["client"].eventRoutes, "getById");
    testClient.getEventRoute(testEventRouteId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId));
  });

  it("getEventRoute calls the getById method with twinId and converted options on the generated client", function () {
    const stub = sinon.stub(testClient["client"].eventRoutes, "getById");
    const eventRoutesGetByIdOptionalParams: EventRoutesGetByIdOptionalParams = operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-getEventRoute",
      eventRoutesGetByIdOptionalParams
    );

    testClient.getEventRoute(testEventRouteId, updatedOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId, operationOptionsSinonMatcher(updatedOptions)));
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("getEventRoute rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].eventRoutes, "getById").rejects(testError);
    await testClient.getEventRoute(testEventRouteId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("upsertEventRoute calls the add method with eventRouteId on the generated client if there is no option defined", function () {
    const stub = sinon.stub(testClient["client"].eventRoutes, "add");
    testClient.upsertEventRoute(testEventRouteId, testJsonString, "");
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId));
  });

  it("upsertEventRoute calls the add method with eventRouteId and converted options on the generated client", function () {
    const eventRoutesAddOptionalParams: EventRoutesAddOptionalParams = operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-upsertEventRoute",
      eventRoutesAddOptionalParams
    );
    const eventRoute: EventRoute = {
      endpointName: testEndpointName,
      filter: testFilter,
    };
    updatedOptions.eventRoute = eventRoute;

    const stub = sinon.stub(testClient["client"].eventRoutes, "add");
    testClient.upsertEventRoute(testEventRouteId, testEndpointName, testFilter, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId, operationOptionsSinonMatcher(updatedOptions)));
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("upsertEventRoute returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testBody + testDefaultOperationalResponse;
    sinon.stub(testClient["client"].eventRoutes, "add").resolves(testReturn);
    const retVal = await testClient.upsertEventRoute(
      testEventRouteId,
      testEndpointName,
      testFilter
    );
    assert.deepEqual(retVal, testReturn);
  });

  it("upsertEventRoute rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].eventRoutes, "add").rejects(testError);
    await testClient
      .upsertEventRoute(testEventRouteId, testEndpointName, testFilter)
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("deleteEventRoute calls the deleteMethod method with eventRouteId and options on the generated client", function () {
    const stub = sinon.stub(testClient["client"].eventRoutes, "delete");
    const eventRoutesDeleteOptionalParams: EventRoutesDeleteOptionalParams = operationOptions;
    const { span, updatedOptions } = createSpan(
      "DigitalTwinsClient-deleteEventRoute",
      eventRoutesDeleteOptionalParams
    );

    testClient.deleteEventRoute(testEventRouteId, operationOptions);
    assert.isTrue(stub.calledOnce, "deleteStub should be called once");
    assert.isTrue(
      stub.calledWith(testEventRouteId, operationOptionsSinonMatcher(updatedOptions)),
      "deleteStub should be called with proper route ID and updatedOptions"
    );
    assert.isNotNull(updatedOptions);
    assert.isNotNull(span);
  });

  it("deleteEventRoute returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse,
    };
    sinon.stub(testClient["client"].eventRoutes, "delete").resolves(testReturn);
    const retVal = await testClient.deleteEventRoute(testEventRouteId);
    assert.deepEqual(retVal, testReturn);
  });

  it("deleteEventRoute rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].eventRoutes, "delete").rejects(testError);
    await testClient.deleteEventRoute(testEventRouteId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });
});

/**
 * The tests in this suite check that the created options match what createSpan() would create
 * when properly parenting and propagating options.
 *
 * This is slightly trickier with later versions of OpenTelemetry where the created `context`
 * instances are not guaranteed to be comparable even if they are logically the same. So this
 * matcher does the comparisons needed and still maintain sinon.calledWith() compatibility.
 */
function operationOptionsSinonMatcher<T extends OperationOptions>(
  _expectedOptions: T
): ReturnType<typeof sinon.match> {
  return sinon.match((actualOptions: T) => {
    const expectedContext = _expectedOptions!.tracingOptions!.tracingContext!;

    assert.deepEqual(
      getSpanContext(expectedContext),
      getSpanContext(actualOptions.tracingOptions!.tracingContext!)
    );

    // check all the other properties that aren't interestingly unique
    const expectedOptions = {
      ..._expectedOptions,
      tracingOptions: {
        ..._expectedOptions.tracingOptions,
        // we verified this above. Adding it in here just to make deep equal comparison
        // simpler.
        tracingContext: actualOptions.tracingOptions!.tracingContext,
      },
    };

    assert.deepEqual(expectedOptions, actualOptions);
    return true;
  });
}
