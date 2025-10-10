// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import { describe, it, assert, beforeEach } from "vitest";
// import { ContinuationTokenManager } from "../../../../../src/queryExecutionContext/ContinuationTokenManager.js";
// import {
//   createCompositeQueryContinuationToken,
//   serializeCompositeToken,
//   type QueryRangeWithContinuationToken,
// } from "../../../../../src/documents/ContinuationToken/CompositeQueryContinuationToken.js";
// import {
//   createOrderByQueryContinuationToken,
//   serializeOrderByQueryContinuationToken,
// } from "../../../../../src/documents/ContinuationToken/OrderByQueryContinuationToken.js";
// import { QueryRange } from "../../../../../src/routing/QueryRange.js";

// // Tests for the new factory pattern
// describe("ContinuationTokenManagerFactory", () => {
//   const mockCollectionLink = "dbs/test-db/colls/test-collection";

//   it("should create ParallelQueryContinuationTokenManager for non-ORDER BY queries", async () => {
//     const { ContinuationTokenManagerFactory } = await import("../../../../../src/queryExecutionContext/ContinuationTokenManager/ContinuationTokenManagerFactory.js");
//     const { ParallelQueryContinuationTokenManager } = await import("../../../../../src/queryExecutionContext/ContinuationTokenManager/ParallelQueryContinuationTokenManager.js");

//     const manager = ContinuationTokenManagerFactory.create(mockCollectionLink, undefined, false);
//     assert.instanceOf(manager, ParallelQueryContinuationTokenManager);
//   });

//   it("should create OrderByQueryContinuationTokenManager for ORDER BY queries", async () => {
//     const { ContinuationTokenManagerFactory } = await import("../../../../../src/queryExecutionContext/ContinuationTokenManager/ContinuationTokenManagerFactory.js");
//     const { OrderByQueryContinuationTokenManager } = await import("../../../../../src/queryExecutionContext/ContinuationTokenManager/OrderByQueryContinuationTokenManager.js");

//     const manager = ContinuationTokenManagerFactory.create(mockCollectionLink, undefined, true);
//     assert.instanceOf(manager, OrderByQueryContinuationTokenManager);
//   });

//   it("should pass continuation token to created manager", async () => {
//     const { ContinuationTokenManagerFactory } = await import("../../../../../src/queryExecutionContext/ContinuationTokenManager/ContinuationTokenManagerFactory.js");
//     const mockToken = "test-token";

//     const manager = ContinuationTokenManagerFactory.create(mockCollectionLink, mockToken, false);
//     // The manager should have attempted to parse the token (even if it fails)
//     assert.isDefined(manager);
//   });
// });

// describe("ContinuationTokenManager", () => {
//   const mockCollectionLink = "dbs/test-db/colls/test-collection";
//   let manager: ContinuationTokenManager;

//   // Helper function to create mock range mappings
//   const createMockRangeMappings = (): QueryRangeWithContinuationToken[] => [
//     {
//       queryRange: new QueryRange("00", "FF", true, false),
//       continuationToken: "token1",
//     },
//     {
//       queryRange: new QueryRange("FF", "ZZ", true, false),
//       continuationToken: "token2",
//     },
//   ];

//   describe("Constructor", () => {
//     describe("Parallel Query (isOrderByQuery = false)", () => {
//       it("should initialize without continuation token", () => {
//         manager = new ContinuationTokenManager(mockCollectionLink);

//         assert.equal(manager["collectionLink"], mockCollectionLink);
//         assert.equal(manager["isOrderByQuery"], false);
//         assert.deepEqual(manager["ranges"], []);
//         assert.isUndefined(manager["compositeContinuationToken"]);
//         assert.isUndefined(manager["orderByQueryContinuationToken"]);
//       });

//       it("should initialize with composite continuation token", () => {
//         const mockRangeMappings = createMockRangeMappings();
//         const compositeToken = createCompositeQueryContinuationToken(
//           mockCollectionLink,
//           mockRangeMappings,
//           10,
//           20,
//         );
//         const serializedToken = serializeCompositeToken(compositeToken);

//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, false);

//         assert.equal(manager["collectionLink"], mockCollectionLink);
//         assert.equal(manager["isOrderByQuery"], false);
//         assert.equal(manager["ranges"].length, 2);
//         assert.isDefined(manager["compositeContinuationToken"]);
//         assert.equal(manager["compositeContinuationToken"].rid, mockCollectionLink);
//         assert.equal(manager["compositeContinuationToken"].offset, 10);
//         assert.equal(manager["compositeContinuationToken"].limit, 20);
//       });
//     });

//     describe("ORDER BY Query (isOrderByQuery = true)", () => {
//       it("should initialize without continuation token", () => {
//         manager = new ContinuationTokenManager(mockCollectionLink, undefined, true);

