// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listFieldsByModuleAndType,
  listFieldsByType,
} from "../../api/objectDataTypes/operations.js";
import type {
  ObjectDataTypesListFieldsByModuleAndTypeOptionalParams,
  ObjectDataTypesListFieldsByTypeOptionalParams,
} from "../../api/objectDataTypes/options.js";
import type { TypeField } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ObjectDataTypes operations. */
export interface ObjectDataTypesOperations {
  /** Retrieve a list of fields of a given type identified by module name. */
  listFieldsByModuleAndType: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    typeName: string,
    options?: ObjectDataTypesListFieldsByModuleAndTypeOptionalParams,
  ) => PagedAsyncIterableIterator<TypeField>;
  /** Retrieve a list of fields of a given type across all accessible modules. */
  listFieldsByType: (
    resourceGroupName: string,
    automationAccountName: string,
    typeName: string,
    options?: ObjectDataTypesListFieldsByTypeOptionalParams,
  ) => PagedAsyncIterableIterator<TypeField>;
}

function _getObjectDataTypes(context: AutomationContext) {
  return {
    listFieldsByModuleAndType: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      typeName: string,
      options?: ObjectDataTypesListFieldsByModuleAndTypeOptionalParams,
    ) =>
      listFieldsByModuleAndType(
        context,
        resourceGroupName,
        automationAccountName,
        moduleName,
        typeName,
        options,
      ),
    listFieldsByType: (
      resourceGroupName: string,
      automationAccountName: string,
      typeName: string,
      options?: ObjectDataTypesListFieldsByTypeOptionalParams,
    ) => listFieldsByType(context, resourceGroupName, automationAccountName, typeName, options),
  };
}

export function _getObjectDataTypesOperations(
  context: AutomationContext,
): ObjectDataTypesOperations {
  return {
    ..._getObjectDataTypes(context),
  };
}
