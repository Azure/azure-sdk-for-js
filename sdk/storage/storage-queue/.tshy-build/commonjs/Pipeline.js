"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = exports.StorageOAuthScopes = void 0;
exports.isPipelineLike = isPipelineLike;
exports.newPipeline = newPipeline;
exports.getCoreClientOptions = getCoreClientOptions;
exports.getCredentialFromPipeline = getCredentialFromPipeline;
const tslib_1 = require("tslib");
const core_http_compat_1 = require("@azure/core-http-compat");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const core_client_1 = require("@azure/core-client");
const core_xml_1 = require("@azure/core-xml");
const core_auth_1 = require("@azure/core-auth");
const log_js_1 = require("./log.js");
const storage_blob_1 = require("@azure/storage-blob");
const storage_blob_2 = require("@azure/storage-blob");
const storage_blob_3 = require("@azure/storage-blob");
const constants_js_1 = require("./utils/constants.js");
Object.defineProperty(exports, "StorageOAuthScopes", { enumerable: true, get: function () { return constants_js_1.StorageOAuthScopes; } });
const storage_common_1 = require("@azure/storage-common");
const storage_blob_4 = require("@azure/storage-blob");
const storage_blob_5 = require("@azure/storage-blob");
const storage_blob_6 = require("@azure/storage-blob");
const storage_blob_7 = require("@azure/storage-blob");
const storage_blob_8 = require("@azure/storage-blob");
/**
 * A helper to decide if a given argument satisfies the Pipeline contract
 * @param pipeline - An argument that may be a Pipeline
 * @returns true when the argument satisfies the Pipeline contract
 */
function isPipelineLike(pipeline) {
    if (!pipeline || typeof pipeline !== "object") {
        return false;
    }
    const castPipeline = pipeline;
    return (Array.isArray(castPipeline.factories) &&
        typeof castPipeline.options === "object" &&
        typeof castPipeline.toServiceClientOptions === "function");
}
/**
 * A Pipeline class containing HTTP request policies.
 * You can create a default Pipeline by calling {@link newPipeline}.
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 *
 * Refer to {@link newPipeline} and provided policies before implementing your
 * customized Pipeline.
 */
class Pipeline {
    /**
     * Creates an instance of Pipeline. Customize HTTPClient by implementing IHttpClient interface.
     *
     * @param factories -
     * @param options -
     */
    constructor(factories, options = {}) {
        this.factories = factories;
        this.options = options;
    }
    /**
     * Transfer Pipeline object to ServiceClientOptions object which is required by
     * ServiceClient constructor.
     *
     * @returns The ServiceClientOptions object from this Pipeline.
     */
    toServiceClientOptions() {
        return {
            httpClient: this.options.httpClient,
            requestPolicyFactories: this.factories,
        };
    }
}
exports.Pipeline = Pipeline;
/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
 * @param pipelineOptions - Optional. Options.
 * @returns A new Pipeline object.
 */
