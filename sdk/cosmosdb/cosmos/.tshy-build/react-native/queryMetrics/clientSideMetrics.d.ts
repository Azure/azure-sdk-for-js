export declare class ClientSideMetrics {
    readonly requestCharge: number;
    constructor(requestCharge: number);
    /**
     * Adds one or more ClientSideMetrics to a copy of this instance and returns the result.
     */
    add(...clientSideMetricsArray: ClientSideMetrics[]): ClientSideMetrics;
    static readonly zero: ClientSideMetrics;
    static createFromArray(...clientSideMetricsArray: ClientSideMetrics[]): ClientSideMetrics;
}
//# sourceMappingURL=clientSideMetrics.d.ts.map