import { resolvePtr } from "dns";
import { basename } from "path";
import { Readable } from "stream";
import * as tunnel from "tunnel";
import * as url from "url";
import * as util from "util";
import { Base, ResponseCallback } from "./base";
import { Constants, Helper, Platform } from "./common";
import { DocumentClientBase } from "./DocumentClientBase";
import {
    ConnectionPolicy, ConsistencyLevel, DatabaseAccount, Document, PartitionKey, QueryCompatibilityMode,
} from "./documents";
import { GlobalEndpointManager } from "./globalEndpointManager";
import { FetchFunctionCallback, IHeaders, SqlQuerySpec } from "./queryExecutionContext";
import { QueryIterator } from "./queryIterator";
import { RequestHandler, Response } from "./request";
import { RetryOptions } from "./retry";
import { SessionContainer } from "./sessionContainer";

// var Base = require("./base")
//     , https = require("https")
//     , url = require("url")
//     , tunnel = require("tunnel")
//     , AzureDocuments = require("./documents")
//     , QueryIterator = require("./queryIterator")
//     , RequestHandler = require("./request")
//     , RetryOptions = require("./retryOptions")
//     , GlobalEndpointManager = require("./globalEndpointManager")
//     , Constants = require("./constants")
//     , Helper = require("./helper").Helper
//     , util = require("util")
//     , Platform = require("./platform")
//     , SessionContainer = require("./sessionContainer");

// if (typeof exports !== "undefined") {
//     exports.DocumentClient = DocumentClient;
//     exports.DocumentBase = AzureDocuments;
//     exports.RetryOptions = RetryOptions;
//     exports.Base = Base;
//     exports.Constants = Constants;
// }

export class DocumentClient extends DocumentClientBase {
    /**
     * Provides a client-side logical representation of the Azure Cosmos DB database account.
     * This client is used to configure and execute requests in the Azure Cosmos DB database service.
     * @constructor DocumentClient
     * @param {string} urlConnection           - The service endpoint to use to create the client.
     * @param {object} auth                    - An object that is used for authenticating requests \
     * and must contains one of the options
     * @param {string} [auth.masterKey]        - The authorization master key to use to create the client.
     * @param {Object} [auth.resourceTokens]   - An object that contains resources tokens. Keys for the \
     * object are resource Ids and values are the resource tokens.
     * @param {Array}  [auth.permissionFeed]   - An array of {@link Permission} objects.
     * @param {object} [connectionPolicy]      - An instance of {@link ConnectionPolicy} class. This \
     * parameter is optional and the default connectionPolicy will be used if omitted.
     * @param {string} [consistencyLevel]      - An optional parameter that represents the consistency \
     * level. It can take any value from {@link ConsistencyLevel}.
     */
    constructor(
        public urlConnection: string,
        auth: any,
        connectionPolicy?: ConnectionPolicy,
        consistencyLevel?: ConsistencyLevel) { // TODO: any auth options
        super(urlConnection, auth, connectionPolicy, consistencyLevel);
    }
    /**
     * Gets the curent write endpoint for a geo-replicated database account.
     * @memberof DocumentClient
     * @instance
     * @param {function} callback        - The callback function which takes endpoint(string) as an argument.
     */
    public async getWriteEndpoint(callback?: (writeEndPoint: string) => void): Promise<string> {
        const p = this._globalEndpointManager.getWriteEndpoint();

        if (callback) {
            p.then(callback, callback);
        } else {
            return p;
        }
    }

    /**
     * Gets the curent read endpoint for a geo-replicated database account.
     * @memberof DocumentClient
     * @instance
     * @param {function} callback        - The callback function which takes endpoint(string) as an argument.
     */
    public getReadEndpoint(callback?: (readEndPoint: string) => void): void | Promise<string> {
        const p = this._globalEndpointManager.getReadEndpoint();

        if (callback) {
            p.then(callback, callback);
        } else {
            return p;
        }
    }

