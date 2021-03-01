import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  VirtualMachineScaleSetVM,
  VirtualMachineScaleSetVMsListNextOptionalParams,
  VirtualMachineScaleSetVMsListOptionalParams,
  VirtualMachineScaleSetVMsReimageOptionalParams,
  VirtualMachineScaleSetVMsUpdateResponse,
  VirtualMachineScaleSetVMsDeleteOptionalParams,
  VirtualMachineScaleSetVMsGetResponse,
  VirtualMachineScaleSetVMsGetInstanceViewResponse,
  VirtualMachineScaleSetVMsListResponse,
  VirtualMachineScaleSetVMsPowerOffOptionalParams,
  VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams,
  VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataResponse,
  RunCommandInput,
  VirtualMachineScaleSetVMsRunCommandResponse,
  VirtualMachineScaleSetVMsListNextResponse
} from "../models";

/** Class representing a VirtualMachineScaleSetVMs. */
export class VirtualMachineScaleSetVMs {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineScaleSetVMs class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets a list of all virtual machines in a VM scale sets.
   * @param resourceGroupName The name of the resource group.
   * @param virtualMachineScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    options?: VirtualMachineScaleSetVMsListOptionalParams
  ): PagedAsyncIterableIterator<VirtualMachineScaleSetVM> {
    const iter = this.listPagingAll(
      resourceGroupName,
      virtualMachineScaleSetName,
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
        return this.listPagingPage(
          resourceGroupName,
          virtualMachineScaleSetName,
          options
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    options?: VirtualMachineScaleSetVMsListOptionalParams
  ): AsyncIterableIterator<VirtualMachineScaleSetVM[]> {
    let result = await this._list(
      resourceGroupName,
      virtualMachineScaleSetName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        virtualMachineScaleSetName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    options?: VirtualMachineScaleSetVMsListOptionalParams
  ): AsyncIterableIterator<VirtualMachineScaleSetVM> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      virtualMachineScaleSetName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Reimages (upgrade the operating system) a specific virtual machine in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  async reimage(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsReimageOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
      reimageOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: reimageOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This
   * operation is only supported for managed disks.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  async reimageAll(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
      reimageAllOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: reimageAllOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Deallocates a specific virtual machine in a VM scale set. Shuts down the virtual machine and
   * releases the compute resources it uses. You are not billed for the compute resources of this virtual
   * machine once it is deallocated.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  async deallocate(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
      deallocateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deallocateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Updates a virtual machine of a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set where the extension should be create or updated.
   * @param instanceId The instance ID of the virtual machine.
   * @param parameters Parameters supplied to the Update Virtual Machine Scale Sets VM operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: VirtualMachineScaleSetVM,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineScaleSetVMsUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineScaleSetVMsUpdateResponse
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
   * Deletes a virtual machine from a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsDeleteOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
   * Gets a virtual machine from a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetVMsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineScaleSetVMsGetResponse>;
  }

  /**
   * Gets the status of a virtual machine from a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  getInstanceView(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetVMsGetInstanceViewResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getInstanceViewOperationSpec
    ) as Promise<VirtualMachineScaleSetVMsGetInstanceViewResponse>;
  }

  /**
   * Gets a list of all virtual machines in a VM scale sets.
   * @param resourceGroupName The name of the resource group.
   * @param virtualMachineScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    options?: VirtualMachineScaleSetVMsListOptionalParams
  ): Promise<VirtualMachineScaleSetVMsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineScaleSetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineScaleSetVMsListResponse>;
  }

  /**
   * Power off (stop) a virtual machine in a VM scale set. Note that resources are still attached and you
   * are getting charged for the resources. Instead, use deallocate to release resources and avoid
   * charges.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  async powerOff(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsPowerOffOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
      powerOffOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: powerOffOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Restarts a virtual machine in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  async restart(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
      restartOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: restartOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Starts a virtual machine in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  async start(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
      startOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: startOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers
   * it back on.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  async redeploy(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
      redeployOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: redeployOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  retrieveBootDiagnosticsData(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams
  ): Promise<VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      retrieveBootDiagnosticsDataOperationSpec
    ) as Promise<VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataResponse>;
  }

  /**
   * Performs maintenance on a virtual machine in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  async performMaintenance(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
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
      performMaintenanceOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: performMaintenanceOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to simulate the eviction of spot virtual machine in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  simulateEviction(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      simulateEvictionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Run command on a virtual machine in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param parameters Parameters supplied to the Run command operation.
   * @param options The options parameters.
   */
  async runCommand(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    parameters: RunCommandInput,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineScaleSetVMsRunCommandResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      parameters,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineScaleSetVMsRunCommandResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      runCommandOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: runCommandOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param virtualMachineScaleSetName The name of the VM scale set.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    nextLink: string,
    options?: VirtualMachineScaleSetVMsListNextOptionalParams
  ): Promise<VirtualMachineScaleSetVMsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineScaleSetName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<VirtualMachineScaleSetVMsListNextResponse>;
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

const reimageOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/reimage",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmScaleSetVMReimageInput,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const reimageAllOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/reimageall",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  serializer
};
const deallocateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/deallocate",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVM
    },
    201: {
      bodyMapper: Mappers.VirtualMachineScaleSetVM
    },
    202: {
      bodyMapper: Mappers.VirtualMachineScaleSetVM
    },
    204: {
      bodyMapper: Mappers.VirtualMachineScaleSetVM
    }
  },
  requestBody: Parameters.parameters21,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion, Parameters.forceDeletion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVM
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand1],
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
const getInstanceViewOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/instanceView",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMInstanceView
    }
  },
  queryParameters: [Parameters.apiVersion],
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
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMListResult
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.expand,
    Parameters.filter,
    Parameters.select
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualMachineScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const powerOffOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/poweroff",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion, Parameters.skipShutdown],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  serializer
};
const restartOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/restart",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  serializer
};
const startOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/start",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  serializer
};
const redeployOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/redeploy",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  serializer
};
const retrieveBootDiagnosticsDataOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/retrieveBootDiagnosticsData",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RetrieveBootDiagnosticsDataResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.sasUriExpirationTimeInMinutes
  ],
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
const performMaintenanceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/performMaintenance",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  serializer
};
const simulateEvictionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/simulateEviction",
  httpMethod: "POST",
  responses: { 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  serializer
};
const runCommandOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/runCommand",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RunCommandResult
    },
    201: {
      bodyMapper: Mappers.RunCommandResult
    },
    202: {
      bodyMapper: Mappers.RunCommandResult
    },
    204: {
      bodyMapper: Mappers.RunCommandResult
    }
  },
  requestBody: Parameters.parameters14,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMListResult
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.expand,
    Parameters.filter,
    Parameters.select
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.virtualMachineScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
