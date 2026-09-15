// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppContext } from "../../api/appContext.js";
import { listByLocation } from "../../api/supportedAgentModels/operations.js";
import type { SupportedAgentModelsListByLocationOptionalParams } from "../../api/supportedAgentModels/options.js";
import type { SupportedAgentModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SupportedAgentModels operations. */
export interface SupportedAgentModelsOperations {
  /** List SupportedAgentModel resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: SupportedAgentModelsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<SupportedAgentModel>;
}

function _getSupportedAgentModels(context: AppContext) {
  return {
    listByLocation: (
      location: string,
      options?: SupportedAgentModelsListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
  };
}

export function _getSupportedAgentModelsOperations(
  context: AppContext,
): SupportedAgentModelsOperations {
  return {
    ..._getSupportedAgentModels(context),
  };
}
