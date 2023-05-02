// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ClassificationPolicy,
  ConditionalQueueSelectorAttachment,
  DistributionPolicy,
  ExceptionPolicy,
  ExceptionRule,
  ExpressionRule,
  JobQueue,
  PassThroughQueueSelectorAttachment,
  QueueSelector,
  RouterJob,
  RouterWorker,
  StaticQueueSelectorAttachment,
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

const isO365: ExpressionRule = {
  kind: "expression-rule",
  language: "powerFx",
  expression: `If(job.Product = "${product}", true, false)`,
};

const isEnglish: ExpressionRule = {
  kind: "expression-rule",
  language: "powerFx",
  expression: `If(job.Language = "${english}", true, false)`,
};

const isFrench: ExpressionRule = {
  kind: "expression-rule",
  language: "powerFx",
  expression: `If(job.Language = "${french}", true, false)`,
};

function getQueueIdSelector(guid: string): QueueSelector {
  return {
    key: "Id",
    labelOperator: "equal",
    value: { [`${queueId}-${guid}`]: `${queueId}-${guid}` },
  };
}

const queueDoesNotExistSelector: QueueSelector = {
  key: "Id",
  labelOperator: "equal",
  value: { queueDoesNotExist: "queueDoesNotExist" },
};

const englishSelector: QueueSelector = {
  key: "Language",
  labelOperator: "equal",
  value: english,
};

const frenchSelector: QueueSelector = {
  key: "Language",
  labelOperator: "equal",
  value: french,
};

const staticQueueDoesNotExistSelector: StaticQueueSelectorAttachment = {
  kind: "static",
  labelSelector: queueDoesNotExistSelector,
};

const passThroughRegionSelector: PassThroughQueueSelectorAttachment = {
  kind: "pass-through",
  key: "Region",
  labelOperator: "equal",
};

const passThroughProductSelector: PassThroughQueueSelectorAttachment = {
  kind: "pass-through",
  key: "Product",
  labelOperator: "equal",
};

function getConditionalProductSelector(guid: string): ConditionalQueueSelectorAttachment {
  return {
    kind: "conditional",
    condition: isO365,
    labelSelectors: [getQueueIdSelector(guid)],
  };
}

const conditionalEnglishSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isEnglish,
  labelSelectors: [englishSelector],
};

const conditionalFrenchSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isFrench,
  labelSelectors: [frenchSelector],
};

export function getQueueEnglish(guid: string): JobQueue {
  return {
    id: `${queueId}-english-${guid}`,
    name: `${queueId}-english-${guid}`,
    distributionPolicyId: `${distributionPolicyId}-${guid}`,
    labels: { Region: region, Product: product, Language: english },
  };
}

export function getQueueFrench(guid: string): JobQueue {
  return {
    id: `${queueId}-french-${guid}`,
    name: `${queueId}-french-${guid}`,
    distributionPolicyId: `${distributionPolicyId}-${guid}`,
    labels: { Region: region, Product: product, Language: french },
  };
}

export function getClassificationPolicyFallback(guid: string): ClassificationPolicy {
  return {
    id: `${classificationPolicyId}-fallback-${guid}`,
    name: `${classificationPolicyId}-fallback`,
    fallbackQueueId: `${queueId}-${guid}`,
    queueSelectors: [staticQueueDoesNotExistSelector],
  };
}

export function getClassificationPolicyConditional(guid: string): ClassificationPolicy {
  return {
    id: `${classificationPolicyId}-conditional-${guid}`,
    name: `${classificationPolicyId}-conditional`,
    fallbackQueueId: `${queueId}-${guid}`,
    queueSelectors: [getConditionalProductSelector(guid)],
  };
}

export function getClassificationPolicyPassthrough(guid: string): ClassificationPolicy {
  return {
    id: `${classificationPolicyId}-passthrough-${guid}`,
    name: `${classificationPolicyId}-passthrough`,
    fallbackQueueId: `${queueId}-${guid}`,
    queueSelectors: [passThroughRegionSelector, passThroughProductSelector],
  };
}

