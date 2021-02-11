// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "chai/register-should";
import { RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { WebResource } from "../../src/webResource";
import { HttpHeaders } from "../../src/httpHeaders";
import {
  disableResponseDecompressionPolicy,
  DisableResponseDecompressionPolicy
} from "../../src/policies/disableResponseDecompressionPolicy";
import { HttpClient, ServiceClient, Serializer } from "../../src/coreHttp";

describe("DisableResponseDecompressionPolicy (browser)", function() {
  const emptyRequestPolicy = {
    sendRequest: (_: WebResource) =>
      Promise.resolve({
        request: new WebResource(),
        status: 404,
        headers: new HttpHeaders(undefined)
      })
  };

  const emptyPolicyOptions = new RequestPolicyOptions();

  describe("for browser", () => {
    it("should throw an Error while constructing object", () => {
      const construct = (): DisableResponseDecompressionPolicy =>
        new DisableResponseDecompressionPolicy(emptyRequestPolicy, emptyPolicyOptions);
      construct.should.throw();
    });

    it("should throw an Error while using the factory method", async () => {
      let request: WebResource;
      const httpClient: HttpClient = {
        sendRequest: (req) => {
          request = req;
          return Promise.resolve({
            request,
            status: 200,
            headers: new HttpHeaders(),
            bodyAsText: "[1,2,3]"
          });
        }
      };

      const client1 = new ServiceClient(undefined, {
        httpClient,
        requestPolicyFactories: [disableResponseDecompressionPolicy()]
      });

      try {
        await client1.sendOperationRequest(
          {},
          {
            serializer: new Serializer(),
            httpMethod: "GET",
            baseUrl: "httpbin.org",
            responses: {
              200: {
                bodyMapper: {
                  type: {
                    name: "Sequence",
                    element: {
                      type: {
                        name: "Number"
                      }
                    }
                  }
                }
              }
            }
          }
        );
        throw new Error("Error should have been thrown already.");
      } catch (err) {
        err.should.be.an("Error");
        (err as Error).message.should.equal(
          "DisableResponseDecompressionPolicy is not supported in browser environment"
        );
      }
    });
  });
});
