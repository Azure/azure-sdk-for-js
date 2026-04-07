// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { createOrUpdate, get } from "../../api/sqlAgent/operations.js";
import type {
  SqlAgentCreateOrUpdateOptionalParams,
  SqlAgentGetOptionalParams,
} from "../../api/sqlAgent/options.js";
import type { SqlAgentConfiguration } from "../../models/models.js";

/** Interface representing a SqlAgent operations. */
export interface SqlAgentOperations {
  /** Puts new sql agent configuration to instance. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: SqlAgentConfiguration,
    options?: SqlAgentCreateOrUpdateOptionalParams,
  ) => Promise<SqlAgentConfiguration>;
  /** Gets current instance sql agent configuration. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: SqlAgentGetOptionalParams,
  ) => Promise<SqlAgentConfiguration>;
}

function _getSqlAgent(context: SqlContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: SqlAgentConfiguration,
      options?: SqlAgentCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, managedInstanceName, parameters, options),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: SqlAgentGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, options),
  };
}

export function _getSqlAgentOperations(context: SqlContext): SqlAgentOperations {
  return {
    ..._getSqlAgent(context),
  };
}
