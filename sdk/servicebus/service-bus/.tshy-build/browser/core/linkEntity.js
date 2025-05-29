// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants, TokenType, defaultCancellableLock, StandardAbortMessage, isSasTokenProvider, } from "@azure/core-amqp";
import { generate_uuid } from "rhea-promise";
import { getUniqueName } from "../util/utils.js";
import { AbortError } from "@azure/abort-controller";
import { ServiceBusError } from "../serviceBusError.js";
/**
 * @internal
 * Describes the base class for entities like MessageSender, MessageReceiver and Management client.
 */
export class LinkEntity {
    get logPrefix() {
        return this._logPrefix;
    }
    /**
     * Creates a new ClientEntity instance.
     * @param baseName - The base name to use for the link. A unique ID will be appended to this.
     * @param entityPath - The entity path (ex: 'your-queue')
     * @param context - The connection context.
     * @param options - Options that can be provided while creating the LinkEntity.
     */
    constructor(baseName, entityPath, context, _linkType, _logger, options) {
        this.baseName = baseName;
        this.entityPath = entityPath;
        this._linkType = _linkType;
        this._logger = _logger;
        /**
         * Indicates that close() has been called on this link and
         * that it should not be allowed to reopen.
         */
        this._wasClosedPermanently = false;
        /**
         * A lock that ensures that opening and closing this
         * link properly cooperate.
         */
        this._openLock = `linkEntity-${generate_uuid()}`;
        if (!options)
            options = {};
        this._context = context;
        this.address = options.address || "";
        this.audience = options.audience || "";
        this.name = getUniqueName(baseName);
        this._logPrefix = `[${context.connectionId}|${this._linkType}:${this.name}]`;
    }
    /**
     * Determines whether the AMQP link is open. If open then returns true else returns false.
     */
    isOpen() {
        const result = this._link ? this._link.isOpen() : false;
        this._logger.verbose(`${this._logPrefix} is open? ${result}`);
        return result;
    }
    /**
     * Initializes this LinkEntity, setting this._link with the result of  `createRheaLink`, which
     * is implemented by child classes.
     *
     * @returns A Promise that resolves when the link has been properly initialized
     * @throws `AbortError` if the link has been closed via 'close'
     */
    async initLink(options, abortSignal) {
        // we'll check that the connection isn't in the process of recycling (and if so, wait for it to complete)
        await this._context.readyToOpenLink();
        this._logger.verbose(`${this._logPrefix} Attempting to acquire lock token ${this._openLock} for initializing link`);
        return defaultCancellableLock.acquire(this._openLock, () => {
            this._logger.verbose(`${this._logPrefix} Lock ${this._openLock} acquired for initializing link`);
            return this._initLinkImpl(options, abortSignal);
        }, {
            abortSignal: abortSignal,
            timeoutInMs: Constants.defaultOperationTimeoutInMs,
        });
    }
    async _initLinkImpl(options, abortSignal) {
        const checkAborted = () => {
            var _a;
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                (_a = this._link) === null || _a === void 0 ? void 0 : _a.close();
                throw new AbortError(StandardAbortMessage);
            }
        };
        const connectionId = this._context.connectionId;
        checkAborted();
        if (options.name) {
            this.name = options.name;
            this._logPrefix = `[${connectionId}|${this._linkType}:${this.name}]`;
        }
        if (this._wasClosedPermanently) {
            this._logger.verbose(`${this._logPrefix} Link has been permanently closed. Not reopening.`);
            throw new AbortError(`Link has been permanently closed. Not reopening.`);
        }
        if (this.isOpen()) {
            this._logger.verbose(`${this._logPrefix} Link is already open. Returning.`);
            return;
        }
        this._logger.verbose(`${this._logPrefix} Is not open and is not currently connecting. Opening.`);
        try {
            await this._negotiateClaim({
                abortSignal,
                setTokenRenewal: false,
                timeoutInMs: Constants.defaultOperationTimeoutInMs,
            });
            checkAborted();
            this.checkIfConnectionReady();
            this._logger.verbose(`${this._logPrefix} Creating with options %O`, options);
            this._link = await this.createRheaLink(options);
            checkAborted();
            this._ensureTokenRenewal();
            this._logger.verbose(`${this._logPrefix} Link has been created.`);
        }
        catch (err) {
            this._logger.logError(err, `${this._logPrefix} Error thrown when creating the link`);
            await this.closeLinkImpl();
            throw err;
        }
    }
    /**
     * Clears token renewal for current link, removes current LinkEntity instance from cache,
     * and closes the underlying AMQP link.
     * Once closed, this instance of LinkEntity is not meant to be re-used.
     */
    async close() {
        // Set the flag to indicate that this instance of LinkEntity is not meant to be re-used.
        this._wasClosedPermanently = true;
        this._logger.verbose(`${this.logPrefix} permanently closing this link.`);
        this.removeLinkFromContext();
        await this.closeLink();
        this._logger.verbose(`${this.logPrefix} permanently closed this link.`);
    }
    /**
     * Closes the internally held rhea link, stops the token renewal timer and sets
     * the this._link field to undefined.
     */
    closeLink() {
        this._logger.verbose(`${this._logPrefix} Attempting to acquire lock token ${this._openLock} for closing link`);
        return defaultCancellableLock.acquire(this._openLock, () => {
            this._logger.verbose(`${this._logPrefix} Lock ${this._openLock} acquired for closing link`);
            return this.closeLinkImpl();
        }, { abortSignal: undefined, timeoutInMs: undefined });
    }
    async closeLinkImpl() {
        this._logger.verbose(`${this._logPrefix} closeLinkImpl() called`);
        clearTimeout(this._tokenRenewalTimer);
        this._tokenRenewalTimer = undefined;
        if (this._link) {
            try {
                const link = this._link;
                this._link = undefined;
                // This should take care of closing the link and it's underlying session. This should also
                // remove them from the internal map.
                await link.close();
                this._logger.verbose(`${this._logPrefix} closed.`);
            }
            catch (err) {
                this._logger.logError(err, `${this._logPrefix} An error occurred while closing the link`);
            }
        }
    }
    /**
     * Provides the current type of the ClientEntity.
     * @returns The entity type.
     */
    get _type() {
        let result = "LinkEntity";
        if (this.constructor && this.constructor.name) {
            result = this.constructor.name;
        }
        return result;
    }
    get wasClosedPermanently() {
        return this._wasClosedPermanently;
    }
    get link() {
        return this._link;
    }
    /**
     * Negotiates the cbs claim for the ClientEntity.
     * @param setTokenRenewal - Set the token renewal timer. Default false.
     */
    async _negotiateClaim({ abortSignal, setTokenRenewal, timeoutInMs, }) {
        this._logger.verbose(`${this._logPrefix} negotiateclaim() has been called`);
        // Wait for the connectionContext to be ready to open the link.
        this.checkIfConnectionReady();
        // Acquire the lock and establish a cbs session if it does not exist on the connection.
        // Although node.js is single threaded, we need a locking mechanism to ensure that a
        // race condition does not happen while creating a shared resource (in this case the
        // cbs session, since we want to have exactly 1 cbs session per connection).
        this._logger.verbose("%s Acquiring cbs lock: '%s' for creating the cbs session while creating the %s: " +
            "'%s' with address: '%s'.", this.logPrefix, this._context.cbsSession.cbsLock, this._type, this.name, this.address);
        const startTime = Date.now();
        if (!this._context.cbsSession.isOpen()) {
            await defaultCancellableLock.acquire(this._context.cbsSession.cbsLock, () => {
                this.checkIfConnectionReady();
                return this._context.cbsSession.init({ abortSignal, timeoutInMs });
            }, {
                abortSignal,
                timeoutInMs: timeoutInMs - (Date.now() - startTime),
            });
        }
        let tokenObject;
        let tokenType;
        if (isSasTokenProvider(this._context.tokenCredential)) {
            tokenObject = await this._context.tokenCredential.getToken(this.audience);
            tokenType = TokenType.CbsTokenTypeSas;
            // renew sas token in every 45 minutes
            this._tokenTimeout = (3600 - 900) * 1000;
        }
        else {
            const aadToken = await this._context.tokenCredential.getToken(Constants.aadServiceBusScope);
            if (!aadToken) {
                throw new Error(`Failed to get token from the provided "TokenCredential" object`);
            }
            tokenObject = aadToken;
            tokenType = TokenType.CbsTokenTypeJwt;
            this._tokenTimeout = tokenObject.expiresOnTimestamp - Date.now() - 2 * 60 * 1000;
        }
        this._logger.verbose("%s %s: calling negotiateClaim for audience '%s'.", this.logPrefix, this._type, this.audience);
        // Acquire the lock to negotiate the CBS claim.
        this._logger.verbose("%s Acquiring cbs lock: '%s' for cbs auth for %s: '%s' with address '%s'.", this.logPrefix, this._context.negotiateClaimLock, this._type, this.name, this.address);
        if (!tokenObject) {
            throw new Error("Token cannot be null");
        }
        await defaultCancellableLock.acquire(this._context.negotiateClaimLock, () => {
            this.checkIfConnectionReady();
            return this._context.cbsSession.negotiateClaim(this.audience, tokenObject.token, tokenType, {
                abortSignal,
                timeoutInMs: timeoutInMs - (Date.now() - startTime),
            });
        }, {
            abortSignal,
            timeoutInMs: timeoutInMs - (Date.now() - startTime),
        });
        this._logger.verbose("%s Negotiated claim for %s '%s' with with address: %s", this.logPrefix, this._type, this.name, this.address);
        if (setTokenRenewal) {
            this._ensureTokenRenewal();
        }
    }
    /**
     * Checks to see if the connection is in a "reopening" state. If it is
     * we need to _not_ use it otherwise we'll trigger some race conditions
     * within rhea (for instance, errors about _process not being defined).
     */
    checkIfConnectionReady() {
        if (!this._context.isConnectionClosing()) {
            return;
        }
        this._logger.verbose(`${this._logPrefix} Connection is reopening, aborting link initialization.`);
        const err = new ServiceBusError("Connection is reopening, aborting link initialization.", "GeneralError");
        err.retryable = true;
        throw err;
    }
    /**
     * Ensures that the token is renewed within the predefined renewal margin.
     */
    _ensureTokenRenewal() {
        if (!this._tokenTimeout) {
            return;
        }
        // Clear the existing token renewal timer.
        // This scenario can happen if the connection goes down and is brought back up
        // before the `nextRenewalTimeout` was reached.
        if (this._tokenRenewalTimer) {
            clearTimeout(this._tokenRenewalTimer);
        }
        this._tokenRenewalTimer = setTimeout(async () => {
            try {
                await this._negotiateClaim({
                    setTokenRenewal: true,
                    abortSignal: undefined,
                    timeoutInMs: Constants.defaultOperationTimeoutInMs,
                });
            }
            catch (err) {
                this._logger.logError(err, "%s %s '%s' with address %s, an error occurred while renewing the token", this.logPrefix, this._type, this.name, this.address);
            }
        }, this._tokenTimeout);
        this._logger.verbose("%s %s '%s' with address %s, has next token renewal in %d milliseconds @(%s).", this.logPrefix, this._type, this.name, this.address, this._tokenTimeout, new Date(Date.now() + this._tokenTimeout).toString());
    }
}
//# sourceMappingURL=linkEntity.js.map