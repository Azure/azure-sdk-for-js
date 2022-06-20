import {
  // DistributionPolicy,
  ExceptionPolicy,
  ClassificationPolicy,
  JobQueue,
  RouterWorker,
  RouterJob
} from "../../../src";

export var exceptionPolicyRequest: ExceptionPolicy = {
  id: "exception-policy-123",
  name: "test-policy",
  exceptionRules: {
    MaxWaitTimeExceeded: {
      actions: {
        MoveJobToEscalatedQueue: {
          kind: "reclassify",
          classificationPolicyId: "Main",
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

// export var distributionPolicyRequest: DistributionPolicy = {
//   name: "Main",
//   mode: {
//     kind: "longest-idle",
//     minConcurrentOffers: 1,
//     maxConcurrentOffers: 5,
//     bypassSelectors: false
//   },
//   offerTTLSeconds: 120
// };

export var queueRequest: JobQueue = {
  id: "queue-123",
  distributionPolicyId: "MainDistributionPolicy",
  name: "Main",
  labels: {},
  exceptionPolicyId: "MainExceptionPolicy"
};

export var workerRequest: RouterWorker = {
  id: "worker-id",
  state: "active",
  loadRatio: 1,
  totalCapacity: 100,
  queueAssignments: {
    MainQueue: {},
    SecondaryQueue: {}
  },
  labels: {},
  channelConfigurations: {
    CustomChatChannel: {
      capacityCostPerJob: 10
    },
    CustomVoiceChannel: {
      capacityCostPerJob: 100
    }
  }
};

export var jobRequest: RouterJob = {
  channelId: "ChatChannel",
  labels: {}
};
