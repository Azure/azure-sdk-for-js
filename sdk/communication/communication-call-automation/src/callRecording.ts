// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CallRecordingImpl } from "./generated/src/operations";
import { StartCallRecordingRequest } from "./generated/src/models/index";
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

/**
 * CallRecording class represents call recording related APIs.
 */
export class CallRecording {
  private readonly callRecordingImpl: CallRecordingImpl;
  private readonly contentDownloader: ContentDownloaderImpl;

  constructor(callRecordingImpl: CallRecordingImpl, contentDownloader: ContentDownloaderImpl) {
    this.callRecordingImpl = callRecordingImpl;
    this.contentDownloader = contentDownloader;
  }

  /**
   * Starts a call recording with the specified options.
   * @param startCallRecordingRequest - options to start the call recording
   * @param options - Operation options.
   */
  public async startRecording(options: StartRecordingOptions): Promise<RecordingStateResult> {
    const startCallRecordingRequest: StartCallRecordingRequest = {
      callLocator: options.callLocator,
    };

    startCallRecordingRequest.recordingChannelType = options.recordingChannel;
    startCallRecordingRequest.recordingContentType = options.recordingContent;
    startCallRecordingRequest.recordingFormatType = options.recordingFormat;

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

    const response = await this.callRecordingImpl.startRecording(
      startCallRecordingRequest,
      options
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
  public async getRecordingState(
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
  public async stopRecording(
    recordingId: string,
    options: StopRecordingOptions = {}
  ): Promise<void> {
    return this.callRecordingImpl.stopRecording(recordingId, options);
  }

  /**
   * Pauses a call recording.
   * @param recordingId - The recordingId associated with the recording.
   * @param options - Additional request options contains pauseRecording api options.
   */
  public async pauseRecording(
    recordingId: string,
    options: PauseRecordingOptions = {}
  ): Promise<void> {
    return this.callRecordingImpl.pauseRecording(recordingId, options);
  }

  /**
   * Resumes a call recording.
   * @param recordingId - The recordingId associated with the recording.
   * @param options - Additional request options contains resumeRecording api options.
   */
  public async resumeRecording(
    recordingId: string,
    options: ResumeRecordingOptions = {}
  ): Promise<void> {
    return this.callRecordingImpl.resumeRecording(recordingId, options);
  }

  /**
   * Deletes a recording.
   * @param recordingLocation - The recording location uri. Required.
   * @param options - Additional request options contains deleteRecording api options.
   */
  public async deleteRecording(
    recordingLocation: string,
    options: DeleteRecordingOptions = {}
  ): Promise<void> {
    await this.contentDownloader.deleteRecording(recordingLocation, options);
  }

  /**
   * Returns a stream with a call recording.
   * @param sourceLocation - The source location uri. Required.
   * @param options - Additional request options contains downloadRecording api options.
   */
  public async downloadStreaming(
    sourceLocation: string,
    options: DownloadRecordingOptions = {}
  ): Promise<NodeJS.ReadableStream> {
    const result = this.contentDownloader.download(sourceLocation, options);
    const recordingStream = (await result).readableStreamBody;
    if (recordingStream) {
      return recordingStream;
    } else {
      throw Error("failed to get stream");
    }
  }

  /**
   * Downloads a call recording file to the specified path.
   * @param sourceLocation - The source location uri. Required.
   * @param destinationPath - The destination path. Required.
   * @param options - Additional request options contains downloadRecording api options.
   */
  public async downloadTo(
    sourceLocation: string,
    destinationPath: string,
    options: DownloadRecordingOptions = {}
  ): Promise<void> {
    console.log(destinationPath);
    const result = this.contentDownloader.download(sourceLocation, options);
    const recordingStream = (await result).readableStreamBody;
    if (recordingStream) {
      recordingStream.pipe(fs.createWriteStream(destinationPath));
    } else {
      throw Error("failed to get stream");
    }
  }
}
