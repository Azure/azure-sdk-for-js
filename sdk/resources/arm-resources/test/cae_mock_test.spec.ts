import { TokenCredential } from "@azure/core-auth";
import { ResourceManagementClient } from "../src/resourceManagementClient.js";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { OperationRequest } from "@azure/core-client";
import { describe, it, assert } from "vitest";

describe("Mock test for CAE with ResourceManagementClient", () => {
  // this is not a real token, does not contain any sensitive info, just for test.
  // You could refer the check in core https://github.com/azure/azure-sdk-for-js/blob/57056dcef4d646fdca6f4af7bd5b2539c3cb57a2/sdk/core/core-rest-pipeline/src/policies/bearerTokenAuthenticationPolicy.ts#L375 to verify if your CAE challenge header is valid or not.
  const caeChallenge = `Bearer realm="", error_description="Continuous access evaluation resulted in challenge", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTcyNjI1ODEyMiJ9fX0=" `;
  // This header is invalid because the claims is empty
  const invalidCAEChallenge = `Bearer realm="", error_description="", error="insufficient_claims", claims=""`;
  it("should proceed CAE process for mgmt client if a valid CAE challenge", async () => {
    let getTokenCount = 0;
    const credential: TokenCredential = {
      getToken: async () => {
        getTokenCount++;
        let token = "testToken";
        if (getTokenCount === 1) {
          token = "firstToken";
        }
        return { token: token, expiresOnTimestamp: 11111 };
      },
    };

    let getRequestCount = 0;
    let request: OperationRequest;
    const client = new ResourceManagementClient(credential, "subscriptionID", {
      httpClient: {
        sendRequest: async (req) => {
          request = req;
          getRequestCount++;
          if (getRequestCount === 1) {
            return {
              request: req,
              status: 401,
              headers: createHttpHeaders({ "www-authenticate": caeChallenge }),
            };
          }
          return { request: req, status: 200, headers: createHttpHeaders() };
        },
      },
      credential,
    });

    const result = await client.operations.list();
    const items = [];
    for await (let item of result) {
      items.push(item);
    }
    assert.equal(items.length, 0);
    assert.equal(getRequestCount, 2);
    assert.equal(getTokenCount, 2);
    assert.deepEqual(request!.headers.get("authorization"), "Bearer testToken");
  });

  it("should not proceed CAE process for mgmt client if an invalid CAE challenge", async () => {
    let getTokenCount = 0;
    const credential: TokenCredential = {
      getToken: async () => {
        getTokenCount++;
        let token = "testToken";
        if (getTokenCount === 1) {
          token = "firstToken";
        }
        return { token: token, expiresOnTimestamp: 11111 };
      },
    };

    let getRequestCount = 0;
    const client = new ResourceManagementClient(credential, "subscriptionID", {
      httpClient: {
        sendRequest: async (req) => {
          getRequestCount++;
          if (getRequestCount === 1) {
            return {
              request: req,
              status: 401,
              headers: createHttpHeaders({ "www-authenticate": invalidCAEChallenge }),
            };
          }
          return { request: req, status: 200, headers: createHttpHeaders() };
        },
      },
      credential,
    });
    try {
      const result = await client.operations.list();
      const items = [];
      for await (let item of result) {
        items.push(item);
      }
      assert.fail("Should not reach here and throw 401 exception");
    } catch (e: any) {
      assert.equal(e.statusCode, 401);
      assert.equal(getRequestCount, 1);
      assert.equal(getTokenCount, 1);
    }
  });
});
