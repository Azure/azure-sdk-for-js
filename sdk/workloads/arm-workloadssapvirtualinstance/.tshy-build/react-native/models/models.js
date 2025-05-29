// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function _operationListResultDeserializer(item) {
    return {
        value: operationArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function operationArrayDeserializer(result) {
    return result.map((item) => {
        return operationDeserializer(item);
    });
}
export function operationDeserializer(item) {
    return {
        name: item["name"],
        isDataAction: item["isDataAction"],
        display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
        origin: item["origin"],
        actionType: item["actionType"],
    };
}
export function operationDisplayDeserializer(item) {
    return {
        provider: item["provider"],
        resource: item["resource"],
        operation: item["operation"],
        description: item["description"],
    };
}
/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export var KnownOrigin;
(function (KnownOrigin) {
    /** Indicates the operation is initiated by a user. */
    KnownOrigin["User"] = "user";
    /** Indicates the operation is initiated by a system. */
    KnownOrigin["System"] = "system";
    /** Indicates the operation is initiated by a user or system. */
    KnownOrigin["UserSystem"] = "user,system";
})(KnownOrigin || (KnownOrigin = {}));
/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export var KnownActionType;
(function (KnownActionType) {
    /** Actions are for internal-only APIs. */
    KnownActionType["Internal"] = "Internal";
})(KnownActionType || (KnownActionType = {}));
export function errorResponseDeserializer(item) {
    return {
        error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    };
}
export function errorDetailDeserializer(item) {
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
export function errorDetailArrayDeserializer(result) {
    return result.map((item) => {
        return errorDetailDeserializer(item);
    });
}
export function errorAdditionalInfoArrayDeserializer(result) {
    return result.map((item) => {
        return errorAdditionalInfoDeserializer(item);
    });
}
export function errorAdditionalInfoDeserializer(item) {
    return {
        type: item["type"],
        info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
    };
}
export function _errorAdditionalInfoInfoDeserializer(item) {
    return item;
}
export function sapVirtualInstanceSerializer(item) {
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
export function sapVirtualInstanceDeserializer(item) {
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
export function sapVirtualInstancePropertiesSerializer(item) {
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
export function sapVirtualInstancePropertiesDeserializer(item) {
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
export var KnownSAPEnvironmentType;
(function (KnownSAPEnvironmentType) {
    /** Non Production SAP system. */
    KnownSAPEnvironmentType["NonProd"] = "NonProd";
    /** Production SAP system. */
    KnownSAPEnvironmentType["Prod"] = "Prod";
})(KnownSAPEnvironmentType || (KnownSAPEnvironmentType = {}));
/** Defines the SAP Product type. */
export var KnownSAPProductType;
(function (KnownSAPProductType) {
    /** SAP Product ECC. */
    KnownSAPProductType["ECC"] = "ECC";
    /** SAP Product S4HANA. */
    KnownSAPProductType["S4Hana"] = "S4HANA";
    /** SAP Products other than the ones listed. */
    KnownSAPProductType["Other"] = "Other";
})(KnownSAPProductType || (KnownSAPProductType = {}));
/** Defines the network access type for managed resources. */
export var KnownManagedResourcesNetworkAccessType;
(function (KnownManagedResourcesNetworkAccessType) {
    /** Managed resources will be deployed with public network access enabled. */
    KnownManagedResourcesNetworkAccessType["Public"] = "Public";
    /** Managed resources will be deployed with public network access disabled. */
    KnownManagedResourcesNetworkAccessType["Private"] = "Private";
})(KnownManagedResourcesNetworkAccessType || (KnownManagedResourcesNetworkAccessType = {}));
export function sapConfigurationSerializer(item) {
    return { configurationType: item["configurationType"] };
}
export function sapConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
    };
}
export function sapConfigurationUnionSerializer(item) {
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
export function sapConfigurationUnionDeserializer(item) {
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
export var KnownSAPConfigurationType;
(function (KnownSAPConfigurationType) {
    /** SAP system will be deployed by service. No OS configurations will be done. */
    KnownSAPConfigurationType["Deployment"] = "Deployment";
    /** Existing SAP system will be registered. */
    KnownSAPConfigurationType["Discovery"] = "Discovery";
    /** SAP system will be deployed by service. OS configurations will be done. */
    KnownSAPConfigurationType["DeploymentWithOSConfig"] = "DeploymentWithOSConfig";
})(KnownSAPConfigurationType || (KnownSAPConfigurationType = {}));
export function discoveryConfigurationSerializer(item) {
    return {
        configurationType: item["configurationType"],
        centralServerVmId: item["centralServerVmId"],
        managedRgStorageAccountName: item["managedRgStorageAccountName"],
    };
}
export function discoveryConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
        centralServerVmId: item["centralServerVmId"],
        managedRgStorageAccountName: item["managedRgStorageAccountName"],
        appLocation: item["appLocation"],
    };
}
export function deploymentConfigurationSerializer(item) {
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
export function deploymentConfigurationDeserializer(item) {
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
export function infrastructureConfigurationSerializer(item) {
    return {
        appResourceGroup: item["appResourceGroup"],
        deploymentType: item["deploymentType"],
    };
}
export function infrastructureConfigurationDeserializer(item) {
    return {
        appResourceGroup: item["appResourceGroup"],
        deploymentType: item["deploymentType"],
    };
}
export function infrastructureConfigurationUnionSerializer(item) {
    switch (item.deploymentType) {
        case "SingleServer":
            return singleServerConfigurationSerializer(item);
        case "ThreeTier":
            return threeTierConfigurationSerializer(item);
        default:
            return infrastructureConfigurationSerializer(item);
    }
}
export function infrastructureConfigurationUnionDeserializer(item) {
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
export var KnownSAPDeploymentType;
(function (KnownSAPDeploymentType) {
    /** SAP Single server deployment type. */
    KnownSAPDeploymentType["SingleServer"] = "SingleServer";
    /** SAP Distributed deployment type. */
    KnownSAPDeploymentType["ThreeTier"] = "ThreeTier";
})(KnownSAPDeploymentType || (KnownSAPDeploymentType = {}));
export function singleServerConfigurationSerializer(item) {
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
export function singleServerConfigurationDeserializer(item) {
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
export function networkConfigurationSerializer(item) {
    return { isSecondaryIpEnabled: item["isSecondaryIpEnabled"] };
}
export function networkConfigurationDeserializer(item) {
    return {
        isSecondaryIpEnabled: item["isSecondaryIpEnabled"],
    };
}
/** Defines the supported SAP Database types. */
export var KnownSAPDatabaseType;
(function (KnownSAPDatabaseType) {
    /** HANA Database type of SAP system. */
    KnownSAPDatabaseType["Hana"] = "HANA";
    /** DB2 database type of the SAP system. */
    KnownSAPDatabaseType["DB2"] = "DB2";
})(KnownSAPDatabaseType || (KnownSAPDatabaseType = {}));
export function virtualMachineConfigurationSerializer(item) {
    return {
        vmSize: item["vmSize"],
        imageReference: imageReferenceSerializer(item["imageReference"]),
        osProfile: osProfileSerializer(item["osProfile"]),
    };
}
export function virtualMachineConfigurationDeserializer(item) {
    return {
        vmSize: item["vmSize"],
        imageReference: imageReferenceDeserializer(item["imageReference"]),
        osProfile: osProfileDeserializer(item["osProfile"]),
    };
}
export function imageReferenceSerializer(item) {
    return {
        publisher: item["publisher"],
        offer: item["offer"],
        sku: item["sku"],
        version: item["version"],
        id: item["id"],
    };
}
export function imageReferenceDeserializer(item) {
    return {
        publisher: item["publisher"],
        offer: item["offer"],
        sku: item["sku"],
        version: item["version"],
        id: item["id"],
    };
}
export function osProfileSerializer(item) {
    return {
        adminUsername: item["adminUsername"],
        adminPassword: item["adminPassword"],
        osConfiguration: !item["osConfiguration"]
            ? item["osConfiguration"]
            : osConfigurationUnionSerializer(item["osConfiguration"]),
    };
}
export function osProfileDeserializer(item) {
    return {
        adminUsername: item["adminUsername"],
        adminPassword: item["adminPassword"],
        osConfiguration: !item["osConfiguration"]
            ? item["osConfiguration"]
            : osConfigurationUnionDeserializer(item["osConfiguration"]),
    };
}
export function osConfigurationSerializer(item) {
    return { osType: item["osType"] };
}
export function osConfigurationDeserializer(item) {
    return {
        osType: item["osType"],
    };
}
export function osConfigurationUnionSerializer(item) {
    switch (item.osType) {
        case "Windows":
            return windowsConfigurationSerializer(item);
        case "Linux":
            return linuxConfigurationSerializer(item);
        default:
            return osConfigurationSerializer(item);
    }
}
export function osConfigurationUnionDeserializer(item) {
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
export var KnownOSType;
(function (KnownOSType) {
    /** Linux OS Type. */
    KnownOSType["Linux"] = "Linux";
    /** Windows OS Type. */
    KnownOSType["Windows"] = "Windows";
})(KnownOSType || (KnownOSType = {}));
export function windowsConfigurationSerializer(item) {
    return { osType: item["osType"] };
}
export function windowsConfigurationDeserializer(item) {
    return {
        osType: item["osType"],
    };
}
export function linuxConfigurationSerializer(item) {
    return {
        osType: item["osType"],
        disablePasswordAuthentication: item["disablePasswordAuthentication"],
        ssh: !item["ssh"] ? item["ssh"] : sshConfigurationSerializer(item["ssh"]),
        sshKeyPair: !item["sshKeyPair"] ? item["sshKeyPair"] : sshKeyPairSerializer(item["sshKeyPair"]),
    };
}
export function linuxConfigurationDeserializer(item) {
    return {
        osType: item["osType"],
        disablePasswordAuthentication: item["disablePasswordAuthentication"],
        ssh: !item["ssh"] ? item["ssh"] : sshConfigurationDeserializer(item["ssh"]),
        sshKeyPair: !item["sshKeyPair"]
            ? item["sshKeyPair"]
            : sshKeyPairDeserializer(item["sshKeyPair"]),
    };
}
export function sshConfigurationSerializer(item) {
    return {
        publicKeys: !item["publicKeys"]
            ? item["publicKeys"]
            : sshPublicKeyArraySerializer(item["publicKeys"]),
    };
}
export function sshConfigurationDeserializer(item) {
    return {
        publicKeys: !item["publicKeys"]
            ? item["publicKeys"]
            : sshPublicKeyArrayDeserializer(item["publicKeys"]),
    };
}
export function sshPublicKeyArraySerializer(result) {
    return result.map((item) => {
        return sshPublicKeySerializer(item);
    });
}
export function sshPublicKeyArrayDeserializer(result) {
    return result.map((item) => {
        return sshPublicKeyDeserializer(item);
    });
}
export function sshPublicKeySerializer(item) {
    return { keyData: item["keyData"] };
}
export function sshPublicKeyDeserializer(item) {
    return {
        keyData: item["keyData"],
    };
}
export function sshKeyPairSerializer(item) {
    return { publicKey: item["publicKey"], privateKey: item["privateKey"] };
}
export function sshKeyPairDeserializer(item) {
    return {
        publicKey: item["publicKey"],
        privateKey: item["privateKey"],
    };
}
export function diskConfigurationSerializer(item) {
    return {
        diskVolumeConfigurations: !item["diskVolumeConfigurations"]
            ? item["diskVolumeConfigurations"]
            : diskVolumeConfigurationRecordSerializer(item["diskVolumeConfigurations"]),
    };
}
export function diskConfigurationDeserializer(item) {
    return {
        diskVolumeConfigurations: !item["diskVolumeConfigurations"]
            ? item["diskVolumeConfigurations"]
            : diskVolumeConfigurationRecordDeserializer(item["diskVolumeConfigurations"]),
    };
}
export function diskVolumeConfigurationRecordSerializer(item) {
    const result = {};
    Object.keys(item).map((key) => {
        result[key] = !item[key] ? item[key] : diskVolumeConfigurationSerializer(item[key]);
    });
    return result;
}
export function diskVolumeConfigurationRecordDeserializer(item) {
    const result = {};
    Object.keys(item).map((key) => {
        result[key] = !item[key] ? item[key] : diskVolumeConfigurationDeserializer(item[key]);
    });
    return result;
}
export function diskVolumeConfigurationSerializer(item) {
    return {
        count: item["count"],
        sizeGB: item["sizeGB"],
        sku: !item["sku"] ? item["sku"] : diskSkuSerializer(item["sku"]),
    };
}
export function diskVolumeConfigurationDeserializer(item) {
    return {
        count: item["count"],
        sizeGB: item["sizeGB"],
        sku: !item["sku"] ? item["sku"] : diskSkuDeserializer(item["sku"]),
    };
}
export function diskSkuSerializer(item) {
    return { name: item["name"] };
}
export function diskSkuDeserializer(item) {
    return {
        name: item["name"],
    };
}
/** Defines the disk sku name. */
export var KnownDiskSkuName;
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
})(KnownDiskSkuName || (KnownDiskSkuName = {}));
export function singleServerCustomResourceNamesSerializer(item) {
    return { namingPatternType: item["namingPatternType"] };
}
export function singleServerCustomResourceNamesDeserializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
    };
}
export function singleServerCustomResourceNamesUnionSerializer(item) {
    switch (item.namingPatternType) {
        case "FullResourceName":
            return singleServerFullResourceNamesSerializer(item);
        default:
            return singleServerCustomResourceNamesSerializer(item);
    }
}
export function singleServerCustomResourceNamesUnionDeserializer(item) {
    switch (item.namingPatternType) {
        case "FullResourceName":
            return singleServerFullResourceNamesDeserializer(item);
        default:
            return singleServerCustomResourceNamesDeserializer(item);
    }
}
/** The pattern type to be used for resource naming. */
export var KnownNamingPatternType;
(function (KnownNamingPatternType) {
    /** Full resource names that will be created by service. */
    KnownNamingPatternType["FullResourceName"] = "FullResourceName";
})(KnownNamingPatternType || (KnownNamingPatternType = {}));
export function singleServerFullResourceNamesSerializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
        virtualMachine: !item["virtualMachine"]
            ? item["virtualMachine"]
            : virtualMachineResourceNamesSerializer(item["virtualMachine"]),
    };
}
export function singleServerFullResourceNamesDeserializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
        virtualMachine: !item["virtualMachine"]
            ? item["virtualMachine"]
            : virtualMachineResourceNamesDeserializer(item["virtualMachine"]),
    };
}
export function virtualMachineResourceNamesSerializer(item) {
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
export function virtualMachineResourceNamesDeserializer(item) {
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
export function networkInterfaceResourceNamesArraySerializer(result) {
    return result.map((item) => {
        return networkInterfaceResourceNamesSerializer(item);
    });
}
export function networkInterfaceResourceNamesArrayDeserializer(result) {
    return result.map((item) => {
        return networkInterfaceResourceNamesDeserializer(item);
    });
}
export function networkInterfaceResourceNamesSerializer(item) {
    return { networkInterfaceName: item["networkInterfaceName"] };
}
export function networkInterfaceResourceNamesDeserializer(item) {
    return {
        networkInterfaceName: item["networkInterfaceName"],
    };
}
export function threeTierConfigurationSerializer(item) {
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
export function threeTierConfigurationDeserializer(item) {
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
export function centralServerConfigurationSerializer(item) {
    return {
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationSerializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
    };
}
export function centralServerConfigurationDeserializer(item) {
    return {
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationDeserializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
    };
}
export function applicationServerConfigurationSerializer(item) {
    return {
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationSerializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
    };
}
export function applicationServerConfigurationDeserializer(item) {
    return {
        subnetId: item["subnetId"],
        virtualMachineConfiguration: virtualMachineConfigurationDeserializer(item["virtualMachineConfiguration"]),
        instanceCount: item["instanceCount"],
    };
}
export function databaseConfigurationSerializer(item) {
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
export function databaseConfigurationDeserializer(item) {
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
export function highAvailabilityConfigurationSerializer(item) {
    return { highAvailabilityType: item["highAvailabilityType"] };
}
export function highAvailabilityConfigurationDeserializer(item) {
    return {
        highAvailabilityType: item["highAvailabilityType"],
    };
}
/** The high availability type (AvailabilitySet or AvailabilityZone). */
export var KnownSAPHighAvailabilityType;
(function (KnownSAPHighAvailabilityType) {
    /** HA deployment with availability sets. */
    KnownSAPHighAvailabilityType["AvailabilitySet"] = "AvailabilitySet";
    /** HA deployment with availability zones. */
    KnownSAPHighAvailabilityType["AvailabilityZone"] = "AvailabilityZone";
})(KnownSAPHighAvailabilityType || (KnownSAPHighAvailabilityType = {}));
export function storageConfigurationSerializer(item) {
    return {
        transportFileShareConfiguration: !item["transportFileShareConfiguration"]
            ? item["transportFileShareConfiguration"]
            : fileShareConfigurationUnionSerializer(item["transportFileShareConfiguration"]),
    };
}
export function storageConfigurationDeserializer(item) {
    return {
        transportFileShareConfiguration: !item["transportFileShareConfiguration"]
            ? item["transportFileShareConfiguration"]
            : fileShareConfigurationUnionDeserializer(item["transportFileShareConfiguration"]),
    };
}
export function fileShareConfigurationSerializer(item) {
    return { configurationType: item["configurationType"] };
}
export function fileShareConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
    };
}
export function fileShareConfigurationUnionSerializer(item) {
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
export function fileShareConfigurationUnionDeserializer(item) {
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
export var KnownFileShareConfigurationType;
(function (KnownFileShareConfigurationType) {
    /** Skip creating the file share. */
    KnownFileShareConfigurationType["Skip"] = "Skip";
    /** Fileshare will be created and mounted by service. */
    KnownFileShareConfigurationType["CreateAndMount"] = "CreateAndMount";
    /** Existing fileshare provided will be mounted by service. */
    KnownFileShareConfigurationType["Mount"] = "Mount";
})(KnownFileShareConfigurationType || (KnownFileShareConfigurationType = {}));
export function skipFileShareConfigurationSerializer(item) {
    return { configurationType: item["configurationType"] };
}
export function skipFileShareConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
    };
}
export function createAndMountFileShareConfigurationSerializer(item) {
    return {
        configurationType: item["configurationType"],
        resourceGroup: item["resourceGroup"],
        storageAccountName: item["storageAccountName"],
    };
}
export function createAndMountFileShareConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
        resourceGroup: item["resourceGroup"],
        storageAccountName: item["storageAccountName"],
    };
}
export function mountFileShareConfigurationSerializer(item) {
    return {
        configurationType: item["configurationType"],
        id: item["id"],
        privateEndpointId: item["privateEndpointId"],
    };
}
export function mountFileShareConfigurationDeserializer(item) {
    return {
        configurationType: item["configurationType"],
        id: item["id"],
        privateEndpointId: item["privateEndpointId"],
    };
}
export function threeTierCustomResourceNamesSerializer(item) {
    return { namingPatternType: item["namingPatternType"] };
}
export function threeTierCustomResourceNamesDeserializer(item) {
    return {
        namingPatternType: item["namingPatternType"],
    };
}
export function threeTierCustomResourceNamesUnionSerializer(item) {
    switch (item.namingPatternType) {
        case "FullResourceName":
            return threeTierFullResourceNamesSerializer(item);
        default:
            return threeTierCustomResourceNamesSerializer(item);
    }
}
export function threeTierCustomResourceNamesUnionDeserializer(item) {
    switch (item.namingPatternType) {
        case "FullResourceName":
            return threeTierFullResourceNamesDeserializer(item);
        default:
            return threeTierCustomResourceNamesDeserializer(item);
    }
}
export function threeTierFullResourceNamesSerializer(item) {
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
export function threeTierFullResourceNamesDeserializer(item) {
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
export function centralServerFullResourceNamesSerializer(item) {
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
export function centralServerFullResourceNamesDeserializer(item) {
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
export function virtualMachineResourceNamesArraySerializer(result) {
    return result.map((item) => {
        return virtualMachineResourceNamesSerializer(item);
    });
}
export function virtualMachineResourceNamesArrayDeserializer(result) {
    return result.map((item) => {
        return virtualMachineResourceNamesDeserializer(item);
    });
}
export function loadBalancerResourceNamesSerializer(item) {
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
export function loadBalancerResourceNamesDeserializer(item) {
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
export function applicationServerFullResourceNamesSerializer(item) {
    return {
        virtualMachines: !item["virtualMachines"]
            ? item["virtualMachines"]
            : virtualMachineResourceNamesArraySerializer(item["virtualMachines"]),
        availabilitySetName: item["availabilitySetName"],
    };
}
export function applicationServerFullResourceNamesDeserializer(item) {
    return {
        virtualMachines: !item["virtualMachines"]
            ? item["virtualMachines"]
            : virtualMachineResourceNamesArrayDeserializer(item["virtualMachines"]),
        availabilitySetName: item["availabilitySetName"],
    };
}
export function databaseServerFullResourceNamesSerializer(item) {
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
export function databaseServerFullResourceNamesDeserializer(item) {
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
export function sharedStorageResourceNamesSerializer(item) {
    return {
        sharedStorageAccountName: item["sharedStorageAccountName"],
        sharedStorageAccountPrivateEndPointName: item["sharedStorageAccountPrivateEndPointName"],
    };
}
export function sharedStorageResourceNamesDeserializer(item) {
    return {
        sharedStorageAccountName: item["sharedStorageAccountName"],
        sharedStorageAccountPrivateEndPointName: item["sharedStorageAccountPrivateEndPointName"],
    };
}
export function softwareConfigurationSerializer(item) {
    return { softwareInstallationType: item["softwareInstallationType"] };
}
export function softwareConfigurationDeserializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
    };
}
export function softwareConfigurationUnionSerializer(item) {
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
export function softwareConfigurationUnionDeserializer(item) {
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
export var KnownSAPSoftwareInstallationType;
(function (KnownSAPSoftwareInstallationType) {
    /** SAP Install managed by service. */
    KnownSAPSoftwareInstallationType["ServiceInitiated"] = "ServiceInitiated";
    /** SAP Install without OS Config. */
    KnownSAPSoftwareInstallationType["SAPInstallWithoutOSConfig"] = "SAPInstallWithoutOSConfig";
    /** External software installation type. */
    KnownSAPSoftwareInstallationType["External"] = "External";
})(KnownSAPSoftwareInstallationType || (KnownSAPSoftwareInstallationType = {}));
export function serviceInitiatedSoftwareConfigurationSerializer(item) {
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
export function serviceInitiatedSoftwareConfigurationDeserializer(item) {
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
export function highAvailabilitySoftwareConfigurationSerializer(item) {
    return {
        fencingClientId: item["fencingClientId"],
        fencingClientPassword: item["fencingClientPassword"],
    };
}
export function highAvailabilitySoftwareConfigurationDeserializer(item) {
    return {
        fencingClientId: item["fencingClientId"],
        fencingClientPassword: item["fencingClientPassword"],
    };
}
export function sapInstallWithoutOSConfigSoftwareConfigurationSerializer(item) {
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
export function sapInstallWithoutOSConfigSoftwareConfigurationDeserializer(item) {
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
export function externalInstallationSoftwareConfigurationSerializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
        centralServerVmId: item["centralServerVmId"],
    };
}
export function externalInstallationSoftwareConfigurationDeserializer(item) {
    return {
        softwareInstallationType: item["softwareInstallationType"],
        centralServerVmId: item["centralServerVmId"],
    };
}
export function deploymentWithOSConfigurationSerializer(item) {
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
export function deploymentWithOSConfigurationDeserializer(item) {
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
export function osSapConfigurationSerializer(item) {
    return {
        deployerVmPackages: !item["deployerVmPackages"]
            ? item["deployerVmPackages"]
            : deployerVmPackagesSerializer(item["deployerVmPackages"]),
        sapFqdn: item["sapFqdn"],
    };
}
export function osSapConfigurationDeserializer(item) {
    return {
        deployerVmPackages: !item["deployerVmPackages"]
            ? item["deployerVmPackages"]
            : deployerVmPackagesDeserializer(item["deployerVmPackages"]),
        sapFqdn: item["sapFqdn"],
    };
}
export function deployerVmPackagesSerializer(item) {
    return { url: item["url"], storageAccountId: item["storageAccountId"] };
}
export function deployerVmPackagesDeserializer(item) {
    return {
        url: item["url"],
        storageAccountId: item["storageAccountId"],
    };
}
export function managedRGConfigurationSerializer(item) {
    return { name: item["name"] };
}
export function managedRGConfigurationDeserializer(item) {
    return {
        name: item["name"],
    };
}
/** Defines the SAP Instance status. */
export var KnownSAPVirtualInstanceStatus;
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
})(KnownSAPVirtualInstanceStatus || (KnownSAPVirtualInstanceStatus = {}));
/** Defines the health of SAP Instances. */
export var KnownSAPHealthState;
(function (KnownSAPHealthState) {
    /** SAP System health is unknown. */
    KnownSAPHealthState["Unknown"] = "Unknown";
    /** SAP System health is healthy. */
    KnownSAPHealthState["Healthy"] = "Healthy";
    /** SAP System is unhealthy. */
    KnownSAPHealthState["Unhealthy"] = "Unhealthy";
    /** SAP System health is degraded. */
    KnownSAPHealthState["Degraded"] = "Degraded";
})(KnownSAPHealthState || (KnownSAPHealthState = {}));
/** Defines the Virtual Instance for SAP state. */
export var KnownSAPVirtualInstanceState;
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
})(KnownSAPVirtualInstanceState || (KnownSAPVirtualInstanceState = {}));
/** Defines the provisioning states. */
export var KnownSapVirtualInstanceProvisioningState;
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
})(KnownSapVirtualInstanceProvisioningState || (KnownSapVirtualInstanceProvisioningState = {}));
export function sapVirtualInstanceErrorDeserializer(item) {
    return {
        properties: !item["properties"]
            ? item["properties"]
            : errorDefinitionDeserializer(item["properties"]),
    };
}
export function errorDefinitionDeserializer(item) {
    return {
        code: item["code"],
        message: item["message"],
        details: !item["details"] ? item["details"] : errorDefinitionArrayDeserializer(item["details"]),
    };
}
export function errorDefinitionArrayDeserializer(result) {
    return result.map((item) => {
        return errorDefinitionDeserializer(item);
    });
}
export function sapVirtualInstanceIdentitySerializer(item) {
    return {
        type: item["type"],
        userAssignedIdentities: item["userAssignedIdentities"],
    };
}
export function sapVirtualInstanceIdentityDeserializer(item) {
    return {
        type: item["type"],
        userAssignedIdentities: item["userAssignedIdentities"],
    };
}
/** Type of managed service identity (where only None and UserAssigned types are allowed). */
export var KnownSAPVirtualInstanceIdentityType;
(function (KnownSAPVirtualInstanceIdentityType) {
    /** No managed identity. */
    KnownSAPVirtualInstanceIdentityType["None"] = "None";
    /** User assigned managed identity. */
    KnownSAPVirtualInstanceIdentityType["UserAssigned"] = "UserAssigned";
})(KnownSAPVirtualInstanceIdentityType || (KnownSAPVirtualInstanceIdentityType = {}));
export function userAssignedIdentitySerializer(item) {
    return item;
}
export function userAssignedIdentityDeserializer(item) {
    return {
        clientId: item["clientId"],
        principalId: item["principalId"],
    };
}
export function trackedResourceSerializer(item) {
    return { tags: item["tags"], location: item["location"] };
}
export function trackedResourceDeserializer(item) {
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
export function resourceSerializer(item) {
    return item;
}
export function resourceDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
    };
}
export function systemDataDeserializer(item) {
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
export var KnownCreatedByType;
(function (KnownCreatedByType) {
    /** The entity was created by a user. */
    KnownCreatedByType["User"] = "User";
    /** The entity was created by an application. */
    KnownCreatedByType["Application"] = "Application";
    /** The entity was created by a managed identity. */
    KnownCreatedByType["ManagedIdentity"] = "ManagedIdentity";
    /** The entity was created by a key. */
    KnownCreatedByType["Key"] = "Key";
})(KnownCreatedByType || (KnownCreatedByType = {}));
export function updateSAPVirtualInstanceRequestSerializer(item) {
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
export function updateSAPVirtualInstancePropertiesSerializer(item) {
    return {
        managedResourcesNetworkAccessType: item["managedResourcesNetworkAccessType"],
    };
}
export function _sapVirtualInstanceListResultDeserializer(item) {
    return {
        value: sapVirtualInstanceArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function sapVirtualInstanceArraySerializer(result) {
    return result.map((item) => {
        return sapVirtualInstanceSerializer(item);
    });
}
export function sapVirtualInstanceArrayDeserializer(result) {
    return result.map((item) => {
        return sapVirtualInstanceDeserializer(item);
    });
}
export function startRequestSerializer(item) {
    return { startVm: item["startVm"] };
}
export function operationStatusResultDeserializer(item) {
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
export function operationStatusResultArrayDeserializer(result) {
    return result.map((item) => {
        return operationStatusResultDeserializer(item);
    });
}
export function stopRequestSerializer(item) {
    return {
        softStopTimeoutSeconds: item["softStopTimeoutSeconds"],
        deallocateVm: item["deallocateVm"],
    };
}
export function sapSizingRecommendationRequestSerializer(item) {
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
export var KnownSAPDatabaseScaleMethod;
(function (KnownSAPDatabaseScaleMethod) {
    /** ScaleUp Hana Database deployment type */
    KnownSAPDatabaseScaleMethod["ScaleUp"] = "ScaleUp";
})(KnownSAPDatabaseScaleMethod || (KnownSAPDatabaseScaleMethod = {}));
export function sapSizingRecommendationResultDeserializer(item) {
    return {
        deploymentType: item["deploymentType"],
    };
}
export function sapSizingRecommendationResultUnionDeserializer(item) {
    switch (item.deploymentType) {
        case "SingleServer":
            return singleServerRecommendationResultDeserializer(item);
        case "ThreeTier":
            return threeTierRecommendationResultDeserializer(item);
        default:
            return sapSizingRecommendationResultDeserializer(item);
    }
}
export function singleServerRecommendationResultDeserializer(item) {
    return {
        deploymentType: item["deploymentType"],
        vmSku: item["vmSku"],
    };
}
export function threeTierRecommendationResultDeserializer(item) {
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
export function sapSupportedSkusRequestSerializer(item) {
    return {
        appLocation: item["appLocation"],
        environment: item["environment"],
        sapProduct: item["sapProduct"],
        deploymentType: item["deploymentType"],
        databaseType: item["databaseType"],
        highAvailabilityType: item["highAvailabilityType"],
    };
}
export function sapSupportedResourceSkusResultDeserializer(item) {
    return {
        supportedSkus: !item["supportedSkus"]
            ? item["supportedSkus"]
            : sapSupportedSkuArrayDeserializer(item["supportedSkus"]),
    };
}
export function sapSupportedSkuArrayDeserializer(result) {
    return result.map((item) => {
        return sapSupportedSkuDeserializer(item);
    });
}
export function sapSupportedSkuDeserializer(item) {
    return {
        vmSku: item["vmSku"],
        isAppServerCertified: item["isAppServerCertified"],
        isDatabaseCertified: item["isDatabaseCertified"],
    };
}
export function sapDiskConfigurationsRequestSerializer(item) {
    return {
        appLocation: item["appLocation"],
        environment: item["environment"],
        sapProduct: item["sapProduct"],
        databaseType: item["databaseType"],
        deploymentType: item["deploymentType"],
        dbVmSku: item["dbVmSku"],
    };
}
export function sapDiskConfigurationsResultDeserializer(item) {
    return {
        volumeConfigurations: !item["volumeConfigurations"]
            ? item["volumeConfigurations"]
            : sapDiskConfigurationRecordDeserializer(item["volumeConfigurations"]),
    };
}
export function sapDiskConfigurationRecordDeserializer(item) {
    const result = {};
    Object.keys(item).map((key) => {
        result[key] = !item[key] ? item[key] : sapDiskConfigurationDeserializer(item[key]);
    });
    return result;
}
export function sapDiskConfigurationDeserializer(item) {
    return {
        recommendedConfiguration: !item["recommendedConfiguration"]
            ? item["recommendedConfiguration"]
            : diskVolumeConfigurationDeserializer(item["recommendedConfiguration"]),
        supportedConfigurations: !item["supportedConfigurations"]
            ? item["supportedConfigurations"]
            : diskDetailsArrayDeserializer(item["supportedConfigurations"]),
    };
}
export function diskDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return diskDetailsDeserializer(item);
    });
}
export function diskDetailsDeserializer(item) {
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
export function sapAvailabilityZoneDetailsRequestSerializer(item) {
    return {
        appLocation: item["appLocation"],
        sapProduct: item["sapProduct"],
        databaseType: item["databaseType"],
    };
}
export function sapAvailabilityZoneDetailsResultDeserializer(item) {
    return {
        availabilityZonePairs: !item["availabilityZonePairs"]
            ? item["availabilityZonePairs"]
            : sapAvailabilityZonePairArrayDeserializer(item["availabilityZonePairs"]),
    };
}
export function sapAvailabilityZonePairArrayDeserializer(result) {
    return result.map((item) => {
        return sapAvailabilityZonePairDeserializer(item);
    });
}
export function sapAvailabilityZonePairDeserializer(item) {
    return {
        zoneA: item["zoneA"],
        zoneB: item["zoneB"],
    };
}
export function sapCentralServerInstanceSerializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        properties: !item["properties"]
            ? item["properties"]
            : sapCentralServerPropertiesSerializer(item["properties"]),
    };
}
export function sapCentralServerInstanceDeserializer(item) {
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
export function sapCentralServerPropertiesSerializer(item) {
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
export function sapCentralServerPropertiesDeserializer(item) {
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
export function messageServerPropertiesSerializer(item) {
    return item;
}
export function messageServerPropertiesDeserializer(item) {
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
export function enqueueServerPropertiesSerializer(item) {
    return item;
}
export function enqueueServerPropertiesDeserializer(item) {
    return {
        hostname: item["hostname"],
        ipAddress: item["ipAddress"],
        port: item["port"],
        health: item["health"],
    };
}
export function gatewayServerPropertiesSerializer(item) {
    return item;
}
export function gatewayServerPropertiesDeserializer(item) {
    return {
        port: item["port"],
        health: item["health"],
    };
}
export function enqueueReplicationServerPropertiesSerializer(item) {
    return item;
}
export function enqueueReplicationServerPropertiesDeserializer(item) {
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
export var KnownEnqueueReplicationServerType;
(function (KnownEnqueueReplicationServerType) {
    /** Enqueue Replication server type 1. */
    KnownEnqueueReplicationServerType["EnqueueReplicator1"] = "EnqueueReplicator1";
    /** Enqueue Replication server type 2. */
    KnownEnqueueReplicationServerType["EnqueueReplicator2"] = "EnqueueReplicator2";
})(KnownEnqueueReplicationServerType || (KnownEnqueueReplicationServerType = {}));
export function loadBalancerDetailsDeserializer(item) {
    return {
        id: item["id"],
    };
}
export function centralServerVmDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return centralServerVmDetailsDeserializer(item);
    });
}
export function centralServerVmDetailsDeserializer(item) {
    return {
        type: item["type"],
        virtualMachineId: item["virtualMachineId"],
        storageDetails: !item["storageDetails"]
            ? item["storageDetails"]
            : storageInformationArrayDeserializer(item["storageDetails"]),
    };
}
/** Defines the type of central server VM. */
export var KnownCentralServerVirtualMachineType;
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
})(KnownCentralServerVirtualMachineType || (KnownCentralServerVirtualMachineType = {}));
export function storageInformationArrayDeserializer(result) {
    return result.map((item) => {
        return storageInformationDeserializer(item);
    });
}
export function storageInformationDeserializer(item) {
    return {
        id: item["id"],
    };
}
export function updateSAPCentralInstanceRequestSerializer(item) {
    return { tags: item["tags"] };
}
export function _sapCentralServerInstanceListResultDeserializer(item) {
    return {
        value: sapCentralServerInstanceArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function sapCentralServerInstanceArraySerializer(result) {
    return result.map((item) => {
        return sapCentralServerInstanceSerializer(item);
    });
}
export function sapCentralServerInstanceArrayDeserializer(result) {
    return result.map((item) => {
        return sapCentralServerInstanceDeserializer(item);
    });
}
export function sapDatabaseInstanceSerializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        properties: !item["properties"]
            ? item["properties"]
            : sapDatabasePropertiesSerializer(item["properties"]),
    };
}
export function sapDatabaseInstanceDeserializer(item) {
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
export function sapDatabasePropertiesSerializer(item) {
    return item;
}
export function sapDatabasePropertiesDeserializer(item) {
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
export function databaseVmDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return databaseVmDetailsDeserializer(item);
    });
}
export function databaseVmDetailsDeserializer(item) {
    return {
        virtualMachineId: item["virtualMachineId"],
        status: item["status"],
        storageDetails: !item["storageDetails"]
            ? item["storageDetails"]
            : storageInformationArrayDeserializer(item["storageDetails"]),
    };
}
export function updateSAPDatabaseInstanceRequestSerializer(item) {
    return { tags: item["tags"] };
}
export function _sapDatabaseInstanceListResultDeserializer(item) {
    return {
        value: sapDatabaseInstanceArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function sapDatabaseInstanceArraySerializer(result) {
    return result.map((item) => {
        return sapDatabaseInstanceSerializer(item);
    });
}
export function sapDatabaseInstanceArrayDeserializer(result) {
    return result.map((item) => {
        return sapDatabaseInstanceDeserializer(item);
    });
}
export function sapApplicationServerInstanceSerializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        properties: !item["properties"]
            ? item["properties"]
            : sapApplicationServerPropertiesSerializer(item["properties"]),
    };
}
export function sapApplicationServerInstanceDeserializer(item) {
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
export function sapApplicationServerPropertiesSerializer(item) {
    return item;
}
export function sapApplicationServerPropertiesDeserializer(item) {
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
export function applicationServerVmDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return applicationServerVmDetailsDeserializer(item);
    });
}
export function applicationServerVmDetailsDeserializer(item) {
    return {
        type: item["type"],
        virtualMachineId: item["virtualMachineId"],
        storageDetails: !item["storageDetails"]
            ? item["storageDetails"]
            : storageInformationArrayDeserializer(item["storageDetails"]),
    };
}
/** Defines the type of application server VM. */
export var KnownApplicationServerVirtualMachineType;
(function (KnownApplicationServerVirtualMachineType) {
    /** Active Application server vm type. */
    KnownApplicationServerVirtualMachineType["Active"] = "Active";
    /** Standby Application server vm type. */
    KnownApplicationServerVirtualMachineType["Standby"] = "Standby";
    /** Unknown Application server vm type. */
    KnownApplicationServerVirtualMachineType["Unknown"] = "Unknown";
})(KnownApplicationServerVirtualMachineType || (KnownApplicationServerVirtualMachineType = {}));
export function updateSAPApplicationInstanceRequestSerializer(item) {
    return { tags: item["tags"] };
}
export function _sapApplicationServerInstanceListResultDeserializer(item) {
    return {
        value: sapApplicationServerInstanceArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
export function sapApplicationServerInstanceArraySerializer(result) {
    return result.map((item) => {
        return sapApplicationServerInstanceSerializer(item);
    });
}
export function sapApplicationServerInstanceArrayDeserializer(result) {
    return result.map((item) => {
        return sapApplicationServerInstanceDeserializer(item);
    });
}
/** The available API versions. */
export var KnownVersions;
(function (KnownVersions) {
    /** The 2024-09-01 API version. */
    KnownVersions["V20240901"] = "2024-09-01";
})(KnownVersions || (KnownVersions = {}));
//# sourceMappingURL=models.js.map