// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { create } from "../../api/managedInstanceTdeCertificates/operations.js";
import { ManagedInstanceTdeCertificatesCreateOptionalParams } from "../../api/managedInstanceTdeCertificates/options.js";
import { TdeCertificate } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstanceTdeCertificates operations. */
export interface ManagedInstanceTdeCertificatesOperations {
  /** Creates a TDE certificate for a given server. */
  create: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: TdeCertificate,
    options?: ManagedInstanceTdeCertificatesCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: TdeCertificate,
    options?: ManagedInstanceTdeCertificatesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: TdeCertificate,
    options?: ManagedInstanceTdeCertificatesCreateOptionalParams,
  ) => Promise<void>;
}

function _getManagedInstanceTdeCertificates(context: SqlManagementContext) {
  return {
    create: (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: TdeCertificate,
      options?: ManagedInstanceTdeCertificatesCreateOptionalParams,
    ) => create(context, resourceGroupName, managedInstanceName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: TdeCertificate,
      options?: ManagedInstanceTdeCertificatesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, managedInstanceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: TdeCertificate,
      options?: ManagedInstanceTdeCertificatesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, managedInstanceName, parameters, options);
    },
  };
}

export function _getManagedInstanceTdeCertificatesOperations(
  context: SqlManagementContext,
): ManagedInstanceTdeCertificatesOperations {
  return {
    ..._getManagedInstanceTdeCertificates(context),
  };
}
