// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EvaluationsCreateParameters,
  EvaluationsDeleteParameters,
  EvaluationsGetParameters,
  EvaluationsListParameters,
  EventsActivateParameters,
  EventsRewardParameters,
  LogDeleteParameters,
  LogGetPropertiesParameters,
  LogInteractionsParameters,
  LogObservationsParameters,
  ModelGetParameters,
  ModelGetPropertiesParameters,
  ModelImportParameters,
  ModelResetParameters,
  MultiSlotEventsActivateParameters,
  MultiSlotEventsRewardParameters,
  MultiSlotRankParameters,
  PolicyGetParameters,
  PolicyResetParameters,
  PolicyUpdateParameters,
  RankParameters,
  ServiceConfigurationApplyFromEvaluationParameters,
  ServiceConfigurationGetParameters,
  ServiceConfigurationUpdateParameters,
} from "./parameters";
import {
  EvaluationsCreate201Response,
  EvaluationsCreatedefaultResponse,
  EvaluationsDelete204Response,
  EvaluationsGet200Response,
  EvaluationsGetdefaultResponse,
  EvaluationsList200Response,
  EventsActivate204Response,
  EventsActivatedefaultResponse,
  EventsReward204Response,
  EventsRewarddefaultResponse,
  LogDelete204Response,
  LogGetProperties200Response,
  LogGetPropertiesdefaultResponse,
  LogInteractions204Response,
  LogInteractionsdefaultResponse,
  LogObservations204Response,
  LogObservationsdefaultResponse,
  ModelGet200Response,
  ModelGetProperties200Response,
  ModelGetdefaultResponse,
  ModelImport204Response,
  ModelImportdefaultResponse,
  ModelReset204Response,
  ModelResetdefaultResponse,
  MultiSlotEventsActivate204Response,
  MultiSlotEventsActivatedefaultResponse,
  MultiSlotEventsReward204Response,
  MultiSlotEventsRewarddefaultResponse,
  MultiSlotRank201Response,
  MultiSlotRankdefaultResponse,
  PolicyGet200Response,
  PolicyReset200Response,
  PolicyUpdate200Response,
  PolicyUpdatedefaultResponse,
  Rank201Response,
  RankdefaultResponse,
  ServiceConfigurationApplyFromEvaluation204Response,
  ServiceConfigurationApplyFromEvaluationdefaultResponse,
  ServiceConfigurationGet200Response,
  ServiceConfigurationUpdate200Response,
  ServiceConfigurationUpdatedefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ServiceConfigurationGet {
  /** Get the Personalizer service configuration. */
  get(
    options?: ServiceConfigurationGetParameters,
  ): StreamableMethod<ServiceConfigurationGet200Response>;
  /** Update the Personalizer service configuration. */
  put(
    options: ServiceConfigurationUpdateParameters,
  ): StreamableMethod<
    ServiceConfigurationUpdate200Response | ServiceConfigurationUpdatedefaultResponse
  >;
}

export interface ServiceConfigurationApplyFromEvaluation {
  /** Apply Learning Settings and model from a pre-existing Offline Evaluation, making them the current online Learning Settings and model and replacing the previous ones. */
  post(
    options: ServiceConfigurationApplyFromEvaluationParameters,
  ): StreamableMethod<
    | ServiceConfigurationApplyFromEvaluation204Response
    | ServiceConfigurationApplyFromEvaluationdefaultResponse
  >;
}

export interface PolicyGet {
  /** Get the Learning Settings currently used by the Personalizer service. */
  get(options?: PolicyGetParameters): StreamableMethod<PolicyGet200Response>;
  /** Update the Learning Settings that the Personalizer service will use to train models. */
  put(
    options: PolicyUpdateParameters,
  ): StreamableMethod<PolicyUpdate200Response | PolicyUpdatedefaultResponse>;
  /** Resets the learning settings of the Personalizer service to default. */
  delete(options?: PolicyResetParameters): StreamableMethod<PolicyReset200Response>;
}

export interface EvaluationsGet {
  /** Get the Offline Evaluation associated with the Id. */
  get(
    options?: EvaluationsGetParameters,
  ): StreamableMethod<EvaluationsGet200Response | EvaluationsGetdefaultResponse>;
  /** Delete the Offline Evaluation associated with the Id. */
  delete(options?: EvaluationsDeleteParameters): StreamableMethod<EvaluationsDelete204Response>;
}

export interface EvaluationsList {
  /** List of all Offline Evaluations. */
  get(options?: EvaluationsListParameters): StreamableMethod<EvaluationsList200Response>;
  /** Submit a new Offline Evaluation job. */
  post(
    options: EvaluationsCreateParameters,
  ): StreamableMethod<EvaluationsCreate201Response | EvaluationsCreatedefaultResponse>;
}

export interface EventsReward {
  /** Report reward between 0 and 1 that resulted from using the action specified in rewardActionId, for the specified event. */
  post(
    options: EventsRewardParameters,
  ): StreamableMethod<EventsReward204Response | EventsRewarddefaultResponse>;
}

export interface EventsActivate {
  /** Report that the specified event was actually used (e.g. by being displayed to the user) and a reward should be expected for it. */
  post(
    options?: EventsActivateParameters,
  ): StreamableMethod<EventsActivate204Response | EventsActivatedefaultResponse>;
}

export interface LogInteractions {
  /** The endpoint is intended to be used from within a SDK for logging interactions and accepts specific format defined in https://github.com/VowpalWabbit/reinforcement_learning. This endpoint should not be used by the customer. */
  post(
    options: LogInteractionsParameters,
  ): StreamableMethod<LogInteractions204Response | LogInteractionsdefaultResponse>;
}

export interface LogObservations {
  /** The endpoint is intended to be used from within a SDK for logging observations and accepts specific format defined in https://github.com/VowpalWabbit/reinforcement_learning. This endpoint should not be used by the customer. */
  post(
    options: LogObservationsParameters,
  ): StreamableMethod<LogObservations204Response | LogObservationsdefaultResponse>;
}

export interface LogDelete {
  /** Delete all logs of Rank and Reward calls stored by Personalizer. */
  delete(options?: LogDeleteParameters): StreamableMethod<LogDelete204Response>;
}

export interface LogGetProperties {
  /** Get properties of the Personalizer logs. */
  get(
    options?: LogGetPropertiesParameters,
  ): StreamableMethod<LogGetProperties200Response | LogGetPropertiesdefaultResponse>;
}

export interface ModelGet {
  /** Get the model file generated by Personalizer service. */
  get(
    options?: ModelGetParameters,
  ): StreamableMethod<ModelGet200Response | ModelGetdefaultResponse>;
  /** Replace the existing model file for the Personalizer service. */
  put(
    options: ModelImportParameters,
  ): StreamableMethod<ModelImport204Response | ModelImportdefaultResponse>;
  /** Resets the model file generated by Personalizer service. */
  delete(
    options?: ModelResetParameters,
  ): StreamableMethod<ModelReset204Response | ModelResetdefaultResponse>;
}

export interface ModelGetProperties {
  /** Get properties of the model file generated by Personalizer service. */
  get(options?: ModelGetPropertiesParameters): StreamableMethod<ModelGetProperties200Response>;
}

export interface MultiSlotEventsReward {
  /** Report reward that resulted from using the action specified in rewardActionId for the slot. */
  post(
    options: MultiSlotEventsRewardParameters,
  ): StreamableMethod<MultiSlotEventsReward204Response | MultiSlotEventsRewarddefaultResponse>;
}

export interface MultiSlotEventsActivate {
  /** Report that the specified event was actually used or displayed to the user and a rewards should be expected for it. */
  post(
    options?: MultiSlotEventsActivateParameters,
  ): StreamableMethod<MultiSlotEventsActivate204Response | MultiSlotEventsActivatedefaultResponse>;
}

export interface MultiSlotRank {
  /** Submit a Personalizer multi-slot rank request. Receives a context, a list of actions, and a list of slots. Returns which of the provided actions should be used in each slot, in each rewardActionId. */
  post(
    options: MultiSlotRankParameters,
  ): StreamableMethod<MultiSlotRank201Response | MultiSlotRankdefaultResponse>;
}

export interface Rank {
  /** Submit a Personalizer rank request. Receives a context and a list of actions. Returns which of the provided actions should be used by your application, in rewardActionId. */
  post(options: RankParameters): StreamableMethod<Rank201Response | RankdefaultResponse>;
}

export interface Routes {
  /** Resource for '/configurations/service' has methods for the following verbs: get, put */
  (path: "/configurations/service"): ServiceConfigurationGet;
  /** Resource for '/configurations/applyFromEvaluation' has methods for the following verbs: post */
  (path: "/configurations/applyFromEvaluation"): ServiceConfigurationApplyFromEvaluation;
  /** Resource for '/configurations/policy' has methods for the following verbs: get, put, delete */
  (path: "/configurations/policy"): PolicyGet;
  /** Resource for '/evaluations/\{evaluationId\}' has methods for the following verbs: get, delete */
  (path: "/evaluations/{evaluationId}", evaluationId: string): EvaluationsGet;
  /** Resource for '/evaluations' has methods for the following verbs: get, post */
  (path: "/evaluations"): EvaluationsList;
  /** Resource for '/events/\{eventId\}/reward' has methods for the following verbs: post */
  (path: "/events/{eventId}/reward", eventId: string): EventsReward;
  /** Resource for '/events/\{eventId\}/activate' has methods for the following verbs: post */
  (path: "/events/{eventId}/activate", eventId: string): EventsActivate;
  /** Resource for '/logs/interactions' has methods for the following verbs: post */
  (path: "/logs/interactions"): LogInteractions;
  /** Resource for '/logs/observations' has methods for the following verbs: post */
  (path: "/logs/observations"): LogObservations;
  /** Resource for '/logs' has methods for the following verbs: delete */
  (path: "/logs"): LogDelete;
  /** Resource for '/logs/properties' has methods for the following verbs: get */
  (path: "/logs/properties"): LogGetProperties;
  /** Resource for '/model' has methods for the following verbs: get, put, delete */
  (path: "/model"): ModelGet;
  /** Resource for '/model/properties' has methods for the following verbs: get */
  (path: "/model/properties"): ModelGetProperties;
  /** Resource for '/multislot/events/\{eventId\}/reward' has methods for the following verbs: post */
  (path: "/multislot/events/{eventId}/reward", eventId: string): MultiSlotEventsReward;
  /** Resource for '/multislot/events/\{eventId\}/activate' has methods for the following verbs: post */
  (path: "/multislot/events/{eventId}/activate", eventId: string): MultiSlotEventsActivate;
  /** Resource for '/multislot/rank' has methods for the following verbs: post */
  (path: "/multislot/rank"): MultiSlotRank;
  /** Resource for '/rank' has methods for the following verbs: post */
  (path: "/rank"): Rank;
}

export type PersonalizerClient = Client & {
  path: Routes;
};
