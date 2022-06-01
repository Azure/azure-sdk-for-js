// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

/* eslint-disable camelcase */
import {
  ContextHistory,
  InDTMI,
  ParsingError,
  createParsingError,
  ParsingException,
  VersionedContext
} from "./internal";
import { IdValidator } from "./internal";
type TermDict = { [term: string]: InDTMI };
type PrefixDict = { [prefix: string]: string };
/**
 * Class for parsing and storing information from JSON-LD context blocks.
 **/
export class AggregateContext {
  private static _dtdlVersionsAllowingLocalTerms: number[] = [0];
  static _affiliateContextsImplicitDtdlVersions: { [x: string]: number } = {};

  static initialize() {
    this._affiliateContextsImplicitDtdlVersions["dtmi:iotcentral:context;2"] = 2;

    this._dtdlContextHistory = AggregateContext._getDtdlContextHistory();
    AggregateContext._affiliateContextHistories = {};
    AggregateContext._affiliateContextHistories[
      "dtmi:iotcentral:context"
    ] = AggregateContext._getAffiliate0ContextHistory();
    AggregateContext._affiliateContextHistories[
      "dtmi:dtdl:extension:layering"
    ] = AggregateContext._getAffiliate1ContextHistory();
    AggregateContext._affiliateContextHistories[
      "dtmi:dtdl:extension:initialization"
    ] = AggregateContext._getAffiliate2ContextHistory();
    AggregateContext._affiliateContextHistories[
      "dtmi:dtdl:extension:historization"
    ] = AggregateContext._getAffiliate3ContextHistory();
  }

