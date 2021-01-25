// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MapperTypeNames } from "./serializer";
import { OperationSpec, OperationParameter } from "./interfaces";

/**
 * @internal @ignore
 */
export function isStreamOperation(operationSpec: OperationSpec): boolean {
  for (const statusCode in operationSpec.responses) {
    const operationResponse = operationSpec.responses[statusCode];
    if (
      operationResponse.bodyMapper &&
      operationResponse.bodyMapper.type.name === MapperTypeNames.Stream
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Get the path to this parameter's value as a dotted string (a.b.c).
 * @param parameter The parameter to get the path string for.
 * @returns The path to this parameter's value as a dotted string.
 * @internal @ignore
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
