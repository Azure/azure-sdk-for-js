// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listByEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/edgeDeviceJobs/operations.js";
import {
  EdgeDeviceJobsListByEdgeDeviceOptionalParams,
  EdgeDeviceJobsDeleteOptionalParams,
  EdgeDeviceJobsCreateOrUpdateOptionalParams,
  EdgeDeviceJobsGetOptionalParams,
} from "../../api/edgeDeviceJobs/options.js";
import { EdgeDeviceJobUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeDeviceJobs operations. */
export interface EdgeDeviceJobsOperations {
  /** List EdgeDeviceJob resources by EdgeDevice */
  listByEdgeDevice: (
    resourceUri: string,
    edgeDeviceName: string,
    options?: EdgeDeviceJobsListByEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeDeviceJobUnion>;
  /** Delete a EdgeDeviceJob */
  delete: (
    resourceUri: string,
    edgeDeviceName: string,
    jobsName: string,
    options?: EdgeDeviceJobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceUri: string,
    edgeDeviceName: string,
    jobsName: string,
    options?: EdgeDeviceJobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceUri: string,
    edgeDeviceName: string,
    jobsName: string,
    options?: EdgeDeviceJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a EdgeDeviceJob */
  createOrUpdate: (
    resourceUri: string,
    edgeDeviceName: string,
    jobsName: string,
    resource: EdgeDeviceJobUnion,
    options?: EdgeDeviceJobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeDeviceJobUnion>, EdgeDeviceJobUnion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceUri: string,
    edgeDeviceName: string,
    jobsName: string,
    resource: EdgeDeviceJobUnion,
    options?: EdgeDeviceJobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeDeviceJobUnion>, EdgeDeviceJobUnion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceUri: string,
    edgeDeviceName: string,
    jobsName: string,
    resource: EdgeDeviceJobUnion,
    options?: EdgeDeviceJobsCreateOrUpdateOptionalParams,
  ) => Promise<EdgeDeviceJobUnion>;
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
    beginDelete: async (
      resourceUri: string,
      edgeDeviceName: string,
      jobsName: string,
      options?: EdgeDeviceJobsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceUri, edgeDeviceName, jobsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceUri: string,
      edgeDeviceName: string,
      jobsName: string,
      options?: EdgeDeviceJobsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceUri, edgeDeviceName, jobsName, options);
    },
    createOrUpdate: (
      resourceUri: string,
      edgeDeviceName: string,
      jobsName: string,
      resource: EdgeDeviceJobUnion,
      options?: EdgeDeviceJobsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, edgeDeviceName, jobsName, resource, options),
    beginCreateOrUpdate: async (
      resourceUri: string,
      edgeDeviceName: string,
      jobsName: string,
      resource: EdgeDeviceJobUnion,
      options?: EdgeDeviceJobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceUri,
        edgeDeviceName,
        jobsName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceUri: string,
      edgeDeviceName: string,
      jobsName: string,
      resource: EdgeDeviceJobUnion,
      options?: EdgeDeviceJobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceUri,
        edgeDeviceName,
        jobsName,
        resource,
        options,
      );
    },
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
