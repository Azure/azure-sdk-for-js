// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { create, $delete, get } from "../../api/attributeNamespaces/operations.js";
import {
  AttributeNamespacesCreateOptionalParams,
  AttributeNamespacesDeleteOptionalParams,
  AttributeNamespacesGetOptionalParams,
} from "../../api/attributeNamespaces/options.js";
import {
  AttributeNamespace,
  AttributeNamespaceCreateRequest,
} from "../../models/microsoft/attributeNamespaces/models.js";

/** Interface representing a AttributeNamespaces operations. */
export interface AttributeNamespacesOperations {
  /** Creates a new attribute namespace. */
  create: (
    attributeNamespace: string,
    parameters: AttributeNamespaceCreateRequest,
    options?: AttributeNamespacesCreateOptionalParams,
  ) => Promise<AttributeNamespace>;
  /** Deletes the specified attribute namespace. */
  delete: (
    attributeNamespace: string,
    options?: AttributeNamespacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets the specified attribute namespace. */
  get: (
    attributeNamespace: string,
    options?: AttributeNamespacesGetOptionalParams,
  ) => Promise<AttributeNamespace>;
}

function _getAttributeNamespaces(context: AuthorizationManagementContext) {
  return {
    create: (
      attributeNamespace: string,
      parameters: AttributeNamespaceCreateRequest,
      options?: AttributeNamespacesCreateOptionalParams,
    ) => create(context, attributeNamespace, parameters, options),
    delete: (attributeNamespace: string, options?: AttributeNamespacesDeleteOptionalParams) =>
      $delete(context, attributeNamespace, options),
    get: (attributeNamespace: string, options?: AttributeNamespacesGetOptionalParams) =>
      get(context, attributeNamespace, options),
  };
}

export function _getAttributeNamespacesOperations(
  context: AuthorizationManagementContext,
): AttributeNamespacesOperations {
  return {
    ..._getAttributeNamespaces(context),
  };
}
