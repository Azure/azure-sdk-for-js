// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import {
  WorkloadNetwork,
  WorkloadNetworkDhcp,
  WorkloadNetworkDnsService,
  WorkloadNetworkDnsZone,
  WorkloadNetworkGateway,
  WorkloadNetworkPortMirroring,
  WorkloadNetworkPublicIP,
  WorkloadNetworkSegment,
  WorkloadNetworkVirtualMachine,
  WorkloadNetworkVMGroup,
} from "../../models/models.js";
import {
  WorkloadNetworksDeleteVMGroupOptionalParams,
  WorkloadNetworksUpdateVMGroupOptionalParams,
  WorkloadNetworksCreateVMGroupOptionalParams,
  WorkloadNetworksGetVMGroupOptionalParams,
  WorkloadNetworksListVMGroupsOptionalParams,
  WorkloadNetworksGetVirtualMachineOptionalParams,
  WorkloadNetworksListVirtualMachinesOptionalParams,
  WorkloadNetworksDeleteSegmentOptionalParams,
  WorkloadNetworksUpdateSegmentsOptionalParams,
  WorkloadNetworksCreateSegmentsOptionalParams,
  WorkloadNetworksGetSegmentOptionalParams,
  WorkloadNetworksListSegmentsOptionalParams,
  WorkloadNetworksDeletePublicIPOptionalParams,
  WorkloadNetworksCreatePublicIPOptionalParams,
  WorkloadNetworksGetPublicIPOptionalParams,
  WorkloadNetworksListPublicIPsOptionalParams,
  WorkloadNetworksDeletePortMirroringOptionalParams,
  WorkloadNetworksUpdatePortMirroringOptionalParams,
  WorkloadNetworksCreatePortMirroringOptionalParams,
  WorkloadNetworksGetPortMirroringOptionalParams,
  WorkloadNetworksListPortMirroringOptionalParams,
  WorkloadNetworksGetGatewayOptionalParams,
  WorkloadNetworksListGatewaysOptionalParams,
  WorkloadNetworksDeleteDnsZoneOptionalParams,
  WorkloadNetworksUpdateDnsZoneOptionalParams,
  WorkloadNetworksCreateDnsZoneOptionalParams,
  WorkloadNetworksGetDnsZoneOptionalParams,
  WorkloadNetworksListDnsZonesOptionalParams,
  WorkloadNetworksDeleteDnsServiceOptionalParams,
  WorkloadNetworksUpdateDnsServiceOptionalParams,
  WorkloadNetworksCreateDnsServiceOptionalParams,
  WorkloadNetworksGetDnsServiceOptionalParams,
  WorkloadNetworksListDnsServicesOptionalParams,
  WorkloadNetworksDeleteDhcpOptionalParams,
  WorkloadNetworksUpdateDhcpOptionalParams,
  WorkloadNetworksCreateDhcpOptionalParams,
  WorkloadNetworksGetDhcpOptionalParams,
  WorkloadNetworksListDhcpOptionalParams,
  WorkloadNetworksGetOptionalParams,
  WorkloadNetworksListOptionalParams,
} from "../../api/workloadNetworks/options.js";
import {
  deleteVMGroup,
  updateVMGroup,
  createVMGroup,
  getVMGroup,
  listVMGroups,
  getVirtualMachine,
  listVirtualMachines,
  deleteSegment,
  updateSegments,
  createSegments,
  getSegment,
  listSegments,
  deletePublicIP,
  createPublicIP,
  getPublicIP,
  listPublicIPs,
  deletePortMirroring,
  updatePortMirroring,
  createPortMirroring,
  getPortMirroring,
  listPortMirroring,
  getGateway,
  listGateways,
  deleteDnsZone,
  updateDnsZone,
  createDnsZone,
  getDnsZone,
  listDnsZones,
  deleteDnsService,
  updateDnsService,
  createDnsService,
  getDnsService,
  listDnsServices,
  deleteDhcp,
  updateDhcp,
  createDhcp,
  getDhcp,
  listDhcp,
  get,
  list,
} from "../../api/workloadNetworks/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkloadNetworks operations. */
export interface WorkloadNetworksOperations {
  /** Delete a WorkloadNetworkVMGroup */
  deleteVMGroup: (
    apiVersion: string,
    resourceGroupName: string,
    vmGroupId: string,
    privateCloudName: string,
    options?: WorkloadNetworksDeleteVMGroupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a WorkloadNetworkVMGroup */
  updateVMGroup: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    vmGroupId: string,
    workloadNetworkVMGroup: WorkloadNetworkVMGroup,
    options?: WorkloadNetworksUpdateVMGroupOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkVMGroup>, WorkloadNetworkVMGroup>;
  /** Create a WorkloadNetworkVMGroup */
  createVMGroup: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    vmGroupId: string,
    workloadNetworkVMGroup: WorkloadNetworkVMGroup,
    options?: WorkloadNetworksCreateVMGroupOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkVMGroup>, WorkloadNetworkVMGroup>;
  /** Get a WorkloadNetworkVMGroup */
  getVMGroup: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    vmGroupId: string,
    options?: WorkloadNetworksGetVMGroupOptionalParams,
  ) => Promise<WorkloadNetworkVMGroup>;
  /** List WorkloadNetworkVMGroup resources by WorkloadNetwork */
  listVMGroups: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListVMGroupsOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetworkVMGroup>;
  /** Get a WorkloadNetworkVirtualMachine */
  getVirtualMachine: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    virtualMachineId: string,
    options?: WorkloadNetworksGetVirtualMachineOptionalParams,
  ) => Promise<WorkloadNetworkVirtualMachine>;
  /** List WorkloadNetworkVirtualMachine resources by WorkloadNetwork */
  listVirtualMachines: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListVirtualMachinesOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetworkVirtualMachine>;
  /** Delete a WorkloadNetworkSegment */
  deleteSegment: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    segmentId: string,
    options?: WorkloadNetworksDeleteSegmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a WorkloadNetworkSegment */
  updateSegments: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    segmentId: string,
    workloadNetworkSegment: WorkloadNetworkSegment,
    options?: WorkloadNetworksUpdateSegmentsOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkSegment>, WorkloadNetworkSegment>;
  /** Create a WorkloadNetworkSegment */
  createSegments: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    segmentId: string,
    workloadNetworkSegment: WorkloadNetworkSegment,
    options?: WorkloadNetworksCreateSegmentsOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkSegment>, WorkloadNetworkSegment>;
  /** Get a WorkloadNetworkSegment */
  getSegment: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    segmentId: string,
    options?: WorkloadNetworksGetSegmentOptionalParams,
  ) => Promise<WorkloadNetworkSegment>;
  /** List WorkloadNetworkSegment resources by WorkloadNetwork */
  listSegments: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListSegmentsOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetworkSegment>;
  /** Delete a WorkloadNetworkPublicIP */
  deletePublicIP: (
    apiVersion: string,
    resourceGroupName: string,
    publicIPId: string,
    privateCloudName: string,
    options?: WorkloadNetworksDeletePublicIPOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a WorkloadNetworkPublicIP */
  createPublicIP: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    publicIPId: string,
    workloadNetworkPublicIP: WorkloadNetworkPublicIP,
    options?: WorkloadNetworksCreatePublicIPOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkPublicIP>, WorkloadNetworkPublicIP>;
  /** Get a WorkloadNetworkPublicIP */
  getPublicIP: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    publicIPId: string,
    options?: WorkloadNetworksGetPublicIPOptionalParams,
  ) => Promise<WorkloadNetworkPublicIP>;
  /** List WorkloadNetworkPublicIP resources by WorkloadNetwork */
  listPublicIPs: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListPublicIPsOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetworkPublicIP>;
  /** Delete a WorkloadNetworkPortMirroring */
  deletePortMirroring: (
    apiVersion: string,
    resourceGroupName: string,
    portMirroringId: string,
    privateCloudName: string,
    options?: WorkloadNetworksDeletePortMirroringOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a WorkloadNetworkPortMirroring */
  updatePortMirroring: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    portMirroringId: string,
    workloadNetworkPortMirroring: WorkloadNetworkPortMirroring,
    options?: WorkloadNetworksUpdatePortMirroringOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkPortMirroring>, WorkloadNetworkPortMirroring>;
  /** Create a WorkloadNetworkPortMirroring */
  createPortMirroring: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    portMirroringId: string,
    workloadNetworkPortMirroring: WorkloadNetworkPortMirroring,
    options?: WorkloadNetworksCreatePortMirroringOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkPortMirroring>, WorkloadNetworkPortMirroring>;
  /** Get a WorkloadNetworkPortMirroring */
  getPortMirroring: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    portMirroringId: string,
    options?: WorkloadNetworksGetPortMirroringOptionalParams,
  ) => Promise<WorkloadNetworkPortMirroring>;
  /** List WorkloadNetworkPortMirroring resources by WorkloadNetwork */
  listPortMirroring: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListPortMirroringOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetworkPortMirroring>;
  /** Get a WorkloadNetworkGateway */
  getGateway: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    gatewayId: string,
    options?: WorkloadNetworksGetGatewayOptionalParams,
  ) => Promise<WorkloadNetworkGateway>;
  /** List WorkloadNetworkGateway resources by WorkloadNetwork */
  listGateways: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListGatewaysOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetworkGateway>;
  /** Delete a WorkloadNetworkDnsZone */
  deleteDnsZone: (
    apiVersion: string,
    resourceGroupName: string,
    dnsZoneId: string,
    privateCloudName: string,
    options?: WorkloadNetworksDeleteDnsZoneOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a WorkloadNetworkDnsZone */
  updateDnsZone: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    dnsZoneId: string,
    workloadNetworkDnsZone: WorkloadNetworkDnsZone,
    options?: WorkloadNetworksUpdateDnsZoneOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkDnsZone>, WorkloadNetworkDnsZone>;
  /** Create a WorkloadNetworkDnsZone */
  createDnsZone: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    dnsZoneId: string,
    workloadNetworkDnsZone: WorkloadNetworkDnsZone,
    options?: WorkloadNetworksCreateDnsZoneOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkDnsZone>, WorkloadNetworkDnsZone>;
  /** Get a WorkloadNetworkDnsZone */
  getDnsZone: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    dnsZoneId: string,
    options?: WorkloadNetworksGetDnsZoneOptionalParams,
  ) => Promise<WorkloadNetworkDnsZone>;
  /** List WorkloadNetworkDnsZone resources by WorkloadNetwork */
  listDnsZones: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListDnsZonesOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetworkDnsZone>;
  /** Delete a WorkloadNetworkDnsService */
  deleteDnsService: (
    apiVersion: string,
    resourceGroupName: string,
    dnsServiceId: string,
    privateCloudName: string,
    options?: WorkloadNetworksDeleteDnsServiceOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a WorkloadNetworkDnsService */
  updateDnsService: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    dnsServiceId: string,
    workloadNetworkDnsService: WorkloadNetworkDnsService,
    options?: WorkloadNetworksUpdateDnsServiceOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkDnsService>, WorkloadNetworkDnsService>;
  /** Create a WorkloadNetworkDnsService */
  createDnsService: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    dnsServiceId: string,
    workloadNetworkDnsService: WorkloadNetworkDnsService,
    options?: WorkloadNetworksCreateDnsServiceOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkDnsService>, WorkloadNetworkDnsService>;
  /** Get a WorkloadNetworkDnsService */
  getDnsService: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    dnsServiceId: string,
    options?: WorkloadNetworksGetDnsServiceOptionalParams,
  ) => Promise<WorkloadNetworkDnsService>;
  /** List WorkloadNetworkDnsService resources by WorkloadNetwork */
  listDnsServices: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListDnsServicesOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetworkDnsService>;
  /** Delete a WorkloadNetworkDhcp */
  deleteDhcp: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    dhcpId: string,
    options?: WorkloadNetworksDeleteDhcpOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a WorkloadNetworkDhcp */
  updateDhcp: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    dhcpId: string,
    workloadNetworkDhcp: WorkloadNetworkDhcp,
    options?: WorkloadNetworksUpdateDhcpOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkDhcp>, WorkloadNetworkDhcp>;
  /** Create a WorkloadNetworkDhcp */
  createDhcp: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    dhcpId: string,
    workloadNetworkDhcp: WorkloadNetworkDhcp,
    options?: WorkloadNetworksCreateDhcpOptionalParams,
  ) => PollerLike<OperationState<WorkloadNetworkDhcp>, WorkloadNetworkDhcp>;
  /** Get a WorkloadNetworkDhcp */
  getDhcp: (
    apiVersion: string,
    resourceGroupName: string,
    dhcpId: string,
    privateCloudName: string,
    options?: WorkloadNetworksGetDhcpOptionalParams,
  ) => Promise<WorkloadNetworkDhcp>;
  /** List WorkloadNetworkDhcp resources by WorkloadNetwork */
  listDhcp: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListDhcpOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetworkDhcp>;
  /** Get a WorkloadNetwork */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksGetOptionalParams,
  ) => Promise<WorkloadNetwork>;
  /** List WorkloadNetwork resources by PrivateCloud */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: WorkloadNetworksListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadNetwork>;
}

