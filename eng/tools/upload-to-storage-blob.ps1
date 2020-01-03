param (
  $BinariesDir,
  $PipelineWorkspace,
  $SASKey
)

function Upload-Blobs
{
    Param (
        [Parameter(Mandatory=$true)] [String]$DocDir,
        [Parameter(Mandatory=$true)] [String]$PkgName,
        [Parameter(Mandatory=$true)] [String]$DocVersion,
        [Parameter(Mandatory=$true)] [String]$Language
    )
    
    $AzCopy = "$($BinariesDir)/AzCopy/azcopy_windows_amd64_10.3.0/azcopy.exe"
    $DocDest = "https://azuresdkdocsdev.blob.core.windows.net/`$web/$($Language)"

    New-Item "$($BinariesDir)/versionplaceholder.txt" -Force
    Write-Host "DocDest $($DocDest)"
    Write-Host "PkgName $($PkgName)"
    Write-Host "DocVersion $($DocVersion)"
    Write-Host "DocDir $($DocDir)"
    Write-Host "Final Dest $($DocDest)/$($PkgName)/$($DocVersion)"
    Write-Host "Uploading $($PkgName)/$($DocVersion) to $($DocDest)..."
    & $($AzCopy) cp "$($DocDir)/**" "$($DocDest)/$($PkgName)/$($DocVersion)/$($SASKey)" --recursive=true

    Write-Host "Uploading versionplaceholder $($DocDest)/$($PkgName)/versions/$($DocVersion)"
    & $($AzCopy) cp "$($BinariesDir)/versionplaceholder.txt" "$($DocDest)/$($PkgName)/versions/$($DocVersion)$($SASKey)" --recursive=true
}

function Process-DocJS
{
    Write-Host "In function Process-DocJS $($PipelineWorkspace)"

    #$PublishedPkgs = Get-ChildItem "$($PipelineWorkspace)/packages" | Where-Object -FilterScript {$_.Name.EndsWith(".tgz")}
    $PublishedDocs = Get-ChildItem "$($PipelineWorkspace)/documentation" | Where-Object -FilterScript {$_.Name.EndsWith(".zip")}

    foreach ($Item in $PublishedDocs) {
        $PkgName = "azure-$($Item.BaseName)"
        Write-Host $PkgName
        Expand-Archive -Path "$($PipelineWorkspace)/documentation/$($Item.Name)" -DestinationPath "$($PipelineWorkspace)/documentation/$($Item.BaseName)"
        $dirList = Get-ChildItem "$($PipelineWorkspace)/documentation/$($Item.BaseName)/$($Item.BaseName)" -Attributes Directory
        if($dirList.Length -eq 1){
          $DocVersion = $dirList[0].Name
          Write-Host "Uploading Doc for $($PkgName) Version:- $($DocVersion)..."
          Upload-Blobs -DocDir "$($PipelineWorkspace)/documentation/$($Item.BaseName)/$($Item.BaseName)/$($DocVersion)" -PkgName $PkgName -DocVersion $DocVersion -Language "javascript"
        }
        else{
            Write-Host "found more than 1 folder under the documentation for package - $($Item.Name)"
        }
    }
}

Process-DocJS
