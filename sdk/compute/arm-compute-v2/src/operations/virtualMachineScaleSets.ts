import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  VirtualMachineScaleSet,
  VirtualMachineScaleSetSku,
  UpgradeOperationHistoricalStatusInfo,
  VirtualMachineScaleSetsListByLocationResponse,
  VirtualMachineScaleSetsCreateOrUpdateResponse,
  VirtualMachineScaleSetUpdate,
  VirtualMachineScaleSetsUpdateResponse,
  VirtualMachineScaleSetsDeleteOptionalParams,
  VirtualMachineScaleSetsGetResponse,
  VirtualMachineScaleSetsDeallocateOptionalParams,
  VirtualMachineScaleSetVMInstanceRequiredIDs,
  VirtualMachineScaleSetsDeleteInstancesOptionalParams,
  VirtualMachineScaleSetsGetInstanceViewResponse,
  VirtualMachineScaleSetsListResponse,
  VirtualMachineScaleSetsListAllResponse,
  VirtualMachineScaleSetsListSkusResponse,
  VirtualMachineScaleSetsGetOSUpgradeHistoryResponse,
  VirtualMachineScaleSetsPowerOffOptionalParams,
  VirtualMachineScaleSetsRestartOptionalParams,
  VirtualMachineScaleSetsStartOptionalParams,
  VirtualMachineScaleSetsRedeployOptionalParams,
  VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
  VirtualMachineScaleSetsReimageOptionalParams,
  VirtualMachineScaleSetsReimageAllOptionalParams,
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkResponse,
  VMScaleSetConvertToSinglePlacementGroupInput,
  OrchestrationServiceStateInput,
  VirtualMachineScaleSetsListByLocationNextResponse,
  VirtualMachineScaleSetsListNextResponse,
  VirtualMachineScaleSetsListAllNextResponse,
  VirtualMachineScaleSetsListSkusNextResponse,
  VirtualMachineScaleSetsGetOSUpgradeHistoryNextResponse
} from "../models";

/** Class representing a VirtualMachineScaleSets. */
export class VirtualMachineScaleSets {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineScaleSets class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets all the VM scale sets under the specified subscription for the specified location.
   * @param location The location for which VM scale sets under the subscription are queried.
   * @param options The options parameters.
   */
  public listByLocation(
    location: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachineScaleSet> {
    const iter = this.listByLocationPagingAll(location, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByLocationPagingPage(location, options);
      }
    };
  }

