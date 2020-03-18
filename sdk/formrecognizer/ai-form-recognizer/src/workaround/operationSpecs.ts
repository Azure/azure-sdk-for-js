// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../generated/models/mappers";
import * as Parameters from "../generated/models/parameters";

const serializer = new coreHttp.Serializer(Mappers);
export const analyzeReceiptAsyncOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "prebuilt/receipt/analyze",
  urlParameters: [Parameters.endpoint],
  queryParameters: [Parameters.includeTextDetails],
  requestBody: {
    parameterPath: "body",
    mapper: {
        required: true,
        serializedName: "body",
        type: {
            name: "Stream"
        }
    }
  },
  responses: {
    202: {
      headersMapper: Mappers.AnalyzeReceiptAsyncHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
      headersMapper: Mappers.AnalyzeReceiptAsyncHeaders
    }
  },
  serializer
};

export const analyzeLayoutAsyncOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "layout/analyze",
  urlParameters: [
    Parameters.endpoint
  ],
  requestBody: {
    parameterPath: "body",
    mapper: {
        required: true,
        serializedName: "body",
        type: {
            name: "Stream"
        }
    }
  },
  responses: {
    202: {
      headersMapper: Mappers.AnalyzeLayoutAsyncHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
      headersMapper: Mappers.AnalyzeLayoutAsyncHeaders
    }
  },
  serializer
};

export const analyzeWithCustomModelOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "custom/models/{modelId}/analyze",
  urlParameters: [
    Parameters.endpoint,
    Parameters.modelId
  ],
  queryParameters: [
    Parameters.includeTextDetails
  ],
  requestBody: {
    parameterPath: "body",
    mapper: {
        required: true,
        serializedName: "body",
        type: {
            name: "Stream"
        }
    }
  },
  responses: {
    202: {
      headersMapper: Mappers.AnalyzeWithCustomModelHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
      headersMapper: Mappers.AnalyzeWithCustomModelHeaders
    }
  },
  serializer
};

