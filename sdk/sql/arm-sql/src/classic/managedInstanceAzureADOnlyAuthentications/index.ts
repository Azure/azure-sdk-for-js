// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByInstance,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedInstanceAzureADOnlyAuthentications/operations.js";
import type {
  ManagedInstanceAzureADOnlyAuthenticationsListByInstanceOptionalParams,
  ManagedInstanceAzureADOnlyAuthenticationsDeleteOptionalParams,
  ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
  ManagedInstanceAzureADOnlyAuthenticationsGetOptionalParams,
} from "../../api/managedInstanceAzureADOnlyAuthentications/options.js";
import type {
  ManagedInstanceAzureADOnlyAuthentication,
  AuthenticationName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstanceAzureADOnlyAuthentications operations. */
export interface ManagedInstanceAzureADOnlyAuthenticationsOperations {
  /** Gets a list of server Azure Active Directory only authentications. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstanceAzureADOnlyAuthenticationsListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceAzureADOnlyAuthentication>;
  /** Deletes an existing server Active Directory only authentication property. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    authenticationName: AuthenticationName,
    options?: ManagedInstanceAzureADOnlyAuthenticationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    authenticationName: AuthenticationName,
    options?: ManagedInstanceAzureADOnlyAuthenticationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    authenticationName: AuthenticationName,
    options?: ManagedInstanceAzureADOnlyAuthenticationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    authenticationName: AuthenticationName,
    parameters: ManagedInstanceAzureADOnlyAuthentication,
    options?: ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedInstanceAzureADOnlyAuthentication>,
    ManagedInstanceAzureADOnlyAuthentication
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    authenticationName: AuthenticationName,
    parameters: ManagedInstanceAzureADOnlyAuthentication,
    options?: ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedInstanceAzureADOnlyAuthentication>,
      ManagedInstanceAzureADOnlyAuthentication
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    authenticationName: AuthenticationName,
    parameters: ManagedInstanceAzureADOnlyAuthentication,
    options?: ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedInstanceAzureADOnlyAuthentication>;
  /** Gets a specific Azure Active Directory only authentication property. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    authenticationName: AuthenticationName,
    options?: ManagedInstanceAzureADOnlyAuthenticationsGetOptionalParams,
  ) => Promise<ManagedInstanceAzureADOnlyAuthentication>;
}

function _getManagedInstanceAzureADOnlyAuthentications(context: SqlContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstanceAzureADOnlyAuthenticationsListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      authenticationName: AuthenticationName,
      options?: ManagedInstanceAzureADOnlyAuthenticationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, managedInstanceName, authenticationName, options),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      authenticationName: AuthenticationName,
      options?: ManagedInstanceAzureADOnlyAuthenticationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        authenticationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      authenticationName: AuthenticationName,
      options?: ManagedInstanceAzureADOnlyAuthenticationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        authenticationName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      authenticationName: AuthenticationName,
      parameters: ManagedInstanceAzureADOnlyAuthentication,
      options?: ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        authenticationName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      authenticationName: AuthenticationName,
      parameters: ManagedInstanceAzureADOnlyAuthentication,
      options?: ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        authenticationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      authenticationName: AuthenticationName,
      parameters: ManagedInstanceAzureADOnlyAuthentication,
      options?: ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        authenticationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      authenticationName: AuthenticationName,
      options?: ManagedInstanceAzureADOnlyAuthenticationsGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, authenticationName, options),
  };
}

export function _getManagedInstanceAzureADOnlyAuthenticationsOperations(
  context: SqlContext,
): ManagedInstanceAzureADOnlyAuthenticationsOperations {
  return {
    ..._getManagedInstanceAzureADOnlyAuthentications(context),
  };
}
