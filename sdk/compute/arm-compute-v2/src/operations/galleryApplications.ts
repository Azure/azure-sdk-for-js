import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  GalleryApplication,
  GalleryApplicationsCreateOrUpdateResponse,
  GalleryApplicationUpdate,
  GalleryApplicationsUpdateResponse,
  GalleryApplicationsGetResponse,
  GalleryApplicationsListByGalleryResponse,
  GalleryApplicationsListByGalleryNextResponse
} from "../models";

/** Class representing a GalleryApplications. */
export class GalleryApplications {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class GalleryApplications class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * List gallery Application Definitions in a gallery.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Application Gallery from which Application Definitions are
   *                    to be listed.
   * @param options The options parameters.
   */
  public listByGallery(
    resourceGroupName: string,
    galleryName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<GalleryApplication> {
    const iter = this.listByGalleryPagingAll(
      resourceGroupName,
      galleryName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByGalleryPagingPage(
          resourceGroupName,
          galleryName,
          options
        );
      }
    };
  }

  private async *listByGalleryPagingPage(
    resourceGroupName: string,
    galleryName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<GalleryApplication[]> {
    let result = await this._listByGallery(
      resourceGroupName,
      galleryName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByGalleryNext(
        resourceGroupName,
        galleryName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByGalleryPagingAll(
    resourceGroupName: string,
    galleryName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<GalleryApplication> {
    for await (const page of this.listByGalleryPagingPage(
      resourceGroupName,
      galleryName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Create or update a gallery Application Definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Application Gallery in which the Application Definition is
   *                    to be created.
   * @param galleryApplicationName The name of the gallery Application Definition to be created or
   *                               updated. The allowed characters are alphabets and numbers with dots, dashes, and periods allowed in
   *                               the middle. The maximum length is 80 characters.
   * @param galleryApplication Parameters supplied to the create or update gallery Application operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplication,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<GalleryApplicationsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryApplicationName,
      galleryApplication,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        GalleryApplicationsCreateOrUpdateResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Update a gallery Application Definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Application Gallery in which the Application Definition is
   *                    to be updated.
   * @param galleryApplicationName The name of the gallery Application Definition to be updated. The
   *                               allowed characters are alphabets and numbers with dots, dashes, and periods allowed in the middle.
   *                               The maximum length is 80 characters.
   * @param galleryApplication Parameters supplied to the update gallery Application operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    galleryApplication: GalleryApplicationUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<GalleryApplicationsUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryApplicationName,
      galleryApplication,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        GalleryApplicationsUpdateResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      updateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: updateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Retrieves information about a gallery Application Definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Application Gallery from which the Application Definitions
   *                    are to be retrieved.
   * @param galleryApplicationName The name of the gallery Application Definition to be retrieved.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GalleryApplicationsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryApplicationName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<GalleryApplicationsGetResponse>;
  }

  /**
   * Delete a gallery Application.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Application Gallery in which the Application Definition is
   *                    to be deleted.
   * @param galleryApplicationName The name of the gallery Application Definition to be deleted.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    galleryName: string,
    galleryApplicationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryApplicationName,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * List gallery Application Definitions in a gallery.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Application Gallery from which Application Definitions are
   *                    to be listed.
   * @param options The options parameters.
   */
  private _listByGallery(
    resourceGroupName: string,
    galleryName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GalleryApplicationsListByGalleryResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByGalleryOperationSpec
    ) as Promise<GalleryApplicationsListByGalleryResponse>;
  }

  /**
   * ListByGalleryNext
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Application Gallery from which Application Definitions are
   *                    to be listed.
   * @param nextLink The nextLink from the previous successful call to the ListByGallery method.
   * @param options The options parameters.
   */
  private _listByGalleryNext(
    resourceGroupName: string,
    galleryName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<GalleryApplicationsListByGalleryNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByGalleryNextOperationSpec
    ) as Promise<GalleryApplicationsListByGalleryNextResponse>;
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryApplication
    },
    201: {
      bodyMapper: Mappers.GalleryApplication
    },
    202: {
      bodyMapper: Mappers.GalleryApplication
    },
    204: {
      bodyMapper: Mappers.GalleryApplication
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.galleryApplication,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryApplicationName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryApplication
    },
    201: {
      bodyMapper: Mappers.GalleryApplication
    },
    202: {
      bodyMapper: Mappers.GalleryApplication
    },
    204: {
      bodyMapper: Mappers.GalleryApplication
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.galleryApplication1,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryApplicationName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryApplication
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryApplicationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryApplicationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByGalleryOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryApplicationList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByGalleryNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryApplicationList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.galleryName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
