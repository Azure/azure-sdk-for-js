// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Transcription */
export interface TranscriptionJob {
  /** TranscriptionLinks */
  links?: TranscriptionLinks;
  /** TranscriptionProperties */
  properties: TranscriptionProperties;
  /** The id of this entity. */
  readonly id: string;
  /** The location of this entity. */
  readonly self: string;
  /** EntityReference */
  model?: EntityReference;
  /** EntityReference */
  dataset?: EntityReference;
  /**
   * A list of content urls to get audio files to transcribe. Up to 1000 urls are allowed.
   * This property will not be returned in a response.
   */
  contentUrls?: string[];
  /**
   * A URL for an Azure blob container that contains the audio files. A container is allowed to have a maximum size of 5GB and a maximum number of 10000 blobs.
   * The maximum size for a blob is 2.5GB.
   * Container SAS should contain 'r' (read) and 'l' (list) permissions.
   * This property will not be returned in a response.
   */
  contentContainerUrl?: string;
  /** The locale of the contained data. If Language Identification is used, this locale is used to transcribe speech for which no language could be detected. */
  locale: string;
  /** The display name of the object. */
  displayName: string;
  /** The description of the object. */
  description?: string;
  /**
   * The custom properties of this entity. The maximum allowed key length is 64 characters, the maximum
   * allowed value length is 256 characters and the count of allowed entries is 10.
   */
  customProperties?: Record<string, string>;
  /**
   * The time-stamp when the current status was entered.
   * The time stamp is encoded as ISO 8601 date and time format
   * ("YYYY-MM-DDThh:mm:ssZ", see https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).
   */
  readonly lastActionDateTime?: Date;
  /** The status of the object */
  readonly status: TranscriptionStatus;
  /**
   * The time-stamp when the object was created.
   * The time stamp is encoded as ISO 8601 date and time format
   * ("YYYY-MM-DDThh:mm:ssZ", see https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).
   */
  readonly createdDateTime?: Date;
}

export function transcriptionJobSerializer(item: TranscriptionJob): any {
  return {
    links: !item["links"] ? item["links"] : transcriptionLinksSerializer(item["links"]),
    properties: transcriptionPropertiesSerializer(item["properties"]),
    model: !item["model"] ? item["model"] : entityReferenceSerializer(item["model"]),
    dataset: !item["dataset"] ? item["dataset"] : entityReferenceSerializer(item["dataset"]),
    contentUrls: !item["contentUrls"]
      ? item["contentUrls"]
      : item["contentUrls"].map((p: any) => {
          return p;
        }),
    contentContainerUrl: item["contentContainerUrl"],
    locale: item["locale"],
    displayName: item["displayName"],
    description: item["description"],
    customProperties: item["customProperties"],
  };
}