//         assert.equal(manager["collectionLink"], mockCollectionLink);
//         assert.equal(manager["isOrderByQuery"], true);
//         assert.deepEqual(manager["ranges"], []);
//         assert.isUndefined(manager["compositeContinuationToken"]);
//         assert.isUndefined(manager["orderByQueryContinuationToken"]);
//       });

//       it("should initialize with ORDER BY continuation token", () => {
//         const mockRangeMappings = createMockRangeMappings();
//         const mockOrderByItems = [{ value: "test", type: "string" }];
//         const orderByToken = createOrderByQueryContinuationToken(
//           mockRangeMappings,
//           mockOrderByItems,
//           mockCollectionLink,
//           5,
//           "doc123",
//           10,
//           20,
//           "hash123",
//         );
//         const serializedToken = serializeOrderByQueryContinuationToken(orderByToken);

//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, true);

//         assert.equal(manager["collectionLink"], mockCollectionLink);
//         assert.equal(manager["isOrderByQuery"], true);
//         assert.equal(manager["ranges"].length, 2);
//         assert.isDefined(manager["orderByQueryContinuationToken"]);
//         assert.equal(manager["orderByQueryContinuationToken"].rid, mockCollectionLink);
//         assert.equal(manager["orderByQueryContinuationToken"].skipCount, 5);
//         assert.equal(manager["orderByQueryContinuationToken"].documentRid, "doc123");
//         assert.equal(manager["orderByQueryContinuationToken"].offset, 10);
//         assert.equal(manager["orderByQueryContinuationToken"].limit, 20);
//         assert.equal(manager["orderByQueryContinuationToken"].hashedLastResult, "hash123");
//       });
//     });

//     describe("Error Handling", () => {
//       it("should handle invalid JSON continuation token gracefully", () => {
//         assert.throws(() => {
//           new ContinuationTokenManager(mockCollectionLink, "invalid-json", false);
//         });
//       });

//       it("should handle invalid ORDER BY JSON continuation token gracefully", () => {
//         assert.throws(() => {
//           new ContinuationTokenManager(mockCollectionLink, "invalid-json", true);
//         });
//       });
//     });
//   });

//   describe("setOrderByItemsArray", () => {
//     beforeEach(() => {
//       manager = new ContinuationTokenManager(mockCollectionLink);
//     });

//     it("should set order by items array", () => {
//       const orderByItems = [[{ value: "item1" }], [{ value: "item2" }]];

//       manager.setOrderByItemsArray(orderByItems);

//       assert.deepEqual(manager["orderByItemsArray"], orderByItems);
//     });

//     it("should handle undefined order by items array", () => {
//       manager.setOrderByItemsArray(undefined);

//       assert.isUndefined(manager["orderByItemsArray"]);
//     });

//     it("should handle empty order by items array", () => {
//       const emptyArray: any[][] = [];
//       manager.setOrderByItemsArray(emptyArray);

//       assert.deepEqual(manager["orderByItemsArray"], emptyArray);
//     });

//     it("should overwrite existing order by items array", () => {
//       const firstArray = [[{ value: "first", type: "string" }]];
//       const secondArray = [[{ value: "second", type: "string" }]];

//       manager.setOrderByItemsArray(firstArray);
//       assert.deepEqual(manager["orderByItemsArray"], firstArray);

//       manager.setOrderByItemsArray(secondArray);
//       assert.deepEqual(manager["orderByItemsArray"], secondArray);
//     });
//   });

//   describe("getOffset", () => {
//     describe("Parallel Query", () => {
//       beforeEach(() => {
//         manager = new ContinuationTokenManager(mockCollectionLink, undefined, false);
//       });

//       it("should return undefined when no composite token exists", () => {
//         assert.isUndefined(manager.getOffset());
//       });

//       it("should return offset from composite token", () => {
//         const compositeToken = createCompositeQueryContinuationToken(
//           mockCollectionLink,
//           createMockRangeMappings(),
//           15,
//           25,
//         );
//         const serializedToken = serializeCompositeToken(compositeToken);
//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, false);

//         assert.equal(manager.getOffset(), 15);
//       });

//       it("should return undefined when composite token has undefined offset", () => {
//         const compositeToken = createCompositeQueryContinuationToken(
//           mockCollectionLink,
//           createMockRangeMappings(),
//         );
//         const serializedToken = serializeCompositeToken(compositeToken);
//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, false);

//         assert.isUndefined(manager.getOffset());
//       });
//     });

//     describe("ORDER BY Query", () => {
//       beforeEach(() => {
//         manager = new ContinuationTokenManager(mockCollectionLink, undefined, true);
//       });

