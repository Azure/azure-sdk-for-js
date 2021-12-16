// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, createHttpHeaders } from "@azure/core-rest-pipeline";
import { buildProcessMultipleRequests, buildResponse } from "./utils";

export function put200Succeeded(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    200,
    `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`
  );
}

export function put201Succeeded(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    201,
    `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`
  );
}

export function put201SucceededNoState(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `{"id": "100", "name": "foo" }`);
}

export function deleteNoHeader(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    200,
    undefined,
    createHttpHeaders({ Location: "/delete/noheader/operationresults/123" })
  );
}

export function put202Retry200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({ Location: "/put/202/retry/operationResults/200" })
  );
}

export function put202RetryOperationResults200(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `{"id": "100", "name": "foo" }`);
}

export function putNoHeader202200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({ Location: "/put/noheader/operationresults" })
  );
}

export function putSubresource202200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "subresource": "sub1" }`,
    createHttpHeaders({ Location: "/putsubresource/operationresults" })
  );
}

export function putNonresource20200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({ Location: "/putnonresource/operationresults" })
  );
}

export function delete204Succeeded(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 204);
}

export function postDoubleHeadersFinalLocationGet(request: PipelineRequest): PipelineResponse {
  return {
    request: request,
    status: 202,
    headers: createHttpHeaders({
      "Azure-AsyncOperation": `/LROPostDoubleHeadersFinalLocationGet/asyncOperationUrl`,
      Location: `/LROPostDoubleHeadersFinalLocationGet/location`
    })
  };
}

export function postDoubleHeadersFinalLocationGetAsyncOperationUrl(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ "status": "succeeded" }`);
}

export function postDoubleHeadersFinalLocationGetLocation(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ "id": "100", "name": "foo" }`);
}

export function postDoubleHeadersFinalAzureHeaderGet(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    "",
    createHttpHeaders({
      "Azure-AsyncOperation": `/LROPostDoubleHeadersFinalAzureHeaderGet/asyncOperationUrl`,
      Location: `/LROPostDoubleHeadersFinalAzureHeaderGet/location`
    })
  );
}

export function postDoubleHeadersFinalAzureHeaderGetAsyncOperationUrl(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ "status": "succeeded", "id": "100"}`);
}

export function postDoubleHeadersFinalAzureHeaderGetLocation(
  _request: PipelineRequest
): PipelineResponse {
  throw new Error(
    "You must NOT do a final GET on Location in LROPostDoubleHeadersFinalAzureHeaderGet"
  );
}

export function postPayload200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({ Location: `/post/payload/200`, "Retry-After": "0" })
  );
}

export function getPayload200(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `{"id":"1", "name":"product"}`);
}

export function postDoubleHeadersFinalAzureHeaderGetDefault(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(
    request,
    202,
    "",
    createHttpHeaders({
      Location: "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/location",
      "Azure-AsyncOperation": "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl"
    })
  );
}

export function getDoubleHeadersFinalAzureHeaderGetDefaultAsyncOperationUrl(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ "status": "succeeded"}`);
}

export function getDoubleHeadersFinalAzureHeaderGetDefaultLocation(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ "id": "100", "name": "foo" }`);
}

export function postList(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    200,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": `/list/pollingGet`,
      Location: `/list/finalGet`
    })
  );
}

export function getListPollingGet(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `{ "status": "Succeeded" }`);
}

export function getListFinalGet(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `[{ "id": "100", "name": "foo" }]`);
}

export function putNonresourceAsync202200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": `/putnonresourceasync/operationresults/123`,
      Location: `somethingBadWhichShouldNotBeUsed`
    })
  );
}

export function getNonresourceAsync202200(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `{ "name": "sku" , "id": "100" }`);
}

export function patchAsync202200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": `/patchasync/operationresults/123`,
      Location: `/patchasync/succeeded`
    })
  );
}

export function getPatchAsyncSucceeded(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `{ "name": "sku" , "id": "100" }`);
}

export const putNonresourceAsyncOperationresults123 = buildProcessMultipleRequests(
  (req) => buildResponse(req, 200, `{ "status": "InProgress"}`),
  (req) => buildResponse(req, 200, `{ "status": "Succeeded"}`)
);

