// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/goalTemplates/operations.js";
import type {
  GoalTemplatesListOptionalParams,
  GoalTemplatesDeleteOptionalParams,
  GoalTemplatesUpdateOptionalParams,
  GoalTemplatesCreateOrUpdateOptionalParams,
  GoalTemplatesGetOptionalParams,
} from "../../api/goalTemplates/options.js";
import type { GoalTemplate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GoalTemplates operations. */
export interface GoalTemplatesOperations {
  /** Lists the goal templates of a service group. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead. */
  list: (
    serviceGroupName: string,
    options?: GoalTemplatesListOptionalParams,
  ) => PagedAsyncIterableIterator<GoalTemplate>;
  /** Deletes a goal template. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead. */
  delete: (
    serviceGroupName: string,
    goalTemplateName: string,
    options?: GoalTemplatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    serviceGroupName: string,
    goalTemplateName: string,
    options?: GoalTemplatesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    serviceGroupName: string,
    goalTemplateName: string,
    options?: GoalTemplatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a goal template. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead. */
  update: (
    serviceGroupName: string,
    goalTemplateName: string,
    properties: GoalTemplate,
    options?: GoalTemplatesUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    serviceGroupName: string,
    goalTemplateName: string,
    properties: GoalTemplate,
    options?: GoalTemplatesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    serviceGroupName: string,
    goalTemplateName: string,
    properties: GoalTemplate,
    options?: GoalTemplatesUpdateOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a goal template. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead. */
  createOrUpdate: (
    serviceGroupName: string,
    goalTemplateName: string,
    resource: GoalTemplate,
    options?: GoalTemplatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GoalTemplate>, GoalTemplate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    serviceGroupName: string,
    goalTemplateName: string,
    resource: GoalTemplate,
    options?: GoalTemplatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GoalTemplate>, GoalTemplate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    serviceGroupName: string,
    goalTemplateName: string,
    resource: GoalTemplate,
    options?: GoalTemplatesCreateOrUpdateOptionalParams,
  ) => Promise<GoalTemplate>;
  /** Gets a goal template. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead. */
  get: (
    serviceGroupName: string,
    goalTemplateName: string,
    options?: GoalTemplatesGetOptionalParams,
  ) => Promise<GoalTemplate>;
}

function _getGoalTemplates(context: AzureResilienceManagementContext) {
  return {
    list: (serviceGroupName: string, options?: GoalTemplatesListOptionalParams) =>
      list(context, serviceGroupName, options),
    delete: (
      serviceGroupName: string,
      goalTemplateName: string,
      options?: GoalTemplatesDeleteOptionalParams,
    ) => $delete(context, serviceGroupName, goalTemplateName, options),
    beginDelete: async (
      serviceGroupName: string,
      goalTemplateName: string,
      options?: GoalTemplatesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, serviceGroupName, goalTemplateName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      serviceGroupName: string,
      goalTemplateName: string,
      options?: GoalTemplatesDeleteOptionalParams,
    ) => {
      return await $delete(context, serviceGroupName, goalTemplateName, options);
    },
    update: (
      serviceGroupName: string,
      goalTemplateName: string,
      properties: GoalTemplate,
      options?: GoalTemplatesUpdateOptionalParams,
    ) => update(context, serviceGroupName, goalTemplateName, properties, options),
    beginUpdate: async (
      serviceGroupName: string,
      goalTemplateName: string,
      properties: GoalTemplate,
      options?: GoalTemplatesUpdateOptionalParams,
    ) => {
      const poller = update(context, serviceGroupName, goalTemplateName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      serviceGroupName: string,
      goalTemplateName: string,
      properties: GoalTemplate,
      options?: GoalTemplatesUpdateOptionalParams,
    ) => {
      return await update(context, serviceGroupName, goalTemplateName, properties, options);
    },
    createOrUpdate: (
      serviceGroupName: string,
      goalTemplateName: string,
      resource: GoalTemplate,
      options?: GoalTemplatesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, serviceGroupName, goalTemplateName, resource, options),
    beginCreateOrUpdate: async (
      serviceGroupName: string,
      goalTemplateName: string,
      resource: GoalTemplate,
      options?: GoalTemplatesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, serviceGroupName, goalTemplateName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      serviceGroupName: string,
      goalTemplateName: string,
      resource: GoalTemplate,
      options?: GoalTemplatesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, serviceGroupName, goalTemplateName, resource, options);
    },
    get: (
      serviceGroupName: string,
      goalTemplateName: string,
      options?: GoalTemplatesGetOptionalParams,
    ) => get(context, serviceGroupName, goalTemplateName, options),
  };
}

export function _getGoalTemplatesOperations(
  context: AzureResilienceManagementContext,
): GoalTemplatesOperations {
  return {
    ..._getGoalTemplates(context),
  };
}
