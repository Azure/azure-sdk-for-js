let nock = require('nock');

module.exports.hash = "efe63fbb523fcf030074aa573e076058";

module.exports.testInfo = {"uniqueName":{"1":"modelName164375298596203582"},"newDate":{}}

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
  'a8dd723b-d998-4b9e-a123-65dbf7610600',
  'x-ms-ests-server',
  '2.1.12381.24 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsLdD5FfRppFqW1ovb2B7zU; expires=Thu, 03-Mar-2022 22:03:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXGrBEmic9Njwh2hVgAeP9VrCWnQka91pAw06-KbE2_b_rEPglGFx7jiegYOKKMteyeewDZMGEUOSdc3DSkimPZiYZaF-udKefLW4FutFRODIo_4sJxrb1hAg0iwUDZ9FW_GD1gtul6A5K7hF1LILc0afijvH35pz3rNULR7ZJUQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:03:05 GMT',
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
  'ed3bd156-e262-478e-98aa-3ecb1cced900',
  'x-ms-ests-server',
  '2.1.12381.24 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArZBQ7geTtZGlFfjIFda6FI; expires=Thu, 03-Mar-2022 22:03:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkqcKGpKmpGTssScwbjKAWln3HxmI22XQXDUGthFZPGJNALWa9vH4PQWr8J5KXWjIQDDU_XQOMxbNOW1ebcHTfE1xaH4IMb3HLCun02DleWPhMnN2MQfnJkSIcSG-EQvz9kDHNe7adA0edKNkUzqoKyG6LoQnuqtvfv4-d8sxB18gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:03:05 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=115f698d-09ff-4dff-b44c-ad59db76a921&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '01f44cc9-2428-423a-bc9d-b1482e68a000',
  'x-ms-ests-server',
  '2.1.12381.24 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmaFOHdNHPlHrAhQODub8GE; expires=Thu, 03-Mar-2022 22:03:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:03:05 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"modelName164375298596203582","buildMode":"template","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint/formrecognizer/operations/31522615014_10991909-7f24-48db-bfc9-dd3e4b44900b?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '3055',
  'apim-request-id',
  '10991909-7f24-48db-bfc9-dd3e4b44900b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615014_10991909-7f24-48db-bfc9-dd3e4b44900b')
  .query(true)
  .reply(200, {"operationId":"31522615014_10991909-7f24-48db-bfc9-dd3e4b44900b","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2022-02-01T22:03:06Z","lastUpdatedDateTime":"2022-02-01T22:03:06Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName164375298596203582?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '285',
  'apim-request-id',
  '2d9db6f7-cb7f-430e-89e5-4500d82bf863',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615014_10991909-7f24-48db-bfc9-dd3e4b44900b')
  .query(true)
  .reply(200, {"operationId":"31522615014_10991909-7f24-48db-bfc9-dd3e4b44900b","kind":"documentModelBuild","status":"running","createdDateTime":"2022-02-01T22:03:06Z","lastUpdatedDateTime":"2022-02-01T22:03:09Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName164375298596203582?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  '1022994c-9b7d-4d27-823e-3c689693a32a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31522615014_10991909-7f24-48db-bfc9-dd3e4b44900b')
  .query(true)
  .reply(200, {"operationId":"31522615014_10991909-7f24-48db-bfc9-dd3e4b44900b","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-02-01T22:03:06Z","lastUpdatedDateTime":"2022-02-01T22:03:12Z","resourceLocation":"https://endpoint/formrecognizer/documentModels/modelName164375298596203582?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"modelName164375298596203582":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"template","fieldConfidence":{"CompanyAddress":0.8,"CompanyName":0.95,"CompanyPhoneNumber":0.95,"DatedAs":0.95,"Email":0.8,"FullSignature":0.6,"Merchant":0.95,"PhoneNumber":0.95,"PurchaseOrderNumber":0.95,"Quantity":0.95,"Signature":0.95,"Subtotal":0.95,"Tax":0.95,"Total":0.95,"VendorName":0.95,"Website":0.95}}},"modelId":"modelName164375298596203582","createdDateTime":"2022-02-01T22:03:11Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'bd554011-d3f6-403f-aa79-9883191635f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:14 GMT'
]);
