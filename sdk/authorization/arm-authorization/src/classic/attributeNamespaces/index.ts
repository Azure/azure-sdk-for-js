// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { create, $delete, get } from "../../api/attributeNamespaces/operations.js";
import type {
  AttributeNamespacesCreateOptionalParams,
  AttributeNamespacesDeleteOptionalParams,
  AttributeNamespacesGetOptionalParams,
} from "../../api/attributeNamespaces/options.js";
import type {
  AttributeNamespace,
  AttributeNamespaceCreateRequest,
} from "../../models/microsoft/accessReview/models.js";

/** Interface representing a AttributeNamespaces operations. */
export interface AttributeNamespacesOperations {
  /** Creates a new attribute namespace. */
  create: (
    attributeNamespace: string,
    parameters: AttributeNamespaceCreateRequest,
    options?: AttributeNamespacesCreateOptionalParams,
  ) => Promise<AttributeNamespace>;
  /** Deletes the specified attribute namespace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
