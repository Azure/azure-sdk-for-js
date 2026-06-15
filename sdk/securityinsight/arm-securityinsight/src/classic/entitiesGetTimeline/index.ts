// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/entitiesGetTimeline/operations.js";
import type { EntitiesGetTimelineListOptionalParams } from "../../api/entitiesGetTimeline/options.js";
import type { EntityTimelineParameters, EntityTimelineResponse } from "../../models/models.js";

/** Interface representing a EntitiesGetTimeline operations. */
export interface EntitiesGetTimelineOperations {
  /** Timeline for an entity. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    entityId: string,
    parameters: EntityTimelineParameters,
    options?: EntitiesGetTimelineListOptionalParams,
  ) => Promise<EntityTimelineResponse>;
}

function _getEntitiesGetTimeline(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      entityId: string,
      parameters: EntityTimelineParameters,
      options?: EntitiesGetTimelineListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, entityId, parameters, options),
  };
}

export function _getEntitiesGetTimelineOperations(
  context: SecurityInsightsContext,
): EntitiesGetTimelineOperations {
  return {
    ..._getEntitiesGetTimeline(context),
  };
}
