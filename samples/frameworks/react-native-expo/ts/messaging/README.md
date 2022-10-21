
Steps

1. Create the project using Expo

```bash
npx create-expo-app messaging
```

2. Add TypeScript support by adding a `tsconfig.json` file with following content

```js
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

3. Run the following Expo command to start the app.  Expo will prompt to install TypeScript and types packages for React/React-Native.

```bash
npx expo start
```

Now the application should be bundled and ready to run on device, emulators, or web browsers.

4. Ctrl+C to exit the npm script.
