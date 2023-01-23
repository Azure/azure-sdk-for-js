// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier, PhoneNumberIdentifier } from "@azure/communication-common";

/** The caller. */
export interface CallSource {
    /**
    * The source caller Id, a phone number, that's shown to the PSTN participant being invited.
    * Required only when calling a PSTN callee.
    */
    callerId?: PhoneNumberIdentifier;
    /** Display name of the call if dialing out to a pstn number */
    displayName?: string;
    /** The identifier of the source of the call */
    identifier: CommunicationIdentifier;
}