function newPipeline(credential, pipelineOptions = {}) {
    if (!credential) {
        credential = new storage_blob_3.AnonymousCredential();
    }
    const pipeline = new Pipeline([], pipelineOptions);
    pipeline._credential = credential;
    return pipeline;
}
function processDownlevelPipeline(pipeline) {
    const knownFactoryFunctions = [
        isAnonymousCredential,
        isStorageSharedKeyCredential,
        isCoreHttpBearerTokenFactory,
        isStorageBrowserPolicyFactory,
        isStorageRetryPolicyFactory,
        isStorageTelemetryPolicyFactory,
        isCoreHttpPolicyFactory,
    ];
    if (pipeline.factories.length) {
        const novelFactories = pipeline.factories.filter((factory) => {
            return !knownFactoryFunctions.some((knownFactory) => knownFactory(factory));
        });
        if (novelFactories.length) {
            const hasInjector = novelFactories.some((factory) => isInjectorPolicyFactory(factory));
            // if there are any left over, wrap in a requestPolicyFactoryPolicy
            return {
                wrappedPolicies: (0, core_http_compat_1.createRequestPolicyFactoryPolicy)(novelFactories),
                afterRetry: hasInjector,
            };
        }
    }
    return undefined;
}
function getCoreClientOptions(pipeline) {
    var _a;
    const _b = pipeline.options, { httpClient: v1Client } = _b, restOptions = tslib_1.__rest(_b, ["httpClient"]);
    let httpClient = pipeline._coreHttpClient;
    if (!httpClient) {
        httpClient = v1Client ? (0, core_http_compat_1.convertHttpClient)(v1Client) : (0, storage_common_1.getCachedDefaultHttpClient)();
        pipeline._coreHttpClient = httpClient;
    }
    let corePipeline = pipeline._corePipeline;
    if (!corePipeline) {
        const packageDetails = `azsdk-js-azure-storage-blob/${constants_js_1.SDK_VERSION}`;
        const userAgentPrefix = restOptions.userAgentOptions && restOptions.userAgentOptions.userAgentPrefix
            ? `${restOptions.userAgentOptions.userAgentPrefix} ${packageDetails}`
            : `${packageDetails}`;
        corePipeline = (0, core_client_1.createClientPipeline)(Object.assign(Object.assign({}, restOptions), { loggingOptions: {
                additionalAllowedHeaderNames: constants_js_1.StorageQueueLoggingAllowedHeaderNames,
                additionalAllowedQueryParameters: constants_js_1.StorageQueueLoggingAllowedQueryParameters,
                logger: log_js_1.logger.info,
            }, userAgentOptions: {
                userAgentPrefix,
            }, serializationOptions: {
                stringifyXML: core_xml_1.stringifyXML,
                serializerOptions: {
                    xml: {
                        // Use customized XML char key of "#" so we can deserialize metadata
                        // with "_" key
                        xmlCharKey: "#",
                    },
                },
            }, deserializationOptions: {
                parseXML: core_xml_1.parseXML,
                serializerOptions: {
                    xml: {
                        // Use customized XML char key of "#" so we can deserialize metadata
                        // with "_" key
                        xmlCharKey: "#",
                    },
                },
            } }));
        corePipeline.removePolicy({ phase: "Retry" });
        corePipeline.removePolicy({ name: core_rest_pipeline_1.decompressResponsePolicyName });
        corePipeline.addPolicy((0, storage_blob_8.storageCorrectContentLengthPolicy)());
        corePipeline.addPolicy((0, storage_blob_5.storageRetryPolicy)(restOptions.retryOptions), { phase: "Retry" });
        corePipeline.addPolicy((0, storage_blob_4.storageBrowserPolicy)());
        const downlevelResults = processDownlevelPipeline(pipeline);
        if (downlevelResults) {
            corePipeline.addPolicy(downlevelResults.wrappedPolicies, downlevelResults.afterRetry ? { afterPhase: "Retry" } : undefined);
        }
        const credential = getCredentialFromPipeline(pipeline);
        if ((0, core_auth_1.isTokenCredential)(credential)) {
            corePipeline.addPolicy((0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)({
                credential,
                scopes: (_a = restOptions.audience) !== null && _a !== void 0 ? _a : constants_js_1.StorageOAuthScopes,
                challengeCallbacks: { authorizeRequestOnChallenge: core_client_1.authorizeRequestOnTenantChallenge },
            }), { phase: "Sign" });
        }
        else if (credential instanceof storage_blob_2.StorageSharedKeyCredential) {
            corePipeline.addPolicy((0, storage_blob_6.storageSharedKeyCredentialPolicy)({
                accountName: credential.accountName,
                accountKey: credential.accountKey,
            }), { phase: "Sign" });
        }
        pipeline._corePipeline = corePipeline;
    }
    return Object.assign(Object.assign({}, restOptions), { allowInsecureConnection: true, httpClient, pipeline: corePipeline });
}
function getCredentialFromPipeline(pipeline) {
    // see if we squirreled one away on the type itself
    if (pipeline._credential) {
        return pipeline._credential;
    }
    // if it came from another package, loop over the factories and look for one like before
    let credential = new storage_blob_3.AnonymousCredential();
    for (const factory of pipeline.factories) {
        if ((0, core_auth_1.isTokenCredential)(factory.credential)) {
            // Only works if the factory has been attached a "credential" property.
            // We do that in newPipeline() when using TokenCredential.
            credential = factory.credential;
        }
        else if (isStorageSharedKeyCredential(factory)) {
            return factory;
        }
    }
    return credential;
}
function isStorageSharedKeyCredential(factory) {
    if (factory instanceof storage_blob_2.StorageSharedKeyCredential) {
        return true;
    }
    return factory.constructor.name === "StorageSharedKeyCredential";
}
function isAnonymousCredential(factory) {
    if (factory instanceof storage_blob_3.AnonymousCredential) {
        return true;
    }
    return factory.constructor.name === "AnonymousCredential";
}
function isCoreHttpBearerTokenFactory(factory) {
    return (0, core_auth_1.isTokenCredential)(factory.credential);
}
function isStorageBrowserPolicyFactory(factory) {
    if (factory instanceof storage_blob_7.StorageBrowserPolicyFactory) {
        return true;
    }
    return factory.constructor.name === "StorageBrowserPolicyFactory";
}
function isStorageRetryPolicyFactory(factory) {
    if (factory instanceof storage_blob_1.StorageRetryPolicyFactory) {
        return true;
    }
    return factory.constructor.name === "StorageRetryPolicyFactory";
}
function isStorageTelemetryPolicyFactory(factory) {
    return factory.constructor.name === "TelemetryPolicyFactory";
}
function isInjectorPolicyFactory(factory) {
    return factory.constructor.name === "InjectorPolicyFactory";
}
function isCoreHttpPolicyFactory(factory) {
    const knownPolicies = [
        "GenerateClientRequestIdPolicy",
        "TracingPolicy",
        "LogPolicy",
        "ProxyPolicy",
        "DisableResponseDecompressionPolicy",
        "KeepAlivePolicy",
        "DeserializationPolicy",
    ];
    const mockHttpClient = {
        sendRequest: async (request) => {
            return {
                request,
                headers: request.headers.clone(),
                status: 500,
            };
        },
    };
    const mockRequestPolicyOptions = {
        log(_logLevel, _message) {
            /* do nothing */
        },
        shouldLog(_logLevel) {
            return false;
        },
    };
    const policyInstance = factory.create(mockHttpClient, mockRequestPolicyOptions);
    const policyName = policyInstance.constructor.name;
    // bundlers sometimes add a custom suffix to the class name to make it unique
    return knownPolicies.some((knownPolicyName) => {
        return policyName.startsWith(knownPolicyName);
    });
}
//# sourceMappingURL=Pipeline.js.map