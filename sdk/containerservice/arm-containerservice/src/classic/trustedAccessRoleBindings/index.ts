// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/trustedAccessRoleBindings/operations.js";
import type {
  TrustedAccessRoleBindingsListOptionalParams,
  TrustedAccessRoleBindingsDeleteOptionalParams,
  TrustedAccessRoleBindingsCreateOrUpdateOptionalParams,
  TrustedAccessRoleBindingsGetOptionalParams,
} from "../../api/trustedAccessRoleBindings/options.js";
import type { TrustedAccessRoleBinding } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TrustedAccessRoleBindings operations. */
export interface TrustedAccessRoleBindingsOperations {
  /** List trusted access role bindings. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: TrustedAccessRoleBindingsListOptionalParams,
  ) => PagedAsyncIterableIterator<TrustedAccessRoleBinding>;
  /** Delete a trusted access role binding. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    trustedAccessRoleBindingName: string,
    options?: TrustedAccessRoleBindingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    trustedAccessRoleBindingName: string,
    options?: TrustedAccessRoleBindingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    trustedAccessRoleBindingName: string,
    options?: TrustedAccessRoleBindingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a trusted access role binding */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    trustedAccessRoleBindingName: string,
    trustedAccessRoleBinding: TrustedAccessRoleBinding,
    options?: TrustedAccessRoleBindingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TrustedAccessRoleBinding>, TrustedAccessRoleBinding>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    trustedAccessRoleBindingName: string,
    trustedAccessRoleBinding: TrustedAccessRoleBinding,
    options?: TrustedAccessRoleBindingsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<TrustedAccessRoleBinding>, TrustedAccessRoleBinding>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    trustedAccessRoleBindingName: string,
    trustedAccessRoleBinding: TrustedAccessRoleBinding,
    options?: TrustedAccessRoleBindingsCreateOrUpdateOptionalParams,
  ) => Promise<TrustedAccessRoleBinding>;
  /** Get a trusted access role binding. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    trustedAccessRoleBindingName: string,
    options?: TrustedAccessRoleBindingsGetOptionalParams,
  ) => Promise<TrustedAccessRoleBinding>;
}

function _getTrustedAccessRoleBindings(context: ContainerServiceContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: TrustedAccessRoleBindingsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      trustedAccessRoleBindingName: string,
      options?: TrustedAccessRoleBindingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, trustedAccessRoleBindingName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      trustedAccessRoleBindingName: string,
      options?: TrustedAccessRoleBindingsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        trustedAccessRoleBindingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      trustedAccessRoleBindingName: string,
      options?: TrustedAccessRoleBindingsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        trustedAccessRoleBindingName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      trustedAccessRoleBindingName: string,
      trustedAccessRoleBinding: TrustedAccessRoleBinding,
      options?: TrustedAccessRoleBindingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        trustedAccessRoleBindingName,
        trustedAccessRoleBinding,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      trustedAccessRoleBindingName: string,
      trustedAccessRoleBinding: TrustedAccessRoleBinding,
      options?: TrustedAccessRoleBindingsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        trustedAccessRoleBindingName,
        trustedAccessRoleBinding,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      trustedAccessRoleBindingName: string,
      trustedAccessRoleBinding: TrustedAccessRoleBinding,
      options?: TrustedAccessRoleBindingsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        trustedAccessRoleBindingName,
        trustedAccessRoleBinding,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      trustedAccessRoleBindingName: string,
      options?: TrustedAccessRoleBindingsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, trustedAccessRoleBindingName, options),
  };
}

export function _getTrustedAccessRoleBindingsOperations(
  context: ContainerServiceContext,
): TrustedAccessRoleBindingsOperations {
  return {
    ..._getTrustedAccessRoleBindings(context),
  };
}
