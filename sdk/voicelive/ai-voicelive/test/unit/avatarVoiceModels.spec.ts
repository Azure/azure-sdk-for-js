// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Avatar and Voice Model Serialization & Round-Trip Tests
 *
 * This test suite validates the serialization and deserialization of recently
 * added avatar and voice configuration models to ensure proper JSON structure
 * and field mapping between TypeScript models and the wire protocol format.
 *
 * Tests cover:
 * - AvatarConfig with new fields (type, model, outputProtocol)
 * - AvatarConfigTypes enum
 * - PhotoAvatarBaseModes enum
 * - AvatarOutputProtocol enum
 * - AzureCustomVoice with customTextNormalizationUrl
 * - AzureStandardVoice with customTextNormalizationUrl
 * - AzurePersonalVoice with extended properties
 * - New OAIVoice values (marin, cedar)
 */

import { describe, it, expect } from "vitest";
import type {
  AvatarConfig,
  AzureCustomVoice,
  AzureStandardVoice,
  AzurePersonalVoice,
} from "../../src/models/index.js";
import {
  avatarConfigSerializer,
  avatarConfigDeserializer,
  azureCustomVoiceSerializer,
  azureCustomVoiceDeserializer,
  azureStandardVoiceSerializer,
  azureStandardVoiceDeserializer,
  azurePersonalVoiceSerializer,
  azurePersonalVoiceDeserializer,
  KnownAvatarConfigTypes,
  KnownPhotoAvatarBaseModes,
  KnownAvatarOutputProtocol,
  KnownOAIVoice,
  KnownAzureVoiceType,
} from "../../src/models/models.js";

