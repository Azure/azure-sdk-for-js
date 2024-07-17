declare module 'eslint-plugin-markdown' {
  import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

  declare const exprt: {
    meta: FlatConfig.PluginMeta,
    plugin: FlatConfig.Plugin,
    configs: {
      "recommended-legacy": FlatConfig.Config;
      recommended: FlatConfig.ConfigArray;
    };
  };
  export = exprt;
}
