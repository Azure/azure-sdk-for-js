import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  VirtualMachineExtension,
  VirtualMachineExtensionsCreateOrUpdateResponse,
  VirtualMachineExtensionUpdate,
  VirtualMachineExtensionsUpdateResponse,
  VirtualMachineExtensionsGetOptionalParams,
  VirtualMachineExtensionsGetResponse,
  VirtualMachineExtensionsListOptionalParams,
  VirtualMachineExtensionsListResponse
} from "../models";

/** Class representing a VirtualMachineExtensions. */
export class VirtualMachineExtensions {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineExtensions class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * The operation to create or update the extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine where the extension should be created or updated.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param extensionParameters Parameters supplied to the Create Virtual Machine Extension operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtension,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineExtensionsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      vmExtensionName,
      extensionParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineExtensionsCreateOrUpdateResponse
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
   * The operation to update the extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine where the extension should be updated.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param extensionParameters Parameters supplied to the Update Virtual Machine Extension operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtensionUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineExtensionsUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      vmExtensionName,
      extensionParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineExtensionsUpdateResponse
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
   * The operation to delete the extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine where the extension should be deleted.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      vmExtensionName,
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
   * The operation to get the extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine containing the extension.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    options?: VirtualMachineExtensionsGetOptionalParams
  ): Promise<VirtualMachineExtensionsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      vmExtensionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineExtensionsGetResponse>;
  }

  /**
   * The operation to get all extensions of a Virtual Machine.
   * @param resourceGroupName The name of the resource group.
   * @param vmName The name of the virtual machine containing the extension.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachineExtensionsListOptionalParams
  ): Promise<VirtualMachineExtensionsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineExtensionsListResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineExtension
    },
    201: {
      bodyMapper: Mappers.VirtualMachineExtension
    },
    202: {
      bodyMapper: Mappers.VirtualMachineExtension
    },
    204: {
      bodyMapper: Mappers.VirtualMachineExtension
    }
  },
  requestBody: Parameters.extensionParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName,
    Parameters.vmExtensionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineExtension
    },
    201: {
      bodyMapper: Mappers.VirtualMachineExtension
    },
    202: {
      bodyMapper: Mappers.VirtualMachineExtension
    },
    204: {
      bodyMapper: Mappers.VirtualMachineExtension
    }
  },
  requestBody: Parameters.extensionParameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName,
    Parameters.vmExtensionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName,
    Parameters.vmExtensionName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineExtension
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName,
    Parameters.vmExtensionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineExtensionsListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
