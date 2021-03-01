import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import {
  VirtualMachineExtensionImagesGetResponse,
  VirtualMachineExtensionImagesListTypesResponse,
  VirtualMachineExtensionImagesListVersionsOptionalParams,
  VirtualMachineExtensionImagesListVersionsResponse
} from "../models";

/** Class representing a VirtualMachineExtensionImages. */
export class VirtualMachineExtensionImages {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineExtensionImages class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets a virtual machine extension image.
   * @param location The name of a supported Azure region.
   * @param publisherName
   * @param version
   * @param typeParam
   * @param options The options parameters.
   */
  get(
    location: string,
    publisherName: string,
    version: string,
    typeParam: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineExtensionImagesGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      publisherName,
      version,
      typeParam,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineExtensionImagesGetResponse>;
  }

  /**
   * Gets a list of virtual machine extension image types.
   * @param location The name of a supported Azure region.
   * @param publisherName
   * @param options The options parameters.
   */
  listTypes(
    location: string,
    publisherName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineExtensionImagesListTypesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      publisherName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listTypesOperationSpec
    ) as Promise<VirtualMachineExtensionImagesListTypesResponse>;
  }

  /**
   * Gets a list of virtual machine extension image versions.
   * @param location The name of a supported Azure region.
   * @param publisherName
   * @param typeParam
   * @param options The options parameters.
   */
  listVersions(
    location: string,
    publisherName: string,
    typeParam: string,
    options?: VirtualMachineExtensionImagesListVersionsOptionalParams
  ): Promise<VirtualMachineExtensionImagesListVersionsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      publisherName,
      typeParam,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listVersionsOperationSpec
    ) as Promise<VirtualMachineExtensionImagesListVersionsResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions/{version}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineExtensionImage
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName,
    Parameters.typeParam,
    Parameters.version
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listTypesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "VirtualMachineExtensionImage"
            }
          }
        }
      }
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listVersionsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "VirtualMachineExtensionImage"
            }
          }
        }
      }
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName,
    Parameters.typeParam
  ],
  headerParameters: [Parameters.accept],
  serializer
};
