// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import {
  executeAtomXmlOperation,
  AtomXmlSerializer,
  deserializeAtomXmlResponse
} from "../src/util/atomXmlHelper";
import { ServiceBusAtomManagementClient } from "../src/serviceBusAtomManagementClient";

import { HttpOperationResponse, WebResource, HttpHeaders } from "@azure/core-http";

import * as dotenv from "dotenv";
dotenv.config();

const mockServiceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
  "Endpoint=dummy/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=dummy"
);

describe("atomSerializationPolicy #RunInBrowser", function() {
  it("should throw an error if receiving a non-XML response body", async function() {
    mockServiceBusAtomManagementClient.sendRequest = async () => {
      return {
        request,
        status: 200,
        headers: new HttpHeaders({}),
        bodyAsText: `{ hello: "this is a JSON response body" }`
      };
    };
    const request: WebResource = new WebResource("dummy", "PUT");
    request.body = JSON.stringify({ lockDuration: "PT3M", maxSizeInMegabytes: "2048" });
    const testSerializer = new DummySerializer();
    try {
      await executeAtomXmlOperation(mockServiceBusAtomManagementClient, request, testSerializer);
      assert.deepEqual(true, false, "Error must be thrown");
    } catch (err) {
      assert.deepEqual(
        err.message.startsWith(
          "Error occurred while parsing the response body - expected the service to return valid xml content."
        ),
        true,
        `"${err.message}" was expected to begin with "Error occurred while parsing the response body - expected the service to return valid xml content." `
      );
      assert.deepEqual(err.code, "PARSE_ERROR");
    }
  });

  it("should properly serialize when using valid inputs and serializer", async function() {
    const request: WebResource = new WebResource("dummy", "PUT");
    request.body = JSON.stringify({ lockDuration: "PT3M", maxSizeInMegabytes: "2048" });
    mockServiceBusAtomManagementClient.sendRequest = async () => {
      return {
        request,
        status: 200,
        headers: new HttpHeaders({})
      };
    };

    const testSerializer = new DummySerializer();

    await executeAtomXmlOperation(mockServiceBusAtomManagementClient, request, testSerializer);

    const expectedRequestBody = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><entry xmlns="http://www.w3.org/2005/Atom"><updated>2019-10-15T19:55:26.821Z</updated><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT3M</LockDuration><MaxSizeInMegabytes>2048</MaxSizeInMegabytes></QueueDescription></content></entry>`;

    const requestBody: string = request.body.toString();
    const indexOfOpenUpdateTag = requestBody.indexOf("<updated>");
    const indexOfCloseUpdateTag = requestBody.indexOf("</updated>");
    assert.equal(
      requestBody.substring(0, indexOfOpenUpdateTag),
      expectedRequestBody.substring(0, indexOfOpenUpdateTag),
      "Atom XML serialization failure"
    );
    assert.equal(
      requestBody.substring(indexOfCloseUpdateTag),
      expectedRequestBody.substring(indexOfCloseUpdateTag),
      "Atom XML serialization failure"
    );
  });
});

describe("deserializeAtomXmlResponse #RunInBrowser", function() {
  it("should throw an error if receiving a valid XML but invalid Atom XML", async function() {
    const request: WebResource = new WebResource("dummy", "GET");
    const _response = {
      request,
      status: 200,
      headers: new HttpHeaders({}),
      bodyAsText: null,
      parsedBody: { notAnEntry: "" }
    };

    try {
      await deserializeAtomXmlResponse(["QueueName"], _response);
      assert.deepEqual(true, false, "Error must be thrown");
    } catch (err) {
      assert.deepEqual(
        err.message,
        "Error occurred while parsing the response body - expected the service to return atom xml content with either feed or entry elements.",
        `"${err.message}" was expected to begin with "Error occurred while parsing the response body - expected the service to return atom xml content with either feed or entry elements." `
      );
      assert.deepEqual(err.code, "PARSE_ERROR");
    }
  });

  it("should throw appropriate error if unrecognized HTTP code is returned by service", async function() {
    const request: WebResource = new WebResource("dummy", "GET");
    const _response = {
      request,
      status: 666,
      headers: new HttpHeaders({}),
      bodyAsText: null,
      parsedBody: undefined
    };
    try {
      await deserializeAtomXmlResponse(["QueueName"], _response);
      assert.deepEqual(true, false, "Error must be thrown");
    } catch (err) {
      assert.equal(
        err.message,
        "Service returned an error response.",
        `Message expected to be "Service returned an error response." but received ${err.message}`
      );
      assert.deepEqual(
        err.code,
        "UnrecognizedHttpResponseStatus: 666",
        `Code expected to be "UnrecognizedHttpResponseStatus: 666" but received ${err.code}`
      );
    }
  });
});

class DummySerializer implements AtomXmlSerializer {
  serialize(resource: any): object {
    const property1 = "LockDuration";
    const property2 = "MaxSizeInMegabytes";

    const serializedContent = {
      $: {
        type: "application/xml"
      },
      QueueDescription: {
        $: {
          xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
          "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance"
        },
        LockDuration: "PT1M",
        MaxSizeInMegabytes: "1024"
      }
    };
    serializedContent.QueueDescription[property1] = resource["lockDuration"];
    serializedContent.QueueDescription[property2] = resource["maxSizeInMegabytes"];

    return {
      $: {
        xmlns: "http://www.w3.org/2005/Atom"
      },
      updated: new Date().toISOString(),
      content: serializedContent
    };
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return response;
  }
}
