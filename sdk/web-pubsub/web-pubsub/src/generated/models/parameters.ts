import {
  OperationURLParameter,
  OperationQueryParameter,
  OperationParameter
} from "@azure/core-client";

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
    defaultValue: "2021-08-01-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json, text/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const hub: OperationURLParameter = {
  parameterPath: "hub",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z][A-Za-z0-9_`,.[\\]]{0,127}$")
    },
    serializedName: "hub",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const userId: OperationQueryParameter = {
  parameterPath: ["options", "userId"],
  mapper: {
    defaultValue: "",
    serializedName: "userId",
    type: {
      name: "String"
    }
  }
};

export const role: OperationQueryParameter = {
  parameterPath: ["options", "role"],
  mapper: {
    serializedName: "role",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: "Multi"
};

export const minutesToExpire: OperationQueryParameter = {
  parameterPath: ["options", "minutesToExpire"],
  mapper: {
    defaultValue: 60,
    serializedName: "minutesToExpire",
    type: {
      name: "Number"
    }
  }
};

export const contentType: OperationParameter = {
  parameterPath: "contentType",
  mapper: {
    serializedName: "Content-Type",
    required: true,
    type: {
      name: "Enum",
      allowedValues: ["application/json", "application/octet-stream"]
    }
  }
};

export const message: OperationParameter = {
  parameterPath: "message",
  mapper: {
    serializedName: "message",
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

export const message1: OperationParameter = {
  parameterPath: "message",
  mapper: {
    serializedName: "message",
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
  collectionFormat: "Multi"
};

export const connectionId: OperationURLParameter = {
  parameterPath: "connectionId",
  mapper: {
    constraints: {
      MinLength: 1
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

export const group: OperationURLParameter = {
  parameterPath: "group",
  mapper: {
    constraints: {
      MaxLength: 1024,
      MinLength: 1
    },
    serializedName: "group",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const userId1: OperationURLParameter = {
  parameterPath: "userId",
  mapper: {
    constraints: {
      MinLength: 1
    },
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
