// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-http";
import { RoleAssignmentOptions as RoleAssignmentOptionsMapper } from "../models/mappers";

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
    defaultValue: "2020-02-01-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const roleId: OperationURLParameter = {
  parameterPath: "roleId",
  mapper: {
    serializedName: "roleId",
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

export const createRoleAssignmentOptions: OperationParameter = {
  parameterPath: "createRoleAssignmentOptions",
  mapper: RoleAssignmentOptionsMapper
};

export const roleId1: OperationQueryParameter = {
  parameterPath: ["options", "roleId"],
  mapper: {
    serializedName: "roleId",
    type: {
      name: "String"
    }
  }
};

export const principalId: OperationQueryParameter = {
  parameterPath: ["options", "principalId"],
  mapper: {
    serializedName: "principalId",
    type: {
      name: "String"
    }
  }
};

export const continuationToken: OperationParameter = {
  parameterPath: ["options", "continuationToken"],
  mapper: {
    serializedName: "x-ms-continuation",
    type: {
      name: "String"
    }
  }
};

export const roleAssignmentId: OperationURLParameter = {
  parameterPath: "roleAssignmentId",
  mapper: {
    constraints: {
      MinLength: 1
    },
    serializedName: "roleAssignmentId",
    required: true,
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
