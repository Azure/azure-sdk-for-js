// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByManagedInstance,
  createOrUpdate,
  get,
} from "../../api/managedInstanceDtcs/operations.js";
import type {
  ManagedInstanceDtcsListByManagedInstanceOptionalParams,
  ManagedInstanceDtcsCreateOrUpdateOptionalParams,
  ManagedInstanceDtcsGetOptionalParams,
} from "../../api/managedInstanceDtcs/options.js";
import type { ManagedInstanceDtc, DtcName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstanceDtcs operations. */
export interface ManagedInstanceDtcsOperations {
  /** Gets a list of managed instance DTC settings. */
  listByManagedInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstanceDtcsListByManagedInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceDtc>;
  /** Updates managed instance DTC settings. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    dtcName: DtcName,
    parameters: ManagedInstanceDtc,
    options?: ManagedInstanceDtcsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedInstanceDtc>, ManagedInstanceDtc>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    dtcName: DtcName,
    parameters: ManagedInstanceDtc,
    options?: ManagedInstanceDtcsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedInstanceDtc>, ManagedInstanceDtc>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    dtcName: DtcName,
    parameters: ManagedInstanceDtc,
    options?: ManagedInstanceDtcsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedInstanceDtc>;
  /** Gets managed instance DTC settings. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    dtcName: DtcName,
    options?: ManagedInstanceDtcsGetOptionalParams,
  ) => Promise<ManagedInstanceDtc>;
}

function _getManagedInstanceDtcs(context: SqlManagementContext) {
  return {
    listByManagedInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstanceDtcsListByManagedInstanceOptionalParams,
    ) => listByManagedInstance(context, resourceGroupName, managedInstanceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      dtcName: DtcName,
      parameters: ManagedInstanceDtc,
      options?: ManagedInstanceDtcsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, managedInstanceName, dtcName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      dtcName: DtcName,
      parameters: ManagedInstanceDtc,
      options?: ManagedInstanceDtcsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        dtcName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      dtcName: DtcName,
      parameters: ManagedInstanceDtc,
      options?: ManagedInstanceDtcsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        dtcName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      dtcName: DtcName,
      options?: ManagedInstanceDtcsGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, dtcName, options),
  };
}

export function _getManagedInstanceDtcsOperations(
  context: SqlManagementContext,
): ManagedInstanceDtcsOperations {
  return {
    ..._getManagedInstanceDtcs(context),
  };
}
