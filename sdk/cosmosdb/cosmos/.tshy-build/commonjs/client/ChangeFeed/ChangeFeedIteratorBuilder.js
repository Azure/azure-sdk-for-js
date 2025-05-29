"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedIteratorBuilder = void 0;
const tslib_1 = require("tslib");
const buildChangeFeedIterator_js_1 = require("./buildChangeFeedIterator.js");
const index_js_1 = require("../../request/index.js");
/**
 * @hidden
 * Provides iterator for change feed.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
class ChangeFeedIteratorBuilder {
    /**
     * @internal
     */
    constructor(cfOptions, clientContext, container, partitionKeyRangeCache) {
        this.cfOptions = cfOptions;
        this.clientContext = clientContext;
        this.container = container;
        this.partitionKeyRangeCache = partitionKeyRangeCache;
        this.isInitialized = false;
    }
    /**
     * Change feed is an infinite feed. hasMoreResults is always true.
     */
    get hasMoreResults() {
        return true;
    }
    /**
     * Gets an async iterator which will yield change feed results.
     */
    getAsyncIterator() {
        return tslib_1.__asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            yield tslib_1.__await(this.initializeIterator());
            do {
                const result = yield tslib_1.__await(this.iterator.readNext());
                yield yield tslib_1.__await(result);
            } while (this.hasMoreResults);
        });
    }
    /**
     * Returns the result of change feed from Azure Cosmos DB.
     */
    async readNext() {
        await this.initializeIterator();
        return this.iterator.readNext();
    }
    async initializeIterator() {
        if (!this.isInitialized) {
            try {
                const iterator = await (0, buildChangeFeedIterator_js_1.buildChangeFeedIterator)(this.cfOptions, this.clientContext, this.container, this.partitionKeyRangeCache);
                this.isInitialized = true;
                this.iterator = iterator;
            }
            catch (err) {
                throw new index_js_1.ErrorResponse(err.message);
            }
        }
    }
}
exports.ChangeFeedIteratorBuilder = ChangeFeedIteratorBuilder;
//# sourceMappingURL=ChangeFeedIteratorBuilder.js.map