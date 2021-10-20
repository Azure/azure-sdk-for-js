// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationArguments,
  OperationParameter,
  Mapper,
  CompositeMapper,
  ParameterPath,
  OperationRequestInfo,
  OperationRequest,
  QueryParameterValue
} from "./interfaces";

/**
 * @internal
 * Retrieves the value to use for a given operation argument
 * @param operationArguments - The arguments passed from the generated client
 * @param parameter - The parameter description
 * @param fallbackObject - If something isn't found in the arguments bag, look here.
 *  Generally used to look at the service client properties.
 */
export function getOperationArgumentValueFromParameter(
  operationArguments: OperationArguments,
  parameter: OperationParameter,
  fallbackObject?: { [parameterName: string]: any }
): QueryParameterValue {
  let parameterPath = parameter.parameterPath;
  const parameterMapper = parameter.mapper;
  const queryParam: QueryParameterValue = { value: undefined, source: "default" };
  if (typeof parameterPath === "string") {
    parameterPath = [parameterPath];
  }
  if (Array.isArray(parameterPath)) {
    if (parameterPath.length > 0) {
      if (parameterMapper.isConstant) {
        queryParam.value = parameterMapper.defaultValue;
      } else {
        let propertySearchResult = getPropertyFromParameterPath(operationArguments, parameterPath);

        if (!propertySearchResult.propertyFound && fallbackObject) {
          propertySearchResult = getPropertyFromParameterPath(fallbackObject, parameterPath);
        }

        let useDefaultValue = false;
        if (!propertySearchResult.propertyFound) {
          useDefaultValue =
            parameterMapper.required ||
            (parameterPath[0] === "options" && parameterPath.length === 2);
        }
        if (useDefaultValue) {
          queryParam.value = parameterMapper.defaultValue;
        } else {
          queryParam.value = propertySearchResult.propertyValue;
          queryParam.source = "input";
        }
      }
    }
  } else {
    if (parameterMapper.required) {
      queryParam.value = {};
    }

    for (const propertyName in parameterPath) {
      const propertyMapper: Mapper = (parameterMapper as CompositeMapper).type.modelProperties![
        propertyName
      ];
      const propertyPath: ParameterPath = parameterPath[propertyName];
      const propertyValue: any = getOperationArgumentValueFromParameter(
        operationArguments,
        {
          parameterPath: propertyPath,
          mapper: propertyMapper
        },
        fallbackObject
      );
      if (propertyValue !== undefined) {
        if (!queryParam.value) {
          queryParam.value = {};
        }
        (queryParam.value as Record<string, unknown>)[propertyName] = propertyValue;
      }
    }
  }
  return queryParam;
}

interface PropertySearchResult {
  propertyValue?: any;
  propertyFound: boolean;
}

function getPropertyFromParameterPath(
  parent: { [parameterName: string]: any },
  parameterPath: string[]
): PropertySearchResult {
  const result: PropertySearchResult = { propertyFound: false };
  let i = 0;
  for (; i < parameterPath.length; ++i) {
    const parameterPathPart: string = parameterPath[i];
    // Make sure to check inherited properties too, so don't use hasOwnProperty().
    if (parent && parameterPathPart in parent) {
      parent = parent[parameterPathPart];
    } else {
      break;
    }
  }
  if (i === parameterPath.length) {
    result.propertyValue = parent;
    result.propertyFound = true;
  }
  return result;
}

const operationRequestMap = new WeakMap<OperationRequest, OperationRequestInfo>();

export function getOperationRequestInfo(request: OperationRequest): OperationRequestInfo {
  let info = operationRequestMap.get(request);

  if (!info) {
    info = {};
    operationRequestMap.set(request, info);
  }
  return info;
}
