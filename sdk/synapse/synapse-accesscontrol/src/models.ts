// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, OperationOptions } from "@azure/core-http";
import { HttpResponse } from "@azure/core-http";

export { RoleAssignmentDetails, SynapseRole } from "./generated/models";

/**
 * Options to create accesscontrol client.
 */
export interface AccesscontrolClientOptions extends PipelineOptions {}

export type GetRoleDefinitionOptions = OperationOptions;

export type GetRoleAssignmentOptions = OperationOptions;

export type ListRoleDefinitionOptions = OperationOptions;

export type CreateRoleAssignmentOptions = OperationOptions;

export type DeleteRoleAssignmentOptions = OperationOptions;

export type GetCallerRoleAssignmentsOptions = OperationOptions;

/**
 * Arguments for retrieving the next page of search results.
 */
export interface ListPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

/**
 * Represents the repsonse for operations
 */
export interface OperationResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: HttpResponse;
}

/**
 * Represents the returned response of the operation along with the raw response.
 */
export type WithResponse<T> = T & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: T;
  };
};

/**
 * Attach http response to a model
 */
export const attachHttpResponse = <T>(
  model: T,
  httpResponse: HttpResponse & { bodyAsText: string; parsedBody: any }
): WithResponse<T> => {
  const { parsedBody, bodyAsText, ...r } = httpResponse;
  return Object.defineProperty(model, "_response", {
    value: r
  });
};
