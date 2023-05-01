// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ClassificationPolicy,
  DistributionPolicy,
  ExceptionPolicy,
  JobQueue,
  RouterJob,
  RouterWorker,
} from "../../../src";

export const exceptionPolicyRequest: ExceptionPolicy = {
  id: "exception-policy-123",
  name: "test-policy",
  exceptionRules: {
    MaxWaitTimeExceeded: {
      actions: {
        MoveJobToEscalatedQueue: {
          kind: "reclassify",
          classificationPolicyId: "Main",
          labelsToUpsert: {
            escalated: true,
          },
        },
      },
      trigger: {
        kind: "wait-time",
        thresholdSeconds: 5,
      },
    },
  },
};

export const classificationPolicyRequest: ClassificationPolicy = {
  id: "classification-policy-123",
  name: "test-policy",
  fallbackQueueId: "MainQueue",
  queueSelectors: [
    {
      kind: "conditional",
      labelSelectors: [
        {
          key: "foo",
          labelOperator: "equal",
          value: { default: 10 },
        },
      ],
    },
  ],
  prioritizationRule: {
    kind: "static-rule",
    value: { default: 2 },
  },
};

export const distributionPolicyRequest: DistributionPolicy = {
  name: "distribution-policy-123",
  mode: {
    kind: "longest-idle",
    minConcurrentOffers: 1,
    maxConcurrentOffers: 5,
    bypassSelectors: false,
  },
  offerTtlSeconds: 120,
};

export const queueRequest: JobQueue = {
  id: "queue-123",
  distributionPolicyId: "MainDistributionPolicy",
  name: "Main",
  labels: {},
  exceptionPolicyId: "MainExceptionPolicy",
};

export const workerRequest: RouterWorker = {
  id: "worker-id",
  state: "active",
  loadRatio: 1,
  totalCapacity: 100,
  queueAssignments: {
    MainQueue: {},
    SecondaryQueue: {},
  },
  labels: {},
  channelConfigurations: {
    CustomChatChannel: {
      capacityCostPerJob: 10,
    },
    CustomVoiceChannel: {
      capacityCostPerJob: 100,
    },
  },
};

export const jobRequest: RouterJob = {
  channelId: "ChatChannel",
  labels: {},
};
