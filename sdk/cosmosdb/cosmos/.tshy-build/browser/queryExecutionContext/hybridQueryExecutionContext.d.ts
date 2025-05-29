import type { ClientContext } from "../ClientContext.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { FeedOptions, PartitionedQueryExecutionInfo, QueryRange, Response } from "../request/index.js";
import type { ExecutionContext } from "./ExecutionContext.js";
/** @hidden */
export declare enum HybridQueryExecutionContextBaseStates {
    uninitialized = "uninitialized",
    initialized = "initialized",
    draining = "draining",
    done = "done"
}
export declare class HybridQueryExecutionContext implements ExecutionContext {
    private clientContext;
    private collectionLink;
    private options;
    private partitionedQueryExecutionInfo;
    private correlatedActivityId;
    private allPartitionsRanges;
    private globalStatisticsExecutionContext;
    private componentsExecutionContext;
    private pageSize;
    private state;
    private globalStatisticsAggregator;
    private emitRawOrderByPayload;
    private buffer;
    private DEFAULT_PAGE_SIZE;
    private TOTAL_WORD_COUNT_PLACEHOLDER;
    private HIT_COUNTS_ARRAY_PLACEHOLDER;
    private TOTAL_DOCUMENT_COUNT_PLACEHOLDER;
    private RRF_CONSTANT;
    private logger;
    private hybridSearchResult;
    private uniqueItems;
    private isSingleComponent;
    constructor(clientContext: ClientContext, collectionLink: string, options: FeedOptions, partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo, correlatedActivityId: string, allPartitionsRanges: QueryRange[]);
    nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>>;
    hasMoreResults(): boolean;
    fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>>;
    private fetchMoreInternal;
    private initialize;
    private executeComponentQueries;
    private processUniqueItems;
    private applySkipAndTakeToBuffer;
    private drain;
    private drainOne;
    private done;
    private sortHybridSearchResultByRRFScore;
    private drainSingleComponent;
    private createComponentExecutionContexts;
    private processComponentQueries;
    private replacePlaceholdersWorkaroud;
    private computeRRFScore;
    private extractComponentWeights;
}
export interface ComponentWeight {
    weight: number;
    comparator: (x: number, y: number) => number;
}
//# sourceMappingURL=hybridQueryExecutionContext.d.ts.map