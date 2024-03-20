export REST_API_REPO="/Users/hoppe/work/msft/azure-rest-api-specs"
export AZURE_JS_SDK_REPO="/Users/hoppe/work/msft/azure-sdk-for-js"
export VERSION="2024-02-01.19.0"           # The Batch API version, e.g. "2022-01-05"

autorest --azure-arm \
  --input-file=${REST_API_REPO}/specification/batch/data-plane/Microsoft.Batch/stable/${VERSION}/BatchService.json \
  --output-folder=${AZURE_JS_SDK_REPO}/sdk/batch/batch \
  --typescript \
  --package-name=@azure/batch \
  --license-header=MICROSOFT_MIT_NO_VERSION \
  --payload-flattening-threshold=1 \
  --generate-metadata \
  --use="@microsoft.azure/autorest.typescript@4.7.0" --v2 --use-core-v2=false --typescript.azure-arm=true
