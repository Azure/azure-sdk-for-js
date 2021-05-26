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

    public static deserialize<T>(rawJson: any, bodyMapper: Mapper, bodyTypeName: string) : T {
        const serializer = new Serializer({ bodyMapper });
        return serializer.deserialize(
            bodyMapper,
            rawJson,
            bodyTypeName
          );
    };
}