// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallMedia } from "./callMedia";
import { CallConnectionImpl, CallMediaImpl } from "./generated/src/operations";

/**
* CallConnection class represents call connection based APIs.
*/
export class CallConnection {
    private readonly callConnectionId: string;
    // TODO: make these property private once they are used in the class - now it is for passing the compilation
    public readonly callConnectionImpl: CallConnectionImpl;
    private readonly callMediaImpl: CallMediaImpl;

    constructor(callConnectionId: string, callConnectionImpl: CallConnectionImpl, callMediaImpl: CallMediaImpl) {
        this.callConnectionId = callConnectionId;
        this.callConnectionImpl = callConnectionImpl;
        this.callMediaImpl = callMediaImpl;
    }

    /**
    * Initializes a new instance of CallMedia.
    */
    public getCallMedia(): CallMedia {
        return new CallMedia(this.callConnectionId, this.callMediaImpl);
    }
}