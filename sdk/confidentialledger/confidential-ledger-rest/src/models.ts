// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** An entry in the ledger. */
export interface LedgerEntry {
  /** Contents of the ledger entry. */
  contents: string;
  /**
   * List of user defined function hooks to be executed before the ledger entry is
   * written.
   */
  preHooks?: Array<UserDefinedFunctionHook>;
  /**
   * List of user defined function hooks to be executed after the ledger entry is
   * written.
   */
  postHooks?: Array<UserDefinedFunctionHook>;
}

/** Hook for a user defined function execution. */
export interface UserDefinedFunctionHook {
  /** ID of the user defined function to execute. */
  functionId: string;
  /** The properties for executing a user defined function. */
  properties?: UserDefinedFunctionExecutionProperties;
}

/** The properties for executing a user defined function. */
export interface UserDefinedFunctionExecutionProperties {
  /** Runtime arguments of the user defined function. Defaults to an empty list. */
  arguments?: string[];
  /**
   * Name of the exported function to execute in the code of the user defined
   * function. Defaults to main.
   */
  exportedFunctionName?: string;
  /** JS runtime options for user defined endpoints and functions */
  runtimeOptions?: JsRuntimeOptions;
}

/** JS runtime options for user defined endpoints and functions */
export interface JsRuntimeOptions {
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

/** Details about a Confidential Ledger user. */
export interface LedgerUser {
  /**
   * Represents an assignable role.
   *
   * Possible values: "Administrator", "Contributor", "Reader"
   */
  assignedRole: ConfidentialLedgerUserRoleName;
}

/** Details about a Confidential Ledger user. */
export interface LedgerUserMultipleRoles {
  /** Represents an assignable role. */
  assignedRoles: ConfidentialLedgerUserRoleName[];
}

/** bundle for the user defined endpoints */
export interface Bundle {
  /** Metadata information for the bundle. */
  metadata: Metadata;
  /** Any object */
  modules: Array<ModuleDef>;
}

/** Metadata for endpoints. */
export interface Metadata {
  /** A map of path to method endpoints for the path */
  endpoints: Record<string, MethodToEndpointProperties>;
}

/** Maps methods to their corresponding endpoint properties. */
export interface MethodToEndpointProperties {
  /** Properties for GET method endpoint. */
  get?: EndpointProperties;
  /** Properties for PUT method endpoint. */
  put?: EndpointProperties;
  /** Properties for PATCH method endpoint. */
  patch?: EndpointProperties;
  /** Properties for DELETE method endpoint. */
  delete?: EndpointProperties;
}

/** Endpoint properties. */
export interface EndpointProperties {
  /** Authentication policies for the endpoint. */
  authn_policies: Record<string, unknown>[];
  /**
   * Indicates whether request forwarding is required for this endpoint.
   *
   * Possible values: "sometimes", "always", "never"
   */
  forwarding_required: ForwardingRequired;
  /** Policy for interpreter reuse. */
  interpreter_reuse?: InterpreterReusePolicy;
  /** The JavaScript function. */
  js_function?: string;
  /** The JavaScript module. */
  js_module?: string;
  /**
   * The operation mode for this endpoint.
   *
   * Possible values: "readwrite", "readonly", "historical"
   */
  mode?: Mode;
  /** Anything */
  openapi?: Record<string, unknown>;
  /** Openapi hidden */
  openapi_hidden?: boolean;
  /**
   * Redirection strategy
   *
   * Possible values: "none", "to_primary", "to_backup"
   */
  redirection_strategy?: RedirectionStrategy;
}

/** Policy for interpreter reuse. */
export interface InterpreterReusePolicy {
  /** Key for the interpreter reuse policy. */
  key: string;
}

/** Module definition */
export interface ModuleDef {
  /** Module */
  module: string;
  /** Name */
  name: string;
}

/** A user defined function in the ledger. */
export interface UserDefinedFunction {
  /** Code of the user defined function in JavaScript. */
  code: string;
}

/** Definition for roles */
export interface Role {
  /** name of the user defined role */
  roleName?: string;
  /** role actions */
  roleActions?: string[];
}

/** Roles */
export interface UserDefinedRoles {
  /** Roles */
  roles: Array<Role>;
}

/** Alias for ConfidentialLedgerUserRoleName */
export type ConfidentialLedgerUserRoleName = string;
/** Alias for ForwardingRequired */
export type ForwardingRequired = string;
/** Alias for Mode */
export type Mode = string;
/** Alias for RedirectionStrategy */
export type RedirectionStrategy = string;
