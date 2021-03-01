import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import {
  VirtualMachineImagesGetResponse,
  VirtualMachineImagesListOptionalParams,
  VirtualMachineImagesListResponse,
  VirtualMachineImagesListOffersResponse,
  VirtualMachineImagesListPublishersResponse,
  VirtualMachineImagesListSkusResponse
} from "../models";

/** Class representing a VirtualMachineImages. */
export class VirtualMachineImages {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineImages class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets a virtual machine image.
   * @param location The name of a supported Azure region.
   * @param publisherName A valid image publisher.
   * @param offer A valid image publisher offer.
   * @param skus A valid image SKU.
   * @param version A valid image SKU version.
   * @param options The options parameters.
   */
  get(
    location: string,
    publisherName: string,
    offer: string,
    skus: string,
    version: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineImagesGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      publisherName,
      offer,
      skus,
      version,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineImagesGetResponse>;
  }

  /**
   * Gets a list of all virtual machine image versions for the specified location, publisher, offer, and
   * SKU.
   * @param location The name of a supported Azure region.
   * @param publisherName A valid image publisher.
   * @param offer A valid image publisher offer.
   * @param skus A valid image SKU.
   * @param options The options parameters.
   */
  list(
    location: string,
    publisherName: string,
    offer: string,
    skus: string,
    options?: VirtualMachineImagesListOptionalParams
  ): Promise<VirtualMachineImagesListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      publisherName,
      offer,
      skus,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineImagesListResponse>;
  }

  /**
   * Gets a list of virtual machine image offers for the specified location and publisher.
   * @param location The name of a supported Azure region.
   * @param publisherName A valid image publisher.
   * @param options The options parameters.
   */
  listOffers(
    location: string,
    publisherName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineImagesListOffersResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      publisherName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOffersOperationSpec
    ) as Promise<VirtualMachineImagesListOffersResponse>;
  }

  /**
   * Gets a list of virtual machine image publishers for the specified Azure location.
   * @param location The name of a supported Azure region.
   * @param options The options parameters.
   */
  listPublishers(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineImagesListPublishersResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listPublishersOperationSpec
    ) as Promise<VirtualMachineImagesListPublishersResponse>;
  }

  /**
   * Gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
   * @param location The name of a supported Azure region.
   * @param publisherName A valid image publisher.
   * @param offer A valid image publisher offer.
   * @param options The options parameters.
   */
  listSkus(
    location: string,
    publisherName: string,
    offer: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineImagesListSkusResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      publisherName,
      offer,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listSkusOperationSpec
    ) as Promise<VirtualMachineImagesListSkusResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineImage
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName,
    Parameters.version,
    Parameters.offer,
    Parameters.skus
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "VirtualMachineImageResource"
            }
          }
        }
      }
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.expand,
    Parameters.top,
    Parameters.orderby
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName,
    Parameters.offer,
    Parameters.skus
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOffersOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "VirtualMachineImageResource"
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
const listPublishersOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "VirtualMachineImageResource"
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
    Parameters.location
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listSkusOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "VirtualMachineImageResource"
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
    Parameters.publisherName,
    Parameters.offer
  ],
  headerParameters: [Parameters.accept],
  serializer
};
