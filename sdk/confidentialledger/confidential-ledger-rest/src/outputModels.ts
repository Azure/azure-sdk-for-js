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
  /** Members in the consortium. */
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
  /** Collection identifiers. */
  collections: Array<CollectionOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Identifier for collections. */
export interface CollectionOutput {
  /** Identifier for the collection. */
  collectionId: string;
}

/** Paginated tags returned in response to a query. */
export interface PagedTagsOutput {
  /** Array of tags. */
  tags: string[];
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Paginated ledger entries returned in response to a query. */
export interface PagedLedgerEntriesOutput {
  /**
   * State of a ledger query.
   *
   * Possible values: "Loading", "Ready"
   */
  state: ConfidentialLedgerQueryStateOutput;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
  /** Array of ledger entries. */
  entries: Array<LedgerEntryOutput>;
}

/** An entry in the ledger. */
export interface LedgerEntryOutput {
  /** Contents of the ledger entry. */
  contents: string;
  /** The collection identifier for this ledger entry. */
  readonly collectionId?: string;
  /**
   * A unique identifier for the state of the ledger. If returned as part of a
   * LedgerEntry, it indicates the state from which the entry was read.
   */
  readonly transactionId?: string;
  /**
   * List of user defined function hooks to be executed before the ledger entry is
   * written.
   */
  preHooks?: Array<UserDefinedFunctionHookOutput>;
  /**
   * List of user defined function hooks to be executed after the ledger entry is
   * written.
   */
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
  arguments?: string[];
  /**
   * Name of the exported function to execute in the code of the user defined
   * function. Defaults to main.
   */
  exportedFunctionName?: string;
  /** JS runtime options for user defined endpoints and functions */
  runtimeOptions?: JsRuntimeOptionsOutput;
}

/** JS runtime options for user defined endpoints and functions */
export interface JsRuntimeOptionsOutput {
  /** Whether to log exception details in the runtime. */
  log_exception_details?: boolean;
  /** Maximum number of cached interpreters. */
  max_cached_interpreters?: number;
  /** Maximum execution time in milliseconds. */
  max_execution_time_ms?: number;
  /** Maximum heap size in bytes. */
  max_heap_bytes?: number;
  /** Maximum stack size in bytes. */
  max_stack_bytes?: number;
  /** Whether to return exception details in the response. */
  return_exception_details?: boolean;
}

/**
 * Returned as a result of a write to the Confidential Ledger, the transaction id
 * in the response indicates when the write will become durable.
 */
export interface LedgerWriteResultOutput {
  /** The collection identifier of the ledger entry. */
  collectionId: string;
}

/**
 * The result of querying for a ledger entry from an older transaction id. The
 * ledger entry is available in the response only if the returned state is Ready.
 */
export interface LedgerQueryResultOutput {
  /**
   * State of a ledger query.
   *
   * Possible values: "Loading", "Ready"
   */
  state: ConfidentialLedgerQueryStateOutput;
  /**
   * The ledger entry found as a result of the query. This is only available if the
   * query is in Ready state.
   */
  entry?: LedgerEntryOutput;
}

/** A receipt certifying the transaction at the specified id. */
export interface TransactionReceiptOutput {
  /** List of application claims. */
  applicationClaims?: Array<ApplicationClaimOutput>;
  /** The receipt contents for the transaction. */
  receipt?: ReceiptContentsOutput;
  /**
   * State of a ledger query.
   *
   * Possible values: "Loading", "Ready"
   */
  state: ConfidentialLedgerQueryStateOutput;
  /**
   * A unique identifier for the state of the ledger. If returned as part of a
   * LedgerEntry, it indicates the state from which the entry was read.
   */
  transactionId: string;
}

/** A claim of a ledger application. */
export interface ApplicationClaimOutput {
  /** An application claim in digested form. */
  digest?: ClaimDigestOutput;
  /**
   * Represents the kind of an application claim.
   *
   * Possible values: "LedgerEntry", "ClaimDigest"
   */
  kind: ApplicationClaimKindOutput;
  /** An application claim derived from ledger entry data. */
  ledgerEntry?: LedgerEntryClaimOutput;
}

/** An application claim in digested form. */
export interface ClaimDigestOutput {
  /** The digest of the application claim, in hexadecimal form. */
  value?: string;
  /**
   * Represents the protocol to be used to compute the digest of a claim from the
   * given claim data.
   *
   * Possible values: "LedgerEntryV1"
   */
  protocol: ApplicationClaimProtocolOutput;
}

/** An application claim derived from ledger entry data. */
export interface LedgerEntryClaimOutput {
  /** Identifier of a collection. */
  collectionId?: string;
  /** Contents of a ledger entry. */
  contents?: string;
  /** Base64-encoded secret key. */
  secretKey?: string;
  /**
   * Represents the protocol to be used to compute the digest of a claim from the
   * given claim data.
   *
   * Possible values: "LedgerEntryV1"
   */
  protocol: ApplicationClaimProtocolOutput;
}

/** The contents of a receipt */
export interface ReceiptContentsOutput {
  /** Certificate */
  cert?: string;
  /** Leaf */
  leaf?: string;
  /** Leaf components of the receipt */
  leafComponents?: ReceiptLeafComponentsOutput;
  /** Node identifier */
  nodeId: string;
  /** Proof */
  proof: Array<ReceiptElementOutput>;
  /** Root */
  root?: string;
  /** Service endorsements */
  serviceEndorsements?: string[];
  /** The signature of the receipt */
  signature: string;
}

/** Components that make up a receipt leaf node. */
export interface ReceiptLeafComponentsOutput {
  /** Claims digest */
  claimsDigest?: string;
  /** Commit evidence */
  commitEvidence?: string;
  /** Write set digest */
  writeSetDigest?: string;
}

/** Receipt element */
export interface ReceiptElementOutput {
  /** Left */
  left?: string;
  /** Right */
  right?: string;
}

/** Response returned to a query for the transaction status */
export interface TransactionStatusOutput {
  /**
   * Represents the state of the transaction.
   *
   * Possible values: "Committed", "Pending"
   */
  state: TransactionStateOutput;
  /**
   * A unique identifier for the state of the ledger. If returned as part of a
   * LedgerEntry, it indicates the state from which the entry was read.
   */
  transactionId: string;
}

/** Paginated users returned in response to a query. */
export interface PagedUsersOutput {
  /** Ledger users. */
  ledgerUsers?: Array<LedgerUserOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Details about a Confidential Ledger user. */
export interface LedgerUserOutput {
  /**
   * Represents an assignable role.
   *
   * Possible values: "Administrator", "Contributor", "Reader"
   */
  assignedRole: ConfidentialLedgerUserRoleNameOutput;
  /**
   * Identifier for the user. This must either be an AAD object id or a certificate
   * fingerprint.
   */
  readonly userId?: string;
}

/** Paginated users returned in response to a query. */
export interface PagedLedgerUsersOutput {
  /** Ledger users with details. */
  ledgerUsers?: Array<LedgerUserMultipleRolesOutput>;
  /** Path from which to retrieve the next page of results. */
  nextLink?: string;
}

/** Details about a Confidential Ledger user. */
export interface LedgerUserMultipleRolesOutput {
  /** Represents an assignable role. */
  assignedRoles: ConfidentialLedgerUserRoleNameOutput[];
  /**
   * Identifier for the user. This must either be an AAD object id or a certificate
   * fingerprint.
   */
  readonly userId?: string;
}

/** bundle for the user defined endpoints */
export interface BundleOutput {
  /** Metadata information for the bundle. */
  metadata: MetadataOutput;
  /** Any object */
  modules: Array<ModuleDefOutput>;
}

/** Metadata for endpoints. */
export interface MetadataOutput {
  /** A map of path to method endpoints for the path */
  endpoints: Record<string, MethodToEndpointPropertiesOutput>;
}

/** Maps methods to their corresponding endpoint properties. */
export interface MethodToEndpointPropertiesOutput {
  /** Properties for GET method endpoint. */
  get?: EndpointPropertiesOutput;
  /** Properties for PUT method endpoint. */
  put?: EndpointPropertiesOutput;
  /** Properties for PATCH method endpoint. */
  patch?: EndpointPropertiesOutput;
  /** Properties for DELETE method endpoint. */
  delete?: EndpointPropertiesOutput;
}

/** Endpoint properties. */
export interface EndpointPropertiesOutput {
  /** Authentication policies for the endpoint. */
  authn_policies: Record<string, any>[];
  /**
   * Indicates whether request forwarding is required for this endpoint.
   *
   * Possible values: "sometimes", "always", "never"
   */
  forwarding_required: ForwardingRequiredOutput;
  /** Policy for interpreter reuse. */
  interpreter_reuse?: InterpreterReusePolicyOutput;
  /** The JavaScript function. */
  js_function?: string;
  /** The JavaScript module. */
  js_module?: string;
  /**
   * The operation mode for this endpoint.
   *
   * Possible values: "readwrite", "readonly", "historical"
   */
  mode?: ModeOutput;
  /** Anything */
  openapi?: Record<string, any>;
  /** Openapi hidden */
  openapi_hidden?: boolean;
  /**
   * Redirection strategy
   *
   * Possible values: "none", "to_primary", "to_backup"
   */
  redirection_strategy?: RedirectionStrategyOutput;
}

/** Policy for interpreter reuse. */
export interface InterpreterReusePolicyOutput {
  /** Key for the interpreter reuse policy. */
  key: string;
}

/** Module definition */
export interface ModuleDefOutput {
  /** Module */
  module: string;
  /** Name */
  name: string;
}

/** Paginated user defined functions returned in response to a query. */
export interface PagedUserDefinedFunctionsOutput {
  /** User-defined functions. */
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
  /**
   * The error object of a user defined function execution. This is returned only
   * when the user defined function execution throws an exception.
   */
  error?: UserDefinedFunctionExecutionErrorOutput;
  /**
   * The result object of a user defined function execution. This is returned only
   * when the user defined function executes successfully.
   */
  result?: UserDefinedFunctionExecutionResultOutput;
  /**
   * Represents the status of a user defined function execution.
   *
   * Possible values: "Succeeded", "Failed"
   */
  status: UserDefinedFunctionExecutionStatusOutput;
}

/**
 * The error object of a user defined function execution. This is returned only
 * when the user defined function execution throws an exception.
 */
export interface UserDefinedFunctionExecutionErrorOutput {
  /** Message indicating the error thrown when executing the function. */
  message?: string;
}

/**
 * The result object of a user defined function execution. This is returned only
 * when the user defined function executes successfully.
 */
export interface UserDefinedFunctionExecutionResultOutput {
  /**
   * String-encoded value returned by the user defined function execution. If the
   * function does not return any value, this is set to an empty string.
   */
  returnValue?: string;
}

/** User defined role */
export interface UserDefinedRoleOutput {
  /** User defined role */
  role: Array<RoleOutput>;
}

/** Definition for roles */
export interface RoleOutput {
  /** name of the user defined role */
  roleName?: string;
  /** role actions */
  roleActions?: string[];
}

/** Roles */
export interface UserDefinedRolesOutput {
  /** Roles */
  roles: Array<RoleOutput>;
}

/** Alias for ConfidentialLedgerQueryStateOutput */
export type ConfidentialLedgerQueryStateOutput = string;
/** Alias for ApplicationClaimProtocolOutput */
export type ApplicationClaimProtocolOutput = string;
/** Alias for ApplicationClaimKindOutput */
export type ApplicationClaimKindOutput = string;
/** Alias for TransactionStateOutput */
export type TransactionStateOutput = string;
/** Alias for ConfidentialLedgerUserRoleNameOutput */
export type ConfidentialLedgerUserRoleNameOutput = string;
/** Alias for ForwardingRequiredOutput */
export type ForwardingRequiredOutput = string;
/** Alias for ModeOutput */
export type ModeOutput = string;
/** Alias for RedirectionStrategyOutput */
export type RedirectionStrategyOutput = string;
/** Alias for UserDefinedFunctionExecutionStatusOutput */
export type UserDefinedFunctionExecutionStatusOutput = string;