//       it("should return undefined when no ORDER BY token exists", () => {
//         assert.isUndefined(manager.getOffset());
//       });

//       it("should return offset from ORDER BY token", () => {
//         const orderByToken = createOrderByQueryContinuationToken(
//           createMockRangeMappings(),
//           [{ value: "test", type: "string" }],
//           mockCollectionLink,
//           5,
//           "doc123",
//           30,
//           40,
//         );
//         const serializedToken = serializeOrderByQueryContinuationToken(orderByToken);
//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, true);

//         assert.equal(manager.getOffset(), 30);
//       });

//       it("should fallback to composite token offset when ORDER BY token offset is undefined", () => {
//         // Create ORDER BY token without offset
//         const orderByToken = createOrderByQueryContinuationToken(
//           createMockRangeMappings(),
//           [{ value: "test", type: "string" }],
//           mockCollectionLink,
//           5,
//         );
//         const serializedToken = serializeOrderByQueryContinuationToken(orderByToken);
//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, true);

//         // Set a composite token with offset
//         manager["compositeContinuationToken"] = createCompositeQueryContinuationToken(
//           mockCollectionLink,
//           createMockRangeMappings(),
//           50,
//           60,
//         );

//         assert.equal(manager.getOffset(), 50);
//       });
//     });
//   });

//   describe("getLimit", () => {
//     describe("Parallel Query", () => {
//       beforeEach(() => {
//         manager = new ContinuationTokenManager(mockCollectionLink, undefined, false);
//       });

//       it("should return undefined when no composite token exists", () => {
//         assert.isUndefined(manager.getLimit());
//       });

//       it("should return limit from composite token", () => {
//         const compositeToken = createCompositeQueryContinuationToken(
//           mockCollectionLink,
//           createMockRangeMappings(),
//           15,
//           25,
//         );
//         const serializedToken = serializeCompositeToken(compositeToken);
//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, false);

//         assert.equal(manager.getLimit(), 25);
//       });

//       it("should return undefined when composite token has undefined limit", () => {
//         const compositeToken = createCompositeQueryContinuationToken(
//           mockCollectionLink,
//           createMockRangeMappings(),
//         );
//         const serializedToken = serializeCompositeToken(compositeToken);
//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, false);

//         assert.isUndefined(manager.getLimit());
//       });
//     });

//     describe("ORDER BY Query", () => {
//       beforeEach(() => {
//         manager = new ContinuationTokenManager(mockCollectionLink, undefined, true);
//       });

//       it("should return undefined when no ORDER BY token exists", () => {
//         assert.isUndefined(manager.getLimit());
//       });

//       it("should return limit from ORDER BY token", () => {
//         const orderByToken = createOrderByQueryContinuationToken(
//           createMockRangeMappings(),
//           [{ value: "test", type: "string" }],
//           mockCollectionLink,
//           5,
//           "doc123",
//           30,
//           40,
//         );
//         const serializedToken = serializeOrderByQueryContinuationToken(orderByToken);
//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, true);

//         assert.equal(manager.getLimit(), 40);
//       });

//       it("should fallback to composite token limit when ORDER BY token limit is undefined", () => {
//         // Create ORDER BY token without limit
//         const orderByToken = createOrderByQueryContinuationToken(
//           createMockRangeMappings(),
//           [{ value: "test", type: "string" }],
//           mockCollectionLink,
//           5,
//         );
//         const serializedToken = serializeOrderByQueryContinuationToken(orderByToken);
//         manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, true);

//         // Set a composite token with limit
//         manager["compositeContinuationToken"] = createCompositeQueryContinuationToken(
//           mockCollectionLink,
//           createMockRangeMappings(),
//           50,
//           60,
//         );

//         assert.equal(manager.getLimit(), 60);
//       });
//     });
//   });

//   describe("getHashedLastResult", () => {
//     beforeEach(() => {
//       manager = new ContinuationTokenManager(mockCollectionLink, undefined, true);
//     });

//     it("should return undefined when no ORDER BY token exists", () => {
//       assert.isUndefined(manager.getHashedLastResult());
//     });

//     it("should return undefined when ORDER BY token has no hashed result", () => {
//       const orderByToken = createOrderByQueryContinuationToken(
//         createMockRangeMappings(),
//         [{ value: "test", type: "string" }],
//         mockCollectionLink,
//         5,
//       );
//       const serializedToken = serializeOrderByQueryContinuationToken(orderByToken);
//       manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, true);

//       assert.isUndefined(manager.getHashedLastResult());
//     });

