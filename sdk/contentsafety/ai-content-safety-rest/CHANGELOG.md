# Release History
    
## 1.1.0 (2025-04-29)
    
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
    
