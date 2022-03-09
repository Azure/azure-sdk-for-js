// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

/**
 * A collection of all material type names
 **/
export class MaterialTypeNameCollection {
  static typeNames: Set<string>;

  static initialize() {
    MaterialTypeNameCollection.typeNames = new Set<string>();
    MaterialTypeNameCollection.typeNames.add("Array");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Array;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Array;3");
    MaterialTypeNameCollection.typeNames.add("Boolean");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Boolean;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Boolean;3");
    MaterialTypeNameCollection.typeNames.add("Command");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Command;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Command;3");
    MaterialTypeNameCollection.typeNames.add("CommandPayload");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:CommandPayload;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:CommandPayload;3");
    MaterialTypeNameCollection.typeNames.add("CommandType");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:CommandType;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:CommandType;3");
    MaterialTypeNameCollection.typeNames.add("ComplexSchema");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:ComplexSchema;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:ComplexSchema;3");
    MaterialTypeNameCollection.typeNames.add("Component");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Component;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Component;3");
    MaterialTypeNameCollection.typeNames.add("Content");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Content;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Content;3");
    MaterialTypeNameCollection.typeNames.add("Date");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Date;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Date;3");
    MaterialTypeNameCollection.typeNames.add("DateTime");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:DateTime;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:DateTime;3");
    MaterialTypeNameCollection.typeNames.add("Double");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Double;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Double;3");
    MaterialTypeNameCollection.typeNames.add("Duration");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Duration;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Duration;3");
    MaterialTypeNameCollection.typeNames.add("Entity");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Entity;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Entity;3");
    MaterialTypeNameCollection.typeNames.add("Enum");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Enum;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Enum;3");
    MaterialTypeNameCollection.typeNames.add("EnumValue");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:EnumValue;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:EnumValue;3");
    MaterialTypeNameCollection.typeNames.add("Field");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Field;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Field;3");
    MaterialTypeNameCollection.typeNames.add("Float");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Float;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Float;3");
    MaterialTypeNameCollection.typeNames.add("Integer");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Integer;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Integer;3");
    MaterialTypeNameCollection.typeNames.add("Interface");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Interface;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Interface;3");
    MaterialTypeNameCollection.typeNames.add("Long");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Long;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Long;3");
    MaterialTypeNameCollection.typeNames.add("Map");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Map;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Map;3");
    MaterialTypeNameCollection.typeNames.add("MapKey");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:MapKey;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:MapKey;3");
    MaterialTypeNameCollection.typeNames.add("MapValue");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:MapValue;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:MapValue;3");
    MaterialTypeNameCollection.typeNames.add("NamedEntity");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:NamedEntity;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:NamedEntity;3");
    MaterialTypeNameCollection.typeNames.add("NumericSchema");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:NumericSchema;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:NumericSchema;3");
    MaterialTypeNameCollection.typeNames.add("Object");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Object;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Object;3");
    MaterialTypeNameCollection.typeNames.add("PrimitiveSchema");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:PrimitiveSchema;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:PrimitiveSchema;3");
    MaterialTypeNameCollection.typeNames.add("Property");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Property;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Property;3");
    MaterialTypeNameCollection.typeNames.add("Relationship");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Relationship;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Relationship;3");
    MaterialTypeNameCollection.typeNames.add("Schema");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Schema;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Schema;3");
    MaterialTypeNameCollection.typeNames.add("SchemaField");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:SchemaField;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:SchemaField;3");
    MaterialTypeNameCollection.typeNames.add("String");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:String;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:String;3");
    MaterialTypeNameCollection.typeNames.add("Telemetry");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Telemetry;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Telemetry;3");
    MaterialTypeNameCollection.typeNames.add("TemporalSchema");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:TemporalSchema;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:TemporalSchema;3");
    MaterialTypeNameCollection.typeNames.add("Time");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Time;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Time;3");
    MaterialTypeNameCollection.typeNames.add("Unit");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Unit;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:Unit;3");
    MaterialTypeNameCollection.typeNames.add("UnitAttribute");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:UnitAttribute;2");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:UnitAttribute;3");
    MaterialTypeNameCollection.typeNames.add("CommandRequest");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:CommandRequest;3");
    MaterialTypeNameCollection.typeNames.add("CommandResponse");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:CommandResponse;3");
    MaterialTypeNameCollection.typeNames.add("LatentType");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:LatentType;3");
    MaterialTypeNameCollection.typeNames.add("NamedLatentType");
    MaterialTypeNameCollection.typeNames.add("dtmi:dtdl:class:NamedLatentType;3");
  }

  static isMaterialType(typeString: string): boolean {
    return MaterialTypeNameCollection.typeNames.has(typeString);
  }
}

MaterialTypeNameCollection.initialize();
