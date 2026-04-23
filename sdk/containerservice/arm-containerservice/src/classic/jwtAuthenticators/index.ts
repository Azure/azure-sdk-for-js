// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listByManagedCluster,
  $delete,
  createOrUpdate,
  get,
} from "../../api/jwtAuthenticators/operations.js";
import type {
  JWTAuthenticatorsListByManagedClusterOptionalParams,
  JWTAuthenticatorsDeleteOptionalParams,
  JWTAuthenticatorsCreateOrUpdateOptionalParams,
  JWTAuthenticatorsGetOptionalParams,
} from "../../api/jwtAuthenticators/options.js";
import type { JWTAuthenticator } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a JWTAuthenticators operations. */
export interface JWTAuthenticatorsOperations {
  /** Gets a list of JWT authenticators in the specified managed cluster. */
  listByManagedCluster: (
    resourceGroupName: string,
    resourceName: string,
    options?: JWTAuthenticatorsListByManagedClusterOptionalParams,
  ) => PagedAsyncIterableIterator<JWTAuthenticator>;
  /** Deletes a JWT authenticator and updates the managed cluster to apply the settings. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    jwtAuthenticatorName: string,
    options?: JWTAuthenticatorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    jwtAuthenticatorName: string,
    options?: JWTAuthenticatorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    jwtAuthenticatorName: string,
    options?: JWTAuthenticatorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates JWT authenticator in the managed cluster and updates the managed cluster to apply the settings. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    jwtAuthenticatorName: string,
    parameters: JWTAuthenticator,
    options?: JWTAuthenticatorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<JWTAuthenticator>, JWTAuthenticator>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    jwtAuthenticatorName: string,
    parameters: JWTAuthenticator,
    options?: JWTAuthenticatorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JWTAuthenticator>, JWTAuthenticator>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    jwtAuthenticatorName: string,
    parameters: JWTAuthenticator,
    options?: JWTAuthenticatorsCreateOrUpdateOptionalParams,
  ) => Promise<JWTAuthenticator>;
  /** Gets the specified JWT authenticator of a managed cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    jwtAuthenticatorName: string,
    options?: JWTAuthenticatorsGetOptionalParams,
  ) => Promise<JWTAuthenticator>;
}

function _getJWTAuthenticators(context: ContainerServiceContext) {
  return {
    listByManagedCluster: (
      resourceGroupName: string,
      resourceName: string,
      options?: JWTAuthenticatorsListByManagedClusterOptionalParams,
    ) => listByManagedCluster(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      jwtAuthenticatorName: string,
      options?: JWTAuthenticatorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, jwtAuthenticatorName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      jwtAuthenticatorName: string,
      options?: JWTAuthenticatorsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        jwtAuthenticatorName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      jwtAuthenticatorName: string,
      options?: JWTAuthenticatorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, jwtAuthenticatorName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      jwtAuthenticatorName: string,
      parameters: JWTAuthenticator,
      options?: JWTAuthenticatorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        jwtAuthenticatorName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      jwtAuthenticatorName: string,
      parameters: JWTAuthenticator,
      options?: JWTAuthenticatorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        jwtAuthenticatorName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      jwtAuthenticatorName: string,
      parameters: JWTAuthenticator,
      options?: JWTAuthenticatorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        jwtAuthenticatorName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      jwtAuthenticatorName: string,
      options?: JWTAuthenticatorsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, jwtAuthenticatorName, options),
  };
}

export function _getJWTAuthenticatorsOperations(
  context: ContainerServiceContext,
): JWTAuthenticatorsOperations {
  return {
    ..._getJWTAuthenticators(context),
  };
}
