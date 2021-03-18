// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CompositeMapper, FullOperationResponse, OperationResponseMap } from "./interfaces";

/**
 * Returns true if the given value is a basic/primitive type
 * (string, number, boolean, null, undefined).
 * @param value - Value to test
 * @internal
 */
export function isPrimitiveType(value: unknown): boolean {
  return (typeof value !== "object" && typeof value !== "function") || value === null;
}

const validateISODuration = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

/**
 * Returns true if the given string is in ISO 8601 format.
 * @param value - The value to be validated for ISO 8601 duration format.
 * @internal
 */
export function isDuration(value: string): boolean {
  return validateISODuration.test(value);
}

const validUuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;

/**
 * Returns true if the provided uuid is valid.
 *
 * @param uuid - The uuid that needs to be validated.
 *
 * @internal
 */
export function isValidUuid(uuid: string): boolean {
  return validUuidRegex.test(uuid);
}

/**
 * Returns null if the raw response is empty. Otherwise returns the intended response.
 *
 * @param isNullable - whether the mapper allows nullable body
 * @param checkedForEmpty - the raw response including headers
 * @param response - the response that will be returned to the user
 * @returns the response that will return to the user which can be null
 *
 * @internal
 */
function returnNullResponse(
  isNullable: boolean,
  checkedForEmpty: unknown,
  response: unknown,
  isPrimitive: boolean = false
): unknown | null {
  return isNullable && Object.getOwnPropertyNames(checkedForEmpty).length === 0
    ? isPrimitive
      ? { body: null }
      : null
    : response;
}

/**
 * Take a `FullOperationResponse` and turn it into a flat
 * response object to hand back to the consumer.
 * @param fullResponse - The processed response from the operation request
 * @param responseSpec - The response map from the OperationSpec
 *
 * @internal
 */
export function flattenResponse(
  fullResponse: FullOperationResponse,
  responseSpec: OperationResponseMap | undefined
): unknown {
  const parsedHeaders = fullResponse.parsedHeaders;
  const bodyMapper = responseSpec && responseSpec.bodyMapper;
  const isNullable = bodyMapper?.nullable ?? false;

  if (bodyMapper) {
    const typeName = bodyMapper.type.name;
    if (typeName === "Stream") {
      return {
        ...parsedHeaders,
        blobBody: fullResponse.blobBody,
        readableStreamBody: fullResponse.readableStreamBody
      };
    }

    const modelProperties =
      (typeName === "Composite" && (bodyMapper as CompositeMapper).type.modelProperties) || {};
    const isPageableResponse = Object.keys(modelProperties).some(
      (k) => modelProperties[k].serializedName === ""
    );
    if (typeName === "Sequence" || isPageableResponse) {
      const isNull = !fullResponse.parsedBody && isNullable;
      const emptyArray = ([] as unknown) as { [key: string]: unknown };
      const arrayResponse: { [key: string]: unknown } = fullResponse.parsedBody ?? emptyArray;

      for (const key of Object.keys(modelProperties)) {
        if (modelProperties[key].serializedName) {
          arrayResponse[key] = fullResponse.parsedBody?.[key];
        }
      }

      if (parsedHeaders) {
        for (const key of Object.keys(parsedHeaders)) {
          arrayResponse[key] = parsedHeaders[key];
        }
      }
      return isNull && arrayResponse === emptyArray ? null : arrayResponse;
    }

    if (typeName === "Composite" || typeName === "Dictionary") {
      const response = {
        ...parsedHeaders,
        ...fullResponse.parsedBody
      };
      return returnNullResponse(isNullable, response, response);
    }
  }

  const response = {
    ...parsedHeaders,
    ...fullResponse.parsedBody
  };

  if (
    bodyMapper ||
    fullResponse.request.method === "HEAD" ||
    isPrimitiveType(fullResponse.parsedBody)
  ) {
    return returnNullResponse(
      isNullable,
      response,
      {
        ...parsedHeaders,
        body: fullResponse.parsedBody
      },
      true /** is primitive */
    );
  }

  return returnNullResponse(isNullable, response, response);
}
