"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownVersions = exports.KnownApplicationServerVirtualMachineType = exports.KnownCentralServerVirtualMachineType = exports.KnownEnqueueReplicationServerType = exports.KnownSAPDatabaseScaleMethod = exports.KnownCreatedByType = exports.KnownSAPVirtualInstanceIdentityType = exports.KnownSapVirtualInstanceProvisioningState = exports.KnownSAPVirtualInstanceState = exports.KnownSAPHealthState = exports.KnownSAPVirtualInstanceStatus = exports.KnownSAPSoftwareInstallationType = exports.KnownFileShareConfigurationType = exports.KnownSAPHighAvailabilityType = exports.KnownNamingPatternType = exports.KnownDiskSkuName = exports.KnownOSType = exports.KnownSAPDatabaseType = exports.KnownSAPDeploymentType = exports.KnownSAPConfigurationType = exports.KnownManagedResourcesNetworkAccessType = exports.KnownSAPProductType = exports.KnownSAPEnvironmentType = exports.KnownActionType = exports.KnownOrigin = void 0;
exports._operationListResultDeserializer = _operationListResultDeserializer;
exports.operationArrayDeserializer = operationArrayDeserializer;
exports.operationDeserializer = operationDeserializer;
exports.operationDisplayDeserializer = operationDisplayDeserializer;
exports.errorResponseDeserializer = errorResponseDeserializer;
exports.errorDetailDeserializer = errorDetailDeserializer;
exports.errorDetailArrayDeserializer = errorDetailArrayDeserializer;
exports.errorAdditionalInfoArrayDeserializer = errorAdditionalInfoArrayDeserializer;
exports.errorAdditionalInfoDeserializer = errorAdditionalInfoDeserializer;
exports._errorAdditionalInfoInfoDeserializer = _errorAdditionalInfoInfoDeserializer;
exports.sapVirtualInstanceSerializer = sapVirtualInstanceSerializer;
exports.sapVirtualInstanceDeserializer = sapVirtualInstanceDeserializer;
exports.sapVirtualInstancePropertiesSerializer = sapVirtualInstancePropertiesSerializer;
exports.sapVirtualInstancePropertiesDeserializer = sapVirtualInstancePropertiesDeserializer;
exports.sapConfigurationSerializer = sapConfigurationSerializer;
exports.sapConfigurationDeserializer = sapConfigurationDeserializer;
exports.sapConfigurationUnionSerializer = sapConfigurationUnionSerializer;
exports.sapConfigurationUnionDeserializer = sapConfigurationUnionDeserializer;
exports.discoveryConfigurationSerializer = discoveryConfigurationSerializer;
exports.discoveryConfigurationDeserializer = discoveryConfigurationDeserializer;
exports.deploymentConfigurationSerializer = deploymentConfigurationSerializer;
exports.deploymentConfigurationDeserializer = deploymentConfigurationDeserializer;
exports.infrastructureConfigurationSerializer = infrastructureConfigurationSerializer;
exports.infrastructureConfigurationDeserializer = infrastructureConfigurationDeserializer;
exports.infrastructureConfigurationUnionSerializer = infrastructureConfigurationUnionSerializer;
exports.infrastructureConfigurationUnionDeserializer = infrastructureConfigurationUnionDeserializer;
exports.singleServerConfigurationSerializer = singleServerConfigurationSerializer;
exports.singleServerConfigurationDeserializer = singleServerConfigurationDeserializer;
exports.networkConfigurationSerializer = networkConfigurationSerializer;
exports.networkConfigurationDeserializer = networkConfigurationDeserializer;
exports.virtualMachineConfigurationSerializer = virtualMachineConfigurationSerializer;
exports.virtualMachineConfigurationDeserializer = virtualMachineConfigurationDeserializer;
exports.imageReferenceSerializer = imageReferenceSerializer;
exports.imageReferenceDeserializer = imageReferenceDeserializer;
exports.osProfileSerializer = osProfileSerializer;
exports.osProfileDeserializer = osProfileDeserializer;
exports.osConfigurationSerializer = osConfigurationSerializer;
exports.osConfigurationDeserializer = osConfigurationDeserializer;
exports.osConfigurationUnionSerializer = osConfigurationUnionSerializer;
exports.osConfigurationUnionDeserializer = osConfigurationUnionDeserializer;
exports.windowsConfigurationSerializer = windowsConfigurationSerializer;
exports.windowsConfigurationDeserializer = windowsConfigurationDeserializer;
exports.linuxConfigurationSerializer = linuxConfigurationSerializer;
exports.linuxConfigurationDeserializer = linuxConfigurationDeserializer;
exports.sshConfigurationSerializer = sshConfigurationSerializer;
exports.sshConfigurationDeserializer = sshConfigurationDeserializer;
exports.sshPublicKeyArraySerializer = sshPublicKeyArraySerializer;
exports.sshPublicKeyArrayDeserializer = sshPublicKeyArrayDeserializer;
exports.sshPublicKeySerializer = sshPublicKeySerializer;
exports.sshPublicKeyDeserializer = sshPublicKeyDeserializer;
exports.sshKeyPairSerializer = sshKeyPairSerializer;
exports.sshKeyPairDeserializer = sshKeyPairDeserializer;
exports.diskConfigurationSerializer = diskConfigurationSerializer;
exports.diskConfigurationDeserializer = diskConfigurationDeserializer;
exports.diskVolumeConfigurationRecordSerializer = diskVolumeConfigurationRecordSerializer;
exports.diskVolumeConfigurationRecordDeserializer = diskVolumeConfigurationRecordDeserializer;
exports.diskVolumeConfigurationSerializer = diskVolumeConfigurationSerializer;
exports.diskVolumeConfigurationDeserializer = diskVolumeConfigurationDeserializer;
exports.diskSkuSerializer = diskSkuSerializer;
exports.diskSkuDeserializer = diskSkuDeserializer;
exports.singleServerCustomResourceNamesSerializer = singleServerCustomResourceNamesSerializer;
exports.singleServerCustomResourceNamesDeserializer = singleServerCustomResourceNamesDeserializer;
exports.singleServerCustomResourceNamesUnionSerializer = singleServerCustomResourceNamesUnionSerializer;
exports.singleServerCustomResourceNamesUnionDeserializer = singleServerCustomResourceNamesUnionDeserializer;
exports.singleServerFullResourceNamesSerializer = singleServerFullResourceNamesSerializer;
exports.singleServerFullResourceNamesDeserializer = singleServerFullResourceNamesDeserializer;
exports.virtualMachineResourceNamesSerializer = virtualMachineResourceNamesSerializer;
exports.virtualMachineResourceNamesDeserializer = virtualMachineResourceNamesDeserializer;
exports.networkInterfaceResourceNamesArraySerializer = networkInterfaceResourceNamesArraySerializer;
exports.networkInterfaceResourceNamesArrayDeserializer = networkInterfaceResourceNamesArrayDeserializer;
exports.networkInterfaceResourceNamesSerializer = networkInterfaceResourceNamesSerializer;
exports.networkInterfaceResourceNamesDeserializer = networkInterfaceResourceNamesDeserializer;
exports.threeTierConfigurationSerializer = threeTierConfigurationSerializer;
exports.threeTierConfigurationDeserializer = threeTierConfigurationDeserializer;
exports.centralServerConfigurationSerializer = centralServerConfigurationSerializer;
exports.centralServerConfigurationDeserializer = centralServerConfigurationDeserializer;
exports.applicationServerConfigurationSerializer = applicationServerConfigurationSerializer;
exports.applicationServerConfigurationDeserializer = applicationServerConfigurationDeserializer;
exports.databaseConfigurationSerializer = databaseConfigurationSerializer;
exports.databaseConfigurationDeserializer = databaseConfigurationDeserializer;
exports.highAvailabilityConfigurationSerializer = highAvailabilityConfigurationSerializer;
exports.highAvailabilityConfigurationDeserializer = highAvailabilityConfigurationDeserializer;
exports.storageConfigurationSerializer = storageConfigurationSerializer;
exports.storageConfigurationDeserializer = storageConfigurationDeserializer;
exports.fileShareConfigurationSerializer = fileShareConfigurationSerializer;
exports.fileShareConfigurationDeserializer = fileShareConfigurationDeserializer;
exports.fileShareConfigurationUnionSerializer = fileShareConfigurationUnionSerializer;
exports.fileShareConfigurationUnionDeserializer = fileShareConfigurationUnionDeserializer;
exports.skipFileShareConfigurationSerializer = skipFileShareConfigurationSerializer;
exports.skipFileShareConfigurationDeserializer = skipFileShareConfigurationDeserializer;
exports.createAndMountFileShareConfigurationSerializer = createAndMountFileShareConfigurationSerializer;
exports.createAndMountFileShareConfigurationDeserializer = createAndMountFileShareConfigurationDeserializer;
exports.mountFileShareConfigurationSerializer = mountFileShareConfigurationSerializer;
exports.mountFileShareConfigurationDeserializer = mountFileShareConfigurationDeserializer;
exports.threeTierCustomResourceNamesSerializer = threeTierCustomResourceNamesSerializer;
exports.threeTierCustomResourceNamesDeserializer = threeTierCustomResourceNamesDeserializer;
exports.threeTierCustomResourceNamesUnionSerializer = threeTierCustomResourceNamesUnionSerializer;
exports.threeTierCustomResourceNamesUnionDeserializer = threeTierCustomResourceNamesUnionDeserializer;
exports.threeTierFullResourceNamesSerializer = threeTierFullResourceNamesSerializer;
exports.threeTierFullResourceNamesDeserializer = threeTierFullResourceNamesDeserializer;
exports.centralServerFullResourceNamesSerializer = centralServerFullResourceNamesSerializer;
exports.centralServerFullResourceNamesDeserializer = centralServerFullResourceNamesDeserializer;
exports.virtualMachineResourceNamesArraySerializer = virtualMachineResourceNamesArraySerializer;
exports.virtualMachineResourceNamesArrayDeserializer = virtualMachineResourceNamesArrayDeserializer;
exports.loadBalancerResourceNamesSerializer = loadBalancerResourceNamesSerializer;
exports.loadBalancerResourceNamesDeserializer = loadBalancerResourceNamesDeserializer;
exports.applicationServerFullResourceNamesSerializer = applicationServerFullResourceNamesSerializer;
exports.applicationServerFullResourceNamesDeserializer = applicationServerFullResourceNamesDeserializer;
exports.databaseServerFullResourceNamesSerializer = databaseServerFullResourceNamesSerializer;
exports.databaseServerFullResourceNamesDeserializer = databaseServerFullResourceNamesDeserializer;
exports.sharedStorageResourceNamesSerializer = sharedStorageResourceNamesSerializer;
exports.sharedStorageResourceNamesDeserializer = sharedStorageResourceNamesDeserializer;
exports.softwareConfigurationSerializer = softwareConfigurationSerializer;
exports.softwareConfigurationDeserializer = softwareConfigurationDeserializer;
exports.softwareConfigurationUnionSerializer = softwareConfigurationUnionSerializer;
exports.softwareConfigurationUnionDeserializer = softwareConfigurationUnionDeserializer;
exports.serviceInitiatedSoftwareConfigurationSerializer = serviceInitiatedSoftwareConfigurationSerializer;
exports.serviceInitiatedSoftwareConfigurationDeserializer = serviceInitiatedSoftwareConfigurationDeserializer;
exports.highAvailabilitySoftwareConfigurationSerializer = highAvailabilitySoftwareConfigurationSerializer;
exports.highAvailabilitySoftwareConfigurationDeserializer = highAvailabilitySoftwareConfigurationDeserializer;
exports.sapInstallWithoutOSConfigSoftwareConfigurationSerializer = sapInstallWithoutOSConfigSoftwareConfigurationSerializer;
exports.sapInstallWithoutOSConfigSoftwareConfigurationDeserializer = sapInstallWithoutOSConfigSoftwareConfigurationDeserializer;
exports.externalInstallationSoftwareConfigurationSerializer = externalInstallationSoftwareConfigurationSerializer;
exports.externalInstallationSoftwareConfigurationDeserializer = externalInstallationSoftwareConfigurationDeserializer;
exports.deploymentWithOSConfigurationSerializer = deploymentWithOSConfigurationSerializer;
exports.deploymentWithOSConfigurationDeserializer = deploymentWithOSConfigurationDeserializer;
exports.osSapConfigurationSerializer = osSapConfigurationSerializer;
exports.osSapConfigurationDeserializer = osSapConfigurationDeserializer;
exports.deployerVmPackagesSerializer = deployerVmPackagesSerializer;
exports.deployerVmPackagesDeserializer = deployerVmPackagesDeserializer;
exports.managedRGConfigurationSerializer = managedRGConfigurationSerializer;
exports.managedRGConfigurationDeserializer = managedRGConfigurationDeserializer;
exports.sapVirtualInstanceErrorDeserializer = sapVirtualInstanceErrorDeserializer;
exports.errorDefinitionDeserializer = errorDefinitionDeserializer;
exports.errorDefinitionArrayDeserializer = errorDefinitionArrayDeserializer;
exports.sapVirtualInstanceIdentitySerializer = sapVirtualInstanceIdentitySerializer;
exports.sapVirtualInstanceIdentityDeserializer = sapVirtualInstanceIdentityDeserializer;
exports.userAssignedIdentitySerializer = userAssignedIdentitySerializer;
exports.userAssignedIdentityDeserializer = userAssignedIdentityDeserializer;
exports.trackedResourceSerializer = trackedResourceSerializer;
exports.trackedResourceDeserializer = trackedResourceDeserializer;
exports.resourceSerializer = resourceSerializer;
exports.resourceDeserializer = resourceDeserializer;
exports.systemDataDeserializer = systemDataDeserializer;
exports.updateSAPVirtualInstanceRequestSerializer = updateSAPVirtualInstanceRequestSerializer;
exports.updateSAPVirtualInstancePropertiesSerializer = updateSAPVirtualInstancePropertiesSerializer;
exports._sapVirtualInstanceListResultDeserializer = _sapVirtualInstanceListResultDeserializer;
exports.sapVirtualInstanceArraySerializer = sapVirtualInstanceArraySerializer;
exports.sapVirtualInstanceArrayDeserializer = sapVirtualInstanceArrayDeserializer;
exports.startRequestSerializer = startRequestSerializer;
exports.operationStatusResultDeserializer = operationStatusResultDeserializer;
exports.operationStatusResultArrayDeserializer = operationStatusResultArrayDeserializer;
exports.stopRequestSerializer = stopRequestSerializer;
exports.sapSizingRecommendationRequestSerializer = sapSizingRecommendationRequestSerializer;
exports.sapSizingRecommendationResultDeserializer = sapSizingRecommendationResultDeserializer;
exports.sapSizingRecommendationResultUnionDeserializer = sapSizingRecommendationResultUnionDeserializer;
exports.singleServerRecommendationResultDeserializer = singleServerRecommendationResultDeserializer;
exports.threeTierRecommendationResultDeserializer = threeTierRecommendationResultDeserializer;
exports.sapSupportedSkusRequestSerializer = sapSupportedSkusRequestSerializer;
exports.sapSupportedResourceSkusResultDeserializer = sapSupportedResourceSkusResultDeserializer;
exports.sapSupportedSkuArrayDeserializer = sapSupportedSkuArrayDeserializer;
exports.sapSupportedSkuDeserializer = sapSupportedSkuDeserializer;
exports.sapDiskConfigurationsRequestSerializer = sapDiskConfigurationsRequestSerializer;
exports.sapDiskConfigurationsResultDeserializer = sapDiskConfigurationsResultDeserializer;
exports.sapDiskConfigurationRecordDeserializer = sapDiskConfigurationRecordDeserializer;
exports.sapDiskConfigurationDeserializer = sapDiskConfigurationDeserializer;
exports.diskDetailsArrayDeserializer = diskDetailsArrayDeserializer;
exports.diskDetailsDeserializer = diskDetailsDeserializer;
exports.sapAvailabilityZoneDetailsRequestSerializer = sapAvailabilityZoneDetailsRequestSerializer;
exports.sapAvailabilityZoneDetailsResultDeserializer = sapAvailabilityZoneDetailsResultDeserializer;
exports.sapAvailabilityZonePairArrayDeserializer = sapAvailabilityZonePairArrayDeserializer;
exports.sapAvailabilityZonePairDeserializer = sapAvailabilityZonePairDeserializer;
exports.sapCentralServerInstanceSerializer = sapCentralServerInstanceSerializer;
exports.sapCentralServerInstanceDeserializer = sapCentralServerInstanceDeserializer;
exports.sapCentralServerPropertiesSerializer = sapCentralServerPropertiesSerializer;
exports.sapCentralServerPropertiesDeserializer = sapCentralServerPropertiesDeserializer;
exports.messageServerPropertiesSerializer = messageServerPropertiesSerializer;
exports.messageServerPropertiesDeserializer = messageServerPropertiesDeserializer;
exports.enqueueServerPropertiesSerializer = enqueueServerPropertiesSerializer;
exports.enqueueServerPropertiesDeserializer = enqueueServerPropertiesDeserializer;
exports.gatewayServerPropertiesSerializer = gatewayServerPropertiesSerializer;
exports.gatewayServerPropertiesDeserializer = gatewayServerPropertiesDeserializer;
exports.enqueueReplicationServerPropertiesSerializer = enqueueReplicationServerPropertiesSerializer;
exports.enqueueReplicationServerPropertiesDeserializer = enqueueReplicationServerPropertiesDeserializer;
exports.loadBalancerDetailsDeserializer = loadBalancerDetailsDeserializer;
exports.centralServerVmDetailsArrayDeserializer = centralServerVmDetailsArrayDeserializer;
exports.centralServerVmDetailsDeserializer = centralServerVmDetailsDeserializer;
exports.storageInformationArrayDeserializer = storageInformationArrayDeserializer;
exports.storageInformationDeserializer = storageInformationDeserializer;
exports.updateSAPCentralInstanceRequestSerializer = updateSAPCentralInstanceRequestSerializer;
exports._sapCentralServerInstanceListResultDeserializer = _sapCentralServerInstanceListResultDeserializer;
exports.sapCentralServerInstanceArraySerializer = sapCentralServerInstanceArraySerializer;
exports.sapCentralServerInstanceArrayDeserializer = sapCentralServerInstanceArrayDeserializer;
exports.sapDatabaseInstanceSerializer = sapDatabaseInstanceSerializer;
exports.sapDatabaseInstanceDeserializer = sapDatabaseInstanceDeserializer;
exports.sapDatabasePropertiesSerializer = sapDatabasePropertiesSerializer;
exports.sapDatabasePropertiesDeserializer = sapDatabasePropertiesDeserializer;
exports.databaseVmDetailsArrayDeserializer = databaseVmDetailsArrayDeserializer;
exports.databaseVmDetailsDeserializer = databaseVmDetailsDeserializer;
exports.updateSAPDatabaseInstanceRequestSerializer = updateSAPDatabaseInstanceRequestSerializer;
exports._sapDatabaseInstanceListResultDeserializer = _sapDatabaseInstanceListResultDeserializer;
exports.sapDatabaseInstanceArraySerializer = sapDatabaseInstanceArraySerializer;
exports.sapDatabaseInstanceArrayDeserializer = sapDatabaseInstanceArrayDeserializer;
exports.sapApplicationServerInstanceSerializer = sapApplicationServerInstanceSerializer;
exports.sapApplicationServerInstanceDeserializer = sapApplicationServerInstanceDeserializer;
exports.sapApplicationServerPropertiesSerializer = sapApplicationServerPropertiesSerializer;
exports.sapApplicationServerPropertiesDeserializer = sapApplicationServerPropertiesDeserializer;
exports.applicationServerVmDetailsArrayDeserializer = applicationServerVmDetailsArrayDeserializer;
exports.applicationServerVmDetailsDeserializer = applicationServerVmDetailsDeserializer;
exports.updateSAPApplicationInstanceRequestSerializer = updateSAPApplicationInstanceRequestSerializer;
exports._sapApplicationServerInstanceListResultDeserializer = _sapApplicationServerInstanceListResultDeserializer;
exports.sapApplicationServerInstanceArraySerializer = sapApplicationServerInstanceArraySerializer;
exports.sapApplicationServerInstanceArrayDeserializer = sapApplicationServerInstanceArrayDeserializer;
function _operationListResultDeserializer(item) {
    return {
        value: operationArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function operationArrayDeserializer(result) {
    return result.map((item) => {
        return operationDeserializer(item);
    });
}
function operationDeserializer(item) {
    return {
        name: item["name"],
        isDataAction: item["isDataAction"],
        display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
        origin: item["origin"],
        actionType: item["actionType"],
    };
}
function operationDisplayDeserializer(item) {
    return {
        provider: item["provider"],
        resource: item["resource"],
        operation: item["operation"],
        description: item["description"],
    };
}
/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
var KnownOrigin;
(function (KnownOrigin) {
    /** Indicates the operation is initiated by a user. */
    KnownOrigin["User"] = "user";
    /** Indicates the operation is initiated by a system. */
    KnownOrigin["System"] = "system";
    /** Indicates the operation is initiated by a user or system. */
    KnownOrigin["UserSystem"] = "user,system";
})(KnownOrigin || (exports.KnownOrigin = KnownOrigin = {}));
/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
var KnownActionType;
(function (KnownActionType) {
    /** Actions are for internal-only APIs. */
    KnownActionType["Internal"] = "Internal";
})(KnownActionType || (exports.KnownActionType = KnownActionType = {}));
function errorResponseDeserializer(item) {
    return {
        error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    };
}
function errorDetailDeserializer(item) {
    return {
        code: item["code"],
        message: item["message"],
        target: item["target"],
        details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
        additionalInfo: !item["additionalInfo"]
            ? item["additionalInfo"]
            : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
    };
}
function errorDetailArrayDeserializer(result) {
    return result.map((item) => {
        return errorDetailDeserializer(item);
    });
}
function errorAdditionalInfoArrayDeserializer(result) {
    return result.map((item) => {
        return errorAdditionalInfoDeserializer(item);
    });
}
function errorAdditionalInfoDeserializer(item) {
    return {
        type: item["type"],
        info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
    };
}
function _errorAdditionalInfoInfoDeserializer(item) {
    return item;
}
function sapVirtualInstanceSerializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        properties: !item["properties"]
            ? item["properties"]
            : sapVirtualInstancePropertiesSerializer(item["properties"]),
        identity: !item["identity"]
            ? item["identity"]
            : sapVirtualInstanceIdentitySerializer(item["identity"]),
    };
}
function sapVirtualInstanceDeserializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
        properties: !item["properties"]
            ? item["properties"]
            : sapVirtualInstancePropertiesDeserializer(item["properties"]),
        identity: !item["identity"]
            ? item["identity"]
            : sapVirtualInstanceIdentityDeserializer(item["identity"]),
    };
}
function sapVirtualInstancePropertiesSerializer(item) {
    return {
        environment: item["environment"],
        sapProduct: item["sapProduct"],
        managedResourcesNetworkAccessType: item["managedResourcesNetworkAccessType"],
        configuration: sapConfigurationUnionSerializer(item["configuration"]),
        managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
            ? item["managedResourceGroupConfiguration"]
            : managedRGConfigurationSerializer(item["managedResourceGroupConfiguration"]),
    };
}
function sapVirtualInstancePropertiesDeserializer(item) {
    return {
        environment: item["environment"],
        sapProduct: item["sapProduct"],
        managedResourcesNetworkAccessType: item["managedResourcesNetworkAccessType"],
        configuration: sapConfigurationUnionDeserializer(item["configuration"]),
        managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
            ? item["managedResourceGroupConfiguration"]
            : managedRGConfigurationDeserializer(item["managedResourceGroupConfiguration"]),
        status: item["status"],
        health: item["health"],
        state: item["state"],
        provisioningState: item["provisioningState"],
        errors: !item["errors"] ? item["errors"] : sapVirtualInstanceErrorDeserializer(item["errors"]),
    };
}
/** Defines the environment type - Production/Non Production. */
var KnownSAPEnvironmentType;
(function (KnownSAPEnvironmentType) {
    /** Non Production SAP system. */
    KnownSAPEnvironmentType["NonProd"] = "NonProd";
    /** Production SAP system. */
    KnownSAPEnvironmentType["Prod"] = "Prod";
})(KnownSAPEnvironmentType || (exports.KnownSAPEnvironmentType = KnownSAPEnvironmentType = {}));
/** Defines the SAP Product type. */
var KnownSAPProductType;
(function (KnownSAPProductType) {
    /** SAP Product ECC. */
    KnownSAPProductType["ECC"] = "ECC";
    /** SAP Product S4HANA. */
    KnownSAPProductType["S4Hana"] = "S4HANA";
    /** SAP Products other than the ones listed. */
    KnownSAPProductType["Other"] = "Other";
})(KnownSAPProductType || (exports.KnownSAPProductType = KnownSAPProductType = {}));
/** Defines the network access type for managed resources. */
var KnownManagedResourcesNetworkAccessType;
(function (KnownManagedResourcesNetworkAccessType) {
    /** Managed resources will be deployed with public network access enabled. */
    KnownManagedResourcesNetworkAccessType["Public"] = "Public";
    /** Managed resources will be deployed with public network access disabled. */
    KnownManagedResourcesNetworkAccessType["Private"] = "Private";
})(KnownManagedResourcesNetworkAccessType || (exports.KnownManagedResourcesNetworkAccessType = KnownManagedResourcesNetworkAccessType = {}));
function sapConfigurationSerializer(item) {
    return { configurationType: item["configurationType"] };
}
function sapConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
    };
}
function sapConfigurationUnionSerializer(item) {
    switch (item.configurationType) {
        case "Discovery":
            return discoveryConfigurationSerializer(item);
        case "Deployment":
            return deploymentConfigurationSerializer(item);
        case "DeploymentWithOSConfig":
            return deploymentWithOSConfigurationSerializer(item);
        default:
            return sapConfigurationSerializer(item);
    }
}
function sapConfigurationUnionDeserializer(item) {
    switch (item.configurationType) {
        case "Discovery":
            return discoveryConfigurationDeserializer(item);
        case "Deployment":
            return deploymentConfigurationDeserializer(item);
        case "DeploymentWithOSConfig":
            return deploymentWithOSConfigurationDeserializer(item);
        default:
            return sapConfigurationDeserializer(item);
    }
}
/** The configuration Type. */
var KnownSAPConfigurationType;
(function (KnownSAPConfigurationType) {
    /** SAP system will be deployed by service. No OS configurations will be done. */
    KnownSAPConfigurationType["Deployment"] = "Deployment";
    /** Existing SAP system will be registered. */
    KnownSAPConfigurationType["Discovery"] = "Discovery";
    /** SAP system will be deployed by service. OS configurations will be done. */
    KnownSAPConfigurationType["DeploymentWithOSConfig"] = "DeploymentWithOSConfig";
})(KnownSAPConfigurationType || (exports.KnownSAPConfigurationType = KnownSAPConfigurationType = {}));
function discoveryConfigurationSerializer(item) {
    return {
        configurationType: item["configurationType"],
        centralServerVmId: item["centralServerVmId"],
        managedRgStorageAccountName: item["managedRgStorageAccountName"],
    };
}
function discoveryConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
        centralServerVmId: item["centralServerVmId"],
        managedRgStorageAccountName: item["managedRgStorageAccountName"],
        appLocation: item["appLocation"],
    };
}
function deploymentConfigurationSerializer(item) {
    return {
        configurationType: item["configurationType"],
        appLocation: item["appLocation"],
        infrastructureConfiguration: !item["infrastructureConfiguration"]
            ? item["infrastructureConfiguration"]
            : infrastructureConfigurationUnionSerializer(item["infrastructureConfiguration"]),
        softwareConfiguration: !item["softwareConfiguration"]
            ? item["softwareConfiguration"]
            : softwareConfigurationUnionSerializer(item["softwareConfiguration"]),
    };
}
function deploymentConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
        appLocation: item["appLocation"],
        infrastructureConfiguration: !item["infrastructureConfiguration"]
            ? item["infrastructureConfiguration"]
            : infrastructureConfigurationUnionDeserializer(item["infrastructureConfiguration"]),
        softwareConfiguration: !item["softwareConfiguration"]
            ? item["softwareConfiguration"]
            : softwareConfigurationUnionDeserializer(item["softwareConfiguration"]),
    };
}
function infrastructureConfigurationSerializer(item) {
    return {
        appResourceGroup: item["appResourceGroup"],
        deploymentType: item["deploymentType"],
    };
}
function infrastructureConfigurationDeserializer(item) {
    return {
        appResourceGroup: item["appResourceGroup"],
        deploymentType: item["deploymentType"],
    };
}
function infrastructureConfigurationUnionSerializer(item) {
    switch (item.deploymentType) {
        case "SingleServer":
            return singleServerConfigurationSerializer(item);
        case "ThreeTier":
            return threeTierConfigurationSerializer(item);
        default:
            return infrastructureConfigurationSerializer(item);
    }
}
function infrastructureConfigurationUnionDeserializer(item) {
    switch (item.deploymentType) {
        case "SingleServer":
            return singleServerConfigurationDeserializer(item);
        case "ThreeTier":
            return threeTierConfigurationDeserializer(item);
        default:
            return infrastructureConfigurationDeserializer(item);
    }
}
/** The type of SAP deployment, single server or Three tier. */
var KnownSAPDeploymentType;
(function (KnownSAPDeploymentType) {
    /** SAP Single server deployment type. */
    KnownSAPDeploymentType["SingleServer"] = "SingleServer";
    /** SAP Distributed deployment type. */
    KnownSAPDeploymentType["ThreeTier"] = "ThreeTier";
})(KnownSAPDeploymentType || (exports.KnownSAPDeploymentType = KnownSAPDeploymentType = {}));
function singleServerConfigurationSerializer(item) {
    return {
        appResourceGroup: item["appResourceGroup"],
        deploymentType: item["deploymentType"],
        networkConfiguration: !item["networkConfiguration"]
            ? item["networkConfiguration"]
            : networkConfigurationSerializer(item["networkConfiguration"]),
        databaseType: item["databaseType"],
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationSerializer(item["virtualMachineConfiguration"]),
        dbDiskConfiguration: !item["dbDiskConfiguration"]
            ? item["dbDiskConfiguration"]
            : diskConfigurationSerializer(item["dbDiskConfiguration"]),
        customResourceNames: !item["customResourceNames"]
            ? item["customResourceNames"]
            : singleServerCustomResourceNamesUnionSerializer(item["customResourceNames"]),
    };
}
function singleServerConfigurationDeserializer(item) {
    return {
        appResourceGroup: item["appResourceGroup"],
        deploymentType: item["deploymentType"],
        networkConfiguration: !item["networkConfiguration"]
            ? item["networkConfiguration"]
            : networkConfigurationDeserializer(item["networkConfiguration"]),
        databaseType: item["databaseType"],
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationDeserializer(item["virtualMachineConfiguration"]),
        dbDiskConfiguration: !item["dbDiskConfiguration"]
            ? item["dbDiskConfiguration"]
            : diskConfigurationDeserializer(item["dbDiskConfiguration"]),
        customResourceNames: !item["customResourceNames"]
            ? item["customResourceNames"]
            : singleServerCustomResourceNamesUnionDeserializer(item["customResourceNames"]),
    };
}
function networkConfigurationSerializer(item) {
    return { isSecondaryIpEnabled: item["isSecondaryIpEnabled"] };
}
function networkConfigurationDeserializer(item) {
    return {
        isSecondaryIpEnabled: item["isSecondaryIpEnabled"],
    };
}
/** Defines the supported SAP Database types. */
var KnownSAPDatabaseType;
(function (KnownSAPDatabaseType) {
    /** HANA Database type of SAP system. */
    KnownSAPDatabaseType["Hana"] = "HANA";
    /** DB2 database type of the SAP system. */
    KnownSAPDatabaseType["DB2"] = "DB2";
})(KnownSAPDatabaseType || (exports.KnownSAPDatabaseType = KnownSAPDatabaseType = {}));
function virtualMachineConfigurationSerializer(item) {
    return {
        vmSize: item["vmSize"],
        imageReference: imageReferenceSerializer(item["imageReference"]),
        osProfile: osProfileSerializer(item["osProfile"]),
    };
}
function virtualMachineConfigurationDeserializer(item) {
    return {
        vmSize: item["vmSize"],
        imageReference: imageReferenceDeserializer(item["imageReference"]),
        osProfile: osProfileDeserializer(item["osProfile"]),
    };
}
function imageReferenceSerializer(item) {
    return {
        publisher: item["publisher"],
        offer: item["offer"],
        sku: item["sku"],
        version: item["version"],
        id: item["id"],
    };
}
function imageReferenceDeserializer(item) {
    return {
        publisher: item["publisher"],
        offer: item["offer"],
        sku: item["sku"],
        version: item["version"],
        id: item["id"],
    };
}
function osProfileSerializer(item) {
    return {
        adminUsername: item["adminUsername"],
        adminPassword: item["adminPassword"],
        osConfiguration: !item["osConfiguration"]
            ? item["osConfiguration"]
            : osConfigurationUnionSerializer(item["osConfiguration"]),
    };
}
function osProfileDeserializer(item) {
    return {
        adminUsername: item["adminUsername"],
        adminPassword: item["adminPassword"],
        osConfiguration: !item["osConfiguration"]
            ? item["osConfiguration"]
            : osConfigurationUnionDeserializer(item["osConfiguration"]),
    };
}
function osConfigurationSerializer(item) {
    return { osType: item["osType"] };
}
function osConfigurationDeserializer(item) {
    return {
        osType: item["osType"],
    };
}
function osConfigurationUnionSerializer(item) {
    switch (item.osType) {
        case "Windows":
            return windowsConfigurationSerializer(item);
        case "Linux":
            return linuxConfigurationSerializer(item);
        default:
            return osConfigurationSerializer(item);
    }
}
function osConfigurationUnionDeserializer(item) {
    switch (item.osType) {
        case "Windows":
            return windowsConfigurationDeserializer(item);
        case "Linux":
            return linuxConfigurationDeserializer(item);
        default:
            return osConfigurationDeserializer(item);
    }
}
/** The OS Type */
var KnownOSType;
(function (KnownOSType) {
    /** Linux OS Type. */
    KnownOSType["Linux"] = "Linux";
    /** Windows OS Type. */
    KnownOSType["Windows"] = "Windows";
})(KnownOSType || (exports.KnownOSType = KnownOSType = {}));
function windowsConfigurationSerializer(item) {
    return { osType: item["osType"] };
}
function windowsConfigurationDeserializer(item) {
    return {
        osType: item["osType"],
    };
}
function linuxConfigurationSerializer(item) {
    return {
        osType: item["osType"],
        disablePasswordAuthentication: item["disablePasswordAuthentication"],
        ssh: !item["ssh"] ? item["ssh"] : sshConfigurationSerializer(item["ssh"]),
        sshKeyPair: !item["sshKeyPair"] ? item["sshKeyPair"] : sshKeyPairSerializer(item["sshKeyPair"]),
    };
}
function linuxConfigurationDeserializer(item) {
    return {
        osType: item["osType"],
        disablePasswordAuthentication: item["disablePasswordAuthentication"],
        ssh: !item["ssh"] ? item["ssh"] : sshConfigurationDeserializer(item["ssh"]),
        sshKeyPair: !item["sshKeyPair"]
            ? item["sshKeyPair"]
            : sshKeyPairDeserializer(item["sshKeyPair"]),
    };
}
function sshConfigurationSerializer(item) {
    return {
        publicKeys: !item["publicKeys"]
            ? item["publicKeys"]
            : sshPublicKeyArraySerializer(item["publicKeys"]),
    };
}
function sshConfigurationDeserializer(item) {
    return {
        publicKeys: !item["publicKeys"]
            ? item["publicKeys"]
            : sshPublicKeyArrayDeserializer(item["publicKeys"]),
    };
}
function sshPublicKeyArraySerializer(result) {
    return result.map((item) => {
        return sshPublicKeySerializer(item);
    });
}
function sshPublicKeyArrayDeserializer(result) {
    return result.map((item) => {
        return sshPublicKeyDeserializer(item);
    });
}
function sshPublicKeySerializer(item) {
    return { keyData: item["keyData"] };
}
function sshPublicKeyDeserializer(item) {
    return {
        keyData: item["keyData"],
    };
}
function sshKeyPairSerializer(item) {
    return { publicKey: item["publicKey"], privateKey: item["privateKey"] };
}
function sshKeyPairDeserializer(item) {
    return {
        publicKey: item["publicKey"],
        privateKey: item["privateKey"],
    };
}
function diskConfigurationSerializer(item) {
    return {
        diskVolumeConfigurations: !item["diskVolumeConfigurations"]
            ? item["diskVolumeConfigurations"]
            : diskVolumeConfigurationRecordSerializer(item["diskVolumeConfigurations"]),
    };
}
function diskConfigurationDeserializer(item) {
    return {
        diskVolumeConfigurations: !item["diskVolumeConfigurations"]
            ? item["diskVolumeConfigurations"]
            : diskVolumeConfigurationRecordDeserializer(item["diskVolumeConfigurations"]),
    };
}
function diskVolumeConfigurationRecordSerializer(item) {
    const result = {};
    Object.keys(item).map((key) => {
        result[key] = !item[key] ? item[key] : diskVolumeConfigurationSerializer(item[key]);
    });
    return result;
}
function diskVolumeConfigurationRecordDeserializer(item) {
    const result = {};
    Object.keys(item).map((key) => {
        result[key] = !item[key] ? item[key] : diskVolumeConfigurationDeserializer(item[key]);
    });
    return result;
}
function diskVolumeConfigurationSerializer(item) {
    return {
        count: item["count"],
        sizeGB: item["sizeGB"],
        sku: !item["sku"] ? item["sku"] : diskSkuSerializer(item["sku"]),
    };
}
function diskVolumeConfigurationDeserializer(item) {
    return {
        count: item["count"],
        sizeGB: item["sizeGB"],
        sku: !item["sku"] ? item["sku"] : diskSkuDeserializer(item["sku"]),
    };
}
function diskSkuSerializer(item) {
    return { name: item["name"] };
}
function diskSkuDeserializer(item) {
    return {
        name: item["name"],
    };
}
/** Defines the disk sku name. */
var KnownDiskSkuName;
(function (KnownDiskSkuName) {
    /** Standard LRS Disk SKU. */
    KnownDiskSkuName["StandardLRS"] = "Standard_LRS";
    /** Premium_LRS Disk SKU. */
    KnownDiskSkuName["PremiumLRS"] = "Premium_LRS";
    /** StandardSSD_LRS Disk SKU. */
    KnownDiskSkuName["StandardSSDLRS"] = "StandardSSD_LRS";
    /** UltraSSD_LRS Disk SKU. */
    KnownDiskSkuName["UltraSSDLRS"] = "UltraSSD_LRS";
    /** Premium_ZRS Disk SKU. */
    KnownDiskSkuName["PremiumZRS"] = "Premium_ZRS";
    /** StandardSSD_ZRS Disk SKU. */
    KnownDiskSkuName["StandardSSDZRS"] = "StandardSSD_ZRS";
    /** PremiumV2_LRS Disk SKU. */
    KnownDiskSkuName["PremiumV2LRS"] = "PremiumV2_LRS";
})(KnownDiskSkuName || (exports.KnownDiskSkuName = KnownDiskSkuName = {}));
function singleServerCustomResourceNamesSerializer(item) {
    return { namingPatternType: item["namingPatternType"] };
}
function singleServerCustomResourceNamesDeserializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
    };
}
function singleServerCustomResourceNamesUnionSerializer(item) {
    switch (item.namingPatternType) {
        case "FullResourceName":
            return singleServerFullResourceNamesSerializer(item);
        default:
            return singleServerCustomResourceNamesSerializer(item);
    }
}
function singleServerCustomResourceNamesUnionDeserializer(item) {
    switch (item.namingPatternType) {
        case "FullResourceName":
            return singleServerFullResourceNamesDeserializer(item);
        default:
            return singleServerCustomResourceNamesDeserializer(item);
    }
}
/** The pattern type to be used for resource naming. */
var KnownNamingPatternType;
(function (KnownNamingPatternType) {
    /** Full resource names that will be created by service. */
    KnownNamingPatternType["FullResourceName"] = "FullResourceName";
})(KnownNamingPatternType || (exports.KnownNamingPatternType = KnownNamingPatternType = {}));
function singleServerFullResourceNamesSerializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
        virtualMachine: !item["virtualMachine"]
            ? item["virtualMachine"]
            : virtualMachineResourceNamesSerializer(item["virtualMachine"]),
    };
}
function singleServerFullResourceNamesDeserializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
        virtualMachine: !item["virtualMachine"]
            ? item["virtualMachine"]
            : virtualMachineResourceNamesDeserializer(item["virtualMachine"]),
    };
}
function virtualMachineResourceNamesSerializer(item) {
    return {
        vmName: item["vmName"],
        hostName: item["hostName"],
        networkInterfaces: !item["networkInterfaces"]
            ? item["networkInterfaces"]
            : networkInterfaceResourceNamesArraySerializer(item["networkInterfaces"]),
        osDiskName: item["osDiskName"],
        dataDiskNames: item["dataDiskNames"],
    };
}
function virtualMachineResourceNamesDeserializer(item) {
    return {
        vmName: item["vmName"],
        hostName: item["hostName"],
        networkInterfaces: !item["networkInterfaces"]
            ? item["networkInterfaces"]
            : networkInterfaceResourceNamesArrayDeserializer(item["networkInterfaces"]),
        osDiskName: item["osDiskName"],
        dataDiskNames: item["dataDiskNames"],
    };
}
function networkInterfaceResourceNamesArraySerializer(result) {
    return result.map((item) => {
        return networkInterfaceResourceNamesSerializer(item);
    });
}
function networkInterfaceResourceNamesArrayDeserializer(result) {
    return result.map((item) => {
        return networkInterfaceResourceNamesDeserializer(item);
    });
}
function networkInterfaceResourceNamesSerializer(item) {
    return { networkInterfaceName: item["networkInterfaceName"] };
}
function networkInterfaceResourceNamesDeserializer(item) {
    return {
        networkInterfaceName: item["networkInterfaceName"],
    };
}
function threeTierConfigurationSerializer(item) {
    return {
        appResourceGroup: item["appResourceGroup"],
        deploymentType: item["deploymentType"],
        networkConfiguration: !item["networkConfiguration"]
            ? item["networkConfiguration"]
            : networkConfigurationSerializer(item["networkConfiguration"]),
        centralServer: centralServerConfigurationSerializer(item["centralServer"]),
        applicationServer: applicationServerConfigurationSerializer(item["applicationServer"]),
        databaseServer: databaseConfigurationSerializer(item["databaseServer"]),
        highAvailabilityConfig: !item["highAvailabilityConfig"]
            ? item["highAvailabilityConfig"]
            : highAvailabilityConfigurationSerializer(item["highAvailabilityConfig"]),
        storageConfiguration: !item["storageConfiguration"]
            ? item["storageConfiguration"]
            : storageConfigurationSerializer(item["storageConfiguration"]),
        customResourceNames: !item["customResourceNames"]
            ? item["customResourceNames"]
            : threeTierCustomResourceNamesUnionSerializer(item["customResourceNames"]),
    };
}
function threeTierConfigurationDeserializer(item) {
    return {
        appResourceGroup: item["appResourceGroup"],
        deploymentType: item["deploymentType"],
        networkConfiguration: !item["networkConfiguration"]
            ? item["networkConfiguration"]
            : networkConfigurationDeserializer(item["networkConfiguration"]),
        centralServer: centralServerConfigurationDeserializer(item["centralServer"]),
        applicationServer: applicationServerConfigurationDeserializer(item["applicationServer"]),
        databaseServer: databaseConfigurationDeserializer(item["databaseServer"]),
        highAvailabilityConfig: !item["highAvailabilityConfig"]
            ? item["highAvailabilityConfig"]
            : highAvailabilityConfigurationDeserializer(item["highAvailabilityConfig"]),
        storageConfiguration: !item["storageConfiguration"]
            ? item["storageConfiguration"]
            : storageConfigurationDeserializer(item["storageConfiguration"]),
        customResourceNames: !item["customResourceNames"]
            ? item["customResourceNames"]
            : threeTierCustomResourceNamesUnionDeserializer(item["customResourceNames"]),
    };
}
function centralServerConfigurationSerializer(item) {
    return {
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationSerializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
    };
}
function centralServerConfigurationDeserializer(item) {
    return {
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationDeserializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
    };
}
function applicationServerConfigurationSerializer(item) {
    return {
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationSerializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
    };
}
function applicationServerConfigurationDeserializer(item) {
    return {
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationDeserializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
    };
}
function databaseConfigurationSerializer(item) {
    return {
        databaseType: item["databaseType"],
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationSerializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
        diskConfiguration: !item["diskConfiguration"]
            ? item["diskConfiguration"]
            : diskConfigurationSerializer(item["diskConfiguration"]),
    };
}
function databaseConfigurationDeserializer(item) {
    return {
        databaseType: item["databaseType"],
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationDeserializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
        diskConfiguration: !item["diskConfiguration"]
            ? item["diskConfiguration"]
            : diskConfigurationDeserializer(item["diskConfiguration"]),
    };
}
function highAvailabilityConfigurationSerializer(item) {
    return { highAvailabilityType: item["highAvailabilityType"] };
}
function highAvailabilityConfigurationDeserializer(item) {
    return {
        highAvailabilityType: item["highAvailabilityType"],
    };
}
/** The high availability type (AvailabilitySet or AvailabilityZone). */
var KnownSAPHighAvailabilityType;
(function (KnownSAPHighAvailabilityType) {
    /** HA deployment with availability sets. */
    KnownSAPHighAvailabilityType["AvailabilitySet"] = "AvailabilitySet";
    /** HA deployment with availability zones. */
    KnownSAPHighAvailabilityType["AvailabilityZone"] = "AvailabilityZone";
})(KnownSAPHighAvailabilityType || (exports.KnownSAPHighAvailabilityType = KnownSAPHighAvailabilityType = {}));
function storageConfigurationSerializer(item) {
    return {
        transportFileShareConfiguration: !item["transportFileShareConfiguration"]
            ? item["transportFileShareConfiguration"]
            : fileShareConfigurationUnionSerializer(item["transportFileShareConfiguration"]),
    };
}
function storageConfigurationDeserializer(item) {
    return {
        transportFileShareConfiguration: !item["transportFileShareConfiguration"]
            ? item["transportFileShareConfiguration"]
            : fileShareConfigurationUnionDeserializer(item["transportFileShareConfiguration"]),
    };
}
function fileShareConfigurationSerializer(item) {
    return { configurationType: item["configurationType"] };
}
function fileShareConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
    };
}
function fileShareConfigurationUnionSerializer(item) {
    switch (item.configurationType) {
        case "Skip":
            return skipFileShareConfigurationSerializer(item);
        case "CreateAndMount":
            return createAndMountFileShareConfigurationSerializer(item);
        case "Mount":
            return mountFileShareConfigurationSerializer(item);
        default:
            return fileShareConfigurationSerializer(item);
    }
}
function fileShareConfigurationUnionDeserializer(item) {
    switch (item.configurationType) {
        case "Skip":
            return skipFileShareConfigurationDeserializer(item);
        case "CreateAndMount":
            return createAndMountFileShareConfigurationDeserializer(item);
        case "Mount":
            return mountFileShareConfigurationDeserializer(item);
        default:
            return fileShareConfigurationDeserializer(item);
    }
}
/** The type of file share config. */
var KnownFileShareConfigurationType;
(function (KnownFileShareConfigurationType) {
    /** Skip creating the file share. */
    KnownFileShareConfigurationType["Skip"] = "Skip";
    /** Fileshare will be created and mounted by service. */
    KnownFileShareConfigurationType["CreateAndMount"] = "CreateAndMount";
    /** Existing fileshare provided will be mounted by service. */
    KnownFileShareConfigurationType["Mount"] = "Mount";
})(KnownFileShareConfigurationType || (exports.KnownFileShareConfigurationType = KnownFileShareConfigurationType = {}));
function skipFileShareConfigurationSerializer(item) {
    return { configurationType: item["configurationType"] };
}
function skipFileShareConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
    };
}
function createAndMountFileShareConfigurationSerializer(item) {
    return {
        configurationType: item["configurationType"],
        resourceGroup: item["resourceGroup"],
        storageAccountName: item["storageAccountName"],
    };
}
function createAndMountFileShareConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
        resourceGroup: item["resourceGroup"],
        storageAccountName: item["storageAccountName"],
    };
}
function mountFileShareConfigurationSerializer(item) {
    return {
        configurationType: item["configurationType"],
        id: item["id"],
        privateEndpointId: item["privateEndpointId"],
    };
}
function mountFileShareConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
        id: item["id"],
        privateEndpointId: item["privateEndpointId"],
    };
}
function threeTierCustomResourceNamesSerializer(item) {
    return { namingPatternType: item["namingPatternType"] };
}
function threeTierCustomResourceNamesDeserializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
    };
}
function threeTierCustomResourceNamesUnionSerializer(item) {
    switch (item.namingPatternType) {
        case "FullResourceName":
            return threeTierFullResourceNamesSerializer(item);
        default:
            return threeTierCustomResourceNamesSerializer(item);
    }
}
function threeTierCustomResourceNamesUnionDeserializer(item) {
    switch (item.namingPatternType) {
        case "FullResourceName":
            return threeTierFullResourceNamesDeserializer(item);
        default:
            return threeTierCustomResourceNamesDeserializer(item);
    }
}
function threeTierFullResourceNamesSerializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
        centralServer: !item["centralServer"]
            ? item["centralServer"]
            : centralServerFullResourceNamesSerializer(item["centralServer"]),
        applicationServer: !item["applicationServer"]
            ? item["applicationServer"]
            : applicationServerFullResourceNamesSerializer(item["applicationServer"]),
        databaseServer: !item["databaseServer"]
            ? item["databaseServer"]
            : databaseServerFullResourceNamesSerializer(item["databaseServer"]),
        sharedStorage: !item["sharedStorage"]
            ? item["sharedStorage"]
            : sharedStorageResourceNamesSerializer(item["sharedStorage"]),
    };
}
function threeTierFullResourceNamesDeserializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
        centralServer: !item["centralServer"]
            ? item["centralServer"]
            : centralServerFullResourceNamesDeserializer(item["centralServer"]),
        applicationServer: !item["applicationServer"]
            ? item["applicationServer"]
            : applicationServerFullResourceNamesDeserializer(item["applicationServer"]),
        databaseServer: !item["databaseServer"]
            ? item["databaseServer"]
            : databaseServerFullResourceNamesDeserializer(item["databaseServer"]),
        sharedStorage: !item["sharedStorage"]
            ? item["sharedStorage"]
            : sharedStorageResourceNamesDeserializer(item["sharedStorage"]),
    };
}
function centralServerFullResourceNamesSerializer(item) {
    return {
        virtualMachines: !item["virtualMachines"]
            ? item["virtualMachines"]
            : virtualMachineResourceNamesArraySerializer(item["virtualMachines"]),
        availabilitySetName: item["availabilitySetName"],
        loadBalancer: !item["loadBalancer"]
            ? item["loadBalancer"]
            : loadBalancerResourceNamesSerializer(item["loadBalancer"]),
    };
}
function centralServerFullResourceNamesDeserializer(item) {
    return {
        virtualMachines: !item["virtualMachines"]
            ? item["virtualMachines"]
            : virtualMachineResourceNamesArrayDeserializer(item["virtualMachines"]),
        availabilitySetName: item["availabilitySetName"],
        loadBalancer: !item["loadBalancer"]
            ? item["loadBalancer"]
            : loadBalancerResourceNamesDeserializer(item["loadBalancer"]),
    };
}
function virtualMachineResourceNamesArraySerializer(result) {
    return result.map((item) => {
        return virtualMachineResourceNamesSerializer(item);
    });
}
function virtualMachineResourceNamesArrayDeserializer(result) {
    return result.map((item) => {
        return virtualMachineResourceNamesDeserializer(item);
    });
}
function loadBalancerResourceNamesSerializer(item) {
    return {
        loadBalancerName: item["loadBalancerName"],
        frontendIpConfigurationNames: !item["frontendIpConfigurationNames"]
            ? item["frontendIpConfigurationNames"]
            : item["frontendIpConfigurationNames"].map((p) => {
                return p;
            }),
        backendPoolNames: !item["backendPoolNames"]
            ? item["backendPoolNames"]
            : item["backendPoolNames"].map((p) => {
                return p;
            }),
        healthProbeNames: !item["healthProbeNames"]
            ? item["healthProbeNames"]
            : item["healthProbeNames"].map((p) => {
                return p;
            }),
    };
}
function loadBalancerResourceNamesDeserializer(item) {
    return {
        loadBalancerName: item["loadBalancerName"],
        frontendIpConfigurationNames: !item["frontendIpConfigurationNames"]
            ? item["frontendIpConfigurationNames"]
            : item["frontendIpConfigurationNames"].map((p) => {
                return p;
            }),
        backendPoolNames: !item["backendPoolNames"]
            ? item["backendPoolNames"]
            : item["backendPoolNames"].map((p) => {
                return p;
            }),
        healthProbeNames: !item["healthProbeNames"]
            ? item["healthProbeNames"]
            : item["healthProbeNames"].map((p) => {
                return p;
            }),
    };
}
function applicationServerFullResourceNamesSerializer(item) {
    return {
        virtualMachines: !item["virtualMachines"]
            ? item["virtualMachines"]
            : virtualMachineResourceNamesArraySerializer(item["virtualMachines"]),
        availabilitySetName: item["availabilitySetName"],
    };
}
function applicationServerFullResourceNamesDeserializer(item) {
    return {
        virtualMachines: !item["virtualMachines"]
            ? item["virtualMachines"]
            : virtualMachineResourceNamesArrayDeserializer(item["virtualMachines"]),
        availabilitySetName: item["availabilitySetName"],
    };
}
function databaseServerFullResourceNamesSerializer(item) {
    return {
        virtualMachines: !item["virtualMachines"]
            ? item["virtualMachines"]
            : virtualMachineResourceNamesArraySerializer(item["virtualMachines"]),
        availabilitySetName: item["availabilitySetName"],
        loadBalancer: !item["loadBalancer"]
            ? item["loadBalancer"]
            : loadBalancerResourceNamesSerializer(item["loadBalancer"]),
    };
}
function databaseServerFullResourceNamesDeserializer(item) {
    return {
        virtualMachines: !item["virtualMachines"]
            ? item["virtualMachines"]
            : virtualMachineResourceNamesArrayDeserializer(item["virtualMachines"]),
        availabilitySetName: item["availabilitySetName"],
        loadBalancer: !item["loadBalancer"]
            ? item["loadBalancer"]
            : loadBalancerResourceNamesDeserializer(item["loadBalancer"]),
    };
}
function sharedStorageResourceNamesSerializer(item) {
    return {
        sharedStorageAccountName: item["sharedStorageAccountName"],
        sharedStorageAccountPrivateEndPointName: item["sharedStorageAccountPrivateEndPointName"],
    };
}
function sharedStorageResourceNamesDeserializer(item) {
    return {
        sharedStorageAccountName: item["sharedStorageAccountName"],
        sharedStorageAccountPrivateEndPointName: item["sharedStorageAccountPrivateEndPointName"],
    };
}
function softwareConfigurationSerializer(item) {
    return { softwareInstallationType: item["softwareInstallationType"] };
}
function softwareConfigurationDeserializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
    };
}
function softwareConfigurationUnionSerializer(item) {
    switch (item.softwareInstallationType) {
        case "ServiceInitiated":
            return serviceInitiatedSoftwareConfigurationSerializer(item);
        case "SAPInstallWithoutOSConfig":
            return sapInstallWithoutOSConfigSoftwareConfigurationSerializer(item);
        case "External":
            return externalInstallationSoftwareConfigurationSerializer(item);
        default:
            return softwareConfigurationSerializer(item);
    }
}
function softwareConfigurationUnionDeserializer(item) {
    switch (item.softwareInstallationType) {
        case "ServiceInitiated":
            return serviceInitiatedSoftwareConfigurationDeserializer(item);
        case "SAPInstallWithoutOSConfig":
            return sapInstallWithoutOSConfigSoftwareConfigurationDeserializer(item);
        case "External":
            return externalInstallationSoftwareConfigurationDeserializer(item);
        default:
            return softwareConfigurationDeserializer(item);
    }
}
/** The SAP software installation Type. */
var KnownSAPSoftwareInstallationType;
(function (KnownSAPSoftwareInstallationType) {
    /** SAP Install managed by service. */
    KnownSAPSoftwareInstallationType["ServiceInitiated"] = "ServiceInitiated";
    /** SAP Install without OS Config. */
    KnownSAPSoftwareInstallationType["SAPInstallWithoutOSConfig"] = "SAPInstallWithoutOSConfig";
    /** External software installation type. */
    KnownSAPSoftwareInstallationType["External"] = "External";
})(KnownSAPSoftwareInstallationType || (exports.KnownSAPSoftwareInstallationType = KnownSAPSoftwareInstallationType = {}));
function serviceInitiatedSoftwareConfigurationSerializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
        bomUrl: item["bomUrl"],
        softwareVersion: item["softwareVersion"],
        sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
        sapFqdn: item["sapFqdn"],
        sshPrivateKey: item["sshPrivateKey"],
        highAvailabilitySoftwareConfiguration: !item["highAvailabilitySoftwareConfiguration"]
            ? item["highAvailabilitySoftwareConfiguration"]
            : highAvailabilitySoftwareConfigurationSerializer(item["highAvailabilitySoftwareConfiguration"]),
    };
}
function serviceInitiatedSoftwareConfigurationDeserializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
        bomUrl: item["bomUrl"],
        softwareVersion: item["softwareVersion"],
        sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
        sapFqdn: item["sapFqdn"],
        sshPrivateKey: item["sshPrivateKey"],
        highAvailabilitySoftwareConfiguration: !item["highAvailabilitySoftwareConfiguration"]
            ? item["highAvailabilitySoftwareConfiguration"]
            : highAvailabilitySoftwareConfigurationDeserializer(item["highAvailabilitySoftwareConfiguration"]),
    };
}
function highAvailabilitySoftwareConfigurationSerializer(item) {
    return {
        fencingClientId: item["fencingClientId"],
        fencingClientPassword: item["fencingClientPassword"],
    };
}
function highAvailabilitySoftwareConfigurationDeserializer(item) {
    return {
        fencingClientId: item["fencingClientId"],
        fencingClientPassword: item["fencingClientPassword"],
    };
}
function sapInstallWithoutOSConfigSoftwareConfigurationSerializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
        bomUrl: item["bomUrl"],
        sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
        softwareVersion: item["softwareVersion"],
        highAvailabilitySoftwareConfiguration: !item["highAvailabilitySoftwareConfiguration"]
            ? item["highAvailabilitySoftwareConfiguration"]
            : highAvailabilitySoftwareConfigurationSerializer(item["highAvailabilitySoftwareConfiguration"]),
    };
}
function sapInstallWithoutOSConfigSoftwareConfigurationDeserializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
        bomUrl: item["bomUrl"],
        sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
        softwareVersion: item["softwareVersion"],
        highAvailabilitySoftwareConfiguration: !item["highAvailabilitySoftwareConfiguration"]
            ? item["highAvailabilitySoftwareConfiguration"]
            : highAvailabilitySoftwareConfigurationDeserializer(item["highAvailabilitySoftwareConfiguration"]),
    };
}
function externalInstallationSoftwareConfigurationSerializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
        centralServerVmId: item["centralServerVmId"],
    };
}
function externalInstallationSoftwareConfigurationDeserializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
        centralServerVmId: item["centralServerVmId"],
    };
}
function deploymentWithOSConfigurationSerializer(item) {
    return {
        configurationType: item["configurationType"],
        appLocation: item["appLocation"],
        infrastructureConfiguration: !item["infrastructureConfiguration"]
            ? item["infrastructureConfiguration"]
            : infrastructureConfigurationUnionSerializer(item["infrastructureConfiguration"]),
        softwareConfiguration: !item["softwareConfiguration"]
            ? item["softwareConfiguration"]
            : softwareConfigurationUnionSerializer(item["softwareConfiguration"]),
        osSapConfiguration: !item["osSapConfiguration"]
            ? item["osSapConfiguration"]
            : osSapConfigurationSerializer(item["osSapConfiguration"]),
    };
}
function deploymentWithOSConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
        appLocation: item["appLocation"],
        infrastructureConfiguration: !item["infrastructureConfiguration"]
            ? item["infrastructureConfiguration"]
            : infrastructureConfigurationUnionDeserializer(item["infrastructureConfiguration"]),
        softwareConfiguration: !item["softwareConfiguration"]
            ? item["softwareConfiguration"]
            : softwareConfigurationUnionDeserializer(item["softwareConfiguration"]),
        osSapConfiguration: !item["osSapConfiguration"]
            ? item["osSapConfiguration"]
            : osSapConfigurationDeserializer(item["osSapConfiguration"]),
    };
}
function osSapConfigurationSerializer(item) {
    return {
        deployerVmPackages: !item["deployerVmPackages"]
            ? item["deployerVmPackages"]
            : deployerVmPackagesSerializer(item["deployerVmPackages"]),
        sapFqdn: item["sapFqdn"],
    };
}
function osSapConfigurationDeserializer(item) {
    return {
        deployerVmPackages: !item["deployerVmPackages"]
            ? item["deployerVmPackages"]
            : deployerVmPackagesDeserializer(item["deployerVmPackages"]),
        sapFqdn: item["sapFqdn"],
    };
}
function deployerVmPackagesSerializer(item) {
    return { url: item["url"], storageAccountId: item["storageAccountId"] };
}
function deployerVmPackagesDeserializer(item) {
    return {
        url: item["url"],
        storageAccountId: item["storageAccountId"],
    };
}
function managedRGConfigurationSerializer(item) {
    return { name: item["name"] };
}
function managedRGConfigurationDeserializer(item) {
    return {
        name: item["name"],
    };
}
/** Defines the SAP Instance status. */
var KnownSAPVirtualInstanceStatus;
(function (KnownSAPVirtualInstanceStatus) {
    /** SAP system is getting started. */
    KnownSAPVirtualInstanceStatus["Starting"] = "Starting";
    /** SAP system is running. */
    KnownSAPVirtualInstanceStatus["Running"] = "Running";
    /** SAP system is being stopped. */
    KnownSAPVirtualInstanceStatus["Stopping"] = "Stopping";
    /** SAP system is offline. */
    KnownSAPVirtualInstanceStatus["Offline"] = "Offline";
    /** SAP system is partially running. */
    KnownSAPVirtualInstanceStatus["PartiallyRunning"] = "PartiallyRunning";
    /** SAP system status is unavailable. */
    KnownSAPVirtualInstanceStatus["Unavailable"] = "Unavailable";
    /** Soft shutdown of SAP system is initiated. */
    KnownSAPVirtualInstanceStatus["SoftShutdown"] = "SoftShutdown";
})(KnownSAPVirtualInstanceStatus || (exports.KnownSAPVirtualInstanceStatus = KnownSAPVirtualInstanceStatus = {}));
/** Defines the health of SAP Instances. */
var KnownSAPHealthState;
(function (KnownSAPHealthState) {
    /** SAP System health is unknown. */
    KnownSAPHealthState["Unknown"] = "Unknown";
    /** SAP System health is healthy. */
    KnownSAPHealthState["Healthy"] = "Healthy";
    /** SAP System is unhealthy. */
    KnownSAPHealthState["Unhealthy"] = "Unhealthy";
    /** SAP System health is degraded. */
    KnownSAPHealthState["Degraded"] = "Degraded";
})(KnownSAPHealthState || (exports.KnownSAPHealthState = KnownSAPHealthState = {}));
/** Defines the Virtual Instance for SAP state. */
var KnownSAPVirtualInstanceState;
(function (KnownSAPVirtualInstanceState) {
    /** Infrastructure is not yet deployed. */
    KnownSAPVirtualInstanceState["InfrastructureDeploymentPending"] = "InfrastructureDeploymentPending";
    /** Infrastructure deployment is in progress. */
    KnownSAPVirtualInstanceState["InfrastructureDeploymentInProgress"] = "InfrastructureDeploymentInProgress";
    /** Infrastructure deployment has failed. */
    KnownSAPVirtualInstanceState["InfrastructureDeploymentFailed"] = "InfrastructureDeploymentFailed";
    /** Infrastructure deployment is successful. Software installation is pending. */
    KnownSAPVirtualInstanceState["SoftwareInstallationPending"] = "SoftwareInstallationPending";
    /** Software installation is in progress. */
    KnownSAPVirtualInstanceState["SoftwareInstallationInProgress"] = "SoftwareInstallationInProgress";
    /** Software installation failed. */
    KnownSAPVirtualInstanceState["SoftwareInstallationFailed"] = "SoftwareInstallationFailed";
    /** Software detection is in progress. */
    KnownSAPVirtualInstanceState["SoftwareDetectionInProgress"] = "SoftwareDetectionInProgress";
    /** Software detection failed. */
    KnownSAPVirtualInstanceState["SoftwareDetectionFailed"] = "SoftwareDetectionFailed";
    /** Registration has not started. */
    KnownSAPVirtualInstanceState["DiscoveryPending"] = "DiscoveryPending";
    /** Registration is in progress. */
    KnownSAPVirtualInstanceState["DiscoveryInProgress"] = "DiscoveryInProgress";
    /** Registration has failed. */
    KnownSAPVirtualInstanceState["DiscoveryFailed"] = "DiscoveryFailed";
    /** Registration is complete. */
    KnownSAPVirtualInstanceState["RegistrationComplete"] = "RegistrationComplete";
    /** ACSS installation cannot proceed. */
    KnownSAPVirtualInstanceState["AcssInstallationBlocked"] = "ACSSInstallationBlocked";
})(KnownSAPVirtualInstanceState || (exports.KnownSAPVirtualInstanceState = KnownSAPVirtualInstanceState = {}));
/** Defines the provisioning states. */
var KnownSapVirtualInstanceProvisioningState;
(function (KnownSapVirtualInstanceProvisioningState) {
    /** ACSS succeeded provisioning state. */
    KnownSapVirtualInstanceProvisioningState["Succeeded"] = "Succeeded";
    /** ACSS updating provisioning state. */
    KnownSapVirtualInstanceProvisioningState["Updating"] = "Updating";
    /** ACSS Creating provisioning state. */
    KnownSapVirtualInstanceProvisioningState["Creating"] = "Creating";
    /** ACSS Failed provisioning state. */
    KnownSapVirtualInstanceProvisioningState["Failed"] = "Failed";
    /** ACSS Deleting provisioning state. */
    KnownSapVirtualInstanceProvisioningState["Deleting"] = "Deleting";
    /** ACSS Canceled provisioning state. */
    KnownSapVirtualInstanceProvisioningState["Canceled"] = "Canceled";
})(KnownSapVirtualInstanceProvisioningState || (exports.KnownSapVirtualInstanceProvisioningState = KnownSapVirtualInstanceProvisioningState = {}));
function sapVirtualInstanceErrorDeserializer(item) {
    return {
        properties: !item["properties"]
            ? item["properties"]
            : errorDefinitionDeserializer(item["properties"]),
    };
}
function errorDefinitionDeserializer(item) {
    return {
        code: item["code"],
        message: item["message"],
        details: !item["details"] ? item["details"] : errorDefinitionArrayDeserializer(item["details"]),
    };
}
function errorDefinitionArrayDeserializer(result) {
    return result.map((item) => {
        return errorDefinitionDeserializer(item);
    });
}
function sapVirtualInstanceIdentitySerializer(item) {
    return {
        type: item["type"],
        userAssignedIdentities: item["userAssignedIdentities"],
    };
}
function sapVirtualInstanceIdentityDeserializer(item) {
    return {
        type: item["type"],
        userAssignedIdentities: item["userAssignedIdentities"],
    };
}
/** Type of managed service identity (where only None and UserAssigned types are allowed). */
var KnownSAPVirtualInstanceIdentityType;
(function (KnownSAPVirtualInstanceIdentityType) {
    /** No managed identity. */
    KnownSAPVirtualInstanceIdentityType["None"] = "None";
    /** User assigned managed identity. */
    KnownSAPVirtualInstanceIdentityType["UserAssigned"] = "UserAssigned";
})(KnownSAPVirtualInstanceIdentityType || (exports.KnownSAPVirtualInstanceIdentityType = KnownSAPVirtualInstanceIdentityType = {}));
function userAssignedIdentitySerializer(item) {
    return item;
}
function userAssignedIdentityDeserializer(item) {
    return {
        clientId: item["clientId"],
        principalId: item["principalId"],
    };
}
function trackedResourceSerializer(item) {
    return { tags: item["tags"], location: item["location"] };
}
function trackedResourceDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
        tags: item["tags"],
        location: item["location"],
    };
}
function resourceSerializer(item) {
    return item;
}
function resourceDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
    };
}
function systemDataDeserializer(item) {
    return {
        createdBy: item["createdBy"],
        createdByType: item["createdByType"],
        createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
        lastModifiedBy: item["lastModifiedBy"],
        lastModifiedByType: item["lastModifiedByType"],
        lastModifiedAt: !item["lastModifiedAt"]
            ? item["lastModifiedAt"]
            : new Date(item["lastModifiedAt"]),
    };
}
/** The kind of entity that created the resource. */
var KnownCreatedByType;
(function (KnownCreatedByType) {
    /** The entity was created by a user. */
    KnownCreatedByType["User"] = "User";
    /** The entity was created by an application. */
    KnownCreatedByType["Application"] = "Application";
    /** The entity was created by a managed identity. */
    KnownCreatedByType["ManagedIdentity"] = "ManagedIdentity";
    /** The entity was created by a key. */
    KnownCreatedByType["Key"] = "Key";
})(KnownCreatedByType || (exports.KnownCreatedByType = KnownCreatedByType = {}));
function updateSAPVirtualInstanceRequestSerializer(item) {
    return {
        tags: item["tags"],
        identity: !item["identity"]
            ? item["identity"]
            : sapVirtualInstanceIdentitySerializer(item["identity"]),
        properties: !item["properties"]
            ? item["properties"]
            : updateSAPVirtualInstancePropertiesSerializer(item["properties"]),
    };
}
function updateSAPVirtualInstancePropertiesSerializer(item) {
    return {
        managedResourcesNetworkAccessType: item["managedResourcesNetworkAccessType"],
    };
}
function _sapVirtualInstanceListResultDeserializer(item) {
    return {
        value: sapVirtualInstanceArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function sapVirtualInstanceArraySerializer(result) {
    return result.map((item) => {
        return sapVirtualInstanceSerializer(item);
    });
}
function sapVirtualInstanceArrayDeserializer(result) {
    return result.map((item) => {
        return sapVirtualInstanceDeserializer(item);
    });
}
function startRequestSerializer(item) {
    return { startVm: item["startVm"] };
}
function operationStatusResultDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        status: item["status"],
        percentComplete: item["percentComplete"],
        startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
        endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
        operations: !item["operations"]
            ? item["operations"]
            : operationStatusResultArrayDeserializer(item["operations"]),
        error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
        resourceId: item["resourceId"],
    };
}
function operationStatusResultArrayDeserializer(result) {
    return result.map((item) => {
        return operationStatusResultDeserializer(item);
    });
}
function stopRequestSerializer(item) {
    return {
        softStopTimeoutSeconds: item["softStopTimeoutSeconds"],
        deallocateVm: item["deallocateVm"],
    };
}
function sapSizingRecommendationRequestSerializer(item) {
    return {
        appLocation: item["appLocation"],
        environment: item["environment"],
        sapProduct: item["sapProduct"],
        deploymentType: item["deploymentType"],
        saps: item["saps"],
        dbMemory: item["dbMemory"],
        databaseType: item["databaseType"],
        dbScaleMethod: item["dbScaleMethod"],
        highAvailabilityType: item["highAvailabilityType"],
    };
}
/** The database scale method. */
var KnownSAPDatabaseScaleMethod;
(function (KnownSAPDatabaseScaleMethod) {
    /** ScaleUp Hana Database deployment type */
    KnownSAPDatabaseScaleMethod["ScaleUp"] = "ScaleUp";
})(KnownSAPDatabaseScaleMethod || (exports.KnownSAPDatabaseScaleMethod = KnownSAPDatabaseScaleMethod = {}));
function sapSizingRecommendationResultDeserializer(item) {
    return {
        deploymentType: item["deploymentType"],
    };
}
function sapSizingRecommendationResultUnionDeserializer(item) {
    switch (item.deploymentType) {
        case "SingleServer":
            return singleServerRecommendationResultDeserializer(item);
        case "ThreeTier":
            return threeTierRecommendationResultDeserializer(item);
        default:
            return sapSizingRecommendationResultDeserializer(item);
    }
}
function singleServerRecommendationResultDeserializer(item) {
    return {
        deploymentType: item["deploymentType"],
        vmSku: item["vmSku"],
    };
}
function threeTierRecommendationResultDeserializer(item) {
    return {
        deploymentType: item["deploymentType"],
        dbVmSku: item["dbVmSku"],
        databaseInstanceCount: item["databaseInstanceCount"],
        centralServerVmSku: item["centralServerVmSku"],
        centralServerInstanceCount: item["centralServerInstanceCount"],
        applicationServerVmSku: item["applicationServerVmSku"],
        applicationServerInstanceCount: item["applicationServerInstanceCount"],
    };
}
function sapSupportedSkusRequestSerializer(item) {
    return {
        appLocation: item["appLocation"],
        environment: item["environment"],
        sapProduct: item["sapProduct"],
        deploymentType: item["deploymentType"],
        databaseType: item["databaseType"],
        highAvailabilityType: item["highAvailabilityType"],
    };
}
function sapSupportedResourceSkusResultDeserializer(item) {
    return {
        supportedSkus: !item["supportedSkus"]
            ? item["supportedSkus"]
            : sapSupportedSkuArrayDeserializer(item["supportedSkus"]),
    };
}
function sapSupportedSkuArrayDeserializer(result) {
    return result.map((item) => {
        return sapSupportedSkuDeserializer(item);
    });
}
function sapSupportedSkuDeserializer(item) {
    return {
        vmSku: item["vmSku"],
        isAppServerCertified: item["isAppServerCertified"],
        isDatabaseCertified: item["isDatabaseCertified"],
    };
}
function sapDiskConfigurationsRequestSerializer(item) {
    return {
        appLocation: item["appLocation"],
        environment: item["environment"],
        sapProduct: item["sapProduct"],
        databaseType: item["databaseType"],
        deploymentType: item["deploymentType"],
        dbVmSku: item["dbVmSku"],
    };
}
function sapDiskConfigurationsResultDeserializer(item) {
    return {
        volumeConfigurations: !item["volumeConfigurations"]
            ? item["volumeConfigurations"]
            : sapDiskConfigurationRecordDeserializer(item["volumeConfigurations"]),
    };
}
function sapDiskConfigurationRecordDeserializer(item) {
    const result = {};
    Object.keys(item).map((key) => {
        result[key] = !item[key] ? item[key] : sapDiskConfigurationDeserializer(item[key]);
    });
    return result;
}
function sapDiskConfigurationDeserializer(item) {
    return {
        recommendedConfiguration: !item["recommendedConfiguration"]
            ? item["recommendedConfiguration"]
            : diskVolumeConfigurationDeserializer(item["recommendedConfiguration"]),
        supportedConfigurations: !item["supportedConfigurations"]
            ? item["supportedConfigurations"]
            : diskDetailsArrayDeserializer(item["supportedConfigurations"]),
    };
}
function diskDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return diskDetailsDeserializer(item);
    });
}
function diskDetailsDeserializer(item) {
    return {
        sku: !item["sku"] ? item["sku"] : diskSkuDeserializer(item["sku"]),
        sizeGB: item["sizeGB"],
        minimumSupportedDiskCount: item["minimumSupportedDiskCount"],
        maximumSupportedDiskCount: item["maximumSupportedDiskCount"],
        iopsReadWrite: item["iopsReadWrite"],
        mbpsReadWrite: item["mbpsReadWrite"],
        diskTier: item["diskTier"],
    };
}
function sapAvailabilityZoneDetailsRequestSerializer(item) {
    return {
        appLocation: item["appLocation"],
        sapProduct: item["sapProduct"],
        databaseType: item["databaseType"],
    };
}
function sapAvailabilityZoneDetailsResultDeserializer(item) {
    return {
        availabilityZonePairs: !item["availabilityZonePairs"]
            ? item["availabilityZonePairs"]
            : sapAvailabilityZonePairArrayDeserializer(item["availabilityZonePairs"]),
    };
}
function sapAvailabilityZonePairArrayDeserializer(result) {
    return result.map((item) => {
        return sapAvailabilityZonePairDeserializer(item);
    });
}
function sapAvailabilityZonePairDeserializer(item) {
    return {
        zoneA: item["zoneA"],
        zoneB: item["zoneB"],
    };
}
function sapCentralServerInstanceSerializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        properties: !item["properties"]
            ? item["properties"]
            : sapCentralServerPropertiesSerializer(item["properties"]),
    };
}
function sapCentralServerInstanceDeserializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
        properties: !item["properties"]
            ? item["properties"]
            : sapCentralServerPropertiesDeserializer(item["properties"]),
    };
}
function sapCentralServerPropertiesSerializer(item) {
    return {
        messageServerProperties: !item["messageServerProperties"]
            ? item["messageServerProperties"]
            : messageServerPropertiesSerializer(item["messageServerProperties"]),
        enqueueServerProperties: !item["enqueueServerProperties"]
            ? item["enqueueServerProperties"]
            : enqueueServerPropertiesSerializer(item["enqueueServerProperties"]),
        gatewayServerProperties: !item["gatewayServerProperties"]
            ? item["gatewayServerProperties"]
            : gatewayServerPropertiesSerializer(item["gatewayServerProperties"]),
        enqueueReplicationServerProperties: !item["enqueueReplicationServerProperties"]
            ? item["enqueueReplicationServerProperties"]
            : enqueueReplicationServerPropertiesSerializer(item["enqueueReplicationServerProperties"]),
    };
}
function sapCentralServerPropertiesDeserializer(item) {
    return {
        instanceNo: item["instanceNo"],
        subnet: item["subnet"],
        messageServerProperties: !item["messageServerProperties"]
            ? item["messageServerProperties"]
            : messageServerPropertiesDeserializer(item["messageServerProperties"]),
        enqueueServerProperties: !item["enqueueServerProperties"]
            ? item["enqueueServerProperties"]
            : enqueueServerPropertiesDeserializer(item["enqueueServerProperties"]),
        gatewayServerProperties: !item["gatewayServerProperties"]
            ? item["gatewayServerProperties"]
            : gatewayServerPropertiesDeserializer(item["gatewayServerProperties"]),
        enqueueReplicationServerProperties: !item["enqueueReplicationServerProperties"]
            ? item["enqueueReplicationServerProperties"]
            : enqueueReplicationServerPropertiesDeserializer(item["enqueueReplicationServerProperties"]),
        kernelVersion: item["kernelVersion"],
        kernelPatch: item["kernelPatch"],
        loadBalancerDetails: !item["loadBalancerDetails"]
            ? item["loadBalancerDetails"]
            : loadBalancerDetailsDeserializer(item["loadBalancerDetails"]),
        vmDetails: !item["vmDetails"]
            ? item["vmDetails"]
            : centralServerVmDetailsArrayDeserializer(item["vmDetails"]),
        status: item["status"],
        health: item["health"],
        provisioningState: item["provisioningState"],
        errors: !item["errors"] ? item["errors"] : sapVirtualInstanceErrorDeserializer(item["errors"]),
    };
}
function messageServerPropertiesSerializer(item) {
    return item;
}
function messageServerPropertiesDeserializer(item) {
    return {
        msPort: item["msPort"],
        internalMsPort: item["internalMsPort"],
        httpPort: item["httpPort"],
        httpsPort: item["httpsPort"],
        hostname: item["hostname"],
        ipAddress: item["ipAddress"],
        health: item["health"],
    };
}
function enqueueServerPropertiesSerializer(item) {
    return item;
}
function enqueueServerPropertiesDeserializer(item) {
    return {
        hostname: item["hostname"],
        ipAddress: item["ipAddress"],
        port: item["port"],
        health: item["health"],
    };
}
function gatewayServerPropertiesSerializer(item) {
    return item;
}
function gatewayServerPropertiesDeserializer(item) {
    return {
        port: item["port"],
        health: item["health"],
    };
}
function enqueueReplicationServerPropertiesSerializer(item) {
    return item;
}
function enqueueReplicationServerPropertiesDeserializer(item) {
    return {
        ersVersion: item["ersVersion"],
        instanceNo: item["instanceNo"],
        hostname: item["hostname"],
        kernelVersion: item["kernelVersion"],
        kernelPatch: item["kernelPatch"],
        ipAddress: item["ipAddress"],
        health: item["health"],
    };
}
/** Defines the type of Enqueue Replication Server. */
var KnownEnqueueReplicationServerType;
(function (KnownEnqueueReplicationServerType) {
    /** Enqueue Replication server type 1. */
    KnownEnqueueReplicationServerType["EnqueueReplicator1"] = "EnqueueReplicator1";
    /** Enqueue Replication server type 2. */
    KnownEnqueueReplicationServerType["EnqueueReplicator2"] = "EnqueueReplicator2";
})(KnownEnqueueReplicationServerType || (exports.KnownEnqueueReplicationServerType = KnownEnqueueReplicationServerType = {}));
function loadBalancerDetailsDeserializer(item) {
    return {
        id: item["id"],
    };
}
function centralServerVmDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return centralServerVmDetailsDeserializer(item);
    });
}
function centralServerVmDetailsDeserializer(item) {
    return {
        type: item["type"],
        virtualMachineId: item["virtualMachineId"],
        storageDetails: !item["storageDetails"]
            ? item["storageDetails"]
            : storageInformationArrayDeserializer(item["storageDetails"]),
    };
}
/** Defines the type of central server VM. */
var KnownCentralServerVirtualMachineType;
(function (KnownCentralServerVirtualMachineType) {
    /** Primary central server vm. */
    KnownCentralServerVirtualMachineType["Primary"] = "Primary";
    /** Secondary central server vm. */
    KnownCentralServerVirtualMachineType["Secondary"] = "Secondary";
    /** Central server vm type unknown. */
    KnownCentralServerVirtualMachineType["Unknown"] = "Unknown";
    /** ASCS Central server vm type. */
    KnownCentralServerVirtualMachineType["Ascs"] = "ASCS";
    /** ERSInactive Central server vm type. */
    KnownCentralServerVirtualMachineType["ERSInactive"] = "ERSInactive";
    /** ERS Central server vm type. */
    KnownCentralServerVirtualMachineType["ERS"] = "ERS";
    /** Standby Central server vm type. */
    KnownCentralServerVirtualMachineType["Standby"] = "Standby";
})(KnownCentralServerVirtualMachineType || (exports.KnownCentralServerVirtualMachineType = KnownCentralServerVirtualMachineType = {}));
function storageInformationArrayDeserializer(result) {
    return result.map((item) => {
        return storageInformationDeserializer(item);
    });
}
function storageInformationDeserializer(item) {
    return {
        id: item["id"],
    };
}
function updateSAPCentralInstanceRequestSerializer(item) {
    return { tags: item["tags"] };
}
function _sapCentralServerInstanceListResultDeserializer(item) {
    return {
        value: sapCentralServerInstanceArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function sapCentralServerInstanceArraySerializer(result) {
    return result.map((item) => {
        return sapCentralServerInstanceSerializer(item);
    });
}
function sapCentralServerInstanceArrayDeserializer(result) {
    return result.map((item) => {
        return sapCentralServerInstanceDeserializer(item);
    });
}
function sapDatabaseInstanceSerializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        properties: !item["properties"]
            ? item["properties"]
            : sapDatabasePropertiesSerializer(item["properties"]),
    };
}
function sapDatabaseInstanceDeserializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
        properties: !item["properties"]
            ? item["properties"]
            : sapDatabasePropertiesDeserializer(item["properties"]),
    };
}
function sapDatabasePropertiesSerializer(item) {
    return item;
}
function sapDatabasePropertiesDeserializer(item) {
    return {
        subnet: item["subnet"],
        databaseSid: item["databaseSid"],
        databaseType: item["databaseType"],
        ipAddress: item["ipAddress"],
        loadBalancerDetails: !item["loadBalancerDetails"]
            ? item["loadBalancerDetails"]
            : loadBalancerDetailsDeserializer(item["loadBalancerDetails"]),
        vmDetails: !item["vmDetails"]
            ? item["vmDetails"]
            : databaseVmDetailsArrayDeserializer(item["vmDetails"]),
        status: item["status"],
        provisioningState: item["provisioningState"],
        errors: !item["errors"] ? item["errors"] : sapVirtualInstanceErrorDeserializer(item["errors"]),
    };
}
function databaseVmDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return databaseVmDetailsDeserializer(item);
    });
}
function databaseVmDetailsDeserializer(item) {
    return {
        virtualMachineId: item["virtualMachineId"],
        status: item["status"],
        storageDetails: !item["storageDetails"]
            ? item["storageDetails"]
            : storageInformationArrayDeserializer(item["storageDetails"]),
    };
}
function updateSAPDatabaseInstanceRequestSerializer(item) {
    return { tags: item["tags"] };
}
function _sapDatabaseInstanceListResultDeserializer(item) {
    return {
        value: sapDatabaseInstanceArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function sapDatabaseInstanceArraySerializer(result) {
    return result.map((item) => {
        return sapDatabaseInstanceSerializer(item);
    });
}
function sapDatabaseInstanceArrayDeserializer(result) {
    return result.map((item) => {
        return sapDatabaseInstanceDeserializer(item);
    });
}
function sapApplicationServerInstanceSerializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        properties: !item["properties"]
            ? item["properties"]
            : sapApplicationServerPropertiesSerializer(item["properties"]),
    };
}
function sapApplicationServerInstanceDeserializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
        properties: !item["properties"]
            ? item["properties"]
            : sapApplicationServerPropertiesDeserializer(item["properties"]),
    };
}
function sapApplicationServerPropertiesSerializer(item) {
    return item;
}
function sapApplicationServerPropertiesDeserializer(item) {
    return {
        instanceNo: item["instanceNo"],
        subnet: item["subnet"],
        hostname: item["hostname"],
        kernelVersion: item["kernelVersion"],
        kernelPatch: item["kernelPatch"],
        ipAddress: item["ipAddress"],
        gatewayPort: item["gatewayPort"],
        icmHttpPort: item["icmHttpPort"],
        icmHttpsPort: item["icmHttpsPort"],
        dispatcherStatus: item["dispatcherStatus"],
        loadBalancerDetails: !item["loadBalancerDetails"]
            ? item["loadBalancerDetails"]
            : loadBalancerDetailsDeserializer(item["loadBalancerDetails"]),
        vmDetails: !item["vmDetails"]
            ? item["vmDetails"]
            : applicationServerVmDetailsArrayDeserializer(item["vmDetails"]),
        status: item["status"],
        health: item["health"],
        provisioningState: item["provisioningState"],
        errors: !item["errors"] ? item["errors"] : sapVirtualInstanceErrorDeserializer(item["errors"]),
    };
}
function applicationServerVmDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return applicationServerVmDetailsDeserializer(item);
    });
}
function applicationServerVmDetailsDeserializer(item) {
    return {
        type: item["type"],
        virtualMachineId: item["virtualMachineId"],
        storageDetails: !item["storageDetails"]
            ? item["storageDetails"]
            : storageInformationArrayDeserializer(item["storageDetails"]),
    };
}
/** Defines the type of application server VM. */
var KnownApplicationServerVirtualMachineType;
(function (KnownApplicationServerVirtualMachineType) {
    /** Active Application server vm type. */
    KnownApplicationServerVirtualMachineType["Active"] = "Active";
    /** Standby Application server vm type. */
    KnownApplicationServerVirtualMachineType["Standby"] = "Standby";
    /** Unknown Application server vm type. */
    KnownApplicationServerVirtualMachineType["Unknown"] = "Unknown";
})(KnownApplicationServerVirtualMachineType || (exports.KnownApplicationServerVirtualMachineType = KnownApplicationServerVirtualMachineType = {}));
function updateSAPApplicationInstanceRequestSerializer(item) {
    return { tags: item["tags"] };
}
function _sapApplicationServerInstanceListResultDeserializer(item) {
    return {
        value: sapApplicationServerInstanceArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function sapApplicationServerInstanceArraySerializer(result) {
    return result.map((item) => {
        return sapApplicationServerInstanceSerializer(item);
    });
}
function sapApplicationServerInstanceArrayDeserializer(result) {
    return result.map((item) => {
        return sapApplicationServerInstanceDeserializer(item);
    });
}
/** The available API versions. */
var KnownVersions;
(function (KnownVersions) {
    /** The 2024-09-01 API version. */
    KnownVersions["V20240901"] = "2024-09-01";
})(KnownVersions || (exports.KnownVersions = KnownVersions = {}));
//# sourceMappingURL=models.js.map