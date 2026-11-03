// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  list,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/changeDataCaptureCapabilities/operations.js";
import type {
  ChangeDataCaptureCapabilitiesListOptionalParams,
  ChangeDataCaptureCapabilitiesDeleteOptionalParams,
  ChangeDataCaptureCapabilitiesUpdateOptionalParams,
  ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams,
  ChangeDataCaptureCapabilitiesGetOptionalParams,
} from "../../api/changeDataCaptureCapabilities/options.js";
import type {
  ChangeDataCaptureCapability,
  ChangeDataCaptureCapabilityCreateOrUpdate,
  ChangeDataCaptureCapabilityForPatchUpdateUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ChangeDataCaptureCapabilities operations. */
export interface ChangeDataCaptureCapabilitiesOperations {
  /** Lists the optional singleton change data capture capability for a cluster. The result contains zero or one item. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ChangeDataCaptureCapabilitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<ChangeDataCaptureCapability>;
  /** Deletes the change data capture capability after all change data capture destinations and configurations have been removed. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ChangeDataCaptureCapabilitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ChangeDataCaptureCapabilitiesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ChangeDataCaptureCapabilitiesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates mutable change data capture capability properties. Omitted properties preserve their current values. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    properties: ChangeDataCaptureCapabilityForPatchUpdateUpdate,
    options?: ChangeDataCaptureCapabilitiesUpdateOptionalParams,
  ) => PollerLike<OperationState<ChangeDataCaptureCapability>, ChangeDataCaptureCapability>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    properties: ChangeDataCaptureCapabilityForPatchUpdateUpdate,
    options?: ChangeDataCaptureCapabilitiesUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ChangeDataCaptureCapability>, ChangeDataCaptureCapability>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    properties: ChangeDataCaptureCapabilityForPatchUpdateUpdate,
    options?: ChangeDataCaptureCapabilitiesUpdateOptionalParams,
  ) => Promise<ChangeDataCaptureCapability>;
  /** Creates or replaces the singleton change data capture capability and reconciles shared engine prerequisites. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    resource: ChangeDataCaptureCapabilityCreateOrUpdate,
    options?: ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<ChangeDataCaptureCapability>, ChangeDataCaptureCapability>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    resource: ChangeDataCaptureCapabilityCreateOrUpdate,
    options?: ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ChangeDataCaptureCapability>, ChangeDataCaptureCapability>
  >;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    resource: ChangeDataCaptureCapabilityCreateOrUpdate,
    options?: ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams,
  ) => Promise<ChangeDataCaptureCapability>;
  /** Gets the singleton change data capture capability for a HorizonDB cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ChangeDataCaptureCapabilitiesGetOptionalParams,
  ) => Promise<ChangeDataCaptureCapability>;
}

function _getChangeDataCaptureCapabilities(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: ChangeDataCaptureCapabilitiesListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ChangeDataCaptureCapabilitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ChangeDataCaptureCapabilitiesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ChangeDataCaptureCapabilitiesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      properties: ChangeDataCaptureCapabilityForPatchUpdateUpdate,
      options?: ChangeDataCaptureCapabilitiesUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      properties: ChangeDataCaptureCapabilityForPatchUpdateUpdate,
      options?: ChangeDataCaptureCapabilitiesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      properties: ChangeDataCaptureCapabilityForPatchUpdateUpdate,
      options?: ChangeDataCaptureCapabilitiesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, properties, options);
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      resource: ChangeDataCaptureCapabilityCreateOrUpdate,
      options?: ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, clusterName, resource, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      resource: ChangeDataCaptureCapabilityCreateOrUpdate,
      options?: ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(context, resourceGroupName, clusterName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      resource: ChangeDataCaptureCapabilityCreateOrUpdate,
      options?: ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(context, resourceGroupName, clusterName, resource, options);
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: ChangeDataCaptureCapabilitiesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getChangeDataCaptureCapabilitiesOperations(
  context: HorizonDbContext,
): ChangeDataCaptureCapabilitiesOperations {
  return {
    ..._getChangeDataCaptureCapabilities(context),
  };
}
