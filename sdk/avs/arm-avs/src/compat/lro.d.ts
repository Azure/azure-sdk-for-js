// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureVMwareSolutionAPI,
  PrivateCloudsOperations,
  ClustersOperations,
  AddonsOperations,
  CloudLinksOperations,
  AuthorizationsOperations,
  DatastoresOperations,
  GlobalReachConnectionsOperations,
  IscsiPathsOperations,
  PlacementPoliciesOperations,
  PureStoragePoliciesOperations,
  ScriptExecutionsOperations,
  VirtualMachinesOperations,
  WorkloadNetworksOperations,
} from "../index";

declare module "../index" {
  interface PrivateCloudsOperations {
    beginRotateNsxtPassword(
      ...args: Parameters<PrivateCloudsOperations["rotateNsxtPassword"]>
    ): ReturnType<PrivateCloudsOperations["rotateNsxtPassword"]>;
    beginRotateNsxtPasswordAndWait(
      ...args: Parameters<PrivateCloudsOperations["rotateNsxtPassword"]>
    ): Promise<Awaited<ReturnType<PrivateCloudsOperations["rotateNsxtPassword"]>>>;
    
    beginRotateVcenterPassword(
      ...args: Parameters<PrivateCloudsOperations["rotateVcenterPassword"]>
    ): ReturnType<PrivateCloudsOperations["rotateVcenterPassword"]>;
    beginRotateVcenterPasswordAndWait(
      ...args: Parameters<PrivateCloudsOperations["rotateVcenterPassword"]>
    ): Promise<Awaited<ReturnType<PrivateCloudsOperations["rotateVcenterPassword"]>>>;
    
    beginDelete(
      ...args: Parameters<PrivateCloudsOperations["delete"]>
    ): ReturnType<PrivateCloudsOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<PrivateCloudsOperations["delete"]>
    ): Promise<Awaited<ReturnType<PrivateCloudsOperations["delete"]>>>;
    
