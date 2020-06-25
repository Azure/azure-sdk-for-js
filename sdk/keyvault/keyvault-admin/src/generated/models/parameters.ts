// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationURLParameter,
  OperationQueryParameter,
  OperationParameter
} from "@azure/core-http";
import {
  RoleAssignmentCreateParameters as RoleAssignmentCreateParametersMapper,
  SASTokenParameter as SASTokenParameterMapper,
  RestoreOperationParameters as RestoreOperationParametersMapper,
  SelectiveKeyRestoreOperationParameters as SelectiveKeyRestoreOperationParametersMapper
} from "../models/mappers";

export const vaultBaseUrl: OperationURLParameter = {
  parameterPath: "vaultBaseUrl",
  mapper: {
    serializedName: "vaultBaseUrl",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const scope: OperationURLParameter = {
  parameterPath: "scope",
  mapper: {
    serializedName: "scope",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const filter: OperationQueryParameter = {
  parameterPath: ["options", "filter"],
  mapper: {
    serializedName: "$filter",
    type: {
      name: "String"
    }
  }
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "7.2-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
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

export const roleAssignmentName: OperationURLParameter = {
  parameterPath: "roleAssignmentName",
  mapper: {
    serializedName: "roleAssignmentName",
    required: true,
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

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: RoleAssignmentCreateParametersMapper
};

export const azureStorageBlobContainerUri: OperationParameter = {
  parameterPath: ["options", "azureStorageBlobContainerUri"],
  mapper: SASTokenParameterMapper
};

export const jobId: OperationURLParameter = {
  parameterPath: "jobId",
  mapper: {
    serializedName: "jobId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const restoreBlobDetails: OperationParameter = {
  parameterPath: ["options", "restoreBlobDetails"],
  mapper: RestoreOperationParametersMapper
};

export const restoreBlobDetails1: OperationParameter = {
  parameterPath: ["options", "restoreBlobDetails"],
  mapper: SelectiveKeyRestoreOperationParametersMapper
};

export const keyName: OperationURLParameter = {
  parameterPath: "keyName",
  mapper: {
    serializedName: "keyName",
    required: true,
    type: {
      name: "String"
    }
  }
};
