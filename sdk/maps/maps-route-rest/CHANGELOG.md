# Release History

## 1.0.0-beta.4 (2024-12-10)

### Breaking Changes

- Poller creation is now asynchronous, requiring an await statement. The resumeFrom parameter has been replaced with restoreFrom, and state serialization is now also asynchronous.

### Bugs Fixed

- Fix the Microsoft Entra ID authentication when providing `baseUrl`.

## 1.0.0-beta.3 (2024-01-09)

### Features Added

- Support SAS token authentication.

## 1.0.0-beta.2 (2023-07-11)

### Other Changes

- Update README.

## 1.0.0-beta.1 (2022-11-08)

### Features Added

- Initial Release
