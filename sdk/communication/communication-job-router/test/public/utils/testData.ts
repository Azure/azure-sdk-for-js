// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ClassificationPolicy,
  ConditionalQueueSelectorAttachment,
  DistributionPolicy,
  ExceptionPolicy,
  JobQueue,
  PassThroughQueueSelectorAttachment,
  QueueSelector,
  RouterJob,
  RouterRuleUnion,
  RouterWorker,
  StaticQueueSelectorAttachment
} from "../../../src";

const queueId = "test-queue";
const exceptionPolicyId = "test-e-policy";
const distributionPolicyId = "test-d-policy";
const classificationPolicyId = "test-c-policy";
const jobId = "test-job";
const workerId = "test-worker";

const product = "O365";
const region = "NA";
const english = "EN";
const french = "FR";

const queueIdSelector: QueueSelector = {
  key: "Id",
  labelOperator: "equal",
  value: { default: queueId }
};

const englishSelector: QueueSelector = {
  key: "Language",
  labelOperator: "equal",
  value: { default: english }
};

const frenchSelector: QueueSelector = {
  key: "Language",
  labelOperator: "equal",
  value: { default: french }
};

const isO365: RouterRuleUnion = {
  kind: "expression-rule",
  value: { default: `If(job.Product = "${product}", true, false)'` }
};

const isEnglish: RouterRuleUnion = {
  kind: "expression-rule",
  value: { default: `If(job.Language = "${english}", true, false)'` }
};

const isFrench: RouterRuleUnion = {
  kind: "expression-rule",
  value: { default: `If(job.Language = "${french}", true, false)'` }
};

const isTrue: RouterRuleUnion = {
  kind: "static-rule",
  value: { default: true }
};

export const staticSelector: StaticQueueSelectorAttachment = {
  kind: "static",
  labelSelector: { key: "value", labelOperator: "equal", value: { default: true } }
};

export const staticQueueIdSelector: StaticQueueSelectorAttachment = {
  kind: "static",
  labelSelector: queueIdSelector
};

export const passThroughSelectorRegion: PassThroughQueueSelectorAttachment = {
  kind: "pass-through",
  key: "Region",
  labelOperator: "equal"
};

export const passThroughSelectorLanguage: PassThroughQueueSelectorAttachment = {
  kind: "pass-through",
  key: "Language",
  labelOperator: "equal"
};

export const passThroughSelectorProduct: PassThroughQueueSelectorAttachment = {
  kind: "pass-through",
  key: "Product",
  labelOperator: "equal"
};

export const conditionalQueueSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isTrue,
  labelSelectors: []
};

export const conditionalProductSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isO365,
  labelSelectors: [queueIdSelector]
};

export const conditionalEnglishSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isEnglish,
  labelSelectors: [englishSelector]
};

export const conditionalFrenchSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isFrench,
  labelSelectors: [frenchSelector]
};

export const classificationPolicyConditional: ClassificationPolicy = {
  id: `${classificationPolicyId}-conditional`,
  name: `${classificationPolicyId}-conditional`,
  fallbackQueueId: queueId,
  queueSelectors: [conditionalProductSelector]
};

export const classificationPolicyPassthrough: ClassificationPolicy = {
  id: `${classificationPolicyId}-passthrough`,
  name: `${classificationPolicyId}-passthrough`,
  fallbackQueueId: queueId,
  queueSelectors: [passThroughSelectorRegion, passThroughSelectorProduct]
};

export const classificationPolicyCombined: ClassificationPolicy = {
  id: `${classificationPolicyId}-combined`,
  name: `${classificationPolicyId}-combined`,
  fallbackQueueId: queueId,
  queueSelectors: [
    passThroughSelectorLanguage,
    passThroughSelectorProduct,
    conditionalEnglishSelector,
    conditionalFrenchSelector
  ]
};

export const englishQueue: JobQueue = {
  id: `${queueId}-english`,
  name: `${queueId}-english`,
  distributionPolicyId: distributionPolicyId,
  labels: { Region: region, Product: product, Language: english }
};

export const frenchQueue: JobQueue = {
  id: `${queueId}-french`,
  name: `${queueId}-french`,
  distributionPolicyId: distributionPolicyId,
  labels: { Region: region, Product: product, Language: french }
};

