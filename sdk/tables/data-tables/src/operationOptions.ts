// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OperationOptions as RestOperationOptions,
  OperationRequestOptions as RestOperationRequestOptions,
} from "@azure-rest/core-client";
import type { PipelineResponse } from "@azure/core-rest-pipeline";

/**
 * Options used when creating and sending HTTP requests for a Data Tables operation.
 */
export interface OperationRequestOptions extends RestOperationRequestOptions {
  /**
   * User-defined custom request headers.
   *
   * @deprecated Use `headers` instead.
   */
  customHeaders?: Record<string, string>;
  /**
   * Whether the response should be deserialized.
   *
   * @deprecated This option is not supported by TypeSpec-generated clients.
   */
  shouldDeserialize?: boolean | ((response: PipelineResponse) => boolean);
}

/**
 * Options that configure legacy XML serialization behavior.
 */
export interface XmlOptions {
  /** The name of the root XML element. */
  rootName?: string;
  /** Whether to include the root XML element while parsing. */
  includeRoot?: boolean;
  /** The key used to access XML text content while parsing. */
  xmlCharKey?: string;
}

/**
 * Options that configure legacy serialization and deserialization behavior.
 */
export interface SerializerOptions {
  /** XML parser and builder options. */
  xml: XmlOptions;
  /** Whether unknown properties should be excluded from deserialized results. */
  ignoreUnknownProperties?: boolean;
}

/**
 * A raw HTTP response provided to an operation callback.
 */
export interface FullOperationResponse extends PipelineResponse {
  /** Parsed response headers, when available. */
  parsedHeaders?: Record<string, unknown>;
  /** Parsed response body, when available. */
  parsedBody?: any;
}

/**
 * A callback invoked with the raw operation response.
 *
 * The legacy `flatResponse` argument is not populated by TypeSpec-generated clients.
 */
export type RawResponseCallback = (
  rawResponse: FullOperationResponse,
  flatResponse: unknown,
  error?: unknown,
) => void;

/**
 * Common options for Data Tables operations.
 */
export interface OperationOptions extends Omit<
  RestOperationOptions,
  "onResponse" | "requestOptions"
> {
  /** Options used when creating and sending the HTTP request. */
  requestOptions?: OperationRequestOptions;
  /**
   * Options that override legacy serialization behavior.
   *
   * @deprecated This option is not supported by TypeSpec-generated clients.
   */
  serializerOptions?: SerializerOptions;
  /** A callback invoked with the raw operation response. */
  onResponse?: RawResponseCallback;
}
