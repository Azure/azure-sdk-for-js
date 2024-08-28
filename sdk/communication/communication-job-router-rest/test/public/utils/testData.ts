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
  RouterJob,
} from "../../../src";

const queueId = "test-a-queue";
const exceptionPolicyId = "test-e-policy";
const exceptionPolicyId2 = "test-h-policy";
const distributionPolicyId = "test-d-policy";
const distributionPolicyId2 = "test-p-policy";
const classificationPolicyId = "test-c-policy";
const jobId = "test-job";
const jobId2 = "test-8-job";
const workerId = "test-worker";

const product = "O365";
const region = "NA";
const english = "EN";
const french = "FR";

const isO365: ExpressionRouterRule = {
  kind: "expression",
  language: "powerFx",
  expression: `If(job.Product = "${product}", true, false)`,
};

const isEnglish: ExpressionRouterRule = {
  kind: "expression",
  language: "powerFx",
  expression: `If(job.Language = "${english}", true, false)`,
};

const isFrench: ExpressionRouterRule = {
  kind: "expression",
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
  kind: "passThrough",
  key: "Region",
  labelOperator: "equal",
};

const passThroughProductSelector: PassThroughQueueSelectorAttachment = {
  kind: "passThrough",
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

/** An extended model for id. */
export interface WithId {
  /** The id of model. */
  id: string;
}

export function getQueueEnglish(guid: string): RouterQueue & WithId {
  return {
    id: `${queueId}-english-${guid}`,
    name: `${queueId}-english-${guid}`,
    distributionPolicyId: `${distributionPolicyId}-${guid}`,
    labels: { Region: region, Product: product, Language: english },
  };
}

export function getQueueFrench(guid: string): RouterQueue & WithId {
  return {
    id: `${queueId}-french-${guid}`,
    name: `${queueId}-french-${guid}`,
    distributionPolicyId: `${distributionPolicyId}-${guid}`,
    labels: { Region: region, Product: product, Language: french },
  };
}

export function getClassificationPolicyFallback(guid: string): ClassificationPolicy & WithId {
  return {
    id: `${classificationPolicyId}-fallback-${guid}`,
    name: `${classificationPolicyId}-fallback`,
    fallbackQueueId: `${queueId}-${guid}`,
    queueSelectorAttachments: [staticQueueDoesNotExistSelector],
  };
}

export function getClassificationPolicyConditional(guid: string): ClassificationPolicy & WithId {
  return {
    id: `${classificationPolicyId}-conditional-${guid}`,
    name: `${classificationPolicyId}-conditional`,
    fallbackQueueId: `${queueId}-${guid}`,
    queueSelectorAttachments: [getConditionalProductSelector(guid)],
  };
}

export function getClassificationPolicyPassthrough(guid: string): ClassificationPolicy & WithId {
  return {
    id: `${classificationPolicyId}-passthrough-${guid}`,
    name: `${classificationPolicyId}-passthrough`,
    fallbackQueueId: `${queueId}-${guid}`,
    queueSelectorAttachments: [passThroughRegionSelector, passThroughProductSelector],
  };
}

export function getClassificationPolicyCombined(guid: string): ClassificationPolicy & WithId {
  return {
    id: `${classificationPolicyId}-combined-${guid}`,
    name: `${classificationPolicyId}-combined`,
    fallbackQueueId: `${queueId}-${guid}`,
    queueSelectorAttachments: [
      passThroughRegionSelector,
      passThroughProductSelector,
      conditionalEnglishSelector,
      conditionalFrenchSelector,
    ],
  };
}

export interface TestJobRequest {
  id: string;
  options: RouterJob;
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
  queueRequest: RouterQueue & WithId;
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
  exceptionPolicyIdForCreationAndDeletionTest: string;
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
  const id = `${exceptionPolicyId}-${guid}`;
  const id2 = `${exceptionPolicyId2}-${guid}`;
  const exceptionRules = getExceptionRules(guid, addReclassifyAction);
  return {
    exceptionPolicyId: id,
    exceptionPolicyIdForCreationAndDeletionTest: id2,
    exceptionPolicyRequest: {
      name: exceptionPolicyId,
      exceptionRules,
    },
  };
}

function getExceptionRules(guid: string, addReclassifyAction: boolean): Array<ExceptionRule> {
  const exceptionRules: Array<ExceptionRule> = [
    {
      id: "MaxWaitTimeExceededCancel",
      actions: [
        {
          kind: "cancel",
          note: "wait time exceeded; cancelling",
        },
      ],
      trigger: {
        kind: "waitTime",
        thresholdSeconds: 10,
      },
    },
  ];

  if (addReclassifyAction) {
    exceptionRules.push({
      id: "MaxWaitTimeExceededReclassify",
      actions: [
        {
          kind: "reclassify",
          classificationPolicyId: `${classificationPolicyId}-${guid}`,
          labelsToUpsert: {
            escalated: true,
          },
        },
      ],
      trigger: {
        kind: "waitTime",
        thresholdSeconds: 10,
      },
    });
  }

  return exceptionRules;
}

export interface DistributionPolicyRequest {
  distributionPolicyId: string;
  distributionPolicyIdForCreationAndDeletionTest: string;
  distributionPolicyRequest: DistributionPolicy;
}
export function getDistributionPolicyRequest(guid: string): DistributionPolicyRequest {
  const id = `${distributionPolicyId}-${guid}`;
  const id2 = `${distributionPolicyId2}-${guid}`;
  return {
    distributionPolicyId: id,
    distributionPolicyIdForCreationAndDeletionTest: id2,
    distributionPolicyRequest: {
      name: distributionPolicyId,
      offerExpiresAfterSeconds: 60,
      mode: {
        kind: "longestIdle",
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
      name: classificationPolicyId,
      fallbackQueueId: `${queueId}-${guid}`,
    },
  };
}

export interface JobRequest {
  jobId: string;
  scheduledJobId: string;
  jobRequest: RouterJob;
}
export function getJobRequest(guid: string): JobRequest {
  const id = `${jobId}-${guid}`;
  const id2 = `${jobId2}-${guid}`;
  return {
    jobId: id,
    scheduledJobId: id2,
    jobRequest: {
      channelId: "test-channel",
      priority: 1,
      classificationPolicyId: `${classificationPolicyId}-${guid}`,
      queueId: `${queueId}-${guid}`,
      labels: {},
      notes: [],
      matchingMode: {
        kind: "queueAndMatch",
      },
    },
  };
}

export interface WorkerRequest {
  workerId: string;
  workerRequest: RouterWorker & WithId;
}
export function getWorkerRequest(guid: string): WorkerRequest {
  const id = `${workerId}-${guid}`;
  return {
    workerId: id,
    workerRequest: {
      id,
      capacity: 1,
      availableForOffers: false,
      queues: [`${queueId}-${guid}`],
      channels: [
        {
          channelId: "test-channel",
          capacityCostPerJob: 1,
        },
      ],
      labels: {},
      maxConcurrentOffers: 1,
    },
  };
}
