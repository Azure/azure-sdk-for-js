// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import {
  resyncReadinessCheck,
  addOrUpdateResources,
  end,
  start,
  validateForExecution,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/drills/operations.js";
import type {
  DrillsResyncReadinessCheckOptionalParams,
  DrillsAddOrUpdateResourcesOptionalParams,
  DrillsEndOptionalParams,
  DrillsStartOptionalParams,
  DrillsValidateForExecutionOptionalParams,
  DrillsListOptionalParams,
  DrillsDeleteOptionalParams,
  DrillsUpdateOptionalParams,
  DrillsCreateOptionalParams,
  DrillsGetOptionalParams,
} from "../../api/drills/options.js";
import type {
  Drill,
  DrillUpdate,
  ValidateForExecutionRequest,
  DrillStartRequest,
  DrillEndRequest,
  AddOrUpdateResourcesRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Drills operations. */
export interface DrillsOperations {
  /** This triggers detection of any drifts from the desired state of Resources and RBAC. */
  resyncReadinessCheck: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    options?: DrillsResyncReadinessCheckOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resyncReadinessCheck instead */
  beginResyncReadinessCheck: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    options?: DrillsResyncReadinessCheckOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resyncReadinessCheck instead */
  beginResyncReadinessCheckAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    options?: DrillsResyncReadinessCheckOptionalParams,
  ) => Promise<void>;
  /** This enables the user to include, exclude or update resources from their Drill. */
  addOrUpdateResources: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: AddOrUpdateResourcesRequest,
    options?: DrillsAddOrUpdateResourcesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use addOrUpdateResources instead */
  beginAddOrUpdateResources: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: AddOrUpdateResourcesRequest,
    options?: DrillsAddOrUpdateResourcesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use addOrUpdateResources instead */
  beginAddOrUpdateResourcesAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: AddOrUpdateResourcesRequest,
    options?: DrillsAddOrUpdateResourcesOptionalParams,
  ) => Promise<void>;
  /** This ends the currently running instance of the Drill. */
  end: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: DrillEndRequest,
    options?: DrillsEndOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use end instead */
  beginEnd: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: DrillEndRequest,
    options?: DrillsEndOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use end instead */
  beginEndAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: DrillEndRequest,
    options?: DrillsEndOptionalParams,
  ) => Promise<void>;
  /** This starts a new running instance of the Drill. */
  start: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: DrillStartRequest,
    options?: DrillsStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: DrillStartRequest,
    options?: DrillsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: DrillStartRequest,
    options?: DrillsStartOptionalParams,
  ) => Promise<void>;
  /** This returns eligible resource to be faulted or failed over. */
  validateForExecution: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: ValidateForExecutionRequest,
    options?: DrillsValidateForExecutionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use validateForExecution instead */
  beginValidateForExecution: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: ValidateForExecutionRequest,
    options?: DrillsValidateForExecutionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use validateForExecution instead */
  beginValidateForExecutionAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    body: ValidateForExecutionRequest,
    options?: DrillsValidateForExecutionOptionalParams,
  ) => Promise<void>;
  /** List Drill resources by tenant */
  list: (
    serviceGroupName: string,
    options?: DrillsListOptionalParams,
  ) => PagedAsyncIterableIterator<Drill>;
  /** Delete a Drill */
  delete: (
    serviceGroupName: string,
    drillName: string,
    options?: DrillsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    serviceGroupName: string,
    drillName: string,
    options?: DrillsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    serviceGroupName: string,
    drillName: string,
    options?: DrillsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Drill */
  update: (
    serviceGroupName: string,
    drillName: string,
    properties: DrillUpdate,
    options?: DrillsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    serviceGroupName: string,
    drillName: string,
    properties: DrillUpdate,
    options?: DrillsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    serviceGroupName: string,
    drillName: string,
    properties: DrillUpdate,
    options?: DrillsUpdateOptionalParams,
  ) => Promise<void>;
  /** Create a Drill */
  create: (
    serviceGroupName: string,
    drillName: string,
    resource: Drill,
    options?: DrillsCreateOptionalParams,
  ) => PollerLike<OperationState<Drill>, Drill>;
  /** @deprecated use create instead */
  beginCreate: (
    serviceGroupName: string,
    drillName: string,
    resource: Drill,
    options?: DrillsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Drill>, Drill>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    serviceGroupName: string,
    drillName: string,
    resource: Drill,
    options?: DrillsCreateOptionalParams,
  ) => Promise<Drill>;
  /** Get a Drill */
  get: (
    serviceGroupName: string,
    drillName: string,
    options?: DrillsGetOptionalParams,
  ) => Promise<Drill>;
}