  static _getDtdlContextHistory(): ContextHistory {
    const versionedContexts: VersionedContext[] = [];
    const context2_0 = new VersionedContext(2, 0);
    context2_0.addDefinition("Array", new InDTMI("dtmi:dtdl:class:Array;2"));
    context2_0.addDefinition("Boolean", new InDTMI("dtmi:dtdl:class:Boolean;2"));
    context2_0.addDefinition("ComplexSchema", new InDTMI("dtmi:dtdl:class:ComplexSchema;2"));
    context2_0.addDefinition("Command", new InDTMI("dtmi:dtdl:class:Command;2"));
    context2_0.addDefinition("CommandPayload", new InDTMI("dtmi:dtdl:class:CommandPayload;2"));
    context2_0.addDefinition("CommandType", new InDTMI("dtmi:dtdl:class:CommandType;2"));
    context2_0.addDefinition("Component", new InDTMI("dtmi:dtdl:class:Component;2"));
    context2_0.addDefinition("Content", new InDTMI("dtmi:dtdl:class:Content;2"));
    context2_0.addDefinition("Date", new InDTMI("dtmi:dtdl:class:Date;2"));
    context2_0.addDefinition("DateTime", new InDTMI("dtmi:dtdl:class:DateTime;2"));
    context2_0.addDefinition("Double", new InDTMI("dtmi:dtdl:class:Double;2"));
    context2_0.addDefinition("Duration", new InDTMI("dtmi:dtdl:class:Duration;2"));
    context2_0.addDefinition("Entity", new InDTMI("dtmi:dtdl:class:Entity;2"));
    context2_0.addDefinition("Enum", new InDTMI("dtmi:dtdl:class:Enum;2"));
    context2_0.addDefinition("EnumValue", new InDTMI("dtmi:dtdl:class:EnumValue;2"));
    context2_0.addDefinition("Field", new InDTMI("dtmi:dtdl:class:Field;2"));
    context2_0.addDefinition("Float", new InDTMI("dtmi:dtdl:class:Float;2"));
    context2_0.addDefinition("Integer", new InDTMI("dtmi:dtdl:class:Integer;2"));
    context2_0.addDefinition("Interface", new InDTMI("dtmi:dtdl:class:Interface;2"));
    context2_0.addDefinition("Long", new InDTMI("dtmi:dtdl:class:Long;2"));
    context2_0.addDefinition("Map", new InDTMI("dtmi:dtdl:class:Map;2"));
    context2_0.addDefinition("MapKey", new InDTMI("dtmi:dtdl:class:MapKey;2"));
    context2_0.addDefinition("MapValue", new InDTMI("dtmi:dtdl:class:MapValue;2"));
    context2_0.addDefinition("NamedEntity", new InDTMI("dtmi:dtdl:class:NamedEntity;2"));
    context2_0.addDefinition("NumericSchema", new InDTMI("dtmi:dtdl:class:NumericSchema;2"));
    context2_0.addDefinition("Object", new InDTMI("dtmi:dtdl:class:Object;2"));
    context2_0.addDefinition("PrimitiveSchema", new InDTMI("dtmi:dtdl:class:PrimitiveSchema;2"));
    context2_0.addDefinition("Property", new InDTMI("dtmi:dtdl:class:Property;2"));
    context2_0.addDefinition("Relationship", new InDTMI("dtmi:dtdl:class:Relationship;2"));
    context2_0.addDefinition("Schema", new InDTMI("dtmi:dtdl:class:Schema;2"));
    context2_0.addDefinition("SchemaField", new InDTMI("dtmi:dtdl:class:SchemaField;2"));
    context2_0.addDefinition("SemanticType", new InDTMI("dtmi:dtdl:class:SemanticType;2"));
    context2_0.addDefinition("SemanticUnit", new InDTMI("dtmi:dtdl:class:SemanticUnit;2"));
    context2_0.addDefinition("String", new InDTMI("dtmi:dtdl:class:String;2"));
    context2_0.addDefinition("Telemetry", new InDTMI("dtmi:dtdl:class:Telemetry;2"));
    context2_0.addDefinition("TemporalSchema", new InDTMI("dtmi:dtdl:class:TemporalSchema;2"));
    context2_0.addDefinition("Time", new InDTMI("dtmi:dtdl:class:Time;2"));
    context2_0.addDefinition("Unit", new InDTMI("dtmi:dtdl:class:Unit;2"));
    context2_0.addDefinition("UnitAttribute", new InDTMI("dtmi:dtdl:class:UnitAttribute;2"));
    context2_0.addDefinition("RatioUnit", new InDTMI("dtmi:standard:class:RatioUnit;2"));
    context2_0.addDefinition("DecimalUnit", new InDTMI("dtmi:standard:class:DecimalUnit;2"));
    context2_0.addDefinition("DecimalPrefix", new InDTMI("dtmi:standard:class:DecimalPrefix;2"));
    context2_0.addDefinition("BinaryUnit", new InDTMI("dtmi:standard:class:BinaryUnit;2"));
    context2_0.addDefinition("BinaryPrefix", new InDTMI("dtmi:standard:class:BinaryPrefix;2"));
    context2_0.addDefinition(
      "QuantitativeType",
      new InDTMI("dtmi:standard:class:QuantitativeType;2")
    );
    context2_0.addDefinition("Acceleration", new InDTMI("dtmi:standard:class:Acceleration;2"));
    context2_0.addDefinition("Angle", new InDTMI("dtmi:standard:class:Angle;2"));
    context2_0.addDefinition(
      "AngularAcceleration",
      new InDTMI("dtmi:standard:class:AngularAcceleration;2")
    );
    context2_0.addDefinition(
      "AngularVelocity",
      new InDTMI("dtmi:standard:class:AngularVelocity;2")
    );
    context2_0.addDefinition("Area", new InDTMI("dtmi:standard:class:Area;2"));
    context2_0.addDefinition("Capacitance", new InDTMI("dtmi:standard:class:Capacitance;2"));
    context2_0.addDefinition("Current", new InDTMI("dtmi:standard:class:Current;2"));
    context2_0.addDefinition("DataRate", new InDTMI("dtmi:standard:class:DataRate;2"));
    context2_0.addDefinition("DataSize", new InDTMI("dtmi:standard:class:DataSize;2"));
    context2_0.addDefinition("Density", new InDTMI("dtmi:standard:class:Density;2"));
    context2_0.addDefinition("Distance", new InDTMI("dtmi:standard:class:Distance;2"));
    context2_0.addDefinition("ElectricCharge", new InDTMI("dtmi:standard:class:ElectricCharge;2"));
    context2_0.addDefinition("Energy", new InDTMI("dtmi:standard:class:Energy;2"));
    context2_0.addDefinition("Force", new InDTMI("dtmi:standard:class:Force;2"));
    context2_0.addDefinition("Frequency", new InDTMI("dtmi:standard:class:Frequency;2"));
    context2_0.addDefinition("Humidity", new InDTMI("dtmi:standard:class:Humidity;2"));
    context2_0.addDefinition("Illuminance", new InDTMI("dtmi:standard:class:Illuminance;2"));
    context2_0.addDefinition("Inductance", new InDTMI("dtmi:standard:class:Inductance;2"));
    context2_0.addDefinition("Latitude", new InDTMI("dtmi:standard:class:Latitude;2"));
    context2_0.addDefinition("Longitude", new InDTMI("dtmi:standard:class:Longitude;2"));
    context2_0.addDefinition("Length", new InDTMI("dtmi:standard:class:Length;2"));
    context2_0.addDefinition("Luminance", new InDTMI("dtmi:standard:class:Luminance;2"));
    context2_0.addDefinition("Luminosity", new InDTMI("dtmi:standard:class:Luminosity;2"));
    context2_0.addDefinition("LuminousFlux", new InDTMI("dtmi:standard:class:LuminousFlux;2"));
    context2_0.addDefinition(
      "LuminousIntensity",
      new InDTMI("dtmi:standard:class:LuminousIntensity;2")
    );
    context2_0.addDefinition("MagneticFlux", new InDTMI("dtmi:standard:class:MagneticFlux;2"));
    context2_0.addDefinition(
      "MagneticInduction",
      new InDTMI("dtmi:standard:class:MagneticInduction;2")
    );
    context2_0.addDefinition("Mass", new InDTMI("dtmi:standard:class:Mass;2"));
    context2_0.addDefinition("MassFlowRate", new InDTMI("dtmi:standard:class:MassFlowRate;2"));
    context2_0.addDefinition("Power", new InDTMI("dtmi:standard:class:Power;2"));
    context2_0.addDefinition("Pressure", new InDTMI("dtmi:standard:class:Pressure;2"));
    context2_0.addDefinition(
      "RelativeHumidity",
      new InDTMI("dtmi:standard:class:RelativeHumidity;2")
    );
    context2_0.addDefinition("Resistance", new InDTMI("dtmi:standard:class:Resistance;2"));
    context2_0.addDefinition("SoundPressure", new InDTMI("dtmi:standard:class:SoundPressure;2"));
    context2_0.addDefinition("Temperature", new InDTMI("dtmi:standard:class:Temperature;2"));
    context2_0.addDefinition("Thrust", new InDTMI("dtmi:standard:class:Thrust;2"));
    context2_0.addDefinition("TimeSpan", new InDTMI("dtmi:standard:class:TimeSpan;2"));
    context2_0.addDefinition("Torque", new InDTMI("dtmi:standard:class:Torque;2"));
    context2_0.addDefinition("Velocity", new InDTMI("dtmi:standard:class:Velocity;2"));
    context2_0.addDefinition("Voltage", new InDTMI("dtmi:standard:class:Voltage;2"));
    context2_0.addDefinition("Volume", new InDTMI("dtmi:standard:class:Volume;2"));
    context2_0.addDefinition("VolumeFlowRate", new InDTMI("dtmi:standard:class:VolumeFlowRate;2"));
    context2_0.addDefinition(
      "AccelerationUnit",
      new InDTMI("dtmi:standard:class:AccelerationUnit;2")
    );
    context2_0.addDefinition("AngleUnit", new InDTMI("dtmi:standard:class:AngleUnit;2"));
    context2_0.addDefinition(
      "AngularAccelerationUnit",
      new InDTMI("dtmi:standard:class:AngularAccelerationUnit;2")
    );
    context2_0.addDefinition(
      "AngularVelocityUnit",
      new InDTMI("dtmi:standard:class:AngularVelocityUnit;2")
    );
    context2_0.addDefinition("AreaUnit", new InDTMI("dtmi:standard:class:AreaUnit;2"));
    context2_0.addDefinition(
      "CapacitanceUnit",
      new InDTMI("dtmi:standard:class:CapacitanceUnit;2")
    );
    context2_0.addDefinition("ChargeUnit", new InDTMI("dtmi:standard:class:ChargeUnit;2"));
    context2_0.addDefinition("CurrentUnit", new InDTMI("dtmi:standard:class:CurrentUnit;2"));
    context2_0.addDefinition("DataRateUnit", new InDTMI("dtmi:standard:class:DataRateUnit;2"));
    context2_0.addDefinition("DataSizeUnit", new InDTMI("dtmi:standard:class:DataSizeUnit;2"));
    context2_0.addDefinition("DensityUnit", new InDTMI("dtmi:standard:class:DensityUnit;2"));
    context2_0.addDefinition("EnergyUnit", new InDTMI("dtmi:standard:class:EnergyUnit;2"));
    context2_0.addDefinition("ForceUnit", new InDTMI("dtmi:standard:class:ForceUnit;2"));
    context2_0.addDefinition("FrequencyUnit", new InDTMI("dtmi:standard:class:FrequencyUnit;2"));
    context2_0.addDefinition(
      "IlluminanceUnit",
      new InDTMI("dtmi:standard:class:IlluminanceUnit;2")
    );
    context2_0.addDefinition("InductanceUnit", new InDTMI("dtmi:standard:class:InductanceUnit;2"));
    context2_0.addDefinition("LengthUnit", new InDTMI("dtmi:standard:class:LengthUnit;2"));
    context2_0.addDefinition("LuminanceUnit", new InDTMI("dtmi:standard:class:LuminanceUnit;2"));
    context2_0.addDefinition(
      "LuminousFluxUnit",
      new InDTMI("dtmi:standard:class:LuminousFluxUnit;2")
    );
    context2_0.addDefinition(
      "LuminousIntensityUnit",
      new InDTMI("dtmi:standard:class:LuminousIntensityUnit;2")
    );
    context2_0.addDefinition(
      "MagneticFluxUnit",
      new InDTMI("dtmi:standard:class:MagneticFluxUnit;2")
    );
    context2_0.addDefinition(
      "MagneticInductionUnit",
      new InDTMI("dtmi:standard:class:MagneticInductionUnit;2")
    );
    context2_0.addDefinition("MassUnit", new InDTMI("dtmi:standard:class:MassUnit;2"));
    context2_0.addDefinition(
      "MassFlowRateUnit",
      new InDTMI("dtmi:standard:class:MassFlowRateUnit;2")
    );
    context2_0.addDefinition("PowerUnit", new InDTMI("dtmi:standard:class:PowerUnit;2"));
    context2_0.addDefinition("PressureUnit", new InDTMI("dtmi:standard:class:PressureUnit;2"));
    context2_0.addDefinition("ResistanceUnit", new InDTMI("dtmi:standard:class:ResistanceUnit;2"));
    context2_0.addDefinition(
      "SoundPressureUnit",
      new InDTMI("dtmi:standard:class:SoundPressureUnit;2")
    );
    context2_0.addDefinition(
      "TemperatureUnit",
      new InDTMI("dtmi:standard:class:TemperatureUnit;2")
    );
    context2_0.addDefinition("TimeUnit", new InDTMI("dtmi:standard:class:TimeUnit;2"));
    context2_0.addDefinition("TorqueUnit", new InDTMI("dtmi:standard:class:TorqueUnit;2"));
    context2_0.addDefinition("Unitless", new InDTMI("dtmi:standard:class:Unitless;2"));
    context2_0.addDefinition("VelocityUnit", new InDTMI("dtmi:standard:class:VelocityUnit;2"));
    context2_0.addDefinition("VoltageUnit", new InDTMI("dtmi:standard:class:VoltageUnit;2"));
    context2_0.addDefinition("VolumeUnit", new InDTMI("dtmi:standard:class:VolumeUnit;2"));
    context2_0.addDefinition(
      "VolumeFlowRateUnit",
      new InDTMI("dtmi:standard:class:VolumeFlowRateUnit;2")
    );
    context2_0.addDefinition("baseUnit", new InDTMI("dtmi:dtdl:property:baseUnit;2"));
    context2_0.addDefinition("bottomUnit", new InDTMI("dtmi:dtdl:property:bottomUnit;2"));
    context2_0.addDefinition("commandType", new InDTMI("dtmi:dtdl:property:commandType;2"));
    context2_0.addDefinition("comment", new InDTMI("dtmi:dtdl:property:comment;2"));
    context2_0.addDefinition("contents", new InDTMI("dtmi:dtdl:property:contents;2"));
    context2_0.addDefinition("description", new InDTMI("dtmi:dtdl:property:description;2"));
    context2_0.addDefinition("displayName", new InDTMI("dtmi:dtdl:property:displayName;2"));
    context2_0.addDefinition("elementSchema", new InDTMI("dtmi:dtdl:property:elementSchema;2"));
    context2_0.addDefinition("enumValue", new InDTMI("dtmi:dtdl:property:enumValue;2"));
    context2_0.addDefinition("enumValues", new InDTMI("dtmi:dtdl:property:enumValues;2"));
    context2_0.addDefinition("exponent", new InDTMI("dtmi:dtdl:property:exponent;2"));
    context2_0.addDefinition("extends", new InDTMI("dtmi:dtdl:property:extends;2"));
    context2_0.addDefinition("fields", new InDTMI("dtmi:dtdl:property:fields;2"));
    context2_0.addDefinition("languageVersion", new InDTMI("dtmi:dtdl:property:languageVersion;2"));
    context2_0.addDefinition("mapKey", new InDTMI("dtmi:dtdl:property:mapKey;2"));
    context2_0.addDefinition("mapValue", new InDTMI("dtmi:dtdl:property:mapValue;2"));
    context2_0.addDefinition("maxMultiplicity", new InDTMI("dtmi:dtdl:property:maxMultiplicity;2"));
    context2_0.addDefinition("minMultiplicity", new InDTMI("dtmi:dtdl:property:minMultiplicity;2"));
    context2_0.addDefinition("name", new InDTMI("dtmi:dtdl:property:name;2"));
    context2_0.addDefinition("prefix", new InDTMI("dtmi:dtdl:property:prefix;2"));
    context2_0.addDefinition("properties", new InDTMI("dtmi:dtdl:property:properties;2"));
    context2_0.addDefinition("request", new InDTMI("dtmi:dtdl:property:request;2"));
    context2_0.addDefinition("response", new InDTMI("dtmi:dtdl:property:response;2"));
    context2_0.addDefinition("schema", new InDTMI("dtmi:dtdl:property:schema;2"));
    context2_0.addDefinition("schemas", new InDTMI("dtmi:dtdl:property:schemas;2"));
    context2_0.addDefinition("symbol", new InDTMI("dtmi:dtdl:property:symbol;2"));
    context2_0.addDefinition("target", new InDTMI("dtmi:dtdl:property:target;2"));
    context2_0.addDefinition("topUnit", new InDTMI("dtmi:dtdl:property:topUnit;2"));
    context2_0.addDefinition("unit", new InDTMI("dtmi:dtdl:property:unit;2"));
    context2_0.addDefinition("valueSchema", new InDTMI("dtmi:dtdl:property:valueSchema;2"));
    context2_0.addDefinition("writable", new InDTMI("dtmi:dtdl:property:writable;2"));
    context2_0.addDefinition(
      "asynchronous",
      new InDTMI("dtmi:dtdl:instance:CommandType:asynchronous;2")
    );
    context2_0.addDefinition(
      "synchronous",
      new InDTMI("dtmi:dtdl:instance:CommandType:synchronous;2")
    );
    context2_0.addDefinition("boolean", new InDTMI("dtmi:dtdl:instance:Schema:boolean;2"));
    context2_0.addDefinition("date", new InDTMI("dtmi:dtdl:instance:Schema:date;2"));
    context2_0.addDefinition("dateTime", new InDTMI("dtmi:dtdl:instance:Schema:dateTime;2"));
    context2_0.addDefinition("double", new InDTMI("dtmi:dtdl:instance:Schema:double;2"));
    context2_0.addDefinition("duration", new InDTMI("dtmi:dtdl:instance:Schema:duration;2"));
    context2_0.addDefinition("float", new InDTMI("dtmi:dtdl:instance:Schema:float;2"));
    context2_0.addDefinition("integer", new InDTMI("dtmi:dtdl:instance:Schema:integer;2"));
    context2_0.addDefinition("long", new InDTMI("dtmi:dtdl:instance:Schema:long;2"));
    context2_0.addDefinition("string", new InDTMI("dtmi:dtdl:instance:Schema:string;2"));
    context2_0.addDefinition("time", new InDTMI("dtmi:dtdl:instance:Schema:time;2"));
    context2_0.addDefinition("deci", new InDTMI("dtmi:standard:unitprefix:deci;2"));
    context2_0.addDefinition("centi", new InDTMI("dtmi:standard:unitprefix:centi;2"));
    context2_0.addDefinition("milli", new InDTMI("dtmi:standard:unitprefix:milli;2"));
    context2_0.addDefinition("micro", new InDTMI("dtmi:standard:unitprefix:micro;2"));
    context2_0.addDefinition("nano", new InDTMI("dtmi:standard:unitprefix:nano;2"));
    context2_0.addDefinition("pico", new InDTMI("dtmi:standard:unitprefix:pico;2"));
    context2_0.addDefinition("femto", new InDTMI("dtmi:standard:unitprefix:femto;2"));
    context2_0.addDefinition("atto", new InDTMI("dtmi:standard:unitprefix:atto;2"));
    context2_0.addDefinition("zepto", new InDTMI("dtmi:standard:unitprefix:zepto;2"));
    context2_0.addDefinition("yocto", new InDTMI("dtmi:standard:unitprefix:yocto;2"));
    context2_0.addDefinition("deka", new InDTMI("dtmi:standard:unitprefix:deka;2"));
    context2_0.addDefinition("hecto", new InDTMI("dtmi:standard:unitprefix:hecto;2"));
    context2_0.addDefinition("kilo", new InDTMI("dtmi:standard:unitprefix:kilo;2"));
    context2_0.addDefinition("mega", new InDTMI("dtmi:standard:unitprefix:mega;2"));
    context2_0.addDefinition("giga", new InDTMI("dtmi:standard:unitprefix:giga;2"));
    context2_0.addDefinition("tera", new InDTMI("dtmi:standard:unitprefix:tera;2"));
    context2_0.addDefinition("peta", new InDTMI("dtmi:standard:unitprefix:peta;2"));
    context2_0.addDefinition("exa", new InDTMI("dtmi:standard:unitprefix:exa;2"));
    context2_0.addDefinition("zetta", new InDTMI("dtmi:standard:unitprefix:zetta;2"));
    context2_0.addDefinition("yotta", new InDTMI("dtmi:standard:unitprefix:yotta;2"));
    context2_0.addDefinition("kibi", new InDTMI("dtmi:standard:unitprefix:kibi;2"));
    context2_0.addDefinition("mebi", new InDTMI("dtmi:standard:unitprefix:mebi;2"));
    context2_0.addDefinition("gibi", new InDTMI("dtmi:standard:unitprefix:gibi;2"));
    context2_0.addDefinition("tebi", new InDTMI("dtmi:standard:unitprefix:tebi;2"));
    context2_0.addDefinition("pebi", new InDTMI("dtmi:standard:unitprefix:pebi;2"));
    context2_0.addDefinition("exbi", new InDTMI("dtmi:standard:unitprefix:exbi;2"));
    context2_0.addDefinition("zebi", new InDTMI("dtmi:standard:unitprefix:zebi;2"));
    context2_0.addDefinition("yobi", new InDTMI("dtmi:standard:unitprefix:yobi;2"));
    context2_0.addDefinition(
      "metrePerSecondSquared",
      new InDTMI("dtmi:standard:unit:metrePerSecondSquared;2")
    );
    context2_0.addDefinition(
      "centimetrePerSecondSquared",
      new InDTMI("dtmi:standard:unit:centimetrePerSecondSquared;2")
    );
    context2_0.addDefinition("gForce", new InDTMI("dtmi:standard:unit:gForce;2"));
    context2_0.addDefinition("radian", new InDTMI("dtmi:standard:unit:radian;2"));
    context2_0.addDefinition("degreeOfArc", new InDTMI("dtmi:standard:unit:degreeOfArc;2"));
    context2_0.addDefinition("minuteOfArc", new InDTMI("dtmi:standard:unit:minuteOfArc;2"));
    context2_0.addDefinition("secondOfArc", new InDTMI("dtmi:standard:unit:secondOfArc;2"));
    context2_0.addDefinition("turn", new InDTMI("dtmi:standard:unit:turn;2"));
    context2_0.addDefinition(
      "radianPerSecondSquared",
      new InDTMI("dtmi:standard:unit:radianPerSecondSquared;2")
    );
    context2_0.addDefinition("radianPerSecond", new InDTMI("dtmi:standard:unit:radianPerSecond;2"));
    context2_0.addDefinition("degreePerSecond", new InDTMI("dtmi:standard:unit:degreePerSecond;2"));
    context2_0.addDefinition(
      "revolutionPerSecond",
      new InDTMI("dtmi:standard:unit:revolutionPerSecond;2")
    );
    context2_0.addDefinition(
      "revolutionPerMinute",
      new InDTMI("dtmi:standard:unit:revolutionPerMinute;2")
    );
    context2_0.addDefinition("squareMetre", new InDTMI("dtmi:standard:unit:squareMetre;2"));
    context2_0.addDefinition(
      "squareCentimetre",
      new InDTMI("dtmi:standard:unit:squareCentimetre;2")
    );
    context2_0.addDefinition(
      "squareMillimetre",
      new InDTMI("dtmi:standard:unit:squareMillimetre;2")
    );
    context2_0.addDefinition("squareKilometre", new InDTMI("dtmi:standard:unit:squareKilometre;2"));
    context2_0.addDefinition("hectare", new InDTMI("dtmi:standard:unit:hectare;2"));
    context2_0.addDefinition("squareFoot", new InDTMI("dtmi:standard:unit:squareFoot;2"));
    context2_0.addDefinition("squareInch", new InDTMI("dtmi:standard:unit:squareInch;2"));
    context2_0.addDefinition("acre", new InDTMI("dtmi:standard:unit:acre;2"));
    context2_0.addDefinition("farad", new InDTMI("dtmi:standard:unit:farad;2"));
    context2_0.addDefinition("millifarad", new InDTMI("dtmi:standard:unit:millifarad;2"));
    context2_0.addDefinition("microfarad", new InDTMI("dtmi:standard:unit:microfarad;2"));
    context2_0.addDefinition("nanofarad", new InDTMI("dtmi:standard:unit:nanofarad;2"));
    context2_0.addDefinition("picofarad", new InDTMI("dtmi:standard:unit:picofarad;2"));
    context2_0.addDefinition("coulomb", new InDTMI("dtmi:standard:unit:coulomb;2"));
    context2_0.addDefinition("ampere", new InDTMI("dtmi:standard:unit:ampere;2"));
    context2_0.addDefinition("microampere", new InDTMI("dtmi:standard:unit:microampere;2"));
    context2_0.addDefinition("milliampere", new InDTMI("dtmi:standard:unit:milliampere;2"));
    context2_0.addDefinition("bitPerSecond", new InDTMI("dtmi:standard:unit:bitPerSecond;2"));
    context2_0.addDefinition(
      "kibibitPerSecond",
      new InDTMI("dtmi:standard:unit:kibibitPerSecond;2")
    );
    context2_0.addDefinition(
      "mebibitPerSecond",
      new InDTMI("dtmi:standard:unit:mebibitPerSecond;2")
    );
    context2_0.addDefinition(
      "gibibitPerSecond",
      new InDTMI("dtmi:standard:unit:gibibitPerSecond;2")
    );
    context2_0.addDefinition(
      "tebibitPerSecond",
      new InDTMI("dtmi:standard:unit:tebibitPerSecond;2")
    );
    context2_0.addDefinition(
      "exbibitPerSecond",
      new InDTMI("dtmi:standard:unit:exbibitPerSecond;2")
    );
    context2_0.addDefinition(
      "zebibitPerSecond",
      new InDTMI("dtmi:standard:unit:zebibitPerSecond;2")
    );
    context2_0.addDefinition(
      "yobibitPerSecond",
      new InDTMI("dtmi:standard:unit:yobibitPerSecond;2")
    );
    context2_0.addDefinition("bytePerSecond", new InDTMI("dtmi:standard:unit:bytePerSecond;2"));
    context2_0.addDefinition(
      "kibibytePerSecond",
      new InDTMI("dtmi:standard:unit:kibibytePerSecond;2")
    );
    context2_0.addDefinition(
      "mebibytePerSecond",
      new InDTMI("dtmi:standard:unit:mebibytePerSecond;2")
    );
    context2_0.addDefinition(
      "gibibytePerSecond",
      new InDTMI("dtmi:standard:unit:gibibytePerSecond;2")
    );
    context2_0.addDefinition(
      "tebibytePerSecond",
      new InDTMI("dtmi:standard:unit:tebibytePerSecond;2")
    );
    context2_0.addDefinition(
      "exbibytePerSecond",
      new InDTMI("dtmi:standard:unit:exbibytePerSecond;2")
    );
    context2_0.addDefinition(
      "zebibytePerSecond",
      new InDTMI("dtmi:standard:unit:zebibytePerSecond;2")
    );
    context2_0.addDefinition(
      "yobibytePerSecond",
      new InDTMI("dtmi:standard:unit:yobibytePerSecond;2")
    );
    context2_0.addDefinition("bit", new InDTMI("dtmi:standard:unit:bit;2"));
    context2_0.addDefinition("kibibit", new InDTMI("dtmi:standard:unit:kibibit;2"));
    context2_0.addDefinition("mebibit", new InDTMI("dtmi:standard:unit:mebibit;2"));
    context2_0.addDefinition("gibibit", new InDTMI("dtmi:standard:unit:gibibit;2"));
    context2_0.addDefinition("tebibit", new InDTMI("dtmi:standard:unit:tebibit;2"));
    context2_0.addDefinition("exbibit", new InDTMI("dtmi:standard:unit:exbibit;2"));
    context2_0.addDefinition("zebibit", new InDTMI("dtmi:standard:unit:zebibit;2"));
    context2_0.addDefinition("yobibit", new InDTMI("dtmi:standard:unit:yobibit;2"));
    context2_0.addDefinition("byte", new InDTMI("dtmi:standard:unit:byte;2"));
    context2_0.addDefinition("kibibyte", new InDTMI("dtmi:standard:unit:kibibyte;2"));
    context2_0.addDefinition("mebibyte", new InDTMI("dtmi:standard:unit:mebibyte;2"));
    context2_0.addDefinition("gibibyte", new InDTMI("dtmi:standard:unit:gibibyte;2"));
    context2_0.addDefinition("tebibyte", new InDTMI("dtmi:standard:unit:tebibyte;2"));
    context2_0.addDefinition("exbibyte", new InDTMI("dtmi:standard:unit:exbibyte;2"));
    context2_0.addDefinition("zebibyte", new InDTMI("dtmi:standard:unit:zebibyte;2"));
    context2_0.addDefinition("yobibyte", new InDTMI("dtmi:standard:unit:yobibyte;2"));
    context2_0.addDefinition(
      "kilogramPerCubicMetre",
      new InDTMI("dtmi:standard:unit:kilogramPerCubicMetre;2")
    );
    context2_0.addDefinition(
      "gramPerCubicMetre",
      new InDTMI("dtmi:standard:unit:gramPerCubicMetre;2")
    );
    context2_0.addDefinition("joule", new InDTMI("dtmi:standard:unit:joule;2"));
    context2_0.addDefinition("kilojoule", new InDTMI("dtmi:standard:unit:kilojoule;2"));
    context2_0.addDefinition("megajoule", new InDTMI("dtmi:standard:unit:megajoule;2"));
    context2_0.addDefinition("gigajoule", new InDTMI("dtmi:standard:unit:gigajoule;2"));
    context2_0.addDefinition("electronvolt", new InDTMI("dtmi:standard:unit:electronvolt;2"));
    context2_0.addDefinition(
      "megaelectronvolt",
      new InDTMI("dtmi:standard:unit:megaelectronvolt;2")
    );
    context2_0.addDefinition("kilowattHour", new InDTMI("dtmi:standard:unit:kilowattHour;2"));
    context2_0.addDefinition("newton", new InDTMI("dtmi:standard:unit:newton;2"));
    context2_0.addDefinition("pound", new InDTMI("dtmi:standard:unit:pound;2"));
    context2_0.addDefinition("ounce", new InDTMI("dtmi:standard:unit:ounce;2"));
    context2_0.addDefinition("ton", new InDTMI("dtmi:standard:unit:ton;2"));
    context2_0.addDefinition("hertz", new InDTMI("dtmi:standard:unit:hertz;2"));
    context2_0.addDefinition("kilohertz", new InDTMI("dtmi:standard:unit:kilohertz;2"));
    context2_0.addDefinition("megahertz", new InDTMI("dtmi:standard:unit:megahertz;2"));
    context2_0.addDefinition("gigahertz", new InDTMI("dtmi:standard:unit:gigahertz;2"));
    context2_0.addDefinition("lux", new InDTMI("dtmi:standard:unit:lux;2"));
    context2_0.addDefinition("footcandle", new InDTMI("dtmi:standard:unit:footcandle;2"));
    context2_0.addDefinition("henry", new InDTMI("dtmi:standard:unit:henry;2"));
    context2_0.addDefinition("millihenry", new InDTMI("dtmi:standard:unit:millihenry;2"));
    context2_0.addDefinition("microhenry", new InDTMI("dtmi:standard:unit:microhenry;2"));
    context2_0.addDefinition("metre", new InDTMI("dtmi:standard:unit:metre;2"));
    context2_0.addDefinition("centimetre", new InDTMI("dtmi:standard:unit:centimetre;2"));
    context2_0.addDefinition("millimetre", new InDTMI("dtmi:standard:unit:millimetre;2"));
    context2_0.addDefinition("micrometre", new InDTMI("dtmi:standard:unit:micrometre;2"));
    context2_0.addDefinition("nanometre", new InDTMI("dtmi:standard:unit:nanometre;2"));
    context2_0.addDefinition("kilometre", new InDTMI("dtmi:standard:unit:kilometre;2"));
    context2_0.addDefinition("foot", new InDTMI("dtmi:standard:unit:foot;2"));
    context2_0.addDefinition("inch", new InDTMI("dtmi:standard:unit:inch;2"));
    context2_0.addDefinition("mile", new InDTMI("dtmi:standard:unit:mile;2"));
    context2_0.addDefinition("nauticalMile", new InDTMI("dtmi:standard:unit:nauticalMile;2"));
    context2_0.addDefinition(
      "astronomicalUnit",
      new InDTMI("dtmi:standard:unit:astronomicalUnit;2")
    );
    context2_0.addDefinition(
      "candelaPerSquareMetre",
      new InDTMI("dtmi:standard:unit:candelaPerSquareMetre;2")
    );
    context2_0.addDefinition("lumen", new InDTMI("dtmi:standard:unit:lumen;2"));
    context2_0.addDefinition("candela", new InDTMI("dtmi:standard:unit:candela;2"));
    context2_0.addDefinition("weber", new InDTMI("dtmi:standard:unit:weber;2"));
    context2_0.addDefinition("maxwell", new InDTMI("dtmi:standard:unit:maxwell;2"));
    context2_0.addDefinition("tesla", new InDTMI("dtmi:standard:unit:tesla;2"));
    context2_0.addDefinition("kilogram", new InDTMI("dtmi:standard:unit:kilogram;2"));
    context2_0.addDefinition("gram", new InDTMI("dtmi:standard:unit:gram;2"));
    context2_0.addDefinition("milligram", new InDTMI("dtmi:standard:unit:milligram;2"));
    context2_0.addDefinition("microgram", new InDTMI("dtmi:standard:unit:microgram;2"));
    context2_0.addDefinition("tonne", new InDTMI("dtmi:standard:unit:tonne;2"));
    context2_0.addDefinition("slug", new InDTMI("dtmi:standard:unit:slug;2"));
    context2_0.addDefinition("gramPerSecond", new InDTMI("dtmi:standard:unit:gramPerSecond;2"));
    context2_0.addDefinition(
      "kilogramPerSecond",
      new InDTMI("dtmi:standard:unit:kilogramPerSecond;2")
    );
    context2_0.addDefinition("gramPerHour", new InDTMI("dtmi:standard:unit:gramPerHour;2"));
    context2_0.addDefinition("kilogramPerHour", new InDTMI("dtmi:standard:unit:kilogramPerHour;2"));
    context2_0.addDefinition("watt", new InDTMI("dtmi:standard:unit:watt;2"));
    context2_0.addDefinition("microwatt", new InDTMI("dtmi:standard:unit:microwatt;2"));
    context2_0.addDefinition("milliwatt", new InDTMI("dtmi:standard:unit:milliwatt;2"));
    context2_0.addDefinition("kilowatt", new InDTMI("dtmi:standard:unit:kilowatt;2"));
    context2_0.addDefinition("megawatt", new InDTMI("dtmi:standard:unit:megawatt;2"));
    context2_0.addDefinition("gigawatt", new InDTMI("dtmi:standard:unit:gigawatt;2"));
    context2_0.addDefinition("horsepower", new InDTMI("dtmi:standard:unit:horsepower;2"));
    context2_0.addDefinition(
      "kilowattHourPerYear",
      new InDTMI("dtmi:standard:unit:kilowattHourPerYear;2")
    );
    context2_0.addDefinition("pascal", new InDTMI("dtmi:standard:unit:pascal;2"));
    context2_0.addDefinition("kilopascal", new InDTMI("dtmi:standard:unit:kilopascal;2"));
    context2_0.addDefinition("bar", new InDTMI("dtmi:standard:unit:bar;2"));
    context2_0.addDefinition("millibar", new InDTMI("dtmi:standard:unit:millibar;2"));
    context2_0.addDefinition(
      "millimetresOfMercury",
      new InDTMI("dtmi:standard:unit:millimetresOfMercury;2")
    );
    context2_0.addDefinition(
      "poundPerSquareInch",
      new InDTMI("dtmi:standard:unit:poundPerSquareInch;2")
    );
    context2_0.addDefinition("inchesOfMercury", new InDTMI("dtmi:standard:unit:inchesOfMercury;2"));
    context2_0.addDefinition("inchesOfWater", new InDTMI("dtmi:standard:unit:inchesOfWater;2"));
    context2_0.addDefinition("ohm", new InDTMI("dtmi:standard:unit:ohm;2"));
    context2_0.addDefinition("milliohm", new InDTMI("dtmi:standard:unit:milliohm;2"));
    context2_0.addDefinition("kiloohm", new InDTMI("dtmi:standard:unit:kiloohm;2"));
    context2_0.addDefinition("megaohm", new InDTMI("dtmi:standard:unit:megaohm;2"));
    context2_0.addDefinition("decibel", new InDTMI("dtmi:standard:unit:decibel;2"));
    context2_0.addDefinition("bel", new InDTMI("dtmi:standard:unit:bel;2"));
    context2_0.addDefinition("kelvin", new InDTMI("dtmi:standard:unit:kelvin;2"));
    context2_0.addDefinition("degreeCelsius", new InDTMI("dtmi:standard:unit:degreeCelsius;2"));
    context2_0.addDefinition(
      "degreeFahrenheit",
      new InDTMI("dtmi:standard:unit:degreeFahrenheit;2")
    );
    context2_0.addDefinition("second", new InDTMI("dtmi:standard:unit:second;2"));
    context2_0.addDefinition("millisecond", new InDTMI("dtmi:standard:unit:millisecond;2"));
    context2_0.addDefinition("microsecond", new InDTMI("dtmi:standard:unit:microsecond;2"));
    context2_0.addDefinition("nanosecond", new InDTMI("dtmi:standard:unit:nanosecond;2"));
    context2_0.addDefinition("minute", new InDTMI("dtmi:standard:unit:minute;2"));
    context2_0.addDefinition("hour", new InDTMI("dtmi:standard:unit:hour;2"));
    context2_0.addDefinition("day", new InDTMI("dtmi:standard:unit:day;2"));
    context2_0.addDefinition("year", new InDTMI("dtmi:standard:unit:year;2"));
    context2_0.addDefinition("unity", new InDTMI("dtmi:standard:unit:unity;2"));
    context2_0.addDefinition("percent", new InDTMI("dtmi:standard:unit:percent;2"));
    context2_0.addDefinition("newtonMetre", new InDTMI("dtmi:standard:unit:newtonMetre;2"));
    context2_0.addDefinition("metrePerSecond", new InDTMI("dtmi:standard:unit:metrePerSecond;2"));
    context2_0.addDefinition(
      "centimetrePerSecond",
      new InDTMI("dtmi:standard:unit:centimetrePerSecond;2")
    );
    context2_0.addDefinition(
      "kilometrePerSecond",
      new InDTMI("dtmi:standard:unit:kilometrePerSecond;2")
    );
    context2_0.addDefinition("metrePerHour", new InDTMI("dtmi:standard:unit:metrePerHour;2"));
    context2_0.addDefinition(
      "kilometrePerHour",
      new InDTMI("dtmi:standard:unit:kilometrePerHour;2")
    );
    context2_0.addDefinition("milePerHour", new InDTMI("dtmi:standard:unit:milePerHour;2"));
    context2_0.addDefinition("milePerSecond", new InDTMI("dtmi:standard:unit:milePerSecond;2"));
    context2_0.addDefinition("knot", new InDTMI("dtmi:standard:unit:knot;2"));
    context2_0.addDefinition("volt", new InDTMI("dtmi:standard:unit:volt;2"));
    context2_0.addDefinition("millivolt", new InDTMI("dtmi:standard:unit:millivolt;2"));
    context2_0.addDefinition("microvolt", new InDTMI("dtmi:standard:unit:microvolt;2"));
    context2_0.addDefinition("kilovolt", new InDTMI("dtmi:standard:unit:kilovolt;2"));
    context2_0.addDefinition("megavolt", new InDTMI("dtmi:standard:unit:megavolt;2"));
    context2_0.addDefinition("cubicMetre", new InDTMI("dtmi:standard:unit:cubicMetre;2"));
    context2_0.addDefinition("cubicCentimetre", new InDTMI("dtmi:standard:unit:cubicCentimetre;2"));
    context2_0.addDefinition("litre", new InDTMI("dtmi:standard:unit:litre;2"));
    context2_0.addDefinition("millilitre", new InDTMI("dtmi:standard:unit:millilitre;2"));
    context2_0.addDefinition("cubicFoot", new InDTMI("dtmi:standard:unit:cubicFoot;2"));
    context2_0.addDefinition("cubicInch", new InDTMI("dtmi:standard:unit:cubicInch;2"));
    context2_0.addDefinition("fluidOunce", new InDTMI("dtmi:standard:unit:fluidOunce;2"));
    context2_0.addDefinition("gallon", new InDTMI("dtmi:standard:unit:gallon;2"));
    context2_0.addDefinition("litrePerSecond", new InDTMI("dtmi:standard:unit:litrePerSecond;2"));
    context2_0.addDefinition(
      "millilitrePerSecond",
      new InDTMI("dtmi:standard:unit:millilitrePerSecond;2")
    );
    context2_0.addDefinition("litrePerHour", new InDTMI("dtmi:standard:unit:litrePerHour;2"));
    context2_0.addDefinition(
      "millilitrePerHour",
      new InDTMI("dtmi:standard:unit:millilitrePerHour;2")
    );
    context2_0.addDefinition("point", new InDTMI("dtmi:standard:schema:geospatial:point;2"));
    context2_0.addDefinition(
      "multiPoint",
      new InDTMI("dtmi:standard:schema:geospatial:multiPoint;2")
    );
    context2_0.addDefinition(
      "lineString",
      new InDTMI("dtmi:standard:schema:geospatial:lineString;2")
    );
    context2_0.addDefinition(
      "multiLineString",
      new InDTMI("dtmi:standard:schema:geospatial:multiLineString;2")
    );
    context2_0.addDefinition("polygon", new InDTMI("dtmi:standard:schema:geospatial:polygon;2"));
    context2_0.addDefinition(
      "multiPolygon",
      new InDTMI("dtmi:standard:schema:geospatial:multiPolygon;2")
    );
    versionedContexts.push(context2_0);
    const context3_0 = new VersionedContext(3, 0);
    context3_0.addDefinition("AdjunctType", new InDTMI("dtmi:dtdl:class:AdjunctType;3"));
    context3_0.addDefinition("Array", new InDTMI("dtmi:dtdl:class:Array;3"));
    context3_0.addDefinition("Boolean", new InDTMI("dtmi:dtdl:class:Boolean;3"));
    context3_0.addDefinition("ComplexSchema", new InDTMI("dtmi:dtdl:class:ComplexSchema;3"));
    context3_0.addDefinition("Command", new InDTMI("dtmi:dtdl:class:Command;3"));
    context3_0.addDefinition("CommandPayload", new InDTMI("dtmi:dtdl:class:CommandPayload;3"));
    context3_0.addDefinition("CommandRequest", new InDTMI("dtmi:dtdl:class:CommandRequest;3"));
    context3_0.addDefinition("CommandResponse", new InDTMI("dtmi:dtdl:class:CommandResponse;3"));
    context3_0.addDefinition("CommandType", new InDTMI("dtmi:dtdl:class:CommandType;3"));
    context3_0.addDefinition("Component", new InDTMI("dtmi:dtdl:class:Component;3"));
    context3_0.addDefinition("Content", new InDTMI("dtmi:dtdl:class:Content;3"));
    context3_0.addDefinition("Date", new InDTMI("dtmi:dtdl:class:Date;3"));
    context3_0.addDefinition("DateTime", new InDTMI("dtmi:dtdl:class:DateTime;3"));
    context3_0.addDefinition("Double", new InDTMI("dtmi:dtdl:class:Double;3"));
    context3_0.addDefinition("Duration", new InDTMI("dtmi:dtdl:class:Duration;3"));
    context3_0.addDefinition("Entity", new InDTMI("dtmi:dtdl:class:Entity;3"));
    context3_0.addDefinition("Enum", new InDTMI("dtmi:dtdl:class:Enum;3"));
    context3_0.addDefinition("EnumValue", new InDTMI("dtmi:dtdl:class:EnumValue;3"));
    context3_0.addDefinition("Field", new InDTMI("dtmi:dtdl:class:Field;3"));
    context3_0.addDefinition("Float", new InDTMI("dtmi:dtdl:class:Float;3"));
    context3_0.addDefinition("Integer", new InDTMI("dtmi:dtdl:class:Integer;3"));
    context3_0.addDefinition("Interface", new InDTMI("dtmi:dtdl:class:Interface;3"));
    context3_0.addDefinition("LatentType", new InDTMI("dtmi:dtdl:class:LatentType;3"));
    context3_0.addDefinition("Long", new InDTMI("dtmi:dtdl:class:Long;3"));
    context3_0.addDefinition("Map", new InDTMI("dtmi:dtdl:class:Map;3"));
    context3_0.addDefinition("MapKey", new InDTMI("dtmi:dtdl:class:MapKey;3"));
    context3_0.addDefinition("MapValue", new InDTMI("dtmi:dtdl:class:MapValue;3"));
    context3_0.addDefinition("NamedEntity", new InDTMI("dtmi:dtdl:class:NamedEntity;3"));
    context3_0.addDefinition("NamedLatentType", new InDTMI("dtmi:dtdl:class:NamedLatentType;3"));
    context3_0.addDefinition("NumericSchema", new InDTMI("dtmi:dtdl:class:NumericSchema;3"));
    context3_0.addDefinition("Object", new InDTMI("dtmi:dtdl:class:Object;3"));
    context3_0.addDefinition("PrimitiveSchema", new InDTMI("dtmi:dtdl:class:PrimitiveSchema;3"));
    context3_0.addDefinition("Property", new InDTMI("dtmi:dtdl:class:Property;3"));
    context3_0.addDefinition("Relationship", new InDTMI("dtmi:dtdl:class:Relationship;3"));
    context3_0.addDefinition("Schema", new InDTMI("dtmi:dtdl:class:Schema;3"));
    context3_0.addDefinition("SchemaField", new InDTMI("dtmi:dtdl:class:SchemaField;3"));
    context3_0.addDefinition("SemanticType", new InDTMI("dtmi:dtdl:class:SemanticType;3"));
    context3_0.addDefinition("SemanticUnit", new InDTMI("dtmi:dtdl:class:SemanticUnit;3"));
    context3_0.addDefinition("String", new InDTMI("dtmi:dtdl:class:String;3"));
    context3_0.addDefinition("Telemetry", new InDTMI("dtmi:dtdl:class:Telemetry;3"));
    context3_0.addDefinition("TemporalSchema", new InDTMI("dtmi:dtdl:class:TemporalSchema;3"));
    context3_0.addDefinition("Time", new InDTMI("dtmi:dtdl:class:Time;3"));
    context3_0.addDefinition("Unit", new InDTMI("dtmi:dtdl:class:Unit;3"));
    context3_0.addDefinition("UnitAttribute", new InDTMI("dtmi:dtdl:class:UnitAttribute;3"));
    context3_0.addDefinition("RatioUnit", new InDTMI("dtmi:standard:class:RatioUnit;3"));
    context3_0.addDefinition("DecimalUnit", new InDTMI("dtmi:standard:class:DecimalUnit;3"));
    context3_0.addDefinition("DecimalPrefix", new InDTMI("dtmi:standard:class:DecimalPrefix;3"));
    context3_0.addDefinition("BinaryUnit", new InDTMI("dtmi:standard:class:BinaryUnit;3"));
    context3_0.addDefinition("BinaryPrefix", new InDTMI("dtmi:standard:class:BinaryPrefix;3"));
    context3_0.addDefinition(
      "QuantitativeType",
      new InDTMI("dtmi:standard:class:QuantitativeType;3")
    );
    context3_0.addDefinition("Acceleration", new InDTMI("dtmi:standard:class:Acceleration;3"));
    context3_0.addDefinition("Angle", new InDTMI("dtmi:standard:class:Angle;3"));
    context3_0.addDefinition(
      "AngularAcceleration",
      new InDTMI("dtmi:standard:class:AngularAcceleration;3")
    );
    context3_0.addDefinition(
      "AngularVelocity",
      new InDTMI("dtmi:standard:class:AngularVelocity;3")
    );
    context3_0.addDefinition("Area", new InDTMI("dtmi:standard:class:Area;3"));
    context3_0.addDefinition("Capacitance", new InDTMI("dtmi:standard:class:Capacitance;3"));
    context3_0.addDefinition("Current", new InDTMI("dtmi:standard:class:Current;3"));
    context3_0.addDefinition("DataRate", new InDTMI("dtmi:standard:class:DataRate;3"));
    context3_0.addDefinition("DataSize", new InDTMI("dtmi:standard:class:DataSize;3"));
    context3_0.addDefinition("Density", new InDTMI("dtmi:standard:class:Density;3"));
    context3_0.addDefinition("Distance", new InDTMI("dtmi:standard:class:Distance;3"));
    context3_0.addDefinition("ElectricCharge", new InDTMI("dtmi:standard:class:ElectricCharge;3"));
    context3_0.addDefinition("Energy", new InDTMI("dtmi:standard:class:Energy;3"));
    context3_0.addDefinition("Force", new InDTMI("dtmi:standard:class:Force;3"));
    context3_0.addDefinition("Frequency", new InDTMI("dtmi:standard:class:Frequency;3"));
    context3_0.addDefinition("Humidity", new InDTMI("dtmi:standard:class:Humidity;3"));
    context3_0.addDefinition("Illuminance", new InDTMI("dtmi:standard:class:Illuminance;3"));
    context3_0.addDefinition("Inductance", new InDTMI("dtmi:standard:class:Inductance;3"));
    context3_0.addDefinition("Latitude", new InDTMI("dtmi:standard:class:Latitude;3"));
    context3_0.addDefinition("Longitude", new InDTMI("dtmi:standard:class:Longitude;3"));
    context3_0.addDefinition("Length", new InDTMI("dtmi:standard:class:Length;3"));
    context3_0.addDefinition("Luminance", new InDTMI("dtmi:standard:class:Luminance;3"));
    context3_0.addDefinition("Luminosity", new InDTMI("dtmi:standard:class:Luminosity;3"));
    context3_0.addDefinition("LuminousFlux", new InDTMI("dtmi:standard:class:LuminousFlux;3"));
    context3_0.addDefinition(
      "LuminousIntensity",
      new InDTMI("dtmi:standard:class:LuminousIntensity;3")
    );
    context3_0.addDefinition("MagneticFlux", new InDTMI("dtmi:standard:class:MagneticFlux;3"));
    context3_0.addDefinition(
      "MagneticInduction",
      new InDTMI("dtmi:standard:class:MagneticInduction;3")
    );
    context3_0.addDefinition("Mass", new InDTMI("dtmi:standard:class:Mass;3"));
    context3_0.addDefinition("MassFlowRate", new InDTMI("dtmi:standard:class:MassFlowRate;3"));
    context3_0.addDefinition("Power", new InDTMI("dtmi:standard:class:Power;3"));
    context3_0.addDefinition("Pressure", new InDTMI("dtmi:standard:class:Pressure;3"));
    context3_0.addDefinition(
      "RelativeHumidity",
      new InDTMI("dtmi:standard:class:RelativeHumidity;3")
    );
    context3_0.addDefinition("Resistance", new InDTMI("dtmi:standard:class:Resistance;3"));
    context3_0.addDefinition("SoundPressure", new InDTMI("dtmi:standard:class:SoundPressure;3"));
    context3_0.addDefinition("Temperature", new InDTMI("dtmi:standard:class:Temperature;3"));
    context3_0.addDefinition("Thrust", new InDTMI("dtmi:standard:class:Thrust;3"));
    context3_0.addDefinition("TimeSpan", new InDTMI("dtmi:standard:class:TimeSpan;3"));
    context3_0.addDefinition("Torque", new InDTMI("dtmi:standard:class:Torque;3"));
    context3_0.addDefinition("Velocity", new InDTMI("dtmi:standard:class:Velocity;3"));
    context3_0.addDefinition("Voltage", new InDTMI("dtmi:standard:class:Voltage;3"));
    context3_0.addDefinition("Volume", new InDTMI("dtmi:standard:class:Volume;3"));
    context3_0.addDefinition("VolumeFlowRate", new InDTMI("dtmi:standard:class:VolumeFlowRate;3"));
    context3_0.addDefinition(
      "AccelerationUnit",
      new InDTMI("dtmi:standard:class:AccelerationUnit;3")
    );
    context3_0.addDefinition("AngleUnit", new InDTMI("dtmi:standard:class:AngleUnit;3"));
    context3_0.addDefinition(
      "AngularAccelerationUnit",
      new InDTMI("dtmi:standard:class:AngularAccelerationUnit;3")
    );
    context3_0.addDefinition(
      "AngularVelocityUnit",
      new InDTMI("dtmi:standard:class:AngularVelocityUnit;3")
    );
    context3_0.addDefinition("AreaUnit", new InDTMI("dtmi:standard:class:AreaUnit;3"));
    context3_0.addDefinition(
      "CapacitanceUnit",
      new InDTMI("dtmi:standard:class:CapacitanceUnit;3")
    );
    context3_0.addDefinition("ChargeUnit", new InDTMI("dtmi:standard:class:ChargeUnit;3"));
    context3_0.addDefinition("CurrentUnit", new InDTMI("dtmi:standard:class:CurrentUnit;3"));
    context3_0.addDefinition("DataRateUnit", new InDTMI("dtmi:standard:class:DataRateUnit;3"));
    context3_0.addDefinition("DataSizeUnit", new InDTMI("dtmi:standard:class:DataSizeUnit;3"));
    context3_0.addDefinition("DensityUnit", new InDTMI("dtmi:standard:class:DensityUnit;3"));
    context3_0.addDefinition("EnergyUnit", new InDTMI("dtmi:standard:class:EnergyUnit;3"));
    context3_0.addDefinition("ForceUnit", new InDTMI("dtmi:standard:class:ForceUnit;3"));
    context3_0.addDefinition("FrequencyUnit", new InDTMI("dtmi:standard:class:FrequencyUnit;3"));
    context3_0.addDefinition(
      "IlluminanceUnit",
      new InDTMI("dtmi:standard:class:IlluminanceUnit;3")
    );
    context3_0.addDefinition("InductanceUnit", new InDTMI("dtmi:standard:class:InductanceUnit;3"));
    context3_0.addDefinition("LengthUnit", new InDTMI("dtmi:standard:class:LengthUnit;3"));
    context3_0.addDefinition("LuminanceUnit", new InDTMI("dtmi:standard:class:LuminanceUnit;3"));
    context3_0.addDefinition(
      "LuminousFluxUnit",
      new InDTMI("dtmi:standard:class:LuminousFluxUnit;3")
    );
    context3_0.addDefinition(
      "LuminousIntensityUnit",
      new InDTMI("dtmi:standard:class:LuminousIntensityUnit;3")
    );
    context3_0.addDefinition(
      "MagneticFluxUnit",
      new InDTMI("dtmi:standard:class:MagneticFluxUnit;3")
    );
    context3_0.addDefinition(
      "MagneticInductionUnit",
      new InDTMI("dtmi:standard:class:MagneticInductionUnit;3")
    );
    context3_0.addDefinition("MassUnit", new InDTMI("dtmi:standard:class:MassUnit;3"));
    context3_0.addDefinition(
      "MassFlowRateUnit",
      new InDTMI("dtmi:standard:class:MassFlowRateUnit;3")
    );
    context3_0.addDefinition("PowerUnit", new InDTMI("dtmi:standard:class:PowerUnit;3"));
    context3_0.addDefinition("PressureUnit", new InDTMI("dtmi:standard:class:PressureUnit;3"));
    context3_0.addDefinition("ResistanceUnit", new InDTMI("dtmi:standard:class:ResistanceUnit;3"));
    context3_0.addDefinition(
      "SoundPressureUnit",
      new InDTMI("dtmi:standard:class:SoundPressureUnit;3")
    );
    context3_0.addDefinition(
      "TemperatureUnit",
      new InDTMI("dtmi:standard:class:TemperatureUnit;3")
    );
    context3_0.addDefinition("TimeUnit", new InDTMI("dtmi:standard:class:TimeUnit;3"));
    context3_0.addDefinition("TorqueUnit", new InDTMI("dtmi:standard:class:TorqueUnit;3"));
    context3_0.addDefinition("Unitless", new InDTMI("dtmi:standard:class:Unitless;3"));
    context3_0.addDefinition("VelocityUnit", new InDTMI("dtmi:standard:class:VelocityUnit;3"));
    context3_0.addDefinition("VoltageUnit", new InDTMI("dtmi:standard:class:VoltageUnit;3"));
    context3_0.addDefinition("VolumeUnit", new InDTMI("dtmi:standard:class:VolumeUnit;3"));
    context3_0.addDefinition(
      "VolumeFlowRateUnit",
      new InDTMI("dtmi:standard:class:VolumeFlowRateUnit;3")
    );
    context3_0.addDefinition("baseUnit", new InDTMI("dtmi:dtdl:property:baseUnit;3"));
    context3_0.addDefinition("bottomUnit", new InDTMI("dtmi:dtdl:property:bottomUnit;3"));
    context3_0.addDefinition("commandType", new InDTMI("dtmi:dtdl:property:commandType;3"));
    context3_0.addDefinition("comment", new InDTMI("dtmi:dtdl:property:comment;3"));
    context3_0.addDefinition("contents", new InDTMI("dtmi:dtdl:property:contents;3"));
    context3_0.addDefinition("description", new InDTMI("dtmi:dtdl:property:description;3"));
    context3_0.addDefinition("displayName", new InDTMI("dtmi:dtdl:property:displayName;3"));
    context3_0.addDefinition("elementSchema", new InDTMI("dtmi:dtdl:property:elementSchema;3"));
    context3_0.addDefinition("enumValue", new InDTMI("dtmi:dtdl:property:enumValue;3"));
    context3_0.addDefinition("enumValues", new InDTMI("dtmi:dtdl:property:enumValues;3"));
    context3_0.addDefinition("exponent", new InDTMI("dtmi:dtdl:property:exponent;3"));
    context3_0.addDefinition("extends", new InDTMI("dtmi:dtdl:property:extends;3"));
    context3_0.addDefinition("fields", new InDTMI("dtmi:dtdl:property:fields;3"));
    context3_0.addDefinition("languageVersion", new InDTMI("dtmi:dtdl:property:languageVersion;3"));
    context3_0.addDefinition("mapKey", new InDTMI("dtmi:dtdl:property:mapKey;3"));
    context3_0.addDefinition("mapValue", new InDTMI("dtmi:dtdl:property:mapValue;3"));
    context3_0.addDefinition("maxMultiplicity", new InDTMI("dtmi:dtdl:property:maxMultiplicity;3"));
    context3_0.addDefinition("minMultiplicity", new InDTMI("dtmi:dtdl:property:minMultiplicity;3"));
    context3_0.addDefinition("name", new InDTMI("dtmi:dtdl:property:name;3"));
    context3_0.addDefinition("prefix", new InDTMI("dtmi:dtdl:property:prefix;3"));
    context3_0.addDefinition("properties", new InDTMI("dtmi:dtdl:property:properties;3"));
    context3_0.addDefinition("request", new InDTMI("dtmi:dtdl:property:request;3"));
    context3_0.addDefinition("response", new InDTMI("dtmi:dtdl:property:response;3"));
    context3_0.addDefinition("schema", new InDTMI("dtmi:dtdl:property:schema;3"));
    context3_0.addDefinition("schemas", new InDTMI("dtmi:dtdl:property:schemas;3"));
    context3_0.addDefinition("symbol", new InDTMI("dtmi:dtdl:property:symbol;3"));
    context3_0.addDefinition("target", new InDTMI("dtmi:dtdl:property:target;3"));
    context3_0.addDefinition("topUnit", new InDTMI("dtmi:dtdl:property:topUnit;3"));
    context3_0.addDefinition("unit", new InDTMI("dtmi:dtdl:property:unit;3"));
    context3_0.addDefinition("valueSchema", new InDTMI("dtmi:dtdl:property:valueSchema;3"));
    context3_0.addDefinition("writable", new InDTMI("dtmi:dtdl:property:writable;3"));
    context3_0.addDefinition(
      "asynchronous",
      new InDTMI("dtmi:dtdl:instance:CommandType:asynchronous;3")
    );
    context3_0.addDefinition(
      "synchronous",
      new InDTMI("dtmi:dtdl:instance:CommandType:synchronous;3")
    );
    context3_0.addDefinition("boolean", new InDTMI("dtmi:dtdl:instance:Schema:boolean;3"));
    context3_0.addDefinition("date", new InDTMI("dtmi:dtdl:instance:Schema:date;3"));
    context3_0.addDefinition("dateTime", new InDTMI("dtmi:dtdl:instance:Schema:dateTime;3"));
    context3_0.addDefinition("double", new InDTMI("dtmi:dtdl:instance:Schema:double;3"));
    context3_0.addDefinition("duration", new InDTMI("dtmi:dtdl:instance:Schema:duration;3"));
    context3_0.addDefinition("float", new InDTMI("dtmi:dtdl:instance:Schema:float;3"));
    context3_0.addDefinition("integer", new InDTMI("dtmi:dtdl:instance:Schema:integer;3"));
    context3_0.addDefinition("long", new InDTMI("dtmi:dtdl:instance:Schema:long;3"));
    context3_0.addDefinition("string", new InDTMI("dtmi:dtdl:instance:Schema:string;3"));
    context3_0.addDefinition("time", new InDTMI("dtmi:dtdl:instance:Schema:time;3"));
    context3_0.addDefinition("deci", new InDTMI("dtmi:standard:unitprefix:deci;3"));
    context3_0.addDefinition("centi", new InDTMI("dtmi:standard:unitprefix:centi;3"));
    context3_0.addDefinition("milli", new InDTMI("dtmi:standard:unitprefix:milli;3"));
    context3_0.addDefinition("micro", new InDTMI("dtmi:standard:unitprefix:micro;3"));
    context3_0.addDefinition("nano", new InDTMI("dtmi:standard:unitprefix:nano;3"));
    context3_0.addDefinition("pico", new InDTMI("dtmi:standard:unitprefix:pico;3"));
    context3_0.addDefinition("femto", new InDTMI("dtmi:standard:unitprefix:femto;3"));
    context3_0.addDefinition("atto", new InDTMI("dtmi:standard:unitprefix:atto;3"));
    context3_0.addDefinition("zepto", new InDTMI("dtmi:standard:unitprefix:zepto;3"));
    context3_0.addDefinition("yocto", new InDTMI("dtmi:standard:unitprefix:yocto;3"));
    context3_0.addDefinition("deka", new InDTMI("dtmi:standard:unitprefix:deka;3"));
    context3_0.addDefinition("hecto", new InDTMI("dtmi:standard:unitprefix:hecto;3"));
    context3_0.addDefinition("kilo", new InDTMI("dtmi:standard:unitprefix:kilo;3"));
    context3_0.addDefinition("mega", new InDTMI("dtmi:standard:unitprefix:mega;3"));
    context3_0.addDefinition("giga", new InDTMI("dtmi:standard:unitprefix:giga;3"));
    context3_0.addDefinition("tera", new InDTMI("dtmi:standard:unitprefix:tera;3"));
    context3_0.addDefinition("peta", new InDTMI("dtmi:standard:unitprefix:peta;3"));
    context3_0.addDefinition("exa", new InDTMI("dtmi:standard:unitprefix:exa;3"));
    context3_0.addDefinition("zetta", new InDTMI("dtmi:standard:unitprefix:zetta;3"));
    context3_0.addDefinition("yotta", new InDTMI("dtmi:standard:unitprefix:yotta;3"));
    context3_0.addDefinition("kibi", new InDTMI("dtmi:standard:unitprefix:kibi;3"));
    context3_0.addDefinition("mebi", new InDTMI("dtmi:standard:unitprefix:mebi;3"));
    context3_0.addDefinition("gibi", new InDTMI("dtmi:standard:unitprefix:gibi;3"));
    context3_0.addDefinition("tebi", new InDTMI("dtmi:standard:unitprefix:tebi;3"));
    context3_0.addDefinition("pebi", new InDTMI("dtmi:standard:unitprefix:pebi;3"));
    context3_0.addDefinition("exbi", new InDTMI("dtmi:standard:unitprefix:exbi;3"));
    context3_0.addDefinition("zebi", new InDTMI("dtmi:standard:unitprefix:zebi;3"));
    context3_0.addDefinition("yobi", new InDTMI("dtmi:standard:unitprefix:yobi;3"));
    context3_0.addDefinition(
      "metrePerSecondSquared",
      new InDTMI("dtmi:standard:unit:metrePerSecondSquared;3")
    );
    context3_0.addDefinition(
      "centimetrePerSecondSquared",
      new InDTMI("dtmi:standard:unit:centimetrePerSecondSquared;3")
    );
    context3_0.addDefinition("gForce", new InDTMI("dtmi:standard:unit:gForce;3"));
    context3_0.addDefinition("radian", new InDTMI("dtmi:standard:unit:radian;3"));
    context3_0.addDefinition("degreeOfArc", new InDTMI("dtmi:standard:unit:degreeOfArc;3"));
    context3_0.addDefinition("minuteOfArc", new InDTMI("dtmi:standard:unit:minuteOfArc;3"));
    context3_0.addDefinition("secondOfArc", new InDTMI("dtmi:standard:unit:secondOfArc;3"));
    context3_0.addDefinition("turn", new InDTMI("dtmi:standard:unit:turn;3"));
    context3_0.addDefinition(
      "radianPerSecondSquared",
      new InDTMI("dtmi:standard:unit:radianPerSecondSquared;3")
    );
    context3_0.addDefinition("radianPerSecond", new InDTMI("dtmi:standard:unit:radianPerSecond;3"));
    context3_0.addDefinition("degreePerSecond", new InDTMI("dtmi:standard:unit:degreePerSecond;3"));
    context3_0.addDefinition(
      "revolutionPerSecond",
      new InDTMI("dtmi:standard:unit:revolutionPerSecond;3")
    );
    context3_0.addDefinition(
      "revolutionPerMinute",
      new InDTMI("dtmi:standard:unit:revolutionPerMinute;3")
    );
    context3_0.addDefinition("squareMetre", new InDTMI("dtmi:standard:unit:squareMetre;3"));
    context3_0.addDefinition(
      "squareCentimetre",
      new InDTMI("dtmi:standard:unit:squareCentimetre;3")
    );
    context3_0.addDefinition(
      "squareMillimetre",
      new InDTMI("dtmi:standard:unit:squareMillimetre;3")
    );
    context3_0.addDefinition("squareKilometre", new InDTMI("dtmi:standard:unit:squareKilometre;3"));
    context3_0.addDefinition("hectare", new InDTMI("dtmi:standard:unit:hectare;3"));
    context3_0.addDefinition("squareFoot", new InDTMI("dtmi:standard:unit:squareFoot;3"));
    context3_0.addDefinition("squareInch", new InDTMI("dtmi:standard:unit:squareInch;3"));
    context3_0.addDefinition("acre", new InDTMI("dtmi:standard:unit:acre;3"));
    context3_0.addDefinition("farad", new InDTMI("dtmi:standard:unit:farad;3"));
    context3_0.addDefinition("millifarad", new InDTMI("dtmi:standard:unit:millifarad;3"));
    context3_0.addDefinition("microfarad", new InDTMI("dtmi:standard:unit:microfarad;3"));
    context3_0.addDefinition("nanofarad", new InDTMI("dtmi:standard:unit:nanofarad;3"));
    context3_0.addDefinition("picofarad", new InDTMI("dtmi:standard:unit:picofarad;3"));
    context3_0.addDefinition("coulomb", new InDTMI("dtmi:standard:unit:coulomb;3"));
    context3_0.addDefinition("ampere", new InDTMI("dtmi:standard:unit:ampere;3"));
    context3_0.addDefinition("microampere", new InDTMI("dtmi:standard:unit:microampere;3"));
    context3_0.addDefinition("milliampere", new InDTMI("dtmi:standard:unit:milliampere;3"));
    context3_0.addDefinition("bitPerSecond", new InDTMI("dtmi:standard:unit:bitPerSecond;3"));
    context3_0.addDefinition(
      "kibibitPerSecond",
      new InDTMI("dtmi:standard:unit:kibibitPerSecond;3")
    );
    context3_0.addDefinition(
      "mebibitPerSecond",
      new InDTMI("dtmi:standard:unit:mebibitPerSecond;3")
    );
    context3_0.addDefinition(
      "gibibitPerSecond",
      new InDTMI("dtmi:standard:unit:gibibitPerSecond;3")
    );
    context3_0.addDefinition(
      "tebibitPerSecond",
      new InDTMI("dtmi:standard:unit:tebibitPerSecond;3")
    );
    context3_0.addDefinition(
      "exbibitPerSecond",
      new InDTMI("dtmi:standard:unit:exbibitPerSecond;3")
    );
    context3_0.addDefinition(
      "zebibitPerSecond",
      new InDTMI("dtmi:standard:unit:zebibitPerSecond;3")
    );
    context3_0.addDefinition(
      "yobibitPerSecond",
      new InDTMI("dtmi:standard:unit:yobibitPerSecond;3")
    );
    context3_0.addDefinition("bytePerSecond", new InDTMI("dtmi:standard:unit:bytePerSecond;3"));
    context3_0.addDefinition(
      "kibibytePerSecond",
      new InDTMI("dtmi:standard:unit:kibibytePerSecond;3")
    );
    context3_0.addDefinition(
      "mebibytePerSecond",
      new InDTMI("dtmi:standard:unit:mebibytePerSecond;3")
    );
    context3_0.addDefinition(
      "gibibytePerSecond",
      new InDTMI("dtmi:standard:unit:gibibytePerSecond;3")
    );
    context3_0.addDefinition(
      "tebibytePerSecond",
      new InDTMI("dtmi:standard:unit:tebibytePerSecond;3")
    );
    context3_0.addDefinition(
      "exbibytePerSecond",
      new InDTMI("dtmi:standard:unit:exbibytePerSecond;3")
    );
    context3_0.addDefinition(
      "zebibytePerSecond",
      new InDTMI("dtmi:standard:unit:zebibytePerSecond;3")
    );
    context3_0.addDefinition(
      "yobibytePerSecond",
      new InDTMI("dtmi:standard:unit:yobibytePerSecond;3")
    );
    context3_0.addDefinition("bit", new InDTMI("dtmi:standard:unit:bit;3"));
    context3_0.addDefinition("kibibit", new InDTMI("dtmi:standard:unit:kibibit;3"));
    context3_0.addDefinition("mebibit", new InDTMI("dtmi:standard:unit:mebibit;3"));
    context3_0.addDefinition("gibibit", new InDTMI("dtmi:standard:unit:gibibit;3"));
    context3_0.addDefinition("tebibit", new InDTMI("dtmi:standard:unit:tebibit;3"));
    context3_0.addDefinition("exbibit", new InDTMI("dtmi:standard:unit:exbibit;3"));
    context3_0.addDefinition("zebibit", new InDTMI("dtmi:standard:unit:zebibit;3"));
    context3_0.addDefinition("yobibit", new InDTMI("dtmi:standard:unit:yobibit;3"));
    context3_0.addDefinition("byte", new InDTMI("dtmi:standard:unit:byte;3"));
    context3_0.addDefinition("kibibyte", new InDTMI("dtmi:standard:unit:kibibyte;3"));
    context3_0.addDefinition("mebibyte", new InDTMI("dtmi:standard:unit:mebibyte;3"));
    context3_0.addDefinition("gibibyte", new InDTMI("dtmi:standard:unit:gibibyte;3"));
    context3_0.addDefinition("tebibyte", new InDTMI("dtmi:standard:unit:tebibyte;3"));
    context3_0.addDefinition("exbibyte", new InDTMI("dtmi:standard:unit:exbibyte;3"));
    context3_0.addDefinition("zebibyte", new InDTMI("dtmi:standard:unit:zebibyte;3"));
    context3_0.addDefinition("yobibyte", new InDTMI("dtmi:standard:unit:yobibyte;3"));
    context3_0.addDefinition(
      "kilogramPerCubicMetre",
      new InDTMI("dtmi:standard:unit:kilogramPerCubicMetre;3")
    );
    context3_0.addDefinition(
      "gramPerCubicMetre",
      new InDTMI("dtmi:standard:unit:gramPerCubicMetre;3")
    );
    context3_0.addDefinition("joule", new InDTMI("dtmi:standard:unit:joule;3"));
    context3_0.addDefinition("kilojoule", new InDTMI("dtmi:standard:unit:kilojoule;3"));
    context3_0.addDefinition("megajoule", new InDTMI("dtmi:standard:unit:megajoule;3"));
    context3_0.addDefinition("gigajoule", new InDTMI("dtmi:standard:unit:gigajoule;3"));
    context3_0.addDefinition("electronvolt", new InDTMI("dtmi:standard:unit:electronvolt;3"));
    context3_0.addDefinition(
      "megaelectronvolt",
      new InDTMI("dtmi:standard:unit:megaelectronvolt;3")
    );
    context3_0.addDefinition("kilowattHour", new InDTMI("dtmi:standard:unit:kilowattHour;3"));
    context3_0.addDefinition("newton", new InDTMI("dtmi:standard:unit:newton;3"));
    context3_0.addDefinition("pound", new InDTMI("dtmi:standard:unit:pound;3"));
    context3_0.addDefinition("ounce", new InDTMI("dtmi:standard:unit:ounce;3"));
    context3_0.addDefinition("ton", new InDTMI("dtmi:standard:unit:ton;3"));
    context3_0.addDefinition("hertz", new InDTMI("dtmi:standard:unit:hertz;3"));
    context3_0.addDefinition("kilohertz", new InDTMI("dtmi:standard:unit:kilohertz;3"));
    context3_0.addDefinition("megahertz", new InDTMI("dtmi:standard:unit:megahertz;3"));
    context3_0.addDefinition("gigahertz", new InDTMI("dtmi:standard:unit:gigahertz;3"));
    context3_0.addDefinition("lux", new InDTMI("dtmi:standard:unit:lux;3"));
    context3_0.addDefinition("footcandle", new InDTMI("dtmi:standard:unit:footcandle;3"));
    context3_0.addDefinition("henry", new InDTMI("dtmi:standard:unit:henry;3"));
    context3_0.addDefinition("millihenry", new InDTMI("dtmi:standard:unit:millihenry;3"));
    context3_0.addDefinition("microhenry", new InDTMI("dtmi:standard:unit:microhenry;3"));
    context3_0.addDefinition("metre", new InDTMI("dtmi:standard:unit:metre;3"));
    context3_0.addDefinition("centimetre", new InDTMI("dtmi:standard:unit:centimetre;3"));
    context3_0.addDefinition("millimetre", new InDTMI("dtmi:standard:unit:millimetre;3"));
    context3_0.addDefinition("micrometre", new InDTMI("dtmi:standard:unit:micrometre;3"));
    context3_0.addDefinition("nanometre", new InDTMI("dtmi:standard:unit:nanometre;3"));
    context3_0.addDefinition("kilometre", new InDTMI("dtmi:standard:unit:kilometre;3"));
    context3_0.addDefinition("foot", new InDTMI("dtmi:standard:unit:foot;3"));
    context3_0.addDefinition("inch", new InDTMI("dtmi:standard:unit:inch;3"));
    context3_0.addDefinition("mile", new InDTMI("dtmi:standard:unit:mile;3"));
    context3_0.addDefinition("nauticalMile", new InDTMI("dtmi:standard:unit:nauticalMile;3"));
    context3_0.addDefinition(
      "astronomicalUnit",
      new InDTMI("dtmi:standard:unit:astronomicalUnit;3")
    );
    context3_0.addDefinition(
      "candelaPerSquareMetre",
      new InDTMI("dtmi:standard:unit:candelaPerSquareMetre;3")
    );
    context3_0.addDefinition("lumen", new InDTMI("dtmi:standard:unit:lumen;3"));
    context3_0.addDefinition("candela", new InDTMI("dtmi:standard:unit:candela;3"));
    context3_0.addDefinition("weber", new InDTMI("dtmi:standard:unit:weber;3"));
    context3_0.addDefinition("maxwell", new InDTMI("dtmi:standard:unit:maxwell;3"));
    context3_0.addDefinition("tesla", new InDTMI("dtmi:standard:unit:tesla;3"));
    context3_0.addDefinition("kilogram", new InDTMI("dtmi:standard:unit:kilogram;3"));
    context3_0.addDefinition("gram", new InDTMI("dtmi:standard:unit:gram;3"));
    context3_0.addDefinition("milligram", new InDTMI("dtmi:standard:unit:milligram;3"));
    context3_0.addDefinition("microgram", new InDTMI("dtmi:standard:unit:microgram;3"));
    context3_0.addDefinition("tonne", new InDTMI("dtmi:standard:unit:tonne;3"));
    context3_0.addDefinition("slug", new InDTMI("dtmi:standard:unit:slug;3"));
    context3_0.addDefinition("gramPerSecond", new InDTMI("dtmi:standard:unit:gramPerSecond;3"));
    context3_0.addDefinition(
      "kilogramPerSecond",
      new InDTMI("dtmi:standard:unit:kilogramPerSecond;3")
    );
    context3_0.addDefinition("gramPerHour", new InDTMI("dtmi:standard:unit:gramPerHour;3"));
    context3_0.addDefinition("kilogramPerHour", new InDTMI("dtmi:standard:unit:kilogramPerHour;3"));
    context3_0.addDefinition("watt", new InDTMI("dtmi:standard:unit:watt;3"));
    context3_0.addDefinition("microwatt", new InDTMI("dtmi:standard:unit:microwatt;3"));
    context3_0.addDefinition("milliwatt", new InDTMI("dtmi:standard:unit:milliwatt;3"));
    context3_0.addDefinition("kilowatt", new InDTMI("dtmi:standard:unit:kilowatt;3"));
    context3_0.addDefinition("megawatt", new InDTMI("dtmi:standard:unit:megawatt;3"));
    context3_0.addDefinition("gigawatt", new InDTMI("dtmi:standard:unit:gigawatt;3"));
    context3_0.addDefinition("horsepower", new InDTMI("dtmi:standard:unit:horsepower;3"));
    context3_0.addDefinition(
      "kilowattHourPerYear",
      new InDTMI("dtmi:standard:unit:kilowattHourPerYear;3")
    );
    context3_0.addDefinition("pascal", new InDTMI("dtmi:standard:unit:pascal;3"));
    context3_0.addDefinition("kilopascal", new InDTMI("dtmi:standard:unit:kilopascal;3"));
    context3_0.addDefinition("bar", new InDTMI("dtmi:standard:unit:bar;3"));
    context3_0.addDefinition("millibar", new InDTMI("dtmi:standard:unit:millibar;3"));
    context3_0.addDefinition(
      "millimetresOfMercury",
      new InDTMI("dtmi:standard:unit:millimetresOfMercury;3")
    );
    context3_0.addDefinition(
      "poundPerSquareInch",
      new InDTMI("dtmi:standard:unit:poundPerSquareInch;3")
    );
    context3_0.addDefinition("inchesOfMercury", new InDTMI("dtmi:standard:unit:inchesOfMercury;3"));
    context3_0.addDefinition("inchesOfWater", new InDTMI("dtmi:standard:unit:inchesOfWater;3"));
    context3_0.addDefinition("ohm", new InDTMI("dtmi:standard:unit:ohm;3"));
    context3_0.addDefinition("milliohm", new InDTMI("dtmi:standard:unit:milliohm;3"));
    context3_0.addDefinition("kiloohm", new InDTMI("dtmi:standard:unit:kiloohm;3"));
    context3_0.addDefinition("megaohm", new InDTMI("dtmi:standard:unit:megaohm;3"));
    context3_0.addDefinition("decibel", new InDTMI("dtmi:standard:unit:decibel;3"));
    context3_0.addDefinition("bel", new InDTMI("dtmi:standard:unit:bel;3"));
    context3_0.addDefinition("kelvin", new InDTMI("dtmi:standard:unit:kelvin;3"));
    context3_0.addDefinition("degreeCelsius", new InDTMI("dtmi:standard:unit:degreeCelsius;3"));
    context3_0.addDefinition(
      "degreeFahrenheit",
      new InDTMI("dtmi:standard:unit:degreeFahrenheit;3")
    );
    context3_0.addDefinition("second", new InDTMI("dtmi:standard:unit:second;3"));
    context3_0.addDefinition("millisecond", new InDTMI("dtmi:standard:unit:millisecond;3"));
    context3_0.addDefinition("microsecond", new InDTMI("dtmi:standard:unit:microsecond;3"));
    context3_0.addDefinition("nanosecond", new InDTMI("dtmi:standard:unit:nanosecond;3"));
    context3_0.addDefinition("minute", new InDTMI("dtmi:standard:unit:minute;3"));
    context3_0.addDefinition("hour", new InDTMI("dtmi:standard:unit:hour;3"));
    context3_0.addDefinition("day", new InDTMI("dtmi:standard:unit:day;3"));
    context3_0.addDefinition("year", new InDTMI("dtmi:standard:unit:year;3"));
    context3_0.addDefinition("unity", new InDTMI("dtmi:standard:unit:unity;3"));
    context3_0.addDefinition("percent", new InDTMI("dtmi:standard:unit:percent;3"));
    context3_0.addDefinition("newtonMetre", new InDTMI("dtmi:standard:unit:newtonMetre;3"));
    context3_0.addDefinition("metrePerSecond", new InDTMI("dtmi:standard:unit:metrePerSecond;3"));
    context3_0.addDefinition(
      "centimetrePerSecond",
      new InDTMI("dtmi:standard:unit:centimetrePerSecond;3")
    );
    context3_0.addDefinition(
      "kilometrePerSecond",
      new InDTMI("dtmi:standard:unit:kilometrePerSecond;3")
    );
    context3_0.addDefinition("metrePerHour", new InDTMI("dtmi:standard:unit:metrePerHour;3"));
    context3_0.addDefinition(
      "kilometrePerHour",
      new InDTMI("dtmi:standard:unit:kilometrePerHour;3")
    );
    context3_0.addDefinition("milePerHour", new InDTMI("dtmi:standard:unit:milePerHour;3"));
    context3_0.addDefinition("milePerSecond", new InDTMI("dtmi:standard:unit:milePerSecond;3"));
    context3_0.addDefinition("knot", new InDTMI("dtmi:standard:unit:knot;3"));
    context3_0.addDefinition("volt", new InDTMI("dtmi:standard:unit:volt;3"));
    context3_0.addDefinition("millivolt", new InDTMI("dtmi:standard:unit:millivolt;3"));
    context3_0.addDefinition("microvolt", new InDTMI("dtmi:standard:unit:microvolt;3"));
    context3_0.addDefinition("kilovolt", new InDTMI("dtmi:standard:unit:kilovolt;3"));
    context3_0.addDefinition("megavolt", new InDTMI("dtmi:standard:unit:megavolt;3"));
    context3_0.addDefinition("cubicMetre", new InDTMI("dtmi:standard:unit:cubicMetre;3"));
    context3_0.addDefinition("cubicCentimetre", new InDTMI("dtmi:standard:unit:cubicCentimetre;3"));
    context3_0.addDefinition("litre", new InDTMI("dtmi:standard:unit:litre;3"));
    context3_0.addDefinition("millilitre", new InDTMI("dtmi:standard:unit:millilitre;3"));
    context3_0.addDefinition("cubicFoot", new InDTMI("dtmi:standard:unit:cubicFoot;3"));
    context3_0.addDefinition("cubicInch", new InDTMI("dtmi:standard:unit:cubicInch;3"));
    context3_0.addDefinition("fluidOunce", new InDTMI("dtmi:standard:unit:fluidOunce;3"));
    context3_0.addDefinition("gallon", new InDTMI("dtmi:standard:unit:gallon;3"));
    context3_0.addDefinition("litrePerSecond", new InDTMI("dtmi:standard:unit:litrePerSecond;3"));
    context3_0.addDefinition(
      "millilitrePerSecond",
      new InDTMI("dtmi:standard:unit:millilitrePerSecond;3")
    );
    context3_0.addDefinition("litrePerHour", new InDTMI("dtmi:standard:unit:litrePerHour;3"));
    context3_0.addDefinition(
      "millilitrePerHour",
      new InDTMI("dtmi:standard:unit:millilitrePerHour;3")
    );
    context3_0.addDefinition("point", new InDTMI("dtmi:standard:schema:geospatial:point;3"));
    context3_0.addDefinition(
      "multiPoint",
      new InDTMI("dtmi:standard:schema:geospatial:multiPoint;3")
    );
    context3_0.addDefinition(
      "lineString",
      new InDTMI("dtmi:standard:schema:geospatial:lineString;3")
    );
    context3_0.addDefinition(
      "multiLineString",
      new InDTMI("dtmi:standard:schema:geospatial:multiLineString;3")
    );
    context3_0.addDefinition("polygon", new InDTMI("dtmi:standard:schema:geospatial:polygon;3"));
    context3_0.addDefinition(
      "multiPolygon",
      new InDTMI("dtmi:standard:schema:geospatial:multiPolygon;3")
    );
    versionedContexts.push(context3_0);
    return new ContextHistory(versionedContexts);
  }

