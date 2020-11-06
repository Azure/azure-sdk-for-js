// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-http";
import { StringIndexType } from "./generated/models";
import { logger } from "./logger";

export interface IdObject {
  id: string;
}

/**
 * Given a sorted array of input objects (with a unique ID) and an unsorted array of results,
 * return a sorted array of results.
 *
 * @ignore
 * @param sortedArray An array of entries sorted by `id`
 * @param unsortedArray An array of entries that contain `id` but are not sorted
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

  let result: U[] = [];
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

export function addEncodingParamToTask<X, Y>(
  task: X & { parameters?: Y & { stringIndexType?: StringIndexType } }
): X & { parameters?: Y & { stringIndexType?: StringIndexType } } {
  if (task.parameters) {
    task.parameters.stringIndexType = jsEncodingUnit;
  }
  return task;
}

export interface PageParam {
  top: number;
  skip: number;
}

function findParamValue(matches: RegExpMatchArray, param: string): number {
  for (let i = 0; i < matches.length; i += 2) {
    if (matches[i] === `\$${param}`) {
      return parseInt(matches[i + 1]);
    }
  }
  throw new Error(`The parameter \$${param} was not found in nextLink`);
}

export function nextLinkToTopAndSkip(nextLink: string): PageParam {
  let regExp = /(?:\?|\&)([^=]+)\=([^\&]+)/g,
    match,
    matches: string[] = [];
  while ((match = regExp.exec(nextLink))) {
    matches.push(match[1], match[2]);
  }
  if (matches) {
    return {
      skip: findParamValue(matches, "skip"),
      top: findParamValue(matches, "top")
    };
  } else {
    throw new Error(`Malformed URL or a URL without parameters found`);
  }
}

export function getJobID(operationLocation: string): string {
  const lastSlashIndex = operationLocation.lastIndexOf("/");
  return operationLocation.substring(lastSlashIndex + 1);
}

/**
 * parses incoming errors from the service and if the inner error code is
 * InvalidDocumentBatch, it exposes that as the statusCode instead.
 * @param error the incoming error
 */
export function handleInvalidDocumentBatch(error: any) {
  const innerCode = error.response?.parsedBody?.error?.innererror?.code;
  const innerMessage = error.response?.parsedBody?.error?.innererror?.message;
  return innerCode === "InvalidDocumentBatch"
    ? new RestError(innerMessage, innerCode, error.statusCode)
    : error;
}
