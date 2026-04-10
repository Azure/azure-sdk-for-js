// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByInstance,
  createOrUpdate,
  get,
} from "../../api/managedServerSecurityAlertPolicies/operations.js";
import type {
  ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams,
  ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ManagedServerSecurityAlertPoliciesGetOptionalParams,
} from "../../api/managedServerSecurityAlertPolicies/options.js";
import type {
  SecurityAlertPolicyName,
  ManagedServerSecurityAlertPolicy,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedServerSecurityAlertPolicies operations. */
export interface ManagedServerSecurityAlertPoliciesOperations {
  /** Get the managed server's threat detection policies. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedServerSecurityAlertPolicy>;
  /** Creates or updates a threat detection policy. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    parameters: ManagedServerSecurityAlertPolicy,
    options?: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedServerSecurityAlertPolicy>,
    ManagedServerSecurityAlertPolicy
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    parameters: ManagedServerSecurityAlertPolicy,
    options?: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedServerSecurityAlertPolicy>,
      ManagedServerSecurityAlertPolicy
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    parameters: ManagedServerSecurityAlertPolicy,
    options?: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedServerSecurityAlertPolicy>;
  /** Get a managed server's threat detection policy. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    options?: ManagedServerSecurityAlertPoliciesGetOptionalParams,
  ) => Promise<ManagedServerSecurityAlertPolicy>;
}

function _getManagedServerSecurityAlertPolicies(context: SqlManagementContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      parameters: ManagedServerSecurityAlertPolicy,
      options?: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        securityAlertPolicyName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      parameters: ManagedServerSecurityAlertPolicy,
      options?: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        securityAlertPolicyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      parameters: ManagedServerSecurityAlertPolicy,
      options?: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        securityAlertPolicyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      options?: ManagedServerSecurityAlertPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, securityAlertPolicyName, options),
  };
}

export function _getManagedServerSecurityAlertPoliciesOperations(
  context: SqlManagementContext,
): ManagedServerSecurityAlertPoliciesOperations {
  return {
    ..._getManagedServerSecurityAlertPolicies(context),
  };
}
