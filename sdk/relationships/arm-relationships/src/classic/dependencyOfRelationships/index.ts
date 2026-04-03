// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelationshipsContext } from "../../api/relationshipsContext.js";
import { $delete, get, createOrUpdate } from "../../api/dependencyOfRelationships/operations.js";
import type {
  DependencyOfRelationshipsDeleteOptionalParams,
  DependencyOfRelationshipsGetOptionalParams,
  DependencyOfRelationshipsCreateOrUpdateOptionalParams,
} from "../../api/dependencyOfRelationships/options.js";
import type {
  DependencyOfRelationshipCreateOrUpdate,
  DependencyOfRelationship,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DependencyOfRelationships operations. */
export interface DependencyOfRelationshipsOperations {
  /** Delete a DependencyOfRelationship */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    name: string,
    options?: DependencyOfRelationshipsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a DependencyOfRelationship */
  get: (
    resourceUri: string,
    name: string,
    options?: DependencyOfRelationshipsGetOptionalParams,
  ) => Promise<DependencyOfRelationship>;
  /** Create a DependencyOfRelationship */
  createOrUpdate: (
    resourceUri: string,
    name: string,
    resource: DependencyOfRelationshipCreateOrUpdate,
    options?: DependencyOfRelationshipsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DependencyOfRelationship>, DependencyOfRelationship>;
}

function _getDependencyOfRelationships(context: RelationshipsContext) {
  return {
    delete: (
      resourceUri: string,
      name: string,
      options?: DependencyOfRelationshipsDeleteOptionalParams,
    ) => $delete(context, resourceUri, name, options),
    get: (
      resourceUri: string,
      name: string,
      options?: DependencyOfRelationshipsGetOptionalParams,
    ) => get(context, resourceUri, name, options),
    createOrUpdate: (
      resourceUri: string,
      name: string,
      resource: DependencyOfRelationshipCreateOrUpdate,
      options?: DependencyOfRelationshipsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, name, resource, options),
  };
}

export function _getDependencyOfRelationshipsOperations(
  context: RelationshipsContext,
): DependencyOfRelationshipsOperations {
  return {
    ..._getDependencyOfRelationships(context),
  };
}
