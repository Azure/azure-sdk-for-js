// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import {
  listRecommendations,
  listByServer,
  get,
} from "../../api/tuningOptionsOperations/operations.js";
import {
  TuningOptionsOperationsListRecommendationsOptionalParams,
  TuningOptionsOperationsListByServerOptionalParams,
  TuningOptionsOperationsGetOptionalParams,
} from "../../api/tuningOptionsOperations/options.js";
import {
  TuningOptions,
  TuningOptionParameterEnum,
  ObjectRecommendation,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TuningOptionsOperations operations. */
export interface TuningOptionsOperationsOperations {
  /** Lists available object recommendations. */
  listRecommendations: (
    resourceGroupName: string,
    serverName: string,
    tuningOption: TuningOptionParameterEnum,
    options?: TuningOptionsOperationsListRecommendationsOptionalParams,
  ) => PagedAsyncIterableIterator<ObjectRecommendation>;
  /** Lists the tuning options of a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: TuningOptionsOperationsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<TuningOptions>;
  /** Gets the tuning options of a server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    tuningOption: TuningOptionParameterEnum,
    options?: TuningOptionsOperationsGetOptionalParams,
  ) => Promise<TuningOptions>;
}

function _getTuningOptionsOperations(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listRecommendations: (
      resourceGroupName: string,
      serverName: string,
      tuningOption: TuningOptionParameterEnum,
      options?: TuningOptionsOperationsListRecommendationsOptionalParams,
    ) => listRecommendations(context, resourceGroupName, serverName, tuningOption, options),
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: TuningOptionsOperationsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      tuningOption: TuningOptionParameterEnum,
      options?: TuningOptionsOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, tuningOption, options),
  };
}

export function _getTuningOptionsOperationsOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): TuningOptionsOperationsOperations {
  return {
    ..._getTuningOptionsOperations(context),
  };
}