  private async *listByLocationPagingPage(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSet[]> {
    let result = await this._listByLocation(location, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByLocationNext(
        location,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByLocationPagingAll(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSet> {
    for await (const page of this.listByLocationPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of all VM scale sets under a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachineScaleSet> {
    const iter = this.listPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(resourceGroupName, options);
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSet[]> {
    let result = await this._list(resourceGroupName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSet> {
    for await (const page of this.listPagingPage(resourceGroupName, options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of all VM Scale Sets in the subscription, regardless of the associated resource group.
   * Use nextLink property in the response to get the next page of VM Scale Sets. Do this till nextLink
   * is null to fetch all the VM Scale Sets.
   * @param options The options parameters.
   */
  public listAll(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachineScaleSet> {
    const iter = this.listAllPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listAllPagingPage(options);
      }
    };
  }

  private async *listAllPagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSet[]> {
    let result = await this._listAll(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listAllNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listAllPagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSet> {
    for await (const page of this.listAllPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances
   * allowed for each SKU.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  public listSkus(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachineScaleSetSku> {
    const iter = this.listSkusPagingAll(
      resourceGroupName,
      vmScaleSetName,
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
        return this.listSkusPagingPage(
          resourceGroupName,
          vmScaleSetName,
          options
        );
      }
    };
  }

  private async *listSkusPagingPage(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSetSku[]> {
    let result = await this._listSkus(
      resourceGroupName,
      vmScaleSetName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listSkusNext(
        resourceGroupName,
        vmScaleSetName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listSkusPagingAll(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineScaleSetSku> {
    for await (const page of this.listSkusPagingPage(
      resourceGroupName,
      vmScaleSetName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets list of OS upgrades on a VM scale set instance.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  public listOSUpgradeHistory(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<UpgradeOperationHistoricalStatusInfo> {
    const iter = this.getOSUpgradeHistoryPagingAll(
      resourceGroupName,
      vmScaleSetName,
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
        return this.getOSUpgradeHistoryPagingPage(
          resourceGroupName,
          vmScaleSetName,
          options
        );
      }
    };
  }

  private async *getOSUpgradeHistoryPagingPage(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<UpgradeOperationHistoricalStatusInfo[]> {
    let result = await this._getOSUpgradeHistory(
      resourceGroupName,
      vmScaleSetName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getOSUpgradeHistoryNext(
        resourceGroupName,
        vmScaleSetName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getOSUpgradeHistoryPagingAll(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<UpgradeOperationHistoricalStatusInfo> {
    for await (const page of this.getOSUpgradeHistoryPagingPage(
      resourceGroupName,
      vmScaleSetName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all the VM scale sets under the specified subscription for the specified location.
   * @param location The location for which VM scale sets under the subscription are queried.
   * @param options The options parameters.
   */
  private _listByLocation(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsListByLocationResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByLocationOperationSpec
    ) as Promise<VirtualMachineScaleSetsListByLocationResponse>;
  }

  /**
   * Create or update a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set to create or update.
   * @param parameters The scale set object.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSet,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineScaleSetsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineScaleSetsCreateOrUpdateResponse
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
   * Update a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set to create or update.
   * @param parameters The scale set object.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSetUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachineScaleSetsUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachineScaleSetsUpdateResponse
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
   * Deletes a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeleteOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
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
   * Display information about a virtual machine scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineScaleSetsGetResponse>;
  }

  /**
   * Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and
   * releases the compute resources. You are not billed for the compute resources that this virtual
   * machine scale set deallocates.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  async deallocate(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeallocateOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
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
   * Deletes virtual machines in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param vmInstanceIDs A list of virtual machine instance IDs from the VM scale set.
   * @param options The options parameters.
   */
  async deleteInstances(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsDeleteInstancesOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      vmInstanceIDs,
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
      deleteInstancesOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteInstancesOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets the status of a VM scale set instance.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  getInstanceView(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsGetInstanceViewResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getInstanceViewOperationSpec
    ) as Promise<VirtualMachineScaleSetsGetInstanceViewResponse>;
  }

  /**
   * Gets a list of all VM scale sets under a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineScaleSetsListResponse>;
  }

  /**
   * Gets a list of all VM Scale Sets in the subscription, regardless of the associated resource group.
   * Use nextLink property in the response to get the next page of VM Scale Sets. Do this till nextLink
   * is null to fetch all the VM Scale Sets.
   * @param options The options parameters.
   */
  private _listAll(
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsListAllResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAllOperationSpec
    ) as Promise<VirtualMachineScaleSetsListAllResponse>;
  }

  /**
   * Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances
   * allowed for each SKU.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  private _listSkus(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsListSkusResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listSkusOperationSpec
    ) as Promise<VirtualMachineScaleSetsListSkusResponse>;
  }

  /**
   * Gets list of OS upgrades on a VM scale set instance.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  private _getOSUpgradeHistory(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsGetOSUpgradeHistoryResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOSUpgradeHistoryOperationSpec
    ) as Promise<VirtualMachineScaleSetsGetOSUpgradeHistoryResponse>;
  }

  /**
   * Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still
   * attached and you are getting charged for the resources. Instead, use deallocate to release resources
   * and avoid charges.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  async powerOff(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPowerOffOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
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
   * Restarts one or more virtual machines in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  async restart(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRestartOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
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
   * Starts one or more virtual machines in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  async start(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsStartOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
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
   * Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and
   * powers them back on.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  async redeploy(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRedeployOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
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
   * Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances which
   * are not eligible for perform maintenance will be failed. Please refer to best practices for more
   * details:
   * https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  async performMaintenance(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPerformMaintenanceOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
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
   * Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param vmInstanceIDs A list of virtual machine instance IDs from the VM scale set.
   * @param options The options parameters.
   */
  async updateInstances(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      vmInstanceIDs,
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
      updateInstancesOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: updateInstancesOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't
   * have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is
   * reset to initial state.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  async reimage(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
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
   * Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This
   * operation is only supported for managed disks.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  async reimageAll(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageAllOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
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
   * Manual platform update domain walk to update virtual machines in a service fabric virtual machine
   * scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param platformUpdateDomain The platform update domain for which a manual recovery walk is requested
   * @param options The options parameters.
   */
  forceRecoveryServiceFabricPlatformUpdateDomainWalk(
    resourceGroupName: string,
    vmScaleSetName: string,
    platformUpdateDomain: number,
    options?: coreHttp.OperationOptions
  ): Promise<
    VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      platformUpdateDomain,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      forceRecoveryServiceFabricPlatformUpdateDomainWalkOperationSpec
    ) as Promise<
      VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkResponse
    >;
  }

  /**
   * Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the virtual machine scale set to create or update.
   * @param parameters The input object for ConvertToSinglePlacementGroup API.
   * @param options The options parameters.
   */
  convertToSinglePlacementGroup(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VMScaleSetConvertToSinglePlacementGroupInput,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      convertToSinglePlacementGroupOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Changes ServiceState property for a given service
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the virtual machine scale set to create or update.
   * @param parameters The input object for SetOrchestrationServiceState API.
   * @param options The options parameters.
   */
  async setOrchestrationServiceState(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: OrchestrationServiceStateInput,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      parameters,
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
      setOrchestrationServiceStateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: setOrchestrationServiceStateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * ListByLocationNext
   * @param location The location for which VM scale sets under the subscription are queried.
   * @param nextLink The nextLink from the previous successful call to the ListByLocation method.
   * @param options The options parameters.
   */
  private _listByLocationNext(
    location: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsListByLocationNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByLocationNextOperationSpec
    ) as Promise<VirtualMachineScaleSetsListByLocationNextResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<VirtualMachineScaleSetsListNextResponse>;
  }

  /**
   * ListAllNext
   * @param nextLink The nextLink from the previous successful call to the ListAll method.
   * @param options The options parameters.
   */
  private _listAllNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsListAllNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAllNextOperationSpec
    ) as Promise<VirtualMachineScaleSetsListAllNextResponse>;
  }

  /**
   * ListSkusNext
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param nextLink The nextLink from the previous successful call to the ListSkus method.
   * @param options The options parameters.
   */
  private _listSkusNext(
    resourceGroupName: string,
    vmScaleSetName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsListSkusNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listSkusNextOperationSpec
    ) as Promise<VirtualMachineScaleSetsListSkusNextResponse>;
  }

  /**
   * GetOSUpgradeHistoryNext
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param nextLink The nextLink from the previous successful call to the GetOSUpgradeHistory method.
   * @param options The options parameters.
   */
  private _getOSUpgradeHistoryNext(
    resourceGroupName: string,
    vmScaleSetName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineScaleSetsGetOSUpgradeHistoryNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      vmScaleSetName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOSUpgradeHistoryNextOperationSpec
    ) as Promise<VirtualMachineScaleSetsGetOSUpgradeHistoryNextResponse>;
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

const listByLocationOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/virtualMachineScaleSets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSet
    },
    201: {
      bodyMapper: Mappers.VirtualMachineScaleSet
    },
    202: {
      bodyMapper: Mappers.VirtualMachineScaleSet
    },
    204: {
      bodyMapper: Mappers.VirtualMachineScaleSet
    }
  },
  requestBody: Parameters.parameters15,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSet
    },
    201: {
      bodyMapper: Mappers.VirtualMachineScaleSet
    },
    202: {
      bodyMapper: Mappers.VirtualMachineScaleSet
    },
    204: {
      bodyMapper: Mappers.VirtualMachineScaleSet
    }
  },
  requestBody: Parameters.parameters16,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion, Parameters.forceDeletion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSet
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deallocateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/deallocate",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmInstanceIDs,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteInstancesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/delete",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmInstanceIDs1,
  queryParameters: [Parameters.apiVersion, Parameters.forceDeletion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const getInstanceViewOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/instanceView",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetInstanceView
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAllOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachineScaleSets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListWithLinkResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listSkusOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/skus",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListSkusResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOSUpgradeHistoryOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osUpgradeHistory",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListOSUpgradeHistory
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const powerOffOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/poweroff",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmInstanceIDs,
  queryParameters: [Parameters.apiVersion, Parameters.skipShutdown],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const restartOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/restart",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmInstanceIDs,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const startOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/start",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmInstanceIDs,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const redeployOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmInstanceIDs,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const performMaintenanceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/performMaintenance",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmInstanceIDs,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateInstancesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmInstanceIDs1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const reimageOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimage",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmScaleSetReimageInput,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const reimageAllOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimageall",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.vmInstanceIDs,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const forceRecoveryServiceFabricPlatformUpdateDomainWalkOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/forceRecoveryServiceFabricPlatformUpdateDomainWalk",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryWalkResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.platformUpdateDomain],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const convertToSinglePlacementGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/convertToSinglePlacementGroup",
  httpMethod: "POST",
  responses: { 200: {} },
  requestBody: Parameters.parameters17,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const setOrchestrationServiceStateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.parameters18,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByLocationNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAllNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListWithLinkResult
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
const listSkusNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListSkusResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOSUpgradeHistoryNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetListOSUpgradeHistory
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.vmScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