export const patchAsyncOperationresults123 = buildProcessMultipleRequests(
  (req) =>
    buildResponse(
      req,
      200,
      `{ "status": "InProgress"}`,
      createHttpHeaders({
        "Azure-AsyncOperation": `/patchasync/operationresults/123`
      })
    ),
  (req) => buildResponse(req, 200, `{ "status": "Succeeded"}`)
);

export function putasyncNoheader201200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    201,
    `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      "Azure-AsyncOperation": `/putasync/noheader/operationresults/123`,
      Location: `somethingBadWhichShouldNotBeUsed`
    })
  );
}

export function getasyncNoheader201200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    200,
    `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`
  );
}

export const putasyncNoheaderOperationresults123 = buildProcessMultipleRequests(
  (req) => buildResponse(req, 200, `{ "status": "InProgress"}`),
  (req) => buildResponse(req, 200, `{ "status": "Succeeded"}`)
);

export function putSubresourceAsync202200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "subresource": "sub1" }`,
    createHttpHeaders({
      "Azure-AsyncOperation": `/putsubresourceasync/operationresults/123`,
      Location: `somethingBadWhichShouldNotBeUsed`
    })
  );
}

export function getSubresourceAsync202200(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    200,
    `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "subresource": "sub1" }`
  );
}

export const putSubresourceasyncOperationresults123 = buildProcessMultipleRequests(
  (req) => buildResponse(req, 200, `{ "status": "InProgress"}`),
  (req) => buildResponse(req, 200, `{ "status": "Succeeded"}`)
);

export function deleteasyncNoheader202204(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": `/deleteasync/noheader/operationresults/123`,
      Location: `somethingBadWhichShouldNotBeUsed`
    })
  );
}

export const deleteNoHeaderOperationResults = buildProcessMultipleRequests(
  (req) => buildResponse(req, 202),
  (req) => buildResponse(req, 204)
);
export const putNoHeaderOperationResults = buildProcessMultipleRequests(
  (req) => buildResponse(req, 202),
  (req) =>
    buildResponse(
      req,
      200,
      `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`
    )
);
export const putSubresourceOperationResults = buildProcessMultipleRequests(
  (req) => buildResponse(req, 202),
  (req) =>
    buildResponse(
      req,
      200,
      `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "subresource": "sub1" }`
    )
);
export const putNonresourceOperationResults = buildProcessMultipleRequests(
  (req) => buildResponse(req, 202),
  (req) => buildResponse(req, 200, `{ "name": "sku" , "id": "100" }`)
);

export const deleteasyncNoheaderOperationresults123 = buildProcessMultipleRequests(
  (req: PipelineRequest) => buildResponse(req, 200, `{ "status": "InProgress"}`),
  (req: PipelineRequest) => buildResponse(req, 200, `{ "status": "Succeeded"}`)
);

export function nonretryerrorPut400(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 400);
}

export function nonretryerrorPut201creating400(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    201,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`
  );
}

export function getNonretryerrorPut201creating400(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 400, `{ "message" : "Error from the server" }`);
}

export function nonretryerrorPut201creating400invalidjson(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(
    request,
    201,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`
  );
}

export function getNonretryerrorPut201creating400invalidjson(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 400, `{ "message" : "Error from the server" }`);
}

export function nonretryerrorPutasyncRetry400(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/nonretryerror/putasync/retry/failed/operationResults/400`;
  return buildResponse(
    request,
    200,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "0"
    })
  );
}

export function nonretryerrorPutasyncRetryFailedOperationResults400(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 400);
}

export function nonretryerrorDelete202retry400(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      Location: `/nonretryerror/delete/202/retry/400`,
      "Retry-After": "0"
    })
  );
}

export function getNonretryerrorDelete202retry400(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 400, `{ "message" : "Expected bad request message" }`);
}

export function nonretryerrorDelete400(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 400, `{ "message" : "Expected bad request message" }`);
}

export function nonretryerrorDeleteasyncRetry400(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/nonretryerror/deleteasync/retry/failed/operationResults/400`;
  return buildResponse(
    request,
    202,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "0"
    })
  );
}

