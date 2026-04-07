// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { createOrUpdate, get } from "../../api/dataMaskingPolicies/operations.js";
import type {
  DataMaskingPoliciesCreateOrUpdateOptionalParams,
  DataMaskingPoliciesGetOptionalParams,
} from "../../api/dataMaskingPolicies/options.js";
import type { DataMaskingPolicy, DataMaskingPolicyName } from "../../models/models.js";

/** Interface representing a DataMaskingPolicies operations. */
export interface DataMaskingPoliciesOperations {
  /** Creates or updates a database data masking policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    dataMaskingPolicyName: DataMaskingPolicyName,
    parameters: DataMaskingPolicy,
    options?: DataMaskingPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<DataMaskingPolicy>;
  /** Gets the database data masking policy. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    dataMaskingPolicyName: DataMaskingPolicyName,
    options?: DataMaskingPoliciesGetOptionalParams,
  ) => Promise<DataMaskingPolicy>;
}

function _getDataMaskingPolicies(context: SqlContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      dataMaskingPolicyName: DataMaskingPolicyName,
      parameters: DataMaskingPolicy,
      options?: DataMaskingPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        dataMaskingPolicyName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      dataMaskingPolicyName: DataMaskingPolicyName,
      options?: DataMaskingPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, dataMaskingPolicyName, options),
  };
}

export function _getDataMaskingPoliciesOperations(
  context: SqlContext,
): DataMaskingPoliciesOperations {
  return {
    ..._getDataMaskingPolicies(context),
  };
}
