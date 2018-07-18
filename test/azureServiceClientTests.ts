// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import * as msRest from "ms-rest-js";
import { HttpHeaders, HttpOperationResponse, TokenCredentials, WebResource } from "ms-rest-js";
import { AzureServiceClient, AzureServiceClientOptions, updateOptionsWithDefaultValues } from "../lib/azureServiceClient";
import * as msAssert from "./msAssert";

describe("AzureServiceClient", () => {
  describe("constructor", () => {
    it("with no options provided", () => {
      const client = new AzureServiceClient(new TokenCredentials("my-fake-token"));
      assert.strictEqual(client.acceptLanguage, "en-us");
      assert.strictEqual(client.longRunningOperationRetryTimeout, 30);
      assert.deepStrictEqual(client.userAgentInfo, { value: ["ms-rest-js/0.1.0", "ms-rest-azure/0.1.0"] });
    });

    it("with acceptLanguage provided", () => {
      const client = new AzureServiceClient(new TokenCredentials("my-fake-token"), { acceptLanguage: "my-fake-language" });
      assert.strictEqual(client.acceptLanguage, "my-fake-language");
      assert.strictEqual(client.longRunningOperationRetryTimeout, 30);
      assert.deepStrictEqual(client.userAgentInfo, { value: ["ms-rest-js/0.1.0", "ms-rest-azure/0.1.0"] });
    });

    it("with longRunningOperationRetryTimeout provided", () => {
      const client = new AzureServiceClient(new TokenCredentials("my-fake-token"), { longRunningOperationRetryTimeout: 2 });
      assert.strictEqual(client.acceptLanguage, "en-us");
      assert.strictEqual(client.longRunningOperationRetryTimeout, 2);
      assert.deepStrictEqual(client.userAgentInfo, { value: ["ms-rest-js/0.1.0", "ms-rest-azure/0.1.0"] });
    });
  });

  describe("sendLongRunningRequest()", () => {
    it("with 200 status, GET method, and undefined response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 200 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "GET");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, undefined);
      assert.strictEqual(httpResponse.parsedBody, undefined);
    });

    it("with 200 status, GET method, and XML response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 200,
          body: `<responseBody>hello</responseBody>`
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "GET");
      const error: msRest.RestError = await msAssert.throwsAsync(serviceClient.sendLongRunningRequest(httpRequest));
      assert.strictEqual(error.message, `Error "SyntaxError: Unexpected token < in JSON at position 0" occurred while parsing the response body - <responseBody>hello</responseBody>.`);
      assert.strictEqual(error.request!.headers.get("authorization"), "Bearer my-fake-token");
    });

    it("with 200 status, GET method, and {} response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 200, body: {} }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "GET");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, "{}");
      assert.deepEqual(httpResponse.parsedBody, {});
    });

    it("with 200 status, PATCH method, and undefined response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        { status: 200 },
        { status: 200 }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PATCH");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error("The response from long running operation does not contain a body."));
    });

    it("with 200 status, PATCH method, and {} response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 200, body: {} }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PATCH");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, "{}");
      assert.deepEqual(httpResponse.parsedBody, {});
    });

    it("with 200 status, PUT method, and undefined response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        { status: 200 },
        { status: 200 }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error("The response from long running operation does not contain a body."));
    });

    it("with 200 status, PUT method, and {} response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 200, body: {} }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, "{}");
      assert.deepEqual(httpResponse.parsedBody, {});
    });

    it("with 200 status, POST method, and undefined response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 200 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, undefined);
      assert.strictEqual(httpResponse.parsedBody, undefined);
    });

    it("with 200 status, DELETE method, and undefined response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 200 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "DELETE");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, undefined);
      assert.strictEqual(httpResponse.parsedBody, undefined);
    });

    it("with 201 status and GET method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 201 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "GET");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Unexpected polling status code from long running operation "201" for method "GET".`));
    });

    it("with 201 status and PATCH method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 201 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PATCH");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Unexpected polling status code from long running operation "201" for method "PATCH".`));
    });

    it("with 201 status, PUT method, and undefined final response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        { status: 201 },
        { status: 200 }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error("The response from long running operation does not contain a body."));
    });

    it("with 201 status, PUT method, and {} final response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        { status: 201 },
        { status: 200, body: {} }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, `{}`);
      assert.deepEqual(httpResponse.parsedBody, {});
    });

    it("with 201 status, PUT method, {} final response body, and custom headers", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        { status: 201 },
        { status: 200, body: {} }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      const options: msRest.RequestOptionsBase = {
        customHeaders: {
          a: "1"
        }
      };
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest, options);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, `{}`);
      assert.deepEqual(httpResponse.parsedBody, {});
      assert.strictEqual(httpResponse.request.headers.get("a"), "1");
    });

    it(`with 201 status, PUT method, and { properties: { provisioningState: "Failed" } } final response body`, async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        { status: 201 },
        { status: 200, body: { properties: { provisioningState: "Failed" } } }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      const error: msRest.RestError = await msAssert.throwsAsync(serviceClient.sendLongRunningRequest(httpRequest));
      assert.strictEqual(error.message, `Long running operation failed with status: "Failed".`);
      assert.strictEqual(error.code, undefined);
    });

    it("with 201 status and POST method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 201 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Unexpected polling status code from long running operation "201" for method "POST".`));
    });

    it("with 201 status and DELETE method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 201 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "DELETE");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Unexpected polling status code from long running operation "201" for method "DELETE".`));
    });

    it("with 202 status and GET method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 202 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "GET");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Location header is missing from long running operation.`));
    });

    it("with 202 status and PATCH method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 202 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PATCH");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Location header is missing from long running operation.`));
    });

    it("with 202 status, PUT method, and undefined final response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        { status: 202 },
        { status: 200 }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error("The response from long running operation does not contain a body."));
    });

    it("with 202 status and POST method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 202 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Location header is missing from long running operation.`));
    });

    it("with 202 status, POST method, azure-asyncoperation header, and undefined final response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "azure-asyncoperation": "https://fake.azure.com/longRunningOperation2"
          })
        },
        { status: 200 }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`The response from long running operation does not contain a body.`));
    });

    it("with 202 status, POST method, azure-asyncoperation header, and {} final response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "azure-asyncoperation": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 200,
          body: {}
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`The response "{}" from long running operation does not contain the status property.`));
    });

    it(`with 202 status, POST method, azure-asyncoperation header, and { status: "SPAM" } final response body`, async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "azure-asyncoperation": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 200,
          body: {
            status: "Succeeded"
          }
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, `{"status":"Succeeded"}`);
      assert.deepEqual(httpResponse.parsedBody, { status: "Succeeded" });
      assert.strictEqual(httpResponse.request.url, "https://fake.azure.com/longRunningOperation2");
    });

    it("with 202 status, DELETE method, azure-asyncoperation header, and undefined final response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "azure-asyncoperation": "https://fake.azure.com/longRunningOperation2"
          })
        },
        { status: 200 }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "DELETE");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`The response from long running operation does not contain a body.`));
    });

    it("with 202 status, DELETE method, azure-asyncoperation header, and {} final response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "azure-asyncoperation": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 200,
          body: {}
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "DELETE");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`The response "{}" from long running operation does not contain the status property.`));
    });

    it(`with 202 status, DELETE method, azure-asyncoperation header, and { status: "SPAM" } final response body`, async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "azure-asyncoperation": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 200,
          body: {
            status: "Succeeded"
          }
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "DELETE");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, `{"status":"Succeeded"}`);
      assert.deepEqual(httpResponse.parsedBody, { status: "Succeeded" });
      assert.strictEqual(httpResponse.request.url, "https://fake.azure.com/longRunningOperation2");
    });

    it(`with 202 status, PUT method, azure-asyncoperation header, and { a: 2 } final response body`, async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "azure-asyncoperation": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 200,
          body: {
            status: "Succeeded",
            a: 1
          }
        },
        {
          status: 200,
          body: { a: 2 }
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, `{"a":2}`);
      assert.deepEqual(httpResponse.parsedBody, { a: 2 });
      assert.strictEqual(httpResponse.request.url, "https://fake.azure.com/longRunningOperation");
    });

    it("with 202 status, POST method, location header, and {} final response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "location": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 200,
          body: {}
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, `{}`);
      assert.deepEqual(httpResponse.parsedBody, {});
      assert.strictEqual(httpResponse.request.url, "https://fake.azure.com/longRunningOperation2");
    });

    it("with 202 status, POST method, location header, 202 poll, and {} final response body", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "location": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 202,
        },
        {
          status: 200,
          body: {}
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 200);
      assert.strictEqual(httpResponse.bodyAsText, `{}`);
      assert.deepEqual(httpResponse.parsedBody, {});
      assert.strictEqual(httpResponse.request.url, "https://fake.azure.com/longRunningOperation2");
    });

    it("with 202 status, POST method, location header, and 201 poll", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "location": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 201,
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`The response with status code 201 from polling for long running operation url "https://fake.azure.com/longRunningOperation2" is not valid.`));
    });

    it("with 202 status, PUT method, location header, and 204 poll", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "location": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 204,
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`The response with status code 204 from polling for long running operation url "https://fake.azure.com/longRunningOperation2" is not valid.`));
    });

    it("with 202 status, PUT method, location header, and 404 poll", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([
        {
          status: 202,
          headers: new HttpHeaders({
            "location": "https://fake.azure.com/longRunningOperation2"
          })
        },
        {
          status: 404,
        }
      ]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      const error: msRest.RestError = await msAssert.throwsAsync(serviceClient.sendLongRunningRequest(httpRequest));
      assert.strictEqual(error.message, `Invalid status code with response body "undefined" occurred when polling for operation status.`);
      assert.strictEqual(error.statusCode, 404);
      assert.strictEqual(error.request!.headers.contains("authorization"), false);
      assert.strictEqual(error.body, undefined);
    });

    it("with 202 status and DELETE method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 202 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "DELETE");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Location header is missing from long running operation.`));
    });

    it("with 204 status and GET method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 204 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "GET");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Unexpected polling status code from long running operation "204" for method "GET".`));
    });

    it("with 204 status and PATCH method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 204 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PATCH");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Unexpected polling status code from long running operation "204" for method "PATCH".`));
    });

    it("with 204 status and PUT method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 204 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "PUT");
      await msAssert.throwsAsync(
        serviceClient.sendLongRunningRequest(httpRequest),
        new Error(`Unexpected polling status code from long running operation "204" for method "PUT".`));
    });

    it("with 204 status and DELETE method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 204 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "DELETE");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 204);
      assert.strictEqual(httpResponse.bodyAsText, undefined);
      assert.strictEqual(httpResponse.parsedBody, undefined);
    });

    it("with 204 status and POST method", async () => {
      const serviceClient: AzureServiceClient = createServiceClient([{ status: 204 }]);
      const httpRequest = new WebResource("https://fake.azure.com/longRunningOperation", "POST");
      const httpResponse: HttpOperationResponse = await serviceClient.sendLongRunningRequest(httpRequest);
      assert.strictEqual(httpResponse.status, 204);
      assert.strictEqual(httpResponse.bodyAsText, undefined);
      assert.strictEqual(httpResponse.parsedBody, undefined);
    });
  });

  describe("updateOptionsWithDefaultValues()", () => {
    it("with undefined", () => {
      assert.deepStrictEqual(updateOptionsWithDefaultValues(undefined), { generateClientRequestIdHeader: true });
    });

    it("with {}", () => {
      const options: AzureServiceClientOptions = {};
      const newOptions: AzureServiceClientOptions = updateOptionsWithDefaultValues(options);
      assert.deepStrictEqual(newOptions, { generateClientRequestIdHeader: true });
      assert.strictEqual(newOptions, options);
    });

    it("with { generateClientRequestIdHeader: false }", () => {
      const options: AzureServiceClientOptions = { generateClientRequestIdHeader: false };
      const newOptions: AzureServiceClientOptions = updateOptionsWithDefaultValues(options);
      assert.deepStrictEqual(newOptions, { generateClientRequestIdHeader: false });
      assert.strictEqual(newOptions, options);
    });

    it("with { generateClientRequestIdHeader: true }", () => {
      const options: AzureServiceClientOptions = { generateClientRequestIdHeader: true };
      const newOptions: AzureServiceClientOptions = updateOptionsWithDefaultValues(options);
      assert.deepStrictEqual(newOptions, { generateClientRequestIdHeader: true });
      assert.strictEqual(newOptions, options);
    });
  });
});

interface HttpResponse {
  status: number;
  headers?: HttpHeaders;
  body?: any;
}

function createServiceClient(responses: HttpResponse[]): AzureServiceClient {
  return new AzureServiceClient(new TokenCredentials("my-fake-token"), {
    httpClient: {
      sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
        const response: HttpResponse | undefined = responses.shift();
        if (!response) {
          throw new Error("Not enough responses provided for test.");
        }
        return Promise.resolve({
          request: httpRequest,
          status: response.status,
          headers: response.headers || new HttpHeaders(),
          bodyAsText: typeof response.body === "string" ? response.body : JSON.stringify(response.body),
          parsedBody: response.body
        });
      }
    },
    longRunningOperationRetryTimeout: 0
  });
}