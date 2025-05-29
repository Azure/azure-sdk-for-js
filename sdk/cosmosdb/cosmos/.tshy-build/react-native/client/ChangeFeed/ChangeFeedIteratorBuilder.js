import { __asyncGenerator, __await } from "tslib";
import { buildChangeFeedIterator } from "./buildChangeFeedIterator.js";
import { ErrorResponse } from "../../request/index.js";
/**
 * @hidden
 * Provides iterator for change feed.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
export class ChangeFeedIteratorBuilder {
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
        return __asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            yield __await(this.initializeIterator());
            do {
                const result = yield __await(this.iterator.readNext());
                yield yield __await(result);
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
                const iterator = await buildChangeFeedIterator(this.cfOptions, this.clientContext, this.container, this.partitionKeyRangeCache);
                this.isInitialized = true;
                this.iterator = iterator;
            }
            catch (err) {
                throw new ErrorResponse(err.message);
            }
        }
    }
}
//# sourceMappingURL=ChangeFeedIteratorBuilder.js.map