// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import {
  listByWorkspace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/linkedServices/operations.js";
import {
  LinkedServicesListByWorkspaceOptionalParams,
  LinkedServicesDeleteOptionalParams,
  LinkedServicesCreateOrUpdateOptionalParams,
  LinkedServicesGetOptionalParams,
} from "../../api/linkedServices/options.js";
import { LinkedService } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LinkedServices operations. */
export interface LinkedServicesOperations {
  /** Gets the linked services instances in a workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: LinkedServicesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<LinkedService>;
  /** Deletes a linked service instance. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    linkedServiceName: string,
    options?: LinkedServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<LinkedService>, LinkedService>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    linkedServiceName: string,
    options?: LinkedServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LinkedService>, LinkedService>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    linkedServiceName: string,
    options?: LinkedServicesDeleteOptionalParams,
  ) => Promise<LinkedService>;
  /** Create or update a linked service. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    linkedServiceName: string,
    parameters: LinkedService,
    options?: LinkedServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LinkedService>, LinkedService>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    linkedServiceName: string,
    parameters: LinkedService,
    options?: LinkedServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LinkedService>, LinkedService>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    linkedServiceName: string,
    parameters: LinkedService,
    options?: LinkedServicesCreateOrUpdateOptionalParams,
  ) => Promise<LinkedService>;
  /** Gets a linked service instance. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    linkedServiceName: string,
    options?: LinkedServicesGetOptionalParams,
  ) => Promise<LinkedService>;
}

function _getLinkedServices(context: OperationalInsightsManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: LinkedServicesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      linkedServiceName: string,
      options?: LinkedServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, linkedServiceName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      linkedServiceName: string,
      options?: LinkedServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, linkedServiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      linkedServiceName: string,
      options?: LinkedServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, linkedServiceName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      linkedServiceName: string,
      parameters: LinkedService,
      options?: LinkedServicesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        linkedServiceName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      linkedServiceName: string,
      parameters: LinkedService,
      options?: LinkedServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        linkedServiceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      linkedServiceName: string,
      parameters: LinkedService,
      options?: LinkedServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        linkedServiceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      linkedServiceName: string,
      options?: LinkedServicesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, linkedServiceName, options),
  };
}

export function _getLinkedServicesOperations(
  context: OperationalInsightsManagementContext,
): LinkedServicesOperations {
  return {
    ..._getLinkedServices(context),
  };
}