  static _getAffiliate0ContextHistory(): ContextHistory {
    const versionedContexts: VersionedContext[] = [];
    const context2_0 = new VersionedContext(2, 0);
    context2_0.addDefinition("State", new InDTMI("dtmi:iotcentral:class:State;2"));
    context2_0.addDefinition("Event", new InDTMI("dtmi:iotcentral:class:Event;2"));
    context2_0.addDefinition("Location", new InDTMI("dtmi:iotcentral:class:Location;2"));
    context2_0.addDefinition(
      "VelocityVector",
      new InDTMI("dtmi:iotcentral:class:VelocityVector;2")
    );
    context2_0.addDefinition(
      "AccelerationVector",
      new InDTMI("dtmi:iotcentral:class:AccelerationVector;2")
    );
    context2_0.addDefinition("vector", new InDTMI("dtmi:iotcentral:schema:vector;2"));
    context2_0.addDefinition("geopoint", new InDTMI("dtmi:iotcentral:schema:geopoint;2"));
    versionedContexts.push(context2_0);
    const context3_0 = new VersionedContext(3, 0);
    context3_0.addDefinition("State", new InDTMI("dtmi:iotcentral:class:State;3"));
    context3_0.addDefinition("Event", new InDTMI("dtmi:iotcentral:class:Event;3"));
    context3_0.addDefinition("Location", new InDTMI("dtmi:iotcentral:class:Location;3"));
    context3_0.addDefinition(
      "VelocityVector",
      new InDTMI("dtmi:iotcentral:class:VelocityVector;3")
    );
    context3_0.addDefinition(
      "AccelerationVector",
      new InDTMI("dtmi:iotcentral:class:AccelerationVector;3")
    );
    context3_0.addDefinition("vector", new InDTMI("dtmi:iotcentral:schema:vector;3"));
    context3_0.addDefinition("geopoint", new InDTMI("dtmi:iotcentral:schema:geopoint;3"));
    versionedContexts.push(context3_0);
    return new ContextHistory(versionedContexts);
  }

