import * as http from "http";
import { Agent, AgentOptions } from "https";
import * as tunnel from "tunnel";
import * as url from "url";
import { Base, ResponseCallback } from "./base";
import { Constants, Helper, Platform } from "./common";
import { ConnectionPolicy, ConsistencyLevel, DatabaseAccount, QueryCompatibilityMode } from "./documents";
import { GlobalEndpointManager } from "./globalEndpointManager";
import { IHeaders } from "./queryExecutionContext";
import { RequestHandler, Response } from "./request/request";
import { RequestOptions } from "./request/RequestOptions";
import { SessionContainer } from "./sessionContainer";

// Using this to organize public vs internal methods
/** @hidden */
export abstract class DocumentClientBase {
    public masterKey: string;
    public resourceTokens: { [key: string]: string };
    public tokenProvider: any;
    public connectionPolicy: ConnectionPolicy;
    public consistencyLevel: ConsistencyLevel;
    public defaultHeaders: IHeaders;
    public defaultUrlParams: string;
    public queryCompatibilityMode: QueryCompatibilityMode;
    public partitionResolvers: any; // TODO: any paritionresolvers
    public partitionKeyDefinitionCache: any; // TODO: ParitionKeyDefinitionCache
    // tslint:disable-next-line:variable-name
    protected _globalEndpointManager: GlobalEndpointManager; // TODO: code smell naming
    public sessionContainer: SessionContainer;
    public requestAgent: Agent | http.Agent; // tunnel uses the http Agent, not https Agent, so we accept both types
    constructor(
        public urlConnection: string,
        auth: any, // TODO: any auth
        connectionPolicy: ConnectionPolicy,
        consistencyLevel: ConsistencyLevel) {
        if (auth) {
            this.masterKey = auth.masterKey;
            this.resourceTokens = auth.resourceTokens;
            if (auth.permissionFeed) {
                this.resourceTokens = {};
                for (const permission of auth.permissionFeed) {
                    const resourceId = Helper.getResourceIdFromPath(permission.resource);
                    if (!resourceId) {
                        throw new Error(`authorization error: ${resourceId} \
                            is an invalid resourceId in permissionFeed`);
                    }

                    this.resourceTokens[resourceId] = permission._token;
                }
            }
            this.tokenProvider = auth.tokenProvider;
        }

        this.connectionPolicy = connectionPolicy || new ConnectionPolicy();
        this.consistencyLevel = consistencyLevel;
        this.defaultHeaders = {};
        this.defaultHeaders[Constants.HttpHeaders.CacheControl] = "no-cache";
        this.defaultHeaders[Constants.HttpHeaders.Version] = Constants.CurrentVersion;
        if (consistencyLevel !== undefined) {
            this.defaultHeaders[Constants.HttpHeaders.ConsistencyLevel] = consistencyLevel;
        }

        const platformDefaultHeaders = Platform.getPlatformDefaultHeaders() || {};
        for (const platformDefaultHeader of Object.keys(platformDefaultHeaders)) {
            this.defaultHeaders[platformDefaultHeader] = platformDefaultHeaders[platformDefaultHeader];
        }

        this.defaultHeaders[Constants.HttpHeaders.UserAgent] = Platform.getUserAgent();

        // overide this for default query params to be added to the url.
        this.defaultUrlParams = "";

        // Query compatibility mode.
        // Allows to specify compatibility mode used by client when making query requests. Should be removed when
        // application/sql is no longer supported.
        this.queryCompatibilityMode = QueryCompatibilityMode.Default;
        this.partitionResolvers = {};

        this.partitionKeyDefinitionCache = {};

        this._globalEndpointManager = new GlobalEndpointManager(this);

        this.sessionContainer = new SessionContainer(this.urlConnection);

        // Initialize request agent
        const requestAgentOptions: AgentOptions & tunnel.HttpsOverHttpsOptions & tunnel.HttpsOverHttpOptions = {
            keepAlive: true, maxSockets: 256, maxFreeSockets: 256,
        };
        if (!!this.connectionPolicy.ProxyUrl) {
            const proxyUrl = url.parse(this.connectionPolicy.ProxyUrl);
            const port = parseInt(proxyUrl.port, 10);
            requestAgentOptions.proxy = {
                host: proxyUrl.hostname,
                port,
                headers: {},
            };

            if (!!proxyUrl.auth) {
                requestAgentOptions.proxy.proxyAuth = proxyUrl.auth;
            }

            this.requestAgent = (proxyUrl.protocol.toLowerCase() === "https:" ?
                tunnel.httpsOverHttps(requestAgentOptions) :
                tunnel.httpsOverHttp(requestAgentOptions)); // TODO: type coersion
        } else {
            this.requestAgent = new Agent(requestAgentOptions); // TODO: Move to request?
        }
    }

