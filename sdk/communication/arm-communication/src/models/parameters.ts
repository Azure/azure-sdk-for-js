/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter,
} from "@azure/core-client";
import {
  NameAvailabilityParameters as NameAvailabilityParametersMapper,
  LinkNotificationHubParameters as LinkNotificationHubParametersMapper,
  CommunicationServiceResourceUpdate as CommunicationServiceResourceUpdateMapper,
  CommunicationServiceResource as CommunicationServiceResourceMapper,
  RegenerateKeyParameters as RegenerateKeyParametersMapper,
  DomainResource as DomainResourceMapper,
  UpdateDomainRequestParameters as UpdateDomainRequestParametersMapper,
  VerificationParameter as VerificationParameterMapper,
  EmailServiceResource as EmailServiceResourceMapper,
  EmailServiceResourceUpdate as EmailServiceResourceUpdateMapper,
  SenderUsernameResource as SenderUsernameResourceMapper,
} from "../models/mappers.js";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String",
    },
  },
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2023-04-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String",
    },
  },
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String",
    },
  },
};

export const nameAvailabilityParameters: OperationParameter = {
  parameterPath: "nameAvailabilityParameters",
  mapper: NameAvailabilityParametersMapper,
};

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "Uuid",
    },
  },
};

export const linkNotificationHubParameters: OperationParameter = {
  parameterPath: ["options", "linkNotificationHubParameters"],
  mapper: LinkNotificationHubParametersMapper,
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    constraints: {
      MaxLength: 90,
      MinLength: 1,
    },
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const communicationServiceName: OperationURLParameter = {
  parameterPath: "communicationServiceName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[-\\w]+$"),
      MaxLength: 63,
      MinLength: 1,
    },
    serializedName: "communicationServiceName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: CommunicationServiceResourceUpdateMapper,
};

export const parameters1: OperationParameter = {
  parameterPath: "parameters",
  mapper: CommunicationServiceResourceMapper,
};

export const parameters2: OperationParameter = {
  parameterPath: "parameters",
  mapper: RegenerateKeyParametersMapper,
};

export const emailServiceName: OperationURLParameter = {
  parameterPath: "emailServiceName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9-]+$"),
      MaxLength: 63,
      MinLength: 1,
    },
    serializedName: "emailServiceName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const domainName: OperationURLParameter = {
  parameterPath: "domainName",
  mapper: {
    constraints: {
      MaxLength: 253,
      MinLength: 1,
    },
    serializedName: "domainName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters3: OperationParameter = {
  parameterPath: "parameters",
  mapper: DomainResourceMapper,
};

export const parameters4: OperationParameter = {
  parameterPath: "parameters",
  mapper: UpdateDomainRequestParametersMapper,
};

export const parameters5: OperationParameter = {
  parameterPath: "parameters",
  mapper: VerificationParameterMapper,
};

export const parameters6: OperationParameter = {
  parameterPath: "parameters",
  mapper: EmailServiceResourceMapper,
};

export const parameters7: OperationParameter = {
  parameterPath: "parameters",
  mapper: EmailServiceResourceUpdateMapper,
};

export const senderUsername: OperationURLParameter = {
  parameterPath: "senderUsername",
  mapper: {
    constraints: {
      MaxLength: 253,
      MinLength: 1,
    },
    serializedName: "senderUsername",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters8: OperationParameter = {
  parameterPath: "parameters",
  mapper: SenderUsernameResourceMapper,
};