//     it("should return hashed result from ORDER BY token", () => {
//       const orderByToken = createOrderByQueryContinuationToken(
//         createMockRangeMappings(),
//         [{ value: "test", type: "string" }],
//         mockCollectionLink,
//         5,
//         "doc123",
//         10,
//         20,
//         "hash123",
//       );
//       const serializedToken = serializeOrderByQueryContinuationToken(orderByToken);
//       manager = new ContinuationTokenManager(mockCollectionLink, serializedToken, true);

//       assert.equal(manager.getHashedLastResult(), "hash123");
//     });

//     it("should return undefined for parallel queries", () => {
//       manager = new ContinuationTokenManager(mockCollectionLink, undefined, false);
//       assert.isUndefined(manager.getHashedLastResult());
//     });
//   });

//   describe("Unsupported Query Type", () => {
//     beforeEach(() => {
//       manager = new ContinuationTokenManager(mockCollectionLink);
//     });

//     it("should initialize with supported query type by default", () => {
//       assert.equal(manager.getUnsupportedQueryType(), false);
//     });

//     it("should set and get unsupported query type", () => {
//       manager.setUnsupportedQueryType(true);
//       assert.equal(manager.getUnsupportedQueryType(), true);

//       manager.setUnsupportedQueryType(false);
//       assert.equal(manager.getUnsupportedQueryType(), false);
//     });

//     it("should handle multiple state changes", () => {
//       assert.equal(manager.getUnsupportedQueryType(), false);

//       manager.setUnsupportedQueryType(true);
//       assert.equal(manager.getUnsupportedQueryType(), true);

//       manager.setUnsupportedQueryType(true); // Setting same value again
//       assert.equal(manager.getUnsupportedQueryType(), true);

//       manager.setUnsupportedQueryType(false);
//       assert.equal(manager.getUnsupportedQueryType(), false);
//     });
//   });

//   describe("sliceOrderByItemsArray", () => {
//     beforeEach(() => {
//       manager = new ContinuationTokenManager(mockCollectionLink);
//     });

//     it("should handle undefined orderByItemsArray", () => {
//       manager.sliceOrderByItemsArray(5);
//       // Should not throw error when orderByItemsArray is undefined
//       assert.isUndefined(manager["orderByItemsArray"]);
//     });

//     it("should clear array when endIndex is 0", () => {
//       const orderByItems = [
//         [{ value: "item1", type: "string" }],
//         [{ value: "item2", type: "string" }],
//         [{ value: "item3", type: "string" }],
//       ];
//       manager.setOrderByItemsArray(orderByItems);

//       manager.sliceOrderByItemsArray(0);

//       assert.deepEqual(manager["orderByItemsArray"], []);
//     });

//     it("should clear array when endIndex exceeds array length", () => {
//       const orderByItems = [
//         [{ value: "item1", type: "string" }],
//         [{ value: "item2", type: "string" }],
//       ];
//       manager.setOrderByItemsArray(orderByItems);

//       manager.sliceOrderByItemsArray(5); // endIndex > array length

//       assert.deepEqual(manager["orderByItemsArray"], []);
//     });

//     it("should clear array when endIndex equals array length", () => {
//       const orderByItems = [
//         [{ value: "item1", type: "string" }],
//         [{ value: "item2", type: "string" }],
//       ];
//       manager.setOrderByItemsArray(orderByItems);

//       manager.sliceOrderByItemsArray(2); // endIndex = array length

//       assert.deepEqual(manager["orderByItemsArray"], []);
//     });

//     it("should slice array correctly when endIndex is within bounds", () => {
//       const orderByItems = [
//         [{ value: "item1", type: "string" }],
//         [{ value: "item2", type: "string" }],
//         [{ value: "item3", type: "string" }],
//         [{ value: "item4", type: "string" }],
//       ];
//       manager.setOrderByItemsArray(orderByItems);

//       manager.sliceOrderByItemsArray(2);

//       const expected = [[{ value: "item3", type: "string" }], [{ value: "item4", type: "string" }]];
//       assert.deepEqual(manager["orderByItemsArray"], expected);
//     });

//     it("should slice array correctly when endIndex is 1", () => {
//       const orderByItems = [
//         [{ value: "item1", type: "string" }],
//         [{ value: "item2", type: "string" }],
//         [{ value: "item3", type: "string" }],
//       ];
//       manager.setOrderByItemsArray(orderByItems);

//       manager.sliceOrderByItemsArray(1);

//       const expected = [[{ value: "item2", type: "string" }], [{ value: "item3", type: "string" }]];
//       assert.deepEqual(manager["orderByItemsArray"], expected);
//     });

//     it("should handle negative endIndex gracefully", () => {
//       const orderByItems = [
//         [{ value: "item1", type: "string" }],
//         [{ value: "item2", type: "string" }],
//       ];
//       manager.setOrderByItemsArray(orderByItems);

