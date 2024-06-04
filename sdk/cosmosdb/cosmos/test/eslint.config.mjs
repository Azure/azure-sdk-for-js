import cosmosBaseConfig from "../eslint.config.mjs";

export default [
  ...cosmosBaseConfig,
  {
    "rules": {
      "no-console": "off",
      "space-before-function-paren": "off"
    }    
  }
];
