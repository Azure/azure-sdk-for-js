// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationParameter, OperationSpec } from "./interfaces";
import { MapperTypeNames } from "./serializer";

/**
 * Gets the list of status codes for streaming responses.
 * @internal
 */
export function getStreamingResponseStatusCodes(operationSpec: OperationSpec): Set<number> {
  const result = new Set<number>();
  for (const statusCode in operationSpec.responses) {
    const operationResponse = operationSpec.responses[statusCode];
    if (
      operationResponse.bodyMapper &&
      operationResponse.bodyMapper.type.name === MapperTypeNames.Stream
    ) {
      result.add(Number(statusCode));
    }
  }
  return result;
}

/**
 * Get the path to this parameter's value as a dotted string (a.b.c).
 * @param parameter - The parameter to get the path string for.
 * @returns The path to this parameter's value as a dotted string.
 * @internal
 */
export function getPathStringFromParameter(parameter: OperationParameter): string {
  const { parameterPath, mapper } = parameter;
  let result: string;
  if (typeof parameterPath === "string") {
    result = parameterPath;
  } else if (Array.isArray(parameterPath)) {
    result = parameterPath.join(".");
  } else {
    result = mapper.serializedName!;
  }
  return result;
}
