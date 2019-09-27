// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { HttpHeaders } from "../../lib/httpHeaders";
import { HttpOperationResponse } from "../../lib/httpOperationResponse";
import { HttpClient, AtomXmlOperationSpec, AtomXmlSerializer } from "../../lib/coreHttp";
import { atomSerializationPolicy } from "../../lib/policies/atomSerializationPolicy";
import { RequestPolicyOptions } from "../../lib/policies/requestPolicy";
import { WebResource } from "../../lib/webResource";

describe("atomSerializationPolicy", function() {
  it("should throw an error if receiving a non-XML response body", async function() {
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
    try {
      await policy.sendRequest(request);
      assert.deepEqual(true, false, "Error must be thrown");
    } catch (err) {
      assert.deepEqual(err.message, "ResponseNotInAtomXMLFormat");
      assert.deepEqual(err.code, "PARSE_ERROR");
    }
  });

  it("with xml response body, application/xml content-type and AtomXMLOperationSpec", async function() {
    const request: WebResource = createRequest({
      serializer: new MockSerializer()
    });

    const expectedResult = {
      LockDuration: "PT2M",
      MaxSizeInMegabytes: "1024",
      _: {
        ContentRootElement: "QueueDescription",
        id:
          "https://servicebuslocalperftestspremium1.servicebus.windows.net/testQueuePath4?api-version=2017-04",
        title: "testQueuePath4",
        author: { name: "servicebuslocalperftestspremium1" }
      },
      QueueName: "testQueuePath4"
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
    assert.deepEqual(response.parsedBody, expectedResult);
  });
});

function createRequest(atomXmlOperationSpec?: AtomXmlOperationSpec): WebResource {
  const request = new WebResource();
  request.atomXmlOperationSpec = atomXmlOperationSpec;
  return request;
}

class MockSerializer implements AtomXmlSerializer {
  // @ts-ignore
  serialize(resource: any): string {
    return '<entry xmlns="http://www.w3.org/2005/Atom"><id>https://servicebuslocalperftestspremium1.servicebus.windows.net/testQueuePath4?api-version=2017-04</id><title type="text">testQueuePath4</title><author><name>servicebuslocalperftestspremium1</name></author><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT2M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes></QueueDescription></content></entry>';
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    const result = {
      request: {
        url: "",
        method: "GET",
        headers: { _headersMap: {} },
        withCredentials: false,
        timeout: 0,
        atomXmlOperationSpec: { serializer: {} }
      },
      status: 200,
      headers: {
        _headersMap: { "content-type": { name: "content-type", value: "application/xml" } }
      },
      bodyAsText:
        '<entry xmlns="http://www.w3.org/2005/Atom"><id>https://servicebuslocalperftestspremium1.servicebus.windows.net/testQueuePath4?api-version=2017-04</id><title type="text">testQueuePath4</title><author><name>servicebuslocalperftestspremium1</name></author><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT2M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes></QueueDescription></content></entry>',
      parsedBody: {
        LockDuration: "PT2M",
        MaxSizeInMegabytes: "1024",
        _: {
          ContentRootElement: "QueueDescription",
          id:
            "https://servicebuslocalperftestspremium1.servicebus.windows.net/testQueuePath4?api-version=2017-04",
          title: "testQueuePath4",
          author: { name: "servicebuslocalperftestspremium1" }
        },
        QueueName: "testQueuePath4"
      }
    };
    response.parsedBody = result.parsedBody;
    return new Promise((resolve) => {
      resolve(response);
    });
  }
}
