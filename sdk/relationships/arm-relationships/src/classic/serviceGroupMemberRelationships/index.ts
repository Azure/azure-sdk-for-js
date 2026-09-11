// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelationshipsContext } from "../../api/relationshipsContext.js";
import {
  listByParent,
  $delete,
  get,
  createOrUpdate,
} from "../../api/serviceGroupMemberRelationships/operations.js";
import type {
  ServiceGroupMemberRelationshipsListByParentOptionalParams,
  ServiceGroupMemberRelationshipsDeleteOptionalParams,
  ServiceGroupMemberRelationshipsGetOptionalParams,
  ServiceGroupMemberRelationshipsCreateOrUpdateOptionalParams,
} from "../../api/serviceGroupMemberRelationships/options.js";
import type {
  ServiceGroupMemberRelationshipCreateOrUpdate,
  ServiceGroupMemberRelationship,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServiceGroupMemberRelationships operations. */
export interface ServiceGroupMemberRelationshipsOperations {
  /** List ServiceGroupMemberRelationship resources by parent */
  listByParent: (
    resourceUri: string,
    options?: ServiceGroupMemberRelationshipsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceGroupMemberRelationship>;
  /** Delete a ServiceGroupMemberRelationship */
  delete: (
    resourceUri: string,
    name: string,
    options?: ServiceGroupMemberRelationshipsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a ServiceGroupMemberRelationship */
  get: (
    resourceUri: string,
    name: string,
    options?: ServiceGroupMemberRelationshipsGetOptionalParams,
  ) => Promise<ServiceGroupMemberRelationship>;
  /** Create a ServiceGroupMemberRelationship */
  createOrUpdate: (
    resourceUri: string,
    name: string,
    resource: ServiceGroupMemberRelationshipCreateOrUpdate,
    options?: ServiceGroupMemberRelationshipsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServiceGroupMemberRelationship>, ServiceGroupMemberRelationship>;
}
function _getServiceGroupMemberRelationships(context: RelationshipsContext) {
  return {
    listByParent: (
      resourceUri: string,
      options?: ServiceGroupMemberRelationshipsListByParentOptionalParams,
    ) => listByParent(context, resourceUri, options),
    delete: (
      resourceUri: string,
      name: string,
      options?: ServiceGroupMemberRelationshipsDeleteOptionalParams,
    ) => $delete(context, resourceUri, name, options),
    get: (
      resourceUri: string,
      name: string,
      options?: ServiceGroupMemberRelationshipsGetOptionalParams,
    ) => get(context, resourceUri, name, options),
    createOrUpdate: (
      resourceUri: string,
      name: string,
      resource: ServiceGroupMemberRelationshipCreateOrUpdate,
      options?: ServiceGroupMemberRelationshipsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, name, resource, options),
  };
}
export function _getServiceGroupMemberRelationshipsOperations(
  context: RelationshipsContext,
): ServiceGroupMemberRelationshipsOperations {
  return {
    ..._getServiceGroupMemberRelationships(context),
  };
}
