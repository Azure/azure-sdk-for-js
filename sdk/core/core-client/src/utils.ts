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
 * Representation of parsed response headers and body coupled with information
 * about how to map them:
 * - whether the response body should be wrapped (typically if its type is primitive).
 * - whether the response is nullable so it can be null if the combination of
 *   the headers and the body is empty.
 */
interface ResponseObjectWithMetadata {
  /** whether the mapper allows nullable body */
  hasNullableType: boolean;
  /** whether the type of the response body is primitive */
  shouldWrapBody: boolean;
  /** parsed headers of the response */
  headers:
    | {
        [key: string]: unknown;
      }
    | undefined;
  /** parsed body of the response */
  body: any;
}

/**
 * Maps the response as follows:
 * - wraps the response body if needed (typically if its type is primitive).
 * - returns null if the combination of the headers and the body is empty.
 * - otherwise, returns the combination of the headers and the body.
 *
 * @param responseObject - a representation of the parsed response
 * @returns the response that will be returned to the user which can be null and/or wrapped
 *
 * @internal
 */
function handleNullableResponseAndWrappableBody(
  responseObject: ResponseObjectWithMetadata
): unknown | null {
  const combinedHeadersAndBody = {
    ...responseObject.headers,
    ...responseObject.body
  };
  return responseObject.hasNullableType &&
    Object.getOwnPropertyNames(combinedHeadersAndBody).length === 0
    ? responseObject.shouldWrapBody
      ? { body: null }
      : null
    : responseObject.shouldWrapBody
    ? {
        ...responseObject.headers,
        body: responseObject.body
      }
    : combinedHeadersAndBody;
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

  /**
   * If body is not asked for, we return the response headers only. If the response
   * has a body anyway, that body must be ignored.
   */
  if (fullResponse.request.method === "HEAD") {
    return parsedHeaders;
  }

  const bodyMapper = responseSpec && responseSpec.bodyMapper;
  const isNullable = bodyMapper?.nullable ?? false;

  /** If the body is asked for, we look at the mapper to handle it */
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
      return !fullResponse.parsedBody && isNullable && arrayResponse === emptyArray
        ? null
        : arrayResponse;
    }

    if (typeName === "Composite" || typeName === "Dictionary") {
      return handleNullableResponseAndWrappableBody({
        body: fullResponse.parsedBody,
        headers: parsedHeaders,
        hasNullableType: isNullable,
        shouldWrapBody: false
      });
    }
  }

  if (isPrimitiveType(fullResponse.parsedBody)) {
    return handleNullableResponseAndWrappableBody({
      body: fullResponse.parsedBody,
      headers: parsedHeaders,
      hasNullableType: isNullable,
      shouldWrapBody: true
    });
  }

  return handleNullableResponseAndWrappableBody({
    body: fullResponse.parsedBody,
    headers: parsedHeaders,
    hasNullableType: isNullable,
    shouldWrapBody: false
  });
}
