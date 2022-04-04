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

function postDoubleHeadersFinalLocationGet(
  headerName: string
): (request: PipelineRequest) => PipelineResponse {
  return function (request: PipelineRequest): PipelineResponse {
    const headers = createHttpHeaders({
      Location: `/LROPostDoubleHeadersFinalLocationGet/location`,
    });
    headers.set(headerName, `/LROPostDoubleHeadersFinalLocationGet/asyncOperationUrl`);
    return {
      request: request,
      status: 202,
      headers: headers,
    };
  };
}

export const postAsyncDoubleHeadersFinalLocationGet =
  postDoubleHeadersFinalLocationGet("Azure-AsyncOperation");
export const postLocationDoubleHeadersFinalLocationGet =
  postDoubleHeadersFinalLocationGet("Operation-Location");

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

function postDoubleHeadersFinalAzureHeaderGet(
  headerName: string
): (request: PipelineRequest) => PipelineResponse {
  const headers = createHttpHeaders({
    Location: `/LROPostDoubleHeadersFinalAzureHeaderGet/location`,
  });
  headers.set(headerName, `/LROPostDoubleHeadersFinalAzureHeaderGet/asyncOperationUrl`);
  return function (request: PipelineRequest): PipelineResponse {
    return buildResponse(request, 202, "", headers);
  };
}

export const postAsyncDoubleHeadersFinalAzureHeaderGet =
  postDoubleHeadersFinalAzureHeaderGet("Azure-AsyncOperation");
export const postLocationDoubleHeadersFinalAzureHeaderGet =
  postDoubleHeadersFinalAzureHeaderGet("Operation-Location");

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

function postDoubleHeadersFinalAzureHeaderGetDefault(
  headerName: string
): (request: PipelineRequest) => PipelineResponse {
  const headers = createHttpHeaders({
    Location: "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/location",
  });
  headers.set(headerName, "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl");
  return function (request: PipelineRequest): PipelineResponse {
    return buildResponse(request, 202, "", headers);
  };
}

export const postAsyncDoubleHeadersFinalAzureHeaderGetDefault =
  postDoubleHeadersFinalAzureHeaderGetDefault("Azure-AsyncOperation");
export const postLocationDoubleHeadersFinalAzureHeaderGetDefault =
  postDoubleHeadersFinalAzureHeaderGetDefault("Operation-Location");

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

function createPostList(headerName: string): (request: PipelineRequest) => PipelineResponse {
  const headers = createHttpHeaders({
    Location: `/list/finalGet`,
  });
  headers.set(headerName, `/list/pollingGet`);
  return function postList(request: PipelineRequest): PipelineResponse {
    return buildResponse(request, 200, undefined, headers);
  };
}

export const postListAsync = createPostList("Azure-AsyncOperation");
export const postListLocation = createPostList("Operation-Location");

export function getListPollingGet(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `{ "status": "Succeeded" }`);
}

export function getListFinalGet(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `[{ "id": "100", "name": "foo" }]`);
}

function createPutNonresource202200(
  headerName: string
): (request: PipelineRequest) => PipelineResponse {
  const headers = createHttpHeaders({
    Location: `somethingBadWhichShouldNotBeUsed`,
  });
  headers.set(headerName, `/putnonresourceasync/operationresults/123`);
  return function (request: PipelineRequest): PipelineResponse {
    return buildResponse(request, 202, undefined, headers);
  };
}

export const putNonresourceAsync202200 = createPutNonresource202200("Azure-AsyncOperation");
export const putNonresourceLocation202200 = createPutNonresource202200("Azure-AsyncOperation");

export function getNonresourceAsync202200(request: PipelineRequest): PipelineResponse {
  return buildResponse(request, 200, `{ "name": "sku" , "id": "100" }`);
}

function createPatch202200(headerName: string): (request: PipelineRequest) => PipelineResponse {
  const headers = createHttpHeaders({
    Location: `/patchasync/succeeded`,
  });
  headers.set(headerName, `/patchasync/operationresults/123`);
  return function (request: PipelineRequest): PipelineResponse {
    return buildResponse(request, 202, undefined, headers);
  };
}

export const patchAsync202200 = createPatch202200("Azure-AsyncOperation");
export const patchLocation202200 = createPatch202200("Operation-Location");

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
        "Azure-AsyncOperation": `/patchasync/operationresults/123`,
      })
    ),
  (req) => buildResponse(req, 200, `{ "status": "Succeeded"}`)
);

function createPutasyncNoheader201200(
  headerName: string
): (request: PipelineRequest) => PipelineResponse {
  const headers = createHttpHeaders({
    Location: `somethingBadWhichShouldNotBeUsed`,
  });
  headers.set(headerName, `/putasync/noheader/operationresults/123`);
  return function (request: PipelineRequest): PipelineResponse {
    return buildResponse(
      request,
      201,
      `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo" }`,
      headers
    );
  };
}

export const putasyncNoheader201200 = createPutasyncNoheader201200("Azure-AsyncOperation");
export const putlocationNoheader201200 = createPutasyncNoheader201200("Operation-Location");

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

function createPutSubresource202200(
  headerName: string
): (request: PipelineRequest) => PipelineResponse {
  const headers = createHttpHeaders({
    Location: `somethingBadWhichShouldNotBeUsed`,
  });
  headers.set(headerName, `/putsubresourceasync/operationresults/123`);
  return function putSubresourceAsync202200(request: PipelineRequest): PipelineResponse {
    return buildResponse(
      request,
      202,
      `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "subresource": "sub1" }`,
      headers
    );
  };
}

export const putSubresourceAsync202200 = createPutSubresource202200("Azure-AsyncOperation");
export const putSubresourceLocation202200 = createPutSubresource202200("Operation-Location");

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

function createDeleteasyncNoheader202204(
  headerName: string
): (request: PipelineRequest) => PipelineResponse {
  const headers = createHttpHeaders({
    Location: `somethingBadWhichShouldNotBeUsed`,
  });
  headers.set(headerName, `/deleteasync/noheader/operationresults/123`);
  return function (request: PipelineRequest): PipelineResponse {
    return buildResponse(request, 202, undefined, headers);
  };
}

export const deleteasyncNoheader202204 = createDeleteasyncNoheader202204("Azure-AsyncOperation");
export const deletelocationNoheader202204 = createDeleteasyncNoheader202204("Operation-Location");

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
      "Retry-After": "0",
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
      "Retry-After": "0",
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
      "Retry-After": "0",
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
      "Retry-After": "0",
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
      "Retry-After": "0",
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
      "Retry-After": "0",
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
      "Retry-After": "0",
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
      "Retry-After": "0",
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
      "Retry-After": "0",
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
      "Retry-After": "/bar",
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
      "Retry-After": "0",
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
      "Retry-After": "/bar",
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
      "Retry-After": "/bar",
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
      "Retry-After": "0",
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
      "Retry-After": "/bar",
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
      "Retry-After": "/bar",
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
      "Retry-After": "/bar",
    })
  );
}

export function errorPostasyncRetryFailedOperationResultsInvalidjsonpolling(
  request: PipelineRequest
): PipelineResponse {
  return buildResponse(request, 200, `{ "status": "Accepted"`);
}
