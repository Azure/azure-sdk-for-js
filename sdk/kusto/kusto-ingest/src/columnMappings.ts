// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/ban-types -- We legitimately want to use {} as a "any non-nullable type" */

import { IngestionMappingKind } from "./ingestionProperties";

export enum FieldTransformation {
  PropertyBagArrayToDictionary = "PropertyBagArrayToDictionary",
  DateTimeFromUnixSeconds = "DateTimeFromUnixSeconds",
  DateTimeFromUnixMilliseconds = "DateTimeFromUnixMilliseconds",
  DateTimeFromUnixMicroseconds = "DateTimeFromUnixMicroseconds",
  DateTimeFromUnixNanoseconds = "DateTimeFromUnixNanoseconds",
}

export enum ConstantTransformation {
  SourceLocation = "SourceLocation",
  SourceLineNumber = "SourceLineNumber",
}

export type Transformation = FieldTransformation | ConstantTransformation;

interface MappingProperties {
  Field?: string;
  Path?: string;
  Ordinal?: number;
  ConstValue?: {};
  Transform?: Transformation;
}

type MappingPropertiesStrings = {
  [key in keyof MappingProperties]: string;
};

interface ApiColumnMapping {
  Column: string;
  DataType?: string;
  Properties?: MappingPropertiesStrings;
}

export abstract class ColumnMapping {
  protected constructor(
    readonly columnName: string,
    readonly cslDataType?: string,
    readonly Properties?: MappingProperties
  ) {}

  public abstract mappingKind: IngestionMappingKind;

  public toApiMapping(): ApiColumnMapping {
    const result: ApiColumnMapping = {
      Column: this.columnName,
    };
    if (this.cslDataType) {
      result.DataType = this.cslDataType;
    }

    if (this.Properties) {
      result.Properties = {};
      for (const key in this.Properties) {
        if (Object.prototype.hasOwnProperty.call(this.Properties, key)) {
          const typedKey = key as keyof MappingProperties;
          const property = this.Properties[typedKey];

          // We don't do if (property) because we '0' is a legitimate value
          if (property !== undefined && property !== null) {
            result.Properties[typedKey] = property.toString();
          }
        }
      }
    }
    return result;
  }
}

export class CsvColumnMapping extends ColumnMapping {
  /**
   * @deprecated Use the factory methods instead.
   */
  protected constructor(
    readonly columnName: string,
    readonly cslDataType?: string,
    readonly ordinal?: string,
    constantValue?: {}
  ) {
    super(columnName, cslDataType, {
      Ordinal: ordinal === undefined ? undefined : parseInt(ordinal, 10),
      ConstValue: constantValue,
    });
  }

  public static withOrdinal(
    columnName: string,
    ordinal: number,
    cslDataType?: string
  ): CsvColumnMapping {
    return new CsvColumnMapping(columnName, cslDataType, ordinal.toString());
  }

  public static withConstantValue(
    columnName: string,
    constantValue: {},
    cslDataType?: string
  ): CsvColumnMapping {
    return new CsvColumnMapping(columnName, cslDataType, undefined, constantValue);
  }

  mappingKind = IngestionMappingKind.CSV;
}

export class JsonColumnMapping extends ColumnMapping {
  /**
   * @deprecated Use the factory methods instead.
   */
  constructor(
    readonly columnName: string,
    readonly jsonPath?: string,
    cslDataType: string | null = null,
    constantValue?: {},
    transform?: Transformation
  ) {
    super(columnName, cslDataType ?? undefined, {
      Path: jsonPath,
      ConstValue: constantValue,
      Transform: transform,
    });
  }

  public static withPath(
    columnName: string,
    path: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): JsonColumnMapping {
    return new JsonColumnMapping(columnName, path, cslDataType, undefined, transform);
  }

  public static withConstantValue(
    columnName: string,
    constantValue: {},
    cslDataType?: string
  ): JsonColumnMapping {
    return new JsonColumnMapping(columnName, undefined, cslDataType, constantValue);
  }

  public static withTransform(
    columnName: string,
    transform: ConstantTransformation,
    cslDataType?: string
  ): JsonColumnMapping {
    return new JsonColumnMapping(columnName, undefined, cslDataType, undefined, transform);
  }

