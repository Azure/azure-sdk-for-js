// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import { Limiter } from "../../../src/bulk/Limiter";
// import type { ExecuteCallback, RetryCallback } from "../../../src/utils/batch";
// import type { BulkResponse, ItemBulkOperation, ItemBulkOperationContext } from "../../../src/bulk";
// import { CosmosDbDiagnosticLevel } from "../../../src";
// import { BulkHelperPerPartition } from "../../../src/bulk/BulkHelperPerPartition";
// import assert from "assert";

// describe("BulkHelperPerPartition", () => {
//   const mockExecutor: ExecuteCallback = async () => {
//     return {} as BulkResponse;
//   };
//   const mockRetrier: RetryCallback = async () => {};
//   const limiter = new Limiter(50);
//   let streamerPerPartition: BulkHelperPerPartition;

//   beforeEach(() => {
//     streamerPerPartition = new BulkHelperPerPartition(
//       mockExecutor,
//       mockRetrier,
//       limiter,
//       CosmosDbDiagnosticLevel.info,
//       false,
//       {} as any,
//       undefined,
//     );
//   });
//   afterEach(() => {
//     streamerPerPartition.disposeTimers();
//   });
//   it("dispose should dispose all the timers", async () => {
//     let dispatchCount = 0;
//     let congestionCount = 0;
//     // dispose actual timers started during initialization before setting custom timers
//     streamerPerPartition.disposeTimers();
//     // Set custom timers
//     streamerPerPartition["dispatchTimer"] = setInterval(() => {
//       dispatchCount++;
//     }, 10);
//     streamerPerPartition["congestionControlTimer"] = setInterval(() => {
//       congestionCount++;
//     }, 10);
//     await new Promise((resolve) => setTimeout(resolve, 100));
//     assert.ok(dispatchCount > 0, "dispatchTimer should be running");
//     assert.ok(congestionCount > 0, "congestionControlTimer should be running");
//     streamerPerPartition.disposeTimers();
//     const updatedDispatchCount = dispatchCount;
//     const updatedCongestionCount = congestionCount;
//     await new Promise((resolve) => setTimeout(resolve, 100));
//     assert.equal(dispatchCount, updatedDispatchCount, "dispatchTimer should have stopped running");
//     assert.equal(
//       congestionCount,
//       updatedCongestionCount,
//       "congestionControlTimer should have stopped running",
//     );
//   });

//   it("should add operations to the batch and dispatch when full", () => {
//     let dispatchCalled = false;
//     let isFirstCall = true;
//     // tryAdd will return false in case of full batcher
//     const batcher = {
//       tryAdd: () => {
//         if (isFirstCall) {
//           isFirstCall = false;
//           return false;
//         }
//         return true;
//       },
//       dispatch: () => {
//         dispatchCalled = true;
//       },
//       isEmpty: () => false,
//     };
//     streamerPerPartition["currentBatcher"] = batcher as any;
//     const operation = {
//       operationContext: {} as ItemBulkOperationContext,
//     } as unknown as ItemBulkOperation;
//     streamerPerPartition.add(operation);
//     assert.ok(dispatchCalled, "dispatch should be called when batcher is full");
//     const newBatcher = streamerPerPartition["currentBatcher"];
//     assert.notEqual(newBatcher, batcher, "new batcher should be created after dispatch");
//   });
// });
