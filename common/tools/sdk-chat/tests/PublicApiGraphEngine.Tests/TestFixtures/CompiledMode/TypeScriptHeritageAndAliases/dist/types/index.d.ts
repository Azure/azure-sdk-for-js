import type { BaseClient, BaseOptions, AuthConfig, TokenCredential } from "@dep/core";

export declare class StorageClient implements BaseClient {
    readonly endpoint: string;
    close(): void;
    getServiceVersion(): string;
}

export interface StorageOptions extends BaseOptions {
    accountName: string;
    auth: AuthConfig;
}

export declare class AuthHelper {
    authenticate(credential: TokenCredential): Promise<void>;
}

export type ExtendedOptions = StorageOptions & {
    retryCount: number;
    timeout: number;
};

export type CredentialInput = TokenCredential | string;

export type ResolvedAuth = AuthConfig & {
    resolved: true;
    token: string;
};
