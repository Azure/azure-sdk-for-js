"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlobBatch = void 0;
const core_util_1 = require("@azure/core-util");
const core_auth_1 = require("@azure/core-auth");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const core_util_2 = require("@azure/core-util");
const AnonymousCredential_js_1 = require("./credentials/AnonymousCredential.js");
const Clients_js_1 = require("./Clients.js");
const Mutex_js_1 = require("./utils/Mutex.js");
const Pipeline_js_1 = require("./Pipeline.js");
const utils_common_js_1 = require("./utils/utils.common.js");
const core_xml_1 = require("@azure/core-xml");
const constants_js_1 = require("./utils/constants.js");
const StorageSharedKeyCredential_js_1 = require("./credentials/StorageSharedKeyCredential.js");
const tracing_js_1 = require("./utils/tracing.js");
const core_client_1 = require("@azure/core-client");
const StorageSharedKeyCredentialPolicyV2_js_1 = require("./policies/StorageSharedKeyCredentialPolicyV2.js");
/**
 * A BlobBatch represents an aggregated set of operations on blobs.
 * Currently, only `delete` and `setAccessTier` are supported.
 */
class BlobBatch {
    constructor() {
        this.batch = "batch";
        this.batchRequest = new InnerBatchRequest();
    }
    /**
     * Get the value of Content-Type for a batch request.
     * The value must be multipart/mixed with a batch boundary.
     * Example: multipart/mixed; boundary=batch_a81786c8-e301-4e42-a729-a32ca24ae252
     */
    getMultiPartContentType() {
        return this.batchRequest.getMultipartContentType();
    }
    /**
     * Get assembled HTTP request body for sub requests.
     */
    getHttpRequestBody() {
        return this.batchRequest.getHttpRequestBody();
    }
    /**
     * Get sub requests that are added into the batch request.
     */
    getSubRequests() {
        return this.batchRequest.getSubRequests();
    }
    async addSubRequestInternal(subRequest, assembleSubRequestFunc) {
        await Mutex_js_1.Mutex.lock(this.batch);
        try {
            this.batchRequest.preAddSubRequest(subRequest);
            await assembleSubRequestFunc();
            this.batchRequest.postAddSubRequest(subRequest);
        }
        finally {
            await Mutex_js_1.Mutex.unlock(this.batch);
        }
    }
    setBatchType(batchType) {
        if (!this.batchType) {
            this.batchType = batchType;
        }
        if (this.batchType !== batchType) {
            throw new RangeError(`BlobBatch only supports one operation type per batch and it already is being used for ${this.batchType} operations.`);
        }
    }
    async deleteBlob(urlOrBlobClient, credentialOrOptions, options) {
        let url;
        let credential;
        if (typeof urlOrBlobClient === "string" &&
            ((core_util_2.isNodeLike && credentialOrOptions instanceof StorageSharedKeyCredential_js_1.StorageSharedKeyCredential) ||
                credentialOrOptions instanceof AnonymousCredential_js_1.AnonymousCredential ||
                (0, core_auth_1.isTokenCredential)(credentialOrOptions))) {
            // First overload
            url = urlOrBlobClient;
            credential = credentialOrOptions;
        }
        else if (urlOrBlobClient instanceof Clients_js_1.BlobClient) {
            // Second overload
            url = urlOrBlobClient.url;
            credential = urlOrBlobClient.credential;
            options = credentialOrOptions;
        }
        else {
            throw new RangeError("Invalid arguments. Either url and credential, or BlobClient need be provided.");
        }
        if (!options) {
            options = {};
        }
        return tracing_js_1.tracingClient.withSpan("BatchDeleteRequest-addSubRequest", options, async (updatedOptions) => {
            this.setBatchType("delete");
            await this.addSubRequestInternal({
                url: url,
                credential: credential,
            }, async () => {
                await new Clients_js_1.BlobClient(url, this.batchRequest.createPipeline(credential)).delete(updatedOptions);
            });
        });
    }
    async setBlobAccessTier(urlOrBlobClient, credentialOrTier, tierOrOptions, options) {
        let url;
        let credential;
        let tier;
        if (typeof urlOrBlobClient === "string" &&
            ((core_util_2.isNodeLike && credentialOrTier instanceof StorageSharedKeyCredential_js_1.StorageSharedKeyCredential) ||
                credentialOrTier instanceof AnonymousCredential_js_1.AnonymousCredential ||
                (0, core_auth_1.isTokenCredential)(credentialOrTier))) {
            // First overload
            url = urlOrBlobClient;
            credential = credentialOrTier;
            tier = tierOrOptions;
        }
        else if (urlOrBlobClient instanceof Clients_js_1.BlobClient) {
            // Second overload
            url = urlOrBlobClient.url;
            credential = urlOrBlobClient.credential;
            tier = credentialOrTier;
            options = tierOrOptions;
        }
        else {
            throw new RangeError("Invalid arguments. Either url and credential, or BlobClient need be provided.");
        }
        if (!options) {
            options = {};
        }
        return tracing_js_1.tracingClient.withSpan("BatchSetTierRequest-addSubRequest", options, async (updatedOptions) => {
            this.setBatchType("setAccessTier");
            await this.addSubRequestInternal({
                url: url,
                credential: credential,
            }, async () => {
                await new Clients_js_1.BlobClient(url, this.batchRequest.createPipeline(credential)).setAccessTier(tier, updatedOptions);
            });
        });
    }
}
exports.BlobBatch = BlobBatch;
/**
 * Inner batch request class which is responsible for assembling and serializing sub requests.
 * See https://learn.microsoft.com/en-us/rest/api/storageservices/blob-batch#request-body for how requests are assembled.
 */
