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
  HttpHeaders
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
  EventRoutesAddOptionalParams
} from "../../src/generated/models";
import { DigitalTwinsClient } from "../../src/index";

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
  let testEtag: string;
  let testDefaultOperationalResponse: HttpOperationResponse;
  let testDefaultResponse: HttpResponse;
  let testBody: any;
  let testHeaders: any;
  let testError: Error;

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
    testFilter = "*.*";
    testEtag = "test_etag";
    testEndpointName = "test_endpoint_name";
    testDefaultOperationalResponse = {
      status: 200,
      request: new WebResource(),
      headers: new HttpHeaders()
    };
    testDefaultResponse = {
      status: 200,
      request: new WebResource(),
      headers: new HttpHeaders()
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
      etag: testEtag
    };
    testError = new Error("Promise Rejected");
  });

  it(`Constructor creates an instance of the DigitalTwinsClient`, function() {
    assert.instanceOf(testClient, DigitalTwinsClient);
  });

  it("getDigitalTwin calls the getById method with twinId on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getById");
    testClient.getDigitalTwin(testTwinId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, {}));
  });

  it("getDigitalTwin calls the getById method with twinId and converted options on the generated client", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getById");
    testClient.getDigitalTwin(testTwinId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, operationOptions));
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

  it("upsertDigitalTwin calls the add method with twinId and twinJson on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "add");
    testClient.upsertDigitalTwin(testTwinId, testJsonString);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testJsonString, {}));
  });

  it("upsertDigitalTwin calls the add method with twinId, twinJson and options", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "add");
    testClient.upsertDigitalTwin(testTwinId, testJsonString, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testJsonString, operationOptions));
  });

  it("upsertDigitalTwin returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testBody + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "add").resolves(testReturn);
    const retVal = await testClient.upsertDigitalTwin(testTwinId, testJsonString);
    assert.deepEqual(retVal, testReturn);
  });

  it("upsertDigitalTwin rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "add").rejects(testError);
    await testClient.upsertDigitalTwin(testTwinId, testJsonString).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("updateDigitalTwin calls the update method with twinId, jsonPatch and converted options on the generated client", function() {
    const expectedOptions: DigitalTwinsUpdateOptionalParams = operationOptions;
    expectedOptions.ifMatch = testEtag;
    const stub = sinon.stub(testClient["client"].digitalTwins, "update");
    testClient.updateDigitalTwin(testTwinId, testJsonPatch, testEtag, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testJsonPatch, expectedOptions));
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

  it("deleteDigitalTwin calls the deleteMethod method with twinId and converted options on the generated client", function() {
    const expectedOptions: DigitalTwinsDeleteOptionalParams = operationOptions;
    expectedOptions.ifMatch = testEtag;
    const stub = sinon.stub(testClient["client"].digitalTwins, "delete");
    testClient.deleteDigitalTwin(testTwinId, testEtag, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, expectedOptions));
  });

  it("deleteDigitalTwin returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse
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

  it("getComponent calls the getComponent method with twinId, componentPath and converted options on the generated client", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getComponent");
    testClient.getComponent(testTwinId, testComponentPath, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testComponentPath, operationOptions));
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

  it("updateComponent calls the updateComponent method with twinId, componentPath, jsonPatch and converted options on the generated client", function() {
    const expectedOptions: DigitalTwinsUpdateComponentOptionalParams = operationOptions;
    expectedOptions.ifMatch = testEtag;
    expectedOptions.patchDocument = testJsonPatch;

    const stub = sinon.stub(testClient["client"].digitalTwins, "updateComponent");
    testClient.updateComponent(
      testTwinId,
      testComponentPath,
      testJsonPatch,
      testEtag,
      operationOptions
    );
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testComponentPath, expectedOptions));
  });

  it("updateComponent returns a promise of the generated code return value", async () => {
    const testReturn = testHeaders + testDefaultResponse;
    sinon.stub(testClient["client"].digitalTwins, "updateComponent").resolves(testReturn);
    const retVal = await testClient.updateComponent(testTwinId, testComponentPath);
    assert.deepEqual(retVal, testReturn);
  });

  it("updateComponent rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "updateComponent").rejects(testError);
    await testClient.updateComponent(testTwinId, testComponentPath).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("getRelationship calls the getRelationshipById method with twinId and relationshipId on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getRelationshipById");
    testClient.getRelationship(testTwinId, testRelationshipId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, {}));
  });

  it("getRelationship calls the getRelationshipById method with twinId, relationshipId and options on the generated client", function() {
    const stub = sinon.stub(testClient["client"].digitalTwins, "getRelationshipById");
    testClient.getRelationship(testTwinId, testRelationshipId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, operationOptions));
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

  it("upsertRelationship calls the addRelationship method with twinId, relationshipId, relationshipJson and converted options on the generated client", function() {
    const expectedOptions: DigitalTwinsAddRelationshipOptionalParams = operationOptions;
    expectedOptions.relationship = testJsonString;
    const stub = sinon.stub(testClient["client"].digitalTwins, "addRelationship");
    testClient.upsertRelationship(testTwinId, testRelationshipId, testJsonString, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, expectedOptions));
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

  it("updateRelationship calls the updateRelationship method with twinId, jsonPatch and converted options on the generated client", function() {
    const expectedOptions: DigitalTwinsUpdateRelationshipOptionalParams = operationOptions;
    expectedOptions.ifMatch = testEtag;
    expectedOptions.patchDocument = testJsonPatch;

    const stub = sinon.stub(testClient["client"].digitalTwins, "updateRelationship");
    testClient.updateRelationship(
      testTwinId,
      testRelationshipId,
      testJsonPatch,
      testEtag,
      operationOptions
    );
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, expectedOptions));
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

  it("deleteRelationship calls the deleteRelationship method with twinId, relationshipId and converted options on the generated client", function() {
    const expectedOptions: DigitalTwinsDeleteRelationshipOptionalParams = operationOptions;
    expectedOptions.ifMatch = testEtag;

    const stub = sinon.stub(testClient["client"].digitalTwins, "deleteRelationship");
    testClient.deleteRelationship(testTwinId, testRelationshipId, testEtag, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testTwinId, testRelationshipId, expectedOptions));
  });

  it("deleteRelationship returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse
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
      _response: testDefaultOperationalResponse
    };
    sinon.stub(testClient["client"].digitalTwins, "sendTelemetry").resolves(testReturn);
    const retVal = await testClient.publishTelemetry(testTwinId, testPayload, testMessageId);
    assert.deepEqual(retVal, testReturn);
  });

  it("publishTelemetry rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwins, "sendTelemetry").rejects(testError);
    await testClient.publishTelemetry(testTwinId, testPayload).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("publishComponentTelemetry returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse
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
      .publishComponentTelemetry(testTwinId, testComponentPath, testPayload)
      .catch((error) => {
        expect(error.message).to.equal("Promise Rejected");
      });
  });

  it("getModel calls the getById method with twinId and converted options on the generated client", function() {
    const includeModelDefinition: boolean = true;
    const expectedOptions: DigitalTwinModelsGetByIdOptionalParams = operationOptions;
    expectedOptions.includeModelDefinition = includeModelDefinition;

    const stub = sinon.stub(testClient["client"].digitalTwinModels, "getById");
    testClient.getModel(testModelId, includeModelDefinition, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testModelId, expectedOptions));
  });

  it("getModel rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwinModels, "getById").rejects(testError);
    await testClient.getModel(testModelId).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("createModels calls the add method with converted options on the generated client", function() {
    const stub = sinon.stub(testClient["client"].digitalTwinModels, "add");
    const expectedOptions: DigitalTwinModelsAddOptionalParams = {};
    expectedOptions.models = testModels;
    testClient.createModels(testModels);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(expectedOptions));
  });

  it("createModels rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwinModels, "add").rejects(testError);
    await testClient.createModels(testModels).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("decomissionModel calls the update method with modelId, patchJson and options on the generated client", function() {
    const stub = sinon.stub(testClient["client"].digitalTwinModels, "update");
    testClient.decomissionModel(testModelId, testJsonPatch, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testModelId, testJsonPatch, operationOptions));
  });

  it("decomissionModel returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse
    };
    sinon.stub(testClient["client"].digitalTwinModels, "update").resolves(testReturn);
    const retVal = await testClient.decomissionModel(testModelId, testJsonPatch);
    assert.deepEqual(retVal, testReturn);
  });

  it("decomissionModel rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].digitalTwinModels, "update").rejects(testError);
    await testClient.decomissionModel(testModelId, testJsonPatch).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("deleteModel calls the deleteMethod method with modelId and options on the generated client", function() {
    const stub = sinon.stub(testClient["client"].digitalTwinModels, "delete");
    testClient.deleteModel(testModelId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testModelId, operationOptions));
  });

  it("deleteModel returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse
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

  it("getEventRoute calls the getById method with modelId on the generated client if there is no option defined", function() {
    const stub = sinon.stub(testClient["client"].eventRoutes, "getById");
    testClient.getEventRoute(testEventRouteId);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId));
  });

  it("getEventRoute calls the getById method with twinId and converted options on the generated client", function() {
    const stub = sinon.stub(testClient["client"].eventRoutes, "getById");
    testClient.getEventRoute(testEventRouteId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId, operationOptions));
  });

  it("getEventRoute rejects the promise if the generated code rejects it", async () => {
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
    const expectedOptions: EventRoutesAddOptionalParams = operationOptions;
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
    const testReturn = testHeaders + testBody + testDefaultOperationalResponse;
    sinon.stub(testClient["client"].eventRoutes, "add").resolves(testReturn);
    const retVal = await testClient.upsertEventRoute(testEventRouteId, testEndpointName);
    assert.deepEqual(retVal, testReturn);
  });

  it("upsertEventRoute rejects the promise if the generated code rejects it", async () => {
    sinon.stub(testClient["client"].eventRoutes, "add").rejects(testError);
    await testClient.upsertEventRoute(testEventRouteId, testEndpointName).catch((error) => {
      expect(error.message).to.equal("Promise Rejected");
    });
  });

  it("deleteEventRoute calls the deleteMethod method with eventRouteId and options on the generated client", function() {
    const stub = sinon.stub(testClient["client"].eventRoutes, "delete");
    testClient.deleteEventRoute(testEventRouteId, operationOptions);
    assert.isTrue(stub.calledOnce);
    assert.isTrue(stub.calledWith(testEventRouteId, operationOptions));
  });

  it("deleteEventRoute returns a promise of the generated code return value", async () => {
    const testReturn = {
      _response: testDefaultOperationalResponse
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
