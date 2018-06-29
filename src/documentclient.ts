import { resolvePtr } from "dns";
import { basename } from "path";
import { Readable } from "stream";
import * as tunnel from "tunnel";
import * as url from "url";
import * as util from "util";
import { Base, ResponseCallback } from "./base";
import { Constants, Helper, Platform, StatusCodes, SubStatusCodes } from "./common";
import { DocumentClientBase } from "./DocumentClientBase";
import {
    ConnectionPolicy, ConsistencyLevel, DatabaseAccount, Document, PartitionKey, QueryCompatibilityMode,
} from "./documents";
import { GlobalEndpointManager } from "./globalEndpointManager";
import { FetchFunctionCallback, IHeaders, SqlQuerySpec } from "./queryExecutionContext";
import { QueryIterator } from "./queryIterator";
import { ErrorResponse, FeedOptions, MediaOptions, RequestHandler, RequestOptions, Response } from "./request";
import { RetryOptions } from "./retry";
import { SessionContainer } from "./sessionContainer";

export class DocumentClient extends DocumentClientBase {
    constructor(
        public urlConnection: string,
        auth: any,
        connectionPolicy?: ConnectionPolicy,
        consistencyLevel?: ConsistencyLevel) { // TODO: any auth options
        super(urlConnection, auth, connectionPolicy, consistencyLevel);
    }

    // NOT USED IN NEW OM
    public async getWriteEndpoint(callback?: (writeEndPoint: string) => void): Promise<string> {
        const p = this._globalEndpointManager.getWriteEndpoint();

        if (callback) {
            p.then(callback, callback);
        } else {
            return p;
        }
    }

    // NOT USED IN NEW OM
    public getReadEndpoint(callback?: (readEndPoint: string) => void): void | Promise<string> {
        const p = this._globalEndpointManager.getReadEndpoint();

        if (callback) {
            p.then(callback, callback);
        } else {
            return p;
        }
    }

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

    // NOT USED IN NEW OM
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

    // NOT USED IN NEW OM
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

    public readDatabases(options?: FeedOptions) {
        return this.queryDatabases(undefined, options);
    }

    public readCollections(databaseLink: string, options?: FeedOptions) {
        return this.queryCollections(databaseLink, undefined, options);
    }

    public readDocuments(collectionLink: string, options?: FeedOptions) {
        return this.queryDocuments(collectionLink, undefined, options);
    }

    public readPartitionKeyRanges(collectionLink: string, options?: FeedOptions) {
        return this.queryPartitionKeyRanges(collectionLink, undefined, options);
    }

    // NOT USED IN NEW OM
    public readAttachments(documentLink: string, options?: FeedOptions) {
        return this.queryAttachments(documentLink, undefined, options);
    }

    public readUsers(databaseLink: string, options?: FeedOptions) {
        return this.queryUsers(databaseLink, undefined, options);
    }

    public readPermissions(userLink: string, options?: FeedOptions) {
        return this.queryPermissions(userLink, undefined, options);
    }

    public readTriggers(collectionLink: string, options?: FeedOptions) {
        return this.queryTriggers(collectionLink, undefined, options);
    }

    public readUserDefinedFunctions(collectionLink: string, options?: FeedOptions) {
        return this.queryUserDefinedFunctions(collectionLink, undefined, options);
    }

