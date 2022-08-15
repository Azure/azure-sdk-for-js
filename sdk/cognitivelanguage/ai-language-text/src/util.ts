// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LanguageDetectionInput, TextDocumentInput } from "./generated";
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
export function sortResponseIdObjects<U extends IdObject>(
  sortedArray: IdObject[],
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
  /**
   * When the results are returned in pages, sortedArray will probably have more
   * items than unsortedArray so it is ok to ignore the case when a sorted item
   * ID is not found in `unsortedMap`.
   */
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
 * @internal
 */
export function isStringArray(documents: unknown[]): documents is string[] {
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
