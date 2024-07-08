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
  SendDtmfTonesRequest,
  Tone,
  SpeechOptions,
  StartHoldMusicRequest,
  StopHoldMusicRequest,
  StartTranscriptionRequest,
  StopTranscriptionRequest,
  UpdateTranscriptionRequest,
  HoldRequest,
  UnholdRequest,
} from "./generated/src";

import { CallMediaImpl } from "./generated/src/operations";

import {
  CommunicationIdentifier,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";

import { FileSource, TextSource, SsmlSource, DtmfTone } from "./models/models";
import {
  PlayOptions,
  CallMediaRecognizeDtmfOptions,
  CallMediaRecognizeChoiceOptions,
  ContinuousDtmfRecognitionOptions,
  SendDtmfTonesOptions,
  CallMediaRecognizeSpeechOptions,
  CallMediaRecognizeSpeechOrDtmfOptions,
  StartTranscriptionOptions,
  StopTranscriptionOptions,
  HoldOptions,
  UnholdOptions,
} from "./models/options";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  CancelAllMediaOperationsResult,
  PlayResult,
  SendDtmfTonesResult,
  StartRecognizingResult,
} from "./models/responses";
import {
  CancelAllMediaOperationsEventResult,
  PlayEventResult,
  SendDtmfEventResult,
  StartRecognizingEventResult,
} from "./eventprocessor/eventResponses";
import { CallAutomationEventProcessor } from "./eventprocessor/callAutomationEventProcessor";
import { randomUUID } from "@azure/core-util";
import { createCustomCallAutomationApiClient } from "./credential/callAutomationAuthPolicy";

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
    options?: CallAutomationApiClientOptionalParams,
  ) {
    this.callAutomationApiClient = createCustomCallAutomationApiClient(
      credential,
      options,
      endpoint,
    );
    this.callConnectionId = callConnectionId;
    this.callAutomationEventProcessor = eventProcessor;
    this.callMedia = new CallMediaImpl(this.callAutomationApiClient);
  }

  private createPlaySourceInternal(
    playSource: FileSource | TextSource | SsmlSource,
  ): PlaySourceInternal {
    if (playSource.kind === "fileSource") {
      const fileSource: FileSourceInternal = {
        uri: playSource.url,
      };
      return {
        kind: KnownPlaySourceType.File,
        file: fileSource,
        playSourceCacheId: playSource.playSourceCacheId
          ? playSource.playSourceCacheId
          : playSource.playsourcacheid,
      };
    } else if (playSource.kind === "textSource") {
      const textSource: TextSourceInternal = {
        text: playSource.text,
        sourceLocale: playSource.sourceLocale,
        voiceKind: playSource.voiceKind,
        voiceName: playSource.voiceName,
        customVoiceEndpointId: playSource.customVoiceEndpointId,
      };
      return {
        kind: KnownPlaySourceType.Text,
        text: textSource,
        playSourceCacheId: playSource.playSourceCacheId
          ? playSource.playSourceCacheId
          : playSource.playsourcacheid,
      };
    } else if (playSource.kind === "ssmlSource") {
      const ssmlSource: SsmlSourceInternal = {
        ssmlText: playSource.ssmlText,
        customVoiceEndpointId: playSource.customVoiceEndpointId,
      };
      return {
        kind: KnownPlaySourceType.Ssml,
        ssml: ssmlSource,
        playSourceCacheId: playSource.playSourceCacheId
          ? playSource.playSourceCacheId
          : playSource.playsourcacheid,
      };
    }
    throw new Error("Invalid play source");
  }

  /**
   * Play audio to a specific participant.
   *
   * @param playSources - A PlaySource representing the sources to play. Currently only single play source per request is supported.
   * @param playTo - The targets to play to.
   * @param options - Additional attributes for play.
   */
  public async play(
    playSources: (FileSource | TextSource | SsmlSource)[],
    playTo: CommunicationIdentifier[],
    options: PlayOptions = { loop: false },
  ): Promise<PlayResult> {
    const playRequest: PlayRequest = {
      playSources: playSources.map((source) => this.createPlaySourceInternal(source)),
      playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      playOptions: {
        loop: false,
      },
      operationContext: options.operationContext ? options.operationContext : randomUUID(),
      operationCallbackUri: options.operationCallbackUrl,
    };

    if (options.loop !== undefined) {
      playRequest.playOptions = playRequest.playOptions || { loop: false }; // Ensure playOptions is defined
      playRequest.playOptions.loop = options.loop;
    }
    await this.callMedia.play(this.callConnectionId, playRequest, options);

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
          timeoutInMs,
        );
        return playEventResult;
      },
    };
    return playResult;
  }

  /**
   * Play to all participants.
   *
   * @param playSources - A PlaySource representing the sources to play. Currently only single play source per request is supported.
   * @param options - Additional attributes for play.
   */
  public async playToAll(
    playSources: (FileSource | TextSource | SsmlSource)[],
    options: PlayOptions = { loop: false },
  ): Promise<PlayResult> {
    const playRequest: PlayRequest = {
      playSources: playSources.map((source) => this.createPlaySourceInternal(source)),
      playTo: [],
      playOptions: {
        loop: false,
      },
      operationContext: options.operationContext ? options.operationContext : randomUUID(),
      operationCallbackUri: options.operationCallbackUrl,
    };

    if (options.loop !== undefined) {
      playRequest.playOptions = playRequest.playOptions || { loop: false }; // Ensure playOptions is defined
      playRequest.playOptions.loop = options.loop;
    }
    await this.callMedia.play(this.callConnectionId, playRequest, options);

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
          timeoutInMs,
        );
        return playEventResult;
      },
    };
    return playResult;
  }

  private createRecognizeRequest(
    targetParticipant: CommunicationIdentifier,
    recognizeOptions:
      | CallMediaRecognizeDtmfOptions
      | CallMediaRecognizeChoiceOptions
      | CallMediaRecognizeSpeechOptions
      | CallMediaRecognizeSpeechOrDtmfOptions,
  ): RecognizeRequest {
    if (recognizeOptions.kind === "callMediaRecognizeDtmfOptions") {
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
        operationCallbackUri: recognizeOptions.operationCallbackUrl,
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
        operationCallbackUri: recognizeOptions.operationCallbackUrl,
      };
    } else if (recognizeOptions.kind === "callMediaRecognizeSpeechOptions") {
      const speechOptions: SpeechOptions = {
        endSilenceTimeoutInMs: recognizeOptions.endSilenceTimeoutInSeconds
          ? recognizeOptions.endSilenceTimeoutInSeconds * 1000
          : 2000,
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
      };
      return {
        recognizeInputType: KnownRecognizeInputType.Speech,
        playPrompt: recognizeOptions.playPrompt
          ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
          : undefined,
        interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
        recognizeOptions: recognizeOptionsInternal,
        operationContext: recognizeOptions.operationContext,
        operationCallbackUri: recognizeOptions.operationCallbackUrl,
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
        endSilenceTimeoutInMs: recognizeOptions.endSilenceTimeoutInSeconds
          ? recognizeOptions.endSilenceTimeoutInSeconds * 1000
          : 2000,
      };
      const recognizeOptionsInternal: RecognizeOptions = {
        interruptPrompt: recognizeOptions.interruptPrompt,
        initialSilenceTimeoutInSeconds: recognizeOptions.initialSilenceTimeoutInSeconds
          ? recognizeOptions.initialSilenceTimeoutInSeconds
          : 5,
        targetParticipant: serializeCommunicationIdentifier(targetParticipant),
        speechOptions: speechOptions,
        dtmfOptions: dtmfOptionsInternal,
        speechRecognitionModelEndpointId: recognizeOptions.speechRecognitionModelEndpointId,
      };
      return {
        recognizeInputType: KnownRecognizeInputType.SpeechOrDtmf,
        playPrompt: recognizeOptions.playPrompt
          ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
          : undefined,
        interruptCallMediaOperation: recognizeOptions.interruptCallMediaOperation,
        recognizeOptions: recognizeOptionsInternal,
        operationContext: recognizeOptions.operationContext,
        operationCallbackUri: recognizeOptions.operationCallbackUrl,
      };
    }
    throw new Error("Invalid recognizeOptions");
  }

  /**
   *  Recognize participant input.
   *  @deprecated This method signature is deprecated. Please use the new signature with targetParticipant and options params instead, and set maxTonesToCollect in options.
   *  @param targetParticipant - Target participant.
   *  @param maxTonesToCollect - Maximum number of DTMF tones to be collected.
   *  @param options - Different attributes for recognize.
   * */
  public async startRecognizing(
    targetParticipant: CommunicationIdentifier,
    maxTonesToCollect: number,
    options: CallMediaRecognizeDtmfOptions,
  ): Promise<StartRecognizingResult>;

  /**
   *  Recognize participant input.
   *  @param targetParticipant - Target participant.
   *  @param options - Different attributes for recognize.
   * */
  public async startRecognizing(
    targetParticipant: CommunicationIdentifier,
    options:
      | CallMediaRecognizeDtmfOptions
      | CallMediaRecognizeChoiceOptions
      | CallMediaRecognizeSpeechOptions
      | CallMediaRecognizeSpeechOrDtmfOptions,
  ): Promise<StartRecognizingResult>;
  async startRecognizing(
    targetParticipant: CommunicationIdentifier,
    maxTonesOrOptions:
      | number
      | CallMediaRecognizeDtmfOptions
      | CallMediaRecognizeChoiceOptions
      | CallMediaRecognizeSpeechOptions
      | CallMediaRecognizeSpeechOrDtmfOptions,
    options?: CallMediaRecognizeDtmfOptions,
  ): Promise<StartRecognizingResult> {
    if (typeof maxTonesOrOptions === "number" && options) {
      // Old function signature logic
      console.warn(
        "Deprecated function signature used. Please use the new signature with targetParticipant and options params instead, and set maxTonesToCollect in options.",
      );
      options.maxTonesToCollect = maxTonesOrOptions;
      await this.callMedia.recognize(
        this.callConnectionId,
        this.createRecognizeRequest(targetParticipant, options),
        {},
      );
    } else if (typeof maxTonesOrOptions !== "number" && !options) {
      maxTonesOrOptions.operationContext = maxTonesOrOptions.operationContext
        ? maxTonesOrOptions.operationContext
        : randomUUID();
      // New function signature logic
      await this.callMedia.recognize(
        this.callConnectionId,
        this.createRecognizeRequest(targetParticipant, maxTonesOrOptions),
        {},
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
                event.operationContext === maxTonesOrOptions.operationContext
              ) {
                startRecognizingEventResult.isSuccess = true;
                startRecognizingEventResult.successResult = event;
                return true;
              } else if (
                event.callConnectionId === this.callConnectionId &&
                event.kind === "RecognizeFailed" &&
                event.operationContext === maxTonesOrOptions.operationContext
              ) {
                startRecognizingEventResult.isSuccess = false;
                startRecognizingEventResult.failureResult = event;
                return true;
              } else {
                return false;
              }
            },
            abortSignal,
            timeoutInMs,
          );
          return startRecognizingEventResult;
        },
      };
      return startRecognizingResult;
    }
    throw new Error("Invalid params");
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
              cancelAllMediaOperationsEventResult.playCanceledSuccessResult = event;
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
          timeoutInMs,
        );
        return cancelAllMediaOperationsEventResult;
      },
    };
    return cancelAllMediaOperationsResult;
  }

  /**
   * Start continuous Dtmf recognition by subscribing to tones.
   * @param targetParticipant - Target participant.
   * @param options - Additional attributes for continuous Dtmf recognition.
   * */
  public async startContinuousDtmfRecognition(
    targetParticipant: CommunicationIdentifier,
    options: ContinuousDtmfRecognitionOptions = {},
  ): Promise<void> {
    const continuousDtmfRecognitionRequest: ContinuousDtmfRecognitionRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: options.operationContext ? options.operationContext : randomUUID(),
    };
    return this.callMedia.startContinuousDtmfRecognition(
      this.callConnectionId,
      continuousDtmfRecognitionRequest,
      {},
    );
  }

  /**
   * Stop continuous Dtmf recognition by unsubscribing to tones.
   * @param targetParticipant - Target participant.
   * @param options - Additional attributes for continuous Dtmf recognition.
   * */
  public async stopContinuousDtmfRecognition(
    targetParticipant: CommunicationIdentifier,
    options: ContinuousDtmfRecognitionOptions = {},
  ): Promise<void> {
    const continuousDtmfRecognitionRequest: ContinuousDtmfRecognitionRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: options.operationContext ? options.operationContext : randomUUID(),
      operationCallbackUri: options.operationCallbackUrl,
    };
    return this.callMedia.stopContinuousDtmfRecognition(
      this.callConnectionId,
      continuousDtmfRecognitionRequest,
      {},
    );
  }

  /**
   * Send Dtmf tones.
   * @param tones - List of tones to be sent to target participant.
   * @param targetParticipant - Target participant.
   * @param options - Additional attributes for send Dtmf tones.
   * */
  public async sendDtmfTones(
    tones: Tone[] | DtmfTone[],
    targetParticipant: CommunicationIdentifier,
    options: SendDtmfTonesOptions = {},
  ): Promise<SendDtmfTonesResult> {
    const sendDtmfTonesRequest: SendDtmfTonesRequest = {
      tones: tones,
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: options.operationContext ? options.operationContext : randomUUID(),
      operationCallbackUri: options.operationCallbackUrl,
    };
    await this.callMedia.sendDtmfTones(this.callConnectionId, sendDtmfTonesRequest, {});

    const sendDtmfTonesResult: SendDtmfTonesResult = {
      waitForEventProcessor: async (abortSignal, timeoutInMs) => {
        const sendDtmfEventResult: SendDtmfEventResult = {
          isSuccess: false,
        };
        await this.callAutomationEventProcessor.waitForEventProcessor(
          (event) => {
            if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "SendDtmfTonesCompleted" &&
              event.operationContext === sendDtmfTonesResult.operationContext
            ) {
              sendDtmfEventResult.isSuccess = true;
              sendDtmfEventResult.successResult = event;
              return true;
            } else if (
              event.callConnectionId === this.callConnectionId &&
              event.kind === "SendDtmfTonesFailed" &&
              event.operationContext === sendDtmfTonesResult.operationContext
            ) {
              sendDtmfEventResult.isSuccess = false;
              sendDtmfEventResult.failureResult = event;
              return true;
            } else {
              return false;
            }
          },
          abortSignal,
          timeoutInMs,
        );
        return sendDtmfEventResult;
      },
    };
    return sendDtmfTonesResult;
  }

  /**
   * Put participant on hold while playing audio.
   *
   * @param targetParticipant - The targets to play to.
   * @param options - Additional attributes for hold participant.
   */
  public async hold(
    targetParticipant: CommunicationIdentifier,
    options: HoldOptions = {},
  ): Promise<void> {
    const holdRequest: HoldRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      playSourceInfo:
        options.playSource !== undefined
          ? this.createPlaySourceInternal(options.playSource)
          : undefined,
      operationContext:
        options.operationContext !== undefined ? options.operationContext : undefined,
      operationCallbackUri:
        options.operationCallbackUri !== undefined ? options.operationCallbackUri : undefined,
    };
    return this.callMedia.hold(this.callConnectionId, holdRequest);
  }

  /**
   * Remove participant from hold.
   *
   * @param targetParticipant - The targets to play to.
   * @param options - Additional attributes for unhold participant.
   */
  public async unhold(
    targetParticipant: CommunicationIdentifier,
    options: UnholdOptions = {},
  ): Promise<void> {
    const unholdRequest: UnholdRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext:
        options.operationContext !== undefined ? options.operationContext : undefined,
    };
    return this.callMedia.unhold(this.callConnectionId, unholdRequest);
  }

  /**
   * Put participant on hold while playing audio.
   *
   * @deprecated - This operations is deprecated, please use hold instead.
   * @param targetParticipant - The targets to play to.
   * @param playSource - A PlaySource representing the source to play.
   * @param operationContext - Operation Context.
   * @param operationCallbackUri - Set a callback URI that overrides the default callback URI set by CreateCall/AnswerCall for this operation.
   */
  public async startHoldMusic(
    targetParticipant: CommunicationIdentifier,
    playSource: FileSource | TextSource | SsmlSource | undefined = undefined,
    loop?: boolean,
    operationContext: string | undefined = undefined,
    operationCallbackUri: string | undefined = undefined,
  ): Promise<void> {
    const holdRequest: StartHoldMusicRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      playSourceInfo:
        playSource !== undefined ? this.createPlaySourceInternal(playSource) : undefined,
      operationContext: operationContext,
      operationCallbackUri: operationCallbackUri,
    };
    if (loop) {
      // Do nothing. Added since it needs to be backwards compatible.
    }
    return this.callMedia.startHoldMusic(this.callConnectionId, holdRequest);
  }

  /**
   * Remove participant from hold.
   *
   * @deprecated - This operations is deprecated, please use unhold instead.
   * @param targetParticipant - The targets to play to.
   * @param operationContext - Operation Context.
   */
  public async stopHoldMusic(
    targetParticipant: CommunicationIdentifier,
    operationContext: string | undefined = undefined,
  ): Promise<void> {
    const unholdRequest: StopHoldMusicRequest = {
      targetParticipant: serializeCommunicationIdentifier(targetParticipant),
      operationContext: operationContext,
    };

    return this.callMedia.stopHoldMusic(this.callConnectionId, unholdRequest);
  }

  /**
   * Starts transcription in the call
   * @param options - Additional attributes for start transcription.
   */
  public async startTranscription(options: StartTranscriptionOptions = {}): Promise<void> {
    const startTranscriptionRequest: StartTranscriptionRequest = {
      locale: options.locale,
      operationContext: options.operationContext ? options.operationContext : randomUUID(),
    };
    return this.callMedia.startTranscription(this.callConnectionId, startTranscriptionRequest, {});
  }

  /**
   * Stops transcription in the call.
   * @param options - Additional attributes for stop transcription.
   */
  public async stopTranscription(options: StopTranscriptionOptions = {}): Promise<void> {
    const stopTranscriptionRequest: StopTranscriptionRequest = {
      operationContext: options.operationContext ? options.operationContext : randomUUID(),
    };
    return this.callMedia.stopTranscription(this.callConnectionId, stopTranscriptionRequest, {});
  }

  /**
   * Update transcription language.
   * @param locale - Defines new locale for transcription.
   */
  public async updateTranscription(locale: string): Promise<void> {
    const updateTranscriptionRequest: UpdateTranscriptionRequest = {
      locale: locale,
    };
    return this.callMedia.updateTranscription(
      this.callConnectionId,
      updateTranscriptionRequest,
      {},
    );
  }
}
