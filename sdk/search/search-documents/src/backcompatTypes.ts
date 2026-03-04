// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains types that are manually maintained for backward compatibility.
 * These types were removed or changed during the TypeSpec migration but are preserved
 * here to minimize breaking changes for existing users.
 *
 * These types relate to deprecated skills (EntityRecognitionSkill, SentimentSkill) that
 * have been superseded by V3 versions (EntityRecognitionSkillV3, SentimentSkillV3).
 */

/**
 * Defines the entity categories that can be extracted by the EntityRecognitionSkill.
 *
 * @deprecated This enum is associated with a skill that has been deprecated.
 * Use {@link EntityRecognitionSkillV3} instead.
 * See {@link https://learn.microsoft.com/azure/search/cognitive-search-skill-deprecated | Azure Cognitive Search skill deprecation}
 * for migration guidance.
 */
export enum KnownEntityCategory {
  /** Entities describing a physical location. */
  Location = "location",
  /** Entities describing an organization. */
  Organization = "organization",
  /** Entities describing a person. */
  Person = "person",
  /** Entities describing a date and time. */
  Datetime = "datetime",
  /** Entities describing an email address. */
  Email = "email",
  /** Entities describing a URL. */
  Url = "url",
  /** Entities describing a quantity. */
  Quantity = "quantity",
}

/**
 * Defines the language codes supported by the EntityRecognitionSkill.
 *
 * @deprecated This enum is associated with a skill that has been deprecated.
 * Use {@link EntityRecognitionSkillV3} instead.
 * See {@link https://learn.microsoft.com/azure/search/cognitive-search-skill-deprecated | Azure Cognitive Search skill deprecation}
 * for migration guidance.
 */
export enum KnownEntityRecognitionSkillLanguage {
  /** Arabic */
  Ar = "ar",
  /** Czech */
  Cs = "cs",
  /** Danish */
  Da = "da",
  /** German */
  De = "de",
  /** Greek */
  El = "el",
  /** English */
  En = "en",
  /** Spanish */
  Es = "es",
  /** Finnish */
  Fi = "fi",
  /** French */
  Fr = "fr",
  /** Hungarian */
  Hu = "hu",
  /** Italian */
  It = "it",
  /** Japanese */
  Ja = "ja",
  /** Korean */
  Ko = "ko",
  /** Dutch */
  Nl = "nl",
  /** Norwegian */
  No = "no",
  /** Polish */
  Pl = "pl",
  /** Portuguese (Brazil) */
  PtBR = "pt-BR",
  /** Portuguese (Portugal) */
  PtPT = "pt-PT",
  /** Russian */
  Ru = "ru",
  /** Swedish */
  Sv = "sv",
  /** Turkish */
  Tr = "tr",
  /** Chinese (Simplified) */
  ZhHans = "zh-Hans",
  /** Chinese (Traditional) */
  ZhHant = "zh-Hant",
}

/**
 * Defines the language codes supported by the SentimentSkill.
 *
 * @deprecated This enum is associated with a skill that has been deprecated.
 * Use {@link SentimentSkillV3} instead.
 * See {@link https://learn.microsoft.com/azure/search/cognitive-search-skill-deprecated | Azure Cognitive Search skill deprecation}
 * for migration guidance.
 */
export enum KnownSentimentSkillLanguage {
  /** Danish */
  Da = "da",
  /** German */
  De = "de",
  /** Greek */
  El = "el",
  /** English */
  En = "en",
  /** Spanish */
  Es = "es",
  /** Finnish */
  Fi = "fi",
  /** French */
  Fr = "fr",
  /** Italian */
  It = "it",
  /** Dutch */
  Nl = "nl",
  /** Norwegian */
  No = "no",
  /** Polish */
  Pl = "pl",
  /** Portuguese (Portugal) */
  PtPT = "pt-PT",
  /** Russian */
  Ru = "ru",
  /** Swedish */
  Sv = "sv",
  /** Turkish */
  Tr = "tr",
}
