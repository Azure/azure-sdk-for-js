// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import {
  SupplementalTypeInfo,
  SupplementalTypeInfoImpl,
  SupplementalTypeCollection
} from "./internal";
import { ExtensionKind } from "./internal";
import { InDTMI } from "./internal";
import { ValueConstraint } from "./internal";
/**
 * A collection of DTDL types that are not materialized as TS Classes
 **/
export class SupplementalTypeCollectionImpl {
  supplementalTypes: Map<string, SupplementalTypeInfo>;

  constructor() {
    this.supplementalTypes = new Map<string, SupplementalTypeInfo>();

    const dtdlContextIdV2: InDTMI = new InDTMI("dtmi:dtdl:context;2");
    const dtdlContextIdV3: InDTMI = new InDTMI("dtmi:dtdl:context;3");
    const iotcentralContextIdV2: InDTMI = new InDTMI("dtmi:iotcentral:context;2");
    const iotcentralContextIdV3: InDTMI = new InDTMI("dtmi:iotcentral:context;3");
    const dtdlExtensionLayeringContextIdV1: InDTMI = new InDTMI("dtmi:dtdl:extension:layering;1");
    const dtdlExtensionInitializationContextIdV1: InDTMI = new InDTMI(
      "dtmi:dtdl:extension:initialization;1"
    );
    const dtdlExtensionHistorizationContextIdV1: InDTMI = new InDTMI(
      "dtmi:dtdl:extension:historization;1"
    );
    const dtdlExtensionHistorizationContextIdV2: InDTMI = new InDTMI(
      "dtmi:dtdl:extension:historization;2"
    );

    const unitTypeIdV2: InDTMI = new InDTMI("dtmi:dtdl:class:Unit;2");
    const unitAttributeTypeIdV2: InDTMI = new InDTMI("dtmi:dtdl:class:UnitAttribute;2");
    const latentTypeTypeIdV3: InDTMI = new InDTMI("dtmi:dtdl:class:LatentType;3");
    const namedLatentTypeTypeIdV3: InDTMI = new InDTMI("dtmi:dtdl:class:NamedLatentType;3");
    const unitTypeIdV3: InDTMI = new InDTMI("dtmi:dtdl:class:Unit;3");
    const unitAttributeTypeIdV3: InDTMI = new InDTMI("dtmi:dtdl:class:UnitAttribute;3");
    const adjunctTypeTypeIdV3: InDTMI = new InDTMI("dtmi:dtdl:class:AdjunctType;3");
    const semanticTypeTypeIdV2: InDTMI = new InDTMI("dtmi:dtdl:class:SemanticType;2");
    const semanticTypeTypeIdV3: InDTMI = new InDTMI("dtmi:dtdl:class:SemanticType;3");
    const semanticUnitTypeIdV2: InDTMI = new InDTMI("dtmi:dtdl:class:SemanticUnit;2");
    const semanticUnitTypeIdV3: InDTMI = new InDTMI("dtmi:dtdl:class:SemanticUnit;3");
    const historizedTypeIdv1: InDTMI = new InDTMI(
      "dtmi:dtdl:extension:historization:v1:Historized"
    );
    const historizedTypeIdv2: InDTMI = new InDTMI(
      "dtmi:dtdl:extension:historization:v2:Historized"
    );
    const initializedTypeIdv1: InDTMI = new InDTMI(
      "dtmi:dtdl:extension:initialization:v1:Initialized"
    );
    const layerTypeIdv1: InDTMI = new InDTMI("dtmi:dtdl:extension:layering:v1:Layer");
    const accelerationVectorTypeIdV2: InDTMI = new InDTMI(
      "dtmi:iotcentral:class:AccelerationVector;2"
    );
    const accelerationVectorTypeIdV3: InDTMI = new InDTMI(
      "dtmi:iotcentral:class:AccelerationVector;3"
    );
    const eventTypeIdV2: InDTMI = new InDTMI("dtmi:iotcentral:class:Event;2");
    const eventTypeIdV3: InDTMI = new InDTMI("dtmi:iotcentral:class:Event;3");
    const locationTypeIdV2: InDTMI = new InDTMI("dtmi:iotcentral:class:Location;2");
    const locationTypeIdV3: InDTMI = new InDTMI("dtmi:iotcentral:class:Location;3");
    const stateTypeIdV2: InDTMI = new InDTMI("dtmi:iotcentral:class:State;2");
    const stateTypeIdV3: InDTMI = new InDTMI("dtmi:iotcentral:class:State;3");
    const velocityVectorTypeIdV2: InDTMI = new InDTMI("dtmi:iotcentral:class:VelocityVector;2");
    const velocityVectorTypeIdV3: InDTMI = new InDTMI("dtmi:iotcentral:class:VelocityVector;3");
    const accelerationTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Acceleration;2");
    const accelerationTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Acceleration;3");
    const accelerationUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:AccelerationUnit;2");
    const accelerationUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:AccelerationUnit;3");
    const angleTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Angle;2");
    const angleTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Angle;3");
    const angleUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:AngleUnit;2");
    const angleUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:AngleUnit;3");
    const angularAccelerationTypeIdV2: InDTMI = new InDTMI(
      "dtmi:standard:class:AngularAcceleration;2"
    );
    const angularAccelerationTypeIdV3: InDTMI = new InDTMI(
      "dtmi:standard:class:AngularAcceleration;3"
    );
    const angularAccelerationUnitTypeIdV2: InDTMI = new InDTMI(
      "dtmi:standard:class:AngularAccelerationUnit;2"
    );
    const angularAccelerationUnitTypeIdV3: InDTMI = new InDTMI(
      "dtmi:standard:class:AngularAccelerationUnit;3"
    );
    const angularVelocityTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:AngularVelocity;2");
    const angularVelocityTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:AngularVelocity;3");
    const angularVelocityUnitTypeIdV2: InDTMI = new InDTMI(
      "dtmi:standard:class:AngularVelocityUnit;2"
    );
    const angularVelocityUnitTypeIdV3: InDTMI = new InDTMI(
      "dtmi:standard:class:AngularVelocityUnit;3"
    );
    const areaTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Area;2");
    const areaTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Area;3");
    const areaUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:AreaUnit;2");
    const areaUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:AreaUnit;3");
    const binaryPrefixTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:BinaryPrefix;2");
    const binaryPrefixTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:BinaryPrefix;3");
    const binaryUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:BinaryUnit;2");
    const binaryUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:BinaryUnit;3");
    const capacitanceTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Capacitance;2");
    const capacitanceTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Capacitance;3");
    const capacitanceUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:CapacitanceUnit;2");
    const capacitanceUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:CapacitanceUnit;3");
    const chargeUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:ChargeUnit;2");
    const chargeUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:ChargeUnit;3");
    const currentTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Current;2");
    const currentTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Current;3");
    const currentUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:CurrentUnit;2");
    const currentUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:CurrentUnit;3");
    const dataRateTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:DataRate;2");
    const dataRateTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:DataRate;3");
    const dataRateUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:DataRateUnit;2");
    const dataRateUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:DataRateUnit;3");
    const dataSizeTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:DataSize;2");
    const dataSizeTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:DataSize;3");
    const dataSizeUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:DataSizeUnit;2");
    const dataSizeUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:DataSizeUnit;3");
    const decimalPrefixTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:DecimalPrefix;2");
    const decimalPrefixTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:DecimalPrefix;3");
    const decimalUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:DecimalUnit;2");
    const decimalUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:DecimalUnit;3");
    const densityTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Density;2");
    const densityTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Density;3");
    const densityUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:DensityUnit;2");
    const densityUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:DensityUnit;3");
    const distanceTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Distance;2");
    const distanceTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Distance;3");
    const electricChargeTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:ElectricCharge;2");
    const electricChargeTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:ElectricCharge;3");
    const energyTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Energy;2");
    const energyTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Energy;3");
    const energyUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:EnergyUnit;2");
    const energyUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:EnergyUnit;3");
    const forceTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Force;2");
    const forceTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Force;3");
    const forceUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:ForceUnit;2");
    const forceUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:ForceUnit;3");
    const frequencyTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Frequency;2");
    const frequencyTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Frequency;3");
    const frequencyUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:FrequencyUnit;2");
    const frequencyUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:FrequencyUnit;3");
    const humidityTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Humidity;2");
    const humidityTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Humidity;3");
    const illuminanceTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Illuminance;2");
    const illuminanceTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Illuminance;3");
    const illuminanceUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:IlluminanceUnit;2");
    const illuminanceUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:IlluminanceUnit;3");
    const inductanceTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Inductance;2");
    const inductanceTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Inductance;3");
    const inductanceUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:InductanceUnit;2");
    const inductanceUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:InductanceUnit;3");
    const latitudeTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Latitude;2");
    const latitudeTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Latitude;3");
    const lengthTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Length;2");
    const lengthTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Length;3");
    const lengthUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:LengthUnit;2");
    const lengthUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:LengthUnit;3");
    const longitudeTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Longitude;2");
    const longitudeTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Longitude;3");
    const luminanceTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Luminance;2");
    const luminanceTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Luminance;3");
    const luminanceUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:LuminanceUnit;2");
    const luminanceUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:LuminanceUnit;3");
    const luminosityTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Luminosity;2");
    const luminosityTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Luminosity;3");
    const luminousFluxTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:LuminousFlux;2");
    const luminousFluxTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:LuminousFlux;3");
    const luminousFluxUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:LuminousFluxUnit;2");
    const luminousFluxUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:LuminousFluxUnit;3");
    const luminousIntensityTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:LuminousIntensity;2");
    const luminousIntensityTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:LuminousIntensity;3");
    const luminousIntensityUnitTypeIdV2: InDTMI = new InDTMI(
      "dtmi:standard:class:LuminousIntensityUnit;2"
    );
    const luminousIntensityUnitTypeIdV3: InDTMI = new InDTMI(
      "dtmi:standard:class:LuminousIntensityUnit;3"
    );
    const magneticFluxTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:MagneticFlux;2");
    const magneticFluxTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:MagneticFlux;3");
    const magneticFluxUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:MagneticFluxUnit;2");
    const magneticFluxUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:MagneticFluxUnit;3");
    const magneticInductionTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:MagneticInduction;2");
    const magneticInductionTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:MagneticInduction;3");
    const magneticInductionUnitTypeIdV2: InDTMI = new InDTMI(
      "dtmi:standard:class:MagneticInductionUnit;2"
    );
    const magneticInductionUnitTypeIdV3: InDTMI = new InDTMI(
      "dtmi:standard:class:MagneticInductionUnit;3"
    );
    const massTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Mass;2");
    const massTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Mass;3");
    const massFlowRateTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:MassFlowRate;2");
    const massFlowRateTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:MassFlowRate;3");
    const massFlowRateUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:MassFlowRateUnit;2");
    const massFlowRateUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:MassFlowRateUnit;3");
    const massUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:MassUnit;2");
    const massUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:MassUnit;3");
    const powerTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Power;2");
    const powerTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Power;3");
    const powerUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:PowerUnit;2");
    const powerUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:PowerUnit;3");
    const pressureTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Pressure;2");
    const pressureTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Pressure;3");
    const pressureUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:PressureUnit;2");
    const pressureUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:PressureUnit;3");
    const quantitativeTypeTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:QuantitativeType;2");
    const quantitativeTypeTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:QuantitativeType;3");
    const ratioUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:RatioUnit;2");
    const ratioUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:RatioUnit;3");
    const relativeHumidityTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:RelativeHumidity;2");
    const relativeHumidityTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:RelativeHumidity;3");
    const resistanceTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Resistance;2");
    const resistanceTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Resistance;3");
    const resistanceUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:ResistanceUnit;2");
    const resistanceUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:ResistanceUnit;3");
    const soundPressureTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:SoundPressure;2");
    const soundPressureTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:SoundPressure;3");
    const soundPressureUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:SoundPressureUnit;2");
    const soundPressureUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:SoundPressureUnit;3");
    const temperatureTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Temperature;2");
    const temperatureTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Temperature;3");
    const temperatureUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:TemperatureUnit;2");
    const temperatureUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:TemperatureUnit;3");
    const thrustTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Thrust;2");
    const thrustTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Thrust;3");
    const timeSpanTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:TimeSpan;2");
    const timeSpanTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:TimeSpan;3");
    const timeUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:TimeUnit;2");
    const timeUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:TimeUnit;3");
    const torqueTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Torque;2");
    const torqueTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Torque;3");
    const torqueUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:TorqueUnit;2");
    const torqueUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:TorqueUnit;3");
    const unitlessTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Unitless;2");
    const unitlessTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Unitless;3");
    const velocityTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Velocity;2");
    const velocityTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Velocity;3");
    const velocityUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:VelocityUnit;2");
    const velocityUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:VelocityUnit;3");
    const voltageTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Voltage;2");
    const voltageTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Voltage;3");
    const voltageUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:VoltageUnit;2");
    const voltageUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:VoltageUnit;3");
    const volumeTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:Volume;2");
    const volumeTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:Volume;3");
    const volumeFlowRateTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:VolumeFlowRate;2");
    const volumeFlowRateTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:VolumeFlowRate;3");
    const volumeFlowRateUnitTypeIdV2: InDTMI = new InDTMI(
      "dtmi:standard:class:VolumeFlowRateUnit;2"
    );
    const volumeFlowRateUnitTypeIdV3: InDTMI = new InDTMI(
      "dtmi:standard:class:VolumeFlowRateUnit;3"
    );
    const volumeUnitTypeIdV2: InDTMI = new InDTMI("dtmi:standard:class:VolumeUnit;2");
    const volumeUnitTypeIdV3: InDTMI = new InDTMI("dtmi:standard:class:VolumeUnit;3");

    const adjunctTypeInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.NONE,
      dtdlContextIdV3.value,
      adjunctTypeTypeIdV3.value,
      true,
      undefined
    );
    adjunctTypeInfoV3.addCotype("array");
    adjunctTypeInfoV3.addCotype("boolean");
    adjunctTypeInfoV3.addCotype("command");
    adjunctTypeInfoV3.addCotype("commandpayload");
    adjunctTypeInfoV3.addCotype("commandrequest");
    adjunctTypeInfoV3.addCotype("commandresponse");
    adjunctTypeInfoV3.addCotype("commandtype");
    adjunctTypeInfoV3.addCotype("component");
    adjunctTypeInfoV3.addCotype("date");
    adjunctTypeInfoV3.addCotype("datetime");
    adjunctTypeInfoV3.addCotype("double");
    adjunctTypeInfoV3.addCotype("duration");
    adjunctTypeInfoV3.addCotype("enum");
    adjunctTypeInfoV3.addCotype("enumvalue");
    adjunctTypeInfoV3.addCotype("field");
    adjunctTypeInfoV3.addCotype("float");
    adjunctTypeInfoV3.addCotype("integer");
    adjunctTypeInfoV3.addCotype("interface");
    adjunctTypeInfoV3.addCotype("latenttype");
    adjunctTypeInfoV3.addCotype("long");
    adjunctTypeInfoV3.addCotype("map");
    adjunctTypeInfoV3.addCotype("mapkey");
    adjunctTypeInfoV3.addCotype("mapvalue");
    adjunctTypeInfoV3.addCotype("namedlatenttype");
    adjunctTypeInfoV3.addCotype("object");
    adjunctTypeInfoV3.addCotype("property");
    adjunctTypeInfoV3.addCotype("relationship");
    adjunctTypeInfoV3.addCotype("string");
    adjunctTypeInfoV3.addCotype("telemetry");
    adjunctTypeInfoV3.addCotype("time");
    adjunctTypeInfoV3.addCotype("unit");
    adjunctTypeInfoV3.addCotype("unitattribute");
    adjunctTypeInfoV3.addCotypeVersion(2);
    adjunctTypeInfoV3.addCotypeVersion(3);

