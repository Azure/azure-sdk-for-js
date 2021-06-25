import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IoTSpaces } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { IoTSpacesClientContext } from "../ioTSpacesClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  IoTSpacesDescription,
  IoTSpacesListNextOptionalParams,
  IoTSpacesListOptionalParams,
  IoTSpacesListByResourceGroupNextOptionalParams,
  IoTSpacesListByResourceGroupOptionalParams,
  IoTSpacesGetOptionalParams,
  IoTSpacesGetResponse,
  IoTSpacesCreateOrUpdateOptionalParams,
  IoTSpacesCreateOrUpdateResponse,
  IoTSpacesPatchDescription,
  IoTSpacesUpdateOptionalParams,
  IoTSpacesUpdateResponse,
  IoTSpacesDeleteOptionalParams,
  IoTSpacesDeleteResponse,
  IoTSpacesListResponse,
  IoTSpacesListByResourceGroupResponse,
  OperationInputs,
  IoTSpacesCheckNameAvailabilityOptionalParams,
  IoTSpacesCheckNameAvailabilityResponse,
  IoTSpacesListNextResponse,
  IoTSpacesListByResourceGroupNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class representing a IoTSpaces. */
export class IoTSpacesImpl implements IoTSpaces {
  private readonly client: IoTSpacesClientContext;

  /**
   * Initialize a new instance of the class IoTSpaces class.
   * @param client Reference to the service client
   */
  constructor(client: IoTSpacesClientContext) {
    this.client = client;
  }

