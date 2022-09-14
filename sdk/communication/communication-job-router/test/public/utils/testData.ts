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
  RouterWorker
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

const passThroughSelectorRegion: PassThroughQueueSelectorAttachment = {
  kind: "pass-through",
  key: "Region",
  labelOperator: "equal"
};

const passThroughSelectorLanguage: PassThroughQueueSelectorAttachment = {
  kind: "pass-through",
  key: "Language",
  labelOperator: "equal"
};

const passThroughSelectorProduct: PassThroughQueueSelectorAttachment = {
  kind: "pass-through",
  key: "Product",
  labelOperator: "equal"
};

const conditionalProductSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isO365,
  labelSelectors: [queueIdSelector]
};

const conditionalEnglishSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isEnglish,
  labelSelectors: [englishSelector]
};

const conditionalFrenchSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isFrench,
  labelSelectors: [frenchSelector]
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

export function getClassificationPolicyConditional(guid: string): ClassificationPolicy {
  return {
    id: `${classificationPolicyId}-conditional-${guid}`,
    name: `${classificationPolicyId}-conditional`,
    fallbackQueueId: queueId,
    queueSelectors: [conditionalProductSelector]
  };
}

export function getClassificationPolicyPassthrough(guid: string): ClassificationPolicy {
  return {
    id: `${classificationPolicyId}-passthrough-${guid}`,
    name: `${classificationPolicyId}-passthrough`,
    fallbackQueueId: queueId,
    queueSelectors: [passThroughSelectorRegion, passThroughSelectorProduct]
  };
}

export function getClassificationPolicyCombined(guid: string): ClassificationPolicy {
  return {
    id: `${classificationPolicyId}-combined-${guid}`,
    name: `${classificationPolicyId}-combined`,
    fallbackQueueId: queueId,
    queueSelectors: [
      passThroughSelectorLanguage,
      passThroughSelectorProduct,
      conditionalEnglishSelector,
      conditionalFrenchSelector
    ]
  };
}

export function getJobConditional(guid: string): RouterJob {
  return {
    id: `${jobId}-conditional-${guid}`,
    channelId: "test-channel",
    priority: 1,
    classificationPolicyId: `${classificationPolicyId}-conditional-${guid}`,
    labels: [{ Product: product }]
  };
}

export function getJobPassthrough(guid: string): RouterJob {
  return {
    id: `${jobId}-passthrough-${guid}`,
    channelId: "test-channel",
    priority: 1,
    classificationPolicyId: `${classificationPolicyId}-passthrough-${guid}`,
    labels: [{ Region: region }, { Language: english }]
  };
}

export function getJobEnglish(guid: string): RouterJob {
  return {
    id: `${jobId}-english-${guid}`,
    channelId: "test-channel",
    priority: 1,
    classificationPolicyId: `${classificationPolicyId}-combined-${guid}`,
    labels: [{ Product: product }, { Region: region }, { Language: english }]
  };
}

export function getJobFrench(guid: string): RouterJob {
  return {
    id: `${jobId}-french-${guid}`,
    channelId: "test-channel",
    priority: 1,
    classificationPolicyId: `${classificationPolicyId}-combined-${guid}`,
    labels: [{ Product: product }, { Region: region }, { Language: "FR" }]
  };
}

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
