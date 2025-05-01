// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** An entry in the ledger. */
export interface LedgerEntry {
  /** Contents of the ledger entry. */
  contents: string;
  /** List of user defined function hooks to be executed before the ledger entry is written. */
  preHooks?: Array<UserDefinedFunctionHook>;
  /** List of user defined function hooks to be executed after the ledger entry is written. */
  postHooks?: Array<UserDefinedFunctionHook>;
}

/** Hook for a user defined function execution. */
export interface UserDefinedFunctionHook {
    /** ID of the user defined function to execute. */
    functionId: string;
    /** The properties for executing a user defined function. */
    properties?: UserDefinedFunctionExecutionProperties;
}

/** Details about a Confidential Ledger user. */
export interface LedgerUser {
  /** Represents an assignable role. */
  assignedRole: "Administrator" | "Contributor" | "Reader";
}

/** Details about a Confidential Ledger user. */
export interface LedgerUserMultipleRoles {
    /** Represents an assignable role. */
    assignedRoles: Array<"Administrator" | "Contributor" | "Reader">;
}

export interface Metadata {
  /** A map of path to method endpoints for the path */
  endpoints: Record<string, MethodToEndpointProperties>;
}

export interface InterpreterReusePolicy {
  key: string;
}

export interface EndpointProperties {
  authn_policies: Array<any>;
  forwarding_required: "sometimes" | "always" | "never";
  interpreter_reuse?: InterpreterReusePolicy;
  js_function?: string;
  js_module?: string;
  mode?: "readwrite" | "readonly" | "historical";
  /** Anything */
  openapi?: any;
  openapi_hidden?: boolean;
  redirection_strategy?: "none" | "to_primary" | "to_backup";
}

export interface MethodToEndpointProperties {
  get?: EndpointProperties;
  put?: EndpointProperties;
  patch?: EndpointProperties;
  delete?: EndpointProperties;
}

/** bundle for the user defined endpoints */
export interface Bundle {
  metadata: Metadata;
  /** Any object */
  modules: Record<string, unknown>;
}

/** A user defined function in the ledger. */
export interface UserDefinedFunction {
    /** Code of the user defined function in JavaScript. */
    code: string;
}

/** The properties for executing a user defined function. */
export interface UserDefinedFunctionExecutionProperties {
    /** Runtime arguments of the user defined function. Defaults to an empty list. */
    arguments?: Array<string>;
    /** Name of the exported function to execute in the code of the user defined function. Defaults to main. */
    exportedFunctionName?: string;
    /** JS runtime options for user defined endpoints and functions */
    runtimeOptions?: JSRuntimeOptions;
}

/** JS runtime options for user defined endpoints and functions */
export interface JSRuntimeOptions {
    log_exception_details?: boolean;
    max_cached_interpreters?: number;
    max_execution_time_ms?: number;
    max_heap_bytes?: number;
    max_stack_bytes?: number;
    return_exception_details?: boolean;
}

/** Definition for roles */
export interface Role {
    /** name of the user defined role */
    roleName?: string;
    roleActions?: Array<string>;
}
