// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { ParsedObjectPropertyInfo, Model, ModelParserImpl, AggregateContext } from "./internal";
import { InDTMI, ParsingError, ParsingException } from "./internal";
type EntityInfo = any;
/**
 * A collection of values of standard elements from the DTDL metamodel.
 **/
export class StandardElements {
  static getElement(elementId: InDTMI): EntityInfo {
    return this._standardModel.dict[elementId.value];
  }

  static getDigestElements(): any {
    return [
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:boolean;2",
        "@type": "Boolean",
        displayName: "boolean",
        description: "a boolean value"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:double;2",
        "@type": "Double",
        displayName: "double",
        description: "an IEEE 8-byte floating point"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:float;2",
        "@type": "Float",
        displayName: "float",
        description: "an IEEE 4-byte floating point"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:integer;2",
        "@type": "Integer",
        displayName: "integer",
        description: "a signed 4-byte integer"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:long;2",
        "@type": "Long",
        displayName: "long",
        description: "a signed 8-byte integer"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:date;2",
        "@type": "Date",
        displayName: "date",
        description:
          "a date in ISO 8601 format, per [RFC 3339](https://tools.ietf.org/html/rfc3339)"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:dateTime;2",
        "@type": "DateTime",
        displayName: "dateTime",
        description:
          "a date and time in ISO 8601 format, per [RFC 3339](https://tools.ietf.org/html/rfc3339)"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:duration;2",
        "@type": "Duration",
        displayName: "duration",
        description: "a duration in ISO 8601 format"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:time;2",
        "@type": "Time",
        displayName: "time",
        description:
          "a time in ISO 8601 format, per [RFC 3339](https://tools.ietf.org/html/rfc3339)"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:Schema:string;2",
        "@type": "String",
        displayName: "string",
        description: "a UTF8 string"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:CommandType:asynchronous;2",
        "@type": "CommandType",
        displayName: "asynchronous",
        description:
          "The command will complete sometime after control returns to the caller. After the command completes, the result and any outputs are available."
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:dtdl:instance:CommandType:synchronous;2",
        "@type": "CommandType",
        displayName: "synchronous",
        description:
          "The command will be complete when control returns to the caller. The result and any outputs are available immediately."
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:boolean;3",
        "@type": "Boolean",
        displayName: "boolean",
        description: "a boolean value"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:double;3",
        "@type": "Double",
        displayName: "double",
        description: "an IEEE 8-byte floating point"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:float;3",
        "@type": "Float",
        displayName: "float",
        description: "an IEEE 4-byte floating point"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:integer;3",
        "@type": "Integer",
        displayName: "integer",
        description: "a signed 4-byte integer"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:long;3",
        "@type": "Long",
        displayName: "long",
        description: "a signed 8-byte integer"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:date;3",
        "@type": "Date",
        displayName: "date",
        description:
          "a date in ISO 8601 format, per [RFC 3339](https://tools.ietf.org/html/rfc3339)"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:dateTime;3",
        "@type": "DateTime",
        displayName: "dateTime",
        description:
          "a date and time in ISO 8601 format, per [RFC 3339](https://tools.ietf.org/html/rfc3339)"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:duration;3",
        "@type": "Duration",
        displayName: "duration",
        description: "a duration in ISO 8601 format"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:time;3",
        "@type": "Time",
        displayName: "time",
        description:
          "a time in ISO 8601 format, per [RFC 3339](https://tools.ietf.org/html/rfc3339)"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:Schema:string;3",
        "@type": "String",
        displayName: "string",
        description: "a UTF8 string"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:CommandType:asynchronous;3",
        "@type": "CommandType",
        displayName: "asynchronous",
        description:
          "The command will complete sometime after control returns to the caller. After the command completes, the result and any outputs are available."
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:dtdl:instance:CommandType:synchronous;3",
        "@type": "CommandType",
        displayName: "synchronous",
        description:
          "The command will be complete when control returns to the caller. The result and any outputs are available immediately."
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:deci;2",
        "@type": "DecimalPrefix",
        name: "deci",
        symbol: "d",
        exponent: -1
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:centi;2",
        "@type": "DecimalPrefix",
        name: "centi",
        symbol: "c",
        exponent: -2
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:milli;2",
        "@type": "DecimalPrefix",
        name: "milli",
        symbol: "m",
        exponent: -3
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:micro;2",
        "@type": "DecimalPrefix",
        name: "micro",
        symbol: "æ",
        exponent: -6
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:nano;2",
        "@type": "DecimalPrefix",
        name: "nano",
        symbol: "n",
        exponent: -9
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:pico;2",
        "@type": "DecimalPrefix",
        name: "pico",
        symbol: "p",
        exponent: -12
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:femto;2",
        "@type": "DecimalPrefix",
        name: "femto",
        symbol: "f",
        exponent: -15
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:atto;2",
        "@type": "DecimalPrefix",
        name: "atto",
        symbol: "a",
        exponent: -18
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:zepto;2",
        "@type": "DecimalPrefix",
        name: "zepto",
        symbol: "z",
        exponent: -21
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:yocto;2",
        "@type": "DecimalPrefix",
        name: "yocto",
        symbol: "y",
        exponent: -24
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:deka;2",
        "@type": "DecimalPrefix",
        name: "deka",
        symbol: "da",
        exponent: 1
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:hecto;2",
        "@type": "DecimalPrefix",
        name: "hecto",
        symbol: "h",
        exponent: 2
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:kilo;2",
        "@type": "DecimalPrefix",
        name: "kilo",
        symbol: "k",
        exponent: 3
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:mega;2",
        "@type": "DecimalPrefix",
        name: "mega",
        symbol: "M",
        exponent: 6
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:giga;2",
        "@type": "DecimalPrefix",
        name: "giga",
        symbol: "G",
        exponent: 9
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:tera;2",
        "@type": "DecimalPrefix",
        name: "tera",
        symbol: "T",
        exponent: 12
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:peta;2",
        "@type": "DecimalPrefix",
        name: "peta",
        symbol: "P",
        exponent: 15
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:exa;2",
        "@type": "DecimalPrefix",
        name: "exa",
        symbol: "E",
        exponent: 18
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:zetta;2",
        "@type": "DecimalPrefix",
        name: "zetta",
        symbol: "Z",
        exponent: 21
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:yotta;2",
        "@type": "DecimalPrefix",
        name: "yotta",
        symbol: "Y",
        exponent: 24
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:kibi;2",
        "@type": "BinaryPrefix",
        name: "kibi",
        symbol: "Ki",
        exponent: 10
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:mebi;2",
        "@type": "BinaryPrefix",
        name: "mebi",
        symbol: "Mi",
        exponent: 20
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:gibi;2",
        "@type": "BinaryPrefix",
        name: "gibi",
        symbol: "Gi",
        exponent: 30
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:tebi;2",
        "@type": "BinaryPrefix",
        name: "tebi",
        symbol: "Ti",
        exponent: 40
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:pebi;2",
        "@type": "BinaryPrefix",
        name: "pebi",
        symbol: "Pi",
        exponent: 50
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:exbi;2",
        "@type": "BinaryPrefix",
        name: "exbi",
        symbol: "Ei",
        exponent: 60
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:zebi;2",
        "@type": "BinaryPrefix",
        name: "zebi",
        symbol: "Zi",
        exponent: 70
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unitprefix:yobi;2",
        "@type": "BinaryPrefix",
        name: "yobi",
        symbol: "Yi",
        exponent: 80
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:metrePerSecondSquared;2",
        "@type": ["AccelerationUnit", "DecimalUnit", "RatioUnit"],
        displayName: "metre per second squared",
        symbol: "m/sý",
        baseUnit: "metrePerSecondSquared",
        topUnit: "metrePerSecond",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:centimetrePerSecondSquared;2",
        "@type": ["AccelerationUnit", "DecimalUnit", "RatioUnit"],
        displayName: "centimetre per second squared",
        symbol: "cm/sý",
        baseUnit: "metrePerSecondSquared",
        prefix: "centi",
        topUnit: "centimetrePerSecond",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gForce;2",
        "@type": ["AccelerationUnit"],
        displayName: "g-force",
        symbol: "g"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:radian;2",
        "@type": ["AngleUnit"],
        displayName: "radian",
        symbol: "rad"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:degreeOfArc;2",
        "@type": ["AngleUnit"],
        displayName: "degree of arc",
        symbol: "ø"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:minuteOfArc;2",
        "@type": ["AngleUnit"],
        displayName: "minute of arc",
        symbol: "'"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:secondOfArc;2",
        "@type": ["AngleUnit"],
        displayName: "second of arc",
        symbol: '"'
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:turn;2",
        "@type": ["AngleUnit"],
        displayName: "turn",
        symbol: "turn"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:radianPerSecondSquared;2",
        "@type": ["AngularAccelerationUnit", "RatioUnit"],
        displayName: "radian per second squared",
        symbol: "rad/sý",
        topUnit: "radianPerSecond",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:radianPerSecond;2",
        "@type": ["AngularVelocityUnit", "RatioUnit"],
        displayName: "radian per second",
        symbol: "rad/s",
        topUnit: "radian",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:degreePerSecond;2",
        "@type": ["AngularVelocityUnit", "RatioUnit"],
        displayName: "degree per second",
        symbol: "ø/s",
        topUnit: "degreeOfArc",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:revolutionPerSecond;2",
        "@type": ["AngularVelocityUnit", "RatioUnit"],
        displayName: "revolution per second",
        symbol: "rps",
        topUnit: "turn",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:revolutionPerMinute;2",
        "@type": ["AngularVelocityUnit", "RatioUnit"],
        displayName: "revolution per minute",
        symbol: "rpm",
        topUnit: "turn",
        bottomUnit: "minute"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:squareMetre;2",
        "@type": ["AreaUnit"],
        displayName: "square metre",
        symbol: "mý"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:squareCentimetre;2",
        "@type": ["AreaUnit"],
        displayName: "square centimetre",
        symbol: "cmý"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:squareMillimetre;2",
        "@type": ["AreaUnit"],
        displayName: "square millimetre",
        symbol: "mmý"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:squareKilometre;2",
        "@type": ["AreaUnit"],
        displayName: "square kilometre",
        symbol: "kmý"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:hectare;2",
        "@type": ["AreaUnit"],
        displayName: "hectare",
        symbol: "ha"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:squareFoot;2",
        "@type": ["AreaUnit"],
        displayName: "square foot",
        symbol: "ftý"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:squareInch;2",
        "@type": ["AreaUnit"],
        displayName: "square inch",
        symbol: "iný"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:acre;2",
        "@type": ["AreaUnit"],
        displayName: "acre",
        symbol: "ac"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:farad;2",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "farad",
        symbol: "F",
        baseUnit: "farad"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millifarad;2",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "millifarad",
        symbol: "mF",
        baseUnit: "farad",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:microfarad;2",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "microfarad",
        symbol: "æF",
        baseUnit: "farad",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:nanofarad;2",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "nanofarad",
        symbol: "nF",
        baseUnit: "farad",
        prefix: "nano"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:picofarad;2",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "picofarad",
        symbol: "pF",
        baseUnit: "farad",
        prefix: "pico"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:coulomb;2",
        "@type": ["ChargeUnit", "DecimalUnit"],
        displayName: "coulomb",
        symbol: "C",
        baseUnit: "coulomb"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:ampere;2",
        "@type": ["CurrentUnit", "DecimalUnit"],
        displayName: "ampere",
        symbol: "A",
        baseUnit: "ampere"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:microampere;2",
        "@type": ["CurrentUnit", "DecimalUnit"],
        displayName: "microampere",
        symbol: "æA",
        baseUnit: "ampere",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:milliampere;2",
        "@type": ["CurrentUnit", "DecimalUnit"],
        displayName: "milliampere",
        symbol: "mA",
        baseUnit: "ampere",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:bitPerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "bit per second",
        symbol: "bps",
        baseUnit: "bitPerSecond",
        topUnit: "bit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kibibitPerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "kibibit per second",
        symbol: "Kibps",
        baseUnit: "bitPerSecond",
        prefix: "kibi",
        topUnit: "kibibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:mebibitPerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "mebibit per second",
        symbol: "Mibps",
        baseUnit: "bitPerSecond",
        prefix: "mebi",
        topUnit: "mebibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gibibitPerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "gibibit per second",
        symbol: "Gibps",
        baseUnit: "bitPerSecond",
        prefix: "gibi",
        topUnit: "gibibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:tebibitPerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "tebibit per second",
        symbol: "Tibps",
        baseUnit: "bitPerSecond",
        prefix: "tebi",
        topUnit: "tebibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:exbibitPerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "exbibit per second",
        symbol: "Eibps",
        baseUnit: "bitPerSecond",
        prefix: "exbi",
        topUnit: "exbibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:zebibitPerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "zebibit per second",
        symbol: "Zibps",
        baseUnit: "bitPerSecond",
        prefix: "zebi",
        topUnit: "zebibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:yobibitPerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "yobibit per second",
        symbol: "Yibps",
        baseUnit: "bitPerSecond",
        prefix: "yobi",
        topUnit: "yobibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:bytePerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "byte per second",
        symbol: "Bps",
        baseUnit: "bytePerSecond",
        topUnit: "byte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kibibytePerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "kibibyte per second",
        symbol: "KiBps",
        baseUnit: "bytePerSecond",
        prefix: "kibi",
        topUnit: "kibibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:mebibytePerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "mebibyte per second",
        symbol: "MiBps",
        baseUnit: "bytePerSecond",
        prefix: "mebi",
        topUnit: "mebibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gibibytePerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "gibibyte per second",
        symbol: "GiBps",
        baseUnit: "bytePerSecond",
        prefix: "gibi",
        topUnit: "gibibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:tebibytePerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "tebibyte per second",
        symbol: "TiBps",
        baseUnit: "bytePerSecond",
        prefix: "tebi",
        topUnit: "tebibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:exbibytePerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "exbibyte per second",
        symbol: "EiBps",
        baseUnit: "bytePerSecond",
        prefix: "exbi",
        topUnit: "exbibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:zebibytePerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "zebibyte per second",
        symbol: "ZiBps",
        baseUnit: "bytePerSecond",
        prefix: "zebi",
        topUnit: "zebibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:yobibytePerSecond;2",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "yobibyte per second",
        symbol: "YiBps",
        baseUnit: "bytePerSecond",
        prefix: "yobi",
        topUnit: "yobibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:bit;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "bit",
        symbol: "bit",
        baseUnit: "bit"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kibibit;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "kibibit",
        symbol: "Kibit",
        baseUnit: "bit",
        prefix: "kibi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:mebibit;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "mebibit",
        symbol: "Mibit",
        baseUnit: "bit",
        prefix: "mebi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gibibit;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "gibibit",
        symbol: "Gibit",
        baseUnit: "bit",
        prefix: "gibi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:tebibit;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "tebibit",
        symbol: "Tibit",
        baseUnit: "bit",
        prefix: "tebi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:exbibit;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "exbibit",
        symbol: "Eibit",
        baseUnit: "bit",
        prefix: "exbi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:zebibit;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "zebibit",
        symbol: "Zibit",
        baseUnit: "bit",
        prefix: "zebi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:yobibit;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "yobibit",
        symbol: "Yibit",
        baseUnit: "bit",
        prefix: "yobi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:byte;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "byte",
        symbol: "B",
        baseUnit: "byte"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kibibyte;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "kibibyte",
        symbol: "KiB",
        baseUnit: "byte",
        prefix: "kibi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:mebibyte;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "mebibyte",
        symbol: "MiB",
        baseUnit: "byte",
        prefix: "mebi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gibibyte;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "gibibyte",
        symbol: "GiB",
        baseUnit: "byte",
        prefix: "gibi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:tebibyte;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "tebibyte",
        symbol: "TiB",
        baseUnit: "byte",
        prefix: "tebi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:exbibyte;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "exbibyte",
        symbol: "EiB",
        baseUnit: "byte",
        prefix: "exbi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:zebibyte;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "zebibyte",
        symbol: "ZiB",
        baseUnit: "byte",
        prefix: "zebi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:yobibyte;2",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "yobibyte",
        symbol: "YiB",
        baseUnit: "byte",
        prefix: "yobi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilogramPerCubicMetre;2",
        "@type": ["DensityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilogram per cubic metre",
        symbol: "kg/m3",
        baseUnit: "gramPerCubicMetre",
        prefix: "kilo",
        topUnit: "kilogram",
        bottomUnit: "cubicMetre"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gramPerCubicMetre;2",
        "@type": ["DensityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "gram per cubic metre",
        symbol: "g/m3",
        baseUnit: "gramPerCubicMetre",
        topUnit: "gram",
        bottomUnit: "cubicMetre"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:joule;2",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "joule",
        symbol: "J",
        baseUnit: "joule"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilojoule;2",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "kilojoule",
        symbol: "kJ",
        baseUnit: "joule",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:megajoule;2",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "megajoule",
        symbol: "MJ",
        baseUnit: "joule",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gigajoule;2",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "gigajoule",
        symbol: "GJ",
        baseUnit: "joule",
        prefix: "giga"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:electronvolt;2",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "electronvolt",
        symbol: "eV",
        baseUnit: "electronvolt"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:megaelectronvolt;2",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "megaelectronvolt",
        symbol: "MeV",
        baseUnit: "electronvolt",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilowattHour;2",
        "@type": ["EnergyUnit"],
        displayName: "kilowat-hour",
        symbol: "kWh"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:newton;2",
        "@type": ["ForceUnit", "DecimalUnit"],
        displayName: "newton",
        symbol: "N",
        baseUnit: "newton"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:pound;2",
        "@type": ["ForceUnit"],
        displayName: "pound",
        symbol: "lb"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:ounce;2",
        "@type": ["ForceUnit"],
        displayName: "ounce",
        symbol: "oz"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:ton;2",
        "@type": ["ForceUnit"],
        displayName: "ton",
        symbol: "T"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:hertz;2",
        "@type": ["FrequencyUnit", "DecimalUnit"],
        displayName: "hertz",
        symbol: "Hz",
        baseUnit: "hertz"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilohertz;2",
        "@type": ["FrequencyUnit", "DecimalUnit"],
        displayName: "kilohertz",
        symbol: "kHz",
        baseUnit: "hertz",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:megahertz;2",
        "@type": ["FrequencyUnit", "DecimalUnit"],
        displayName: "megahertz",
        symbol: "MHz",
        baseUnit: "hertz",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gigahertz;2",
        "@type": ["FrequencyUnit", "DecimalUnit"],
        displayName: "gigahertz",
        symbol: "GHz",
        baseUnit: "hertz",
        prefix: "giga"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:lux;2",
        "@type": ["IlluminanceUnit", "DecimalUnit"],
        displayName: "lux",
        symbol: "lx",
        baseUnit: "lux"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:footcandle;2",
        "@type": ["IlluminanceUnit"],
        displayName: "footcandle",
        symbol: "fc"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:henry;2",
        "@type": ["InductanceUnit", "DecimalUnit"],
        displayName: "henry",
        symbol: "H",
        baseUnit: "henry"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millihenry;2",
        "@type": ["InductanceUnit", "DecimalUnit"],
        displayName: "millihenry",
        symbol: "mH",
        baseUnit: "henry",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:microhenry;2",
        "@type": ["InductanceUnit", "DecimalUnit"],
        displayName: "microhenry",
        symbol: "æH",
        baseUnit: "henry",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:metre;2",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "metre",
        symbol: "m",
        baseUnit: "metre"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:centimetre;2",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "centimetre",
        symbol: "cm",
        baseUnit: "metre",
        prefix: "centi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millimetre;2",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "millimetre",
        symbol: "mm",
        baseUnit: "metre",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:micrometre;2",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "micrometre",
        symbol: "æm",
        baseUnit: "metre",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:nanometre;2",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "nanometre",
        symbol: "nm",
        baseUnit: "metre",
        prefix: "nano"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilometre;2",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "kilometre",
        symbol: "km",
        baseUnit: "metre",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:foot;2",
        "@type": ["LengthUnit"],
        displayName: "foot",
        symbol: "ft"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:inch;2",
        "@type": ["LengthUnit"],
        displayName: "inch",
        symbol: "in"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:mile;2",
        "@type": ["LengthUnit"],
        displayName: "mile",
        symbol: "mi"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:nauticalMile;2",
        "@type": ["LengthUnit"],
        displayName: "nautical mile",
        symbol: "M"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:astronomicalUnit;2",
        "@type": ["LengthUnit"],
        displayName: "astronomical unit",
        symbol: "AU"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:candelaPerSquareMetre;2",
        "@type": ["LuminanceUnit", "DecimalUnit", "RatioUnit"],
        displayName: "candela per square metre",
        symbol: "cd/mý",
        baseUnit: "candelaPerSquareMetre",
        topUnit: "candela",
        bottomUnit: "squareMetre"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:lumen;2",
        "@type": ["LuminousFluxUnit", "DecimalUnit"],
        displayName: "lumen",
        symbol: "lm",
        baseUnit: "lumen"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:candela;2",
        "@type": ["LuminousIntensityUnit", "DecimalUnit"],
        displayName: "candela",
        symbol: "cd",
        baseUnit: "candela"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:weber;2",
        "@type": ["MagneticFluxUnit", "DecimalUnit"],
        displayName: "weber",
        symbol: "Wb",
        baseUnit: "weber"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:maxwell;2",
        "@type": ["MagneticFluxUnit"],
        displayName: "maxwell",
        symbol: "Mx"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:tesla;2",
        "@type": ["MagneticInductionUnit", "DecimalUnit"],
        displayName: "tesla",
        symbol: "T",
        baseUnit: "tesla"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilogram;2",
        "@type": ["MassUnit", "DecimalUnit"],
        displayName: "kilogram",
        symbol: "kg",
        baseUnit: "gram",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gram;2",
        "@type": ["MassUnit", "DecimalUnit"],
        displayName: "gram",
        symbol: "g",
        baseUnit: "gram"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:milligram;2",
        "@type": ["MassUnit", "DecimalUnit"],
        displayName: "milligram",
        symbol: "mg",
        baseUnit: "gram",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:microgram;2",
        "@type": ["MassUnit", "DecimalUnit"],
        displayName: "microgram",
        symbol: "æg",
        baseUnit: "gram",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:tonne;2",
        "@type": ["MassUnit"],
        displayName: "tonne",
        symbol: "t"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:slug;2",
        "@type": ["MassUnit"],
        displayName: "slug",
        symbol: "slug"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gramPerSecond;2",
        "@type": ["MassFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "gram per second",
        symbol: "g/s",
        baseUnit: "gramPerSecond",
        topUnit: "gram",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilogramPerSecond;2",
        "@type": ["MassFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilogram per second",
        symbol: "kg/s",
        baseUnit: "gramPerSecond",
        prefix: "kilo",
        topUnit: "kilogram",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gramPerHour;2",
        "@type": ["MassFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "gram per hour",
        symbol: "g/h",
        baseUnit: "gramPerHour",
        topUnit: "gram",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilogramPerHour;2",
        "@type": ["MassFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilogram per hour",
        symbol: "kg/h",
        baseUnit: "gramPerHour",
        prefix: "kilo",
        topUnit: "kilogram",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:watt;2",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "watt",
        symbol: "W",
        baseUnit: "watt"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:microwatt;2",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "microwatt",
        symbol: "æW",
        baseUnit: "watt",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:milliwatt;2",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "milliwatt",
        symbol: "mW",
        baseUnit: "watt",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilowatt;2",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "kilowatt",
        symbol: "kW",
        baseUnit: "watt",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:megawatt;2",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "megawatt",
        symbol: "MW",
        baseUnit: "watt",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gigawatt;2",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "gigawatt",
        symbol: "GW",
        baseUnit: "watt",
        prefix: "giga"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:horsepower;2",
        "@type": ["PowerUnit"],
        displayName: "horsepower",
        symbol: "hp"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilowattHourPerYear;2",
        "@type": ["PowerUnit", "RatioUnit"],
        displayName: "kilowatt-hour per year",
        symbol: "kWh/yr",
        topUnit: "kilowattHour",
        bottomUnit: "year"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:pascal;2",
        "@type": ["PressureUnit", "DecimalUnit"],
        displayName: "pascal",
        symbol: "Pa",
        baseUnit: "pascal"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilopascal;2",
        "@type": ["PressureUnit", "DecimalUnit"],
        displayName: "kilopascal",
        symbol: "kPa",
        baseUnit: "pascal",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:bar;2",
        "@type": ["PressureUnit", "DecimalUnit"],
        displayName: "bar",
        symbol: "bar",
        baseUnit: "bar"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millibar;2",
        "@type": ["PressureUnit", "DecimalUnit"],
        displayName: "millibar",
        symbol: "mbar",
        baseUnit: "bar",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millimetresOfMercury;2",
        "@type": ["PressureUnit"],
        displayName: "millimetres of mercury",
        symbol: "mmHg"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:poundPerSquareInch;2",
        "@type": ["PressureUnit", "RatioUnit"],
        displayName: "pound per square inch",
        symbol: "psi",
        topUnit: "pound",
        bottomUnit: "squareInch"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:inchesOfMercury;2",
        "@type": ["PressureUnit"],
        displayName: "inches of mercury",
        symbol: "inHg"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:inchesOfWater;2",
        "@type": ["PressureUnit"],
        displayName: "inches of water",
        symbol: "inH2O"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:ohm;2",
        "@type": ["ResistanceUnit", "DecimalUnit"],
        displayName: "ohm",
        symbol: "ê",
        baseUnit: "ohm"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:milliohm;2",
        "@type": ["ResistanceUnit", "DecimalUnit"],
        displayName: "milliohm",
        symbol: "mê",
        baseUnit: "ohm",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kiloohm;2",
        "@type": ["ResistanceUnit", "DecimalUnit"],
        displayName: "kiloohm",
        symbol: "kê",
        baseUnit: "ohm",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:megaohm;2",
        "@type": ["ResistanceUnit", "DecimalUnit"],
        displayName: "megaohm",
        symbol: "Mê",
        baseUnit: "ohm",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:decibel;2",
        "@type": ["SoundPressureUnit", "DecimalUnit"],
        displayName: "decibel",
        symbol: "dB",
        baseUnit: "bel",
        prefix: "deci"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:bel;2",
        "@type": ["SoundPressureUnit", "DecimalUnit"],
        displayName: "bel",
        symbol: "B",
        baseUnit: "bel"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kelvin;2",
        "@type": ["TemperatureUnit"],
        displayName: "kelvin",
        symbol: "K"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:degreeCelsius;2",
        "@type": ["TemperatureUnit"],
        displayName: "degree celsius",
        symbol: "øC"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:degreeFahrenheit;2",
        "@type": ["TemperatureUnit"],
        displayName: "degree fahrenheit",
        symbol: "øF"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:second;2",
        "@type": ["TimeUnit", "DecimalUnit"],
        displayName: "second",
        symbol: "s",
        baseUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millisecond;2",
        "@type": ["TimeUnit", "DecimalUnit"],
        displayName: "millisecond",
        symbol: "ms",
        baseUnit: "second",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:microsecond;2",
        "@type": ["TimeUnit", "DecimalUnit"],
        displayName: "microsecond",
        symbol: "æs",
        baseUnit: "second",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:nanosecond;2",
        "@type": ["TimeUnit", "DecimalUnit"],
        displayName: "nanosecond",
        symbol: "ns",
        baseUnit: "second",
        prefix: "nano"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:minute;2",
        "@type": ["TimeUnit"],
        displayName: "minute",
        symbol: "m"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:hour;2",
        "@type": ["TimeUnit"],
        displayName: "hour",
        symbol: "h"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:day;2",
        "@type": ["TimeUnit"],
        displayName: "day",
        symbol: "d"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:year;2",
        "@type": ["TimeUnit"],
        displayName: "year",
        symbol: "yr"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:newtonMetre;2",
        "@type": ["TorqueUnit", "DecimalUnit"],
        displayName: "newton-metre",
        symbol: "N m",
        baseUnit: "newtonMetre"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:unity;2",
        "@type": ["Unitless"],
        displayName: "",
        symbol: ""
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:percent;2",
        "@type": ["Unitless"],
        displayName: "percent",
        symbol: "%"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:metrePerSecond;2",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "metre per second",
        symbol: "m/s",
        baseUnit: "metrePerSecond",
        topUnit: "metre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:centimetrePerSecond;2",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "centimetre per second",
        symbol: "cm/s",
        baseUnit: "metrePerSecond",
        prefix: "centi",
        topUnit: "centimetre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilometrePerSecond;2",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilometre per second",
        symbol: "km/s",
        baseUnit: "metrePerSecond",
        prefix: "kilo",
        topUnit: "kilometre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:metrePerHour;2",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "metre per hour",
        symbol: "m/h",
        baseUnit: "metrePerHour",
        topUnit: "metre",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilometrePerHour;2",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilometre per hour",
        symbol: "km/h",
        baseUnit: "metrePerHour",
        prefix: "kilo",
        topUnit: "kilometre",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:milePerHour;2",
        "@type": ["VelocityUnit", "RatioUnit"],
        displayName: "mile per hour",
        symbol: "mph",
        topUnit: "mile",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:milePerSecond;2",
        "@type": ["VelocityUnit", "RatioUnit"],
        displayName: "mile per second",
        symbol: "mi/s",
        topUnit: "mile",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:knot;2",
        "@type": ["VelocityUnit"],
        displayName: "knot",
        symbol: "kn"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:volt;2",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "volt",
        symbol: "V",
        baseUnit: "volt"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millivolt;2",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "millivolt",
        symbol: "mV",
        baseUnit: "volt",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:microvolt;2",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "microvolt",
        symbol: "æV",
        baseUnit: "volt",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:kilovolt;2",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "kilovolt",
        symbol: "kV",
        baseUnit: "volt",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:megavolt;2",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "megavolt",
        symbol: "MV",
        baseUnit: "volt",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:cubicMetre;2",
        "@type": ["VolumeUnit"],
        displayName: "cubic metre",
        symbol: "m3"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:cubicCentimetre;2",
        "@type": ["VolumeUnit"],
        displayName: "cubic centimetre",
        symbol: "cm3"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:litre;2",
        "@type": ["VolumeUnit", "DecimalUnit"],
        displayName: "litre",
        symbol: "l",
        baseUnit: "litre"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millilitre;2",
        "@type": ["VolumeUnit", "DecimalUnit"],
        displayName: "millilitre",
        symbol: "ml",
        baseUnit: "litre",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:cubicFoot;2",
        "@type": ["VolumeUnit"],
        displayName: "cubic foot",
        symbol: "ft3"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:cubicInch;2",
        "@type": ["VolumeUnit"],
        displayName: "cubic inch",
        symbol: "in3"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:fluidOunce;2",
        "@type": ["VolumeUnit"],
        displayName: "fluid ounce",
        symbol: "fl oz"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:gallon;2",
        "@type": ["VolumeUnit"],
        displayName: "gallon",
        symbol: "gal"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:litrePerSecond;2",
        "@type": ["VolumeFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "litre per second",
        symbol: "l/s",
        baseUnit: "litrePerSecond",
        topUnit: "litre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millilitrePerSecond;2",
        "@type": ["VolumeFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "millilitre per second",
        symbol: "ml/s",
        baseUnit: "litrePerSecond",
        prefix: "milli",
        topUnit: "millilitre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:litrePerHour;2",
        "@type": ["VolumeFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "litre per hour",
        symbol: "l/h",
        baseUnit: "litrePerHour",
        topUnit: "litre",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:unit:millilitrePerHour;2",
        "@type": ["VolumeFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "millilitre per hour",
        symbol: "ml/h",
        baseUnit: "litrePerHour",
        prefix: "milli",
        topUnit: "millilitre",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatialPointType;2",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:point;2",
            "@type": "EnumValue",
            name: "point",
            enumValue: "Point"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatialMultiPointType;2",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:multiPoint;2",
            "@type": "EnumValue",
            name: "multiPoint",
            enumValue: "MultiPoint"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatialLineStringType;2",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:lineString;2",
            "@type": "EnumValue",
            name: "lineString",
            enumValue: "LineString"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatialMultiLineStringType;2",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:multiLineString;2",
            "@type": "EnumValue",
            name: "multiLineString",
            enumValue: "MultiLineString"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatialPolygonType;2",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:polygon;2",
            "@type": "EnumValue",
            name: "polygon",
            enumValue: "Polygon"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatialMultiPolygonType;2",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:multiPolygon;2",
            "@type": "EnumValue",
            name: "multiPolygon",
            enumValue: "MultiPolygon"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatial:position;2",
        "@type": "Array",
        elementSchema: "double"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatial:lineStringCoordinateArray;2",
        "@type": "Array",
        elementSchema: "dtmi:standard:schema:geospatial:position;2"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatial:polygonCoordinateArray;2",
        "@type": "Array",
        elementSchema: {
          "@id": "dtmi:standard:schema:geospatial:linearRingCoordinateArray;2",
          "@type": "Array",
          elementSchema: "dtmi:standard:schema:geospatial:position;2"
        }
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatial:point;2",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:point:type;2",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialPointType;2"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:point:coordinates;2",
            "@type": "Field",
            name: "coordinates",
            schema: "dtmi:standard:schema:geospatial:position;2"
          }
        ],
        description: "GeoJSON Point"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatial:multiPoint;2",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:multiPoint:type;2",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialMultiPointType;2"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:multiPoint:coordinates;2",
            "@type": "Field",
            name: "coordinates",
            schema: {
              "@id": "dtmi:standard:schema:geospatial:positionArray;2",
              "@type": "Array",
              elementSchema: "dtmi:standard:schema:geospatial:position;2"
            }
          }
        ],
        description: "GeoJSON MultiPoint"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatial:lineString;2",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:lineString:type;2",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialLineStringType;2"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:lineString:coordinates;2",
            "@type": "Field",
            name: "coordinates",
            schema: "dtmi:standard:schema:geospatial:lineStringCoordinateArray;2"
          }
        ],
        description: "GeoJSON LineString"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatial:multiLineString;2",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:multiLineString:type;2",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialMultiLineStringType;2"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:multiLineString:coordinates;2",
            "@type": "Field",
            name: "coordinates",
            schema: {
              "@id": "dtmi:standard:schema:geospatial:lineStringCoordinateArrayArray;2",
              "@type": "Array",
              elementSchema: "dtmi:standard:schema:geospatial:lineStringCoordinateArray;2"
            }
          }
        ],
        description: "GeoJSON MultiLineString"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatial:polygon;2",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:polygon:type;2",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialPolygonType;2"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:polygon:coordinates;2",
            "@type": "Field",
            name: "coordinates",
            schema: "dtmi:standard:schema:geospatial:polygonCoordinateArray;2"
          }
        ],
        description: "GeoJSON Polygon"
      },
      {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:standard:schema:geospatial:multiPolygon;2",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:multiPolygon:type;2",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialMultiPolygonType;2"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:multiPolygon:coordinates;2",
            "@type": "Field",
            name: "coordinates",
            schema: {
              "@id": "dtmi:standard:schema:geospatial:polygonCoordinateArrayArray;2",
              "@type": "Array",
              elementSchema: "dtmi:standard:schema:geospatial:polygonCoordinateArray;2"
            }
          }
        ],
        description: "GeoJSON MultyPolygon"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:deci;3",
        "@type": "DecimalPrefix",
        name: "deci",
        symbol: "d",
        exponent: -1
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:centi;3",
        "@type": "DecimalPrefix",
        name: "centi",
        symbol: "c",
        exponent: -2
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:milli;3",
        "@type": "DecimalPrefix",
        name: "milli",
        symbol: "m",
        exponent: -3
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:micro;3",
        "@type": "DecimalPrefix",
        name: "micro",
        symbol: "æ",
        exponent: -6
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:nano;3",
        "@type": "DecimalPrefix",
        name: "nano",
        symbol: "n",
        exponent: -9
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:pico;3",
        "@type": "DecimalPrefix",
        name: "pico",
        symbol: "p",
        exponent: -12
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:femto;3",
        "@type": "DecimalPrefix",
        name: "femto",
        symbol: "f",
        exponent: -15
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:atto;3",
        "@type": "DecimalPrefix",
        name: "atto",
        symbol: "a",
        exponent: -18
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:zepto;3",
        "@type": "DecimalPrefix",
        name: "zepto",
        symbol: "z",
        exponent: -21
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:yocto;3",
        "@type": "DecimalPrefix",
        name: "yocto",
        symbol: "y",
        exponent: -24
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:deka;3",
        "@type": "DecimalPrefix",
        name: "deka",
        symbol: "da",
        exponent: 1
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:hecto;3",
        "@type": "DecimalPrefix",
        name: "hecto",
        symbol: "h",
        exponent: 2
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:kilo;3",
        "@type": "DecimalPrefix",
        name: "kilo",
        symbol: "k",
        exponent: 3
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:mega;3",
        "@type": "DecimalPrefix",
        name: "mega",
        symbol: "M",
        exponent: 6
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:giga;3",
        "@type": "DecimalPrefix",
        name: "giga",
        symbol: "G",
        exponent: 9
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:tera;3",
        "@type": "DecimalPrefix",
        name: "tera",
        symbol: "T",
        exponent: 12
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:peta;3",
        "@type": "DecimalPrefix",
        name: "peta",
        symbol: "P",
        exponent: 15
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:exa;3",
        "@type": "DecimalPrefix",
        name: "exa",
        symbol: "E",
        exponent: 18
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:zetta;3",
        "@type": "DecimalPrefix",
        name: "zetta",
        symbol: "Z",
        exponent: 21
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:yotta;3",
        "@type": "DecimalPrefix",
        name: "yotta",
        symbol: "Y",
        exponent: 24
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:kibi;3",
        "@type": "BinaryPrefix",
        name: "kibi",
        symbol: "Ki",
        exponent: 10
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:mebi;3",
        "@type": "BinaryPrefix",
        name: "mebi",
        symbol: "Mi",
        exponent: 20
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:gibi;3",
        "@type": "BinaryPrefix",
        name: "gibi",
        symbol: "Gi",
        exponent: 30
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:tebi;3",
        "@type": "BinaryPrefix",
        name: "tebi",
        symbol: "Ti",
        exponent: 40
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:pebi;3",
        "@type": "BinaryPrefix",
        name: "pebi",
        symbol: "Pi",
        exponent: 50
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:exbi;3",
        "@type": "BinaryPrefix",
        name: "exbi",
        symbol: "Ei",
        exponent: 60
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:zebi;3",
        "@type": "BinaryPrefix",
        name: "zebi",
        symbol: "Zi",
        exponent: 70
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unitprefix:yobi;3",
        "@type": "BinaryPrefix",
        name: "yobi",
        symbol: "Yi",
        exponent: 80
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:metrePerSecondSquared;3",
        "@type": ["AccelerationUnit", "DecimalUnit", "RatioUnit"],
        displayName: "metre per second squared",
        symbol: "m/sý",
        baseUnit: "metrePerSecondSquared",
        topUnit: "metrePerSecond",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:centimetrePerSecondSquared;3",
        "@type": ["AccelerationUnit", "DecimalUnit", "RatioUnit"],
        displayName: "centimetre per second squared",
        symbol: "cm/sý",
        baseUnit: "metrePerSecondSquared",
        prefix: "centi",
        topUnit: "centimetrePerSecond",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gForce;3",
        "@type": ["AccelerationUnit"],
        displayName: "g-force",
        symbol: "g"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:radian;3",
        "@type": ["AngleUnit"],
        displayName: "radian",
        symbol: "rad"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:degreeOfArc;3",
        "@type": ["AngleUnit"],
        displayName: "degree of arc",
        symbol: "ø"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:minuteOfArc;3",
        "@type": ["AngleUnit"],
        displayName: "minute of arc",
        symbol: "'"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:secondOfArc;3",
        "@type": ["AngleUnit"],
        displayName: "second of arc",
        symbol: '"'
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:turn;3",
        "@type": ["AngleUnit"],
        displayName: "turn",
        symbol: "turn"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:radianPerSecondSquared;3",
        "@type": ["AngularAccelerationUnit", "RatioUnit"],
        displayName: "radian per second squared",
        symbol: "rad/sý",
        topUnit: "radianPerSecond",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:radianPerSecond;3",
        "@type": ["AngularVelocityUnit", "RatioUnit"],
        displayName: "radian per second",
        symbol: "rad/s",
        topUnit: "radian",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:degreePerSecond;3",
        "@type": ["AngularVelocityUnit", "RatioUnit"],
        displayName: "degree per second",
        symbol: "ø/s",
        topUnit: "degreeOfArc",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:revolutionPerSecond;3",
        "@type": ["AngularVelocityUnit", "RatioUnit"],
        displayName: "revolution per second",
        symbol: "rps",
        topUnit: "turn",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:revolutionPerMinute;3",
        "@type": ["AngularVelocityUnit", "RatioUnit"],
        displayName: "revolution per minute",
        symbol: "rpm",
        topUnit: "turn",
        bottomUnit: "minute"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:squareMetre;3",
        "@type": ["AreaUnit"],
        displayName: "square metre",
        symbol: "mý"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:squareCentimetre;3",
        "@type": ["AreaUnit"],
        displayName: "square centimetre",
        symbol: "cmý"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:squareMillimetre;3",
        "@type": ["AreaUnit"],
        displayName: "square millimetre",
        symbol: "mmý"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:squareKilometre;3",
        "@type": ["AreaUnit"],
        displayName: "square kilometre",
        symbol: "kmý"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:hectare;3",
        "@type": ["AreaUnit"],
        displayName: "hectare",
        symbol: "ha"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:squareFoot;3",
        "@type": ["AreaUnit"],
        displayName: "square foot",
        symbol: "ftý"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:squareInch;3",
        "@type": ["AreaUnit"],
        displayName: "square inch",
        symbol: "iný"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:acre;3",
        "@type": ["AreaUnit"],
        displayName: "acre",
        symbol: "ac"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:farad;3",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "farad",
        symbol: "F",
        baseUnit: "farad"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millifarad;3",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "millifarad",
        symbol: "mF",
        baseUnit: "farad",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:microfarad;3",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "microfarad",
        symbol: "æF",
        baseUnit: "farad",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:nanofarad;3",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "nanofarad",
        symbol: "nF",
        baseUnit: "farad",
        prefix: "nano"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:picofarad;3",
        "@type": ["CapacitanceUnit", "DecimalUnit"],
        displayName: "picofarad",
        symbol: "pF",
        baseUnit: "farad",
        prefix: "pico"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:coulomb;3",
        "@type": ["ChargeUnit", "DecimalUnit"],
        displayName: "coulomb",
        symbol: "C",
        baseUnit: "coulomb"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:ampere;3",
        "@type": ["CurrentUnit", "DecimalUnit"],
        displayName: "ampere",
        symbol: "A",
        baseUnit: "ampere"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:microampere;3",
        "@type": ["CurrentUnit", "DecimalUnit"],
        displayName: "microampere",
        symbol: "æA",
        baseUnit: "ampere",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:milliampere;3",
        "@type": ["CurrentUnit", "DecimalUnit"],
        displayName: "milliampere",
        symbol: "mA",
        baseUnit: "ampere",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:bitPerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "bit per second",
        symbol: "bps",
        baseUnit: "bitPerSecond",
        topUnit: "bit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kibibitPerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "kibibit per second",
        symbol: "Kibps",
        baseUnit: "bitPerSecond",
        prefix: "kibi",
        topUnit: "kibibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:mebibitPerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "mebibit per second",
        symbol: "Mibps",
        baseUnit: "bitPerSecond",
        prefix: "mebi",
        topUnit: "mebibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gibibitPerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "gibibit per second",
        symbol: "Gibps",
        baseUnit: "bitPerSecond",
        prefix: "gibi",
        topUnit: "gibibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:tebibitPerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "tebibit per second",
        symbol: "Tibps",
        baseUnit: "bitPerSecond",
        prefix: "tebi",
        topUnit: "tebibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:exbibitPerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "exbibit per second",
        symbol: "Eibps",
        baseUnit: "bitPerSecond",
        prefix: "exbi",
        topUnit: "exbibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:zebibitPerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "zebibit per second",
        symbol: "Zibps",
        baseUnit: "bitPerSecond",
        prefix: "zebi",
        topUnit: "zebibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:yobibitPerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "yobibit per second",
        symbol: "Yibps",
        baseUnit: "bitPerSecond",
        prefix: "yobi",
        topUnit: "yobibit",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:bytePerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "byte per second",
        symbol: "Bps",
        baseUnit: "bytePerSecond",
        topUnit: "byte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kibibytePerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "kibibyte per second",
        symbol: "KiBps",
        baseUnit: "bytePerSecond",
        prefix: "kibi",
        topUnit: "kibibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:mebibytePerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "mebibyte per second",
        symbol: "MiBps",
        baseUnit: "bytePerSecond",
        prefix: "mebi",
        topUnit: "mebibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gibibytePerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "gibibyte per second",
        symbol: "GiBps",
        baseUnit: "bytePerSecond",
        prefix: "gibi",
        topUnit: "gibibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:tebibytePerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "tebibyte per second",
        symbol: "TiBps",
        baseUnit: "bytePerSecond",
        prefix: "tebi",
        topUnit: "tebibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:exbibytePerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "exbibyte per second",
        symbol: "EiBps",
        baseUnit: "bytePerSecond",
        prefix: "exbi",
        topUnit: "exbibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:zebibytePerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "zebibyte per second",
        symbol: "ZiBps",
        baseUnit: "bytePerSecond",
        prefix: "zebi",
        topUnit: "zebibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:yobibytePerSecond;3",
        "@type": ["DataRateUnit", "BinaryUnit", "RatioUnit"],
        displayName: "yobibyte per second",
        symbol: "YiBps",
        baseUnit: "bytePerSecond",
        prefix: "yobi",
        topUnit: "yobibyte",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:bit;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "bit",
        symbol: "bit",
        baseUnit: "bit"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kibibit;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "kibibit",
        symbol: "Kibit",
        baseUnit: "bit",
        prefix: "kibi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:mebibit;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "mebibit",
        symbol: "Mibit",
        baseUnit: "bit",
        prefix: "mebi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gibibit;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "gibibit",
        symbol: "Gibit",
        baseUnit: "bit",
        prefix: "gibi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:tebibit;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "tebibit",
        symbol: "Tibit",
        baseUnit: "bit",
        prefix: "tebi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:exbibit;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "exbibit",
        symbol: "Eibit",
        baseUnit: "bit",
        prefix: "exbi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:zebibit;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "zebibit",
        symbol: "Zibit",
        baseUnit: "bit",
        prefix: "zebi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:yobibit;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "yobibit",
        symbol: "Yibit",
        baseUnit: "bit",
        prefix: "yobi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:byte;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "byte",
        symbol: "B",
        baseUnit: "byte"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kibibyte;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "kibibyte",
        symbol: "KiB",
        baseUnit: "byte",
        prefix: "kibi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:mebibyte;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "mebibyte",
        symbol: "MiB",
        baseUnit: "byte",
        prefix: "mebi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gibibyte;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "gibibyte",
        symbol: "GiB",
        baseUnit: "byte",
        prefix: "gibi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:tebibyte;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "tebibyte",
        symbol: "TiB",
        baseUnit: "byte",
        prefix: "tebi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:exbibyte;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "exbibyte",
        symbol: "EiB",
        baseUnit: "byte",
        prefix: "exbi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:zebibyte;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "zebibyte",
        symbol: "ZiB",
        baseUnit: "byte",
        prefix: "zebi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:yobibyte;3",
        "@type": ["DataSizeUnit", "BinaryUnit"],
        displayName: "yobibyte",
        symbol: "YiB",
        baseUnit: "byte",
        prefix: "yobi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilogramPerCubicMetre;3",
        "@type": ["DensityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilogram per cubic metre",
        symbol: "kg/m3",
        baseUnit: "gramPerCubicMetre",
        prefix: "kilo",
        topUnit: "kilogram",
        bottomUnit: "cubicMetre"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gramPerCubicMetre;3",
        "@type": ["DensityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "gram per cubic metre",
        symbol: "g/m3",
        baseUnit: "gramPerCubicMetre",
        topUnit: "gram",
        bottomUnit: "cubicMetre"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:joule;3",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "joule",
        symbol: "J",
        baseUnit: "joule"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilojoule;3",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "kilojoule",
        symbol: "kJ",
        baseUnit: "joule",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:megajoule;3",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "megajoule",
        symbol: "MJ",
        baseUnit: "joule",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gigajoule;3",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "gigajoule",
        symbol: "GJ",
        baseUnit: "joule",
        prefix: "giga"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:electronvolt;3",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "electronvolt",
        symbol: "eV",
        baseUnit: "electronvolt"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:megaelectronvolt;3",
        "@type": ["EnergyUnit", "DecimalUnit"],
        displayName: "megaelectronvolt",
        symbol: "MeV",
        baseUnit: "electronvolt",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilowattHour;3",
        "@type": ["EnergyUnit"],
        displayName: "kilowat-hour",
        symbol: "kWh"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:newton;3",
        "@type": ["ForceUnit", "DecimalUnit"],
        displayName: "newton",
        symbol: "N",
        baseUnit: "newton"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:pound;3",
        "@type": ["ForceUnit"],
        displayName: "pound",
        symbol: "lb"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:ounce;3",
        "@type": ["ForceUnit"],
        displayName: "ounce",
        symbol: "oz"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:ton;3",
        "@type": ["ForceUnit"],
        displayName: "ton",
        symbol: "T"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:hertz;3",
        "@type": ["FrequencyUnit", "DecimalUnit"],
        displayName: "hertz",
        symbol: "Hz",
        baseUnit: "hertz"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilohertz;3",
        "@type": ["FrequencyUnit", "DecimalUnit"],
        displayName: "kilohertz",
        symbol: "kHz",
        baseUnit: "hertz",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:megahertz;3",
        "@type": ["FrequencyUnit", "DecimalUnit"],
        displayName: "megahertz",
        symbol: "MHz",
        baseUnit: "hertz",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gigahertz;3",
        "@type": ["FrequencyUnit", "DecimalUnit"],
        displayName: "gigahertz",
        symbol: "GHz",
        baseUnit: "hertz",
        prefix: "giga"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:lux;3",
        "@type": ["IlluminanceUnit", "DecimalUnit"],
        displayName: "lux",
        symbol: "lx",
        baseUnit: "lux"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:footcandle;3",
        "@type": ["IlluminanceUnit"],
        displayName: "footcandle",
        symbol: "fc"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:henry;3",
        "@type": ["InductanceUnit", "DecimalUnit"],
        displayName: "henry",
        symbol: "H",
        baseUnit: "henry"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millihenry;3",
        "@type": ["InductanceUnit", "DecimalUnit"],
        displayName: "millihenry",
        symbol: "mH",
        baseUnit: "henry",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:microhenry;3",
        "@type": ["InductanceUnit", "DecimalUnit"],
        displayName: "microhenry",
        symbol: "æH",
        baseUnit: "henry",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:metre;3",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "metre",
        symbol: "m",
        baseUnit: "metre"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:centimetre;3",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "centimetre",
        symbol: "cm",
        baseUnit: "metre",
        prefix: "centi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millimetre;3",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "millimetre",
        symbol: "mm",
        baseUnit: "metre",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:micrometre;3",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "micrometre",
        symbol: "æm",
        baseUnit: "metre",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:nanometre;3",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "nanometre",
        symbol: "nm",
        baseUnit: "metre",
        prefix: "nano"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilometre;3",
        "@type": ["LengthUnit", "DecimalUnit"],
        displayName: "kilometre",
        symbol: "km",
        baseUnit: "metre",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:foot;3",
        "@type": ["LengthUnit"],
        displayName: "foot",
        symbol: "ft"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:inch;3",
        "@type": ["LengthUnit"],
        displayName: "inch",
        symbol: "in"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:mile;3",
        "@type": ["LengthUnit"],
        displayName: "mile",
        symbol: "mi"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:nauticalMile;3",
        "@type": ["LengthUnit"],
        displayName: "nautical mile",
        symbol: "M"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:astronomicalUnit;3",
        "@type": ["LengthUnit"],
        displayName: "astronomical unit",
        symbol: "AU"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:candelaPerSquareMetre;3",
        "@type": ["LuminanceUnit", "DecimalUnit", "RatioUnit"],
        displayName: "candela per square metre",
        symbol: "cd/mý",
        baseUnit: "candelaPerSquareMetre",
        topUnit: "candela",
        bottomUnit: "squareMetre"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:lumen;3",
        "@type": ["LuminousFluxUnit", "DecimalUnit"],
        displayName: "lumen",
        symbol: "lm",
        baseUnit: "lumen"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:candela;3",
        "@type": ["LuminousIntensityUnit", "DecimalUnit"],
        displayName: "candela",
        symbol: "cd",
        baseUnit: "candela"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:weber;3",
        "@type": ["MagneticFluxUnit", "DecimalUnit"],
        displayName: "weber",
        symbol: "Wb",
        baseUnit: "weber"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:maxwell;3",
        "@type": ["MagneticFluxUnit"],
        displayName: "maxwell",
        symbol: "Mx"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:tesla;3",
        "@type": ["MagneticInductionUnit", "DecimalUnit"],
        displayName: "tesla",
        symbol: "T",
        baseUnit: "tesla"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilogram;3",
        "@type": ["MassUnit", "DecimalUnit"],
        displayName: "kilogram",
        symbol: "kg",
        baseUnit: "gram",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gram;3",
        "@type": ["MassUnit", "DecimalUnit"],
        displayName: "gram",
        symbol: "g",
        baseUnit: "gram"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:milligram;3",
        "@type": ["MassUnit", "DecimalUnit"],
        displayName: "milligram",
        symbol: "mg",
        baseUnit: "gram",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:microgram;3",
        "@type": ["MassUnit", "DecimalUnit"],
        displayName: "microgram",
        symbol: "æg",
        baseUnit: "gram",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:tonne;3",
        "@type": ["MassUnit"],
        displayName: "tonne",
        symbol: "t"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:slug;3",
        "@type": ["MassUnit"],
        displayName: "slug",
        symbol: "slug"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gramPerSecond;3",
        "@type": ["MassFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "gram per second",
        symbol: "g/s",
        baseUnit: "gramPerSecond",
        topUnit: "gram",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilogramPerSecond;3",
        "@type": ["MassFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilogram per second",
        symbol: "kg/s",
        baseUnit: "gramPerSecond",
        prefix: "kilo",
        topUnit: "kilogram",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gramPerHour;3",
        "@type": ["MassFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "gram per hour",
        symbol: "g/h",
        baseUnit: "gramPerHour",
        topUnit: "gram",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilogramPerHour;3",
        "@type": ["MassFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilogram per hour",
        symbol: "kg/h",
        baseUnit: "gramPerHour",
        prefix: "kilo",
        topUnit: "kilogram",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:watt;3",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "watt",
        symbol: "W",
        baseUnit: "watt"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:microwatt;3",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "microwatt",
        symbol: "æW",
        baseUnit: "watt",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:milliwatt;3",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "milliwatt",
        symbol: "mW",
        baseUnit: "watt",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilowatt;3",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "kilowatt",
        symbol: "kW",
        baseUnit: "watt",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:megawatt;3",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "megawatt",
        symbol: "MW",
        baseUnit: "watt",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gigawatt;3",
        "@type": ["PowerUnit", "DecimalUnit"],
        displayName: "gigawatt",
        symbol: "GW",
        baseUnit: "watt",
        prefix: "giga"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:horsepower;3",
        "@type": ["PowerUnit"],
        displayName: "horsepower",
        symbol: "hp"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilowattHourPerYear;3",
        "@type": ["PowerUnit", "RatioUnit"],
        displayName: "kilowatt-hour per year",
        symbol: "kWh/yr",
        topUnit: "kilowattHour",
        bottomUnit: "year"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:pascal;3",
        "@type": ["PressureUnit", "DecimalUnit"],
        displayName: "pascal",
        symbol: "Pa",
        baseUnit: "pascal"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilopascal;3",
        "@type": ["PressureUnit", "DecimalUnit"],
        displayName: "kilopascal",
        symbol: "kPa",
        baseUnit: "pascal",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:bar;3",
        "@type": ["PressureUnit", "DecimalUnit"],
        displayName: "bar",
        symbol: "bar",
        baseUnit: "bar"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millibar;3",
        "@type": ["PressureUnit", "DecimalUnit"],
        displayName: "millibar",
        symbol: "mbar",
        baseUnit: "bar",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millimetresOfMercury;3",
        "@type": ["PressureUnit"],
        displayName: "millimetres of mercury",
        symbol: "mmHg"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:poundPerSquareInch;3",
        "@type": ["PressureUnit", "RatioUnit"],
        displayName: "pound per square inch",
        symbol: "psi",
        topUnit: "pound",
        bottomUnit: "squareInch"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:inchesOfMercury;3",
        "@type": ["PressureUnit"],
        displayName: "inches of mercury",
        symbol: "inHg"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:inchesOfWater;3",
        "@type": ["PressureUnit"],
        displayName: "inches of water",
        symbol: "inH2O"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:ohm;3",
        "@type": ["ResistanceUnit", "DecimalUnit"],
        displayName: "ohm",
        symbol: "ê",
        baseUnit: "ohm"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:milliohm;3",
        "@type": ["ResistanceUnit", "DecimalUnit"],
        displayName: "milliohm",
        symbol: "mê",
        baseUnit: "ohm",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kiloohm;3",
        "@type": ["ResistanceUnit", "DecimalUnit"],
        displayName: "kiloohm",
        symbol: "kê",
        baseUnit: "ohm",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:megaohm;3",
        "@type": ["ResistanceUnit", "DecimalUnit"],
        displayName: "megaohm",
        symbol: "Mê",
        baseUnit: "ohm",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:decibel;3",
        "@type": ["SoundPressureUnit", "DecimalUnit"],
        displayName: "decibel",
        symbol: "dB",
        baseUnit: "bel",
        prefix: "deci"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:bel;3",
        "@type": ["SoundPressureUnit", "DecimalUnit"],
        displayName: "bel",
        symbol: "B",
        baseUnit: "bel"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kelvin;3",
        "@type": ["TemperatureUnit"],
        displayName: "kelvin",
        symbol: "K"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:degreeCelsius;3",
        "@type": ["TemperatureUnit"],
        displayName: "degree celsius",
        symbol: "øC"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:degreeFahrenheit;3",
        "@type": ["TemperatureUnit"],
        displayName: "degree fahrenheit",
        symbol: "øF"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:second;3",
        "@type": ["TimeUnit", "DecimalUnit"],
        displayName: "second",
        symbol: "s",
        baseUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millisecond;3",
        "@type": ["TimeUnit", "DecimalUnit"],
        displayName: "millisecond",
        symbol: "ms",
        baseUnit: "second",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:microsecond;3",
        "@type": ["TimeUnit", "DecimalUnit"],
        displayName: "microsecond",
        symbol: "æs",
        baseUnit: "second",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:nanosecond;3",
        "@type": ["TimeUnit", "DecimalUnit"],
        displayName: "nanosecond",
        symbol: "ns",
        baseUnit: "second",
        prefix: "nano"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:minute;3",
        "@type": ["TimeUnit"],
        displayName: "minute",
        symbol: "m"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:hour;3",
        "@type": ["TimeUnit"],
        displayName: "hour",
        symbol: "h"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:day;3",
        "@type": ["TimeUnit"],
        displayName: "day",
        symbol: "d"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:year;3",
        "@type": ["TimeUnit"],
        displayName: "year",
        symbol: "yr"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:newtonMetre;3",
        "@type": ["TorqueUnit", "DecimalUnit"],
        displayName: "newton-metre",
        symbol: "N m",
        baseUnit: "newtonMetre"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:unity;3",
        "@type": ["Unitless"],
        displayName: "",
        symbol: ""
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:percent;3",
        "@type": ["Unitless"],
        displayName: "percent",
        symbol: "%"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:metrePerSecond;3",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "metre per second",
        symbol: "m/s",
        baseUnit: "metrePerSecond",
        topUnit: "metre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:centimetrePerSecond;3",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "centimetre per second",
        symbol: "cm/s",
        baseUnit: "metrePerSecond",
        prefix: "centi",
        topUnit: "centimetre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilometrePerSecond;3",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilometre per second",
        symbol: "km/s",
        baseUnit: "metrePerSecond",
        prefix: "kilo",
        topUnit: "kilometre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:metrePerHour;3",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "metre per hour",
        symbol: "m/h",
        baseUnit: "metrePerHour",
        topUnit: "metre",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilometrePerHour;3",
        "@type": ["VelocityUnit", "DecimalUnit", "RatioUnit"],
        displayName: "kilometre per hour",
        symbol: "km/h",
        baseUnit: "metrePerHour",
        prefix: "kilo",
        topUnit: "kilometre",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:milePerHour;3",
        "@type": ["VelocityUnit", "RatioUnit"],
        displayName: "mile per hour",
        symbol: "mph",
        topUnit: "mile",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:milePerSecond;3",
        "@type": ["VelocityUnit", "RatioUnit"],
        displayName: "mile per second",
        symbol: "mi/s",
        topUnit: "mile",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:knot;3",
        "@type": ["VelocityUnit"],
        displayName: "knot",
        symbol: "kn"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:volt;3",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "volt",
        symbol: "V",
        baseUnit: "volt"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millivolt;3",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "millivolt",
        symbol: "mV",
        baseUnit: "volt",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:microvolt;3",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "microvolt",
        symbol: "æV",
        baseUnit: "volt",
        prefix: "micro"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:kilovolt;3",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "kilovolt",
        symbol: "kV",
        baseUnit: "volt",
        prefix: "kilo"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:megavolt;3",
        "@type": ["VoltageUnit", "DecimalUnit"],
        displayName: "megavolt",
        symbol: "MV",
        baseUnit: "volt",
        prefix: "mega"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:cubicMetre;3",
        "@type": ["VolumeUnit"],
        displayName: "cubic metre",
        symbol: "m3"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:cubicCentimetre;3",
        "@type": ["VolumeUnit"],
        displayName: "cubic centimetre",
        symbol: "cm3"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:litre;3",
        "@type": ["VolumeUnit", "DecimalUnit"],
        displayName: "litre",
        symbol: "l",
        baseUnit: "litre"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millilitre;3",
        "@type": ["VolumeUnit", "DecimalUnit"],
        displayName: "millilitre",
        symbol: "ml",
        baseUnit: "litre",
        prefix: "milli"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:cubicFoot;3",
        "@type": ["VolumeUnit"],
        displayName: "cubic foot",
        symbol: "ft3"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:cubicInch;3",
        "@type": ["VolumeUnit"],
        displayName: "cubic inch",
        symbol: "in3"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:fluidOunce;3",
        "@type": ["VolumeUnit"],
        displayName: "fluid ounce",
        symbol: "fl oz"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:gallon;3",
        "@type": ["VolumeUnit"],
        displayName: "gallon",
        symbol: "gal"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:litrePerSecond;3",
        "@type": ["VolumeFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "litre per second",
        symbol: "l/s",
        baseUnit: "litrePerSecond",
        topUnit: "litre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millilitrePerSecond;3",
        "@type": ["VolumeFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "millilitre per second",
        symbol: "ml/s",
        baseUnit: "litrePerSecond",
        prefix: "milli",
        topUnit: "millilitre",
        bottomUnit: "second"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:litrePerHour;3",
        "@type": ["VolumeFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "litre per hour",
        symbol: "l/h",
        baseUnit: "litrePerHour",
        topUnit: "litre",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:unit:millilitrePerHour;3",
        "@type": ["VolumeFlowRateUnit", "DecimalUnit", "RatioUnit"],
        displayName: "millilitre per hour",
        symbol: "ml/h",
        baseUnit: "litrePerHour",
        prefix: "milli",
        topUnit: "millilitre",
        bottomUnit: "hour"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatialPointType;3",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:point;3",
            "@type": "EnumValue",
            name: "point",
            enumValue: "Point"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatialMultiPointType;3",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:multiPoint;3",
            "@type": "EnumValue",
            name: "multiPoint",
            enumValue: "MultiPoint"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatialLineStringType;3",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:lineString;3",
            "@type": "EnumValue",
            name: "lineString",
            enumValue: "LineString"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatialMultiLineStringType;3",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:multiLineString;3",
            "@type": "EnumValue",
            name: "multiLineString",
            enumValue: "MultiLineString"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatialPolygonType;3",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:polygon;3",
            "@type": "EnumValue",
            name: "polygon",
            enumValue: "Polygon"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatialMultiPolygonType;3",
        "@type": "Enum",
        valueSchema: "string",
        enumValues: [
          {
            "@id": "dtmi:standard:schema:geospatial:enumValue:multiPolygon;3",
            "@type": "EnumValue",
            name: "multiPolygon",
            enumValue: "MultiPolygon"
          }
        ]
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatial:position;3",
        "@type": "Array",
        elementSchema: "double"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatial:lineStringCoordinateArray;3",
        "@type": "Array",
        elementSchema: "dtmi:standard:schema:geospatial:position;3"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatial:polygonCoordinateArray;3",
        "@type": "Array",
        elementSchema: {
          "@id": "dtmi:standard:schema:geospatial:linearRingCoordinateArray;3",
          "@type": "Array",
          elementSchema: "dtmi:standard:schema:geospatial:position;3"
        }
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatial:point;3",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:point:type;3",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialPointType;3"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:point:coordinates;3",
            "@type": "Field",
            name: "coordinates",
            schema: "dtmi:standard:schema:geospatial:position;3"
          }
        ],
        description: "GeoJSON Point"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatial:multiPoint;3",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:multiPoint:type;3",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialMultiPointType;3"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:multiPoint:coordinates;3",
            "@type": "Field",
            name: "coordinates",
            schema: {
              "@id": "dtmi:standard:schema:geospatial:positionArray;3",
              "@type": "Array",
              elementSchema: "dtmi:standard:schema:geospatial:position;3"
            }
          }
        ],
        description: "GeoJSON MultiPoint"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatial:lineString;3",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:lineString:type;3",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialLineStringType;3"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:lineString:coordinates;3",
            "@type": "Field",
            name: "coordinates",
            schema: "dtmi:standard:schema:geospatial:lineStringCoordinateArray;3"
          }
        ],
        description: "GeoJSON LineString"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatial:multiLineString;3",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:multiLineString:type;3",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialMultiLineStringType;3"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:multiLineString:coordinates;3",
            "@type": "Field",
            name: "coordinates",
            schema: {
              "@id": "dtmi:standard:schema:geospatial:lineStringCoordinateArrayArray;3",
              "@type": "Array",
              elementSchema: "dtmi:standard:schema:geospatial:lineStringCoordinateArray;3"
            }
          }
        ],
        description: "GeoJSON MultiLineString"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatial:polygon;3",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:polygon:type;3",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialPolygonType;3"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:polygon:coordinates;3",
            "@type": "Field",
            name: "coordinates",
            schema: "dtmi:standard:schema:geospatial:polygonCoordinateArray;3"
          }
        ],
        description: "GeoJSON Polygon"
      },
      {
        "@context": "dtmi:dtdl:context;3",
        "@id": "dtmi:standard:schema:geospatial:multiPolygon;3",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:standard:schema:geospatial:multiPolygon:type;3",
            "@type": "Field",
            name: "type",
            schema: "dtmi:standard:schema:geospatialMultiPolygonType;3"
          },
          {
            "@id": "dtmi:standard:schema:geospatial:multiPolygon:coordinates;3",
            "@type": "Field",
            name: "coordinates",
            schema: {
              "@id": "dtmi:standard:schema:geospatial:polygonCoordinateArrayArray;3",
              "@type": "Array",
              elementSchema: "dtmi:standard:schema:geospatial:polygonCoordinateArray;3"
            }
          }
        ],
        description: "GeoJSON MultyPolygon"
      },
      {
        "@context": ["dtmi:dtdl:context;2", "dtmi:iotcentral:context;2"],
        "@id": "dtmi:iotcentral:schema:vector;2",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:iotcentral:schema:vector:x;2",
            "@type": "Field",
            name: "x",
            schema: "double"
          },
          {
            "@id": "dtmi:iotcentral:schema:vector:y;2",
            "@type": "Field",
            name: "y",
            schema: "double"
          },
          {
            "@id": "dtmi:iotcentral:schema:vector:z;2",
            "@type": "Field",
            name: "z",
            schema: "double"
          }
        ]
      },
      {
        "@context": ["dtmi:dtdl:context;2", "dtmi:iotcentral:context;2"],
        "@id": "dtmi:iotcentral:schema:geopoint;2",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:iotcentral:schema:geopoint:lon;2",
            "@type": "Field",
            name: "lon",
            schema: "double"
          },
          {
            "@id": "dtmi:iotcentral:schema:geopoint:lat;2",
            "@type": "Field",
            name: "lat",
            schema: "double"
          },
          {
            "@id": "dtmi:iotcentral:schema:geopoint:alt;2",
            "@type": "Field",
            name: "alt",
            schema: "double"
          }
        ]
      },
      {
        "@context": ["dtmi:dtdl:context;3", "dtmi:iotcentral:context;3"],
        "@id": "dtmi:iotcentral:schema:vector;3",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:iotcentral:schema:vector:x;3",
            "@type": "Field",
            name: "x",
            schema: "double"
          },
          {
            "@id": "dtmi:iotcentral:schema:vector:y;3",
            "@type": "Field",
            name: "y",
            schema: "double"
          },
          {
            "@id": "dtmi:iotcentral:schema:vector:z;3",
            "@type": "Field",
            name: "z",
            schema: "double"
          }
        ]
      },
      {
        "@context": ["dtmi:dtdl:context;3", "dtmi:iotcentral:context;3"],
        "@id": "dtmi:iotcentral:schema:geopoint;3",
        "@type": "Object",
        fields: [
          {
            "@id": "dtmi:iotcentral:schema:geopoint:lon;3",
            "@type": "Field",
            name: "lon",
            schema: "double"
          },
          {
            "@id": "dtmi:iotcentral:schema:geopoint:lat;3",
            "@type": "Field",
            name: "lat",
            schema: "double"
          },
          {
            "@id": "dtmi:iotcentral:schema:geopoint:alt;3",
            "@type": "Field",
            name: "alt",
            schema: "double"
          }
        ]
      }
    ];
  }

  // codegen-outline-begin fields
  private static _standardModel: Model;
  private static _elementReferences: { [dtmi: string]: Set<InDTMI> };
  // codegen-outline-end

  // codegen-outline-begin methods
  static initialize() {
    this._standardModel = new Model();
    this._elementReferences = {};

    const objectPropertyInfoList: ParsedObjectPropertyInfo[] = [];
    const aggregateContext = new AggregateContext(true, true);
    const parsingErrors: ParsingError[] = [];
    StandardElements.parseResourceIntoStandardModel(
      this.getDigestElements(),
      objectPropertyInfoList,
      aggregateContext,
      parsingErrors
    );

    for (const objectPropertyInfo of objectPropertyInfoList) {
      if (!this._elementReferences[objectPropertyInfo.elementId]) {
        this._elementReferences[objectPropertyInfo.elementId] = new Set<InDTMI>();
      }

      // TODO FOR LATER : How is 1 dtmi related to a set ?
      this._elementReferences[objectPropertyInfo.elementId].add(
        new InDTMI(objectPropertyInfo.referencedElementId)
      );
    }
    this._standardModel.setObjectProperties(objectPropertyInfoList, parsingErrors);
  }

  public static tryAddElementToModel(model: Model, elementId: string) {
    if (this._standardModel.dict[elementId] === undefined) {
      return false;
    }

    model.dict[elementId] = this._standardModel.dict[elementId];

    if (this._elementReferences[elementId] !== undefined) {
      this._elementReferences[elementId].forEach((referencedElementId) => {
        if (model.dict[referencedElementId.value] === undefined) {
          this.tryAddElementToModel(model, referencedElementId.value);
        }
      });
    }

    return true;
  }

  static parseResourceIntoStandardModel(
    resource: any[],
    objectPropertyInfoList: ParsedObjectPropertyInfo[],
    aggregateContext: AggregateContext,
    parsingErrors: ParsingError[]
  ): void {
    for (const modelElement of resource) {
      ModelParserImpl._parseObject(
        this._standardModel,
        objectPropertyInfoList,
        [],
        aggregateContext.getChildContext(modelElement, parsingErrors),
        parsingErrors,
        modelElement
      );
    }
    if (parsingErrors.length !== 0) {
      throw new ParsingException(parsingErrors);
    }
  }
  // codegen-outline-end
}

StandardElements.initialize();
