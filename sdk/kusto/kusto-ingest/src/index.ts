// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import client from "./ingestClient";

import streamingIngestClient from "./streamingIngestClient";

import managedStreamingIngestClient from "./managedStreamingIngestClient";

import KustoIngestStatusQueues from "./status";

import {
  DataFormat,
  IngestionMappingKind,
  ReportLevel,
  ReportMethod,
  ValidationImplications,
  ValidationOptions,
  ValidationPolicy,
} from "./ingestionProperties";

import { BlobDescriptor, CompressionType, FileDescriptor, StreamDescriptor } from "./descriptors";
import {
  ApacheAvroColumnMapping,
  AvroColumnMapping,
  ColumnMapping,
  ConstantTransformation,
  CsvColumnMapping,
  FieldTransformation,
  JsonColumnMapping,
  OrcColumnMapping,
  ParquetColumnMapping,
  SStreamColumnMapping,
  W3CLogFileMapping,
} from "./columnMappings";

export { Transformation as ColumnMappingTransformation } from "./columnMappings";

export const IngestClient = client;
export const StreamingIngestClient = streamingIngestClient;
export const ManagedStreamingIngestClient = managedStreamingIngestClient;
export const IngestStatusQueues = KustoIngestStatusQueues;
export { IngestionProperties } from "./ingestionProperties";
export const IngestionDescriptors = {
  BlobDescriptor,
  FileDescriptor,
  StreamDescriptor,
};

export {
  JsonColumnMapping,
  CsvColumnMapping,
  AvroColumnMapping,
  ParquetColumnMapping,
  OrcColumnMapping,
  W3CLogFileMapping,
  ValidationPolicy,
  ReportLevel,
  ReportMethod,
  ValidationImplications,
  ValidationOptions,
  DataFormat,
  IngestionMappingKind,
  CompressionType,
  ApacheAvroColumnMapping,
  SStreamColumnMapping,
  ConstantTransformation,
  FieldTransformation,
  ColumnMapping,
};

/**
 * @deprecated - import directly instead
 */
export const IngestionPropertiesEnums = {
  JsonColumnMapping,
  CsvColumnMapping,
  AvroColumnMapping,
  ParquetColumnMapping,
  OrcColumnMapping,
  W3CLogFileMapping,
  ValidationPolicy,
  ReportLevel,
  ReportMethod,
  ValidationImplications,
  ValidationOptions,
  DataFormat,
  /**
   * @deprecated - use IngestionMappingKind instead
   */
  IngestionMappingType: IngestionMappingKind,
  IngestionMappingKind,
  CompressionType,
  ApacheAvroColumnMapping,
  SStreamColumnMapping,
  ConstantTransformation,
  FieldTransformation,
  ColumnMapping,
};

export { IngestionPropertiesValidationError } from "./errors";
