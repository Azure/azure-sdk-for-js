// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CompositeMapper } from "@azure/core-client";

export const CloudEventMapper: CompositeMapper = {
  type: {
    name: "Composite",
    className: "CloudEvent",
    additionalProperties: { type: { name: "Object" } },
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String",
        },
      },
      source: {
        serializedName: "source",
        required: true,
        type: {
          name: "String",
        },
      },
      data: {
        serializedName: "data",
        type: {
          name: "any",
        },
      },
      dataBase64: {
        serializedName: "data_base64",
        type: {
          name: "ByteArray",
        },
      },
      type: {
        serializedName: "type",
        required: true,
        type: {
          name: "String",
        },
      },
      time: {
        serializedName: "time",
        type: {
          name: "DateTime",
        },
      },
      specversion: {
        serializedName: "specversion",
        required: true,
        type: {
          name: "String",
        },
      },
      dataschema: {
        serializedName: "dataschema",
        type: {
          name: "String",
        },
      },
      datacontenttype: {
        serializedName: "datacontenttype",
        type: {
          name: "String",
        },
      },
      subject: {
        serializedName: "subject",
        type: {
          name: "String",
        },
      },
    },
  },
};
