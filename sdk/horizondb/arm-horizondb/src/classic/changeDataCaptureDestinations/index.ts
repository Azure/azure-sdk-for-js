// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  activateIdentity,
  list,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/changeDataCaptureDestinations/operations.js";
import type {
  ChangeDataCaptureDestinationsActivateIdentityOptionalParams,
  ChangeDataCaptureDestinationsListOptionalParams,
  ChangeDataCaptureDestinationsDeleteOptionalParams,
  ChangeDataCaptureDestinationsUpdateOptionalParams,
  ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams,
  ChangeDataCaptureDestinationsGetOptionalParams,
} from "../../api/changeDataCaptureDestinations/options.js";
import type {
  ChangeDataCaptureDestination,
  ActivateChangeDataCaptureIdentityRequest,
  ActivateChangeDataCaptureIdentityResult,
  ChangeDataCaptureDestinationCreateOrUpdate,
  ChangeDataCaptureDestinationForPatchUpdateUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ChangeDataCaptureDestinations operations. */
export interface ChangeDataCaptureDestinationsOperations {
  /** Atomically activates a validated identity assignment for this destination. If-Match is evaluated against the destination entity tag. Activating the already-active assignment succeeds idempotently. */
  activateIdentity: (
    resourceGroupName: string,
    ifMatch: string,
    clusterName: string,
    destinationName: string,
    body: ActivateChangeDataCaptureIdentityRequest,
    options?: ChangeDataCaptureDestinationsActivateIdentityOptionalParams,
  ) => PollerLike<
    OperationState<ActivateChangeDataCaptureIdentityResult>,
    ActivateChangeDataCaptureIdentityResult
  >;
  /** @deprecated use activateIdentity instead */
  beginActivateIdentity: (
    resourceGroupName: string,
    ifMatch: string,
    clusterName: string,
    destinationName: string,
    body: ActivateChangeDataCaptureIdentityRequest,
    options?: ChangeDataCaptureDestinationsActivateIdentityOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ActivateChangeDataCaptureIdentityResult>,
      ActivateChangeDataCaptureIdentityResult
    >
  >;
  /** @deprecated use activateIdentity instead */
  beginActivateIdentityAndWait: (
    resourceGroupName: string,
    ifMatch: string,
    clusterName: string,
    destinationName: string,
    body: ActivateChangeDataCaptureIdentityRequest,
    options?: ChangeDataCaptureDestinationsActivateIdentityOptionalParams,
  ) => Promise<ActivateChangeDataCaptureIdentityResult>;
  /** Lists change data capture destinations in a HorizonDB cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ChangeDataCaptureDestinationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ChangeDataCaptureDestination>;
  /** Deletes a change data capture destination after all referencing configurations and identity assignments have been removed. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    options?: ChangeDataCaptureDestinationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    options?: ChangeDataCaptureDestinationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    options?: ChangeDataCaptureDestinationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates mutable change data capture destination properties. Omitted properties preserve their current values. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    properties: ChangeDataCaptureDestinationForPatchUpdateUpdate,
    options?: ChangeDataCaptureDestinationsUpdateOptionalParams,
  ) => PollerLike<OperationState<ChangeDataCaptureDestination>, ChangeDataCaptureDestination>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    properties: ChangeDataCaptureDestinationForPatchUpdateUpdate,
    options?: ChangeDataCaptureDestinationsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ChangeDataCaptureDestination>, ChangeDataCaptureDestination>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    properties: ChangeDataCaptureDestinationForPatchUpdateUpdate,
    options?: ChangeDataCaptureDestinationsUpdateOptionalParams,
  ) => Promise<ChangeDataCaptureDestination>;
  /** Creates or replaces a Microsoft Fabric change data capture destination. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    resource: ChangeDataCaptureDestinationCreateOrUpdate,
    options?: ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<ChangeDataCaptureDestination>, ChangeDataCaptureDestination>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    resource: ChangeDataCaptureDestinationCreateOrUpdate,
    options?: ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ChangeDataCaptureDestination>, ChangeDataCaptureDestination>
  >;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    resource: ChangeDataCaptureDestinationCreateOrUpdate,
    options?: ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams,
  ) => Promise<ChangeDataCaptureDestination>;
  /** Gets a change data capture destination. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    options?: ChangeDataCaptureDestinationsGetOptionalParams,
  ) => Promise<ChangeDataCaptureDestination>;
}

function _getChangeDataCaptureDestinations(context: HorizonDbContext) {
  return {
    activateIdentity: (
      resourceGroupName: string,
      ifMatch: string,
      clusterName: string,
      destinationName: string,
      body: ActivateChangeDataCaptureIdentityRequest,
      options?: ChangeDataCaptureDestinationsActivateIdentityOptionalParams,
    ) =>
      activateIdentity(
        context,
        resourceGroupName,
        ifMatch,
        clusterName,
        destinationName,
        body,
        options,
      ),
    beginActivateIdentity: async (
      resourceGroupName: string,
      ifMatch: string,
      clusterName: string,
      destinationName: string,
      body: ActivateChangeDataCaptureIdentityRequest,
      options?: ChangeDataCaptureDestinationsActivateIdentityOptionalParams,
    ) => {
      const poller = activateIdentity(
        context,
        resourceGroupName,
        ifMatch,
        clusterName,
        destinationName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginActivateIdentityAndWait: async (
      resourceGroupName: string,
      ifMatch: string,
      clusterName: string,
      destinationName: string,
      body: ActivateChangeDataCaptureIdentityRequest,
      options?: ChangeDataCaptureDestinationsActivateIdentityOptionalParams,
    ) => {
      return await activateIdentity(
        context,
        resourceGroupName,
        ifMatch,
        clusterName,
        destinationName,
        body,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: ChangeDataCaptureDestinationsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      options?: ChangeDataCaptureDestinationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, destinationName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      options?: ChangeDataCaptureDestinationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, destinationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      options?: ChangeDataCaptureDestinationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, destinationName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      properties: ChangeDataCaptureDestinationForPatchUpdateUpdate,
      options?: ChangeDataCaptureDestinationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, destinationName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      properties: ChangeDataCaptureDestinationForPatchUpdateUpdate,
      options?: ChangeDataCaptureDestinationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      properties: ChangeDataCaptureDestinationForPatchUpdateUpdate,
      options?: ChangeDataCaptureDestinationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        properties,
        options,
      );
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      resource: ChangeDataCaptureDestinationCreateOrUpdate,
      options?: ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(context, resourceGroupName, clusterName, destinationName, resource, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      resource: ChangeDataCaptureDestinationCreateOrUpdate,
      options?: ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      resource: ChangeDataCaptureDestinationCreateOrUpdate,
      options?: ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      options?: ChangeDataCaptureDestinationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, destinationName, options),
  };
}

export function _getChangeDataCaptureDestinationsOperations(
  context: HorizonDbContext,
): ChangeDataCaptureDestinationsOperations {
  return {
    ..._getChangeDataCaptureDestinations(context),
  };
}
