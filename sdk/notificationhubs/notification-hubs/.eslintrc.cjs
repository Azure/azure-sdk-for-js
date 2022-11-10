// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: [
    "@rushstack/eslint-config/profile/node",
    "@rushstack/eslint-config/mixins/tsdoc",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: [
    "no-only-tests",
  ],
  parserOptions: { 
    sourceType: "module",
    ecmaVersion: "latest",
    project: [
      "./tsconfig.json",
    ],
    tsconfigRootDir: __dirname ,
    extraFileExtensions: [".json", ".javascript"],
  },
  env: {
    browser: true,
    mocha: true,
    node: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true, 
        "project": "./tsconfig.json",
      },
    },
  },
  rules: {
    curly: ["error", "multi-line"],
    "eol-last": ["error", "always"],
    eqeqeq: ["error", "always", { null: "ignore" }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["test/**/*.ts", "samples/**", "**/karma.conf.cjs", "**/.eslintrc.cjs"],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    "no-console": "off",
    "no-dupe-class-members": "off",
    "no-invalid-this": "off",
    "no-empty": "error",
    "no-fallthrough": "error",
    "@typescript-eslint/no-invalid-this": "off",
    "@typescript-eslint/no-require-imports": "warn",
    "no-restricted-imports": ["error", { paths: ["rhea", "rhea/.*"] }],
    "no-return-await": "error",
    "no-undef": "off",
    "no-unsafe-finally": "error",
    "no-unused-vars": "off",
    "no-unused-expressions": "error",
    "no-useless-constructor": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: false }],
    "no-var": "error",
    "one-var-declaration-per-line": "error",
    "prefer-const": "error",
    "sort-imports": "off",
    "spaced-comment": ["error", "always", { markers: ["/"] }],
    "space-infix-ops": ["error", { int32Hint: false }],
    "use-isnan": "error",
    "no-only-tests/no-only-tests": "error",
  }
};
