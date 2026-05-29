// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { get } from "../../api/schema/operations.js";
import { SchemaGetOptionalParams } from "../../api/schema/options.js";
import { SearchGetSchemaResponse } from "../../models/models.js";

/** Interface representing a Schema operations. */
export interface SchemaOperations {
  /** Gets the schema for a given workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SchemaGetOptionalParams,
  ) => Promise<SearchGetSchemaResponse>;
}

function _getSchema(context: OperationalInsightsManagementContext) {
  return {
    get: (resourceGroupName: string, workspaceName: string, options?: SchemaGetOptionalParams) =>
      get(context, resourceGroupName, workspaceName, options),
  };
}

export function _getSchemaOperations(
  context: OperationalInsightsManagementContext,
): SchemaOperations {
  return {
    ..._getSchema(context),
  };
}
