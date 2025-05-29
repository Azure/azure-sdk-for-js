/** @hidden */
export class StaticValueAggregator {
    aggregate(other) {
        if (this.value === undefined) {
            this.value = other;
        }
    }
    getResult() {
        return this.value;
    }
}
//# sourceMappingURL=StaticValueAggregator.js.map