  static _getAffiliate1ContextHistory(): ContextHistory {
    const versionedContexts: VersionedContext[] = [];
    const context1_0 = new VersionedContext(1, 0);
    context1_0.addDefinition("Layer", new InDTMI("dtmi:dtdl:extension:layering:v1:Layer"));
    versionedContexts.push(context1_0);
    return new ContextHistory(versionedContexts);
  }

  static _getAffiliate2ContextHistory(): ContextHistory {
    const versionedContexts: VersionedContext[] = [];
    const context1_0 = new VersionedContext(1, 0);
    context1_0.addDefinition(
      "Initialized",
      new InDTMI("dtmi:dtdl:extension:initialization:v1:Initialized")
    );
    context1_0.addDefinition(
      "initialValue",
      new InDTMI("dtmi:dtdl:extension:initialization:v1:Initialized:initialValue")
    );
    versionedContexts.push(context1_0);
    return new ContextHistory(versionedContexts);
  }

  static _getAffiliate3ContextHistory(): ContextHistory {
    const versionedContexts: VersionedContext[] = [];
    const context1_0 = new VersionedContext(1, 0);
    context1_0.addDefinition(
      "Historized",
      new InDTMI("dtmi:dtdl:extension:historization:v1:Historized")
    );
    versionedContexts.push(context1_0);
    const context2_0 = new VersionedContext(2, 0);
    context2_0.addDefinition(
      "Historized",
      new InDTMI("dtmi:dtdl:extension:historization:v2:Historized")
    );
    versionedContexts.push(context2_0);
    return new ContextHistory(versionedContexts);
  }

