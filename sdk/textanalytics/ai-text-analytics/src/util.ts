// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse, OperationOptions } from "@azure/core-client";
import { LanguageDetectionInput, TextDocumentInput } from "./generated";
import { LroResponse } from "@azure/core-lro";
import { TextAnalysisOperationOptions } from "./models";
import { logger } from "./logger";

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

export function setSentenceCount<X extends { maxSentenceCount?: number }>(
  x: X
): X & { sentenceCount?: number } {
  return { ...x, sentenceCount: x.maxSentenceCount };
}

export function setOrderBy<X extends { orderBy?: string }>(x: X): X & { sortBy?: string } {
  return { ...x, sortBy: x.orderBy };
}

/**
 * @internal
 */
export function addParamsToTask<X extends Record<string, any>>(
  action: X
): { parameters?: Omit<X, "actionName">; taskName?: string } {
  const { actionName, ...params } = action;
  return { parameters: params, taskName: actionName };
}

/**
 * @internal
 */
export function compose<T1, T2, T3>(fn1: (x: T1) => T2, fn2: (y: T2) => T3): (x: T1) => T3 {
  return (value: T1) => fn2(fn1(value));
}

/**
 * @internal
 */
export async function getRawResponse<TOptions extends OperationOptions, TResult>(
  f: (options: TOptions) => Promise<TResult>,
  options: TOptions
): Promise<LroResponse<TResult>> {
  const { onResponse } = options || {};
  let rawResponse: FullOperationResponse | undefined = undefined;
  const flatResponse = await f({
    ...options,
    onResponse: (response: FullOperationResponse, flatResponseParam: unknown) => {
      rawResponse = response;
      onResponse?.(response, flatResponseParam);
    },
  });
  return {
    flatResponse,
    rawResponse: {
      statusCode: rawResponse!.status,
      headers: rawResponse!.headers.toJSON(),
      body: rawResponse!.parsedBody,
    },
  };
}

/**
 * @internal
 */
export function isStringArray(documents: any[]): documents is string[] {
  return typeof documents[0] === "string";
}

/**
 * @internal
 */
export function convertToTextDocumentInput(
  inputs: string[],
  language?: string
): TextDocumentInput[] {
  return inputs.map((text: string, index): TextDocumentInput => {
    return {
      id: String(index),
      language,
      text,
    };
  });
}

/**
 * @internal
 */
export function convertToLanguageDetectionInput(
  inputs: string[],
  countryHint?: string
): LanguageDetectionInput[] {
  return inputs.map((text: string, index): LanguageDetectionInput => {
    return {
      id: String(index),
      countryHint,
      text,
    };
  });
}

/**
 * @internal
 */
export function getOperationOptions<OptionsT extends TextAnalysisOperationOptions>(
  options: OptionsT
): {
  options: TextAnalysisOperationOptions;
  rest: Omit<
    OptionsT,
    | "onResponse"
    | "abortSignal"
    | "apiVersion"
    | "includeStatistics"
    | "requestOptions"
    | "serializerOptions"
    | "tracingOptions"
  >;
} {
  const {
    abortSignal,
    apiVersion,
    includeStatistics,
    onResponse,
    requestOptions,
    serializerOptions,
    tracingOptions,
    ...rest
  } = options;
  return {
    options: {
      abortSignal,
      apiVersion,
      includeStatistics,
      onResponse,
      requestOptions,
      serializerOptions,
      tracingOptions,
    },
    rest,
  };
}