//       manager.sliceOrderByItemsArray(-1);

//       // Negative endIndex should behave like slice(-1), keeping the last element
//       const expected = [[{ value: "item2", type: "string" }]];
//       assert.deepEqual(manager["orderByItemsArray"], expected);
//     });

//     it("should handle empty array correctly", () => {
//       manager.setOrderByItemsArray([]);

//       manager.sliceOrderByItemsArray(1);

//       assert.deepEqual(manager["orderByItemsArray"], []);
//     });

//     it("should handle multiple slice operations", () => {
//       const orderByItems = [
//         [{ value: "item1", type: "string" }],
//         [{ value: "item2", type: "string" }],
//         [{ value: "item3", type: "string" }],
//         [{ value: "item4", type: "string" }],
//         [{ value: "item5", type: "string" }],
//       ];
//       manager.setOrderByItemsArray(orderByItems);

//       // First slice
//       manager.sliceOrderByItemsArray(2);
//       let expected = [
//         [{ value: "item3", type: "string" }],
//         [{ value: "item4", type: "string" }],
//         [{ value: "item5", type: "string" }],
//       ];
//       assert.deepEqual(manager["orderByItemsArray"], expected);

//       // Second slice
//       manager.sliceOrderByItemsArray(1);
//       expected = [[{ value: "item4", type: "string" }], [{ value: "item5", type: "string" }]];
//       assert.deepEqual(manager["orderByItemsArray"], expected);

//       // Third slice (clear)
//       manager.sliceOrderByItemsArray(0);
//       assert.deepEqual(manager["orderByItemsArray"], []);
//     });
//   });

//   describe("Integration Tests", () => {
//     it("should handle complex order by items array operations", () => {
//       manager = new ContinuationTokenManager(mockCollectionLink);

//       const complexOrderByItems = [
//         [
//           { value: "string1", type: "string" },
//           { value: 123, type: "number" },
//         ],
//         [{ value: null, type: "null" }],
//         [
//           { value: true, type: "boolean" },
//           { value: [1, 2, 3], type: "array" },
//         ],
//         [{ value: { nested: "object" }, type: "object" }],
//       ];

//       manager.setOrderByItemsArray(complexOrderByItems);
//       assert.deepEqual(manager["orderByItemsArray"], complexOrderByItems);

//       // Slice and verify
//       manager.sliceOrderByItemsArray(2);
//       const expected = [
//         [
//           { value: true, type: "boolean" },
//           { value: [1, 2, 3], type: "array" },
//         ],
//         [{ value: { nested: "object" }, type: "object" }],
//       ];
//       assert.deepEqual(manager["orderByItemsArray"], expected);
//     });
//   });

//   describe("Partition Range Handling", () => {
//     beforeEach(() => {
//       manager = new ContinuationTokenManager(mockCollectionLink, undefined, false);
//       // Set up initial ranges
//       manager["ranges"] = [
//         {
//           queryRange: new QueryRange("00", "50", true, false),
//           continuationToken: "token1",
//         },
//         {
//           queryRange: new QueryRange("50", "FF", true, false),
//           continuationToken: "token2",
//         },
//       ];
//     });

//     describe("handlePartitionRangeChanges", () => {
//       it("should return early when no range changes", () => {
//         const emptyUpdates = {};

//         manager.handlePartitionRangeChanges(emptyUpdates);

//         assert.equal(manager["ranges"].length, 2);
//       });

//       it("should process range merge scenario", () => {
//         const rangeUpdates = {
//           "00-50": {
//             oldRange: { minInclusive: "00", maxExclusive: "50" },
//             newRanges: [{ minInclusive: "00", maxExclusive: "60" }],
//             continuationToken: "merged-token",
//           },
//         };

//         manager.handlePartitionRangeChanges(rangeUpdates);

//         assert.equal(manager["ranges"][0].queryRange.min, "00");
//         assert.equal(manager["ranges"][0].queryRange.max, "60");
//         assert.equal(manager["ranges"][0].continuationToken, "merged-token");
//         assert.equal(manager["ranges"].length, 2);
//       });

//       it("should process range split scenario", () => {
//         const rangeUpdates = {
//           "00-50": {
//             oldRange: { minInclusive: "00", maxExclusive: "50" },
//             newRanges: [
//               { minInclusive: "00", maxExclusive: "25" },
//               { minInclusive: "25", maxExclusive: "50" },
//             ],
//             continuationToken: "split-token",
//           },
//         };

//         manager.handlePartitionRangeChanges(rangeUpdates);

//         assert.equal(manager["ranges"].length, 3);