  /**
   * Get all the IoTSpaces instances in a subscription.
   * @param options The options parameters.
   */
  public list(
    options?: IoTSpacesListOptionalParams
  ): PagedAsyncIterableIterator<IoTSpacesDescription> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(options);
      }
    };
  }

  private async *listPagingPage(
    options?: IoTSpacesListOptionalParams
  ): AsyncIterableIterator<IoTSpacesDescription[]> {
    let result = await this._list(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    options?: IoTSpacesListOptionalParams
  ): AsyncIterableIterator<IoTSpacesDescription> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get all the IoTSpaces instances in a resource group.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: IoTSpacesListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<IoTSpacesDescription> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByResourceGroupPagingPage(resourceGroupName, options);
      }
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: IoTSpacesListByResourceGroupOptionalParams
  ): AsyncIterableIterator<IoTSpacesDescription[]> {
    let result = await this._listByResourceGroup(resourceGroupName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: IoTSpacesListByResourceGroupOptionalParams
  ): AsyncIterableIterator<IoTSpacesDescription> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Get the metadata of a IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    options?: IoTSpacesGetOptionalParams
  ): Promise<IoTSpacesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, options },
      getOperationSpec
    );
  }

  /**
   * Create or update the metadata of an IoTSpaces instance. The usual pattern to modify a property is to
   * retrieve the IoTSpaces instance metadata and security metadata, and then combine them with the
   * modified values in a new body to update the IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param iotSpaceDescription The IoTSpaces instance metadata and security metadata.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    resourceName: string,
    iotSpaceDescription: IoTSpacesDescription,
    options?: IoTSpacesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<IoTSpacesCreateOrUpdateResponse>,
      IoTSpacesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<IoTSpacesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return { flatResponse, rawResponse: currentRawResponse! };
    };

    return new LROPoller(
      { intervalInMs: options?.updateIntervalInMs },
      { resourceGroupName, resourceName, iotSpaceDescription, options },
      createOrUpdateOperationSpec,
      sendOperation
    );
  }

  /**
   * Create or update the metadata of an IoTSpaces instance. The usual pattern to modify a property is to
   * retrieve the IoTSpaces instance metadata and security metadata, and then combine them with the
   * modified values in a new body to update the IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param iotSpaceDescription The IoTSpaces instance metadata and security metadata.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    resourceName: string,
    iotSpaceDescription: IoTSpacesDescription,
    options?: IoTSpacesCreateOrUpdateOptionalParams
  ): Promise<IoTSpacesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      resourceName,
      iotSpaceDescription,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Update the metadata of a IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param iotSpacePatchDescription The IoTSpaces instance metadata and security metadata.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    resourceName: string,
    iotSpacePatchDescription: IoTSpacesPatchDescription,
    options?: IoTSpacesUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<IoTSpacesUpdateResponse>,
      IoTSpacesUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<IoTSpacesUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return { flatResponse, rawResponse: currentRawResponse! };
    };

    return new LROPoller(
      { intervalInMs: options?.updateIntervalInMs },
      { resourceGroupName, resourceName, iotSpacePatchDescription, options },
      updateOperationSpec,
      sendOperation
    );
  }

  /**
   * Update the metadata of a IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param iotSpacePatchDescription The IoTSpaces instance metadata and security metadata.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    resourceName: string,
    iotSpacePatchDescription: IoTSpacesPatchDescription,
    options?: IoTSpacesUpdateOptionalParams
  ): Promise<IoTSpacesUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      resourceName,
      iotSpacePatchDescription,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete an IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    resourceName: string,
    options?: IoTSpacesDeleteOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<IoTSpacesDeleteResponse>,
      IoTSpacesDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<IoTSpacesDeleteResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return { flatResponse, rawResponse: currentRawResponse! };
    };

    return new LROPoller(
      { intervalInMs: options?.updateIntervalInMs },
      { resourceGroupName, resourceName, options },
      deleteOperationSpec,
      sendOperation
    );
  }

  /**
   * Delete an IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    resourceName: string,
    options?: IoTSpacesDeleteOptionalParams
  ): Promise<IoTSpacesDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      resourceName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Get all the IoTSpaces instances in a subscription.
   * @param options The options parameters.
   */
  private _list(
    options?: IoTSpacesListOptionalParams
  ): Promise<IoTSpacesListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * Get all the IoTSpaces instances in a resource group.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: IoTSpacesListByResourceGroupOptionalParams
  ): Promise<IoTSpacesListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec
    );
  }

  /**
   * Check if an IoTSpaces instance name is available.
   * @param operationInputs Set the name parameter in the OperationInputs structure to the name of the
   *                        IoTSpaces instance to check.
   * @param options The options parameters.
   */
  checkNameAvailability(
    operationInputs: OperationInputs,
    options?: IoTSpacesCheckNameAvailabilityOptionalParams
  ): Promise<IoTSpacesCheckNameAvailabilityResponse> {
    return this.client.sendOperationRequest(
      { operationInputs, options },
      checkNameAvailabilityOperationSpec
    );
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: IoTSpacesListNextOptionalParams
  ): Promise<IoTSpacesListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: IoTSpacesListByResourceGroupNextOptionalParams
  ): Promise<IoTSpacesListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTSpaces/Graph/{resourceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    default: {
      bodyMapper: Mappers.ErrorDetails
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTSpaces/Graph/{resourceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    201: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    202: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    204: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    default: {
      bodyMapper: Mappers.ErrorDetails
    }
  },
  requestBody: Parameters.iotSpaceDescription,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTSpaces/Graph/{resourceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    201: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    202: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    204: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    default: {
      bodyMapper: Mappers.ErrorDetails
    }
  },
  requestBody: Parameters.iotSpacePatchDescription,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTSpaces/Graph/{resourceName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    201: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    202: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    204: {
      bodyMapper: Mappers.IoTSpacesDescription
    },
    default: {
      bodyMapper: Mappers.ErrorDetails
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.IoTSpaces/Graph",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IoTSpacesDescriptionListResult
    },
    default: {
      bodyMapper: Mappers.ErrorDetails
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTSpaces/Graph",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IoTSpacesDescriptionListResult
    },
    default: {
      bodyMapper: Mappers.ErrorDetails
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const checkNameAvailabilityOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.IoTSpaces/checkNameAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.IoTSpacesNameAvailabilityInfo
    },
    default: {
      bodyMapper: Mappers.ErrorDetails
    }
  },
  requestBody: Parameters.operationInputs,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IoTSpacesDescriptionListResult
    },
    default: {
      bodyMapper: Mappers.ErrorDetails
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IoTSpacesDescriptionListResult
    },
    default: {
      bodyMapper: Mappers.ErrorDetails
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
