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

export class QueueResourceSerializer implements ResourceSerializer {
  serialize(resource: any): any {
    var properties = [
      ServiceBusAtomXmlConstants.LOCK_DURATION,
      ServiceBusAtomXmlConstants.MAX_SIZE_IN_MEGABYTES,
      ServiceBusAtomXmlConstants.REQUIRES_DUPLICATE_DETECTION,
      ServiceBusAtomXmlConstants.REQUIRES_SESSION,
      ServiceBusAtomXmlConstants.DEFAULT_MESSAGE_TIME_TO_LIVE,
      ServiceBusAtomXmlConstants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION,
      ServiceBusAtomXmlConstants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW,
      ServiceBusAtomXmlConstants.MAX_DELIVERY_COUNT,
      ServiceBusAtomXmlConstants.ENABLE_BATCHED_OPERATIONS,
      ServiceBusAtomXmlConstants.STATUS,
      ServiceBusAtomXmlConstants.FORWARD_TO,
      ServiceBusAtomXmlConstants.USER_METADATA,
      ServiceBusAtomXmlConstants.AUTO_DELETE_ON_IDLE,
      ServiceBusAtomXmlConstants.SIZE_IN_BYTES,
      ServiceBusAtomXmlConstants.MESSAGE_COUNT,
      ServiceBusAtomXmlConstants.ENABLE_PARTITIONING,
      ServiceBusAtomXmlConstants.FORWARD_DEADLETTERED_MESSAGES_TO
    ];

    return AtomResourceSerializerBase.serializeToAtomXmlRequest(
      "QueueDescription",
      resource,
      properties,
      ServiceBusAtomXmlConstants.XML_NAMESPACE
    );
  }

  parse(atomResponseInJson: any): any {
    return AtomResourceSerializerBase.deserializeAtomResponse(["QueueName"], atomResponseInJson);
  }
}
