// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExtensionsContext } from "../../api/extensionsContext.js";
import { list, $delete, update, create, get } from "../../api/extensions/operations.js";
import type {
  ExtensionsListOptionalParams,
  ExtensionsDeleteOptionalParams,
  ExtensionsUpdateOptionalParams,
  ExtensionsCreateOptionalParams,
  ExtensionsGetOptionalParams,
} from "../../api/extensions/options.js";
import type { Extension, PatchExtension } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Extensions operations. */
export interface ExtensionsOperations {
  /** List all Extensions in the cluster. */
  list: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    options?: ExtensionsListOptionalParams,
  ) => PagedAsyncIterableIterator<Extension>;
  /** Delete a Kubernetes Cluster Extension. This will cause the Agent to Uninstall the extension from the cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    options?: ExtensionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    options?: ExtensionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    options?: ExtensionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch an existing Kubernetes Cluster Extension. */
  update: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    patchExtension: PatchExtension,
    options?: ExtensionsUpdateOptionalParams,
  ) => PollerLike<OperationState<Extension>, Extension>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    patchExtension: PatchExtension,
    options?: ExtensionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Extension>, Extension>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    patchExtension: PatchExtension,
    options?: ExtensionsUpdateOptionalParams,
  ) => Promise<Extension>;
  /** Create a new Kubernetes Cluster Extension. */
  create: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    extension: Extension,
    options?: ExtensionsCreateOptionalParams,
  ) => PollerLike<OperationState<Extension>, Extension>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    extension: Extension,
    options?: ExtensionsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Extension>, Extension>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    extension: Extension,
    options?: ExtensionsCreateOptionalParams,
  ) => Promise<Extension>;
  /** Gets Kubernetes Cluster Extension. */
  get: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    options?: ExtensionsGetOptionalParams,
  ) => Promise<Extension>;
}

function _getExtensions(context: ExtensionsContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      options?: ExtensionsListOptionalParams,
    ) => list(context, resourceGroupName, clusterRp, clusterResourceName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      options?: ExtensionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      options?: ExtensionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      options?: ExtensionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      patchExtension: PatchExtension,
      options?: ExtensionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        patchExtension,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      patchExtension: PatchExtension,
      options?: ExtensionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        patchExtension,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      patchExtension: PatchExtension,
      options?: ExtensionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        patchExtension,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      extension: Extension,
      options?: ExtensionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        extension,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      extension: Extension,
      options?: ExtensionsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        extension,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      extension: Extension,
      options?: ExtensionsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        extension,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      options?: ExtensionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        options,
      ),
  };
}

export function _getExtensionsOperations(context: ExtensionsContext): ExtensionsOperations {
  return {
    ..._getExtensions(context),
  };
}