    /**
     * Send a request for creating a database.
     * <p>
     *  A database manages users, permissions and a set of collections.  <br>
     *  Each Azure Cosmos DB Database Account is able to support multiple independent named databases,\
     *  with the database being the logical container for data. <br>
     *  Each Database consists of one or more collections, each of which in turn contain one or more \
     *  documents. Since databases are an an administrative resource, the Service Master Key will be \
     * required in order to access and successfully complete any action using the User APIs. <br>
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {Object} body              - A json object that represents The database to be created.
     * @param {string} body.id           - The id of the database.
     * @param {RequestOptions} [options] - The request options.
     * @param {ResponseCallback<any>} callback - The callback for the request.
     */
    public createDatabase(
        body: object,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any database
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(body, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const path = "/dbs"; // TODO: constant
        return this.create(body, path, "dbs", undefined, undefined, options, callback);
    }

    /**
     * Creates a collection.
     * <p>
     * A collection is a named logical container for documents. <br>
     * A database may contain zero or more named collections and each collection consists of \
     * zero or more JSON documents. <br>
     * Being schema-free, the documents in a collection do not need to share the same structure or fields. <br>
     * Since collections are application resources, they can be authorized using either the \
     * master key or resource keys. <br>
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink                  - The self-link of the database.
     * @param {object} body                          - Represents the body of the collection.
     * @param {string} body.id                       - The id of the collection.
     * @param {IndexingPolicy} body.indexingPolicy   - The indexing policy associated with the collection.
     * @param {number} body.defaultTtl               - The default time to live in seconds for documents in \
     * a collection.
     * @param {RequestOptions} [options]             - The request options.
     * @param {ResponseCallback<any>} callback             - The callback for the request.
     */
    public async createCollection(
        databaseLink: string,
        body: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(body, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        try {
            const isNameBased = Base.isLinkNameBased(databaseLink);
            const path = this.getPathFromLink(databaseLink, "colls", isNameBased);
            const id = this.getIdFromLink(databaseLink, isNameBased);

            const response = await this.create(body, path, "colls", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Create a document.
     * <p>
     * There is no set schema for JSON documents. They may contain any number of custom properties as \
     * well as an optional list of attachments. <br>
     * A Document is an application resource and can be authorized using the master key or resource keys
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} documentsFeedOrDatabaseLink               - \
     * The collection link or database link if using a partition resolver
     * @param {object} body                                      - \
     * Represents the body of the document. Can contain any number of user defined properties.
     * @param {string} [body.id]                                 - \
     * The id of the document, MUST be unique for each document.
     * @param {number} body.ttl                                  - \
     * The time to live in seconds of the document.
     * @param {RequestOptions} [options]                         - \
     * The request options.
     * @param {boolean} [options.disableAutomaticIdGeneration]   - \
     * Disables the automatic id generation. If id is missing in the body and this option is true, \
     * an error will be returned.
     * @param {ResponseCallback<Document>} callback                         - \
     * The callback for the request.
     */
    public async createDocument(
        documentsFeedOrDatabaseLink: string, // TODO: bad name
        body: any,
        options?: RequestOptions,
        callback?: ResponseCallback<Document>): Promise<Response<Document>> { // TODO: any error
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const partitionResolver = this.partitionResolvers[documentsFeedOrDatabaseLink];

        const collectionLink = (partitionResolver === undefined || partitionResolver === null)
            ? documentsFeedOrDatabaseLink
            : this.resolveCollectionLinkForCreate(partitionResolver, body);

        try {
            const response: Response<Document> = await this.createDocumentPrivate(collectionLink, body, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Create an attachment for the document object.
     * <p>
     * Each document may contain zero or more attachments. Attachments can be of any MIME type - \
     * text, image, binary data. <br>
     * These are stored externally in Azure Blob storage. Attachments are automatically \
     * deleted when the parent document is deleted.
     * </P>
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink         - The self-link of the document.
     * @param {Object} body                 - The metadata the defines the attachment media like media, \
     * contentType. It can include any other properties as part of the metedata.
     * @param {string} body.contentType     - The MIME contentType of the attachment.
     * @param {string} body.media           - Media link associated with the attachment content.
     * @param {RequestOptions} options      - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public async createAttachment(
        documentLink: string,
        body: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(body, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(documentLink);
        const path = this.getPathFromLink(documentLink, "attachments", isNameBased);
        const id = this.getIdFromLink(documentLink, isNameBased);

        try {
            const response = await this.create(body, path, "attachments", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Create a database user.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink         - The self-link of the database.
     * @param {object} body                 - Represents the body of the user.
     * @param {string} body.id              - The id of the user.
     * @param {RequestOptions} [options]    - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public async createUser(
        databaseLink: string,
        body: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any User
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(body, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(databaseLink);
        const path = this.getPathFromLink(databaseLink, "users", isNameBased);
        const id = this.getIdFromLink(databaseLink, isNameBased);

        try {
            const response = await this.create(body, path, "users", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Create a permission.
     * <p> A permission represents a per-User Permission to access a specific resource \
     * e.g. Document or Collection.  </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} userLink             - The self-link of the user.
     * @param {object} body                 - Represents the body of the permission.
     * @param {string} body.id              - The id of the permission
     * @param {string} body.permissionMode  - The mode of the permission, must be a value of {@link PermissionMode}
     * @param {string} body.resource        - The link of the resource that the permission will be applied to.
     * @param {RequestOptions} [options]    - The request options.
     * @param {ResponseCallback<any>} callback    - The callback for the request. Promise won't return response.
     */
    public async createPermission(
        userLink: string,
        body: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(body, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(userLink);
        const path = this.getPathFromLink(userLink, "permissions", isNameBased);
        const id = this.getIdFromLink(userLink, isNameBased);
        try {
            const response = await this.create(body, path, "permissions", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Create a trigger.
     * <p>
     * Azure Cosmos DB supports pre and post triggers defined in JavaScript to be executed \
     * on creates, updates and deletes. <br>
     * For additional details, refer to the server-side JavaScript API documentation.
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink           - The self-link of the collection.
     * @param {object} trigger                  - Represents the body of the trigger.
     * @param {string} trigger.id             - The id of the trigger.
     * @param {string} trigger.triggerType      - The type of the trigger, \
     * should be one of the values of {@link TriggerType}.
     * @param {string} trigger.triggerOperation - The trigger operation, \
     * should be one of the values of {@link TriggerOperation}.
     * @param {function} trigger.serverScript   - The body of the trigger, it can be passed as stringified too.
     * @param {RequestOptions} [options]        - The request options.
     * @param {RequestCallback} callback        - The callback for the request.
     */
    public async createTrigger(
        collectionLink: string,
        trigger: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (trigger.serverScript) {
            trigger.body = trigger.serverScript.toString();
        } else if (trigger.body) {
            trigger.body = trigger.body.toString();
        }

        const err = {};
        if (!this.isResourceValid(trigger, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "triggers", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        try {
            const response = await this.create(trigger, path, "triggers", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Create a UserDefinedFunction.
     * <p>
     * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers. <br>
     * For additional details, refer to the server-side JavaScript API documentation.
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink                - The self-link of the collection.
     * @param {object} udf                           - Represents the body of the userDefinedFunction.
     * @param {string} udf.id                      - The id of the udf.
     * @param {string} udf.userDefinedFunctionType   - The type of the udf, it should be one of the values \
     * of {@link UserDefinedFunctionType}
     * @param {function} udf.serverScript            - Represents the body of the udf, it can be passed as \
     * stringified too.
     * @param {RequestOptions} [options]             - The request options.
     * @param {RequestCallback} callback             - The callback for the request.
     */
    public async createUserDefinedFunction(
        collectionLink: string,
        udf: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any udf
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (udf.serverScript) {
            udf.body = udf.serverScript.toString();
        } else if (udf.body) {
            udf.body = udf.body.toString();
        }

        const err = {};
        if (!this.isResourceValid(udf, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "udfs", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        try {
            const response = await this.create(udf, path, "udfs", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Create a StoredProcedure.
     * <p>
     * Azure Cosmos DB allows stored procedures to be executed in the storage tier, \
     * directly against a document collection. The script <br>
     * gets executed under ACID transactions on the primary storage partition of the \
     * specified collection. For additional details, <br>
     * refer to the server-side JavaScript API documentation.
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink       - The self-link of the collection.
     * @param {object} sproc                - Represents the body of the stored procedure.
     * @param {string} sproc.id           - The id of the stored procedure.
     * @param {function} sproc.serverScript - The body of the stored procedure, it can be passed as stringified too.
     * @param {RequestOptions} [options]    - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public async createStoredProcedure(
        collectionLink: string,
        sproc: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (sproc.serverScript) {
            sproc.body = sproc.serverScript.toString();
        } else if (sproc.body) {
            sproc.body = sproc.body.toString();
        }

        const err = {};
        if (!this.isResourceValid(sproc, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "sprocs", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        try {
            const response = await this.create(sproc, path, "sprocs", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Create an attachment for the document object.
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink             - The self-link of the document.
     * @param {Readable} readableStream  - the stream that represents the media itself that needs to be uploaded.
     * @param {MediaOptions} [options]          - The request options.
     * @param {ResponseCallback} callback        - The callback for the request.
     */
    public async createAttachmentAndUploadMedia(
        documentLink: string,
        readableStream: Readable,
        options?: MediaOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        let initialHeaders = Base.extend({}, this.defaultHeaders);
        initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);

        // Add required headers slug and content-type.
        if (options.slug) {
            initialHeaders[Constants.HttpHeaders.Slug] = options.slug;
        }

        initialHeaders[Constants.HttpHeaders.ContentType] = options.contentType || Constants.MediaTypes.OctetStream;

        const isNameBased = Base.isLinkNameBased(documentLink);
        const path = this.getPathFromLink(documentLink, "attachments", isNameBased);
        const id = this.getIdFromLink(documentLink, isNameBased);

        try {
            const response = await this.create(readableStream, path, "attachments", id, initialHeaders, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads a database.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink         - The self-link of the database.
     * @param {RequestOptions} [options]    - The request options.
     * @param {ResponseCallback} callback    - The callback for the request.
     */
    public async readDatabase(
        databaseLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(databaseLink);
        const path = this.getPathFromLink(databaseLink, "", isNameBased);
        const id = this.getIdFromLink(databaseLink, isNameBased);

        try {
            const response = await this.read(path, "dbs", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads a collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink       - The self-link of the collection.
     * @param {RequestOptions} [options]    - The request options.
     * @param {ResponseCallback} callback    - The callback for the request.
     */
    public async readCollection(
        collectionLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        try {
            const response = await this.read<any>(path, "colls", id, undefined, options);
            this.partitionKeyDefinitionCache[collectionLink] = response.result.partitionKey;
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads a document.
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink         - The self-link of the document.
     * @param {RequestOptions} [options]    - The request options.
     * @param {ResponseCallback} callback    - The callback for the request.
     */
    public async readDocument(
        documentLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<Document>): Promise<Response<Document>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(documentLink);
        const path = this.getPathFromLink(documentLink, "", isNameBased);
        const id = this.getIdFromLink(documentLink, isNameBased);
        try {
            const response = await this.read(path, "docs", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads an Attachment object.
     * @memberof DocumentClient
     * @instance
     * @param {string} attachmentLink    - The self-link of the attachment.
     * @param {RequestOptions} [options] - The request options.
     * @param {ResponseCallback} callback - The callback for the request.
     */
    public async readAttachment(
        attachmentLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(attachmentLink);
        const path = this.getPathFromLink(attachmentLink, "", isNameBased);
        const id = this.getIdFromLink(attachmentLink, isNameBased);
        try {
            const response = await this.read(path, "attachments", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads a user.
     * @memberof DocumentClient
     * @instance
     * @param {string} userLink          - The self-link of the user.
     * @param {RequestOptions} [options] - The request options.
     * @param {ResponseCallback} callback - The callback for the request.
     */
    public async readUser(
        userLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<any>) { // TODO: any user
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(userLink);
        const path = this.getPathFromLink(userLink, "", isNameBased);
        const id = this.getIdFromLink(userLink, isNameBased);

        try {
            const response = await this.read(path, "users", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads a permission.
     * @memberof DocumentClient
     * @instance
     * @param {string} permissionLink    - The self-link of the permission.
     * @param {RequestOptions} [options] - The request options.
     * @param {ResponseCallback} callback - The callback for the request.
     */
    public async readPermission(
        permissionLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(permissionLink);
        const path = this.getPathFromLink(permissionLink, "", isNameBased);
        const id = this.getIdFromLink(permissionLink, isNameBased);

        try {
            const response = await this.read(path, "permissions", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads a trigger object.
     * @memberof DocumentClient
     * @instance
     * @param {string} triggerLink       - The self-link of the trigger.
     * @param {RequestOptions} [options] - The request options.
     * @param {ResponseCallback} callback - The callback for the request.
     */
    public async readTrigger(
        triggerLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const resourceInfo = Base.parseLink(triggerLink);

        const isNameBased = Base.isLinkNameBased(triggerLink);
        const path = this.getPathFromLink(triggerLink, "", isNameBased);
        const id = this.getIdFromLink(triggerLink, isNameBased);

        try {
            const response = await this.read(path, "triggers", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads a udf object.
     * @memberof DocumentClient
     * @instance
     * @param {string} udfLink           - The self-link of the user defined function.
     * @param {RequestOptions} [options] - The request options.
     * @param {ResponseCallback} callback - The callback for the request.
     */
    public async readUserDefinedFunction(
        udfLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(udfLink);
        const path = this.getPathFromLink(udfLink, "", isNameBased);
        const id = this.getIdFromLink(udfLink, isNameBased);

        try {
            const response = await this.read(path, "udfs", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads a StoredProcedure object.
     * @memberof DocumentClient
     * @instance
     * @param {string} sprocLink         - The self-link of the stored procedure.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public async readStoredProcedure(
        sprocLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(sprocLink);
        const path = this.getPathFromLink(sprocLink, "", isNameBased);
        const id = this.getIdFromLink(sprocLink, isNameBased);
        try {
            const response = await this.read(path, "sprocs", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Reads a conflict.
     * @memberof DocumentClient
     * @instance
     * @param {string} conflictLink      - The self-link of the conflict.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public async readConflict(
        conflictLink: string,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any conflict
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(conflictLink);
        const path = this.getPathFromLink(conflictLink, "", isNameBased);
        const id = this.getIdFromLink(conflictLink, isNameBased);

        try {
            const response = await this.read(path, "users", id, undefined, options);
            return Base.ResponseOrCallback(callback, response);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Lists all databases.
     * @memberof DocumentClient
     * @instance
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readDatabases(options?: FeedOptions) {
        return this.queryDatabases(undefined, options);
    }

    /**
     * Get all collections in this database.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink   - The self-link of the database.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readCollections(databaseLink: string, options?: FeedOptions) {
        return this.queryCollections(databaseLink, undefined, options);
    }

    /**
     * Get all documents in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink - The self-link of the collection.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readDocuments(collectionLink: string, options?: FeedOptions) {
        return this.queryDocuments(collectionLink, undefined, options);
    }

    /**
     * Get all Partition key Ranges in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink - The self-link of the collection.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     * @ignore
     */
    public readPartitionKeyRanges(collectionLink: string, options?: FeedOptions) {
        return this.queryPartitionKeyRanges(collectionLink, undefined, options);
    }

    /**
     * Get all attachments for this document.
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink   - The self-link of the document.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readAttachments(documentLink: string, options?: FeedOptions) {
        return this.queryAttachments(documentLink, undefined, options);
    }

    /**
     * Get all users in this database.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink       - The self-link of the database.
     * @param {FeedOptions} [feedOptions] - The feed options.
     * @returns {QueryIterator}           - An instance of queryIterator to handle reading feed.
     */
    public readUsers(databaseLink: string, options?: FeedOptions) {
        return this.queryUsers(databaseLink, undefined, options);
    }

    /**
     * Get all permissions for this user.
     * @memberof DocumentClient
     * @instance
     * @param {string} userLink           - The self-link of the user.
     * @param {FeedOptions} [feedOptions] - The feed options.
     * @returns {QueryIterator}           - An instance of queryIterator to handle reading feed.
     */
    public readPermissions(userLink: string, options?: FeedOptions) {
        return this.queryPermissions(userLink, undefined, options);
    }

    /**
     * Get all triggers in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink   - The self-link of the collection.
     * @param {FeedOptions} [options]   - The feed options.
     * @returns {QueryIterator}         - An instance of queryIterator to handle reading feed.
     */
    public readTriggers(collectionLink: string, options?: FeedOptions) {
        return this.queryTriggers(collectionLink, undefined, options);
    }

    /**
     * Get all UserDefinedFunctions in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink - The self-link of the collection.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readUserDefinedFunctions(collectionLink: string, options?: FeedOptions) {
        return this.queryUserDefinedFunctions(collectionLink, undefined, options);
    }

    /**
     * Get all StoredProcedures in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink - The self-link of the collection.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readStoredProcedures(collectionLink: string, options?: FeedOptions) {
        return this.queryStoredProcedures(collectionLink, undefined, options);
    }

    /**
     * Get all conflicts in this collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink - The self-link of the collection.
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of QueryIterator to handle reading feed.
     */
    public readConflicts(collectionLink: string, options?: FeedOptions) {
        return this.queryConflicts(collectionLink, undefined, options);
    }

    private processQueryFeedResponse(res: Response<any>, isQuery: boolean, result: any, create: any): Response<any> {
        if (isQuery) {
            return { result: result(res.result), headers: res.headers };
        } else {
            const newResult = Base.map(result(res.result), (body: any) => {
                return create(this, body);
            });
            return { result: newResult, headers: res.headers };
        }
    }

    /** @ignore */
    public async queryFeed(
        documentclient: DocumentClient,
        path: string,
        type: string, // TODO: code smell: enum?
        id: string,
        resultFn: (result: any) => any, // TODO: any
        createFn: (parent: DocumentClient, body: any) => any, // TODO: any
        query: SqlQuerySpec | string,
        options: FeedOptions,
        partitionKeyRangeId?: string): Promise<Response<any>> {

        try {
            // Query operations will use ReadEndpoint even though it uses
            // GET(for queryFeed) and POST(for regular query operations)
            const readEndpoint = await this._globalEndpointManager.getReadEndpoint();

            const request: any = { // TODO: any request
                path,
                operationType: Constants.OperationTypes.Query,
                client: this,
                endpointOverride: null,
            };

            let initialHeaders = Base.extend({}, documentclient.defaultHeaders);
            initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);
            if (query === undefined) {
                const reqHeaders = await Base.getHeaders(
                    documentclient, initialHeaders, "get", path, id, type, options, partitionKeyRangeId);
                this.applySessionToken(path, reqHeaders);

                const { result, headers: resHeaders } = await documentclient.get(readEndpoint, request, reqHeaders);
                this.captureSessionToken(path, Constants.OperationTypes.Query, reqHeaders, resHeaders);
                return this.processQueryFeedResponse({ result, headers: resHeaders }, !!query, resultFn, createFn);
            } else {
                initialHeaders[Constants.HttpHeaders.IsQuery] = "true";
                switch (this.queryCompatibilityMode) {
                    case QueryCompatibilityMode.SqlQuery:
                        initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.SQL;
                        break;
                    case QueryCompatibilityMode.Query:
                    case QueryCompatibilityMode.Default:
                    default:
                        if (typeof query === "string") {
                            query = { query };  // Converts query text to query object.
                        }
                        initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.QueryJson;
                        break;
                }

                const reqHeaders = await Base.getHeaders(
                    documentclient, initialHeaders, "post", path, id, type, options, partitionKeyRangeId);
                this.applySessionToken(path, reqHeaders);

                const response =
                    await documentclient.post(readEndpoint, request, query, reqHeaders);
                const { result, headers: resHeaders } = response;
                this.captureSessionToken(path, Constants.OperationTypes.Query, reqHeaders, resHeaders);
                return this.processQueryFeedResponse({ result, headers: resHeaders }, !!query, resultFn, createFn);
            }

        } catch (err) {
            throw err;
        }
    }

    /**
     * Lists all databases that satisfy a query.
     * @memberof DocumentClient
     * @instance
     * @param {SqlQuerySpec | string} query - A SQL query.
     * @param {FeedOptions} [options]       - The feed options.
     * @returns {QueryIterator}             - An instance of QueryIterator to handle reading feed.
     */
    public queryDatabases(query: SqlQuerySpec | string, options?: FeedOptions) {
        const cb: FetchFunctionCallback = (innerOptions) => {
            return this.queryFeed(
                this,
                "/dbs",
                "dbs",
                "",
                (result) => result.Databases,
                (parent, body) => body,
                query,
                innerOptions);
        };
        return new QueryIterator(this, query, options, cb);
    }

    /**
     * Query the collections for the database.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink           - The self-link of the database.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     */
    public queryCollections(databaseLink: string, query: string | SqlQuerySpec, options?: FeedOptions) {
        const isNameBased = Base.isLinkNameBased(databaseLink);
        const path = this.getPathFromLink(databaseLink, "colls", isNameBased);
        const id = this.getIdFromLink(databaseLink, isNameBased);

        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                path,
                "colls",
                id,
                (result) => result.DocumentCollections,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /**
     * Query the documents for the collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} documentsFeedOrDatabaseLink          -\
     * The collection link or database link if using a partition resolver
     * @param {SqlQuerySpec | string} query                 - A SQL query.
     * @param {FeedOptions} [options]                       - Represents the feed options.
     * @param {object} [options.partitionKey]               - \
     * Optional partition key to be used with the partition resolver
     * @returns {QueryIterator}                             - An instance of queryIterator to handle reading feed.
     */
    public queryDocuments(documentsFeedOrDatabaseLink: string, query?: string | SqlQuerySpec, options?: FeedOptions) {
        const partitionResolver = this.partitionResolvers[documentsFeedOrDatabaseLink];
        const collectionLinks = (partitionResolver === undefined || partitionResolver === null)
            ? [documentsFeedOrDatabaseLink]
            : partitionResolver.resolveForRead(options && options.partitionKey);
        return this.queryDocumentsPrivate(collectionLinks, query, options);
    }

    /**
     * Query the partition key ranges
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink           - The self-link of the database.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     * @ignore
     */
    public queryPartitionKeyRanges(collectionLink: string, query: string | SqlQuerySpec, options?: FeedOptions) {
        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "pkranges", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                path,
                "pkranges",
                id,
                (result) => result.PartitionKeyRanges,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /**
     * Query the attachments for the document.
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink           - The self-link of the document.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     */
    public queryAttachments(documentLink: string, query: string | SqlQuerySpec, options?: FeedOptions) {
        const isNameBased = Base.isLinkNameBased(documentLink);
        const path = this.getPathFromLink(documentLink, "attachments", isNameBased);
        const id = this.getIdFromLink(documentLink, isNameBased);

        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                path,
                "attachments",
                id,
                (result) => result.Attachments,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /**
     * Query the users for the database.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink           - The self-link of the database.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     */
    public queryUsers(databaseLink: string, query: string | SqlQuerySpec, options?: FeedOptions) {
        const isNameBased = Base.isLinkNameBased(databaseLink);
        const path = this.getPathFromLink(databaseLink, "users", isNameBased);
        const id = this.getIdFromLink(databaseLink, isNameBased);

        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                path,
                "users",
                id,
                (result) => result.Users,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /**
     * Query the permission for the user.
     * @memberof DocumentClient
     * @instance
     * @param {string} userLink               - The self-link of the user.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     */
    public queryPermissions(userLink: string, query: string | SqlQuerySpec, options?: FeedOptions) {
        const isNameBased = Base.isLinkNameBased(userLink);
        const path = this.getPathFromLink(userLink, "permissions", isNameBased);
        const id = this.getIdFromLink(userLink, isNameBased);

        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                path,
                "permissions",
                id,
                (result) => result.Permissions,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /**
     * Query the triggers for the collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink         - The self-link of the collection.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     */
    public queryTriggers(collectionLink: string, query: string | SqlQuerySpec, options?: FeedOptions) {
        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "triggers", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                path,
                "triggers",
                id,
                (result) => result.Triggers,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /**
     * Query the user defined functions for the collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink         - The self-link of the collection.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     */
    public queryUserDefinedFunctions(collectionLink: string, query: string | SqlQuerySpec, options?: FeedOptions) {
        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "udfs", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                path,
                "udfs",
                id,
                (result) => result.UserDefinedFunctions,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /**
     * Query the storedProcedures for the collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink         - The self-link of the collection.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     */
    public queryStoredProcedures(collectionLink: string, query: string | SqlQuerySpec, options?: FeedOptions) {
        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "sprocs", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                path,
                "sprocs",
                id,
                (result) => result.StoredProcedures,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /**
     * Query the conflicts for the collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink         - The self-link of the collection.
     * @param {SqlQuerySpec | string} query   - A SQL query.
     * @param {FeedOptions} [options]         - Represents the feed options.
     * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
     */
    public queryConflicts(collectionLink: string, query: string | SqlQuerySpec, options?: FeedOptions) {
        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "conflicts", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                path,
                "conflicts",
                id,
                (result) => result.Conflicts,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /**
     * Delete the database object.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink         - The self-link of the database.
     * @param {RequestOptions} [options]    - The request options.
     * @param {ResponseCallback<any>} callback    - The callback for the request.
     */
    public deleteDatabase(
        databaseLink: string, options?: RequestOptions, callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(databaseLink);
        const path = this.getPathFromLink(databaseLink, "", isNameBased);
        const id = this.getIdFromLink(databaseLink, isNameBased);
        return this.deleteResource(path, "dbs", id, undefined, options, callback);
    }

    /**
     * Delete the collection object.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink    - The self-link of the collection.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public deleteCollection(collectionLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return this.deleteResource(path, "colls", id, undefined, options, callback);
    }

    /**
     * Delete the document object.
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink      - The self-link of the document.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public deleteDocument(documentLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(documentLink);
        const path = this.getPathFromLink(documentLink, "", isNameBased);
        const id = this.getIdFromLink(documentLink, isNameBased);

        return this.deleteResource(path, "docs", id, undefined, options, callback);
    }

    /**
     * Delete the attachment object.
     * @memberof DocumentClient
     * @instance
     * @param {string} attachmentLink    - The self-link of the attachment.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public deleteAttachment(attachmentLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(attachmentLink);
        const path = this.getPathFromLink(attachmentLink, "", isNameBased);
        const id = this.getIdFromLink(attachmentLink, isNameBased);

        return this.deleteResource(path, "attachments", id, undefined, options, callback);
    }

    /**
     * Delete the user object.
     * @memberof DocumentClient
     * @instance
     * @param {string} userLink          - The self-link of the user.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public deleteUser(userLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(userLink);
        const path = this.getPathFromLink(userLink, "", isNameBased);
        const id = this.getIdFromLink(userLink, isNameBased);

        return this.deleteResource(path, "users", id, undefined, options, callback);
    }

    /**
     * Delete the permission object.
     * @memberof DocumentClient
     * @instance
     * @param {string} permissionLink    - The self-link of the permission.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public deletePermission(permissionLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(permissionLink);
        const path = this.getPathFromLink(permissionLink, "", isNameBased);
        const id = this.getIdFromLink(permissionLink, isNameBased);

        return this.deleteResource(path, "permissions", id, undefined, options, callback);
    }

    /**
     * Delete the trigger object.
     * @memberof DocumentClient
     * @instance
     * @param {string} triggerLink       - The self-link of the trigger.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public deleteTrigger(triggerLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(triggerLink);
        const path = this.getPathFromLink(triggerLink, "", isNameBased);
        const id = this.getIdFromLink(triggerLink, isNameBased);

        return this.deleteResource(path, "triggers", id, undefined, options, callback);
    }

    /**
     * Delete the UserDefinedFunction object.
     * @memberof DocumentClient
     * @instance
     * @param {string} udfLink           - The self-link of the user defined function.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public deleteUserDefinedFunction(udfLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(udfLink);
        const path = this.getPathFromLink(udfLink, "", isNameBased);
        const id = this.getIdFromLink(udfLink, isNameBased);

        return this.deleteResource(path, "udfs", id, undefined, options, callback);
    }

    /**
     * Delete the StoredProcedure object.
     * @memberof DocumentClient
     * @instance
     * @param {string} sprocLink         - The self-link of the stored procedure.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public deleteStoredProcedure(sprocLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(sprocLink);
        const path = this.getPathFromLink(sprocLink, "", isNameBased);
        const id = this.getIdFromLink(sprocLink, isNameBased);

        return this.deleteResource(path, "sprocs", id, undefined, options, callback);
    }

    /**
     * Delete the conflict object.
     * @memberof DocumentClient
     * @instance
     * @param {string} conflictLink      - The self-link of the conflict.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public deleteConflict(conflictLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(conflictLink);
        const path = this.getPathFromLink(conflictLink, "", isNameBased);
        const id = this.getIdFromLink(conflictLink, isNameBased);

        return this.deleteResource(path, "conflicts", id, undefined, options, callback);
    }

    /**
     * Replace the document collection.
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink    - The self-link of the document collection.
     * @param {object} collection        - Represent the new document collection body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceCollection(
        collectionLink: string,
        collection: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(collection, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return this.replace(collection, path, "colls", id, undefined, options, callback);
    }

    /**
     * Replace the document object.
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink      - The self-link of the document.
     * @param {object} document          - Represent the new document body.
     * @param {RequestOptions} [options] - The request options.
     * @param {ResponseCallback} callback - The callback for the request.
     */
    public async replaceDocument(
        documentLink: string,
        newDocument: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        try {
            if (options.partitionKey === undefined && options.skipGetPartitionKeyDefinition !== true) {
                const { result: partitionKeyDefinition } =
                    await this.getPartitionKeyDefinition(Base.getCollectionLink(documentLink));
                options.partitionKey = this.extractPartitionKey(newDocument, partitionKeyDefinition);
            }

            const err = {};
            if (!this.isResourceValid(newDocument, err)) {
                Base.ThrowOrCallback(callback, err);
                return;
            }

            const isNameBased = Base.isLinkNameBased(documentLink);
            const path = this.getPathFromLink(documentLink, "", isNameBased);
            const id = this.getIdFromLink(documentLink, isNameBased);

            return this.replace(newDocument, path, "docs", id, undefined, options, callback);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Replace the attachment object.
     * @memberof DocumentClient
     * @instance
     * @param {string} attachmentLink    - The self-link of the attachment.
     * @param {object} attachment        - Represent the new attachment body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceAttachment(
        attachmentLink: string, attachment: any, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(attachment, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(attachmentLink);
        const path = this.getPathFromLink(attachmentLink, "", isNameBased);
        const id = this.getIdFromLink(attachmentLink, isNameBased);

        return this.replace(attachment, path, "attachments", id, undefined, options, callback);
    }

    /**
     * Replace the user object.
     * @memberof DocumentClient
     * @instance
     * @param {string} userLink          - The self-link of the user.
     * @param {object} user              - Represent the new user body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceUser(
        userLink: string, user: any, options?: RequestOptions, callback?: ResponseCallback<any>) { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(user, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(userLink);
        const path = this.getPathFromLink(userLink, "", isNameBased);
        const id = this.getIdFromLink(userLink, isNameBased);

        return this.replace(user, path, "users", id, undefined, options, callback);
    }

    /**
     * Replace the permission object.
     * @memberof DocumentClient
     * @instance
     * @param {string} permissionLink    - The self-link of the permission.
     * @param {object} permission        - Represent the new permission body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replacePermission(
        permissionLink: string, permission: any,
        options?: RequestOptions, callback?: ResponseCallback<any>) { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(permission, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(permissionLink);
        const path = this.getPathFromLink(permissionLink, "", isNameBased);
        const id = this.getIdFromLink(permissionLink, isNameBased);

        return this.replace(permission, path, "permissions", id, undefined, options, callback);
    }

    /**
     * Replace the trigger object.
     * @memberof DocumentClient
     * @instance
     * @param {string} triggerLink       - The self-link of the trigger.
     * @param {object} trigger           - Represent the new trigger body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceTrigger(
        triggerLink: string, trigger: any, options?: RequestOptions, callback?: ResponseCallback<any>) { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (trigger.serverScript) {
            trigger.body = trigger.serverScript.toString();
        } else if (trigger.body) {
            trigger.body = trigger.body.toString();
        }

        const err = {};
        if (!this.isResourceValid(trigger, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(triggerLink);
        const path = this.getPathFromLink(triggerLink, "", isNameBased);
        const id = this.getIdFromLink(triggerLink, isNameBased);

        return this.replace(trigger, path, "triggers", id, undefined, options, callback);
    }

    /**
     * Replace the UserDefinedFunction object.
     * @memberof DocumentClient
     * @instance
     * @param {string} udfLink           - The self-link of the user defined function.
     * @param {object} udf               - Represent the new udf body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceUserDefinedFunction(
        udfLink: string, udf: any, options?: RequestOptions, callback?: ResponseCallback<any>) { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (udf.serverScript) {
            udf.body = udf.serverScript.toString();
        } else if (udf.body) {
            udf.body = udf.body.toString();
        }

        const err = {};
        if (!this.isResourceValid(udf, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(udfLink);
        const path = this.getPathFromLink(udfLink, "", isNameBased);
        const id = this.getIdFromLink(udfLink, isNameBased);

        return this.replace(udf, path, "udfs", id, undefined, options, callback);
    }

    /**
     * Replace the StoredProcedure object.
     * @memberof DocumentClient
     * @instance
     * @param {string} sprocLink         - The self-link of the stored procedure.
     * @param {object} sproc             - Represent the new sproc body.
     * @param {RequestOptions} [options] - The request options.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceStoredProcedure(
        sprocLink: string, sproc: any, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (sproc.serverScript) {
            sproc.body = sproc.serverScript.toString();
        } else if (sproc.body) {
            sproc.body = sproc.body.toString();
        }

        const err = {};
        if (!this.isResourceValid(sproc, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(sprocLink);
        const path = this.getPathFromLink(sprocLink, "", isNameBased);
        const id = this.getIdFromLink(sprocLink, isNameBased);

        return this.replace(sproc, path, "sprocs", id, undefined, options, callback);
    }

    /**
     * Upsert a document.
     * <p>
     * There is no set schema for JSON documents. They may contain any number of custom properties as \
     * well as an optional list of attachments. <br>
     * A Document is an application resource and can be authorized using the master key or resource keys
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} documentsFeedOrDatabaseLink               - \
     * The collection link or database link if using a partition resolver
     * @param {object} body                                      - \
     * Represents the body of the document. Can contain any number of user defined properties.
     * @param {string} [body.id]                                 - \
     * The id of the document, MUST be unique for each document.
     * @param {number} body.ttl                                  - The time to live in seconds of the document.
     * @param {RequestOptions} [options]                         - The request options.
     * @param {boolean} [options.disableAutomaticIdGeneration]   - \
     * Disables the automatic id generation. If id is missing in the body and this option is true, an error \
     * will be returned.
     * @param {RequestCallback} callback                         - The callback for the request.
     */
    public upsertDocument(
        documentsFeedOrDatabaseLink: string,
        body: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any
        const partitionResolver = this.partitionResolvers[documentsFeedOrDatabaseLink];

        const collectionLink = (partitionResolver === undefined || partitionResolver === null)
            ? documentsFeedOrDatabaseLink
            : this.resolveCollectionLinkForCreate(partitionResolver, body);

        return this.upsertDocumentPrivate(collectionLink, body, options, callback);
    }

    /**
     * Upsert an attachment for the document object.
     * <p>
     * Each document may contain zero or more attachments.
     * Attachments can be of any MIME type - text, image, binary data. <br>
     * These are stored externally in Azure Blob storage.
     * Attachments are automatically deleted when the parent document is deleted.
     * </P>
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink         - The self-link of the document.
     * @param {Object} body                 - \
     * The metadata the defines the attachment media like media, contentType.
     * It can include any other properties as part of the metedata.
     * @param {string} body.contentType     - The MIME contentType of the attachment.
     * @param {string} body.media           - Media link associated with the attachment content.
     * @param {RequestOptions} options      - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public upsertAttachment(
        documentLink: string, body: any, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(body, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(documentLink);
        const path = this.getPathFromLink(documentLink, "attachments", isNameBased);
        const id = this.getIdFromLink(documentLink, isNameBased);

        return this.upsert(body, path, "attachments", id, undefined, options, callback);
    }

    /**
     * Upsert a database user.
     * @memberof DocumentClient
     * @instance
     * @param {string} databaseLink         - The self-link of the database.
     * @param {object} body                 - Represents the body of the user.
     * @param {string} body.id              - The id of the user.
     * @param {RequestOptions} [options]    - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public upsertUser(databaseLink: string, body: any, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(body, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(databaseLink);
        const path = this.getPathFromLink(databaseLink, "users", isNameBased);
        const id = this.getIdFromLink(databaseLink, isNameBased);

        return this.upsert(body, path, "users", id, undefined, options, callback);
    }

    /**
     * Upsert a permission.
     * <p> A permission represents a per-User Permission to access a \
     * specific resource e.g. Document or Collection.  </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} userLink             - The self-link of the user.
     * @param {object} body                 - Represents the body of the permission.
     * @param {string} body.id              - The id of the permission
     * @param {string} body.permissionMode  - The mode of the permission, must be a value of {@link PermissionMode}
     * @param {string} body.resource        - The link of the resource that the permission will be applied to.
     * @param {RequestOptions} [options]    - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public upsertPermission(userLink: string, body: any, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const err = {};
        if (!this.isResourceValid(body, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(userLink);
        const path = this.getPathFromLink(userLink, "permissions", isNameBased);
        const id = this.getIdFromLink(userLink, isNameBased);

        return this.upsert(body, path, "permissions", id, undefined, options, callback);
    }

    /**
     * Upsert a trigger.
     * <p>
     * Azure Cosmos DB supports pre and post triggers defined in JavaScript to be
     * executed on creates, updates and deletes. <br>
     * For additional details, refer to the server-side JavaScript API documentation.
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink           - The self-link of the collection.
     * @param {object} trigger                  - Represents the body of the trigger.
     * @param {string} trigger.id             - The id of the trigger.
     * @param {string} trigger.triggerType      -
     * The type of the trigger, should be one of the values of {@link TriggerType}.
     * @param {string} trigger.triggerOperation -
     * The trigger operation, should be one of the values of {@link TriggerOperation}.
     * @param {function} trigger.serverScript   - The body of the trigger, it can be passed as stringified too.
     * @param {RequestOptions} [options]        - The request options.
     * @param {RequestCallback} callback        - The callback for the request.
     */
    public upsertTrigger(
        collectionLink: string, trigger: any, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (trigger.serverScript) {
            trigger.body = trigger.serverScript.toString();
        } else if (trigger.body) {
            trigger.body = trigger.body.toString();
        }

        const err = {};
        if (!this.isResourceValid(trigger, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "triggers", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return this.upsert(trigger, path, "triggers", id, undefined, options, callback);
    }

    /**
     * Upsert a UserDefinedFunction.
     * <p>
     * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers. <br>
     * For additional details, refer to the server-side JavaScript API documentation.
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink                - The self-link of the collection.
     * @param {object} udf                           - Represents the body of the userDefinedFunction.
     * @param {string} udf.id                      - The id of the udf.
     * @param {string} udf.userDefinedFunctionType   -
     * The type of the udf, it should be one of the values of {@link UserDefinedFunctionType}
     * @param {function} udf.serverScript            -
     * Represents the body of the udf, it can be passed as stringified too.
     * @param {RequestOptions} [options]             - The request options.
     * @param {RequestCallback} callback             - The callback for the request.
     */
    public upsertUserDefinedFunction(
        collectionLink: string, udf: any, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (udf.serverScript) {
            udf.body = udf.serverScript.toString();
        } else if (udf.body) {
            udf.body = udf.body.toString();
        }

        const err = {};
        if (!this.isResourceValid(udf, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "udfs", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return this.upsert(udf, path, "udfs", id, undefined, options, callback);
    }

    /**
     * Upsert a StoredProcedure.
     * <p>
     * Azure Cosmos DB allows stored procedures to be executed in the storage tier,
     * directly against a document collection. The script <br>
     * gets executed under ACID transactions on the primary storage partition of the
     *  specified collection. For additional details, <br>
     * refer to the server-side JavaScript API documentation.
     * </p>
     * @memberof DocumentClient
     * @instance
     * @param {string} collectionLink       - The self-link of the collection.
     * @param {object} sproc                - Represents the body of the stored procedure.
     * @param {string} sproc.id           - The id of the stored procedure.
     * @param {function} sproc.serverScript - The body of the stored procedure, it can be passed as stringified too.
     * @param {RequestOptions} [options]    - The request options.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public upsertStoredProcedure(
        collectionLink: string, sproc: any, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (sproc.serverScript) {
            sproc.body = sproc.serverScript.toString();
        } else if (sproc.body) {
            sproc.body = sproc.body.toString();
        }

        const err = {};
        if (!this.isResourceValid(sproc, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "sprocs", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return this.upsert(sproc, path, "sprocs", id, undefined, options, callback);
    }

    /**
     * Upsert an attachment for the document object.
     * @memberof DocumentClient
     * @instance
     * @param {string} documentLink             - The self-link of the document.
     * @param {stream.Readable} readableStream  - the stream that represents the media itself that needs to be uploaded.
     * @param {MediaOptions} [options]          - The request options.
     * @param {RequestCallback} callback        - The callback for the request.
     */
    public upsertAttachmentAndUploadMedia(
        documentLink: string, readableStream: ReadableStream,
        options?: MediaOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        let initialHeaders = Base.extend({}, this.defaultHeaders);
        initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);

        // Add required headers slug and content-type.
        if (options.slug) {
            initialHeaders[Constants.HttpHeaders.Slug] = options.slug;
        }

        initialHeaders[Constants.HttpHeaders.ContentType] = options.contentType || Constants.MediaTypes.OctetStream;

        const isNameBased = Base.isLinkNameBased(documentLink);
        const path = this.getPathFromLink(documentLink, "attachments", isNameBased);
        const id = this.getIdFromLink(documentLink, isNameBased);

        return this.upsert(readableStream, path, "attachments", id, initialHeaders, options, callback);
    }

    /**
     * Read the media for the attachment object.
     * @memberof DocumentClient
     * @instance
     * @param {string} mediaLink         - The media link of the media in the attachment.
     * @param {RequestCallback} callback -
     * The callback for the request, the result parameter can be a buffer or a stream
     *                                     depending on the value of {@link MediaReadMode}.
     */
    public async readMedia(mediaLink: string, callback?: ResponseCallback<any>) {
        const resourceInfo = Base.parseLink(mediaLink);
        const path = mediaLink;
        const initialHeaders = Base.extend({}, this.defaultHeaders);
        initialHeaders[Constants.HttpHeaders.Accept] = Constants.MediaTypes.Any;
        const attachmentId = Base.getAttachmentIdFromMediaId(resourceInfo.objectBody.id).toLowerCase();

        try {
            const reqHeaders = await Base.getHeaders(this, initialHeaders, "get", path, attachmentId, "media", {});
            // readMedia will always use WriteEndpoint since it's not replicated in readable Geo regions
            const writeEndpoint = await this._globalEndpointManager.getWriteEndpoint();
            const results = await this.get(writeEndpoint, path, reqHeaders);
            return Base.ResponseOrCallback(callback, results);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Update media for the attachment
     * @memberof DocumentClient
     * @instance
     * @param {string} mediaLink                - The media link of the media in the attachment.
     * @param {stream.Readable} readableStream  - The stream that represents the media itself that needs to be uploaded.
     * @param {MediaOptions} [options]          - options for the media
     * @param {RequestCallback} callback        - The callback for the request.
     */
    public async updateMedia(
        mediaLink: string, readableStream: ReadableStream,
        options?: MediaOptions, callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const defaultHeaders = this.defaultHeaders;
        let initialHeaders = Base.extend({}, defaultHeaders);
        initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);

        // Add required headers slug and content-type in case the body is a stream
        if (options.slug) {
            initialHeaders[Constants.HttpHeaders.Slug] = options.slug;
        }

        initialHeaders[Constants.HttpHeaders.ContentType] = options.contentType || Constants.MediaTypes.OctetStream;

        initialHeaders[Constants.HttpHeaders.Accept] = Constants.MediaTypes.Any;

        const resourceInfo = Base.parseLink(mediaLink);
        const path = "/" + mediaLink;
        const attachmentId = Base.getAttachmentIdFromMediaId(resourceInfo.objectBody.id).toLowerCase();

        // updateMedia will use WriteEndpoint since it uses PUT operation

        try {
            const headers = await Base.getHeaders(this, initialHeaders, "put", path, attachmentId, "media", options);
            const writeEndpoint = await this._globalEndpointManager.getWriteEndpoint();
            const results = await this.put(writeEndpoint, path, readableStream, headers);
            return Base.ResponseOrCallback(callback, results);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Execute the StoredProcedure represented by the object with partition key.
     * @memberof DocumentClient
     * @instance
     * @param {string} sprocLink            - The self-link of the stored procedure.
     * @param {Array} [params]              - represent the parameters of the stored procedure.
     * @param {Object} [options]            - partition key
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public async executeStoredProcedure(
        sprocLink: string, params?: any[], // TODO: any
        options?: RequestOptions, callback?: ResponseCallback<any>) {
        if (!callback && !options) {
            if (typeof params === "function") {
                callback = params;
                params = null;
                options = {};
            }
        } else if (!callback) {
            if (typeof options === "function") {
                callback = options;
                options = {};
            }
        }

        const defaultHeaders = this.defaultHeaders;
        let initialHeaders = {};
        initialHeaders = Base.extend(initialHeaders, defaultHeaders);
        initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);

        // Accept a single parameter or an array of parameters.
        // Didn't add type annotation for this because we should legacy this behavior
        if (params !== null && params !== undefined && !Array.isArray(params)) {
            params = [params];
        }

        const isNameBased = Base.isLinkNameBased(sprocLink);
        const path = this.getPathFromLink(sprocLink, "", isNameBased);
        const id = this.getIdFromLink(sprocLink, isNameBased);
        try {
            const headers = await Base.getHeaders(this, initialHeaders, "post", path, id, "sprocs", options);
            // executeStoredProcedure will use WriteEndpoint since it uses POST operation
            const writeEndpoint = await this._globalEndpointManager.getWriteEndpoint();
            const results = await this.post(writeEndpoint, path, params, headers);
            return Base.ResponseOrCallback(callback, results);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Replace the offer object.
     * @memberof DocumentClient
     * @instance
     * @param {string} offerLink         - The self-link of the offer.
     * @param {object} offer             - Represent the new offer body.
     * @param {RequestCallback} callback - The callback for the request.
     */
    public replaceOffer(offerLink: string, offer: any, callback?: ResponseCallback<any>) {
        const err = {};
        if (!this.isResourceValid(offer, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const path = "/" + offerLink;
        const id = Base.parseLink(offerLink).objectBody.id.toLowerCase();
        return this.replace(offer, path, "offers", id, undefined, {}, callback);
    }

    /**
     * Reads an offer.
     * @memberof DocumentClient
     * @instance
     * @param {string} offerLink         - The self-link of the offer.
     * @param {RequestCallback} callback    - The callback for the request.
     */
    public async readOffer(offerLink: string, callback?: ResponseCallback<any>) {
        const path = "/" + offerLink;
        const id = Base.parseLink(offerLink).objectBody.id.toLowerCase();
        return Base.ResponseOrCallback(callback, await this.read(path, "offers", id, undefined, {}));
    }

    /**
     * Lists all offers.
     * @memberof DocumentClient
     * @instance
     * @param {FeedOptions} [options] - The feed options.
     * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
     */
    public readOffers(options?: FeedOptions) {
        return this.queryOffers(undefined, options);
    }

    /**
     * Lists all offers that satisfy a query.
     * @memberof DocumentClient
     * @instance
     * @param {SqlQuerySpec | string} query - A SQL query.
     * @param {FeedOptions} [options]       - The feed options.
     * @returns {QueryIterator}             - An instance of QueryIterator to handle reading feed.
     */
    public queryOffers(query: string | SqlQuerySpec, options?: FeedOptions) {
        return new QueryIterator(this, query, options, (innerOptions) => {
            return this.queryFeed(
                this,
                "/offers",
                "offers",
                "",
                (result) => result.Offers,
                (parent, body) => body,
                query,
                innerOptions);
        });
    }

    /** @ignore */
    public async createDocumentPrivate(
        collectionLink: string, body: any,
        options?: RequestOptions, callback?: ResponseCallback<any>): Promise<Response<any>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        try {
            if (options.partitionKey === undefined && options.skipGetPartitionKeyDefinition !== true) {
                const { result: partitionKeyDefinition } = await this.getPartitionKeyDefinition(collectionLink);
                options.partitionKey = this.extractPartitionKey(body, partitionKeyDefinition);
            }

            // Generate random document id if the id is missing in the payload and
            // options.disableAutomaticIdGeneration != true
            if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
                body.id = Base.generateGuidId();
            }

            const err = {};
            if (!this.isResourceValid(body, err)) {
                Base.ThrowOrCallback(callback, err);
                return;
            }

            const isNameBased = Base.isLinkNameBased(collectionLink);
            const path = this.getPathFromLink(collectionLink, "docs", isNameBased);
            const id = this.getIdFromLink(collectionLink, isNameBased);

            const results = await this.create(body, path, "docs", id, undefined, options);
            return Base.ResponseOrCallback(callback, results);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /** @ignore */
    private async upsertDocumentPrivate(
        collectionLink: string, body: any,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> { // TODO: any
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        if (options.partitionKey === undefined && options.skipGetPartitionKeyDefinition !== true) {
            const { result: partitionKeyDefinition } = await this.getPartitionKeyDefinition(collectionLink);
            options.partitionKey = this.extractPartitionKey(body, partitionKeyDefinition);
        }

        // Generate random document id if the id is missing in the payload and
        // options.disableAutomaticIdGeneration != true
        if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
            body.id = Base.generateGuidId();
        }

        const err = {};
        if (!this.isResourceValid(body, err)) {
            Base.ThrowOrCallback(callback, err);
            return;
        }

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "docs", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return this.upsert(body, path, "docs", id, undefined, options, callback);
    }

    /** @ignore */
    public queryDocumentsPrivate(collectionLinks: string[], query: string | SqlQuerySpec, options?: FeedOptions) {
        const fetchFunctions = collectionLinks.map<FetchFunctionCallback>((collectionLink) => {
            const isNameBased = Base.isLinkNameBased(collectionLink);
            const path = this.getPathFromLink(collectionLink, "docs", isNameBased);
            const id = this.getIdFromLink(collectionLink, isNameBased);

            return (innerOptions: FeedOptions) => {
                return this.queryFeed(
                    this,
                    path,
                    "docs",
                    id,
                    (result) => result ? result.Documents : [],
                    (parent, body) => body,
                    query,
                    innerOptions);
            };
        });

        return new QueryIterator(this, query, options, fetchFunctions, collectionLinks);
    }

    /** @ignore */
    public async create<T>(
        body: T, path: string, type: string, id: string,
        initialHeaders: IHeaders, options?: RequestOptions, callback?: ResponseCallback<T>): Promise<Response<T>> {
        try {
            initialHeaders = initialHeaders || Base.extend({}, this.defaultHeaders);
            initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);
            const requestHeaders = await Base.getHeaders(this, initialHeaders, "post", path, id, type, options);

            // create will use WriteEndpoint since it uses POST operation
            this.applySessionToken(path, requestHeaders);

            const writeEndpoint = await this._globalEndpointManager.getWriteEndpoint();
            const { result, headers: resHeaders } = await this.post(writeEndpoint, path, body, requestHeaders);
            this.captureSessionToken(path, Constants.OperationTypes.Create, requestHeaders, resHeaders);
            return Base.ResponseOrCallback(callback, { result, headers: resHeaders });
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /** @ignore */
    public async upsert<T>(
        body: T, path: string, type: string, id: string,
        initialHeaders: IHeaders, options?: RequestOptions, callback?: ResponseCallback<T>): Promise<Response<T>> {
        try {
            initialHeaders = initialHeaders || Base.extend({}, this.defaultHeaders);
            initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);
            const requestHeaders = await Base.getHeaders(this, initialHeaders, "post", path, id, type, options);

            this.setIsUpsertHeader(requestHeaders);
            this.applySessionToken(path, requestHeaders);

            // upsert will use WriteEndpoint since it uses POST operation
            const writeEndpoint = await this._globalEndpointManager.getWriteEndpoint();
            const { result, headers: resHeaders } = await this.post(writeEndpoint, path, body, requestHeaders);
            this.captureSessionToken(path, Constants.OperationTypes.Upsert, requestHeaders, resHeaders);
            return Base.ResponseOrCallback(callback, { result, headers: resHeaders });
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /** @ignore */
    public async replace<T>(
        resource: string,
        path: string,
        type: string,
        id: string,
        initialHeaders: IHeaders,
        options?: RequestOptions,
        callback?: ResponseCallback<T>): Promise<Response<T>> {
        try {
            initialHeaders = initialHeaders || Base.extend({}, this.defaultHeaders);
            initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);
            const reqHeaders = await Base.getHeaders(this, initialHeaders, "put", path, id, type, options);
            this.applySessionToken(path, reqHeaders);

            // replace will use WriteEndpoint since it uses PUT operation
            const writeEndpoint = await this._globalEndpointManager.getWriteEndpoint();
            const result = await this.put(writeEndpoint, path, resource, reqHeaders);
            this.captureSessionToken(path, Constants.OperationTypes.Replace, reqHeaders, result.headers);
            return Base.ResponseOrCallback(callback, result);
        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /** @ignore */
    public async read<T>(
        path: string,
        type: string,
        id: string,
        initialHeaders: IHeaders,
        options?: RequestOptions): Promise<Response<T>> {
        initialHeaders = initialHeaders || Base.extend({}, this.defaultHeaders);
        initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);

        try {
            const requestHeaders = await Base.getHeaders(this, initialHeaders, "get", path, id, type, options);
            this.applySessionToken(path, requestHeaders);

            const request: any = { // TODO: any
                path,
                operationType: Constants.OperationTypes.Read,
                client: this,
                endpointOverride: null,
            };
            // read will use ReadEndpoint since it uses GET operation
            const readEndpoint = await this._globalEndpointManager.getReadEndpoint();
            const response = await this.get(readEndpoint, request, requestHeaders);
            this.captureSessionToken(path, Constants.OperationTypes.Read, requestHeaders, response.headers);
            return response;
        } catch (err) {
            throw err;
        }
    }

    /** @ignore */
    public async deleteResource(
        path: string,
        type: string,
        id: string,
        initialHeaders: IHeaders,
        options?: RequestOptions,
        callback?: ResponseCallback<any>): Promise<Response<any>> {
        try {
            initialHeaders = initialHeaders || Base.extend({}, this.defaultHeaders);
            initialHeaders = Base.extend(initialHeaders, options && options.initialHeaders);
            const reqHeaders = await Base.getHeaders(this, initialHeaders, "delete", path, id, type, options);

            this.applySessionToken(path, reqHeaders);
            // deleteResource will use WriteEndpoint since it uses DELETE operation
            const writeEndpoint = await this._globalEndpointManager.getWriteEndpoint();
            const response = await this.delete(writeEndpoint, path, reqHeaders);
            if (Base.parseLink(path).type !== "colls") {
                this.captureSessionToken(path, Constants.OperationTypes.Delete, reqHeaders, response.headers);
            } else {
                this.clearSessionToken(path);
            }
            return Base.ResponseOrCallback(callback, response);

        } catch (err) {
            Base.ThrowOrCallback(callback, err);
        }
    }

    /**
     * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
     * @ignore
     * @param {string} collectionLink   - Link to the collection whose partition key needs to be extracted.
     * @param {function} callback       - \
     * The arguments to the callback are(in order): error, partitionKeyDefinition, response object and response headers
     */
    public async getPartitionKeyDefinition(
        collectionLink: string, callback?: ResponseCallback<any>): Promise<Response<any>> {
        // $ISSUE-felixfan-2016-03-17: Make name based path and link based path use the same key
        // $ISSUE-felixfan-2016-03-17: Refresh partitionKeyDefinitionCache when necessary
        if (collectionLink in this.partitionKeyDefinitionCache) {
            return Base.ResponseOrCallback(callback, { result: this.partitionKeyDefinitionCache[collectionLink] });
        }

        try {
            const { result: collection, headers } = await this.readCollection(collectionLink);
            return Base.ResponseOrCallback(callback,
                { result: this.partitionKeyDefinitionCache[collectionLink], headers });
        } catch (err) {
            throw err;
        }
    }

    public extractPartitionKey(document: any, partitionKeyDefinition: any): any { // TODO: any
        if (partitionKeyDefinition && partitionKeyDefinition.paths && partitionKeyDefinition.paths.length > 0) {
            const partitionKey: PartitionKey[] = [];
            partitionKeyDefinition.paths.forEach((path: string) => {
                const pathParts = Base.parsePath(path);

                let obj = document;
                for (const part of pathParts) {
                    if (!((typeof obj === "object") && (part in obj))) {
                        obj = {};
                        break;
                    }

                    obj = obj[part];
                }

                partitionKey.push(obj);
            });

            return partitionKey;
        }

        return undefined;
    }

    // TODO: chrande made this public to maintain test coverage, but not really happy about it
    /** @ignore */
    public isResourceValid(resource: any, err: any) { // TODO: any TODO: code smell
        if (resource.id) {
            if (typeof resource.id !== "string") {
                err.message = "Id must be a string.";
                return false;
            }

            if (resource.id.indexOf("/") !== -1
                || resource.id.indexOf("\\") !== -1
                || resource.id.indexOf("?") !== -1
                || resource.id.indexOf("#") !== -1) {
                err.message = "Id contains illegal chars.";
                return false;
            }
            if (resource.id[resource.id.length - 1] === " ") {
                err.message = "Id ends with a space.";
                return false;
            }
        }
        return true;
    }

    /** @ignore */
    public resolveCollectionLinkForCreate(partitionResolver: any, document: Document) { // TODO: any
        const validation = this.isPartitionResolverValid(partitionResolver);
        if (!validation.valid) {
            throw validation.error;
        }

        const partitionKey = partitionResolver.getPartitionKey(document);
        return partitionResolver.resolveForCreate(partitionKey);
    }

    /** @ignore */
    public isPartitionResolverValid(partionResolver: any) { // TODO: any
        if (partionResolver === null || partionResolver === undefined) {
            return {
                valid: false,
                error: new Error("The partition resolver is null or undefined"),
            };
        }

        // TODO: code smell
        let validation = this.isPartitionResolveFunctionDefined(partionResolver, "getPartitionKey");
        if (!validation.valid) {
            return validation;
        }
        validation = this.isPartitionResolveFunctionDefined(partionResolver, "resolveForCreate");
        if (!validation.valid) {
            return validation;
        }
        validation = this.isPartitionResolveFunctionDefined(partionResolver, "resolveForRead");
        return validation;
    }

    /** @ignore */
    public isPartitionResolveFunctionDefined(partionResolver: any, functionName: string) { // TODO: any
        if (partionResolver === null || partionResolver === undefined) {
            return {
                valid: false,
                error: new Error("The partition resolver is null or undefined"),
            };
        }

        if (typeof partionResolver[functionName] === "function") {
            return {
                valid: true,
            };
        } else {
            return {
                valid: false,
                error: new Error(
                    `The partition resolver does not implement method ${functionName}. \
                    The type of ${functionName} is \"${typeof partionResolver[functionName]}\"`),
            };
        }
    }

    /** @ignore */
    public getIdFromLink(resourceLink: string, isNameBased: boolean) {
        if (isNameBased) {
            resourceLink = Base._trimSlashes(resourceLink);
            return resourceLink;
        } else {
            return Base.parseLink(resourceLink).objectBody.id.toLowerCase();
        }
    }

    /** @ignore */
    public getPathFromLink(resourceLink: string, resourceType: string, isNameBased: boolean) {
        if (isNameBased) {
            resourceLink = Base._trimSlashes(resourceLink);
            if (resourceType) {
                return "/" + encodeURI(resourceLink) + "/" + resourceType;
            } else {
                return "/" + encodeURI(resourceLink);
            }
        } else {
            if (resourceType) {
                return "/" + resourceLink + resourceType + "/";
            } else {
                return "/" + resourceLink;
            }
        }
    }

    /** @ignore */
    public setIsUpsertHeader(headers: IHeaders) {
        if (headers === undefined || headers === null) {
            throw new Error('The "headers" parameter must not be null or undefined');
        }

        if (!(headers instanceof Object)) {
            throw new Error(
                `The "headers" parameter must be an instance of "Object". Actual type is: "${typeof headers}".`);
        }

        headers[Constants.HttpHeaders.IsUpsert] = true;
    }

    /**
     * Gets the SessionToken for a given collectionLink
     * @memberof DocumentClient
     * @instance
     * @param collectionLink              - The link of the collection for which the session token is needed
     */
    public getSessionToken(collectionLink: string) {
        if (!collectionLink) {
            throw new Error("collectionLink cannot be null");
        }

        const paths = Base.parseLink(collectionLink);

        if (paths === undefined) {
            return "";
        }

        const request = this.getSessionParams(collectionLink);
        return this.sessionContainer.resolveGlobalSessionToken(request);
    }

    public applySessionToken(path: string, reqHeaders: IHeaders) {
        const request = this.getSessionParams(path);

        if (reqHeaders && reqHeaders[Constants.HttpHeaders.SessionToken]) {
            return;
        }

        const sessionConsistency = reqHeaders[Constants.HttpHeaders.ConsistencyLevel];
        if (!sessionConsistency) {
            return;
        }

        if (request["resourceAddress"]) {
            const sessionToken = this.sessionContainer.resolveGlobalSessionToken(request);
            if (sessionToken !== "") {
                reqHeaders[Constants.HttpHeaders.SessionToken] = sessionToken;
            }
        }
    }

    public captureSessionToken(path: string, opType: string, reqHeaders: IHeaders, resHeaders: IHeaders) {
        const request: any = this.getSessionParams(path); // TODO: any request
        request.operationType = opType;
        this.sessionContainer.setSessionToken(request, reqHeaders, resHeaders);
    }

    public clearSessionToken(path: string) {
        const request = this.getSessionParams(path);
        this.sessionContainer.clearToken(request);
    }

    public getSessionParams(resourceLink: string) {
        const isNameBased = Base.isLinkNameBased(resourceLink);
        let resourceId: string = null;
        let resourceAddress: string = null;
        const parserOutput = Base.parseLink(resourceLink);
        if (isNameBased) {
            resourceAddress = parserOutput.objectBody.self;
        } else {
            resourceAddress = parserOutput.objectBody.id;
            resourceId = parserOutput.objectBody.id;
        }
        const resourceType = parserOutput.type;
        return {
            isNameBased,
            resourceId,
            resourceAddress,
            resourceType,
        };
    }
}

/**
 * The request options
 * @typedef {Object} RequestOptions                          -         \
 * Options that can be specified for a requested issued to the Azure Cosmos DB servers.
 * @property {object} [accessCondition]                      -         \
 * Conditions Associated with the request.
 * @property {string} accessCondition.type                   -         \
 * Conditional HTTP method header type (IfMatch or IfNoneMatch).
 * @property {string} accessCondition.condition              -         \
 * Conditional HTTP method header value (the _etag field from the last version you read).
 * @property {string} [consistencyLevel]                     -         \
 * Consistency level required by the client.
 * @property {boolean} [disableRUPerMinuteUsage]             -         \
 * DisableRUPerMinuteUsage is used to enable/disable Request Units(RUs)/minute capacity to \
 * serve the request if regular provisioned RUs/second is exhausted.
 * @property {boolean} [enableScriptLogging]                 -         \
 * Enables or disables logging in JavaScript stored procedures.
 * @property {string} [indexingDirective]                    -         \
 * Specifies indexing directives (index, do not index .. etc).
 * @property {boolean} [offerEnableRUPerMinuteThroughput]    -         \
 * Represents Request Units(RU)/Minute throughput is enabled/disabled for a collection \
 * in the Azure Cosmos DB database service.
 * @property {number} [offerThroughput]                      -         \
 * The offer throughput provisioned for a collection in measurement of Requests-per-Unit \
 * in the Azure Cosmos DB database service.
 * @property {string} [offerType]                            -         Offer type when creating document collections.
 * <p>This option is only valid when creating a document collection.</p>
 * @property {string} [partitionKey]                         -         \
 * Specifies a partition key definition for a particular path in the Azure Cosmos DB database service.
 * @property {boolean} [populateQuotaInfo]                   -         \
 * Enables/disables getting document collection quota related stats for document collection read requests.
 * @property {string} [postTriggerInclude]                   -         \
 * Indicates what is the post trigger to be invoked after the operation.
 * @property {string} [preTriggerInclude]                    -         \
 * Indicates what is the pre trigger to be invoked before the operation.
 * @property {number} [resourceTokenExpirySeconds]           -         \
 * Expiry time (in seconds) for resource token associated with permission (applicable only for requests on permissions).
 * @property {string} [sessionToken]                         -         Token for use with Session consistency.
 */

export interface RequestOptions {
    accessCondition?: {
        type: string;
        condition: string;
    };
    consistencyLevel?: string;
    disableRUPerMinuteUsage?: boolean;
    enableScriptLogging?: boolean;
    indexingDirective?: string;
    offerEnableRUPerMinuteThroughput?: boolean;
    offerThroughput?: number;
    offerType?: string;
    partitionKey?: PartitionKey;
    populateQuotaInfo?: boolean;
    postTriggerInclude?: string | string[];
    preTriggerInclude?: string | string[];
    resourceTokenExpirySeconds?: number;
    sessionToken?: string;
    initialHeaders?: IHeaders;
    urlConnection?: string;
    skipGetPartitionKeyDefinition?: boolean;
    disableAutomaticIdGeneration?: boolean;
}

/**
 * The feed options
 * @typedef {Object} FeedOptions                    -       \
 * The feed options and query methods.
 * @property {string} [continuation]                -       Opaque token for continuing the enumeration.
 * @property {boolean} [disableRUPerMinuteUsage]    -       \
 * DisableRUPerMinuteUsage is used to enable/disable Request Units(RUs)/minute capacity to serve the \
 * request if regular provisioned RUs/second is exhausted.
 * @property {boolean} [enableCrossPartitionQuery]  -       \
 * A value indicating whether users are enabled to send more than one request to execute the query \
 * in the Azure Cosmos DB database service.
 * <p>More than one request is necessary if the query is not scoped to single partition key value.</p>
 * @property {boolean} [enableScanInQuery]          -       \
 * Allow scan on the queries which couldn't be served as indexing was opted out on the requested paths.
 * @property {number} [maxDegreeOfParallelism]      -       \
 * The maximum number of concurrent operations that run client side during parallel query execution \
 * in the Azure Cosmos DB database service. Negative values make the system automatically decides the \
 * number of concurrent operations to run.
 * @property {number} [maxItemCount]                -       \
 * Max number of items to be returned in the enumeration operation.
 * @property {string} [partitionKey]                -       \
 * Specifies a partition key definition for a particular path in the Azure Cosmos DB database service.
 * @property {string} [sessionToken]                -       Token for use with Session consistency.
 */
export interface FeedOptions {
    continuation?: string;
    disableRUPerMinuteUsage?: boolean;
    enableCrossPartitionQuery?: boolean;
    enableScanInQuery?: boolean;
    maxDegreeOfParallelism?: number;
    maxItemCount?: number;
    partitionKey?: string;
    sessionToken?: string;
    initialHeaders?: IHeaders;
    a_im?: string;
    accessCondition?: any; // TODO: any
}

/**
 * The media options
 * @typedef {Object} MediaOptions                                   -         Options associated with upload media.
 * @property {string} [slug]                                        -         HTTP Slug header value.
 * @property {string} [contentType=application/octet-stream]        -         HTTP ContentType header value.
 *
 */
export interface MediaOptions {
    initialHeaders?: IHeaders;
    slug?: string;
    contentType?: string;
}

/**
 * The callback to execute after the request execution.
 * @callback RequestCallback
 * @param {object} error            -       Will contain error information if an error occurs, undefined otherwise.
 * @param {number} error.code       -       The response code corresponding to the error.
 * @param {string} error.body       -       A string represents the error information.
 * @param {Object} resource         -       An object that represents the requested resource \
 * (Db, collection, document ... etc) if no error happens.
 * @param {object} responseHeaders  -       An object that contain the response headers.
 */
export interface RequestCallback {
    error?: RequestError;
    resource: any; // TODO: any
    responseHeaders?: IHeaders;
}

export interface RequestError {
    code?: number;
    body: string;
    headers?: IHeaders;
}

export interface Options {
    accessCondition?: {
        type: string;
        condition: string;
    };
    consistencyLevel?: string;
    enableScriptLogging?: boolean;
    indexingDirective?: string;
    offerEnableRUPerMinuteThroughput?: boolean;
    offerThroughput?: number;
    offerType?: string;
    populateQuotaInfo?: boolean;
    postTriggerInclude?: string | string[];
    preTriggerInclude?: string | string[];
    resourceTokenExpirySeconds?: number;
    continuation?: string;
    disableRUPerMinuteUsage?: boolean;
    enableCrossPartitionQuery?: boolean;
    enableScanInQuery?: boolean;
    maxDegreeOfParallelism?: number;
    maxItemCount?: number;
    partitionKey?: string;
    sessionToken?: string;
    slug?: string;
    contentType?: string;
    a_im?: string;
}

/**
 * The Indexing Policy represents the indexing policy configuration for a collection.
 * @typedef {Object} IndexingPolicy
 * @property {boolean} automatic -         Specifies whether automatic indexing is enabled for a collection.
 * <p>In automatic indexing, documents can be explicitly excluded from indexing using {@link RequestOptions}.
 * In manual indexing, documents can be explicitly included. </p>
 * @property {string} indexingMode -         The indexing mode (consistent or lazy) {@link IndexingMode}.
 * @property {Array} IncludedPaths -         An array of {@link IncludedPath} represents the paths to be \
 * included for indexing.
 * @property {Array} ExcludedPaths -         An array of {@link ExcludedPath} represents the paths to be \
 * excluded from indexing.
 *
 */

/**
 * <p> Included path. <br>
 * </p>
 * @typedef {Object} IncludedPath
 * @property {Array} Indexes                                               -         An array of {@link Indexes}.
 * @property {string} Path                                                 -         Path to be indexed.
 *
 */

/**
 * <p> Index specification. <br>
 * </p>
 * @typedef {Object} Indexes
 * @property {string} Kind                                                  -         The index kind {@link IndexKind}.
 * @property {string} DataType                                              -         The data type {@link DataType}.
 * @property {number} Precision                                             -         The precision.
 *
 */

/**
 * <p> Excluded path. <br>
 * </p>
 * @typedef {Object} ExcludedPath
 * @property {string} Path                                                  -         Path to be indexed.
 *
 */
