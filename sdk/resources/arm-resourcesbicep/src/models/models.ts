// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The body of the request for the decompileBicep operation */
export interface DecompileOperationRequest {
  /** The ARM json template to be decompiled into a Bicep file */
  template: string;
}

export function decompileOperationRequestSerializer(item: DecompileOperationRequest): any {
  return { template: item["template"] };
}

/** The response of the decompileBicep operation */
export interface DecompileOperationSuccessResponse {
  /** An array of key-value pairs containing the entryPoint string as the key for the Bicep file decompiled from the ARM json template */
  files: FileDefinition[];
  /** The file path to the main Bicep file generated from the decompiled ARM json template. */
  entryPoint: string;
}

export function decompileOperationSuccessResponseDeserializer(
  item: any,
): DecompileOperationSuccessResponse {
  return {
    files: fileDefinitionArrayDeserializer(item["files"]),
    entryPoint: item["entryPoint"],
  };
}

export function fileDefinitionArrayDeserializer(result: Array<FileDefinition>): any[] {
  return result.map((item) => {
    return fileDefinitionDeserializer(item);
  });
}

/** The definition of a file along with its contents */
export interface FileDefinition {
  /** The file path of the Bicep file. */
  path?: string;
  /** The contents of the Bicep file. */
  contents?: string;
}

export function fileDefinitionDeserializer(item: any): FileDefinition {
  return {
    path: item["path"],
    contents: item["contents"],
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-11-01 API version. */
  V20231101 = "2023-11-01",
}