  mappingKind = IngestionMappingKind.JSON;
}

export class AvroColumnMapping extends ColumnMapping {
  private constructor(
    readonly columnName: string,
    cslDataType?: string,
    path?: string,
    field?: string,
    constantValue?: {},
    transform?: Transformation
  ) {
    super(columnName, cslDataType ?? undefined, {
      Path: path,
      Field: field,
      ConstValue: constantValue,
      Transform: transform,
    });
  }

  public static withPath(
    columnName: string,
    path: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): AvroColumnMapping {
    return new AvroColumnMapping(columnName, cslDataType, path, undefined, undefined, transform);
  }

  public static withField(
    columnName: string,
    field: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): AvroColumnMapping {
    return new AvroColumnMapping(columnName, cslDataType, undefined, field, undefined, transform);
  }

  public static withConstantValue(
    columnName: string,
    constantValue: {},
    cslDataType?: string
  ): AvroColumnMapping {
    return new AvroColumnMapping(columnName, cslDataType, undefined, undefined, constantValue);
  }

  public static withTransform(
    columnName: string,
    transform: ConstantTransformation,
    cslDataType?: string
  ): AvroColumnMapping {
    return new AvroColumnMapping(
      columnName,
      cslDataType,
      undefined,
      undefined,
      undefined,
      transform
    );
  }

  mappingKind = IngestionMappingKind.AVRO;
}

export class ApacheAvroColumnMapping extends ColumnMapping {
  private constructor(
    readonly columnName: string,
    cslDataType?: string,
    path?: string,
    field?: string,
    constantValue?: {},
    transform?: Transformation
  ) {
    super(columnName, cslDataType ?? undefined, {
      Path: path,
      Field: field,
      ConstValue: constantValue,
      Transform: transform,
    });
  }

  public static withPath(
    columnName: string,
    path: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): ApacheAvroColumnMapping {
    return new ApacheAvroColumnMapping(
      columnName,
      cslDataType,
      path,
      undefined,
      undefined,
      transform
    );
  }

  public static withField(
    columnName: string,
    field: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): ApacheAvroColumnMapping {
    return new ApacheAvroColumnMapping(
      columnName,
      cslDataType,
      undefined,
      field,
      undefined,
      transform
    );
  }

  public static withConstantValue(
    columnName: string,
    constantValue: {},
    cslDataType?: string
  ): ApacheAvroColumnMapping {
    return new ApacheAvroColumnMapping(
      columnName,
      cslDataType,
      undefined,
      undefined,
      constantValue
    );
  }

  public static withTransform(
    columnName: string,
    transform: ConstantTransformation,
    cslDataType?: string
  ): ApacheAvroColumnMapping {
    return new ApacheAvroColumnMapping(
      columnName,
      cslDataType,
      undefined,
      undefined,
      undefined,
      transform
    );
  }

  mappingKind = IngestionMappingKind.APACHEAVRO;
}

export class SStreamColumnMapping extends ColumnMapping {
  private constructor(
    readonly columnName: string,
    cslDataType?: string,
    path?: string,
    field?: string,
    constantValue?: {},
    transform?: Transformation
  ) {
    super(columnName, cslDataType ?? undefined, {
      Path: path,
      Field: field,
      ConstValue: constantValue,
      Transform: transform,
    });
  }

  public static withPath(
    columnName: string,
    path: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): SStreamColumnMapping {
    return new SStreamColumnMapping(columnName, cslDataType, path, undefined, undefined, transform);
  }

  public static withField(
    columnName: string,
    field: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): SStreamColumnMapping {
    return new SStreamColumnMapping(
      columnName,
      cslDataType,
      undefined,
      field,
      undefined,
      transform
    );
  }

  public static withConstantValue(
    columnName: string,
    constantValue: {},
    cslDataType?: string
  ): SStreamColumnMapping {
    return new SStreamColumnMapping(columnName, cslDataType, undefined, undefined, constantValue);
  }

