// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents permission Scope Values.
 */
export enum PermissionScopeValues {
  /**
   * Values which set permission Scope applicable to control plane related operations.
   */
  ScopeAccountReadValue = 0x0001,
  ScopeAccountListDatabasesValue = 0x0002,
  ScopeDatabaseReadValue = 0x0004,
  ScopeDatabaseReadOfferValue = 0x0008,
  ScopeDatabaseListContainerValue = 0x0010,
  ScopeContainerReadValue = 0x0020,
  ScopeContainerReadOfferValue = 0x0040,

  ScopeAccountCreateDatabasesValue = 0x0001,
  ScopeAccountDeleteDatabasesValue = 0x0002,
  ScopeDatabaseDeleteValue = 0x0004,
  ScopeDatabaseReplaceOfferValue = 0x0008,
  ScopeDatabaseCreateContainerValue = 0x0010,
  ScopeDatabaseDeleteContainerValue = 0x0020,
  ScopeContainerReplaceValue = 0x0040,
  ScopeContainerDeleteValue = 0x0080,
  ScopeContainerReplaceOfferValue = 0x0100,

  ScopeAccountReadAllAccessValue = 0xffff,
  ScopeDatabaseReadAllAccessValue = PermissionScopeValues.ScopeDatabaseReadValue |
    PermissionScopeValues.ScopeDatabaseReadOfferValue |
    PermissionScopeValues.ScopeDatabaseListContainerValue |
    PermissionScopeValues.ScopeContainerReadValue |
    PermissionScopeValues.ScopeContainerReadOfferValue,

  ScopeContainersReadAllAccessValue = PermissionScopeValues.ScopeContainerReadValue |
    PermissionScopeValues.ScopeContainerReadOfferValue,

  ScopeAccountWriteAllAccessValue = 0xffff,
  ScopeDatabaseWriteAllAccessValue = PermissionScopeValues.ScopeDatabaseDeleteValue |
    PermissionScopeValues.ScopeDatabaseReplaceOfferValue |
    PermissionScopeValues.ScopeDatabaseCreateContainerValue |
    PermissionScopeValues.ScopeDatabaseDeleteContainerValue |
    PermissionScopeValues.ScopeContainerReplaceValue |
    PermissionScopeValues.ScopeContainerDeleteValue |
    PermissionScopeValues.ScopeContainerReplaceOfferValue,

  ScopeContainersWriteAllAccessValue = PermissionScopeValues.ScopeContainerReplaceValue |
    PermissionScopeValues.ScopeContainerDeleteValue |
    PermissionScopeValues.ScopeContainerReplaceOfferValue,

  /**
   * Values which set permission Scope applicable to data plane related operations.
   */
  ScopeContainerExecuteQueriesValue = 0x00000001,
  ScopeContainerReadFeedsValue = 0x00000002,
  ScopeContainerReadStoredProceduresValue = 0x00000004,
  ScopeContainerReadUserDefinedFunctionsValue = 0x00000008,
  ScopeContainerReadTriggersValue = 0x00000010,
  ScopeContainerReadConflictsValue = 0x00000020,
  ScopeItemReadValue = 0x00000040,
  ScopeStoredProcedureReadValue = 0x00000080,
  ScopeUserDefinedFunctionReadValue = 0x00000100,
  ScopeTriggerReadValue = 0x00000200,

  ScopeContainerCreateItemsValue = 0x00000001,
  ScopeContainerReplaceItemsValue = 0x00000002,
  ScopeContainerUpsertItemsValue = 0x00000004,
  ScopeContainerDeleteItemsValue = 0x00000008,
  ScopeContainerCreateStoredProceduresValue = 0x00000010,
  ScopeContainerReplaceStoredProceduresValue = 0x00000020,
  ScopeContainerDeleteStoredProceduresValue = 0x00000040,
  ScopeContainerExecuteStoredProceduresValue = 0x00000080,
  ScopeContainerCreateTriggersValue = 0x00000100,
  ScopeContainerReplaceTriggersValue = 0x00000200,
  ScopeContainerDeleteTriggersValue = 0x00000400,
  ScopeContainerCreateUserDefinedFunctionsValue = 0x00000800,
  ScopeContainerReplaceUserDefinedFunctionsValue = 0x00001000,
  ScopeContainerDeleteUserDefinedFunctionSValue = 0x00002000,
  ScopeContainerDeleteCONFLICTSValue = 0x00004000,
  ScopeItemReplaceValue = 0x00010000,
  ScopeItemUpsertValue = 0x00020000,
  ScopeItemDeleteValue = 0x00040000,
  ScopeStoredProcedureReplaceValue = 0x00100000,
  ScopeStoredProcedureDeleteValue = 0x00200000,
  ScopeStoredProcedureExecuteValue = 0x00400000,
  ScopeUserDefinedFunctionReplaceValue = 0x00800000,
  ScopeUserDefinedFunctionDeleteValue = 0x01000000,
  ScopeTriggerReplaceValue = 0x02000000,
  ScopeTriggerDeleteValue = 0x04000000,

  ScopeContainerReadAllAccessValue = 0xffffffff,
  ScopeItemReadAllAccessValue = PermissionScopeValues.ScopeContainerExecuteQueriesValue |
    PermissionScopeValues.ScopeItemReadValue,
  ScopeContainerWriteAllAccessValue = 0xffffffff,
  ScopeItemWriteAllAccessValue = PermissionScopeValues.ScopeContainerCreateItemsValue |
    PermissionScopeValues.ScopeContainerReplaceItemsValue |
    PermissionScopeValues.ScopeContainerUpsertItemsValue |
    PermissionScopeValues.ScopeContainerDeleteItemsValue |
    PermissionScopeValues.ScopeItemReplaceValue |
    PermissionScopeValues.ScopeItemUpsertValue |
    PermissionScopeValues.ScopeItemDeleteValue,

  NoneValue = 0,
}
