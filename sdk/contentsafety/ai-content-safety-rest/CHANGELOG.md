# Release History
    
## 1.1.0 (2025-04-30)
    
### Features Added

  - Added operation group DetectTextProtectedMaterial
  - Added operation group ShieldPrompt
  - Added operation in Routes for path: "/text:shieldPrompt"
  - Added operation in Routes for path: "/text:detectProtectedMaterial"
  - Added Interface DetectTextProtectedMaterial200Response
  - Added Interface DetectTextProtectedMaterialResultOutput
  - Added Interface DocumentInjectionAnalysisResultOutput
  - Added Interface ShieldPrompt200Response
  - Added Interface ShieldPromptBodyParam
  - Added Interface ShieldPromptOptions
  - Added Interface ShieldPromptResultOutput
  - Added Interface TextProtectedMaterialAnalysisResultOutput
  - Added Interface UserPromptInjectionAnalysisResultOutput
  - Added Type Alias ShieldPromptParameters
  - Interface TextBlocklistItem has a new optional parameter isRegex
  - Interface TextBlocklistItemOutput has a new optional parameter isRegex
  - Added function overload "export function isUnexpected(response: ShieldPrompt200Response | ShieldPromptDefaultResponse): response is ShieldPromptDefaultResponse;"
  - Added function overload "export function isUnexpected(response: DetectTextProtectedMaterial200Response | DetectTextProtectedMaterialDefaultResponse): response is DetectTextProtectedMaterialDefaultResponse;"
    
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
