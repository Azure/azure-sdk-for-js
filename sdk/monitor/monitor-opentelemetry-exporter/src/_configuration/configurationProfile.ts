// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Attributes describing the running SDK, matched against OneSettings feature override rules to
 * decide whether a feature is enabled for this process. Every field defaults to an empty string
 * until populated via {@link ConfigurationProfile.fill}.
 * @internal
 */
export interface ConfigurationProfileValues {
  /** Operating system, e.g. `windows`, `linux`, `darwin`. */
  os: string;
  /** Resource provider, e.g. `appsvc`, `fn`, `aks`. */
  rp: string;
  /** Attach type, e.g. `manual`, `integratedauto`. */
  attach: string;
  /** SDK version string, e.g. `1.0.0-beta.45`. */
  version: string;
  /** Component type: `dst` (distro), `ext` (exporter), or `mot` (Microsoft distro). */
  component: string;
  /** Azure region, e.g. `eastus`. */
  region: string;
  /** Instrumentation key (GUID). */
  ikey: string;
}

function emptyProfile(): ConfigurationProfileValues {
  return { os: "", rp: "", attach: "", version: "", component: "", region: "", ikey: "" };
}

/**
 * Process-wide, write-once profile of the running SDK.
 *
 * {@link ConfigurationProfile.fill} sets each field only the first time it is provided, so the
 * first component to initialize (distro or exporter) wins and later initializers cannot clobber an
 * already-established value. The profile is read by OneSettings feature evaluation. Use
 * {@link ConfigurationProfile.getInstance} rather than constructing this directly.
 * @internal
 */
export class ConfigurationProfile {
  private static instance: ConfigurationProfile | undefined;
  private values: ConfigurationProfileValues = emptyProfile();

  /**
   * Use {@link ConfigurationProfile.getInstance} to obtain the singleton instance.
   */
  private constructor() {}

  /**
   * Return the process-wide singleton, creating it on first use.
   */
  public static getInstance(): ConfigurationProfile {
    if (!ConfigurationProfile.instance) {
      ConfigurationProfile.instance = new ConfigurationProfile();
    }
    return ConfigurationProfile.instance;
  }

  /**
   * Set profile fields that have not been set yet. Fields already holding a non-empty value, and
   * fields omitted from `values`, are left unchanged so the first writer wins.
   */
  public fill(values: Partial<ConfigurationProfileValues>): void {
    for (const key of Object.keys(this.values) as (keyof ConfigurationProfileValues)[]) {
      const incoming = values[key];
      if (incoming !== undefined && this.values[key] === "") {
        this.values[key] = incoming;
      }
    }
  }

  /**
   * Return a read-only snapshot of the current profile values.
   */
  public snapshot(): Readonly<ConfigurationProfileValues> {
    return { ...this.values };
  }

  /**
   * Reset every field to its empty default. Primarily intended for tests that need to establish a
   * known profile, since {@link ConfigurationProfile.fill} otherwise never overwrites a set value.
   */
  public reset(): void {
    this.values = emptyProfile();
  }
}
