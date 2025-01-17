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
