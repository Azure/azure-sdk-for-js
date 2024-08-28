# Release History

## 2.0.0-beta.1 (Unreleased)

### Features Added

- Added support for `trafficLayer` in the `RenderGetMapStaticImage` endpoint, allowing for new traffic visualization options.

### Breaking Changes

- The API endpoint for `GetMapStaticImage` has been updated. The `format` parameter has been removed from the path, changing the usage from `(path: "/map/static/{format}", format: "png")` to `(path: "/map/static")`.
- Replaced `layer` and `style` parameters with `tilesetId` in `RenderGetMapStaticImageQueryParamProperties`, which now supports more detailed map and traffic visualization.

### Bugs Fixed

### Other Changes

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

- Fix the Microsoft Entra ID authentication when providing `baseUrl`.

### Other Changes

## 1.0.0-beta.3 (2024-01-09)

### Features Added

- Support SAS token authentication.

## 1.0.0-beta.2 (2023-07-11)

### Other Changes

- Deprecate tilesetId "microsoft.dem" and "microsoft.dem.contours" per [announcement of the retirement for DEM tiles in Render API](https://azure.microsoft.com/updates/azure-maps-elevation-apis-and-render-v2-dem-tiles-will-be-retired-on-5-may-2023/)
- Update README.

## 1.0.0-beta.1 (2023-01-10)

### Features Added

- Initial Release
