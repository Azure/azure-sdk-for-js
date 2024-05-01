// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  ErrorResponseOutput,
  EvaluationOutput,
  LogsPropertiesOutput,
  ModelPropertiesOutput,
  MultiSlotRankResponseOutput,
  PolicyContractOutput,
  RankResponseOutput,
  ServiceConfigurationOutput,
} from "./outputModels";

/** Get the Personalizer service configuration. */
export interface ServiceConfigurationGet200Response extends HttpResponse {
  status: "200";
  body: ServiceConfigurationOutput;
}

/** Update the Personalizer service configuration. */
export interface ServiceConfigurationUpdate200Response extends HttpResponse {
  status: "200";
  body: ServiceConfigurationOutput;
}

/** Update the Personalizer service configuration. */
export interface ServiceConfigurationUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Apply Learning Settings and model from a pre-existing Offline Evaluation, making them the current online Learning Settings and model and replacing the previous ones. */
export interface ServiceConfigurationApplyFromEvaluation204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Apply Learning Settings and model from a pre-existing Offline Evaluation, making them the current online Learning Settings and model and replacing the previous ones. */
export interface ServiceConfigurationApplyFromEvaluationdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get the Learning Settings currently used by the Personalizer service. */
export interface PolicyGet200Response extends HttpResponse {
  status: "200";
  body: PolicyContractOutput;
}

/** Update the Learning Settings that the Personalizer service will use to train models. */
export interface PolicyUpdate200Response extends HttpResponse {
  status: "200";
  body: PolicyContractOutput;
}

/** Update the Learning Settings that the Personalizer service will use to train models. */
export interface PolicyUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resets the learning settings of the Personalizer service to default. */
export interface PolicyReset200Response extends HttpResponse {
  status: "200";
  body: PolicyContractOutput;
}

/** Get the Offline Evaluation associated with the Id. */
export interface EvaluationsGet200Response extends HttpResponse {
  status: "200";
  body: EvaluationOutput;
}

/** Get the Offline Evaluation associated with the Id. */
export interface EvaluationsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Delete the Offline Evaluation associated with the Id. */
export interface EvaluationsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** List of all Offline Evaluations. */
export interface EvaluationsList200Response extends HttpResponse {
  status: "200";
  body: Array<EvaluationOutput>;
}

export interface EvaluationsCreate201Headers {
  /** Location of the Offline Evaluation status and data. */
  location?: string;
}

/** Submit a new Offline Evaluation job. */
export interface EvaluationsCreate201Response extends HttpResponse {
  status: "201";
  body: EvaluationOutput;
  headers: RawHttpHeaders & EvaluationsCreate201Headers;
}

/** Submit a new Offline Evaluation job. */
export interface EvaluationsCreatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Report reward between 0 and 1 that resulted from using the action specified in rewardActionId, for the specified event. */
export interface EventsReward204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Report reward between 0 and 1 that resulted from using the action specified in rewardActionId, for the specified event. */
export interface EventsRewarddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Report that the specified event was actually used (e.g. by being displayed to the user) and a reward should be expected for it. */
export interface EventsActivate204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Report that the specified event was actually used (e.g. by being displayed to the user) and a reward should be expected for it. */
export interface EventsActivatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The endpoint is intended to be used from within a SDK for logging interactions and accepts specific format defined in https://github.com/VowpalWabbit/reinforcement_learning. This endpoint should not be used by the customer. */
export interface LogInteractions204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The endpoint is intended to be used from within a SDK for logging interactions and accepts specific format defined in https://github.com/VowpalWabbit/reinforcement_learning. This endpoint should not be used by the customer. */
export interface LogInteractionsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The endpoint is intended to be used from within a SDK for logging observations and accepts specific format defined in https://github.com/VowpalWabbit/reinforcement_learning. This endpoint should not be used by the customer. */
export interface LogObservations204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The endpoint is intended to be used from within a SDK for logging observations and accepts specific format defined in https://github.com/VowpalWabbit/reinforcement_learning. This endpoint should not be used by the customer. */
export interface LogObservationsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Delete all logs of Rank and Reward calls stored by Personalizer. */
export interface LogDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Get properties of the Personalizer logs. */
export interface LogGetProperties200Response extends HttpResponse {
  status: "200";
  body: LogsPropertiesOutput;
}

/** Get properties of the Personalizer logs. */
export interface LogGetPropertiesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get the model file generated by Personalizer service. */
export interface ModelGet200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Get the model file generated by Personalizer service. */
export interface ModelGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Replace the existing model file for the Personalizer service. */
export interface ModelImport204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Replace the existing model file for the Personalizer service. */
export interface ModelImportdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resets the model file generated by Personalizer service. */
export interface ModelReset204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Resets the model file generated by Personalizer service. */
export interface ModelResetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get properties of the model file generated by Personalizer service. */
export interface ModelGetProperties200Response extends HttpResponse {
  status: "200";
  body: ModelPropertiesOutput;
}

/** Report reward that resulted from using the action specified in rewardActionId for the slot. */
export interface MultiSlotEventsReward204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Report reward that resulted from using the action specified in rewardActionId for the slot. */
export interface MultiSlotEventsRewarddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Report that the specified event was actually used or displayed to the user and a rewards should be expected for it. */
export interface MultiSlotEventsActivate204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Report that the specified event was actually used or displayed to the user and a rewards should be expected for it. */
export interface MultiSlotEventsActivatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Submit a Personalizer multi-slot rank request. Receives a context, a list of actions, and a list of slots. Returns which of the provided actions should be used in each slot, in each rewardActionId. */
export interface MultiSlotRank201Response extends HttpResponse {
  status: "201";
  body: MultiSlotRankResponseOutput;
}

/** Submit a Personalizer multi-slot rank request. Receives a context, a list of actions, and a list of slots. Returns which of the provided actions should be used in each slot, in each rewardActionId. */
export interface MultiSlotRankdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Submit a Personalizer rank request. Receives a context and a list of actions. Returns which of the provided actions should be used by your application, in rewardActionId. */
export interface Rank201Response extends HttpResponse {
  status: "201";
  body: RankResponseOutput;
}

/** Submit a Personalizer rank request. Receives a context and a list of actions. Returns which of the provided actions should be used by your application, in rewardActionId. */
export interface RankdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