function _getDrills(context: AzureResilienceManagementContext) {
  return {
    resyncReadinessCheck: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      options?: DrillsResyncReadinessCheckOptionalParams,
    ) => resyncReadinessCheck(context, serviceGroupName, operationId, drillName, options),
    beginResyncReadinessCheck: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      options?: DrillsResyncReadinessCheckOptionalParams,
    ) => {
      const poller = resyncReadinessCheck(
        context,
        serviceGroupName,
        operationId,
        drillName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncReadinessCheckAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      options?: DrillsResyncReadinessCheckOptionalParams,
    ) => {
      return await resyncReadinessCheck(context, serviceGroupName, operationId, drillName, options);
    },
    addOrUpdateResources: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: AddOrUpdateResourcesRequest,
      options?: DrillsAddOrUpdateResourcesOptionalParams,
    ) => addOrUpdateResources(context, serviceGroupName, operationId, drillName, body, options),
    beginAddOrUpdateResources: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: AddOrUpdateResourcesRequest,
      options?: DrillsAddOrUpdateResourcesOptionalParams,
    ) => {
      const poller = addOrUpdateResources(
        context,
        serviceGroupName,
        operationId,
        drillName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAddOrUpdateResourcesAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: AddOrUpdateResourcesRequest,
      options?: DrillsAddOrUpdateResourcesOptionalParams,
    ) => {
      return await addOrUpdateResources(
        context,
        serviceGroupName,
        operationId,
        drillName,
        body,
        options,
      );
    },
    end: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: DrillEndRequest,
      options?: DrillsEndOptionalParams,
    ) => end(context, serviceGroupName, operationId, drillName, body, options),
    beginEnd: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: DrillEndRequest,
      options?: DrillsEndOptionalParams,
    ) => {
      const poller = end(context, serviceGroupName, operationId, drillName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginEndAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: DrillEndRequest,
      options?: DrillsEndOptionalParams,
    ) => {
      return await end(context, serviceGroupName, operationId, drillName, body, options);
    },
    start: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: DrillStartRequest,
      options?: DrillsStartOptionalParams,
    ) => start(context, serviceGroupName, operationId, drillName, body, options),
    beginStart: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: DrillStartRequest,
      options?: DrillsStartOptionalParams,
    ) => {
      const poller = start(context, serviceGroupName, operationId, drillName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: DrillStartRequest,
      options?: DrillsStartOptionalParams,
    ) => {
      return await start(context, serviceGroupName, operationId, drillName, body, options);
    },
    validateForExecution: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: ValidateForExecutionRequest,
      options?: DrillsValidateForExecutionOptionalParams,
    ) => validateForExecution(context, serviceGroupName, operationId, drillName, body, options),
    beginValidateForExecution: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: ValidateForExecutionRequest,
      options?: DrillsValidateForExecutionOptionalParams,
    ) => {
      const poller = validateForExecution(
        context,
        serviceGroupName,
        operationId,
        drillName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateForExecutionAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      body: ValidateForExecutionRequest,
      options?: DrillsValidateForExecutionOptionalParams,
    ) => {
      return await validateForExecution(
        context,
        serviceGroupName,
        operationId,
        drillName,
        body,
        options,
      );
    },
    list: (serviceGroupName: string, options?: DrillsListOptionalParams) =>
      list(context, serviceGroupName, options),
    delete: (serviceGroupName: string, drillName: string, options?: DrillsDeleteOptionalParams) =>
      $delete(context, serviceGroupName, drillName, options),
    beginDelete: async (
      serviceGroupName: string,
      drillName: string,
      options?: DrillsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, serviceGroupName, drillName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      serviceGroupName: string,
      drillName: string,
      options?: DrillsDeleteOptionalParams,
    ) => {
      return await $delete(context, serviceGroupName, drillName, options);
    },
    update: (
      serviceGroupName: string,
      drillName: string,
      properties: DrillUpdate,
      options?: DrillsUpdateOptionalParams,
    ) => update(context, serviceGroupName, drillName, properties, options),
    beginUpdate: async (
      serviceGroupName: string,
      drillName: string,
      properties: DrillUpdate,
      options?: DrillsUpdateOptionalParams,
    ) => {
      const poller = update(context, serviceGroupName, drillName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      serviceGroupName: string,
      drillName: string,
      properties: DrillUpdate,
      options?: DrillsUpdateOptionalParams,
    ) => {
      return await update(context, serviceGroupName, drillName, properties, options);
    },
    create: (
      serviceGroupName: string,
      drillName: string,
      resource: Drill,
      options?: DrillsCreateOptionalParams,
    ) => create(context, serviceGroupName, drillName, resource, options),
    beginCreate: async (
      serviceGroupName: string,
      drillName: string,
      resource: Drill,
      options?: DrillsCreateOptionalParams,
    ) => {
      const poller = create(context, serviceGroupName, drillName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      serviceGroupName: string,
      drillName: string,
      resource: Drill,
      options?: DrillsCreateOptionalParams,
    ) => {
      return await create(context, serviceGroupName, drillName, resource, options);
    },
    get: (serviceGroupName: string, drillName: string, options?: DrillsGetOptionalParams) =>
      get(context, serviceGroupName, drillName, options),
  };
}

export function _getDrillsOperations(context: AzureResilienceManagementContext): DrillsOperations {
  return {
    ..._getDrills(context),
  };
}
