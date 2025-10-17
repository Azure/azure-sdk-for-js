// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext } from "../../api/missionContext.js";
import {
  notifyInitiator,
  $delete,
  update,
  listByParent,
  createOrUpdate,
  get,
} from "../../api/approval/operations.js";
import type {
  ApprovalNotifyInitiatorOptionalParams,
  ApprovalDeleteOptionalParams,
  ApprovalUpdateOptionalParams,
  ApprovalListByParentOptionalParams,
  ApprovalCreateOrUpdateOptionalParams,
  ApprovalGetOptionalParams,
} from "../../api/approval/options.js";
import type {
  ApprovalActionResponse,
  ApprovalResource,
  ApprovalPatchModel,
  ApprovalActionRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Approval operations. */
export interface ApprovalOperations {
  /** Upon receiving approval or rejection from approver, this facilitates actions on approval resource */
  notifyInitiator: (
    resourceUri: string,
    approvalName: string,
    body: ApprovalActionRequest,
    options?: ApprovalNotifyInitiatorOptionalParams,
  ) => PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
  /** Delete a ApprovalResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    approvalName: string,
    options?: ApprovalDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ApprovalResource */
  update: (
    resourceUri: string,
    approvalName: string,
    properties: ApprovalPatchModel,
    options?: ApprovalUpdateOptionalParams,
  ) => PollerLike<OperationState<ApprovalResource>, ApprovalResource>;
  /** List ApprovalResource resources by parent */
  listByParent: (
    resourceUri: string,
    options?: ApprovalListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ApprovalResource>;
  /** Create a ApprovalResource */
  createOrUpdate: (
    resourceUri: string,
    approvalName: string,
    resource: ApprovalResource,
    options?: ApprovalCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApprovalResource>, ApprovalResource>;
  /** Get a ApprovalResource */
  get: (
    resourceUri: string,
    approvalName: string,
    options?: ApprovalGetOptionalParams,
  ) => Promise<ApprovalResource>;
}

function _getApproval(context: MissionContext) {
  return {
    notifyInitiator: (
      resourceUri: string,
      approvalName: string,
      body: ApprovalActionRequest,
      options?: ApprovalNotifyInitiatorOptionalParams,
    ) => notifyInitiator(context, resourceUri, approvalName, body, options),
    delete: (resourceUri: string, approvalName: string, options?: ApprovalDeleteOptionalParams) =>
      $delete(context, resourceUri, approvalName, options),
    update: (
      resourceUri: string,
      approvalName: string,
      properties: ApprovalPatchModel,
      options?: ApprovalUpdateOptionalParams,
    ) => update(context, resourceUri, approvalName, properties, options),
    listByParent: (resourceUri: string, options?: ApprovalListByParentOptionalParams) =>
      listByParent(context, resourceUri, options),
    createOrUpdate: (
      resourceUri: string,
      approvalName: string,
      resource: ApprovalResource,
      options?: ApprovalCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, approvalName, resource, options),
    get: (resourceUri: string, approvalName: string, options?: ApprovalGetOptionalParams) =>
      get(context, resourceUri, approvalName, options),
  };
}

export function _getApprovalOperations(context: MissionContext): ApprovalOperations {
  return {
    ..._getApproval(context),
  };
}
