// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IngestionPropertiesValidationError } from "./errors";
import { ColumnMapping } from "./columnMappings";

/**
 * Data formats supported for Kusto ingestion.
 */
export enum DataFormat {
  /**
   * Comma-separated value.
   */
  CSV = "csv",
  /**
   * Tab-separated value.
   */
  TSV = "tsv",
  /**
   * Semicolon-separated value (the unique Azure Storage log format).
   */
  SCSV = "scsv",
  /**
   * Start-Of-Header (CTRL-A)-separated value.
   */
  SOHSV = "sohsv",
  /**
   * Pipeline-separated value (used by Cosmos).
   */
  PSV = "psv",
  /**
   * Each record is a line and has just one field.
   */
  TXT = "txt",
  /**
   * Whole stream is a single record with a single field.
   */
  RAW = "raw",
  /**
   * Tab-separated value with '\' escaping character.
   */
  TSVE = "tsve",
  /**
   * Data is in a JSON format, each line is record with a single JSON value.
   */
  JSON = "json",
  /**
   * Data stream holds a single JSON value -- newlines are regular whitespace.
   */
  SINGLEJSON = "singlejson",
  /**
   * The data stream is a concatenation of JSON documents (property bags all).
   */
  MULTIJSON = "multijson",
  /**
   * Avro format.
   */
  AVRO = "avro",
  /**
   * Parquet format.
   */
  PARQUET = "parquet",
  /**
   * Microsoft Cosmos structured streams format
   */
  SSTREAM = "sstream",
  /**
   * The Optimized Row Columnar (ORC)
   */
  ORC = "orc",
  /**
   * Avro format for ingesting through avro2json.
   */
  APACHEAVRO = "apacheavro",
  /**
   * W3C Extended Log File format.
   */
  W3CLogFile = "w3clogfile",
}

export enum IngestionMappingKind {
  CSV = "Csv",
  JSON = "Json",
  AVRO = "Avro",
  PARQUET = "Parquet",
  SSTREAM = "SStream",
  ORC = "orc",
  APACHEAVRO = "ApacheAvro",
  W3CLOGFILE = "W3CLogFile",
}

export const dataFormatMappingKind = (dataFormat: DataFormat): IngestionMappingKind => {
  switch (dataFormat) {
    case DataFormat.CSV:
      return IngestionMappingKind.CSV;
    case DataFormat.TSV:
      return IngestionMappingKind.CSV;
    case DataFormat.SCSV:
      return IngestionMappingKind.CSV;
    case DataFormat.SOHSV:
      return IngestionMappingKind.CSV;
    case DataFormat.PSV:
      return IngestionMappingKind.CSV;
    case DataFormat.TXT:
      return IngestionMappingKind.CSV;
    case DataFormat.RAW:
      return IngestionMappingKind.CSV;
    case DataFormat.TSVE:
      return IngestionMappingKind.CSV;
    case DataFormat.JSON:
      return IngestionMappingKind.JSON;
    case DataFormat.SINGLEJSON:
      return IngestionMappingKind.JSON;
    case DataFormat.MULTIJSON:
      return IngestionMappingKind.JSON;
    case DataFormat.AVRO:
      return IngestionMappingKind.AVRO;
    case DataFormat.PARQUET:
      return IngestionMappingKind.PARQUET;
    case DataFormat.SSTREAM:
      return IngestionMappingKind.SSTREAM;
    case DataFormat.ORC:
      return IngestionMappingKind.ORC;
    case DataFormat.APACHEAVRO:
      return IngestionMappingKind.APACHEAVRO;
    case DataFormat.W3CLogFile:
      return IngestionMappingKind.W3CLOGFILE;
    default:
      throw new IngestionPropertiesValidationError(`Unsupported data format: ${dataFormat}`);
  }
};

export enum ValidationOptions {
  DoNotValidate = 0,
  ValidateCsvInputConstantColumns = 1,
  ValidateCsvInputColumnLevelOnly = 2,
}

export enum ValidationImplications {
  Fail = 0,
  BestEffort = 1,
}

export class ValidationPolicy {
  constructor(
    readonly validationOptions: ValidationOptions = ValidationOptions.DoNotValidate,
    readonly validationImplications: ValidationImplications = ValidationImplications.BestEffort
  ) {}

  toJSON(): Record<string, number> {
    return {
      ValidationOptions: this.validationOptions,
      ValidationImplications: this.validationImplications,
    };
  }
}

export enum ReportLevel {
  FailuresOnly = 0,
  DoNotReport = 1,
  FailuresAndSuccesses = 2,
}

