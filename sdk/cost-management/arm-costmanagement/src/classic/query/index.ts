// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import { usageByExternalCloudProviderType, usage } from "../../api/query/operations.js";
import type {
  QueryUsageByExternalCloudProviderTypeOptionalParams,
  QueryUsageOptionalParams,
} from "../../api/query/options.js";
import type {
  QueryDefinition,
  QueryResult,
  ExternalCloudProviderType,
} from "../../models/models.js";

/** Interface representing a Query operations. */
export interface QueryOperations {
  /** Query the usage data for external cloud provider type defined. */
  usageByExternalCloudProviderType: (
    externalCloudProviderType: ExternalCloudProviderType,
    externalCloudProviderId: string,
    parameters: QueryDefinition,
    options?: QueryUsageByExternalCloudProviderTypeOptionalParams,
  ) => Promise<QueryResult>;
  /** Query the usage data for scope defined. */
  usage: (
    scope: string,
    parameters: QueryDefinition,
    options?: QueryUsageOptionalParams,
  ) => Promise<QueryResult | undefined>;
}

function _getQuery(context: CostManagementContext) {
  return {
    usageByExternalCloudProviderType: (
      externalCloudProviderType: ExternalCloudProviderType,
      externalCloudProviderId: string,
      parameters: QueryDefinition,
      options?: QueryUsageByExternalCloudProviderTypeOptionalParams,
    ) =>
      usageByExternalCloudProviderType(
        context,
        externalCloudProviderType,
        externalCloudProviderId,
        parameters,
        options,
      ),
    usage: (scope: string, parameters: QueryDefinition, options?: QueryUsageOptionalParams) =>
      usage(context, scope, parameters, options),
  };
}

export function _getQueryOperations(context: CostManagementContext): QueryOperations {
  return {
    ..._getQuery(context),
  };
}
