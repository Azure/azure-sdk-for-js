# AuthorizationCodeCredential manual sample

This is a manual sample to test the `AuthorizationCodeCredential` class.

Steps to run this sample:

1. Set up your environment with [these instructions](https://github.com/azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#setting-up-your-environment).

2. Build the Identity package with dependencies.

```bash
cd <repo-path>/sdk/identity/identity
rush build -t @azure/identity
```

3. Make sure you have an App Registration on your Azure Active Directory. This App Registration must:

- Have a `http://localhost:8080/authresponse` as the Web redirect endpoint.
- Have this option selected `Accounts in any organizational directory (Any Azure AD directory - Multitenant)`.

On the Azure Portal, navigate to your app registration. On the side panel, select "Authentication".

- Under "Supported Account Types", select `Accounts in any organizational directory (Any Azure AD directory - Multitenant)` .
- Under "Platform Configurations", add a platform and select "Web". Then add `http://localhost:8080/authresponse` as the redirect URI. Then click "Configure".

4. Navigate to the `test/manual/authorization-code-credential` folder

```bash
cd <repo-path>/sdk/identity/identity/test/manual/authorization-code-credential
```

5. Copy the `sample.env` into a file named `.env` in this folder and make sure to fill the values accordingly.
6. Run `npm install` inside of this folder.
7. Run the sample by entering this in your terminal `npm run test`. At the end, an `AccessToken` should be printed.
