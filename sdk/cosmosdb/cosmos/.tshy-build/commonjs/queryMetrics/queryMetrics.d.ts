import { ClientSideMetrics } from "./clientSideMetrics.js";
import { QueryPreparationTimes } from "./queryPreparationTime.js";
import { RuntimeExecutionTimes } from "./runtimeExecutionTimes.js";
import { TimeSpan } from "./timeSpan.js";
export declare class QueryMetrics {
    readonly retrievedDocumentCount: number;
    readonly retrievedDocumentSize: number;
    readonly outputDocumentCount: number;
    readonly outputDocumentSize: number;
    readonly indexHitDocumentCount: number;
    readonly totalQueryExecutionTime: TimeSpan;
    readonly queryPreparationTimes: QueryPreparationTimes;
    readonly indexLookupTime: TimeSpan;
    readonly documentLoadTime: TimeSpan;
    readonly vmExecutionTime: TimeSpan;
    readonly runtimeExecutionTimes: RuntimeExecutionTimes;
    readonly documentWriteTime: TimeSpan;
    readonly clientSideMetrics: ClientSideMetrics;
    constructor(retrievedDocumentCount: number, retrievedDocumentSize: number, outputDocumentCount: number, outputDocumentSize: number, indexHitDocumentCount: number, totalQueryExecutionTime: TimeSpan, queryPreparationTimes: QueryPreparationTimes, indexLookupTime: TimeSpan, documentLoadTime: TimeSpan, vmExecutionTime: TimeSpan, runtimeExecutionTimes: RuntimeExecutionTimes, documentWriteTime: TimeSpan, clientSideMetrics: ClientSideMetrics);
    /**
     * Gets the IndexHitRatio
     * @hidden
     */
    get indexHitRatio(): number;
    /**
     * returns a new QueryMetrics instance that is the addition of this and the arguments.
     */
    add(queryMetricsArray: QueryMetrics[]): QueryMetrics;
    /**
     * Output the QueryMetrics as a delimited string.
     * @hidden
     */
    toDelimitedString(): string;
    static readonly zero: QueryMetrics;
    /**
     * Returns a new instance of the QueryMetrics class that is the aggregation of an array of query metrics.
     */
    static createFromArray(queryMetricsArray: QueryMetrics[]): QueryMetrics;
    /**
     * Returns a new instance of the QueryMetrics class this is deserialized from a delimited string.
     */
    static createFromDelimitedString(delimitedString: string, clientSideMetrics?: ClientSideMetrics): QueryMetrics;
}
//# sourceMappingURL=queryMetrics.d.ts.map