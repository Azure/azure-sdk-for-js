// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationArguments,
  OperationParameter,
  Mapper,
  CompositeMapper,
  ParameterPath
} from "./interfaces";

/**
 * @internal @ignore
 * Retrieves the value to use for a given operation argument
 * @param operationArguments The arguments passed from the generated client
 * @param parameter The parameter description
 * @param fallbackObject If something isn't found in the arguments bag, look here.
 *  Generally used to look at the service client properties.
 */
export function getOperationArgumentValueFromParameter(
  operationArguments: OperationArguments,
  parameter: OperationParameter,
  fallbackObject?: { [parameterName: string]: any }
): any {
  let parameterPath = parameter.parameterPath;
  const parameterMapper = parameter.mapper;
  let value: any;
  if (typeof parameterPath === "string") {
    parameterPath = [parameterPath];
  }
  if (Array.isArray(parameterPath)) {
    if (parameterPath.length > 0) {
      if (parameterMapper.isConstant) {
        value = parameterMapper.defaultValue;
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
        value = useDefaultValue ? parameterMapper.defaultValue : propertySearchResult.propertyValue;
      }
    }
  } else {
    if (parameterMapper.required) {
      value = {};
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
        if (!value) {
          value = {};
        }
        value[propertyName] = propertyValue;
      }
    }
  }
  return value;
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
