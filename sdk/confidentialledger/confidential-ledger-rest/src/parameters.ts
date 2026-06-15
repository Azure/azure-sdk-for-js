// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type {
  LedgerEntry,
  LedgerUser,
  LedgerUserMultipleRoles,
  Bundle,
  JsRuntimeOptions,
  UserDefinedFunction,
  UserDefinedFunctionExecutionProperties,
<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/parameters.ts
  UserDefinedRoles,
} from "./models.js";
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/parameters.ts
  Role,
} from "./models";
=======
  Role,
} from "./models.js";
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/parameters.ts

export type GetConstitutionParameters = RequestParameters;
export type ListConsortiumMembersParameters = RequestParameters;
export type GetEnclaveQuotesParameters = RequestParameters;
export type ListCollectionsParameters = RequestParameters;

export interface ListTagsQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface ListTagsQueryParam {
  queryParameters?: ListTagsQueryParamProperties;
}

export type ListTagsParameters = ListTagsQueryParam & RequestParameters;

export interface ListLedgerEntriesQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
  /** Specify the first transaction ID in a range. */
  fromTransactionId?: string;
  /** Specify the last transaction ID in a range. */
  toTransactionId?: string;
  /** Single tag. */
  tag?: string;
}

export interface ListLedgerEntriesQueryParam {
  queryParameters?: ListLedgerEntriesQueryParamProperties;
}

export type ListLedgerEntriesParameters = ListLedgerEntriesQueryParam & RequestParameters;

export interface CreateLedgerEntryBodyParam {
  /** Ledger entry. */
  body: LedgerEntry;
}

export interface CreateLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
  /** Comma separated tags. */
  tags?: string;
}

export interface CreateLedgerEntryQueryParam {
  queryParameters?: CreateLedgerEntryQueryParamProperties;
}

export type CreateLedgerEntryParameters = CreateLedgerEntryQueryParam &
  CreateLedgerEntryBodyParam &
  RequestParameters;

export interface GetLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface GetLedgerEntryQueryParam {
  queryParameters?: GetLedgerEntryQueryParamProperties;
}

export type GetLedgerEntryParameters = GetLedgerEntryQueryParam & RequestParameters;
export type GetReceiptParameters = RequestParameters;
export type GetTransactionStatusParameters = RequestParameters;

export interface GetCurrentLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface GetCurrentLedgerEntryQueryParam {
  queryParameters?: GetCurrentLedgerEntryQueryParamProperties;
}

export type GetCurrentLedgerEntryParameters = GetCurrentLedgerEntryQueryParam & RequestParameters;
export type ListUsersParameters = RequestParameters;
export type ListLedgerUsersParameters = RequestParameters;
export type DeleteUserParameters = RequestParameters;
export type GetUserParameters = RequestParameters;
/** Details about a Confidential Ledger user. */
export type LedgerUserResourceMergeAndPatch = Partial<LedgerUser>;

export interface CreateOrUpdateUserBodyParam {
  /** Details about a Confidential Ledger user. */
  body: LedgerUserResourceMergeAndPatch;
}