  // codegen-outline-begin fields
  private static readonly _contextKeyword: string = "@context";
  private static readonly _dtdlContextPrefix: string = "dtmi:dtdl:context;";
  private static _termRegex: RegExp = /^[A-Za-z0-9\\-\\._~!\\$&'\\(\\)\\*\\+,;=][@A-Za-z0-9\\-\\._~!\\$&'\\(\\)\\*\\+,;=]*$/;

  private static _dtdlContextHistory: ContextHistory;
  private static _affiliateContextHistories: { [affiliateName: string]: ContextHistory };

  private readonly _rejectUndefinedExtensions: boolean;
  private readonly _rejectNonDtmiContexts: boolean;
  private readonly _maxDtdlVersion?: number;

  private _activeDtdlContext?: VersionedContext;
  private _activeAffiliateContexts: { [affiliateName: string]: VersionedContext };

  private _localTermDefinitions: TermDict;
  private _localPrefixDefinitions: PrefixDict;
  // codegen-outline-end

  // codegen-outline-begin methods
  constructor(
    rejectUndefinedExtensions: boolean,
    rejectNonDtmiContexts: boolean,
    maxDtdlVersion?: number
  ) {
    this._rejectUndefinedExtensions = rejectUndefinedExtensions;
    this._rejectNonDtmiContexts = rejectNonDtmiContexts;
    this._maxDtdlVersion = maxDtdlVersion;
    this._activeAffiliateContexts = {};
    this._localTermDefinitions = {};
    this._localPrefixDefinitions = {};
  }