//         const newRanges = manager["ranges"].filter((r) => r.continuationToken === "split-token");
//         assert.equal(newRanges.length, 2);
//         assert.equal(newRanges[0].queryRange.min, "00");
//         assert.equal(newRanges[0].queryRange.max, "25");
//         assert.equal(newRanges[1].queryRange.min, "25");
//         assert.equal(newRanges[1].queryRange.max, "50");
//       });
//     });

//     describe("Range Merge", () => {
//       it("should update existing range when found", () => {
//         const oldRange = { minInclusive: "00", maxExclusive: "50" };
//         const newRange = { minInclusive: "00", maxExclusive: "75" };
//         const continuationToken = "new-merge-token";

//         manager["handleRangeMerge"](oldRange, newRange, continuationToken);

//         const updatedRange = manager["ranges"][0];
//         assert.equal(updatedRange.queryRange.min, "00");
//         assert.equal(updatedRange.queryRange.max, "75");
//         assert.equal(updatedRange.continuationToken, "new-merge-token");
//         assert.isTrue(updatedRange.queryRange.isMinInclusive);
//         assert.isFalse(updatedRange.queryRange.isMaxInclusive);
//       });

//       it("should do nothing when range not found", () => {
//         const oldRange = { minInclusive: "AA", maxExclusive: "BB" };
//         const newRange = { minInclusive: "AA", maxExclusive: "CC" };
//         const continuationToken = "test-token";

//         const originalLength = manager["ranges"].length;
//         const originalRanges = [...manager["ranges"]];

//         manager["handleRangeMerge"](oldRange, newRange, continuationToken);

//         assert.equal(manager["ranges"].length, originalLength);
//         assert.deepEqual(manager["ranges"], originalRanges);
//       });
//     });

//     describe("Range Split", () => {
//       it("should replace one range with multiple ranges", () => {
//         const oldRange = { minInclusive: "50", maxExclusive: "FF" };
//         const newRanges = [
//           { minInclusive: "50", maxExclusive: "AA" },
//           { minInclusive: "AA", maxExclusive: "FF" },
//         ];
//         const continuationToken = "split-token";

//         manager["handleRangeSplit"](oldRange, newRanges, continuationToken);

//         assert.equal(manager["ranges"].length, 3);

//         const oldRangeExists = manager["ranges"].some(
//           (r) =>
//             r.queryRange.min === "50" &&
//             r.queryRange.max === "FF" &&
//             r.continuationToken === "token2",
//         );
//         assert.isFalse(oldRangeExists);

//         const splitRanges = manager["ranges"].filter((r) => r.continuationToken === "split-token");
//         assert.equal(splitRanges.length, 2);
//         assert.equal(splitRanges[0].queryRange.min, "50");
//         assert.equal(splitRanges[0].queryRange.max, "AA");
//         assert.equal(splitRanges[1].queryRange.min, "AA");
//         assert.equal(splitRanges[1].queryRange.max, "FF");
//       });
//     });

//     describe("createNewRangeMapping", () => {
//       it("should create new range mapping with correct properties", () => {
//         const partitionKeyRange = { minInclusive: "AA", maxExclusive: "BB" };
//         const continuationToken = "new-range-token";
//         const originalLength = manager["ranges"].length;

//         manager["createNewRangeMapping"](partitionKeyRange, continuationToken);

//         assert.equal(manager["ranges"].length, originalLength + 1);

//         const newRange = manager["ranges"][manager["ranges"].length - 1];
//         assert.equal(newRange.queryRange.min, "AA");
//         assert.equal(newRange.queryRange.max, "BB");
//         assert.equal(newRange.continuationToken, "new-range-token");
//         assert.isTrue(newRange.queryRange.isMinInclusive);
//         assert.isFalse(newRange.queryRange.isMaxInclusive);
//       });

//       it("should handle null continuation token", () => {
//         const partitionKeyRange = { minInclusive: "CC", maxExclusive: "DD" };
//         const continuationToken = null;

//         manager["createNewRangeMapping"](partitionKeyRange, continuationToken);

//         const newRange = manager["ranges"][manager["ranges"].length - 1];
//         assert.isNull(newRange.continuationToken);
//         assert.equal(newRange.queryRange.min, "CC");
//         assert.equal(newRange.queryRange.max, "DD");
//       });
//     });
//   });

//   describe("processRangesForCurrentPage", () => {
//     beforeEach(() => {
//       manager = new ContinuationTokenManager(mockCollectionLink, undefined, false);
//       // Mock the partition range manager and its methods
//       manager["partitionRangeManager"] = {
//         processOrderByRanges: vitest.fn(),
//         processParallelRanges: vitest.fn(),
//         hasUnprocessedRanges: vitest.fn(),
//         removePartitionRangeMapping: vitest.fn(),
//       } as any;
//     });

