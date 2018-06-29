import { AuthHandler } from "./auth";
import { Constants, Platform } from "./common";
import { DocumentClient, FeedOptions, MediaOptions, Options, RequestOptions } from "./documentclient";
import { DocumentClientBase } from "./DocumentClientBase";
import { IHeaders } from "./queryExecutionContext";
import { Response } from "./request";

export class Base {
    public static extend(arg0: any, arg1: any): any {
        // tslint:disable-next-line:prefer-object-spread
        return Object.assign(arg0, arg1);
    }
    public static map(arg0: any[], arg1: any): any[] {
        return arg0.map(arg1);
    }

    /** @ignore */
    public static jsonStringifyAndEscapeNonASCII(arg: any) { // TODO: better way for this? Not sure.
        // escapes non-ASCII characters as \uXXXX
        return JSON.stringify(arg).replace(/[\u0080-\uFFFF]/g, (m) => {
            return "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice(-4);
        });
    }

    public static async getHeaders(
        documentClient: DocumentClientBase,
        defaultHeaders: IHeaders,
        verb: string, path: string,
        resourceId: string,
        resourceType: string,
        options: RequestOptions | FeedOptions | MediaOptions,
        partitionKeyRangeId?: string): Promise<IHeaders> {

        const headers: IHeaders = { ...defaultHeaders };
        const opts: RequestOptions & FeedOptions & MediaOptions = (options || {}) as any; // TODO: this is dirty

        if (opts.continuation) {
            headers[Constants.HttpHeaders.Continuation] = opts.continuation;
        }

        if (opts.preTriggerInclude) {
            headers[Constants.HttpHeaders.PreTriggerInclude] =
                opts.preTriggerInclude.constructor === Array
                    ? (opts.preTriggerInclude as string[]).join(",")
                    : opts.preTriggerInclude as string;
        }

        if (opts.postTriggerInclude) {
            headers[Constants.HttpHeaders.PostTriggerInclude] =
                opts.postTriggerInclude.constructor === Array
                    ? (opts.postTriggerInclude as string[]).join(",")
                    : opts.postTriggerInclude as string;
        }

        if (opts.offerType) {
            headers[Constants.HttpHeaders.OfferType] = opts.offerType;
        }

        if (opts.offerThroughput) {
            headers[Constants.HttpHeaders.OfferThroughput] = opts.offerThroughput;
        }

        if (opts.maxItemCount) {
            headers[Constants.HttpHeaders.PageSize] = opts.maxItemCount;
        }

        if (opts.accessCondition) {
            if (opts.accessCondition.type === "IfMatch") {
                headers[Constants.HttpHeaders.IfMatch] = opts.accessCondition.condition;
            } else {
                headers[Constants.HttpHeaders.IfNoneMatch] = opts.accessCondition.condition;
            }
        }

        if (opts.a_im) {
            headers[Constants.HttpHeaders.A_IM] = opts.a_im;
        }

        if (opts.indexingDirective) {
            headers[Constants.HttpHeaders.IndexingDirective] = opts.indexingDirective;
        }

        // TODO: add consistency level validation.
        if (opts.consistencyLevel) {
            headers[Constants.HttpHeaders.ConsistencyLevel] = opts.consistencyLevel;
        }

        if (opts.resourceTokenExpirySeconds) {
            headers[Constants.HttpHeaders.ResourceTokenExpiry] = opts.resourceTokenExpirySeconds;
        }

        // TODO: add session token automatic handling in case of session consistency.
        if (opts.sessionToken) {
            headers[Constants.HttpHeaders.SessionToken] = opts.sessionToken;
        }

        if (opts.enableScanInQuery) {
            headers[Constants.HttpHeaders.EnableScanInQuery] = opts.enableScanInQuery;
        }

        if (opts.enableCrossPartitionQuery) {
            headers[Constants.HttpHeaders.EnableCrossPartitionQuery] = opts.enableCrossPartitionQuery;
        }

        if (opts.populateQuotaInfo) {
            headers[Constants.HttpHeaders.PopulateQuotaInfo] = opts.populateQuotaInfo;
        }

        if (opts.populateQueryMetrics) {
            headers[Constants.HttpHeaders.PopulateQueryMetrics] = opts.populateQueryMetrics;
        }

        if (opts.maxDegreeOfParallelism !== undefined) {
            headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery] = true;
        }