    const semanticTypeInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.NONE,
      dtdlContextIdV2.value,
      semanticTypeTypeIdV2.value,
      true,
      undefined
    );
    semanticTypeInfoV2.addCotype("property");
    semanticTypeInfoV2.addCotype("relationship");
    semanticTypeInfoV2.addCotype("telemetry");
    semanticTypeInfoV2.addCotypeVersion(2);

    const semanticTypeInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.NONE,
      dtdlContextIdV3.value,
      semanticTypeTypeIdV3.value,
      true,
      undefined
    );
    semanticTypeInfoV3.addCotype("field");
    semanticTypeInfoV3.addCotype("property");
    semanticTypeInfoV3.addCotype("relationship");
    semanticTypeInfoV3.addCotype("telemetry");
    semanticTypeInfoV3.addCotypeVersion(3);

    const semanticUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.NONE,
      dtdlContextIdV2.value,
      semanticUnitTypeIdV2.value,
      true,
      undefined
    );
    semanticUnitInfoV2.addCotype("unit");
    semanticUnitInfoV2.addCotypeVersion(2);

    const semanticUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.NONE,
      dtdlContextIdV3.value,
      semanticUnitTypeIdV3.value,
      true,
      undefined
    );
    semanticUnitInfoV3.addCotype("unit");
    semanticUnitInfoV3.addCotypeVersion(3);

    const historizedInfov1 = new SupplementalTypeInfoImpl(
      ExtensionKind.ADJUNCTTYPE,
      dtdlExtensionHistorizationContextIdV1.value,
      historizedTypeIdv1.value,
      false,
      adjunctTypeTypeIdV3.value
    );
    historizedInfov1.addCotype("property");
    historizedInfov1.addCotypeVersion(2);
    historizedInfov1.addCotypeVersion(3);

    const historizedInfov2 = new SupplementalTypeInfoImpl(
      ExtensionKind.ADJUNCTTYPE,
      dtdlExtensionHistorizationContextIdV2.value,
      historizedTypeIdv2.value,
      false,
      adjunctTypeTypeIdV3.value
    );
    historizedInfov2.addCotype("property");
    historizedInfov2.addCotype("telemetry");
    historizedInfov2.addCotypeVersion(2);
    historizedInfov2.addCotypeVersion(3);

    const initializedInfov1 = new SupplementalTypeInfoImpl(
      ExtensionKind.ADJUNCTTYPE,
      dtdlExtensionInitializationContextIdV1.value,
      initializedTypeIdv1.value,
      false,
      adjunctTypeTypeIdV3.value
    );
    initializedInfov1.addProperty(
      "dtmi:dtdl:extension:initialization:v1:Initialized:initialValue",
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#JSON",
      false,
      false,
      1,
      1,
      undefined,
      "schema"
    );
    initializedInfov1.addCotype("commandpayload");
    initializedInfov1.addCotype("commandrequest");
    initializedInfov1.addCotype("property");
    initializedInfov1.addCotypeVersion(2);
    initializedInfov1.addCotypeVersion(3);

    const layerInfov1 = new SupplementalTypeInfoImpl(
      ExtensionKind.ADJUNCTTYPE,
      dtdlExtensionLayeringContextIdV1.value,
      layerTypeIdv1.value,
      false,
      adjunctTypeTypeIdV3.value
    );
    layerInfov1.addCotype("command");
    layerInfov1.addCotype("interface");
    layerInfov1.addCotype("property");
    layerInfov1.addCotype("relationship");
    layerInfov1.addCotype("telemetry");
    layerInfov1.addCotypeVersion(3);

    const accelerationVectorInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV2.value,
      accelerationVectorTypeIdV2.value,
      false,
      semanticTypeTypeIdV2.value
    );
    accelerationVectorInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:AccelerationUnit;2",
      false,
      true,
      1,
      undefined,
      undefined,
      undefined
    );
    accelerationVectorInfoV2.addConstraint("schema", {
      requiredValues: ["dtmi:iotcentral:schema:vector;2"],
      requiredValuesString: "vector"
    });
    accelerationVectorInfoV2.addCotype("property");
    accelerationVectorInfoV2.addCotype("relationship");
    accelerationVectorInfoV2.addCotype("telemetry");
    accelerationVectorInfoV2.addCotypeVersion(2);

    const accelerationVectorInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV3.value,
      accelerationVectorTypeIdV3.value,
      false,
      semanticTypeTypeIdV3.value
    );
    accelerationVectorInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:AccelerationUnit;3",
      false,
      true,
      1,
      undefined,
      undefined,
      undefined
    );
    accelerationVectorInfoV3.addConstraint("schema", {
      requiredValues: ["dtmi:iotcentral:schema:vector;3"],
      requiredValuesString: "vector"
    });
    accelerationVectorInfoV3.addCotype("field");
    accelerationVectorInfoV3.addCotype("property");
    accelerationVectorInfoV3.addCotype("relationship");
    accelerationVectorInfoV3.addCotype("telemetry");
    accelerationVectorInfoV3.addCotypeVersion(3);

    const eventInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV2.value,
      eventTypeIdV2.value,
      false,
      semanticTypeTypeIdV2.value
    );
    eventInfoV2.addConstraint("schema", {
      requiredTypes: ["dtmi:dtdl:class:NumericSchema;2", "dtmi:dtdl:class:String;2"],
      requiredTypesString: "NumericSchema or String"
    });
    eventInfoV2.addCotype("property");
    eventInfoV2.addCotype("relationship");
    eventInfoV2.addCotype("telemetry");
    eventInfoV2.addCotypeVersion(2);

    const eventInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV3.value,
      eventTypeIdV3.value,
      false,
      semanticTypeTypeIdV3.value
    );
    eventInfoV3.addConstraint("schema", {
      requiredTypes: ["dtmi:dtdl:class:NumericSchema;3", "dtmi:dtdl:class:String;3"],
      requiredTypesString: "NumericSchema or String"
    });
    eventInfoV3.addCotype("field");
    eventInfoV3.addCotype("property");
    eventInfoV3.addCotype("relationship");
    eventInfoV3.addCotype("telemetry");
    eventInfoV3.addCotypeVersion(3);

    const locationInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV2.value,
      locationTypeIdV2.value,
      false,
      semanticTypeTypeIdV2.value
    );
    locationInfoV2.addConstraint("schema", {
      requiredValues: [
        "dtmi:standard:schema:geospatial:point;2",
        "dtmi:standard:schema:geospatial:multiPoint;2",
        "dtmi:standard:schema:geospatial:lineString;2",
        "dtmi:standard:schema:geospatial:multiLineString;2",
        "dtmi:standard:schema:geospatial:polygon;2",
        "dtmi:standard:schema:geospatial:multiPolygon;2",
        "dtmi:iotcentral:schema:geopoint;2"
      ],
      requiredValuesString:
        "point or multiPoint or lineString or multiLineString or polygon or multiPolygon or geopoint"
    });
    locationInfoV2.addCotype("property");
    locationInfoV2.addCotype("relationship");
    locationInfoV2.addCotype("telemetry");
    locationInfoV2.addCotypeVersion(2);

    const locationInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV3.value,
      locationTypeIdV3.value,
      false,
      semanticTypeTypeIdV3.value
    );
    locationInfoV3.addConstraint("schema", {
      requiredValues: [
        "dtmi:standard:schema:geospatial:point;3",
        "dtmi:standard:schema:geospatial:multiPoint;3",
        "dtmi:standard:schema:geospatial:lineString;3",
        "dtmi:standard:schema:geospatial:multiLineString;3",
        "dtmi:standard:schema:geospatial:polygon;3",
        "dtmi:standard:schema:geospatial:multiPolygon;3",
        "dtmi:iotcentral:schema:geopoint;3"
      ],
      requiredValuesString:
        "point or multiPoint or lineString or multiLineString or polygon or multiPolygon or geopoint"
    });
    locationInfoV3.addCotype("field");
    locationInfoV3.addCotype("property");
    locationInfoV3.addCotype("relationship");
    locationInfoV3.addCotype("telemetry");
    locationInfoV3.addCotypeVersion(3);

    const stateInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV2.value,
      stateTypeIdV2.value,
      false,
      semanticTypeTypeIdV2.value
    );
    stateInfoV2.addConstraint("schema", {
      requiredTypes: ["dtmi:dtdl:class:Enum;2"],
      requiredTypesString: "Enum"
    });
    stateInfoV2.addCotype("property");
    stateInfoV2.addCotype("relationship");
    stateInfoV2.addCotype("telemetry");
    stateInfoV2.addCotypeVersion(2);

    const stateInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV3.value,
      stateTypeIdV3.value,
      false,
      semanticTypeTypeIdV3.value
    );
    stateInfoV3.addConstraint("schema", {
      requiredTypes: ["dtmi:dtdl:class:Enum;3"],
      requiredTypesString: "Enum"
    });
    stateInfoV3.addCotype("field");
    stateInfoV3.addCotype("property");
    stateInfoV3.addCotype("relationship");
    stateInfoV3.addCotype("telemetry");
    stateInfoV3.addCotypeVersion(3);

    const velocityVectorInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV2.value,
      velocityVectorTypeIdV2.value,
      false,
      semanticTypeTypeIdV2.value
    );
    velocityVectorInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:VelocityUnit;2",
      false,
      true,
      1,
      undefined,
      undefined,
      undefined
    );
    velocityVectorInfoV2.addConstraint("schema", {
      requiredValues: ["dtmi:iotcentral:schema:vector;2"],
      requiredValuesString: "vector"
    });
    velocityVectorInfoV2.addCotype("property");
    velocityVectorInfoV2.addCotype("relationship");
    velocityVectorInfoV2.addCotype("telemetry");
    velocityVectorInfoV2.addCotypeVersion(2);

    const velocityVectorInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      iotcentralContextIdV3.value,
      velocityVectorTypeIdV3.value,
      false,
      semanticTypeTypeIdV3.value
    );
    velocityVectorInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:VelocityUnit;3",
      false,
      true,
      1,
      undefined,
      undefined,
      undefined
    );
    velocityVectorInfoV3.addConstraint("schema", {
      requiredValues: ["dtmi:iotcentral:schema:vector;3"],
      requiredValuesString: "vector"
    });
    velocityVectorInfoV3.addCotype("field");
    velocityVectorInfoV3.addCotype("property");
    velocityVectorInfoV3.addCotype("relationship");
    velocityVectorInfoV3.addCotype("telemetry");
    velocityVectorInfoV3.addCotypeVersion(3);

    const accelerationInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      accelerationTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    accelerationInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:AccelerationUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    accelerationInfoV2.addCotype("property");
    accelerationInfoV2.addCotype("telemetry");
    accelerationInfoV2.addCotypeVersion(2);

    const accelerationInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      accelerationTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    accelerationInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:AccelerationUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    accelerationInfoV3.addCotype("field");
    accelerationInfoV3.addCotype("property");
    accelerationInfoV3.addCotype("telemetry");
    accelerationInfoV3.addCotypeVersion(3);

    const accelerationUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      accelerationUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const accelerationUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      accelerationUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const angleInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      angleTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    angleInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:AngleUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    angleInfoV2.addCotype("property");
    angleInfoV2.addCotype("telemetry");
    angleInfoV2.addCotypeVersion(2);

    const angleInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      angleTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    angleInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:AngleUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    angleInfoV3.addCotype("field");
    angleInfoV3.addCotype("property");
    angleInfoV3.addCotype("telemetry");
    angleInfoV3.addCotypeVersion(3);

    const angleUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      angleUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const angleUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      angleUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const angularAccelerationInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      angularAccelerationTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    angularAccelerationInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:AngularAccelerationUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    angularAccelerationInfoV2.addCotype("property");
    angularAccelerationInfoV2.addCotype("telemetry");
    angularAccelerationInfoV2.addCotypeVersion(2);

    const angularAccelerationInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      angularAccelerationTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    angularAccelerationInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:AngularAccelerationUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    angularAccelerationInfoV3.addCotype("field");
    angularAccelerationInfoV3.addCotype("property");
    angularAccelerationInfoV3.addCotype("telemetry");
    angularAccelerationInfoV3.addCotypeVersion(3);

    const angularAccelerationUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      angularAccelerationUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const angularAccelerationUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      angularAccelerationUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const angularVelocityInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      angularVelocityTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    angularVelocityInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:AngularVelocityUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    angularVelocityInfoV2.addCotype("property");
    angularVelocityInfoV2.addCotype("telemetry");
    angularVelocityInfoV2.addCotypeVersion(2);

    const angularVelocityInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      angularVelocityTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    angularVelocityInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:AngularVelocityUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    angularVelocityInfoV3.addCotype("field");
    angularVelocityInfoV3.addCotype("property");
    angularVelocityInfoV3.addCotype("telemetry");
    angularVelocityInfoV3.addCotypeVersion(3);

    const angularVelocityUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      angularVelocityUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const angularVelocityUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      angularVelocityUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const areaInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      areaTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    areaInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:AreaUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    areaInfoV2.addCotype("property");
    areaInfoV2.addCotype("telemetry");
    areaInfoV2.addCotypeVersion(2);

    const areaInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      areaTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    areaInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:AreaUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    areaInfoV3.addCotype("field");
    areaInfoV3.addCotype("property");
    areaInfoV3.addCotype("telemetry");
    areaInfoV3.addCotypeVersion(3);

    const areaUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      areaUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const areaUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      areaUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const binaryPrefixInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNITATTRIBUTE,
      dtdlContextIdV2.value,
      binaryPrefixTypeIdV2.value,
      false,
      unitAttributeTypeIdV2.value
    );
    binaryPrefixInfoV2.addProperty(
      "dtmi:dtdl:property:exponent;2",
      "http://www.w3.org/2001/XMLSchema#integer",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    binaryPrefixInfoV2.addProperty(
      "dtmi:dtdl:property:symbol;2",
      "http://www.w3.org/2001/XMLSchema#string",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );

    const binaryPrefixInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNITATTRIBUTE,
      dtdlContextIdV3.value,
      binaryPrefixTypeIdV3.value,
      false,
      unitAttributeTypeIdV3.value
    );
    binaryPrefixInfoV3.addProperty(
      "dtmi:dtdl:property:exponent;3",
      "http://www.w3.org/2001/XMLSchema#integer",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    binaryPrefixInfoV3.addProperty(
      "dtmi:dtdl:property:symbol;3",
      "http://www.w3.org/2001/XMLSchema#string",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );

    const binaryUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICUNIT,
      dtdlContextIdV2.value,
      binaryUnitTypeIdV2.value,
      false,
      semanticUnitTypeIdV2.value
    );
    binaryUnitInfoV2.addProperty(
      "dtmi:dtdl:property:baseUnit;2",
      "dtmi:dtdl:class:Unit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    binaryUnitInfoV2.addProperty(
      "dtmi:dtdl:property:prefix;2",
      "dtmi:standard:class:BinaryPrefix;2",
      false,
      true,
      1,
      undefined,
      undefined,
      undefined
    );
    binaryUnitInfoV2.addCotype("unit");
    binaryUnitInfoV2.addCotypeVersion(2);

    const binaryUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICUNIT,
      dtdlContextIdV3.value,
      binaryUnitTypeIdV3.value,
      false,
      semanticUnitTypeIdV3.value
    );
    binaryUnitInfoV3.addProperty(
      "dtmi:dtdl:property:baseUnit;3",
      "dtmi:dtdl:class:Unit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    binaryUnitInfoV3.addProperty(
      "dtmi:dtdl:property:prefix;3",
      "dtmi:standard:class:BinaryPrefix;3",
      false,
      true,
      1,
      undefined,
      undefined,
      undefined
    );
    binaryUnitInfoV3.addCotype("unit");
    binaryUnitInfoV3.addCotypeVersion(3);

    const capacitanceInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      capacitanceTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    capacitanceInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:CapacitanceUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    capacitanceInfoV2.addCotype("property");
    capacitanceInfoV2.addCotype("telemetry");
    capacitanceInfoV2.addCotypeVersion(2);

    const capacitanceInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      capacitanceTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    capacitanceInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:CapacitanceUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    capacitanceInfoV3.addCotype("field");
    capacitanceInfoV3.addCotype("property");
    capacitanceInfoV3.addCotype("telemetry");
    capacitanceInfoV3.addCotypeVersion(3);

    const capacitanceUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      capacitanceUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const capacitanceUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      capacitanceUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const chargeUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      chargeUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const chargeUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      chargeUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const currentInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      currentTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    currentInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:CurrentUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    currentInfoV2.addCotype("property");
    currentInfoV2.addCotype("telemetry");
    currentInfoV2.addCotypeVersion(2);

    const currentInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      currentTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    currentInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:CurrentUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    currentInfoV3.addCotype("field");
    currentInfoV3.addCotype("property");
    currentInfoV3.addCotype("telemetry");
    currentInfoV3.addCotypeVersion(3);

    const currentUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      currentUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const currentUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      currentUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const dataRateInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      dataRateTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    dataRateInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:DataRateUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    dataRateInfoV2.addCotype("property");
    dataRateInfoV2.addCotype("telemetry");
    dataRateInfoV2.addCotypeVersion(2);

    const dataRateInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      dataRateTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    dataRateInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:DataRateUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    dataRateInfoV3.addCotype("field");
    dataRateInfoV3.addCotype("property");
    dataRateInfoV3.addCotype("telemetry");
    dataRateInfoV3.addCotypeVersion(3);

    const dataRateUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      dataRateUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const dataRateUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      dataRateUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const dataSizeInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      dataSizeTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    dataSizeInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:DataSizeUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    dataSizeInfoV2.addCotype("property");
    dataSizeInfoV2.addCotype("telemetry");
    dataSizeInfoV2.addCotypeVersion(2);

    const dataSizeInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      dataSizeTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    dataSizeInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:DataSizeUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    dataSizeInfoV3.addCotype("field");
    dataSizeInfoV3.addCotype("property");
    dataSizeInfoV3.addCotype("telemetry");
    dataSizeInfoV3.addCotypeVersion(3);

    const dataSizeUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      dataSizeUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const dataSizeUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      dataSizeUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const decimalPrefixInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNITATTRIBUTE,
      dtdlContextIdV2.value,
      decimalPrefixTypeIdV2.value,
      false,
      unitAttributeTypeIdV2.value
    );
    decimalPrefixInfoV2.addProperty(
      "dtmi:dtdl:property:exponent;2",
      "http://www.w3.org/2001/XMLSchema#integer",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    decimalPrefixInfoV2.addProperty(
      "dtmi:dtdl:property:symbol;2",
      "http://www.w3.org/2001/XMLSchema#string",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );

    const decimalPrefixInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNITATTRIBUTE,
      dtdlContextIdV3.value,
      decimalPrefixTypeIdV3.value,
      false,
      unitAttributeTypeIdV3.value
    );
    decimalPrefixInfoV3.addProperty(
      "dtmi:dtdl:property:exponent;3",
      "http://www.w3.org/2001/XMLSchema#integer",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    decimalPrefixInfoV3.addProperty(
      "dtmi:dtdl:property:symbol;3",
      "http://www.w3.org/2001/XMLSchema#string",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );

    const decimalUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICUNIT,
      dtdlContextIdV2.value,
      decimalUnitTypeIdV2.value,
      false,
      semanticUnitTypeIdV2.value
    );
    decimalUnitInfoV2.addProperty(
      "dtmi:dtdl:property:baseUnit;2",
      "dtmi:dtdl:class:Unit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    decimalUnitInfoV2.addProperty(
      "dtmi:dtdl:property:prefix;2",
      "dtmi:standard:class:DecimalPrefix;2",
      false,
      true,
      1,
      undefined,
      undefined,
      undefined
    );
    decimalUnitInfoV2.addCotype("unit");
    decimalUnitInfoV2.addCotypeVersion(2);

    const decimalUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICUNIT,
      dtdlContextIdV3.value,
      decimalUnitTypeIdV3.value,
      false,
      semanticUnitTypeIdV3.value
    );
    decimalUnitInfoV3.addProperty(
      "dtmi:dtdl:property:baseUnit;3",
      "dtmi:dtdl:class:Unit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    decimalUnitInfoV3.addProperty(
      "dtmi:dtdl:property:prefix;3",
      "dtmi:standard:class:DecimalPrefix;3",
      false,
      true,
      1,
      undefined,
      undefined,
      undefined
    );
    decimalUnitInfoV3.addCotype("unit");
    decimalUnitInfoV3.addCotypeVersion(3);

    const densityInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      densityTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    densityInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:DensityUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    densityInfoV2.addCotype("property");
    densityInfoV2.addCotype("telemetry");
    densityInfoV2.addCotypeVersion(2);

    const densityInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      densityTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    densityInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:DensityUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    densityInfoV3.addCotype("field");
    densityInfoV3.addCotype("property");
    densityInfoV3.addCotype("telemetry");
    densityInfoV3.addCotypeVersion(3);

    const densityUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      densityUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const densityUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      densityUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const distanceInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      distanceTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    distanceInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:LengthUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    distanceInfoV2.addCotype("property");
    distanceInfoV2.addCotype("telemetry");
    distanceInfoV2.addCotypeVersion(2);

    const distanceInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      distanceTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    distanceInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:LengthUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    distanceInfoV3.addCotype("field");
    distanceInfoV3.addCotype("property");
    distanceInfoV3.addCotype("telemetry");
    distanceInfoV3.addCotypeVersion(3);

    const electricChargeInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      electricChargeTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    electricChargeInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:ChargeUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    electricChargeInfoV2.addCotype("property");
    electricChargeInfoV2.addCotype("telemetry");
    electricChargeInfoV2.addCotypeVersion(2);

    const electricChargeInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      electricChargeTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    electricChargeInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:ChargeUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    electricChargeInfoV3.addCotype("field");
    electricChargeInfoV3.addCotype("property");
    electricChargeInfoV3.addCotype("telemetry");
    electricChargeInfoV3.addCotypeVersion(3);

    const energyInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      energyTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    energyInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:EnergyUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    energyInfoV2.addCotype("property");
    energyInfoV2.addCotype("telemetry");
    energyInfoV2.addCotypeVersion(2);

    const energyInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      energyTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    energyInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:EnergyUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    energyInfoV3.addCotype("field");
    energyInfoV3.addCotype("property");
    energyInfoV3.addCotype("telemetry");
    energyInfoV3.addCotypeVersion(3);

    const energyUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      energyUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const energyUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      energyUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const forceInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      forceTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    forceInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:ForceUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    forceInfoV2.addCotype("property");
    forceInfoV2.addCotype("telemetry");
    forceInfoV2.addCotypeVersion(2);

    const forceInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      forceTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    forceInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:ForceUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    forceInfoV3.addCotype("field");
    forceInfoV3.addCotype("property");
    forceInfoV3.addCotype("telemetry");
    forceInfoV3.addCotypeVersion(3);

    const forceUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      forceUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const forceUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      forceUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const frequencyInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      frequencyTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    frequencyInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:FrequencyUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    frequencyInfoV2.addCotype("property");
    frequencyInfoV2.addCotype("telemetry");
    frequencyInfoV2.addCotypeVersion(2);

    const frequencyInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      frequencyTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    frequencyInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:FrequencyUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    frequencyInfoV3.addCotype("field");
    frequencyInfoV3.addCotype("property");
    frequencyInfoV3.addCotype("telemetry");
    frequencyInfoV3.addCotypeVersion(3);

    const frequencyUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      frequencyUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const frequencyUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      frequencyUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const humidityInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      humidityTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    humidityInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:DensityUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    humidityInfoV2.addCotype("property");
    humidityInfoV2.addCotype("telemetry");
    humidityInfoV2.addCotypeVersion(2);

    const humidityInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      humidityTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    humidityInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:DensityUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    humidityInfoV3.addCotype("field");
    humidityInfoV3.addCotype("property");
    humidityInfoV3.addCotype("telemetry");
    humidityInfoV3.addCotypeVersion(3);

    const illuminanceInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      illuminanceTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    illuminanceInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:IlluminanceUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    illuminanceInfoV2.addCotype("property");
    illuminanceInfoV2.addCotype("telemetry");
    illuminanceInfoV2.addCotypeVersion(2);

    const illuminanceInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      illuminanceTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    illuminanceInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:IlluminanceUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    illuminanceInfoV3.addCotype("field");
    illuminanceInfoV3.addCotype("property");
    illuminanceInfoV3.addCotype("telemetry");
    illuminanceInfoV3.addCotypeVersion(3);

    const illuminanceUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      illuminanceUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const illuminanceUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      illuminanceUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const inductanceInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      inductanceTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    inductanceInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:InductanceUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    inductanceInfoV2.addCotype("property");
    inductanceInfoV2.addCotype("telemetry");
    inductanceInfoV2.addCotypeVersion(2);

    const inductanceInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      inductanceTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    inductanceInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:InductanceUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    inductanceInfoV3.addCotype("field");
    inductanceInfoV3.addCotype("property");
    inductanceInfoV3.addCotype("telemetry");
    inductanceInfoV3.addCotypeVersion(3);

    const inductanceUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      inductanceUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const inductanceUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      inductanceUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const latitudeInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      latitudeTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    latitudeInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:AngleUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    latitudeInfoV2.addCotype("property");
    latitudeInfoV2.addCotype("telemetry");
    latitudeInfoV2.addCotypeVersion(2);

    const latitudeInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      latitudeTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    latitudeInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:AngleUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    latitudeInfoV3.addCotype("field");
    latitudeInfoV3.addCotype("property");
    latitudeInfoV3.addCotype("telemetry");
    latitudeInfoV3.addCotypeVersion(3);

    const lengthInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      lengthTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    lengthInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:LengthUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    lengthInfoV2.addCotype("property");
    lengthInfoV2.addCotype("telemetry");
    lengthInfoV2.addCotypeVersion(2);

    const lengthInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      lengthTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    lengthInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:LengthUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    lengthInfoV3.addCotype("field");
    lengthInfoV3.addCotype("property");
    lengthInfoV3.addCotype("telemetry");
    lengthInfoV3.addCotypeVersion(3);

    const lengthUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      lengthUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const lengthUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      lengthUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const longitudeInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      longitudeTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    longitudeInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:AngleUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    longitudeInfoV2.addCotype("property");
    longitudeInfoV2.addCotype("telemetry");
    longitudeInfoV2.addCotypeVersion(2);

    const longitudeInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      longitudeTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    longitudeInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:AngleUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    longitudeInfoV3.addCotype("field");
    longitudeInfoV3.addCotype("property");
    longitudeInfoV3.addCotype("telemetry");
    longitudeInfoV3.addCotypeVersion(3);

    const luminanceInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      luminanceTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    luminanceInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:LuminanceUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    luminanceInfoV2.addCotype("property");
    luminanceInfoV2.addCotype("telemetry");
    luminanceInfoV2.addCotypeVersion(2);

    const luminanceInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      luminanceTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    luminanceInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:LuminanceUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    luminanceInfoV3.addCotype("field");
    luminanceInfoV3.addCotype("property");
    luminanceInfoV3.addCotype("telemetry");
    luminanceInfoV3.addCotypeVersion(3);

    const luminanceUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      luminanceUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const luminanceUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      luminanceUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const luminosityInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      luminosityTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    luminosityInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:PowerUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    luminosityInfoV2.addCotype("property");
    luminosityInfoV2.addCotype("telemetry");
    luminosityInfoV2.addCotypeVersion(2);

    const luminosityInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      luminosityTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    luminosityInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:PowerUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    luminosityInfoV3.addCotype("field");
    luminosityInfoV3.addCotype("property");
    luminosityInfoV3.addCotype("telemetry");
    luminosityInfoV3.addCotypeVersion(3);

    const luminousFluxInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      luminousFluxTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    luminousFluxInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:LuminousFluxUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    luminousFluxInfoV2.addCotype("property");
    luminousFluxInfoV2.addCotype("telemetry");
    luminousFluxInfoV2.addCotypeVersion(2);

    const luminousFluxInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      luminousFluxTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    luminousFluxInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:LuminousFluxUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    luminousFluxInfoV3.addCotype("field");
    luminousFluxInfoV3.addCotype("property");
    luminousFluxInfoV3.addCotype("telemetry");
    luminousFluxInfoV3.addCotypeVersion(3);

    const luminousFluxUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      luminousFluxUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const luminousFluxUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      luminousFluxUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const luminousIntensityInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      luminousIntensityTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    luminousIntensityInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:LuminousIntensityUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    luminousIntensityInfoV2.addCotype("property");
    luminousIntensityInfoV2.addCotype("telemetry");
    luminousIntensityInfoV2.addCotypeVersion(2);

    const luminousIntensityInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      luminousIntensityTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    luminousIntensityInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:LuminousIntensityUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    luminousIntensityInfoV3.addCotype("field");
    luminousIntensityInfoV3.addCotype("property");
    luminousIntensityInfoV3.addCotype("telemetry");
    luminousIntensityInfoV3.addCotypeVersion(3);

    const luminousIntensityUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      luminousIntensityUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const luminousIntensityUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      luminousIntensityUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const magneticFluxInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      magneticFluxTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    magneticFluxInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:MagneticFluxUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    magneticFluxInfoV2.addCotype("property");
    magneticFluxInfoV2.addCotype("telemetry");
    magneticFluxInfoV2.addCotypeVersion(2);

    const magneticFluxInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      magneticFluxTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    magneticFluxInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:MagneticFluxUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    magneticFluxInfoV3.addCotype("field");
    magneticFluxInfoV3.addCotype("property");
    magneticFluxInfoV3.addCotype("telemetry");
    magneticFluxInfoV3.addCotypeVersion(3);

    const magneticFluxUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      magneticFluxUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const magneticFluxUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      magneticFluxUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const magneticInductionInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      magneticInductionTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    magneticInductionInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:MagneticInductionUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    magneticInductionInfoV2.addCotype("property");
    magneticInductionInfoV2.addCotype("telemetry");
    magneticInductionInfoV2.addCotypeVersion(2);

    const magneticInductionInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      magneticInductionTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    magneticInductionInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:MagneticInductionUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    magneticInductionInfoV3.addCotype("field");
    magneticInductionInfoV3.addCotype("property");
    magneticInductionInfoV3.addCotype("telemetry");
    magneticInductionInfoV3.addCotypeVersion(3);

    const magneticInductionUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      magneticInductionUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const magneticInductionUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      magneticInductionUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const massInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      massTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    massInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:MassUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    massInfoV2.addCotype("property");
    massInfoV2.addCotype("telemetry");
    massInfoV2.addCotypeVersion(2);

    const massInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      massTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    massInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:MassUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    massInfoV3.addCotype("field");
    massInfoV3.addCotype("property");
    massInfoV3.addCotype("telemetry");
    massInfoV3.addCotypeVersion(3);

    const massFlowRateInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      massFlowRateTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    massFlowRateInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:MassFlowRateUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    massFlowRateInfoV2.addCotype("property");
    massFlowRateInfoV2.addCotype("telemetry");
    massFlowRateInfoV2.addCotypeVersion(2);

    const massFlowRateInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      massFlowRateTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    massFlowRateInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:MassFlowRateUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    massFlowRateInfoV3.addCotype("field");
    massFlowRateInfoV3.addCotype("property");
    massFlowRateInfoV3.addCotype("telemetry");
    massFlowRateInfoV3.addCotypeVersion(3);

    const massFlowRateUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      massFlowRateUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const massFlowRateUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      massFlowRateUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const massUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      massUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const massUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      massUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const powerInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      powerTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    powerInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:PowerUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    powerInfoV2.addCotype("property");
    powerInfoV2.addCotype("telemetry");
    powerInfoV2.addCotypeVersion(2);

    const powerInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      powerTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    powerInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:PowerUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    powerInfoV3.addCotype("field");
    powerInfoV3.addCotype("property");
    powerInfoV3.addCotype("telemetry");
    powerInfoV3.addCotypeVersion(3);

    const powerUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      powerUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const powerUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      powerUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const pressureInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      pressureTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    pressureInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:PressureUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    pressureInfoV2.addCotype("property");
    pressureInfoV2.addCotype("telemetry");
    pressureInfoV2.addCotypeVersion(2);

    const pressureInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      pressureTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    pressureInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:PressureUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    pressureInfoV3.addCotype("field");
    pressureInfoV3.addCotype("property");
    pressureInfoV3.addCotype("telemetry");
    pressureInfoV3.addCotypeVersion(3);

    const pressureUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      pressureUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const pressureUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      pressureUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const quantitativeTypeInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      quantitativeTypeTypeIdV2.value,
      true,
      semanticTypeTypeIdV2.value
    );
    quantitativeTypeInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:dtdl:class:Unit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    quantitativeTypeInfoV2.addConstraint("schema", {
      requiredTypes: ["dtmi:dtdl:class:NumericSchema;2"],
      requiredTypesString: "NumericSchema"
    });
    quantitativeTypeInfoV2.addCotype("property");
    quantitativeTypeInfoV2.addCotype("telemetry");
    quantitativeTypeInfoV2.addCotypeVersion(2);

    const quantitativeTypeInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      quantitativeTypeTypeIdV3.value,
      true,
      semanticTypeTypeIdV3.value
    );
    quantitativeTypeInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:dtdl:class:Unit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    quantitativeTypeInfoV3.addConstraint("schema", {
      requiredTypes: ["dtmi:dtdl:class:NumericSchema;3"],
      requiredTypesString: "NumericSchema"
    });
    quantitativeTypeInfoV3.addCotype("field");
    quantitativeTypeInfoV3.addCotype("property");
    quantitativeTypeInfoV3.addCotype("telemetry");
    quantitativeTypeInfoV3.addCotypeVersion(3);

    const ratioUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICUNIT,
      dtdlContextIdV2.value,
      ratioUnitTypeIdV2.value,
      false,
      semanticUnitTypeIdV2.value
    );
    ratioUnitInfoV2.addProperty(
      "dtmi:dtdl:property:bottomUnit;2",
      "dtmi:dtdl:class:Unit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    ratioUnitInfoV2.addProperty(
      "dtmi:dtdl:property:topUnit;2",
      "dtmi:dtdl:class:Unit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    ratioUnitInfoV2.addCotype("unit");
    ratioUnitInfoV2.addCotypeVersion(2);

    const ratioUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICUNIT,
      dtdlContextIdV3.value,
      ratioUnitTypeIdV3.value,
      false,
      semanticUnitTypeIdV3.value
    );
    ratioUnitInfoV3.addProperty(
      "dtmi:dtdl:property:bottomUnit;3",
      "dtmi:dtdl:class:Unit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    ratioUnitInfoV3.addProperty(
      "dtmi:dtdl:property:topUnit;3",
      "dtmi:dtdl:class:Unit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    ratioUnitInfoV3.addCotype("unit");
    ratioUnitInfoV3.addCotypeVersion(3);

    const relativeHumidityInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      relativeHumidityTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    relativeHumidityInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:Unitless;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    relativeHumidityInfoV2.addCotype("property");
    relativeHumidityInfoV2.addCotype("telemetry");
    relativeHumidityInfoV2.addCotypeVersion(2);

    const relativeHumidityInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      relativeHumidityTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    relativeHumidityInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:Unitless;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    relativeHumidityInfoV3.addCotype("field");
    relativeHumidityInfoV3.addCotype("property");
    relativeHumidityInfoV3.addCotype("telemetry");
    relativeHumidityInfoV3.addCotypeVersion(3);

    const resistanceInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      resistanceTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    resistanceInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:ResistanceUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    resistanceInfoV2.addCotype("property");
    resistanceInfoV2.addCotype("telemetry");
    resistanceInfoV2.addCotypeVersion(2);

    const resistanceInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      resistanceTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    resistanceInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:ResistanceUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    resistanceInfoV3.addCotype("field");
    resistanceInfoV3.addCotype("property");
    resistanceInfoV3.addCotype("telemetry");
    resistanceInfoV3.addCotypeVersion(3);

    const resistanceUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      resistanceUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const resistanceUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      resistanceUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const soundPressureInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      soundPressureTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    soundPressureInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:SoundPressureUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    soundPressureInfoV2.addCotype("property");
    soundPressureInfoV2.addCotype("telemetry");
    soundPressureInfoV2.addCotypeVersion(2);

    const soundPressureInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      soundPressureTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    soundPressureInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:SoundPressureUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    soundPressureInfoV3.addCotype("field");
    soundPressureInfoV3.addCotype("property");
    soundPressureInfoV3.addCotype("telemetry");
    soundPressureInfoV3.addCotypeVersion(3);

    const soundPressureUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      soundPressureUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const soundPressureUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      soundPressureUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const temperatureInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      temperatureTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    temperatureInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:TemperatureUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    temperatureInfoV2.addCotype("property");
    temperatureInfoV2.addCotype("telemetry");
    temperatureInfoV2.addCotypeVersion(2);

    const temperatureInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      temperatureTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    temperatureInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:TemperatureUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    temperatureInfoV3.addCotype("field");
    temperatureInfoV3.addCotype("property");
    temperatureInfoV3.addCotype("telemetry");
    temperatureInfoV3.addCotypeVersion(3);

    const temperatureUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      temperatureUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const temperatureUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      temperatureUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const thrustInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      thrustTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    thrustInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:ForceUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    thrustInfoV2.addCotype("property");
    thrustInfoV2.addCotype("telemetry");
    thrustInfoV2.addCotypeVersion(2);

    const thrustInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      thrustTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    thrustInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:ForceUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    thrustInfoV3.addCotype("field");
    thrustInfoV3.addCotype("property");
    thrustInfoV3.addCotype("telemetry");
    thrustInfoV3.addCotypeVersion(3);

    const timeSpanInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      timeSpanTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    timeSpanInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:TimeUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    timeSpanInfoV2.addCotype("property");
    timeSpanInfoV2.addCotype("telemetry");
    timeSpanInfoV2.addCotypeVersion(2);

    const timeSpanInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      timeSpanTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    timeSpanInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:TimeUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    timeSpanInfoV3.addCotype("field");
    timeSpanInfoV3.addCotype("property");
    timeSpanInfoV3.addCotype("telemetry");
    timeSpanInfoV3.addCotypeVersion(3);

    const timeUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      timeUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const timeUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      timeUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const torqueInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      torqueTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    torqueInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:TorqueUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    torqueInfoV2.addCotype("property");
    torqueInfoV2.addCotype("telemetry");
    torqueInfoV2.addCotypeVersion(2);

    const torqueInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      torqueTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    torqueInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:TorqueUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    torqueInfoV3.addCotype("field");
    torqueInfoV3.addCotype("property");
    torqueInfoV3.addCotype("telemetry");
    torqueInfoV3.addCotypeVersion(3);

    const torqueUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      torqueUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const torqueUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      torqueUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const unitlessInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      unitlessTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const unitlessInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      unitlessTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const velocityInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      velocityTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    velocityInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:VelocityUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    velocityInfoV2.addCotype("property");
    velocityInfoV2.addCotype("telemetry");
    velocityInfoV2.addCotypeVersion(2);

    const velocityInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      velocityTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    velocityInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:VelocityUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    velocityInfoV3.addCotype("field");
    velocityInfoV3.addCotype("property");
    velocityInfoV3.addCotype("telemetry");
    velocityInfoV3.addCotypeVersion(3);

    const velocityUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      velocityUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const velocityUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      velocityUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const voltageInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      voltageTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    voltageInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:VoltageUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    voltageInfoV2.addCotype("property");
    voltageInfoV2.addCotype("telemetry");
    voltageInfoV2.addCotypeVersion(2);

    const voltageInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      voltageTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    voltageInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:VoltageUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    voltageInfoV3.addCotype("field");
    voltageInfoV3.addCotype("property");
    voltageInfoV3.addCotype("telemetry");
    voltageInfoV3.addCotypeVersion(3);

    const voltageUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      voltageUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const voltageUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      voltageUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const volumeInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      volumeTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    volumeInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:VolumeUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    volumeInfoV2.addCotype("property");
    volumeInfoV2.addCotype("telemetry");
    volumeInfoV2.addCotypeVersion(2);

    const volumeInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      volumeTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    volumeInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:VolumeUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    volumeInfoV3.addCotype("field");
    volumeInfoV3.addCotype("property");
    volumeInfoV3.addCotype("telemetry");
    volumeInfoV3.addCotypeVersion(3);

    const volumeFlowRateInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV2.value,
      volumeFlowRateTypeIdV2.value,
      false,
      quantitativeTypeTypeIdV2.value
    );
    volumeFlowRateInfoV2.addProperty(
      "dtmi:dtdl:property:unit;2",
      "dtmi:standard:class:VolumeFlowRateUnit;2",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    volumeFlowRateInfoV2.addCotype("property");
    volumeFlowRateInfoV2.addCotype("telemetry");
    volumeFlowRateInfoV2.addCotypeVersion(2);

    const volumeFlowRateInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.SEMANTICTYPE,
      dtdlContextIdV3.value,
      volumeFlowRateTypeIdV3.value,
      false,
      quantitativeTypeTypeIdV3.value
    );
    volumeFlowRateInfoV3.addProperty(
      "dtmi:dtdl:property:unit;3",
      "dtmi:standard:class:VolumeFlowRateUnit;3",
      false,
      false,
      1,
      1,
      undefined,
      undefined
    );
    volumeFlowRateInfoV3.addCotype("field");
    volumeFlowRateInfoV3.addCotype("property");
    volumeFlowRateInfoV3.addCotype("telemetry");
    volumeFlowRateInfoV3.addCotypeVersion(3);

    const volumeFlowRateUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      volumeFlowRateUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const volumeFlowRateUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      volumeFlowRateUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    const volumeUnitInfoV2 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV2.value,
      volumeUnitTypeIdV2.value,
      false,
      unitTypeIdV2.value
    );

    const volumeUnitInfoV3 = new SupplementalTypeInfoImpl(
      ExtensionKind.UNIT,
      dtdlContextIdV3.value,
      volumeUnitTypeIdV3.value,
      false,
      unitTypeIdV3.value
    );

    this.supplementalTypes.set(adjunctTypeTypeIdV3.value, adjunctTypeInfoV3);
    this.supplementalTypes.set(semanticTypeTypeIdV2.value, semanticTypeInfoV2);
    this.supplementalTypes.set(semanticTypeTypeIdV3.value, semanticTypeInfoV3);
    this.supplementalTypes.set(semanticUnitTypeIdV2.value, semanticUnitInfoV2);
    this.supplementalTypes.set(semanticUnitTypeIdV3.value, semanticUnitInfoV3);
    this.supplementalTypes.set(historizedTypeIdv1.value, historizedInfov1);
    this.supplementalTypes.set(historizedTypeIdv2.value, historizedInfov2);
    this.supplementalTypes.set(initializedTypeIdv1.value, initializedInfov1);
    this.supplementalTypes.set(layerTypeIdv1.value, layerInfov1);
    this.supplementalTypes.set(accelerationVectorTypeIdV2.value, accelerationVectorInfoV2);
    this.supplementalTypes.set(accelerationVectorTypeIdV3.value, accelerationVectorInfoV3);
    this.supplementalTypes.set(eventTypeIdV2.value, eventInfoV2);
    this.supplementalTypes.set(eventTypeIdV3.value, eventInfoV3);
    this.supplementalTypes.set(locationTypeIdV2.value, locationInfoV2);
    this.supplementalTypes.set(locationTypeIdV3.value, locationInfoV3);
    this.supplementalTypes.set(stateTypeIdV2.value, stateInfoV2);
    this.supplementalTypes.set(stateTypeIdV3.value, stateInfoV3);
    this.supplementalTypes.set(velocityVectorTypeIdV2.value, velocityVectorInfoV2);
    this.supplementalTypes.set(velocityVectorTypeIdV3.value, velocityVectorInfoV3);
    this.supplementalTypes.set(accelerationTypeIdV2.value, accelerationInfoV2);
    this.supplementalTypes.set(accelerationTypeIdV3.value, accelerationInfoV3);
    this.supplementalTypes.set(accelerationUnitTypeIdV2.value, accelerationUnitInfoV2);
    this.supplementalTypes.set(accelerationUnitTypeIdV3.value, accelerationUnitInfoV3);
    this.supplementalTypes.set(angleTypeIdV2.value, angleInfoV2);
    this.supplementalTypes.set(angleTypeIdV3.value, angleInfoV3);
    this.supplementalTypes.set(angleUnitTypeIdV2.value, angleUnitInfoV2);
    this.supplementalTypes.set(angleUnitTypeIdV3.value, angleUnitInfoV3);
    this.supplementalTypes.set(angularAccelerationTypeIdV2.value, angularAccelerationInfoV2);
    this.supplementalTypes.set(angularAccelerationTypeIdV3.value, angularAccelerationInfoV3);
    this.supplementalTypes.set(
      angularAccelerationUnitTypeIdV2.value,
      angularAccelerationUnitInfoV2
    );
    this.supplementalTypes.set(
      angularAccelerationUnitTypeIdV3.value,
      angularAccelerationUnitInfoV3
    );
    this.supplementalTypes.set(angularVelocityTypeIdV2.value, angularVelocityInfoV2);
    this.supplementalTypes.set(angularVelocityTypeIdV3.value, angularVelocityInfoV3);
    this.supplementalTypes.set(angularVelocityUnitTypeIdV2.value, angularVelocityUnitInfoV2);
    this.supplementalTypes.set(angularVelocityUnitTypeIdV3.value, angularVelocityUnitInfoV3);
    this.supplementalTypes.set(areaTypeIdV2.value, areaInfoV2);
    this.supplementalTypes.set(areaTypeIdV3.value, areaInfoV3);
    this.supplementalTypes.set(areaUnitTypeIdV2.value, areaUnitInfoV2);
    this.supplementalTypes.set(areaUnitTypeIdV3.value, areaUnitInfoV3);
    this.supplementalTypes.set(binaryPrefixTypeIdV2.value, binaryPrefixInfoV2);
    this.supplementalTypes.set(binaryPrefixTypeIdV3.value, binaryPrefixInfoV3);
    this.supplementalTypes.set(binaryUnitTypeIdV2.value, binaryUnitInfoV2);
    this.supplementalTypes.set(binaryUnitTypeIdV3.value, binaryUnitInfoV3);
    this.supplementalTypes.set(capacitanceTypeIdV2.value, capacitanceInfoV2);
    this.supplementalTypes.set(capacitanceTypeIdV3.value, capacitanceInfoV3);
    this.supplementalTypes.set(capacitanceUnitTypeIdV2.value, capacitanceUnitInfoV2);
    this.supplementalTypes.set(capacitanceUnitTypeIdV3.value, capacitanceUnitInfoV3);
    this.supplementalTypes.set(chargeUnitTypeIdV2.value, chargeUnitInfoV2);
    this.supplementalTypes.set(chargeUnitTypeIdV3.value, chargeUnitInfoV3);
    this.supplementalTypes.set(currentTypeIdV2.value, currentInfoV2);
    this.supplementalTypes.set(currentTypeIdV3.value, currentInfoV3);
    this.supplementalTypes.set(currentUnitTypeIdV2.value, currentUnitInfoV2);
    this.supplementalTypes.set(currentUnitTypeIdV3.value, currentUnitInfoV3);
    this.supplementalTypes.set(dataRateTypeIdV2.value, dataRateInfoV2);
    this.supplementalTypes.set(dataRateTypeIdV3.value, dataRateInfoV3);
    this.supplementalTypes.set(dataRateUnitTypeIdV2.value, dataRateUnitInfoV2);
    this.supplementalTypes.set(dataRateUnitTypeIdV3.value, dataRateUnitInfoV3);
    this.supplementalTypes.set(dataSizeTypeIdV2.value, dataSizeInfoV2);
    this.supplementalTypes.set(dataSizeTypeIdV3.value, dataSizeInfoV3);
    this.supplementalTypes.set(dataSizeUnitTypeIdV2.value, dataSizeUnitInfoV2);
    this.supplementalTypes.set(dataSizeUnitTypeIdV3.value, dataSizeUnitInfoV3);
    this.supplementalTypes.set(decimalPrefixTypeIdV2.value, decimalPrefixInfoV2);
    this.supplementalTypes.set(decimalPrefixTypeIdV3.value, decimalPrefixInfoV3);
    this.supplementalTypes.set(decimalUnitTypeIdV2.value, decimalUnitInfoV2);
    this.supplementalTypes.set(decimalUnitTypeIdV3.value, decimalUnitInfoV3);
    this.supplementalTypes.set(densityTypeIdV2.value, densityInfoV2);
    this.supplementalTypes.set(densityTypeIdV3.value, densityInfoV3);
    this.supplementalTypes.set(densityUnitTypeIdV2.value, densityUnitInfoV2);
    this.supplementalTypes.set(densityUnitTypeIdV3.value, densityUnitInfoV3);
    this.supplementalTypes.set(distanceTypeIdV2.value, distanceInfoV2);
    this.supplementalTypes.set(distanceTypeIdV3.value, distanceInfoV3);
    this.supplementalTypes.set(electricChargeTypeIdV2.value, electricChargeInfoV2);
    this.supplementalTypes.set(electricChargeTypeIdV3.value, electricChargeInfoV3);
    this.supplementalTypes.set(energyTypeIdV2.value, energyInfoV2);
    this.supplementalTypes.set(energyTypeIdV3.value, energyInfoV3);
    this.supplementalTypes.set(energyUnitTypeIdV2.value, energyUnitInfoV2);
    this.supplementalTypes.set(energyUnitTypeIdV3.value, energyUnitInfoV3);
    this.supplementalTypes.set(forceTypeIdV2.value, forceInfoV2);
    this.supplementalTypes.set(forceTypeIdV3.value, forceInfoV3);
    this.supplementalTypes.set(forceUnitTypeIdV2.value, forceUnitInfoV2);
    this.supplementalTypes.set(forceUnitTypeIdV3.value, forceUnitInfoV3);
    this.supplementalTypes.set(frequencyTypeIdV2.value, frequencyInfoV2);
    this.supplementalTypes.set(frequencyTypeIdV3.value, frequencyInfoV3);
    this.supplementalTypes.set(frequencyUnitTypeIdV2.value, frequencyUnitInfoV2);
    this.supplementalTypes.set(frequencyUnitTypeIdV3.value, frequencyUnitInfoV3);
    this.supplementalTypes.set(humidityTypeIdV2.value, humidityInfoV2);
    this.supplementalTypes.set(humidityTypeIdV3.value, humidityInfoV3);
    this.supplementalTypes.set(illuminanceTypeIdV2.value, illuminanceInfoV2);
    this.supplementalTypes.set(illuminanceTypeIdV3.value, illuminanceInfoV3);
    this.supplementalTypes.set(illuminanceUnitTypeIdV2.value, illuminanceUnitInfoV2);
    this.supplementalTypes.set(illuminanceUnitTypeIdV3.value, illuminanceUnitInfoV3);
    this.supplementalTypes.set(inductanceTypeIdV2.value, inductanceInfoV2);
    this.supplementalTypes.set(inductanceTypeIdV3.value, inductanceInfoV3);
    this.supplementalTypes.set(inductanceUnitTypeIdV2.value, inductanceUnitInfoV2);
    this.supplementalTypes.set(inductanceUnitTypeIdV3.value, inductanceUnitInfoV3);
    this.supplementalTypes.set(latitudeTypeIdV2.value, latitudeInfoV2);
    this.supplementalTypes.set(latitudeTypeIdV3.value, latitudeInfoV3);
    this.supplementalTypes.set(lengthTypeIdV2.value, lengthInfoV2);
    this.supplementalTypes.set(lengthTypeIdV3.value, lengthInfoV3);
    this.supplementalTypes.set(lengthUnitTypeIdV2.value, lengthUnitInfoV2);
    this.supplementalTypes.set(lengthUnitTypeIdV3.value, lengthUnitInfoV3);
    this.supplementalTypes.set(longitudeTypeIdV2.value, longitudeInfoV2);
    this.supplementalTypes.set(longitudeTypeIdV3.value, longitudeInfoV3);
    this.supplementalTypes.set(luminanceTypeIdV2.value, luminanceInfoV2);
    this.supplementalTypes.set(luminanceTypeIdV3.value, luminanceInfoV3);
    this.supplementalTypes.set(luminanceUnitTypeIdV2.value, luminanceUnitInfoV2);
    this.supplementalTypes.set(luminanceUnitTypeIdV3.value, luminanceUnitInfoV3);
    this.supplementalTypes.set(luminosityTypeIdV2.value, luminosityInfoV2);
    this.supplementalTypes.set(luminosityTypeIdV3.value, luminosityInfoV3);
    this.supplementalTypes.set(luminousFluxTypeIdV2.value, luminousFluxInfoV2);
    this.supplementalTypes.set(luminousFluxTypeIdV3.value, luminousFluxInfoV3);
    this.supplementalTypes.set(luminousFluxUnitTypeIdV2.value, luminousFluxUnitInfoV2);
    this.supplementalTypes.set(luminousFluxUnitTypeIdV3.value, luminousFluxUnitInfoV3);
    this.supplementalTypes.set(luminousIntensityTypeIdV2.value, luminousIntensityInfoV2);
    this.supplementalTypes.set(luminousIntensityTypeIdV3.value, luminousIntensityInfoV3);
    this.supplementalTypes.set(luminousIntensityUnitTypeIdV2.value, luminousIntensityUnitInfoV2);
    this.supplementalTypes.set(luminousIntensityUnitTypeIdV3.value, luminousIntensityUnitInfoV3);
    this.supplementalTypes.set(magneticFluxTypeIdV2.value, magneticFluxInfoV2);
    this.supplementalTypes.set(magneticFluxTypeIdV3.value, magneticFluxInfoV3);
    this.supplementalTypes.set(magneticFluxUnitTypeIdV2.value, magneticFluxUnitInfoV2);
    this.supplementalTypes.set(magneticFluxUnitTypeIdV3.value, magneticFluxUnitInfoV3);
    this.supplementalTypes.set(magneticInductionTypeIdV2.value, magneticInductionInfoV2);
    this.supplementalTypes.set(magneticInductionTypeIdV3.value, magneticInductionInfoV3);
    this.supplementalTypes.set(magneticInductionUnitTypeIdV2.value, magneticInductionUnitInfoV2);
    this.supplementalTypes.set(magneticInductionUnitTypeIdV3.value, magneticInductionUnitInfoV3);
    this.supplementalTypes.set(massTypeIdV2.value, massInfoV2);
    this.supplementalTypes.set(massTypeIdV3.value, massInfoV3);
    this.supplementalTypes.set(massFlowRateTypeIdV2.value, massFlowRateInfoV2);
    this.supplementalTypes.set(massFlowRateTypeIdV3.value, massFlowRateInfoV3);
    this.supplementalTypes.set(massFlowRateUnitTypeIdV2.value, massFlowRateUnitInfoV2);
    this.supplementalTypes.set(massFlowRateUnitTypeIdV3.value, massFlowRateUnitInfoV3);
    this.supplementalTypes.set(massUnitTypeIdV2.value, massUnitInfoV2);
    this.supplementalTypes.set(massUnitTypeIdV3.value, massUnitInfoV3);
    this.supplementalTypes.set(powerTypeIdV2.value, powerInfoV2);
    this.supplementalTypes.set(powerTypeIdV3.value, powerInfoV3);
    this.supplementalTypes.set(powerUnitTypeIdV2.value, powerUnitInfoV2);
    this.supplementalTypes.set(powerUnitTypeIdV3.value, powerUnitInfoV3);
    this.supplementalTypes.set(pressureTypeIdV2.value, pressureInfoV2);
    this.supplementalTypes.set(pressureTypeIdV3.value, pressureInfoV3);
    this.supplementalTypes.set(pressureUnitTypeIdV2.value, pressureUnitInfoV2);
    this.supplementalTypes.set(pressureUnitTypeIdV3.value, pressureUnitInfoV3);
    this.supplementalTypes.set(quantitativeTypeTypeIdV2.value, quantitativeTypeInfoV2);
    this.supplementalTypes.set(quantitativeTypeTypeIdV3.value, quantitativeTypeInfoV3);
    this.supplementalTypes.set(ratioUnitTypeIdV2.value, ratioUnitInfoV2);
    this.supplementalTypes.set(ratioUnitTypeIdV3.value, ratioUnitInfoV3);
    this.supplementalTypes.set(relativeHumidityTypeIdV2.value, relativeHumidityInfoV2);
    this.supplementalTypes.set(relativeHumidityTypeIdV3.value, relativeHumidityInfoV3);
    this.supplementalTypes.set(resistanceTypeIdV2.value, resistanceInfoV2);
    this.supplementalTypes.set(resistanceTypeIdV3.value, resistanceInfoV3);
    this.supplementalTypes.set(resistanceUnitTypeIdV2.value, resistanceUnitInfoV2);
    this.supplementalTypes.set(resistanceUnitTypeIdV3.value, resistanceUnitInfoV3);
    this.supplementalTypes.set(soundPressureTypeIdV2.value, soundPressureInfoV2);
    this.supplementalTypes.set(soundPressureTypeIdV3.value, soundPressureInfoV3);
    this.supplementalTypes.set(soundPressureUnitTypeIdV2.value, soundPressureUnitInfoV2);
    this.supplementalTypes.set(soundPressureUnitTypeIdV3.value, soundPressureUnitInfoV3);
    this.supplementalTypes.set(temperatureTypeIdV2.value, temperatureInfoV2);
    this.supplementalTypes.set(temperatureTypeIdV3.value, temperatureInfoV3);
    this.supplementalTypes.set(temperatureUnitTypeIdV2.value, temperatureUnitInfoV2);
    this.supplementalTypes.set(temperatureUnitTypeIdV3.value, temperatureUnitInfoV3);
    this.supplementalTypes.set(thrustTypeIdV2.value, thrustInfoV2);
    this.supplementalTypes.set(thrustTypeIdV3.value, thrustInfoV3);
    this.supplementalTypes.set(timeSpanTypeIdV2.value, timeSpanInfoV2);
    this.supplementalTypes.set(timeSpanTypeIdV3.value, timeSpanInfoV3);
    this.supplementalTypes.set(timeUnitTypeIdV2.value, timeUnitInfoV2);
    this.supplementalTypes.set(timeUnitTypeIdV3.value, timeUnitInfoV3);
    this.supplementalTypes.set(torqueTypeIdV2.value, torqueInfoV2);
    this.supplementalTypes.set(torqueTypeIdV3.value, torqueInfoV3);
    this.supplementalTypes.set(torqueUnitTypeIdV2.value, torqueUnitInfoV2);
    this.supplementalTypes.set(torqueUnitTypeIdV3.value, torqueUnitInfoV3);
    this.supplementalTypes.set(unitlessTypeIdV2.value, unitlessInfoV2);
    this.supplementalTypes.set(unitlessTypeIdV3.value, unitlessInfoV3);
    this.supplementalTypes.set(velocityTypeIdV2.value, velocityInfoV2);
    this.supplementalTypes.set(velocityTypeIdV3.value, velocityInfoV3);
    this.supplementalTypes.set(velocityUnitTypeIdV2.value, velocityUnitInfoV2);
    this.supplementalTypes.set(velocityUnitTypeIdV3.value, velocityUnitInfoV3);
    this.supplementalTypes.set(voltageTypeIdV2.value, voltageInfoV2);
    this.supplementalTypes.set(voltageTypeIdV3.value, voltageInfoV3);
    this.supplementalTypes.set(voltageUnitTypeIdV2.value, voltageUnitInfoV2);
    this.supplementalTypes.set(voltageUnitTypeIdV3.value, voltageUnitInfoV3);
    this.supplementalTypes.set(volumeTypeIdV2.value, volumeInfoV2);
    this.supplementalTypes.set(volumeTypeIdV3.value, volumeInfoV3);
    this.supplementalTypes.set(volumeFlowRateTypeIdV2.value, volumeFlowRateInfoV2);
    this.supplementalTypes.set(volumeFlowRateTypeIdV3.value, volumeFlowRateInfoV3);
    this.supplementalTypes.set(volumeFlowRateUnitTypeIdV2.value, volumeFlowRateUnitInfoV2);
    this.supplementalTypes.set(volumeFlowRateUnitTypeIdV3.value, volumeFlowRateUnitInfoV3);
    this.supplementalTypes.set(volumeUnitTypeIdV2.value, volumeUnitInfoV2);
    this.supplementalTypes.set(volumeUnitTypeIdV3.value, volumeUnitInfoV3);

    this.connectPropertySetters();
  }

  // codegen-outline-begin methods
  connectPropertySetters(): void {
    this.supplementalTypes.forEach((value) => {
      if (value.parentType !== undefined && this.supplementalTypes.get(value.parentType)) {
        value.parentSupplementalType = this.supplementalTypes.get(value.parentType);
      }
    });
  }
  // codegen-outline-end
}