//     describe("removeExhaustedRangesFromRanges", () => {
//       it("should remove ranges with null continuation tokens", () => {
//         manager["ranges"] = [
//           { queryRange: new QueryRange("00", "50", true, false), continuationToken: "token1" },
//           { queryRange: new QueryRange("50", "AA", true, false), continuationToken: null },
//           { queryRange: new QueryRange("AA", "FF", true, false), continuationToken: "token3" },
//         ];

//         manager["removeExhaustedRangesFromRanges"]();

//         assert.equal(manager["ranges"].length, 2);
//         assert.equal(manager["ranges"][0].continuationToken, "token1");
//         assert.equal(manager["ranges"][1].continuationToken, "token3");
//       });

//       it("should remove ranges with empty string continuation tokens", () => {
//         manager["ranges"] = [
//           { queryRange: new QueryRange("00", "50", true, false), continuationToken: "token1" },
//           { queryRange: new QueryRange("50", "AA", true, false), continuationToken: "" },
//           { queryRange: new QueryRange("AA", "FF", true, false), continuationToken: "null" },
//         ];

//         manager["removeExhaustedRangesFromRanges"]();

//         assert.equal(manager["ranges"].length, 1);
//         assert.equal(manager["ranges"][0].continuationToken, "token1");
//       });

//       it("should handle undefined ranges array", () => {
//         manager["ranges"] = undefined as any;
//         manager["removeExhaustedRangesFromRanges"]();
//         // Should not throw error
//         assert.isUndefined(manager["ranges"]);
//       });

//       it("should handle null mappings in ranges array", () => {
//         manager["ranges"] = [
//           { queryRange: new QueryRange("00", "50", true, false), continuationToken: "token1" },
//           null as any,
//           { queryRange: new QueryRange("AA", "FF", true, false), continuationToken: "token3" },
//         ];

//         manager["removeExhaustedRangesFromRanges"]();

//         assert.equal(manager["ranges"].length, 2);
//         assert.equal(manager["ranges"][0].continuationToken, "token1");
//         assert.equal(manager["ranges"][1].continuationToken, "token3");
//       });
//     });

//     describe("Parallel Query Processing", () => {
//       beforeEach(() => {
//         manager = new ContinuationTokenManager(mockCollectionLink, undefined, false);
//         manager["partitionRangeManager"].processParallelRanges = vitest.fn().mockReturnValue({
//           endIndex: 5,
//           processedRanges: ["range1", "range2"],
//           processedRangeMappings: [
//             {
//               queryRange: new QueryRange("00", "50", true, false),
//               continuationToken: "token1",
//               itemCount: 3,
//             },
//           ],
//           lastPartitionBeforeCutoff: {
//             mapping: { offset: 10, limit: 20 },
//           },
//         });
//       });

//       it("should process parallel ranges correctly", () => {
//         const result = manager.processRangesForCurrentPage(10);

//         assert.equal(result.endIndex, 5);
//         assert.deepEqual(result.processedRanges, ["range1", "range2"]);
//         expect(manager["partitionRangeManager"].processParallelRanges).toHaveBeenCalledWith(10);
//       });

//       it("should create new composite continuation token when none exists", () => {
//         manager.processRangesForCurrentPage(10);

//         assert.isDefined(manager["compositeContinuationToken"]);
//         assert.equal(manager["compositeContinuationToken"].rid, mockCollectionLink);
//         assert.equal(manager["compositeContinuationToken"].offset, 10);
//         assert.equal(manager["compositeContinuationToken"].limit, 20);
//       });

//       it("should update existing composite continuation token", () => {
//         // Pre-create composite token
//         const mockRangeMappings = createMockRangeMappings();
//         manager["compositeContinuationToken"] = createCompositeQueryContinuationToken(
//           mockCollectionLink,
//           mockRangeMappings,
//           5,
//           15,
//         );

//         manager.processRangesForCurrentPage(10);

//         assert.equal(manager["compositeContinuationToken"].offset, 10);
//         assert.equal(manager["compositeContinuationToken"].limit, 20);
//       });
//     });

//     describe("ORDER BY Query Processing", () => {
//       beforeEach(() => {
//         manager = new ContinuationTokenManager(mockCollectionLink, undefined, true);
//         manager["partitionRangeManager"].processOrderByRanges = vitest.fn().mockReturnValue({
//           endIndex: 3,
//           processedRanges: ["range1"],
//           lastRangeBeforePageLimit: {
//             queryRange: new QueryRange("00", "50", true, false),
//             continuationToken: "token1",
//             itemCount: 2,
//             offset: 5,
//             limit: 15,
//             hashedLastResult: "hash123",
//           },
//         });
//       });

