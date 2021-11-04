let nock = require('nock');

module.exports.hash = "934f81b6571a11423cb9330f12b9dbb2";

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
  '79b3383b-f642-422a-8691-6e3912660500',
  'x-ms-ests-server',
  '2.1.12171.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ag4M5wLUVXtCufzxfeJmT4I; expires=Sun, 28-Nov-2021 07:22:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFNUApCBLRQYH2KYYA708hNZEF1iTI5zunU3XQeFn2UqMGJzyQnZ9g_2H8KWaqMP1nCcUIJic7mUsWTwj5_y8jBF08azBADNGmuGrm3LBEu2wX60djuKeT_dMKCaxFMVEzaDlasqW2dxSSqrGaw-mwwpJrVQsrMi5dz35x6dgqysgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 07:22:55 GMT',
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
  '875d4206-a690-4280-8be9-393a6b880300',
  'x-ms-ests-server',
  '2.1.12171.15 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AkKyBJBV9n9Ir-bv43L3A-k; expires=Sun, 28-Nov-2021 07:22:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGzo8iXlQDBDYwwTcWoogrLSt-kuQwQSQcr16eh275I1EsZFXh1Un_Ps7sfPAz8bPXOtNsoDn8KpEVGOEbnjb-4PJHTjS-G6lMZ4qQQJxZ2IaJb27sGbhkMapG-MdPDgzarGN12k6c9RzbHlMDEL3UXVPGj1TlVfQr2YmR5OVt5AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 07:22:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5af24810-3411-43f9-8726-4e6b23be451d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '875d4206-a690-4280-8be9-393a6c880300',
  'x-ms-ests-server',
  '2.1.12171.15 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsQDOdoJdsxDsWDlwdTsvy0WPr5BAQAAAE-YDdkOAAAA; expires=Sun, 28-Nov-2021 07:22:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 07:22:55 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/workspaces/myworkspacexx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:cefeb1ba-fe43-4441-b837-59d63e43525f',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-correlation-request-id',
  '5af5d751-1b96-4c9f-bfd0-6685c3c3ec61',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072257Z:5af5d751-1b96-4c9f-bfd0-6685c3c3ec61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c6c3b395-b252-4cb4-bd64-ff4afde389a5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11545',
  'x-ms-correlation-request-id',
  '6a643453-7995-40ea-8de6-571b591dd1ab',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072257Z:6a643453-7995-40ea-8de6-571b591dd1ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:413aacb7-e8f1-47a6-86b7-6392a80742cd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11544',
  'x-ms-correlation-request-id',
  'e7ff9b13-268b-484d-b5e2-d6f761bca886',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072258Z:e7ff9b13-268b-484d-b5e2-d6f761bca886',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:08674e39-0e9b-4c3b-9a63-95e8faa79312',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11543',
  'x-ms-correlation-request-id',
  '22984398-081e-436f-a234-ca962f57a252',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072258Z:22984398-081e-436f-a234-ca962f57a252',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:32668cf0-c713-4647-b750-999b185de126',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11542',
  'x-ms-correlation-request-id',
  'acbbfcc7-d810-4ef2-ab97-133f13df8c49',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072258Z:acbbfcc7-d810-4ef2-ab97-133f13df8c49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2d474595-43bf-46b2-808f-0345be5238e9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11541',
  'x-ms-correlation-request-id',
  'b36949c4-9c2a-4ed3-a011-f5e9d8c430d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072258Z:b36949c4-9c2a-4ed3-a011-f5e9d8c430d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e4ad3160-5787-4179-818b-2ad70a1e529a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11540',
  'x-ms-correlation-request-id',
  'd8e2fe72-f19d-4166-b914-e2b935493dd7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072259Z:d8e2fe72-f19d-4166-b914-e2b935493dd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:81020db5-eb1a-45f8-b61d-b83cd5cf722e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11539',
  'x-ms-correlation-request-id',
  'e14df84d-f6b7-426f-a318-b463a8b8f830',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072259Z:e14df84d-f6b7-426f-a318-b463a8b8f830',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:91c86fbd-2741-44af-94ba-86663b39bb95',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11538',
  'x-ms-correlation-request-id',
  'c04d6a58-26ea-48b2-88fc-855fa641e1a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072259Z:c04d6a58-26ea-48b2-88fc-855fa641e1a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a8d04e94-b854-44bf-a846-1a8f0424f0c9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11537',
  'x-ms-correlation-request-id',
  '1c8a9c44-bed4-47dc-85ff-ee66bc766008',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072300Z:1c8a9c44-bed4-47dc-85ff-ee66bc766008',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5cef4553-a5e0-4b4e-9193-45cfa9a85825',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11536',
  'x-ms-correlation-request-id',
  'c8cacca4-3a11-4f60-ad88-63d38909b1df',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072300Z:c8cacca4-3a11-4f60-ad88-63d38909b1df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9f141288-d88d-46b6-ad3e-e105d98f2ffa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11535',
  'x-ms-correlation-request-id',
  'f2d03673-c084-4896-aa89-698370c420ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072300Z:f2d03673-c084-4896-aa89-698370c420ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8f47ab9f-8ad0-4e76-a231-7eba398c1f1d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11534',
  'x-ms-correlation-request-id',
  '32249c57-7fda-4446-9a2f-6c2cae9d8401',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072301Z:32249c57-7fda-4446-9a2f-6c2cae9d8401',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:62d7297b-53f4-4fca-a572-c0442a7a3c77',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11533',
  'x-ms-correlation-request-id',
  '60c08532-59ed-471a-94de-0a61a78542b0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072301Z:60c08532-59ed-471a-94de-0a61a78542b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:98eddf5e-e649-4762-b641-a53d5837949f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11532',
  'x-ms-correlation-request-id',
  '4dd099c4-5cf6-405d-a46c-7573296f3c85',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072301Z:4dd099c4-5cf6-405d-a46c-7573296f3c85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b8d83972-4132-4497-920a-0a091f2d8e4f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11531',
  'x-ms-correlation-request-id',
  '21896410-cf0a-4c49-8292-f8c43625e8ea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072301Z:21896410-cf0a-4c49-8292-f8c43625e8ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:80d0b546-84ec-4461-9890-edd257841f74',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11530',
  'x-ms-correlation-request-id',
  '1d3f9a28-d09c-4435-a9ff-70cd9e70a8e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072302Z:1d3f9a28-d09c-4435-a9ff-70cd9e70a8e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:badc447a-ba8e-4424-bab3-848b01b631c5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11529',
  'x-ms-correlation-request-id',
  '7ae89030-d609-48b2-b465-33c350c8a72a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072302Z:7ae89030-d609-48b2-b465-33c350c8a72a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:91ccd283-4128-4249-9991-c2ddd6e11202',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11528',
  'x-ms-correlation-request-id',
  '178b1de6-382b-403f-8a52-5cd3b54983eb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072302Z:178b1de6-382b-403f-8a52-5cd3b54983eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:56eaf240-6b42-4695-aff5-523fbc49cbd6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11527',
  'x-ms-correlation-request-id',
  '755eff98-dc4b-40dc-9edc-e16b8be64a5d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072303Z:755eff98-dc4b-40dc-9edc-e16b8be64a5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:caba565c-e24c-43c4-a542-d56a1566cf5b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11526',
  'x-ms-correlation-request-id',
  '9adb2c67-5f5e-4295-936f-54696d4cf575',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072303Z:9adb2c67-5f5e-4295-936f-54696d4cf575',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3a1e9dfe-f538-41e4-b252-788fa0cc9bc8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11525',
  'x-ms-correlation-request-id',
  'be703187-4e47-4f73-b3c4-3f7063b3d3bb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072303Z:be703187-4e47-4f73-b3c4-3f7063b3d3bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f11c7aed-55a8-4e7a-9e39-aaa018e2d471',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11524',
  'x-ms-correlation-request-id',
  'f51de694-1393-42a0-977b-527220628d89',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072304Z:f51de694-1393-42a0-977b-527220628d89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7030ca9c-2298-47fb-a3a7-bfa6a2766516',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11523',
  'x-ms-correlation-request-id',
  '2f2b233d-9c04-41fe-9d5f-b3efb5771cd3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072304Z:2f2b233d-9c04-41fe-9d5f-b3efb5771cd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:75980a36-6209-4e33-b922-d4e369111940',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11522',
  'x-ms-correlation-request-id',
  'b7e7955f-61f8-4b2d-989c-447eb9aae37c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072304Z:b7e7955f-61f8-4b2d-989c-447eb9aae37c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c7b1f089-8464-4460-b84f-1256c8156d6b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11521',
  'x-ms-correlation-request-id',
  'a8559107-1f2b-4ce0-8628-d7c69452c1bd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072304Z:a8559107-1f2b-4ce0-8628-d7c69452c1bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1a771928-8da9-4aca-9c7c-0958d6d8d261',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11520',
  'x-ms-correlation-request-id',
  'cd731d65-4100-407a-8c67-1e8e2ad54e80',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072305Z:cd731d65-4100-407a-8c67-1e8e2ad54e80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e76c8f33-7583-429e-97e3-97b1220c6ed7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11519',
  'x-ms-correlation-request-id',
  'f57c4436-d630-481b-8d27-6375ac223783',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072305Z:f57c4436-d630-481b-8d27-6375ac223783',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e8ce25c3-0a15-44b8-a8f5-6ff8a37d794b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11518',
  'x-ms-correlation-request-id',
  '8bd2fda6-1126-4df5-a1cb-cc0f276c8787',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072305Z:8bd2fda6-1126-4df5-a1cb-cc0f276c8787',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f2b25627-95d4-4efa-9d21-48492f9e57bc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11517',
  'x-ms-correlation-request-id',
  'f337c5cd-9cef-4935-b606-7cf25e327bf3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072306Z:f337c5cd-9cef-4935-b606-7cf25e327bf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:160132fe-4664-417d-a9ee-7681fee8b99d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11516',
  'x-ms-correlation-request-id',
  'cc5f6e31-08c4-443f-99eb-7f0c2b5f8f2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072306Z:cc5f6e31-08c4-443f-99eb-7f0c2b5f8f2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ccd6eceb-46c9-4b30-8646-17c9b77fd85a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11515',
  'x-ms-correlation-request-id',
  '81454214-6429-4341-a4c7-6b7860680f30',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072306Z:81454214-6429-4341-a4c7-6b7860680f30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9ef9b4a9-386d-49f0-8a4e-badf22bbb1c3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11514',
  'x-ms-correlation-request-id',
  '148079d7-9f28-420d-9198-ae2d11d972db',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072306Z:148079d7-9f28-420d-9198-ae2d11d972db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:071c8ffc-2716-40f1-9a92-14594eda007f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11513',
  'x-ms-correlation-request-id',
  '0f6af07c-6664-4ef6-beaf-f979f29f0af2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072307Z:0f6af07c-6664-4ef6-beaf-f979f29f0af2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:43f6caea-313d-463c-8c8a-f3fc297d3cc2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11512',
  'x-ms-correlation-request-id',
  'be37c241-9662-4340-aff5-b76fa3740e59',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072307Z:be37c241-9662-4340-aff5-b76fa3740e59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:10ec6282-6f79-4732-bfb3-da0304ed0781',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11511',
  'x-ms-correlation-request-id',
  'f321831a-4a29-4462-a30d-93dc000db57e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072307Z:f321831a-4a29-4462-a30d-93dc000db57e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3f85ff13-f533-4a91-b579-fa6ebea9c688',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11510',
  'x-ms-correlation-request-id',
  'bd1a1414-7d9f-43cd-8f1a-9abb12177eb4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072308Z:bd1a1414-7d9f-43cd-8f1a-9abb12177eb4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e12a7ad8-8620-47ff-913c-fd602c093ae2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11509',
  'x-ms-correlation-request-id',
  '5c1a900f-247d-400d-8745-be789f9f11c3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072308Z:5c1a900f-247d-400d-8745-be789f9f11c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f9507f23-dd8f-4cf2-b455-e54647de21db',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11508',
  'x-ms-correlation-request-id',
  'd5ece962-b7c8-4452-a3b8-f52537d8f4ee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072308Z:d5ece962-b7c8-4452-a3b8-f52537d8f4ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dcf3cd95-3562-4ec7-b620-8dd6d14c7c4d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11507',
  'x-ms-correlation-request-id',
  'a0468e70-d48c-442e-8553-31ec084bad4f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072308Z:a0468e70-d48c-442e-8553-31ec084bad4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:22d5f96f-ba34-4344-8199-63940fa1efd1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11506',
  'x-ms-correlation-request-id',
  '2cf49a69-3a43-4d02-a742-868bf39d048e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072309Z:2cf49a69-3a43-4d02-a742-868bf39d048e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4fc21144-9eb4-4ff7-8f26-47baf912c869',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11505',
  'x-ms-correlation-request-id',
  'cfc22baa-819c-435d-8258-11831a50e84a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072309Z:cfc22baa-819c-435d-8258-11831a50e84a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:939e5b66-7f5e-4bf8-b518-18e0561a2cac',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11504',
  'x-ms-correlation-request-id',
  '6905c1bf-9591-4502-8aae-f85c5b5305e4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072309Z:6905c1bf-9591-4502-8aae-f85c5b5305e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b16bc821-0cfc-49b1-9aab-c4c9534b5ce1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11503',
  'x-ms-correlation-request-id',
  '6eab7d51-ca37-48d7-b677-90acf91b6e5a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072310Z:6eab7d51-ca37-48d7-b677-90acf91b6e5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9f86f9a6-95f4-4d68-89ce-c1403417498c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11502',
  'x-ms-correlation-request-id',
  '547a3de6-a1b8-49b7-aab5-ffdf2fde8cf4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072310Z:547a3de6-a1b8-49b7-aab5-ffdf2fde8cf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3c8366ec-2159-42eb-b4ab-70b3e6556882',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11501',
  'x-ms-correlation-request-id',
  'b635f113-6081-46ba-a050-4cbcb131def3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072310Z:b635f113-6081-46ba-a050-4cbcb131def3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2b17fbee-efae-4631-9a60-005ce2b0ff14',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11500',
  'x-ms-correlation-request-id',
  '1e0ca35a-db49-49bb-bc63-9e1a309c7185',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072311Z:1e0ca35a-db49-49bb-bc63-9e1a309c7185',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2603b04c-2ea1-44b9-801d-a0126e094686',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11499',
  'x-ms-correlation-request-id',
  '8726995a-08ac-48a8-8046-876a097a9258',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072311Z:8726995a-08ac-48a8-8046-876a097a9258',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:52169e18-e335-456f-9855-b973ad04380d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11498',
  'x-ms-correlation-request-id',
  '4260b08a-91ca-40bc-9e29-0c04133b63bc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072311Z:4260b08a-91ca-40bc-9e29-0c04133b63bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3b241573-3039-4783-85b7-111e20ef5cbd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11497',
  'x-ms-correlation-request-id',
  '3f80933e-80b9-454b-b814-a096da5d504c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072311Z:3f80933e-80b9-454b-b814-a096da5d504c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7cd7d42e-fae9-46df-aaf1-1edc4ddd28e3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11496',
  'x-ms-correlation-request-id',
  '711b2afa-9304-42a4-add8-eef5dd1271ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072312Z:711b2afa-9304-42a4-add8-eef5dd1271ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:54c18a17-3f7f-485c-9efb-29f8e6dcd6e3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11495',
  'x-ms-correlation-request-id',
  'ae2b7511-5184-4eed-a733-fdffaf18a61f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072312Z:ae2b7511-5184-4eed-a733-fdffaf18a61f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:90ea4868-10de-4fc1-8f1d-b0f9f18a0de7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11494',
  'x-ms-correlation-request-id',
  'd3219180-a3b9-412b-8d02-a01c5353364f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072312Z:d3219180-a3b9-412b-8d02-a01c5353364f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6ee2b5e9-7839-4b59-9153-8eacc477f917',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11493',
  'x-ms-correlation-request-id',
  'e6cc9138-90e1-4baa-b9e2-3d2ffe9eb0a2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072313Z:e6cc9138-90e1-4baa-b9e2-3d2ffe9eb0a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:50cc4970-f741-488f-a8b0-c4a382029b87',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11492',
  'x-ms-correlation-request-id',
  '5f438ab1-c872-4ad1-9d84-b12fff7916ef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072313Z:5f438ab1-c872-4ad1-9d84-b12fff7916ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2709ff01-e80a-48ac-bc2b-46c0b44176ec',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11491',
  'x-ms-correlation-request-id',
  '994da9bd-a292-49f5-8b62-efa1c1469728',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072313Z:994da9bd-a292-49f5-8b62-efa1c1469728',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dcde2e33-4b93-4eb6-b2aa-87e29a03a8e2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11490',
  'x-ms-correlation-request-id',
  '53c963b2-fffa-4221-b9e9-feec8b644163',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072314Z:53c963b2-fffa-4221-b9e9-feec8b644163',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:508d462e-6944-46db-9906-8f2389ffc240',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11489',
  'x-ms-correlation-request-id',
  '76cc8b4d-e82a-480a-b7ce-88e28a223543',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072314Z:76cc8b4d-e82a-480a-b7ce-88e28a223543',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c0b0fc37-be77-4ef5-8b41-61e49c181de7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11488',
  'x-ms-correlation-request-id',
  '5bac79af-e55b-45cd-828d-c17da8b50229',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072314Z:5bac79af-e55b-45cd-828d-c17da8b50229',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a8189db2-9e30-4d9e-bb09-1c54c204e7af',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11487',
  'x-ms-correlation-request-id',
  '6208a5b6-2b6f-4e3c-a675-1cd025f6e8d5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072315Z:6208a5b6-2b6f-4e3c-a675-1cd025f6e8d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:22aaa914-25f7-406a-b800-5b2c58acc8b1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11486',
  'x-ms-correlation-request-id',
  'caf6718b-b426-4e96-a3e6-f871f4d10956',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072315Z:caf6718b-b426-4e96-a3e6-f871f4d10956',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:861fe151-4e9a-4b92-9b1f-1c24bed0c625',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11485',
  'x-ms-correlation-request-id',
  '18d2cc9c-b7fe-4f9e-af45-23b6b1a2a2f9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072315Z:18d2cc9c-b7fe-4f9e-af45-23b6b1a2a2f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:071f7028-aaca-459c-8137-2c78ffe6f883',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11484',
  'x-ms-correlation-request-id',
  '7d192439-2830-4ae3-865e-37100d08d3b2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072315Z:7d192439-2830-4ae3-865e-37100d08d3b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d59b04f2-096c-4e2d-95a5-deb9e6b44833',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11483',
  'x-ms-correlation-request-id',
  'ef5fea39-eb20-42a0-811b-b35c2a4ecdef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072316Z:ef5fea39-eb20-42a0-811b-b35c2a4ecdef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0488c110-92a2-4dff-b0dc-c5cee3fa307b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11482',
  'x-ms-correlation-request-id',
  'acad7ac6-d402-411e-ab68-06377ba0f9dc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072316Z:acad7ac6-d402-411e-ab68-06377ba0f9dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:be3f9add-946f-4489-9cd2-270c18138bf9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11481',
  'x-ms-correlation-request-id',
  '4c2056b7-d416-4da2-8d32-8e5c51666626',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072316Z:4c2056b7-d416-4da2-8d32-8e5c51666626',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4a71b6bd-d990-4a4f-ae7a-211f519b9008',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11480',
  'x-ms-correlation-request-id',
  '805bacd3-f9d2-47aa-84d5-666f58d696d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072317Z:805bacd3-f9d2-47aa-84d5-666f58d696d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8facdf5a-9cff-44ec-b602-f90b5a6326fc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11479',
  'x-ms-correlation-request-id',
  'e7601260-e38a-4382-b44e-9424be2d8b44',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072317Z:e7601260-e38a-4382-b44e-9424be2d8b44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3190fcff-da95-4dd4-a0d2-89cd62f7689a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11478',
  'x-ms-correlation-request-id',
  '6ac2bbbc-86b8-49f7-91c2-c1f45872fe85',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072317Z:6ac2bbbc-86b8-49f7-91c2-c1f45872fe85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f4f78a5b-e71e-4dd6-bd8b-2d8bf8d6aecb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11477',
  'x-ms-correlation-request-id',
  'be849110-9b24-434d-9aa3-712baa817e5e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072317Z:be849110-9b24-434d-9aa3-712baa817e5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:21c9ec0a-b50b-4abc-999b-53bf39f55ae1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11476',
  'x-ms-correlation-request-id',
  '2a889576-d8da-4b1a-9f90-4bf52a1704ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072318Z:2a889576-d8da-4b1a-9f90-4bf52a1704ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:df6aff94-dc98-4bf9-9d6b-167d103813e3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11475',
  'x-ms-correlation-request-id',
  'b7e77cde-72e9-4776-a84a-3bd6f42d0fa7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072318Z:b7e77cde-72e9-4776-a84a-3bd6f42d0fa7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d60b3e29-b993-4b78-b353-6e1f365d0f19',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11474',
  'x-ms-correlation-request-id',
  '60ffd39b-75a1-4075-897f-e7462e0f7ac8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072318Z:60ffd39b-75a1-4075-897f-e7462e0f7ac8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:468bf46c-217c-478e-af25-3593b5ae7b6b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11473',
  'x-ms-correlation-request-id',
  '3a575b00-de0d-4cd1-a6a8-188cca3694c9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072319Z:3a575b00-de0d-4cd1-a6a8-188cca3694c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2a1c0a48-4fde-4c07-ad50-2ce78829581e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11472',
  'x-ms-correlation-request-id',
  'a5fc1401-2e7b-49b4-a6f7-4d91f6d20305',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072319Z:a5fc1401-2e7b-49b4-a6f7-4d91f6d20305',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9ab13ab9-697d-4e1f-9153-1199cd3f58ce',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11471',
  'x-ms-correlation-request-id',
  '9db06cc5-8cf2-47d6-b27b-678e1ad3310b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072319Z:9db06cc5-8cf2-47d6-b27b-678e1ad3310b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5f340575-cd62-46bc-a934-e1e004c628bb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11470',
  'x-ms-correlation-request-id',
  '8ecf2518-5a3f-4825-89a7-edbe7724ed10',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072320Z:8ecf2518-5a3f-4825-89a7-edbe7724ed10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6c1c461d-1025-4aa4-993f-561e489412fe',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11469',
  'x-ms-correlation-request-id',
  '9dd2ccd1-5645-46fb-a147-c79503ff5e20',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072320Z:9dd2ccd1-5645-46fb-a147-c79503ff5e20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f0d99cb5-eb1a-49cf-882f-77e5a7ef6086',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11468',
  'x-ms-correlation-request-id',
  'cc026393-0f02-47ef-82ad-1aa2a6a53206',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072320Z:cc026393-0f02-47ef-82ad-1aa2a6a53206',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d9165d1f-6349-4711-8034-f857323d9f2e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11467',
  'x-ms-correlation-request-id',
  '87359947-4edc-4fcb-8493-bc98897f7b11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072321Z:87359947-4edc-4fcb-8493-bc98897f7b11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3991f57a-164b-4b2b-8b61-ff8a27be6f88',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11466',
  'x-ms-correlation-request-id',
  '07b0f034-0e02-4a96-8930-79b9c23716fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072321Z:07b0f034-0e02-4a96-8930-79b9c23716fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bb0c2f26-4ab0-488b-851f-36b2d2f78ccd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11465',
  'x-ms-correlation-request-id',
  'cba06ac2-e742-4540-95b3-02e13ae54335',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072321Z:cba06ac2-e742-4540-95b3-02e13ae54335',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0697bbf3-6382-4aca-b95a-7f2e68e81e9f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11464',
  'x-ms-correlation-request-id',
  'ed52d77d-fb05-460b-8c2d-c0164b57ec13',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072321Z:ed52d77d-fb05-460b-8c2d-c0164b57ec13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:36b123d6-ca55-4319-a40e-960d08b85201',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11463',
  'x-ms-correlation-request-id',
  'dfc76065-79d1-4f98-ac02-715c0898d5a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072322Z:dfc76065-79d1-4f98-ac02-715c0898d5a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:37556d59-7657-499c-a5e4-9a21d1b9532b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11462',
  'x-ms-correlation-request-id',
  'e0dac41a-062b-4c35-a9da-510698875d9b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072322Z:e0dac41a-062b-4c35-a9da-510698875d9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d528f352-bdfe-4e6e-8eed-ff0262f00736',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11461',
  'x-ms-correlation-request-id',
  '1c2c0105-ad5e-47e0-ac1a-dba19c3e5195',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072322Z:1c2c0105-ad5e-47e0-ac1a-dba19c3e5195',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:cb266cc2-df65-42cf-88e3-476b98acc971',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11460',
  'x-ms-correlation-request-id',
  '58f7f82b-56f1-4df9-98b0-8963cd38256a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072323Z:58f7f82b-56f1-4df9-98b0-8963cd38256a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:efc75716-3568-4aca-a96f-0e71c44b940f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11459',
  'x-ms-correlation-request-id',
  'aaa3d23e-e411-4c34-9b1b-819c34db1dd0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072323Z:aaa3d23e-e411-4c34-9b1b-819c34db1dd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:66820b37-5c61-4ca7-967d-2749ad45fff3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11458',
  'x-ms-correlation-request-id',
  'e7eb76ac-c253-4eb7-91ed-762142564764',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072323Z:e7eb76ac-c253-4eb7-91ed-762142564764',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:159ad0e9-e22d-4c77-bacf-6927d685b0c2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11457',
  'x-ms-correlation-request-id',
  '3977a914-e6e0-4cdd-89c6-93a6495c9b45',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072323Z:3977a914-e6e0-4cdd-89c6-93a6495c9b45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:35382fc6-a018-43bf-9eee-0fd7dba477a7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11456',
  'x-ms-correlation-request-id',
  'c4833e9d-88c3-401f-a85d-eb2c791c2a7b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072324Z:c4833e9d-88c3-401f-a85d-eb2c791c2a7b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3ebd3d51-efaa-44fe-9f85-c5906142ff32',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11455',
  'x-ms-correlation-request-id',
  'a24d8fe1-0f5e-4c36-aefd-176cdb8e7dae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072324Z:a24d8fe1-0f5e-4c36-aefd-176cdb8e7dae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9244abde-d458-4953-a6b6-baf0c958d89c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11454',
  'x-ms-correlation-request-id',
  'e84781ca-60ca-45ea-a807-b58185d8f51c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072324Z:e84781ca-60ca-45ea-a807-b58185d8f51c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f9d9dff9-aa44-4f63-a819-afde01eefb23',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11453',
  'x-ms-correlation-request-id',
  '4918fab1-02fd-4694-ab3a-021a23f6f1ba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072325Z:4918fab1-02fd-4694-ab3a-021a23f6f1ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7ce0b175-f34a-46bb-ab81-e67a28de2748',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11452',
  'x-ms-correlation-request-id',
  '955a416d-ee0b-4621-b590-5f23ced1958a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072325Z:955a416d-ee0b-4621-b590-5f23ced1958a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:878a44d4-389d-4453-9f93-fafed82df36d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11451',
  'x-ms-correlation-request-id',
  '7f8b3d6d-7360-4e5c-8858-7c0f78227d84',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072325Z:7f8b3d6d-7360-4e5c-8858-7c0f78227d84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1820b69c-ea75-4151-a0fa-48ffd7477308',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11450',
  'x-ms-correlation-request-id',
  '47adb158-b813-4c53-9e2a-84cfde21b7d9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072326Z:47adb158-b813-4c53-9e2a-84cfde21b7d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8306dee9-6092-4641-8ea0-4f49e9aa70e3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11449',
  'x-ms-correlation-request-id',
  'f15ff1c7-b589-44dc-9818-570b67c281a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072326Z:f15ff1c7-b589-44dc-9818-570b67c281a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bed697ab-fce5-4e91-aaad-5387f68faae0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11448',
  'x-ms-correlation-request-id',
  'b8fc5c42-083d-4853-a6c3-c9f3232f4699',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072326Z:b8fc5c42-083d-4853-a6c3-c9f3232f4699',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:12a88177-dd16-47e3-9cd9-1f7f87983b7b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11447',
  'x-ms-correlation-request-id',
  '1a147901-b6d0-4f6f-a2c8-eeacab013ef0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072326Z:1a147901-b6d0-4f6f-a2c8-eeacab013ef0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7a6b4496-95e1-487f-8ab1-ac526d4ea713',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11446',
  'x-ms-correlation-request-id',
  '8667bad6-a18e-4d2a-b60b-8a390e752c3f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072327Z:8667bad6-a18e-4d2a-b60b-8a390e752c3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2069ee33-cc80-45a1-aa5b-944179b6401b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11445',
  'x-ms-correlation-request-id',
  '7d4c533c-8ca1-4e41-a94c-511eeac42c93',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072327Z:7d4c533c-8ca1-4e41-a94c-511eeac42c93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ed26c8fc-d569-4fee-bbc7-d9b0811a29ba',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11444',
  'x-ms-correlation-request-id',
  'baf5f3c1-e513-46b9-afa8-8b5c9a9fb2e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072327Z:baf5f3c1-e513-46b9-afa8-8b5c9a9fb2e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f2e21714-6a02-46c8-b150-aab2aa84bac5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11443',
  'x-ms-correlation-request-id',
  '995cbf79-ccdb-449a-9a6e-3340b3722750',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072328Z:995cbf79-ccdb-449a-9a6e-3340b3722750',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:befc19e3-7386-42ea-a990-df12e539b578',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11442',
  'x-ms-correlation-request-id',
  '6afd297f-c9ad-41f9-a0d6-86451901303d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072328Z:6afd297f-c9ad-41f9-a0d6-86451901303d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f626cc34-a4ca-48f0-b369-942992b1b75e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11441',
  'x-ms-correlation-request-id',
  '40e55955-f393-4311-96ae-448568b493ba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072328Z:40e55955-f393-4311-96ae-448568b493ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:26a35e0f-2447-47fd-8354-37152eff7539',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11440',
  'x-ms-correlation-request-id',
  '66d446ba-f208-4ced-b1bb-07b4af9d68c3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072329Z:66d446ba-f208-4ced-b1bb-07b4af9d68c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ee2e465b-fdf8-499a-9e31-f3b752321ca5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11439',
  'x-ms-correlation-request-id',
  '13a44612-3ea0-4ea4-8112-1ebb331091a4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072329Z:13a44612-3ea0-4ea4-8112-1ebb331091a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dd8b8352-0bd2-4766-83da-9ccdde06c8b6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11438',
  'x-ms-correlation-request-id',
  'b65e6d7c-704e-485f-863b-6727c52f7048',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072329Z:b65e6d7c-704e-485f-863b-6727c52f7048',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f577628c-78ca-4cc8-b761-7927a5d8c2e3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11437',
  'x-ms-correlation-request-id',
  '033448b8-065e-49b5-90ea-8e54d4f4a05f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072329Z:033448b8-065e-49b5-90ea-8e54d4f4a05f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:964ce5f5-689c-4b2f-9fd1-f2addcf99aaa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11436',
  'x-ms-correlation-request-id',
  '57d997b3-af7c-434f-bad6-04b783aef8b3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072330Z:57d997b3-af7c-434f-bad6-04b783aef8b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2eeee77f-a511-4a31-9b34-25b96ad41add',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11435',
  'x-ms-correlation-request-id',
  '92ff3916-ff22-4a4c-8004-3174fc571d87',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072330Z:92ff3916-ff22-4a4c-8004-3174fc571d87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b18e9823-7b0e-4503-8bb7-86d4e4c00af5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11434',
  'x-ms-correlation-request-id',
  '413ae18b-0324-472b-baa9-0a9c46022f90',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072330Z:413ae18b-0324-472b-baa9-0a9c46022f90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bd930de0-51cf-4567-b501-0a6cfbfecac3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11433',
  'x-ms-correlation-request-id',
  'fc6dfb89-6890-4493-9b76-6bafa42cc588',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072331Z:fc6dfb89-6890-4493-9b76-6bafa42cc588',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:29914447-fdbb-4a54-b7b5-3892a4ff2b95',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11432',
  'x-ms-correlation-request-id',
  'edd0a9b1-69c4-41ef-8f95-f5a3d6251087',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072331Z:edd0a9b1-69c4-41ef-8f95-f5a3d6251087',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:383e7d45-d7e3-4475-bd28-aac1d6b69758',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11431',
  'x-ms-correlation-request-id',
  '2ba0a66d-d93e-4eca-8c44-e4ed0d1163c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072331Z:2ba0a66d-d93e-4eca-8c44-e4ed0d1163c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3b636782-394e-4b06-b434-8840db9e6caf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11430',
  'x-ms-correlation-request-id',
  '5cae3ada-d5bb-4f47-a10c-85950ae7cd8c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072332Z:5cae3ada-d5bb-4f47-a10c-85950ae7cd8c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:83400128-048e-4f78-8375-a001d559b217',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11429',
  'x-ms-correlation-request-id',
  '7e74ebc9-1bed-414e-b2b9-167e65099f5a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072332Z:7e74ebc9-1bed-414e-b2b9-167e65099f5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f85a71bc-350f-4670-ae12-5cd5534ff98c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11428',
  'x-ms-correlation-request-id',
  '7b3fdc82-1baf-408e-9c9a-55c2ec1326da',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072332Z:7b3fdc82-1baf-408e-9c9a-55c2ec1326da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bfaa9933-7131-4eb7-844a-dba20ce562bb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11427',
  'x-ms-correlation-request-id',
  'aa5c9f9c-5006-4330-9112-63166f792364',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072332Z:aa5c9f9c-5006-4330-9112-63166f792364',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a4f11bcc-5df7-43ed-8646-8745d683cbfb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11426',
  'x-ms-correlation-request-id',
  '9b25b95a-15f1-47ea-bd2b-75fa92fc6a79',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072333Z:9b25b95a-15f1-47ea-bd2b-75fa92fc6a79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fb44789f-81e9-4e58-8ac9-d851181e1338',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11425',
  'x-ms-correlation-request-id',
  'eb12e96e-ede0-4daa-8cbc-5fbfc11ee558',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072333Z:eb12e96e-ede0-4daa-8cbc-5fbfc11ee558',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c2ca87bd-d0a8-4399-9c00-8d945cffafdf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11424',
  'x-ms-correlation-request-id',
  '2b6b3739-4395-40a8-941f-f032dfc5ddf7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072333Z:2b6b3739-4395-40a8-941f-f032dfc5ddf7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d67d7bd5-4fbc-4454-8d65-6730223a0c3b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11423',
  'x-ms-correlation-request-id',
  '0afa4167-5a30-41da-b88d-601be6e91683',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072334Z:0afa4167-5a30-41da-b88d-601be6e91683',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e94f421c-15dc-4513-a5b9-4e01b80d1df9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11422',
  'x-ms-correlation-request-id',
  '70533dd5-3667-4756-85c1-b3d7a1edee07',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072334Z:70533dd5-3667-4756-85c1-b3d7a1edee07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4da17ce1-f759-4389-946b-fe4e77bfdc25',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11421',
  'x-ms-correlation-request-id',
  '84ad3409-5871-4111-98dd-d59e14467767',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072334Z:84ad3409-5871-4111-98dd-d59e14467767',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:62b32673-877c-4830-a2f3-607043402675',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11420',
  'x-ms-correlation-request-id',
  '4690c0eb-c139-43f9-b117-5adf02114e50',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072335Z:4690c0eb-c139-43f9-b117-5adf02114e50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:522ab2eb-609c-4c67-aeca-9675f2bae2ef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11419',
  'x-ms-correlation-request-id',
  '3bab31b7-5b25-47d1-b7e5-c5ba2155d762',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072335Z:3bab31b7-5b25-47d1-b7e5-c5ba2155d762',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9ef0ea67-fff3-4aea-a81b-c76752261393',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11418',
  'x-ms-correlation-request-id',
  'b62d2a6c-8df8-4a87-a86a-878056caa70b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072335Z:b62d2a6c-8df8-4a87-a86a-878056caa70b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b15d105f-3fd0-4ee8-a9e9-29a2194c14c8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11417',
  'x-ms-correlation-request-id',
  '93c6a1fb-8d42-4800-bb05-245693f0d7db',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072336Z:93c6a1fb-8d42-4800-bb05-245693f0d7db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:000af3be-1b99-4463-b770-cfd49921be28',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11416',
  'x-ms-correlation-request-id',
  '7429ad61-b797-42b8-8d9a-d598f9289a77',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072336Z:7429ad61-b797-42b8-8d9a-d598f9289a77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0b1c07ad-34f6-45cd-95aa-d57ee67c3c40',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11415',
  'x-ms-correlation-request-id',
  'cfaf7cce-72b4-482b-a377-75d6d73c26ec',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072336Z:cfaf7cce-72b4-482b-a377-75d6d73c26ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2893523d-fcd3-4dcb-b3b5-bb709bc37930',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11414',
  'x-ms-correlation-request-id',
  'a2109bd5-9912-43e8-a1c8-c1b44873add6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072336Z:a2109bd5-9912-43e8-a1c8-c1b44873add6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:954657c8-037b-4779-9563-b73643cb4a47',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11413',
  'x-ms-correlation-request-id',
  'ae10313b-635f-4dd4-9151-a997bcbaa400',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072337Z:ae10313b-635f-4dd4-9151-a997bcbaa400',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c58eec35-5199-4941-9e99-3be73ba0c464',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11412',
  'x-ms-correlation-request-id',
  '27ab89d5-799b-4831-a6b1-442b2bcf901b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072337Z:27ab89d5-799b-4831-a6b1-442b2bcf901b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2e282adf-2f3c-455a-9da8-4760dc53e0af',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11411',
  'x-ms-correlation-request-id',
  '3b5e90fe-83ee-489c-8810-03b547bdbd88',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072337Z:3b5e90fe-83ee-489c-8810-03b547bdbd88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5ab0cabe-4632-4063-a6e0-112d407deee9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11410',
  'x-ms-correlation-request-id',
  '48d1ef77-a8c6-4e7d-83cd-b13b76cd8730',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072338Z:48d1ef77-a8c6-4e7d-83cd-b13b76cd8730',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7b542a71-8b06-4d14-a452-7e22f70fa2ac',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11409',
  'x-ms-correlation-request-id',
  '55e1d9fb-8dd3-4e15-a685-47484156e9f9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072338Z:55e1d9fb-8dd3-4e15-a685-47484156e9f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f92120b8-e71f-436d-a641-cc21a28b8818',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11408',
  'x-ms-correlation-request-id',
  '33485127-0750-4f44-aab5-d7ba864008f9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072338Z:33485127-0750-4f44-aab5-d7ba864008f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6ea5ccab-66d7-469f-a4af-97581a874cfc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11407',
  'x-ms-correlation-request-id',
  'a035f5c4-628a-4fcd-b698-cbc6306cdcd6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072339Z:a035f5c4-628a-4fcd-b698-cbc6306cdcd6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5f825e98-5be3-4be0-9387-b0f6f6d91c33',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11406',
  'x-ms-correlation-request-id',
  '87138f1f-890e-46c9-80e1-059fd4902047',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072339Z:87138f1f-890e-46c9-80e1-059fd4902047',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a2e74cd9-b9d9-4df6-9749-f8055642c70d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11405',
  'x-ms-correlation-request-id',
  '5539beb5-407c-48e0-ada5-0f591f8b72b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072339Z:5539beb5-407c-48e0-ada5-0f591f8b72b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:af53bba9-da72-40f9-9ab7-b0ddd7c5dc01',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11404',
  'x-ms-correlation-request-id',
  '586a6639-344a-441a-a7fc-779e1b7f148b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072339Z:586a6639-344a-441a-a7fc-779e1b7f148b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6ce5087c-0fb2-43c8-ab77-14781bbd9852',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11403',
  'x-ms-correlation-request-id',
  '671f4e5f-9e52-4d40-b7a7-cc181ee99992',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072340Z:671f4e5f-9e52-4d40-b7a7-cc181ee99992',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:efa3f9a5-f227-4268-92ff-b861db989d38',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11402',
  'x-ms-correlation-request-id',
  '09221a60-e512-4607-b890-72ad63575458',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072340Z:09221a60-e512-4607-b890-72ad63575458',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:51019fb9-7045-4711-b6af-51d842d8ee2b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11401',
  'x-ms-correlation-request-id',
  '588b1d40-d79f-4b5e-aab9-e35da0c31212',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072340Z:588b1d40-d79f-4b5e-aab9-e35da0c31212',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9240460f-5155-41e0-86be-87392480ac89',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11400',
  'x-ms-correlation-request-id',
  'fb4de804-adb9-4484-bf47-920bdef287b6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072341Z:fb4de804-adb9-4484-bf47-920bdef287b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ef3d8656-a0e5-4260-95a9-6f08bc798940',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11399',
  'x-ms-correlation-request-id',
  'bcaa0b8d-aa1c-42a8-87dc-8c4b57c4840b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072341Z:bcaa0b8d-aa1c-42a8-87dc-8c4b57c4840b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:79a37455-eecf-408f-a404-ffccd0675969',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11398',
  'x-ms-correlation-request-id',
  '016a996b-34f0-44e1-8c0d-2e2925a6ce22',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072341Z:016a996b-34f0-44e1-8c0d-2e2925a6ce22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:75ab34d8-80bb-491f-9018-a932be102cb4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11397',
  'x-ms-correlation-request-id',
  'e7def875-3800-420f-8d79-dbb18fd98bd7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072342Z:e7def875-3800-420f-8d79-dbb18fd98bd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:20f7dd1f-21da-46f3-8eb5-a39d52f11845',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11396',
  'x-ms-correlation-request-id',
  '8b9b5845-8c9d-440b-b7d4-128e73e84b58',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072342Z:8b9b5845-8c9d-440b-b7d4-128e73e84b58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ef9f4a31-20d9-4699-9eee-862d8f016d71',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11395',
  'x-ms-correlation-request-id',
  '2201f1ec-6728-4e87-a66e-e304dfa8acf6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072342Z:2201f1ec-6728-4e87-a66e-e304dfa8acf6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0f23faf1-579d-46c5-9adb-3d18e45cd573',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11394',
  'x-ms-correlation-request-id',
  '705be632-5b80-4309-861a-90304b4c8ef5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072342Z:705be632-5b80-4309-861a-90304b4c8ef5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:958c3ee0-e47f-4658-a12c-66df39ae74ea',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11393',
  'x-ms-correlation-request-id',
  '3a2a0db9-2298-4cee-b7d8-db233c574c88',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072343Z:3a2a0db9-2298-4cee-b7d8-db233c574c88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:74796ff7-0b0b-4bea-90c5-7d7380303a9a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11392',
  'x-ms-correlation-request-id',
  '935f611f-0b8b-4c0e-929c-4ef7aeebf7d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072343Z:935f611f-0b8b-4c0e-929c-4ef7aeebf7d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f507c4cc-6367-405c-aecf-53b40eaa9079',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11391',
  'x-ms-correlation-request-id',
  'e499090f-84c2-4b9b-97ef-8859462ed9be',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072343Z:e499090f-84c2-4b9b-97ef-8859462ed9be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1b30b3f3-45b8-4047-b595-8ec55346b3c5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11390',
  'x-ms-correlation-request-id',
  '499fecbc-e6b8-4e6a-8036-b7b4f87a2c96',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072344Z:499fecbc-e6b8-4e6a-8036-b7b4f87a2c96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1e07bdb0-865e-4509-a162-a21575657fc2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11389',
  'x-ms-correlation-request-id',
  '336618c8-f91c-4944-b70e-873cc3312cb4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072344Z:336618c8-f91c-4944-b70e-873cc3312cb4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a49035a7-71c7-49eb-be86-ea50d1462786',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11388',
  'x-ms-correlation-request-id',
  'e35e1cb3-0495-4b32-86d3-7aeb9f995e0a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072344Z:e35e1cb3-0495-4b32-86d3-7aeb9f995e0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:04a0980a-5280-44f6-afb4-bbfcade24a67',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11387',
  'x-ms-correlation-request-id',
  'd478bfbe-52f9-467d-964d-bdfda57eab99',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072345Z:d478bfbe-52f9-467d-964d-bdfda57eab99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a2d57ad4-d751-4489-9b65-cca66db2a743',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11386',
  'x-ms-correlation-request-id',
  '7d3ff953-ca15-4c9a-89e3-cc334a351419',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072345Z:7d3ff953-ca15-4c9a-89e3-cc334a351419',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:70a82c8a-0d99-43a7-94d9-abfe8048ed8b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11385',
  'x-ms-correlation-request-id',
  '99d4ea9b-5578-41f7-bdfb-b478f44f05f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072345Z:99d4ea9b-5578-41f7-bdfb-b478f44f05f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6d9ebe85-eeb6-47e3-b7a3-350e5bb06edd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11384',
  'x-ms-correlation-request-id',
  '8e797b2e-87f9-4453-ad4b-29f51b71cb21',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072345Z:8e797b2e-87f9-4453-ad4b-29f51b71cb21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:aa271aba-1f51-4a3e-9066-98d7c1b89d33',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11383',
  'x-ms-correlation-request-id',
  'edd79b68-6bbb-42ce-b4a5-05d15d66b8af',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072346Z:edd79b68-6bbb-42ce-b4a5-05d15d66b8af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5c8b38c6-010c-4096-a7a0-6fb17d4c454e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11382',
  'x-ms-correlation-request-id',
  '5ff5f5c8-356b-4559-b59b-115e8878ee54',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072346Z:5ff5f5c8-356b-4559-b59b-115e8878ee54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:81df0cce-2dd9-41c2-a516-8736949a6b7f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11381',
  'x-ms-correlation-request-id',
  '2a3779f7-1d52-4429-ad1d-7e7bf8212aa0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072346Z:2a3779f7-1d52-4429-ad1d-7e7bf8212aa0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2c8bbfd0-3bf2-4e8e-9e38-a8edcc376d0d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11380',
  'x-ms-correlation-request-id',
  '5f410e95-f292-47da-b703-5fac8a02d20c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072347Z:5f410e95-f292-47da-b703-5fac8a02d20c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:67a53f90-fcb3-4f56-a1e6-30e7d811d7c0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11379',
  'x-ms-correlation-request-id',
  '7de9a1b6-3164-4a72-a668-3681fd27b6b1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072347Z:7de9a1b6-3164-4a72-a668-3681fd27b6b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:785328c0-ca1d-43f8-96d3-7dbdad8fbee0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11378',
  'x-ms-correlation-request-id',
  'f786a95b-076e-4444-bbbe-93220a257901',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072347Z:f786a95b-076e-4444-bbbe-93220a257901',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6c74737d-271d-4ce0-baef-dac4fc817095',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11377',
  'x-ms-correlation-request-id',
  'd4021082-1407-408b-bed6-95e1340240b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072347Z:d4021082-1407-408b-bed6-95e1340240b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:62eecc35-f197-4065-bd25-a61d28a55bef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11376',
  'x-ms-correlation-request-id',
  '844b6e8b-39f9-455d-9c6e-f0f0f0c417e8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072348Z:844b6e8b-39f9-455d-9c6e-f0f0f0c417e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bc80b4d9-8aeb-40c7-b17f-3257fcd7e99c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11375',
  'x-ms-correlation-request-id',
  'd48b996e-9074-48e6-8133-02d08cb6ca4a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072348Z:d48b996e-9074-48e6-8133-02d08cb6ca4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dc5106b0-671b-45b9-a286-acfc905b3e01',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11374',
  'x-ms-correlation-request-id',
  'a2630f9e-66c5-4ab6-ad8f-91a4033c02c5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072348Z:a2630f9e-66c5-4ab6-ad8f-91a4033c02c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5570f831-52b7-4aab-b24e-436ef9478f4c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11373',
  'x-ms-correlation-request-id',
  '93c26ad1-00c7-4db1-a6a0-a3dd037bc74a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072349Z:93c26ad1-00c7-4db1-a6a0-a3dd037bc74a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:891e088d-00aa-4773-802a-49c7dd21d741',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11372',
  'x-ms-correlation-request-id',
  '1eeeb8fc-fb62-4e9b-974e-e89fd6b17a34',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072349Z:1eeeb8fc-fb62-4e9b-974e-e89fd6b17a34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:88c5b995-57ba-4d93-a373-ed4cc004c5b9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11371',
  'x-ms-correlation-request-id',
  'cc318e92-8108-4097-b922-f6b124348075',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072349Z:cc318e92-8108-4097-b922-f6b124348075',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dc282398-d0ff-426d-b8db-9beafb1b9ff9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11370',
  'x-ms-correlation-request-id',
  'fce4915d-5f93-4fdb-bcbd-682e45c232c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072350Z:fce4915d-5f93-4fdb-bcbd-682e45c232c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:00eb2637-d70d-4f54-aa4d-9ada80b6c66d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11369',
  'x-ms-correlation-request-id',
  '17bb771b-6477-4da8-a79d-ac2574746fa3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072350Z:17bb771b-6477-4da8-a79d-ac2574746fa3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e8e461e4-d4d4-4e89-944e-cd54dcb7b028',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11368',
  'x-ms-correlation-request-id',
  'aec714d3-9118-416c-9ecf-00a68676c0e5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072350Z:aec714d3-9118-416c-9ecf-00a68676c0e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:58ada362-3cef-4f47-a13d-2cb79b73b5d2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11367',
  'x-ms-correlation-request-id',
  '2d0b8ed2-a4c2-40a6-964d-648554d93f74',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072350Z:2d0b8ed2-a4c2-40a6-964d-648554d93f74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5001505a-e612-4be7-a6a8-2417a7b3e7a8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11366',
  'x-ms-correlation-request-id',
  '2b8127c9-be05-4cd1-9170-0e0ea70cbdb2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072351Z:2b8127c9-be05-4cd1-9170-0e0ea70cbdb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0a3978b4-ef6c-421b-a72f-cfe381941f66',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11365',
  'x-ms-correlation-request-id',
  '117678b5-78d5-4e12-9ea4-08d06e8d9f2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072351Z:117678b5-78d5-4e12-9ea4-08d06e8d9f2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d8621588-9ba1-418e-a341-dd6b01221e56',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11364',
  'x-ms-correlation-request-id',
  '3d272e3a-1ac8-475c-a288-c64cba9533fd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072351Z:3d272e3a-1ac8-475c-a288-c64cba9533fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:977da6d1-097a-42c4-841e-30851020225c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11363',
  'x-ms-correlation-request-id',
  'f110383b-780a-49be-90a5-e63248356116',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072352Z:f110383b-780a-49be-90a5-e63248356116',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3398615d-09a0-455a-b851-bcd240a7f100',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11362',
  'x-ms-correlation-request-id',
  'f83f440f-79f4-431e-b912-0c1ab5ea91b2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072352Z:f83f440f-79f4-431e-b912-0c1ab5ea91b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f8da4fc7-0dbb-4ca2-aa47-d5b2db10d918',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11361',
  'x-ms-correlation-request-id',
  '3e6cdc97-85e5-4e57-9ea4-1abccc770333',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072352Z:3e6cdc97-85e5-4e57-9ea4-1abccc770333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fea3a67e-1752-45ba-a06f-04bd579dfb43',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11360',
  'x-ms-correlation-request-id',
  'c629cecc-674b-40ba-898b-70e94708b7e8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072353Z:c629cecc-674b-40ba-898b-70e94708b7e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:01f419f7-4ffc-4f25-907b-38a6c49eed6a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11359',
  'x-ms-correlation-request-id',
  '06b90c84-2a10-4de3-9848-8ef7d6dde254',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072353Z:06b90c84-2a10-4de3-9848-8ef7d6dde254',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ae86e15c-6beb-4f72-8f23-d597196f90cf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11358',
  'x-ms-correlation-request-id',
  'c8ca3f47-c8b4-4e04-abc6-1eeafc0caa5b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072353Z:c8ca3f47-c8b4-4e04-abc6-1eeafc0caa5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e64d95b6-1a46-4c4e-a7d4-8382ae37b190',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11357',
  'x-ms-correlation-request-id',
  '304b45b9-7e7c-4467-af42-08a5b2b32e42',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072353Z:304b45b9-7e7c-4467-af42-08a5b2b32e42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2434450d-cc44-4396-881e-c7a6e40420fb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11356',
  'x-ms-correlation-request-id',
  '29e5cddd-c514-47fe-8c56-1c8961bd0ab3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072354Z:29e5cddd-c514-47fe-8c56-1c8961bd0ab3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:39ad5415-a10c-4dfc-bf92-e3c3449c642f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11355',
  'x-ms-correlation-request-id',
  '02203952-6d3c-463d-853c-3d0e97532aa0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072354Z:02203952-6d3c-463d-853c-3d0e97532aa0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:815a46af-a153-4a8b-86ff-e532bd0b1cdf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11354',
  'x-ms-correlation-request-id',
  '51c98f32-21ce-4857-864f-d4148771a2f2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072354Z:51c98f32-21ce-4857-864f-d4148771a2f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d33dcf13-8471-425e-a076-1b7c0f848c3a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11353',
  'x-ms-correlation-request-id',
  '66e48b20-27fc-4d0b-a671-b657035b66f0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072355Z:66e48b20-27fc-4d0b-a671-b657035b66f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:81df7177-1105-4cae-869b-e345db260410',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11352',
  'x-ms-correlation-request-id',
  '45f632f0-9fa4-4174-b5b0-349df51569eb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072355Z:45f632f0-9fa4-4174-b5b0-349df51569eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fa71cda6-cc47-46ca-8d3c-ba76366d1126',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11351',
  'x-ms-correlation-request-id',
  '4ca10356-3932-4896-ab24-116d15c46564',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072355Z:4ca10356-3932-4896-ab24-116d15c46564',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b30da273-ddc6-4ed2-8942-095718265827',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11350',
  'x-ms-correlation-request-id',
  '4b0fbf10-4d93-4c50-bd8f-df260e93bb3d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072356Z:4b0fbf10-4d93-4c50-bd8f-df260e93bb3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3bdd8dde-8513-4179-9e81-2eb8719798db',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11349',
  'x-ms-correlation-request-id',
  '3e075e05-3973-4acc-9748-8e4b71b0b0d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072356Z:3e075e05-3973-4acc-9748-8e4b71b0b0d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ad744669-f2c9-44c6-8255-6936ea4c4008',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11348',
  'x-ms-correlation-request-id',
  '685f0f37-4c25-474e-9733-4a691c2bf7cd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072356Z:685f0f37-4c25-474e-9733-4a691c2bf7cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:cf0da85a-406c-430b-8f15-55f666be2297',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11347',
  'x-ms-correlation-request-id',
  '5fc317e7-f7d0-4344-b9ea-9e908f488b0f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072356Z:5fc317e7-f7d0-4344-b9ea-9e908f488b0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c386e6af-6068-4259-af5d-cc20a55d09c0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11346',
  'x-ms-correlation-request-id',
  '381c0c56-51e8-43e9-853c-c643f45c5bf8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072357Z:381c0c56-51e8-43e9-853c-c643f45c5bf8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f7ffe0ad-277a-424e-9d3e-09eb31c0e6b4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11345',
  'x-ms-correlation-request-id',
  'ee7f7e38-5aaa-44fa-8dea-f03f799edb4e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072357Z:ee7f7e38-5aaa-44fa-8dea-f03f799edb4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:41faf962-40e3-4b42-b164-5eba898fbf59',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11344',
  'x-ms-correlation-request-id',
  '46e39f3d-3aca-41b5-b5b8-78399020b84a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072357Z:46e39f3d-3aca-41b5-b5b8-78399020b84a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5893b1f1-d47c-422d-ab4c-5be46cab403a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11343',
  'x-ms-correlation-request-id',
  '7f478f57-1467-41f0-a229-a10d402fe1a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072358Z:7f478f57-1467-41f0-a229-a10d402fe1a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9e662d3f-b066-4ea5-a732-1e73e6db3e7c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11342',
  'x-ms-correlation-request-id',
  '717e282a-0ead-4eaf-a637-0062b237e84e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072358Z:717e282a-0ead-4eaf-a637-0062b237e84e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:68403352-b711-4037-b500-5c16601c7568',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11341',
  'x-ms-correlation-request-id',
  'f49a6d4c-d604-4d46-8400-ee42bad6ee3e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072358Z:f49a6d4c-d604-4d46-8400-ee42bad6ee3e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:31e07091-c595-469a-b602-3d727164a5a1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11340',
  'x-ms-correlation-request-id',
  '6f7f363d-8701-4b5a-82bb-91da2c2f9ba9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072359Z:6f7f363d-8701-4b5a-82bb-91da2c2f9ba9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:747c6315-c4f2-4775-9e48-99aa088b9740',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11339',
  'x-ms-correlation-request-id',
  'b09e489d-c9f9-4a55-bbff-4dc6f9a4e80f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072359Z:b09e489d-c9f9-4a55-bbff-4dc6f9a4e80f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c7b047b2-090f-40fb-bc73-652a5b8aa733',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11338',
  'x-ms-correlation-request-id',
  '12d00b95-6554-4476-a34b-c66f1562b9ea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072359Z:12d00b95-6554-4476-a34b-c66f1562b9ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:62217fb0-5c7e-4e72-9011-eed607ae23ad',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11337',
  'x-ms-correlation-request-id',
  '44d48d55-8724-42e6-bf47-6ae1895912ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072359Z:44d48d55-8724-42e6-bf47-6ae1895912ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:88839e71-b416-4a56-a00c-c1f1960d8b75',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11336',
  'x-ms-correlation-request-id',
  'a9e805b7-9674-494d-b561-b44bb1d41633',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072400Z:a9e805b7-9674-494d-b561-b44bb1d41633',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5c0e0494-3b2c-40f1-936e-a18c6d0c0e13',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11335',
  'x-ms-correlation-request-id',
  '83c9821e-a7e6-4e97-9b9b-b10fb9beb697',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072400Z:83c9821e-a7e6-4e97-9b9b-b10fb9beb697',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:23:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9a74d22f-62bb-46d5-bbaa-ca8670611d05',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11334',
  'x-ms-correlation-request-id',
  '5af712c6-9323-4cb3-bd36-542b6702ea77',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072400Z:5af712c6-9323-4cb3-bd36-542b6702ea77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a4409e07-895a-422e-9f74-19371ba39bcd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11333',
  'x-ms-correlation-request-id',
  '1dc425b3-21f2-4a77-b3cd-2b6e4cbb7c93',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072401Z:1dc425b3-21f2-4a77-b3cd-2b6e4cbb7c93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5f080f54-b191-465f-ac1e-b3e98ebd7150',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11332',
  'x-ms-correlation-request-id',
  'b3fcabb0-0ee3-422b-9f9c-a0027e72db06',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072401Z:b3fcabb0-0ee3-422b-9f9c-a0027e72db06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bc4bc5b1-9686-4992-8137-85b4bdb5248d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11331',
  'x-ms-correlation-request-id',
  '6a74592b-0336-4c7c-9168-580dd28ed903',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072401Z:6a74592b-0336-4c7c-9168-580dd28ed903',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dd848e38-6878-46f4-a234-d165e6d3bf72',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11330',
  'x-ms-correlation-request-id',
  'df6c4973-d2a6-4418-a019-740c2e0972ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072401Z:df6c4973-d2a6-4418-a019-740c2e0972ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9cc3d425-e7bc-4397-9a8c-854ba2877d08',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11329',
  'x-ms-correlation-request-id',
  'f9238cea-1678-4ecc-ade6-fe04a0db318e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072402Z:f9238cea-1678-4ecc-ade6-fe04a0db318e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:49936899-fde9-4235-b2e4-c8de61a50f13',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11328',
  'x-ms-correlation-request-id',
  'ecc4547f-cc40-4411-84cb-00f9de6ac481',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072402Z:ecc4547f-cc40-4411-84cb-00f9de6ac481',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c9d38b24-5dd9-43b5-b588-86f6623c03f0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11327',
  'x-ms-correlation-request-id',
  '74e10808-aa73-426e-b269-a46b0af439a7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072402Z:74e10808-aa73-426e-b269-a46b0af439a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:60fc3c56-65c0-4abb-805e-1ca9c03be4c5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11326',
  'x-ms-correlation-request-id',
  '9a80c0d9-e2c3-4824-afd9-a7efda8b6af2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072403Z:9a80c0d9-e2c3-4824-afd9-a7efda8b6af2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f5fac53c-e6ff-4923-952b-dffa8932eda8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11325',
  'x-ms-correlation-request-id',
  '326b01c9-3320-4c9d-a6ee-a6c77cc0dfd2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072403Z:326b01c9-3320-4c9d-a6ee-a6c77cc0dfd2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:14781fb9-708c-4f28-9ae0-733ca84f4b69',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11324',
  'x-ms-correlation-request-id',
  'ed5a3248-2a5a-431a-9d10-cbdb2ab189fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072403Z:ed5a3248-2a5a-431a-9d10-cbdb2ab189fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:56706d23-c77d-4946-9770-e2f215add5f7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11323',
  'x-ms-correlation-request-id',
  '768b2d40-87f5-44c2-8984-62bdaa483f25',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072404Z:768b2d40-87f5-44c2-8984-62bdaa483f25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2aaf96b7-e72e-4a93-938b-bf0e671f81d5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11322',
  'x-ms-correlation-request-id',
  '74a09853-adae-4009-bd3f-b985dc919cce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072404Z:74a09853-adae-4009-bd3f-b985dc919cce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c84032d1-c48b-4f8a-a7de-61247ca53bc0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11321',
  'x-ms-correlation-request-id',
  '602f785d-943d-4245-a1cc-4fafe79ad3ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072404Z:602f785d-943d-4245-a1cc-4fafe79ad3ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6268a8ff-34d6-46b7-b651-fceac0e01000',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11320',
  'x-ms-correlation-request-id',
  '8296b971-ac42-4f47-b370-eaca95e21c81',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072404Z:8296b971-ac42-4f47-b370-eaca95e21c81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:142189bd-aeb0-4803-99f4-4b03266e3445',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11319',
  'x-ms-correlation-request-id',
  'eb9101aa-34ec-447a-82aa-ede700d0c667',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072405Z:eb9101aa-34ec-447a-82aa-ede700d0c667',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7fbd811d-4343-466d-9886-4c23a64ee4c0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11318',
  'x-ms-correlation-request-id',
  'f653e12d-086c-410f-a1f7-b9ab720c976e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072405Z:f653e12d-086c-410f-a1f7-b9ab720c976e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b958c534-4fdf-4fe1-8501-1fdf585daf32',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11317',
  'x-ms-correlation-request-id',
  '3886eee6-05ba-47a6-9492-11e1fb48b5ef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072405Z:3886eee6-05ba-47a6-9492-11e1fb48b5ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:51b64b66-5e81-49a8-874f-fee4f9b7263b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11316',
  'x-ms-correlation-request-id',
  '3192f077-bd4e-4548-8126-767a0cbf8f0d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072406Z:3192f077-bd4e-4548-8126-767a0cbf8f0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:552f8148-d949-4dc0-9def-9c26b66d4756',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11315',
  'x-ms-correlation-request-id',
  '0bc8cbe2-438c-45c3-bb07-621ff28028d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072406Z:0bc8cbe2-438c-45c3-bb07-621ff28028d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:79ca128f-8831-437a-b360-6842577f27c1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11314',
  'x-ms-correlation-request-id',
  '4b46e97c-d831-4d95-bf16-7b1f1797d482',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072406Z:4b46e97c-d831-4d95-bf16-7b1f1797d482',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e24f41eb-86af-41d9-966a-5132da972d65',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11313',
  'x-ms-correlation-request-id',
  '79b14ddb-3614-4f24-ad7d-d6092338bbf1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072406Z:79b14ddb-3614-4f24-ad7d-d6092338bbf1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9bf02c07-3122-48ab-9117-f537e6f69c0b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11312',
  'x-ms-correlation-request-id',
  '2fb96eba-b417-4be7-b4fe-ca0c4b3bfb54',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072407Z:2fb96eba-b417-4be7-b4fe-ca0c4b3bfb54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:84020cdc-abf0-4733-a809-14a6e849f7a9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11311',
  'x-ms-correlation-request-id',
  '41cfebd7-bc90-4f62-9581-365e9acd3ecb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072407Z:41cfebd7-bc90-4f62-9581-365e9acd3ecb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:73e3e689-325f-409b-ad1b-fb689f0b2e90',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11310',
  'x-ms-correlation-request-id',
  '5fb349d6-5ca4-4324-b318-065d0c070c48',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072407Z:5fb349d6-5ca4-4324-b318-065d0c070c48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ce20ba7d-6a7a-4d74-a1f1-717a79110354',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11309',
  'x-ms-correlation-request-id',
  'eed50eda-708a-45f6-8dd2-24fa28a6c7f1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072408Z:eed50eda-708a-45f6-8dd2-24fa28a6c7f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:24d41251-588a-42eb-b77c-4ed01e0bca57',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11308',
  'x-ms-correlation-request-id',
  '9c9d482d-419d-4438-acff-c5d521a8bbb8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072408Z:9c9d482d-419d-4438-acff-c5d521a8bbb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:21495ab1-c320-4a36-be0a-b2ffebfcf638',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11307',
  'x-ms-correlation-request-id',
  '94f612e4-5113-45d9-970b-ff2455c20cf5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072408Z:94f612e4-5113-45d9-970b-ff2455c20cf5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a5c447d8-790b-42e5-9571-b3cc183cb57b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11306',
  'x-ms-correlation-request-id',
  'a6a20a7b-4aa1-45e4-86b3-b09521ed3f14',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072408Z:a6a20a7b-4aa1-45e4-86b3-b09521ed3f14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f321d230-e3fa-46dd-a8e6-6e0afe90d18a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11305',
  'x-ms-correlation-request-id',
  '854892e0-e072-488a-a830-bd16dbc4316a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072409Z:854892e0-e072-488a-a830-bd16dbc4316a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:527fefce-9cc4-4777-bfa7-0bd78744d948',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11304',
  'x-ms-correlation-request-id',
  '68b4b6ca-aaab-4a05-bfad-83491f56acb6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072409Z:68b4b6ca-aaab-4a05-bfad-83491f56acb6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:330cb18c-6dd4-492a-9cd9-36f1c213dd73',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11303',
  'x-ms-correlation-request-id',
  '68b54cd0-08a5-49bd-ad39-6000f699b2dd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072409Z:68b54cd0-08a5-49bd-ad39-6000f699b2dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5c365f00-18d0-48e9-8968-423a720091b3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11302',
  'x-ms-correlation-request-id',
  '7185842a-ed3e-4eba-8bb2-e5db3f3cb83f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072410Z:7185842a-ed3e-4eba-8bb2-e5db3f3cb83f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bfc338af-4c7d-4841-b7c2-db1aeb8c7199',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11301',
  'x-ms-correlation-request-id',
  'fbdf2a28-fef7-485e-931a-9f93ebffa341',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072410Z:fbdf2a28-fef7-485e-931a-9f93ebffa341',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2b86b9e1-1209-4017-930e-9c705edf82c4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11300',
  'x-ms-correlation-request-id',
  '82aea406-de6a-4ba1-9cef-92b9e707b266',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072410Z:82aea406-de6a-4ba1-9cef-92b9e707b266',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:59ffe3a4-b8b5-4cdc-956d-9964a34782ec',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11299',
  'x-ms-correlation-request-id',
  '942224f9-cd9e-4091-be92-3863939ebb3a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072411Z:942224f9-cd9e-4091-be92-3863939ebb3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:127e078c-204f-4575-a9f1-9d614e5b21ef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11298',
  'x-ms-correlation-request-id',
  'c6a1dc9a-0ad2-44cd-8eb2-241c4795182d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072411Z:c6a1dc9a-0ad2-44cd-8eb2-241c4795182d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6510f741-3710-43c1-8e96-2e7f9b86b6a0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11297',
  'x-ms-correlation-request-id',
  'de48f6a6-30ea-4c48-bfe2-fcab7d0d46aa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072411Z:de48f6a6-30ea-4c48-bfe2-fcab7d0d46aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1ab71efd-2c64-406d-ade5-3270dff18183',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11296',
  'x-ms-correlation-request-id',
  'bf5a765b-89b7-49ce-93f0-4b2f8d22ec4e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072411Z:bf5a765b-89b7-49ce-93f0-4b2f8d22ec4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:34d40490-04cd-4873-9187-352dddb5e309',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11295',
  'x-ms-correlation-request-id',
  '032682b2-f28b-4f1a-a186-d9824134ea97',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072412Z:032682b2-f28b-4f1a-a186-d9824134ea97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:db23cbd2-066f-40b0-a258-3539434c8f64',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11294',
  'x-ms-correlation-request-id',
  'a828df0c-20a7-4137-9b97-52ac1aaf3a2f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072412Z:a828df0c-20a7-4137-9b97-52ac1aaf3a2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5e66ecc0-ef6c-489b-b5ab-dd8b7d45b90c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11293',
  'x-ms-correlation-request-id',
  '18374da9-fe0c-4fc2-a918-8157fcfe6905',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072412Z:18374da9-fe0c-4fc2-a918-8157fcfe6905',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c3c45b78-efd6-4d9f-b0b2-1e5f1b1fca62',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11292',
  'x-ms-correlation-request-id',
  'c2702eb7-f9c7-4ccc-b957-f93c9adc5981',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072413Z:c2702eb7-f9c7-4ccc-b957-f93c9adc5981',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:06ac252d-80fb-4538-bad6-67c430c42b39',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11291',
  'x-ms-correlation-request-id',
  '1986929c-5a7c-47e0-9dc4-70316f1db617',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072413Z:1986929c-5a7c-47e0-9dc4-70316f1db617',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8f3acccb-05a1-4d9c-b051-e07acad3be3f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11290',
  'x-ms-correlation-request-id',
  'ecdf99c9-718e-4dbb-8904-e64da0401500',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072413Z:ecdf99c9-718e-4dbb-8904-e64da0401500',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a5e74467-fd00-4ae8-a182-472df31c84e6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11289',
  'x-ms-correlation-request-id',
  '7a3d226e-b012-4afe-b7eb-5bf2b08bafd9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072414Z:7a3d226e-b012-4afe-b7eb-5bf2b08bafd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:629a5653-3e4e-4778-9b06-5511efd610b8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11288',
  'x-ms-correlation-request-id',
  'a1e9d8dd-4d32-4471-a0e7-a33c29efa583',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072414Z:a1e9d8dd-4d32-4471-a0e7-a33c29efa583',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:211215f3-4e54-4a19-87ab-0b4778db4f5a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11287',
  'x-ms-correlation-request-id',
  'c3d055b6-bf51-41ea-a534-5731dce42e27',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072414Z:c3d055b6-bf51-41ea-a534-5731dce42e27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:94b3ccd3-c838-43a4-b093-2cf876d2a07e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11286',
  'x-ms-correlation-request-id',
  '09b62016-c6a3-45ec-b462-707d99825c08',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072415Z:09b62016-c6a3-45ec-b462-707d99825c08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1526dd0b-e932-4f38-baef-52ce0594fa97',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11285',
  'x-ms-correlation-request-id',
  '911d1f5d-5b4e-4e4b-a302-0b955754e3e7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072415Z:911d1f5d-5b4e-4e4b-a302-0b955754e3e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:48b7794b-9a49-41dd-b003-e7a7a4e96bc6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11284',
  'x-ms-correlation-request-id',
  '9eb4cb21-b086-4ab1-89dd-3313ee33285a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072415Z:9eb4cb21-b086-4ab1-89dd-3313ee33285a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a9886cf2-7900-4acd-8423-d6f0cbb74491',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11283',
  'x-ms-correlation-request-id',
  '14380c72-d768-4451-9234-b3e273643574',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072416Z:14380c72-d768-4451-9234-b3e273643574',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:126e81c8-f995-4444-bb9d-5747571e0a0a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11282',
  'x-ms-correlation-request-id',
  '92a270f1-312e-4ade-870b-d6de9a74e213',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072416Z:92a270f1-312e-4ade-870b-d6de9a74e213',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:62ddd016-bb4e-4dd0-916d-5547b393d0dc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11281',
  'x-ms-correlation-request-id',
  'e4f72641-cb0b-413e-a99d-bf1b8b4c21fc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072416Z:e4f72641-cb0b-413e-a99d-bf1b8b4c21fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d5864555-e4fd-4cbd-b17f-da30813a14d9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11280',
  'x-ms-correlation-request-id',
  '0244c805-1a7a-4657-b8de-363e5a592b5e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072416Z:0244c805-1a7a-4657-b8de-363e5a592b5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c4c89b91-6d64-468f-85ee-b67055c3ef20',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11279',
  'x-ms-correlation-request-id',
  '90c176c3-92a3-4919-bcf1-5a81b144a8d4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072417Z:90c176c3-92a3-4919-bcf1-5a81b144a8d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2793dbd8-4d60-4ac5-a3f3-a711c8379203',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11278',
  'x-ms-correlation-request-id',
  'f93f0f13-d4b8-475e-b605-20803874d8e4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072417Z:f93f0f13-d4b8-475e-b605-20803874d8e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9638b049-53b2-45c4-83e8-3e009076d097',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11277',
  'x-ms-correlation-request-id',
  '039b3c3a-23e9-4030-9a69-462dc48c52d9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072417Z:039b3c3a-23e9-4030-9a69-462dc48c52d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:56c61a4d-6eae-4c8c-8d7d-e1df6d5310a3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11276',
  'x-ms-correlation-request-id',
  '695974ca-5e10-479c-9fb2-b8eba59e08a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072418Z:695974ca-5e10-479c-9fb2-b8eba59e08a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:020c9500-f71c-488d-9e25-e3a177d4b7ad',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11275',
  'x-ms-correlation-request-id',
  'c9eef181-4de7-4627-abca-56e1cffafb64',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072418Z:c9eef181-4de7-4627-abca-56e1cffafb64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c53e98b7-bedd-4766-8fc8-744e231c3432',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11274',
  'x-ms-correlation-request-id',
  'e09d4dcd-c9ef-41bd-b656-8a7028c42547',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072418Z:e09d4dcd-c9ef-41bd-b656-8a7028c42547',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:995ff0c0-237b-4a63-aa49-8dc4735c581c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11273',
  'x-ms-correlation-request-id',
  'a289aa3e-3028-49df-ae16-023431a20464',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072419Z:a289aa3e-3028-49df-ae16-023431a20464',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:48b48558-9e8e-445c-b922-023f7794968a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11272',
  'x-ms-correlation-request-id',
  'a270b617-bf82-475a-af1a-594f3ef2a733',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072419Z:a270b617-bf82-475a-af1a-594f3ef2a733',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9a112e60-81d0-4f18-839b-f5094137852d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11271',
  'x-ms-correlation-request-id',
  '4af1650e-3653-4c5e-ba49-c2b5a3bd4744',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072419Z:4af1650e-3653-4c5e-ba49-c2b5a3bd4744',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:87475946-8b5f-4bd6-8980-7abc04613385',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11270',
  'x-ms-correlation-request-id',
  'f5206382-f4a7-47bc-abf2-c16af880a8bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072420Z:f5206382-f4a7-47bc-abf2-c16af880a8bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1ebd42a2-521e-461c-bd14-2aabd0e835b5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11269',
  'x-ms-correlation-request-id',
  '7f9cee82-63ef-4b6a-94f4-ab6635bb4448',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072420Z:7f9cee82-63ef-4b6a-94f4-ab6635bb4448',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f966bcc9-6f64-455c-896e-fa162ff1ec81',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11268',
  'x-ms-correlation-request-id',
  '3353a0d5-9d4f-4541-aef7-88cd1b1e6303',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072420Z:3353a0d5-9d4f-4541-aef7-88cd1b1e6303',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e316612f-1a3e-4d28-a1bd-346f92a23e75',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11267',
  'x-ms-correlation-request-id',
  '21dd7d7e-6931-4a97-a1e4-a5f9c9d6e1dc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072420Z:21dd7d7e-6931-4a97-a1e4-a5f9c9d6e1dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f2ad6f40-96b3-47d2-af26-831bbef019f2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11266',
  'x-ms-correlation-request-id',
  '16bd40a4-0a72-45bd-8920-58b1c82d5307',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072421Z:16bd40a4-0a72-45bd-8920-58b1c82d5307',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b4ce0c66-745c-40ab-b4b7-04a4cdd6dc7f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11265',
  'x-ms-correlation-request-id',
  'e5a33773-d151-4a6b-931d-178d17154363',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072421Z:e5a33773-d151-4a6b-931d-178d17154363',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c2b7c652-8acc-49e4-a1ff-f4a5f6a5c8e7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11264',
  'x-ms-correlation-request-id',
  '4fe6799e-ecf8-4b73-8239-49a0e87532c4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072421Z:4fe6799e-ecf8-4b73-8239-49a0e87532c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8315dee0-0eb8-499e-8332-9d0d4b1a2a74',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11263',
  'x-ms-correlation-request-id',
  'b3c8a004-7ea3-4fbd-a963-6663bd0cda56',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072422Z:b3c8a004-7ea3-4fbd-a963-6663bd0cda56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:99d75d37-fa32-4690-b4f6-bbf210af8144',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11262',
  'x-ms-correlation-request-id',
  '6da5859d-57dc-447b-b68a-c8283a843a58',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072422Z:6da5859d-57dc-447b-b68a-c8283a843a58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:413627b5-e3c1-4d3c-96c3-949892061a33',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11261',
  'x-ms-correlation-request-id',
  'bc30e0ad-b509-44d0-99a6-c45465f4556b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072422Z:bc30e0ad-b509-44d0-99a6-c45465f4556b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:81b24159-f2e5-423c-993a-495784d9f58c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11260',
  'x-ms-correlation-request-id',
  '3652e38c-e3e5-486a-97d8-49b123d6b984',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072423Z:3652e38c-e3e5-486a-97d8-49b123d6b984',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d92accf2-3227-4959-b56f-544452db401e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11259',
  'x-ms-correlation-request-id',
  '0e2c8f18-1907-4b79-b309-e65bc085cca3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072423Z:0e2c8f18-1907-4b79-b309-e65bc085cca3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c37ce4de-e646-4a34-8f88-0e0ed1e7c751',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11258',
  'x-ms-correlation-request-id',
  'a4aec5d9-6ffe-443a-8b59-e1f946ad3bc8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072423Z:a4aec5d9-6ffe-443a-8b59-e1f946ad3bc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:396f3c7e-1abc-444b-a554-b16896c588a5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11257',
  'x-ms-correlation-request-id',
  '0a92f00c-bfe6-46ee-9a5c-d0d335948d46',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072423Z:0a92f00c-bfe6-46ee-9a5c-d0d335948d46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:964c5577-19f4-4caa-aae9-68d389349132',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11256',
  'x-ms-correlation-request-id',
  'd72d3fec-1036-4c53-a3df-92ed4556c74b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072424Z:d72d3fec-1036-4c53-a3df-92ed4556c74b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:72241aca-cf07-4a7e-855a-56fb1df527e0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11255',
  'x-ms-correlation-request-id',
  'd5891f52-e287-4889-8b2c-fbc4d87f3535',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072424Z:d5891f52-e287-4889-8b2c-fbc4d87f3535',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b42fedc5-46a2-4569-a6f2-4e6ee47932c3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11254',
  'x-ms-correlation-request-id',
  '6c78c53c-1528-450a-bdeb-1b25dd37f812',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072424Z:6c78c53c-1528-450a-bdeb-1b25dd37f812',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:95cadfbb-6e30-4e82-a44a-9fb8627fd063',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11253',
  'x-ms-correlation-request-id',
  '0dbea786-f7fb-4558-950c-ed5c961cc1a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072425Z:0dbea786-f7fb-4558-950c-ed5c961cc1a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f0169d07-8126-4c83-801b-ec29361d4b71',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11252',
  'x-ms-correlation-request-id',
  '74e8a8ac-34cd-483b-8506-34ad4e9ad943',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072425Z:74e8a8ac-34cd-483b-8506-34ad4e9ad943',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4519aa91-bc7b-45de-ab63-e3bc336b84a0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11251',
  'x-ms-correlation-request-id',
  'b0e0d763-181b-4715-81ce-9972bcb30913',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072425Z:b0e0d763-181b-4715-81ce-9972bcb30913',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6267adcf-3927-44d1-aeb0-425d4244e906',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11250',
  'x-ms-correlation-request-id',
  '049b8e12-3282-449f-8f82-59621f9386fb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072426Z:049b8e12-3282-449f-8f82-59621f9386fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d88a6aa7-3fd4-4d0f-8fa5-028aadaaabfb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11249',
  'x-ms-correlation-request-id',
  '015b41b9-7ed0-4d38-bc62-80d9780fbb33',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072426Z:015b41b9-7ed0-4d38-bc62-80d9780fbb33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4810ba03-f610-447e-918f-683e73f9cb0b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11248',
  'x-ms-correlation-request-id',
  'be78914e-3c79-4cbf-b7fd-3eeee43292eb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072426Z:be78914e-3c79-4cbf-b7fd-3eeee43292eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:da9a54f0-6f46-423d-ab69-863cd84ee268',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11247',
  'x-ms-correlation-request-id',
  '08b41e98-a9aa-4cee-9cdc-3564b25b18db',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072426Z:08b41e98-a9aa-4cee-9cdc-3564b25b18db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6a24bcce-e3e6-4f59-9d0a-255bf8e0895b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11246',
  'x-ms-correlation-request-id',
  '5095c4c0-3ba7-4c1e-b358-87d9ac7597f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072427Z:5095c4c0-3ba7-4c1e-b358-87d9ac7597f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f25d92b1-9c3c-4c4f-9524-072037539dad',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11245',
  'x-ms-correlation-request-id',
  '622bb63a-8576-4d21-a422-db7aa3c20a36',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072427Z:622bb63a-8576-4d21-a422-db7aa3c20a36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3ce99837-8335-4cb0-9092-b13009f2abb3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11244',
  'x-ms-correlation-request-id',
  'b940ca72-28b0-4d33-894f-a044213a3f57',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072427Z:b940ca72-28b0-4d33-894f-a044213a3f57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8dd1fb8d-2ce8-4a9f-9ee2-7233ae17ef63',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11243',
  'x-ms-correlation-request-id',
  '8ce9a886-58a2-4e83-b0df-e2924017f67f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072428Z:8ce9a886-58a2-4e83-b0df-e2924017f67f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4b2aeddc-db27-4d1d-9428-022ae2421eae',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11242',
  'x-ms-correlation-request-id',
  '4d3bfa0d-995f-477f-8ea1-bdf9674fbefc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072428Z:4d3bfa0d-995f-477f-8ea1-bdf9674fbefc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:54519aca-b506-4f93-91cd-3d0f41c56b1e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11241',
  'x-ms-correlation-request-id',
  '9a660d39-d2e9-4f7e-a8bc-3fab6786fcad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072428Z:9a660d39-d2e9-4f7e-a8bc-3fab6786fcad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0917e15c-edd9-45ca-adb3-674aa1f9fca8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11240',
  'x-ms-correlation-request-id',
  'ce1e01fe-549c-4cc3-97d6-20a01ab585b1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072428Z:ce1e01fe-549c-4cc3-97d6-20a01ab585b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8e9a776e-bbc4-4db6-b396-1a5e906e89c3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11239',
  'x-ms-correlation-request-id',
  'e28a520c-71e5-44f2-ab18-f8a5a8f03f2f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072429Z:e28a520c-71e5-44f2-ab18-f8a5a8f03f2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b77baad6-fe2b-4933-a3c8-ff61916005b2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11238',
  'x-ms-correlation-request-id',
  '163a6885-0d5f-441c-8535-a56c3675df94',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072429Z:163a6885-0d5f-441c-8535-a56c3675df94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b11aed85-7d46-4c4e-bc7b-892d281b89ad',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11237',
  'x-ms-correlation-request-id',
  'd672520a-8894-4f4e-be26-8162350711d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072429Z:d672520a-8894-4f4e-be26-8162350711d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3ca40a65-793a-435b-afc1-7209593127ba',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11236',
  'x-ms-correlation-request-id',
  'c53507e2-3d5b-49b6-9ed5-bdda28be4d41',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072430Z:c53507e2-3d5b-49b6-9ed5-bdda28be4d41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8095012c-188e-4b9f-8baf-94bbb69301dd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11235',
  'x-ms-correlation-request-id',
  '542ef627-fc15-449d-9ab5-d36d90d4290a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072430Z:542ef627-fc15-449d-9ab5-d36d90d4290a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a2e2ca12-85e5-4393-91b7-000dc109197b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11234',
  'x-ms-correlation-request-id',
  '2b5cd169-8802-45df-abc1-1b3bca92fa15',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072430Z:2b5cd169-8802-45df-abc1-1b3bca92fa15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9aa9983e-3038-4f92-8edf-f1397d901d43',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11233',
  'x-ms-correlation-request-id',
  '78640cf5-97bb-4618-98bd-9e83453556fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072430Z:78640cf5-97bb-4618-98bd-9e83453556fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fe45a320-b135-40bc-87de-00e4436d3929',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11232',
  'x-ms-correlation-request-id',
  'f1dc2322-5c50-4bc8-b3f4-a16bd2bca1da',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072431Z:f1dc2322-5c50-4bc8-b3f4-a16bd2bca1da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0b51b00b-74f6-48a7-8fa6-10aa666ff064',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11231',
  'x-ms-correlation-request-id',
  '6b928bec-22e5-422e-8a53-7d5eda9b42e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072431Z:6b928bec-22e5-422e-8a53-7d5eda9b42e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1a4b8bc6-7251-4376-b7b9-e958dd49e9ff',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11230',
  'x-ms-correlation-request-id',
  '901b2a50-63e2-4a38-a0ad-3fdfd81fdcdb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072431Z:901b2a50-63e2-4a38-a0ad-3fdfd81fdcdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2094d47b-7e7b-4175-9461-7e85f55e6a97',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11229',
  'x-ms-correlation-request-id',
  '7bb1e936-34ef-4de7-9004-411799415229',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072432Z:7bb1e936-34ef-4de7-9004-411799415229',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ea421d2b-8de2-47d7-9bf4-19e8f511e092',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11228',
  'x-ms-correlation-request-id',
  'aaa1c3eb-3a80-4c01-9ea3-46ffb69a741a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072432Z:aaa1c3eb-3a80-4c01-9ea3-46ffb69a741a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:309dcdc5-6165-4390-9748-3eee9bae1c97',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11227',
  'x-ms-correlation-request-id',
  'ce1c6e57-133b-4874-ba6b-061a0fa7d790',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072432Z:ce1c6e57-133b-4874-ba6b-061a0fa7d790',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:baee0ff5-15d4-4f22-8b44-e8c63500e8d3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11226',
  'x-ms-correlation-request-id',
  '8284b593-d15e-4003-ab27-17835825d914',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072432Z:8284b593-d15e-4003-ab27-17835825d914',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4ebeec4b-fb3a-4f4a-b3c8-253efad292ea',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11225',
  'x-ms-correlation-request-id',
  '6da9d351-521b-4025-b671-493ea345c426',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072433Z:6da9d351-521b-4025-b671-493ea345c426',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:604be31b-16e1-4595-ba28-4e17715e9667',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11224',
  'x-ms-correlation-request-id',
  '9474da67-71f5-4458-8392-a370d6552c45',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072433Z:9474da67-71f5-4458-8392-a370d6552c45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:49a74f95-0525-4103-8031-1838ea02f3cc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11223',
  'x-ms-correlation-request-id',
  'b59f0d93-0fb9-4707-a474-212c271356f2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072433Z:b59f0d93-0fb9-4707-a474-212c271356f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:476f8430-7478-4334-ab26-146fe835131b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11222',
  'x-ms-correlation-request-id',
  '52002dd6-bb2e-4e6a-a1ec-815eca63e8a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072434Z:52002dd6-bb2e-4e6a-a1ec-815eca63e8a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d50aa4b0-e098-4f7a-9465-9727b184ad0b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11221',
  'x-ms-correlation-request-id',
  'ba50ff87-0998-4d66-994c-3cb40940958b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072434Z:ba50ff87-0998-4d66-994c-3cb40940958b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7a7d9a3c-fffc-4147-90d8-5d0c1b7e547a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11220',
  'x-ms-correlation-request-id',
  'f9e7800f-34b8-404e-8884-24b48bcf05cb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072434Z:f9e7800f-34b8-404e-8884-24b48bcf05cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:634dae82-a6a1-4f3f-b008-6089aef673b4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11219',
  'x-ms-correlation-request-id',
  '5187cdb1-9976-4ccc-8f5c-362cfdd664c6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072434Z:5187cdb1-9976-4ccc-8f5c-362cfdd664c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d605d0db-db5b-497e-8f14-c8d6b7a5556b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11218',
  'x-ms-correlation-request-id',
  'd60777ad-3a1d-4d13-8d33-c988695ece1c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072435Z:d60777ad-3a1d-4d13-8d33-c988695ece1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a6c44bd3-182d-404a-a4c6-119cb24f5dd9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11217',
  'x-ms-correlation-request-id',
  'c520d8a4-9181-4436-b685-263bcea3383b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072435Z:c520d8a4-9181-4436-b685-263bcea3383b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:046a99df-f2b7-4a48-8420-84f89b951d27',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11216',
  'x-ms-correlation-request-id',
  '561ceb14-102e-4b1e-a3ae-6bb094d4fe28',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072435Z:561ceb14-102e-4b1e-a3ae-6bb094d4fe28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ada4a293-693f-481f-88ee-fe8bdd03d72f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11215',
  'x-ms-correlation-request-id',
  '0188a925-b52f-45ec-a634-5008535f312d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072436Z:0188a925-b52f-45ec-a634-5008535f312d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7882252b-65f7-4165-b7b4-d1aff2ad4f61',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11214',
  'x-ms-correlation-request-id',
  '23a79993-9c88-4f40-b942-2c31ebc8e89c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072436Z:23a79993-9c88-4f40-b942-2c31ebc8e89c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7cda4063-e40d-4ed6-b5a5-fb3955d5c087',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11213',
  'x-ms-correlation-request-id',
  '60bb133e-ae34-483c-9e78-692663c40156',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072436Z:60bb133e-ae34-483c-9e78-692663c40156',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7905808d-2306-4ebe-a5e8-c42b15063455',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11212',
  'x-ms-correlation-request-id',
  '80b0a348-f3f0-445e-8c66-b4ee0eeac3e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072437Z:80b0a348-f3f0-445e-8c66-b4ee0eeac3e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:831f4f56-96c5-4845-99aa-55a1e171a063',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11211',
  'x-ms-correlation-request-id',
  'fd0faa4e-581c-4436-9b41-14f2160772dc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072437Z:fd0faa4e-581c-4436-9b41-14f2160772dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e5c7e7e5-9c4f-4c1d-a0c0-a140e8155967',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11210',
  'x-ms-correlation-request-id',
  'fc1ae2ab-0aee-42d1-a2ed-beddbd5601a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072437Z:fc1ae2ab-0aee-42d1-a2ed-beddbd5601a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:00a5d919-02bf-418d-8399-a3fba47660f7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11209',
  'x-ms-correlation-request-id',
  'f030a9e9-9793-4461-8afd-11932ce5360a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072437Z:f030a9e9-9793-4461-8afd-11932ce5360a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7a74eb54-8307-4a1c-b7fd-e39de6a2ad64',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11208',
  'x-ms-correlation-request-id',
  '5f696903-2cb3-47bb-9592-3cf5f193ff60',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072438Z:5f696903-2cb3-47bb-9592-3cf5f193ff60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:81e9b6ff-4a60-49b9-9058-5b59928b9ddf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11207',
  'x-ms-correlation-request-id',
  '79034cc0-1475-4399-8782-354bb10cbcb1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072438Z:79034cc0-1475-4399-8782-354bb10cbcb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:73a3f503-783d-4aef-987c-409e2c1e1d5f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11206',
  'x-ms-correlation-request-id',
  '4beb3ccd-ff26-4a3e-afb4-a67624956d62',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072438Z:4beb3ccd-ff26-4a3e-afb4-a67624956d62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:031f4058-db30-432b-9a0d-4e9d59f7eb58',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11205',
  'x-ms-correlation-request-id',
  'ab8fd9c2-f46e-4682-93be-a4e525f03634',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072439Z:ab8fd9c2-f46e-4682-93be-a4e525f03634',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:343abb8b-0501-4787-8763-a79bce42aa02',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11204',
  'x-ms-correlation-request-id',
  'bf5abd97-b6ed-4621-ab6e-2602a6ebed74',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072439Z:bf5abd97-b6ed-4621-ab6e-2602a6ebed74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b607fc32-8075-4a84-b514-05a60b3fa638',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11203',
  'x-ms-correlation-request-id',
  'b4eae8a7-398c-407e-a303-bf2867c2d68b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072439Z:b4eae8a7-398c-407e-a303-bf2867c2d68b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b41aef84-7e83-4bd6-951b-b1059be9a90e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11202',
  'x-ms-correlation-request-id',
  '8e7c1a89-0eaa-47fb-bfff-58fe13fa2a03',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072439Z:8e7c1a89-0eaa-47fb-bfff-58fe13fa2a03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2c84c43f-9e59-4d14-b415-10057311c108',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11201',
  'x-ms-correlation-request-id',
  '64e04868-45e4-494d-8fc1-28d9ccd7860e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072440Z:64e04868-45e4-494d-8fc1-28d9ccd7860e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3d0460f3-81de-45a9-8d23-8eed13080340',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11200',
  'x-ms-correlation-request-id',
  '397bab8b-54e6-4d02-b1d7-1bfb41e1e402',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072440Z:397bab8b-54e6-4d02-b1d7-1bfb41e1e402',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5a15cef8-084b-4890-9bd6-4dc57dd9acc6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11199',
  'x-ms-correlation-request-id',
  '01f466e2-81fe-47ea-8436-93580053fcbe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072440Z:01f466e2-81fe-47ea-8436-93580053fcbe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:12cc08e2-f0fc-4ec0-b60d-5aa458966feb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11198',
  'x-ms-correlation-request-id',
  '29ab685f-ef96-47e6-8843-92a5efa004f8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072441Z:29ab685f-ef96-47e6-8843-92a5efa004f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:575d9031-f290-4a2e-8d6a-54b992a3728f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11197',
  'x-ms-correlation-request-id',
  'fbcac7cb-6009-4e20-aad9-25f1dd2fea8b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072441Z:fbcac7cb-6009-4e20-aad9-25f1dd2fea8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7573b91f-0c6d-41ab-8ab4-0c9840e23084',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11196',
  'x-ms-correlation-request-id',
  '9abe9ea9-ebae-4196-88b7-c1f850929c2c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072441Z:9abe9ea9-ebae-4196-88b7-c1f850929c2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c4102530-9d68-4bf7-968d-c0cf96784bbf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11195',
  'x-ms-correlation-request-id',
  '01a62b1a-b8b9-466a-ad29-bd34080dea08',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072442Z:01a62b1a-b8b9-466a-ad29-bd34080dea08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e307d8f1-a2bf-41b6-b58b-d21c28462736',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11194',
  'x-ms-correlation-request-id',
  '4bb4658d-7cbd-4c4c-8beb-f54e222eb7dd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072442Z:4bb4658d-7cbd-4c4c-8beb-f54e222eb7dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:736e0819-8cba-4880-a4fe-182692e3a2a5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11193',
  'x-ms-correlation-request-id',
  '002909a1-4afd-4474-bbdb-636b2da5bb09',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072442Z:002909a1-4afd-4474-bbdb-636b2da5bb09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ce4f929f-c23e-43d8-8656-6eda3854605a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11192',
  'x-ms-correlation-request-id',
  'b8f3dbb0-e3d5-433f-8de6-537fe2eddf88',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072442Z:b8f3dbb0-e3d5-433f-8de6-537fe2eddf88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZURlcHJvdmlzaW9uaW5nSm9iOjJEUkdBOjJETVlKU1RFU1Q6MkRNWVdPUktTUEFDRVhYIn0')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5e4fa7793ecb671ffd","92ff0720887be416000000"], [
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
  'Accept-Encoding,Accept-Encoding',
  'x-ms-request-id',
  'westus:d345b7b4-5d09-4dc0-9dec-1381680500aa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11191',
  'x-ms-correlation-request-id',
  'a2805318-b4e9-4954-b5ff-f9e5699dc852',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072443Z:a2805318-b4e9-4954-b5ff-f9e5699dc852',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:24:43 GMT'
]);
