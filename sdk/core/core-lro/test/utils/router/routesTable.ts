// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import {
  delete204Succeeded,
  deleteNoHeader,
  deleteNoHeaderOperationResults,
  deleteasyncNoheader202204,
  deleteasyncNoheaderOperationresults123,
  errorDelete202RetryInvalidheader,
  errorDelete204nolocation,
  errorDeleteasyncRetryFailedOperationResultsInvalidjsonpolling,
  errorDeleteasyncRetryFailedOperationResultsNostatus,
  errorDeleteasyncRetryInvalidheader,
  errorDeleteasyncRetryInvalidjsonpolling,
  errorDeleteasyncRetryNostatus,
  errorPost202RetryInvalidheader,
  errorPost202nolocation,
  errorPostasyncRetryFailedOperationResultsInvalidjsonpolling,
  errorPostasyncRetryFailedOperationResultsNopayload,
  errorPostasyncRetryInvalidheader,
  errorPostasyncRetryInvalidjsonpolling,
  errorPostasyncRetryNopayload,
  errorPut200invalidjson,
  errorPut201noprovisioningstatepayload,
  errorPutasyncRetryFailedOperationResultsInvalidjsonpolling,
  errorPutasyncRetryFailedOperationResultsNostatus,
  errorPutasyncRetryFailedOperationResultsNostatuspayload,
  errorPutasyncRetryInvalidheader,
  errorPutasyncRetryInvalidjsonpolling,
  errorPutasyncRetryNostatus,
  errorPutasyncRetryNostatuspayload,
  getDoubleHeadersFinalAzureHeaderGetDefaultAsyncOperationUrl,
  getDoubleHeadersFinalAzureHeaderGetDefaultLocation,
  getListFinalGet,
  getListPollingGet,
  getNonresourceAsync202200,
  getNonretryerrorDelete202retry400,
  getNonretryerrorPost202retry400,
  getNonretryerrorPut201creating400,
  getNonretryerrorPut201creating400invalidjson,
  getPatchAsyncSucceeded,
  getPayload200,
  getSubresourceAsync202200,
  getasyncNoheader201200,
  nonretryerrorDelete202retry400,
  nonretryerrorDelete400,
  nonretryerrorDeleteasyncRetry400,
  nonretryerrorDeleteasyncRetryFailedOperationResults400,
  nonretryerrorPost202retry400,
  nonretryerrorPost400,
  nonretryerrorPostasyncRetry400,
  nonretryerrorPostasyncRetryFailedOperationResults400,
  nonretryerrorPut201creating400,
  nonretryerrorPut201creating400invalidjson,
  nonretryerrorPut400,
  nonretryerrorPutasyncRetry400,
  nonretryerrorPutasyncRetryFailedOperationResults400,
  patchAsync202200,
  patchAsyncOperationresults123,
  postDoubleHeadersFinalAzureHeaderGet,
  postDoubleHeadersFinalAzureHeaderGetAsyncOperationUrl,
  postDoubleHeadersFinalAzureHeaderGetDefault,
  postDoubleHeadersFinalAzureHeaderGetLocation,
  postDoubleHeadersFinalLocationGet,
  postDoubleHeadersFinalLocationGetAsyncOperationUrl,
  postDoubleHeadersFinalLocationGetLocation,
  postList,
  postPayload200,
  put200Succeeded,
  put201Succeeded,
  put201SucceededNoState,
  put202Retry200,
  put202RetryOperationResults200,
  putNoHeader202200,
  putNoHeaderOperationResults,
  putNonresource20200,
  putNonresourceAsync202200,
  putNonresourceAsyncOperationresults123,
  putNonresourceOperationResults,
  putSubresource202200,
  putSubresourceAsync202200,
  putSubresourceOperationResults,
  putSubresourceasyncOperationresults123,
  putasyncNoheader201200,
  putasyncNoheaderOperationresults123
} from "./routesProcesses";

