//
// Copyright (c) Microsoft and contributors.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import { isNode } from "./util/utils";
import { Constants } from "./util/constants";
import { serializeJsonToAtomXml } from "./util/xml";
import { parseResultFromAtomResponse } from "./util/atomHandler";

export class AtomResourceSerializerBase {
  static serializeToAtomXmlRequest(resourceName: any, resource: any, properties: any): any {
    var content: any = {};
    content[resourceName] = {
      $: {
        xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"
      }
    };

    if (resource) {
      // Sort properties according to what is allowed by the service
      properties.forEach((property: any) => {
        if (resource[property] !== undefined) {
          content[resourceName][property] = resource[property];
        }
      });
    }

    return serializeJsonToAtomXml(content);
  }

  static deserializeAtomResponse(nameProperty: any, atomResponseInJson: any): any {
    var result = parseResultFromAtomResponse(atomResponseInJson);

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
    let parsedUrl: any;
    if (isNode) {
      parsedUrl = new URL(entry[Constants.ATOM_METADATA_MARKER].id);
    } else {
      parsedUrl = new window.URL(entry[Constants.ATOM_METADATA_MARKER].id);
    }
    var parts = parsedUrl.pathname!.split("/");

    for (var i = 0; i * 2 < parts.length - 1; i++) {
      entry[nameProperty[i]] = parts[i * 2 + 1];
    }
  }
}
