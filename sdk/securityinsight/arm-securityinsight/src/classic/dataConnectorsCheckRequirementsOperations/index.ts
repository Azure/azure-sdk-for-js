// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { post } from "../../api/dataConnectorsCheckRequirementsOperations/operations.js";
import { DataConnectorsCheckRequirementsOperationsPostOptionalParams } from "../../api/dataConnectorsCheckRequirementsOperations/options.js";
import {
  DataConnectorsCheckRequirementsUnion,
  DataConnectorRequirementsState,
} from "../../models/models.js";

/** Interface representing a DataConnectorsCheckRequirementsOperations operations. */
export interface DataConnectorsCheckRequirementsOperationsOperations {
  /** Get requirements state for a data connector type. */
  post: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorsCheckRequirements: DataConnectorsCheckRequirementsUnion,
    options?: DataConnectorsCheckRequirementsOperationsPostOptionalParams,
  ) => Promise<DataConnectorRequirementsState>;
}

function _getDataConnectorsCheckRequirementsOperations(context: SecurityInsightsContext) {
  return {
    post: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorsCheckRequirements: DataConnectorsCheckRequirementsUnion,
      options?: DataConnectorsCheckRequirementsOperationsPostOptionalParams,
    ) => post(context, resourceGroupName, workspaceName, dataConnectorsCheckRequirements, options),
  };
}

export function _getDataConnectorsCheckRequirementsOperationsOperations(
  context: SecurityInsightsContext,
): DataConnectorsCheckRequirementsOperationsOperations {
  return {
    ..._getDataConnectorsCheckRequirementsOperations(context),
  };
}
