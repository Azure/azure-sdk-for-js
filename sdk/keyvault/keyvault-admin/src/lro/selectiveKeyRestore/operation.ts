// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import {
//   KeyVaultAdminPollOperation,
//   KeyVaultAdminPollOperationState,
// } from "../keyVaultAdminPoller.js";
// import {
//   KeyVaultBeginSelectiveKeyRestoreOptions,
//   KeyVaultSelectiveKeyRestoreResult,
// } from "../../backupClientModels.js";
// import { SelectiveKeyRestoreOperation } from "../../generated/models/index.js";
// import { AbortSignalLike } from "@azure/abort-controller";
// import { KeyVaultClient } from "../../generated/keyVaultClient.js";

// /**
//  * An interface representing the publicly available properties of the state of a restore Key Vault's poll operation.
//  */
// export interface KeyVaultSelectiveKeyRestoreOperationState
//   extends KeyVaultAdminPollOperationState<KeyVaultSelectiveKeyRestoreResult> {}

// /**
//  * An internal interface representing the state of a restore Key Vault's poll operation.
//  */
// export interface KeyVaultSelectiveKeyRestorePollOperationState
//   extends KeyVaultAdminPollOperationState<KeyVaultSelectiveKeyRestoreResult> {
//   /**
//    * The name of a Key Vault Key.
//    */
//   keyName: string;
//   /**
//    * The Folder name of the blob where the previous successful full backup was stored
//    */
//   folderName: string;
//   /**
//    * The URI of the blob storage account where the previous successful full backup was stored.
//    */
//   folderUri: string;
//   /**
//    * The SAS token.
//    */
//   sasToken?: string;
// }

// /**
//  * The selective restore Key Vault's poll operation.
//  */
// // Do I even need a whole class for this?
// export class KeyVaultSelectiveKeyRestorePollOperation extends KeyVaultAdminPollOperation<
//   KeyVaultSelectiveKeyRestorePollOperationState,
//   string
// > {
//   constructor(
//     public state: KeyVaultSelectiveKeyRestorePollOperationState,
//     private vaultUrl: string,
//     private client: KeyVaultClient,
//     private requestOptions: KeyVaultBeginSelectiveKeyRestoreOptions = {},
//   ) {
//     super(state, { cancelMessage: "Cancelling a selective Key Vault restore is not supported." });
//   }

//   /**
//    * Reaches to the service and updates the selective restore poll operation.
//    */
//   async update(
//     options: {
//       abortSignal?: AbortSignalLike;
//       fireProgress?: (state: KeyVaultSelectiveKeyRestorePollOperationState) => void;
//     } = {},
//   ): Promise<KeyVaultSelectiveKeyRestorePollOperation> {
//     const state = this.state;
//     const { keyName, folderUri, sasToken, folderName } = state;

//     if (options.abortSignal) {
//       this.requestOptions.abortSignal = options.abortSignal;
//     }

//     if (!state.isStarted) {
//       // Are there any codegen helpers that can be used here?
//       const selectiveKeyRestoreOperation = this.client.selectiveKeyRestoreOperation(
//         keyName,
//         {
//           folder: folderName,
//           sasTokenParameters: {
//             storageResourceUri: folderUri,
//             token: sasToken,
//             useManagedIdentity: sasToken === undefined,
//           },
//         },
//         this.requestOptions,
//       );
//       await selectiveKeyRestoreOperation.poll();
//       const status = selectiveKeyRestoreOperation.getResult() || {};
//       state.isStarted = true;
//       state.jobId = status.jobId;
//       state.endTime = status.endTime;
//       state.startTime = status.startTime;
//       state.status = status.status;
//       state.statusDetails = status.statusDetails;
//       state.isCompleted = !!status.endTime;

//       if (state.isCompleted && status.error?.code) {
//         throw new Error(status.error?.message || status.statusDetails);
//       }
//       if (state.isCompleted) {
//         state.result = {
//           startTime: status.startTime!,
//           endTime: status.endTime,
//         };
//       }
//     } else if (!state.isCompleted) {
//       if (!state.jobId) {
//         throw new Error(`Missing "jobId" from the full restore operation.`);
//       }
//       const serviceOperation = await this.client.restoreStatus(state.jobId, this.requestOptions);
//       this.mapState(serviceOperation);
//     }

//     return this;
//   }

//   private mapState(serviceOperation: SelectiveKeyRestoreOperation): void {
//     const state = this.state;
//     const { startTime, jobId, endTime, error, status, statusDetails } = serviceOperation;

//     if (!startTime) {
//       throw new Error(`Missing "startTime" from the selective restore operation.`);
//     }

//     state.isStarted = true;
//     state.jobId = jobId;
//     state.endTime = endTime;
//     state.startTime = startTime;
//     state.status = status;
//     state.statusDetails = statusDetails;
//     state.isCompleted = !!endTime;

//     if (state.isCompleted && error?.code) {
//       throw new Error(error?.message || statusDetails);
//     }

//     if (state.isCompleted) {
//       state.result = {
//         startTime,
//         endTime,
//       };
//     }
//   }
// }
