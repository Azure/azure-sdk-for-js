declare module 'eslint-plugin-promise' {
  import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

  const exprt: {
    meta: FlatConfig.PluginMeta,
    plugin: FlatConfig.Plugin,
    configs: {
      "flat/recommended": FlatConfig.Config;
    };
  };
  export default exprt;
}