//       it("should process ORDER BY ranges correctly", () => {
//         const pageResults = [
//           { _rid: "doc1", value: "test1" },
//           { _rid: "doc2", value: "test2" },
//           { _rid: "doc3", value: "test3" },
//         ];

//         manager.setOrderByItemsArray([
//           [{ value: "item1", type: "string" }],
//           [{ value: "item2", type: "string" }],
//           [{ value: "item3", type: "string" }],
//         ]);

//         const result = manager.processRangesForCurrentPage(10, pageResults);

//         assert.equal(result.endIndex, 3);
//         assert.deepEqual(result.processedRanges, ["range1"]);
//         expect(manager["partitionRangeManager"].processOrderByRanges).toHaveBeenCalledWith(10);
//       });

//       it("should create ORDER BY continuation token with document RID and skip count", () => {
//         const pageResults = [
//           { _rid: "doc1", value: "test1" },
//           { _rid: "doc2", value: "test2" },
//           { _rid: "doc2", value: "test2_duplicate" }, // Same RID for JOIN scenario
//         ];

//         manager.setOrderByItemsArray([
//           [{ value: "item1", type: "string" }],
//           [{ value: "item2", type: "string" }],
//           [{ value: "item3", type: "string" }],
//         ]);

//         manager.processRangesForCurrentPage(10, pageResults);

//         assert.isDefined(manager["orderByQueryContinuationToken"]);
//         assert.equal(manager["orderByQueryContinuationToken"].documentRid, "doc2");
//         assert.equal(manager["orderByQueryContinuationToken"].skipCount, 1); // Excluding last document
//         assert.equal(manager["orderByQueryContinuationToken"].offset, 5);
//         assert.equal(manager["orderByQueryContinuationToken"].limit, 15);
//         assert.equal(manager["orderByQueryContinuationToken"].hashedLastResult, "hash123");
//       });

//       it("should handle empty page results", () => {
//         manager["partitionRangeManager"].processOrderByRanges = vitest.fn().mockReturnValue({
//           endIndex: 0,
//           processedRanges: [],
//           lastRangeBeforePageLimit: null,
//         });

//         const result = manager.processRangesForCurrentPage(10, []);

//         assert.equal(result.endIndex, 0);
//         assert.deepEqual(result.processedRanges, []);
//       });

//       it("should handle missing ORDER BY items array", () => {
//         const pageResults = [{ _rid: "doc1", value: "test1" }];

//         const result = manager.processRangesForCurrentPage(10, pageResults);

//         assert.equal(result.endIndex, 3);
//         assert.isDefined(manager["orderByQueryContinuationToken"]);
//       });
//       // A page cannot exist without Rid in cosmos db
//       it("should handle page results without RID", () => {
//         const pageResults = [{ value: "test1" }, { value: "test2" }];

//         manager.setOrderByItemsArray([
//           [{ value: "item1", type: "string" }],
//           [{ value: "item2", type: "string" }],
//         ]);

//         manager.processRangesForCurrentPage(10, pageResults);

//         assert.isDefined(manager["orderByQueryContinuationToken"]);
//         assert.isUndefined(manager["orderByQueryContinuationToken"].documentRid);
//         assert.equal(manager["orderByQueryContinuationToken"].skipCount, 0);
//       });

//       it("should handle no last range before page limit", () => {
//         manager["partitionRangeManager"].processOrderByRanges = vitest.fn().mockReturnValue({
//           endIndex: 2,
//           processedRanges: ["range1"],
//           lastRangeBeforePageLimit: null,
//         });

//         const pageResults = [{ _rid: "doc1", value: "test1" }];

//         manager.processRangesForCurrentPage(10, pageResults);

//         assert.isDefined(manager["orderByQueryContinuationToken"]);
//         assert.equal(manager["orderByQueryContinuationToken"].rangeMappings.length, 0);
//       });
//     });

//     describe("Exhausted Range Removal Integration", () => {
//       it("should remove exhausted ranges before processing", () => {
//         manager["ranges"] = [
//           { queryRange: new QueryRange("00", "50", true, false), continuationToken: "token1" },
//           { queryRange: new QueryRange("50", "AA", true, false), continuationToken: null },
//           { queryRange: new QueryRange("AA", "FF", true, false), continuationToken: "" },
//         ];

//         manager["partitionRangeManager"].processParallelRanges = vitest.fn().mockReturnValue({
//           endIndex: 2,
//           processedRanges: ["range1"],
//           processedRangeMappings: [],
//           lastPartitionBeforeCutoff: null,
//         });

//         manager.processRangesForCurrentPage(10);

//         // Should have removed exhausted ranges
//         assert.equal(manager["ranges"].length, 1);
//         assert.equal(manager["ranges"][0].continuationToken, "token1");
//       });
//     });
//   });
// });
