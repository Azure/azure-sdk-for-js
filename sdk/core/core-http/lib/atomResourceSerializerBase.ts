// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "./util/constants";
import { serializeJsonToAtomXml } from "./util/xml";
import {
  parseResultFromAtomResponse,
  XMLRequestInJSON,
  XMLResponseInJSON
} from "./util/atomHandler";

export class AtomResourceSerializerBase {
  static serializeToAtomXmlRequest(
    resourceName: string,
    resource: any,
    properties: string[],
    xmlNamespace: string
  ): string {
    const content: XMLRequestInJSON = {};
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

  /**
   * Deserializes the JSON representation of Atom response to construct
   * the final `result` to return
   *
   * @param nameProperties The set of 'name' properties to be constructed on the resultant object e.g., QueueName, TopicName, etc.
   * @param atomResponseInJson
   */
  static deserializeAtomResponse(
    nameProperties: string[],
    atomResponseInJson: any
  ): XMLResponseInJSON[] | XMLResponseInJSON | undefined {
    const result = parseResultFromAtomResponse(atomResponseInJson);

    if (!result) {
      return undefined;
    }
    if (Array.isArray(result)) {
      result.forEach((entry: XMLResponseInJSON) => {
        AtomResourceSerializerBase.setName(entry, nameProperties);
      });
    } else {
      AtomResourceSerializerBase.setName(result, nameProperties);
    }
    return result;
  }

  /**
   * Extracts the applicable entity name(s) from the URL based on the known structure
   * and instantiates the corresponding name properties to the deserialized response
   *
   * For instance, following is the URL structure for when creating a rule
   * `<namespace-component>/<topic-name>/Subscriptions/<subscription-name>/Rules/<rule-name>`
   *
   * @param entry
   * @param nameProperties
   */
  private static setName(entry: XMLResponseInJSON, nameProperties: any): any {
    if (entry[Constants.ATOM_METADATA_MARKER]) {
      const parsedUrl = new URL(entry[Constants.ATOM_METADATA_MARKER].id);

      const parts = parsedUrl.pathname!.split("/");

      for (let i = 0; i * 2 < parts.length - 1; i++) {
        entry[nameProperties[i]] = parts[i * 2 + 1];
      }
    }
  }
}