    /**
     * Gets the Database account information.
     * @memberof DocumentClient
     * @instance
     * @param {string} [options.urlConnection]   - The endpoint url whose database account needs to be retrieved. \
     * If not present, current client's url will be used.
     * @param {RequestCallback} callback         - The callback for the request. The second parameter of the \
     * callback will be of type {@link DatabaseAccount}.
     */
    public async getDatabaseAccount(
        options?: RequestOptions,
        callback?: ResponseCallback<DatabaseAccount>): Promise<Response<DatabaseAccount>> {
        const optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
        options = optionsCallbackTuple.options;
        callback = optionsCallbackTuple.callback;

        const urlConnection = options.urlConnection || this.urlConnection;

        const requestHeaders = await Base.getHeaders(this, this.defaultHeaders, "get", "", "", "", {});

        try {
            const { result, headers } = await this.get(urlConnection, "", requestHeaders);

            const databaseAccount = new DatabaseAccount();
            databaseAccount.DatabasesLink = "/dbs/";
            databaseAccount.MediaLink = "/media/";
            databaseAccount.MaxMediaStorageUsageInMB =
                headers[Constants.HttpHeaders.MaxMediaStorageUsageInMB] as number;
            databaseAccount.CurrentMediaStorageUsageInMB =
                headers[Constants.HttpHeaders.CurrentMediaStorageUsageInMB] as number;
            databaseAccount.ConsistencyPolicy = result.userConsistencyPolicy;

            // WritableLocations and ReadableLocations properties will be available
            // only for geo-replicated database accounts
            if (Constants.WritableLocations in result && result.id !== "localhost") {
                databaseAccount._writableLocations = result[Constants.WritableLocations];
            }
            if (Constants.ReadableLocations in result && result.id !== "localhost") {
                databaseAccount._readableLocations = result[Constants.ReadableLocations];
            }

            if (callback) {
                callback(null, databaseAccount, headers);
                return;
            } else {
                return { result: databaseAccount, headers };
            }
        } catch (err) {
            if (callback) {
                callback(err);
            } else {
                throw err;
            }
        }
    }

    /** @ignore */
    public validateOptionsAndCallback(optionsIn: any, callbackIn: any) {
        let options;
        let callback;

        // options
        if (optionsIn === undefined) {
            options = new Object();
        } else if (callbackIn === undefined && typeof optionsIn === "function") {
            callback = optionsIn;
            options = new Object();
        } else if (typeof optionsIn !== "object") {
            throw new Error(
                `The "options" parameter must be of type "object". Actual type is: "${typeof optionsIn}".`);
        } else {
            options = optionsIn;
        }

        // callback
        if (callbackIn !== undefined && typeof callbackIn !== "function") {
            throw new Error(
                `The "callback" parameter must be of type "function". Actual type is: "${typeof callbackIn}".`);
        } else if (typeof callbackIn === "function") {
            callback = callbackIn;
        }

        return { options, callback };
    }

    /** @ignore */
    public get(urlString: string, request: any, headers: IHeaders) { // TODO: any
        return RequestHandler.request(
            this._globalEndpointManager,
            this.connectionPolicy,
            this.requestAgent,
            "GET",
            urlString,
            request,
            undefined,
            this.defaultUrlParams,
            headers);
    }

    /** @ignore */
    public post(urlString: string, request: any, body: any, headers: IHeaders) { // TODO: any
        return RequestHandler.request(
            this._globalEndpointManager,
            this.connectionPolicy,
            this.requestAgent,
            "POST",
            urlString,
            request,
            body,
            this.defaultUrlParams,
            headers);
    }

    /** @ignore */
    public put(urlString: string, request: any, body: any, headers: IHeaders) { // TODO: any
        return RequestHandler.request(
            this._globalEndpointManager,
            this.connectionPolicy,
            this.requestAgent,
            "PUT",
            urlString,
            request,
            body,
            this.defaultUrlParams,
            headers);
    }

    /** @ignore */
    public head(urlString: string, request: any, headers: IHeaders) { // TODO: any
        return RequestHandler.request(
            this._globalEndpointManager,
            this.connectionPolicy,
            this.requestAgent,
            "HEAD",
            urlString,
            request,
            undefined,
            this.defaultUrlParams,
            headers);
    }

    /** @ignore */
    public delete(urlString: string, request: any, headers: IHeaders) {
        return RequestHandler.request(
            this._globalEndpointManager,
            this.connectionPolicy,
            this.requestAgent,
            "DELETE",
            urlString,
            request,
            undefined,
            this.defaultUrlParams,
            headers);
    }
}
