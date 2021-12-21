let nock = require('nock');

module.exports.hash = "61083d5ebd3871bf802b8843593506a5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '7ecc1bd0-d9b5-4967-95f8-4a44f93d0300',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ar3cWM5v2nJIgpaXgZpSwAE; expires=Sat, 08-Jan-2022 07:29:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpubpOsb-88mjKYB7b7-rZPSQqSApz4MgHdzXwFV4_JbBrw0PP_Yi8Vwsf5rCnui4op3hQ-yFYk5D5OelqRi4HHta6E4cElWicbxQI802SLfDhVtatKun_zGsIbzyrVGd4CRrtzVRDXNhUfKDBDaSgSF1OQPBqmYucOZxJ5DOaTsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 07:29:28 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '41c02d2e-ea5c-4c6b-b8a9-d86821240300',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmK78at1KbhDsbntXHaQpOc; expires=Sat, 08-Jan-2022 07:29:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGD9r15hjWJfLEAdyTbMhdwcBdK46zQ2wIFZZYSHZtEouPGwrCbWgjqQLKes8_RQW-36ZwdnLdTskYqckfLlrZrQNqxBpymxcWbT4BD7h8O7lv1Lo7XXgbMv93kycj-sko85CJor2Xck8y6ZzR2ny8TK3vZiUvbAxpsxZSqI1ohUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 07:29:28 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b74449c1-3ece-44be-a4d4-e93569f8d9ee&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8072c932-7798-47de-b5c9-945716c70200',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjcdXJPO5mBGgsK0G6gs2wsWPr5BAQAAAFmnQ9kOAAAA; expires=Sat, 08-Jan-2022 07:29:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 07:29:29 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/domains/mydomainxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/eastus/operationResults/459080F4-DAA3-4C95-AFAF-027154DC2973?api-version=2021-12-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Azure-AsyncOperation',
  'https://management.azure.com:443/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/eastus/operationsStatus/459080F4-DAA3-4C95-AFAF-027154DC2973?api-version=2021-12-01',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-request-id',
  '15716efb-4e0b-40cc-905d-a2a26cbca3f4',
  'x-ms-correlation-request-id',
  '15716efb-4e0b-40cc-905d-a2a26cbca3f4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T072931Z:15716efb-4e0b-40cc-905d-a2a26cbca3f4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 07:29:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/eastus/operationsStatus/459080F4-DAA3-4C95-AFAF-027154DC2973')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fcddb76d53cba7b77912db38b7c912fdb71f683759d8fa7d5e26eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff7eeaaae2e8b595e3777bf28a675d554e7edf8f492c07e5e17b3bb6535cd04589e35edbab95badf25a3e79dd66f860fffec39d839d67fbdb4f8f8fef6def9f3cbcbf7dfcecf8d9f6cede83ddfbfb4f4ff61e3eb8f77b64ab62fb92faa0f73edbdbd9dbdddedddbded9fd68f4d1325be434280172bebf3dcb3202322520d97976ae40665300a1d60d7749ed8fa76d71997ff4","4bfe1f6eb14f3a14010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '213ebb60-21db-48ae-8d0f-4580855fe751',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11986',
  'x-ms-correlation-request-id',
  '29644618-8881-4fc7-aa52-9f1d5b2e7c4f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T072931Z:29644618-8881-4fc7-aa52-9f1d5b2e7c4f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 07:29:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/eastus/operationsStatus/459080F4-DAA3-4C95-AFAF-027154DC2973')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fcddb76d53cba7b77912db38b7c912fdb71f683759d8fa7d5e26eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff7eeaaae2e8b595e3777bf28a675d554e7edf8f492c07e5e17b3bb6535cd04589e35edbab95badf25a3e79dd66f860fffec39d839d67fbdb4f8f8fef6def9f3cbcbf7dfcecf8d9f6cede83ddfbfb4f4ff61e3eb8f77b64ab62fb92faa0f73edbdbd9dbdddedddbded9fd68f4d1325be434280172bebf3dcb3202322520d97976ae40665300a1d60d7749ed5fafa7d33c9fe5b38f","7ec9ff03b83f0ef117010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '19d75998-dd39-43df-9f0a-ebbe59f50a68',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11985',
  'x-ms-correlation-request-id',
  '16e52603-3850-4d1e-b038-ddb0b55f4d82',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T072933Z:16e52603-3850-4d1e-b038-ddb0b55f4d82',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 07:29:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/domains')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bdefff","92ff0742ea40440c000000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2095878b-b52b-43c6-832a-1481593d978b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11984',
  'x-ms-correlation-request-id',
  '112257e1-da57-474b-a91f-1623e97aef13',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T072934Z:112257e1-da57-474b-a91f-1623e97aef13',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 07:29:33 GMT'
]);
