// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { WorkspaceGetResponse } from "../models";

/** Class representing a Workspace. */
export class Workspace {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class Workspace class.
   * @param client - Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Get Workspace
   * @param options - The options parameters.
   */
  async get(options?: coreHttp.OperationOptions): Promise<WorkspaceGetResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-get",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(operationArguments, getOperationSpec);
      return result as WorkspaceGetResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path: "/workspace",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Workspace
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
