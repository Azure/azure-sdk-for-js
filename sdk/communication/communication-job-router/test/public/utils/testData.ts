// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ClassificationPolicy,
  ConditionalQueueSelectorAttachment,
  DistributionPolicy,
  ExceptionPolicy,
  ExceptionRule,
  ExpressionRouterRule,
  RouterQueue,
  PassThroughQueueSelectorAttachment,
  RouterQueueSelector,
  RouterWorker,
  StaticQueueSelectorAttachment,
  CreateJobOptions,
  CreateClassificationPolicyOptions,
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

const isO365: ExpressionRouterRule = {
  kind: "expression-rule",
  language: "powerFx",
  expression: `If(job.Product = "${product}", true, false)`,
};

const isEnglish: ExpressionRouterRule = {
  kind: "expression-rule",
  language: "powerFx",
  expression: `If(job.Language = "${english}", true, false)`,
};

const isFrench: ExpressionRouterRule = {
  kind: "expression-rule",
  language: "powerFx",
  expression: `If(job.Language = "${french}", true, false)`,
};

function getQueueIdSelector(guid: string): RouterQueueSelector {
  return {
    key: "Id",
    labelOperator: "equal",
    value: { [`${queueId}-${guid}`]: `${queueId}-${guid}` },
  };
}

const queueDoesNotExistSelector: RouterQueueSelector = {
  key: "Id",
  labelOperator: "equal",
  value: { queueDoesNotExist: "queueDoesNotExist" },
};

const englishSelector: RouterQueueSelector = {
  key: "Language",
  labelOperator: "equal",
  value: english,
};

const frenchSelector: RouterQueueSelector = {
  key: "Language",
  labelOperator: "equal",
  value: french,
};

const staticQueueDoesNotExistSelector: StaticQueueSelectorAttachment = {
  kind: "static",
  queueSelector: queueDoesNotExistSelector,
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
    queueSelectors: [getQueueIdSelector(guid)],
  };
}

const conditionalEnglishSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isEnglish,
  queueSelectors: [englishSelector],
};

const conditionalFrenchSelector: ConditionalQueueSelectorAttachment = {
  kind: "conditional",
  condition: isFrench,
  queueSelectors: [frenchSelector],
};

export function getQueueEnglish(guid: string): RouterQueue {
  return {
    id: `${queueId}-english-${guid}`,
    name: `${queueId}-english-${guid}`,
    distributionPolicyId: `${distributionPolicyId}-${guid}`,
    labels: { Region: region, Product: product, Language: english },
  };
}

export function getQueueFrench(guid: string): RouterQueue {
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

export interface TestJobRequest {
  id: string;
  options: CreateJobOptions;
}
export function getJobFallback(guid: string): TestJobRequest {
  return {
    id: `${jobId}-fallback-${guid}`,
    options: {
      channelId: "test-channel",
      priority: 1,
      classificationPolicyId: `${classificationPolicyId}-fallback-${guid}`,
    },
  };
}

export function getJobConditional(guid: string): TestJobRequest {
  return {
    id: `${jobId}-conditional-${guid}`,
    options: {
      channelId: "test-channel",
      priority: 1,
      classificationPolicyId: `${classificationPolicyId}-conditional-${guid}`,
      labels: { Product: product },
    },
  };
}

export function getJobPassthrough(guid: string): TestJobRequest {
  return {
    id: `${jobId}-passthrough-${guid}`,
    options: {
      channelId: "test-channel",
      priority: 1,
      classificationPolicyId: `${classificationPolicyId}-passthrough-${guid}`,
      labels: { Region: region, Language: english },
    },
  };
}

export function getJobEnglish(guid: string): TestJobRequest {
  return {
    id: `${jobId}-english-${guid}`,
    options: {
      channelId: "test-channel",
      priority: 1,
      classificationPolicyId: `${classificationPolicyId}-combined-${guid}`,
      labels: { Product: product, Region: region, Language: english },
    },
  };
}

export function getJobFrench(guid: string): TestJobRequest {
  return {
    id: `${jobId}-french-${guid}`,
    options: {
      channelId: "test-channel",
      priority: 1,
      classificationPolicyId: `${classificationPolicyId}-combined-${guid}`,
      labels: { Product: product, Region: region, Language: "FR" },
    },
  };
}

export interface QueueRequest {
  queueId: string;
  queueRequest: RouterQueue;
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
  guid: string,
): ExceptionPolicyRequest {
  return getExceptionPolicyRequestInternal(guid, true);
}
export function getExceptionPolicyRequest(guid: string): ExceptionPolicyRequest {
  return getExceptionPolicyRequestInternal(guid, false);
}
function getExceptionPolicyRequestInternal(
  guid: string,
  addReclassifyAction: boolean,
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
      offerExpiresAfterSeconds: 60,
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
  classificationPolicyRequest: CreateClassificationPolicyOptions;
}
export function getClassificationPolicyRequest(guid: string): ClassificationPolicyRequest {
  const id = `${classificationPolicyId}-${guid}`;
  return {
    classificationPolicyId: id,
    classificationPolicyRequest: {
      name: classificationPolicyId,
      fallbackQueueId: `${queueId}-${guid}`,
    },
  };
}

export interface JobRequest {
  jobId: string;
  jobRequest: CreateJobOptions;
}
export function getJobRequest(guid: string): JobRequest {
  const id = `${jobId}-${guid}`;
  return {
    jobId: id,
    jobRequest: {
      channelId: "test-channel",
      priority: 1,
      classificationPolicyId: `${classificationPolicyId}-${guid}`,
      queueId: `${queueId}-${guid}`,
      labels: {},
      notes: [],
      matchingMode: { queueAndMatchMode: {} },
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
