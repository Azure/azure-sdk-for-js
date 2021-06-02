// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import { Serializer, Mapper } from "@azure/core-http";

/**
 * The TypeDeserializer class enables easy access to the Attestation Model serialization
 * and deserialization APIs.
 */
export class TypeDeserializer {

  /**
   * Deserializes a JSON object into a model type.
   * @param rawJson - The JSON encoded object to convert into model type.
   * @param bodyMapper - A mapping between type names and {@link Mapper} objects 
   *  which defines the model properties for the type. the {@link bodyTypeName} 
   *  must be one of the properties in the {@link bodyMapper} parameter.
   * @param bodyTypeName - The name of the type of the body.
   * @returns The deserialized type. It is the responsibility of the caller to cast to the
   *      expected return type.
   * 
   * @internal
   */
  public static deserialize(rawJson: any, typeMappers: { [key: string]: any}, bodyTypeName: string) : unknown {
    const serializer = new Serializer( typeMappers );
    return serializer.deserialize(
      typeMappers[bodyTypeName],
      rawJson,
      bodyTypeName
      );
  };

  /**
   * Serializes a JSON object into a model type.
    * @param objectToSerialize - The JSON encoded object to convert into model type.
    * @param bodyMapper - A {@link Mapper} object which defines the model properties for the type.
    * @returns The serialized type as a JSON encoded string.
    * 
    * @internal
    */
  public static serialize(objectToSerialize: any, bodyMapper: Mapper) : string {
    const serializer = new Serializer({ bodyMapper });
      return JSON.stringify(serializer.serialize(
        bodyMapper,
        objectToSerialize));
  };
}
