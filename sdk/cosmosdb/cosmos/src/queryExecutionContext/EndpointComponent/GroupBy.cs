//------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//------------------------------------------------------------
namespace Microsoft.Azure.Cosmos.Query.ExecutionComponent
{
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Threading;
  using System.Threading.Tasks;
  using Microsoft.Azure.Cosmos.CosmosElements;

  /// <summary>
  /// Query execution component that groups groupings across continuations and pages.
  /// The general idea is a query gets rewritten from this:
  /// 
  /// SELECT c.team, c.name, COUNT(1) AS count
  /// FROM c
  /// GROUP BY c.team, c.name
  /// 
  /// To this:
  /// 
  /// SELECT 
  ///     [{"item": c.team}, {"item": c.name}] AS groupByItems, 
  ///     {"team": c.team, "name": c.name, "count": {"item": COUNT(1)}} AS payload
  /// FROM c
  /// GROUP BY c.team, c.name
  /// 
  /// With the following dictionary:
  /// 
  /// {
  ///     "team": null,
  ///     "name": null,
  ///     "count" COUNT
  /// }
  /// 
  /// So we know how to aggregate each column. 
  /// At the end the columns are stitched together to make the grouped document.
  /// </summary>
  internal sealed class GroupByDocumentQueryExecutionComponent : DocumentQueryExecutionComponentBase
  {
    public const string ContinuationTokenNotSupportedWithGroupBy = "Continuation token is not supported for queries with GROUP BY. Do not use FeedResponse.ResponseContinuation or remove the GROUP BY from the query.";
    private static readonly List<CosmosElement> EmptyResults = new List<CosmosElement>();
    private static readonly Dictionary<string, QueryMetrics> EmptyQueryMetrics = new Dictionary<string, QueryMetrics>();
    private static readonly AggregateOperator[] EmptyAggregateOperators = new AggregateOperator[] { };

    private readonly IReadOnlyDictionary<string, AggregateOperator?> groupByAliasToAggregateType;
    private readonly Dictionary<UInt192, SingleGroupAggregator> groupingTable;
    private readonly DistinctMap distinctMap;
    private readonly bool hasSelectValue;

    private int numPagesDrainedFromGroupingTable;
    private bool isDone;

    private GroupByDocumentQueryExecutionComponent(
        IReadOnlyDictionary<string, AggregateOperator?> groupByAliasToAggregateType,
        bool hasSelectValue,
        IDocumentQueryExecutionComponent source)
        : base(source)
    {
      if (groupByAliasToAggregateType == null)
      {
        throw new ArgumentNullException(nameof(groupByAliasToAggregateType));
      }

      this.groupingTable = new Dictionary<UInt192, SingleGroupAggregator>();

      // Using an ordered distinct map to get hashes.
      this.distinctMap = DistinctMap.Create(DistinctQueryType.Ordered, null);
      this.groupByAliasToAggregateType = groupByAliasToAggregateType;
      this.hasSelectValue = hasSelectValue;
    }

    public override bool IsDone => this.isDone;

    public static async Task<IDocumentQueryExecutionComponent> CreateAsync(
        string requestContinuation,
        Func<string, Task<IDocumentQueryExecutionComponent>> createSourceCallback,
        IReadOnlyDictionary<string, AggregateOperator?> groupByAliasToAggregateType,
        bool hasSelectValue)
    {
      // We do not support continuation tokens for GROUP BY.
      return new GroupByDocumentQueryExecutionComponent(
          groupByAliasToAggregateType,
          hasSelectValue,
          await createSourceCallback(requestContinuation));
    }

