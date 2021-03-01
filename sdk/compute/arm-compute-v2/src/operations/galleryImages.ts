import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  GalleryImage,
  GalleryImagesCreateOrUpdateResponse,
  GalleryImageUpdate,
  GalleryImagesUpdateResponse,
  GalleryImagesGetResponse,
  GalleryImagesListByGalleryResponse,
  GalleryImagesListByGalleryNextResponse
} from "../models";

/** Class representing a GalleryImages. */
export class GalleryImages {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class GalleryImages class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * List gallery Image Definitions in a gallery.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery from which Image Definitions are to be
   *                    listed.
   * @param options The options parameters.
   */
  public listByGallery(
    resourceGroupName: string,
    galleryName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<GalleryImage> {
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
  ): AsyncIterableIterator<GalleryImage[]> {
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
  ): AsyncIterableIterator<GalleryImage> {
    for await (const page of this.listByGalleryPagingPage(
      resourceGroupName,
      galleryName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Create or update a gallery Image Definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition is to be
   *                    created.
   * @param galleryImageName The name of the gallery Image Definition to be created or updated. The
   *                         allowed characters are alphabets and numbers with dots, dashes, and periods allowed in the middle.
   *                         The maximum length is 80 characters.
   * @param galleryImage Parameters supplied to the create or update gallery image operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImage,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<GalleryImagesCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImage,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        GalleryImagesCreateOrUpdateResponse
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
   * Update a gallery Image Definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition is to be
   *                    updated.
   * @param galleryImageName The name of the gallery Image Definition to be updated. The allowed
   *                         characters are alphabets and numbers with dots, dashes, and periods allowed in the middle. The
   *                         maximum length is 80 characters.
   * @param galleryImage Parameters supplied to the update gallery image operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImageUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<GalleryImagesUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImage,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        GalleryImagesUpdateResponse
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
   * Retrieves information about a gallery Image Definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery from which the Image Definitions are to be
   *                    retrieved.
   * @param galleryImageName The name of the gallery Image Definition to be retrieved.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GalleryImagesGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<GalleryImagesGetResponse>;
  }

  /**
   * Delete a gallery image.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition is to be
   *                    deleted.
   * @param galleryImageName The name of the gallery Image Definition to be deleted.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      galleryImageName,
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
   * List gallery Image Definitions in a gallery.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery from which Image Definitions are to be
   *                    listed.
   * @param options The options parameters.
   */
  private _listByGallery(
    resourceGroupName: string,
    galleryName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GalleryImagesListByGalleryResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByGalleryOperationSpec
    ) as Promise<GalleryImagesListByGalleryResponse>;
  }

  /**
   * ListByGalleryNext
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery from which Image Definitions are to be
   *                    listed.
   * @param nextLink The nextLink from the previous successful call to the ListByGallery method.
   * @param options The options parameters.
   */
  private _listByGalleryNext(
    resourceGroupName: string,
    galleryName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<GalleryImagesListByGalleryNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      galleryName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByGalleryNextOperationSpec
    ) as Promise<GalleryImagesListByGalleryNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImage
    },
    201: {
      bodyMapper: Mappers.GalleryImage
    },
    202: {
      bodyMapper: Mappers.GalleryImage
    },
    204: {
      bodyMapper: Mappers.GalleryImage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.galleryImage,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImage
    },
    201: {
      bodyMapper: Mappers.GalleryImage
    },
    202: {
      bodyMapper: Mappers.GalleryImage
    },
    204: {
      bodyMapper: Mappers.GalleryImage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.galleryImage1,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImage
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
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}",
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
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByGalleryOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImageList
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
      bodyMapper: Mappers.GalleryImageList
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
