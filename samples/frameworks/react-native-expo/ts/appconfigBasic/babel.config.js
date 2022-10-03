module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-async-generator-functions",
      ["inline-dotenv", { unsafe: true }],
    ],
  };
};
