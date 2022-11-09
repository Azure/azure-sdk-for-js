// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { BlobDescriptor } from "./descriptors";
import IngestionProperties, { ReportLevel, ReportMethod } from "./ingestionProperties";

export class IngestionBlobInfo {
  BlobPath: string;
  RawDataSize: number | null;
  DatabaseName: string | null;
  TableName: string | null;
  RetainBlobOnSuccess: boolean;
  FlushImmediately: boolean;
  IgnoreSizeLimit: boolean;
  ReportLevel: ReportLevel | null;
  ReportMethod: ReportMethod | null;
  SourceMessageCreationTime: moment.Moment;
  Id: string;
  AdditionalProperties: { [additional: string]: any };

  constructor(
    blobDescriptor: BlobDescriptor,
    ingestionProperties: IngestionProperties,
    authContext: string | null = null
  ) {
    this.BlobPath = blobDescriptor.path;
    this.RawDataSize = blobDescriptor.size;
    this.DatabaseName = ingestionProperties.database ?? null;
    this.TableName = ingestionProperties.table ?? null;
    this.RetainBlobOnSuccess = true;
    this.FlushImmediately = ingestionProperties.flushImmediately ?? false;
    this.IgnoreSizeLimit = false;
    this.ReportLevel = ingestionProperties.reportLevel ?? null;
    this.ReportMethod = ingestionProperties.reportMethod ?? null;
    this.SourceMessageCreationTime = moment.utc();
    this.Id = blobDescriptor.sourceId || uuidv4();

    const additionalProperties = ingestionProperties.additionalProperties || {};
    additionalProperties.authorizationContext = authContext;

    const tags: string[] = [];
    if (ingestionProperties.additionalTags) {
      tags.concat(ingestionProperties.additionalTags);
    }
    if (ingestionProperties.dropByTags) {
      tags.concat(ingestionProperties.dropByTags.map((t) => "drop-by:" + t));
    }
    if (ingestionProperties.ingestByTags) {
      tags.concat(ingestionProperties.ingestByTags.map((t) => "ingest-by:" + t));
    }

    if (tags && tags.length > 0) {
      additionalProperties.tags = tags;
    }

    if (ingestionProperties.ingestIfNotExists) {
      additionalProperties.ingestIfNotExists = ingestionProperties.ingestIfNotExists;
    }

    if (
      ingestionProperties.ingestionMappingColumns &&
      ingestionProperties.ingestionMappingColumns.length > 0
    ) {
      // server expects a string
      additionalProperties.ingestionMapping = JSON.stringify(
        ingestionProperties.ingestionMappingColumns.map((m) => m.toApiMapping())
      );
    }

    if (ingestionProperties.ingestionMappingReference) {
      additionalProperties.ingestionMappingReference =
        ingestionProperties.ingestionMappingReference;
    }

    if (ingestionProperties.ingestionMappingKind) {
      additionalProperties.ingestionMappingType = ingestionProperties.ingestionMappingKind;
    }

    if (ingestionProperties.validationPolicy) {
      additionalProperties.ValidationPolicy = ingestionProperties.validationPolicy;
    }

    if (ingestionProperties.format) {
      additionalProperties.format = ingestionProperties.format;
    }

    this.AdditionalProperties = additionalProperties;
  }
}

export default IngestionBlobInfo;
