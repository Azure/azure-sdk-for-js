let nock = require('nock');

module.exports.hash = "eb64dd72d88b975f89e675779f458bdb";

module.exports.testInfo = {"uniqueName":{"input1":"input1164375297070908728","input2":"input2164375297071001356","composedModelName":"composedModelName164375297951902160"},"newDate":{}}

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
  'fdfa5826-92b3-49f4-87ba-d1737e90f200',
  'x-ms-ests-server',
  '2.1.12381.24 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApXvWENZs6JCmQCLV5qJYQs; expires=Thu, 03-Mar-2022 22:02:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrD4uOh37vtWWSiv-l8qDVYeXMTZIYkqyFoGcz1p-GCP_6ls5uPAezaSVaRrUyMpuoel4KT1EhkrqbLO6sGR58W4cnoR93Cm9rMnx66cY8ivYke98W-7OhRt9_JCN1NZ4a_bs4I4XrlXJX46qc-0VPGgA5nOzDx8GQQlOZRNq_JSAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:02:50 GMT',
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
  '7b2c5336-e34a-4e98-adc3-152c8fd5b800',
  'x-ms-ests-server',
  '2.1.12381.24 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvAxP8QcuixLtT81SUe0EaU; expires=Thu, 03-Mar-2022 22:02:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevri_8_NUGfVX55X8vDrzo3DawztwkAm2rtUgABp6w53PdUKYYT7TuGhDEmgicmpFq-pnryWYgzjJP3zvSJKgUPW9PDqvA5hbML0krSoYqdjo3RdyqndF_h6v289dXDMMUgbYGUjmlH78vCdVOcTUM77PCUoDWBk8cGRYuz2wdvX_ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:02:50 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=27c40175-3ade-47f7-aa3e-f22e1cf788ab&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a1bdd81e-1bf7-43f4-99c7-a7c7ce03c300',
  'x-ms-ests-server',
  '2.1.12381.24 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtdHV_8CQHVAlEnRkwtKz7A; expires=Thu, 03-Mar-2022 22:02:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:02:50 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input2164375297071001356","buildMode":"template","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31522615029_b916f3cd-1701-418f-b90f-107e53b90759?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '2748',
  'apim-request-id',
  'b916f3cd-1701-418f-b90f-107e53b90759',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:02:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"input1164375297070908728","buildMode":"template","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31522615029_c4c2787e-1ae4-486c-8983-f60fea94ed82?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '3034',
  'apim-request-id',
  'c4c2787e-1ae4-486c-8983-f60fea94ed82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:02:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615029_b916f3cd-1701-418f-b90f-107e53b90759')
  .query(true)
  .reply(200, {"operationId":"31522615029_b916f3cd-1701-418f-b90f-107e53b90759","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2022-02-01T22:02:51Z","lastUpdatedDateTime":"2022-02-01T22:02:51Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2164375297071001356?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '7623833c-dc30-4201-9dfa-22e88e2921ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:02:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615029_c4c2787e-1ae4-486c-8983-f60fea94ed82')
  .query(true)
  .reply(200, {"operationId":"31522615029_c4c2787e-1ae4-486c-8983-f60fea94ed82","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2022-02-01T22:02:50Z","lastUpdatedDateTime":"2022-02-01T22:02:50Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1164375297070908728?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '603ad27a-437b-4d52-ba3e-8be69073c94c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:02:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615029_b916f3cd-1701-418f-b90f-107e53b90759')
  .query(true)
  .reply(200, {"operationId":"31522615029_b916f3cd-1701-418f-b90f-107e53b90759","kind":"documentModelBuild","status":"running","createdDateTime":"2022-02-01T22:02:51Z","lastUpdatedDateTime":"2022-02-01T22:02:53Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2164375297071001356?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '18d83fb1-3865-4c6e-aa36-6db31e015ca3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:02:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615029_c4c2787e-1ae4-486c-8983-f60fea94ed82')
  .query(true)
  .reply(200, {"operationId":"31522615029_c4c2787e-1ae4-486c-8983-f60fea94ed82","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2022-02-01T22:02:50Z","lastUpdatedDateTime":"2022-02-01T22:02:50Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1164375297070908728?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '0385389d-8df5-403b-bc7b-acac0ca2af37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:02:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615029_b916f3cd-1701-418f-b90f-107e53b90759')
  .query(true)
  .reply(200, {"operationId":"31522615029_b916f3cd-1701-418f-b90f-107e53b90759","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-02-01T22:02:51Z","lastUpdatedDateTime":"2022-02-01T22:02:56Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input2164375297071001356?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"input2164375297071001356":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input2164375297071001356","createdDateTime":"2022-02-01T22:02:56Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'd6f78e45-9eac-486c-bc99-2d51bbd541b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:02:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615029_c4c2787e-1ae4-486c-8983-f60fea94ed82')
  .query(true)
  .reply(200, {"operationId":"31522615029_c4c2787e-1ae4-486c-8983-f60fea94ed82","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-02-01T22:02:50Z","lastUpdatedDateTime":"2022-02-01T22:02:57Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/input1164375297070908728?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"input1164375297070908728":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"input1164375297070908728","createdDateTime":"2022-02-01T22:02:56Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '865b2bae-c9d4-46bc-b78c-c3a1abe9a149',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:02:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:compose', {"modelId":"composedModelName164375297951902160","componentModels":[{"modelId":"input1164375297070908728"},{"modelId":"input2164375297071001356"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31522615020_441a7dff-3e67-4466-b288-a5728d43bc16?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '736',
  'apim-request-id',
  '441a7dff-3e67-4466-b288-a5728d43bc16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615020_441a7dff-3e67-4466-b288-a5728d43bc16')
  .query(true)
  .reply(200, {"operationId":"31522615020_441a7dff-3e67-4466-b288-a5728d43bc16","kind":"documentModelCompose","status":"notStarted","createdDateTime":"2022-02-01T22:02:59Z","lastUpdatedDateTime":"2022-02-01T22:02:59Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName164375297951902160?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '719c9373-d9e2-433a-aeb4-c59ff8435417',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615020_441a7dff-3e67-4466-b288-a5728d43bc16')
  .query(true)
  .reply(200, {"operationId":"31522615020_441a7dff-3e67-4466-b288-a5728d43bc16","kind":"documentModelCompose","status":"running","createdDateTime":"2022-02-01T22:02:59Z","lastUpdatedDateTime":"2022-02-01T22:03:00Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName164375297951902160?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'e48d31b0-2168-4377-93e2-7931d4c1b0c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615020_441a7dff-3e67-4466-b288-a5728d43bc16')
  .query(true)
  .reply(200, {"operationId":"31522615020_441a7dff-3e67-4466-b288-a5728d43bc16","kind":"documentModelCompose","status":"succeeded","createdDateTime":"2022-02-01T22:02:59Z","lastUpdatedDateTime":"2022-02-01T22:03:01Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/composedModelName164375297951902160?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"input1164375297070908728":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}},"input2164375297071001356":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"composedModelName164375297951902160","createdDateTime":"2022-02-01T22:03:01Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'c9192dd2-e52a-4561-81a1-1cf207c0b12c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:05 GMT'
]);