interface LroRoute {
  method: string;
  path: string;
  process: (request: PipelineRequest) => PipelineResponse;
}

export const routes: LroRoute[] = [
  { method: "PUT", path: "/put/200/succeeded", process: put200Succeeded },
  { method: "PUT", path: "/put/201/succeeded", process: put201Succeeded },
  { method: "PUT", path: "/put/200/succeeded/nostate", process: put201SucceededNoState },
  { method: "DELETE", path: "/delete/noheader", process: deleteNoHeader },
  {
    method: "GET",
    path: "/delete/noheader/operationresults/123",
    process: deleteNoHeaderOperationResults
  },
  { method: "PUT", path: "/put/202/retry/200", process: put202Retry200 },
  {
    method: "GET",
    path: "/put/202/retry/operationResults/200",
    process: put202RetryOperationResults200
  },
  { method: "PUT", path: "/put/noheader/202/200", process: putNoHeader202200 },
  { method: "GET", path: "/put/noheader/operationresults", process: putNoHeaderOperationResults },
  { method: "PUT", path: "/putsubresource/202/200", process: putSubresource202200 },
  {
    method: "GET",
    path: "/putsubresource/operationresults",
    process: putSubresourceOperationResults
  },
  { method: "PUT", path: "/putnonresource/202/200", process: putNonresource20200 },
  {
    method: "GET",
    path: "/putnonresource/operationresults",
    process: putNonresourceOperationResults
  },
  { method: "DELETE", path: "/delete/204/succeeded", process: delete204Succeeded },
  {
    method: "POST",
    path: "/LROPostDoubleHeadersFinalLocationGet",
    process: postDoubleHeadersFinalLocationGet
  },
  {
    method: "GET",
    path: "/LROPostDoubleHeadersFinalLocationGet/asyncOperationUrl",
    process: postDoubleHeadersFinalLocationGetAsyncOperationUrl
  },
  {
    method: "GET",
    path: "/LROPostDoubleHeadersFinalLocationGet/location",
    process: postDoubleHeadersFinalLocationGetLocation
  },
  {
    method: "POST",
    path: "/LROPostDoubleHeadersFinalAzureHeaderGet",
    process: postDoubleHeadersFinalAzureHeaderGet
  },
  {
    method: "GET",
    path: "/LROPostDoubleHeadersFinalAzureHeaderGet/asyncOperationUrl",
    process: postDoubleHeadersFinalAzureHeaderGetAsyncOperationUrl
  },
  {
    method: "GET",
    path: "/LROPostDoubleHeadersFinalAzureHeaderGet/location",
    process: postDoubleHeadersFinalAzureHeaderGetLocation
  },
  { method: "POST", path: "/post/payload/200", process: postPayload200 },
  { method: "GET", path: "/post/payload/200", process: getPayload200 },
  {
    method: "POST",
    path: "/LROPostDoubleHeadersFinalAzureHeaderGetDefault",
    process: postDoubleHeadersFinalAzureHeaderGetDefault
  },
  {
    method: "GET",
    path: "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/asyncOperationUrl",
    process: getDoubleHeadersFinalAzureHeaderGetDefaultAsyncOperationUrl
  },
  {
    method: "GET",
    path: "/LROPostDoubleHeadersFinalAzureHeaderGetDefault/location",
    process: getDoubleHeadersFinalAzureHeaderGetDefaultLocation
  },
  { method: "POST", path: "/list", process: postList },
  { method: "GET", path: "/list/pollingGet", process: getListPollingGet },
  { method: "GET", path: "/list/finalGet", process: getListFinalGet },
  { method: "PUT", path: "/putnonresourceasync/202/200", process: putNonresourceAsync202200 },
  {
    method: "GET",
    path: "/putnonresourceasync/operationresults/123",
    process: putNonresourceAsyncOperationresults123
  },
  { method: "GET", path: "/putnonresourceasync/202/200", process: getNonresourceAsync202200 },
  { method: "PATCH", path: "/patchasync/202/200", process: patchAsync202200 },
  {
    method: "GET",
    path: "/patchasync/operationresults/123",
    process: patchAsyncOperationresults123
  },
  { method: "GET", path: "/patchasync/succeeded", process: getPatchAsyncSucceeded },
  { method: "PUT", path: "/putasync/noheader/201/200", process: putasyncNoheader201200 },
  { method: "GET", path: "/putasync/noheader/201/200", process: getasyncNoheader201200 },
  {
    method: "GET",
    path: "/putasync/noheader/operationresults/123",
    process: putasyncNoheaderOperationresults123
  },
  { method: "PUT", path: "/putsubresourceasync/202/200", process: putSubresourceAsync202200 },
  { method: "GET", path: "/putsubresourceasync/202/200", process: getSubresourceAsync202200 },
  {
    method: "GET",
    path: "/putsubresourceasync/operationresults/123",
    process: putSubresourceasyncOperationresults123
  },
  { method: "DELETE", path: "/deleteasync/noheader/202/204", process: deleteasyncNoheader202204 },
  {
    method: "GET",
    path: "/deleteasync/noheader/operationresults/123",
    process: deleteasyncNoheaderOperationresults123
  },
  { method: "PUT", path: "/nonretryerror/put/400", process: nonretryerrorPut400 },
  {
    method: "PUT",
    path: "/nonretryerror/put/201/creating/400",
    process: nonretryerrorPut201creating400
  },
  {
    method: "GET",
    path: "/nonretryerror/put/201/creating/400",
    process: getNonretryerrorPut201creating400
  },
  {
    method: "PUT",
    path: "/nonretryerror/put/201/creating/400/invalidjson",
    process: nonretryerrorPut201creating400invalidjson
  },
  {
    method: "GET",
    path: "/nonretryerror/put/201/creating/400/invalidjson",
    process: getNonretryerrorPut201creating400invalidjson
  },
  {
    method: "PUT",
    path: "/nonretryerror/putasync/retry/400",
    process: nonretryerrorPutasyncRetry400
  },
  {
    method: "GET",
    path: "/nonretryerror/putasync/retry/failed/operationResults/400",
    process: nonretryerrorPutasyncRetryFailedOperationResults400
  },
  {
    method: "DELETE",
    path: "/nonretryerror/delete/202/retry/400",
    process: nonretryerrorDelete202retry400
  },
  {
    method: "GET",
    path: "/nonretryerror/delete/202/retry/400",
    process: getNonretryerrorDelete202retry400
  },
  { method: "DELETE", path: "/nonretryerror/delete/400", process: nonretryerrorDelete400 },
  {
    method: "DELETE",
    path: "/nonretryerror/deleteasync/retry/400",
    process: nonretryerrorDeleteasyncRetry400
  },
  {
    method: "GET",
    path: "/nonretryerror/deleteasync/retry/failed/operationResults/400",
    process: nonretryerrorDeleteasyncRetryFailedOperationResults400
  },
  { method: "POST", path: "/nonretryerror/post/400", process: nonretryerrorPost400 },
  {
    method: "POST",
    path: "/nonretryerror/post/202/retry/400",
    process: nonretryerrorPost202retry400
  },
  {
    method: "GET",
    path: "/nonretryerror/post/202/retry/400",
    process: getNonretryerrorPost202retry400
  },
  {
    method: "POST",
    path: "/nonretryerror/postasync/retry/400",
    process: nonretryerrorPostasyncRetry400
  },
  {
    method: "GET",
    path: "/nonretryerror/postasync/retry/failed/operationResults/400",
    process: nonretryerrorPostasyncRetryFailedOperationResults400
  },
  {
    method: "PUT",
    path: "/error/put/201/noprovisioningstatepayload",
    process: errorPut201noprovisioningstatepayload
  },
  {
    method: "PUT",
    path: "/error/putasync/retry/nostatuspayload",
    process: errorPutasyncRetryNostatuspayload
  },
  {
    method: "GET",
    path: "/error/putasync/retry/nostatuspayload",
    process: errorPutasyncRetryFailedOperationResultsNostatuspayload
  },
  {
    method: "GET",
    path: "/error/putasync/retry/failed/operationResults/nostatuspayload",
    process: errorPutasyncRetryFailedOperationResultsNostatuspayload
  },
  { method: "PUT", path: "/error/putasync/retry/nostatus", process: errorPutasyncRetryNostatus },
  {
    method: "GET",
    path: "/error/putasync/retry/nostatus",
    process: errorPutasyncRetryFailedOperationResultsNostatus
  },
  {
    method: "GET",
    path: "/error/putasync/retry/failed/operationResults/nostatus",
    process: errorPutasyncRetryFailedOperationResultsNostatus
  },
  { method: "DELETE", path: "/error/delete/204/nolocation", process: errorDelete204nolocation },
  {
    method: "DELETE",
    path: "/error/deleteasync/retry/nostatus",
    process: errorDeleteasyncRetryNostatus
  },
  {
    method: "GET",
    path: "/error/deleteasync/retry/failed/operationResults/nostatus",
    process: errorDeleteasyncRetryFailedOperationResultsNostatus
  },
  { method: "POST", path: "/error/post/202/nolocation", process: errorPost202nolocation },
  {
    method: "POST",
    path: "/error/postasync/retry/nopayload",
    process: errorPostasyncRetryNopayload
  },
  {
    method: "GET",
    path: "/error/postasync/retry/failed/operationResults/nopayload",
    process: errorPostasyncRetryFailedOperationResultsNopayload
  },
  {
    method: "GET",
    path: "/error/postasync/retry/failed/operationResults/nopayload",
    process: errorPostasyncRetryFailedOperationResultsNopayload
  },
  { method: "PUT", path: "/error/put/200/invalidjson", process: errorPut200invalidjson },
  {
    method: "PUT",
    path: "/error/putasync/retry/invalidheader",
    process: errorPutasyncRetryInvalidheader
  },
  {
    method: "PUT",
    path: "/error/putasync/retry/invalidjsonpolling",
    process: errorPutasyncRetryInvalidjsonpolling
  },
  {
    method: "GET",
    path: "/error/putasync/retry/failed/operationResults/invalidjsonpolling",
    process: errorPutasyncRetryFailedOperationResultsInvalidjsonpolling
  },
  {
    method: "DELETE",
    path: "/error/delete/202/retry/invalidheader",
    process: errorDelete202RetryInvalidheader
  },
  {
    method: "DELETE",
    path: "/error/deleteasync/retry/invalidheader",
    process: errorDeleteasyncRetryInvalidheader
  },
  {
    method: "DELETE",
    path: "/error/deleteasync/retry/invalidjsonpolling",
    process: errorDeleteasyncRetryInvalidjsonpolling
  },
  {
    method: "GET",
    path: "/error/deleteasync/retry/failed/operationResults/invalidjsonpolling",
    process: errorDeleteasyncRetryFailedOperationResultsInvalidjsonpolling
  },
  {
    method: "POST",
    path: "/error/post/202/retry/invalidheader",
    process: errorPost202RetryInvalidheader
  },
  {
    method: "POST",
    path: "/error/postasync/retry/invalidheader",
    process: errorPostasyncRetryInvalidheader
  },
  {
    method: "POST",
    path: "/error/postasync/retry/invalidjsonpolling",
    process: errorPostasyncRetryInvalidjsonpolling
  },
  {
    method: "GET",
    path: "/error/postasync/retry/failed/operationResults/invalidjsonpolling",
    process: errorPostasyncRetryFailedOperationResultsInvalidjsonpolling
  }
];

export const routesTable = new Map(routes.map((route) => [route.path, route]));
