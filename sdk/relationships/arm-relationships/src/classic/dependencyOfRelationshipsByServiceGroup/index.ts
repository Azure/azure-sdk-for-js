// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelationshipsContext } from "../../api/relationshipsContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dependencyOfRelationshipsByServiceGroup/operations.js";
import type {
  DependencyOfRelationshipsByServiceGroupListOptionalParams,
  DependencyOfRelationshipsByServiceGroupDeleteOptionalParams,
  DependencyOfRelationshipsByServiceGroupCreateOrUpdateOptionalParams,
  DependencyOfRelationshipsByServiceGroupGetOptionalParams,
} from "../../api/dependencyOfRelationshipsByServiceGroup/options.js";
import type { DependencyOfRelationship } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DependencyOfRelationshipsByServiceGroup operations. */
export interface DependencyOfRelationshipsByServiceGroupOperations {
  /** List DependencyOfRelationship resources by scope */
  list: (
    serviceGroupName: string,
    options?: DependencyOfRelationshipsByServiceGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<DependencyOfRelationship>;
  /** Delete a DependencyOfRelationship */
  delete: (
    serviceGroupName: string,
    name: string,
    options?: DependencyOfRelationshipsByServiceGroupDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a DependencyOfRelationship */
  createOrUpdate: (
    serviceGroupName: string,
    name: string,
    resource: DependencyOfRelationship,
    options?: DependencyOfRelationshipsByServiceGroupCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DependencyOfRelationship>, DependencyOfRelationship>;
  /** Get a DependencyOfRelationship */
  get: (
    serviceGroupName: string,
    name: string,
    options?: DependencyOfRelationshipsByServiceGroupGetOptionalParams,
  ) => Promise<DependencyOfRelationship>;
}
function _getDependencyOfRelationshipsByServiceGroup(context: RelationshipsContext) {
  return {
    list: (
      serviceGroupName: string,
      options?: DependencyOfRelationshipsByServiceGroupListOptionalParams,
    ) => list(context, serviceGroupName, options),
    delete: (
      serviceGroupName: string,
      name: string,
      options?: DependencyOfRelationshipsByServiceGroupDeleteOptionalParams,
    ) => $delete(context, serviceGroupName, name, options),
    createOrUpdate: (
      serviceGroupName: string,
      name: string,
      resource: DependencyOfRelationship,
      options?: DependencyOfRelationshipsByServiceGroupCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, serviceGroupName, name, resource, options),
    get: (
      serviceGroupName: string,
      name: string,
      options?: DependencyOfRelationshipsByServiceGroupGetOptionalParams,
    ) => get(context, serviceGroupName, name, options),
  };
}
export function _getDependencyOfRelationshipsByServiceGroupOperations(
  context: RelationshipsContext,
): DependencyOfRelationshipsByServiceGroupOperations {
  return {
    ..._getDependencyOfRelationshipsByServiceGroup(context),
  };
}
