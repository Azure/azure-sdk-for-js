// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSerializer, OperationSpec } from "@azure/core-client";
import * as Mappers from "./generated/models/mappers";
import * as Parameters from "./generated/models/parameters";

const serializer = createSerializer(Mappers, /* isXml */ false);

export function createRegisterOperationSpec(schemaFormat: string): OperationSpec {
  if (schemaFormat) {
    return {
      path: "/$schemaGroups/{groupName}/schemas/{schemaName}",
      httpMethod: "PUT",
      responses: {
        204: {
          headersMapper: Mappers.SchemaRegisterHeaders
        },
        default: {
          bodyMapper: Mappers.ErrorModel,
          headersMapper: Mappers.SchemaRegisterExceptionHeaders
        }
      },
      requestBody: Parameters.schemaContent,
      queryParameters: [Parameters.apiVersion],
      urlParameters: [Parameters.endpoint, Parameters.groupName, Parameters.schemaName],
      contentType: `application/json; serialization=${schemaFormat}`,
      headerParameters: [Parameters.accept2],
      mediaType: "binary",
      serializer
    };
  } else {
    throw new Error(`schema format can not be ${schemaFormat}`);
  }
}

export function createQueryIdByContentOperationSpec(schemaFormat: string): OperationSpec {
  if (schemaFormat) {
    return {
      path: "/$schemaGroups/{groupName}/schemas/{schemaName}:get-id",
      httpMethod: "POST",
      responses: {
        204: {
          headersMapper: Mappers.SchemaQueryIdByContentHeaders
        },
        default: {
          bodyMapper: Mappers.ErrorModel,
          headersMapper: Mappers.SchemaQueryIdByContentExceptionHeaders
        }
      },
      contentType: `application/json; serialization=${schemaFormat}`,
      requestBody: Parameters.schemaContent,
      queryParameters: [Parameters.apiVersion],
      urlParameters: [Parameters.endpoint, Parameters.groupName, Parameters.schemaName],
      headerParameters: [Parameters.accept2],
      mediaType: "binary",
      serializer
    };
  } else {
    throw new Error(`schema format can not be ${schemaFormat}`);
  }
}
