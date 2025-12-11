// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum FineTuningJobType {
  SFT_JOB_TYPE = "sft",
  DPO_JOB_TYPE = "dpo",
  RFT_JOB_TYPE = "rft"
}

export enum TrainingType {
  STANDARD_TRAINING_TYPE = "Standard",
  GLOBAL_STANDARD_TRAINING_TYPE = "GlobalStandard",
  DEVELOPER_TIER_TRAINING_TYPE = "developerTier"
}

export const testFinetuningParams: Record<FineTuningJobType, {
  openai: {
    model_name: string;
  };
  training_file_name: string;
  validation_file_name: string;
  nEpochs: number;
  batchSize: number;
  learningRateMultiplier: number;
}> = {
  [FineTuningJobType.SFT_JOB_TYPE]: {
    openai: {
      model_name: "gpt-4.1",
    },
    training_file_name: "sft_training_set.jsonl",
    validation_file_name: "sft_validation_set.jsonl",
    nEpochs: 1,
    batchSize: 1,
    learningRateMultiplier: 1.0,
  },
  [FineTuningJobType.DPO_JOB_TYPE]: {
    openai: {
      model_name: "gpt-4o-mini",
    },
    training_file_name: "dpo_training_set.jsonl",
    validation_file_name: "dpo_validation_set.jsonl",
    nEpochs: 1,
    batchSize: 1,
    learningRateMultiplier: 1.0,
  },
  [FineTuningJobType.RFT_JOB_TYPE]: {
    openai: {
      model_name: "o4-mini",
    },
    training_file_name: "rft_training_set.jsonl",
    validation_file_name: "rft_validation_set.jsonl",
    nEpochs: 1,
    batchSize: 1,
    learningRateMultiplier: 1.0,
  },
};
