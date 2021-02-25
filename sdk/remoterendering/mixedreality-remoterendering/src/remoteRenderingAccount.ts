// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

class RemoteRenderingAccount {
    public readonly accountId : string;

    public readonly accountDomain : string;

    // TODO UUID?
    constructor(accountId : string, accountDomain : string) {
        if (!accountId) {
            throw new Error("Argument cannot be null or empty: 'accountId'.");
        }
        if (!accountDomain) {
            throw new Error("Argument cannot be null or empty: 'accountDomain'.");
        }
        this.accountId = accountId;
        this.accountDomain = accountDomain;
    }
}
