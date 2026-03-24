// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { post } from "../../api/dataConnectorsCheckRequirements/operations.js";
import type { DataConnectorsCheckRequirementsPostOptionalParams } from "../../api/dataConnectorsCheckRequirements/options.js";
import type {
  DataConnectorsCheckRequirementsUnion,
  DataConnectorRequirementsState,
} from "../../models/models.js";

/** Interface representing a DataConnectorsCheckRequirements operations. */
export interface DataConnectorsCheckRequirementsOperations {
  /** Get requirements state for a data connector type. */
  post: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorsCheckRequirements: DataConnectorsCheckRequirementsUnion,
    options?: DataConnectorsCheckRequirementsPostOptionalParams,
  ) => Promise<DataConnectorRequirementsState>;
}

function _getDataConnectorsCheckRequirements(context: SecurityInsightsContext) {
  return {
    post: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorsCheckRequirements: DataConnectorsCheckRequirementsUnion,
      options?: DataConnectorsCheckRequirementsPostOptionalParams,
    ) => post(context, resourceGroupName, workspaceName, dataConnectorsCheckRequirements, options),
  };
}

export function _getDataConnectorsCheckRequirementsOperations(
  context: SecurityInsightsContext,
): DataConnectorsCheckRequirementsOperations {
  return {
    ..._getDataConnectorsCheckRequirements(context),
  };
}
