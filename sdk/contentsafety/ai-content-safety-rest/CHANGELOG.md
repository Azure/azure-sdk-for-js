# Release History

## 2.0.0-beta.1 (2025-07-24)
Compared with version 1.0.1

### Features Added
  - Added operation in Routes for path: "/text:shieldPrompt"
  - Added operation in Routes for path: "/text:detectProtectedMaterial"
  - Added Interface DetectTextProtectedMaterial
  - Added Interface DetectTextProtectedMaterial200Response
  - Added Interface DetectTextProtectedMaterialBodyParam
  - Added Interface DetectTextProtectedMaterialDefaultHeaders
  - Added Interface DetectTextProtectedMaterialDefaultResponse
  - Added Interface DetectTextProtectedMaterialOptions
  - Added Interface DetectTextProtectedMaterialResultOutput
  - Added Interface DocumentInjectionAnalysisResultOutput
  - Added Interface ImageData
  - Added Interface ShieldPrompt
  - Added Interface ShieldPrompt200Response
  - Added Interface ShieldPromptBodyParam
  - Added Interface ShieldPromptDefaultHeaders
  - Added Interface ShieldPromptDefaultResponse
  - Added Interface ShieldPromptOptions
  - Added Interface ShieldPromptResultOutput
  - Added Interface TextProtectedMaterialAnalysisResultOutput
  - Added Interface UserPromptInjectionAnalysisResultOutput
  - Interface TextBlocklistItem has a new optional parameter isRegex
  - Interface TextBlocklistItemOutput has a new optional parameter isRegex
  - Added Type Alias DetectTextProtectedMaterialParameters
  - Added Type Alias ShieldPromptParameters
  - Added function overload "export function isUnexpected(response: ShieldPrompt200Response | ShieldPromptDefaultResponse): response is ShieldPromptDefaultResponse;"
  - Added function overload "export function isUnexpected(response: DetectTextProtectedMaterial200Response | DetectTextProtectedMaterialDefaultResponse): response is DetectTextProtectedMaterialDefaultResponse;"

### Breaking Changes
  - Removed Interface ImageData_2

## 1.0.1 (2025-02-10)

### Features Added
-refresh @azure-rest/ai-content-safety sdk

## 1.0.0 (2023-12-13)

### Features Added

- Support AAD Authentication
- Support 8 severity levels output for Text Analyze

### Breaking Changes

Contract change for AnalyzeText, AnalyzeImage, Blocklist management related parameters

#### AnalyzeText

- AnalyzeTextOptions
  - Renamed `breakByBlocklists` to `haltOnBlocklistHit`
  - Add `outputType`
- AnalyzeTextResultOutput
  - Renamed `blocklistsMatchResults` to `blocklistsMatch`
  - Replaced `TextAnalyzeSeverityResultOutput` by `TextCategoriesAnalysisOutput`

#### AnalyzeImage

- AnalyzeImageOptions
  - Add `outputType`
- AnalyzeImageResultOutput
  - Replaced `ImageAnalyzeSeverityResultOutput` by `ImageCategoriesAnalysisOutput`

#### Blocklist management

- Renamed `"/text/blocklists/{blocklistName}:addBlockItems"` to `"/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems"`
- Renamed `"/text/blocklists/{blocklistName}:removeBlockItems"` to `"/text/blocklists/{blocklistName}:removeBlocklistItems"`
- Renamed `"/text/blocklists/{blocklistName}/blockItems"` to `"/text/blocklists/{blocklistName}/blocklistItems"`
- Renamed `"/text/blocklists/{blocklistName}/blockItems/{blockItemId}"` to `"/text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}"`
- Renamed `AddBlockItemsOptions` to `AddOrUpdateTextBlocklistItemsOptions`
  - Renamed `blockItems` to `blocklistItems`
- Renamed `AddBlockItemsResultOutput` to `AddOrUpdateTextBlocklistItemsResultOutput`
    - Renamed `value` to `blocklistItems`
- Renamed `RemoveBlockItemsOptions` to `RemoveTextBlocklistItemsOptions`
  - Renamed `blockItemIds` to `blocklistItemIds`
- Renamed `TextBlockItemInfo` to `TextBlocklistItem`

## 1.0.0-beta.1 (2023-09-28)

- This is the initial beta release for Azure AI Content Safety, see README.md for details.
