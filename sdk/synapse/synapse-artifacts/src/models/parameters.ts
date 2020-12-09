// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-http";
import {
  LinkedServiceResource as LinkedServiceResourceMapper,
  ArtifactRenameRequest as ArtifactRenameRequestMapper,
  DatasetResource as DatasetResourceMapper,
  PipelineResource as PipelineResourceMapper,
  RunFilterParameters as RunFilterParametersMapper,
  TriggerResource as TriggerResourceMapper,
  DataFlowResource as DataFlowResourceMapper,
  CreateDataFlowDebugSessionRequest as CreateDataFlowDebugSessionRequestMapper,
  DataFlowDebugPackage as DataFlowDebugPackageMapper,
  DeleteDataFlowDebugSessionRequest as DeleteDataFlowDebugSessionRequestMapper,
  DataFlowDebugCommandRequest as DataFlowDebugCommandRequestMapper,
  SqlScriptResource as SqlScriptResourceMapper,
  SparkJobDefinitionResource as SparkJobDefinitionResourceMapper,
  NotebookResource as NotebookResourceMapper,
  GitHubAccessTokenRequest as GitHubAccessTokenRequestMapper
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

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2019-06-01-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
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

export const linkedService: OperationParameter = {
  parameterPath: "linkedService",
  mapper: LinkedServiceResourceMapper
};

export const linkedServiceName: OperationURLParameter = {
  parameterPath: "linkedServiceName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z0-9_][^<>*#.%&:\\+?/]*$"),
      MaxLength: 260,
      MinLength: 1
    },
    serializedName: "linkedServiceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const ifMatch: OperationParameter = {
  parameterPath: ["options", "ifMatch"],
  mapper: {
    serializedName: "If-Match",
    type: {
      name: "String"
    }
  }
};

export const ifNoneMatch: OperationParameter = {
  parameterPath: ["options", "ifNoneMatch"],
  mapper: {
    serializedName: "If-None-Match",
    type: {
      name: "String"
    }
  }
};

export const request: OperationParameter = {
  parameterPath: "request",
  mapper: ArtifactRenameRequestMapper
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const dataset: OperationParameter = {
  parameterPath: "dataset",
  mapper: DatasetResourceMapper
};

export const datasetName: OperationURLParameter = {
  parameterPath: "datasetName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z0-9_][^<>*#.%&:\\+?/]*$"),
      MaxLength: 260,
      MinLength: 1
    },
    serializedName: "datasetName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const pipeline: OperationParameter = {
  parameterPath: "pipeline",
  mapper: PipelineResourceMapper
};

export const pipelineName: OperationURLParameter = {
  parameterPath: "pipelineName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z0-9_][^<>*#.%&:\\+?/]*$"),
      MaxLength: 260,
      MinLength: 1
    },
    serializedName: "pipelineName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters: OperationParameter = {
  parameterPath: ["options", "parameters"],
  mapper: {
    serializedName: "parameters",
    type: {
      name: "Dictionary",
      value: { type: { name: "any" } }
    }
  }
};

export const referencePipelineRunId: OperationQueryParameter = {
  parameterPath: ["options", "referencePipelineRunId"],
  mapper: {
    serializedName: "referencePipelineRunId",
    type: {
      name: "String"
    }
  }
};

export const isRecovery: OperationQueryParameter = {
  parameterPath: ["options", "isRecovery"],
  mapper: {
    serializedName: "isRecovery",
    type: {
      name: "Boolean"
    }
  }
};

export const startActivityName: OperationQueryParameter = {
  parameterPath: ["options", "startActivityName"],
  mapper: {
    serializedName: "startActivityName",
    type: {
      name: "String"
    }
  }
};

export const filterParameters: OperationParameter = {
  parameterPath: "filterParameters",
  mapper: RunFilterParametersMapper
};

export const runId: OperationURLParameter = {
  parameterPath: "runId",
  mapper: {
    serializedName: "runId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const isRecursive: OperationQueryParameter = {
  parameterPath: ["options", "isRecursive"],
  mapper: {
    serializedName: "isRecursive",
    type: {
      name: "Boolean"
    }
  }
};

export const trigger: OperationParameter = {
  parameterPath: "trigger",
  mapper: TriggerResourceMapper
};

export const triggerName: OperationURLParameter = {
  parameterPath: "triggerName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z0-9_][^<>*#.%&:\\+?/]*$"),
      MaxLength: 260,
      MinLength: 1
    },
    serializedName: "triggerName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const dataFlow: OperationParameter = {
  parameterPath: "dataFlow",
  mapper: DataFlowResourceMapper
};

export const dataFlowName: OperationURLParameter = {
  parameterPath: "dataFlowName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z0-9_][^<>*#.%&:\\+?/]*$"),
      MaxLength: 260,
      MinLength: 1
    },
    serializedName: "dataFlowName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const request1: OperationParameter = {
  parameterPath: "request",
  mapper: CreateDataFlowDebugSessionRequestMapper
};

export const request2: OperationParameter = {
  parameterPath: "request",
  mapper: DataFlowDebugPackageMapper
};

export const request3: OperationParameter = {
  parameterPath: "request",
  mapper: DeleteDataFlowDebugSessionRequestMapper
};

export const request4: OperationParameter = {
  parameterPath: "request",
  mapper: DataFlowDebugCommandRequestMapper
};

export const sqlScript: OperationParameter = {
  parameterPath: "sqlScript",
  mapper: SqlScriptResourceMapper
};

export const sqlScriptName: OperationURLParameter = {
  parameterPath: "sqlScriptName",
  mapper: {
    serializedName: "sqlScriptName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const sparkJobDefinition: OperationParameter = {
  parameterPath: "sparkJobDefinition",
  mapper: SparkJobDefinitionResourceMapper
};

export const sparkJobDefinitionName: OperationURLParameter = {
  parameterPath: "sparkJobDefinitionName",
  mapper: {
    serializedName: "sparkJobDefinitionName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const sparkJobDefinitionAzureResource: OperationParameter = {
  parameterPath: "sparkJobDefinitionAzureResource",
  mapper: SparkJobDefinitionResourceMapper
};

export const notebook: OperationParameter = {
  parameterPath: "notebook",
  mapper: NotebookResourceMapper
};

export const notebookName: OperationURLParameter = {
  parameterPath: "notebookName",
  mapper: {
    serializedName: "notebookName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const sqlPoolName: OperationURLParameter = {
  parameterPath: "sqlPoolName",
  mapper: {
    serializedName: "sqlPoolName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const bigDataPoolName: OperationURLParameter = {
  parameterPath: "bigDataPoolName",
  mapper: {
    serializedName: "bigDataPoolName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const integrationRuntimeName: OperationURLParameter = {
  parameterPath: "integrationRuntimeName",
  mapper: {
    serializedName: "integrationRuntimeName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const gitHubAccessTokenRequest: OperationParameter = {
  parameterPath: "gitHubAccessTokenRequest",
  mapper: GitHubAccessTokenRequestMapper
};

export const clientRequestId: OperationParameter = {
  parameterPath: ["options", "clientRequestId"],
  mapper: {
    serializedName: "x-ms-client-request-id",
    type: {
      name: "String"
    }
  }
};