    public readStoredProcedures(collectionLink: string, options?: FeedOptions) {
        return this.queryStoredProcedures(collectionLink, undefined, options);
    }

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
                this.captureSessionToken(undefined, path, Constants.OperationTypes.Query, resHeaders);
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
                this.captureSessionToken(undefined, path, Constants.OperationTypes.Query, resHeaders);
                return this.processQueryFeedResponse({ result, headers: resHeaders }, !!query, resultFn, createFn);
            }

        } catch (err) {
            throw err;
        }
    }

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

    public queryDocuments(documentsFeedOrDatabaseLink: string, query?: string | SqlQuerySpec, options?: FeedOptions) {
        const partitionResolver = this.partitionResolvers[documentsFeedOrDatabaseLink];
        const collectionLinks = (partitionResolver === undefined || partitionResolver === null)
            ? [documentsFeedOrDatabaseLink]
            : partitionResolver.resolveForRead(options && options.partitionKey);
        return this.queryDocumentsPrivate(collectionLinks, query, options);
    }

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

    // NOT USED IN NEW OM
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

    public deleteCollection(collectionLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(collectionLink);
        const path = this.getPathFromLink(collectionLink, "", isNameBased);
        const id = this.getIdFromLink(collectionLink, isNameBased);

        return this.deleteResource(path, "colls", id, undefined, options, callback);
    }

    public deleteDocument(documentLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(documentLink);
        const path = this.getPathFromLink(documentLink, "", isNameBased);
        const id = this.getIdFromLink(documentLink, isNameBased);

        return this.deleteResource(path, "docs", id, undefined, options, callback);
    }

    public deleteAttachment(attachmentLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(attachmentLink);
        const path = this.getPathFromLink(attachmentLink, "", isNameBased);
        const id = this.getIdFromLink(attachmentLink, isNameBased);

        return this.deleteResource(path, "attachments", id, undefined, options, callback);
    }

    public deleteUser(userLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(userLink);
        const path = this.getPathFromLink(userLink, "", isNameBased);
        const id = this.getIdFromLink(userLink, isNameBased);

        return this.deleteResource(path, "users", id, undefined, options, callback);
    }

    public deletePermission(permissionLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(permissionLink);
        const path = this.getPathFromLink(permissionLink, "", isNameBased);
        const id = this.getIdFromLink(permissionLink, isNameBased);

        return this.deleteResource(path, "permissions", id, undefined, options, callback);
    }

    public deleteTrigger(triggerLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(triggerLink);
        const path = this.getPathFromLink(triggerLink, "", isNameBased);
        const id = this.getIdFromLink(triggerLink, isNameBased);

        return this.deleteResource(path, "triggers", id, undefined, options, callback);
    }

    public deleteUserDefinedFunction(udfLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(udfLink);
        const path = this.getPathFromLink(udfLink, "", isNameBased);
        const id = this.getIdFromLink(udfLink, isNameBased);

        return this.deleteResource(path, "udfs", id, undefined, options, callback);
    }

    public deleteStoredProcedure(sprocLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(sprocLink);
        const path = this.getPathFromLink(sprocLink, "", isNameBased);
        const id = this.getIdFromLink(sprocLink, isNameBased);

        return this.deleteResource(path, "sprocs", id, undefined, options, callback);
    }

    public deleteConflict(conflictLink: string, options?: RequestOptions, callback?: ResponseCallback<any>) {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const isNameBased = Base.isLinkNameBased(conflictLink);
        const path = this.getPathFromLink(conflictLink, "", isNameBased);
        const id = this.getIdFromLink(conflictLink, isNameBased);

        return this.deleteResource(path, "conflicts", id, undefined, options, callback);
    }

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

    // NOT USED IN NEW OM
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

    // NOT USED IN NEW OM
    public upsertAttachmentAndUploadMedia(
        documentLink: string, readableStream: Readable,
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

    // NOT USED IN NEW OM
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

    // NOT USED IN NEW OM
    public async updateMedia(
        mediaLink: string, readableStream: Readable,
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

    public async readOffer(offerLink: string, callback?: ResponseCallback<any>) {
        const path = "/" + offerLink;
        const id = Base.parseLink(offerLink).objectBody.id.toLowerCase();
        return Base.ResponseOrCallback(callback, await this.read(path, "offers", id, undefined, {}));
    }

    public readOffers(options?: FeedOptions) {
        return this.queryOffers(undefined, options);
    }

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
            this.captureSessionToken(undefined, path, Constants.OperationTypes.Create, resHeaders);
            return Base.ResponseOrCallback(callback, { result, headers: resHeaders });
        } catch (err) {
            this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
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
            this.captureSessionToken(undefined, path, Constants.OperationTypes.Upsert, resHeaders);
            return Base.ResponseOrCallback(callback, { result, headers: resHeaders });
        } catch (err) {
            this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
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
            this.captureSessionToken(undefined, path, Constants.OperationTypes.Replace, result.headers);
            return Base.ResponseOrCallback(callback, result);
        } catch (err) {
            this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
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
            this.captureSessionToken(undefined, path, Constants.OperationTypes.Read, response.headers);
            return response;
        } catch (err) {
            this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
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
                this.captureSessionToken(undefined, path, Constants.OperationTypes.Delete, response.headers);
            } else {
                this.clearSessionToken(path);
            }
            return Base.ResponseOrCallback(callback, response);

        } catch (err) {
            this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
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

        (headers as IHeaders)[Constants.HttpHeaders.IsUpsert] = true;
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

    public captureSessionToken(err: ErrorResponse, path: string, opType: string, resHeaders: IHeaders) {
        const request: any = this.getSessionParams(path); // TODO: any request
        request.operationType = opType;
        if (!err ||
            ((!this.isMasterResource(request.resourceType)) &&
                (err.code === StatusCodes.PreconditionFailed || err.code === StatusCodes.Conflict ||
                    (err.code === StatusCodes.NotFound && err.substatus !== SubStatusCodes.ReadSessionNotAvailable)))) {
            this.sessionContainer.setSessionToken(request, resHeaders);
        }
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

    public isMasterResource(resourceType: string): boolean {
        if (resourceType === Constants.Path.OffersPathSegment ||
            resourceType === Constants.Path.DatabasesPathSegment ||
            resourceType === Constants.Path.UsersPathSegment ||
            resourceType === Constants.Path.PermissionsPathSegment ||
            resourceType === Constants.Path.TopologyPathSegment ||
            resourceType === Constants.Path.DatabaseAccountPathSegment ||
            resourceType === Constants.Path.PartitionKeyRangesPathSegment ||
            resourceType === Constants.Path.CollectionsPathSegment) {
            return true;
        }

        return false;
    }
}

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
