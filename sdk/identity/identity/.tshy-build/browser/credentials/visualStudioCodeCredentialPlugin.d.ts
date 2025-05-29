/**
 * A function that searches for credentials in the Visual Studio Code credential store.
 *
 * @returns an array of credentials (username and password)
 * @internal
 *
 * @deprecated This credential is deprecated because the VS Code Azure Account extension on which this credential
 * relies has been deprecated. Users should use other dev-time credentials, such as {@link AzureCliCredential},
 * {@link AzureDeveloperCliCredential}, or {@link AzurePowerShellCredential} for their
 * local development needs. See Azure Account extension deprecation notice [here](https://github.com/microsoft/vscode-azure-account/issues/964).
 */
export type VSCodeCredentialFinder = () => Promise<Array<{
    account: string;
    password: string;
}>>;
//# sourceMappingURL=visualStudioCodeCredentialPlugin.d.ts.map