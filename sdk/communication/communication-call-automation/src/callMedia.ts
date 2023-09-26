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
import {
  CancelAllMediaOperationsResult,
  PlayResult,
  SendDtmfResult,
  StartRecognizingResult,
} from "./models/responses";
import {
  CancelAllMediaOperationsEventResult,
  PlayEventResult,
  SendDtmfEventResult,
  StartRecognizingEventResult,
} from "./eventprocessor/eventResponses";
import { CallAutomationEventProcessor } from "./eventprocessor/callAutomationEventProcessor";
import { v4 as uuidv4 } from "uuid";

/**
 * CallMedia class represents call media related APIs.
 */
export class CallMedia {
  private readonly callConnectionId: string;
  private readonly callMedia: CallMediaImpl;
  private readonly callAutomationApiClient: CallAutomationApiClient;
  private readonly callAutomationEventProcessor: CallAutomationEventProcessor;
  constructor(
    callConnectionId: string,
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    eventProcessor: CallAutomationEventProcessor,
    options?: CallAutomationApiClientOptionalParams
  ) {
    this.callAutomationApiClient = new CallAutomationApiClient(endpoint, options);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.callAutomationApiClient.pipeline.addPolicy(authPolicy);
    this.callConnectionId = callConnectionId;
    this.callAutomationEventProcessor = eventProcessor;
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
  ): Promise<PlayResult> {
    const playRequest: PlayRequest = {
      playSourceInfo: this.createPlaySourceInternal(playSource),
      playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      playOptions: {
        loop: false,
      },
      operationContext: playOptions.operationContext ? playOptions.operationContext : uuidv4(),
      callbackUri: playOptions.callbackUrl,
    };

    if (playOptions.loop !== undefined) {
      playRequest.playOptions = playRequest.playOptions || { loop: false }; // Ensure playOptions is defined
      playRequest.playOptions.loop = playOptions.loop;
    }
    await this.callMedia.play(this.callConnectionId, playRequest, playOptions);

    const playResult: PlayResult = {
      waitForEventProcessor: async (abortSignal, timeoutInMs) => {
        const playEventResult: PlayEventResult = {
          isSuccess: false,
        };
        await this.callAutomationEventProcessor.waitForEventProcessor(
          (event) => {
            if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "PlayCompleted" &&
              event.operationContext === playRequest.operationContext
            ) {
              playEventResult.isSuccess = true;
              playEventResult.successResult = event;
              return true;
            } else if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "PlayFailed" &&
              event.operationContext === playRequest.operationContext
            ) {
              playEventResult.isSuccess = false;
              playEventResult.failureResult = event;
              return true;
            } else {
              return false;
            }
          },
          abortSignal,
          timeoutInMs
        );
        return playEventResult;
      },
    };
    return playResult;
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
  ): Promise<PlayResult> {
    const playRequest: PlayRequest = {
      playSourceInfo: this.createPlaySourceInternal(playSource),
      playTo: [],
      playOptions: {
        loop: false,
      },
      operationContext: playOptions.operationContext ? playOptions.operationContext : uuidv4(),
      callbackUri: playOptions.callbackUrl,
    };

    if (playOptions.loop !== undefined) {
      playRequest.playOptions = playRequest.playOptions || { loop: false }; // Ensure playOptions is defined
      playRequest.playOptions.loop = playOptions.loop;
    }
    await this.callMedia.play(this.callConnectionId, playRequest, playOptions);

    const playResult: PlayResult = {
      waitForEventProcessor: async (abortSignal, timeoutInMs) => {
        const playEventResult: PlayEventResult = {
          isSuccess: false,
        };
        await this.callAutomationEventProcessor.waitForEventProcessor(
          (event) => {
            if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "PlayCompleted" &&
              event.operationContext === playRequest.operationContext
            ) {
              playEventResult.isSuccess = true;
              playEventResult.successResult = event;
              return true;
            } else if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "PlayFailed" &&
              event.operationContext === playRequest.operationContext
            ) {
              playEventResult.isSuccess = false;
              playEventResult.failureResult = event;
              return true;
            } else {
              return false;
            }
          },
          abortSignal,
          timeoutInMs
        );
        return playEventResult;
      },
    };
    return playResult;
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
  ): Promise<StartRecognizingResult> {
    recognizeOptions.operationContext = recognizeOptions.operationContext
      ? recognizeOptions.operationContext
      : uuidv4();
    await this.callMedia.recognize(
      this.callConnectionId,
      this.createRecognizeRequest(targetParticipant, maxTonesToCollect, recognizeOptions),
      {}
    );

    const startRecognizingResult: StartRecognizingResult = {
      waitForEventProcessor: async (abortSignal, timeoutInMs) => {
        const startRecognizingEventResult: StartRecognizingEventResult = {
          isSuccess: false,
        };
        await this.callAutomationEventProcessor.waitForEventProcessor(
          (event) => {
            if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "RecognizeCompleted" &&
              event.operationContext === recognizeOptions.operationContext
            ) {
              startRecognizingEventResult.isSuccess = true;
              startRecognizingEventResult.successResult = event;
              return true;
            } else if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "RecognizeFailed" &&
              event.operationContext === recognizeOptions.operationContext
            ) {
              startRecognizingEventResult.isSuccess = false;
              startRecognizingEventResult.failureResult = event;
              return true;
            } else {
              return false;
            }
          },
          abortSignal,
          timeoutInMs
        );
        return startRecognizingEventResult;
      },
    };
    return startRecognizingResult;
  }

  /**
   * Cancels all the queued media operations.
   */
  public async cancelAllOperations(): Promise<CancelAllMediaOperationsResult> {
    await this.callMedia.cancelAllMediaOperations(this.callConnectionId, {});

    const cancelAllMediaOperationsResult: CancelAllMediaOperationsResult = {
      waitForEventProcessor: async (abortSignal, timeoutInMs) => {
        const cancelAllMediaOperationsEventResult: CancelAllMediaOperationsEventResult = {
          isSuccess: false,
        };
        await this.callAutomationEventProcessor.waitForEventProcessor(
          (event) => {
            if (event.callConnectionId === this.callConnectionId && event.kind === "PlayCanceled") {
              cancelAllMediaOperationsEventResult.isSuccess = true;
              cancelAllMediaOperationsEventResult.playCanceledSucessResult = event;
              return true;
            } else if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "RecognizeCanceled"
            ) {
              cancelAllMediaOperationsEventResult.isSuccess = false;
              cancelAllMediaOperationsEventResult.recognizeCanceledSuccessResult = event;
              return true;
            } else {
              return false;
            }
          },
          abortSignal,
          timeoutInMs
        );
        return cancelAllMediaOperationsEventResult;
      },
    };
    return cancelAllMediaOperationsResult;
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
  ): Promise<SendDtmfResult> {
    const sendDtmfRequest: SendDtmfRequest = {
      tones: tones,
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: sendDtmfOptions.operationContext
        ? sendDtmfOptions.operationContext
        : uuidv4(),
      callbackUri: sendDtmfOptions.callbackUrl,
    };
    await this.callMedia.sendDtmf(this.callConnectionId, sendDtmfRequest, {});

    const sendDtmfResult: SendDtmfResult = {
      waitForEventProcessor: async (abortSignal, timeoutInMs) => {
        const sendDtmfEventResult: SendDtmfEventResult = {
          isSuccess: false,
        };
        await this.callAutomationEventProcessor.waitForEventProcessor(
          (event) => {
            if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "SendDtmfCompleted" &&
              event.operationContext === sendDtmfRequest.operationContext
            ) {
              sendDtmfEventResult.isSuccess = true;
              sendDtmfEventResult.successResult = event;
              return true;
            } else if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "SendDtmfFailed" &&
              event.operationContext === sendDtmfRequest.operationContext
            ) {
              sendDtmfEventResult.isSuccess = false;
              sendDtmfEventResult.failureResult = event;
              return true;
            } else {
              return false;
            }
          },
          abortSignal,
          timeoutInMs
        );
        return sendDtmfEventResult;
      },
    };
    return sendDtmfResult;
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
      operationContext: operationContext,
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
      operationContext: operationContext,
    };

    return this.callMedia.stopHoldMusic(this.callConnectionId, unholdRequest);
  }
}
