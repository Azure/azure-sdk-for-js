import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import { WorkspaceGetResponse } from "../models";

/**
 * Class representing a Workspace.
 */
export class Workspace {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class Workspace class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Get Workspace
   * @param options The options parameters.
   */
  get(options?: coreHttp.OperationOptions): Promise<WorkspaceGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getOperationSpec
    ) as Promise<WorkspaceGetResponse>;
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
