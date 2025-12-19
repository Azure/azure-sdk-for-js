// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listByEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/edgeDeviceJobs/operations.js";
import type {
  EdgeDeviceJobsListByEdgeDeviceOptionalParams,
  EdgeDeviceJobsDeleteOptionalParams,
  EdgeDeviceJobsCreateOrUpdateOptionalParams,
  EdgeDeviceJobsGetOptionalParams,
} from "../../api/edgeDeviceJobs/options.js";
import type { EdgeDeviceJobUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeDeviceJobs operations. */
export interface EdgeDeviceJobsOperations {
  /** List EdgeDeviceJob resources by EdgeDevice */
  listByEdgeDevice: (
    resourceUri: string,
    edgeDeviceName: string,
    options?: EdgeDeviceJobsListByEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeDeviceJobUnion>;
  /** Delete a EdgeDeviceJob */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    edgeDeviceName: string,
    jobsName: string,
    options?: EdgeDeviceJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a EdgeDeviceJob */
  createOrUpdate: (
    resourceUri: string,
    edgeDeviceName: string,
    jobsName: string,
    resource: EdgeDeviceJobUnion,
    options?: EdgeDeviceJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeDeviceJobUnion>, EdgeDeviceJobUnion>;
  /** Get a EdgeDeviceJob */
  get: (
    resourceUri: string,
    edgeDeviceName: string,
    jobsName: string,
    options?: EdgeDeviceJobsGetOptionalParams,
  ) => Promise<EdgeDeviceJobUnion>;
}

function _getEdgeDeviceJobs(context: AzureStackHCIContext) {
  return {
    listByEdgeDevice: (
      resourceUri: string,
      edgeDeviceName: string,
      options?: EdgeDeviceJobsListByEdgeDeviceOptionalParams,
    ) => listByEdgeDevice(context, resourceUri, edgeDeviceName, options),
    delete: (
      resourceUri: string,
      edgeDeviceName: string,
      jobsName: string,
      options?: EdgeDeviceJobsDeleteOptionalParams,
    ) => $delete(context, resourceUri, edgeDeviceName, jobsName, options),
    createOrUpdate: (
      resourceUri: string,
      edgeDeviceName: string,
      jobsName: string,
      resource: EdgeDeviceJobUnion,
      options?: EdgeDeviceJobsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, edgeDeviceName, jobsName, resource, options),
    get: (
      resourceUri: string,
      edgeDeviceName: string,
      jobsName: string,
      options?: EdgeDeviceJobsGetOptionalParams,
    ) => get(context, resourceUri, edgeDeviceName, jobsName, options),
  };
}

export function _getEdgeDeviceJobsOperations(
  context: AzureStackHCIContext,
): EdgeDeviceJobsOperations {
  return {
    ..._getEdgeDeviceJobs(context),
  };
}
