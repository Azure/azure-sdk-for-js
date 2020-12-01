// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  HealthcareEntity,
  HealthcareRelation,
  TextDocumentBatchStatistics
} from "./generated/models";
import { TextAnalyticsErrorResult, TextAnalyticsSuccessResult } from "./textAnalyticsResult";

/**
 * The results of a successful healthcare job for a single document.
 */
export interface HealthcareSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Healthcare entities.
   */
  entities: HealthcareEntity[];
  /**
   * Healthcare entity relations.
   */
  relations: HealthcareRelation[];
}

/**
 * An error result from the healthcare operation on a single document.
 */
export type HealthcareErrorResult = TextAnalyticsErrorResult;

/**
 * The result of the healthcare operation on a single document.
 */
export type HealthcareResult = HealthcareSuccessResult | HealthcareErrorResult;

/**
 * Array of {@link HealthcareResult}
 */
export interface HealthcareEntitiesArray extends Array<HealthcareResult> {}

/**
 * The results of a healthcare job represented as a paginated iterator that can
 * either iterate over the results on a document-by-document basis or, by
 * byPage(), can iterate over pages of documents.
 */
export type PagedAsyncIterableHealthEntities = PagedAsyncIterableIterator<
  HealthcareResult,
  HealthcareEntitiesArray
>;

/**
 * The results of a healthcare job represented as a paginated iterator that can
 * either iterate over the results on a document-by-document basis or, by
 * byPage(), can iterate over pages of documents.
 */
export interface PaginatedHealthcareEntities extends PagedAsyncIterableHealthEntities {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion: string;
}
