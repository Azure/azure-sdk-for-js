import type { NonStreamingOrderByResult } from "./nonStreamingOrderByResult.js";
/** @hidden */
export declare class OrderByComparator {
    sortOrder: string[];
    constructor(sortOrder: string[]);
    compareItems(item1: NonStreamingOrderByResult, item2: NonStreamingOrderByResult): number;
    private getOrderByItems;
    private compareOrderByItem;
    private getType;
    private compareValue;
}
//# sourceMappingURL=orderByComparator.d.ts.map