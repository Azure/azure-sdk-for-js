// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";
import { FullOperationResponse, OperationOptions, OperationSpec } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";
import { logger } from "./logger";
import {
  ErrorResponse,
  GeneratedClient,
  InnerError,
  StringIndexType as GeneratedStringIndexType,
  TextAnalyticsError
} from "./generated";
import { TextAnalyticsAction } from "./textAnalyticsAction";
import { createSpan } from "./tracing";
import { LroResponse } from "@azure/core-lro";

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
export function addParamsToTask<X extends TextAnalyticsAction>(
  action: X
): { parameters?: Omit<X, "actionName">; taskName?: string } {
  const { actionName, ...params } = action;
  return { parameters: params, taskName: actionName };
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
 * parses incoming errors from the service and if the inner error code is
 * InvalidDocumentBatch, it exposes that as the statusCode instead.
 * @param error - the incoming error
 */
export function compileError(errorResponse: unknown): any {
  const castErrorResponse = errorResponse as {
    response: {
      parsedBody?: ErrorResponse;
    };
    statusCode: number;
  };
  const topLevelError = castErrorResponse.response.parsedBody?.error;
  if (!topLevelError) return errorResponse;
  let errorMessage = topLevelError.message || "";
  let invalidDocumentBatchCode = false;
  function unwrap(error: TextAnalyticsError | InnerError): TextAnalyticsError {
    if (error?.innererror !== undefined && error.innererror.message !== undefined) {
      if (error.innererror.code === "InvalidDocumentBatch") {
        invalidDocumentBatchCode = true;
      }
      errorMessage = appendReadableErrorMessage(errorMessage, error.innererror.message);
      return unwrap(error.innererror);
    }
    return error as TextAnalyticsError;
  }
  unwrap(topLevelError);
  return new RestError(errorMessage, {
    code: invalidDocumentBatchCode ? "InvalidDocumentBatch" : topLevelError.code,
    statusCode: castErrorResponse.statusCode
  });
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
    }
  });
  return {
    flatResponse,
    rawResponse: {
      statusCode: rawResponse!.status,
      headers: rawResponse!.headers.toJSON(),
      body: rawResponse!.parsedBody
    }
  };
}

/**
 * @internal
 */
export async function sendGetRequest<TOptions extends OperationOptions>(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  client: GeneratedClient,
  spec: OperationSpec,
  spanStr: string,
  options: TOptions,
  path: string
): Promise<LroResponse<unknown>> {
  const { span, updatedOptions: finalOptions } = createSpan(
    `TextAnalyticsClient-${spanStr}`,
    options
  );
  try {
    const { flatResponse, rawResponse } = await getRawResponse(
      (paramOptions) =>
        client.sendOperationRequest(
          { options: paramOptions },
          {
            ...spec,
            path,
            httpMethod: "GET"
          }
        ),
      finalOptions
    );
    return {
      flatResponse: flatResponse,
      rawResponse
    };
  } catch (e) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message
    });
    throw e;
  } finally {
    span.end();
  }
}
