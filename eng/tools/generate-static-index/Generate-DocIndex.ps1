[CmdletBinding()]
Param (
    $RepoRoot
)

Write-Verbose "Name Reccuring paths with variable names"
$DocFxTool = "${RepoRoot}/docfx/docfx.exe"
$DocOutDir = "${RepoRoot}/docfx_project"
$DocToolsDir = "${RepoRoot}/eng/tools/generate-static-index"
$StaticFilesDir = "${DocToolsDir}/static-files"
$DocSiteDir = "${DocOutDir}/_site/"

Write-Verbose "Initializing Default DocFx Site..."
& "${DocFxTool}" init -q -o "${DocOutDir}"

Write-Verbose "Copying configuration..."
Copy-Item "${StaticFilesDir}/docfx.json" -Destination "${DocOutDir}/" -Force

Write-Verbose "Installing tool dependencies..."
pushd "${DocToolsDir}"
npm install
popd

Write-Verbose "Generate Index Toc..."
pushd "${RepoRoot}"
node "${DocToolsDir}\index.js"
popd


Write-Verbose "Update toc.yml and index..."
New-Item -Path "${DocOutDir}" -Name "toc.yml" -Force
Add-Content -Path "${DocOutDir}/toc.yml" -Value "- name: Azure SDK for JavaScript APIs`r`n  href: api/`r`n  homepage: api/index.md"
Copy-Item "${RepoRoot}/README.md" -Destination "${DocOutDir}/api/index.md" -Force

Write-Verbose "Build Doc Content..."
& "${DocFxTool}" build "${DocOutDir}/docfx.json"

Write-Verbose "Replace site assets..."
Copy-Item "${StaticFilesDir}/assets/*" -Destination "${DocSiteDir}" -Force
Get-Content "${StaticFilesDir}/main.js" |Out-File "${DocSiteDir}/styles/main.js"
Get-Content "${StaticFilesDir}/docfx.css" |Out-File "${DocSiteDir}/styles/docfx.css"
