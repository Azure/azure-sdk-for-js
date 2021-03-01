import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import {
  VirtualMachineImagesEdgeZoneGetResponse,
  VirtualMachineImagesEdgeZoneListOptionalParams,
  VirtualMachineImagesEdgeZoneListResponse,
  VirtualMachineImagesEdgeZoneListOffersResponse,
  VirtualMachineImagesEdgeZoneListPublishersResponse,
  VirtualMachineImagesEdgeZoneListSkusResponse
} from "../models";

/** Class representing a VirtualMachineImagesEdgeZone. */
export class VirtualMachineImagesEdgeZone {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineImagesEdgeZone class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets a virtual machine image in an edge zone.
   * @param location The name of a supported Azure region.
   * @param edgeZone The name of the edge zone.
   * @param publisherName A valid image publisher.
   * @param offer A valid image publisher offer.
   * @param skus A valid image SKU.
   * @param version A valid image SKU version.
   * @param options The options parameters.
   */
  get(
    location: string,
    edgeZone: string,
    publisherName: string,
    offer: string,
    skus: string,
    version: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineImagesEdgeZoneGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      edgeZone,
      publisherName,
      offer,
      skus,
      version,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineImagesEdgeZoneGetResponse>;
  }

  /**
   * Gets a list of all virtual machine image versions for the specified location, edge zone, publisher,
   * offer, and SKU.
   * @param location The name of a supported Azure region.
   * @param edgeZone The name of the edge zone.
   * @param publisherName A valid image publisher.
   * @param offer A valid image publisher offer.
   * @param skus A valid image SKU.
   * @param options The options parameters.
   */
  list(
    location: string,
    edgeZone: string,
    publisherName: string,
    offer: string,
    skus: string,
    options?: VirtualMachineImagesEdgeZoneListOptionalParams
  ): Promise<VirtualMachineImagesEdgeZoneListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      edgeZone,
      publisherName,
      offer,
      skus,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineImagesEdgeZoneListResponse>;
  }

  /**
   * Gets a list of virtual machine image offers for the specified location, edge zone and publisher.
   * @param location The name of a supported Azure region.
   * @param edgeZone The name of the edge zone.
   * @param publisherName A valid image publisher.
   * @param options The options parameters.
   */
  listOffers(
    location: string,
    edgeZone: string,
    publisherName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineImagesEdgeZoneListOffersResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      edgeZone,
      publisherName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOffersOperationSpec
    ) as Promise<VirtualMachineImagesEdgeZoneListOffersResponse>;
  }

  /**
   * Gets a list of virtual machine image publishers for the specified Azure location and edge zone.
   * @param location The name of a supported Azure region.
   * @param edgeZone The name of the edge zone.
   * @param options The options parameters.
   */
  listPublishers(
    location: string,
    edgeZone: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineImagesEdgeZoneListPublishersResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      edgeZone,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listPublishersOperationSpec
    ) as Promise<VirtualMachineImagesEdgeZoneListPublishersResponse>;
  }

  /**
   * Gets a list of virtual machine image SKUs for the specified location, edge zone, publisher, and
   * offer.
   * @param location The name of a supported Azure region.
   * @param edgeZone The name of the edge zone.
   * @param publisherName A valid image publisher.
   * @param offer A valid image publisher offer.
   * @param options The options parameters.
   */
  listSkus(
    location: string,
    edgeZone: string,
    publisherName: string,
    offer: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineImagesEdgeZoneListSkusResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      edgeZone,
      publisherName,
      offer,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listSkusOperationSpec
    ) as Promise<VirtualMachineImagesEdgeZoneListSkusResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions/{version}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineImage
    },
    default: {
      bodyMapper: Mappers.CloudError
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
    Parameters.skus,
    Parameters.edgeZone
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus/{skus}/versions",
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
    },
    default: {
      bodyMapper: Mappers.CloudError
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
    Parameters.skus,
    Parameters.edgeZone
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOffersOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers",
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
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName,
    Parameters.edgeZone
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listPublishersOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers",
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
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.edgeZone
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listSkusOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/edgeZones/{edgeZone}/publishers/{publisherName}/artifacttypes/vmimage/offers/{offer}/skus",
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
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName,
    Parameters.offer,
    Parameters.edgeZone
  ],
  headerParameters: [Parameters.accept],
  serializer
};
