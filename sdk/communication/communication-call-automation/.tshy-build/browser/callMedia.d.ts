import type { CallAutomationApiClientOptionalParams, Tone } from "./generated/src/index.js";
import type { CommunicationIdentifier } from "@azure/communication-common";
import type { FileSource, TextSource, SsmlSource, DtmfTone } from "./models/models.js";
import type { PlayOptions, CallMediaRecognizeDtmfOptions, CallMediaRecognizeChoiceOptions, ContinuousDtmfRecognitionOptions, SendDtmfTonesOptions, CallMediaRecognizeSpeechOptions, CallMediaRecognizeSpeechOrDtmfOptions, StartTranscriptionOptions, StopTranscriptionOptions, HoldOptions, UnholdOptions, StartMediaStreamingOptions, StopMediaStreamingOptions, PlayToAllOptions, UpdateTranscriptionOptions, InterruptAudioAndAnnounceOptions } from "./models/options.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { CancelAllMediaOperationsResult, PlayResult, SendDtmfTonesResult, StartRecognizingResult } from "./models/responses.js";
import type { CallAutomationEventProcessor } from "./eventprocessor/callAutomationEventProcessor.js";
/**
 * CallMedia class represents call media related APIs.
 */
export declare class CallMedia {
    private readonly callConnectionId;
    private readonly callMedia;
    private readonly callAutomationApiClient;
    private readonly callAutomationEventProcessor;
    constructor(callConnectionId: string, endpoint: string, credential: KeyCredential | TokenCredential, eventProcessor: CallAutomationEventProcessor, options?: CallAutomationApiClientOptionalParams);
    private createPlaySourceInternal;
    /**
     * Play audio to a specific participant.
     *
     * @param playSources - A PlaySource representing the sources to play. Currently only single play source per request is supported.
     * @param playTo - The targets to play to.
     * @param options - Additional attributes for play.
     */
    play(playSources: (FileSource | TextSource | SsmlSource)[], playTo: CommunicationIdentifier[], options?: PlayOptions): Promise<PlayResult>;
    /**
     * Play to all participants.
     *
     * @param playSources - A PlaySource representing the sources to play. Currently only single play source per request is supported.
     * @param options - Additional attributes for play.
     */
    playToAll(playSources: (FileSource | TextSource | SsmlSource)[], options?: PlayToAllOptions): Promise<PlayResult>;
    private createRecognizeRequest;
    /**
     *  Recognize participant input.
     *  @deprecated This method signature is deprecated. Please use the new signature with targetParticipant and options params instead, and set maxTonesToCollect in options.
     *  @param targetParticipant - Target participant.
     *  @param maxTonesToCollect - Maximum number of DTMF tones to be collected.
     *  @param options - Different attributes for recognize.
     * */
    startRecognizing(targetParticipant: CommunicationIdentifier, maxTonesToCollect: number, options: CallMediaRecognizeDtmfOptions): Promise<StartRecognizingResult>;
    /**
     *  Recognize participant input.
     *  @param targetParticipant - Target participant.
     *  @param options - Different attributes for recognize.
     * */
    startRecognizing(targetParticipant: CommunicationIdentifier, options: CallMediaRecognizeDtmfOptions | CallMediaRecognizeChoiceOptions | CallMediaRecognizeSpeechOptions | CallMediaRecognizeSpeechOrDtmfOptions): Promise<StartRecognizingResult>;
    /**
     * Cancels all the queued media operations.
     */
    cancelAllOperations(): Promise<CancelAllMediaOperationsResult>;
    /**
     * Start continuous Dtmf recognition by subscribing to tones.
     * @param targetParticipant - Target participant.
     * @param options - Additional attributes for continuous Dtmf recognition.
     * */
    startContinuousDtmfRecognition(targetParticipant: CommunicationIdentifier, options?: ContinuousDtmfRecognitionOptions): Promise<void>;
    /**
     * Stop continuous Dtmf recognition by unsubscribing to tones.
     * @param targetParticipant - Target participant.
     * @param options - Additional attributes for continuous Dtmf recognition.
     * */
    stopContinuousDtmfRecognition(targetParticipant: CommunicationIdentifier, options?: ContinuousDtmfRecognitionOptions): Promise<void>;
    /**
     * Send Dtmf tones.
     * @param tones - List of tones to be sent to target participant.
     * @param targetParticipant - Target participant.
     * @param options - Additional attributes for send Dtmf tones.
     * */
    sendDtmfTones(tones: Tone[] | DtmfTone[], targetParticipant: CommunicationIdentifier, options?: SendDtmfTonesOptions): Promise<SendDtmfTonesResult>;
    /**
     * Put participant on hold while playing audio.
     *
     * @param targetParticipant - The targets to play to.
     * @param options - Additional attributes for hold participant.
     */
    hold(targetParticipant: CommunicationIdentifier, options?: HoldOptions): Promise<void>;
    /**
     * Remove participant from hold.
     *
     * @param targetParticipant - The targets to play to.
     * @param options - Additional attributes for unhold participant.
     */
    unhold(targetParticipant: CommunicationIdentifier, options?: UnholdOptions): Promise<void>;
    /**
     * Starts transcription in the call
     * @param options - Additional attributes for start transcription.
     */
    startTranscription(options?: StartTranscriptionOptions): Promise<void>;
    /**
     * Stops transcription in the call.
     * @param options - Additional attributes for stop transcription.
     */
    stopTranscription(options?: StopTranscriptionOptions): Promise<void>;
    /**
     * Update transcription language.
     * @param locale - Defines new locale for transcription.
     */
    updateTranscription(locale: string, options?: UpdateTranscriptionOptions): Promise<void>;
    /**
     * Starts media streaming in the call.
     * @param options - Additional attributes for start media streaming.
     */
    startMediaStreaming(options?: StartMediaStreamingOptions): Promise<void>;
    /**
     * Stops media streaming in the call.
     * @param options - Additional attributes for stop media streaming.
     */
    stopMediaStreaming(options?: StopMediaStreamingOptions): Promise<void>;
    /**
     * Interrupt audio and announce to specific participant.
     *
     * @param playSources - A PlaySource representing the sources to play.
     * @param playTo - The targets to play to.
     * @param options - Additional attributes for interrupt audio and announce.
     */
    interruptAudioAndAnnounce(playSources: (FileSource | TextSource | SsmlSource)[], playTo: CommunicationIdentifier, options?: InterruptAudioAndAnnounceOptions): Promise<void>;
}
//# sourceMappingURL=callMedia.d.ts.map