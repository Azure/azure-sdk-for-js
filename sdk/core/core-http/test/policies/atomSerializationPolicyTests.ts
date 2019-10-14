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
      serializer: new TestSerializer({
        entry: {
          $: {
            xmlns: "http://www.w3.org/2005/Atom"
          },
          author: { name: "dummy" },
          id: "https://dummy.servicebus.windows.net/dummy?api-version=2017-04",
          title: { $: { type: "text" }, _: "dummy" },
          content: {
            $: {
              type: "application/xml"
            },
            QueueDescription: {
              $: {
                xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
                "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance"
              },
              LockDuration: "PT3M",
              MaxSizeInMegabytes: "2048"
            }
          }
        }
      })
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
      assert.deepEqual(err.message.startsWith("ResponseNotInAtomXMLFormat"), true);
      assert.deepEqual(err.code, "PARSE_ERROR");
    }
  });

  it("should properly serialize when using valid inputs and serializer", async function() {
    const request: WebResource = createRequest({
      serializer: new TestSerializer({
        entry: {
          $: {
            xmlns: "http://www.w3.org/2005/Atom"
          },
          author: { name: "dummy" },
          id: "https://dummy.servicebus.windows.net/dummy?api-version=2017-04",
          title: { $: { type: "text" }, _: "dummy" },
          content: {
            $: {
              type: "application/xml"
            },
            QueueDescription: {
              $: {
                xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
                "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance"
              },
              LockDuration: "PT3M",
              MaxSizeInMegabytes: "2048"
            }
          }
        }
      })
    });

    const mockClient: HttpClient = {
      sendRequest: (req) =>
        Promise.resolve({
          request: req,
          status: 200,
          headers: new HttpHeaders({ "Content-Type": "application/xml" }),
          bodyAsText: `<entry xmlns="http://www.w3.org/2005/Atom"><id>https://dummy.servicebus.windows.net/dummy?api-version=2017-04</id><title type="text">dummy</title><author><name>dummy</name></author><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT3M</LockDuration><MaxSizeInMegabytes>2048</MaxSizeInMegabytes></QueueDescription></content></entry>`
        })
    };

    assert.equal(request.atomXmlOperationSpec == undefined, false);
    request.body = JSON.stringify({
      LockDuration: "PT3M",
      MaxSizeInMegabytes: "2048"
    });

    const policy = atomSerializationPolicy().create(mockClient, new RequestPolicyOptions());

    await policy.sendRequest(request);
    const expectedRequestBody =
      '<?xml version="1.0" encoding="utf-8" standalone="yes"?><entry xmlns="http://www.w3.org/2005/Atom"><updated>2019-10-02T00:55:40.280Z</updated><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"><LockDuration>PT2M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes></QueueDescription></content></entry>';

    const indexOfOpenUpdateTag = request.body.indexOf("<updated>");
    const indexOfCloseUpdateTag = request.body.indexOf("</updated>");
    assert.equal(
      request.body.substring(0, indexOfOpenUpdateTag),
      expectedRequestBody.substring(0, indexOfOpenUpdateTag),
      "Atom XML serialization failure"
    );
    assert.equal(
      request.body.substring(indexOfCloseUpdateTag),
      expectedRequestBody.substring(indexOfCloseUpdateTag),
      "Atom XML serialization failure"
    );
  });

  it("should deserialize properly with xml response body and given AtomXMLOperationSpec", async function() {
    const request: WebResource = createRequest({
      serializer: new TestSerializer({
        entry: {
          $: {
            xmlns: "http://www.w3.org/2005/Atom"
          },
          author: { name: "dummy" },
          id: "https://dummy.servicebus.windows.net/dummy?api-version=2017-04",
          title: { $: { type: "text" }, _: "dummy" },
          content: {
            $: {
              type: "application/xml"
            },
            QueueDescription: {
              $: {
                xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
                "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance"
              },
              LockDuration: "PT2M",
              MaxSizeInMegabytes: "1024"
            }
          }
        }
      })
    });

    const mockClient: HttpClient = {
      sendRequest: (req) =>
        Promise.resolve({
          request: req,
          status: 200,
          headers: new HttpHeaders({
            "content-type": "application/xml"
          }),
          bodyAsText: `<entry xmlns="http://www.w3.org/2005/Atom"><id>https://dummy.servicebus.windows.net/dummy?api-version=2017-04</id><title type="text">dummy</title><author><name>dummy</name></author><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT2M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes></QueueDescription></content></entry>`
        })
    };

    const policy = atomSerializationPolicy().create(mockClient, new RequestPolicyOptions());
    await policy.sendRequest(request);
  });
});

function createRequest(atomXmlOperationSpec?: AtomXmlOperationSpec): WebResource {
  const request = new WebResource();
  request.atomXmlOperationSpec = atomXmlOperationSpec;
  return request;
}

class TestSerializer implements AtomXmlSerializer {
  expectedParsedBody: any;
  constructor(parsedBody: any) {
    this.expectedParsedBody = parsedBody;
  }

  serialize(resource: any): object {
    const property1 = "LockDuration";
    const property2 = "MaxSizeInMegabytes";

    const serializedContent = this.expectedParsedBody.entry.content;
    serializedContent.entry.content.QueueDescription[property1] = resource[property1];
    serializedContent.entry.content.QueueDescription[property2] = resource[property2];

    return {
      entry: {
        $: {
          xmlns: "http://www.w3.org/2005/Atom"
        },
        updated: new Date().toISOString(),
        content: serializedContent
      }
    };
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    assert.deepEqual(response.parsedBody, this.expectedParsedBody);
    return response;
  }
}
