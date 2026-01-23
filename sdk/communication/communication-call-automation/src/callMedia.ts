// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PlayRequest,
  PlaySourceInternal,
  FileSourceInternal,
  TextSourceInternal,
  SsmlSourceInternal,
  RecognizeRequest,
  RecognizeOptions,
  DtmfOptions,
  CallAutomationApiClient,
  CallAutomationApiClientOptionalParams,
  ContinuousDtmfRecognitionRequest,
  SendDtmfTonesRequest,
  Tone,
  SpeechOptions,
  StartTranscriptionRequest,
  StopTranscriptionRequest,
  UpdateTranscriptionRequest,
  HoldRequest,
  UnholdRequest,
  StartMediaStreamingRequest,
  StopMediaStreamingRequest,
} from "./generated/src/index.js";
import { KnownPlaySourceType, KnownRecognizeInputType } from "./generated/src/index.js";

import { CallMediaImpl } from "./generated/src/operations/index.js";

import type { CommunicationIdentifier } from "@azure/communication-common";
import {
  createCommunicationAuthPolicy,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";

import type { FileSource, TextSource, SsmlSource, DtmfTone } from "./models/models.js";
import type {
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
  StartMediaStreamingOptions,
  StopMediaStreamingOptions,
  PlayToAllOptions,
  UpdateTranscriptionOptions,
} from "./models/options.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { SendDtmfTonesResult } from "./models/responses.js";
import { randomUUID } from "@azure/core-util";
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
    options?: CallAutomationApiClientOptionalParams,
  ) {
    this.callAutomationApiClient = new CallAutomationApiClient(endpoint, options);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.callAutomationApiClient.pipeline.addPolicy(authPolicy);
    this.callConnectionId = callConnectionId;
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
  ): Promise<void> {
    const playRequest: PlayRequest = {
      playSources: playSources.map((source) => this.createPlaySourceInternal(source)),
      playTo: playTo.map((identifier) => serializeCommunicationIdentifier(identifier)),
      playOptions: {
        loop: false,
      },
      operationContext: options.operationContext,
      operationCallbackUri: options.operationCallbackUrl,
    };

    if (options.loop !== undefined) {
      playRequest.playOptions = playRequest.playOptions || { loop: false }; // Ensure playOptions is defined
      playRequest.playOptions.loop = options.loop;
    }
    await this.callMedia.play(this.callConnectionId, playRequest, options);
  }

  /**
   * Play to all participants.
   *
   * @param playSources - A PlaySource representing the sources to play. Currently only single play source per request is supported.
   * @param options - Additional attributes for play.
   */
  public async playToAll(
    playSources: (FileSource | TextSource | SsmlSource)[],
    options: PlayToAllOptions = { loop: false },
  ): Promise<void> {
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

    if (options.interruptCallMediaOperation !== undefined) {
      playRequest.playOptions = playRequest.playOptions || {
        loop: false,
      }; // Ensure playOptions is defined
      playRequest.interruptCallMediaOperation = options.interruptCallMediaOperation;
    }

    await this.callMedia.play(this.callConnectionId, playRequest, options);
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
        playPrompts:
          recognizeOptions.playPrompts !== undefined
            ? recognizeOptions.playPrompts.map((source) => this.createPlaySourceInternal(source))
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
        playPrompts:
          recognizeOptions.playPrompts !== undefined
            ? recognizeOptions.playPrompts.map((source) => this.createPlaySourceInternal(source))
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
        playPrompts:
          recognizeOptions.playPrompts !== undefined
            ? recognizeOptions.playPrompts.map((source) => this.createPlaySourceInternal(source))
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
        speechLanguage: recognizeOptions.speechLanguage,
        dtmfOptions: dtmfOptionsInternal,
        speechRecognitionModelEndpointId: recognizeOptions.speechRecognitionModelEndpointId,
      };
      return {
        recognizeInputType: KnownRecognizeInputType.SpeechOrDtmf,
        playPrompt: recognizeOptions.playPrompt
          ? this.createPlaySourceInternal(recognizeOptions.playPrompt)
          : undefined,
        playPrompts:
          recognizeOptions.playPrompts !== undefined
            ? recognizeOptions.playPrompts.map((source) => this.createPlaySourceInternal(source))
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
  ): Promise<void>;

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
  ): Promise<void>;
  async startRecognizing(
    targetParticipant: CommunicationIdentifier,
    maxTonesOrOptions:
      | number
      | CallMediaRecognizeDtmfOptions
      | CallMediaRecognizeChoiceOptions
      | CallMediaRecognizeSpeechOptions
      | CallMediaRecognizeSpeechOrDtmfOptions,
    options?: CallMediaRecognizeDtmfOptions,
  ): Promise<void> {
    if (typeof maxTonesOrOptions === "number" && options) {
      // Old function signature logic
      console.warn(
        "Deprecated function signature used. Please use the new signature with targetParticipant and options params instead, and set maxTonesToCollect in options.",
      );
      options.maxTonesToCollect = maxTonesOrOptions;
      return this.callMedia.recognize(
        this.callConnectionId,
        this.createRecognizeRequest(targetParticipant, options),
        {},
      );
    } else if (typeof maxTonesOrOptions !== "number" && !options) {
      maxTonesOrOptions.operationContext = maxTonesOrOptions.operationContext
        ? maxTonesOrOptions.operationContext
        : randomUUID();
      // New function signature logic
      return this.callMedia.recognize(
        this.callConnectionId,
        this.createRecognizeRequest(targetParticipant, maxTonesOrOptions),
        {},
      );
    }
    throw new Error("Invalid params");
  }

  /**
   * Cancels all the queued media operations.
   */
  public async cancelAllOperations(): Promise<void> {
    await this.callMedia.cancelAllMediaOperations(this.callConnectionId, {});
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
      operationContext: options.operationContext,
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
      operationContext: options.operationContext,
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
      operationContext: options.operationContext,
      operationCallbackUri: options.operationCallbackUrl,
    };
    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: randomUUID(),
    };
    const result = await this.callMedia.sendDtmfTones(
      this.callConnectionId,
      sendDtmfTonesRequest,
      optionsInternal,
    );

    const sendDtmfTonesResult: SendDtmfTonesResult = {
      ...result,
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
        options.operationCallbackUrl !== undefined ? options.operationCallbackUrl : undefined,
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
      operationCallbackUri:
        options.operationCallbackUrl !== undefined ? options.operationCallbackUrl : undefined,
    };
    return this.callMedia.unhold(this.callConnectionId, unholdRequest);
  }

  /**
   * Starts transcription in the call
   * @param options - Additional attributes for start transcription.
   */
  public async startTranscription(options: StartTranscriptionOptions = {}): Promise<void> {
    const startTranscriptionRequest: StartTranscriptionRequest = {
      locale: options.locale,
      operationContext: options.operationContext,
      speechModelEndpointId: options.speechRecognitionModelEndpointId,
      operationCallbackUri: options.operationCallbackUrl,
    };
    return this.callMedia.startTranscription(this.callConnectionId, startTranscriptionRequest, {});
  }

  /**
   * Stops transcription in the call.
   * @param options - Additional attributes for stop transcription.
   */
  public async stopTranscription(options: StopTranscriptionOptions = {}): Promise<void> {
    const stopTranscriptionRequest: StopTranscriptionRequest = {
      operationContext: options.operationContext,
      operationCallbackUri: options.operationCallbackUrl,
    };
    return this.callMedia.stopTranscription(this.callConnectionId, stopTranscriptionRequest, {});
  }

  /**
   * Update transcription language.
   * @param locale - Defines new locale for transcription.
   */
  public async updateTranscription(
    locale: string,
    options?: UpdateTranscriptionOptions,
  ): Promise<void> {
    const updateTranscriptionRequest: UpdateTranscriptionRequest = {
      locale: locale,
      speechModelEndpointId: options?.speechRecognitionModelEndpointId,
      operationContext: options?.operationContext,
      operationCallbackUri: options?.operationCallbackUrl,
    };
    return this.callMedia.updateTranscription(
      this.callConnectionId,
      updateTranscriptionRequest,
      {},
    );
  }
  /**
   * Starts media streaming in the call.
   * @param options - Additional attributes for start media streaming.
   */
  public async startMediaStreaming(options: StartMediaStreamingOptions = {}): Promise<void> {
    const startMediaStreamingRequest: StartMediaStreamingRequest = {
      operationContext: options.operationContext,
      operationCallbackUri: options.operationCallbackUrl,
    };
    return this.callMedia.startMediaStreaming(
      this.callConnectionId,
      startMediaStreamingRequest,
      options,
    );
  }

  /**
   * Stops media streaming in the call.
   * @param options - Additional attributes for stop media streaming.
   */
  public async stopMediaStreaming(options: StopMediaStreamingOptions = {}): Promise<void> {
    const stopMediaStreamingRequest: StopMediaStreamingRequest = {
      operationCallbackUri: options.operationCallbackUrl,
      operationContext: options.operationContext,
    };
    return this.callMedia.stopMediaStreaming(
      this.callConnectionId,
      stopMediaStreamingRequest,
      options,
    );
  }
}
