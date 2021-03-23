import {
  OperationURLParameter,
  OperationQueryParameter,
  OperationParameter,
  QueryCollectionFormat
} from "@azure/core-http";

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2020-10-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const contentType: OperationParameter = {
  parameterPath: "contentType",
  mapper: {
    defaultValue: "application/octet-stream",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const payloadMessage: OperationParameter = {
  parameterPath: "payloadMessage",
  mapper: {
    serializedName: "payloadMessage",
    required: true,
    type: {
      name: "Stream"
    }
  }
};

export const contentType1: OperationParameter = {
  parameterPath: "contentType",
  mapper: {
    defaultValue: "text/plain",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const payloadMessage1: OperationParameter = {
  parameterPath: "payloadMessage",
  mapper: {
    serializedName: "payloadMessage",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const hub: OperationURLParameter = {
  parameterPath: "hub",
  mapper: {
    serializedName: "hub",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const excluded: OperationQueryParameter = {
  parameterPath: ["options", "excluded"],
  mapper: {
    serializedName: "excluded",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: QueryCollectionFormat.Multi
};

export const connectionId: OperationURLParameter = {
  parameterPath: "connectionId",
  mapper: {
    serializedName: "connectionId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const reason: OperationQueryParameter = {
  parameterPath: ["options", "reason"],
  mapper: {
    serializedName: "reason",
    type: {
      name: "String"
    }
  }
};

export const group: OperationURLParameter = {
  parameterPath: "group",
  mapper: {
    serializedName: "group",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const userId: OperationURLParameter = {
  parameterPath: "userId",
  mapper: {
    serializedName: "userId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const permission: OperationURLParameter = {
  parameterPath: "permission",
  mapper: {
    serializedName: "permission",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const targetName: OperationQueryParameter = {
  parameterPath: ["options", "targetName"],
  mapper: {
    serializedName: "targetName",
    type: {
      name: "String"
    }
  }
};

export const permission1: OperationURLParameter = {
  parameterPath: "permission",
  mapper: {
    serializedName: "permission",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const permission2: OperationURLParameter = {
  parameterPath: "permission",
  mapper: {
    serializedName: "permission",
    required: true,
    type: {
      name: "String"
    }
  }
};