class InnerBatchRequest {
    constructor() {
        this.operationCount = 0;
        this.body = "";
        const tempGuid = (0, core_util_1.randomUUID)();
        // batch_{batchid}
        this.boundary = `batch_${tempGuid}`;
        // --batch_{batchid}
        // Content-Type: application/http
        // Content-Transfer-Encoding: binary
        this.subRequestPrefix = `--${this.boundary}${constants_js_1.HTTP_LINE_ENDING}${constants_js_1.HeaderConstants.CONTENT_TYPE}: application/http${constants_js_1.HTTP_LINE_ENDING}${constants_js_1.HeaderConstants.CONTENT_TRANSFER_ENCODING}: binary`;
        // multipart/mixed; boundary=batch_{batchid}
        this.multipartContentType = `multipart/mixed; boundary=${this.boundary}`;
        // --batch_{batchid}--
        this.batchRequestEnding = `--${this.boundary}--`;
        this.subRequests = new Map();
    }
    /**
     * Create pipeline to assemble sub requests. The idea here is to use existing
     * credential and serialization/deserialization components, with additional policies to
     * filter unnecessary headers, assemble sub requests into request's body
     * and intercept request from going to wire.
     * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     */
    createPipeline(credential) {
        const corePipeline = (0, core_rest_pipeline_1.createEmptyPipeline)();
        corePipeline.addPolicy((0, core_client_1.serializationPolicy)({
            stringifyXML: core_xml_1.stringifyXML,
            serializerOptions: {
                xml: {
                    xmlCharKey: "#",
                },
            },
        }), { phase: "Serialize" });
        // Use batch header filter policy to exclude unnecessary headers
        corePipeline.addPolicy(batchHeaderFilterPolicy());
        // Use batch assemble policy to assemble request and intercept request from going to wire
        corePipeline.addPolicy(batchRequestAssemblePolicy(this), { afterPhase: "Sign" });
        if ((0, core_auth_1.isTokenCredential)(credential)) {
            corePipeline.addPolicy((0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)({
                credential,
                scopes: constants_js_1.StorageOAuthScopes,
                challengeCallbacks: { authorizeRequestOnChallenge: core_client_1.authorizeRequestOnTenantChallenge },
            }), { phase: "Sign" });
        }
        else if (credential instanceof StorageSharedKeyCredential_js_1.StorageSharedKeyCredential) {
            corePipeline.addPolicy((0, StorageSharedKeyCredentialPolicyV2_js_1.storageSharedKeyCredentialPolicy)({
                accountName: credential.accountName,
                accountKey: credential.accountKey,
            }), { phase: "Sign" });
        }
        const pipeline = new Pipeline_js_1.Pipeline([]);
        // attach the v2 pipeline to this one
        pipeline._credential = credential;
        pipeline._corePipeline = corePipeline;
        return pipeline;
    }
    appendSubRequestToBody(request) {
        // Start to assemble sub request
        this.body += [
            this.subRequestPrefix, // sub request constant prefix
            `${constants_js_1.HeaderConstants.CONTENT_ID}: ${this.operationCount}`, // sub request's content ID
            "", // empty line after sub request's content ID
            `${request.method.toString()} ${(0, utils_common_js_1.getURLPathAndQuery)(request.url)} ${constants_js_1.HTTP_VERSION_1_1}${constants_js_1.HTTP_LINE_ENDING}`, // sub request start line with method
        ].join(constants_js_1.HTTP_LINE_ENDING);
        for (const [name, value] of request.headers) {
            this.body += `${name}: ${value}${constants_js_1.HTTP_LINE_ENDING}`;
        }
        this.body += constants_js_1.HTTP_LINE_ENDING; // sub request's headers need be ending with an empty line
        // No body to assemble for current batch request support
        // End to assemble sub request
    }
    preAddSubRequest(subRequest) {
        if (this.operationCount >= constants_js_1.BATCH_MAX_REQUEST) {
            throw new RangeError(`Cannot exceed ${constants_js_1.BATCH_MAX_REQUEST} sub requests in a single batch`);
        }
        // Fast fail if url for sub request is invalid
        const path = (0, utils_common_js_1.getURLPath)(subRequest.url);
        if (!path || path === "") {
            throw new RangeError(`Invalid url for sub request: '${subRequest.url}'`);
        }
    }
    postAddSubRequest(subRequest) {
        this.subRequests.set(this.operationCount, subRequest);
        this.operationCount++;
    }
    // Return the http request body with assembling the ending line to the sub request body.
    getHttpRequestBody() {
        return `${this.body}${this.batchRequestEnding}${constants_js_1.HTTP_LINE_ENDING}`;
    }
    getMultipartContentType() {
        return this.multipartContentType;
    }
    getSubRequests() {
        return this.subRequests;
    }
}
function batchRequestAssemblePolicy(batchRequest) {
    return {
        name: "batchRequestAssemblePolicy",
        async sendRequest(request) {
            batchRequest.appendSubRequestToBody(request);
            return {
                request,
                status: 200,
                headers: (0, core_rest_pipeline_1.createHttpHeaders)(),
            };
        },
    };
}
function batchHeaderFilterPolicy() {
    return {
        name: "batchHeaderFilterPolicy",
        async sendRequest(request, next) {
            let xMsHeaderName = "";
            for (const [name] of request.headers) {
                if ((0, utils_common_js_1.iEqual)(name, constants_js_1.HeaderConstants.X_MS_VERSION)) {
                    xMsHeaderName = name;
                }
            }
            if (xMsHeaderName !== "") {
                request.headers.delete(xMsHeaderName); // The subrequests should not have the x-ms-version header.
            }
            return next(request);
        },
    };
}
//# sourceMappingURL=BlobBatch.js.map