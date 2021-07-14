# AuthorizationCodeCredential manual sample

This is a manual sample to test the `AuthorizationCodeCredential` class.

Steps to run this sample:

1. You must have built the Identity package outside of this folder before.
2. Install `ts-node` as an executable binary for your local user, for example with `npm install -g ts-node`.
3. Make sure you have an App Registration on your Azure Active Directory. This App Registration must:

- Have a `http://localhost:8080/authresponse` as the Web redirect endpoint.
- Have this option selected `Accounts in any organizational directory (Any Azure AD directory - Multitenant)`.

4. Copy the `sample.env` into a file named `.env` in this folder and make sure to fill the values accordingly.
5. Run `npm install` inside of this folder.
6. Run the sample by entering this in your terminal `ts-node authorizationCodeSample.ts`. At the end, an `AccessToken` should be printed.
