// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderContext } from "../../api/imageBuilderContext.js";
import {
  listByImageTemplate,
  $delete,
  createOrUpdate,
  get,
} from "../../api/triggers/operations.js";
import {
  TriggersListByImageTemplateOptionalParams,
  TriggersDeleteOptionalParams,
  TriggersCreateOrUpdateOptionalParams,
  TriggersGetOptionalParams,
} from "../../api/triggers/options.js";
import { Trigger } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Triggers operations. */
export interface TriggersOperations {
  /** List all triggers for the specified Image Template resource */
  listByImageTemplate: (
    resourceGroupName: string,
    imageTemplateName: string,
    options?: TriggersListByImageTemplateOptionalParams,
  ) => PagedAsyncIterableIterator<Trigger>;
  /** Delete a trigger for the specified virtual machine image template */
  delete: (
    resourceGroupName: string,
    imageTemplateName: string,
    triggerName: string,
    options?: TriggersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    imageTemplateName: string,
    triggerName: string,
    options?: TriggersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    imageTemplateName: string,
    triggerName: string,
    options?: TriggersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a trigger for the specified virtual machine image template */
  createOrUpdate: (
    resourceGroupName: string,
    imageTemplateName: string,
    triggerName: string,
    parameters: Trigger,
    options?: TriggersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Trigger>, Trigger>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    imageTemplateName: string,
    triggerName: string,
    parameters: Trigger,
    options?: TriggersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Trigger>, Trigger>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    imageTemplateName: string,
    triggerName: string,
    parameters: Trigger,
    options?: TriggersCreateOrUpdateOptionalParams,
  ) => Promise<Trigger>;
  /** Get the specified trigger for the specified image template resource */
  get: (
    resourceGroupName: string,
    imageTemplateName: string,
    triggerName: string,
    options?: TriggersGetOptionalParams,
  ) => Promise<Trigger>;
}

function _getTriggers(context: ImageBuilderContext) {
  return {
    listByImageTemplate: (
      resourceGroupName: string,
      imageTemplateName: string,
      options?: TriggersListByImageTemplateOptionalParams,
    ) => listByImageTemplate(context, resourceGroupName, imageTemplateName, options),
    delete: (
      resourceGroupName: string,
      imageTemplateName: string,
      triggerName: string,
      options?: TriggersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, imageTemplateName, triggerName, options),
    beginDelete: async (
      resourceGroupName: string,
      imageTemplateName: string,
      triggerName: string,
      options?: TriggersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, imageTemplateName, triggerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      imageTemplateName: string,
      triggerName: string,
      options?: TriggersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, imageTemplateName, triggerName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      imageTemplateName: string,
      triggerName: string,
      parameters: Trigger,
      options?: TriggersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        imageTemplateName,
        triggerName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      imageTemplateName: string,
      triggerName: string,
      parameters: Trigger,
      options?: TriggersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        imageTemplateName,
        triggerName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      imageTemplateName: string,
      triggerName: string,
      parameters: Trigger,
      options?: TriggersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        imageTemplateName,
        triggerName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      imageTemplateName: string,
      triggerName: string,
      options?: TriggersGetOptionalParams,
    ) => get(context, resourceGroupName, imageTemplateName, triggerName, options),
  };
}

export function _getTriggersOperations(context: ImageBuilderContext): TriggersOperations {
  return {
    ..._getTriggers(context),
  };
}
