import { TimeSpan } from "./timeSpan.js";
export declare class QueryPreparationTimes {
    readonly queryCompilationTime: TimeSpan;
    readonly logicalPlanBuildTime: TimeSpan;
    readonly physicalPlanBuildTime: TimeSpan;
    readonly queryOptimizationTime: TimeSpan;
    constructor(queryCompilationTime: TimeSpan, logicalPlanBuildTime: TimeSpan, physicalPlanBuildTime: TimeSpan, queryOptimizationTime: TimeSpan);
    /**
     * returns a new QueryPreparationTimes instance that is the addition of this and the arguments.
     */
    add(...queryPreparationTimesArray: QueryPreparationTimes[]): QueryPreparationTimes;
    /**
     * Output the QueryPreparationTimes as a delimited string.
     */
    toDelimitedString(): string;
    static readonly zero: QueryPreparationTimes;
    /**
     * Returns a new instance of the QueryPreparationTimes class that is the
     * aggregation of an array of QueryPreparationTimes.
     */
    static createFromArray(queryPreparationTimesArray: QueryPreparationTimes[]): QueryPreparationTimes;
    /**
     * Returns a new instance of the QueryPreparationTimes class this is deserialized from a delimited string.
     */
    static createFromDelimitedString(delimitedString: string): QueryPreparationTimes;
}
//# sourceMappingURL=queryPreparationTime.d.ts.map