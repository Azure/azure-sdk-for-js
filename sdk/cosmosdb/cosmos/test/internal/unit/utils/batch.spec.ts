// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { Constants } from "../../../../src";
import {
  Batch,
  BulkOperationType,
  calculateObjectSizeInBytes,
  Operation,
  splitBatchBasedOnBodySize,
} from "../../../../src/utils/batch";

const operationSkeleton: Operation = {
  operationType: BulkOperationType.Create,
  resourceBody: {
    value: "",
  },
};

const constantSize = calculateObjectSizeInBytes(operationSkeleton);

export function generateOperationOfSize(
  sizeInBytes: number,
  attributes?: unknown,
  partitionKey?: { [P in string]: unknown }
): Operation {
  if (sizeInBytes < constantSize) {
    throw new Error(`Not possible to generate operation of size less than ${constantSize}`);
  }
  let sizeToAdd = sizeInBytes - constantSize;
  if (partitionKey !== undefined) {
    sizeToAdd -= calculateObjectSizeInBytes({ partitionKey }) + calculateObjectSizeInBytes({});
  }
  return {
    ...(attributes as any),
    operationType: BulkOperationType.Create,
    resourceBody: {
      value: new Array(sizeToAdd + 1).join("a"),
      ...partitionKey,
    },
  };
}

describe("Test batch split based on size", function () {
  type BatchSplitTestCase = {
    inputOperationDescription: {
      operationSize: number;
      index: number;
    }[];
    resultingBatchDescription: {
      resultingBatchLength: number;
      resultingOperationsLengths: number[];
    };
  };

  function runBatchSplitTestCase(t: BatchSplitTestCase): void {
    const inputBatch: Batch = {
      operations: t.inputOperationDescription.map((op) =>
        generateOperationOfSize(Math.floor(op.operationSize))
      ),
      min: "",
      max: "",
      rangeId: "",
      indexes: t.inputOperationDescription.map((op) => op.index),
    };
    const processedBatches: Batch[] = splitBatchBasedOnBodySize(inputBatch);
    assert.strictEqual(
      processedBatches.length,
      t.resultingBatchDescription.resultingBatchLength,
      `Should have split into ${t.resultingBatchDescription.resultingBatchLength} batch.`
    );
    t.resultingBatchDescription.resultingOperationsLengths.forEach((op, index) =>
      assert.strictEqual(
        processedBatches[index].operations.length,
        op,
        `${index}th batch should have ${processedBatches[index].operations.length} operations.`
      )
    );
  }

  it("For An empty batch, empty batch should be returned", function () {
    runBatchSplitTestCase({
      inputOperationDescription: [],
      resultingBatchDescription: {
        resultingBatchLength: 0,
        resultingOperationsLengths: [],
      },
    });
  });

  it("If all operations are cumulatively less than DefaultMaxBulkRequestBodySizeInBytes, Batch should not split", function () {
    runBatchSplitTestCase({
      inputOperationDescription: [...Array(20).keys()].map((index) => ({
        operationSize: Constants.DefaultMaxBulkRequestBodySizeInBytes / 100,
        index: index,
      })),
      resultingBatchDescription: {
        resultingBatchLength: 1,
        resultingOperationsLengths: [20],
      },
    });
  });
  it("20 operations with each 1/2 size of DefaultMaxBulkRequestBodySizeInBytes, should split in 10 batches.", function () {
    runBatchSplitTestCase({
      inputOperationDescription: [...Array(20).keys()].map((index) => ({
        operationSize: Constants.DefaultMaxBulkRequestBodySizeInBytes / 2,
        index: index,
      })),
      resultingBatchDescription: {
        resultingBatchLength: 10,
        resultingOperationsLengths: [...Array(10).keys()].map(() => 2),
      },
    });
  });
  it("20 operations with each 1/3 size of DefaultMaxBulkRequestBodySizeInBytes, should split in 6 batches.", function () {
    runBatchSplitTestCase({
      inputOperationDescription: [...Array(20).keys()].map((index) => ({
        operationSize: Constants.DefaultMaxBulkRequestBodySizeInBytes / 3,
        index: index,
      })),
      resultingBatchDescription: {
        resultingBatchLength: 7,
        resultingOperationsLengths: [...[...Array(6).keys()].map(() => 3), 2],
      },
    });
  });
  it("If an single operation is bigger than DefaultMaxBulkRequestBodySizeInBytes, it should be part of a Batch containing only that operation.", function () {
    runBatchSplitTestCase({
      inputOperationDescription: [...Array(2).keys()].map((index) => ({
        operationSize: Constants.DefaultMaxBulkRequestBodySizeInBytes + 1,
        index: index,
      })),
      resultingBatchDescription: {
        resultingBatchLength: 2,
        resultingOperationsLengths: [1, 1],
      },
    });
  });
});
