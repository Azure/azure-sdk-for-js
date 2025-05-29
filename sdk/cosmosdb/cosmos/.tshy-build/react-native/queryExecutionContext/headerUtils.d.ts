export interface CosmosHeaders {
    [key: string]: any;
}
/** @hidden */
export declare function getRequestChargeIfAny(headers: CosmosHeaders | number): number;
/**
 * @hidden
 */
export declare function getInitialHeader(): CosmosHeaders;
/**
 * @hidden
 */
export declare function mergeHeaders(headers: CosmosHeaders, toBeMergedHeaders: CosmosHeaders): void;
/** @hidden */
export declare function decodeAndParseJSONString(inputString: string): string;
//# sourceMappingURL=headerUtils.d.ts.map