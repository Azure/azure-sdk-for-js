// TODO: this smells funny
/** @hidden */
const TYPEORDCOMPARATOR = Object.freeze({
    NoValue: {
        ord: 0,
    },
    undefined: {
        ord: 1,
    },
    boolean: {
        ord: 2,
        compFunc: (a, b) => {
            return a === b ? 0 : a > b ? 1 : -1;
        },
    },
    number: {
        ord: 4,
        compFunc: (a, b) => {
            return a === b ? 0 : a > b ? 1 : -1;
        },
    },
    string: {
        ord: 5,
        compFunc: (a, b) => {
            return a === b ? 0 : a > b ? 1 : -1;
        },
    },
});
/** @hidden */
export class OrderByDocumentProducerComparator {
    constructor(sortOrder) {
        this.sortOrder = sortOrder;
    } // TODO: This should be an enum
    targetPartitionKeyRangeDocProdComparator(docProd1, docProd2) {
        const a = docProd1.getTargetParitionKeyRange()["minInclusive"];
        const b = docProd2.getTargetParitionKeyRange()["minInclusive"];
        return a === b ? 0 : a > b ? 1 : -1;
    }
    compare(docProd1, docProd2) {
        // Need to check for split, since we don't want to dereference "item" of undefined / exception
        if (docProd1.gotSplit()) {
            return -1;
        }
        if (docProd2.gotSplit()) {
            return 1;
        }
        const orderByItemsRes1 = this.getOrderByItems(docProd1.peekBufferedItems()[0]);
        const orderByItemsRes2 = this.getOrderByItems(docProd2.peekBufferedItems()[0]);
        // validate order by items and types
        // TODO: once V1 order by on different types is fixed this need to change
        this.validateOrderByItems(orderByItemsRes1, orderByItemsRes2);
        // no async call in the for loop
        for (let i = 0; i < orderByItemsRes1.length; i++) {
            // compares the orderby items one by one
            const compRes = this.compareOrderByItem(orderByItemsRes1[i], orderByItemsRes2[i]);
            if (compRes !== 0) {
                if (this.sortOrder[i] === "Ascending") {
                    return compRes;
                }
                else if (this.sortOrder[i] === "Descending") {
                    return -compRes;
                }
            }
        }
        return this.targetPartitionKeyRangeDocProdComparator(docProd1, docProd2);
    }
    // TODO: This smells funny
    compareValue(item1, type1, item2, type2) {
        if (type1 === "object" || type2 === "object") {
            throw new Error("Tried to compare an object type");
        }
        const type1Ord = TYPEORDCOMPARATOR[type1].ord;
        const type2Ord = TYPEORDCOMPARATOR[type2].ord;
        const typeCmp = type1Ord - type2Ord;
        if (typeCmp !== 0) {
            // if the types are different, use type ordinal
            return typeCmp;
        }
        // both are of the same type
        if (type1Ord === TYPEORDCOMPARATOR["undefined"].ord ||
            type1Ord === TYPEORDCOMPARATOR["NoValue"].ord) {
            // if both types are undefined or Null they are equal
            return 0;
        }
        const compFunc = TYPEORDCOMPARATOR[type1].compFunc;
        if (typeof compFunc === "undefined") {
            throw new Error("Cannot find the comparison function");
        }
        // same type and type is defined compare the items
        return compFunc(item1, item2);
    }
    compareOrderByItem(orderByItem1, orderByItem2) {
        const type1 = this.getType(orderByItem1);
        const type2 = this.getType(orderByItem2);
        return this.compareValue(orderByItem1["item"], type1, orderByItem2["item"], type2);
    }
    validateOrderByItems(res1, res2) {
        if (res1.length !== res2.length) {
            throw new Error(`Expected ${res1.length}, but got ${res2.length}.`);
        }
        if (res1.length !== this.sortOrder.length) {
            throw new Error("orderByItems cannot have a different size than sort orders.");
        }
        for (let i = 0; i < this.sortOrder.length; i++) {
            const type1 = this.getType(res1[i]);
            const type2 = this.getType(res2[i]);
            if (type1 !== type2) {
                throw new Error(`Expected ${type1}, but got ${type2}. Cannot execute cross partition order-by queries on mixed types. Consider filtering your query using IS_STRING or IS_NUMBER to get around this exception.`);
            }
        }
    }
    getType(orderByItem) {
        // TODO: any item?
        if (orderByItem === undefined || orderByItem.item === undefined) {
            return "NoValue";
        }
        const type = typeof orderByItem.item;
        if (TYPEORDCOMPARATOR[type] === undefined) {
            throw new Error(`unrecognizable type ${type}`);
        }
        return type;
    }
    getOrderByItems(res) {
        // TODO: any res?
        return res["orderByItems"];
    }
}
//# sourceMappingURL=orderByDocumentProducerComparator.js.map