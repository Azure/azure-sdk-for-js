// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";
import { URL, URLSearchParams } from "./utils/url";
import { logger } from "./logger";
import {
  ErrorResponse,
  StringIndexType as GeneratedStringIndexType,
  InnerError,
  TextAnalyticsError,
} from "./generated";
import { TextAnalyticsAction } from "./textAnalyticsAction";

/**
 * @internal
 */
interface IdObject {
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
      assessment: parseInt(res[3]),
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
export type StringIndexType = "TextElement_v8" | "UnicodeCodePoint" | "Utf16CodeUnit";

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

export function setStrEncodingParamValue(
  stringIndexType?: GeneratedStringIndexType
): GeneratedStringIndexType {
  return stringIndexType || jsEncodingUnit;
}

/**
 * Set the opinion mining property
 * @internal
 */
export function setOpinionMining<X extends { includeOpinionMining?: boolean }>(
  x: X
): X & { opinionMining?: boolean } {
  return { ...x, opinionMining: x.includeOpinionMining };
}

/**
 * Set the pii categories property
 * @internal
 */
export function setCategoriesFilter<X extends { categoriesFilter?: string[] }>(
  x: X
): X & { piiCategories?: string[] } {
  return { ...x, piiCategories: x.categoriesFilter };
}

/**
 * @internal
 */
export function addParamsToTask<X extends TextAnalyticsAction>(
  action: X
): { parameters?: Omit<X, "actionName">; taskName?: string } {
  const { actionName, ...params } = action;
  return { parameters: params, taskName: actionName };
}

/**
 * @internal
 */
interface PageParam {
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
    top: top,
  };
}

/**
 * @internal
 */
export function getOperationId(operationLocation: string): string {
  const lastSlashIndex = operationLocation.lastIndexOf("/");
  return operationLocation.substring(lastSlashIndex + 1);
}

function appendReadableErrorMessage(currentMessage: string, innerMessage: string): string {
  let message = currentMessage;
  if (message.slice(-1) !== ".") {
    message = message + ".";
  }
  return message + " " + innerMessage;
}

/**
 * @internal
 * parses incoming errors from the service/
 * @param error - the incoming error
 */
function transformError(errorResponse: unknown): any {
  const strongErrorResponse = errorResponse as {
    response: {
      parsedBody?: ErrorResponse;
    };
    statusCode: number;
  };
  if (!strongErrorResponse.response) {
    throw errorResponse;
  }
  const topLevelError = strongErrorResponse.response.parsedBody?.error;
  if (!topLevelError) return errorResponse;
  let errorMessage = topLevelError.message;
  let code = topLevelError.code;
  function unwrap(error: TextAnalyticsError | InnerError): TextAnalyticsError {
    const innerError = error.innererror;
    if (innerError) {
      if (innerError.message) {
        errorMessage = appendReadableErrorMessage(errorMessage, innerError.message);
      }
      if (innerError.code) {
        code = innerError.code;
      }
      return unwrap(innerError);
    }
    return error as TextAnalyticsError;
  }
  unwrap(topLevelError);
  return new RestError(errorMessage, {
    code: code === "InvalidDocumentBatch" ? code : topLevelError.code,
    statusCode: strongErrorResponse.statusCode,
  });
}

export async function throwError<T>(p: Promise<T>): Promise<T> {
  try {
    return await p;
  } catch (e: unknown) {
    throw transformError(e);
  }
}

/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @internal
 * @param timeInMs - The number of milliseconds to be delayed.
 * @returns Resolved promise
 */
export function delay(timeInMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), timeInMs));
}

/**
 * @internal
 */
export function compose<T1, T2, T3>(fn1: (x: T1) => T2, fn2: (y: T2) => T3): (x: T1) => T3 {
  return (value: T1) => fn2(fn1(value));
}
