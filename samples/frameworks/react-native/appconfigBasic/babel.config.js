module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-async-generator-functions',
    ['inline-dotenv', {unsafe: true}],
  ],
};
