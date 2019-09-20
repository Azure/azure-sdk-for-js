/**
 * Copyright 2019, OpenCensus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** TagKey represents a tag key */
export interface TagKey {
  /** The name of the key. */
  readonly name: string;
}

/** TagValue represents a tag value */
export interface TagValue {
  /** The value of a tag. */
  readonly value: string;
}

/** TagValueWithMetadata holds a TagValue and a TagMetadata. */
export interface TagValueWithMetadata {
  /** The tag value */
  readonly tagValue: TagValue;
  /** The metadata for the tag */
  readonly tagMetadata: TagMetadata;
}

/**
 * TagMetadata contains properties associated with a Tag.
 * Anytime a sender serializes a tag, sends it over the wire and receiver
 * deserializes the tag then the tag is considered to have travelled one hop.
 * There could be one or more proxy(ies) between sender and receiver. Proxies
 * are treated as transparent entities and they do not create additional hops.
 */
export interface TagMetadata {
  /**
   * For now, only special values of TagTtl are supported. In future,
   * additional properties may be added to address specific situations.
   */
  readonly tagTtl: number;
}

/** TagTtl is an integer that represents number of hops a tag can propagate */
export enum TagTtl {
  /**
   * NO_PROPAGATION is considered to have local scope and is used within the
   * process it created.
   */
  NO_PROPAGATION = 0,

  /** UNLIMITED_PROPAGATION can propagate unlimited hops. */
  UNLIMITED_PROPAGATION = -1,
}
