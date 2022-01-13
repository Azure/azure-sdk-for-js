// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CompositeMapper, OperationParameter } from "../src/coreHttp";

const QueueDescription: CompositeMapper = {
  serializedName: "QueueDescription",
  xmlName: "QueueDescription",
  xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
  type: {
    name: "Composite",
    className: "QueueDescription",
    modelProperties: {
      lockDuration: {
        serializedName: "lockDuration",
        xmlName: "LockDuration",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "TimeSpan",
        },
      },
      maxSizeInMegabytes: {
        serializedName: "maxSizeInMegabytes",
        xmlName: "MaxSizeInMegabytes",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Number",
        },
      },
      requiresDuplicateDetection: {
        serializedName: "requiresDuplicateDetection",
        xmlName: "RequiresDuplicateDetection",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Boolean",
        },
      },
      requiresSession: {
        serializedName: "requiresSession",
        xmlName: "RequiresSession",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Boolean",
        },
      },
      defaultMessageTimeToLive: {
        serializedName: "defaultMessageTimeToLive",
        xmlName: "DefaultMessageTimeToLive",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "TimeSpan",
        },
      },
      deadLetteringOnMessageExpiration: {
        serializedName: "deadLetteringOnMessageExpiration",
        xmlName: "DeadLetteringOnMessageExpiration",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Boolean",
        },
      },
      duplicateDetectionHistoryTimeWindow: {
        serializedName: "duplicateDetectionHistoryTimeWindow",
        xmlName: "DuplicateDetectionHistoryTimeWindow",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "TimeSpan",
        },
      },
      maxDeliveryCount: {
        serializedName: "maxDeliveryCount",
        xmlName: "MaxDeliveryCount",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Number",
        },
      },
      enableBatchedOperations: {
        serializedName: "enableBatchedOperations",
        xmlName: "EnableBatchedOperations",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Boolean",
        },
      },
      sizeInBytes: {
        serializedName: "sizeInBytes",
        xmlName: "SizeInBytes",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Number",
        },
      },
      messageCount: {
        serializedName: "messageCount",
        xmlName: "MessageCount",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Number",
        },
      },
      isAnonymousAccessible: {
        serializedName: "isAnonymousAccessible",
        xmlName: "IsAnonymousAccessible",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Boolean",
        },
      },
      status: {
        serializedName: "status",
        xmlName: "Status",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "String",
        },
      },
      forwardTo: {
        serializedName: "forwardTo",
        xmlName: "ForwardTo",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "String",
        },
      },
      userMetadata: {
        serializedName: "userMetadata",
        xmlName: "UserMetadata",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "String",
        },
      },
      createdAt: {
        serializedName: "createdAt",
        xmlName: "CreatedAt",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "DateTime",
        },
      },
      updatedAt: {
        serializedName: "updatedAt",
        xmlName: "UpdatedAt",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "DateTime",
        },
      },
      accessedAt: {
        serializedName: "accessedAt",
        xmlName: "AccessedAt",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "DateTime",
        },
      },
      supportOrdering: {
        serializedName: "supportOrdering",
        xmlName: "SupportOrdering",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Boolean",
        },
      },
      autoDeleteOnIdle: {
        serializedName: "autoDeleteOnIdle",
        xmlName: "AutoDeleteOnIdle",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "TimeSpan",
        },
      },
      enablePartitioning: {
        serializedName: "enablePartitioning",
        xmlName: "EnablePartitioning",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Boolean",
        },
      },
      entityAvailabilityStatus: {
        serializedName: "entityAvailabilityStatus",
        xmlName: "EntityAvailabilityStatus",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "String",
        },
      },
      enableExpress: {
        serializedName: "enableExpress",
        xmlName: "EnableExpress",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "Boolean",
        },
      },
      forwardDeadLetteredMessagesTo: {
        serializedName: "forwardDeadLetteredMessagesTo",
        xmlName: "ForwardDeadLetteredMessagesTo",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          name: "String",
        },
      },
    },
  },
};

const CreateQueueBodyContent: CompositeMapper = {
  serializedName: "CreateQueueBodyContent",
  xmlNamespace: "http://www.w3.org/2005/Atom",
  type: {
    name: "Composite",
    className: "CreateQueueBodyContent",
    modelProperties: {
      type: {
        defaultValue: "application/xml",
        serializedName: "type",
        xmlName: "type",
        xmlIsAttribute: true,
        type: {
          name: "String",
        },
      },
      queueDescription: {
        serializedName: "queueDescription",
        xmlName: "QueueDescription",
        xmlNamespace: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        type: {
          ...QueueDescription.type,
        },
      },
    },
  },
};

const CreateQueueBody: CompositeMapper = {
  serializedName: "CreateQueueBody",
  xmlName: "entry",
  xmlNamespace: "http://www.w3.org/2005/Atom",
  type: {
    name: "Composite",
    className: "CreateQueueBody",
    modelProperties: {
      updated: {
        serializedName: "updated",
        xmlName: "updated",
        xmlNamespace: "http://www.w3.org/2005/Atom",
        type: {
          name: "DateTime",
        },
      },
      content: {
        serializedName: "content",
        xmlName: "content",
        xmlNamespace: "http://www.w3.org/2005/Atom",
        type: {
          ...CreateQueueBodyContent.type,
        },
      },
    },
  },
};

export const requestBody1: OperationParameter = {
  parameterPath: "requestBody",
  mapper: CreateQueueBody,
};

export const TelemetryItem: CompositeMapper = {
  type: {
    name: "Composite",
    className: "TelemetryItem",
    modelProperties: {
      version: {
        defaultValue: 1,
        serializedName: "ver",
        type: {
          name: "Number",
        },
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String",
        },
      },
      time: {
        serializedName: "time",
        required: true,
        type: {
          name: "DateTime",
        },
      },
      sampleRate: {
        defaultValue: 100,
        serializedName: "sampleRate",
        type: {
          name: "Number",
        },
      },
      sequence: {
        constraints: {
          MaxLength: 64,
        },
        serializedName: "seq",
        type: {
          name: "String",
        },
      },
      instrumentationKey: {
        serializedName: "iKey",
        type: {
          name: "String",
        },
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } },
        },
      },
      data: {
        serializedName: "data",
        type: {
          name: "Composite",
          className: "MonitorBase",
        },
      },
    },
  },
};

export const MonitorBase: CompositeMapper = {
  type: {
    name: "Composite",
    className: "MonitorBase",
    modelProperties: {
      baseType: {
        serializedName: "baseType",
        type: {
          name: "String",
        },
      },
      baseData: {
        serializedName: "baseData",
        type: {
          name: "Composite",
          className: "MonitorDomain",
        },
      },
    },
  },
};

export const MonitorDomain: CompositeMapper = {
  type: {
    name: "Composite",
    className: "MonitorDomain",
    additionalProperties: { type: { name: "Object" } },
    modelProperties: {
      test: {
        serializedName: "test",
        type: {
          name: "String",
        },
      },
    },
  },
};

export const body: OperationParameter = {
  parameterPath: "body",
  mapper: {
    serializedName: "body",
    required: true,
    type: {
      name: "Sequence",
      element: { type: { name: "Composite", className: "TelemetryItem" } },
    },
  },
};
