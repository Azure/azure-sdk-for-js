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

export const hub: OperationQueryParameter = {
  parameterPath: ["options", "hub"],
  mapper: {
    serializedName: "hub",
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

export const id: OperationURLParameter = {
  parameterPath: "id",
  mapper: {
    serializedName: "id",
    required: true,
    type: {
      name: "String"
    }
  }
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

export const connectionId1: OperationURLParameter = {
  parameterPath: "connectionId",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z][A-Za-z0-9_`,.[\\]]{0,127}$")
    },
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

export const group1: OperationURLParameter = {
  parameterPath: "group",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z][A-Za-z0-9_`,.[\\]]{0,127}$")
    },
    serializedName: "group",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const user: OperationURLParameter = {
  parameterPath: "user",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z][A-Za-z0-9_`,.[\\]]{0,127}$")
    },
    serializedName: "user",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const user1: OperationURLParameter = {
  parameterPath: "user",
  mapper: {
    serializedName: "user",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const ttl: OperationQueryParameter = {
  parameterPath: ["options", "ttl"],
  mapper: {
    serializedName: "ttl",
    type: {
      name: "Number"
    }
  }
};
