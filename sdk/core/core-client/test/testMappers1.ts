// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CompositeMapper } from "../src/interfaces";

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

const internalMappers: any = {};

internalMappers.SimpleProduct = {
  type: {
    name: "Composite",
    className: "SimpleProduct",
    modelProperties: {
      id: {
        serializedName: "id",
        constraints: {},
        required: true,
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
      maxProductDisplayName: {
        serializedName: "details.max_product_display_name",
        type: {
          name: "String",
        },
      },
      capacity: {
        defaultValue: "Large",
        isConstant: true,
        serializedName: "details.max_product_capacity",
        type: {
          name: "String",
        },
      },
    },
  },
};

internalMappers.SimpleProductConstFirst = {
  type: {
    name: "Composite",
    className: "SimpleProduct",
    modelProperties: {
      id: {
        serializedName: "id",
        constraints: {},
        required: true,
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
      capacity: {
        defaultValue: "Large",
        isConstant: true,
        serializedName: "details.max_product_capacity",
        type: {
          name: "String",
        },
      },
      maxProductDisplayName: {
        serializedName: "details.max_product_display_name",
        type: {
          name: "String",
        },
      },
    },
  },
};

internalMappers.Cat = {
  required: false,
  serializedName: "cat",
  type: {
    name: "Composite",
    className: "Cat",
    modelProperties: {
      id: {
        required: false,
        serializedName: "id",
        type: {
          name: "Number",
        },
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String",
        },
      },
      pettype: {
        required: true,
        serializedName: "pet\\.type",
        type: {
          name: "String",
        },
      },
      color: {
        required: false,
        serializedName: "color",
        type: {
          name: "String",
        },
      },
      hates: {
        required: false,
        serializedName: "hates",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "DogElementType",
            type: {
              name: "Composite",
              className: "Dog",
            },
          },
        },
      },
    },
  },
};
internalMappers.Dog = {
  required: false,
  serializedName: "dog",
  type: {
    name: "Composite",
    className: "Dog",
    modelProperties: {
      id: {
        required: false,
        serializedName: "id",
        type: {
          name: "Number",
        },
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String",
        },
      },
      pettype: {
        required: true,
        serializedName: "pet\\.type",
        type: {
          name: "String",
        },
      },
      food: {
        required: false,
        serializedName: "food",
        type: {
          name: "String",
        },
      },
    },
  },
};
internalMappers.Fish = {
  required: false,
  serializedName: "Fish",
  type: {
    name: "Composite",
    polymorphicDiscriminator: {
      serializedName: "fish.type",
      clientName: "fishtype",
    },
    uberParent: "Fish",
    className: "Fish",
    modelProperties: {
      species: {
        required: false,
        serializedName: "species",
        type: {
          name: "String",
        },
      },
      length: {
        required: true,
        serializedName: "length",
        type: {
          name: "Number",
        },
      },
      siblings: {
        required: false,
        serializedName: "siblings",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "FishElementType",
            type: {
              name: "Composite",
              polymorphicDiscriminator: {
                serializedName: "fish.type",
                clientName: "fishtype",
              },
              uberParent: "Fish",
              className: "Fish",
            },
          },
        },
      },
      fishtype: {
        required: true,
        serializedName: "fish\\.type",
        type: {
          name: "String",
        },
      },
    },
  },
};
internalMappers.Invoice = {
  required: false,
  serializedName: "Invoice",
  type: {
    name: "Composite",
    className: "Invoice",
    modelProperties: {
      invId: {
        serializedName: "invoiceId",
        required: true,
        type: {
          name: "Number",
        },
      },
      invDate: {
        serializedName: "invDate",
        required: false,
        type: {
          name: "Date",
        },
      },
      invProducts: {
        serializedName: "invProducts",
        required: false,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Dictionary",
              value: {
                type: {
                  name: "Composite",
                  className: "Product",
                },
              },
            },
          },
        },
      },
    },
  },
};
internalMappers.Pet = {
  required: false,
  serializedName: "pet",
  type: {
    name: "Composite",
    className: "Pet",
    polymorphicDiscriminator: "pet.type",
    modelProperties: {
      id: {
        required: false,
        serializedName: "id",
        type: {
          name: "Number",
        },
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String",
        },
      },
      pettype: {
        required: true,
        serializedName: "pet\\.type",
        type: {
          name: "String",
        },
      },
    },
  },
};
internalMappers.PetAP = {
  required: false,
  serializedName: "PetAP",
  type: {
    name: "Composite",
    additionalProperties: {
      type: {
        name: "String",
      },
    },
    className: "PetAP",
    modelProperties: {
      id: {
        required: true,
        serializedName: "id",
        type: {
          name: "Number",
        },
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String",
        },
      },
      eyeColor: {
        required: true,
        serializedName: "eyeColor",
        isConstant: true,
        defaultValue: "brown",
        type: {
          name: "String",
        },
      },
      favoriteFood: {
        required: false,
        serializedName: "favoriteFood",
        defaultValue: "bones",
        type: {
          name: "String",
        },
      },
      status: {
        required: false,
        readOnly: true,
        serializedName: "status",
        type: {
          name: "Boolean",
        },
      },
      odatalocation: {
        required: true,
        serializedName: "@odata\\.location",
        type: {
          name: "String",
        },
      },
      additionalProperties1: {
        required: false,
        serializedName: "additionalProperties",
        type: {
          name: "Dictionary",
          value: {
            required: false,
            serializedName: "NumberElementType",
            type: {
              name: "Number",
            },
          },
        },
      },
    },
  },
};
internalMappers.PetGallery = {
  required: false,
  serializedName: "PetGallery",
  type: {
    name: "Composite",
    className: "PetGallery",
    modelProperties: {
      id: {
        required: false,
        serializedName: "id",
        type: {
          name: "Number",
        },
      },
      name: {
        required: false,
        serializedName: "name",
        type: {
          name: "String",
        },
      },
      pets: {
        required: false,
        serializedName: "pets",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "petElementType",
            type: {
              name: "Composite",
              polymorphicDiscriminator: "pet.type",
              uberParent: "Pet",
              className: "Pet",
            },
          },
        },
      },
    },
  },
};
internalMappers.Product = {
  required: false,
  serializedName: "Product",
  type: {
    name: "Composite",
    className: "Product",
    modelProperties: {
      id: {
        serializedName: "id",
        constraints: {},
        required: true,
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
        constraints: {
          MaxLength: 256,
          MinLength: 1,
          Pattern: /^[A-Za-z0-9-._]+$/,
        },
      },
      provisioningState: {
        serializedName: "properties.provisioningState",
        required: false,
        type: {
          name: "Enum",
          allowedValues: ["Creating", "Failed", "Succeeded"],
        },
      },
      tags: {
        serializedName: "tags",
        required: false,
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "String",
            },
          },
        },
      },
      dispatchTime: {
        serializedName: "dispatchTime",
        required: false,
        type: {
          name: "DateTime",
        },
      },
      invoiceInfo: {
        serializedName: "invoiceInfo",
        required: false,
        type: {
          name: "Composite",
          className: "Invoice",
        },
      },
      subProducts: {
        serializedName: "subProducts",
        required: false,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SubProduct",
            },
          },
        },
      },
    },
  },
};
internalMappers.ProductListResult = {
  required: false,
  serializedName: "ProductListResult",
  type: {
    name: "Composite",
    className: "ProductListResult",
    modelProperties: {
      value: {
        serializedName: "",
        required: false,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Product",
            },
          },
        },
      },
    },
  },
};
internalMappers.ProductListResultNextLink = {
  required: false,
  serializedName: "ProductListResultNextLink",
  type: {
    name: "Composite",
    className: "ProductListResultNextLink",
    modelProperties: {
      value: {
        serializedName: "",
        required: false,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Product",
            },
          },
        },
      },
      nextLink: {
        serializedName: "nextLink",
        required: false,
        type: {
          name: "String",
        },
      },
    },
  },
};
internalMappers.ProductListResultNextLinkFirst = {
  required: false,
  serializedName: "ProductListResultNextLink",
  type: {
    name: "Composite",
    className: "ProductListResultNextLink",
    modelProperties: {
      nextLink: {
        serializedName: "nextLink",
        required: false,
        type: {
          name: "String",
        },
      },
      value: {
        serializedName: "",
        required: false,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Product",
            },
          },
        },
      },
    },
  },
};
internalMappers.SawShark = {
  required: false,
  serializedName: "sawshark",
  type: {
    name: "Composite",
    polymorphicDiscriminator: {
      serializedName: "fish.type",
      clientName: "fishtype",
    },
    uberParent: "Fish",
    className: "Sawshark",
    modelProperties: {
      species: {
        required: false,
        serializedName: "species",
        type: {
          name: "String",
        },
      },
      length: {
        required: true,
        serializedName: "length",
        type: {
          name: "Number",
        },
      },
      siblings: {
        required: false,
        serializedName: "siblings",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "FishElementType",
            type: {
              name: "Composite",
              polymorphicDiscriminator: {
                serializedName: "fish.type",
                clientName: "fishtype",
              },
              uberParent: "Fish",
              className: "Fish",
            },
          },
        },
      },
      fishtype: {
        required: true,
        serializedName: "fish\\.type",
        type: {
          name: "String",
        },
      },
      age: {
        required: false,
        serializedName: "age",
        type: {
          name: "Number",
        },
      },
      birthday: {
        required: true,
        serializedName: "birthday",
        type: {
          name: "DateTime",
        },
      },
      picture: {
        required: false,
        serializedName: "picture",
        type: {
          name: "ByteArray",
        },
      },
    },
  },
};
internalMappers.Shark = {
  required: false,
  serializedName: "shark",
  type: {
    name: "Composite",
    polymorphicDiscriminator: {
      serializedName: "fish.type",
      clientName: "fishtype",
    },
    uberParent: "Fish",
    className: "Shark",
    modelProperties: {
      species: {
        required: false,
        serializedName: "species",
        type: {
          name: "String",
        },
      },
      length: {
        required: true,
        serializedName: "length",
        type: {
          name: "Number",
        },
      },
      siblings: {
        required: false,
        serializedName: "siblings",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "FishElementType",
            type: {
              name: "Composite",
              polymorphicDiscriminator: {
                serializedName: "fish.type",
                clientName: "fishtype",
              },
              uberParent: "Fish",
              className: "Fish",
            },
          },
        },
      },
      fishtype: {
        required: true,
        serializedName: "fish\\.type",
        type: {
          name: "String",
        },
      },
      age: {
        required: false,
        serializedName: "age",
        type: {
          name: "Number",
        },
      },
      birthday: {
        required: true,
        serializedName: "birthday",
        type: {
          name: "DateTime",
        },
      },
    },
  },
};
internalMappers.SubProduct = {
  required: false,
  serializedName: "SubProduct",
  type: {
    name: "Composite",
    className: "SubProduct",
    modelProperties: {
      subId: {
        serializedName: "subId",
        required: true,
        type: {
          name: "Number",
        },
      },
      subName: {
        serializedName: "subName",
        required: true,
        type: {
          name: "String",
        },
      },
      provisioningState: {
        serializedName: "provisioningState",
        required: false,
        type: {
          name: "Enum",
          allowedValues: ["Creating", "Failed", "Succeeded"],
        },
      },
      makeTime: {
        serializedName: "makeTime",
        required: false,
        type: {
          name: "DateTime",
        },
      },
      invoiceInfo: {
        serializedName: "invoiceInfo",
        required: false,
        type: {
          name: "Composite",
          className: "Invoice",
        },
      },
    },
  },
};

internalMappers.discriminators = {
  Fish: internalMappers.Fish,
  "Fish.shark": internalMappers.Shark,
  "Fish.sawshark": internalMappers.SawShark,
  Pet: internalMappers.Pet,
  "Pet.Cat": internalMappers.Cat,
  "Pet.Dog": internalMappers.Dog,
};

internalMappers.requestBody1 = {
  parameterPath: "requestBody",
  mapper: CreateQueueBody,
};

internalMappers.TelemetryItem = {
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

internalMappers.MonitorBase = {
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

internalMappers.MonitorDomain = {
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

internalMappers.body = {
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

export const Mappers = internalMappers;
