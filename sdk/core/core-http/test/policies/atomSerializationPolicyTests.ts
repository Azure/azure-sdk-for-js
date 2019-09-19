// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { HttpHeaders } from "../../lib/httpHeaders";
import { HttpOperationResponse } from "../../lib/httpOperationResponse";
import {
  HttpClient,
  AtomXmlOperationSpec,
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest
} from "../../lib/coreHttp";
import { atomSerializationPolicy } from "../../lib/policies/atomSerializationPolicy";
import { RequestPolicyOptions } from "../../lib/policies/requestPolicy";
import { WebResource } from "../../lib/webResource";

describe("atomSerializationPolicy", function() {
  it("should return an error if receiving a non-XML response body", async function() {
    const request: WebResource = createRequest({
      serializer: new MockSerializer()
    });
    const mockClient: HttpClient = {
      sendRequest: (req) =>
        Promise.resolve({
          request: req,
          status: 200,
          headers: new HttpHeaders({ "Content-Type": "application/json" }),
          bodyAsText: `{ "simple": "JSONobject" }`
        })
    };

    const policy = atomSerializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepEqual(response.bodyAsText, `{ "simple": "JSONobject" }`);
    assert.deepEqual(response.errorBody.code, "ResponseNotInAtomXMLFormat");
  });

  it("with xml response body, application/xml content-type and AtomXMLOperationSpec", async function() {
    const request: WebResource = createRequest({
      serializer: new MockSerializer()
    });

    const expectedResult = {
      entry: {
        author: {
          name: "servicebuslocalperftestspremium1"
        },
        content: {
          QueueDescription: {
            LockDuration: "PT2M",
            MaxSizeInMegabytes: "1024",
            QueueName: "testQueuePath4",
            _: {
              ContentRootElement: "QueueDescription",
              author: {
                name: "servicebuslocalperftestspremium1"
              },
              id:
                "https://servicebuslocalperftestspremium1.servicebus.windows.net/testQueuePath4?api-version=2017-04",
              title: "testQueuePath4"
            }
          }
        },
        id:
          "https://servicebuslocalperftestspremium1.servicebus.windows.net/testQueuePath4?api-version=2017-04",
        title: "testQueuePath4"
      }
    };

    const mockClient: HttpClient = {
      sendRequest: (req) =>
        Promise.resolve({
          request: req,
          status: 200,
          headers: new HttpHeaders({
            "content-type": "application/xml"
          }),
          bodyAsText: `<entry xmlns="http://www.w3.org/2005/Atom"><id>https://servicebuslocalperftestspremium1.servicebus.windows.net/testQueuePath4?api-version=2017-04</id><title type="text">testQueuePath4</title><author><name>servicebuslocalperftestspremium1</name></author><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT2M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes></QueueDescription></content></entry>`,
          parsedBody: `<entry xmlns="http://www.w3.org/2005/Atom"><id>https://servicebuslocalperftestspremium1.servicebus.windows.net/testQueuePath4?api-version=2017-04</id><title type="text">testQueuePath4</title><author><name>servicebuslocalperftestspremium1</name></author><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT2M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes></QueueDescription></content></entry>`
        })
    };

    const policy = atomSerializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepEqual(response.parsedBody.response.body, expectedResult);
  });
});

function createRequest(atomXmlOperationSpec?: AtomXmlOperationSpec): WebResource {
  const request = new WebResource();
  request.atomXmlOperationSpec = atomXmlOperationSpec;
  return request;
}

class MockSerializer implements AtomXmlSerializer {
  serialize(resource: any): string {
    const properties = ["LockDuration", "MaxSizeInMegabytes"];

    return serializeToAtomXmlRequest(
      "QueueDescription",
      resource,
      properties,
      "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"
    );
  }

  deserialize(response: HttpOperationResponse): any {
    return deserializeAtomXmlResponse(["QueueName"], response);
  }
}
