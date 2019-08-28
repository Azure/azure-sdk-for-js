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
import { AtomHandler } from "./util/atomHandler";
import { each, isUndefined, isArray } from "./util/utils";

const atomHandler = new AtomHandler();

export class AtomResourceSerializerBase {
  static setName(entry: any, nameProperty: any): any {
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

  static _serialize(resourceName: any, resource: any, properties: any): any {
    var content: any = {};
    content[resourceName] = {
      $: {
        xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"
      }
    };

    if (resource) {
      // Sort properties according to what is allowed by the service
      each(properties, function(property: any): any {
        if (!isUndefined(resource[property])) {
          content[resourceName][property] = resource[property];
        }
      });
    }

    return atomHandler.serializeEntry(content);
  }

  static _parse(nameProperty: any, xml: any): any {
    var result = atomHandler.parse(xml);

    if (!result) {
      return undefined;
    }
    if (isArray(result)) {
      each(result, function(entry: any): any {
        AtomResourceSerializerBase.setName(entry, nameProperty);
      });
    } else {
      AtomResourceSerializerBase.setName(result, nameProperty);
    }
    return result;
  }
}
