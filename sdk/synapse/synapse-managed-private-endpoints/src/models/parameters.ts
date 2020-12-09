// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-http";
import { ManagedPrivateEndpoint as ManagedPrivateEndpointMapper } from "../models/mappers";

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

export const managedVirtualNetworkName: OperationURLParameter = {
  parameterPath: "managedVirtualNetworkName",
  mapper: {
    serializedName: "managedVirtualNetworkName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const managedPrivateEndpointName: OperationURLParameter = {
  parameterPath: "managedPrivateEndpointName",
  mapper: {
    serializedName: "managedPrivateEndpointName",
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

export const managedPrivateEndpoint: OperationParameter = {
  parameterPath: "managedPrivateEndpoint",
  mapper: ManagedPrivateEndpointMapper
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
