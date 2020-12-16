// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-http";
import { URL, URLSearchParams } from "./utils/url";
import { StringIndexType, StringIndexTypeResponse } from "./generated/models";
import { logger } from "./logger";

export interface IdObject {
  id: string;
}

/**
 * Given a sorted array of input objects (with a unique ID) and an unsorted array of results,
 * return a sorted array of results.
 *
 * @internal
 * @hidden
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

export interface OpinionIndex {
  document: number;
  sentence: number;
  opinion: number;
}

export function findOpinionIndex(pointer: string): OpinionIndex {
  const regex = new RegExp(/#\/documents\/(\d+)\/sentences\/(\d+)\/opinions\/(\d+)/);
  const res = regex.exec(pointer);
  if (res !== null) {
    const opinionIndex: OpinionIndex = {
      document: parseInt(res[1]),
      sentence: parseInt(res[2]),
      opinion: parseInt(res[3])
    };
    return opinionIndex;
  } else {
    throw new Error(`Pointer "${pointer}" is not a valid opinion pointer`);
  }
}

const jsEncodingUnit = "Utf16CodeUnit";

export function addStrEncodingParam<T>(options: T): T & { stringIndexType: StringIndexType } {
  return { ...options, stringIndexType: jsEncodingUnit };
}

export function addEncodingParamToTask<X>(
  task: X & { stringIndexType?: StringIndexTypeResponse }
): X & { stringIndexType?: StringIndexTypeResponse } {
  task.stringIndexType = jsEncodingUnit;
  return task;
}

export function AddParamsToTask<X>(task: X): { parameters?: X } {
  return { parameters: task };
}

export interface PageParam {
  top: number;
  skip: number;
}

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

export function getJobID(operationLocation: string): string {
  const lastSlashIndex = operationLocation.lastIndexOf("/");
  return operationLocation.substring(lastSlashIndex + 1);
}

/**
 * @internal
 * @hidden
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
      ? new RestError(innerMessage, innerCode, castError.statusCode)
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
