// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** An entry in the ledger. */
export interface LedgerEntry {
  /** Contents of the ledger entry. */
  contents: string;
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

/** bundle for the user defined endpoints */
export interface Bundle {
  metadata: Metadata;
  /** Any object */
  modules: Record<string, unknown>;
}

export interface Metadata {
  /** A map of path to method endpoints for the path */
  endpoints: Record<string, MethodToEndpointProperties>;
}

export interface MethodToEndpointProperties {
  get?: EndpointProperties;
  put?: EndpointProperties;
  patch?: EndpointProperties;
  delete?: EndpointProperties;
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

export interface InterpreterReusePolicy {
  key: string;
}

/** JS runtime options for user defined endpoints */
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
