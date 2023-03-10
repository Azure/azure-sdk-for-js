// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PlayRequest,
  PlaySourceInternal,
  FileSourceInternal,
  KnownPlaySourceType,
  RecognizeRequest,
  KnownRecognizeInputType,
  RecognizeOptions,
  DtmfOptions,
} from "./generated/src";

import { CallMediaImpl } from "./generated/src/operations";

import {
  CommunicationIdentifier,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";

import { FileSource } from "./models/models";

import { PlayOptions, CallMediaRecognizeDtmfOptions } from "./models/options";

/**
 * CallMedia class represents call media related APIs.
 */
export class CallMedia {
  private readonly callConnectionId: string;
  private readonly callMediaImpl: CallMediaImpl;

  constructor(callConnectionId: string, callMediaImpl: CallMediaImpl) {
    this.callConnectionId = callConnectionId;
    this.callMediaImpl = callMediaImpl;
  }

  private createPlaySourceInternal(playSource: FileSource): PlaySourceInternal {
    if (playSource.kind === "fileSource" || playSource.kind === undefined) {
      const fileSource: FileSourceInternal = {
        uri: playSource.uri,
      };
      return {
        sourceType: KnownPlaySourceType.File,
        fileSource: fileSource,
        playSourceId: playSource.playSourceId,
      };
    }
    throw new Error("Invalid play source");
  }

  /**
   * Play
   *
   * @param playSource - A PlaySource representing the source to play.
   * @param playTo - The targets to play to.
   * @param playOptions - Additional attributes for play.
   */
  public async play(
    playSource: FileSource,
    playTo: CommunicationIdentifier[],
    playOptions: PlayOptions = { loop: false }
  ): Promise<void> {
    const playRequest: PlayRequest = {
      playSourceInfo: this.createPlaySourceInternal(playSource),
      playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
    };
    return this.callMediaImpl.play(this.callConnectionId, playRequest, playOptions);
  }

  /**
   * Play to all participants
   *
   * @param playSource - A PlaySource representing the source to play.
   * @param playOptions - Additional attributes for play.
   */
  public async playToAll(
    playSource: FileSource,
    playOptions: PlayOptions = { loop: false }
  ): Promise<void> {
    const playRequest: PlayRequest = {
      playSourceInfo: this.createPlaySourceInternal(playSource),
      playTo: [],
    };
    return this.callMediaImpl.play(this.callConnectionId, playRequest, playOptions);
  }

  private createRecognizeRequest(
    recognizeOptions: CallMediaRecognizeDtmfOptions
  ): RecognizeRequest {
    if (
      recognizeOptions.kind === "callMediaRecognizeDtmfOptions" ||
      recognizeOptions.kind === undefined
    ) {
      const dtmfOptionsInternal: DtmfOptions = {
        interToneTimeoutInSeconds: recognizeOptions.interToneTimeoutInSeconds,
        maxTonesToCollect: recognizeOptions.maxTonesToCollect,
        stopTones: recognizeOptions.stopDtmfTones,
      };
      const recognizeOptionsInternal: RecognizeOptions = {
        interruptPrompt: recognizeOptions.interruptPrompt,
        initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds,
        targetParticipant: serializeCommunicationIdentifier(recognizeOptions.targetParticipant),
        dtmfOptions: dtmfOptionsInternal,
      };
      return {
        recognizeInputType: KnownRecognizeInputType.Dtmf,
        playPrompt: this.createPlaySourceInternal(recognizeOptions.playPrompt),
        interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
        recognizeOptions: recognizeOptionsInternal,
        operationContext: recognizeOptions.operationContext,
      };
    }

    throw new Error("Invalid recognizeOptions");
  }

  /**
   *  Recognize operation.
   *  @param recognizeOptions - Different attributes for recognize.
   * */
  public async startRecognizing(recognizeOptions: CallMediaRecognizeDtmfOptions): Promise<void> {
    return this.callMediaImpl.recognize(
      this.callConnectionId,
      this.createRecognizeRequest(recognizeOptions),
      {}
    );
  }

  /**
   * Cancels all the queued media operations.
   */
  public async cancelAllMediaOperations(): Promise<void> {
    return this.callMediaImpl.cancelAllMediaOperations(this.callConnectionId, {});
  }
}
