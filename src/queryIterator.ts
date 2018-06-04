import { Base } from ".";
import { Constants } from "./common";
import { DocumentClient } from "./documentclient";
import {
    FetchFunctionCallback,
    IExecutionContext,
    IHeaders,
    ProxyQueryExecutionContext,
    SqlQuerySpec,
} from "./queryExecutionContext";
import { Response } from "./request";

export type QueryIteratorCallback = (err: any, elements?: any, headers?: IHeaders) => boolean | void;

export class QueryIterator {
    private toArrayTempResources: any[];
    private toArrayLastResHeaders: IHeaders;
    private queryExecutionContext: IExecutionContext;
    /**
     * Represents a QueryIterator Object, an implmenetation of feed or query response that enables \
     * traversal and iterating over the response
     * in the Azure Cosmos DB database service.
     * @class QueryIterator
     * @param {object} documentclient                - The documentclient object.
     * @param {SqlQuerySpec | string} query          - A SQL query.
     * @param {FeedOptions} options                  - Represents the feed options.
     * @param {callback | callback[]} fetchFunctions - A function to retrieve each page of data. \
     * An array of functions may be used to query more than one partition.
     * @param {string} [resourceLink]                - An optional parameter that represents the resourceLink \
     * (will be used in orderby/top/parallel query)
     */
    constructor(
        private documentclient: DocumentClient,
        private query: SqlQuerySpec | string,
        private options: any, // TODO: any options
        private fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[],
        private resourceLink?: string | string[]) {

        this.documentclient = documentclient;
        this.query = query;
        this.fetchFunctions = fetchFunctions;
        this.options = options;
        this.resourceLink = resourceLink;
        this.queryExecutionContext = this._createQueryExecutionContext();
    }
    /**
     * Execute a provided function once per feed element.
     * @memberof QueryIterator
     * @instance
     * @param {callback} callback - Function to execute for each element. \
     * the function takes two parameters error, element.
     * Note: the last element the callback will be called on will be undefined.
     * If the callback explicitly returned false, the loop gets stopped.
     */
    public forEach(callback: QueryIteratorCallback) {
        this.reset();
        this._forEachImplementation(callback);
    }

    /**
     * Execute a provided function on the next element in the QueryIterator.
     * @memberof QueryIterator
     * @instance
     * @param {callback} callback - Function to execute for each element. \
     * the function takes two parameters error, element.
     */
    public async nextItem(callback?: QueryIteratorCallback): Promise<Response<any>> {
        try {
            const p = await this.queryExecutionContext.nextItem();
            return Base.ResponseOrCallback(callback, p);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Retrieve the current element on the QueryIterator.
     * @memberof QueryIterator
     * @instance
     * @param {callback} callback - Function to execute for the current element. \
     * the function takes two parameters error, element.
     */
    public async current(callback?: QueryIteratorCallback) {
        try {
            const p = await this.queryExecutionContext.current();
            return Base.ResponseOrCallback(callback, p);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * @deprecated Instead check if callback(undefined, undefined) is invoked by nextItem(callback) or current(callback)
     *
     * Determine if there are still remaining resources to processs based on the value of the continuation token or the\
     * elements remaining on the current batch in the QueryIterator.
     * @memberof QueryIterator
     * @instance
     * @returns {Boolean} true if there is other elements to process in the QueryIterator.
     */
    public hasMoreResults() {
        return this.queryExecutionContext.hasMoreResults();
    }

    /**
     * Retrieve all the elements of the feed and pass them as an array to a function
     * @memberof QueryIterator
     * @instance
     * @param {callback} callback - Function execute on the feed response, takes two parameters error, resourcesList
     */
    public async toArray(callback?: QueryIteratorCallback): Promise<Response<any[]>> {
        try {
            this.reset();
            this.toArrayTempResources = [];
            const p = await this._toArrayImplementation();
            return Base.ResponseOrCallback(callback, p);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Retrieve the next batch of the feed and pass them as an array to a function
     * @memberof QueryIterator
     * @instance
     * @param {callback} callback - Function execute on the feed response, takes two parameters error, resourcesList
     */
    public async executeNext(callback?: QueryIteratorCallback) {
        try {
            const p = await this.queryExecutionContext.fetchMore();
            return Base.ResponseOrCallback(callback, p);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reset the QueryIterator to the beginning and clear all the resources inside it
     * @memberof QueryIterator
     * @instance
     */
    public reset() {
        this.queryExecutionContext = this._createQueryExecutionContext();
    }

    /** @ignore */
    private async _toArrayImplementation(): Promise<Response<any>> {
        try {
            const { result, headers } = await this.queryExecutionContext.nextItem();
            // concatinate the results and fetch more
            this.toArrayLastResHeaders = headers;

            if (result === undefined) {

                // no more results
                return { result: this.toArrayTempResources, headers: this.toArrayLastResHeaders };
            }

            this.toArrayTempResources.push(result);

            return this._toArrayImplementation();
        } catch (err) {
            throw err;
        }
    }

    /** @ignore */
    private async _forEachImplementation(
        callback: QueryIteratorCallback) { // TODO: any error
        try {
            const { result, headers } = await this.queryExecutionContext.nextItem();
            if (result === undefined) {
                // no more results. This is last iteration
                return callback(undefined, undefined, headers);
            }

            if (callback(undefined, result, headers) === false) {
                // callback instructed to stop further iteration
                return;
            }

            // recursively call itself to iterate to the remaining elements
            setImmediate(() => {
                this._forEachImplementation(callback);
            });
        } catch (err) {
            throw err;
        }
    }

    /** @ignore */
    private _createQueryExecutionContext() {
        return new ProxyQueryExecutionContext(
            this.documentclient,
            this.query,
            this.options,
            this.fetchFunctions,
            this.resourceLink);
    }
}
