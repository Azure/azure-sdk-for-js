// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import {
  AnalyzeOperationResult as AnalyzeOperationResultModel,
  ErrorInformation,
  OperationStatus
} from "./generated/models";
import { RecognizedForm, FormPage } from "./models";

/**
 * Represents the result from an Recognize Content operation
 */
export interface RecognizedContent {
  /**
   * Version of schema used for this result.
   */
  version?: string;
  /**
   * Texts and tables extracted from a page in the input
   */
  pages?: FormPage[];
  /**
   * Operation status.
   */
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  /**
   * Date and time (UTC) when the recognition operation was submitted.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastModified: Date;
  /**
   * List of errors reported during the content recognition operation.
   */
  errors?: ErrorInformation[];
}

/**
 * Contains response data for the Recognize Content operation.
 */
export type RecognizeContentResultResponse = RecognizedContent & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnalyzeOperationResultModel;
  };
};

/**
 * Represents the result from an recognize form operation using a custom model from training.
 */
export interface RecognizedForms {
  /**
   * Version of schema used for this result.
   */
  version?: string;
  /**
   * Document-level information recognized from the input using machine learning. They include
   * recognized fields that have meaning beyond text, for example, addresses, phone numbers, dates, etc.
   */
  forms?: RecognizedForm[];
  /**
   * List of errors reported during the form recognition operation.
   */
  errors?: ErrorInformation[];
  /**
   * Operation status.
   */
  status: OperationStatus;
  /**
   * Date and time (UTC) when the form recognition operation was submitted.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastModified: Date;
}

/**
 * Contains the response data for recognize form operation using a custom model from training.
 */
export type RecognizeFormResultResponse = RecognizedForms & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnalyzeOperationResultModel;
  };
};