export interface CreateOrUpdateUserMediaTypesParam {
  /** application/merge-patch+json content-type */
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateUserParameters = CreateOrUpdateUserMediaTypesParam &
  CreateOrUpdateUserBodyParam &
  RequestParameters;
export type DeleteLedgerUserParameters = RequestParameters;
export type GetLedgerUserParameters = RequestParameters;
/** Details about a Confidential Ledger user with multiple roles. */
export type LedgerUserMultipleRolesResourceMergeAndPatch = Partial<LedgerUserMultipleRoles>;

export interface CreateOrUpdateLedgerUserBodyParam {
  /** Details about a Confidential Ledger user with multiple roles. */
  body: LedgerUserMultipleRolesResourceMergeAndPatch;
}

export interface CreateOrUpdateLedgerUserMediaTypesParam {
  /** application/merge-patch+json content-type */
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateLedgerUserParameters = CreateOrUpdateLedgerUserMediaTypesParam &
  CreateOrUpdateLedgerUserBodyParam &
  RequestParameters;
export type GetUserDefinedEndpointParameters = RequestParameters;

export interface CreateUserDefinedEndpointBodyParam {
  /** Specify a user defined endpoint. */
  body: Bundle;
}

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/parameters.ts
export type CreateUserDefinedEndpointParameters = CreateUserDefinedEndpointBodyParam &
  RequestParameters;
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/parameters.ts
export interface CreateUserDefinedEndpointMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateUserDefinedEndpointParameters =
  CreateUserDefinedEndpointMediaTypesParam &
    CreateUserDefinedEndpointBodyParam &
    RequestParameters;
=======
export interface CreateUserDefinedEndpointMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateUserDefinedEndpointParameters = CreateUserDefinedEndpointMediaTypesParam &
  CreateUserDefinedEndpointBodyParam &
  RequestParameters;
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/parameters.ts
export type GetRuntimeOptionsParameters = RequestParameters;
/** JS Runtime options */
export type JsRuntimeOptionsResourceMergeAndPatch = Partial<JsRuntimeOptions>;

export interface UpdateRuntimeOptionsStableBodyParam {
  /** JS Runtime options */
  body: JsRuntimeOptionsResourceMergeAndPatch;
}

export interface UpdateRuntimeOptionsStableMediaTypesParam {
  /** Content type */
  contentType: "application/merge-patch+json";
}

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/parameters.ts
export type UpdateRuntimeOptionsStableParameters = UpdateRuntimeOptionsStableMediaTypesParam &
  UpdateRuntimeOptionsStableBodyParam &
  RequestParameters;
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/parameters.ts
export type UpdateRuntimeOptionsParameters =
  UpdateRuntimeOptionsMediaTypesParam &
    UpdateRuntimeOptionsBodyParam &
    RequestParameters;
=======
export type UpdateRuntimeOptionsParameters = UpdateRuntimeOptionsMediaTypesParam &
  UpdateRuntimeOptionsBodyParam &
  RequestParameters;
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/parameters.ts

export interface GetUserDefinedEndpointsModuleQueryParamProperties {
  /** module name of the user defined endpoint */
  module_name: string;
}

export interface GetUserDefinedEndpointsModuleQueryParam {
  queryParameters: GetUserDefinedEndpointsModuleQueryParamProperties;
}

export type GetUserDefinedEndpointsModuleParameters = GetUserDefinedEndpointsModuleQueryParam &
  RequestParameters;
export type ListUserDefinedFunctionsParameters = RequestParameters;
export type DeleteUserDefinedFunctionParameters = RequestParameters;
export type GetUserDefinedFunctionParameters = RequestParameters;

export interface CreateUserDefinedFunctionBodyParam {
  /** Specify a user defined function of a Confidential Ledger. */
  body: UserDefinedFunction;
}

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/parameters.ts
export type CreateUserDefinedFunctionParameters = CreateUserDefinedFunctionBodyParam &
  RequestParameters;
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/parameters.ts
export interface CreateUserDefinedFunctionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateUserDefinedFunctionParameters =
  CreateUserDefinedFunctionMediaTypesParam &
    CreateUserDefinedFunctionBodyParam &
    RequestParameters;
=======
export interface CreateUserDefinedFunctionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateUserDefinedFunctionParameters = CreateUserDefinedFunctionMediaTypesParam &
  CreateUserDefinedFunctionBodyParam &
  RequestParameters;
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/parameters.ts

export interface ExecuteUserDefinedFunctionBodyParam {
  /** Specify user defined function execution properties. */
  body?: UserDefinedFunctionExecutionProperties;
}

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/parameters.ts
export type ExecuteUserDefinedFunctionParameters = ExecuteUserDefinedFunctionBodyParam &
  RequestParameters;
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/parameters.ts
export interface ExecuteUserDefinedFunctionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExecuteUserDefinedFunctionParameters =
  ExecuteUserDefinedFunctionMediaTypesParam &
    ExecuteUserDefinedFunctionBodyParam &
    RequestParameters;
=======
export interface ExecuteUserDefinedFunctionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExecuteUserDefinedFunctionParameters = ExecuteUserDefinedFunctionMediaTypesParam &
  ExecuteUserDefinedFunctionBodyParam &
  RequestParameters;
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/parameters.ts

export interface GetUserDefinedRoleQueryParamProperties {
  /** user defined role name */
  roleName: string;
}

export interface GetUserDefinedRoleQueryParam {
  queryParameters: GetUserDefinedRoleQueryParamProperties;
}

export type GetUserDefinedRoleParameters = GetUserDefinedRoleQueryParam & RequestParameters;

export interface CreateUserDefinedRoleStableBodyParam {
  /** Request body */
  body: UserDefinedRoles;
}

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/parameters.ts
export type CreateUserDefinedRoleStableParameters = CreateUserDefinedRoleStableBodyParam &
  RequestParameters;
/** Request body */
export type UserDefinedRolesResourceMergeAndPatch = Partial<UserDefinedRoles>;
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/parameters.ts
export interface CreateUserDefinedRoleMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateUserDefinedRoleParameters =
  CreateUserDefinedRoleMediaTypesParam &
    CreateUserDefinedRoleBodyParam &
    RequestParameters;
=======
export interface CreateUserDefinedRoleMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateUserDefinedRoleParameters = CreateUserDefinedRoleMediaTypesParam &
  CreateUserDefinedRoleBodyParam &
  RequestParameters;
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/parameters.ts

export interface UpdateUserDefinedRoleStableBodyParam {
  /** Request body */
  body: UserDefinedRolesResourceMergeAndPatch;
}

export interface UpdateUserDefinedRoleStableMediaTypesParam {
  /** Content type */
  contentType: "application/merge-patch+json";
}

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/parameters.ts
export type UpdateUserDefinedRoleStableParameters = UpdateUserDefinedRoleStableMediaTypesParam &
  UpdateUserDefinedRoleStableBodyParam &
  RequestParameters;
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/parameters.ts
export type UpdateUserDefinedRoleParameters =
  UpdateUserDefinedRoleMediaTypesParam &
    UpdateUserDefinedRoleBodyParam &
    RequestParameters;
=======
export type UpdateUserDefinedRoleParameters = UpdateUserDefinedRoleMediaTypesParam &
  UpdateUserDefinedRoleBodyParam &
  RequestParameters;
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/parameters.ts

export interface DeleteUserDefinedRoleStableQueryParamProperties {
  /** user defined role name */
  roleName: string;
}

export interface DeleteUserDefinedRoleStableQueryParam {
  queryParameters: DeleteUserDefinedRoleStableQueryParamProperties;
}

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/parameters.ts
export type DeleteUserDefinedRoleStableParameters = DeleteUserDefinedRoleStableQueryParam &
  RequestParameters;
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/parameters.ts
export type DeleteUserDefinedRoleParameters = DeleteUserDefinedRoleQueryParam &
  RequestParameters;
=======
export type DeleteUserDefinedRoleParameters = DeleteUserDefinedRoleQueryParam & RequestParameters;
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/parameters.ts
