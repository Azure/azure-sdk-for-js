// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  VoiceAgentAudioOutputConfig,
  voiceAgentAudioOutputConfigSerializer,
  voiceAgentAudioOutputConfigDeserializer,
} from "../models.js";

/** The template for picking properties. */
export interface PickPropertiesVoiceAgentAudioConfig {
  /** Output (agent speech) audio configuration. */
  output?: VoiceAgentAudioOutputConfig;
}

export function pickPropertiesVoiceAgentAudioConfigSerializer(
  item: PickPropertiesVoiceAgentAudioConfig,
): any {
  return {
    output: !item["output"]
      ? item["output"]
      : voiceAgentAudioOutputConfigSerializer(item["output"]),
  };
}

export function pickPropertiesVoiceAgentAudioConfigDeserializer(
  item: any,
): PickPropertiesVoiceAgentAudioConfig {
  return {
    output: !item["output"]
      ? item["output"]
      : voiceAgentAudioOutputConfigDeserializer(item["output"]),
  };
}
