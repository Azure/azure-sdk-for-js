// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallRecordingImpl } from "./generated/src/operations";

/**
* CallRecording class represents call recording related APIs.
*/
export class CallRecording {
    // TODO: make these property private once they are used in the class - now it is for passing the compilation
    public readonly callRecordingImpl: CallRecordingImpl;

    constructor(callRecordingImpl: CallRecordingImpl) {
        this.callRecordingImpl = callRecordingImpl;
    }
}