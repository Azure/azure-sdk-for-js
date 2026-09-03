// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Result of the request to list Azure Workbooks operations.
 * It contains a list of operations and a URL link to get the next set of results.
 */
export interface _OperationListResult {
  /** List of Workbook operations supported by the Microsoft.Insights resource provider. */
  value?: Operation[];
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Azure Workbooks REST API operation */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** The object that represents the operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft.Insights */
  provider?: string;
  /** Resource on which the operation is performed: Profile, endpoint, etc. */
  resource?: string;
  /** Operation type: Read, write, delete, etc. */
  operation?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
  };
}

/** Error response indicates Insights service is not able to process the incoming request. The reason is provided in the error message. */
export interface ErrorResponse {
  /** Error code. */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
  /** The list of invalid fields send in request, in case of validation error. */
  details?: ErrorFieldContract[];
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : errorFieldContractArrayDeserializer(item["details"]),
  };
}

export function errorFieldContractArrayDeserializer(result: Array<ErrorFieldContract>): any[] {
  return result.map((item) => {
    return errorFieldContractDeserializer(item);
  });
}

/** Error Field contract. */
export interface ErrorFieldContract {
  /** Property level error code. */
  code?: string;
  /** Human-readable representation of property-level error. */
  message?: string;
  /** Property name. */
  target?: string;
}

export function errorFieldContractDeserializer(item: any): ErrorFieldContract {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}
