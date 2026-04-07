// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { createOrUpdate, listByDatabase } from "../../api/dataMaskingRules/operations.js";
import type {
  DataMaskingRulesCreateOrUpdateOptionalParams,
  DataMaskingRulesListByDatabaseOptionalParams,
} from "../../api/dataMaskingRules/options.js";
import type { DataMaskingPolicyName, DataMaskingRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataMaskingRules operations. */
export interface DataMaskingRulesOperations {
  /** Creates or updates a database data masking rule. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    dataMaskingPolicyName: DataMaskingPolicyName,
    dataMaskingRuleName: string,
    parameters: DataMaskingRule,
    options?: DataMaskingRulesCreateOrUpdateOptionalParams,
  ) => Promise<DataMaskingRule>;
  /** Gets a list of database data masking rules. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    dataMaskingPolicyName: DataMaskingPolicyName,
    options?: DataMaskingRulesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DataMaskingRule>;
}

function _getDataMaskingRules(context: SqlContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      dataMaskingPolicyName: DataMaskingPolicyName,
      dataMaskingRuleName: string,
      parameters: DataMaskingRule,
      options?: DataMaskingRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        dataMaskingPolicyName,
        dataMaskingRuleName,
        parameters,
        options,
      ),
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      dataMaskingPolicyName: DataMaskingPolicyName,
      options?: DataMaskingRulesListByDatabaseOptionalParams,
    ) =>
      listByDatabase(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        dataMaskingPolicyName,
        options,
      ),
  };
}

export function _getDataMaskingRulesOperations(context: SqlContext): DataMaskingRulesOperations {
  return {
    ..._getDataMaskingRules(context),
  };
}
