# Release History

## 2.0.0-beta.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0-beta.4 (2025-08-22)

### Other Changes

  - Other fixes

## 2.0.0-beta.3 (2025-03-14)

### Bugs Fixed

- Fix ESM module file not found.

## 2.0.0-beta.2 (2024-12-10)

### Breaking Changes

- Marked fields in various interfaces as readonly, which may impact code that previously modified these properties.

### Bugs Fixed

- Fix the Microsoft Entra ID authentication when providing `baseUrl`.

## 2.0.0-beta.1 (2024-01-09)

### Features Added

- Introducing compliant [Maps Search V2](https://learn.microsoft.com/rest/api/maps/search?view=rest-maps-2023-06-01) features:
  - `/geocode`, `/geocode:batch`: Turn an address to coordinates. Replace the v1 `/search/address`, `/search/address/batch/sync/`.
  - `/reverseGeocode`, `/reverseGeocode:batch`: Turn coordinates to an address. Replace the v1 `/search/address/reverse`, `/search/address/batch/reverse/sync/`.
  - `/search/polygon`: Supplies polygon data of a geographical area outline such as a city or a country region. Replace the v1 `/search/polygon`.
- Support SAS token authentication.

### Breaking Changes

- All the paths in V1 are now deprecated. Please follow the section "Use V1 SDK" in README if you find paths in V1 are still needed.

## 1.0.0-beta.3 (2023-07-11)

### Other Changes

- Update README.

## 1.0.0-beta.2 (2023-02-07)

### Bugs Fixed

- Correct the path of the type declaration file.

## 1.0.0-beta.1 (2023-01-10)

### Features Added

- Initial Release
