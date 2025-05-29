import type { DocumentProducer } from "./documentProducer.js";
/** @hidden */
export declare class OrderByDocumentProducerComparator {
    sortOrder: string[];
    constructor(sortOrder: string[]);
    private targetPartitionKeyRangeDocProdComparator;
    compare(docProd1: DocumentProducer, docProd2: DocumentProducer): number;
    compareValue(item1: unknown, type1: string, item2: unknown, type2: string): number;
    private compareOrderByItem;
    private validateOrderByItems;
    private getType;
    private getOrderByItems;
}
//# sourceMappingURL=orderByDocumentProducerComparator.d.ts.map