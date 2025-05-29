/** @hidden */
export class MakeListAggregator {
    constructor() {
        this.value = [];
    }
    aggregate(other) {
        if (Array.isArray(other)) {
            this.value.push(...other);
        }
    }
    getResult() {
        const result = [...this.value];
        return result;
    }
}
//# sourceMappingURL=MakeListAggregator.js.map