export function transcriptionJobDeserializer(item: any): TranscriptionJob {
  return {
    links: !item["links"] ? item["links"] : transcriptionLinksDeserializer(item["links"]),
    properties: transcriptionPropertiesDeserializer(item["properties"]),
    id: item["id"],
    self: item["self"],
    model: !item["model"] ? item["model"] : entityReferenceDeserializer(item["model"]),
    dataset: !item["dataset"] ? item["dataset"] : entityReferenceDeserializer(item["dataset"]),
    contentUrls: !item["contentUrls"]
      ? item["contentUrls"]
      : item["contentUrls"].map((p: any) => {
          return p;
        }),
    contentContainerUrl: item["contentContainerUrl"],
    locale: item["locale"],
    displayName: item["displayName"],
    description: item["description"],
    customProperties: item["customProperties"],
    lastActionDateTime: !item["lastActionDateTime"]
      ? item["lastActionDateTime"]
      : new Date(item["lastActionDateTime"]),
    status: item["status"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
  };
}

/** TranscriptionLinks */
export interface TranscriptionLinks {
  /** The location to get all files of this entity. See operation "Transcriptions_ListFiles" for more details. */
  readonly files?: string;
}

export function transcriptionLinksSerializer(item: TranscriptionLinks): any {
  return item;
}

export function transcriptionLinksDeserializer(item: any): TranscriptionLinks {
  return {
    files: item["files"],
  };
}

/** TranscriptionProperties */
export interface TranscriptionProperties {
  /** A value indicating whether word level timestamps are requested. The default value is false. */
  wordLevelTimestampsEnabled?: boolean;
  /** A value indicating whether word level timestamps for the display form are requested. The default value is false. */
  displayFormWordLevelTimestampsEnabled?: boolean;
  /**
   * The duration in milliseconds of the transcription.
   * Durations larger than 2^53-1 are not supported to ensure compatibility with JavaScript integers.
   */
  readonly durationMilliseconds?: number;
  /** A collection of the requested channel numbers. In the default case, the channels 0 and 1 are considered. */
  channels?: number[];
  /**
   * The requested destination container.
   *
   * Remarks
   *
   * When a destination container is used in combination with a timeToLive, the metadata of a transcription will be deleted normally, but the data stored in the destination container, including transcription results, will remain untouched, because no delete permissions are required for this container.
   *
   * To support automatic cleanup, either configure blob lifetimes on the container, or use "Bring your own Storage (BYOS)" instead of destinationContainerUrl, where blobs can be cleaned up.
   */
  destinationContainerUrl?: string;
  /** The mode used for punctuation. */
  punctuationMode?: PunctuationMode;
  /** Mode of profanity filtering. */
  profanityFilterMode?: ProfanityFilterMode;
  /**
   * How long the transcription will be kept in the system after it has completed. Once the transcription reaches the time to live after completion(successful or failed) it will be automatically deleted.
   *
   * Note: When using BYOS (bring your own storage), the result files on the customer owned storage account will also be deleted.Use either destinationContainerUrl to specify a separate container for result files which will not be deleted when the timeToLive expires, or retrieve the result files through the API and store them as needed.
   *
   * The shortest supported duration is 6 hours, the longest supported duration is 31 days. 2 days (48 hours) is the recommended default value when data is consumed directly.
   */
  timeToLiveHours: number;
  /** EntityError */
  error?: EntityError;
  /** Speaker Identification */
  diarization?: DiarizationProperties;
  /** LanguageIdentificationProperties */
  languageIdentification?: LanguageIdentificationProperties;
}

export function transcriptionPropertiesSerializer(item: TranscriptionProperties): any {
  return {
    wordLevelTimestampsEnabled: item["wordLevelTimestampsEnabled"],
    displayFormWordLevelTimestampsEnabled: item["displayFormWordLevelTimestampsEnabled"],
    channels: !item["channels"]
      ? item["channels"]
      : item["channels"].map((p: any) => {
          return p;
        }),
    destinationContainerUrl: item["destinationContainerUrl"],
    punctuationMode: item["punctuationMode"],
    profanityFilterMode: item["profanityFilterMode"],
    timeToLiveHours: item["timeToLiveHours"],
    error: !item["error"] ? item["error"] : entityErrorSerializer(item["error"]),
    diarization: !item["diarization"]
      ? item["diarization"]
      : diarizationPropertiesSerializer(item["diarization"]),
    languageIdentification: !item["languageIdentification"]
      ? item["languageIdentification"]
      : languageIdentificationPropertiesSerializer(item["languageIdentification"]),
  };
}

export function transcriptionPropertiesDeserializer(item: any): TranscriptionProperties {
  return {
    wordLevelTimestampsEnabled: item["wordLevelTimestampsEnabled"],
    displayFormWordLevelTimestampsEnabled: item["displayFormWordLevelTimestampsEnabled"],
    durationMilliseconds: item["durationMilliseconds"],
    channels: !item["channels"]
      ? item["channels"]
      : item["channels"].map((p: any) => {
          return p;
        }),
    destinationContainerUrl: item["destinationContainerUrl"],
    punctuationMode: item["punctuationMode"],
    profanityFilterMode: item["profanityFilterMode"],
    timeToLiveHours: item["timeToLiveHours"],
    error: !item["error"] ? item["error"] : entityErrorDeserializer(item["error"]),
    diarization: !item["diarization"]
      ? item["diarization"]
      : diarizationPropertiesDeserializer(item["diarization"]),
    languageIdentification: !item["languageIdentification"]
      ? item["languageIdentification"]
      : languageIdentificationPropertiesDeserializer(item["languageIdentification"]),
  };
}

/** The mode used for punctuation. */
export type PunctuationMode = "None" | "Dictated" | "Automatic" | "DictatedAndAutomatic";
/** Mode of profanity filtering. */
export type ProfanityFilterMode = "None" | "Removed" | "Tags" | "Masked";

/** EntityError */
export interface EntityError {
  /** The code of this error. */
  readonly code?: string;
  /** The message for this error. */
  readonly message?: string;
}

export function entityErrorSerializer(item: EntityError): any {
  return item;
}

export function entityErrorDeserializer(item: any): EntityError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Speaker Identification Properties */
export interface DiarizationProperties {
  /** A value indicating whether speaker identification is enabled. */
  enabled: boolean;
  /** A hint for the maximum number of speakers for diarization. Must be greater than 1 and less than 36. */
  maxSpeakers: number;
}

export function diarizationPropertiesSerializer(item: DiarizationProperties): any {
  return { enabled: item["enabled"], maxSpeakers: item["maxSpeakers"] };
}

export function diarizationPropertiesDeserializer(item: any): DiarizationProperties {
  return {
    enabled: item["enabled"],
    maxSpeakers: item["maxSpeakers"],
  };
}

/** LanguageIdentificationProperties */
export interface LanguageIdentificationProperties {
  /** The mode used for language identification. */
  mode?: LanguageIdentificationMode;
  /** The candidate locales for language identification (example ["en-US", "de-DE", "es-ES"]). A minimum of 2 and a maximum of 10 candidate locales, including the main locale for the transcription, is supported for continuous mode. For single language identification, the maximum number of candidate locales is unbounded. */
  candidateLocales: string[];
  /**
   * An optional mapping of locales to speech model entities. If no model is given for a locale, the default base model is used.
   * Keys must be locales contained in the candidate locales, values are entities for models of the respective locales.
   */
  speechModelMapping?: Record<string, EntityReference>;
}

export function languageIdentificationPropertiesSerializer(
  item: LanguageIdentificationProperties,
): any {
  return {
    mode: item["mode"],
    candidateLocales: item["candidateLocales"].map((p: any) => {
      return p;
    }),
    speechModelMapping: !item["speechModelMapping"]
      ? item["speechModelMapping"]
      : entityReferenceRecordSerializer(item["speechModelMapping"]),
  };
}

export function languageIdentificationPropertiesDeserializer(
  item: any,
): LanguageIdentificationProperties {
  return {
    mode: item["mode"],
    candidateLocales: item["candidateLocales"].map((p: any) => {
      return p;
    }),
    speechModelMapping: !item["speechModelMapping"]
      ? item["speechModelMapping"]
      : entityReferenceRecordDeserializer(item["speechModelMapping"]),
  };
}

/** The mode used for language identification. */
export type LanguageIdentificationMode = "Continuous" | "Single";

export function entityReferenceRecordSerializer(
  item: Record<string, EntityReference>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : entityReferenceSerializer(item[key]);
  });
  return result;
}

