// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementContext } from "../../api/dataBoxManagementContext.js";
import {
  markDevicesShipped,
  listCredentials,
  cancel,
  bookShipmentPickUp,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/jobs/operations.js";
import {
  JobsMarkDevicesShippedOptionalParams,
  JobsListCredentialsOptionalParams,
  JobsCancelOptionalParams,
  JobsBookShipmentPickUpOptionalParams,
  JobsListOptionalParams,
  JobsListByResourceGroupOptionalParams,
  JobsDeleteOptionalParams,
  JobsUpdateOptionalParams,
  JobsCreateOptionalParams,
  JobsGetOptionalParams,
} from "../../api/jobs/options.js";
import {
  JobResource,
  JobResourceUpdateParameter,
  ShipmentPickUpRequest,
  ShipmentPickUpResponse,
  CancellationReason,
  UnencryptedCredentials,
  MarkDevicesShippedRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Jobs operations. */
export interface JobsOperations {
  /** Request to mark devices for a given job as shipped */
  markDevicesShipped: (
    jobName: string,
    resourceGroupName: string,
    markDevicesShippedRequest: MarkDevicesShippedRequest,
    options?: JobsMarkDevicesShippedOptionalParams,
  ) => Promise<void>;
  /** This method gets the unencrypted secrets related to the job. */
  listCredentials: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsListCredentialsOptionalParams,
  ) => PagedAsyncIterableIterator<UnencryptedCredentials>;
  /** CancelJob. */
  cancel: (
    resourceGroupName: string,
    jobName: string,
    cancellationReason: CancellationReason,
    options?: JobsCancelOptionalParams,
  ) => Promise<void>;
  /** Book shipment pick up. */
  bookShipmentPickUp: (
    resourceGroupName: string,
    jobName: string,
    shipmentPickUpRequest: ShipmentPickUpRequest,
    options?: JobsBookShipmentPickUpOptionalParams,
  ) => Promise<ShipmentPickUpResponse>;
  /** Lists all the jobs available under the subscription. */
  list: (options?: JobsListOptionalParams) => PagedAsyncIterableIterator<JobResource>;
  /** Lists all the jobs available under the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: JobsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<JobResource>;
  /** Deletes a job. */
  delete: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the properties of an existing job. */
  update: (
    resourceGroupName: string,
    jobName: string,
    jobResourceUpdateParameter: JobResourceUpdateParameter,
    options?: JobsUpdateOptionalParams,
  ) => PollerLike<OperationState<JobResource>, JobResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    jobName: string,
    jobResourceUpdateParameter: JobResourceUpdateParameter,
    options?: JobsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JobResource>, JobResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    jobName: string,
    jobResourceUpdateParameter: JobResourceUpdateParameter,
    options?: JobsUpdateOptionalParams,
  ) => Promise<JobResource>;
  /** Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API. */
  create: (
    resourceGroupName: string,
    jobName: string,
    jobResource: JobResource,
    options?: JobsCreateOptionalParams,
  ) => PollerLike<OperationState<JobResource>, JobResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    jobName: string,
    jobResource: JobResource,
    options?: JobsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JobResource>, JobResource>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    jobName: string,
    jobResource: JobResource,
    options?: JobsCreateOptionalParams,
  ) => Promise<JobResource>;
  /** Gets information about the specified job. */
  get: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsGetOptionalParams,
  ) => Promise<JobResource>;
}

function _getJobs(context: DataBoxManagementContext) {
  return {
    markDevicesShipped: (
      jobName: string,
      resourceGroupName: string,
      markDevicesShippedRequest: MarkDevicesShippedRequest,
      options?: JobsMarkDevicesShippedOptionalParams,
    ) =>
      markDevicesShipped(context, jobName, resourceGroupName, markDevicesShippedRequest, options),
    listCredentials: (
      resourceGroupName: string,
      jobName: string,
      options?: JobsListCredentialsOptionalParams,
    ) => listCredentials(context, resourceGroupName, jobName, options),
    cancel: (
      resourceGroupName: string,
      jobName: string,
      cancellationReason: CancellationReason,
      options?: JobsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, jobName, cancellationReason, options),
    bookShipmentPickUp: (
      resourceGroupName: string,
      jobName: string,
      shipmentPickUpRequest: ShipmentPickUpRequest,
      options?: JobsBookShipmentPickUpOptionalParams,
    ) => bookShipmentPickUp(context, resourceGroupName, jobName, shipmentPickUpRequest, options),
    list: (options?: JobsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: JobsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, jobName: string, options?: JobsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, jobName, options),
    beginDelete: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, jobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, jobName, options);
    },
    update: (
      resourceGroupName: string,
      jobName: string,
      jobResourceUpdateParameter: JobResourceUpdateParameter,
      options?: JobsUpdateOptionalParams,
    ) => update(context, resourceGroupName, jobName, jobResourceUpdateParameter, options),
    beginUpdate: async (
      resourceGroupName: string,
      jobName: string,
      jobResourceUpdateParameter: JobResourceUpdateParameter,
      options?: JobsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        jobName,
        jobResourceUpdateParameter,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      jobName: string,
      jobResourceUpdateParameter: JobResourceUpdateParameter,
      options?: JobsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, jobName, jobResourceUpdateParameter, options);
    },
    create: (
      resourceGroupName: string,
      jobName: string,
      jobResource: JobResource,
      options?: JobsCreateOptionalParams,
    ) => create(context, resourceGroupName, jobName, jobResource, options),
    beginCreate: async (
      resourceGroupName: string,
      jobName: string,
      jobResource: JobResource,
      options?: JobsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, jobName, jobResource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      jobName: string,
      jobResource: JobResource,
      options?: JobsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, jobName, jobResource, options);
    },
    get: (resourceGroupName: string, jobName: string, options?: JobsGetOptionalParams) =>
      get(context, resourceGroupName, jobName, options),
  };
}

export function _getJobsOperations(context: DataBoxManagementContext): JobsOperations {
  return {
    ..._getJobs(context),
  };
}