  get dtdlVersion() {
    return this._activeDtdlContext === undefined ? 0 : this._activeDtdlContext.majorVersion;
  }

  public static getTermOrUri(uriString: string): string {
    let term: string | undefined;

    term = AggregateContext._dtdlContextHistory.getTerm(uriString);
    if (term !== undefined) {
      return term;
    }

    for (const affiliateName in AggregateContext._affiliateContextHistories) {
      // eslint-disable-line guard-for-in
      term = AggregateContext._affiliateContextHistories[affiliateName].getTerm(uriString);
      if (term !== undefined) {
        return term;
      }
    }

    return uriString;
  }

  public static isIdentifierInContext(uriString: string): boolean {
    if (AggregateContext._dtdlContextHistory.isIdentifierInContext(uriString)) {
      return true;
    }

    for (const affiliateName in AggregateContext._affiliateContextHistories) {
      if (
        AggregateContext._affiliateContextHistories[affiliateName].isIdentifierInContext(uriString)
      ) {
        return true;
      }
    }

    return false;
  }

  public getChildContext(
    obj: { [index: string]: any },
    parsingErrors: ParsingError[]
  ): AggregateContext {
    if (!Object.prototype.hasOwnProperty.call(obj, AggregateContext._contextKeyword)) {
      if (this._activeDtdlContext === undefined) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:missingContext", {
            cause: `No @context specifier in top-level JSON object.`,
            action: `Add a '@context' property whose value is a valid DTDL context specifier, such as 'dtmi:dtdl:context;2'.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return this;
    }

    const contextToken = obj[AggregateContext._contextKeyword];

    if (Array.isArray(contextToken)) {
      return this._getChildContextFromContextArray(contextToken, parsingErrors);
    } else if (typeof contextToken === "string" || typeof contextToken === "object") {
      return this._getChildContextFromContextArray([contextToken], parsingErrors);
    } else {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContext", {
          cause: `Model contains @context value that is not a JSON string, object, or array of strings and objects.`,
          action: `Remove all @context values other than JSON strings, objects, and arrays of strings and objects.`
        })
      );
      throw new ParsingException(parsingErrors);
    }
  }

  public createDtmi(uriOrTerm: string): InDTMI | undefined {
    let dtmi: InDTMI | undefined;

    if (this._activeDtdlContext === undefined) {
      return undefined;
    }

    if (uriOrTerm.startsWith("dtmi:")) {
      if (IdValidator.isIdReferenceValid(uriOrTerm, this._activeDtdlContext.majorVersion)) {
        return new InDTMI(uriOrTerm);
      } else {
        return undefined;
      }
    }

    dtmi = this._activeDtdlContext.getDtmi(uriOrTerm);
    if (dtmi !== undefined) {
      return dtmi;
    }

    if (Object.prototype.hasOwnProperty.call(this._localTermDefinitions, uriOrTerm)) {
      return this._localTermDefinitions[uriOrTerm];
    }

    const colonPos = uriOrTerm.indexOf(":");
    if (colonPos >= 0) {
      const prefix = uriOrTerm.substring(0, colonPos);
      if (!Object.prototype.hasOwnProperty.call(this._localPrefixDefinitions, prefix)) {
        return undefined;
      }

      const conjunction = `${this._localPrefixDefinitions[prefix]}${uriOrTerm.substring(
        colonPos + 1
      )}`;
      if (IdValidator.isIdReferenceValid(conjunction, this._activeDtdlContext.majorVersion)) {
        return new InDTMI(conjunction);
      } else {
        return undefined;
      }
    }

    for (const affiliateName in this._activeAffiliateContexts) {
      // eslint-disable-line guard-for-in
      dtmi = this._activeAffiliateContexts[affiliateName].getDtmi(uriOrTerm);
      if (dtmi !== undefined) {
        return dtmi;
      }
    }

    return undefined;
  }

  private _getChildContextFromContextArray(
    contextArray: any[],
    parsingErrors: ParsingError[]
  ): AggregateContext {
    if (contextArray.length === 0) {
      if (this._activeDtdlContext === undefined) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:emptyContext", {
            cause: `Empty @context specifier in top-level JSON object.`,
            action: `To the top-level '@context' property, add a string whose value is a valid DTDL context specifier, such as 'dtmi:dtdl:context;2'.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return this;
    }

    let childDtdlContext = this._activeDtdlContext;
    let startIndex = 0;

    const prefaceAffiliateContexts: { [affiliateName: string]: VersionedContext } = {};
    while (
      startIndex < contextArray.length &&
      typeof contextArray[startIndex] === "string" &&
      Object.prototype.hasOwnProperty.call(
        AggregateContext._affiliateContextsImplicitDtdlVersions,
        contextArray[startIndex]
      )
    ) {
      const affiliate = this._getAffiliateContextFromContextToken(
        contextArray[startIndex],
        AggregateContext._affiliateContextsImplicitDtdlVersions[contextArray[startIndex]],
        parsingErrors
      );
      if (affiliate !== undefined) {
        prefaceAffiliateContexts[affiliate.name] = affiliate.context;
      }

      ++startIndex;
    }

    while (
      startIndex < contextArray.length &&
      typeof contextArray[startIndex] === "string" &&
      contextArray[startIndex].startsWith(AggregateContext._dtdlContextPrefix)
    ) {
      childDtdlContext = this._getDtdlContextFromContextString(
        contextArray[startIndex],
        parsingErrors
      );
      ++startIndex;
    }

    if (childDtdlContext === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:missingDtdlContext", {
          cause: `@context specifier in top-level JSON object does not include a DTDL context specifier as its string value or as the first entry of its array value.`,
          action: `Set the first value of the '@context' property to a valid DTDL context specifier, such as 'dtmi:dtdl:context;2'.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    let childTermDefinitions = this._localTermDefinitions;
    let childPrefixDefinitions = this._localPrefixDefinitions;
    let endIndex = contextArray.length - 1;
    if (typeof contextArray[endIndex] === "object") {
      if (
        !AggregateContext._dtdlVersionsAllowingLocalTerms.includes(childDtdlContext.majorVersion)
      ) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:disallowedLocalContext", {
            cause: `@context value contains local context definitions, which are not allowed in DTDL version ${childDtdlContext.majorVersion}.`,
            action: `Remove the local context object, or try specifiying a different version of DTDL.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      ({
        childTermDefinitions,
        childPrefixDefinitions
      } = this._getChildDefinitionsfromContextObject(
        contextArray[endIndex],
        childDtdlContext.majorVersion,
        parsingErrors
      ));
      --endIndex;
    }

    let childAffiliateContexts = this._activeAffiliateContexts;
    if (startIndex <= endIndex || prefaceAffiliateContexts !== {}) {
      childAffiliateContexts = { ...this._activeAffiliateContexts };

      for (const affiliateName in prefaceAffiliateContexts) {
        // eslint-disable-line guard-for-in
        childAffiliateContexts[affiliateName] = prefaceAffiliateContexts[affiliateName];
      }

      for (let index = startIndex; index <= endIndex; ++index) {
        const affiliate = this._getAffiliateContextFromContextToken(
          contextArray[index],
          childDtdlContext.majorVersion,
          parsingErrors
        );
        if (affiliate !== undefined) {
          childAffiliateContexts[affiliate.name] = affiliate.context;
        }
      }
    }

    const childAggregateContext = new AggregateContext(
      this._rejectUndefinedExtensions,
      this._rejectNonDtmiContexts,
      this._maxDtdlVersion
    );
    childAggregateContext._activeDtdlContext = childDtdlContext;
    childAggregateContext._activeAffiliateContexts = childAffiliateContexts;
    childAggregateContext._localTermDefinitions = childTermDefinitions;
    childAggregateContext._localPrefixDefinitions = childPrefixDefinitions;

    return childAggregateContext;
  }