export function entityReferenceRecordDeserializer(
  item: Record<string, any>,
): Record<string, EntityReference> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : entityReferenceDeserializer(item[key]);
  });
  return result;
}

/** EntityReference */
export interface EntityReference {
  /** The location of the referenced entity. */
  self: string;
}

export function entityReferenceSerializer(item: EntityReference): any {
  return { self: item["self"] };
}

export function entityReferenceDeserializer(item: any): EntityReference {
  return {
    self: item["self"],
  };
}

/** Describe the current state of the API. */
export type TranscriptionStatus = "NotStarted" | "Running" | "Succeeded" | "Failed";

/** Page of entities. */
export interface _SpeechToTextCustomPageTranscriptionJob {
  /**
   * A list of entities limited by either the passed query parameters 'skip' and 'top' or their default values.
   *
   * When iterating through a list using pagination and deleting entities in parallel, some entities will be skipped in the results.
   * It's recommended to build a list on the client and delete after the fetching of the complete list.
   */
  readonly values?: TranscriptionJob[];
  /** A link to the next set of paginated results if there are more entities available; otherwise null. */
  readonly nextLink?: string;
}

export function _speechToTextCustomPageTranscriptionJobDeserializer(
  item: any,
): _SpeechToTextCustomPageTranscriptionJob {
  return {
    values: !item["values"] ? item["values"] : transcriptionJobArrayDeserializer(item["values"]),
    nextLink: item["@nextLink"],
  };
}

