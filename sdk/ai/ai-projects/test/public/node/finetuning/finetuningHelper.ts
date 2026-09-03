// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum FineTuningJobType {
  SFT_JOB_TYPE = "sft",
  DPO_JOB_TYPE = "dpo",
  RFT_JOB_TYPE = "rft",
}

export enum TrainingType {
  STANDARD_TRAINING_TYPE = "Standard",
  GLOBAL_STANDARD_TRAINING_TYPE = "GlobalStandard",
  DEVELOPER_TIER_TRAINING_TYPE = "developerTier",
}

interface ModelType {
  modelName: string;
}

interface Section {
  openai: ModelType;
  oss?: ModelType; // optional because dpo and rft don't have oss
  trainingFileName: string;
  validationFileName: string;
}

interface FineTuningParams {
  sft: Section;
  dpo: Section;
  rft: Section;
  nEpochs: number;
  batchSize: number;
  learningRateMultiplier: number;
}

export const testFinetuningParams: FineTuningParams = {
  sft: {
    openai: { modelName: "gpt-4.1" },
    oss: { modelName: "Ministral-3B" },
    trainingFileName: "sft_training_set.jsonl",
    validationFileName: "sft_validation_set.jsonl",
  },
  dpo: {
    openai: { modelName: "gpt-4o-mini" },
    trainingFileName: "dpo_training_set.jsonl",
    validationFileName: "dpo_validation_set.jsonl",
  },
  rft: {
    openai: { modelName: "o4-mini" },
    trainingFileName: "rft_training_set.jsonl",
    validationFileName: "rft_validation_set.jsonl",
  },
  nEpochs: 1,
  batchSize: 1,
  learningRateMultiplier: 1.0,
};