  private _getDtdlContextFromContextString(
    contextString: string,
    parsingErrors: ParsingError[]
  ): VersionedContext {
    const dtdlContextDtmi = InDTMI.createDtmi(contextString);
    if (dtdlContextDtmi === undefined || dtdlContextDtmi.fragment !== "") {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContextSpecifier", {
          cause: `Model contains @context specifier '${contextString}' that is not a legal DTMI.`,
          action: `Replace the @context specifier with a string that conforms to the DTMI syntax -- see https://github.com/Azure/digital-twin-model-identifier.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (dtdlContextDtmi.majorVersion === 0) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:missingContextVersion", {
          cause: `Model contains @context specifier '${contextString}', which is invalid because it lacks a version number.`,
          action: `Modify @context specifier so that DTDL version number follows ';'.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    const versionedContext = AggregateContext._dtdlContextHistory.getMatchingContext(
      dtdlContextDtmi.majorVersion,
      dtdlContextDtmi.minorVersion
    );
    if (versionedContext === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:unrecognizedContextVersion", {
          cause: `Model contains @context specifier '${contextString}', which specifies a DTDL version that is not recognized.`,
          action: `Modify @context specifier to indicate one of the following DTDL versions: ${AggregateContext._dtdlContextHistory.availableVersions}.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (this._maxDtdlVersion !== undefined && dtdlContextDtmi.majorVersion > this._maxDtdlVersion) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:disallowedContextVersion", {
          cause: `Model contains @context specifier '${contextString}', which specifies a DTDL version that exceeds the configured max version of ${this._maxDtdlVersion}.`,
          action: `Modify @context specifier to indicate a DTDL major version no greater than ${this._maxDtdlVersion}.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (!IdValidator.isIdReferenceValid(contextString, dtdlContextDtmi.majorVersion)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContextSpecifierForVersion", {
          cause: `Model contains @context specifier '${contextString}', which is not a valid DTMI for DTDL version ${dtdlContextDtmi.majorVersion}.`,
          action: `Change @context specifier to a valid DTMI for DTDL version ${dtdlContextDtmi.majorVersion} -- see https://github.com/Azure/digital-twin-model-identifier.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    return versionedContext;
  }

  private _getAffiliateContextFromContextToken(
    contextToken: any,
    dtdlVersion: number,
    parsingErrors: ParsingError[]
  ): { name: string; context: VersionedContext } | undefined {
    if (typeof contextToken !== "string") {
      if (typeof contextToken === "object") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localContextNotLast", {
            cause: `@context array contains a local context object that is not the last element in the array.`,
            action: `Merge all local context definitions into a single object and locate it at the end of the @context array.`
          })
        );
        throw new ParsingException(parsingErrors);
      } else {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:invalidContextElement", {
            cause: `Model contains @context array with an element that is not a JSON string or object.`,
            action: `Remove all @context array elements other than JSON strings and objects.`
          })
        );
        throw new ParsingException(parsingErrors);
      }
    }

    if (contextToken.startsWith(AggregateContext._dtdlContextPrefix)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:dtdlContextFollowsAffiliate", {
          cause: `@context array contains DTDL context specifier '${contextToken}' after an affiliate context specifier.`,
          action: `Rearrange context specifiers so that all DTDL context specifiers are at the beginning of @context array.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (!contextToken.startsWith(`dtmi:`)) {
      if (this._rejectNonDtmiContexts) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:nonDtmiContextSpecifier", {
            cause: `Model contains @context specifier '${contextToken}', which is not a DTMI.`,
            action: `Remove '${contextToken}' @context specifier.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return undefined;
    }

    const affiliateContextDtmi = InDTMI.createDtmi(contextToken);
    if (affiliateContextDtmi === undefined || affiliateContextDtmi.fragment !== "") {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContextSpecifier", {
          cause: `Model contains @context specifier '${contextToken}' that is not a legal DTMI.`,
          action: `Replace the @context specifier with a string that conforms to the DTMI syntax -- see https://github.com/Azure/digital-twin-model-identifier.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (!IdValidator.isIdReferenceValid(contextToken, dtdlVersion)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContextSpecifierForVersion", {
          cause: `Model contains @context specifier '${contextToken}', which is not a valid DTMI for DTDL version {dtdlVersion}.`,
          action: `Change @context specifier to a valid DTMI for DTDL version ${dtdlVersion} -- see https://github.com/Azure/digital-twin-model-identifier.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (affiliateContextDtmi.majorVersion === 0) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:missingContextVersion", {
          cause: `Model contains @context specifier '${contextToken}', which is invalid because it lacks a version number.`,
          action: `Modify @context specifier so that extension version number follows ';'.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (
      !Object.prototype.hasOwnProperty.call(
        AggregateContext._affiliateContextHistories,
        affiliateContextDtmi.versionless
      )
    ) {
      if (this._rejectUndefinedExtensions) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:unresolvableContextSpecifier", {
            cause: `Model contains @context specifier '${contextToken}', which is unrecognized.`,
            action: `Remove '${contextToken}' @context specifier.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return undefined;
    }

    const affiliateContextHistory =
      AggregateContext._affiliateContextHistories[affiliateContextDtmi.versionless];
    const affiliateContext = affiliateContextHistory.getMatchingContext(
      affiliateContextDtmi.majorVersion,
      affiliateContextDtmi.minorVersion
    );
    if (affiliateContext === undefined) {
      if (this._rejectUndefinedExtensions) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:unresolvableContextVersion", {
            cause: `Model contains @context specifier '${contextToken}', which specifies a context version that is not recognized.`,
            action: `Modify @context specifier to indicate one of the following versions: ${affiliateContextHistory.availableVersions}.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return undefined;
    }

    return { name: affiliateContextDtmi.versionless, context: affiliateContext };
  }

  private _getChildDefinitionsfromContextObject(
    contextObj: { [term: string]: string },
    dtdlVersion: number,
    parsingErrors: ParsingError[]
  ): { childTermDefinitions: TermDict; childPrefixDefinitions: PrefixDict } {
    const termDefinitions = { ...this._localTermDefinitions };
    const prefixDefinitions = { ...this._localPrefixDefinitions };

    for (const term in contextObj) {
      // eslint-disable-line guard-for-in
      if (term === "") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localTermEmpty", {
            cause: `@context defines local term that is an empty string.`,
            action: `Use a non-empty string of characters for the term.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (term === `dtmi`) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localTermSchemePrefix", {
            cause: `@context contains a local definition for term 'dtmi' which is reserved as the scheme prefix for DTDL identifiers.`,
            action: `Use a different term other than 'dtmi'.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (!AggregateContext._termRegex.test(term)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localTermInvalid", {
            cause: `@context defines local term '${term}' that contains invalid characters.`,
            action: `Use a different term that does not begin with '@' and that contains only letters, digits, and the characters '@', '-', '.', '_', '~', '!', '$', '&', ''', '(', ')', '*', '+', ',', ';', '='.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (AggregateContext._dtdlContextHistory.isTermInContext(term)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localTermReserved", {
            cause: `@context contains a local definition for term '${term}' that is defined by the DTDL context.`,
            action: `Use a different term that is not a DTDL keyword.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      delete termDefinitions[term];
      delete prefixDefinitions[term];

      const definition = contextObj[term];

      if (definition === null) {
        continue;
      } else if (typeof definition !== "string") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localDefinitionNotString", {
            cause: `@context contains a local definition for term '${term}' that is not a JSON string.`,
            action: `Change the value of term '${term}' to a JSON string representing a valid DTMI or DTMI prefix.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (!definition.startsWith(`dtmi:`)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localDefinitionNotDtmiScheme", {
            cause: `@context contains a local definition for term '${term}' whose value '${definition}' is not a DTMI or DTMI prefix.`,
            action: `Change the value of term '${term}' to a JSON string representing a valid DTMI or DTMI prefix.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (definition.endsWith(`:`)) {
        prefixDefinitions[term] = definition;
      } else {
        if (!IdValidator.isIdReferenceValid(definition, dtdlVersion)) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:localDefinitionNotDtmi", {
              cause: `@context contains a local definition for term '${term}' whose value '${definition}' is not a valid DTMI or DTMI prefix for DTDL version {dtdlVersion}.`,
              action: `Change the value of term '${term}' to a JSON string representing a valid DTMI or DTMI prefix -- see https://github.com/Azure/digital-twin-model-identifier.`
            })
          );
          throw new ParsingException(parsingErrors);
        }

        termDefinitions[term] = new InDTMI(definition);
      }
    }

    return { childTermDefinitions: termDefinitions, childPrefixDefinitions: prefixDefinitions };
  }
  // codegen-outline-ends
}

AggregateContext.initialize();
