fnm env --use-on-cd | Out-String | Invoke-Expression 
npm install -g @microsoft/rush@5.92.0
code-gen-pipeline --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.12 --typespecEmitter=@azure-tools/typespec-ts