        if (opts.populateQuotaInfo) {
            headers[Constants.HttpHeaders.PopulateQuotaInfo] = true;
        }

        // If the user is not using partition resolver, we add options.partitonKey to the header for elastic collections
        if ((documentClient as any).partitionResolver === undefined // TODO: paritionResolver does not exist
            || (documentClient as any).partitionResolver === null) {
            if (opts.partitionKey !== undefined) {
                let partitionKey: string[] | string = opts.partitionKey;
                if (partitionKey === null || !Array.isArray(partitionKey)) {
                    partitionKey = [partitionKey as string];
                }
                headers[Constants.HttpHeaders.PartitionKey] = Base.jsonStringifyAndEscapeNonASCII(partitionKey);
            }
        }

        if (documentClient.masterKey || documentClient.tokenProvider) {
            headers[Constants.HttpHeaders.XDate] = new Date().toUTCString();
        }

        if (verb === "post" || verb === "put") {
            if (!headers[Constants.HttpHeaders.ContentType]) {
                headers[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.Json;
            }
        }

        if (!headers[Constants.HttpHeaders.Accept]) {
            headers[Constants.HttpHeaders.Accept] = Constants.MediaTypes.Json;
        }

        if (partitionKeyRangeId !== undefined) {
            headers[Constants.HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
        }

        if (opts.enableScriptLogging) {
            headers[Constants.HttpHeaders.EnableScriptLogging] = opts.enableScriptLogging;
        }

        if (opts.offerEnableRUPerMinuteThroughput) {
            headers[Constants.HttpHeaders.OfferIsRUPerMinuteThroughputEnabled] = true;
        }

        if (opts.disableRUPerMinuteUsage) {
            headers[Constants.HttpHeaders.DisableRUPerMinuteUsage] = true;
        }
        if (documentClient.masterKey || documentClient.resourceTokens || documentClient.tokenProvider) {
            const token = await AuthHandler.getAuthorizationHeader(
                documentClient, verb, path, resourceId, resourceType, headers);
            headers[Constants.HttpHeaders.Authorization] = token;
        }
        return headers;
    }

    public static parseLink(resourcePath: string) {
        if (resourcePath.length === 0) {
            /* for DatabaseAccount case, both type and objectBody will be undefined. */
            return {
                type: undefined,
                objectBody: undefined,
            };
        }

        if (resourcePath[resourcePath.length - 1] !== "/") {
            resourcePath = resourcePath + "/";
        }

        if (resourcePath[0] !== "/") {
            resourcePath = "/" + resourcePath;
        }

        /*
         The path will be in the form of /[resourceType]/[resourceId]/ ....
         /[resourceType]//[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId]/
         or /[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId]/[resourceType]/[resourceId]/ ....
          /[resourceType]/[resourceId]/
         The result of split will be in the form of
         [[[resourceType], [resourceId] ... ,[resourceType], [resourceId], ""]
         In the first case, to extract the resourceId it will the element before last ( at length -2 )
         and the the type will before it ( at length -3 )
         In the second case, to extract the resource type it will the element before last ( at length -2 )
        */
        const pathParts = resourcePath.split("/");
        let id;
        let type;
        if (pathParts.length % 2 === 0) {
            // request in form /[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId].
            id = pathParts[pathParts.length - 2];
            type = pathParts[pathParts.length - 3];
        } else {
            // request in form /[resourceType]/[resourceId]/ .... /[resourceType]/.
            id = pathParts[pathParts.length - 3];
            type = pathParts[pathParts.length - 2];
        }

        const result = {
            type,
            objectBody: {
                id,
                self: resourcePath,
            },
        };

        return result;
    }

    public static parsePath(path: string) {
        const pathParts = [];
        let currentIndex = 0;

        const throwError = () => {
            throw new Error("Path " + path + " is invalid at index " + currentIndex);
        };

        const getEscapedToken = () => {
            const quote = path[currentIndex];
            let newIndex = ++currentIndex;

            while (true) {
                newIndex = path.indexOf(quote, newIndex);
                if (newIndex === -1) {
                    throwError();
                }

                if (path[newIndex - 1] !== "\\") { break; }

                ++newIndex;
            }

            const token = path.substr(currentIndex, newIndex - currentIndex);
            currentIndex = newIndex + 1;
            return token;
        };

        const getToken = () => {
            const newIndex = path.indexOf("/", currentIndex);
            let token = null;
            if (newIndex === -1) {
                token = path.substr(currentIndex);
                currentIndex = path.length;
            } else {
                token = path.substr(currentIndex, newIndex - currentIndex);
                currentIndex = newIndex;
            }

            token = token.trim();
            return token;
        };

        while (currentIndex < path.length) {
            if (path[currentIndex] !== "/") {
                throwError();
            }

            if (++currentIndex === path.length) { break; }

            if (path[currentIndex] === '\"' || path[currentIndex] === "'") {
                pathParts.push(getEscapedToken());
            } else {
                pathParts.push(getToken());
            }
        }

        return pathParts;
    }

    public static getDatabaseLink(link: string) {
        return link.split("/").slice(0, 2).join("/");
    }

    public static getCollectionLink(link: string) {
        return link.split("/").slice(0, 4).join("/");
    }

    public static getAttachmentIdFromMediaId(mediaId: string) {
        // Replace - with / on the incoming mediaId.  This will preserve the / so that we can revert it later.
        const buffer = new Buffer(mediaId.replace(/-/g, "/"), "base64");
        const ResoureIdLength = 20;
        // After the base64 conversion, change the / back to a - to get the proper attachmentId
        return buffer.length > ResoureIdLength
            ? buffer.toString("base64", 0, ResoureIdLength).replace(/\//g, "-")
            : mediaId;
    }

    public static getHexaDigit() {
        return Math.floor(Math.random() * 16).toString(16);
    }

    // TODO: repalce with well known library?
    public static generateGuidId() {
        let id = "";

        for (let i = 0; i < 8; i++) {
            id += Base.getHexaDigit();
        }

        id += "-";

        for (let i = 0; i < 4; i++) {
            id += Base.getHexaDigit();
        }

        id += "-";

        for (let i = 0; i < 4; i++) {
            id += Base.getHexaDigit();
        }

        id += "-";

        for (let i = 0; i < 4; i++) {
            id += Base.getHexaDigit();
        }

        id += "-";

        for (let i = 0; i < 12; i++) {
            id += Base.getHexaDigit();
        }

        return id;
    }

    public static isLinkNameBased(link: string) {
        const parts = link.split("/");
        let firstId = "";
        let count = 0;
        // Get the first id from path.
        for (const part of parts) {
            if (!part) {
                // Skip empty string.
                continue;
            }
            ++count;
            if (count === 1 && part.toLowerCase() !== "dbs") {
                return false;
            }
            if (count === 2) {
                firstId = part;
                break;
            }
        }
        if (!firstId) { return false; }
        if (firstId.length !== 8) { return true; }
        const decodedDataLength = Platform.getDecodedDataLength(firstId);
        if (decodedDataLength !== 4) { return true; }
        return false;
    }

    public static _trimSlashes(source: string) {
        return source.replace(Constants.RegularExpressions.TrimLeftSlashes, "")
            .replace(Constants.RegularExpressions.TrimRightSlashes, "");
    }

    public static _isValidCollectionLink(link: string) {
        if (typeof link !== "string") {
            return false;
        }

        const parts = Base._trimSlashes(link).split("/");

        if (parts && parts.length !== 4) {
            return false;
        }

        if (parts[0] !== "dbs") {
            return false;
        }

        if (parts[2] !== "colls") {
            return false;
        }

        return true;
    }

    public static ThrowOrCallback(callback: ResponseCallback<any>, err: any) {
        if (callback) {
            process.nextTick(() => {
                callback(err);
            });
        } else {
            throw err;
        }
    }

    public static ResponseOrCallback(callback: ResponseCallback<any>, value: Response<any>) {
        if (callback) {
            process.nextTick(() => {
                callback(undefined, value.result, value.headers);
            });
        } else {
            return value;
        }
    }
}

export type ResponseCallback<T> = (err: any, result?: T, headers?: IHeaders) => void;
