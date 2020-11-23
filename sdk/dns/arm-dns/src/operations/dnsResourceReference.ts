import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DnsManagementClient } from "../dnsManagementClient";
import {
  DnsResourceReferenceRequest,
  DnsResourceReferenceGetByTargetResourcesResponse
} from "../models";

/**
 * Class representing a DnsResourceReference.
 */
export class DnsResourceReference {
  private readonly client: DnsManagementClient;

  /**
   * Initialize a new instance of the class DnsResourceReference class.
   * @param client Reference to the service client
   */
  constructor(client: DnsManagementClient) {
    this.client = client;
  }

  /**
   * Returns the DNS records specified by the referencing targetResourceIds.
   * @param parameters Properties for dns resource reference request.
   * @param options The options parameters.
   */
  getByTargetResources(
    parameters: DnsResourceReferenceRequest,
    options?: coreHttp.OperationOptions
  ): Promise<DnsResourceReferenceGetByTargetResourcesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getByTargetResourcesOperationSpec
    ) as Promise<DnsResourceReferenceGetByTargetResourcesResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getByTargetResourcesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/getDnsResourceReference",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.DnsResourceReferenceResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
