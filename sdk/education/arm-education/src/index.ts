// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EducationManagementClient } from "./educationManagementClient.js";
export type {
  RedeemRequest,
  ErrorResponseBody,
  ErrorResponse,
  OperationListResult,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  GrantDetails,
  GrantDetailProperties,
  Amount,
  GrantType,
  GrantStatus,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  LabDetails,
  LabProperties,
  LabStatus,
  InviteCodeGenerateRequest,
  JoinRequestDetails,
  JoinRequestProperties,
  JoinRequestStatus,
  StudentDetails,
  StudentProperties,
  StudentRole,
  StudentLabStatus,
  StudentLabDetails,
  StudentLabProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownGrantType,
  KnownGrantStatus,
  KnownCreatedByType,
  KnownLabStatus,
  KnownJoinRequestStatus,
  KnownStudentRole,
  KnownStudentLabStatus,
  KnownVersions,
} from "./models/index.js";
export type {
  EducationManagementClientOptionalParams,
  RedeemInvitationCodeOptionalParams,
} from "./api/index.js";
export type {
  GrantsListAllOptionalParams,
  GrantsListOptionalParams,
  GrantsGetOptionalParams,
} from "./api/grants/index.js";
export type {
  JoinRequestsDenyOptionalParams,
  JoinRequestsApproveOptionalParams,
  JoinRequestsListOptionalParams,
  JoinRequestsGetOptionalParams,
} from "./api/joinRequests/index.js";
export type {
  LabsGenerateInviteCodeOptionalParams,
  LabsListAllOptionalParams,
  LabsListOptionalParams,
  LabsDeleteOptionalParams,
  LabsCreateOrUpdateOptionalParams,
  LabsGetOptionalParams,
} from "./api/labs/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  StudentLabsListAllOptionalParams,
  StudentLabsGetOptionalParams,
} from "./api/studentLabs/index.js";
export type {
  StudentsListOptionalParams,
  StudentsDeleteOptionalParams,
  StudentsCreateOrUpdateOptionalParams,
  StudentsGetOptionalParams,
} from "./api/students/index.js";
export type {
  GrantsOperations,
  JoinRequestsOperations,
  LabsOperations,
  OperationsOperations,
  StudentLabsOperations,
  StudentsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