    beginUpdate(
      ...args: Parameters<PrivateCloudsOperations["update"]>
    ): ReturnType<PrivateCloudsOperations["update"]>;
    beginUpdateAndWait(
      ...args: Parameters<PrivateCloudsOperations["update"]>
    ): Promise<Awaited<ReturnType<PrivateCloudsOperations["update"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<PrivateCloudsOperations["createOrUpdate"]>
    ): ReturnType<PrivateCloudsOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<PrivateCloudsOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<PrivateCloudsOperations["createOrUpdate"]>>>;
  }

  interface ClustersOperations {
    beginDelete(
      ...args: Parameters<ClustersOperations["delete"]>
    ): ReturnType<ClustersOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<ClustersOperations["delete"]>
    ): Promise<Awaited<ReturnType<ClustersOperations["delete"]>>>;
    
    beginUpdate(
      ...args: Parameters<ClustersOperations["update"]>
    ): ReturnType<ClustersOperations["update"]>;
    beginUpdateAndWait(
      ...args: Parameters<ClustersOperations["update"]>
    ): Promise<Awaited<ReturnType<ClustersOperations["update"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<ClustersOperations["createOrUpdate"]>
    ): ReturnType<ClustersOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<ClustersOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<ClustersOperations["createOrUpdate"]>>>;
  }

  interface AddonsOperations {
    beginDelete(
      ...args: Parameters<AddonsOperations["delete"]>
    ): ReturnType<AddonsOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<AddonsOperations["delete"]>
    ): Promise<Awaited<ReturnType<AddonsOperations["delete"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<AddonsOperations["createOrUpdate"]>
    ): ReturnType<AddonsOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<AddonsOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<AddonsOperations["createOrUpdate"]>>>;
  }

  interface CloudLinksOperations {
    beginDelete(
      ...args: Parameters<CloudLinksOperations["delete"]>
    ): ReturnType<CloudLinksOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<CloudLinksOperations["delete"]>
    ): Promise<Awaited<ReturnType<CloudLinksOperations["delete"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<CloudLinksOperations["createOrUpdate"]>
    ): ReturnType<CloudLinksOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<CloudLinksOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<CloudLinksOperations["createOrUpdate"]>>>;
  }

  interface AuthorizationsOperations {
    beginDelete(
      ...args: Parameters<AuthorizationsOperations["delete"]>
    ): ReturnType<AuthorizationsOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<AuthorizationsOperations["delete"]>
    ): Promise<Awaited<ReturnType<AuthorizationsOperations["delete"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<AuthorizationsOperations["createOrUpdate"]>
    ): ReturnType<AuthorizationsOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<AuthorizationsOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<AuthorizationsOperations["createOrUpdate"]>>>;
  }

  interface DatastoresOperations {
    beginDelete(
      ...args: Parameters<DatastoresOperations["delete"]>
    ): ReturnType<DatastoresOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<DatastoresOperations["delete"]>
    ): Promise<Awaited<ReturnType<DatastoresOperations["delete"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<DatastoresOperations["createOrUpdate"]>
    ): ReturnType<DatastoresOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<DatastoresOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<DatastoresOperations["createOrUpdate"]>>>;
  }

  interface GlobalReachConnectionsOperations {
    beginDelete(
      ...args: Parameters<GlobalReachConnectionsOperations["delete"]>
    ): ReturnType<GlobalReachConnectionsOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<GlobalReachConnectionsOperations["delete"]>
    ): Promise<Awaited<ReturnType<GlobalReachConnectionsOperations["delete"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<GlobalReachConnectionsOperations["createOrUpdate"]>
    ): ReturnType<GlobalReachConnectionsOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<GlobalReachConnectionsOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<GlobalReachConnectionsOperations["createOrUpdate"]>>>;
  }

  interface IscsiPathsOperations {
    beginDelete(
      ...args: Parameters<IscsiPathsOperations["delete"]>
    ): ReturnType<IscsiPathsOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<IscsiPathsOperations["delete"]>
    ): Promise<Awaited<ReturnType<IscsiPathsOperations["delete"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<IscsiPathsOperations["createOrUpdate"]>
    ): ReturnType<IscsiPathsOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<IscsiPathsOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<IscsiPathsOperations["createOrUpdate"]>>>;
  }

  interface PlacementPoliciesOperations {
    beginDelete(
      ...args: Parameters<PlacementPoliciesOperations["delete"]>
    ): ReturnType<PlacementPoliciesOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<PlacementPoliciesOperations["delete"]>
    ): Promise<Awaited<ReturnType<PlacementPoliciesOperations["delete"]>>>;
    
    beginUpdate(
      ...args: Parameters<PlacementPoliciesOperations["update"]>
    ): ReturnType<PlacementPoliciesOperations["update"]>;
    beginUpdateAndWait(
      ...args: Parameters<PlacementPoliciesOperations["update"]>
    ): Promise<Awaited<ReturnType<PlacementPoliciesOperations["update"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<PlacementPoliciesOperations["createOrUpdate"]>
    ): ReturnType<PlacementPoliciesOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<PlacementPoliciesOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<PlacementPoliciesOperations["createOrUpdate"]>>>;
  }

  interface PureStoragePoliciesOperations {
    beginDelete(
      ...args: Parameters<PureStoragePoliciesOperations["delete"]>
    ): ReturnType<PureStoragePoliciesOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<PureStoragePoliciesOperations["delete"]>
    ): Promise<Awaited<ReturnType<PureStoragePoliciesOperations["delete"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<PureStoragePoliciesOperations["createOrUpdate"]>
    ): ReturnType<PureStoragePoliciesOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<PureStoragePoliciesOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<PureStoragePoliciesOperations["createOrUpdate"]>>>;
  }

  interface ScriptExecutionsOperations {
    beginDelete(
      ...args: Parameters<ScriptExecutionsOperations["delete"]>
    ): ReturnType<ScriptExecutionsOperations["delete"]>;
    beginDeleteAndWait(
      ...args: Parameters<ScriptExecutionsOperations["delete"]>
    ): Promise<Awaited<ReturnType<ScriptExecutionsOperations["delete"]>>>;
    
    beginCreateOrUpdate(
      ...args: Parameters<ScriptExecutionsOperations["createOrUpdate"]>
    ): ReturnType<ScriptExecutionsOperations["createOrUpdate"]>;
    beginCreateOrUpdateAndWait(
      ...args: Parameters<ScriptExecutionsOperations["createOrUpdate"]>
    ): Promise<Awaited<ReturnType<ScriptExecutionsOperations["createOrUpdate"]>>>;
  }

  interface VirtualMachinesOperations {
    beginRestrictMovement(
      ...args: Parameters<VirtualMachinesOperations["restrictMovement"]>
    ): ReturnType<VirtualMachinesOperations["restrictMovement"]>;
    beginRestrictMovementAndWait(
      ...args: Parameters<VirtualMachinesOperations["restrictMovement"]>
    ): Promise<Awaited<ReturnType<VirtualMachinesOperations["restrictMovement"]>>>;
  }

  interface WorkloadNetworksOperations {
    // VM Groups
    beginDeleteVMGroup(
      ...args: Parameters<WorkloadNetworksOperations["deleteVMGroup"]>
    ): ReturnType<WorkloadNetworksOperations["deleteVMGroup"]>;
    beginDeleteVMGroupAndWait(
      ...args: Parameters<WorkloadNetworksOperations["deleteVMGroup"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["deleteVMGroup"]>>>;
    
    beginUpdateVMGroup(
      ...args: Parameters<WorkloadNetworksOperations["updateVMGroup"]>
    ): ReturnType<WorkloadNetworksOperations["updateVMGroup"]>;
    beginUpdateVMGroupAndWait(
      ...args: Parameters<WorkloadNetworksOperations["updateVMGroup"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["updateVMGroup"]>>>;
    
    beginCreateVMGroup(
      ...args: Parameters<WorkloadNetworksOperations["createVMGroup"]>
    ): ReturnType<WorkloadNetworksOperations["createVMGroup"]>;
    beginCreateVMGroupAndWait(
      ...args: Parameters<WorkloadNetworksOperations["createVMGroup"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["createVMGroup"]>>>;
    
    // Segments
    beginDeleteSegment(
      ...args: Parameters<WorkloadNetworksOperations["deleteSegment"]>
    ): ReturnType<WorkloadNetworksOperations["deleteSegment"]>;
    beginDeleteSegmentAndWait(
      ...args: Parameters<WorkloadNetworksOperations["deleteSegment"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["deleteSegment"]>>>;
    
    beginUpdateSegments(
      ...args: Parameters<WorkloadNetworksOperations["updateSegments"]>
    ): ReturnType<WorkloadNetworksOperations["updateSegments"]>;
    beginUpdateSegmentsAndWait(
      ...args: Parameters<WorkloadNetworksOperations["updateSegments"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["updateSegments"]>>>;
    
    beginCreateSegments(
      ...args: Parameters<WorkloadNetworksOperations["createSegments"]>
    ): ReturnType<WorkloadNetworksOperations["createSegments"]>;
    beginCreateSegmentsAndWait(
      ...args: Parameters<WorkloadNetworksOperations["createSegments"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["createSegments"]>>>;
    
    // Public IPs
    beginDeletePublicIP(
      ...args: Parameters<WorkloadNetworksOperations["deletePublicIP"]>
    ): ReturnType<WorkloadNetworksOperations["deletePublicIP"]>;
    beginDeletePublicIPAndWait(
      ...args: Parameters<WorkloadNetworksOperations["deletePublicIP"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["deletePublicIP"]>>>;
    
    beginCreatePublicIP(
      ...args: Parameters<WorkloadNetworksOperations["createPublicIP"]>
    ): ReturnType<WorkloadNetworksOperations["createPublicIP"]>;
    beginCreatePublicIPAndWait(
      ...args: Parameters<WorkloadNetworksOperations["createPublicIP"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["createPublicIP"]>>>;
    
    // Port Mirroring
    beginDeletePortMirroring(
      ...args: Parameters<WorkloadNetworksOperations["deletePortMirroring"]>
    ): ReturnType<WorkloadNetworksOperations["deletePortMirroring"]>;
    beginDeletePortMirroringAndWait(
      ...args: Parameters<WorkloadNetworksOperations["deletePortMirroring"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["deletePortMirroring"]>>>;
    
    beginUpdatePortMirroring(
      ...args: Parameters<WorkloadNetworksOperations["updatePortMirroring"]>
    ): ReturnType<WorkloadNetworksOperations["updatePortMirroring"]>;
    beginUpdatePortMirroringAndWait(
      ...args: Parameters<WorkloadNetworksOperations["updatePortMirroring"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["updatePortMirroring"]>>>;
    
    beginCreatePortMirroring(
      ...args: Parameters<WorkloadNetworksOperations["createPortMirroring"]>
    ): ReturnType<WorkloadNetworksOperations["createPortMirroring"]>;
    beginCreatePortMirroringAndWait(
      ...args: Parameters<WorkloadNetworksOperations["createPortMirroring"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["createPortMirroring"]>>>;
    
    // DNS Zones
    beginDeleteDnsZone(
      ...args: Parameters<WorkloadNetworksOperations["deleteDnsZone"]>
    ): ReturnType<WorkloadNetworksOperations["deleteDnsZone"]>;
    beginDeleteDnsZoneAndWait(
      ...args: Parameters<WorkloadNetworksOperations["deleteDnsZone"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["deleteDnsZone"]>>>;
    
    beginUpdateDnsZone(
      ...args: Parameters<WorkloadNetworksOperations["updateDnsZone"]>
    ): ReturnType<WorkloadNetworksOperations["updateDnsZone"]>;
    beginUpdateDnsZoneAndWait(
      ...args: Parameters<WorkloadNetworksOperations["updateDnsZone"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["updateDnsZone"]>>>;
    
    beginCreateDnsZone(
      ...args: Parameters<WorkloadNetworksOperations["createDnsZone"]>
    ): ReturnType<WorkloadNetworksOperations["createDnsZone"]>;
    beginCreateDnsZoneAndWait(
      ...args: Parameters<WorkloadNetworksOperations["createDnsZone"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["createDnsZone"]>>>;
    
    // DNS Services
    beginDeleteDnsService(
      ...args: Parameters<WorkloadNetworksOperations["deleteDnsService"]>
    ): ReturnType<WorkloadNetworksOperations["deleteDnsService"]>;
    beginDeleteDnsServiceAndWait(
      ...args: Parameters<WorkloadNetworksOperations["deleteDnsService"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["deleteDnsService"]>>>;
    
    beginUpdateDnsService(
      ...args: Parameters<WorkloadNetworksOperations["updateDnsService"]>
    ): ReturnType<WorkloadNetworksOperations["updateDnsService"]>;
    beginUpdateDnsServiceAndWait(
      ...args: Parameters<WorkloadNetworksOperations["updateDnsService"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["updateDnsService"]>>>;
    
    beginCreateDnsService(
      ...args: Parameters<WorkloadNetworksOperations["createDnsService"]>
    ): ReturnType<WorkloadNetworksOperations["createDnsService"]>;
    beginCreateDnsServiceAndWait(
      ...args: Parameters<WorkloadNetworksOperations["createDnsService"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["createDnsService"]>>>;
    
    // DHCP
    beginDeleteDhcp(
      ...args: Parameters<WorkloadNetworksOperations["deleteDhcp"]>
    ): ReturnType<WorkloadNetworksOperations["deleteDhcp"]>;
    beginDeleteDhcpAndWait(
      ...args: Parameters<WorkloadNetworksOperations["deleteDhcp"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["deleteDhcp"]>>>;
    
    beginUpdateDhcp(
      ...args: Parameters<WorkloadNetworksOperations["updateDhcp"]>
    ): ReturnType<WorkloadNetworksOperations["updateDhcp"]>;
    beginUpdateDhcpAndWait(
      ...args: Parameters<WorkloadNetworksOperations["updateDhcp"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["updateDhcp"]>>>;
    
    beginCreateDhcp(
      ...args: Parameters<WorkloadNetworksOperations["createDhcp"]>
    ): ReturnType<WorkloadNetworksOperations["createDhcp"]>;
    beginCreateDhcpAndWait(
      ...args: Parameters<WorkloadNetworksOperations["createDhcp"]>
    ): Promise<Awaited<ReturnType<WorkloadNetworksOperations["createDhcp"]>>>;
  }
}