// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ServiceConfiguration {
  /**
   * The time span waited until a request is marked with the default reward
   * and should be between 5 seconds and 2 days.
   * For example, PT5M (5 mins). For information about the time format,
   * see http://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  rewardWaitTime: string;
  /** The reward given if a reward is not received within the specified wait time. */
  defaultReward: number;
  /** The function used to process rewards, if multiple reward scores are received before rewardWaitTime is over. */
  rewardAggregation: string;
  /** The percentage of rank responses that will use exploration. */
  explorationPercentage: number;
  /**
   * Personalizer will start using the most updated trained model for online ranks automatically every specified time period.
   * For example, PT5M (5 mins). For information about the time format,
   * see http://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  modelExportFrequency: string;
  /** Flag indicates whether log mirroring is enabled. */
  logMirrorEnabled?: boolean;
  /** Azure storage account container SAS URI for log mirroring. */
  logMirrorSasUri?: string;
  /** Number of days historical logs are to be maintained. -1 implies the logs will never be deleted. */
  logRetentionDays: number;
  /** Last time model training configuration was updated */
  lastConfigurationEditDate?: Date | string;
  /** Learning Modes for Personalizer */
  learningMode?: "Online" | "Apprentice" | "LoggingOnly";
  /** Flag indicating whether Personalizer will automatically optimize Learning Settings by running Offline Evaluations periodically. */
  isAutoOptimizationEnabled?: boolean;
  /**
   * Frequency of automatic optimization. Only relevant if IsAutoOptimizationEnabled is true.
   * For example, PT5M (5 mins). For information about the time format,
   * \r\nsee http://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  autoOptimizationFrequency?: string;
  /** Date when the first automatic optimization evaluation must be performed. Only relevant if IsAutoOptimizationEnabled is true. */
  autoOptimizationStartDate?: Date | string;
}

export interface PolicyContract {
  /** Name of the learning settings. */
  name: string;
  /** Arguments of the learning settings. */
  arguments: string;
}

export interface EvaluationContract {
  /** True if the evaluation should explore for a more optimal learning settings. */
  enableOfflineExperimentation?: boolean;
  /** The name of the evaluation. */
  name: string;
  /** The start time of the evaluation. */
  startTime: Date | string;
  /** The end time of the evaluation. */
  endTime: Date | string;
  /** Additional learning settings to evaluate. */
  policies: Array<PolicyContract>;
}

export interface RewardRequest {
  /** Reward to be assigned to an action. Value is a float calculated by your application, typically between 0 and 1, and must be between -1 and 1. */
  value: number;
}

export interface PolicyReferenceContract {
  /** Evaluation Id of the evaluation. */
  evaluationId: string;
  /** Name of the learning settings. */
  policyName: string;
}

export interface MultiSlotRewardRequest {
  /** List of SlotRewards */
  reward: Array<SlotReward>;
}

export interface SlotReward {
  /** Slot id for which we are sending the reward. */
  slotId: string;
  /** Reward to be assigned to slotId. Value should be between -1 and 1 inclusive. */
  value: number;
}

export interface MultiSlotRankRequest {
  /**
   * Features of the context used for Personalizer as a
   * dictionary of dictionaries. This is determined by your application, and
   * typically includes features about the current user, their
   * device, profile information, aggregated data about time and date, etc.
   * Features should not include personally identifiable information (PII),
   * unique UserIDs, or precise timestamps.
   */
  contextFeatures?: Array<Record<string, unknown>>;
  /**
   * The set of actions the Personalizer service can pick from.
   * The set should not contain more than 50 actions.
   * The order of the actions does not affect the rank result but the order
   * should match the sequence your application would have used to display them.
   * The first item in the array will be used as Baseline item in Offline Evaluations.
   */
  actions: Array<RankableAction>;
  /**
   * The set of slots the Personalizer service should select actions for.
   * The set should not contain more than 50 slots.
   */
  slots: Array<SlotRequest>;
  /**
   * Optionally pass an eventId that uniquely identifies this Rank event.
   * If null, the service generates a unique eventId. The eventId will be used for
   * associating this request with its reward, as well as seeding the pseudo-random
   * generator when making a Personalizer call.
   */
  eventId?: string;
  /**
   * Send false if it is certain the rewardActionId in rank results will be shown to the user, therefore
   * Personalizer will expect a Reward call, otherwise it will assign the default
   * Reward to the event. Send true if it is possible the user will not see the action specified in the rank results,
   * (e.g. because the page is rendering later, or the Rank results may be overridden by code further downstream).
   * You must call the Activate Event API if the event output is shown to users, otherwise Rewards will be ignored.
   */
  deferActivation?: boolean;
}

export interface RankableAction {
  /** Id of the action. */
  id: string;
  /** List of dictionaries containing features. */
  features: Array<Record<string, unknown>>;
}

export interface SlotRequest {
  /** Slot ID */
  id: string;
  /** List of dictionaries containing slot features. */
  features?: Array<Record<string, unknown>>;
  /** List of excluded action Ids. */
  excludedActions?: Array<string>;
  /**
   * The 'baseline action' ID for the slot.
   * The BaselineAction is the Id of the Action your application would use in that slot if Personalizer didn't exist.
   * BaselineAction must be defined for every slot.
   * BaselineAction should never be part of ExcludedActions.
   * Each slot must have a unique BaselineAction which corresponds to an an action from the event's Actions list.
   */
  baselineAction: string;
}

export interface RankRequest {
  /**
   * Features of the context used for Personalizer as a
   * dictionary of dictionaries. This is determined by your application, and
   * typically includes features about the current user, their
   * device, profile information, aggregated data about time and date, etc.
   * Features should not include personally identifiable information (PII),
   * unique UserIDs, or precise timestamps.
   */
  contextFeatures?: Array<Record<string, unknown>>;
  /**
   * The set of actions the Personalizer service can pick from.
   * The set should not contain more than 50 actions.
   * The order of the actions does not affect the rank result but the order
   * should match the sequence your application would have used to display them.
   * The first item in the array will be used as Baseline item in Offline Evaluations.
   */
  actions: Array<RankableAction>;
  /**
   * The set of action ids to exclude from ranking.
   * Personalizer will consider the first non-excluded item in the array as the Baseline action when performing Offline Evaluations.
   */
  excludedActions?: Array<string>;
  /**
   * Optionally pass an eventId that uniquely identifies this Rank event.
   * If null, the service generates a unique eventId. The eventId will be used for
   * associating this request with its reward, as well as seeding the pseudo-random
   * generator when making a Personalizer call.
   */
  eventId?: string;
  /**
   * Send false if it is certain the rewardActionId in rank results will be shown to the user, therefore
   * Personalizer will expect a Reward call, otherwise it will assign the default
   * Reward to the event. Send true if it is possible the user will not see the action specified in the rank results,
   * (e.g. because the page is rendering later, or the Rank results may be overridden by code further downstream).
   * You must call the Activate Event API if the event output is shown to users, otherwise Rewards will be ignored.
   */
  deferActivation?: boolean;
}