export enum ReportMethod {
  Queue = 0,
  Table,
  QueueAndTable,
}

export interface IngestionPropertiesFields {
  database?: string;
  table?: string;
  format?: DataFormat;
  /**
   * @deprecated. Use ingestionMappingColumns instead.
   */
  ingestionMapping?: ColumnMapping[];
  ingestionMappingColumns?: ColumnMapping[];
  ingestionMappingReference?: string;
  /**
   * @deprecated. Use ingestionMappingKind instead.
   */
  ingestionMappingType?: IngestionMappingKind;
  ingestionMappingKind?: IngestionMappingKind;
  additionalTags?: string;
  ingestIfNotExists?: string;
  ingestByTags?: string[];
  dropByTags?: string[];
  flushImmediately?: boolean;
  ignoreFirstRecord?: boolean;
  reportLevel?: ReportLevel;
  reportMethod?: ReportMethod;
  validationPolicy?: ValidationPolicy;
  additionalProperties?: { [additional: string]: any } | null;
}

// This trick lets us avoid duplicating all the properties from the interface. See https://github.com/microsoft/TypeScript/issues/3407
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IngestionProperties extends IngestionPropertiesFields {}

// eslint-disable-next-line no-redeclare
export class IngestionProperties {
  constructor(data: Partial<IngestionPropertiesFields>) {
    Object.assign(this, data);
  }

  validate() {
    if (!this.database)
      throw new IngestionPropertiesValidationError("Must define a target database");
    if (!this.table) throw new IngestionPropertiesValidationError("Must define a target table");
    if (!this.format) throw new IngestionPropertiesValidationError("Must define a data format");

    if (this.ingestionMappingType && !this.ingestionMappingKind) {
      this.ingestionMappingKind = this.ingestionMappingType;
    }

    if (this.ingestionMapping && !this.ingestionMappingColumns) {
      this.ingestionMappingColumns = this.ingestionMapping;
    }

    if (!this.ingestionMappingColumns && !this.ingestionMappingReference) {
      if (this.ingestionMappingKind) {
        throw new IngestionPropertiesValidationError(
          "Cannot define ingestionMappingKind without either ingestionMappingColumns or" +
            " ingestionMappingReference"
        );
      }
    } else {
      const mappingKind = dataFormatMappingKind(this.format);
      if (this.ingestionMappingKind && this.ingestionMappingKind !== mappingKind) {
        throw new IngestionPropertiesValidationError(
          `Mapping kind '${this.ingestionMappingKind}' does not match format '${this.format}' (should be '${mappingKind}')`
        );
      }
      if (this.ingestionMappingColumns) {
        if (this.ingestionMappingReference) {
          throw new IngestionPropertiesValidationError(
            "Cannot define both ingestionMappingColumns and ingestionMappingReference"
          );
        }

        if (this.ingestionMappingColumns.length === 0) {
          throw new IngestionPropertiesValidationError("Must define at least one column mapping");
        }

        const wrongMappings = this.ingestionMappingColumns
          .filter((m) => m.mappingKind !== mappingKind)
          .map(
            (m) =>
              `Mapping kind mismatch for column '${m.columnName}' - expected data format kind -  '${mappingKind}', but was '${m.mappingKind}'`
          );
        if (wrongMappings.length > 0) {
          throw new IngestionPropertiesValidationError(
            `Invalid columns:\n${wrongMappings.join("\n")}`
          );
        }
      }
    }
  }

  merge(extraProps: IngestionPropertiesInput) {
    const merged = new IngestionProperties(this);

    if (!extraProps) {
      return merged;
    }

    const assign = <
      K extends keyof IngestionPropertiesFields,
      V extends IngestionPropertiesFields[K]
    >(
      obj: IngestionPropertiesFields,
      prop: K,
      value: V
    ) => {
      obj[prop] = value;
    };

    for (const key of Object.keys(extraProps) as (keyof IngestionPropertiesFields)[]) {
      if (extraProps[key]) {
        assign(merged, key, extraProps[key]);
      }
    }

    return merged;
  }

  setDefaults() {
    if (!this.format) {
      this.format = DataFormat.CSV;
    }
    if (!this.reportLevel) {
      this.reportLevel = ReportLevel.FailuresOnly;
    }
    if (!this.reportMethod) {
      this.reportMethod = ReportMethod.Queue;
    }
  }
}

export type IngestionPropertiesInput =
  | IngestionProperties
  | IngestionPropertiesFields
  | null
  | undefined;

export default IngestionProperties;
