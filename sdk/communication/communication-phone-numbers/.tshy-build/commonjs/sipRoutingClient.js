"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SipRoutingClient = void 0;
const tslib_1 = require("tslib");
const communication_common_1 = require("@azure/communication-common");
const core_auth_1 = require("@azure/core-auth");
const index_js_1 = require("./utils/index.js");
const sipRoutingClient_js_1 = require("./generated/src/siprouting/sipRoutingClient.js");
const mappers_js_1 = require("./mappers.js");
const tracing_js_1 = require("./generated/src/tracing.js");
tslib_1.__exportStar(require("./models.js"), exports);
/**
 * Checks whether the type of a value is SipClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSipClientOptions = (options) => options && !(0, communication_common_1.isKeyCredential)(options) && !(0, core_auth_1.isTokenCredential)(options);
/**
 * Client class for interacting with Azure Communication Services SIP Routing Administration.
 */
class SipRoutingClient {
    constructor(connectionStringOrUrl, credentialOrOptions, maybeOptions = {}) {
        const { url, credential } = (0, communication_common_1.parseClientArguments)(connectionStringOrUrl, credentialOrOptions);
        const options = isSipClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: index_js_1.logger.info,
            },
        });
        this.client = new sipRoutingClient_js_1.SipRoutingClient(url, Object.assign({ endpoint: url }, internalPipelineOptions));
        const authPolicy = (0, communication_common_1.createCommunicationAuthPolicy)(credential);
        this.client.pipeline.addPolicy(authPolicy);
    }
    /**
     * Lists the SIP trunks.
     * @param options - The options parameters.
     */
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    listTrunks(options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("SipRoutingClient-listTrunks", options);
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
        return tracing_js_1.tracingClient.withSpan("SipRoutingClient-getTrunk", options, async (updatedOptions) => {
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
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("SipRoutingClient-listRoutes", options);
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
        return tracing_js_1.tracingClient.withSpan("SipRoutingClient-setTrunks", options, async (updatedOptions) => {
            const patch = { trunks: (0, mappers_js_1.transformIntoRestModel)(trunks) };
            let config = await this.client.sipRouting.get(updatedOptions);
            const storedFqdns = (0, mappers_js_1.transformFromRestModel)(config.trunks).map((trunk) => trunk.fqdn);
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
            return (0, mappers_js_1.transformFromRestModel)(config.trunks);
        });
    }
    /**
     * Sets the SIP trunk.
     * @param trunk - The SIP trunk to be set.
     * @param options - The options parameters.
     */
    async setTrunk(trunk, options = {}) {
        return tracing_js_1.tracingClient.withSpan("SipRoutingClient-setTrunk", options, async (updatedOptions) => {
            const patch = {
                trunks: (0, mappers_js_1.transformIntoRestModel)([trunk]),
            };
            const payload = Object.assign(Object.assign({}, updatedOptions), patch);
            const config = await this.client.sipRouting.update(payload);
            const storedTrunk = (0, mappers_js_1.transformFromRestModel)(config.trunks).find((value) => value.fqdn === trunk.fqdn);
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
        return tracing_js_1.tracingClient.withSpan("SipRoutingClient-setRoutes", options, async (updatedOptions) => {
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
        return tracing_js_1.tracingClient.withSpan("SipRoutingClient-deleteTrunk", options, async (updatedOptions) => {
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
        return (0, mappers_js_1.transformFromRestModel)(config.trunks);
    }
    listRoutesPagingAll(options) {
        return tslib_1.__asyncGenerator(this, arguments, function* listRoutesPagingAll_1() {
            var _a, e_1, _b, _c;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listRoutesPagingPage(options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(page)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    listTrunksPagingAll(options) {
        return tslib_1.__asyncGenerator(this, arguments, function* listTrunksPagingAll_1() {
            var _a, e_2, _b, _c;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listTrunksPagingPage(options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(page)));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    listTrunksPagingPage() {
        return tslib_1.__asyncGenerator(this, arguments, function* listTrunksPagingPage_1(options = {}) {
            const apiResult = yield tslib_1.__await(this.getTrunksInternal(options));
            yield yield tslib_1.__await(apiResult);
        });
    }
    listRoutesPagingPage() {
        return tslib_1.__asyncGenerator(this, arguments, function* listRoutesPagingPage_1(options = {}) {
            const apiResult = yield tslib_1.__await(this.getRoutesInternal(options));
            yield yield tslib_1.__await(apiResult);
        });
    }
}
exports.SipRoutingClient = SipRoutingClient;
//# sourceMappingURL=sipRoutingClient.js.map