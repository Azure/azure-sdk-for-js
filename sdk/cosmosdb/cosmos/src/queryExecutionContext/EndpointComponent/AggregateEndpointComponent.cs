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
    using Microsoft.Azure.Cosmos;
    using Microsoft.Azure.Cosmos.CosmosElements;
    using Microsoft.Azure.Documents;

    /// <summary>
    /// Execution component that is able to aggregate local aggregates from multiple continuations and partitions.
    /// At a high level aggregates queries only return a "partial" aggregate.
    /// "partial" means that the result is only valid for that one continuation (and one partition).
    /// For example suppose you have the query "SELECT COUNT(1) FROM c" and you have a single partition collection, 
    /// then you will get one count for each continuation of the query.
    /// If you wanted the true result for this query, then you will have to take the sum of all continuations.
    /// The reason why we have multiple continuations is because for a long running query we have to break up the results into multiple continuations.
    /// Fortunately all the aggregates can be aggregated across continuations and partitions.
    /// </summary>
    internal sealed class AggregateDocumentQueryExecutionComponent : DocumentQueryExecutionComponentBase
    {
        /// <summary>
        /// This class does most of the work, since a query like:
        /// 
        /// SELECT VALUE AVG(c.age)
        /// FROM c
        /// 
        /// is really just an aggregation on a single grouping (the whole collection).
        /// </summary>
        private readonly SingleGroupAggregator singleGroupAggregator;

        /// <summary>
        /// We need to keep track of whether the projection has the 'VALUE' keyword.
        /// </summary>
        private readonly bool isValueAggregateQuery;

        /// <summary>
        /// Initializes a new instance of the AggregateDocumentQueryExecutionComponent class.
        /// </summary>
        /// <param name="source">The source component that will supply the local aggregates from multiple continuations and partitions.</param>
        /// <param name="singleGroupAggregator">The single group aggregator that we will feed results into.</param>
        /// <param name="isValueAggregateQuery">Whether or not the query has the 'VALUE' keyword.</param>
        /// <remarks>This constructor is private since there is some async initialization that needs to happen in CreateAsync().</remarks>
        private AggregateDocumentQueryExecutionComponent(
            IDocumentQueryExecutionComponent source,
            SingleGroupAggregator singleGroupAggregator,
            bool isValueAggregateQuery)
            : base(source)
        {
            if (singleGroupAggregator == null)
            {
                throw new ArgumentNullException(nameof(singleGroupAggregator));
            }

            this.singleGroupAggregator = singleGroupAggregator;
            this.isValueAggregateQuery = isValueAggregateQuery;
        }

        /// <summary>
        /// Creates a AggregateDocumentQueryExecutionComponent.
        /// </summary>
        /// <param name="aggregates">The aggregates.</param>
        /// <param name="aliasToAggregateType">The alias to aggregate type.</param>
        /// <param name="hasSelectValue">Whether or not the query has the 'VALUE' keyword.</param>
        /// <param name="requestContinuation">The continuation token to resume from.</param>
        /// <param name="createSourceCallback">The callback to create the source component that supplies the local aggregates.</param>
        /// <returns>The AggregateDocumentQueryExecutionComponent.</returns>
        public static async Task<AggregateDocumentQueryExecutionComponent> CreateAsync(
            AggregateOperator[] aggregates,
            IReadOnlyDictionary<string, AggregateOperator?> aliasToAggregateType,
            bool hasSelectValue,
            string requestContinuation,
            Func<string, Task<IDocumentQueryExecutionComponent>> createSourceCallback)
        {
            return new AggregateDocumentQueryExecutionComponent(
                await createSourceCallback(requestContinuation),
                SingleGroupAggregator.Create(aggregates, aliasToAggregateType, hasSelectValue),
                aggregates != null && aggregates.Count() == 1);
        }

        /// <summary>
        /// Drains at most 'maxElements' documents from the AggregateDocumentQueryExecutionComponent.
        /// </summary>
        /// <param name="maxElements">This value is ignored, since the aggregates are aggregated for you.</param>
        /// <param name="token">The cancellation token.</param>
        /// <returns>The aggregate result after all the continuations have been followed.</returns>
        /// <remarks>
        /// Note that this functions follows all continuations meaning that it won't return until all continuations are drained.
        /// This means that if you have a long running query this function will take a very long time to return.
        /// </remarks>
        public override async Task<QueryResponseCore> DrainAsync(int maxElements, CancellationToken token)
        {
            // Note-2016-10-25-felixfan: Given what we support now, we should expect to return only 1 document.
            // Note-2019-07-11-brchon: We can return empty pages until all the documents are drained,
            // but then we will have to design a continuation token.

            double requestCharge = 0;
            long responseLengthBytes = 0;
            List<Uri> replicaUris = new List<Uri>();
            ClientSideRequestStatistics requestStatistics = new ClientSideRequestStatistics();
            PartitionedQueryMetrics partitionedQueryMetrics = new PartitionedQueryMetrics();

            while (!this.IsDone)
            {
                QueryResponseCore result = await base.DrainAsync(int.MaxValue, token);
                if (!result.IsSuccess)
                {
                    return result;
                }

                requestCharge += result.RequestCharge;
                responseLengthBytes += result.ResponseLengthBytes;
                // DEVNOTE: Add when query metrics is supported
                // partitionedQueryMetrics += new PartitionedQueryMetrics(results.QueryMetrics);
                if (result.RequestStatistics != null)
                {
                    replicaUris.AddRange(result.RequestStatistics.ContactedReplicas);
                }

                foreach (CosmosElement element in result.CosmosElements)
                {
                    RewrittenAggregateProjections rewrittenAggregateProjections = new RewrittenAggregateProjections(
                        this.isValueAggregateQuery,
                        element);
                    this.singleGroupAggregator.AddValues(rewrittenAggregateProjections.Payload);
                }
            }

            List<CosmosElement> finalResult = new List<CosmosElement>();
            CosmosElement aggregationResult = this.singleGroupAggregator.GetResult();
            if (aggregationResult != null)
            {
                finalResult.Add(aggregationResult);
            }

            // The replicaUris may have duplicates.
            requestStatistics.ContactedReplicas.AddRange(replicaUris);

            return QueryResponseCore.CreateSuccess(
                result: finalResult,
                continuationToken: null,
                activityId: null,
                disallowContinuationTokenMessage: null,
                requestCharge: requestCharge,
                queryMetricsText: null,
                queryMetrics: this.GetQueryMetrics(),
                requestStatistics: requestStatistics,
                responseLengthBytes: responseLengthBytes);
        }

        /// <summary>
        /// Struct for getting the payload out of the rewritten projection.
        /// </summary>
        private struct RewrittenAggregateProjections
        {
            public RewrittenAggregateProjections(bool isValueAggregateQuery, CosmosElement raw)
            {
                if (raw == null)
                {
                    throw new ArgumentNullException(nameof(raw));
                }

                if (isValueAggregateQuery)
                {
                    // SELECT VALUE [{"item": {"sum": SUM(c.blah), "count": COUNT(c.blah)}}]
                    CosmosArray aggregates = raw as CosmosArray;
                    if (aggregates == null)
                    {
                        throw new ArgumentException($"{nameof(RewrittenAggregateProjections)} was not an array for a value aggregate query. Type is: {raw.Type}");
                    }

                    this.Payload = aggregates[0];
                }
                else
                {
                    CosmosObject cosmosObject = raw as CosmosObject;
                    if (cosmosObject == null)
                    {
                        throw new ArgumentException($"{nameof(raw)} must not be an object.");
                    }

                    if (!cosmosObject.TryGetValue("payload", out CosmosElement cosmosPayload))
                    {
                        throw new InvalidOperationException($"Underlying object does not have an 'payload' field.");
                    }

                    // SELECT {"$1": {"item": {"sum": SUM(c.blah), "count": COUNT(c.blah)}}} AS payload
                    if (cosmosPayload == null)
                    {
                        throw new ArgumentException($"{nameof(RewrittenAggregateProjections)} does not have a 'payload' property.");
                    }

                    this.Payload = cosmosPayload;
                }
            }

            public CosmosElement Payload
            {
                get;
            }
        }
    }
}