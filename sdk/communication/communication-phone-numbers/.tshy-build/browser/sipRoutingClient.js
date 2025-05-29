// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { createCommunicationAuthPolicy, isKeyCredential, parseClientArguments, } from "@azure/communication-common";
import { isTokenCredential } from "@azure/core-auth";
import { logger } from "./utils/index.js";
import { SipRoutingClient as SipRoutingGeneratedClient } from "./generated/src/siprouting/sipRoutingClient.js";
import { transformFromRestModel, transformIntoRestModel } from "./mappers.js";
import { tracingClient } from "./generated/src/tracing.js";
export * from "./models.js";
/**
 * Checks whether the type of a value is SipClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSipClientOptions = (options) => options && !isKeyCredential(options) && !isTokenCredential(options);
/**
 * Client class for interacting with Azure Communication Services SIP Routing Administration.
 */
export class SipRoutingClient {
    constructor(connectionStringOrUrl, credentialOrOptions, maybeOptions = {}) {
        const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
        const options = isSipClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: logger.info,
            },
        });
        this.client = new SipRoutingGeneratedClient(url, Object.assign({ endpoint: url }, internalPipelineOptions));
        const authPolicy = createCommunicationAuthPolicy(credential);
        this.client.pipeline.addPolicy(authPolicy);
    }
    /**
     * Lists the SIP trunks.
     * @param options - The options parameters.
     */
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    listTrunks(options = {}) {
        const { span, updatedOptions } = tracingClient.startSpan("SipRoutingClient-listTrunks", options);
        try {
            const iter = this.listTrunksPagingAll(Object.assign({}, updatedOptions));
            return {
                next() {
                    return iter.next();
                },
                [Symbol.asyncIterator]() {
                    return this;
                },
                byPage: () => {
                    return this.listTrunksPagingPage(Object.assign({}, updatedOptions));
                },
            };
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
            span.end();
        }
    }
    /**
     * Gets the SIP trunk.
     * @param fqdn - The trunk's FQDN.
     * @param options - The options parameters.
     */
    async getTrunk(fqdn, options = {}) {
        return tracingClient.withSpan("SipRoutingClient-getTrunk", options, async (updatedOptions) => {
            const trunks = await this.getTrunksInternal(updatedOptions);
            const trunk = trunks.find((value) => value.fqdn === fqdn);
            if (trunk) {
                return trunk;
            }
            throw { code: "NotFound", message: "Not Found" };
        });
    }
    /**
     * Lists the SIP trunk routes.
     * @param options - The options parameters.
     */
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    listRoutes(options = {}) {
        const { span, updatedOptions } = tracingClient.startSpan("SipRoutingClient-listRoutes", options);
        try {
            const iter = this.listRoutesPagingAll(Object.assign({}, updatedOptions));
            return {
                next() {
                    return iter.next();
                },
                [Symbol.asyncIterator]() {
                    return this;
                },
                byPage: () => {
                    return this.listRoutesPagingPage(Object.assign({}, updatedOptions));
                },
            };
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
            span.end();
        }
    }
    /**
     * Sets the SIP trunks.
     * @param trunks - The SIP trunks to be set.
     * @param options - The options parameters.
     */
    async setTrunks(trunks, options = {}) {
        return tracingClient.withSpan("SipRoutingClient-setTrunks", options, async (updatedOptions) => {
            const patch = { trunks: transformIntoRestModel(trunks) };
            let config = await this.client.sipRouting.get(updatedOptions);
            const storedFqdns = transformFromRestModel(config.trunks).map((trunk) => trunk.fqdn);
            const setFqdns = trunks.map((trunk) => trunk.fqdn);
            storedFqdns.forEach((storedFqdn) => {
                const shouldDeleteStoredTrunk = !setFqdns.find((value) => value === storedFqdn);
                if (shouldDeleteStoredTrunk) {
                    patch.trunks[storedFqdn] = null;
                }
            });
            const isPatchNeeded = Object.keys(patch.trunks).length > 0;
            if (isPatchNeeded) {
                const payload = Object.assign(Object.assign({}, updatedOptions), patch);
                config = await this.client.sipRouting.update(payload);
            }
            return transformFromRestModel(config.trunks);
        });
    }
    /**
     * Sets the SIP trunk.
     * @param trunk - The SIP trunk to be set.
     * @param options - The options parameters.
     */
    async setTrunk(trunk, options = {}) {
        return tracingClient.withSpan("SipRoutingClient-setTrunk", options, async (updatedOptions) => {
            const patch = {
                trunks: transformIntoRestModel([trunk]),
            };
            const payload = Object.assign(Object.assign({}, updatedOptions), patch);
            const config = await this.client.sipRouting.update(payload);
            const storedTrunk = transformFromRestModel(config.trunks).find((value) => value.fqdn === trunk.fqdn);
            if (storedTrunk) {
                return storedTrunk;
            }
            throw { code: "NotFound", message: "Not Found" };
        });
    }
    /**
     * Sets the SIP trunk routes.
     * @param routes - The SIP trunk routes to be set.
     * @param options - The options parameters.
     */
    async setRoutes(routes, options = {}) {
        return tracingClient.withSpan("SipRoutingClient-setRoutes", options, async (updatedOptions) => {
            const patch = {
                routes: routes,
            };
            const payload = Object.assign(Object.assign({}, updatedOptions), patch);
            const config = await this.client.sipRouting.update(payload);
            const storedRoutes = config.routes || (await this.getRoutesInternal(updatedOptions));
            return storedRoutes;
        });
    }
    /**
     * Deletes the SIP trunk.
     * @param fqdn - The trunk's FQDN.
     * @param options - The options parameters.
     */
    async deleteTrunk(fqdn, options = {}) {
        return tracingClient.withSpan("SipRoutingClient-deleteTrunk", options, async (updatedOptions) => {
            const trunks = {};
            trunks[fqdn] = null;
            const patch = {
                trunks: trunks,
            };
            const payload = Object.assign(Object.assign({}, updatedOptions), patch);
            await this.client.sipRouting.update(payload);
        });
    }
    async getRoutesInternal(options) {
        const config = await this.client.sipRouting.get(options);
        return config.routes || [];
    }
    async getTrunksInternal(options) {
        const config = await this.client.sipRouting.get(options);
        return transformFromRestModel(config.trunks);
    }
    listRoutesPagingAll(options) {
        return __asyncGenerator(this, arguments, function* listRoutesPagingAll_1() {
            var _a, e_1, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(this.listRoutesPagingPage(options)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    yield __await(yield* __asyncDelegator(__asyncValues(page)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    listTrunksPagingAll(options) {
        return __asyncGenerator(this, arguments, function* listTrunksPagingAll_1() {
            var _a, e_2, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(this.listTrunksPagingPage(options)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    yield __await(yield* __asyncDelegator(__asyncValues(page)));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    listTrunksPagingPage() {
        return __asyncGenerator(this, arguments, function* listTrunksPagingPage_1(options = {}) {
            const apiResult = yield __await(this.getTrunksInternal(options));
            yield yield __await(apiResult);
        });
    }
    listRoutesPagingPage() {
        return __asyncGenerator(this, arguments, function* listRoutesPagingPage_1(options = {}) {
            const apiResult = yield __await(this.getRoutesInternal(options));
            yield yield __await(apiResult);
        });
    }
}
//# sourceMappingURL=sipRoutingClient.js.map