// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type {
  ConstitutionOutput,
  ConfidentialLedgerErrorOutput,
  ConsortiumOutput,
  ConfidentialLedgerEnclavesOutput,
  PagedCollectionsOutput,
  PagedTagsOutput,
  PagedLedgerEntriesOutput,
  LedgerWriteResultOutput,
  LedgerQueryResultOutput,
  TransactionReceiptOutput,
  TransactionStatusOutput,
  LedgerEntryOutput,
  PagedUsersOutput,
  PagedLedgerUsersOutput,
  LedgerUserOutput,
  LedgerUserMultipleRolesOutput,
  BundleOutput,
  JsRuntimeOptionsOutput,
  ModuleDefOutput,
  PagedUserDefinedFunctionsOutput,
  UserDefinedFunctionOutput,
  UserDefinedFunctionExecutionResponseOutput,
<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/responses.ts
  UserDefinedRoleOutput,
  UserDefinedRolesOutput,
} from "./outputModels.js";
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/responses.ts
  RoleOutput,
} from "./outputModels";
=======
  RoleOutput,
} from "./outputModels.js";
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/responses.ts

/** The request has succeeded. */
export interface GetConstitution200Response extends HttpResponse {
  status: "200";
  body: ConstitutionOutput;
}

export interface GetConstitutionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface ListConsortiumMembers200Response extends HttpResponse {
  status: "200";
  body: ConsortiumOutput;
}

export interface ListConsortiumMembersDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetEnclaveQuotes200Response extends HttpResponse {
  status: "200";
  body: ConfidentialLedgerEnclavesOutput;
}

export interface GetEnclaveQuotesDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface ListCollections200Response extends HttpResponse {
  status: "200";
  body: PagedCollectionsOutput;
}

export interface ListCollectionsDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface ListTags200Response extends HttpResponse {
  status: "200";
  body: PagedTagsOutput;
}

export interface ListTagsDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface ListLedgerEntries200Response extends HttpResponse {
  status: "200";
  body: PagedLedgerEntriesOutput;
}

export interface ListLedgerEntriesDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

export interface CreateLedgerEntry200Headers {
  /** The transaction id at which this write will become durable. */
  "x-ms-ccf-transaction-id": string;
}

/** The request has succeeded. */
export interface CreateLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerWriteResultOutput;
  headers: RawHttpHeaders & CreateLedgerEntry200Headers;
}

export interface CreateLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerQueryResultOutput;
}

export interface GetLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetReceipt200Response extends HttpResponse {
  status: "200";
  body: TransactionReceiptOutput;
}

export interface GetReceiptDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetTransactionStatus200Response extends HttpResponse {
  status: "200";
  body: TransactionStatusOutput;
}

export interface GetTransactionStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetCurrentLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerEntryOutput;
}

export interface GetCurrentLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface ListUsers200Response extends HttpResponse {
  status: "200";
  body: PagedUsersOutput;
}

export interface ListUsersDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface ListLedgerUsers200Response extends HttpResponse {
  status: "200";
  body: PagedLedgerUsersOutput;
}

export interface ListLedgerUsersDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteUser204Response extends HttpResponse {
  status: "204";
}

export interface DeleteUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

export interface GetUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface CreateOrUpdateUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

export interface CreateOrUpdateUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteLedgerUser204Response extends HttpResponse {
  status: "204";
}

export interface DeleteLedgerUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetLedgerUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserMultipleRolesOutput;
}

export interface GetLedgerUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface CreateOrUpdateLedgerUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserMultipleRolesOutput;
}

export interface CreateOrUpdateLedgerUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetUserDefinedEndpoint200Response extends HttpResponse {
  status: "200";
  body: BundleOutput;
}

export interface GetUserDefinedEndpointDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateUserDefinedEndpoint201Response extends HttpResponse {
  status: "201";
}

export interface CreateUserDefinedEndpointDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetRuntimeOptions200Response extends HttpResponse {
  status: "200";
  body: JsRuntimeOptionsOutput;
}

export interface GetRuntimeOptionsDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface UpdateRuntimeOptionsStable200Response extends HttpResponse {
  status: "200";
  body: JsRuntimeOptionsOutput;
}

export interface UpdateRuntimeOptionsStableDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetUserDefinedEndpointsModule200Response extends HttpResponse {
  status: "200";
  body: ModuleDefOutput;
}

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/responses.ts
export interface GetUserDefinedEndpointsModuleDefaultResponse extends HttpResponse {
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/responses.ts
/** It gets the module for the user defined endpoint. */
export interface GetUserDefinedEndpointsModuleDefaultResponse
  extends HttpResponse {
=======
/** It gets the module for the user defined endpoint. */
export interface GetUserDefinedEndpointsModuleDefaultResponse extends HttpResponse {
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/responses.ts
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface ListUserDefinedFunctions200Response extends HttpResponse {
  status: "200";
  body: PagedUserDefinedFunctionsOutput;
}

export interface ListUserDefinedFunctionsDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteUserDefinedFunction204Response extends HttpResponse {
  status: "204";
}

export interface DeleteUserDefinedFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetUserDefinedFunction200Response extends HttpResponse {
  status: "200";
  body: UserDefinedFunctionOutput;
}

export interface GetUserDefinedFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

export interface CreateUserDefinedFunction200Headers {
  /** The transaction id at which this write will become durable. */
  "x-ms-ccf-transaction-id": string;
}

/** The request has succeeded. */
export interface CreateUserDefinedFunction200Response extends HttpResponse {
  status: "200";
  body: UserDefinedFunctionOutput;
  headers: RawHttpHeaders & CreateUserDefinedFunction200Headers;
}

export interface CreateUserDefinedFunction201Headers {
  /** The transaction id at which this write will become durable. */
  "x-ms-ccf-transaction-id": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateUserDefinedFunction201Response extends HttpResponse {
  status: "201";
  body: UserDefinedFunctionOutput;
  headers: RawHttpHeaders & CreateUserDefinedFunction201Headers;
}

export interface CreateUserDefinedFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface ExecuteUserDefinedFunction200Response extends HttpResponse {
  status: "200";
  body: UserDefinedFunctionExecutionResponseOutput;
}

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/result/src/responses.ts
export interface ExecuteUserDefinedFunctionDefaultResponse extends HttpResponse {
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/base/sdk/confidentialledger/confidential-ledger-rest/generated/responses.ts
/** Executes the user defined function in the Confidential Ledger */
export interface ExecuteUserDefinedFunctionDefaultResponse
  extends HttpResponse {
=======
/** Executes the user defined function in the Confidential Ledger */
export interface ExecuteUserDefinedFunctionDefaultResponse extends HttpResponse {
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolqaGSaM/custom/sdk/confidentialledger/confidential-ledger-rest/src/responses.ts
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface GetUserDefinedRole200Response extends HttpResponse {
  status: "200";
  body: UserDefinedRoleOutput;
}

export interface GetUserDefinedRoleDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface CreateUserDefinedRoleStable200Response extends HttpResponse {
  status: "200";
  body: UserDefinedRolesOutput;
}

export interface CreateUserDefinedRoleStableDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** The request has succeeded. */
export interface UpdateUserDefinedRoleStable200Response extends HttpResponse {
  status: "200";
  body: UserDefinedRolesOutput;
}

export interface UpdateUserDefinedRoleStableDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteUserDefinedRoleStable204Response extends HttpResponse {
  status: "204";
}

export interface DeleteUserDefinedRoleStableDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}
