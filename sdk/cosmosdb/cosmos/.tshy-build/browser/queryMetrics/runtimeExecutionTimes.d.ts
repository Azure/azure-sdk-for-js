import { TimeSpan } from "./timeSpan.js";
export declare class RuntimeExecutionTimes {
    readonly queryEngineExecutionTime: TimeSpan;
    readonly systemFunctionExecutionTime: TimeSpan;
    readonly userDefinedFunctionExecutionTime: TimeSpan;
    constructor(queryEngineExecutionTime: TimeSpan, systemFunctionExecutionTime: TimeSpan, userDefinedFunctionExecutionTime: TimeSpan);
    /**
     * returns a new RuntimeExecutionTimes instance that is the addition of this and the arguments.
     */
    add(...runtimeExecutionTimesArray: RuntimeExecutionTimes[]): RuntimeExecutionTimes;
    /**
     * Output the RuntimeExecutionTimes as a delimited string.
     */
    toDelimitedString(): string;
    static readonly zero: RuntimeExecutionTimes;
    /**
     * Returns a new instance of the RuntimeExecutionTimes class that is
     *  the aggregation of an array of RuntimeExecutionTimes.
     */
    static createFromArray(runtimeExecutionTimesArray: RuntimeExecutionTimes[]): RuntimeExecutionTimes;
    /**
     * Returns a new instance of the RuntimeExecutionTimes class this is deserialized from a delimited string.
     */
    static createFromDelimitedString(delimitedString: string): RuntimeExecutionTimes;
}
//# sourceMappingURL=runtimeExecutionTimes.d.ts.map