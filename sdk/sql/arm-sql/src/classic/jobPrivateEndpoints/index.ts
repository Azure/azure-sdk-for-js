// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByAgent,
  $delete,
  createOrUpdate,
  get,
} from "../../api/jobPrivateEndpoints/operations.js";
import type {
  JobPrivateEndpointsListByAgentOptionalParams,
  JobPrivateEndpointsDeleteOptionalParams,
  JobPrivateEndpointsCreateOrUpdateOptionalParams,
  JobPrivateEndpointsGetOptionalParams,
} from "../../api/jobPrivateEndpoints/options.js";
import type { JobPrivateEndpoint } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a JobPrivateEndpoints operations. */
export interface JobPrivateEndpointsOperations {
  /** Gets a list of job agent private endpoints. */
  listByAgent: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: JobPrivateEndpointsListByAgentOptionalParams,
  ) => PagedAsyncIterableIterator<JobPrivateEndpoint>;
  /** Deletes a private endpoint. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    privateEndpointName: string,
    options?: JobPrivateEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    privateEndpointName: string,
    options?: JobPrivateEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    privateEndpointName: string,
    options?: JobPrivateEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a private endpoint. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    privateEndpointName: string,
    parameters: JobPrivateEndpoint,
    options?: JobPrivateEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<JobPrivateEndpoint>, JobPrivateEndpoint>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    privateEndpointName: string,
    parameters: JobPrivateEndpoint,
    options?: JobPrivateEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JobPrivateEndpoint>, JobPrivateEndpoint>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    privateEndpointName: string,
    parameters: JobPrivateEndpoint,
    options?: JobPrivateEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<JobPrivateEndpoint>;
  /** Gets a private endpoint. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    privateEndpointName: string,
    options?: JobPrivateEndpointsGetOptionalParams,
  ) => Promise<JobPrivateEndpoint>;
}

function _getJobPrivateEndpoints(context: SqlContext) {
  return {
    listByAgent: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      options?: JobPrivateEndpointsListByAgentOptionalParams,
    ) => listByAgent(context, resourceGroupName, serverName, jobAgentName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      privateEndpointName: string,
      options?: JobPrivateEndpointsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serverName, jobAgentName, privateEndpointName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      privateEndpointName: string,
      options?: JobPrivateEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        privateEndpointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      privateEndpointName: string,
      options?: JobPrivateEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        privateEndpointName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      privateEndpointName: string,
      parameters: JobPrivateEndpoint,
      options?: JobPrivateEndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        privateEndpointName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      privateEndpointName: string,
      parameters: JobPrivateEndpoint,
      options?: JobPrivateEndpointsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        privateEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      privateEndpointName: string,
      parameters: JobPrivateEndpoint,
      options?: JobPrivateEndpointsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        privateEndpointName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      privateEndpointName: string,
      options?: JobPrivateEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, jobAgentName, privateEndpointName, options),
  };
}

export function _getJobPrivateEndpointsOperations(
  context: SqlContext,
): JobPrivateEndpointsOperations {
  return {
    ..._getJobPrivateEndpoints(context),
  };
}
