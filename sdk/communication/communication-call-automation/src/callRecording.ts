// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CallRecordingImpl } from "./generated/src/operations";
import {
  CallAutomationApiClientOptionalParams,
  StartCallRecordingRequest,
} from "./generated/src/models/index";
import { RecordingStateResult } from "./models/responses";
import {
  StartRecordingOptions,
  StopRecordingOptions,
  PauseRecordingOptions,
  GetRecordingPropertiesOptions,
  ResumeRecordingOptions,
  DeleteRecordingOptions,
  DownloadRecordingOptions,
} from "./models/options";
import { communicationIdentifierModelConverter } from "./utli/converters";
import { ContentDownloaderImpl } from "./contentDownloader";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { CallAutomationApiClient } from "./generated/src";
import { createCommunicationAuthPolicy } from "@azure/communication-common";

/**
 * CallRecording class represents call recording related APIs.
 */
export class CallRecording {
  private readonly callRecordingImpl: CallRecordingImpl;
  private readonly contentDownloader: ContentDownloaderImpl;
  private readonly callAutomationApiClient: CallAutomationApiClient;

  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: CallAutomationApiClientOptionalParams
  ) {
    this.callAutomationApiClient = new CallAutomationApiClient(endpoint, options);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.callAutomationApiClient.pipeline.addPolicy(authPolicy);

    this.callRecordingImpl = new CallRecordingImpl(this.callAutomationApiClient);
    this.contentDownloader = new ContentDownloaderImpl(this.callAutomationApiClient);
  }

  /**
   * Starts a call recording with the specified options.
   * @param startCallRecordingRequest - options to start the call recording
   * @param options - Operation options.
   */
  public async start(options: StartRecordingOptions): Promise<RecordingStateResult> {
    const startCallRecordingRequest: StartCallRecordingRequest = {
      callLocator: options.callLocator,
    };

    startCallRecordingRequest.recordingChannelType = options.recordingChannel;
    startCallRecordingRequest.recordingContentType = options.recordingContent;
    startCallRecordingRequest.recordingFormatType = options.recordingFormat;
    startCallRecordingRequest.recordingStateCallbackUri = options.recordingStateCallbackEndpointUrl;
    startCallRecordingRequest.pauseOnStart = options.pauseOnStart;

    if (options.channelAffinity) {
      startCallRecordingRequest.channelAffinity = [];
      options.channelAffinity.forEach((identifier) => {
        startCallRecordingRequest.channelAffinity?.push({
          participant: communicationIdentifierModelConverter(identifier.targetParticipant),
          channel: identifier.channel,
        });
      });
    }

    if (options.audioChannelParticipantOrdering) {
      startCallRecordingRequest.audioChannelParticipantOrdering = [];
      options.audioChannelParticipantOrdering.forEach((identifier) => {
        startCallRecordingRequest.audioChannelParticipantOrdering?.push(
          communicationIdentifierModelConverter(identifier)
        );
      });
    }

    if (options.callLocator.kind === "groupCallLocator") {
      startCallRecordingRequest.callLocator.kind = "groupCallLocator";
      startCallRecordingRequest.callLocator.groupCallId = options.callLocator.id;
    } else {
      startCallRecordingRequest.callLocator.kind = "serverCallLocator";
      startCallRecordingRequest.callLocator.serverCallId = options.callLocator.id;
    }

    const optionsInternal = {
      ...options,
      repeatabilityFirstSent: new Date(),
      repeatabilityRequestID: uuidv4(),
    };
    const response = await this.callRecordingImpl.startRecording(
      startCallRecordingRequest,
      optionsInternal
    );

    const result: RecordingStateResult = {
      recordingId: response.recordingId!,
      recordingState: response.recordingState!,
    };

    return result;
  }

  /**
   * Returns call recording properties.
   * @param recordingId - The recordingId associated with the recording.
   * @param options - Additional request options contains getRecordingProperties api options.
   */
  public async getState(
    recordingId: string,
    options: GetRecordingPropertiesOptions = {}
  ): Promise<RecordingStateResult> {
    const response = await this.callRecordingImpl.getRecordingProperties(recordingId, options);

    const result: RecordingStateResult = {
      recordingId: response.recordingId!,
      recordingState: response.recordingState!,
    };

    return result;
  }

  /**
   * Stops a call recording.
   * @param recordingId - The recordingId associated with the recording.
   * @param options - Additional request options contains stopRecording api options.
   */
  public async stop(recordingId: string, options: StopRecordingOptions = {}): Promise<void> {
    return this.callRecordingImpl.stopRecording(recordingId, options);
  }

  /**
   * Pauses a call recording.
   * @param recordingId - The recordingId associated with the recording.
   * @param options - Additional request options contains pauseRecording api options.
   */
  public async pause(recordingId: string, options: PauseRecordingOptions = {}): Promise<void> {
    return this.callRecordingImpl.pauseRecording(recordingId, options);
  }

  /**
   * Resumes a call recording.
   * @param recordingId - The recordingId associated with the recording.
   * @param options - Additional request options contains resumeRecording api options.
   */
  public async resume(recordingId: string, options: ResumeRecordingOptions = {}): Promise<void> {
    return this.callRecordingImpl.resumeRecording(recordingId, options);
  }

  /**
   * Deletes a recording.
   * @param recordingLocationUrl - The recording location url. Required.
   * @param options - Additional request options contains deleteRecording api options.
   */
  public async delete(
    recordingLocationUrl: string,
    options: DeleteRecordingOptions = {}
  ): Promise<void> {
    await this.contentDownloader.deleteRecording(recordingLocationUrl, options);
  }

  /**
   * Returns a stream with a call recording.
   * @param sourceLocationUrl - The source location url. Required.
   * @param options - Additional request options contains downloadRecording api options.
   */
  public async downloadStreaming(
    sourceLocationUrl: string,
    options: DownloadRecordingOptions = {}
  ): Promise<NodeJS.ReadableStream> {
    const result = this.contentDownloader.download(sourceLocationUrl, options);
    const recordingStream = (await result).readableStreamBody;
    if (recordingStream) {
      return recordingStream;
    } else {
      throw Error("failed to get stream");
    }
  }

  /**
   * Downloads a call recording file to the specified stream.
   * @param sourceLocationUrl - The source location url. Required.
   * @param destinationStream - The destination stream. Required.
   * @param options - Additional request options contains downloadRecording api options.
   */
  public async downloadToStream(
    sourceLocationUrl: string,
    destinationStream: NodeJS.WritableStream,
    options: DownloadRecordingOptions = {}
  ): Promise<void> {
    const result = this.contentDownloader.download(sourceLocationUrl, options);
    const recordingStream = (await result).readableStreamBody;
    if (recordingStream) {
      recordingStream.pipe(destinationStream);
      const finish = new Promise<void>((resolve, reject) => {
        destinationStream.on("finish", resolve);
        destinationStream.on("error", reject);
      });
      await finish;
    } else {
      throw Error("failed to get stream");
    }
  }

  /**
   * Downloads a call recording file to the specified path.
   * @param sourceLocationUrl - The source location url. Required.
   * @param destinationPath - The destination path. Required.
   * @param options - Additional request options contains downloadRecording api options.
   */
  public async downloadToPath(
    sourceLocationUrl: string,
    destinationPath: string,
    options: DownloadRecordingOptions = {}
  ): Promise<void> {
    const result = this.contentDownloader.download(sourceLocationUrl, options);
    const recordingStream = (await result).readableStreamBody;
    if (recordingStream) {
      const writeFileStream = fs.createWriteStream(destinationPath);
      recordingStream.pipe(writeFileStream);
      const finish = new Promise<void>((resolve, reject) => {
        writeFileStream.on("finish", resolve);
        writeFileStream.on("error", reject);
      });
      await finish;
    } else {
      throw Error("failed to get stream");
    }
  }
}
