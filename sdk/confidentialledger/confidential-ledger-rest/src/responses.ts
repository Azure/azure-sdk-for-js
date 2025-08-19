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
  JSRuntimeOptionsOutput,
  ModuleDefOutput,
  PagedUserDefinedFunctionsOutput,
  UserDefinedFunctionOutput,
  UserDefinedFunctionExecutionResponseOutput,
  RoleOutput,
} from "./outputModels.js";

/** The constitution is a script that assesses and applies proposals from consortium members. */
export interface GetConstitution200Response extends HttpResponse {
  status: "200";
  body: ConstitutionOutput;
}

/** The constitution is a script that assesses and applies proposals from consortium members. */
export interface GetConstitutionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Consortium members can manage the Confidential Ledger. */
export interface ListConsortiumMembers200Response extends HttpResponse {
  status: "200";
  body: ConsortiumOutput;
}

/** Consortium members can manage the Confidential Ledger. */
export interface ListConsortiumMembersDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
export interface GetEnclaveQuotes200Response extends HttpResponse {
  status: "200";
  body: ConfidentialLedgerEnclavesOutput;
}

/** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
export interface GetEnclaveQuotesDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Collection ids are user-created collections of ledger entries */
export interface ListCollections200Response extends HttpResponse {
  status: "200";
  body: PagedCollectionsOutput;
}

/** Collection ids are user-created collections of ledger entries */
export interface ListCollectionsDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A collection id may optionally be specified. Only entries in the specified (or default) collection will be returned. */
export interface ListLedgerEntries200Response extends HttpResponse {
  status: "200";
  body: PagedLedgerEntriesOutput;
}

/** A collection id may optionally be specified. Only entries in the specified (or default) collection will be returned. */
export interface ListLedgerEntriesDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

export interface CreateLedgerEntry200Headers {
  /** The transaction id at which this write will become durable. */
  "x-ms-ccf-transaction-id"?: string;
}

/** A collection id may optionally be specified. */
export interface CreateLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerWriteResultOutput;
  headers: RawHttpHeaders & CreateLedgerEntry200Headers;
}

/** A collection id may optionally be specified. */
export interface CreateLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** To return older ledger entries, the relevant sections of the ledger must be read from disk and validated. To prevent blocking within the enclave, the response will indicate whether the entry is ready and part of the response, or if the loading is still ongoing. */
export interface GetLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerQueryResultOutput;
}

/** To return older ledger entries, the relevant sections of the ledger must be read from disk and validated. To prevent blocking within the enclave, the response will indicate whether the entry is ready and part of the response, or if the loading is still ongoing. */
export interface GetLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Gets a receipt certifying ledger contents at a particular transaction id. */
export interface GetReceipt200Response extends HttpResponse {
  status: "200";
  body: TransactionReceiptOutput;
}

/** Gets a receipt certifying ledger contents at a particular transaction id. */
export interface GetReceiptDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Gets the status of an entry identified by a transaction id. */
export interface GetTransactionStatus200Response extends HttpResponse {
  status: "200";
  body: TransactionStatusOutput;
}

/** Gets the status of an entry identified by a transaction id. */
export interface GetTransactionStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A collection id may optionally be specified. */
export interface GetCurrentLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerEntryOutput;
}

/** A collection id may optionally be specified. */
export interface GetCurrentLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** All users' object IDs and single role per user will be returned. */
export interface ListUsers200Response extends HttpResponse {
  status: "200";
  body: PagedUsersOutput;
}

/** All users' object IDs and single role per user will be returned. */
export interface ListUsersDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** All users' object IDs and multiple roles will be returned. */
export interface ListLedgerUsers200Response extends HttpResponse {
  status: "200";
  body: PagedLedgerUsersOutput;
}

/** All users' object IDs and multiple roles will be returned. */
export interface ListLedgerUsersDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Deletes a user from the Confidential Ledger. */
export interface DeleteUser204Response extends HttpResponse {
  status: "204";
}

/** Deletes a user from the Confidential Ledger. */
export interface DeleteUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Gets a user. */
export interface GetUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

/** Gets a user. */
export interface GetUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A JSON merge patch is applied for existing users */
export interface CreateOrUpdateUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

/** A JSON merge patch is applied for existing users */
export interface CreateOrUpdateUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Deletes a user with multiple roles from the Confidential Ledger. */
export interface DeleteLedgerUser204Response extends HttpResponse {
  status: "204";
}

/** Deletes a user with multiple roles from the Confidential Ledger. */
export interface DeleteLedgerUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Gets a user with multiple roles. */
export interface GetLedgerUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserMultipleRolesOutput;
}

