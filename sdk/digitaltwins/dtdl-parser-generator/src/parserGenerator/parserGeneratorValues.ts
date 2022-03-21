// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const DTDL_CONTEXT_PREFIX = "dtmi:dtdl:context;";

export class ParserGeneratorValues {
  static referenceObverseName: string = "Reference";
  static ObverseTypeBoolean: string = "boolean";
  static IdentifierType: string = "InDTMI";
  static IdentifierStringType: string = "string";
  static PublicIdentifierType: string = "InDTMI";
  static IsPartitionMethodName: string = "isPartition";
  static ObverseTypeString: string = "string";
  static DtdlContextPrefix: string = "dtmi:dtdl:context;";
  static ElementsFileName: string = "ModelElements.g.json";
  static DtdlVersionPropertyName: string = "dtdlVersion";
  static IdentifierName: string = "id";
  static ObverseTypeInteger: string = "number";
  static ShadowPropertyPrefix: string = "original";
  static ValidateInstanceMethodName: string = "validateInstance";
  public static getDtdlContextIdString(dtdlVersion: number): string {
    return DTDL_CONTEXT_PREFIX + dtdlVersion;
  }
}
