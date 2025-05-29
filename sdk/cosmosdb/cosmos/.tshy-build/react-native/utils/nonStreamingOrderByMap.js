// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Stores the most favourable distinct result from a set of nonStreamingOrderBy results.
 */
export class NonStreamingOrderByMap {
    constructor(compareFn) {
        this.compareFn = compareFn;
        this.map = new Map();
    }
    set(key, value) {
        if (!this.map.has(key)) {
            // If the key is not present in the map, add it.
            this.map.set(key, value);
        }
        else {
            // If the key is present in the map, compare the similarity score of the new value with the old value. Keep the more favourable one.
            const oldValue = this.map.get(key);
            if (this.replaceResults(oldValue, value)) {
                this.map.set(key, value);
            }
        }
    }
    get(key) {
        if (!this.map.has(key))
            return undefined;
        return this.map.get(key);
    }
    /**
     * Returns all the values in the map and resets the map.
     */
    getAllValuesAndReset() {
        const res = [];
        for (const [key, value] of this.map) {
            res.push(value);
            this.map.delete(key);
        }
        return res;
    }
    replaceResults(res1, res2) {
        const res = this.compareFn(res1, res2);
        if (res < 0)
            return true;
        return false;
    }
    size() {
        return this.map.size;
    }
}
//# sourceMappingURL=nonStreamingOrderByMap.js.map