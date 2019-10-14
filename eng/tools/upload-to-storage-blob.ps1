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

    $PublishedPkgs = Get-ChildItem "$($PipelineWorkspace)/packages" | Where-Object -FilterScript {$_.Name.EndsWith(".tgz")}
    $PublishedDocs = Get-ChildItem "$($PipelineWorkspace)/documentation" | Where-Object -FilterScript {$_.Name.EndsWith(".zip")}

    foreach ($Item in $PublishedDocs) {
        $PkgName = "azure-$($Item.BaseName)"
        Write-Host $PkgName
        $PkgFullName = $PublishedPkgs | Where-Object -FilterScript {$_.Name -match "$($PkgName)-\d"}
        Write-Host $PkgFullName
        if (($PkgFullName | Measure-Object).count -eq 1) 
        {
            $DocVersion = $PkgFullName[0].BaseName.Remove(0, $PkgName.Length + 1)
            Write-Host "Uploading Doc for $($PkgName) Version:- $($DocVersion)..."
            Expand-Archive -Path "$($PipelineWorkspace)/documentation/$($Item.Name)" -DestinationPath "$($PipelineWorkspace)/documentation/$($Item.BaseName)"
            Upload-Blobs -DocDir "$($PipelineWorkspace)/documentation/$($Item.BaseName)/$($Item.BaseName)/$($DocVersion)" -PkgName $PkgName -DocVersion $DocVersion -Language "javascript"
        }
        else
        {
            Write-Host "Package with the same name Exists. Upload Skipped"
            continue
        }
    }
}

Process-DocJS
