// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelationshipsContext } from "../../api/relationshipsContext.js";
import {
  listByParent,
  $delete,
  get,
  createOrUpdate,
} from "../../api/dependencyOfRelationships/operations.js";
import type {
  DependencyOfRelationshipsListByParentOptionalParams,
  DependencyOfRelationshipsDeleteOptionalParams,
  DependencyOfRelationshipsGetOptionalParams,
  DependencyOfRelationshipsCreateOrUpdateOptionalParams,
} from "../../api/dependencyOfRelationships/options.js";
import type {
  DependencyOfRelationshipCreateOrUpdate,
  DependencyOfRelationship,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DependencyOfRelationships operations. */
export interface DependencyOfRelationshipsOperations {
  /** List DependencyOfRelationship resources by parent */
  listByParent: (
    resourceUri: string,
    options?: DependencyOfRelationshipsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<DependencyOfRelationship>;
  /** Delete a DependencyOfRelationship */
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
    listByParent: (
      resourceUri: string,
      options?: DependencyOfRelationshipsListByParentOptionalParams,
    ) => listByParent(context, resourceUri, options),
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
