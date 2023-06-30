// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PlayRequest,
  PlaySourceInternal,
  TextSourceInternal,
  SsmlSourceInternal,
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
  SpeechOptions,
} from "./generated/src";

import { CallMediaImpl } from "./generated/src/operations";

import {
  CommunicationIdentifier,
  createCommunicationAuthPolicy,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";

import { FileSource, SsmlSource, TextSource } from "./models/models";

import {
  PlayOptions,
  CallMediaRecognizeDtmfOptions,
  CallMediaRecognizeChoiceOptions,
  CallMediaRecognizeSpeechOptions,
  CallMediaRecognizeSpeechOrDtmfOptions,
  ContinuousDtmfRecognitionOptions,
  SendDtmfOptions,
} from "./models/options";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { SendDtmfResult } from "./models/responses";
import { v4 as uuidv4 } from "uuid";

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

  private createPlaySourceInternal(
    playSource: FileSource | TextSource | SsmlSource
  ): PlaySourceInternal {
    if (playSource.kind === "fileSource" || playSource.kind === undefined) {
      const fileSource: FileSourceInternal = {
        uri: playSource.url,
      };
      return {
        kind: KnownPlaySourceType.File,
        file: fileSource,
        playSourceCacheId: playSource.playsourcacheid,
      };
    } else if (playSource.kind === "textSource") {
      const textSource: TextSourceInternal = {
        text: playSource.text,
        sourceLocale: playSource.sourceLocale,
        voiceGender: playSource.voiceGender,
        voiceName: playSource.voiceName,
      };
      return {
        kind: KnownPlaySourceType.Text,
        textSource: textSource,
        playSourceCacheId: playSource.playsourcacheid,
      };
    } else if (playSource.kind === "ssmlSource") {
      const ssmlSource: SsmlSourceInternal = {
        ssmlText: playSource.ssmlText,
      };
      return {
        kind: KnownPlaySourceType.Ssml,
        ssmlSource: ssmlSource,
        playSourceCacheId: playSource.playsourcacheid,
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
    playSources: FileSource[] | TextSource[] | SsmlSource[],
    playTo: CommunicationIdentifier[],
    playOptions: PlayOptions = { loop: false }
  ): Promise<void> {
    const playRequest: PlayRequest = {
      playSources: playSources.map((source) => this.createPlaySourceInternal(source)),
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
    playSources: FileSource[] | TextSource[] | SsmlSource[],
    playOptions: PlayOptions = { loop: false }
  ): Promise<void> {
    const playRequest: PlayRequest = {
      playSources: playSources.map((source) => this.createPlaySourceInternal(source)),
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
    recognizeOptions:
      | CallMediaRecognizeDtmfOptions
      | CallMediaRecognizeChoiceOptions
      | CallMediaRecognizeSpeechOptions
      | CallMediaRecognizeSpeechOrDtmfOptions
  ): RecognizeRequest {
    if (
      recognizeOptions.kind === "callMediaRecognizeDtmfOptions" ||
      recognizeOptions.kind === undefined
    ) {
      const dtmfOptionsInternal: DtmfOptions = {
        interToneTimeoutInSeconds: recognizeOptions.interToneTimeoutInSeconds
          ? recognizeOptions.interToneTimeoutInSeconds
          : 2,
        maxTonesToCollect: recognizeOptions.maxTonesToCollect,
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
    } else if (recognizeOptions.kind === "callMediaRecognizeChoiceOptions") {
      const recognizeOptionsInternal: RecognizeOptions = {
        interruptPrompt: recognizeOptions.interruptPrompt,
        initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
          ? recognizeOptions.initialSilenceTimeoutInSeconds
          : 5,
        targetParticipant: serializeCommunicationIdentifier(targetParticipant),
        speechLanguage: recognizeOptions.speechLanguage,
        speechRecognitionModelEndpointId: recognizeOptions.speechRecognitionModelEndpointId,
        choices: recognizeOptions.choices,
      };
      return {
        recognizeInputType: KnownRecognizeInputType.Choices,
        playPrompt: recognizeOptions.playPrompt
          ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
          : undefined,
        interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
        recognizeOptions: recognizeOptionsInternal,
        operationContext: recognizeOptions.operationContext,
      };
    } else if (recognizeOptions.kind === "callMediaRecognizeSpeechOptions") {
      const speechOptions: SpeechOptions = {
        endSilenceTimeoutInMs: recognizeOptions.endSilenceTimeoutInMs
          ? recognizeOptions.endSilenceTimeoutInMs
          : 2,
      };
      const recognizeOptionsInternal: RecognizeOptions = {
        interruptPrompt: recognizeOptions.interruptPrompt,
        initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
          ? recognizeOptions.initialSilenceTimeoutInSeconds
          : 5,
        targetParticipant: serializeCommunicationIdentifier(targetParticipant),
        speechLanguage: recognizeOptions.speechLanguage,
        speechRecognitionModelEndpointId: recognizeOptions.speechRecognitionModelEndpointId,
        speechOptions: speechOptions,
      };
      return {
        recognizeInputType: KnownRecognizeInputType.Speech,
        playPrompt: recognizeOptions.playPrompt
          ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
          : undefined,
        interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
        recognizeOptions: recognizeOptionsInternal,
        operationContext: recognizeOptions.operationContext,
      };
    } else if (recognizeOptions.kind === "callMediaRecognizeSpeechOrDtmfOptions") {
      const dtmfOptionsInternal: DtmfOptions = {
        interToneTimeoutInSeconds: recognizeOptions.interToneTimeoutInSeconds
          ? recognizeOptions.interToneTimeoutInSeconds
          : 2,
        maxTonesToCollect: recognizeOptions.maxTonesToCollect,
        stopTones: recognizeOptions.stopDtmfTones,
      };
      const speechOptions: SpeechOptions = {
        endSilenceTimeoutInMs: recognizeOptions.endSilenceTimeoutInMs
          ? recognizeOptions.endSilenceTimeoutInMs
          : 2,
      };
      const recognizeOptionsInternal: RecognizeOptions = {
        interruptPrompt: recognizeOptions.interruptPrompt,
        initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
          ? recognizeOptions.initialSilenceTimeoutInSeconds
          : 5,
        targetParticipant: serializeCommunicationIdentifier(targetParticipant),
        speechOptions: speechOptions,
        speechLanguage: recognizeOptions.speechLanguage,
        speechRecognitionModelEndpointId: recognizeOptions.speechRecognitionModelEndpointId,
        dtmfOptions: dtmfOptionsInternal,
      };
      return {
        recognizeInputType: KnownRecognizeInputType.SpeechOrDtmf,
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
   *  @param targetParticipant - Target participant.
   *  @param recognizeOptions - Different attributes for recognize.
   * */
  public async startRecognizing(
    targetParticipant: CommunicationIdentifier,
    recognizeOptions:
      | CallMediaRecognizeDtmfOptions
      | CallMediaRecognizeChoiceOptions
      | CallMediaRecognizeSpeechOptions
      | CallMediaRecognizeSpeechOrDtmfOptions
  ): Promise<void> {
    return this.callMedia.recognize(
      this.callConnectionId,
      this.createRecognizeRequest(targetParticipant, recognizeOptions),
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
   * @param continuousDtmfRecognitionOptions - Additional attributes for continuous Dtmf recognition.
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
   * @param continuousDtmfRecognitionOptions - Additional attributes for continuous Dtmf recognition.
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
   * @param tones - List of tones to be sent to target participant.
   * @param targetParticipant - Target participant.
   * @param sendDtmfOptions - Additional attributes for send Dtmf tones.
   * */
  public async sendDtmf(
    tones: Tone[],
    targetParticipant: CommunicationIdentifier,
    sendDtmfOptions: SendDtmfOptions = {}
  ): Promise<SendDtmfResult> {
    const sendDtmfRequest: SendDtmfRequest = {
      tones: tones,
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: sendDtmfOptions.operationContext,
    };
    const optionsInternal = {
      ...sendDtmfOptions,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: uuidv4(),
    };
    const result = await this.callMedia.sendDtmf(
      this.callConnectionId,
      sendDtmfRequest,
      optionsInternal
    );
    const sendDtmfResult: SendDtmfResult = {
      ...result,
    };
    return sendDtmfResult;
  }
}
