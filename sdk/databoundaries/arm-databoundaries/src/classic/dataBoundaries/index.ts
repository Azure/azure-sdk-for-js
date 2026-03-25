// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataboundariesManegementContext } from "../../api/databoundariesManegementContext.js";
import { put, getTenant, getScope } from "../../api/dataBoundaries/operations.js";
import type {
  DataBoundariesPutOptionalParams,
  DataBoundariesGetTenantOptionalParams,
  DataBoundariesGetScopeOptionalParams,
} from "../../api/dataBoundaries/options.js";
import type { DataBoundaryDefinition, DefaultName } from "../../models/models.js";

/** Interface representing a DataBoundaries operations. */
export interface DataBoundariesOperations {
  /** Opt-in tenant to data boundary. */
  put: (
    defaultParam: DefaultName,
    dataBoundaryDefinition: DataBoundaryDefinition,
    options?: DataBoundariesPutOptionalParams,
  ) => Promise<DataBoundaryDefinition>;
  /** Get data boundary of tenant. */
  getTenant: (
    defaultParam: DefaultName,
    options?: DataBoundariesGetTenantOptionalParams,
  ) => Promise<DataBoundaryDefinition>;
  /** Get data boundary at specified scope */
  getScope: (
    scope: string,
    defaultParam: DefaultName,
    options?: DataBoundariesGetScopeOptionalParams,
  ) => Promise<DataBoundaryDefinition>;
}

function _getDataBoundaries(context: DataboundariesManegementContext) {
  return {
    put: (
      defaultParam: DefaultName,
      dataBoundaryDefinition: DataBoundaryDefinition,
      options?: DataBoundariesPutOptionalParams,
    ) => put(context, defaultParam, dataBoundaryDefinition, options),
    getTenant: (defaultParam: DefaultName, options?: DataBoundariesGetTenantOptionalParams) =>
      getTenant(context, defaultParam, options),
    getScope: (
      scope: string,
      defaultParam: DefaultName,
      options?: DataBoundariesGetScopeOptionalParams,
    ) => getScope(context, scope, defaultParam, options),
  };
}

export function _getDataBoundariesOperations(
  context: DataboundariesManegementContext,
): DataBoundariesOperations {
  return {
    ..._getDataBoundaries(context),
  };
}
