import assert from "assert";
import { Constants } from "../../common";
import {
  ClientSideMetrics,
  QueryMetrics,
  QueryPreparationTimes,
  RuntimeExecutionTimes,
  TimeSpan
} from "../../queryMetrics";

describe("QueryMetrics", function() {
  // Properties
  const totalQueryExecutionTime = TimeSpan.fromMilliseconds(33.67);
  const queryCompilationTime = TimeSpan.fromMilliseconds(0.06);
  const logicalPlanBuildTime = TimeSpan.fromMilliseconds(0.02);
  const physicalPlanBuildTime = TimeSpan.fromMilliseconds(0.1);
  const queryOptimizationTime = TimeSpan.fromMilliseconds(0.01);
  const vmExecutionTime = TimeSpan.fromMilliseconds(32.56);
  const indexLookupTime = TimeSpan.fromMilliseconds(0.36);
  const documentLoadTime = TimeSpan.fromMilliseconds(9.58);
  const systemFunctionExecutionTime = TimeSpan.fromMilliseconds(0.05);
  const userDefinedFunctionExecutionTime = TimeSpan.fromMilliseconds(0.07);
  const documentWriteTime = TimeSpan.fromMilliseconds(18.1);
  const retrievedDocumentCount = 2000;
  const retrievedDocumentSize = 1125600;
  const outputDocumentCount = 2000;
  const outputDocumentSize = 1125600;
  const indexUtilizationRatio = 1.0;
  const requestCharge = 42;

  const delimitedString =
    "totalExecutionTimeInMs=33.67;queryCompileTimeInMs=0.06;queryLogicalPlanBuildTimeInMs=0.02;queryPhysicalPlanBuildTimeInMs=0.10;queryOptimizationTimeInMs=0.01;VMExecutionTimeInMs=32.56;indexLookupTimeInMs=0.36;documentLoadTimeInMs=9.58;systemFunctionExecuteTimeInMs=0.05;userFunctionExecuteTimeInMs=0.07;retrievedDocumentCount=2000;retrievedDocumentSize=1125600;outputDocumentCount=2000;outputDocumentSize=1125600;writeOutputTimeInMs=18.10;indexUtilizationRatio=1.00";

  const queryEngineExecutionTime = TimeSpan.zero
    .add(vmExecutionTime)
    .subtract(indexLookupTime)
    .subtract(documentLoadTime)
    .subtract(documentWriteTime);

  // Base line query metrics
  const queryMetrics = new QueryMetrics(
    retrievedDocumentCount,
    retrievedDocumentSize,
    outputDocumentCount,
    outputDocumentSize,
    indexUtilizationRatio * retrievedDocumentCount,
    totalQueryExecutionTime,
    new QueryPreparationTimes(queryCompilationTime, logicalPlanBuildTime, physicalPlanBuildTime, queryOptimizationTime),
    indexLookupTime,
    documentLoadTime,
    vmExecutionTime,
    new RuntimeExecutionTimes(queryEngineExecutionTime, systemFunctionExecutionTime, userDefinedFunctionExecutionTime),
    documentWriteTime,
    new ClientSideMetrics(requestCharge)
  );

  const assertQueryMetricsEquality = function(queryMetrics1: QueryMetrics, queryMetrics2: QueryMetrics) {
    assert.deepEqual(queryMetrics1.indexHitRatio, queryMetrics2.indexHitRatio);
    assert.deepEqual(queryMetrics1.outputDocumentCount, queryMetrics2.outputDocumentCount);
    assert.deepEqual(queryMetrics1.outputDocumentSize, queryMetrics2.outputDocumentSize);
    assert.deepEqual(queryMetrics1.retrievedDocumentCount, queryMetrics2.retrievedDocumentCount);
    assert.deepEqual(queryMetrics1.retrievedDocumentSize, queryMetrics2.retrievedDocumentSize);
    assert.deepEqual(queryMetrics1.totalQueryExecutionTime, queryMetrics2.totalQueryExecutionTime);

    assert.deepEqual(queryMetrics1.documentLoadTime, queryMetrics2.documentLoadTime);
    assert.deepEqual(queryMetrics1.documentWriteTime, queryMetrics2.documentWriteTime);
    assert.deepEqual(queryMetrics1.indexLookupTime, queryMetrics2.indexLookupTime);
    assert.deepEqual(queryMetrics1.vmExecutionTime, queryMetrics2.vmExecutionTime);

    assert.deepEqual(
      queryMetrics1.queryPreparationTimes.logicalPlanBuildTime,
      queryMetrics2.queryPreparationTimes.logicalPlanBuildTime
    );
    assert.deepEqual(
      queryMetrics1.queryPreparationTimes.physicalPlanBuildTime,
      queryMetrics2.queryPreparationTimes.physicalPlanBuildTime
    );
    assert.deepEqual(
      queryMetrics1.queryPreparationTimes.queryCompilationTime,
      queryMetrics2.queryPreparationTimes.queryCompilationTime
    );
    assert.deepEqual(
      queryMetrics1.queryPreparationTimes.queryOptimizationTime,
      queryMetrics2.queryPreparationTimes.queryOptimizationTime
    );

    assert.deepEqual(
      queryMetrics1.runtimeExecutionTimes.queryEngineExecutionTime,
      queryMetrics2.runtimeExecutionTimes.queryEngineExecutionTime
    );
    assert.deepEqual(
      queryMetrics1.runtimeExecutionTimes.systemFunctionExecutionTime,
      queryMetrics2.runtimeExecutionTimes.systemFunctionExecutionTime
    );
    assert.deepEqual(
      queryMetrics1.runtimeExecutionTimes.userDefinedFunctionExecutionTime,
      queryMetrics2.runtimeExecutionTimes.userDefinedFunctionExecutionTime
    );

    assert.deepEqual(queryMetrics1.clientSideMetrics.requestCharge, queryMetrics2.clientSideMetrics.requestCharge);
  };

  it("Can Be Cloned", function() {
    const queryMetrics2 = new QueryMetrics(
      queryMetrics.retrievedDocumentCount,
      queryMetrics.retrievedDocumentSize,
      queryMetrics.outputDocumentCount,
      queryMetrics.outputDocumentSize,
      queryMetrics.indexHitDocumentCount,
      queryMetrics.totalQueryExecutionTime,
      queryMetrics.queryPreparationTimes,
      queryMetrics.indexLookupTime,
      queryMetrics.documentLoadTime,
      queryMetrics.vmExecutionTime,
      queryMetrics.runtimeExecutionTimes,
      queryMetrics.documentWriteTime,
      queryMetrics.clientSideMetrics
    );

    assertQueryMetricsEquality(queryMetrics, queryMetrics2);
  });

  it("Should Add Two Query Metrics", function() {
    const doubleQueryMetrics = queryMetrics.add([queryMetrics]);

    const doubleRetrievedDocumentCount = retrievedDocumentCount * 2;
    const doubleRetrievedDocumentSize = retrievedDocumentSize * 2;
    const doubleOutputDocumentCount = outputDocumentCount * 2;
    const doubleOutputDocumentSize = outputDocumentSize * 2;
    const doubleIndexHitCount = indexUtilizationRatio * retrievedDocumentCount * 2;
    const doubleTotalQueryExecutionTime = TimeSpan.fromMilliseconds(totalQueryExecutionTime.totalMilliseconds() * 2);
    const doubleQueryCompilationTime = TimeSpan.fromMilliseconds(queryCompilationTime.totalMilliseconds() * 2);
    const doubleLogicalPlanBuildTime = TimeSpan.fromMilliseconds(logicalPlanBuildTime.totalMilliseconds() * 2);
    const doublePhysicalPlanBuildTime = TimeSpan.fromMilliseconds(physicalPlanBuildTime.totalMilliseconds() * 2);
    const doubleIndexLookupTime = TimeSpan.fromMilliseconds(indexLookupTime.totalMilliseconds() * 2);
    const doubleDocumentLoadTime = TimeSpan.fromMilliseconds(documentLoadTime.totalMilliseconds() * 2);
    const doubleVMExecutionTime = TimeSpan.fromMilliseconds(vmExecutionTime.totalMilliseconds() * 2);
    const doubleQueryOptimizationTime = TimeSpan.fromMilliseconds(queryOptimizationTime.totalMilliseconds() * 2);
    const doubleQueryEngineExecutionTime = TimeSpan.fromMilliseconds(queryEngineExecutionTime.totalMilliseconds() * 2);
    const doubleSystemFunctionExecutionTime = TimeSpan.fromMilliseconds(
      systemFunctionExecutionTime.totalMilliseconds() * 2
    );
    const doubleUserDefinedFunctionExecutionTime = TimeSpan.fromMilliseconds(
      userDefinedFunctionExecutionTime.totalMilliseconds() * 2
    );
    const doubleDocumentWriteTime = TimeSpan.fromMilliseconds(documentWriteTime.totalMilliseconds() * 2);
    const doubleRequestCharge = requestCharge * 2;

    const expectedQueryMetrics = new QueryMetrics(
      doubleRetrievedDocumentCount,
      doubleRetrievedDocumentSize,
      doubleOutputDocumentCount,
      doubleOutputDocumentSize,
      doubleIndexHitCount,
      doubleTotalQueryExecutionTime,
      new QueryPreparationTimes(
        doubleQueryCompilationTime,
        doubleLogicalPlanBuildTime,
        doublePhysicalPlanBuildTime,
        doubleQueryOptimizationTime
      ),
      doubleIndexLookupTime,
      doubleDocumentLoadTime,
      doubleVMExecutionTime,
      new RuntimeExecutionTimes(
        doubleQueryEngineExecutionTime,
        doubleSystemFunctionExecutionTime,
        doubleUserDefinedFunctionExecutionTime
      ),
      doubleDocumentWriteTime,
      new ClientSideMetrics(doubleRequestCharge)
    );

    assertQueryMetricsEquality(doubleQueryMetrics, expectedQueryMetrics);

    const queryMetricsFromCreateArray = QueryMetrics.createFromArray([queryMetrics, queryMetrics]);

    assertQueryMetricsEquality(queryMetricsFromCreateArray, expectedQueryMetrics);
  });

  it("Can Be Create From Delimited String", function() {
    const queryMetricsFromDelimitedString = QueryMetrics.createFromDelimitedString(
      delimitedString,
      new ClientSideMetrics(requestCharge)
    );

    assertQueryMetricsEquality(queryMetricsFromDelimitedString, queryMetrics);
  });

  it("Can Be Converted To A Delimited String", function() {
    const delimitedStringFromMetrics = queryMetrics.toDelimitedString();
    const queryMetricsFromDelimitedString = QueryMetrics.createFromDelimitedString(
      delimitedStringFromMetrics,
      new ClientSideMetrics(requestCharge)
    );

    assertQueryMetricsEquality(queryMetrics, queryMetricsFromDelimitedString);
  });
});