    public override async Task<QueryResponseCore> DrainAsync(
        int maxElements,
        CancellationToken cancellationToken)
    {
      cancellationToken.ThrowIfCancellationRequested();

      // Draining GROUP BY is broken down into two stages:
      QueryResponseCore response;
      if (!this.Source.IsDone)
      {
        // Stage 1: 
        // Drain the groupings fully from all continuation and all partitions
        QueryResponseCore sourceResponse = await base.DrainAsync(int.MaxValue, cancellationToken);
        if (!sourceResponse.IsSuccess)
        {
          return sourceResponse;
        }

        foreach (CosmosElement result in sourceResponse.CosmosElements)
        {
          // Aggregate the values for all groupings across all continuations.
          RewrittenGroupByProjection groupByItem = new RewrittenGroupByProjection(result);
          this.distinctMap.Add(groupByItem.GroupByItems, out UInt192? groupByKeysHash);
          if (!groupByKeysHash.HasValue)
          {
            throw new InvalidOperationException("hash invariant was broken");
          }

          if (!this.groupingTable.TryGetValue(groupByKeysHash.Value, out SingleGroupAggregator singleGroupAggregator))
          {
            singleGroupAggregator = SingleGroupAggregator.Create(
                EmptyAggregateOperators,
                this.groupByAliasToAggregateType,
                this.hasSelectValue);
            this.groupingTable[groupByKeysHash.Value] = singleGroupAggregator;
          }

          CosmosElement payload = groupByItem.Payload;
          singleGroupAggregator.AddValues(payload);
        }

        // We need to give empty pages until the results are fully drained.
        response = QueryResponseCore.CreateSuccess(
            result: EmptyResults,
            continuationToken: null,
            disallowContinuationTokenMessage: GroupByDocumentQueryExecutionComponent.ContinuationTokenNotSupportedWithGroupBy,
            activityId: sourceResponse.ActivityId,
            requestCharge: sourceResponse.RequestCharge,
            queryMetricsText: sourceResponse.QueryMetricsText,
            queryMetrics: sourceResponse.QueryMetrics,
            requestStatistics: sourceResponse.RequestStatistics,
            responseLengthBytes: sourceResponse.ResponseLengthBytes);

        this.isDone = false;
      }
      else
      {
        // Stage 2:
        // Emit the results from the grouping table page by page
        IEnumerable<SingleGroupAggregator> groupByValuesList = this.groupingTable
            .OrderBy(kvp => kvp.Key)
            .Skip(this.numPagesDrainedFromGroupingTable * maxElements)
            .Take(maxElements)
            .Select(kvp => kvp.Value);

        List<CosmosElement> results = new List<CosmosElement>();
        foreach (SingleGroupAggregator groupByValues in groupByValuesList)
        {
          results.Add(groupByValues.GetResult());
        }

        response = QueryResponseCore.CreateSuccess(
           result: results,
           continuationToken: null,
           disallowContinuationTokenMessage: GroupByDocumentQueryExecutionComponent.ContinuationTokenNotSupportedWithGroupBy,
           activityId: null,
           requestCharge: 0,
           queryMetricsText: null,
           queryMetrics: EmptyQueryMetrics,
           requestStatistics: null,
           responseLengthBytes: 0);

        this.numPagesDrainedFromGroupingTable++;
        if (this.numPagesDrainedFromGroupingTable * maxElements >= this.groupingTable.Count)
        {
          this.isDone = true;
        }
      }

      return response;
    }

    /// <summary>
    /// When a group by query gets rewritten the projection looks like:
    /// 
    /// SELECT 
    ///     [{"item": c.age}, {"item": c.name}] AS groupByItems, 
    ///     {"age": c.age, "name": c.name} AS payload
    /// 
    /// This struct just lets us easily access the "groupByItems" and "payload" property.
    /// </summary>
    private struct RewrittenGroupByProjection
    {
      private const string GroupByItemsPropertyName = "groupByItems";
      private const string PayloadPropertyName = "payload";

      private readonly CosmosObject cosmosObject;

      public RewrittenGroupByProjection(CosmosElement cosmosElement)
      {
        if (cosmosElement == null)
        {
          throw new ArgumentNullException(nameof(cosmosElement));
        }

        if (!(cosmosElement is CosmosObject cosmosObject))
        {
          throw new ArgumentException($"{nameof(cosmosElement)} must not be an object.");
        }

        this.cosmosObject = cosmosObject;
      }

      public CosmosArray GroupByItems
      {
        get
        {
          if (!this.cosmosObject.TryGetValue(GroupByItemsPropertyName, out CosmosElement cosmosElement))
          {
            throw new InvalidOperationException($"Underlying object does not have an 'groupByItems' field.");
          }

          if (!(cosmosElement is CosmosArray cosmosArray))
          {
            throw new ArgumentException($"{nameof(RewrittenGroupByProjection)}['groupByItems'] was not an array.");
          }

          return cosmosArray;
        }
      }

      public CosmosElement Payload
      {
        get
        {
          if (!this.cosmosObject.TryGetValue(PayloadPropertyName, out CosmosElement cosmosElement))
          {
            throw new InvalidOperationException($"Underlying object does not have an 'payload' field.");
          }

          return cosmosElement;
        }
      }
    }
  }
}