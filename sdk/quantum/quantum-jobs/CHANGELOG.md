<!-- dev-tool snippets ignore -->

# Release History

## 1.0.0-beta.2 (Unreleased)

### Breaking Changes

- Migrated to the Core v2 HTTP pipeline. As a result of this migration:

  - The response types no longer contain the raw response `_response`. To access the raw response, an `onResponse` callback has to be passed in the request options bag, for example:

    ```ts
    let rawResponse: FullOperationResponse | undefined;
    await client.operationName(/* ...parameters... */, {
      onResponse: (response) => (rawResponse = response),
    });
    ```

## 1.0.0-beta.1 (2021-02-05)

Initial public preview of the @azure/quantum-jobs library.
