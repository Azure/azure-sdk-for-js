// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertError, createDoubleHeaders } from "./utils/utils";
import { createPoller, runLro } from "./utils/router";
import { RawResponse } from "../src";
import { assert } from "chai";
import { matrix } from "@azure/test-utils";

describe("Lro Engine", function () {
  describe("No polling", () => {
    it("should handle delete204Succeeded", async () => {
      const response = await runLro({
        routes: [{ method: "DELETE", path: "/delete/204/succeeded", status: 204 }],
      });
      assert.equal(response.statusCode, 204);
    });

    it("put201Succeeded", async function () {
      const result = await runLro({
        routes: [
          {
            method: "PUT",
            path: "/put/201/succeeded",
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
      await assertError(
        runLro({
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
        }),
        {
          messagePattern:
            /Received unexpected HTTP status code 204 while polling. This may indicate a server issue./,
        }
      );
    });

    it("should handle deleteNoHeaderInRetry", async () => {
      const pollingPath = "/delete/noheader/operationresults/123";
      await assertError(
        runLro({
          routes: [
            {
              method: "DELETE",
              path: "/delete/noheader",
              status: 200,
              headers: { Location: pollingPath },
            },
            { method: "GET", path: pollingPath, status: 202 },
            { method: "GET", path: pollingPath, status: 204 },
          ],
        }),
        {
          messagePattern:
            /Received unexpected HTTP status code 204 while polling. This may indicate a server issue./,
        }
      );
    });

    it("should handle put202Retry200", async () => {
      const pollingPath = "/put/202/retry/operationResults/200";
      const response = await runLro({
        routes: [
          {
            method: "PUT",
            path: "/put/202/retry/200",
            status: 202,
            headers: { Location: pollingPath },
          },
          { method: "GET", path: pollingPath, status: 200, body: `{"id": "100", "name": "foo" }` },
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
            path: "/put/noheader/202/200",
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
            path: "/putsubresource/202/200",
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
            path: "/putnonresource/202/200",
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
      await assertError(
        runLro({
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
        }),
        {
          messagePattern:
            /Received unexpected HTTP status code 204 while polling. This may indicate a server issue./,
        }
      );
    });

    it("should handle deleteProvisioning202Accepted200Succeeded", async () => {
      const pollingPath = "/delete/provisioning/202/accepted/200/succeeded";
      const response = await runLro({
        routes: [
          {
            method: "DELETE",
            path: "/delete/provisioning/202/accepted/200/succeeded",
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
      const result = await runLro({
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
      assert.equal(result.properties?.provisioningState, "Failed");
    });

    it("should handle deleteProvisioning202Deletingcanceled200", async () => {
      const path = "/delete/provisioning/202/deleting/200/canceled";
      const result = await runLro({
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
      assert.equal(result.properties?.provisioningState, "Canceled");
    });
  });

  describe("Polling from body", () => {
    it("put200Succeeded", async function () {
      const result = await runLro({
        routes: [
          {
            method: "PUT",
            path: "/put/200/succeeded",
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
            path: "/put/200/succeeded/nostate",
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
      await assertError(
        runLro({
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
              body: `{"properties":{"provisioningState":"Canceled"}}`,
            },
          ],
        }),
        {
          messagePattern: /Poller cancelled/,
        }
      );
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
      await assertError(
        runLro({
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
              body: `{"properties":{"provisioningState":"Failed"}}`,
            },
          ],
        }),
        {
          messagePattern: /The long-running operation has failed./,
        }
      );
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
          const operationLocationPath = "/LROPostDoubleHeadersFinalLocationGet/asyncOperationUrl";
          const resourceLocationPath = `/LROPostDoubleHeadersFinalLocationGet/location`;
          const result = await runLro({
            routes: [
              {
                method: "POST",
                path: `/LROPostDoubleHeadersFinalLocationGet`,
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
          const operationLocationPath = "/LROPostDoubleHeadersFinalLocationGet/asyncOperationUrl";
          const resourceLocationPath = `/LROPostDoubleHeadersFinalLocationGet/location`;
          const result = await runLro({
            routes: [
              {
                method: "GET",
                path: `/LROPostDoubleHeadersFinalLocationGet`,
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
          const operationLocationPath = "/LROPostDoubleHeadersFinalLocationGet/asyncOperationUrl";
          const result = await runLro({
            routes: [
              {
                method: "GET",
                path: `/LROPostDoubleHeadersFinalLocationGet`,
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
                path: `/LROPostDoubleHeadersFinalLocationGet`,
                status: 200,
                body: `{ "id": "100", "name": "foo" }`,
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
                path: `/LROPostDoubleHeadersFinalAzureHeaderGet`,
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
            lroResourceLocationConfig: "azure-async-operation",
          });
          assert.equal(result.statusCode, 200);
          assert.equal(result.id, "100");
        });

        it("should handle postDoubleHeadersFinalAzureHeaderGetDefault", async () => {
          const resourceLocationPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/location";
          const pollingPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl";
          const result = await runLro({
            routes: [
              {
                method: "POST",
                path: `/LROPostDoubleHeadersFinalAzureHeaderGetDefault`,
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
                path: `/delete/retry/succeeded`,
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
                path: `/delete/noretry/succeeded`,
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
          await assertError(
            runLro({
              routes: [
                {
                  method: "DELETE",
                  path: `/delete/retry/canceled`,
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
                  body: `{"status":"Canceled"}`,
                },
              ],
            }),
            {
              messagePattern: /Poller cancelled/,
            }
          );
        });

        it("should handle DeleteAsyncRetryFailed", async () => {
          const pollingPath = "/deleteasync/retry/failed/operationResults/200/";
          await assertError(
            runLro({
              routes: [
                {
                  method: "DELETE",
                  path: `/delete/retry/failed`,
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
                  body: `{"status":"Failed"}`,
                },
              ],
            }),
            {
              messagePattern: /The long-running operation has failed./,
            }
          );
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
                path: `/list`,
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
          await assertError(
            runLro({
              routes: [
                {
                  method: "PUT",
                  path: `/put/retry/failed`,
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
                  body: `{"status":"Failed"}`,
                },
              ],
            }),
            {
              messagePattern: /The long-running operation has failed./,
            }
          );
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

        it("should handle patchAsync", async () => {
          const resourceLocationPath = `/patchasync/succeeded`;
          const pollingPath = `/patchasync/operationresults/123`;
          const result = await runLro({
            routes: [
              {
                method: "PATCH",
                path: `/patch/202/200`,
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
          await assertError(
            runLro({
              routes: [
                {
                  method: "PUT",
                  path: `/put/noretry/canceled`,
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
                  body: `{"status":"Canceled"}`,
                },
              ],
            }),
            {
              messagePattern: /Poller cancelled/,
            }
          );
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
                path: `/delete/noheader/202/204`,
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
                path: `/post/noretry/succeeded`,
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
          await assertError(
            runLro({
              routes: [
                {
                  method: "POST",
                  path: `/post/retry/failed`,
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
                  body: `{"status":"Failed"}`,
                },
              ],
            }),
            {
              messagePattern: /The long-running operation has failed./,
            }
          );
        });

        it("should handle postAsyncRetrySucceeded", async () => {
          const locationPath = "/postlocation/retry/succeeded/operationResults/foo/200/";
          const pollingPath = "/postlocation/retry/succeeded/operationResults/200/";
          const result = await runLro({
            routes: [
              {
                method: "POST",
                path: `/post/retry/succeeded`,
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

        it("should handle postAsyncRetrycanceled", async () => {
          const pollingPath = "/postasync/retry/canceled/operationResults/200/";
          await assertError(
            runLro({
              routes: [
                {
                  method: "POST",
                  path: `/post/retry/canceled`,
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
                  body: `{"status":"Canceled"}`,
                },
              ],
            }),
            {
              messagePattern: /Poller cancelled/,
            }
          );
        });
      });
    }
  );

  describe("LRO Sad scenarios", () => {
    it("should handle PutNonRetry400 ", async () => {
      await assertError(
        runLro({ routes: [{ method: "PUT", path: "/nonretryerror/put/400", status: 400 }] }),
        {
          statusCode: 400,
        }
      );
    });

    it("should handle putNonRetry201Creating400 ", async () => {
      const path = "/nonretryerror/put/201/creating/400";
      await assertError(
        runLro({
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
              status: 400,
              body: `{ "message" : "Error from the server" }`,
            },
          ],
        }),
        {
          statusCode: 400,
        }
      );
    });

    it("should throw with putNonRetry201Creating400InvalidJson ", async () => {
      const path = "/nonretryerror/put/201/creating/400/invalidjson";
      await assertError(
        runLro({
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
              status: 400,
              body: `{ "message" : "Error from the server" }`,
            },
          ],
        }),
        {
          statusCode: 400,
        }
      );
    });

    it("should handle putAsyncRelativeRetry400 ", async () => {
      const pollingPath = `/nonretryerror/putasync/retry/failed/operationResults/400`;
      await assertError(
        runLro({
          routes: [
            {
              method: "PUT",
              path: "/nonretryerror/putasync/retry/400",
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
              status: 400,
            },
          ],
        }),
        {
          statusCode: 400,
        }
      );
    });

    it("should handle delete202NonRetry400 ", async () => {
      const path = "/nonretryerror/delete/202/retry/400";
      await assertError(
        runLro({
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
              status: 400,
              body: `{ "message" : "Expected bad request message" }`,
            },
          ],
        }),
        {
          statusCode: 400,
        }
      );
    });

    it("should handle deleteNonRetry400 ", async () => {
      await assertError(
        runLro({
          routes: [
            {
              method: "DELETE",
              path: "/nonretryerror/delete/400",
              status: 400,
              body: `{ "message" : "Expected bad request message" }`,
            },
          ],
        }),
        {
          statusCode: 400,
        }
      );
    });

    it("should handle deleteAsyncRelativeRetry400 ", async () => {
      const pollingPath = `/nonretryerror/deleteasync/retry/failed/operationResults/400`;
      await assertError(
        runLro({
          routes: [
            {
              method: "DELETE",
              path: "/nonretryerror/deleteasync/retry/400",
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
        {
          statusCode: 400,
        }
      );
    });

    it("should handle postNonRetry400 ", async () => {
      await assertError(
        runLro({
          routes: [
            {
              method: "POST",
              path: "/nonretryerror/post/400",
              status: 400,
              body: `{ "message" : "Expected bad request message" }`,
            },
          ],
        }),
        {
          statusCode: 400,
        }
      );
    });

    it("should handle post202NonRetry400 ", async () => {
      const path = `/nonretryerror/post/202/retry/400`;
      await assertError(
        runLro({
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
              status: 400,
              body: `{ "message" : "Expected bad request message" }`,
            },
          ],
        }),
        {
          statusCode: 400,
        }
      );
    });

    it("should handle postAsyncRelativeRetry400 ", async () => {
      const pollingPath = `/nonretryerror/postasync/retry/failed/operationResults/400`;
      await assertError(
        runLro({
          routes: [
            {
              method: "POST",
              path: "/nonretryerror/postasync/retry/400",
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
              body: `{ "message" : "Expected bad request message" }`,
            },
          ],
        }),
        {
          statusCode: 400,
        }
      );
    });

    it("should handle PutError201NoProvisioningStatePayload ", async () => {
      const response = await runLro({
        routes: [
          {
            method: "PUT",
            path: "/error/put/201/noprovisioningstatepayload",
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
            path: "/error/delete/204/nolocation",
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
            path: "/error/deleteasync/retry/nostatus",
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
            path: "/error/post/202/nolocation",
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
            path: "/error/postasync/retry/nopayload",
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
              path: "/error/put/200/invalidjson",
              status: 200,
              body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo"`,
            },
          ],
        }),
        {
          messagePattern: /Unexpected end of JSON input/,
        }
      );
    });

    it("should handle putAsyncRelativeRetryInvalidHeader ", async () => {
      await assertError(
        runLro({
          routes: [
            {
              method: "PUT",
              path: "/error/putasync/retry/invalidheader",
              status: 200,
              body: `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
              headers: createDoubleHeaders({
                pollingPath: "/foo",
                headers: { "Retry-After": "/bar" },
              }),
            },
          ],
        }),
        {
          statusCode: 404,
        }
      );
    });

    it("should handle putAsyncRelativeRetryInvalidJsonPolling ", async () => {
      const pollingPath = `/error/putasync/retry/failed/operationResults/invalidjsonpolling`;
      await assertError(
        runLro({
          routes: [
            {
              method: "PUT",
              path: "/error/putasync/retry/invalidjsonpolling",
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
          messagePattern: /Unexpected end of JSON input/,
        }
      );
    });

    it("should handle delete202RetryInvalidHeader ", async () => {
      await assertError(
        runLro({
          routes: [
            {
              method: "DELETE",
              path: "/error/delete/202/retry/invalidheader",
              status: 202,
              headers: {
                Location: `/foo`,
                "Retry-After": "/bar",
              },
            },
          ],
        }),
        {
          statusCode: 404,
        }
      );
    });

    it("should handle deleteAsyncRelativeRetryInvalidHeader ", async () => {
      await assertError(
        runLro({
          routes: [
            {
              method: "DELETE",
              path: "/error/deleteasync/retry/invalidheader",
              status: 202,
              headers: createDoubleHeaders({
                pollingPath: "/foo",
                headers: { "Retry-After": "/bar" },
              }),
            },
          ],
        }),
        {
          statusCode: 404,
        }
      );
    });

    it("should handle DeleteAsyncRelativeRetryInvalidJsonPolling ", async () => {
      const pollingPath = `/error/deleteasync/retry/failed/operationResults/invalidjsonpolling`;
      await assertError(
        runLro({
          routes: [
            {
              method: "DELETE",
              path: "/error/deleteasync/retry/invalidjsonpolling",
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
          messagePattern: /Unexpected end of JSON input/,
        }
      );
    });

    it("should handle post202RetryInvalidHeader ", async () => {
      await assertError(
        runLro({
          routes: [
            {
              method: "POST",
              path: "/error/post/202/retry/invalidheader",
              status: 202,
              headers: {
                Location: `/foo`,
                "Retry-After": "/bar",
              },
            },
          ],
        }),
        {
          statusCode: 404,
        }
      );
    });

    it("should handle postAsyncRelativeRetryInvalidHeader ", async () => {
      await assertError(
        runLro({
          routes: [
            {
              method: "POST",
              path: "/error/postasync/retry/invalidheader",
              status: 202,
              headers: createDoubleHeaders({
                pollingPath: "/foo",
                headers: { "Retry-After": "/bar" },
              }),
            },
          ],
        }),
        {
          statusCode: 404,
        }
      );
    });

    it("should handle postAsyncRelativeRetryInvalidJsonPolling ", async () => {
      const pollingPath = `/error/postasync/retry/failed/operationResults/invalidjsonpolling`;
      await assertError(
        runLro({
          routes: [
            {
              method: "POST",
              path: "/error/postasync/retry/invalidjsonpolling",
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
          messagePattern: /Unexpected end of JSON input/,
        }
      );
    });
  });

  describe("serialized state", () => {
    let state: any, serializedState: string;
    it("should handle serializing the state", async () => {
      const poller = createPoller({
        routes: [
          {
            method: "PUT",
            path: "/put/200/succeeded",
            status: 200,
            body: `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`,
          },
        ],
      });
      poller.onProgress((currentState) => {
        if (state === undefined && serializedState === undefined) {
          state = currentState;
          serializedState = JSON.stringify({ state: currentState });
          assert.equal(serializedState, poller.toString());
        }
      });
      await poller.pollUntilDone();
      assert.ok(state.initialRawResponse);
    });
  });

  describe("mutate state", () => {
    it("The state can be mutated in onProgress", async () => {
      const pollingPath = `/error/postasync/retry/failed/operationResults/nopayload`;
      const poller = createPoller({
        routes: [
          {
            method: "POST",
            path: "/error/postasync/retry/nopayload",
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
        ],
      });
      poller.onProgress((currentState) => {
        // Abruptly stop the LRO after the first poll request without getting a result
        currentState.isCompleted = true;
      });
      const result = await poller.pollUntilDone();
      // there is no result because the poller did not run to completion.
      assert.isUndefined(result);
    });

    it("The state can be mutated in processState", async () => {
      const pollingPath = `/error/postasync/retry/failed/operationResults/nopayload`;
      const poller = createPoller({
        routes: [
          {
            method: "POST",
            path: "/error/postasync/retry/nopayload",
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
        ],
        updateState: (state: any, lastResponse: RawResponse) => {
          assert.ok(lastResponse);
          assert.ok(lastResponse?.statusCode);
          // Abruptly stop the LRO after the first poll request without getting a result
          state.isCompleted = true;
        },
      });
      const result = await poller.pollUntilDone();
      // there is no result because the poller did not run to completion.
      assert.isUndefined(result);
    });
  });

  describe("process result", () => {
    it("The final result can be processed using processResult", async () => {
      const locationPath = "/postlocation/noretry/succeeded/operationResults/foo/200/";
      const pollingPath = "/postasync/noretry/succeeded/operationResults/foo/200/";
      const headerName = "Operation-Location";
      const poller = createPoller({
        routes: [
          {
            method: "POST",
            path: `/post/noretry/succeeded`,
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
        processResult: (result: unknown, state: any) => {
          const serializedState = JSON.stringify({ state: state });
          assert.equal(serializedState, poller.toString());
          assert.ok(state.initialRawResponse);
          assert.ok(state.pollingURL);
          assert.equal((result as any).id, "100");
          return { ...(result as any), id: "200" };
        },
      });
      const result = await poller.pollUntilDone();
      assert.deepInclude(result, { id: "200", name: "foo" });
    });
  });

  describe("poller cancellation", () => {
    it("isCancel is set after the cancellation callback resolves", async () => {
      const resourceLocationPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/location";
      const pollingPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl";
      let run = false;
      const poller = createPoller({
        routes: [
          {
            method: "POST",
            path: `/LROPostDoubleHeadersFinalAzureHeaderGetDefault`,
            status: 202,
            body: "",
            headers: {
              Location: resourceLocationPath,
              "Operation-Location": pollingPath,
            },
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: `{ "status": "running"}`,
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: `{ "status": "canceled" }`,
          },
        ],
        cancel: async () => {
          run = true;
        },
      });
      assert.isUndefined(poller.getOperationState().isCancelled);
      await poller.poll();
      assert.isUndefined(poller.getOperationState().isCancelled);
      await poller.cancelOperation();
      assert.isTrue(run);
      assert.isUndefined(poller.getOperationState().isCancelled);
      await Promise.all([
        assertError(poller.pollUntilDone(), {
          messagePattern: /Poller cancelled/,
        }),
        assertError(poller.poll(), {
          messagePattern: /The long-running operation has been canceled./,
        }),
      ]);
      assert.isTrue(poller.getOperationState().isCancelled);
    });

    it("isCancel is not set when the cancellation callback throws", async () => {
      const resourceLocationPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/location";
      const pollingPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl";
      let run = false;
      const poller = createPoller({
        routes: [
          {
            method: "POST",
            path: `/LROPostDoubleHeadersFinalAzureHeaderGetDefault`,
            status: 202,
            body: "",
            headers: {
              Location: resourceLocationPath,
              "Operation-Location": pollingPath,
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
        cancel: async () => {
          run = true;
          throw new Error();
        },
      });
      assert.isUndefined(poller.getOperationState().isCancelled);
      await poller.poll();
      assert.isUndefined(poller.getOperationState().isCancelled);
      await assert.isRejected(poller.cancelOperation());
      assert.isTrue(run);
      assert.isUndefined(poller.getOperationState().isCancelled);
    });

    it("cancelled poller gives access to partial results", async () => {
      const pollingPath = "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl";
      const poller = createPoller({
        routes: [
          {
            method: "POST",
            path: `/LROPostDoubleHeadersFinalAzureHeaderGetDefault`,
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
            body: `{ "status": "running"}`,
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: `{ "status": "canceled", "results": [1,2] }`,
          },
        ],
      });
      await assertError(poller.pollUntilDone(), { messagePattern: /Poller cancelled/ });
      const result = poller.getResult();
      assert.deepEqual(result!.results, [1, 2]);
    });
  });
});
