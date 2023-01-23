// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallMediaImpl } from "./generated/src/operations";

/**
* CallMedia class represents call media related APIs.
*/
export class CallMedia {
    // TODO: make these property private once they are used in the class - now it is for passing the compilation
    public readonly callConnectionId: string;
    public readonly callMediaImpl: CallMediaImpl;

    constructor(callConnectionId: string, callMediaImpl: CallMediaImpl) {
        this.callConnectionId = callConnectionId;
        this.callMediaImpl = callMediaImpl;
    }
}