"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Containers = void 0;
const index_js_1 = require("../../common/index.js");
const partitionKeys_js_1 = require("../../common/partitionKeys.js");
const index_js_2 = require("../../queryExecutionContext/index.js");
const queryIterator_js_1 = require("../../queryIterator.js");
const Container_js_1 = require("./Container.js");
const ContainerResponse_js_1 = require("./ContainerResponse.js");
const offers_js_1 = require("../../utils/offers.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
/**
 * Operations for creating new containers, and reading/querying all containers
 *
 * @see {@link Container} for reading, replacing, or deleting an existing container; use `.container(id)`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `containers.readAll()` before every single `item.read()` call, to ensure the container exists;
 * do this once on application start up.
 */
class Containers {
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database, clientContext, encryptionManager) {
        this.database = database;
        this.clientContext = clientContext;
        this.encryptionManager = encryptionManager;
    }
    query(query, options) {
        const path = (0, index_js_1.getPathFromLink)(this.database.url, index_js_1.ResourceType.container);
        const id = (0, index_js_1.getIdFromLink)(this.database.url);
        return new queryIterator_js_1.QueryIterator(this.clientContext, query, options, (diagNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: index_js_1.ResourceType.container,
                resourceId: id,
                resultFn: (result) => result.DocumentCollections,
                query,
                options: innerOptions,
                diagnosticNode: diagNode,
            });
        });
    }
    /**
     * Creates a container.
     *
     * A container is a named logical container for items.
     *
     * A database may contain zero or more named containers and each container consists of
     * zero or more JSON items.
     *
     * Being schema-free, the items in a container do not need to share the same structure or fields.
     *
     *
     * Since containers are application resources, they can be authorized using either the
     * master key or resource keys.
     *
     * @param body - Represents the body of the container.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @example
     * ```ts snippet:CosmosClientDatabaseCreateContainer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const container = client.database("<database id>").containers.create({
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
        var _a;
        const err = {};
        if (!(0, index_js_1.isResourceValid)(body, err)) {
            throw err;
        }
        const path = (0, index_js_1.getPathFromLink)(this.database.url, index_js_1.ResourceType.container);
        const id = (0, index_js_1.getIdFromLink)(this.database.url);
        (0, offers_js_1.validateOffer)(body);
        if (body.maxThroughput) {
            const autoscaleParams = {
                maxThroughput: body.maxThroughput,
            };
            if (body.autoUpgradePolicy) {
                autoscaleParams.autoUpgradePolicy = body.autoUpgradePolicy;
            }
            const autoscaleHeader = JSON.stringify(autoscaleParams);
            options.initialHeaders = Object.assign({}, options.initialHeaders, {
                [index_js_1.Constants.HttpHeaders.AutoscaleSettings]: autoscaleHeader,
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
        if (typeof body.partitionKey === "string") {
            if (!body.partitionKey.startsWith("/")) {
                throw new Error("Partition key must start with '/'");
            }
            body.partitionKey = {
                paths: [body.partitionKey],
            };
        }
        // If they don't specify a partition key, use the default path
        if (!body.partitionKey || !body.partitionKey.paths) {
            body.partitionKey = {
                paths: [partitionKeys_js_1.DEFAULT_PARTITION_KEY_PATH],
            };
        }
        if (this.clientContext.enableEncryption && body.clientEncryptionPolicy) {
            body.clientEncryptionPolicy.policyFormatVersion =
                (_a = body.clientEncryptionPolicy.policyFormatVersion) !== null && _a !== void 0 ? _a : 1;
            (0, index_js_1.validateClientEncryptionPolicy)(body.clientEncryptionPolicy, body.partitionKey);
        }
        const response = await this.clientContext.create({
            body,
            path,
            resourceType: index_js_1.ResourceType.container,
            resourceId: id,
            diagnosticNode,
            options,
        });
        const ref = new Container_js_1.Container(this.database, response.result.id, this.clientContext, this.encryptionManager, response.result._rid);
        this.clientContext.partitionKeyDefinitionCache[ref.url] = response.result.partitionKey;
        return new ContainerResponse_js_1.ContainerResponse(response.result, response.headers, response.code, ref, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
    }
    /**
     * Checks if a Container exists, and, if it doesn't, creates it.
     * This will make a read operation based on the id in the `body`, then if it is not found, a create operation.
     * You should confirm that the output matches the body you passed in for non-default properties (i.e. indexing policy/etc.)
     *
     * A container is a named logical container for items.
     *
     * A database may contain zero or more named containers and each container consists of
     * zero or more JSON items.
     *
     * Being schema-free, the items in a container do not need to share the same structure or fields.
     *
     *
     * Since containers are application resources, they can be authorized using either the
     * master key or resource keys.
     *
     * @param body - Represents the body of the container.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @example
     * ```ts snippet:ReadmeSampleCreateContainer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     * ```
     */
    async createIfNotExists(body, options) {
        if (!body || body.id === null || body.id === undefined) {
            throw new Error("body parameter must be an object with an id property");
        }
        /*
          1. Attempt to read the Container (based on an assumption that most containers will already exist, so its faster)
          2. If it fails with NotFound error, attempt to create the container. Else, return the read results.
        */
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            try {
                const readResponse = await this.database
                    .container(body.id)
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
    /**
     * Read all containers.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all containers in an array or iterate over them one at a time.
     * @example Read all containers to array.
     * ```ts snippet:ContainersReadAllContainers
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resources: containerList } = await client
     *   .database("<db id>")
     *   .containers.readAll()
     *   .fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
}
exports.Containers = Containers;
//# sourceMappingURL=Containers.js.map