export function getClassificationPolicyCombined(guid: string): ClassificationPolicy {
  return {
    id: `${classificationPolicyId}-combined-${guid}`,
    name: `${classificationPolicyId}-combined`,
    fallbackQueueId: `${queueId}-${guid}`,
    queueSelectors: [
      passThroughRegionSelector,
      passThroughProductSelector,
      conditionalEnglishSelector,
      conditionalFrenchSelector,
    ],
  };
}

export function getJobFallback(guid: string): RouterJob {
  return {
    id: `${jobId}-fallback-${guid}`,
    channelId: "test-channel",
    priority: 1,
    classificationPolicyId: `${classificationPolicyId}-fallback-${guid}`,
  };
}

export function getJobConditional(guid: string): RouterJob {
  return {
    id: `${jobId}-conditional-${guid}`,
    channelId: "test-channel",
    priority: 1,
    classificationPolicyId: `${classificationPolicyId}-conditional-${guid}`,
    labels: { Product: product },
  };
}

export function getJobPassthrough(guid: string): RouterJob {
  return {
    id: `${jobId}-passthrough-${guid}`,
    channelId: "test-channel",
    priority: 1,
    classificationPolicyId: `${classificationPolicyId}-passthrough-${guid}`,
    labels: { Region: region, Language: english },
  };
}

export function getJobEnglish(guid: string): RouterJob {
  return {
    id: `${jobId}-english-${guid}`,
    channelId: "test-channel",
    priority: 1,
    classificationPolicyId: `${classificationPolicyId}-combined-${guid}`,
    labels: { Product: product, Region: region, Language: english },
  };
}

export function getJobFrench(guid: string): RouterJob {
  return {
    id: `${jobId}-french-${guid}`,
    channelId: "test-channel",
    priority: 1,
    classificationPolicyId: `${classificationPolicyId}-combined-${guid}`,
    labels: { Product: product, Region: region, Language: "FR" },
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
      labels: {},
    },
  };
}

export interface ExceptionPolicyRequest {
  exceptionPolicyId: string;
  exceptionPolicyRequest: ExceptionPolicy;
}
export function getExceptionPolicyRequestWithReclassifyAction(
  guid: string
): ExceptionPolicyRequest {
  return getExceptionPolicyRequestInternal(guid, true);
}
export function getExceptionPolicyRequest(guid: string): ExceptionPolicyRequest {
  return getExceptionPolicyRequestInternal(guid, false);
}
function getExceptionPolicyRequestInternal(
  guid: string,
  addReclassifyAction: boolean
): ExceptionPolicyRequest {
  function getExceptionRules(): Record<string, ExceptionRule> {
    let exceptionRules = {};

    exceptionRules = {
      ...exceptionRules,
      MaxWaitTimeExceededCancel: {
        actions: {
          Cancel: {
            kind: "cancel",
            note: "wait time exceeded; cancelling",
          },
        },
        trigger: {
          kind: "wait-time",
          thresholdSeconds: 10,
        },
      },
    };

    if (addReclassifyAction) {
      exceptionRules = {
        ...exceptionRules,
        MaxWaitTimeExceededReclassify: {
          actions: {
            MoveJobToEscalatedQueue: {
              kind: "reclassify",
              classificationPolicyId: `${classificationPolicyId}-${guid}`,
              labelsToUpsert: {
                escalated: true,
              },
            },
          },
          trigger: {
            kind: "wait-time",
            thresholdSeconds: 10,
          },
        },
      };
    }

    return exceptionRules;
  }

  const id = `${exceptionPolicyId}-${guid}`;
  const exceptionRules = getExceptionRules();
  return {
    exceptionPolicyId: id,
    exceptionPolicyRequest: {
      id,
      name: exceptionPolicyId,
      exceptionRules,
    },
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
      offerTtlSeconds: 60,
      mode: {
        kind: "longest-idle",
        minConcurrentOffers: 1,
        maxConcurrentOffers: 5,
        bypassSelectors: false,
      },
    },
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
      fallbackQueueId: `${queueId}-${guid}`,
    },
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
      labels: {},
    },
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
        [`${queueId}-${guid}`]: {},
      },
      channelConfigurations: {
        ["test-channel"]: {
          capacityCostPerJob: 1,
        },
      },
      labels: {},
    },
  };
}
