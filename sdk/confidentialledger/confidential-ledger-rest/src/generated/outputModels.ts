// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The governance script for the application. */
export interface ConstitutionOutput {
  /** SHA256 digest of the constitution script. */
  digest: string;
  /** Contents of the constitution. */
  script: string;
}

/** An error response from Confidential Ledger. */
export interface ConfidentialLedgerErrorOutput {
  /** An error response from Confidential Ledger. */
  readonly error?: ConfidentialLedgerErrorBodyOutput;
}

/** An error response from Confidential Ledger. */
export interface ConfidentialLedgerErrorBodyOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
}

/** List of members in the consortium. */
export interface ConsortiumOutput {
  members: Array<ConsortiumMemberOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Describes a member of the consortium. */
export interface ConsortiumMemberOutput {
  /** PEM-encoded certificate associated with the member. */
  certificate: string;
  /** Identifier assigned to the member. */
  id: string;
}

/** Information about the enclaves running the Confidential Ledger. */
export interface ConfidentialLedgerEnclavesOutput {
  /** Id of the Confidential Ledger node responding to the request. */
  currentNodeId: string;
  /** Dictionary of enclave quotes, indexed by node id. */
  enclaveQuotes: Record<string, EnclaveQuoteOutput>;
}

/** Contains the enclave quote. */
export interface EnclaveQuoteOutput {
  /** ID assigned to this node. */
  nodeId: string;
  /** MRENCLAVE value of the code running in the enclave. */
  mrenclave?: string;
  /** Version of the quote presented. */
  quoteVersion: string;
  /** Raw SGX quote, parsable by tools like Open Enclave's oeverify. */
  raw: string;
}

/** Paginated collections returned in response to a query. */
export interface PagedCollectionsOutput {
  collections: Array<CollectionOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Identifier for collections. */
export interface CollectionOutput {
  collectionId: string;
}

/** Paginated ledger entries returned in response to a query. */
export interface PagedLedgerEntriesOutput {
  /** State of a ledger query. */
  state: "Loading" | "Ready";
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
  /** Array of ledger entries. */
  entries: Array<LedgerEntryOutput>;
}

/** An entry in the ledger. */
export interface LedgerEntryOutput {
  /** Contents of the ledger entry. */
  contents: string;
  readonly collectionId?: string;
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  readonly transactionId?: string;
  /** List of user defined function hooks to be executed before the ledger entry is written. */
  preHooks?: Array<UserDefinedFunctionHookOutput>;
  /** List of user defined function hooks to be executed after the ledger entry is written. */
  postHooks?: Array<UserDefinedFunctionHookOutput>;
}

/** Hook for a user defined function execution. */
export interface UserDefinedFunctionHookOutput {
  /** ID of the user defined function to execute. */
  functionId: string;
  /** The properties for executing a user defined function. */
  properties?: UserDefinedFunctionExecutionPropertiesOutput;
}

/** The properties for executing a user defined function. */
export interface UserDefinedFunctionExecutionPropertiesOutput {
  /** Runtime arguments of the user defined function. Defaults to an empty list. */
  arguments?: Array<string>;
  /** Name of the exported function to execute in the code of the user defined function. Defaults to main. */
  exportedFunctionName?: string;
  /** JS runtime options for user defined endpoints and functions */
  runtimeOptions?: JSRuntimeOptionsOutput;
}

/** JS runtime options for user defined endpoints and functions */
export interface JSRuntimeOptionsOutput {
  log_exception_details?: boolean;
  max_cached_interpreters?: number;
  max_execution_time_ms?: number;
  max_heap_bytes?: number;
  max_stack_bytes?: number;
  return_exception_details?: boolean;
}

/** Returned as a result of a write to the Confidential Ledger, the transaction id in the response indicates when the write will become durable. */
export interface LedgerWriteResultOutput {
  collectionId: string;
}

/** The result of querying for a ledger entry from an older transaction id. The ledger entry is available in the response only if the returned state is Ready. */
export interface LedgerQueryResultOutput {
  /** State of a ledger query. */
  state: "Loading" | "Ready";
  /** The ledger entry found as a result of the query. This is only available if the query is in Ready state. */
  entry?: LedgerEntryOutput;
}

/** A receipt certifying the transaction at the specified id. */
export interface TransactionReceiptOutput {
  /** List of application claims. */
  applicationClaims?: Array<ApplicationClaimOutput>;
  receipt?: ReceiptContentsOutput;
  /** State of a ledger query. */
  state: "Loading" | "Ready";
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

/** A claim of a ledger application. */
export interface ApplicationClaimOutput {
  /** An application claim in digested form. */
  digest?: ClaimDigestOutput;
  /** Represents the kind of an application claim. */
  kind: "LedgerEntry" | "ClaimDigest";
  /** An application claim derived from ledger entry data. */
  ledgerEntry?: LedgerEntryClaimOutput;
}

/** An application claim in digested form. */
export interface ClaimDigestOutput {
  /** The digest of the application claim, in hexadecimal form. */
  value?: string;
  /** Represents the protocol to be used to compute the digest of a claim from the given claim data. */
  protocol: "LedgerEntryV1";
}

/** An application claim derived from ledger entry data. */
export interface LedgerEntryClaimOutput {
  /** Identifier of a collection. */
  collectionId?: string;
  /** Contents of a ledger entry. */
  contents?: string;
  /** Base64-encoded secret key. */
  secretKey?: string;
  /** Represents the protocol to be used to compute the digest of a claim from the given claim data. */
  protocol: "LedgerEntryV1";
}

export interface ReceiptContentsOutput {
  cert?: string;
  leaf?: string;
  leafComponents?: ReceiptLeafComponentsOutput;
  nodeId: string;
  proof: Array<ReceiptElementOutput>;
  root?: string;
  serviceEndorsements?: Array<string>;
  signature: string;
}

export interface ReceiptLeafComponentsOutput {
  claimsDigest?: string;
  commitEvidence?: string;
  writeSetDigest?: string;
}

export interface ReceiptElementOutput {
  left?: string;
  right?: string;
}

/** Response returned to a query for the transaction status */
export interface TransactionStatusOutput {
  /** Represents the state of the transaction. */
  state: "Committed" | "Pending";
  /** A unique identifier for the state of the ledger. If returned as part of a LedgerEntry, it indicates the state from which the entry was read. */
  transactionId: string;
}

/** Paginated users returned in response to a query. */
export interface PagedUsersOutput {
  ledgerUsers?: Array<LedgerUserOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Details about a Confidential Ledger user. */
export interface LedgerUserOutput {
  /** Represents an assignable role. */
  assignedRole: "Administrator" | "Contributor" | "Reader";
  /** Identifier for the user. This must either be an AAD object id or a certificate fingerprint. */
  readonly userId?: string;
}

/** Paginated users returned in response to a query. */
export interface PagedLedgerUsersOutput {
  ledgerUsers?: Array<LedgerUserMultipleRolesOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Details about a Confidential Ledger user. */
export interface LedgerUserMultipleRolesOutput {
  /** Represents an assignable role. */
  assignedRoles: Array<"Administrator" | "Contributor" | "Reader">;
  /** Identifier for the user. This must either be an AAD object id or a certificate fingerprint. */
  readonly userId?: string;
}

/** bundle for the user defined endpoints */
export interface BundleOutput {
  metadata: MetadataOutput;
  /** Any object */
  modules: Record<string, unknown>;
}

export interface MetadataOutput {
  /** A map of path to method endpoints for the path */
  endpoints: Record<string, MethodToEndpointPropertiesOutput>;
}

export interface MethodToEndpointPropertiesOutput {
  get?: EndpointPropertiesOutput;
  put?: EndpointPropertiesOutput;
  patch?: EndpointPropertiesOutput;
  delete?: EndpointPropertiesOutput;
}

export interface EndpointPropertiesOutput {
  authn_policies: Array<any>;
  forwarding_required: "sometimes" | "always" | "never";
  interpreter_reuse?: InterpreterReusePolicyOutput;
  js_function?: string;
  js_module?: string;
  mode?: "readwrite" | "readonly" | "historical";
  /** Anything */
  openapi?: any;
  openapi_hidden?: boolean;
  redirection_strategy?: "none" | "to_primary" | "to_backup";
}

export interface InterpreterReusePolicyOutput {
  key: string;
}

export interface ModuleDefOutput {
  module: string;
  name: string;
}

/** Paginated user defined functions returned in response to a query. */
export interface PagedUserDefinedFunctionsOutput {
  functions: Array<UserDefinedFunctionOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** A user defined function in the ledger. */
export interface UserDefinedFunctionOutput {
  /** Code of the user defined function in JavaScript. */
  code: string;
  /** ID of the user defined function. */
  readonly id?: string;
}

/** The result of a user defined function execution. */
export interface UserDefinedFunctionExecutionResponseOutput {
  /** The error object of a user defined function execution. This is returned only when the user defined function execution throws an exception. */
  error?: UserDefinedFunctionExecutionErrorOutput;
  /** The result object of a user defined function execution. This is returned only when the user defined function executes successfully. */
  result?: UserDefinedFunctionExecutionResultOutput;
  /** Represents the status of a user defined function execution. */
  status: "Succeeded" | "Failed";
}

/** The error object of a user defined function execution. This is returned only when the user defined function execution throws an exception. */
export interface UserDefinedFunctionExecutionErrorOutput {
  /** Message indicating the error thrown when executing the function. */
  message?: string;
}

/** The result object of a user defined function execution. This is returned only when the user defined function executes successfully. */
export interface UserDefinedFunctionExecutionResultOutput {
  /** String-encoded value returned by the user defined function execution. If the function does not return any value, this is set to an empty string. */
  returnValue?: string;
}

/** Definition for roles */
export interface RoleOutput {
  /** name of the user defined role */
  roleName?: string;
  roleActions?: Array<string>;
}
