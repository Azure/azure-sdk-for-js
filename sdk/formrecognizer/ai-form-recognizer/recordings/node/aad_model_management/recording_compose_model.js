let nock = require('nock');

module.exports.hash = "9f4661f53a67579b7f3f5c54df73ccc1";

module.exports.testInfo = {"uniqueName":{"input1":"input1163337183083404470","input2":"input2163337183083602943","composedModelName":"composedModelName163337183914902643"},"newDate":{}}

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
  '92bc8501-79c4-4dda-b3b3-e48d7c972d00',
  'x-ms-ests-server',
  '2.1.12071.28 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiX2Hb5bCwlJvgM0qFQdm3c; expires=Wed, 03-Nov-2021 18:23:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVII-1lkYPGjFisrM2zLIyEPpiY5Ap-pn-NICpLqztLkWPVKk6o4HG8N5y75x3pLWGKNFi5sWG3Wa-uJC_fpHGj2tUmFXkvZEW19yxNkFPXGJ6eOAFDgKtFT-GXYfvmpK7pqxtnqqzWUe7xGKBXltCLiRz2hieS58C1Kt2aovyYogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:23:50 GMT',
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
  'f1328a9d-28ff-4120-837a-319299675a00',
  'x-ms-ests-server',
  '2.1.12071.28 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Alnkr74L8vVHjwbsqN5jI-E; expires=Wed, 03-Nov-2021 18:23:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevra15gphuYk7I9aPovqbJlWvLWICrU16vOJGNgsb4Tnp3-N24fwrlyt49kwQbPA5Loac-QU2GprlI_QBEIkcli4r_NgTwWZut3RJs7__Rlmb57-gIuuTdgh7d8oNxA84e9FDvqXK29fLkK_xPEANuHyOsIQMZx94w-YgeusM7HLyMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:23:50 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=705b8c04-8a34-491d-b3c0-b43d628d56cf&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'c065e29f-11f8-4491-9f9e-442445d55700',
  'x-ms-ests-server',
  '2.1.12071.28 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvPas6s74g1MsFV65CeZAMyU1ubLAQAAALY97dgOAAAA; expires=Wed, 03-Nov-2021 18:23:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:23:50 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input1163337183083404470","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31532996169_96c1ef7a-4cf5-410e-980c-48bd8a8e1742?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '1257',
  'apim-request-id',
  '96c1ef7a-4cf5-410e-980c-48bd8a8e1742',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996169_96c1ef7a-4cf5-410e-980c-48bd8a8e1742')
  .query(true)
  .reply(200, {"operationId":"31532996169_96c1ef7a-4cf5-410e-980c-48bd8a8e1742","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-10-04T18:23:51Z","lastUpdatedDateTime":"2021-10-04T18:23:51Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1163337183083404470?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'fa0be06f-5712-4a0f-8d20-ccfbe037e76a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996169_96c1ef7a-4cf5-410e-980c-48bd8a8e1742')
  .query(true)
  .reply(200, {"operationId":"31532996169_96c1ef7a-4cf5-410e-980c-48bd8a8e1742","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2021-10-04T18:23:51Z","lastUpdatedDateTime":"2021-10-04T18:23:51Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1163337183083404470?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '45f8da08-e34b-474c-b5d8-47dfacec329f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input2163337183083602943","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31532996168_533ba371-a916-43d9-8b92-9ac398826fc6?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '1318',
  'apim-request-id',
  '533ba371-a916-43d9-8b92-9ac398826fc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996168_533ba371-a916-43d9-8b92-9ac398826fc6')
  .query(true)
  .reply(200, {"operationId":"31532996168_533ba371-a916-43d9-8b92-9ac398826fc6","kind":"documentModelBuild","status":"running","createdDateTime":"2021-10-04T18:23:51Z","lastUpdatedDateTime":"2021-10-04T18:23:53Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2163337183083602943?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'b93c8635-8355-4691-bfa8-0f630431e2e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996168_533ba371-a916-43d9-8b92-9ac398826fc6')
  .query(true)
  .reply(200, {"operationId":"31532996168_533ba371-a916-43d9-8b92-9ac398826fc6","kind":"documentModelBuild","status":"running","createdDateTime":"2021-10-04T18:23:51Z","lastUpdatedDateTime":"2021-10-04T18:23:53Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2163337183083602943?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'c0fafc16-06e1-46f6-95c4-099061a3a134',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996169_96c1ef7a-4cf5-410e-980c-48bd8a8e1742')
  .query(true)
  .reply(200, {"operationId":"31532996169_96c1ef7a-4cf5-410e-980c-48bd8a8e1742","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-10-04T18:23:51Z","lastUpdatedDateTime":"2021-10-04T18:23:53Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1163337183083404470?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"input1163337183083404470":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input1163337183083404470","createdDateTime":"2021-10-04T18:23:53Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '01948930-d7be-4e8f-baf7-d4d4641014fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996168_533ba371-a916-43d9-8b92-9ac398826fc6')
  .query(true)
  .reply(200, {"operationId":"31532996168_533ba371-a916-43d9-8b92-9ac398826fc6","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2021-10-04T18:23:51Z","lastUpdatedDateTime":"2021-10-04T18:23:54Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2163337183083602943?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"input2163337183083602943":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input2163337183083602943","createdDateTime":"2021-10-04T18:23:54Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '6af458c5-453b-4aa4-827b-5a6a08fbc261',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:compose', {"modelId":"composedModelName163337183914902643","componentModels":[{"modelId":"input1163337183083404470"},{"modelId":"input2163337183083602943"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31532996161_12aa538b-dca8-4959-a790-c0a1c1b3394e?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '12aa538b-dca8-4959-a790-c0a1c1b3394e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996161_12aa538b-dca8-4959-a790-c0a1c1b3394e')
  .query(true)
  .reply(200, {"operationId":"31532996161_12aa538b-dca8-4959-a790-c0a1c1b3394e","kind":"documentModelCompose","status":"running","createdDateTime":"2021-10-04T18:23:59Z","lastUpdatedDateTime":"2021-10-04T18:23:59Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName163337183914902643?api-version=2021-09-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e5fbd81b-55db-4b67-aa0b-75c3307e0698',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31532996161_12aa538b-dca8-4959-a790-c0a1c1b3394e')
  .query(true)
  .reply(200, {"operationId":"31532996161_12aa538b-dca8-4959-a790-c0a1c1b3394e","kind":"documentModelCompose","status":"succeeded","createdDateTime":"2021-10-04T18:23:59Z","lastUpdatedDateTime":"2021-10-04T18:23:59Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName163337183914902643?api-version=2021-09-30-preview","percentCompleted":100,"result":{"docTypes":{"input1163337183083404470":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}},"input2163337183083602943":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"}},"fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.6,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"composedModelName163337183914902643","createdDateTime":"2021-10-04T18:23:59Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '728b7223-794a-4ebc-a530-b1ca17a4dfa1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:23:58 GMT'
]);
