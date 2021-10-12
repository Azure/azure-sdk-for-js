// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CompositeMapper } from "@azure/core-http";

export const ContentDownloadHeaders: CompositeMapper = {
    serializedName: "Content_downloadHeaders",
    type: {
      name: "Composite",
      className: "ContentDownloadHeaders",
      modelProperties: {
        contentLength: {
          serializedName: "content-length",
          xmlName: "content-length",
          type: {
            name: "Number"
          }
        },
        contentType: {
          serializedName: "content-type",
          xmlName: "content-type",
          type: {
            name: "String"
          }
        },
        contentRange: {
          serializedName: "content-range",
          xmlName: "content-range",
          type: {
            name: "String"
          }
        },
        date: {
          serializedName: "date",
          xmlName: "date",
          type: {
            name: "DateTimeRfc1123"
          }
        },
        errorCode: {
          serializedName: "x-ms-error-code",
          xmlName: "x-ms-error-code",
          type: {
            name: "String"
          }
        }
      }
    }
  };