describe("Avatar and Voice Models - Serialization & Validation", () => {
  describe("AvatarConfig", () => {
    it("should serialize with all new fields populated", () => {
      const config: AvatarConfig = {
        type: KnownAvatarConfigTypes.PhotoAvatar,
        character: "avatar-character-1",
        customized: false,
        model: KnownPhotoAvatarBaseModes.Vasa1,
        outputProtocol: KnownAvatarOutputProtocol.Webrtc,
        iceServers: [
          {
            urls: ["stun:stun.example.com"],
            username: "user",
            credential: "pass",
          },
        ],
        style: "friendly",
        video: {
          bitrate: 2000000,
          codec: "h264",
          resolution: {
            width: 1920,
            height: 1080,
          },
        },
      };

      const serialized = avatarConfigSerializer(config);

      expect(serialized.type).toBe(KnownAvatarConfigTypes.PhotoAvatar);
      expect(serialized.character).toBe("avatar-character-1");
      expect(serialized.customized).toBe(false);
      expect(serialized.model).toBe(KnownPhotoAvatarBaseModes.Vasa1);
      expect(serialized.output_protocol).toBe(KnownAvatarOutputProtocol.Webrtc);
      expect(serialized.style).toBe("friendly");
      expect(serialized.ice_servers).toBeDefined();
      expect(serialized.ice_servers.length).toBe(1);
      expect(serialized.video).toBeDefined();
      expect(serialized.video.bitrate).toBe(2000000);
    });

    it("should serialize video-avatar type", () => {
      const config: AvatarConfig = {
        type: KnownAvatarConfigTypes.VideoAvatar,
        character: "video-char",
        customized: true,
        style: "professional",
      };

      const serialized = avatarConfigSerializer(config);

      expect(serialized.type).toBe(KnownAvatarConfigTypes.VideoAvatar);
      expect(serialized.character).toBe("video-char");
      expect(serialized.customized).toBe(true);
      expect(serialized.style).toBe("professional");
    });

    it("should serialize with minimal required fields", () => {
      const config: AvatarConfig = {
        character: "minimal-char",
        customized: false,
      };

      const serialized = avatarConfigSerializer(config);

      expect(serialized.character).toBe("minimal-char");
      expect(serialized.customized).toBe(false);
      expect(serialized.type).toBeUndefined();
      expect(serialized.model).toBeUndefined();
      expect(serialized.output_protocol).toBeUndefined();
    });

    it("should serialize with websocket output protocol", () => {
      const config: AvatarConfig = {
        character: "ws-avatar",
        customized: false,
        outputProtocol: KnownAvatarOutputProtocol.Websocket,
      };

      const serialized = avatarConfigSerializer(config);

      expect(serialized.character).toBe("ws-avatar");
      expect(serialized.customized).toBe(false);
      expect(serialized.output_protocol).toBe(KnownAvatarOutputProtocol.Websocket);
    });

    it("should deserialize from wire format correctly", () => {
      const wireFormat = {
        type: KnownAvatarConfigTypes.PhotoAvatar,
        character: "test-avatar",
        customized: true,
        model: KnownPhotoAvatarBaseModes.Vasa1,
        output_protocol: KnownAvatarOutputProtocol.Webrtc,
        style: "casual",
        ice_servers: [
          {
            urls: ["turn:turn.example.com"],
            username: "turnuser",
            credential: "turnpass",
          },
        ],
      };

      const deserialized = avatarConfigDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownAvatarConfigTypes.PhotoAvatar);
      expect(deserialized.character).toBe("test-avatar");
      expect(deserialized.customized).toBe(true);
      expect(deserialized.model).toBe(KnownPhotoAvatarBaseModes.Vasa1);
      expect(deserialized.outputProtocol).toBe(KnownAvatarOutputProtocol.Webrtc);
      expect(deserialized.style).toBe("casual");
      expect(deserialized.iceServers).toBeDefined();
      expect(deserialized.iceServers?.length).toBe(1);
    });

    it("should round-trip preserve all fields", () => {
      const original: AvatarConfig = {
        type: KnownAvatarConfigTypes.VideoAvatar,
        character: "roundtrip-avatar",
        customized: true,
        style: "energetic",
        outputProtocol: KnownAvatarOutputProtocol.Websocket,
      };

      const serialized = avatarConfigSerializer(original);
      const deserialized = avatarConfigDeserializer(serialized);

      expect(deserialized.type).toBe(original.type);
      expect(deserialized.character).toBe(original.character);
      expect(deserialized.customized).toBe(original.customized);
      expect(deserialized.style).toBe(original.style);
      expect(deserialized.outputProtocol).toBe(original.outputProtocol);
    });
  });

  describe("AvatarConfigTypes Enum", () => {
    it("should have all expected enum values", () => {
      expect(KnownAvatarConfigTypes.VideoAvatar).toBe("video-avatar");
      expect(KnownAvatarConfigTypes.PhotoAvatar).toBe("photo-avatar");
    });
  });

  describe("PhotoAvatarBaseModes Enum", () => {
    it("should have all expected enum values", () => {
      expect(KnownPhotoAvatarBaseModes.Vasa1).toBe("vasa-1");
    });
  });

  describe("AvatarOutputProtocol Enum", () => {
    it("should have all expected enum values", () => {
      expect(KnownAvatarOutputProtocol.Webrtc).toBe("webrtc");
      expect(KnownAvatarOutputProtocol.Websocket).toBe("websocket");
    });
  });

  describe("AzureCustomVoice with customTextNormalizationUrl", () => {
    it("should serialize with customTextNormalizationUrl", () => {
      const voice: AzureCustomVoice = {
        type: KnownAzureVoiceType.AzureCustom,
        name: "custom-voice-1",
        endpointId: "endpoint-123",
        temperature: 0.7,
        customLexiconUrl: "https://example.com/lexicon.xml",
        customTextNormalizationUrl: "https://example.com/normalize",
        preferLocales: ["en-US", "en-GB"],
        locale: "en-US",
        style: "cheerful",
        pitch: "+5%",
        rate: "1.1",
        volume: "loud",
      };

      const serialized = azureCustomVoiceSerializer(voice);

      expect(serialized.type).toBe(KnownAzureVoiceType.AzureCustom);
      expect(serialized.name).toBe("custom-voice-1");
      expect(serialized.endpoint_id).toBe("endpoint-123");
      expect(serialized.temperature).toBe(0.7);
      expect(serialized.custom_lexicon_url).toBe("https://example.com/lexicon.xml");
      expect(serialized.custom_text_normalization_url).toBe("https://example.com/normalize");
      expect(serialized.prefer_locales).toEqual(["en-US", "en-GB"]);
      expect(serialized.locale).toBe("en-US");
      expect(serialized.style).toBe("cheerful");
    });

    it("should serialize without customTextNormalizationUrl", () => {
      const voice: AzureCustomVoice = {
        type: KnownAzureVoiceType.AzureCustom,
        name: "custom-voice-2",
        endpointId: "endpoint-456",
      };

      const serialized = azureCustomVoiceSerializer(voice);

      expect(serialized.type).toBe(KnownAzureVoiceType.AzureCustom);
      expect(serialized.name).toBe("custom-voice-2");
      expect(serialized.endpoint_id).toBe("endpoint-456");
      expect(serialized.custom_text_normalization_url).toBeUndefined();
    });

    it("should deserialize customTextNormalizationUrl correctly", () => {
      const wireFormat = {
        type: KnownAzureVoiceType.AzureCustom,
        name: "wire-voice",
        endpoint_id: "wire-endpoint",
        custom_text_normalization_url: "https://example.com/text-norm",
        custom_lexicon_url: "https://example.com/lex",
      };

      const deserialized = azureCustomVoiceDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownAzureVoiceType.AzureCustom);
      expect(deserialized.name).toBe("wire-voice");
      expect(deserialized.endpointId).toBe("wire-endpoint");
      expect(deserialized.customTextNormalizationUrl).toBe("https://example.com/text-norm");
      expect(deserialized.customLexiconUrl).toBe("https://example.com/lex");
    });

    it("should round-trip preserve customTextNormalizationUrl", () => {
      const original: AzureCustomVoice = {
        type: KnownAzureVoiceType.AzureCustom,
        name: "roundtrip-voice",
        endpointId: "rt-endpoint",
        customTextNormalizationUrl: "https://normalize.example.com/api",
      };

      const serialized = azureCustomVoiceSerializer(original);
      const deserialized = azureCustomVoiceDeserializer(serialized);

      expect(deserialized.type).toBe(original.type);
      expect(deserialized.name).toBe(original.name);
      expect(deserialized.endpointId).toBe(original.endpointId);
      expect(deserialized.customTextNormalizationUrl).toBe(original.customTextNormalizationUrl);
    });
  });

  describe("AzureStandardVoice with customTextNormalizationUrl", () => {
    it("should serialize with customTextNormalizationUrl", () => {
      const voice: AzureStandardVoice = {
        type: KnownAzureVoiceType.AzureStandard,
        name: "en-US-JennyNeural",
        temperature: 0.5,
        customLexiconUrl: "https://example.com/lexicon.xml",
        customTextNormalizationUrl: "https://example.com/standard-normalize",
        preferLocales: ["en-US"],
        locale: "en-US",
      };

      const serialized = azureStandardVoiceSerializer(voice);

      expect(serialized.type).toBe(KnownAzureVoiceType.AzureStandard);
      expect(serialized.name).toBe("en-US-JennyNeural");
      expect(serialized.temperature).toBe(0.5);
      expect(serialized.custom_lexicon_url).toBe("https://example.com/lexicon.xml");
      expect(serialized.custom_text_normalization_url).toBe(
        "https://example.com/standard-normalize",
      );
      expect(serialized.prefer_locales).toEqual(["en-US"]);
      expect(serialized.locale).toBe("en-US");
    });

    it("should deserialize customTextNormalizationUrl correctly", () => {
      const wireFormat = {
        type: KnownAzureVoiceType.AzureStandard,
        name: "en-US-GuyNeural",
        custom_text_normalization_url: "https://std-norm.example.com",
      };

      const deserialized = azureStandardVoiceDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownAzureVoiceType.AzureStandard);
      expect(deserialized.name).toBe("en-US-GuyNeural");
      expect(deserialized.customTextNormalizationUrl).toBe("https://std-norm.example.com");
    });

    it("should round-trip preserve all fields", () => {
      const original: AzureStandardVoice = {
        type: KnownAzureVoiceType.AzureStandard,
        name: "en-GB-SoniaNeural",
        temperature: 0.8,
        customTextNormalizationUrl: "https://uk-norm.example.com",
        locale: "en-GB",
        style: "empathetic",
      };

      const serialized = azureStandardVoiceSerializer(original);
      const deserialized = azureStandardVoiceDeserializer(serialized);

      expect(deserialized.type).toBe(original.type);
      expect(deserialized.name).toBe(original.name);
      expect(deserialized.temperature).toBe(original.temperature);
      expect(deserialized.customTextNormalizationUrl).toBe(original.customTextNormalizationUrl);
      expect(deserialized.locale).toBe(original.locale);
      expect(deserialized.style).toBe(original.style);
    });
  });

  describe("AzurePersonalVoice with extended properties", () => {
    it("should serialize with all new extended properties", () => {
      const voice: AzurePersonalVoice = {
        type: KnownAzureVoiceType.AzurePersonal,
        name: "my-personal-voice",
        temperature: 0.6,
        model: "PhonemeHD",
        customLexiconUrl: "https://example.com/personal-lexicon.xml",
        customTextNormalizationUrl: "https://example.com/personal-normalize",
        preferLocales: ["en-US", "es-ES"],
        locale: "en-US",
        style: "narrative",
        pitch: "-2%",
        rate: "0.95",
        volume: "medium",
      };

      const serialized = azurePersonalVoiceSerializer(voice);

      expect(serialized.type).toBe(KnownAzureVoiceType.AzurePersonal);
      expect(serialized.name).toBe("my-personal-voice");
      expect(serialized.temperature).toBe(0.6);
      expect(serialized.model).toBe("PhonemeHD");
      expect(serialized.custom_lexicon_url).toBe("https://example.com/personal-lexicon.xml");
      expect(serialized.custom_text_normalization_url).toBe(
        "https://example.com/personal-normalize",
      );
      expect(serialized.prefer_locales).toEqual(["en-US", "es-ES"]);
      expect(serialized.locale).toBe("en-US");
      expect(serialized.style).toBe("narrative");
      expect(serialized.pitch).toBe("-2%");
      expect(serialized.rate).toBe("0.95");
      expect(serialized.volume).toBe("medium");
    });

    it("should serialize with minimal required fields", () => {
      const voice: AzurePersonalVoice = {
        type: KnownAzureVoiceType.AzurePersonal,
        name: "minimal-personal",
        model: "PhonemeHD",
      };

      const serialized = azurePersonalVoiceSerializer(voice);

      expect(serialized.type).toBe(KnownAzureVoiceType.AzurePersonal);
      expect(serialized.name).toBe("minimal-personal");
      expect(serialized.model).toBe("PhonemeHD");
      expect(serialized.custom_lexicon_url).toBeUndefined();
      expect(serialized.custom_text_normalization_url).toBeUndefined();
    });

    it("should deserialize all extended properties correctly", () => {
      const wireFormat = {
        type: KnownAzureVoiceType.AzurePersonal,
        name: "wire-personal-voice",
        model: "PhonemeHD",
        custom_lexicon_url: "https://wire.example.com/lex",
        custom_text_normalization_url: "https://wire.example.com/norm",
        prefer_locales: ["fr-FR"],
        locale: "fr-FR",
        style: "formal",
        pitch: "+10%",
        rate: "1.2",
        volume: "soft",
      };

      const deserialized = azurePersonalVoiceDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownAzureVoiceType.AzurePersonal);
      expect(deserialized.name).toBe("wire-personal-voice");
      expect(deserialized.model).toBe("PhonemeHD");
      expect(deserialized.customLexiconUrl).toBe("https://wire.example.com/lex");
      expect(deserialized.customTextNormalizationUrl).toBe("https://wire.example.com/norm");
      expect(deserialized.preferLocales).toEqual(["fr-FR"]);
      expect(deserialized.locale).toBe("fr-FR");
      expect(deserialized.style).toBe("formal");
      expect(deserialized.pitch).toBe("+10%");
      expect(deserialized.rate).toBe("1.2");
      expect(deserialized.volume).toBe("soft");
    });

    it("should round-trip preserve all extended properties", () => {
      const original: AzurePersonalVoice = {
        type: KnownAzureVoiceType.AzurePersonal,
        name: "roundtrip-personal",
        model: "PhonemeHD",
        temperature: 0.7,
        customLexiconUrl: "https://rt.example.com/lexicon",
        customTextNormalizationUrl: "https://rt.example.com/normalize",
        preferLocales: ["de-DE", "de-AT"],
        locale: "de-DE",
        style: "calm",
        pitch: "0%",
        rate: "1.0",
        volume: "default",
      };

      const serialized = azurePersonalVoiceSerializer(original);
      const deserialized = azurePersonalVoiceDeserializer(serialized);

      expect(deserialized.type).toBe(original.type);
      expect(deserialized.name).toBe(original.name);
      expect(deserialized.model).toBe(original.model);
      expect(deserialized.temperature).toBe(original.temperature);
      expect(deserialized.customLexiconUrl).toBe(original.customLexiconUrl);
      expect(deserialized.customTextNormalizationUrl).toBe(original.customTextNormalizationUrl);
      expect(deserialized.preferLocales).toEqual(original.preferLocales);
      expect(deserialized.locale).toBe(original.locale);
      expect(deserialized.style).toBe(original.style);
      expect(deserialized.pitch).toBe(original.pitch);
      expect(deserialized.rate).toBe(original.rate);
      expect(deserialized.volume).toBe(original.volume);
    });
  });

  describe("OAIVoice Enum - New Values", () => {
    it("should have new marin voice value", () => {
      expect(KnownOAIVoice.Marin).toBe("marin");
    });

    it("should have new cedar voice value", () => {
      expect(KnownOAIVoice.Cedar).toBe("cedar");
    });

    it("should have all existing voice values", () => {
      expect(KnownOAIVoice.Alloy).toBe(KnownOAIVoice.Alloy);
      expect(KnownOAIVoice.Ash).toBe(KnownOAIVoice.Ash);
      expect(KnownOAIVoice.Ballad).toBe(KnownOAIVoice.Ballad);
      expect(KnownOAIVoice.Coral).toBe(KnownOAIVoice.Coral);
      expect(KnownOAIVoice.Echo).toBe(KnownOAIVoice.Echo);
      expect(KnownOAIVoice.Sage).toBe(KnownOAIVoice.Sage);
      expect(KnownOAIVoice.Shimmer).toBe(KnownOAIVoice.Shimmer);
      expect(KnownOAIVoice.Verse).toBe(KnownOAIVoice.Verse);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty preferLocales array in AzurePersonalVoice", () => {
      const voice: AzurePersonalVoice = {
        type: KnownAzureVoiceType.AzurePersonal,
        name: "empty-locales",
        model: "PhonemeHD",
        preferLocales: [],
      };

      const serialized = azurePersonalVoiceSerializer(voice);
      const deserialized = azurePersonalVoiceDeserializer(serialized);

      expect(deserialized.type).toBe(KnownAzureVoiceType.AzurePersonal);
      expect(deserialized.name).toBe("empty-locales");
      expect(deserialized.model).toBe("PhonemeHD");
      expect(deserialized.preferLocales).toEqual([]);
    });

    it("should handle undefined video in AvatarConfig", () => {
      const config: AvatarConfig = {
        character: "no-video-avatar",
        customized: false,
      };

      const serialized = avatarConfigSerializer(config);

      expect(serialized.character).toBe("no-video-avatar");
      expect(serialized.customized).toBe(false);
      expect(serialized.video).toBeUndefined();
    });

    it("should handle empty iceServers array in AvatarConfig", () => {
      const config: AvatarConfig = {
        character: "no-ice-avatar",
        customized: false,
        iceServers: [],
      };

      const serialized = avatarConfigSerializer(config);
      const deserialized = avatarConfigDeserializer(serialized);

      expect(deserialized.character).toBe("no-ice-avatar");
      expect(deserialized.customized).toBe(false);
      expect(deserialized.iceServers).toEqual([]);
    });
  });
});
