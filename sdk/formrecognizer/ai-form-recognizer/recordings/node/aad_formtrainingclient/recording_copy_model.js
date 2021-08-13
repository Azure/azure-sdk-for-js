let nock = require('nock');

module.exports.hash = "1ef7d98db6b23acd5f9d90b562e05065";

module.exports.testInfo = {"uniqueName":{"copyModelName":"copyModelName162196555938806327"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '89ce1186-0a76-4763-af43-75b1d66d6c00',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLAQAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 17:59:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYmtERKtaUB-_k_DOkTq4uddwUpyNuwe7X82PvM3YYMIkHFZWt1RViWKjdTazrzmtfsUitX-4-cbSvVvEW0To82bHaJfy-ZPMu8FGOq_a0zkemHafcAFDaKblFnHtpltjj2IURUtk3-mIgFmWyiXvWm8-kATOQT7m--LOVETNoRAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 17:59:18 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'fdd62c35-b239-4a12-b747-23c6d8002400',
  'x-ms-ests-server',
  '2.1.11774.11 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLAQAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 17:59:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0YfCn8aW6w447xSVnOLVEkhLbeVLku-z5Bq8cQb08AhHjAYrUXZjT-hWK1mUAhORlVtQoiIpqZz0IwxEG1rA7SPreeKeHMrPm8LWmfKWVjbkJRKODlzM5nDVKYufxBXISL6xjfeCJWyaQ5tnglSvZejQaRfJlkC3rJ5RHd9AvzQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 17:59:18 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=0bf8a80a-8a9b-45fc-813d-02c3718e8c80&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '845fddfa-321f-405f-8f05-9aee68ad1e00',
  'x-ms-ests-server',
  '2.1.11774.11 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLAgAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 17:59:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 17:59:19 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{},"useLabelFile":true,"modelName":"copyModelName162196555938806327"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  'd926f33f-4dae-4899-a3d7-53cc14ff1956',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32","modelName":"copyModelName162196555938806327","status":"creating","createdDateTime":"2021-05-25T17:59:19Z","lastUpdatedDateTime":"2021-05-25T17:59:19Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '21315630-4fed-43ba-9962-8439ecbafee2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32","modelName":"copyModelName162196555938806327","status":"creating","createdDateTime":"2021-05-25T17:59:19Z","lastUpdatedDateTime":"2021-05-25T17:59:19Z"}}, [
  'Content-Length',
  '216',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '35a9a8db-679f-4028-9685-f014899123c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32","modelName":"copyModelName162196555938806327","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-25T17:59:19Z","lastUpdatedDateTime":"2021-05-25T17:59:22Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '3c20d896-d1d4-44c8-9070-3edfba660a12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"cf3fa189-69e2-4211-8f57-aa39dde781f9","accessToken":"accessToken","expirationDateTimeTicks":1622051965}, [
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/cf3fa189-69e2-4211-8f57-aa39dde781f9',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '76cb5c6a-bfd8-4f34-be06-2dd9f62e3a9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"cf3fa189-69e2-4211-8f57-aa39dde781f9","accessToken":"accessToken","expirationDateTimeTicks":1622051965}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32/copyresults/f5e6ce35-ebce-469e-9d04-19f5f2e60f3c',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '9bffc760-abda-42e1-b915-46a0f42526d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32/copyResults/f5e6ce35-ebce-469e-9d04-19f5f2e60f3c')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T17:59:25Z","lastUpdatedDateTime":"2021-05-25T17:59:25Z","copyResult":{"modelId":"cf3fa189-69e2-4211-8f57-aa39dde781f9"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'ab3cb904-9ddb-4dec-9ef3-b498b689c051',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32/copyResults/f5e6ce35-ebce-469e-9d04-19f5f2e60f3c')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T17:59:25Z","lastUpdatedDateTime":"2021-05-25T17:59:25Z","copyResult":{"modelId":"cf3fa189-69e2-4211-8f57-aa39dde781f9"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'a7a75c2c-32f5-49a4-b16c-1d9b0a98e2a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32/copyResults/f5e6ce35-ebce-469e-9d04-19f5f2e60f3c')
  .reply(200, {"status":"notStarted","createdDateTime":"2021-05-25T17:59:25Z","lastUpdatedDateTime":"2021-05-25T17:59:25Z","copyResult":{"modelId":"cf3fa189-69e2-4211-8f57-aa39dde781f9"}}, [
  'Content-Length',
  '173',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '43de5e7a-f394-4b94-a994-141359be9a4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/a7b9db4e-96ec-4cfc-8eaf-aaae1e150b32/copyResults/f5e6ce35-ebce-469e-9d04-19f5f2e60f3c')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-05-25T17:59:31.644346Z","lastUpdatedDateTime":"2021-05-25T17:59:31.6443464Z","copyResult":{"modelId":"cf3fa189-69e2-4211-8f57-aa39dde781f9"}}, [
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '68768911-0f9b-49b7-b81e-240c5645bd15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/cf3fa189-69e2-4211-8f57-aa39dde781f9')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"cf3fa189-69e2-4211-8f57-aa39dde781f9","modelName":"copyModelName162196555938806327","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-25T17:59:19Z","lastUpdatedDateTime":"2021-05-25T17:59:22Z"},"trainResult":{"averageModelAccuracy":0.96,"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"status":"succeeded"}],"fields":[{"fieldName":"CompanyAddress","accuracy":0.8},{"fieldName":"CompanyName","accuracy":0.995},{"fieldName":"CompanyPhoneNumber","accuracy":0.995},{"fieldName":"DatedAs","accuracy":0.995},{"fieldName":"Email","accuracy":0.8},{"fieldName":"Merchant","accuracy":0.995},{"fieldName":"PhoneNumber","accuracy":0.995},{"fieldName":"PurchaseOrderNumber","accuracy":0.995},{"fieldName":"Quantity","accuracy":0.995},{"fieldName":"Signature","accuracy":0.8},{"fieldName":"Subtotal","accuracy":0.995},{"fieldName":"Tax","accuracy":0.995},{"fieldName":"Total","accuracy":0.995},{"fieldName":"VendorName","accuracy":0.995},{"fieldName":"Website","accuracy":0.995}],"errors":[]}}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'dff2fdb7-bf7c-46f1-bac5-a71d61d093c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 17:59:36 GMT'
]);
