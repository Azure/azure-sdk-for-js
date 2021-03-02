// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-https";
import { URL, URLSearchParams } from "./utils/url";
import { logger } from "./logger";
import { StringIndexType as GeneratedStringIndexType } from "./generated";

/**
 * @internal
 */
export interface IdObject {
  id: string;
}

/**
 * Given a sorted array of input objects (with a unique ID) and an unsorted array of results,
 * return a sorted array of results.
 *
 * @internal
 * @param sortedArray - An array of entries sorted by `id`
 * @param unsortedArray - An array of entries that contain `id` but are not sorted
 */
export function sortResponseIdObjects<T extends IdObject, U extends IdObject>(
  sortedArray: T[],
  unsortedArray: U[]
): U[] {
  const unsortedMap = new Map<string, U>();
  for (const item of unsortedArray) {
    unsortedMap.set(item.id, item);
  }

  if (unsortedArray.length !== sortedArray.length) {
    const ordinal = unsortedArray.length > sortedArray.length ? "more" : "fewer";
    logger.warning(
      `The service returned ${ordinal} responses than inputs. Some errors may be treated as fatal.`
    );
  }

  const result: U[] = [];
  for (const sortedItem of sortedArray) {
    const item = unsortedMap.get(sortedItem.id);
    if (item) {
      result.push(item);
    }
  }
  return result;
}

/**
 * @internal
 */
export interface AssessmentIndex {
  document: number;
  sentence: number;
  assessment: number;
}

/**
 * @internal
 */
export function parseAssessmentIndex(pointer: string): AssessmentIndex {
  const regex = new RegExp(/#\/documents\/(\d+)\/sentences\/(\d+)\/assessments\/(\d+)/);
  const res = regex.exec(pointer);
  if (res !== null) {
    const assessmentIndex: AssessmentIndex = {
      document: parseInt(res[1]),
      sentence: parseInt(res[2]),
      assessment: parseInt(res[3])
    };
    return assessmentIndex;
  } else {
    throw new Error(`Pointer "${pointer}" is not a valid Assessment pointer`);
  }
}

/**
 * Parses the index of the healthcare entity from a JSON pointer.
 * @param pointer - a JSON pointer representing an entity
 * @internal
 */
export function parseHealthcareEntityIndex(pointer: string): number {
  const regex = new RegExp(/#\/results\/documents\/(\d+)\/entities\/(\d+)/);
  const res = regex.exec(pointer);
  if (res !== null) {
    return parseInt(res[2]);
  } else {
    throw new Error(`Pointer "${pointer}" is not a valid healthcare entity pointer`);
  }
}

const jsEncodingUnit = "Utf16CodeUnit";

/**
 * Measurement units that can used to calculate the offset and length properties.
 */
export type StringIndexType = "TextElements_v8" | "UnicodeCodePoint" | "Utf16CodeUnit";

/**
 * @internal
 */
export function addStrEncodingParam<Options extends { stringIndexType?: StringIndexType }>(
  options: Options
): Options & { stringIndexType: StringIndexType } {
  return { ...options, stringIndexType: options.stringIndexType || jsEncodingUnit };
}

/**
 * Set the stringIndexType property with default if it does not exist in x.
 * @param options - operation options bag that has a {@link StringIndexType}
 * @internal
 */
export function setStrEncodingParam<X extends { stringIndexType?: GeneratedStringIndexType }>(
  x: X
): X & { stringIndexType: GeneratedStringIndexType } {
  return { ...x, stringIndexType: x.stringIndexType || jsEncodingUnit };
}

/**
 * @internal
 */
export function AddParamsToTask<X>(action: X): { parameters?: X } {
  return { parameters: action };
}

/**
 * @internal
 */
export interface PageParam {
  top: number;
  skip: number;
}

/**
 * @internal
 */
export function nextLinkToTopAndSkip(nextLink: string): PageParam {
  const url = new URL(nextLink);
  const searchParams = new URLSearchParams(url.searchParams);
  let top: number;
  if (searchParams.has("$top")) {
    top = parseInt(searchParams.get("$top")!);
  } else {
    throw new Error(`nextLink URL does not have the $top param: ${nextLink}`);
  }
  let skip: number;
  if (searchParams.has("$skip")) {
    skip = parseInt(searchParams.get("$skip")!);
  } else {
    throw new Error(`nextLink URL does not have the $skip param: ${nextLink}`);
  }
  return {
    skip: skip,
    top: top
  };
}

/**
 * @internal
 */
export function getOperationId(operationLocation: string): string {
  const lastSlashIndex = operationLocation.lastIndexOf("/");
  return operationLocation.substring(lastSlashIndex + 1);
}

/**
 * @internal
 * parses incoming errors from the service and if the inner error code is
 * InvalidDocumentBatch, it exposes that as the statusCode instead.
 * @param error - the incoming error
 */
export function handleInvalidDocumentBatch(error: unknown): any {
  const castError = error as {
    response: {
      parsedBody?: {
        error?: {
          innererror?: {
            code: string;
            message: string;
          };
        };
      };
    };
    statusCode: number;
  };
  const innerCode = castError.response?.parsedBody?.error?.innererror?.code;
  const innerMessage = castError.response?.parsedBody?.error?.innererror?.message;
  if (innerMessage) {
    return innerCode === "InvalidDocumentBatch"
      ? new RestError(innerMessage, { code: innerCode, statusCode: castError.statusCode })
      : error;
  } else {
    // unfortunately, the service currently does not follow the swagger definition
    // for errors in some cases.
    // Issue: https://msazure.visualstudio.com/Cognitive%20Services/_workitems/edit/8775003/?workitem=8972164
    // throw new Error(
    //   `The error coming from the service does not follow the expected structure: ${error}`
    // );
    logger.warning(
      `The error coming from the service does not follow the expected structure: ${error}`
    );
    return error;
  }
}
