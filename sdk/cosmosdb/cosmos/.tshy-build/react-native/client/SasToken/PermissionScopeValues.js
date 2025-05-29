// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Represents permission Scope Values.
 */
export var PermissionScopeValues;
(function (PermissionScopeValues) {
    /**
     * Values which set permission Scope applicable to control plane related operations.
     */
    PermissionScopeValues[PermissionScopeValues["ScopeAccountReadValue"] = 1] = "ScopeAccountReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountListDatabasesValue"] = 2] = "ScopeAccountListDatabasesValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseReadValue"] = 4] = "ScopeDatabaseReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseReadOfferValue"] = 8] = "ScopeDatabaseReadOfferValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseListContainerValue"] = 16] = "ScopeDatabaseListContainerValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadValue"] = 32] = "ScopeContainerReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadOfferValue"] = 64] = "ScopeContainerReadOfferValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountCreateDatabasesValue"] = 1] = "ScopeAccountCreateDatabasesValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountDeleteDatabasesValue"] = 2] = "ScopeAccountDeleteDatabasesValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseDeleteValue"] = 4] = "ScopeDatabaseDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseReplaceOfferValue"] = 8] = "ScopeDatabaseReplaceOfferValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseCreateContainerValue"] = 16] = "ScopeDatabaseCreateContainerValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseDeleteContainerValue"] = 32] = "ScopeDatabaseDeleteContainerValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceValue"] = 64] = "ScopeContainerReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteValue"] = 128] = "ScopeContainerDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceOfferValue"] = 256] = "ScopeContainerReplaceOfferValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountReadAllAccessValue"] = 65535] = "ScopeAccountReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseReadAllAccessValue"] = 124] = "ScopeDatabaseReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainersReadAllAccessValue"] = 96] = "ScopeContainersReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountWriteAllAccessValue"] = 65535] = "ScopeAccountWriteAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseWriteAllAccessValue"] = 508] = "ScopeDatabaseWriteAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainersWriteAllAccessValue"] = 448] = "ScopeContainersWriteAllAccessValue";
    /**
     * Values which set permission Scope applicable to data plane related operations.
     */
    PermissionScopeValues[PermissionScopeValues["ScopeContainerExecuteQueriesValue"] = 1] = "ScopeContainerExecuteQueriesValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadFeedsValue"] = 2] = "ScopeContainerReadFeedsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadStoredProceduresValue"] = 4] = "ScopeContainerReadStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadUserDefinedFunctionsValue"] = 8] = "ScopeContainerReadUserDefinedFunctionsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadTriggersValue"] = 16] = "ScopeContainerReadTriggersValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadConflictsValue"] = 32] = "ScopeContainerReadConflictsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemReadValue"] = 64] = "ScopeItemReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeStoredProcedureReadValue"] = 128] = "ScopeStoredProcedureReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeUserDefinedFunctionReadValue"] = 256] = "ScopeUserDefinedFunctionReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeTriggerReadValue"] = 512] = "ScopeTriggerReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerCreateItemsValue"] = 1] = "ScopeContainerCreateItemsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceItemsValue"] = 2] = "ScopeContainerReplaceItemsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerUpsertItemsValue"] = 4] = "ScopeContainerUpsertItemsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteItemsValue"] = 8] = "ScopeContainerDeleteItemsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerCreateStoredProceduresValue"] = 16] = "ScopeContainerCreateStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceStoredProceduresValue"] = 32] = "ScopeContainerReplaceStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteStoredProceduresValue"] = 64] = "ScopeContainerDeleteStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerExecuteStoredProceduresValue"] = 128] = "ScopeContainerExecuteStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerCreateTriggersValue"] = 256] = "ScopeContainerCreateTriggersValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceTriggersValue"] = 512] = "ScopeContainerReplaceTriggersValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteTriggersValue"] = 1024] = "ScopeContainerDeleteTriggersValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerCreateUserDefinedFunctionsValue"] = 2048] = "ScopeContainerCreateUserDefinedFunctionsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceUserDefinedFunctionsValue"] = 4096] = "ScopeContainerReplaceUserDefinedFunctionsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteUserDefinedFunctionSValue"] = 8192] = "ScopeContainerDeleteUserDefinedFunctionSValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteCONFLICTSValue"] = 16384] = "ScopeContainerDeleteCONFLICTSValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemReplaceValue"] = 65536] = "ScopeItemReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemUpsertValue"] = 131072] = "ScopeItemUpsertValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemDeleteValue"] = 262144] = "ScopeItemDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeStoredProcedureReplaceValue"] = 1048576] = "ScopeStoredProcedureReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeStoredProcedureDeleteValue"] = 2097152] = "ScopeStoredProcedureDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeStoredProcedureExecuteValue"] = 4194304] = "ScopeStoredProcedureExecuteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeUserDefinedFunctionReplaceValue"] = 8388608] = "ScopeUserDefinedFunctionReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeUserDefinedFunctionDeleteValue"] = 16777216] = "ScopeUserDefinedFunctionDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeTriggerReplaceValue"] = 33554432] = "ScopeTriggerReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeTriggerDeleteValue"] = 67108864] = "ScopeTriggerDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadAllAccessValue"] = 4294967295] = "ScopeContainerReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemReadAllAccessValue"] = 65] = "ScopeItemReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerWriteAllAccessValue"] = 4294967295] = "ScopeContainerWriteAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemWriteAllAccessValue"] = 458767] = "ScopeItemWriteAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["NoneValue"] = 0] = "NoneValue";
})(PermissionScopeValues || (PermissionScopeValues = {}));
//# sourceMappingURL=PermissionScopeValues.js.map