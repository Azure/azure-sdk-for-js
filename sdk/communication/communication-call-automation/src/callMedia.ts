// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PlayRequest,
  PlaySourceInternal,
  FileSourceInternal,
  TextSourceInternal,
  SsmlSourceInternal,
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
  StartHoldMusicRequest,
  StopHoldMusicRequest,
} from "./generated/src";

import { CallMediaImpl } from "./generated/src/operations";

import {
  CommunicationIdentifier,
  createCommunicationAuthPolicy,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";

import { FileSource, TextSource, SsmlSource } from "./models/models";

import {
  PlayOptions,
  CallMediaRecognizeDtmfOptions,
  CallMediaRecognizeChoiceOptions,
  ContinuousDtmfRecognitionOptions,
  SendDtmfOptions,
  CallMediaRecognizeSpeechOptions,
  CallMediaRecognizeSpeechOrDtmfOptions,
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

  private createPlaySourceInternal(
    playSource: FileSource | TextSource | SsmlSource
  ): PlaySourceInternal {
    if (playSource.kind === "fileSource") {
      const fileSource: FileSourceInternal = {
        uri: playSource.url,
      };
      return {
        sourceType: KnownPlaySourceType.File,
        fileSource: fileSource,
        playSourceId: playSource.playSourceId,
      };
    } else if (playSource.kind === "textSource") {
      const textSource: TextSourceInternal = {
        text: playSource.text,
        sourceLocale: playSource.sourceLocale,
        voiceGender: playSource.voiceGender,
        voiceName: playSource.voiceName,
        customVoiceEndpointId: playSource.customVoiceEndpointId,
      };
      return {
        sourceType: KnownPlaySourceType.Text,
        textSource: textSource,
        playSourceId: playSource.playSourceId,
      };
    } else if (playSource.kind === "ssmlSource") {
      const ssmlSource: SsmlSourceInternal = {
        ssmlText: playSource.ssmlText,
        customVoiceEndpointId: playSource.customVoiceEndpointId,
      };
      return {
        sourceType: KnownPlaySourceType.Ssml,
        ssmlSource: ssmlSource,
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
    playSource: FileSource | TextSource | SsmlSource,
    playTo: CommunicationIdentifier[],
    playOptions: PlayOptions = { loop: false }
  ): Promise<void> {
    const playRequest: PlayRequest = {
      playSourceInfo: this.createPlaySourceInternal(playSource),
      playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      playOptions: {
        loop: false,
      },
      operationContext: playOptions.operationContext,
      callbackUri: playOptions.callbackUrl,
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
    playSource: FileSource | TextSource | SsmlSource,
    playOptions: PlayOptions = { loop: false }
  ): Promise<void> {
    const playRequest: PlayRequest = {
      playSourceInfo: this.createPlaySourceInternal(playSource),
      playTo: [],
      playOptions: {
        loop: false,
      },
      operationContext: playOptions.operationContext,
      callbackUri: playOptions.callbackUrl,
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
    recognizeOptions:
      | CallMediaRecognizeDtmfOptions
      | CallMediaRecognizeChoiceOptions
      | CallMediaRecognizeSpeechOptions
      | CallMediaRecognizeSpeechOrDtmfOptions
  ): RecognizeRequest {
    if (recognizeOptions.kind === "callMediaRecognizeDtmfOptions") {
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
        callbackUri: recognizeOptions.callbackUrl,
      };
    } else if (recognizeOptions.kind === "callMediaRecognizeChoiceOptions") {
      const recognizeOptionsInternal: RecognizeOptions = {
        interruptPrompt: recognizeOptions.interruptPrompt,
        initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
          ? recognizeOptions.initialSilenceTimeoutInSeconds
          : 5,
        targetParticipant: serializeCommunicationIdentifier(targetParticipant),
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
        callbackUri: recognizeOptions.callbackUrl,
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
        speechOptions: speechOptions,
        speechRecognitionModelEndpointId: recognizeOptions.speechModelEndpointId,
      };
      return {
        recognizeInputType: KnownRecognizeInputType.Speech,
        playPrompt: recognizeOptions.playPrompt
          ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
          : undefined,
        interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
        recognizeOptions: recognizeOptionsInternal,
        operationContext: recognizeOptions.operationContext,
        callbackUri: recognizeOptions.callbackUrl,
      };
    } else if (recognizeOptions.kind === "callMediaRecognizeSpeechOrDtmfOptions") {
      const dtmfOptionsInternal: DtmfOptions = {
        interToneTimeoutInSeconds: recognizeOptions.interToneTimeoutInSeconds
          ? recognizeOptions.interToneTimeoutInSeconds
          : 2,
        maxTonesToCollect: maxTonesToCollect,
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
        dtmfOptions: dtmfOptionsInternal,
        speechRecognitionModelEndpointId: recognizeOptions.speechModelEndpointId,
      };
      return {
        recognizeInputType: KnownRecognizeInputType.SpeechOrDtmf,
        playPrompt: recognizeOptions.playPrompt
          ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
          : undefined,
        interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
        recognizeOptions: recognizeOptionsInternal,
        operationContext: recognizeOptions.operationContext,
        callbackUri: recognizeOptions.callbackUrl,
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
    recognizeOptions:
      | CallMediaRecognizeDtmfOptions
      | CallMediaRecognizeChoiceOptions
      | CallMediaRecognizeSpeechOptions
      | CallMediaRecognizeSpeechOrDtmfOptions
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
      callbackUri: continuousDtmfRecognitionOptions.callbackUrl,
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
  ): Promise<void> {
    const sendDtmfRequest: SendDtmfRequest = {
      tones: tones,
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: sendDtmfOptions.operationContext,
      callbackUri: sendDtmfOptions.callbackUrl,
    };
    return this.callMedia.sendDtmf(this.callConnectionId, sendDtmfRequest, {});
  }

  /**
   * Put participant on hold while playing audio.
   *
   * @param targetParticipant - The targets to play to.
   * @param playSource - A PlaySource representing the source to play.
   * @param loop - To play the audio continously until stopped.
   * @param operationContext - Operation Context.
   */
  public async startHoldMusic(
    targetParticipant: CommunicationIdentifier,
    playSource: FileSource | TextSource | SsmlSource,
    loop: boolean = true,
    operationContext: string | undefined = undefined
  ): Promise<void> {
    const holdRequest: StartHoldMusicRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      playSourceInfo: this.createPlaySourceInternal(playSource),
      loop: loop,
      operationContext: operationContext
    };

    return this.callMedia.startHoldMusic(this.callConnectionId, holdRequest);
  }

  /**
   * Remove participant from hold.
   *
   * @param targetParticipant - The targets to play to.
   * @param operationContext - Operation Context.
   */
  public async stopHoldMusic(
    targetParticipant: CommunicationIdentifier,
    operationContext: string | undefined = undefined
  ): Promise<void> {
    const unholdRequest: StopHoldMusicRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: operationContext
    };

    return this.callMedia.stopHoldMusic(this.callConnectionId, unholdRequest);
  }
}
