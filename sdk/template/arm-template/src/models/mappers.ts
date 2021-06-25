import * as coreClient from "@azure/core-client";

export const IoTSpacesProperties: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "IoTSpacesProperties",
    modelProperties: {
      provisioningState: {
        serializedName: "provisioningState",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      managementApiUrl: {
        serializedName: "managementApiUrl",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      webPortalUrl: {
        serializedName: "webPortalUrl",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      storageContainer: {
        serializedName: "storageContainer",
        type: {
          name: "Composite",
          className: "StorageContainerProperties"
        }
      }
    }
  }
};

export const StorageContainerProperties: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "StorageContainerProperties",
    modelProperties: {
      connectionString: {
        serializedName: "connectionString",
        type: {
          name: "String"
        }
      },
      subscriptionId: {
        serializedName: "subscriptionId",
        type: {
          name: "String"
        }
      },
      resourceGroup: {
        serializedName: "resourceGroup",
        type: {
          name: "String"
        }
      },
      containerName: {
        serializedName: "containerName",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const IoTSpacesSkuInfo: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "IoTSpacesSkuInfo",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Resource: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Resource",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      name: {
        constraints: {
          Pattern: new RegExp("^(?![0-9]+$)(?!-)[a-zA-Z0-9-]{2,49}[a-zA-Z0-9]$")
        },
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        required: true,
        type: {
          name: "String"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      }
    }
  }
};

export const ErrorDetails: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorDetails",
    modelProperties: {
      code: {
        serializedName: "code",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      target: {
        serializedName: "target",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const IoTSpacesPatchDescription: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "IoTSpacesPatchDescription",
    modelProperties: {
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "IoTSpacesProperties"
        }
      }
    }
  }
};

export const IoTSpacesDescriptionListResult: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "IoTSpacesDescriptionListResult",
    modelProperties: {
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "IoTSpacesDescription"
            }
          }
        }
      }
    }
  }
};

export const OperationListResult: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "OperationListResult",
    modelProperties: {
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Operation"
            }
          }
        }
      }
    }
  }
};

export const Operation: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Operation",
    modelProperties: {
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      display: {
        serializedName: "display",
        type: {
          name: "Composite",
          className: "OperationDisplay"
        }
      }
    }
  }
};

export const OperationDisplay: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "OperationDisplay",
    modelProperties: {
      provider: {
        serializedName: "provider",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      resource: {
        serializedName: "resource",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      operation: {
        serializedName: "operation",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const OperationInputs: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "OperationInputs",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const IoTSpacesNameAvailabilityInfo: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "IoTSpacesNameAvailabilityInfo",
    modelProperties: {
      nameAvailable: {
        serializedName: "nameAvailable",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      },
      reason: {
        serializedName: "reason",
        readOnly: true,
        type: {
          name: "Enum",
          allowedValues: ["Invalid", "AlreadyExists"]
        }
      },
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const IoTSpacesDescription: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "IoTSpacesDescription",
    modelProperties: {
      ...Resource.type.modelProperties,
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "IoTSpacesProperties"
        }
      },
      sku: {
        serializedName: "sku",
        type: {
          name: "Composite",
          className: "IoTSpacesSkuInfo"
        }
      }
    }
  }
};
