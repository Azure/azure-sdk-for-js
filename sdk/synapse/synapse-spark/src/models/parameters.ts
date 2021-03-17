// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-http";
import {
  SparkBatchJobOptions as SparkBatchJobOptionsMapper,
  SparkSessionOptions as SparkSessionOptionsMapper,
  SparkStatementOptions as SparkStatementOptionsMapper
} from "../models/mappers";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const endpoint: OperationURLParameter = {
  parameterPath: "endpoint",
  mapper: {
    serializedName: "endpoint",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const livyApiVersion: OperationURLParameter = {
  parameterPath: "livyApiVersion",
  mapper: {
    serializedName: "livyApiVersion",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const sparkPoolName: OperationURLParameter = {
  parameterPath: "sparkPoolName",
  mapper: {
    serializedName: "sparkPoolName",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const fromParam: OperationQueryParameter = {
  parameterPath: ["options", "fromParam"],
  mapper: {
    serializedName: "from",
    type: {
      name: "Number"
    }
  }
};

export const size: OperationQueryParameter = {
  parameterPath: ["options", "size"],
  mapper: {
    serializedName: "size",
    type: {
      name: "Number"
    }
  }
};

export const detailed: OperationQueryParameter = {
  parameterPath: ["options", "detailed"],
  mapper: {
    serializedName: "detailed",
    type: {
      name: "Boolean"
    }
  }
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const sparkBatchJobOptions: OperationParameter = {
  parameterPath: "sparkBatchJobOptions",
  mapper: SparkBatchJobOptionsMapper
};

export const batchId: OperationURLParameter = {
  parameterPath: "batchId",
  mapper: {
    serializedName: "batchId",
    required: true,
    type: {
      name: "Number"
    }
  }
};

export const sparkSessionOptions: OperationParameter = {
  parameterPath: "sparkSessionOptions",
  mapper: SparkSessionOptionsMapper
};

export const sessionId: OperationURLParameter = {
  parameterPath: "sessionId",
  mapper: {
    serializedName: "sessionId",
    required: true,
    type: {
      name: "Number"
    }
  }
};

export const sparkStatementOptions: OperationParameter = {
  parameterPath: "sparkStatementOptions",
  mapper: SparkStatementOptionsMapper
};

export const statementId: OperationURLParameter = {
  parameterPath: "statementId",
  mapper: {
    serializedName: "statementId",
    required: true,
    type: {
      name: "Number"
    }
  }
};
