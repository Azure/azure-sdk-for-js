// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByType } from "../../api/fields/operations.js";
import type { FieldsListByTypeOptionalParams } from "../../api/fields/options.js";
import type { TypeField } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Fields operations. */
export interface FieldsOperations {
  /** Retrieve a list of fields of a given type identified by module name. */
  listByType: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    typeName: string,
    options?: FieldsListByTypeOptionalParams,
  ) => PagedAsyncIterableIterator<TypeField>;
}

function _getFields(context: AutomationContext) {
  return {
    listByType: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      typeName: string,
      options?: FieldsListByTypeOptionalParams,
    ) =>
      listByType(context, resourceGroupName, automationAccountName, moduleName, typeName, options),
  };
}

export function _getFieldsOperations(context: AutomationContext): FieldsOperations {
  return {
    ..._getFields(context),
  };
}
