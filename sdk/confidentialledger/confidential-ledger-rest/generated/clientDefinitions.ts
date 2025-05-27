// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetConstitutionParameters,
  ListConsortiumMembersParameters,
  GetEnclaveQuotesParameters,
  ListCollectionsParameters,
  ListLedgerEntriesParameters,
  CreateLedgerEntryParameters,
  GetLedgerEntryParameters,
  GetReceiptParameters,
  GetTransactionStatusParameters,
  GetCurrentLedgerEntryParameters,
  ListUsersParameters,
  ListLedgerUsersParameters,
  DeleteUserParameters,
  GetUserParameters,
  CreateOrUpdateUserParameters,
  DeleteLedgerUserParameters,
  GetLedgerUserParameters,
  CreateOrUpdateLedgerUserParameters,
  GetUserDefinedEndpointParameters,
  CreateUserDefinedEndpointParameters,
  GetRuntimeOptionsParameters,
  UpdateRuntimeOptionsParameters,
  GetUserDefinedEndpointsModuleParameters,
  ListUserDefinedFunctionsParameters,
  DeleteUserDefinedFunctionParameters,
  GetUserDefinedFunctionParameters,
  CreateUserDefinedFunctionParameters,
  ExecuteUserDefinedFunctionParameters,
  GetUserDefinedRoleParameters,
  CreateUserDefinedRoleParameters,
  UpdateUserDefinedRoleParameters,
  DeleteUserDefinedRoleParameters,
} from "./parameters.js";
import type {
  GetConstitution200Response,
  GetConstitutionDefaultResponse,
  ListConsortiumMembers200Response,
  ListConsortiumMembersDefaultResponse,
  GetEnclaveQuotes200Response,
  GetEnclaveQuotesDefaultResponse,
  ListCollections200Response,
  ListCollectionsDefaultResponse,
  ListLedgerEntries200Response,
  ListLedgerEntriesDefaultResponse,
  CreateLedgerEntry200Response,
  CreateLedgerEntryDefaultResponse,
  GetLedgerEntry200Response,
  GetLedgerEntryDefaultResponse,
  GetReceipt200Response,
  GetReceiptDefaultResponse,
  GetTransactionStatus200Response,
  GetTransactionStatusDefaultResponse,
  GetCurrentLedgerEntry200Response,
  GetCurrentLedgerEntryDefaultResponse,
  ListUsers200Response,
  ListUsersDefaultResponse,
  ListLedgerUsers200Response,
  ListLedgerUsersDefaultResponse,
  DeleteUser204Response,
  DeleteUserDefaultResponse,
  GetUser200Response,
  GetUserDefaultResponse,
  CreateOrUpdateUser200Response,
  CreateOrUpdateUserDefaultResponse,
  DeleteLedgerUser204Response,
  DeleteLedgerUserDefaultResponse,
  GetLedgerUser200Response,
  GetLedgerUserDefaultResponse,
  CreateOrUpdateLedgerUser200Response,
  CreateOrUpdateLedgerUserDefaultResponse,
  GetUserDefinedEndpoint200Response,
  GetUserDefinedEndpointDefaultResponse,
  CreateUserDefinedEndpoint201Response,
  CreateUserDefinedEndpointDefaultResponse,
  GetRuntimeOptions200Response,
  GetRuntimeOptionsDefaultResponse,
  UpdateRuntimeOptions200Response,
  UpdateRuntimeOptionsDefaultResponse,
  GetUserDefinedEndpointsModule200Response,
  GetUserDefinedEndpointsModuleDefaultResponse,
  ListUserDefinedFunctions200Response,
  ListUserDefinedFunctionsDefaultResponse,
  DeleteUserDefinedFunction204Response,
  DeleteUserDefinedFunctionDefaultResponse,
  GetUserDefinedFunction200Response,
  GetUserDefinedFunctionDefaultResponse,
  CreateUserDefinedFunction200Response,
  CreateUserDefinedFunction201Response,
  CreateUserDefinedFunctionDefaultResponse,
  ExecuteUserDefinedFunction200Response,
  ExecuteUserDefinedFunctionDefaultResponse,
  GetUserDefinedRole200Response,
  GetUserDefinedRoleDefaultResponse,
  CreateUserDefinedRole200Response,
  CreateUserDefinedRoleDefaultResponse,
  UpdateUserDefinedRole200Response,
  UpdateUserDefinedRoleDefaultResponse,
  DeleteUserDefinedRole200Response,
  DeleteUserDefinedRoleDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetConstitution {
  /** The constitution is a script that assesses and applies proposals from consortium members. */
  get(
    options?: GetConstitutionParameters,
  ): StreamableMethod<
    GetConstitution200Response | GetConstitutionDefaultResponse
  >;
}

export interface ListConsortiumMembers {
  /** Consortium members can manage the Confidential Ledger. */
  get(
    options?: ListConsortiumMembersParameters,
  ): StreamableMethod<
    ListConsortiumMembers200Response | ListConsortiumMembersDefaultResponse
  >;
}

export interface GetEnclaveQuotes {
  /** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
  get(
    options?: GetEnclaveQuotesParameters,
  ): StreamableMethod<
    GetEnclaveQuotes200Response | GetEnclaveQuotesDefaultResponse
  >;
}

export interface ListCollections {
  /** Collection ids are user-created collections of ledger entries */
  get(
    options?: ListCollectionsParameters,
  ): StreamableMethod<
    ListCollections200Response | ListCollectionsDefaultResponse
  >;
}

export interface ListLedgerEntries {
  /** A collection id may optionally be specified. Only entries in the specified (or default) collection will be returned. */
  get(
    options?: ListLedgerEntriesParameters,
  ): StreamableMethod<
    ListLedgerEntries200Response | ListLedgerEntriesDefaultResponse
  >;
  /** A collection id may optionally be specified. */
  post(
    options: CreateLedgerEntryParameters,
  ): StreamableMethod<
    CreateLedgerEntry200Response | CreateLedgerEntryDefaultResponse
  >;
}

export interface GetLedgerEntry {
  /** To return older ledger entries, the relevant sections of the ledger must be read from disk and validated. To prevent blocking within the enclave, the response will indicate whether the entry is ready and part of the response, or if the loading is still ongoing. */
  get(
    options?: GetLedgerEntryParameters,
  ): StreamableMethod<
    GetLedgerEntry200Response | GetLedgerEntryDefaultResponse
  >;
}

export interface GetReceipt {
  /** Gets a receipt certifying ledger contents at a particular transaction id. */
  get(
    options?: GetReceiptParameters,
  ): StreamableMethod<GetReceipt200Response | GetReceiptDefaultResponse>;
}

export interface GetTransactionStatus {
  /** Gets the status of an entry identified by a transaction id. */
  get(
    options?: GetTransactionStatusParameters,
  ): StreamableMethod<
    GetTransactionStatus200Response | GetTransactionStatusDefaultResponse
  >;
}

export interface GetCurrentLedgerEntry {
  /** A collection id may optionally be specified. */
  get(
    options?: GetCurrentLedgerEntryParameters,
  ): StreamableMethod<
    GetCurrentLedgerEntry200Response | GetCurrentLedgerEntryDefaultResponse
  >;
}

export interface ListUsers {
  /** All users' object IDs and single role per user will be returned. */
  get(
    options?: ListUsersParameters,
  ): StreamableMethod<ListUsers200Response | ListUsersDefaultResponse>;
}

export interface ListLedgerUsers {
  /** All users' object IDs and multiple roles will be returned. */
  get(
    options?: ListLedgerUsersParameters,
  ): StreamableMethod<
    ListLedgerUsers200Response | ListLedgerUsersDefaultResponse
  >;
}

export interface DeleteUser {
  /** Deletes a user from the Confidential Ledger. */
  delete(
    options?: DeleteUserParameters,
  ): StreamableMethod<DeleteUser204Response | DeleteUserDefaultResponse>;
  /** Gets a user. */
  get(
    options?: GetUserParameters,
  ): StreamableMethod<GetUser200Response | GetUserDefaultResponse>;
  /** A JSON merge patch is applied for existing users */
  patch(
    options: CreateOrUpdateUserParameters,
  ): StreamableMethod<
    CreateOrUpdateUser200Response | CreateOrUpdateUserDefaultResponse
  >;
}

export interface DeleteLedgerUser {
  /** Deletes a user with multiple roles from the Confidential Ledger. */
  delete(
    options?: DeleteLedgerUserParameters,
  ): StreamableMethod<
    DeleteLedgerUser204Response | DeleteLedgerUserDefaultResponse
  >;
  /** Gets a user with multiple roles. */
  get(
    options?: GetLedgerUserParameters,
  ): StreamableMethod<GetLedgerUser200Response | GetLedgerUserDefaultResponse>;
  /** A JSON merge patch is applied for existing users */
  patch(
    options: CreateOrUpdateLedgerUserParameters,
  ): StreamableMethod<
    | CreateOrUpdateLedgerUser200Response
    | CreateOrUpdateLedgerUserDefaultResponse
  >;
}

export interface GetUserDefinedEndpoint {
  /** Returns the user defined endpoint in the ACL instance */
  get(
    options?: GetUserDefinedEndpointParameters,
  ): StreamableMethod<
    GetUserDefinedEndpoint200Response | GetUserDefinedEndpointDefaultResponse
  >;
  /** Creates the user defined endpoint in the ACL instance */
  put(
    options: CreateUserDefinedEndpointParameters,
  ): StreamableMethod<
    | CreateUserDefinedEndpoint201Response
    | CreateUserDefinedEndpointDefaultResponse
  >;
}

export interface GetRuntimeOptions {
  /** It returns the runtime options */
  get(
    options?: GetRuntimeOptionsParameters,
  ): StreamableMethod<
    GetRuntimeOptions200Response | GetRuntimeOptionsDefaultResponse
  >;
  /** Updates the runtime options. */
  patch(
    options: UpdateRuntimeOptionsParameters,
  ): StreamableMethod<
    UpdateRuntimeOptions200Response | UpdateRuntimeOptionsDefaultResponse
  >;
}

export interface GetUserDefinedEndpointsModule {
  /** It gets the module for the user defined endpoint. */
  get(
    options: GetUserDefinedEndpointsModuleParameters,
  ): StreamableMethod<
    | GetUserDefinedEndpointsModule200Response
    | GetUserDefinedEndpointsModuleDefaultResponse
  >;
}

export interface ListUserDefinedFunctions {
  /** User defined functions stored in the Confidential Ledger */
  get(
    options?: ListUserDefinedFunctionsParameters,
  ): StreamableMethod<
    | ListUserDefinedFunctions200Response
    | ListUserDefinedFunctionsDefaultResponse
  >;
}

export interface DeleteUserDefinedFunction {
  /** Deletes a user defined function from the Confidential Ledger. */
  delete(
    options?: DeleteUserDefinedFunctionParameters,
  ): StreamableMethod<
    | DeleteUserDefinedFunction204Response
    | DeleteUserDefinedFunctionDefaultResponse
  >;
  /** Returns the user defined function in the Confidential Ledger */
  get(
    options?: GetUserDefinedFunctionParameters,
  ): StreamableMethod<
    GetUserDefinedFunction200Response | GetUserDefinedFunctionDefaultResponse
  >;
  /** Creates the user defined function in the Confidential Ledger */
  put(
    options: CreateUserDefinedFunctionParameters,
  ): StreamableMethod<
    | CreateUserDefinedFunction200Response
    | CreateUserDefinedFunction201Response
    | CreateUserDefinedFunctionDefaultResponse
  >;
}

export interface ExecuteUserDefinedFunction {
  /** Executes the user defined function in the Confidential Ledger */
  post(
    options?: ExecuteUserDefinedFunctionParameters,
  ): StreamableMethod<
    | ExecuteUserDefinedFunction200Response
    | ExecuteUserDefinedFunctionDefaultResponse
  >;
}

export interface GetUserDefinedRole {
  /** user defined roles allow users to define and manage app specific AuthZ policy. */
  get(
    options: GetUserDefinedRoleParameters,
  ): StreamableMethod<
    GetUserDefinedRole200Response | GetUserDefinedRoleDefaultResponse
  >;
  /** User defined roles allow users to define and manage app specific AuthZ policy. */
  put(
    options: CreateUserDefinedRoleParameters,
  ): StreamableMethod<
    CreateUserDefinedRole200Response | CreateUserDefinedRoleDefaultResponse
  >;
  /** User defined roles allow users to define and manage app specific AuthZ policy. */
  patch(
    options: UpdateUserDefinedRoleParameters,
  ): StreamableMethod<
    UpdateUserDefinedRole200Response | UpdateUserDefinedRoleDefaultResponse
  >;
  /** A user defined role allows the users to create and manage their own role actions using the API. */
  delete(
    options: DeleteUserDefinedRoleParameters,
  ): StreamableMethod<
    DeleteUserDefinedRole200Response | DeleteUserDefinedRoleDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/app/governance/constitution' has methods for the following verbs: get */
  (path: "/app/governance/constitution"): GetConstitution;
  /** Resource for '/app/governance/members' has methods for the following verbs: get */
  (path: "/app/governance/members"): ListConsortiumMembers;
  /** Resource for '/app/enclaveQuotes' has methods for the following verbs: get */
  (path: "/app/enclaveQuotes"): GetEnclaveQuotes;
  /** Resource for '/app/collections' has methods for the following verbs: get */
  (path: "/app/collections"): ListCollections;
  /** Resource for '/app/transactions' has methods for the following verbs: get, post */
  (path: "/app/transactions"): ListLedgerEntries;
  /** Resource for '/app/transactions/\{transactionId\}' has methods for the following verbs: get */
  (
    path: "/app/transactions/{transactionId}",
    transactionId: string,
  ): GetLedgerEntry;
  /** Resource for '/app/transactions/\{transactionId\}/receipt' has methods for the following verbs: get */
  (
    path: "/app/transactions/{transactionId}/receipt",
    transactionId: string,
  ): GetReceipt;
  /** Resource for '/app/transactions/\{transactionId\}/status' has methods for the following verbs: get */
  (
    path: "/app/transactions/{transactionId}/status",
    transactionId: string,
  ): GetTransactionStatus;
  /** Resource for '/app/transactions/current' has methods for the following verbs: get */
  (path: "/app/transactions/current"): GetCurrentLedgerEntry;
  /** Resource for '/app/users' has methods for the following verbs: get */
  (path: "/app/users"): ListUsers;
  /** Resource for '/app/ledgerUsers' has methods for the following verbs: get */
  (path: "/app/ledgerUsers"): ListLedgerUsers;
  /** Resource for '/app/users/\{userId\}' has methods for the following verbs: delete, get, patch */
  (path: "/app/users/{userId}", userId: string): DeleteUser;
  /** Resource for '/app/ledgerUsers/\{userId\}' has methods for the following verbs: delete, get, patch */
  (path: "/app/ledgerUsers/{userId}", userId: string): DeleteLedgerUser;
  /** Resource for '/app/userDefinedEndpoints' has methods for the following verbs: get, put */
  (path: "/app/userDefinedEndpoints"): GetUserDefinedEndpoint;
  /** Resource for '/app/userDefinedEndpoints/runtimeOptions' has methods for the following verbs: get, patch */
  (path: "/app/userDefinedEndpoints/runtimeOptions"): GetRuntimeOptions;
  /** Resource for '/app/userDefinedEndpoints/modules' has methods for the following verbs: get */
  (path: "/app/userDefinedEndpoints/modules"): GetUserDefinedEndpointsModule;
  /** Resource for '/app/userDefinedFunctions' has methods for the following verbs: get */
  (path: "/app/userDefinedFunctions"): ListUserDefinedFunctions;
  /** Resource for '/app/userDefinedFunctions/\{functionId\}' has methods for the following verbs: delete, get, put */
  (
    path: "/app/userDefinedFunctions/{functionId}",
    functionId: string,
  ): DeleteUserDefinedFunction;
  /** Resource for '/app/userDefinedFunctions/\{functionId\}:execute' has methods for the following verbs: post */
  (
    path: "/app/userDefinedFunctions/{functionId}:execute",
    functionId: string,
  ): ExecuteUserDefinedFunction;
  /** Resource for '/app/roles' has methods for the following verbs: get, put, patch, delete */
  (path: "/app/roles"): GetUserDefinedRole;
}

export type ConfidentialLedgerClient = Client & {
  path: Routes;
};
