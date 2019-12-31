try{
  $cmdOutput=& npm audit 2>&1 | Out-String
  if($cmdOutput.contains('npm ERR! code ENOAUDIT')){
    $cmdOutput
    exit 0
  }
  else{
    npm audit
  }
 }
 catch{
  Write-Host "An error occurred:"
  Write-Host $_
 }