/** Gets a user with multiple roles. */
export interface GetLedgerUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A JSON merge patch is applied for existing users */
export interface CreateOrUpdateLedgerUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserMultipleRolesOutput;
}

/** A JSON merge patch is applied for existing users */
export interface CreateOrUpdateLedgerUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Returns the user defined endpoint in the ACL instance */
export interface GetUserDefinedEndpoint200Response extends HttpResponse {
  status: "200";
  body: BundleOutput;
}

/** Returns the user defined endpoint in the ACL instance */
export interface GetUserDefinedEndpointDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Creates the user defined endpoint in the ACL instance */
export interface CreateUserDefinedEndpoint201Response extends HttpResponse {
  status: "201";
}

/** Creates the user defined endpoint in the ACL instance */
export interface CreateUserDefinedEndpointDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** It returns the runtime options */
export interface GetRuntimeOptions200Response extends HttpResponse {
  status: "200";
  body: JSRuntimeOptionsOutput;
}

/** It returns the runtime options */
export interface GetRuntimeOptionsDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Updates the runtime options. */
export interface UpdateRuntimeOptions200Response extends HttpResponse {
  status: "200";
  body: JSRuntimeOptionsOutput;
}

/** Updates the runtime options. */
export interface UpdateRuntimeOptionsDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** It gets the module for the user defined endpoint. */
export interface GetUserDefinedEndpointsModule200Response extends HttpResponse {
  status: "200";
  body: ModuleDefOutput;
}

/** It gets the module for the user defined endpoint. */
export interface GetUserDefinedEndpointsModuleDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** User defined functions stored in the Confidential Ledger */
export interface ListUserDefinedFunctions200Response extends HttpResponse {
  status: "200";
  body: PagedUserDefinedFunctionsOutput;
}

/** User defined functions stored in the Confidential Ledger */
export interface ListUserDefinedFunctionsDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Deletes a user defined function from the Confidential Ledger. */
export interface DeleteUserDefinedFunction204Response extends HttpResponse {
  status: "204";
}

/** Deletes a user defined function from the Confidential Ledger. */
export interface DeleteUserDefinedFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Returns the user defined function in the Confidential Ledger */
export interface GetUserDefinedFunction200Response extends HttpResponse {
  status: "200";
  body: UserDefinedFunctionOutput;
}

/** Returns the user defined function in the Confidential Ledger */
export interface GetUserDefinedFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

export interface CreateUserDefinedFunction200Headers {
  /** The transaction id at which this write will become durable. */
  "x-ms-ccf-transaction-id"?: string;
}

/** Creates the user defined function in the Confidential Ledger */
export interface CreateUserDefinedFunction200Response extends HttpResponse {
  status: "200";
  body: UserDefinedFunctionOutput;
  headers: RawHttpHeaders & CreateUserDefinedFunction200Headers;
}

export interface CreateUserDefinedFunction201Headers {
  /** The transaction id at which this write will become durable. */
  "x-ms-ccf-transaction-id"?: string;
}

/** Creates the user defined function in the Confidential Ledger */
export interface CreateUserDefinedFunction201Response extends HttpResponse {
  status: "201";
  body: UserDefinedFunctionOutput;
  headers: RawHttpHeaders & CreateUserDefinedFunction201Headers;
}

/** Creates the user defined function in the Confidential Ledger */
export interface CreateUserDefinedFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Executes the user defined function in the Confidential Ledger */
export interface ExecuteUserDefinedFunction200Response extends HttpResponse {
  status: "200";
  body: UserDefinedFunctionExecutionResponseOutput;
}

/** Executes the user defined function in the Confidential Ledger */
export interface ExecuteUserDefinedFunctionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** user defined roles allow users to define and manage app specific AuthZ policy. */
export interface GetUserDefinedRole200Response extends HttpResponse {
  status: "200";
  body: Array<RoleOutput>;
}

/** user defined roles allow users to define and manage app specific AuthZ policy. */
export interface GetUserDefinedRoleDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** User defined roles allow users to define and manage app specific AuthZ policy. */
export interface CreateUserDefinedRole200Response extends HttpResponse {
  status: "200";
}

/** User defined roles allow users to define and manage app specific AuthZ policy. */
export interface CreateUserDefinedRoleDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** User defined roles allow users to define and manage app specific AuthZ policy. */
export interface UpdateUserDefinedRole200Response extends HttpResponse {
  status: "200";
}

/** User defined roles allow users to define and manage app specific AuthZ policy. */
export interface UpdateUserDefinedRoleDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A user defined role allows the users to create and manage their own role actions using the API. */
export interface DeleteUserDefinedRole200Response extends HttpResponse {
  status: "200";
}

/** A user defined role allows the users to create and manage their own role actions using the API. */
export interface DeleteUserDefinedRoleDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}