function _getWorkloadNetworks(context: AzureVMwareSolutionAPIContext) {
  return {
    deleteVMGroup: (
      apiVersion: string,
      resourceGroupName: string,
      vmGroupId: string,
      privateCloudName: string,
      options?: WorkloadNetworksDeleteVMGroupOptionalParams,
    ) =>
      deleteVMGroup(context, apiVersion, resourceGroupName, vmGroupId, privateCloudName, options),
    updateVMGroup: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      vmGroupId: string,
      workloadNetworkVMGroup: WorkloadNetworkVMGroup,
      options?: WorkloadNetworksUpdateVMGroupOptionalParams,
    ) =>
      updateVMGroup(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        vmGroupId,
        workloadNetworkVMGroup,
        options,
      ),
    createVMGroup: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      vmGroupId: string,
      workloadNetworkVMGroup: WorkloadNetworkVMGroup,
      options?: WorkloadNetworksCreateVMGroupOptionalParams,
    ) =>
      createVMGroup(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        vmGroupId,
        workloadNetworkVMGroup,
        options,
      ),
    getVMGroup: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      vmGroupId: string,
      options?: WorkloadNetworksGetVMGroupOptionalParams,
    ) => getVMGroup(context, apiVersion, resourceGroupName, privateCloudName, vmGroupId, options),
    listVMGroups: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListVMGroupsOptionalParams,
    ) => listVMGroups(context, apiVersion, resourceGroupName, privateCloudName, options),
    getVirtualMachine: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      virtualMachineId: string,
      options?: WorkloadNetworksGetVirtualMachineOptionalParams,
    ) =>
      getVirtualMachine(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        virtualMachineId,
        options,
      ),
    listVirtualMachines: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListVirtualMachinesOptionalParams,
    ) => listVirtualMachines(context, apiVersion, resourceGroupName, privateCloudName, options),
    deleteSegment: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      segmentId: string,
      options?: WorkloadNetworksDeleteSegmentOptionalParams,
    ) =>
      deleteSegment(context, apiVersion, resourceGroupName, privateCloudName, segmentId, options),
    updateSegments: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      segmentId: string,
      workloadNetworkSegment: WorkloadNetworkSegment,
      options?: WorkloadNetworksUpdateSegmentsOptionalParams,
    ) =>
      updateSegments(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        segmentId,
        workloadNetworkSegment,
        options,
      ),
    createSegments: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      segmentId: string,
      workloadNetworkSegment: WorkloadNetworkSegment,
      options?: WorkloadNetworksCreateSegmentsOptionalParams,
    ) =>
      createSegments(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        segmentId,
        workloadNetworkSegment,
        options,
      ),
    getSegment: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      segmentId: string,
      options?: WorkloadNetworksGetSegmentOptionalParams,
    ) => getSegment(context, apiVersion, resourceGroupName, privateCloudName, segmentId, options),
    listSegments: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListSegmentsOptionalParams,
    ) => listSegments(context, apiVersion, resourceGroupName, privateCloudName, options),
    deletePublicIP: (
      apiVersion: string,
      resourceGroupName: string,
      publicIPId: string,
      privateCloudName: string,
      options?: WorkloadNetworksDeletePublicIPOptionalParams,
    ) =>
      deletePublicIP(context, apiVersion, resourceGroupName, publicIPId, privateCloudName, options),
    createPublicIP: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      publicIPId: string,
      workloadNetworkPublicIP: WorkloadNetworkPublicIP,
      options?: WorkloadNetworksCreatePublicIPOptionalParams,
    ) =>
      createPublicIP(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        publicIPId,
        workloadNetworkPublicIP,
        options,
      ),
    getPublicIP: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      publicIPId: string,
      options?: WorkloadNetworksGetPublicIPOptionalParams,
    ) => getPublicIP(context, apiVersion, resourceGroupName, privateCloudName, publicIPId, options),
    listPublicIPs: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListPublicIPsOptionalParams,
    ) => listPublicIPs(context, apiVersion, resourceGroupName, privateCloudName, options),
    deletePortMirroring: (
      apiVersion: string,
      resourceGroupName: string,
      portMirroringId: string,
      privateCloudName: string,
      options?: WorkloadNetworksDeletePortMirroringOptionalParams,
    ) =>
      deletePortMirroring(
        context,
        apiVersion,
        resourceGroupName,
        portMirroringId,
        privateCloudName,
        options,
      ),
    updatePortMirroring: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      portMirroringId: string,
      workloadNetworkPortMirroring: WorkloadNetworkPortMirroring,
      options?: WorkloadNetworksUpdatePortMirroringOptionalParams,
    ) =>
      updatePortMirroring(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        portMirroringId,
        workloadNetworkPortMirroring,
        options,
      ),
    createPortMirroring: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      portMirroringId: string,
      workloadNetworkPortMirroring: WorkloadNetworkPortMirroring,
      options?: WorkloadNetworksCreatePortMirroringOptionalParams,
    ) =>
      createPortMirroring(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        portMirroringId,
        workloadNetworkPortMirroring,
        options,
      ),
    getPortMirroring: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      portMirroringId: string,
      options?: WorkloadNetworksGetPortMirroringOptionalParams,
    ) =>
      getPortMirroring(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        portMirroringId,
        options,
      ),
    listPortMirroring: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListPortMirroringOptionalParams,
    ) => listPortMirroring(context, apiVersion, resourceGroupName, privateCloudName, options),
    getGateway: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      gatewayId: string,
      options?: WorkloadNetworksGetGatewayOptionalParams,
    ) => getGateway(context, apiVersion, resourceGroupName, privateCloudName, gatewayId, options),
    listGateways: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListGatewaysOptionalParams,
    ) => listGateways(context, apiVersion, resourceGroupName, privateCloudName, options),
    deleteDnsZone: (
      apiVersion: string,
      resourceGroupName: string,
      dnsZoneId: string,
      privateCloudName: string,
      options?: WorkloadNetworksDeleteDnsZoneOptionalParams,
    ) =>
      deleteDnsZone(context, apiVersion, resourceGroupName, dnsZoneId, privateCloudName, options),
    updateDnsZone: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      dnsZoneId: string,
      workloadNetworkDnsZone: WorkloadNetworkDnsZone,
      options?: WorkloadNetworksUpdateDnsZoneOptionalParams,
    ) =>
      updateDnsZone(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        dnsZoneId,
        workloadNetworkDnsZone,
        options,
      ),
    createDnsZone: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      dnsZoneId: string,
      workloadNetworkDnsZone: WorkloadNetworkDnsZone,
      options?: WorkloadNetworksCreateDnsZoneOptionalParams,
    ) =>
      createDnsZone(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        dnsZoneId,
        workloadNetworkDnsZone,
        options,
      ),
    getDnsZone: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      dnsZoneId: string,
      options?: WorkloadNetworksGetDnsZoneOptionalParams,
    ) => getDnsZone(context, apiVersion, resourceGroupName, privateCloudName, dnsZoneId, options),
    listDnsZones: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListDnsZonesOptionalParams,
    ) => listDnsZones(context, apiVersion, resourceGroupName, privateCloudName, options),
    deleteDnsService: (
      apiVersion: string,
      resourceGroupName: string,
      dnsServiceId: string,
      privateCloudName: string,
      options?: WorkloadNetworksDeleteDnsServiceOptionalParams,
    ) =>
      deleteDnsService(
        context,
        apiVersion,
        resourceGroupName,
        dnsServiceId,
        privateCloudName,
        options,
      ),
    updateDnsService: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      dnsServiceId: string,
      workloadNetworkDnsService: WorkloadNetworkDnsService,
      options?: WorkloadNetworksUpdateDnsServiceOptionalParams,
    ) =>
      updateDnsService(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        dnsServiceId,
        workloadNetworkDnsService,
        options,
      ),
    createDnsService: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      dnsServiceId: string,
      workloadNetworkDnsService: WorkloadNetworkDnsService,
      options?: WorkloadNetworksCreateDnsServiceOptionalParams,
    ) =>
      createDnsService(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        dnsServiceId,
        workloadNetworkDnsService,
        options,
      ),
    getDnsService: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      dnsServiceId: string,
      options?: WorkloadNetworksGetDnsServiceOptionalParams,
    ) =>
      getDnsService(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        dnsServiceId,
        options,
      ),
    listDnsServices: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListDnsServicesOptionalParams,
    ) => listDnsServices(context, apiVersion, resourceGroupName, privateCloudName, options),
    deleteDhcp: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      dhcpId: string,
      options?: WorkloadNetworksDeleteDhcpOptionalParams,
    ) => deleteDhcp(context, apiVersion, resourceGroupName, privateCloudName, dhcpId, options),
    updateDhcp: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      dhcpId: string,
      workloadNetworkDhcp: WorkloadNetworkDhcp,
      options?: WorkloadNetworksUpdateDhcpOptionalParams,
    ) =>
      updateDhcp(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        dhcpId,
        workloadNetworkDhcp,
        options,
      ),
    createDhcp: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      dhcpId: string,
      workloadNetworkDhcp: WorkloadNetworkDhcp,
      options?: WorkloadNetworksCreateDhcpOptionalParams,
    ) =>
      createDhcp(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        dhcpId,
        workloadNetworkDhcp,
        options,
      ),
    getDhcp: (
      apiVersion: string,
      resourceGroupName: string,
      dhcpId: string,
      privateCloudName: string,
      options?: WorkloadNetworksGetDhcpOptionalParams,
    ) => getDhcp(context, apiVersion, resourceGroupName, dhcpId, privateCloudName, options),
    listDhcp: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListDhcpOptionalParams,
    ) => listDhcp(context, apiVersion, resourceGroupName, privateCloudName, options),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, privateCloudName, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: WorkloadNetworksListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, privateCloudName, options),
  };
}

export function _getWorkloadNetworksOperations(
  context: AzureVMwareSolutionAPIContext,
): WorkloadNetworksOperations {
  return {
    ..._getWorkloadNetworks(context),
  };
}
