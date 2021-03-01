import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  VirtualMachineScaleSetVMExtension,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse,
  VirtualMachineScaleSetVMExtensionUpdate,
  VirtualMachineScaleSetVMExtensionsUpdateResponse,
  VirtualMachineScaleSetVMExtensionsGetOptionalParams,
  VirtualMachineScaleSetVMExtensionsGetResponse,
  VirtualMachineScaleSetVMExtensionsListOptionalParams,
  VirtualMachineScaleSetVMExtensionsListResponse
} from "../models";

/** Class representing a VirtualMachineScaleSetVMExtensions. */
export class VirtualMachineScaleSetVMExtensions {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineScaleSetVMExtensions class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * The operation to create or update the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param extensionParameters Parameters supplied to the Create Virtual Machine Extension operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineScaleSetVMExtension,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      vmExtensionName,
      extensionParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse
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
   * The operation to update the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param extensionParameters Parameters supplied to the Update Virtual Machine Extension operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineScaleSetVMExtensionUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineScaleSetVMExtensionsUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      vmExtensionName,
      extensionParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineScaleSetVMExtensionsUpdateResponse
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
   * The operation to delete the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
   * The operation to get the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    options?: VirtualMachineScaleSetVMExtensionsGetOptionalParams
  ): Promise<VirtualMachineScaleSetVMExtensionsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      vmExtensionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineScaleSetVMExtensionsGetResponse>;
  }

  /**
   * The operation to get all extensions of an instance in Virtual Machine Scaleset.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMExtensionsListOptionalParams
  ): Promise<VirtualMachineScaleSetVMExtensionsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineScaleSetVMExtensionsListResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    201: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    202: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    204: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.extensionParameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmExtensionName,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    201: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    202: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    204: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.extensionParameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmExtensionName,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
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
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmExtensionName,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmExtensionName,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtensionsListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
