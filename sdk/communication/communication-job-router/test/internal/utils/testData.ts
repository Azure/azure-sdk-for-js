import {
  ClassificationPolicy,
  ExceptionPolicy,
  DistributionPolicy,
  JobQueue,
  RouterWorker,
  RouterJob
} from "../../../src";

export var exceptionPolicyRequest: ExceptionPolicy = {
  id: "test-e-policy",
  name: "test-e-policy",
  exceptionRules: {
    MaxWaitTimeExceeded: {
      actions: {
        MoveJobToEscalatedQueue: {
          kind: "reclassify",
          classificationPolicyId: "test-c-policy",
          labelsToUpsert: {
            escalated: true
          }
        }
      },
      trigger: {
        kind: "wait-time",
        threshold: "00:20:00"
      }
    }
  }
};

export var classificationPolicyRequest: ClassificationPolicy = {
  id: "test-c-policy",
  name: "test-c-policy",
  fallbackQueueId: "test-queue",
  queueSelectors: [
    {
      kind: "conditional",
      condition: {
        kind: "static-rule",
        value: true
      },
      labelSelectors: [
        {
          key: "foo",
          labelOperator: "equal",
          value: "bar"
        }
      ]
    }
  ],
  prioritizationRule: {
    kind: "static-rule",
    value: "2"
  }
};

export var distributionPolicyRequest: DistributionPolicy = {
  id: "test-d-policy",
  name: "test-d-policy",
  offerTtlSeconds: 120,
  mode: {
    kind: "longest-idle",
    minConcurrentOffers: 1,
    maxConcurrentOffers: 5,
    bypassSelectors: false
  }
};

export var queueRequest: JobQueue = {
  id: "test-queue",
  name: "test-queue",
  exceptionPolicyId: "test-e-policy",
  distributionPolicyId: "test-d-policy",
  labels: {}
};

export var workerRequest: RouterWorker = {
  id: "test-worker",
  state: "active",
  loadRatio: 1,
  totalCapacity: 100,
  queueAssignments: {
    "test-queue": { QueueId: "test-queue" }
  },
  channelConfigurations: {
    CustomChatChannel: {
      capacityCostPerJob: 10
    },
    CustomVoiceChannel: {
      capacityCostPerJob: 100
    }
  },
  labels: {}
};

export var jobRequest: RouterJob = {
  channelId: "ChatChannel",
  labels: {}
};
