// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { createOrUpdate, listByDatabase } from "../../api/dataMaskingRules/operations.js";
import type {
  DataMaskingRulesCreateOrUpdateOptionalParams,
  DataMaskingRulesListByDatabaseOptionalParams,
} from "../../api/dataMaskingRules/options.js";
import type { DataMaskingRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataMaskingRules operations. */
export interface DataMaskingRulesOperations {
  /** Creates or updates a database data masking rule. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    dataMaskingRuleName: string,
    parameters: DataMaskingRule,
    options?: DataMaskingRulesCreateOrUpdateOptionalParams,
  ) => Promise<DataMaskingRule>;
  /** Gets a list of database data masking rules. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DataMaskingRulesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DataMaskingRule>;
}

function _getDataMaskingRules(context: SqlManagementContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      dataMaskingRuleName: string,
      parameters: DataMaskingRule,
      options?: DataMaskingRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        dataMaskingRuleName,
        parameters,
        options,
      ),
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DataMaskingRulesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getDataMaskingRulesOperations(
  context: SqlManagementContext,
): DataMaskingRulesOperations {
  return {
    ..._getDataMaskingRules(context),
  };
}
