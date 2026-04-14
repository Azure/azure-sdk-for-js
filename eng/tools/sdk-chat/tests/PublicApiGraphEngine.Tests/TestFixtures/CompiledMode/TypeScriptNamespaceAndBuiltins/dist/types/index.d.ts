import type { ChildProcess } from "node:child_process";
import type { EventEmitter } from "node:events";
import type { Readable } from "node:stream";
import type { INetworkModule, AuthConfig, TokenCacheRecord } from "ext-lib";
import { ExtLogger } from "ext-lib";

export declare class NamespaceClient {
    spawn(): ChildProcess;
    getEmitter(): EventEmitter;
    getStream(): Readable;
    acquireToken(config: AuthConfig): Promise<TokenResult>;
    getNetworkConfig(): INetworkModule;
}

export interface NamespaceClientOptions {
    network: INetworkModule;
    auth: AuthConfig;
    logger: ExtLogger;
}

export interface TokenResult {
    cache: TokenCacheRecord;
    acquiredAt: Date;
}

export declare function createAuthConfig(network: INetworkModule, logger: ExtLogger): AuthConfig;

export declare function processStream(input: Readable): Promise<void>;
