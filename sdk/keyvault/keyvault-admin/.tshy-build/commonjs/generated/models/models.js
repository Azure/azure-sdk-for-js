"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownVersions = exports.KnownDataAction = exports.KnownRoleType = exports.KnownRoleDefinitionType = exports.KnownRoleScope = exports.KnownSettingTypeEnum = exports.KnownOperationStatus = void 0;
exports.fullBackupOperationDeserializer = fullBackupOperationDeserializer;
exports._fullBackupOperationErrorDeserializer = _fullBackupOperationErrorDeserializer;
exports.keyVaultErrorDeserializer = keyVaultErrorDeserializer;
exports.sASTokenParameterSerializer = sASTokenParameterSerializer;
exports.preBackupOperationParametersSerializer = preBackupOperationParametersSerializer;
exports.restoreOperationDeserializer = restoreOperationDeserializer;
exports.preRestoreOperationParametersSerializer = preRestoreOperationParametersSerializer;
exports.restoreOperationParametersSerializer = restoreOperationParametersSerializer;
exports.selectiveKeyRestoreOperationDeserializer = selectiveKeyRestoreOperationDeserializer;
exports.selectiveKeyRestoreOperationParametersSerializer = selectiveKeyRestoreOperationParametersSerializer;
exports.updateSettingRequestSerializer = updateSettingRequestSerializer;
exports.settingDeserializer = settingDeserializer;
exports.settingsListResultDeserializer = settingsListResultDeserializer;
exports.settingArrayDeserializer = settingArrayDeserializer;
exports.roleAssignmentDeserializer = roleAssignmentDeserializer;
exports.roleAssignmentPropertiesWithScopeDeserializer = roleAssignmentPropertiesWithScopeDeserializer;
exports.roleAssignmentCreateParametersSerializer = roleAssignmentCreateParametersSerializer;
exports.roleAssignmentPropertiesSerializer = roleAssignmentPropertiesSerializer;
exports._roleAssignmentListResultDeserializer = _roleAssignmentListResultDeserializer;
exports.roleAssignmentArrayDeserializer = roleAssignmentArrayDeserializer;
exports.roleDefinitionDeserializer = roleDefinitionDeserializer;
exports.roleDefinitionPropertiesSerializer = roleDefinitionPropertiesSerializer;
exports.roleDefinitionPropertiesDeserializer = roleDefinitionPropertiesDeserializer;
exports.permissionArraySerializer = permissionArraySerializer;
exports.permissionArrayDeserializer = permissionArrayDeserializer;
exports.permissionSerializer = permissionSerializer;
exports.permissionDeserializer = permissionDeserializer;
exports.roleDefinitionCreateParametersSerializer = roleDefinitionCreateParametersSerializer;
exports._roleDefinitionListResultDeserializer = _roleDefinitionListResultDeserializer;
exports.roleDefinitionArrayDeserializer = roleDefinitionArrayDeserializer;
function fullBackupOperationDeserializer(item) {
    return {
        status: item["status"],
        statusDetails: item["statusDetails"],
        error: !item["error"]
            ? item["error"]
            : _fullBackupOperationErrorDeserializer(item["error"]),
        startTime: !item["startTime"]
            ? item["startTime"]
            : new Date(item["startTime"] * 1000),
        endTime: !item["endTime"]
            ? item["endTime"]
            : new Date(item["endTime"] * 1000),
        jobId: item["jobId"],
        folderUri: item["azureStorageBlobContainerUri"],
    };
}
/** The status of a long-running operation. */
var KnownOperationStatus;
(function (KnownOperationStatus) {
    /** The operation is in progress. */
    KnownOperationStatus["InProgress"] = "InProgress";
    /** The operation successfully completed. */
    KnownOperationStatus["Succeeded"] = "Succeeded";
    /** The operation was canceled. */
    KnownOperationStatus["Canceled"] = "Canceled";
    /** The operation failed. */
    KnownOperationStatus["Failed"] = "Failed";
})(KnownOperationStatus || (exports.KnownOperationStatus = KnownOperationStatus = {}));
function _fullBackupOperationErrorDeserializer(item) {
    return {
        code: item["code"],
        message: item["message"],
        innerError: !item["innererror"]
            ? item["innererror"]
            : _fullBackupOperationErrorDeserializer(item["innererror"]),
    };
}
function keyVaultErrorDeserializer(item) {
    return {
        error: !item["error"]
            ? item["error"]
            : _fullBackupOperationErrorDeserializer(item["error"]),
    };
}
function sASTokenParameterSerializer(item) {
    return {
        storageResourceUri: item["storageResourceUri"],
        token: item["token"],
        useManagedIdentity: item["useManagedIdentity"],
    };
}
function preBackupOperationParametersSerializer(item) {
    return {
        storageResourceUri: item["storageResourceUri"],
        token: item["token"],
        useManagedIdentity: item["useManagedIdentity"],
    };
}
function restoreOperationDeserializer(item) {
    return {
        status: item["status"],
        statusDetails: item["statusDetails"],
        error: !item["error"]
            ? item["error"]
            : _fullBackupOperationErrorDeserializer(item["error"]),
        jobId: item["jobId"],
        startTime: !item["startTime"]
            ? item["startTime"]
            : new Date(item["startTime"] * 1000),
        endTime: !item["endTime"]
            ? item["endTime"]
            : new Date(item["endTime"] * 1000),
    };
}
function preRestoreOperationParametersSerializer(item) {
    return {
        sasTokenParameters: !item["sasTokenParameters"]
            ? item["sasTokenParameters"]
            : sASTokenParameterSerializer(item["sasTokenParameters"]),
        folderToRestore: item["folderToRestore"],
    };
}
function restoreOperationParametersSerializer(item) {
    return {
        sasTokenParameters: sASTokenParameterSerializer(item["sasTokenParameters"]),
        folderToRestore: item["folderToRestore"],
    };
}
function selectiveKeyRestoreOperationDeserializer(item) {
    return {
        status: item["status"],
        statusDetails: item["statusDetails"],
        error: !item["error"]
            ? item["error"]
            : _fullBackupOperationErrorDeserializer(item["error"]),
        jobId: item["jobId"],
        startTime: !item["startTime"]
            ? item["startTime"]
            : new Date(item["startTime"] * 1000),
        endTime: !item["endTime"]
            ? item["endTime"]
            : new Date(item["endTime"] * 1000),
    };
}
function selectiveKeyRestoreOperationParametersSerializer(item) {
    return {
        sasTokenParameters: sASTokenParameterSerializer(item["sasTokenParameters"]),
        folder: item["folder"],
    };
}
function updateSettingRequestSerializer(item) {
    return { value: item["value"] };
}
function settingDeserializer(item) {
    return {
        name: item["name"],
        value: item["value"],
        type: item["type"],
    };
}
/** The type specifier of the value. */
var KnownSettingTypeEnum;
(function (KnownSettingTypeEnum) {
    /** A boolean setting value. */
    KnownSettingTypeEnum["boolean"] = "boolean";
})(KnownSettingTypeEnum || (exports.KnownSettingTypeEnum = KnownSettingTypeEnum = {}));
function settingsListResultDeserializer(item) {
    return {
        settings: !item["settings"]
            ? item["settings"]
            : settingArrayDeserializer(item["settings"]),
    };
}
function settingArrayDeserializer(result) {
    return result.map((item) => {
        return settingDeserializer(item);
    });
}
function roleAssignmentDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        type: item["type"],
        properties: !item["properties"]
            ? item["properties"]
            : roleAssignmentPropertiesWithScopeDeserializer(item["properties"]),
    };
}
function roleAssignmentPropertiesWithScopeDeserializer(item) {
    return {
        scope: item["scope"],
        roleDefinitionId: item["roleDefinitionId"],
        principalId: item["principalId"],
    };
}
/** The role scope. */
var KnownRoleScope;
(function (KnownRoleScope) {
    /** Global scope */
    KnownRoleScope["Global"] = "/";
    /** Keys scope */
    KnownRoleScope["Keys"] = "/keys";
})(KnownRoleScope || (exports.KnownRoleScope = KnownRoleScope = {}));
function roleAssignmentCreateParametersSerializer(item) {
    return { properties: roleAssignmentPropertiesSerializer(item["properties"]) };
}
function roleAssignmentPropertiesSerializer(item) {
    return {
        roleDefinitionId: item["roleDefinitionId"],
        principalId: item["principalId"],
    };
}
function _roleAssignmentListResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : roleAssignmentArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function roleAssignmentArrayDeserializer(result) {
    return result.map((item) => {
        return roleAssignmentDeserializer(item);
    });
}
function roleDefinitionDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        type: item["type"],
        properties: !item["properties"]
            ? item["properties"]
            : roleDefinitionPropertiesDeserializer(item["properties"]),
    };
}
/** The role definition type. */
var KnownRoleDefinitionType;
(function (KnownRoleDefinitionType) {
    /** Microsoft-defined role definitions. */
    KnownRoleDefinitionType["Microsoft.Authorization/roleDefinitions"] = "Microsoft.Authorization/roleDefinitions";
})(KnownRoleDefinitionType || (exports.KnownRoleDefinitionType = KnownRoleDefinitionType = {}));
function roleDefinitionPropertiesSerializer(item) {
    return {
        roleName: item["roleName"],
        description: item["description"],
        type: item["roleType"],
        permissions: !item["permissions"]
            ? item["permissions"]
            : permissionArraySerializer(item["permissions"]),
        assignableScopes: !item["assignableScopes"]
            ? item["assignableScopes"]
            : item["assignableScopes"].map((p) => {
                return p;
            }),
    };
}
function roleDefinitionPropertiesDeserializer(item) {
    return {
        roleName: item["roleName"],
        description: item["description"],
        roleType: item["type"],
        permissions: !item["permissions"]
            ? item["permissions"]
            : permissionArrayDeserializer(item["permissions"]),
        assignableScopes: !item["assignableScopes"]
            ? item["assignableScopes"]
            : item["assignableScopes"].map((p) => {
                return p;
            }),
    };
}
/** The role type. */
var KnownRoleType;
(function (KnownRoleType) {
    /** Built in role. */
    KnownRoleType["BuiltInRole"] = "AKVBuiltInRole";
    /** Custom role. */
    KnownRoleType["CustomRole"] = "CustomRole";
})(KnownRoleType || (exports.KnownRoleType = KnownRoleType = {}));
function permissionArraySerializer(result) {
    return result.map((item) => {
        return permissionSerializer(item);
    });
}
function permissionArrayDeserializer(result) {
    return result.map((item) => {
        return permissionDeserializer(item);
    });
}
function permissionSerializer(item) {
    return {
        actions: !item["actions"]
            ? item["actions"]
            : item["actions"].map((p) => {
                return p;
            }),
        notActions: !item["notActions"]
            ? item["notActions"]
            : item["notActions"].map((p) => {
                return p;
            }),
        dataActions: !item["dataActions"]
            ? item["dataActions"]
            : item["dataActions"].map((p) => {
                return p;
            }),
        notDataActions: !item["notDataActions"]
            ? item["notDataActions"]
            : item["notDataActions"].map((p) => {
                return p;
            }),
    };
}
function permissionDeserializer(item) {
    return {
        actions: !item["actions"]
            ? item["actions"]
            : item["actions"].map((p) => {
                return p;
            }),
        notActions: !item["notActions"]
            ? item["notActions"]
            : item["notActions"].map((p) => {
                return p;
            }),
        dataActions: !item["dataActions"]
            ? item["dataActions"]
            : item["dataActions"].map((p) => {
                return p;
            }),
        notDataActions: !item["notDataActions"]
            ? item["notDataActions"]
            : item["notDataActions"].map((p) => {
                return p;
            }),
    };
}
/** Supported permissions for data actions. */
var KnownDataAction;
(function (KnownDataAction) {
    /** Read HSM key metadata. */
    KnownDataAction["ReadHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/read/action";
    /** Update an HSM key. */
    KnownDataAction["WriteHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/write/action";
    /** Read deleted HSM key. */
    KnownDataAction["ReadDeletedHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action";
    /** Recover deleted HSM key. */
    KnownDataAction["RecoverDeletedHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action";
    /** Backup HSM keys. */
    KnownDataAction["BackupHsmKeys"] = "Microsoft.KeyVault/managedHsm/keys/backup/action";
    /** Restore HSM keys. */
    KnownDataAction["RestoreHsmKeys"] = "Microsoft.KeyVault/managedHsm/keys/restore/action";
    /** Delete role assignment. */
    KnownDataAction["DeleteRoleAssignment"] = "Microsoft.KeyVault/managedHsm/roleAssignments/delete/action";
    /** Get role assignment. */
    KnownDataAction["GetRoleAssignment"] = "Microsoft.KeyVault/managedHsm/roleAssignments/read/action";
    /** Create or update role assignment. */
    KnownDataAction["WriteRoleAssignment"] = "Microsoft.KeyVault/managedHsm/roleAssignments/write/action";
    /** Get role definition. */
    KnownDataAction["ReadRoleDefinition"] = "Microsoft.KeyVault/managedHsm/roleDefinitions/read/action";
    /** Create or update role definition. */
    KnownDataAction["WriteRoleDefinition"] = "Microsoft.KeyVault/managedHsm/roleDefinitions/write/action";
    /** Delete role definition. */
    KnownDataAction["DeleteRoleDefinition"] = "Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action";
    /** Encrypt using an HSM key. */
    KnownDataAction["EncryptHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/encrypt/action";
    /** Decrypt using an HSM key. */
    KnownDataAction["DecryptHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/decrypt/action";
    /** Wrap using an HSM key. */
    KnownDataAction["WrapHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/wrap/action";
    /** Unwrap using an HSM key. */
    KnownDataAction["UnwrapHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/unwrap/action";
    /** Sign using an HSM key. */
    KnownDataAction["SignHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/sign/action";
    /** Verify using an HSM key. */
    KnownDataAction["VerifyHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/verify/action";
    /** Create an HSM key. */
    KnownDataAction["CreateHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/create";
    /** Delete an HSM key. */
    KnownDataAction["DeleteHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/delete";
    /** Export an HSM key. */
    KnownDataAction["ExportHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/export/action";
    /** Release an HSM key using Secure Key Release. */
    KnownDataAction["ReleaseKey"] = "Microsoft.KeyVault/managedHsm/keys/release/action";
    /** Import an HSM key. */
    KnownDataAction["ImportHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/import/action";
    /** Purge a deleted HSM key. */
    KnownDataAction["PurgeDeletedHsmKey"] = "Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete";
    /** Download an HSM security domain. */
    KnownDataAction["DownloadHsmSecurityDomain"] = "Microsoft.KeyVault/managedHsm/securitydomain/download/action";
    /** Check status of HSM security domain download. */
    KnownDataAction["DownloadHsmSecurityDomainStatus"] = "Microsoft.KeyVault/managedHsm/securitydomain/download/read";
    /** Upload an HSM security domain. */
    KnownDataAction["UploadHsmSecurityDomain"] = "Microsoft.KeyVault/managedHsm/securitydomain/upload/action";
    /** Check the status of the HSM security domain exchange file. */
    KnownDataAction["ReadHsmSecurityDomainStatus"] = "Microsoft.KeyVault/managedHsm/securitydomain/upload/read";
    /** Download an HSM security domain transfer key. */
    KnownDataAction["ReadHsmSecurityDomainTransferKey"] = "Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read";
    /** Start an HSM backup. */
    KnownDataAction["StartHsmBackup"] = "Microsoft.KeyVault/managedHsm/backup/start/action";
    /** Start an HSM restore. */
    KnownDataAction["StartHsmRestore"] = "Microsoft.KeyVault/managedHsm/restore/start/action";
    /** Read an HSM backup status. */
    KnownDataAction["ReadHsmBackupStatus"] = "Microsoft.KeyVault/managedHsm/backup/status/action";
    /** Read an HSM restore status. */
    KnownDataAction["ReadHsmRestoreStatus"] = "Microsoft.KeyVault/managedHsm/restore/status/action";
    /** Generate random numbers. */
    KnownDataAction["RandomNumbersGenerate"] = "Microsoft.KeyVault/managedHsm/rng/action";
})(KnownDataAction || (exports.KnownDataAction = KnownDataAction = {}));
function roleDefinitionCreateParametersSerializer(item) {
    return { properties: roleDefinitionPropertiesSerializer(item["properties"]) };
}
function _roleDefinitionListResultDeserializer(item) {
    return {
        value: !item["value"]
            ? item["value"]
            : roleDefinitionArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function roleDefinitionArrayDeserializer(result) {
    return result.map((item) => {
        return roleDefinitionDeserializer(item);
    });
}
/** The available API versions. */
var KnownVersions;
(function (KnownVersions) {
    /** The 7.5 API version. */
    KnownVersions["v7.5"] = "7.5";
    /** The 7.6-preview.2 API version. */
    KnownVersions["v7.6_preview.2"] = "7.6-preview.2";
})(KnownVersions || (exports.KnownVersions = KnownVersions = {}));
//# sourceMappingURL=models.js.map