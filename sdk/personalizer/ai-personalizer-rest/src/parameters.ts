// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  EvaluationContract,
  MultiSlotRankRequest,
  MultiSlotRewardRequest,
  PolicyContract,
  PolicyReferenceContract,
  RankRequest,
  RewardRequest,
  ServiceConfiguration,
} from "./models";

export type ServiceConfigurationGetParameters = RequestParameters;

export interface ServiceConfigurationUpdateBodyParam {
  /** The personalizer service configuration. */
  body: ServiceConfiguration;
}

export interface ServiceConfigurationUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ServiceConfigurationUpdateParameters = ServiceConfigurationUpdateMediaTypesParam &
  ServiceConfigurationUpdateBodyParam &
  RequestParameters;

export interface ServiceConfigurationApplyFromEvaluationBodyParam {
  /** Reference to the policy within the evaluation. */
  body: PolicyReferenceContract;
}

export interface ServiceConfigurationApplyFromEvaluationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ServiceConfigurationApplyFromEvaluationParameters =
  ServiceConfigurationApplyFromEvaluationMediaTypesParam &
    ServiceConfigurationApplyFromEvaluationBodyParam &
    RequestParameters;
export type PolicyGetParameters = RequestParameters;

export interface PolicyUpdateBodyParam {
  /** The learning settings. */
  body: PolicyContract;
}

export interface PolicyUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PolicyUpdateParameters = PolicyUpdateMediaTypesParam &
  PolicyUpdateBodyParam &
  RequestParameters;
export type PolicyResetParameters = RequestParameters;
export type EvaluationsGetParameters = RequestParameters;
export type EvaluationsDeleteParameters = RequestParameters;
export type EvaluationsListParameters = RequestParameters;

export interface EvaluationsCreateBodyParam {
  /** The Offline Evaluation job definition. */
  body: EvaluationContract;
}

export interface EvaluationsCreateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EvaluationsCreateParameters = EvaluationsCreateMediaTypesParam &
  EvaluationsCreateBodyParam &
  RequestParameters;

export interface EventsRewardBodyParam {
  /** The reward should be a floating point number, typically between 0 and 1. */
  body: RewardRequest;
}

export interface EventsRewardMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EventsRewardParameters = EventsRewardMediaTypesParam &
  EventsRewardBodyParam &
  RequestParameters;
export type EventsActivateParameters = RequestParameters;

export interface LogInteractionsBodyParam {
  /**
   * Interactions binary payload.
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface LogInteractionsMediaTypesParam {
  /** Request content type */
  contentType?: "application/octet-stream";
}

export type LogInteractionsParameters = LogInteractionsMediaTypesParam &
  LogInteractionsBodyParam &
  RequestParameters;

export interface LogObservationsBodyParam {
  /**
   * Observations binary payload.
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface LogObservationsMediaTypesParam {
  /** Request content type */
  contentType?: "application/octet-stream";
}

export type LogObservationsParameters = LogObservationsMediaTypesParam &
  LogObservationsBodyParam &
  RequestParameters;
export type LogDeleteParameters = RequestParameters;
export type LogGetPropertiesParameters = RequestParameters;

export interface ModelGetQueryParamProperties {
  /** True if requesting signed model zip archive, false otherwise. */
  signed?: boolean;
}

export interface ModelGetQueryParam {
  queryParameters?: ModelGetQueryParamProperties;
}

export type ModelGetParameters = ModelGetQueryParam & RequestParameters;

export interface ModelImportBodyParam {
  /**
   * The digitally signed model file obtained from getting the model.
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface ModelImportMediaTypesParam {
  /** Request content type */
  contentType?: "application/octet-stream";
}

export type ModelImportParameters = ModelImportMediaTypesParam &
  ModelImportBodyParam &
  RequestParameters;
export type ModelResetParameters = RequestParameters;
export type ModelGetPropertiesParameters = RequestParameters;

export interface MultiSlotEventsRewardBodyParam {
  /** List of slot id and reward values. The reward should be a floating point number, typically between 0 and 1. */
  body: MultiSlotRewardRequest;
}

export interface MultiSlotEventsRewardMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MultiSlotEventsRewardParameters = MultiSlotEventsRewardMediaTypesParam &
  MultiSlotEventsRewardBodyParam &
  RequestParameters;
export type MultiSlotEventsActivateParameters = RequestParameters;

export interface MultiSlotRankBodyParam {
  /** A Personalizer multi-slot Rank request. */
  body: MultiSlotRankRequest;
}

export interface MultiSlotRankMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MultiSlotRankParameters = MultiSlotRankMediaTypesParam &
  MultiSlotRankBodyParam &
  RequestParameters;

export interface RankBodyParam {
  /** A Personalizer Rank request. */
  body: RankRequest;
}

export interface RankMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RankParameters = RankMediaTypesParam & RankBodyParam & RequestParameters;
