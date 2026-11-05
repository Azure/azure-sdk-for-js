// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  list,
  $delete,
  createOrReplace,
  get,
} from "../../api/microsoftEntraAdministrators/operations.js";
import type {
  MicrosoftEntraAdministratorsListOptionalParams,
  MicrosoftEntraAdministratorsDeleteOptionalParams,
  MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams,
  MicrosoftEntraAdministratorsGetOptionalParams,
} from "../../api/microsoftEntraAdministrators/options.js";
import type {
  MicrosoftEntraAdministrator,
  MicrosoftEntraAdministratorAdd,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MicrosoftEntraAdministrators operations. */
export interface MicrosoftEntraAdministratorsOperations {
  /** Lists the PostgreSQL roles in a cluster that are members of azure_pg_admin and mapped to Microsoft Entra principals. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: MicrosoftEntraAdministratorsListOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftEntraAdministrator>;
  /** Deletes a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    options?: MicrosoftEntraAdministratorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    options?: MicrosoftEntraAdministratorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    options?: MicrosoftEntraAdministratorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    resource: MicrosoftEntraAdministratorAdd,
    options?: MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<MicrosoftEntraAdministrator>, MicrosoftEntraAdministrator>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    resource: MicrosoftEntraAdministratorAdd,
    options?: MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MicrosoftEntraAdministrator>, MicrosoftEntraAdministrator>
  >;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    resource: MicrosoftEntraAdministratorAdd,
    options?: MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams,
  ) => Promise<MicrosoftEntraAdministrator>;
  /** Gets information about a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    options?: MicrosoftEntraAdministratorsGetOptionalParams,
  ) => Promise<MicrosoftEntraAdministrator>;
}

function _getMicrosoftEntraAdministrators(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: MicrosoftEntraAdministratorsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      options?: MicrosoftEntraAdministratorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, objectId, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      options?: MicrosoftEntraAdministratorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, objectId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      options?: MicrosoftEntraAdministratorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, objectId, options);
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      resource: MicrosoftEntraAdministratorAdd,
      options?: MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, clusterName, objectId, resource, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      resource: MicrosoftEntraAdministratorAdd,
      options?: MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        objectId,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      resource: MicrosoftEntraAdministratorAdd,
      options?: MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        objectId,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      options?: MicrosoftEntraAdministratorsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, objectId, options),
  };
}

export function _getMicrosoftEntraAdministratorsOperations(
  context: HorizonDbContext,
): MicrosoftEntraAdministratorsOperations {
  return {
    ..._getMicrosoftEntraAdministrators(context),
  };
}
