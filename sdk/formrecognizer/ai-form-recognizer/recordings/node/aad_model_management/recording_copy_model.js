let nock = require('nock');

module.exports.hash = "014c949602e7f255dd5b4b0acae0b8b5";

module.exports.testInfo = {"uniqueName":{"copySource":"copySource163337183967902573","copyTarget":"copyTarget163337184656409458"},"newDate":{}}

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
  'c52a7e33-e71a-4778-a5e9-6e8f30993000',
  'x-ms-ests-server',
  '2.1.12071.28 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnHnOArIsHZIvxcSqhZuNPM; expires=Wed, 03-Nov-2021 18:23:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfT923kExuiP_bYcdPDu8FcbPKv7K33OIFmgckTOaY29GSF5nXtBBV-18sWaBfqBozfqh7hkaEFd8ORXyD9bTkLEMjL0VihsuxxwTx4Jin_q39A5ouAYX4yVRCIgUILqlt0QWttA8ZP0ZNDgaBWtASpbAQGWMbN-P_LTUjPdFpvEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:23:58 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '65f4f240-7216-47c1-b2f6-6446a59b3b00',
  'x-ms-ests-server',
  '2.1.12071.28 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApGVR2r51fZNvLLBmU6NsvI; expires=Wed, 03-Nov-2021 18:23:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8TFKUxKn_MDq9Gej_NOYKEBuZds82-0YScUahyWHRFYDS_xnAR6NEEPQ3NZzfMWnxuUlzOMpfdTW-8alMv9ZsgR1wMCT-AMRWJBn4i1D-M5_SzFaxOzGrAextdSB_B4HrYkAgUE1VmickdYPcQ-quc3hz9bcNeSl8fsWLM9ytuggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:23:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=18ec404d-0d30-4fc4-a65e-22bee6c4edc4&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '4285420d-4c63-4f6f-92cf-601a794f3d00',
  'x-ms-ests-server',
  '2.1.12071.28 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhVwZeV72ARKjYc-a9HrcxSU1ubLAQAAAL497dgOAAAA; expires=Wed, 03-Nov-2021 18:23:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:23:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"copySource163337183967902573","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31532996160_d55f4028-9cba-453a-8188-3d132245f9ae?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '1207',
  'apim-request-id',
  'd55f4028-9cba-453a-8188-3d132245f9ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996160_d55f4028-9cba-453a-8188-3d132245f9ae')
  .query(true)
  .reply(200, {"operationId":"31532996160_d55f4028-9cba-453a-8188-3d132245f9ae","kind":"documentModelBuild","status":"running","createdDateTime":"2021-10-04T18:24:00Z","lastUpdatedDateTime":"2021-10-04T18:24:01Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copySource163337183967902573?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '6b6d30ca-0f66-44ff-a684-37209564769d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996160_d55f4028-9cba-453a-8188-3d132245f9ae')
  .query(true)
  .reply(200, {"operationId":"31532996160_d55f4028-9cba-453a-8188-3d132245f9ae","kind":"documentModelBuild","status":"running","createdDateTime":"2021-10-04T18:24:00Z","lastUpdatedDateTime":"2021-10-04T18:24:01Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copySource163337183967902573?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '647ff564-a922-484c-a5a6-e8c5e51a92bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996160_d55f4028-9cba-453a-8188-3d132245f9ae')
  .query(true)
  .reply(200, {"operationId":"31532996160_d55f4028-9cba-453a-8188-3d132245f9ae","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-10-04T18:24:00Z","lastUpdatedDateTime":"2021-10-04T18:24:02Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copySource163337183967902573?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"copySource163337183967902573":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copySource163337183967902573","createdDateTime":"2021-10-04T18:24:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'aa2544cd-bf63-4028-9678-4642a20af089',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:authorizeCopy', {"modelId":"copyTarget163337184656409458"})
  .query(true)
  .reply(200, {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","targetModelId":"copyTarget163337184656409458","targetModelLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337184656409458?api-version=2021-09-30-preview","accessToken":"accessToken","expirationDateTime":"2021-10-04T19:24:06Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'e1861d16-6f9a-4b26-b8b0-18874baba6b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/copySource163337183967902573:copyTo', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","targetModelId":"copyTarget163337184656409458","targetModelLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337184656409458?api-version=2021-09-30-preview","accessToken":"accessToken","expirationDateTime":"2021-10-04T19:24:06.000Z"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/operations/31532996153_6e818f6d-0e02-456f-bf4a-8ab25e8af86c?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  '6e818f6d-0e02-456f-bf4a-8ab25e8af86c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996153_6e818f6d-0e02-456f-bf4a-8ab25e8af86c')
  .query(true)
  .reply(200, {"operationId":"31532996153_6e818f6d-0e02-456f-bf4a-8ab25e8af86c","kind":"documentModelCopyTo","status":"running","createdDateTime":"2021-10-04T18:24:07Z","lastUpdatedDateTime":"2021-10-04T18:24:07Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337184656409458?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'acdb23f8-4281-4658-975a-4daab0c9bc7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996153_6e818f6d-0e02-456f-bf4a-8ab25e8af86c')
  .query(true)
  .reply(200, {"operationId":"31532996153_6e818f6d-0e02-456f-bf4a-8ab25e8af86c","kind":"documentModelCopyTo","status":"running","createdDateTime":"2021-10-04T18:24:07Z","lastUpdatedDateTime":"2021-10-04T18:24:07Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337184656409458?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6e4da834-cd2c-4df1-8e55-c7ddd403ec5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996153_6e818f6d-0e02-456f-bf4a-8ab25e8af86c')
  .query(true)
  .reply(200, {"operationId":"31532996153_6e818f6d-0e02-456f-bf4a-8ab25e8af86c","kind":"documentModelCopyTo","status":"succeeded","createdDateTime":"2021-10-04T18:24:07Z","lastUpdatedDateTime":"2021-10-04T18:24:07Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/copyTarget163337184656409458?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"copyTarget163337184656409458":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copyTarget163337184656409458","createdDateTime":"2021-10-04T18:24:02Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '4434a20f-6f03-4a24-87b2-2321e6239054',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/copyTarget163337184656409458')
  .query(true)
  .reply(200, {"docTypes":{"copyTarget163337184656409458":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"copyTarget163337184656409458","createdDateTime":"2021-10-04T18:24:02Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '364697aa-974e-43f1-9993-7cf77d824141',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:12 GMT'
]);
