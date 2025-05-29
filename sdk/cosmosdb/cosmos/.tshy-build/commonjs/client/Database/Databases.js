"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Databases = void 0;
const index_js_1 = require("../../common/index.js");
const index_js_2 = require("../../queryExecutionContext/index.js");
const queryIterator_js_1 = require("../../queryIterator.js");
const Database_js_1 = require("./Database.js");
const DatabaseResponse_js_1 = require("./DatabaseResponse.js");
const offers_js_1 = require("../../utils/offers.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Operations for creating new databases, and reading/querying all databases
 *
 * @see {@link Database} for reading or deleting an existing database; use `client.database(id)`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `databases.readAll()` before every single `item.read()` call, to ensure the database exists;
 * do this once on application start up.
 */
class Databases {
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the Database.
     */
    constructor(client, clientContext, encryptionManager) {
        this.client = client;
        this.clientContext = clientContext;
        this.encryptionManager = encryptionManager;
    }
    query(query, options) {
        const cb = (diagNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path: "/dbs",
                resourceType: index_js_1.ResourceType.database,
                resourceId: "",
                resultFn: (result) => result.Databases,
                query,
                options: innerOptions,
                diagnosticNode: diagNode,
            });
        };
        return new queryIterator_js_1.QueryIterator(this.clientContext, query, options, cb);
    }
    /**
     * Send a request for creating a database.
     *
     * A database manages users, permissions and a set of containers.
     * Each Azure Cosmos DB Database Account is able to support multiple independent named databases,
     * with the database being the logical container for data.
     *
     * Each Database consists of one or more containers, each of which in turn contain one or more
     * documents. Since databases are an administrative resource, the Service Master Key will be
     * required in order to access and successfully complete any action using the User APIs.
     *
     * @param body - The {@link DatabaseDefinition} that represents the {@link Database} to be created.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @example
     * ```ts snippet:CosmosClientDatabases
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { resource: databaseDefinition, database } = await client.databases.create({
     *   id: "<name here>",
     * });
     * ```
     */
    async create(body, options = {}) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            return this.createInternal(diagnosticNode, body, options);
        }, this.clientContext);
    }
    /**
     * @hidden
     */
    async createInternal(diagnosticNode, body, options = {}) {
        const err = {};
        if (!(0, index_js_1.isResourceValid)(body, err)) {
            throw err;
        }
        (0, offers_js_1.validateOffer)(body);
        if (body.maxThroughput) {
            const autoscaleParams = {
                maxThroughput: body.maxThroughput,
            };
            if (body.autoUpgradePolicy) {
                autoscaleParams.autoUpgradePolicy = body.autoUpgradePolicy;
            }
            const autoscaleHeaders = JSON.stringify(autoscaleParams);
            options.initialHeaders = Object.assign({}, options.initialHeaders, {
                [index_js_1.Constants.HttpHeaders.AutoscaleSettings]: autoscaleHeaders,
            });
            delete body.maxThroughput;
            delete body.autoUpgradePolicy;
        }
        if (body.throughput) {
            options.initialHeaders = Object.assign({}, options.initialHeaders, {
                [index_js_1.Constants.HttpHeaders.OfferThroughput]: body.throughput,
            });
            delete body.throughput;
        }
        const path = "/dbs"; // TODO: constant
        const response = await this.clientContext.create({
            body,
            path,
            resourceType: index_js_1.ResourceType.database,
            resourceId: undefined,
            diagnosticNode,
            options,
        });
        const ref = new Database_js_1.Database(this.client, body.id, this.clientContext, this.encryptionManager, response.result._rid);
        return new DatabaseResponse_js_1.DatabaseResponse(response.result, response.headers, response.code, ref, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
    }
    /**
     * Check if a database exists, and if it doesn't, create it.
     * This will make a read operation based on the id in the `body`, then if it is not found, a create operation.
     *
     * A database manages users, permissions and a set of containers.
     * Each Azure Cosmos DB Database Account is able to support multiple independent named databases,
     * with the database being the logical container for data.
     *
     * Each Database consists of one or more containers, each of which in turn contain one or more
     * documents. Since databases are an an administrative resource, the Service Master Key will be
     * required in order to access and successfully complete any action using the User APIs.
     *
     * @param body - The {@link DatabaseDefinition} that represents the {@link Database} to be created.
     * @param options - Additional options for the request
     * @example
     * ```ts snippet:ReadmeSampleCreateDatabase
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * ```
     */
    async createIfNotExists(body, options) {
        if (!body || body.id === null || body.id === undefined) {
            throw new Error("body parameter must be an object with an id property");
        }
        /*
          1. Attempt to read the Database (based on an assumption that most databases will already exist, so its faster)
          2. If it fails with NotFound error, attempt to create the db. Else, return the read results.
        */
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            try {
                const readResponse = await this.client
                    .database(body.id)
                    .readInternal(diagnosticNode, options);
                return readResponse;
            }
            catch (err) {
                if (err.code === index_js_1.StatusCodes.NotFound) {
                    const createResponse = await this.createInternal(diagnosticNode, body, options);
                    // Must merge the headers to capture RU costskaty
                    (0, index_js_2.mergeHeaders)(createResponse.headers, err.headers);
                    return createResponse;
                }
                else {
                    throw err;
                }
            }
        }, this.clientContext);
    }
    // TODO: DatabaseResponse for QueryIterator?
    /**
     * Reads all databases.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all databases in an array or iterate over them one at a time.
     * @example Read all databases to array.
     * ```ts snippet:DatabasesReadAll
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resources: databaseList } = await client.databases.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
}
exports.Databases = Databases;
//# sourceMappingURL=Databases.js.map