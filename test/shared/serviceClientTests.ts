import { ServiceClient, WebResource, Serializer, HttpOperationResponse, DictionaryMapper } from "../../lib/msRest";
import * as assert from "assert";

describe("ServiceClient", function () {
  it("should serialize headerCollectionPrefix", async function () {
    const expected = {
      "foo-bar-alpha": "hello",
      "foo-bar-beta": "world",
      "unrelated": "42"
    };

    // TODO: might make more sense to factor out a method in ServiceClient which returns the prepared request
    let request: WebResource;
    const client = new ServiceClient(undefined, {
      httpClient: {
        sendRequest: req => {
          request = req;
          return Promise.resolve({} as HttpOperationResponse);
        }
      },
      requestPolicyCreators: []
    });

    await client.sendOperationRequest(
      {
        arguments: {
          metadata: {
            "alpha": "hello",
            "beta": "world"
          },
          unrelated: 42
        }
      },
      {
        httpMethod: "GET",
        baseUrl: "httpbin.org",
        serializer: new Serializer(),
        headerParameters: [{
          parameterPath: "metadata",
          mapper: {
            serializedName: "metadata",
            type: {
              name: "Dictionary",
              value: {
                type: {
                  name: "String"
                }
              }
            },
            headerCollectionPrefix: "foo-bar-"
          } as DictionaryMapper
        }, {
          parameterPath: "unrelated",
          mapper: {
            serializedName: "unrelated",
            type: {
              name: "Number"
            }
          }
        }],
        responses: {
          200: {}
        }
      });

    assert(request!);
    assert.deepStrictEqual(request!.headers.toJson(), expected);
  });
});