export function nonretryerrorDeleteasyncRetryFailedOperationResults400(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(
    request,
    400,
    `{ "message" : "Expected bad request message", "status": 200 }`
  );
}

export function nonretryerrorPost400(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 400, `{ "message" : "Expected bad request message" }`);
}

export function nonretryerrorPost202retry400(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      Location: `/nonretryerror/post/202/retry/400`,
      "Retry-After": "0"
    })
  );
}

export function getNonretryerrorPost202retry400(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 400, `{ "message" : "Expected bad request message" }`);
}

export function nonretryerrorPostasyncRetry400(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/nonretryerror/postasync/retry/failed/operationResults/400`;
  return buildResponse(
    request,
    202,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "0"
    })
  );
}

export function nonretryerrorPostasyncRetryFailedOperationResults400(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 400, `{ "message" : "Expected bad request message" }`);
}

export function errorPut201noprovisioningstatepayload(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 201);
}

export function errorPutasyncRetryNostatuspayload(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/error/putasync/retry/failed/operationResults/nostatuspayload`;
  return buildResponse(
    request,
    200,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "0"
    })
  );
}

export function errorPutasyncRetryFailedOperationResultsNostatuspayload(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200);
}

export function errorPutasyncRetryNostatus(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/error/putasync/retry/failed/operationResults/nostatus`;
  return buildResponse(
    request,
    200,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "0"
    })
  );
}

export function errorPutasyncRetryFailedOperationResultsNostatus(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ }`);
}

export function errorDelete204nolocation(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 204);
}

export function errorDeleteasyncRetryNostatus(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/error/deleteasync/retry/failed/operationResults/nostatus`;
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "0"
    })
  );
}

export function errorDeleteasyncRetryFailedOperationResultsNostatus(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ }`);
}

export function errorPost202nolocation(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 202);
}

export function errorPostasyncRetryNopayload(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/error/postasync/retry/failed/operationResults/nopayload`;
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "0"
    })
  );
}

export function errorPostasyncRetryFailedOperationResultsNopayload(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200);
}

export function errorPut200invalidjson(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    200,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo"`
  );
}

export function errorPutasyncRetryInvalidheader(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/foo`;
  return buildResponse(
    request,
    200,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "/bar"
    })
  );
}

export function errorPutasyncRetryInvalidjsonpolling(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/error/putasync/retry/failed/operationResults/invalidjsonpolling`;
  return buildResponse(
    request,
    200,
    `{ "properties": { "provisioningState": "Creating"}, "id": "100", "name": "foo" }`,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "0"
    })
  );
}

export function errorPutasyncRetryFailedOperationResultsInvalidjsonpolling(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ "status": "Accepted"`);
}

export function errorDelete202RetryInvalidheader(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      Location: `/foo`,
      "Retry-After": "/bar"
    })
  );
}

export function errorDeleteasyncRetryInvalidheader(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/foo`;
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "/bar"
    })
  );
}

export function errorDeleteasyncRetryInvalidjsonpolling(
  request: PipelineRequest
): PipelineResponse {
  const pollingUri = `/error/deleteasync/retry/failed/operationResults/invalidjsonpolling`;
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "0"
    })
  );
}

export function errorDeleteasyncRetryFailedOperationResultsInvalidjsonpolling(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ "status": "Accepted"`);
}

export function errorPost202RetryInvalidheader(request: PipelineRequest): PipelineResponse {
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      Location: `/foo`,
      "Retry-After": "/bar"
    })
  );
}

export function errorPostasyncRetryInvalidheader(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/foo`;
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "/bar"
    })
  );
}

export function errorPostasyncRetryInvalidjsonpolling(request: PipelineRequest): PipelineResponse {
  const pollingUri = `/error/postasync/retry/failed/operationResults/invalidjsonpolling`;
  return buildResponse(
    request,
    202,
    undefined,
    createHttpHeaders({
      "Azure-AsyncOperation": pollingUri,
      Location: pollingUri,
      "Retry-After": "/bar"
    })
  );
}

export function errorPostasyncRetryFailedOperationResultsInvalidjsonpolling(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ "status": "Accepted"`);
}
