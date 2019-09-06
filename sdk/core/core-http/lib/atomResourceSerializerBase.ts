// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "./util/constants";
import { serializeJsonToAtomXml } from "./util/xml";
import { parseResultFromAtomResponse } from "./util/atomHandler";

export class AtomResourceSerializerBase {
  static serializeToAtomXmlRequest(
    resourceName: string,
    resource: any,
    properties: string[],
    xmlNamespace: string
  ): string {
    const content: any = {};
    content[resourceName] = {
      $: {
        xmlns: xmlNamespace
      }
    };

    if (resource) {
      // Sort properties according to what is allowed by the service
      properties.forEach((property: string) => {
        if (resource[property] !== undefined) {
          content[resourceName][property] = resource[property];
        }
      });
    }

    return serializeJsonToAtomXml(content);
  }

  static deserializeAtomResponse(nameProperty: string[], atomResponseInJson: any): any {
    const result = parseResultFromAtomResponse(atomResponseInJson);

    if (!result) {
      return undefined;
    }
    if (Array.isArray(result)) {
      result.forEach((entry: any) => {
        AtomResourceSerializerBase.setName(entry, nameProperty);
      });
    } else {
      AtomResourceSerializerBase.setName(result, nameProperty);
    }
    return result;
  }

  private static setName(entry: any, nameProperty: any): any {
    const parsedUrl = new URL(entry[Constants.ATOM_METADATA_MARKER].id);

    const parts = parsedUrl.pathname!.split("/");

    for (let i = 0; i * 2 < parts.length - 1; i++) {
      entry[nameProperty[i]] = parts[i * 2 + 1];
    }
  }
}
