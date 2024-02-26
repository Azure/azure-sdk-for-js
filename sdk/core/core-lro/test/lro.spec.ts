// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ImplementationName,
  assertDivergentBehavior,
  assertError,
  createDoubleHeaders,
  Result,
} from "./utils/utils.js";
import { describe, it, assert } from "vitest";
import { createRunLroWith, createTestPoller } from "./utils/router.js";
import { delay } from "@azure/core-util";
import { matrix } from "./matrix.js";
matrix(
  [["createPoller"], [true, false]] as const,
  async function (implName: ImplementationName, throwOnNon2xxResponse: boolean) {
    const runLro = createRunLroWith({ implName, throwOnNon2xxResponse });
    describe(`${implName} (throwOnNon2xxResponse = ${throwOnNon2xxResponse})`, function () {
      describe("No polling", () => {
        it("should handle delete204Succeeded", async () => {
          const response = await runLro({
            routes: [{ method: "DELETE", status: 204 }],
          });
          assert.equal(response.statusCode, 204);
        });

        it("put201Succeeded", async function () {
          const result = await runLro({
            routes: [
              {
                method: "PUT",
                status: 201,
                body: `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`,
              },
            ],
          });
          assert.equal(result.id, "100");
          assert.equal(result.name, "foo");
          assert.equal(result.properties?.provisioningState, "Succeeded");
        });

        it("should handle post202Retry200", async () => {
          const path = "/post/202/retry/200";
          const newPath = "/post/newuri/202/retry/200";
          const response = await runLro({
            routes: [
              {
                method: "POST",
                path,
                status: 202,
                headers: {
                  location: path,
                  "retry-after": "0",
                },
              },
              {
                method: "GET",
                path,
                status: 202,
                headers: {
                  location: newPath,
                },
              },
              {
                method: "GET",
                path: newPath,
                status: 200,
                body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
        });

        it("should handle post202NoRetry204", async () => {
          const path = "/post/202/noretry/204";
          const pollingPath = "/post/newuri/202/noretry/204";
          const response = await runLro({
            routes: [
              {
                method: "POST",
                path,
                status: 202,
                headers: {
                  location: path,
                },
              },
              {
                method: "GET",
                path,
                status: 202,
                headers: {
                  location: pollingPath,
                },
              },
              {
                method: "GET",
                path: pollingPath,
                status: 204,
              },
            ],
          });
          assert.equal(response.statusCode, 204);
        });

        it("should handle deleteNoHeaderInRetry", async () => {
          const pollingPath = "/delete/noheader/operationresults/123";
          const response = await runLro({
            routes: [
              {
                method: "DELETE",
                status: 200,
                headers: { Location: pollingPath },
              },
              { method: "GET", path: pollingPath, status: 202 },
              { method: "GET", path: pollingPath, status: 204 },
            ],
          });
          assert.equal(response.statusCode, 204);
        });

        it("should handle put202Retry200", async () => {
          const pollingPath = "/put/202/retry/operationResults/200";
          const response = await runLro({
            routes: [
              {
                method: "PUT",
                status: 202,
                headers: { Location: pollingPath },
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{"id": "100", "name": "foo" }`,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
        });

        it("should handle putNoHeaderInRetry", async () => {
          const pollingPath = "/put/noheader/operationresults";
          const result = await runLro({
            routes: [
              {
                method: "PUT",
                status: 202,
                body: `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo" }`,
                headers: { Location: pollingPath },
              },
              { method: "GET", path: pollingPath, status: 202 },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`,
              },
            ],
          });
          assert.equal(result.id, "100");
          assert.equal(result.name, "foo");
          assert.equal(result.properties?.provisioningState, "Succeeded");
        });

        it("should handle putSubResource", async () => {
          const pollingPath = "/putsubresource/operationresults";
          const result = await runLro({
            routes: [
              {
                method: "PUT",
                status: 202,
                body: `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "subresource": "sub1" }`,
                headers: { Location: pollingPath },
              },
              { method: "GET", path: pollingPath, status: 202 },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "subresource": "sub1" }`,
              },
            ],
          });
          assert.equal(result.id, "100");
          assert.equal(result.properties?.provisioningState, "Succeeded");
        });

        it("should handle putNonResource", async () => {
          const pollingPath = "/putnonresource/operationresults";
          const result = await runLro({
            routes: [
              {
                method: "PUT",
                status: 202,
                headers: { Location: pollingPath },
              },
              { method: "GET", path: pollingPath, status: 202 },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "name": "sku" , "id": "100" }`,
              },
            ],
          });
          assert.equal(result.id, "100");
          assert.equal(result.name, "sku");
        });

        it("should handle delete202Retry200", async () => {
          const path = "/delete/202/retry/200";
          const pollingPath = "/delete/newuri/202/retry/200";
          const response = await runLro({
            routes: [
              {
                method: "DELETE",
                path,
                status: 202,
                headers: {
                  location: path,
                  "retry-after": "0",
                },
              },
              {
                method: "GET",
                path,
                status: 202,
                headers: {
                  location: pollingPath,
                  "retry-after": "0",
                },
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
        });

        it("should handle delete202NoRetry204", async () => {
          const path = "/delete/202/noretry/204";
          const newPath = "/delete/newuri/202/noretry/204";
          const response = await runLro({
            routes: [
              {
                method: "DELETE",
                path,
                status: 202,
                headers: {
                  location: path,
                },
              },
              {
                method: "GET",
                path,
                status: 202,
                headers: {
                  location: newPath,
                },
              },
              {
                method: "GET",
                path: newPath,
                status: 204,
              },
            ],
          });
          assert.equal(response.statusCode, 204);
        });

        it("should handle deleteProvisioning202Accepted200Succeeded", async () => {
          const pollingPath = "/delete/provisioning/202/accepted/200/succeeded";
          const response = await runLro({
            routes: [
              {
                method: "DELETE",
                status: 202,
                headers: {
                  location: pollingPath,
                  "retry-after": "0",
                },
                body: `{"properties":{"provisioningState":"Accepted"},"id":"100","name":"foo"}`,
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
        });

        it("should handle deleteProvisioning202DeletingFailed200", async () => {
          const path = "/delete/provisioning/202/deleting/200/failed";
          const response = await runLro({
            routes: [
              {
                method: "DELETE",
                path,
                status: 202,
                headers: {
                  location: path,
                  "retry-after": "0",
                },
                body: `{"properties":{"provisioningState":"Deleting"},"id":"100","name":"foo"}`,
              },
              {
                method: "GET",
                path,
                status: 200,
                body: `{"properties":{"provisioningState":"Failed"},"id":"100","name":"foo"}`,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
          assert.equal(response.properties?.provisioningState, "Failed");
        });

        it("should handle deleteProvisioning202Deletingcanceled200", async () => {
          const path = "/delete/provisioning/202/deleting/200/canceled";
          const response = await runLro({
            routes: [
              {
                method: "DELETE",
                path,
                status: 202,
                headers: {
                  location: path,
                  "retry-after": "0",
                },
                body: `{"properties":{"provisioningState":"Deleting"},"id":"100","name":"foo"}`,
              },
              {
                method: "GET",
                path,
                status: 200,
                body: `{"properties":{"provisioningState":"Canceled"},"id":"100","name":"foo"}`,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
          assert.equal(response.properties?.provisioningState, "Canceled");
        });
      });

      describe("Polling from body", () => {
        it("put200Succeeded", async function () {
          const result = await runLro({
            routes: [
              {
                method: "PUT",
                status: 200,
                body: `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`,
              },
            ],
          });
          assert.equal(result.properties?.provisioningState, "Succeeded");
        });

        it("should handle initial response with terminal state without provisioning State", async () => {
          const result = await runLro({
            routes: [
              {
                method: "PUT",
                status: 200,
                body: `{"id": "100", "name": "foo" }`,
              },
            ],
          });
          assert.deepEqual(result.id, "100");
          assert.deepEqual(result.name, "foo");
        });

        it("should handle initial response creating followed by success through an Azure Resource", async () => {
          const path = "/put/201/creating/succeeded/200";
          const result = await runLro({
            routes: [
              {
                method: "PUT",
                path,
                status: 201,
                body: `{"properties":{"provisioningState":"Creating"},"id":"100","name":"foo"}`,
              },
              {
                method: "GET",
                path,
                status: 200,
                body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
              },
            ],
          });
          assert.deepEqual(result.properties?.provisioningState, "Succeeded");
          assert.deepEqual(result.id, "100");
          assert.deepEqual(result.name, "foo");
        });

        it("should handle put200Acceptedcanceled200", async () => {
          const path = "/put/200/accepted/canceled/200";
          const body = { properties: { provisioningState: "Canceled" } };
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "PUT",
                  path,
                  status: 200,
                  body: `{"properties":{"provisioningState":"Accepted"},"id":"100","name":"foo"}`,
                },
                {
                  method: "GET",
                  path,
                  status: 200,
                  body: JSON.stringify(body),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              messagePattern: /Operation was canceled/,
            },
            notThrowing: {
              result: {
                ...body,
                statusCode: 200,
              },
            },
          });
        });

        it("should handle put200UpdatingSucceeded204", async () => {
          const path = "/put/200/updating/succeeded/200";
          const result = await runLro({
            routes: [
              {
                method: "PUT",
                path,
                status: 200,
                body: `{"properties":{"provisioningState":"Updating"},"id":"100","name":"foo"}`,
              },
              {
                method: "GET",
                path,
                status: 200,
                body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
              },
            ],
          });
          assert.deepEqual(result.properties?.provisioningState, "Succeeded");
          assert.deepEqual(result.id, "100");
          assert.deepEqual(result.name, "foo");
        });

        it("should handle put201CreatingFailed200", async () => {
          const path = "/put/201/created/failed/200";
          const body = {
            properties: {
              provisioningState: "Failed",
            },
          };
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "PUT",
                  path,
                  status: 201,
                  body: `{"properties":{"provisioningState":"Created"},"id":"100","name":"foo"}`,
                },
                {
                  method: "GET",
                  path,
                  status: 200,
                  body: JSON.stringify(body),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              messagePattern: /The long-running operation has failed/,
            },
            notThrowing: {
              result: { ...body, statusCode: 200 },
            },
          });
        });

        it("should handle post200WithPayload", async () => {
          const path = `/post/payload/200`;
          const result = await runLro({
            routes: [
              {
                method: "POST",
                path,
                status: 202,
                headers: { Location: path, "Retry-After": "0" },
              },
              { method: "GET", path, status: 200, body: `{"id":"1", "name":"product"}` },
            ],
          });
          assert.equal(result.id, "1");
          assert.equal(result.name, "product");
        });
      });

      matrix(
        [["Azure-AsyncOperation", "Operation-Location"]] as const,
        async function (headerName: string) {
          describe(`Polling from ${headerName}`, function () {
            it("should handle postDoubleHeadersFinalLocationGet", async () => {
              const operationLocationPath =
                "/LROPostDoubleHeadersFinalLocationGet/asyncOperationUrl";
              const resourceLocationPath = `/LROPostDoubleHeadersFinalLocationGet/location`;
              const result = await runLro({
                routes: [
                  {
                    method: "POST",
                    status: 202,
                    headers: {
                      Location: resourceLocationPath,
                      [headerName]: operationLocationPath,
                    },
                  },
                  {
                    method: "GET",
                    path: operationLocationPath,
                    status: 200,
                    body: `{ "status": "succeeded" }`,
                  },
                  {
                    method: "GET",
                    path: resourceLocationPath,
                    status: 200,
                    body: `{ "id": "100", "name": "foo" }`,
                  },
                ],
              });
              assert.equal(result.id, "100");
              assert.equal(result.name, "foo");
            });

            it("should handle getDoubleHeadersFinalLocationGet", async () => {
              const operationLocationPath =
                "/LROPostDoubleHeadersFinalLocationGet/asyncOperationUrl";
              const resourceLocationPath = `/LROPostDoubleHeadersFinalLocationGet/location`;
              const result = await runLro({
                routes: [
                  {
                    method: "GET",
                    status: 202,
                    headers: {
                      Location: resourceLocationPath,
                      [headerName]: operationLocationPath,
                    },
                  },
                  {
                    method: "GET",
                    path: operationLocationPath,
                    status: 200,
                    body: `{ "status": "running" }`,
                  },
                  {
                    method: "GET",
                    path: operationLocationPath,
                    status: 200,
                    body: `{ "status": "succeeded" }`,
                  },
                  {
                    method: "GET",
                    path: resourceLocationPath,
                    status: 200,
                    body: `{ "id": "100", "name": "foo" }`,
                  },
                ],
              });
              assert.equal(result.id, "100");
              assert.equal(result.name, "foo");
            });

            it("should handle getDoubleHeaders", async () => {
              const operationLocationPath =
                "/LROPostDoubleHeadersFinalLocationGet/asyncOperationUrl";
              const result = await runLro({
                routes: [
                  {
                    method: "GET",
                    status: 202,
                    headers: {
                      [headerName]: operationLocationPath,
                    },
                  },
                  {
                    method: "GET",
                    path: operationLocationPath,
                    status: 200,
                    body: `{ "status": "running" }`,
                  },
                  {
                    method: "GET",
                    path: operationLocationPath,
                    status: 200,
                    body: `{ "status": "succeeded", "id": "100", "name": "foo" }`,
                  },
                ],
              });
              assert.equal(result.id, "100");
              assert.equal(result.name, "foo");
            });

            it("should handle get200", async () => {
              const result = await runLro({
                routes: [
                  {
                    method: "GET",
                    status: 200,
                    body: `{ "id": "100", "name": "foo" }`,
                  },
                ],
              });
              assert.equal(result.id, "100");
              assert.equal(result.name, "foo");
            });

            it("should handle postUpdatedPollingUrl", async () => {
              const operationLocationPath1 = "path1";
              const operationLocationPath2 = "path2";
              const result = await runLro({
                routes: [
                  {
                    method: "POST",
                    status: 200,
                    headers: {
                      [headerName]: operationLocationPath1,
                    },
                  },
                  {
                    method: "GET",
                    path: operationLocationPath1,
                    status: 200,
                    body: `{ "status": "running" }`,
                    headers: {
                      [headerName]: operationLocationPath2,
                    },
                  },
                  {
                    method: "GET",
                    path: operationLocationPath2,
                    status: 200,
                    body: `{ "status": "succeeded", "id": "100", "name": "foo" }`,
                  },
                ],
              });
              assert.equal(result.id, "100");
              assert.equal(result.name, "foo");
            });

            it("should handle postDoubleHeadersFinalAzureHeaderGet", async () => {
              const locationPath = `/LROPostDoubleHeadersFinalAzureHeaderGet/location`;
              const operationLocationPath = `/LROPostDoubleHeadersFinalAzureHeaderGet/asyncOperationUrl`;
              const result = await runLro({
                routes: [
                  {
                    method: "POST",
                    status: 202,
                    body: "",
                    headers: {
                      Location: locationPath,
                      [headerName]: operationLocationPath,
                    },
                  },
                  {
                    method: "GET",
                    path: operationLocationPath,
                    status: 200,
                    body: `{ "status": "succeeded", "id": "100"}`,
                  },
                  {
                    method: "GET",
                    path: locationPath,
                    status: 400,
                  },
                ],
                resourceLocationConfig: "azure-async-operation",
              });
              assert.equal(result.statusCode, 200);
              assert.equal(result.id, "100");
            });

            it("should handle postDoubleHeadersFinalAzureHeaderGetDefault", async () => {
              const resourceLocationPath =
                "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/location";
              const pollingPath =
                "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl";
              const result = await runLro({
                routes: [
                  {
                    method: "POST",
                    status: 202,
                    body: "",
                    headers: {
                      Location: resourceLocationPath,
                      [headerName]: pollingPath,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "succeeded"}`,
                  },
                  {
                    method: "GET",
                    path: resourceLocationPath,
                    status: 200,
                    body: `{ "id": "100", "name": "foo" }`,
                  },
                ],
              });
              assert.equal(result.id, "100");
              assert.equal(result.statusCode, 200);
            });

            it("should handle deleteAsyncRetrySucceeded", async () => {
              const pollingPath = "/deleteasync/retry/succeeded/operationResults/200/";
              const response = await runLro({
                routes: [
                  {
                    method: "DELETE",
                    status: 202,
                    headers: {
                      location: pollingPath,
                      [headerName]: pollingPath,
                      "retry-after": "0",
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 202,
                    headers: {
                      location: pollingPath,
                      [headerName]: pollingPath,
                      "retry-after": "0",
                    },
                    body: `{"status":"Accepted"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{"status":"Succeeded"}`,
                  },
                ],
              });
              assert.equal(response.statusCode, 200);
            });

            it("should handle deleteAsyncNoRetrySucceeded", async () => {
              const pollingPath = "/deleteasync/noretry/succeeded/operationResults/200/";
              const response = await runLro({
                routes: [
                  {
                    method: "DELETE",
                    status: 202,
                    headers: {
                      location: pollingPath,
                      [headerName]: pollingPath,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 202,
                    headers: {
                      location: pollingPath,
                      [headerName]: pollingPath,
                    },
                    body: `{"status":"Accepted"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{"status":"Succeeded"}`,
                  },
                ],
              });
              assert.equal(response.statusCode, 200);
            });

            it("should handle deleteAsyncRetrycanceled", async () => {
              const pollingPath = "/deletelocation/retry/canceled/operationResults/200/";
              const body = { status: "Canceled" };
              await assertDivergentBehavior({
                op: runLro({
                  routes: [
                    {
                      method: "DELETE",
                      status: 202,
                      headers: {
                        location: pollingPath,
                        [headerName]: pollingPath,
                        "retry-after": "0",
                      },
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 202,
                      body: `{"status":"Accepted"}`,
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 200,
                      body: JSON.stringify(body),
                    },
                  ],
                }),
                throwOnNon2xxResponse,
                throwing: {
                  messagePattern: /Operation was canceled/,
                },
                notThrowing: {
                  result: { ...body, statusCode: 200 },
                },
              });
            });

            it("should handle DeleteAsyncRetryFailed", async () => {
              const pollingPath = "/deleteasync/retry/failed/operationResults/200/";
              const body = { status: "Failed" };
              await assertDivergentBehavior({
                op: runLro({
                  routes: [
                    {
                      method: "DELETE",
                      status: 202,
                      headers: {
                        location: pollingPath,
                        [headerName]: pollingPath,
                        "retry-after": "0",
                      },
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 202,
                      headers: {
                        location: pollingPath,
                        [headerName]: pollingPath,
                        "retry-after": "0",
                      },
                      body: `{"status":"Accepted"}`,
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 200,
                      body: JSON.stringify(body),
                    },
                  ],
                }),
                throwOnNon2xxResponse,
                throwing: {
                  messagePattern: /The long-running operation has failed/,
                },
                notThrowing: {
                  result: { ...body, statusCode: 200 },
                },
              });
            });

            it("should handle putAsyncRetrySucceeded", async () => {
              const path = `/put/noretry/succeeded`;
              const pollingPath = "/putasync/noretry/succeeded/operationResults/200/";
              const result = await runLro({
                routes: [
                  {
                    method: "PUT",
                    path,
                    status: 200,
                    headers: {
                      location: pollingPath,
                      [headerName]: pollingPath,
                    },
                    body: `{"properties":{"provisioningState":"Accepted"},"id":"100","name":"foo"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 202,
                    headers: {
                      location: pollingPath,
                      [headerName]: pollingPath,
                    },
                    body: `{"status":"Accepted"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{"status":"Succeeded"}`,
                  },
                  {
                    method: "GET",
                    path,
                    status: 200,
                    body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
                  },
                ],
              });
              assert.equal(result.id, "100");
              assert.equal(result.name, "foo");
              assert.equal(result.properties?.provisioningState, "Succeeded");
            });

            it("should handle post202List", async () => {
              const resourceLocationPath = `/list/finalGet`;
              const pollingPath = `/list/pollingGet`;
              const result = await runLro({
                routes: [
                  {
                    method: "POST",
                    status: 200,
                    headers: {
                      Location: resourceLocationPath,
                      [headerName]: pollingPath,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "Succeeded" }`,
                  },
                  {
                    method: "GET",
                    path: resourceLocationPath,
                    status: 200,
                    body: `[{ "id": "100", "name": "foo" }]`,
                  },
                ],
              });
              assert.equal((result as any)[0].id, "100");
              assert.equal((result as any)[0].name, "foo");
            });

            it("should handle putAsyncRetryFailed", async () => {
              const pollingPath = "/putlocation/retry/failed/operationResults/200/";
              const body = { status: "Failed" };
              await assertDivergentBehavior({
                op: runLro({
                  routes: [
                    {
                      method: "PUT",
                      status: 200,
                      body: `{"properties":{"provisioningState":"Accepted"},"id":"100","name":"foo"}`,
                      headers: {
                        location: pollingPath,
                        [headerName]: pollingPath,
                        "retry-after": "0",
                      },
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 202,
                      headers: {
                        location: pollingPath,
                        [headerName]: pollingPath,
                        "retry-after": "0",
                      },
                      body: `{"status":"Accepted"}`,
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 200,
                      body: JSON.stringify(body),
                    },
                  ],
                }),
                throwOnNon2xxResponse,
                throwing: {
                  messagePattern: /The long-running operation has failed/,
                },
                notThrowing: {
                  result: { ...body, statusCode: 200 },
                },
              });
            });

            it("should handle putAsyncNonResource", async () => {
              const path = `/putnonresource/202/200`;
              const pollingUrl = `/putnonresourceasync/operationresults/123`;
              const result = await runLro({
                routes: [
                  {
                    method: "PUT",
                    path,
                    status: 202,
                    headers: {
                      Location: `somethingBadWhichShouldNotBeUsed`,
                      [headerName]: pollingUrl,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingUrl,
                    status: 200,
                    body: `{ "status": "InProgress"}`,
                  },
                  {
                    method: "GET",
                    path: pollingUrl,
                    status: 200,
                    body: `{ "status": "Succeeded"}`,
                  },
                  {
                    method: "GET",
                    path,
                    status: 200,
                    body: `{ "name": "sku" , "id": "100" }`,
                  },
                ],
              });
              assert.equal(result.name, "sku");
              assert.equal(result.id, "100");
            });

            it("should handle patchAsyncLocationHeader", async () => {
              const resourceLocationPath = `/patchasynclocationheader/succeeded`;
              const pollingPath = `/patchasynclocationheader/operationresults/123`;
              const result = await runLro({
                routes: [
                  {
                    method: "PATCH",
                    status: 202,
                    headers: {
                      Location: resourceLocationPath,
                      [headerName]: pollingPath,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "InProgress"}`,
                    headers: {
                      "Azure-AsyncOperation": pollingPath,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "Succeeded"}`,
                  },
                  {
                    method: "GET",
                    path: resourceLocationPath,
                    status: 200,
                    body: `{ "name": "sku" , "id": "100" }`,
                  },
                ],
              });
              assert.equal(result.name, "sku");
              assert.equal(result.id, "100");
            });

            it("should handle patchAsyncNoLocationHeader", async () => {
              const initialResourcePath = `/patchasyncnolocationheader/succeeded`;
              const pollingPath = `/patchasyncnolocationheader/operationresults/123`;
              const result = await runLro({
                routes: [
                  {
                    method: "PATCH",
                    status: 201,
                    path: initialResourcePath,
                    headers: {
                      [headerName]: pollingPath,
                    },
                    body: `{ "properties": { "provisioningState": "Updating" } }`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "InProgress"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "Succeeded"}`,
                  },
                  {
                    method: "GET",
                    path: initialResourcePath,
                    status: 200,
                    body: `{ "name": "sku" , "id": "100" }`,
                  },
                ],
              });
              assert.equal(result.name, "sku");
              assert.equal(result.id, "100");
            });

            it("should handle putAsyncNoHeaderInRetry", async () => {
              const path = `/put/noheader/201/200`;
              const pollingPath = `/putasync/noheader/operationresults/123`;
              const result = await runLro({
                routes: [
                  {
                    method: "PUT",
                    path,
                    status: 201,
                    body: `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo" }`,
                    headers: {
                      Location: `somethingBadWhichShouldNotBeUsed`,
                      [headerName]: pollingPath,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "InProgress"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "Succeeded"}`,
                  },
                  {
                    method: "GET",
                    path,
                    status: 200,
                    body: `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`,
                  },
                ],
              });
              assert.equal(result.name, "foo");
              assert.equal(result.id, "100");
              assert.deepEqual(result.properties?.provisioningState, "Succeeded");
            });

            it("should handle putAsyncNoRetrySucceeded", async () => {
              const path = `/put/noretry/succeeded`;
              const pollingPath = "/putlocation/noretry/succeeded/operationResults/200/";
              const result = await runLro({
                routes: [
                  {
                    method: "PUT",
                    path,
                    status: 200,
                    headers: {
                      location: pollingPath,
                      [headerName]: pollingPath,
                    },
                    body: `{"properties":{"provisioningState":"Accepted"},"id":"100","name":"foo"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 202,
                    headers: {
                      location: pollingPath,
                      [headerName]: pollingPath,
                    },
                    body: `{"status":"Accepted"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{"status":"Succeeded"}`,
                  },
                  {
                    method: "GET",
                    path,
                    status: 200,
                    body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
                  },
                ],
              });
              assert.equal(result.name, "foo");
              assert.equal(result.id, "100");
            });

            it("should handle putAsyncNoRetrycanceled", async () => {
              const pollingPath = "/putlocation/noretry/canceled/operationResults/200/";
              const body = { status: "Canceled" };
              await assertDivergentBehavior({
                op: runLro({
                  routes: [
                    {
                      method: "PUT",
                      status: 200,
                      headers: {
                        location: pollingPath,
                        [headerName]: pollingPath,
                      },
                      body: `{"properties":{"provisioningState":"Accepted"},"id":"100","name":"foo"}`,
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 202,
                      headers: {
                        location: pollingPath,
                        [headerName]: pollingPath,
                      },
                      body: `{"status":"Accepted"}`,
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 200,
                      headers: {
                        location: pollingPath,
                        [headerName]: pollingPath,
                      },
                      body: JSON.stringify(body),
                    },
                  ],
                }),
                throwOnNon2xxResponse,
                throwing: {
                  messagePattern: /Operation was canceled/,
                },
                notThrowing: {
                  result: {
                    ...body,
                    location: pollingPath,
                    [headerName.toLocaleLowerCase()]: pollingPath,
                    statusCode: 200,
                  },
                },
              });
            });

            it("should handle putAsyncSubResource", async () => {
              const pollingPath = `/putsubresourceasync/operationresults/123`;
              const path = `/putsubresource/202/200`;
              const result = await runLro({
                routes: [
                  {
                    method: "PUT",
                    path,
                    status: 202,
                    body: `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "subresource": "sub1" }`,
                    headers: {
                      Location: `somethingBadWhichShouldNotBeUsed`,
                      [headerName]: pollingPath,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "InProgress"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "Succeeded"}`,
                  },
                  {
                    method: "GET",
                    path: path,
                    status: 200,
                    body: `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "subresource": "sub1" }`,
                  },
                ],
              });
              assert.equal(result.id, "100");
              assert.equal(result.properties?.provisioningState, "Succeeded");
            });

            it("should handle deleteAsyncNoHeaderInRetry", async () => {
              const pollingPath = `/deleteasync/noheader/operationresults/123`;
              const response = await runLro({
                routes: [
                  {
                    method: "DELETE",
                    status: 202,
                    headers: {
                      Location: `somethingBadWhichShouldNotBeUsed`,
                      [headerName]: pollingPath,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "InProgress"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{ "status": "Succeeded"}`,
                  },
                ],
              });
              assert.equal(response.statusCode, 200);
            });

            it("should handle postAsyncNoRetrySucceeded", async () => {
              const locationPath = "/postlocation/noretry/succeeded/operationResults/foo/200/";
              const pollingPath = "/postasync/noretry/succeeded/operationResults/foo/200/";
              const result = await runLro({
                routes: [
                  {
                    method: "POST",
                    status: 202,
                    headers: {
                      location: locationPath,
                      [headerName]: pollingPath,
                    },
                    body: `{"properties":{"provisioningState":"Accepted"},"id":"100","name":"foo"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 202,
                    body: `{"status":"Accepted"}`,
                    headers: {
                      location: locationPath,
                      [headerName]: pollingPath,
                    },
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
                  },
                  {
                    method: "GET",
                    path: locationPath,
                    status: 200,
                    body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
                  },
                ],
              });
              assert.deepInclude(result, { id: "100", name: "foo" });
            });

            it("should handle postAsyncRetryFailed", async () => {
              const pollingPath = "/postlocation/retry/succeeded/operationResults/200/";
              const body = { status: "Failed" };
              await assertDivergentBehavior({
                op: runLro({
                  routes: [
                    {
                      method: "POST",
                      status: 202,
                      headers: {
                        location: "/postlocation/retry/succeeded/operationResults/foo/200/",
                        [headerName]: pollingPath,
                        "retry-after": "0",
                      },
                      body: `{"properties":{"provisioningState":"Accepted"},"id":"100","name":"foo"}`,
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 200,
                      body: JSON.stringify(body),
                    },
                  ],
                }),
                throwOnNon2xxResponse,
                throwing: {
                  messagePattern: /The long-running operation has failed/,
                },
                notThrowing: {
                  result: { ...body, statusCode: 200 },
                },
              });
            });

            it("should handle postAsyncRetrySucceeded", async () => {
              const locationPath = "/postlocation/retry/succeeded/operationResults/foo/200/";
              const pollingPath = "/postlocation/retry/succeeded/operationResults/200/";
              const result = await runLro({
                routes: [
                  {
                    method: "POST",
                    status: 202,
                    headers: {
                      location: locationPath,
                      [headerName]: pollingPath,
                      "retry-after": "0",
                    },
                    body: `{"properties":{"provisioningState":"Accepted"},"id":"100","name":"foo"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 202,
                    headers: {
                      location: locationPath,
                      [headerName]: pollingPath,
                      "retry-after": "0",
                    },
                    body: `{"status":"Accepted"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
                  },
                  {
                    method: "GET",
                    path: locationPath,
                    status: 200,
                    body: `{"properties":{"provisioningState":"Succeeded"},"id":"100","name":"foo"}`,
                  },
                ],
              });
              assert.deepInclude(result, { id: "100", name: "foo" });
            });

            it("should handle postAsyncResourceLocation", async () => {
              const locationPath = "/postlocation/retry/succeeded/operationResults/foo/200/";
              const pollingPath = "/postlocation/retry/succeeded/operationResults/200/";
              const result = await runLro({
                routes: [
                  {
                    method: "POST",
                    status: 202,
                    headers: {
                      [headerName]: pollingPath,
                      "retry-after": "0",
                    },
                    body: `{"status":"Accepted"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 202,
                    headers: {
                      location: locationPath,
                      [headerName]: pollingPath,
                      "retry-after": "0",
                    },
                    body: `{"status":"Accepted"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{"status":"Succeeded", "resourceLocation": "${locationPath}"}`,
                  },
                  {
                    method: "GET",
                    path: locationPath,
                    status: 200,
                    body: `{"id":"100","name":"foo"}`,
                  },
                ],
              });
              assert.deepInclude(result, { id: "100", name: "foo" });
            });

            it("should handle resourceLocation being null", async () => {
              const locationPath = "/postlocation/retry/succeeded/operationResults/foo/200/";
              const pollingPath = "/postlocation/retry/succeeded/operationResults/200/";
              const result = await runLro({
                routes: [
                  {
                    method: "POST",
                    status: 202,
                    headers: {
                      [headerName]: pollingPath,
                      "retry-after": "0",
                    },
                    body: `{"status":"Accepted"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 202,
                    headers: {
                      location: locationPath,
                      [headerName]: pollingPath,
                      "retry-after": "0",
                    },
                    body: `{"status":"Accepted"}`,
                  },
                  {
                    method: "GET",
                    path: pollingPath,
                    status: 200,
                    body: `{"status":"Succeeded", "resourceLocation": null}`,
                  },
                ],
              });
              assert.deepInclude(result, { status: "Succeeded" });
            });

            it("should handle postAsyncRetrycanceled", async () => {
              const pollingPath = "/postasync/retry/canceled/operationResults/200/";
              const body = { status: "Canceled" };
              await assertDivergentBehavior({
                op: runLro({
                  routes: [
                    {
                      method: "POST",
                      status: 202,
                      headers: {
                        location: "/postasync/retry/succeeded/operationResults/foo/200/",
                        [headerName]: pollingPath,
                        "retry-after": "0",
                      },
                      body: `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo"}`,
                    },
                    {
                      method: "GET",
                      path: pollingPath,
                      status: 200,
                      body: JSON.stringify(body),
                    },
                  ],
                }),
                throwOnNon2xxResponse,
                throwing: {
                  messagePattern: /Operation was canceled/,
                },
                notThrowing: {
                  result: { ...body, statusCode: 200 },
                },
              });
            });
          });
        },
      );

      describe("LRO Sad scenarios", () => {
        it("should handle PutNonRetry400 ", async () => {
          await assertDivergentBehavior({
            op: runLro({ routes: [{ method: "PUT", status: 400 }] }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode: 400,
            },
            notThrowing: {
              result: { statusCode: 400 },
            },
          });
        });

        it("should handle putNonRetry201Creating400 ", async () => {
          const path = "/nonretryerror/put/201/creating/400";
          const body = { message: "Error from the server" };
          const statusCode = 400;
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "PUT",
                  path,
                  status: 201,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                },
                {
                  method: "GET",
                  path,
                  status: statusCode,
                  body: JSON.stringify(body),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode,
            },
            notThrowing: {
              result: { ...body, statusCode },
            },
          });
        });

        it("should throw with putNonRetry201Creating400InvalidJson ", async () => {
          const path = "/nonretryerror/put/201/creating/400/invalidjson";
          const body = { message: "Error from the server" };
          const statusCode = 400;
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "PUT",
                  path,
                  status: 201,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                },
                {
                  method: "GET",
                  path,
                  status: statusCode,
                  body: JSON.stringify(body),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode,
            },
            notThrowing: {
              result: { ...body, statusCode },
            },
          });
        });

        it("should handle putAsyncRelativeRetry400 ", async () => {
          const pollingPath = `/nonretryerror/putasync/retry/failed/operationResults/400`;
          const statusCode = 400;
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "PUT",
                  status: 200,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                  headers: createDoubleHeaders({
                    pollingPath,
                    headers: { "Retry-After": "0" },
                  }),
                },
                {
                  method: "GET",
                  path: pollingPath,
                  status: statusCode,
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode,
            },
            notThrowing: {
              result: { statusCode },
            },
          });
        });

        it("should handle delete202NonRetry400 ", async () => {
          const path = "/nonretryerror/delete/202/retry/400";
          const body = { message: "Expected bad request message" };
          const statusCode = 400;
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "DELETE",
                  path,
                  status: 202,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                  headers: {
                    Location: path,
                    "Retry-After": "0",
                  },
                },
                {
                  method: "GET",
                  path,
                  status: statusCode,
                  body: JSON.stringify(body),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode,
            },
            notThrowing: {
              result: { ...body, statusCode },
            },
          });
        });

        it("should handle deleteNonRetry400 ", async () => {
          const body = { message: "Expected bad request message" };
          const statusCode = 400;
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "DELETE",
                  status: statusCode,
                  body: JSON.stringify(body),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode,
            },
            notThrowing: {
              result: { ...body, statusCode },
            },
          });
        });

        it("should handle deleteAsyncRelativeRetry400 ", async () => {
          const pollingPath = `/nonretryerror/deleteasync/retry/failed/operationResults/400`;
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "DELETE",
                  status: 202,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                  headers: createDoubleHeaders({
                    pollingPath,
                    headers: { "Retry-After": "0" },
                  }),
                },
                {
                  method: "GET",
                  path: pollingPath,
                  status: 400,
                  body: `{ "message" : "Expected bad request message", "status": 200 }`,
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode: 400,
            },
            notThrowing: {
              messagePattern: /Polling was unsuccessful/,
            },
          });
        });

        it("should handle postNonRetry400 ", async () => {
          const body = { message: "Expected bad request message" };
          const statusCode = 400;
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "POST",
                  status: statusCode,
                  body: JSON.stringify(body),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode,
            },
            notThrowing: {
              result: { ...body, statusCode },
            },
          });
        });

        it("should handle post202NonRetry400 ", async () => {
          const path = `/nonretryerror/post/202/retry/400`;
          const body = { message: "Expected bad request message" };
          const statusCode = 400;
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "POST",
                  path,
                  status: 202,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                  headers: {
                    Location: path,
                    "Retry-After": "0",
                  },
                },
                {
                  method: "GET",
                  path,
                  status: statusCode,
                  body: JSON.stringify(body),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode,
            },
            notThrowing: {
              result: { ...body, statusCode },
            },
          });
        });

        it("should handle postAsyncRelativeRetry400 ", async () => {
          const pollingPath = `/nonretryerror/postasync/retry/failed/operationResults/400`;
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "POST",
                  status: 202,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                  headers: createDoubleHeaders({
                    pollingPath,
                    headers: { "Retry-After": "0" },
                  }),
                },
                {
                  method: "GET",
                  path: pollingPath,
                  status: 400,
                  body: `{ "message" : "Expected bad request message", "status": 400 }`,
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode: 400,
            },
            notThrowing: {
              messagePattern: /Polling was unsuccessful/,
            },
          });
        });

        it("should handle PutError201NoProvisioningStatePayload ", async () => {
          const response = await runLro({
            routes: [
              {
                method: "PUT",
                status: 201,
              },
            ],
          });
          assert.equal(response.statusCode, 201); // weird!
        });

        it("should handle putAsyncRelativeRetryNoStatusPayload ", async () => {
          const pollingPath = `/error/putasync/retry/failed/operationResults/nostatuspayload`;
          const path = "/error/putasync/retry/nostatuspayload";
          const response = await runLro({
            routes: [
              {
                method: "PUT",
                path,
                status: 200,
                body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                headers: createDoubleHeaders({
                  pollingPath,
                  headers: { "Retry-After": "0" },
                }),
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
              },
              {
                method: "GET",
                path: path,
                status: 200,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
        });

        it("should handle putAsyncRelativeRetryNoStatus ", async () => {
          const path = "/error/putasync/retry/nostatus";
          const pollingPath = `/error/putasync/retry/failed/operationResults/nostatus`;
          const response = await runLro({
            routes: [
              {
                method: "PUT",
                path,
                status: 200,
                body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                headers: createDoubleHeaders({
                  pollingPath,
                  headers: { "Retry-After": "0" },
                }),
              },
              {
                method: "GET",
                path,
                status: 200,
                body: `{ }`,
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ }`,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
        });

        it("should handle delete204Succeeded ", async () => {
          const response = await runLro({
            routes: [
              {
                method: "DELETE",
                status: 204,
              },
            ],
          });
          assert.equal(response.statusCode, 204);
        });

        it("should handle deleteAsyncRelativeRetryNoStatus ", async () => {
          const pollingPath = `/error/deleteasync/retry/failed/operationResults/nostatus`;
          const response = await runLro({
            routes: [
              {
                method: "DELETE",
                status: 202,
                headers: createDoubleHeaders({
                  pollingPath,
                  headers: { "Retry-After": "0" },
                }),
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ }`,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
        });

        it("should handle post202NoLocation ", async () => {
          const response = await runLro({
            routes: [
              {
                method: "POST",
                status: 202,
              },
            ],
          });
          assert.equal(response.statusCode, 202);
        });

        it("should handle postAsyncRelativeRetryNoPayload ", async () => {
          const pollingPath = `/error/postasync/retry/failed/operationResults/nopayload`;
          const response = await runLro({
            routes: [
              {
                method: "POST",
                status: 202,
                headers: createDoubleHeaders({
                  pollingPath,
                  headers: { "Retry-After": "0" },
                }),
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
              },
            ],
          });
          assert.equal(response.statusCode, 200);
        });

        it("should handle put200InvalidJson ", async () => {
          await assertError(
            runLro({
              routes: [
                {
                  method: "PUT",
                  status: 200,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo"`,
                },
              ],
            }),
            {
              name: "SyntaxError",
            },
          );
        });

        it("should handle putAsyncRelativeRetryInvalidHeader ", async () => {
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "PUT",
                  status: 200,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                  headers: createDoubleHeaders({
                    pollingPath: "/foo",
                    headers: { "Retry-After": "/bar" },
                  }),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode: 404,
            },
            notThrowing: {
              partResult: {
                statusCode: 404,
              },
            },
          });
        });

        it("should handle putAsyncRelativeRetryInvalidJsonPolling ", async () => {
          const pollingPath = `/error/putasync/retry/failed/operationResults/invalidjsonpolling`;
          await assertError(
            runLro({
              routes: [
                {
                  method: "PUT",
                  status: 200,
                  body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
                  headers: createDoubleHeaders({
                    pollingPath,
                    headers: { "Retry-After": "0" },
                  }),
                },
                {
                  method: "GET",
                  path: pollingPath,
                  status: 200,
                  body: `{ "status": "Accepted"`,
                },
              ],
            }),
            {
              name: "SyntaxError",
            },
          );
        });

        it("should handle delete202RetryInvalidHeader ", async () => {
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "DELETE",
                  status: 202,
                  headers: {
                    Location: `/foo`,
                    "Retry-After": "/bar",
                  },
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode: 404,
            },
            notThrowing: {
              partResult: {
                statusCode: 404,
              },
            },
          });
        });

        it("should handle deleteAsyncRelativeRetryInvalidHeader ", async () => {
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "DELETE",
                  status: 202,
                  headers: createDoubleHeaders({
                    pollingPath: "/foo",
                    headers: { "Retry-After": "/bar" },
                  }),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode: 404,
            },
            notThrowing: {
              partResult: {
                statusCode: 404,
              },
            },
          });
        });

        it("should handle DeleteAsyncRelativeRetryInvalidJsonPolling ", async () => {
          const pollingPath = `/error/deleteasync/retry/failed/operationResults/invalidjsonpolling`;
          await assertError(
            runLro({
              routes: [
                {
                  method: "DELETE",
                  status: 202,
                  headers: createDoubleHeaders({
                    pollingPath,
                    headers: { "Retry-After": "0" },
                  }),
                },
                {
                  method: "GET",
                  path: pollingPath,
                  status: 200,
                  body: `{ "status": "Accepted"`,
                },
              ],
            }),
            {
              name: "SyntaxError",
            },
          );
        });

        it("should handle post202RetryInvalidHeader ", async () => {
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "POST",
                  status: 202,
                  headers: {
                    Location: `/foo`,
                    "Retry-After": "/bar",
                  },
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode: 404,
            },
            notThrowing: {
              partResult: {
                statusCode: 404,
              },
            },
          });
        });

        it("should handle postAsyncRelativeRetryInvalidHeader ", async () => {
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "POST",
                  status: 202,
                  headers: createDoubleHeaders({
                    pollingPath: "/foo",
                    headers: { "Retry-After": "/bar" },
                  }),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              statusCode: 404,
            },
            notThrowing: {
              partResult: {
                statusCode: 404,
              },
            },
          });
        });

        it("should handle postAsyncRelativeRetryInvalidJsonPolling ", async () => {
          const pollingPath = `/error/postasync/retry/failed/operationResults/invalidjsonpolling`;
          await assertError(
            runLro({
              routes: [
                {
                  method: "POST",
                  status: 202,
                  headers: createDoubleHeaders({
                    pollingPath,
                    headers: { "Retry-After": "/bar" },
                  }),
                },
                {
                  method: "GET",
                  path: pollingPath,
                  status: 200,
                  body: `{ "status": "Accepted"`,
                },
              ],
            }),
            {
              name: "SyntaxError",
            },
          );
        });
      });

      describe("rehydration LRO", () => {
        // fake LRO which means no polling and the initial response would returnt the result directly
        it("could handle rehydration for fake LRO", async () => {
          const bodyObj = {
            properties: { provisioningState: "Succeeded" },
            id: "100",
            name: "foo",
          };
          const retResult = {
            ...bodyObj,
            statusCode: 200,
          };

          const poller = createTestPoller({
            routes: [
              {
                method: "PUT",
                status: 200,
                body: JSON.stringify(bodyObj),
              },
            ],
            implName,
            throwOnNon2xxResponse,
          });
          assert.isUndefined(poller.operationState);
          const serialized = await poller.serialize();
          const expectedSerialized = JSON.stringify({
            state: {
              status: "succeeded",
              config: {
                metadata: { mode: "Body" },
                operationLocation: "path",
                initialUrl: "path",
                requestMethod: "PUT",
              },
              result: retResult,
            },
          });
          assert.equal(serialized, expectedSerialized);
          assert.equal(poller.operationState.status, "succeeded");
          const restoredPoller = createTestPoller({
            routes: [],
            restoreFrom: serialized,
            implName,
            throwOnNon2xxResponse,
          });
          assert.equal(serialized, await restoredPoller.serialize());
          assert.equal(poller.operationState.status, "succeeded");
          assert.deepEqual(poller.result, retResult);
        });

        it("could handle rehydration for real LRO", async () => {
          const bodyObj = {
            properties: { provisioningState: "Succeeded" },
            id: "100",
            name: "foo",
          };
          const retResult: Result = {
            ...bodyObj,
            statusCode: 200,
          };
          const pollingPath = `pollingPath`;
          let pollCount = 0;
          const pollingRoutes = [
            ...Array(10).fill({
              method: "GET",
              path: pollingPath,
              body: `{ "status": "running" }`,
              status: 200,
            }),
            {
              method: "GET",
              path: pollingPath,
              body: JSON.stringify(bodyObj),
              status: 200,
            },
          ];
          const poller = createTestPoller({
            routes: [
              {
                method: "POST",
                status: 202,
                headers: {
                  "Operation-Location": pollingPath,
                },
              },
            ],
            throwOnNon2xxResponse,
            implName,
            updateState: () => {
              pollCount++;
            },
          });
          assert.isUndefined(poller.operationState);
          const serialized = await poller.serialize();
          assert.equal(pollCount, 0);
          const expectedSerialized = JSON.stringify({
            state: {
              status: "running",
              config: {
                metadata: { mode: "OperationLocation" },
                operationLocation: "pollingPath",
                initialUrl: "path",
                requestMethod: "POST",
              },
            },
          });
          assert.equal(serialized, expectedSerialized);
          assert.equal(poller.operationState.status, "running");
          pollCount = 0;
          const restoredPoller = createTestPoller({
            routes: pollingRoutes,
            restoreFrom: serialized,
            implName,
            throwOnNon2xxResponse,
            updateState: () => {
              pollCount++;
            },
          });
          assert.equal(pollCount, 0);
          assert.deepEqual(retResult, await restoredPoller);
          assert.equal(pollCount, 11);
          assert.equal(restoredPoller.operationState.status, "succeeded");
          assert.deepEqual(restoredPoller.result, retResult);
          assert.isUndefined(poller.result);
          // duplicate awaitting would not trigger extra pollings
          await restoredPoller;
          assert.equal(pollCount, 11);
        });
      });

      describe("mutate state", () => {
        it("The state can be mutated in onProgress", async () => {
          let setState = false;
          let check = false;
          const pollingPath = `pollingPath`;
          await runLro({
            routes: [
              {
                method: "POST",
                status: 202,
                headers: {
                  "Operation-Location": pollingPath,
                },
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "status": "running" }`,
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "status": "running" }`,
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "status": "succeeded" }`,
              },
            ],
            onProgress: (state) => {
              if (!setState) {
                (state as any).x = 1;
                setState = true;
              } else {
                assert.ok((state as any).x);
                check = true;
              }
            },
          });
          assert.isTrue(check);
        });

        it("The state can be mutated in updateState", async () => {
          let setState = false;
          let check = false;
          const pollingPath = `pollingPath`;
          await runLro({
            routes: [
              {
                method: "POST",
                status: 202,
                headers: {
                  "Operation-Location": pollingPath,
                },
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "status": "running" }`,
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "status": "running" }`,
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "status": "succeeded" }`,
              },
            ],
            updateState: (state: any) => {
              if (!setState) {
                (state as any).x = 1;
                setState = true;
              } else {
                assert.ok((state as any).x);
                check = true;
              }
            },
          });
          assert.isTrue(check);
        });
      });

      describe("process result", () => {
        it("From a location response", async () => {
          const locationPath = "/postlocation/noretry/succeeded/operationResults/foo/200/";
          const pollingPath = "/postasync/noretry/succeeded/operationResults/foo/200/";
          const headerName = "Operation-Location";
          const result = await runLro({
            routes: [
              {
                method: "POST",
                status: 202,
                headers: {
                  location: locationPath,
                  [headerName]: pollingPath,
                },
                body: `{ "properties": { "provisioningState": "Accepted" }, "id": "100", "name": "foo" }`,
              },
              {
                method: "GET",
                path: pollingPath,
                status: 202,
                body: `{ "status": "Accepted" }`,
                headers: {
                  location: locationPath,
                  [headerName]: pollingPath,
                },
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "properties": { "provisioningState": "Succeeded" }, "id": "100", "name": "foo" }`,
              },
              {
                method: "GET",
                path: locationPath,
                status: 200,
                body: `{ "properties": { "provisioningState": "Succeeded" }, "id": "100", "name": "foo" }`,
              },
            ],
            processResult: (res: unknown) => {
              assert.equal((res as any).id, "100");
              return { ...(res as any), id: "200" };
            },
          });
          assert.deepInclude(result, { id: "200", name: "foo" });
        });

        it("From the initial response", async () => {
          const result = await runLro({
            routes: [
              {
                method: "PUT",
                status: 200,
                body: `{ "properties": { "provisioningState": "Succeeded" }, "id": "100", "name": "foo" }`,
              },
            ],
            processResult: (res: unknown) => {
              assert.equal((res as any).id, "100");
              return { ...(res as any), id: "200" };
            },
          });
          assert.deepInclude(result, { id: "200", name: "foo" });
        });
      });

      describe("poller cancellation", () => {
        it("cancelled poller gives access to partial results", async () => {
          const body = { status: "canceled", results: [1, 2] };
          const pollingPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl";
          const poller = createTestPoller({
            routes: [
              {
                method: "POST",
                status: 202,
                body: "",
                headers: {
                  "Operation-Location": pollingPath,
                },
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: `{ "status": "running" }`,
              },
              {
                method: "GET",
                path: pollingPath,
                status: 200,
                body: JSON.stringify(body),
              },
            ],
            throwOnNon2xxResponse,
            implName,
          });
          await assertDivergentBehavior({
            op: poller.pollUntilDone(),
            throwOnNon2xxResponse,
            throwing: {
              messagePattern: /Operation was canceled/,
            },
            notThrowing: {
              result: { ...body, statusCode: 200 },
            },
          });
          assert.deepEqual(poller.result!.results, [1, 2]);
        });
      });
      describe("abort signals", function () {
        it("poll can be aborted", async () => {
          let pollCount = 0;
          const pollingPath = "pollingPath";
          const poller = createTestPoller({
            routes: [
              {
                method: "POST",
                status: 202,
                headers: {
                  "Operation-Location": pollingPath,
                },
              },
              ...Array(10).fill({
                method: "GET",
                path: pollingPath,
                body: `{ "status": "running" }`,
                status: 200,
              }),
              {
                method: "GET",
                path: pollingPath,
                body: `{ "status": "succeeded" }`,
                status: 200,
              },
            ],
            implName,
            throwOnNon2xxResponse,
            updateState: () => {
              pollCount++;
            },
          });
          const abortController = new AbortController();
          await poller.poll();
          abortController.abort();
          assert.equal(pollCount, 1);
          await assertError(
            poller.poll({
              abortSignal: abortController.signal,
            }),
            {
              messagePattern: /The operation was aborted/,
            },
          );
          assert.isFalse(poller.isDone);
        });

        it("pollUntilDone can be aborted", async () => {
          let pollCount = 0;
          const pollingPath = "pollingPath";
          const poller = createTestPoller({
            routes: [
              {
                method: "POST",
                status: 202,
                headers: {
                  "Operation-Location": pollingPath,
                },
              },
              ...Array(10).fill({
                method: "GET",
                path: pollingPath,
                body: `{ "status": "running" }`,
                status: 200,
              }),
              {
                method: "GET",
                path: pollingPath,
                body: `{ "status": "succeeded" }`,
                status: 200,
              },
            ],
            throwOnNon2xxResponse,
            implName,
            updateState: () => {
              pollCount++;
            },
          });
          const abortController = new AbortController();
          await poller.poll();
          abortController.abort();
          assert.equal(pollCount, 1);
          await assertError(
            poller.pollUntilDone({
              abortSignal: abortController.signal,
            }),
            {
              messagePattern: /The operation was aborted/,
            },
          );
          assert.equal(pollCount, 1);
          assert.isFalse(poller.isDone);
        });

        it("pollUntilDone is aborted when pollCount = 10", async () => {
          let pollCount = 0;
          const pollingPath = "pollingPath";
          const abortController = new AbortController();
          const poller = createTestPoller({
            routes: [
              {
                method: "POST",
                status: 202,
                headers: {
                  "Operation-Location": pollingPath,
                },
              },
              ...Array(20).fill({
                method: "GET",
                path: pollingPath,
                body: `{ "status": "running" }`,
                status: 200,
              }),
              {
                method: "GET",
                path: pollingPath,
                body: `{ "status": "succeeded" }`,
                status: 200,
              },
            ],
            throwOnNon2xxResponse,
            implName,
            updateState: () => {
              pollCount++;
              if (pollCount === 10) {
                abortController.abort();
              }
            },
          });
          await poller.poll();
          assert.equal(pollCount, 1);
          const promise = poller.pollUntilDone({
            abortSignal: abortController.signal,
          });
          await assertError(promise);
          assert.equal(pollCount, 10);
          assert.isFalse(poller.isDone);
        });
      });
      describe("general behavior", function () {
        it("awaitting poller would return result directly", async () => {
          const bodyObj = {
            properties: { provisioningState: "Succeeded" },
            id: "100",
            name: "foo",
          };
          const retResult: Result = {
            ...bodyObj,
            statusCode: 200,
          };
          const pollingPath = `pollingPath`;
          let pollCount = 0;
          const pollingRoutes = [
            {
              method: "POST",
              status: 202,
              headers: {
                "Operation-Location": pollingPath,
              },
            },
            ...Array(10).fill({
              method: "GET",
              path: pollingPath,
              body: `{ "status": "running" }`,
              status: 200,
            }),
            {
              method: "GET",
              path: pollingPath,
              body: JSON.stringify(bodyObj),
              status: 200,
            },
          ];
          const poller = createTestPoller({
            routes: pollingRoutes,
            throwOnNon2xxResponse,
            implName,
            updateState: () => {
              pollCount++;
            },
          });
          assert.isUndefined(poller.operationState);
          assert.isUndefined(poller.result);
          assert.equal(pollCount, 0);
          const result = await poller;
          assert.deepEqual(retResult, result);
          assert.equal(pollCount, 11);
          assert.equal(poller.operationState.status, "succeeded");
          assert.deepEqual(poller.result, retResult);
          assert.equal(poller.result, result);
          // duplicate awaitting would not trigger extra pollings
          await poller;
          assert.equal(pollCount, 11);
        });
        it("poll() doesn't poll after the poller is in a succeed status", async function () {
          const poller = createTestPoller({
            routes: [
              {
                method: "PUT",
                status: 200,
                body: `{ "properties": { "provisioningState": "Succeeded" }, "id": "100", "name": "foo" }`,
              },
            ],
            throwOnNon2xxResponse,
          });
          await poller.poll(); // This will fail if a polling request is sent
          const result = await poller.pollUntilDone();
          assert.equal(result.properties?.provisioningState, "Succeeded");
        });
        it("poll() doesn't poll after the poller is in a failed status", async function () {
          const bodyObj = { properties: { provisioningState: "Failed" }, id: "100", name: "foo" };
          const poller = createTestPoller({
            routes: [
              {
                method: "PUT",
                status: 200,
                body: JSON.stringify(bodyObj),
              },
            ],
            throwOnNon2xxResponse,
          });
          const pollerState = {
            status: "failed",
            config: {
              metadata: { mode: "Body" },
              operationLocation: "path",
              resourceLocation: undefined,
              initialUrl: "path",
              requestMethod: "PUT",
            },
            result: {
              ...bodyObj,
              statusCode: 200,
            },
          };
          await assertDivergentBehavior({
            op: poller.poll(),
            notThrowing: {
              partResult: pollerState,
            },
            throwing: {
              messagePattern: /failed/,
            },
            throwOnNon2xxResponse,
          });
          await assertDivergentBehavior({
            op: poller.pollUntilDone(),
            notThrowing: {
              result: { ...bodyObj, statusCode: 200 },
            },
            throwing: {
              messagePattern: /failed/,
            },
            throwOnNon2xxResponse,
          });
        });
        it("poll() doesn't poll after the poller is in a canceled status", async function () {
          const bodyObj = { properties: { provisioningState: "Canceled" }, id: "100", name: "foo" };
          const poller = createTestPoller({
            routes: [
              {
                method: "PUT",
                status: 200,
                body: JSON.stringify(bodyObj),
              },
            ],
            throwOnNon2xxResponse,
          });
          await assertDivergentBehavior({
            op: poller.poll(),
            notThrowing: {
              partResult: {
                result: {
                  ...bodyObj,
                  statusCode: 200,
                },
              },
            },
            throwing: {
              messagePattern: /canceled/,
            },
            throwOnNon2xxResponse,
          });
          await assertDivergentBehavior({
            op: poller.pollUntilDone(),
            notThrowing: {
              result: { ...bodyObj, statusCode: 200 },
            },
            throwing: {
              messagePattern: /canceled/,
            },
            throwOnNon2xxResponse,
          });
          assert.equal(poller.result?.properties?.provisioningState, "Canceled");
        });
        it("prints an error message based on the error in the status monitor", async () => {
          const pollingPath = "/postlocation/retry/succeeded/operationResults/200/";
          const code = "InvalidRequest";
          const message = "Bad Request";
          const body = { status: "Failed", error: { code, message } };
          await assertDivergentBehavior({
            op: runLro({
              routes: [
                {
                  method: "POST",
                  status: 202,
                  headers: {
                    "Operation-Location": pollingPath,
                  },
                  body: `{ "status": "Running" }`,
                },
                {
                  method: "GET",
                  path: pollingPath,
                  status: 200,
                  body: JSON.stringify(body),
                },
              ],
            }),
            throwOnNon2xxResponse,
            throwing: {
              messagePattern: new RegExp(
                `The long-running operation has failed. ${code}. ${message}`,
              ),
            },
            notThrowing: {
              result: { ...body, statusCode: 200 },
            },
          });
        });
        it("processResult() could be asynchronized", async () => {
          const processResult = async (res: unknown): Promise<Result> => {
            await delay(1);
            return { statusCode: (res as Result).statusCode } as Result;
          };
          const poller = createTestPoller({
            routes: [
              {
                method: "PUT",
                status: 200,
                body: `{ "properties": { "provisioningState": "Succeeded" }, "id": "100", "name": "foo" }`,
              },
            ],
            throwOnNon2xxResponse,
            processResult,
          });
          const result = await poller.pollUntilDone();
          assert.equal(result.statusCode, 200);
          assert.isUndefined(result.properties?.provisioningState);
        });
        it("processResult() could be synchronized", async () => {
          const processResult = async (res: unknown): Promise<Result> => {
            return { statusCode: (res as Result).statusCode } as Result;
          };
          const poller = createTestPoller({
            routes: [
              {
                method: "PUT",
                status: 200,
                body: `{ "properties": { "provisioningState": "Succeeded" }, "id": "100", "name": "foo" }`,
              },
            ],
            throwOnNon2xxResponse,
            processResult,
          });
          const result = await poller.pollUntilDone();
          assert.equal(result.statusCode, 200);
          assert.isUndefined(result.properties?.provisioningState);
        });
        it("submitted() is resolved once the initial response is back and poller state is ready", async () => {
          let pollCount = 0;
          const pollingPath = "pollingPath";
          const poller = createTestPoller({
            routes: [
              {
                method: "POST",
                status: 202,
                headers: {
                  "Operation-Location": pollingPath,
                },
              },
              ...Array(10).fill({
                method: "GET",
                path: pollingPath,
                body: `{ "status": "running" }`,
                status: 200,
              }),
              {
                method: "GET",
                path: pollingPath,
                body: `{ "status": "succeeded" }`,
                status: 200,
              },
            ],
            implName,
            throwOnNon2xxResponse,
            updateState: () => {
              pollCount++;
            },
          });
          assert.isUndefined(poller.operationState);
          await poller.submitted();
          assert.equal(pollCount, 0);
          assert.equal(poller.operationState.status, "running");
        });

        it("readonly attributes would throw errors if trying to override the value", async () => {
          try {
            const poller = createTestPoller({
              routes: [
                {
                  method: "PUT",
                  status: 200,
                  body: `{ "properties": { "provisioningState": "Succeeded" }, "id": "100", "name": "foo" }`,
                },
              ],
              throwOnNon2xxResponse,
            });
            (poller as any).operationState = "foostatus";
            assert.fail("should throw error");
          } catch (e: any) {
            assert.equal(
              e.message,
              "Cannot set property operationState of #<Object> which has only a getter",
            );
          }
        });
      });

      describe("promise poller", () => {
        describe("await the same poller in multiple times", () => {
          it("should be the same result", async () => {
            const poller = createTestPoller({
              routes: [
                {
                  method: "PUT",
                  status: 200,
                  body: `{ "properties": { "provisioningState": "Succeeded" }, "id": "100", "name": "foo" }`,
                },
              ],
              throwOnNon2xxResponse,
            });
            const await1 = await poller;
            const await2 = await poller;
            const await3 = await poller;
            assert.equal(await1.statusCode, 200);
            assert.isTrue(await1 === await2);
            assert.isTrue(await1 === await3);
          });
          it("thenable should return the same result", async () => {
            const poller = createTestPoller({
              routes: [
                {
                  method: "PUT",
                  status: 200,
                  body: `{ "properties": { "provisioningState": "Succeeded" }, "id": "100", "name": "foo" }`,
                },
              ],
              throwOnNon2xxResponse,
            });
            const await1 = await poller.then((result) => {
              assert.equal(result.statusCode, 200);
              return result;
            });
            const await2 = await poller.then((result) => {
              assert.equal(result.statusCode, 200);
              return result;
            });
            assert.isTrue(await1 === await2);
          });
          it("should trigger the whole polling process to server side only once", async () => {
            let pollCount = 0;
            const pollingPath = "pollingPath";
            const poller = createTestPoller({
              routes: [
                {
                  method: "POST",
                  status: 202,
                  headers: {
                    "Operation-Location": pollingPath,
                  },
                },
                ...Array(10).fill({
                  method: "GET",
                  path: pollingPath,
                  body: `{ "status": "running" }`,
                  status: 200,
                }),
                {
                  method: "GET",
                  path: pollingPath,
                  body: `{ "status": "succeeded" }`,
                  status: 200,
                },
              ],
              implName,
              throwOnNon2xxResponse,
              updateState: () => {
                pollCount++;
              },
            });
            await poller;
            await poller;
            await poller;
            assert.equal(pollCount, 11);
          });
          it("should catch the same error in multiple times", async () => {
            const body = { status: "canceled", results: [1, 2] };
            const errMsg = "Operation was canceled";
            const pollingPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl";
            const poller = createTestPoller({
              routes: [
                {
                  method: "POST",
                  status: 202,
                  headers: {
                    location: "/postasync/retry/succeeded/operationResults/foo/200/",
                    ["Operation-Location"]: pollingPath,
                    "retry-after": "0",
                  },
                  body: `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo"}`,
                },
                {
                  method: "GET",
                  path: pollingPath,
                  status: 200,
                  body: JSON.stringify(body),
                },
              ],
              implName,
              throwOnNon2xxResponse: true,
            });
            try {
              await poller;
              assert.fail("should throw error");
            } catch (e: any) {
              assert.equal(e.message, errMsg);
            }
            try {
              await poller;
              assert.fail("should throw error");
            } catch (e: any) {
              assert.equal(e.message, errMsg);
            }
          });
          it("should work properly when mixing catch and await", async () => {
            const body = { status: "canceled", results: [1, 2] };
            const errMsg = "Operation was canceled";
            const pollingPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl";
            const poller = createTestPoller({
              routes: [
                {
                  method: "POST",
                  status: 202,
                  headers: {
                    location: "/postasync/retry/succeeded/operationResults/foo/200/",
                    ["Operation-Location"]: pollingPath,
                    "retry-after": "0",
                  },
                  body: `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo"}`,
                },
                {
                  method: "GET",
                  path: pollingPath,
                  status: 200,
                  body: JSON.stringify(body),
                },
              ],
              implName,
              throwOnNon2xxResponse: true,
            });
            let err: any;
            try {
              await poller.catch((e) => {
                err = e;
              });
              assert.equal(err.message, errMsg);
            } catch (e: any) {
              assert.fail("should not throw error");
            }
            try {
              await poller;
              assert.fail("should throw error");
            } catch (e: any) {
              assert.equal(e.message, errMsg);
            }
          });
        });
      });
    });
  },
);