export const conditionalScenarioJob: RouterJob = {
  id: `${jobId}-conditional`,
  channelId: "test-channel",
  priority: 1,
  classificationPolicyId: classificationPolicyConditional.id,
  labels: [{ Product: product }]
};

export const passthroughScenarioJob: RouterJob = {
  id: `${jobId}-passthrough`,
  channelId: "test-channel",
  priority: 1,
  classificationPolicyId: classificationPolicyPassthrough.id,
  labels: [{ Region: region }, { Language: english }]
};

export const englishJob: RouterJob = {
  id: `${jobId}-english`,
  channelId: "test-channel",
  priority: 1,
  classificationPolicyId: classificationPolicyCombined.id,
  labels: [{ Product: product }, { Region: region }, { Language: english }]
};

export const frenchJob: RouterJob = {
  id: `${jobId}-french`,
  channelId: "test-channel",
  priority: 1,
  classificationPolicyId: classificationPolicyCombined.id,
  labels: [{ Product: product }, { Region: region }, { Language: "FR" }]
};

export interface QueueRequest {
  queueId: string;
  queueRequest: JobQueue;
}
export function getQueueRequest(guid: string): QueueRequest {
  const id = `${queueId}-${guid}`;
  return {
    queueId: id,
    queueRequest: {
      id,
      name: queueId,
      exceptionPolicyId: `${exceptionPolicyId}-${guid}`,
      distributionPolicyId: `${distributionPolicyId}-${guid}`,
      labels: {}
    }
  };
}

export interface ExceptionPolicyRequest {
  exceptionPolicyId: string;
  exceptionPolicyRequest: ExceptionPolicy;
}
export function getExceptionPolicyRequest(guid: string): ExceptionPolicyRequest {
  const id = `${exceptionPolicyId}-${guid}`;
  return {
    exceptionPolicyId: id,
    exceptionPolicyRequest: {
      id,
      name: exceptionPolicyId,
      exceptionRules: {
        MaxWaitTimeExceeded: {
          actions: {
            MoveJobToEscalatedQueue: {
              kind: "reclassify",
              classificationPolicyId: `${classificationPolicyId}-${guid}`,
              labelsToUpsert: {
                escalated: true
              }
            }
          },
          trigger: {
            kind: "wait-time",
            thresholdSeconds: 10
          }
        }
      }
    }
  };
}

export interface DistributionPolicyRequest {
  distributionPolicyId: string;
  distributionPolicyRequest: DistributionPolicy;
}
export function getDistributionPolicyRequest(guid: string): DistributionPolicyRequest {
  const id = `${distributionPolicyId}-${guid}`;
  return {
    distributionPolicyId: id,
    distributionPolicyRequest: {
      id,
      name: distributionPolicyId,
      offerTtlInSeconds: 60,
      mode: {
        kind: "longest-idle",
        minConcurrentOffers: 1,
        maxConcurrentOffers: 5,
        bypassSelectors: false
      }
    }
  };
}

export interface ClassificationPolicyRequest {
  classificationPolicyId: string;
  classificationPolicyRequest: ClassificationPolicy;
}
export function getClassificationPolicyRequest(guid: string): ClassificationPolicyRequest {
  const id = `${classificationPolicyId}-${guid}`;
  return {
    classificationPolicyId: id,
    classificationPolicyRequest: {
      id,
      name: classificationPolicyId,
      fallbackQueueId: `${queueId}-${guid}`
    }
  };
}

export interface JobRequest {
  jobId: string;
  jobRequest: RouterJob;
}
export function getJobRequest(guid: string): JobRequest {
  const id = `${jobId}-${guid}`;
  return {
    jobId: id,
    jobRequest: {
      id: jobId,
      channelId: "test-channel",
      priority: 1,
      classificationPolicyId: `${classificationPolicyId}-${guid}`,
      queueId: `${queueId}-${guid}`,
      labels: {}
    }
  };
}

export interface WorkerRequest {
  workerId: string;
  workerRequest: RouterWorker;
}
export function getWorkerRequest(guid: string): WorkerRequest {
  const id = `${workerId}-${guid}`;
  return {
    workerId: id,
    workerRequest: {
      id,
      state: "active",
      loadRatio: 1,
      totalCapacity: 1,
      availableForOffers: false,
      queueAssignments: {
        [`${queueId}-${guid}`]: {}
      },
      channelConfigurations: {
        ["test-channel"]: {
          capacityCostPerJob: 1
        }
      },
      labels: {}
    }
  };
}
