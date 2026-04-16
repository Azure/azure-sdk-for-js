// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { listRecommendations, listByServer, get } from "../../api/tuningOptions/operations.js";
import type {
  TuningOptionsListRecommendationsOptionalParams,
  TuningOptionsListByServerOptionalParams,
  TuningOptionsGetOptionalParams,
} from "../../api/tuningOptions/options.js";
import type {
  TuningOptions,
  TuningOptionParameterEnum,
  ObjectRecommendation,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TuningOptions operations. */
export interface TuningOptionsOperations {
  /** Lists available object recommendations. */
  listRecommendations: (
    resourceGroupName: string,
    serverName: string,
    tuningOption: TuningOptionParameterEnum,
    options?: TuningOptionsListRecommendationsOptionalParams,
  ) => PagedAsyncIterableIterator<ObjectRecommendation>;
  /** Lists the tuning options of a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: TuningOptionsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<TuningOptions>;
  /** Gets the tuning options of a server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    tuningOption: TuningOptionParameterEnum,
    options?: TuningOptionsGetOptionalParams,
  ) => Promise<TuningOptions>;
}

function _getTuningOptions(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listRecommendations: (
      resourceGroupName: string,
      serverName: string,
      tuningOption: TuningOptionParameterEnum,
      options?: TuningOptionsListRecommendationsOptionalParams,
    ) => listRecommendations(context, resourceGroupName, serverName, tuningOption, options),
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: TuningOptionsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      tuningOption: TuningOptionParameterEnum,
      options?: TuningOptionsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, tuningOption, options),
  };
}

export function _getTuningOptionsOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): TuningOptionsOperations {
  return {
    ..._getTuningOptions(context),
  };
}
