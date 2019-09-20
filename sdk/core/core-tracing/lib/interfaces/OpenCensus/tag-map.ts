/**
 * Copyright 2018, OpenCensus Authors
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

import { TagKey, TagValue, TagMetadata, TagValueWithMetadata } from "./tags";

export interface TagMap {
  /**
   * Adds the key/value pair regardless of whether the key is present.
   * @param tagKey The TagKey which will be set.
   * @param tagValue The TagValue to set for the given key.
   * @param tagMetadata The TagMetadata associated with this Tag.
   */
  set(tagKey: TagKey, tagValue: TagValue, tagMetadata?: TagMetadata): void;
  /**
   * Deletes a tag from the map if the key is in the map.
   * @param tagKey The TagKey which will be removed.
   */
  delete(tagKey: TagKey): void;
  /** Gets the tags map without metadata. */
  readonly tags: Map<TagKey, TagValue>;
  /** Gets the tags map with metadata. */
  readonly tagsWithMetadata: Map<TagKey, TagValueWithMetadata>;
}
