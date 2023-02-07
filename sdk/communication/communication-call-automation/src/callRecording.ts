// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CallRecordingImpl } from "./generated/src/operations";
import {
  StartCallRecordingRequest,
  RecordingStateResponse,
} from "./generated/src/models/index";
import {
  StartCallRecordingRequestDto,
  RecordingStateResponseDto,
} from "./models/models";
import {
  CallRecordingStartRecordingOptions,
  CallRecordingStopRecordingOptions,
  CallRecordingPauseRecordingOptions,
  CallRecordingGetRecordingPropertiesOptions,
  CallRecordingResumeRecordingOptionalParams
} from "./models/options";

/**
* CallRecording class represents call recording related APIs.
*/
export class CallRecording {
  private readonly callRecordingImpl: CallRecordingImpl;

  constructor(callRecordingImpl: CallRecordingImpl) {
    this.callRecordingImpl = callRecordingImpl;
  }

  /**
  * Starts a call recording with the specified options.
  * @param startCallRecordingRequest - options to start the call recording
  * @param options - Operation options.
  */
  public async startRecording(request: StartCallRecordingRequestDto, options: CallRecordingStartRecordingOptions = {}): Promise<RecordingStateResponse> {

    const startCallRecordingRequest: StartCallRecordingRequest = {
      ...request,
    }
    if (request.callLocator.kind === "groupCallLocator") {
        startCallRecordingRequest.callLocator.kind = "groupCallLocator"
        startCallRecordingRequest.callLocator.groupCallId = request.callLocator.id
    }
    else {
        startCallRecordingRequest.callLocator.kind = "serverCallLocator"
        startCallRecordingRequest.callLocator.serverCallId = request.callLocator.id
    }
    const response: RecordingStateResponseDto = {
      ...await this.callRecordingImpl.startRecording(startCallRecordingRequest, options)
    }

    return response

  }

  /**
  * Returns call recording properties.
  * @param recordingId - The recordingId associated with the recording.
  * @param options - Additional request options contains getRecordingProperties api options.
  */
  public async getRecordingProperties(recordingId: string, options: CallRecordingGetRecordingPropertiesOptions): Promise<RecordingStateResponseDto> {

    const response: RecordingStateResponseDto = {
      ...await this.callRecordingImpl.getRecordingProperties(recordingId, options)
    }

    return response
  }

  /**
  * Stops a call recording.
  * @param recordingId - The recordingId associated with the recording.
  * @param options - Additional request options contains stopRecording api options.
  */
  public async stopRecording(recordingId: string, options: CallRecordingStopRecordingOptions): Promise<void> {

    return this.callRecordingImpl.stopRecording(recordingId, options);
  }

  /**
  * Pauses a call recording.
  * @param recordingId - The recordingId associated with the recording.
  * @param options - Additional request options contains pauseRecording api options.
  */
  public async pauseRecording(recordingId: string, options: CallRecordingPauseRecordingOptions): Promise<void> {

    return this.callRecordingImpl.pauseRecording(recordingId, options);
  }

  /**
  * Resumes a call recording.
  * @param recordingId - The recordingId associated with the recording.
  * @param options - Additional request options contains resumeRecording api options.
  */
  public async resumeRecording(recordingId: string, options: CallRecordingResumeRecordingOptionalParams): Promise<void> {

    return this.callRecordingImpl.resumeRecording(recordingId, options);
  }

}
