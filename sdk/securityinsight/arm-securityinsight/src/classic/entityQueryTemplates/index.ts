// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, get } from "../../api/entityQueryTemplates/operations.js";
import type {
  EntityQueryTemplatesListOptionalParams,
  EntityQueryTemplatesGetOptionalParams,
} from "../../api/entityQueryTemplates/options.js";
import type { EntityQueryTemplateUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EntityQueryTemplates operations. */
export interface EntityQueryTemplatesOperations {
  /** Gets all entity query templates. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: EntityQueryTemplatesListOptionalParams,
  ) => PagedAsyncIterableIterator<EntityQueryTemplateUnion>;
  /** Gets an entity query. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    entityQueryTemplateId: string,
    options?: EntityQueryTemplatesGetOptionalParams,
  ) => Promise<EntityQueryTemplateUnion>;
}

function _getEntityQueryTemplates(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: EntityQueryTemplatesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      entityQueryTemplateId: string,
      options?: EntityQueryTemplatesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, entityQueryTemplateId, options),
  };
}

export function _getEntityQueryTemplatesOperations(
  context: SecurityInsightsContext,
): EntityQueryTemplatesOperations {
  return {
    ..._getEntityQueryTemplates(context),
  };
}
