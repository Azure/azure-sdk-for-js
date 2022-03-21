// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsClass, TsScope } from "../../codeGenerator";
import { MaterialProperty } from "./materialProperty";

export interface DescendantControl {
  /**
   * Indicates whether this control applies to the given typeName
   * @param typeName - The name of the type to check.
   */
  appliesToType(typeName: string): boolean;

  /**
   * Generate appropriate members for the material class that has this control.
   * @param obverseClass - A object to which to add the members.
   * @param typeName - The type name (DTDL term) corresponding to the material class.
   * @param classIsBase - True if the material class is the DTDL base class.
   * @param classIsAbstract - True if the material class is abstract.
   * @param materialProperties - A list of the MaterialProperty objects associated with the material class.
   */
  addMembers(
    obverseClass: TsClass,
    typeName: string,
    classIsBase: boolean,
    classIsAbstract: boolean,
    materialProperties: MaterialProperty[]
  ): void;

  /**
   * Add code to the CheckRestrictions method in the material class that has this control.
   * @param checkRestrictionsMethodBody - A CsScope object to which to add the code.
   * @param dtdlVersion - The version of DTDL whose restriction should be added.
   * @param typeName - The type name (DTDL term) corresponding to the material class.
   */
  addRestriction(checkRestrictionsMethodBody: TsScope, dtdlVersion: number, typeName: string): void;

  /**
   * Add code to the ApplyTransformations method in the material class that has this control.
   * @param applyTransformationsMethodBody - A CsScope object to which to add the code.
   * @param dtdlVersion - The version of DTDL whose transformation should be added.
   * @param typeName - The type name (DTDL term) corresponding to the material class.
   * @param materialProperties - A list of the MaterialProperty objects associated with the material class.
   */
  addTransformation(
    applyTransformationsMethodBody: TsScope,
    dtdlVersion: number,
    typeName: string,
    materialProperties: MaterialProperty[]
  ): void;

  // ALL EXEMPLIFICATION CODE IS UNNECESSARY. TODO: EVENTUALLY REMOVE THIS.
  /**
   * Add code to the ExemplifyClass method in the material class that has this control.
   * @param exemplifyClassMethodBody - A CsScope object to which to add the code.
   * @param typeName - The type name (DTDL term) corresponding to the material class.
   * @param descendantRestrictionsVar - Name of the variable that holds a list of DescendantRestriction ohjects.
   */
  // addExemplificationPrelude(exemplifyClassMethodBody: TsScope, typeName: string, descendantRestrictionsVar: string): void;

  /**
   * Add code to the ExemplifyClass method in the material class that has this control.
   * @param exemplifyClassMethodBody - A CsScope object to which to add the code.
   * @param typeName - The type name (DTDL term) corresponding to the material class.
   * @param infoVar - Name of the variable that holds the element info.
   * @param valueExemplifierVar - Name of the variable that holds a ValueExemplifier object for exemplifying literal values.
   */
  // addExemplification(exemplifyClassMethodBody: TsScope, typeName: string, infoVar: string, valueExemplifierVar: string): void;
}
