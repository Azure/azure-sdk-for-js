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
  CallAutomationApiClient,
  CallAutomationApiClientOptionalParams,
  ContinuousDtmfRecognitionRequest,
  SendDtmfRequest,
  Tone,
} from "./generated/src";

import { CallMediaImpl } from "./generated/src/operations";

import {
  CommunicationIdentifier,
  createCommunicationAuthPolicy,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";

import { FileSource } from "./models/models";

import {
  PlayOptions,
  CallMediaRecognizeDtmfOptions,
  ContinuousDtmfRecognitionOptions,
  SendDtmfOptions,
} from "./models/options";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

/**
 * CallMedia class represents call media related APIs.
 */
export class CallMedia {
  private readonly callConnectionId: string;
  private readonly callMedia: CallMediaImpl;
  private readonly callAutomationApiClient: CallAutomationApiClient;
  constructor(
    callConnectionId: string,
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: CallAutomationApiClientOptionalParams
  ) {
    this.callAutomationApiClient = new CallAutomationApiClient(endpoint, options);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.callAutomationApiClient.pipeline.addPolicy(authPolicy);
    this.callConnectionId = callConnectionId;
    this.callMedia = new CallMediaImpl(this.callAutomationApiClient);
  }

  private createPlaySourceInternal(playSource: FileSource): PlaySourceInternal {
    if (playSource.kind === "fileSource" || playSource.kind === undefined) {
      const fileSource: FileSourceInternal = {
        uri: playSource.url,
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
   * Play audio to a specific participant.
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
      playOptions: {
        loop: false,
      },
    };

    if (playOptions.loop !== undefined) {
      playRequest.playOptions = playRequest.playOptions || { loop: false }; // Ensure playOptions is defined
      playRequest.playOptions.loop = playOptions.loop;
    }
    return this.callMedia.play(this.callConnectionId, playRequest, playOptions);
  }

  /**
   * Play to all participants.
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
      playOptions: {
        loop: false,
      },
    };

    if (playOptions.loop !== undefined) {
      playRequest.playOptions = playRequest.playOptions || { loop: false }; // Ensure playOptions is defined
      playRequest.playOptions.loop = playOptions.loop;
    }
    return this.callMedia.play(this.callConnectionId, playRequest, playOptions);
  }

  private createRecognizeRequest(
    targetParticipant: CommunicationIdentifier,
    maxTonesToCollect: number,
    recognizeOptions: CallMediaRecognizeDtmfOptions
  ): RecognizeRequest {
    if (
      recognizeOptions.kind === "callMediaRecognizeDtmfOptions" ||
      recognizeOptions.kind === undefined
    ) {
      const dtmfOptionsInternal: DtmfOptions = {
        interToneTimeoutInSeconds: recognizeOptions.interToneTimeoutInSeconds
          ? recognizeOptions.interToneTimeoutInSeconds
          : 2,
        maxTonesToCollect: maxTonesToCollect,
        stopTones: recognizeOptions.stopDtmfTones,
      };
      const recognizeOptionsInternal: RecognizeOptions = {
        interruptPrompt: recognizeOptions.interruptPrompt,
        initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
          ? recognizeOptions.initialSilenceTimeoutInSeconds
          : 5,
        targetParticipant: serializeCommunicationIdentifier(targetParticipant),
        dtmfOptions: dtmfOptionsInternal,
      };
      return {
        recognizeInputType: KnownRecognizeInputType.Dtmf,
        playPrompt: recognizeOptions.playPrompt
          ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
          : undefined,
        interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
        recognizeOptions: recognizeOptionsInternal,
        operationContext: recognizeOptions.operationContext,
      };
    }

    throw new Error("Invalid recognizeOptions");
  }

  /**
   *  Recognize participant input.
   *  @param recognizeOptions - Different attributes for recognize.
   * */
  public async startRecognizing(
    targetParticipant: CommunicationIdentifier,
    maxTonesToCollect: number,
    recognizeOptions: CallMediaRecognizeDtmfOptions
  ): Promise<void> {
    return this.callMedia.recognize(
      this.callConnectionId,
      this.createRecognizeRequest(targetParticipant, maxTonesToCollect, recognizeOptions),
      {}
    );
  }

  /**
   * Cancels all the queued media operations.
   */
  public async cancelAllOperations(): Promise<void> {
    return this.callMedia.cancelAllMediaOperations(this.callConnectionId, {});
  }

  /**
   * Start continuous Dtmf recognition by subscribing to tones.
   * @param targetParticipant - Target participant.
   * @param continuousDtmfRecognitionOptions - Additional attributes for continuous Dtmf recognition
   * */
  public async startContinuousDtmfRecognition(
    targetParticipant: CommunicationIdentifier,
    continuousDtmfRecognitionOptions: ContinuousDtmfRecognitionOptions = {}
  ): Promise<void> {
    const continuousDtmfRecognitionRequest: ContinuousDtmfRecognitionRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: continuousDtmfRecognitionOptions.operationContext,
    };
    return this.callMedia.startContinuousDtmfRecognition(
      this.callConnectionId,
      continuousDtmfRecognitionRequest,
      {}
    );
  }

  /**
   * Stop continuous Dtmf recognition by unsubscribing to tones.
   * @param targetParticipant - Target participant.
   * @param continuousDtmfRecognitionOptions - Additional attributes for continuous Dtmf recognition
   * */
  public async stopContinuousDtmfRecognition(
    targetParticipant: CommunicationIdentifier,
    continuousDtmfRecognitionOptions: ContinuousDtmfRecognitionOptions = {}
  ): Promise<void> {
    const continuousDtmfRecognitionRequest: ContinuousDtmfRecognitionRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: continuousDtmfRecognitionOptions.operationContext,
    };
    return this.callMedia.stopContinuousDtmfRecognition(
      this.callConnectionId,
      continuousDtmfRecognitionRequest,
      {}
    );
  }

  /**
   * Send Dtmf tones.
   * @param targetParticipant - Target participant.
   * @param tones - List of tones to be sent to target participant.
   * @param continuousDtmfRecognitionOptions - Additional attributes for send Dtmf tones
   * */
  public async sendDtmf(
    targetParticipant: CommunicationIdentifier,
    tones: Tone[],
    sendDtmfOptions: SendDtmfOptions = {}
  ): Promise<void> {
    const sendDtmfRequest: SendDtmfRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      tones: tones,
      operationContext: sendDtmfOptions.operationContext,
    };
    return this.callMedia.sendDtmf(this.callConnectionId, sendDtmfRequest, {});
  }
}
