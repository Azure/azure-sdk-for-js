// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { 
    PlayRequest, 
    PlaySource as PlaySourceInternal,
    FileSource as FileSourceInternal,
    TextSource as TextSourceInternal,
    KnownPlaySourceType, 
} from "./generated/src";

import { CallMediaImpl } from "./generated/src/operations";

import {
  CommunicationIdentifier,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";

import {
    FileSource,
    TextSource
} from "./models/models";

import {
    PlayOptions
} from "./models/options";

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

    private createPlaySourceInternal(playSource: FileSource | TextSource): PlaySourceInternal {
        if (playSource.kind == "fileSource") {
            const fileSource: FileSourceInternal = {
                uri: playSource.uri
            };
            return {
                sourceType: KnownPlaySourceType.File,
                fileSource: fileSource,
                playSourceId: playSource.playSourceId
            };
        }

        if (playSource.kind == "textSource") {
            const textSource: TextSourceInternal = {
                text: playSource.text,
                voiceGender: playSource.voiceGender,
                sourceLocale: playSource.sourceLocale,
                voiceName: playSource.voiceName
            };
            return {
                sourceType: KnownPlaySourceType.Text,
                textSource: textSource,
                playSourceId: playSource.playSourceId
            };
        }
        throw new Error("Invalid play source");
    }

    /**
     * Play
     *
     * @param playSource - A PlaySource representing the source to play.
     * @param playTo - The targets to play to.
     */
    public async play(playSource: FileSource | TextSource, playTo: CommunicationIdentifier[], 
        playOptions: PlayOptions = {}
        ): Promise<void> {
        const playRequest: PlayRequest = {
            playSourceInfo: this.createPlaySourceInternal(playSource),
            playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
        }
        return this.callMediaImpl.play(this.callConnectionId, playRequest, playOptions)
    }
}