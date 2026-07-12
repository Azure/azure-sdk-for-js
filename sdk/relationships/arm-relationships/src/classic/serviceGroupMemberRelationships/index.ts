// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelationshipsContext } from "../../api/relationshipsContext.js";
import {
  $delete,
  get,
  createOrUpdate,
} from "../../api/serviceGroupMemberRelationships/operations.js";
import type {
  ServiceGroupMemberRelationshipsDeleteOptionalParams,
  ServiceGroupMemberRelationshipsGetOptionalParams,
  ServiceGroupMemberRelationshipsCreateOrUpdateOptionalParams,
} from "../../api/serviceGroupMemberRelationships/options.js";
import type {
  ServiceGroupMemberRelationshipCreateOrUpdate,
  ServiceGroupMemberRelationship,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServiceGroupMemberRelationships operations. */
export interface ServiceGroupMemberRelationshipsOperations {
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
