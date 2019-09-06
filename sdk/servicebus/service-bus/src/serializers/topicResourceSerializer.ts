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

import { AtomResourceSerializerBase, ResourceSerializer } from "@azure/core-http";
import { ServiceBusAtomXmlConstants } from "../util/constants";

export class TopicResourceSerializer implements ResourceSerializer {
  serialize(resource: any): any {
    const properties = [
      ServiceBusAtomXmlConstants.DEFAULT_MESSAGE_TIME_TO_LIVE,
      ServiceBusAtomXmlConstants.MAX_SIZE_IN_MEGABYTES,
      ServiceBusAtomXmlConstants.REQUIRES_DUPLICATE_DETECTION,
      ServiceBusAtomXmlConstants.DEFAULT_MESSAGE_TIME_TO_LIVE,
      ServiceBusAtomXmlConstants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW,
      ServiceBusAtomXmlConstants.ENABLE_BATCHED_OPERATIONS,
      ServiceBusAtomXmlConstants.STATUS,
      ServiceBusAtomXmlConstants.USER_METADATA,
      ServiceBusAtomXmlConstants.AUTO_DELETE_ON_IDLE,
      ServiceBusAtomXmlConstants.SIZE_IN_BYTES,
      ServiceBusAtomXmlConstants.SUPPORT_ORDERING,
      ServiceBusAtomXmlConstants.ENABLE_PARTITIONING,
      ServiceBusAtomXmlConstants.SIZE_IN_BYTES,
      ServiceBusAtomXmlConstants.MESSAGE_COUNT,
      ServiceBusAtomXmlConstants.COUNT_DETAILS,
      ServiceBusAtomXmlConstants.SUBSCRIPTION_COUNT
    ];

    return AtomResourceSerializerBase.serializeToAtomXmlRequest(
      "TopicDescription",
      resource,
      properties,
      ServiceBusAtomXmlConstants.XML_NAMESPACE
    );
  }

  parse(atomResponseInJson: any): any {
    return AtomResourceSerializerBase.deserializeAtomResponse(["TopicName"], atomResponseInJson);
  }
}