export function transcriptionJobArraySerializer(result: Array<TranscriptionJob>): any[] {
  return result.map((item) => {
    return transcriptionJobSerializer(item);
  });
}

export function transcriptionJobArrayDeserializer(result: Array<TranscriptionJob>): any[] {
  return result.map((item) => {
    return transcriptionJobDeserializer(item);
  });
}

/** Page of entities. */
export interface _SpeechToTextCustomPageTranscriptionFile {
  /**
   * A list of entities limited by either the passed query parameters 'skip' and 'top' or their default values.
   *
   * When iterating through a list using pagination and deleting entities in parallel, some entities will be skipped in the results.
   * It's recommended to build a list on the client and delete after the fetching of the complete list.
   */
  readonly values?: TranscriptionFile[];
  /** A link to the next set of paginated results if there are more entities available; otherwise null. */
  readonly nextLink?: string;
}

export function _speechToTextCustomPageTranscriptionFileDeserializer(
  item: any,
): _SpeechToTextCustomPageTranscriptionFile {
  return {
    values: !item["values"] ? item["values"] : transcriptionFileArrayDeserializer(item["values"]),
    nextLink: item["@nextLink"],
  };
}

export function transcriptionFileArrayDeserializer(result: Array<TranscriptionFile>): any[] {
  return result.map((item) => {
    return transcriptionFileDeserializer(item);
  });
}

/** TranscriptionFile */
export interface TranscriptionFile {
  /** The creation time of this file. The time stamp is encoded as ISO 8601 date and time format (see https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations). */
  createdDateTime: Date;
  /** FileKind */
  kind: FileKind;
  /** FileLinks */
  links: FileLinks;
  /** The name of this file. */
  displayName: string;
  /** FileProperties */
  properties: FileProperties;
  /** The location of this entity. */
  readonly self: string;
}

export function transcriptionFileDeserializer(item: any): TranscriptionFile {
  return {
    createdDateTime: new Date(item["createdDateTime"]),
    kind: item["kind"],
    links: fileLinksDeserializer(item["links"]),
    displayName: item["displayName"],
    properties: filePropertiesDeserializer(item["properties"]),
    self: item["self"],
  };
}

/** FileKind */
export type FileKind =
  | "AcousticDataArchive"
  | "AcousticDataTranscriptionV2"
  | "Audio"
  | "DatasetReport"
  | "EvaluationDetails"
  | "LanguageData"
  | "ModelReport"
  | "OutputFormattingData"
  | "PronunciationData"
  | "Transcription"
  | "TranscriptionReport";

/** FileLinks */
export interface FileLinks {
  /** The url to retrieve the content of this file. */
  contentUrl: string;
}

export function fileLinksDeserializer(item: any): FileLinks {
  return {
    contentUrl: item["contentUrl"],
  };
}

/** FileProperties */
export interface FileProperties {
  /** The total duration in milliseconds of the file in case this file is an audio file. */
  durationMilliseconds: number;
  /** The size of the data in bytes. */
  size: number;
}

export function filePropertiesDeserializer(item: any): FileProperties {
  return {
    durationMilliseconds: item["durationMilliseconds"],
    size: item["size"],
  };
}

/** Service API versions. */
export enum KnownServiceApiVersions {
  /** 2025-10-15 */
  V20251015 = "2025-10-15",
}