  public static withTransform(
    columnName: string,
    transform: ConstantTransformation,
    cslDataType?: string
  ): SStreamColumnMapping {
    return new SStreamColumnMapping(
      columnName,
      cslDataType,
      undefined,
      undefined,
      undefined,
      transform
    );
  }

  mappingKind = IngestionMappingKind.SSTREAM;
}

export class ParquetColumnMapping extends ColumnMapping {
  private constructor(
    readonly columnName: string,
    cslDataType?: string,
    path?: string,
    field?: string,
    constantValue?: {},
    transform?: Transformation
  ) {
    super(columnName, cslDataType ?? undefined, {
      Path: path,
      Field: field,
      ConstValue: constantValue,
      Transform: transform,
    });
  }

  public static withPath(
    columnName: string,
    path: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): ParquetColumnMapping {
    return new ParquetColumnMapping(columnName, cslDataType, path, undefined, undefined, transform);
  }

  public static withField(
    columnName: string,
    field: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): ParquetColumnMapping {
    return new ParquetColumnMapping(
      columnName,
      cslDataType,
      undefined,
      field,
      undefined,
      transform
    );
  }

  public static withConstantValue(
    columnName: string,
    constantValue: {},
    cslDataType?: string
  ): ParquetColumnMapping {
    return new ParquetColumnMapping(columnName, cslDataType, undefined, undefined, constantValue);
  }

  public static withTransform(
    columnName: string,
    transform: ConstantTransformation,
    cslDataType?: string
  ): ParquetColumnMapping {
    return new ParquetColumnMapping(
      columnName,
      cslDataType,
      undefined,
      undefined,
      undefined,
      transform
    );
  }

  mappingKind = IngestionMappingKind.PARQUET;
}

export class OrcColumnMapping extends ColumnMapping {
  private constructor(
    readonly columnName: string,
    cslDataType?: string,
    path?: string,
    field?: string,
    constantValue?: {},
    transform?: Transformation
  ) {
    super(columnName, cslDataType ?? undefined, {
      Path: path,
      Field: field,
      ConstValue: constantValue,
      Transform: transform,
    });
  }

  public static withPath(
    columnName: string,
    path: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): OrcColumnMapping {
    return new OrcColumnMapping(columnName, cslDataType, path, undefined, undefined, transform);
  }

  public static withField(
    columnName: string,
    field: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): OrcColumnMapping {
    return new OrcColumnMapping(columnName, cslDataType, undefined, field, undefined, transform);
  }

  public static withConstantValue(
    columnName: string,
    constantValue: {},
    cslDataType?: string
  ): OrcColumnMapping {
    return new OrcColumnMapping(columnName, cslDataType, undefined, undefined, constantValue);
  }

  public static withTransform(
    columnName: string,
    transform: ConstantTransformation,
    cslDataType?: string
  ): OrcColumnMapping {
    return new OrcColumnMapping(
      columnName,
      cslDataType,
      undefined,
      undefined,
      undefined,
      transform
    );
  }

  mappingKind = IngestionMappingKind.ORC;
}

export class W3CLogFileMapping extends ColumnMapping {
  private constructor(
    readonly columnName: string,
    cslDataType?: string,
    field?: string,
    constantValue?: {},
    transform?: Transformation
  ) {
    super(columnName, cslDataType ?? undefined, {
      Field: field,
      ConstValue: constantValue,
      Transform: transform,
    });
  }

  public static withField(
    columnName: string,
    field: string,
    cslDataType?: string,
    transform?: FieldTransformation
  ): W3CLogFileMapping {
    return new W3CLogFileMapping(columnName, cslDataType, field, undefined, transform);
  }

  public static withConstantValue(
    columnName: string,
    constantValue: {},
    cslDataType?: string
  ): W3CLogFileMapping {
    return new W3CLogFileMapping(columnName, cslDataType, undefined, constantValue);
  }

  public static withTransform(
    columnName: string,
    transform: ConstantTransformation,
    cslDataType?: string
  ): W3CLogFileMapping {
    return new W3CLogFileMapping(columnName, cslDataType, undefined, undefined, transform);
  }

  mappingKind = IngestionMappingKind.W3CLOGFILE;
}
