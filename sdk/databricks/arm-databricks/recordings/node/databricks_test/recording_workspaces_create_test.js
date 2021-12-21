let nock = require('nock');

module.exports.hash = "bafe00566d6708d73706124b815d503a";

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
  'e0170dd1-a540-4246-afce-71fb7f520b00',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Atc_WCv5tP9Ej3XQA2IqIpU; expires=Sun, 16-Jan-2022 08:27:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4cKHZn8STSPIa5KCS9xtqnSOoAy2qU0zsFSMvoQCQyJMMmYYNwRvKqkffU--yT9GEKU1Jm-dSKsJcXK1b-oklG0wOcWjABCQYVnZW1lD2TTZYN0r7eScbpcokQc8FeuoE-oG9EgGMirUpuzDStWT3kEHXAHUNZqs6wjRX2xzdUIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 08:27:39 GMT',
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
  '8dec96df-7372-437d-abcf-6e4bb3870b00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsSgE6B2hKZFpTu9qKaJNOU; expires=Sun, 16-Jan-2022 08:27:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsYMQlHpo-H0W3cVXsrNdggvQltLwuhZ8WzJ2b6LFiPwAsE0bCLmhjZ-yCWni9WEuyEdzrVX0fjUXmQVlVDAoAk_zqLKyfaTuIqhcsTkpvC1RxKmtNvSDwdyMTsXPPrU-7bFqWR9XQnQ62kzW_usPD1ma6dPhPylRgQ5g7JewU1ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 08:27:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c606e6e6-9e84-4c59-ac2a-bedf9e20208f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'e9fffaaa-ac72-407c-a105-da260c140b00',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ak4b7FLsEd1NidRKqp7-31vLj78gAQAAAPxATtkOAAAA; expires=Sun, 16-Jan-2022 08:27:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 08:27:39 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/workspaces/myworkspacexx', {"location":"westus","sku":{"name":"Standard"},"properties":{"managedResourceGroupId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest2"}})
  .query(true)
  .reply(201, {"properties":{"managedResourceGroupId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest2","provisioningState":"Accepted","authorizations":[{"principalId":"9a74af6f-d153-4348-988a-e2672920bee9","roleDefinitionId":"8e3af657-a8ff-443c-a75c-2fe8c4bcb635"}],"createdBy":{"oid":"4fe69287-f032-4322-a516-848ba6ae7657","applicationId":"azure_client_id"},"updatedBy":{"oid":"4fe69287-f032-4322-a516-848ba6ae7657","applicationId":"azure_client_id"},"createdDateTime":"2021-12-17T08:27:47.3431986Z"},"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/workspaces/myworkspacexx","name":"myworkspacexx","type":"Microsoft.Databricks/workspaces","sku":{"name":"Standard"},"location":"westus"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '809',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'x-ms-request-id',
  'westus:b535b3b4-6643-4047-802b-0d6455fa5cc8',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '149',
  'x-ms-correlation-request-id',
  '2a840a08-f468-4710-9db0-486d1e4f7b73',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082748Z:2a840a08-f468-4710-9db0-486d1e4f7b73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c6d19cbb-a71a-4654-9fff-ee949256ba89',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '7727654c-a43a-4db3-946c-504774a71895',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082749Z:7727654c-a43a-4db3-946c-504774a71895',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2d2874b4-8d4b-455f-a278-32bfaeab2e42',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  'ef3e6733-edd4-4819-af78-7f0f2892dfdd',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082749Z:ef3e6733-edd4-4819-af78-7f0f2892dfdd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:aa3ad2cc-809a-4ea3-b904-cf4a65ebb2ef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  '56ed679f-aa4e-4b61-b3d5-a6981be12e29',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082749Z:56ed679f-aa4e-4b61-b3d5-a6981be12e29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f2126bc4-c318-4fb7-b0d4-d261e03e9dda',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  '61751ab3-d868-44bc-82c9-81cbb4d62c5b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082749Z:61751ab3-d868-44bc-82c9-81cbb4d62c5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2cec0314-244c-4e38-9fd1-9ab1c904dcd8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11995',
  'x-ms-correlation-request-id',
  'ab780ff9-4738-422d-a29d-e64736a5abe0',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082750Z:ab780ff9-4738-422d-a29d-e64736a5abe0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9a37c844-53ff-4e10-aa49-67b0bf88effd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11994',
  'x-ms-correlation-request-id',
  '99ac423f-d8b6-405c-bb42-96f941041ad9',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082750Z:99ac423f-d8b6-405c-bb42-96f941041ad9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5e401328-f46b-4a8c-ad05-3a0a1dca363b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11993',
  'x-ms-correlation-request-id',
  '9bfc811c-0daf-4fa1-b7f1-f6827d684260',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082750Z:9bfc811c-0daf-4fa1-b7f1-f6827d684260',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f241088f-d2e3-4f01-8ffb-549c5114bc8c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-correlation-request-id',
  '349d2875-3f05-42ad-8374-2f544c0438c7',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082750Z:349d2875-3f05-42ad-8374-2f544c0438c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9270152f-92cd-4ac0-80bc-7a4c574dacd7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11991',
  'x-ms-correlation-request-id',
  '07e29373-b780-42d2-b665-c7f2caba6452',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082751Z:07e29373-b780-42d2-b665-c7f2caba6452',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b08ddbc8-e408-4e2f-bcb3-d47130bf390b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11990',
  'x-ms-correlation-request-id',
  '10f8cc69-f933-473e-b30d-a892624646ef',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082751Z:10f8cc69-f933-473e-b30d-a892624646ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0b038635-e57e-4f14-bed7-4da64af92d16',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11989',
  'x-ms-correlation-request-id',
  '964ae0df-54f8-4779-8d69-ca339d42da4a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082751Z:964ae0df-54f8-4779-8d69-ca339d42da4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9d2f6d19-0f24-44a7-9eb8-3e9f9cb69377',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11988',
  'x-ms-correlation-request-id',
  '3878b0d8-e2d5-44e8-a648-9aec15a4e7af',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082751Z:3878b0d8-e2d5-44e8-a648-9aec15a4e7af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4d74be32-5171-4fb3-8cf3-97a06f4db477',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11987',
  'x-ms-correlation-request-id',
  'ee34838c-6eb2-4d4f-a95f-1f425cccbe61',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082752Z:ee34838c-6eb2-4d4f-a95f-1f425cccbe61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:625cd19e-21a7-4b48-b55e-9981ef8d2327',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11986',
  'x-ms-correlation-request-id',
  '405e051a-3d63-4605-ab6b-e89ba358e1dc',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082752Z:405e051a-3d63-4605-ab6b-e89ba358e1dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b3a8146d-ee86-4ba1-ab4a-81255bdbcbba',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11985',
  'x-ms-correlation-request-id',
  'dcdab57f-a5d0-4f7f-9718-2fa84892efe7',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082752Z:dcdab57f-a5d0-4f7f-9718-2fa84892efe7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:69e6bbf4-0679-4dc1-b7e5-ea323e917242',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11984',
  'x-ms-correlation-request-id',
  '16d948c9-4b5b-4ec7-8e97-3a19ed3fd22c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082752Z:16d948c9-4b5b-4ec7-8e97-3a19ed3fd22c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0f0983ff-9272-4fea-b3e7-c0b2ac25f86e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11983',
  'x-ms-correlation-request-id',
  'a5b4f1c9-8dfe-4666-a422-5166bda706aa',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082753Z:a5b4f1c9-8dfe-4666-a422-5166bda706aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9f5254e8-2807-4ddf-9a33-6d81e959f72a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11982',
  'x-ms-correlation-request-id',
  '4d70cfeb-843e-4687-9b36-7691d11e9cc6',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082753Z:4d70cfeb-843e-4687-9b36-7691d11e9cc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6e53c769-5b14-4869-b195-8957bc90148a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11981',
  'x-ms-correlation-request-id',
  'f9827d52-7aef-44f8-b4f1-7ad8d3e5f79d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082753Z:f9827d52-7aef-44f8-b4f1-7ad8d3e5f79d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c6a11fb9-209b-4928-98cb-5bcff09ba2d3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11980',
  'x-ms-correlation-request-id',
  'ed8aae6e-874d-4071-9d51-eec5358cea3b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082753Z:ed8aae6e-874d-4071-9d51-eec5358cea3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b339908e-0eaa-473f-a139-7ae619730d9f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11979',
  'x-ms-correlation-request-id',
  'd104c0c6-7e2f-4593-9ea0-1401f58d4d22',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082754Z:d104c0c6-7e2f-4593-9ea0-1401f58d4d22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:85c0feb0-8be6-4c9d-a607-4d84caa4a9e5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11978',
  'x-ms-correlation-request-id',
  'e40ebe33-841c-4bdb-a877-110c6fbdc55c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082754Z:e40ebe33-841c-4bdb-a877-110c6fbdc55c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:acd8b0d9-4be0-4ad4-867e-0d9177caf813',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11977',
  'x-ms-correlation-request-id',
  'b1ae917a-8ce4-4279-abeb-f3b4e2b000ce',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082754Z:b1ae917a-8ce4-4279-abeb-f3b4e2b000ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fc9c57dc-2658-4bfd-93a8-63b26ee277aa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11976',
  'x-ms-correlation-request-id',
  'b3c4284c-e555-47d3-bf13-378cf576c6dc',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082754Z:b3c4284c-e555-47d3-bf13-378cf576c6dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c6a428c5-17d8-42ef-93e6-6c78d71af91f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11975',
  'x-ms-correlation-request-id',
  '743eadd3-0101-435f-817d-5763350000b3',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082755Z:743eadd3-0101-435f-817d-5763350000b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a2ba9310-f4d5-4664-88fa-c4760df62116',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11974',
  'x-ms-correlation-request-id',
  '64791a9f-f57a-4570-b542-f1b197166efc',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082755Z:64791a9f-f57a-4570-b542-f1b197166efc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c0052557-68a4-468a-91f6-4b6e4d34a37e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11973',
  'x-ms-correlation-request-id',
  '472ffcd2-dfb1-490f-b44c-84a0bf8e8e26',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082755Z:472ffcd2-dfb1-490f-b44c-84a0bf8e8e26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e91f63d2-85b8-4d6d-a29f-113438f2fd57',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11972',
  'x-ms-correlation-request-id',
  'd9469a93-1180-401c-9859-a7de77d44cae',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082755Z:d9469a93-1180-401c-9859-a7de77d44cae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8a5c0873-b00f-4913-afd6-b94ad12a7d07',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11971',
  'x-ms-correlation-request-id',
  '86cbc6e5-d945-4eef-a37e-97dea6346f13',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082756Z:86cbc6e5-d945-4eef-a37e-97dea6346f13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e2e78108-f43f-4c9b-bedb-1535279294f7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11970',
  'x-ms-correlation-request-id',
  '956aa1d3-c7a4-4207-aa06-119d8b524a49',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082756Z:956aa1d3-c7a4-4207-aa06-119d8b524a49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fd0e9957-061e-44b9-96e5-1dc41b446584',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11969',
  'x-ms-correlation-request-id',
  '36e6d511-3ddb-456a-9792-be9a2113d2b8',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082756Z:36e6d511-3ddb-456a-9792-be9a2113d2b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7a2ca3e7-5847-4aba-bdbd-dc11fcee9189',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11968',
  'x-ms-correlation-request-id',
  'ff94aac3-438a-4f99-8653-0931a9d8005d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082756Z:ff94aac3-438a-4f99-8653-0931a9d8005d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2e094411-d523-4a36-828f-a8f4dd9a7a3b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11967',
  'x-ms-correlation-request-id',
  '72520b81-d1ef-4fb6-ade5-10eba87d7dd0',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082757Z:72520b81-d1ef-4fb6-ade5-10eba87d7dd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:87695a20-3882-4dd3-bdb0-1c29f91e3a75',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11966',
  'x-ms-correlation-request-id',
  'ff0ea0f3-5b12-491b-a379-36b589240ff5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082757Z:ff0ea0f3-5b12-491b-a379-36b589240ff5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6c0f1e9d-8d16-4876-9f09-6ea04bd031ef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11965',
  'x-ms-correlation-request-id',
  'bb82c66a-5e0a-4f77-aa91-2b6f6f4b90d5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082757Z:bb82c66a-5e0a-4f77-aa91-2b6f6f4b90d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:77fea52d-7c53-47cc-ba67-3353f571c231',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11964',
  'x-ms-correlation-request-id',
  '7e175de6-4ebe-4676-a7ac-4e74a5e662cf',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082757Z:7e175de6-4ebe-4676-a7ac-4e74a5e662cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:df4ba67d-9438-477b-9974-6ee5210e78df',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11963',
  'x-ms-correlation-request-id',
  'fb60041c-248e-4a97-b31d-f7c00a61a7ed',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082758Z:fb60041c-248e-4a97-b31d-f7c00a61a7ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:02e9598e-8a93-47dc-9152-137f0398082c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11962',
  'x-ms-correlation-request-id',
  'cedd5564-9527-4b30-86b9-94ae5b607473',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082758Z:cedd5564-9527-4b30-86b9-94ae5b607473',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:24f412de-dd7d-4dcd-96da-08d774404a13',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11961',
  'x-ms-correlation-request-id',
  'ef56519b-cfd0-411d-871f-6d02e9a20762',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082758Z:ef56519b-cfd0-411d-871f-6d02e9a20762',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e8d2cc81-c0f8-4e65-a7df-d24b2ce6a247',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11960',
  'x-ms-correlation-request-id',
  '4593de01-a40a-4e4a-97f1-7dfa426d98d9',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082758Z:4593de01-a40a-4e4a-97f1-7dfa426d98d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:d3603ee0-645f-4f4a-b996-6bae56838d73',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11959',
  'x-ms-correlation-request-id',
  'a7cd4371-0595-4199-93e0-bc3a5c2ed448',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082759Z:a7cd4371-0595-4199-93e0-bc3a5c2ed448',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e3fb841c-8c5d-4d1e-890a-0f0f789f872d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11958',
  'x-ms-correlation-request-id',
  '6d2ece28-5886-4d6f-9e8e-5b51895c1929',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082759Z:6d2ece28-5886-4d6f-9e8e-5b51895c1929',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6a0bb452-6754-4ced-a333-916bdece6331',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11957',
  'x-ms-correlation-request-id',
  'f37b49c8-e0df-4f56-8356-42140410e439',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082759Z:f37b49c8-e0df-4f56-8356-42140410e439',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:27:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8f53d2eb-f73d-4925-a310-999b257aad7e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11956',
  'x-ms-correlation-request-id',
  'de328dd2-8cce-45ea-a9b9-7654ea58f2b5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082800Z:de328dd2-8cce-45ea-a9b9-7654ea58f2b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:af6974e5-d20f-45cf-85c8-3d63fbbae522',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11955',
  'x-ms-correlation-request-id',
  '7d6c499b-94dd-4a60-a996-05b55feb8dbe',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082800Z:7d6c499b-94dd-4a60-a996-05b55feb8dbe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a32cb63a-1855-402a-9750-dce1633c1b76',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11954',
  'x-ms-correlation-request-id',
  '63f9eec6-1df2-4f31-ab45-b223f414c730',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082801Z:63f9eec6-1df2-4f31-ab45-b223f414c730',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:d959e2c8-e232-47c6-84fa-de8c12477097',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11953',
  'x-ms-correlation-request-id',
  '88cb41be-ce14-44d8-a84c-3e2622fc3035',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082801Z:88cb41be-ce14-44d8-a84c-3e2622fc3035',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:50222a11-973d-41c2-833d-3b501dc58c1a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11952',
  'x-ms-correlation-request-id',
  '369ffa53-1203-48d2-b7a7-a42cac72b578',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082801Z:369ffa53-1203-48d2-b7a7-a42cac72b578',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f7212284-469b-4bde-8676-a30491653acb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11951',
  'x-ms-correlation-request-id',
  '8705d2a1-346e-47d9-9bab-b33334aad868',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082802Z:8705d2a1-346e-47d9-9bab-b33334aad868',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:dd6e9792-12ed-4397-9434-545397edf809',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11950',
  'x-ms-correlation-request-id',
  '890af0b3-9879-4712-80b2-468f2ebddef7',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082802Z:890af0b3-9879-4712-80b2-468f2ebddef7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2f1a5970-81c7-406e-94ec-417ae796bd75',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11949',
  'x-ms-correlation-request-id',
  '33230a30-0886-469f-b3eb-e5def071d54c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082802Z:33230a30-0886-469f-b3eb-e5def071d54c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:97ce9ba0-ed05-4d29-bfb2-69032ab2cd28',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11948',
  'x-ms-correlation-request-id',
  '4a2bc412-a6a3-47d8-a201-c9533090c2fd',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082802Z:4a2bc412-a6a3-47d8-a201-c9533090c2fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c9a16726-aadb-43f1-b0f7-e38b5bd48143',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11947',
  'x-ms-correlation-request-id',
  '1a9b64a9-b41d-4529-843e-702012a1ba5a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082803Z:1a9b64a9-b41d-4529-843e-702012a1ba5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:40c3bcc0-764f-4b45-933a-55916f3b732b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11946',
  'x-ms-correlation-request-id',
  'df994ac1-88dc-494e-b810-f8f6aa5d6bfc',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082803Z:df994ac1-88dc-494e-b810-f8f6aa5d6bfc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:bcf701f1-9ae9-440d-9eee-58a76c3b46af',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11945',
  'x-ms-correlation-request-id',
  '5055ae37-385f-4b1b-ac5e-f94aefde2f91',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082803Z:5055ae37-385f-4b1b-ac5e-f94aefde2f91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c988a1f5-cf15-4352-9e68-2179f7214b6a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11944',
  'x-ms-correlation-request-id',
  'd15b9488-b2e7-4d01-ab13-8a71930d16e3',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082803Z:d15b9488-b2e7-4d01-ab13-8a71930d16e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1b21d113-c24d-4ffb-95f2-d9c44c8ded66',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11943',
  'x-ms-correlation-request-id',
  '529135ef-3176-4e95-900e-2b0e9fe4152f',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082804Z:529135ef-3176-4e95-900e-2b0e9fe4152f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ff99ce25-b6c2-49dc-b4ca-6dcf5e98547a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11942',
  'x-ms-correlation-request-id',
  'b0b1a050-e752-41eb-92b2-573752b6a90d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082804Z:b0b1a050-e752-41eb-92b2-573752b6a90d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:39e8892b-28cd-4088-90ed-b1f1cf6ddd99',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11941',
  'x-ms-correlation-request-id',
  '353ab90d-a125-4364-9fd6-90a51272de21',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082804Z:353ab90d-a125-4364-9fd6-90a51272de21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1ad9ce12-e13c-407b-bc28-22dba8771123',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11940',
  'x-ms-correlation-request-id',
  'b8354575-fc0c-4d5f-abad-448501124946',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082804Z:b8354575-fc0c-4d5f-abad-448501124946',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:798ab747-2912-4538-8060-9fb1bb197602',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11939',
  'x-ms-correlation-request-id',
  '50ca68df-dbc4-4244-a8e3-4c476814dc49',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082805Z:50ca68df-dbc4-4244-a8e3-4c476814dc49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0c340671-42d4-4293-a843-e377e63c7ddb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11938',
  'x-ms-correlation-request-id',
  '7e0680bc-d085-4eea-a1a6-6236f7041503',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082805Z:7e0680bc-d085-4eea-a1a6-6236f7041503',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:75144d30-4f12-4e93-8a0d-53a8f3c10a1b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11937',
  'x-ms-correlation-request-id',
  '0fab7e18-1742-4a1c-81ff-cf9786769574',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082805Z:0fab7e18-1742-4a1c-81ff-cf9786769574',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f852d75e-64c5-453f-bcb7-5c0a47af3047',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11936',
  'x-ms-correlation-request-id',
  '171cee1d-8298-43aa-8d23-d91d72f4905b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082805Z:171cee1d-8298-43aa-8d23-d91d72f4905b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a0f23729-6c9e-4737-8836-7c1c06d01e5f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11935',
  'x-ms-correlation-request-id',
  'f0ba2dc7-27cf-4f45-aac8-330e750ecc25',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082806Z:f0ba2dc7-27cf-4f45-aac8-330e750ecc25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c2b61eb3-29ed-4d52-9045-78e23273526d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11934',
  'x-ms-correlation-request-id',
  'ee87d013-2bad-418f-8720-9d8a39b7f4d9',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082806Z:ee87d013-2bad-418f-8720-9d8a39b7f4d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e25e8268-38df-43c5-8fc4-938ac5f369fc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11933',
  'x-ms-correlation-request-id',
  '5dca11d7-5f7b-4f9e-bd0e-f7ff798bd548',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082806Z:5dca11d7-5f7b-4f9e-bd0e-f7ff798bd548',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:23a835cf-2f83-4884-8bbf-92c7dbaa877d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-correlation-request-id',
  '21c7be26-3a0a-4856-8afb-d866fd220dc8',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082806Z:21c7be26-3a0a-4856-8afb-d866fd220dc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:dc034517-e949-428f-bd69-fd2770bfd960',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11931',
  'x-ms-correlation-request-id',
  '79d2f027-6bf0-438b-9b1d-7cffffc598b7',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082807Z:79d2f027-6bf0-438b-9b1d-7cffffc598b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a5c9e220-4da3-4474-9729-a311cac549e2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-correlation-request-id',
  '2356a506-ffca-48c3-9712-092ec0c8cc72',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082807Z:2356a506-ffca-48c3-9712-092ec0c8cc72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e0d458ae-9409-4721-ae04-de69f142c8a9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11929',
  'x-ms-correlation-request-id',
  '6a852bfb-18ee-47a9-82d4-337fdbfda619',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082807Z:6a852bfb-18ee-47a9-82d4-337fdbfda619',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:da3d13a4-913c-4fab-91e3-82798d384083',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11928',
  'x-ms-correlation-request-id',
  '6c54612f-55a9-4c46-9123-a806bcf3bbc5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082807Z:6c54612f-55a9-4c46-9123-a806bcf3bbc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:dd3f7187-83b5-4e1a-994d-2a5c18bbf517',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11927',
  'x-ms-correlation-request-id',
  'e1b3ac32-b8d7-4cdd-b2ef-36ed475cd371',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082808Z:e1b3ac32-b8d7-4cdd-b2ef-36ed475cd371',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3a7efe91-2abd-4e08-90b7-9f1ef3e503a6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11926',
  'x-ms-correlation-request-id',
  'fd849a30-c9bf-4ed2-acca-7344a2b20858',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082808Z:fd849a30-c9bf-4ed2-acca-7344a2b20858',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fdb6362f-660c-47b0-a6b4-a1ac3dc32a35',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11925',
  'x-ms-correlation-request-id',
  '14ab9b0f-3c7d-4097-a1cc-4612dfa8f64f',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082808Z:14ab9b0f-3c7d-4097-a1cc-4612dfa8f64f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1d68bd4f-6d8f-4c7c-a94a-4f3af296dc84',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11924',
  'x-ms-correlation-request-id',
  'f4d13939-b3b6-4a17-8fb8-4a2331a9cb7b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082808Z:f4d13939-b3b6-4a17-8fb8-4a2331a9cb7b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6cb70a79-e48a-4b74-a3c6-c8c7ddecc6f4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11923',
  'x-ms-correlation-request-id',
  '6e95a8e6-4bc1-4ef3-a260-9fddea1cdeec',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082809Z:6e95a8e6-4bc1-4ef3-a260-9fddea1cdeec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:102da2ac-52a9-41a2-a2f9-56ada6345f61',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11922',
  'x-ms-correlation-request-id',
  'b44cc979-2c52-4729-905d-6264597919bb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082809Z:b44cc979-2c52-4729-905d-6264597919bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b7986e2d-b2f9-48eb-a88c-c78ff7a697a3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11921',
  'x-ms-correlation-request-id',
  '494ff1dd-5306-4e14-8872-17b621fcd5b4',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082809Z:494ff1dd-5306-4e14-8872-17b621fcd5b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:39cf5e64-30bc-408d-9997-d70c920ce44a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11920',
  'x-ms-correlation-request-id',
  '5dfe5da5-d37c-4c40-b2b0-c116ef9b3aad',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082809Z:5dfe5da5-d37c-4c40-b2b0-c116ef9b3aad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:46be6e11-05e3-47b4-a83c-49a7619d7e29',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11919',
  'x-ms-correlation-request-id',
  'cebc8b66-248d-4164-baef-d73bb03d7d8e',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082810Z:cebc8b66-248d-4164-baef-d73bb03d7d8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a223ea69-6565-428f-b7aa-1528b6e0baf4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11918',
  'x-ms-correlation-request-id',
  '3c9dc053-4927-497f-960d-d266f830ce72',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082810Z:3c9dc053-4927-497f-960d-d266f830ce72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b0957bb5-ad4e-4829-b490-a4fb3f62ec00',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11917',
  'x-ms-correlation-request-id',
  'abf42d85-3ede-4e74-9093-88e6e977a963',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082810Z:abf42d85-3ede-4e74-9093-88e6e977a963',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:03e885fb-5baf-4cea-baa1-c63aaea68bfc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11916',
  'x-ms-correlation-request-id',
  'ebd5be95-d3c2-4f59-a749-7bb5e08e5b8e',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082810Z:ebd5be95-d3c2-4f59-a749-7bb5e08e5b8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9625e0d6-06c7-4afc-95bd-559afaa313bb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11915',
  'x-ms-correlation-request-id',
  '164b1d4b-fa2f-49ee-9d30-73f7090537dd',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082811Z:164b1d4b-fa2f-49ee-9d30-73f7090537dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a13ad498-283b-42bd-ab0a-5da782ef8238',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11914',
  'x-ms-correlation-request-id',
  'fa1bae3b-40d7-482c-bdd9-650df4b223e1',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082811Z:fa1bae3b-40d7-482c-bdd9-650df4b223e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e48e4399-c284-45bc-a324-1f93a341ef8a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11913',
  'x-ms-correlation-request-id',
  'a88ab51f-f079-4b09-8150-938fe5dc3359',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082811Z:a88ab51f-f079-4b09-8150-938fe5dc3359',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0afe045c-4aee-4eb9-9a29-3337d3905f27',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11912',
  'x-ms-correlation-request-id',
  'a18a3c25-7b9c-4d8f-a81d-10a2218cff56',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082811Z:a18a3c25-7b9c-4d8f-a81d-10a2218cff56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:89bef025-8bad-43c6-b43f-0ed7d8124949',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11911',
  'x-ms-correlation-request-id',
  '7ba3a291-7c69-48ba-baf2-5299885b5ff5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082812Z:7ba3a291-7c69-48ba-baf2-5299885b5ff5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ba2fcb86-3cb8-4b49-9f59-2710ef17fc35',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11910',
  'x-ms-correlation-request-id',
  '30e60156-b768-427c-9116-19c281b467f7',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082812Z:30e60156-b768-427c-9116-19c281b467f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:d24ac847-1946-4ca5-910b-e9919535a7b8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11909',
  'x-ms-correlation-request-id',
  'ae08563f-5753-4e7f-8750-28be9aa1f186',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082812Z:ae08563f-5753-4e7f-8750-28be9aa1f186',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a5cfd56c-5ac1-4bd2-b17a-c288a6c1a125',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11908',
  'x-ms-correlation-request-id',
  '92781d6d-b90a-467e-8c17-2dea4afb2123',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082813Z:92781d6d-b90a-467e-8c17-2dea4afb2123',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:badb6560-f129-4bff-9923-cdc1aa2f7b63',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11907',
  'x-ms-correlation-request-id',
  '0cad1a90-5319-4298-b718-db0d0fad9fea',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082813Z:0cad1a90-5319-4298-b718-db0d0fad9fea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4c214c97-0193-4150-aab6-e0c362d00914',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11906',
  'x-ms-correlation-request-id',
  '5b69e1d3-871e-40e9-8713-56d4e5c93cbe',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082813Z:5b69e1d3-871e-40e9-8713-56d4e5c93cbe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:81493764-5533-464f-8045-dc0df67c8e23',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11905',
  'x-ms-correlation-request-id',
  'b65708ef-49e3-47e5-b219-ac7332791be7',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082814Z:b65708ef-49e3-47e5-b219-ac7332791be7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:60511a3b-9dd9-43b8-8eae-166e245c66de',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-correlation-request-id',
  'fa8064aa-5487-46d2-8b2c-193bed2c7b81',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082814Z:fa8064aa-5487-46d2-8b2c-193bed2c7b81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:03f4be53-e3da-4834-b11f-d6b2297b2322',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11903',
  'x-ms-correlation-request-id',
  '1ab9ff71-2921-4c95-8ed2-89cc8b062b14',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082815Z:1ab9ff71-2921-4c95-8ed2-89cc8b062b14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:935e9c2f-7768-49bd-ad16-050e9492bf56',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11902',
  'x-ms-correlation-request-id',
  '5782e403-a4af-4347-9ecf-94dbe033b258',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082815Z:5782e403-a4af-4347-9ecf-94dbe033b258',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:42e056a1-bdae-46bb-ad91-c3c9dfc828de',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11901',
  'x-ms-correlation-request-id',
  '462ec48e-f472-4ec2-9b42-7f82e17f9894',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082815Z:462ec48e-f472-4ec2-9b42-7f82e17f9894',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:991acfb3-8983-49f3-92bb-48d5691a08c2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11900',
  'x-ms-correlation-request-id',
  'afa81e39-dcc2-4924-9eeb-8271601a002c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082816Z:afa81e39-dcc2-4924-9eeb-8271601a002c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b562bcae-1ee5-4c33-a4ca-2f0c96efe3bf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11899',
  'x-ms-correlation-request-id',
  '5c075e54-a958-41e0-bc65-6213317dde7d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082816Z:5c075e54-a958-41e0-bc65-6213317dde7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3f1d92aa-bd51-4e2b-b0ce-ac9a58fc4d4d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11898',
  'x-ms-correlation-request-id',
  '01abd3f5-5ea7-433d-8051-8b78c23c43ba',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082817Z:01abd3f5-5ea7-433d-8051-8b78c23c43ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:780a3594-bf37-4520-afba-28465288b84a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11897',
  'x-ms-correlation-request-id',
  'a1adf1c5-2e27-48fb-abef-e4870c34b0a1',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082817Z:a1adf1c5-2e27-48fb-abef-e4870c34b0a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b3bcda8a-a084-420d-b260-f911c9e12a3c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11896',
  'x-ms-correlation-request-id',
  '27f0a94f-a043-42cd-abec-2a3cc59ee641',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082817Z:27f0a94f-a043-42cd-abec-2a3cc59ee641',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5f546cd9-89b9-41ac-b9a3-889f32034f26',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11895',
  'x-ms-correlation-request-id',
  '0856b8f8-8e71-457c-82f0-6580dfa1da19',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082817Z:0856b8f8-8e71-457c-82f0-6580dfa1da19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:54588bd2-95b2-4c05-a6ca-2c68573ad179',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11894',
  'x-ms-correlation-request-id',
  '62dcae96-dbfd-4c6f-91ac-3b737dcd5ac3',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082818Z:62dcae96-dbfd-4c6f-91ac-3b737dcd5ac3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fd549c62-5595-4e4c-8b4f-fa65d516e264',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11893',
  'x-ms-correlation-request-id',
  'bb7a154a-0adb-4df6-8892-0dd3a045d432',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082818Z:bb7a154a-0adb-4df6-8892-0dd3a045d432',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0c74e694-0d6f-4a69-96e3-c655c5b213b2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11892',
  'x-ms-correlation-request-id',
  '3b467fdc-c503-42a5-a688-fadf9917c11c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082818Z:3b467fdc-c503-42a5-a688-fadf9917c11c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:01f15396-774b-46c1-9c28-15aed96e9b9b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11891',
  'x-ms-correlation-request-id',
  'f63f607a-87ce-436a-95e3-46cbdeb2b44b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082818Z:f63f607a-87ce-436a-95e3-46cbdeb2b44b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:94bdf830-b3db-4eb4-9c47-293fef326391',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11890',
  'x-ms-correlation-request-id',
  '0b6118d1-101a-4bf8-bc91-ba04e7290984',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082819Z:0b6118d1-101a-4bf8-bc91-ba04e7290984',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:54b05497-118d-4f8b-920e-c6d1ebfd61f1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11889',
  'x-ms-correlation-request-id',
  '29c02834-26c3-492c-b09d-8a8061f8f765',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082819Z:29c02834-26c3-492c-b09d-8a8061f8f765',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a06d7056-132c-4e90-bf1a-ecd47c90e840',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11888',
  'x-ms-correlation-request-id',
  '8f72ead8-19e5-423d-a6c3-ba24af3b10e5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082819Z:8f72ead8-19e5-423d-a6c3-ba24af3b10e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:61549844-48de-4b04-9038-7c15afa5c6b8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11887',
  'x-ms-correlation-request-id',
  'e34ca588-3cd8-4761-8d57-baee79a560a9',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082819Z:e34ca588-3cd8-4761-8d57-baee79a560a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0533f7c0-9e1f-467a-b2f8-13f1fdab98be',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11886',
  'x-ms-correlation-request-id',
  'a8aa3b51-0b0e-4969-ae3a-bd6a5ead1866',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082820Z:a8aa3b51-0b0e-4969-ae3a-bd6a5ead1866',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:24de75b7-192f-4baa-b533-21bbfa486d7f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11885',
  'x-ms-correlation-request-id',
  '5622c544-4caa-4a34-a6bb-79e8619bdfc3',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082820Z:5622c544-4caa-4a34-a6bb-79e8619bdfc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c2d647ed-3ac8-4b0b-b3b3-4c91eb1ec528',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11884',
  'x-ms-correlation-request-id',
  'afe57e9d-2e59-4b0c-9b6c-2fd13d368a0d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082820Z:afe57e9d-2e59-4b0c-9b6c-2fd13d368a0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:80984827-5797-483a-afaa-1a49dd4f7a27',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11883',
  'x-ms-correlation-request-id',
  'fd61579c-b13c-45db-a253-3a15bae4f926',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082820Z:fd61579c-b13c-45db-a253-3a15bae4f926',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:30bdaec0-d498-4739-9056-244a32eb4650',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11882',
  'x-ms-correlation-request-id',
  'd74f52cf-c7ae-4645-aeb4-f4060078b319',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082821Z:d74f52cf-c7ae-4645-aeb4-f4060078b319',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0e036f54-74b2-4ff5-b2d2-e8432199930f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11881',
  'x-ms-correlation-request-id',
  'f9d18fec-d6ee-4490-a3b5-9bb723c0da6c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082821Z:f9d18fec-d6ee-4490-a3b5-9bb723c0da6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fa8d6b11-fa6d-43aa-b447-f5e54ac34a3b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11880',
  'x-ms-correlation-request-id',
  '21b9dd0c-511f-4dda-9795-faebffd3c172',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082821Z:21b9dd0c-511f-4dda-9795-faebffd3c172',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:444d17f2-0ff0-4d39-ba09-9e80584240df',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11879',
  'x-ms-correlation-request-id',
  'fadd7a46-68a3-4a1d-940d-15e0643dda26',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082822Z:fadd7a46-68a3-4a1d-940d-15e0643dda26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:23b4d067-2468-40c6-9e5c-f768e66b00c9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11878',
  'x-ms-correlation-request-id',
  '491234f7-75e9-4030-99b2-54788b7c4e01',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082822Z:491234f7-75e9-4030-99b2-54788b7c4e01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f63ac9db-362e-4b10-b51f-52ff529fd07e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11877',
  'x-ms-correlation-request-id',
  '7fc80581-d35f-44b2-b104-93e101d4f86e',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082822Z:7fc80581-d35f-44b2-b104-93e101d4f86e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:66250473-dc94-4a5c-8530-fa44134f32ee',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11876',
  'x-ms-correlation-request-id',
  '20cf5fba-ce94-4118-ad09-f007e288e85d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082822Z:20cf5fba-ce94-4118-ad09-f007e288e85d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3be51875-49ff-4b28-9103-62369b038821',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11875',
  'x-ms-correlation-request-id',
  '9e8762ee-971b-4a0c-b454-ca5ccf6ae849',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082824Z:9e8762ee-971b-4a0c-b454-ca5ccf6ae849',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1b7fe000-c7af-4ec6-8de2-94336ef9451b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11874',
  'x-ms-correlation-request-id',
  'adca8d3e-8e3c-44b9-8a33-07144a03efeb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082824Z:adca8d3e-8e3c-44b9-8a33-07144a03efeb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9e8a3c69-b169-4e0b-92e3-931f51e6260c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11873',
  'x-ms-correlation-request-id',
  '552813b5-2ac3-49e6-9ad0-0d054c75dfea',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082825Z:552813b5-2ac3-49e6-9ad0-0d054c75dfea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4211d855-3a59-4226-98fb-8bba659cb52c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11872',
  'x-ms-correlation-request-id',
  'feb0b527-7263-4d6f-af3d-1cabe3ff4de0',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082825Z:feb0b527-7263-4d6f-af3d-1cabe3ff4de0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:caea9586-374e-41f0-8862-dc43904b6c46',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11871',
  'x-ms-correlation-request-id',
  '08e7cf77-a42e-414d-b4ef-a6f76e64fab1',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082826Z:08e7cf77-a42e-414d-b4ef-a6f76e64fab1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9a5c4d8d-f5c0-493e-bcc8-b8f63e0af3b8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11870',
  'x-ms-correlation-request-id',
  '0a09a117-e9f0-4abb-9f06-c09ee0f578be',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082826Z:0a09a117-e9f0-4abb-9f06-c09ee0f578be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:cd2e2db5-a85f-4f13-a243-373338a0758e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11869',
  'x-ms-correlation-request-id',
  '06113066-e7ee-4c4b-9f0c-94a5c19d4a9a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082826Z:06113066-e7ee-4c4b-9f0c-94a5c19d4a9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3095a2b3-9c3b-4f3c-b834-81dcbf67c262',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11868',
  'x-ms-correlation-request-id',
  '16ef4995-b210-4d56-bac6-5b86cca5b2d0',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082826Z:16ef4995-b210-4d56-bac6-5b86cca5b2d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:eb8faf58-f476-42bb-bc49-ec5ff7c20759',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11867',
  'x-ms-correlation-request-id',
  '4328a290-34e9-42e2-861d-5ab1136cdcf3',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082827Z:4328a290-34e9-42e2-861d-5ab1136cdcf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e32e3060-a228-4ea5-9427-9f4776472791',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11866',
  'x-ms-correlation-request-id',
  '4163dc6e-f1d2-459d-8660-1c873ce92122',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082827Z:4163dc6e-f1d2-459d-8660-1c873ce92122',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e8a0b0bf-fae7-4cfa-a2a0-ae0d0502249d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11865',
  'x-ms-correlation-request-id',
  '9f32818f-c0f4-4d70-b089-85f506b90a16',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082827Z:9f32818f-c0f4-4d70-b089-85f506b90a16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2cb8ef14-d73d-4c13-ae26-ffda92ac2694',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11864',
  'x-ms-correlation-request-id',
  '0d9d1b02-75fe-498a-8e2e-422c06af42cb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082827Z:0d9d1b02-75fe-498a-8e2e-422c06af42cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b06149f8-f2ba-4437-9d6f-8ca7e4fc6aa1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11863',
  'x-ms-correlation-request-id',
  '712d6156-8620-417e-97cc-3c3ec91604b1',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082828Z:712d6156-8620-417e-97cc-3c3ec91604b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e7c3772a-bbbf-45cd-9c02-0e497e30eb52',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11862',
  'x-ms-correlation-request-id',
  '02d8b7ce-2888-4490-8b3b-996fcbdc58ce',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082828Z:02d8b7ce-2888-4490-8b3b-996fcbdc58ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2ff7a4af-f002-4803-80e3-1706657bef0d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11861',
  'x-ms-correlation-request-id',
  'b14f75a7-e8b1-49a6-8c16-8dc43828d8d2',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082828Z:b14f75a7-e8b1-49a6-8c16-8dc43828d8d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:21f8111e-8a85-4e33-8d2a-43840dc8ccb8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11860',
  'x-ms-correlation-request-id',
  'b6ab8dfc-87c5-4b57-a012-2348bac48ec0',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082828Z:b6ab8dfc-87c5-4b57-a012-2348bac48ec0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7ea262e2-3d36-4812-8526-84f363fd8f80',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11859',
  'x-ms-correlation-request-id',
  '8563bf6d-b6cb-4d40-b9bc-8b7ed765effc',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082829Z:8563bf6d-b6cb-4d40-b9bc-8b7ed765effc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:db0a0950-4162-4c2d-a5e7-de3ecda262ec',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11858',
  'x-ms-correlation-request-id',
  '7b576cca-b5d0-449b-b368-0390bad55d26',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082829Z:7b576cca-b5d0-449b-b368-0390bad55d26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a3d9b929-a579-43a9-bb66-4a54df333eb0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11857',
  'x-ms-correlation-request-id',
  '45c1dd76-30be-4104-9e90-a7ff1fd91a4f',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082829Z:45c1dd76-30be-4104-9e90-a7ff1fd91a4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8225b9db-82ad-41e9-8d72-51d478bf30f3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11856',
  'x-ms-correlation-request-id',
  'e1037982-80ab-40dc-ba5b-df8e842ba3e6',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082829Z:e1037982-80ab-40dc-ba5b-df8e842ba3e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4fd2416f-7560-4bbb-85c5-cbc4c0df33fb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11855',
  'x-ms-correlation-request-id',
  '08ba6dd6-3c25-4a0d-a60e-86bbeedec777',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082830Z:08ba6dd6-3c25-4a0d-a60e-86bbeedec777',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:78b7f35a-90df-4abc-8668-b6d45bdeac3c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11854',
  'x-ms-correlation-request-id',
  '4e8b20f1-cf65-4355-a70b-2655c01081c9',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082830Z:4e8b20f1-cf65-4355-a70b-2655c01081c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9c66bcc4-de45-4f65-a600-986e262b030a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11853',
  'x-ms-correlation-request-id',
  '283ff6a4-701b-4cf9-8db2-2304d9f25c9e',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082830Z:283ff6a4-701b-4cf9-8db2-2304d9f25c9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3b6d4ae3-5713-4ee7-8b8b-28af71ab5b68',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11852',
  'x-ms-correlation-request-id',
  'd444ec1b-198b-4d73-a517-7491c5082e22',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082830Z:d444ec1b-198b-4d73-a517-7491c5082e22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4db50891-2960-44c1-b2bc-2078119cd8d2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11851',
  'x-ms-correlation-request-id',
  '1a7948de-1be9-4588-9db4-f99b600cbdd2',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082831Z:1a7948de-1be9-4588-9db4-f99b600cbdd2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f0bf2eb6-b695-4591-955a-b07041970b77',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11850',
  'x-ms-correlation-request-id',
  'cd1cd3b8-81aa-40c8-b0ff-450c7fc79fb2',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082831Z:cd1cd3b8-81aa-40c8-b0ff-450c7fc79fb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8eaaf938-4925-4aef-8923-0c128f55fc3b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11849',
  'x-ms-correlation-request-id',
  '1e88ed9d-b19e-4e09-9e45-247bbfdf1b3b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082831Z:1e88ed9d-b19e-4e09-9e45-247bbfdf1b3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5716e2f6-d262-47fe-adf8-1fc99a3ec3a8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11848',
  'x-ms-correlation-request-id',
  'b4b82be0-7db6-4d77-a41c-5ec0b7ab4612',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082831Z:b4b82be0-7db6-4d77-a41c-5ec0b7ab4612',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4072dc53-8052-44e4-8b76-c48f53c67c33',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11847',
  'x-ms-correlation-request-id',
  '992dd0a6-c373-4a89-b078-4428f17dab98',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082832Z:992dd0a6-c373-4a89-b078-4428f17dab98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f6edb3b3-73fc-4774-946f-2bc82c08f22c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11846',
  'x-ms-correlation-request-id',
  '9f28c855-786c-4031-8e19-298ec2582336',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082832Z:9f28c855-786c-4031-8e19-298ec2582336',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e1261aaf-4c1e-48ea-b9ad-0d76ee08c42f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11845',
  'x-ms-correlation-request-id',
  '599e026f-ffae-49e1-891d-57065e1d0b73',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082832Z:599e026f-ffae-49e1-891d-57065e1d0b73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8800cb72-0063-4274-9d38-547ba44ee1a5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11844',
  'x-ms-correlation-request-id',
  'cb806edf-9caf-428c-a9ad-062e5751ae8d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082832Z:cb806edf-9caf-428c-a9ad-062e5751ae8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:613a912b-dc11-45c1-88f0-e2edc1070849',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11843',
  'x-ms-correlation-request-id',
  '75f4cef9-3ec6-4070-a428-ec8edfda4086',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082833Z:75f4cef9-3ec6-4070-a428-ec8edfda4086',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1c9ee059-549a-40e6-9796-8c25f32e19dd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11842',
  'x-ms-correlation-request-id',
  '0a2728b3-b0c4-4b34-9eb7-0a5e432d5d60',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082833Z:0a2728b3-b0c4-4b34-9eb7-0a5e432d5d60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fed4014a-ec2b-4fa9-ae3c-ec673f03ad26',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11841',
  'x-ms-correlation-request-id',
  'b455a4ee-556a-435a-a51b-10b405a552c4',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082833Z:b455a4ee-556a-435a-a51b-10b405a552c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:db6ea76b-1976-46fb-a963-aaf1b73cd8c1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11840',
  'x-ms-correlation-request-id',
  '141a6832-e35a-4d7b-9ce1-75dfc149da61',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082833Z:141a6832-e35a-4d7b-9ce1-75dfc149da61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1c7781a1-bc81-47f2-bb90-2a9bfeed7109',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11839',
  'x-ms-correlation-request-id',
  'c2124108-9c7b-4eba-8c30-d05b9ff77731',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082834Z:c2124108-9c7b-4eba-8c30-d05b9ff77731',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:55c66583-01c1-49db-9228-29cb397b10bf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11838',
  'x-ms-correlation-request-id',
  '42c62fa7-5848-4a07-a831-4fc23c1b27c5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082834Z:42c62fa7-5848-4a07-a831-4fc23c1b27c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:31e4a06d-f7e7-400a-848d-3521691db3b4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11837',
  'x-ms-correlation-request-id',
  'd9539066-ef88-48de-b0ad-d1b8a58c4797',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082834Z:d9539066-ef88-48de-b0ad-d1b8a58c4797',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:afda0f88-eb14-46be-9420-61ca5388bfb5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11836',
  'x-ms-correlation-request-id',
  '4d4ff87a-6413-45f4-9530-89c8915cc83e',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082834Z:4d4ff87a-6413-45f4-9530-89c8915cc83e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:bc1f415d-139c-4699-9e22-f90c734ea5cf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11835',
  'x-ms-correlation-request-id',
  '5cfee614-ca42-40e2-b433-1106957d434a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082835Z:5cfee614-ca42-40e2-b433-1106957d434a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ac83493a-d701-4b8e-8da2-e8468b69f55d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11834',
  'x-ms-correlation-request-id',
  '6e958fbf-cf48-4049-abb7-1f96854e576e',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082835Z:6e958fbf-cf48-4049-abb7-1f96854e576e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4e67cd8e-1133-4763-9739-9f0dba67122f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11833',
  'x-ms-correlation-request-id',
  '26632728-a328-4654-b8cc-a47457fbfd94',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082835Z:26632728-a328-4654-b8cc-a47457fbfd94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7852ffcc-4fc3-4a3f-9e14-4a2b2e5ef910',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11832',
  'x-ms-correlation-request-id',
  'a61caf41-c156-46cf-b2f8-f842bf1bc299',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082835Z:a61caf41-c156-46cf-b2f8-f842bf1bc299',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5b878a43-271a-4773-9578-3db6f968f256',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11831',
  'x-ms-correlation-request-id',
  '54ff64a8-880e-488a-9c57-62dae3ca2a50',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082836Z:54ff64a8-880e-488a-9c57-62dae3ca2a50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:927c1991-3530-4178-9050-a071e0246d10',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11830',
  'x-ms-correlation-request-id',
  '7d654ff8-4a5f-49ee-bfab-b6b0965665c4',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082836Z:7d654ff8-4a5f-49ee-bfab-b6b0965665c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:536e3935-afff-49ae-9775-8e8dc115b5d5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11829',
  'x-ms-correlation-request-id',
  'efc0ceb7-aab1-448c-b0ee-1695ad7bc6d1',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082836Z:efc0ceb7-aab1-448c-b0ee-1695ad7bc6d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:40e586c7-434e-41ef-a90a-5d8a2959bb6e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11828',
  'x-ms-correlation-request-id',
  'e4be2c45-38da-471b-8a1a-df5ca56feb31',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082836Z:e4be2c45-38da-471b-8a1a-df5ca56feb31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a87cba04-9f93-41c7-a908-53101fdd0ab0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11827',
  'x-ms-correlation-request-id',
  '3a1425e2-5214-49d9-8465-0dd70fdadb0c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082837Z:3a1425e2-5214-49d9-8465-0dd70fdadb0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b2f3c069-9488-4816-9db5-2ad046575109',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11826',
  'x-ms-correlation-request-id',
  'ca336c25-73be-40ff-bab8-a4c46f0c4c83',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082837Z:ca336c25-73be-40ff-bab8-a4c46f0c4c83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:56e22ecd-b10d-4b3e-9e3f-73b00cc61947',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11825',
  'x-ms-correlation-request-id',
  '73c3759f-f3a9-4ed4-a3a5-821d6d3a5f40',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082837Z:73c3759f-f3a9-4ed4-a3a5-821d6d3a5f40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f106ebfd-1aa2-491b-afdc-42c8967f5224',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11824',
  'x-ms-correlation-request-id',
  '9802f21d-2aad-48b2-9470-8e59062b9c8f',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082837Z:9802f21d-2aad-48b2-9470-8e59062b9c8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4e125cf1-fc6b-4423-afd6-6e4468e4e0aa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11823',
  'x-ms-correlation-request-id',
  '1a37495b-8d57-4382-b57a-60a896431b33',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082838Z:1a37495b-8d57-4382-b57a-60a896431b33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:de1a4fef-6226-4bbb-8d63-9bbd3a262a77',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11822',
  'x-ms-correlation-request-id',
  '90b161c7-3ed0-456b-a510-76d91af658f3',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082838Z:90b161c7-3ed0-456b-a510-76d91af658f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b7dcfdb9-a661-4a8f-94b1-70e097066db2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11821',
  'x-ms-correlation-request-id',
  'b6c8e336-929a-4282-9c5d-ee69154f67a7',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082838Z:b6c8e336-929a-4282-9c5d-ee69154f67a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e49417df-3967-4859-be17-6669ce8278ef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11820',
  'x-ms-correlation-request-id',
  '6811c6cf-bb5e-4acb-b279-f0ccff75000c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082838Z:6811c6cf-bb5e-4acb-b279-f0ccff75000c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:89cf1633-6ca9-4a0b-96cb-aa5f65bc9105',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11819',
  'x-ms-correlation-request-id',
  'b1dd3daf-68be-4e8f-a448-09085abb830c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082839Z:b1dd3daf-68be-4e8f-a448-09085abb830c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3a92a21b-7af9-46af-8375-a73d8aca98fe',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11818',
  'x-ms-correlation-request-id',
  'd009e7a3-445c-4ade-80ec-9a3b85334a93',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082839Z:d009e7a3-445c-4ade-80ec-9a3b85334a93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:974ef2d8-2482-42c6-932d-09df9f5f8755',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11817',
  'x-ms-correlation-request-id',
  '37b852f0-4867-4616-8e3e-f0047eddc191',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082839Z:37b852f0-4867-4616-8e3e-f0047eddc191',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:95ff9e8a-c7c3-4aa1-8e7d-827831da74da',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11816',
  'x-ms-correlation-request-id',
  '88fa279a-a3f0-4b88-98d1-cefe1a67fb4d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082839Z:88fa279a-a3f0-4b88-98d1-cefe1a67fb4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b6d29916-9425-4613-889c-007181b2309b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11815',
  'x-ms-correlation-request-id',
  'f95158f3-b759-4154-b677-3f75b2218574',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082840Z:f95158f3-b759-4154-b677-3f75b2218574',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:80781240-213e-453c-86ac-129ae81124d3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11814',
  'x-ms-correlation-request-id',
  '17420454-9bb8-48db-9ebe-16a1b750aba5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082840Z:17420454-9bb8-48db-9ebe-16a1b750aba5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:38c69a89-ef39-4fac-85f4-8a9263b66a27',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11813',
  'x-ms-correlation-request-id',
  'c3957283-e8c0-4ba8-9df0-6e41b7718d9e',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082840Z:c3957283-e8c0-4ba8-9df0-6e41b7718d9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3f247499-058e-4f7c-abde-6343e5137d48',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11812',
  'x-ms-correlation-request-id',
  '31b6b831-e277-4527-9a3f-b8d3a7c35da8',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082840Z:31b6b831-e277-4527-9a3f-b8d3a7c35da8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ecd43dad-0166-436b-b74c-051df5ec2ad0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11811',
  'x-ms-correlation-request-id',
  'e207b4e4-3c3d-49f4-9b6a-2a4a0c50dbdb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082841Z:e207b4e4-3c3d-49f4-9b6a-2a4a0c50dbdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1b353282-6234-4951-a07e-3880226b4659',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11810',
  'x-ms-correlation-request-id',
  'd4278b0b-04cb-43af-a6b4-b9d585460b83',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082841Z:d4278b0b-04cb-43af-a6b4-b9d585460b83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6b69f0b6-f40c-43e9-8712-f8b7b9c2025a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11809',
  'x-ms-correlation-request-id',
  '1fa1b370-26ce-47e8-a059-1448e6b83b5a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082841Z:1fa1b370-26ce-47e8-a059-1448e6b83b5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2d1924e9-59c0-4e8b-8893-5a97e2b6ec9b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11808',
  'x-ms-correlation-request-id',
  '935a8448-8b6c-4da4-b062-2e8aaf6e6dc1',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082841Z:935a8448-8b6c-4da4-b062-2e8aaf6e6dc1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f56ef35a-5f84-472a-a82a-d9f78df7931b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11807',
  'x-ms-correlation-request-id',
  'c6bfafc9-adad-464f-abfc-3a9977f0bd0d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082842Z:c6bfafc9-adad-464f-abfc-3a9977f0bd0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:dd83bc0f-c91b-4eba-a2dd-c72e84f8c518',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11806',
  'x-ms-correlation-request-id',
  '26705b00-cc4d-4341-b089-6656e8809d7b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082842Z:26705b00-cc4d-4341-b089-6656e8809d7b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ba779848-1b0d-4263-8a4f-f34f6b038278',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11805',
  'x-ms-correlation-request-id',
  'a8b04618-c961-45d2-8052-acce6539b1d7',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082842Z:a8b04618-c961-45d2-8052-acce6539b1d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:da7b25ef-7cfb-4cb0-a011-5918de11bece',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11804',
  'x-ms-correlation-request-id',
  '6a4fe470-85e9-4902-95ca-2e54d8001a43',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082842Z:6a4fe470-85e9-4902-95ca-2e54d8001a43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c37604ef-3151-48f1-af8d-3f1c73df25ef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11803',
  'x-ms-correlation-request-id',
  '4b6c262a-f26d-4aa1-bc00-2cabe7ab1a8b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082843Z:4b6c262a-f26d-4aa1-bc00-2cabe7ab1a8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6289738f-566d-4626-a2a3-30d783db74b3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11802',
  'x-ms-correlation-request-id',
  '69e1dc50-885a-4efa-a2d5-440ce1c8fcc6',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082843Z:69e1dc50-885a-4efa-a2d5-440ce1c8fcc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:d30f3fde-9452-473d-a0a6-8b785cdd6b12',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11801',
  'x-ms-correlation-request-id',
  'be77bd94-7dcf-4a11-b585-fda8c4eee16d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082843Z:be77bd94-7dcf-4a11-b585-fda8c4eee16d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:68aceea2-cadc-4da9-9929-36dca9844efc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11800',
  'x-ms-correlation-request-id',
  '920d0e78-f4cb-4078-b749-c4ebea0c9937',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082843Z:920d0e78-f4cb-4078-b749-c4ebea0c9937',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:87e4d479-5fbf-4e51-8a0e-9b94b5eec2e2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11799',
  'x-ms-correlation-request-id',
  '960b0e1b-ecd4-4287-88da-13ebc7fc7d4a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082844Z:960b0e1b-ecd4-4287-88da-13ebc7fc7d4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:bce11fea-4dc8-44f3-8493-dc84def808f2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11798',
  'x-ms-correlation-request-id',
  'af878643-070b-4034-a408-71048b10d696',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082844Z:af878643-070b-4034-a408-71048b10d696',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:197a2018-7d0c-451a-9e57-b84bad0b6279',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11797',
  'x-ms-correlation-request-id',
  '764b4bd8-70c0-4923-9742-0718cd7a6e91',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082844Z:764b4bd8-70c0-4923-9742-0718cd7a6e91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:308bec2d-fe6e-4ef0-bb65-2b4e026499b2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11796',
  'x-ms-correlation-request-id',
  'de85f87e-b6eb-4a17-8b50-b57763c2794b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082844Z:de85f87e-b6eb-4a17-8b50-b57763c2794b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8b130efd-7e64-47c8-b192-6dfe8be40734',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11795',
  'x-ms-correlation-request-id',
  '9d269630-8daf-46df-a0ce-1c0aaf87180c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082845Z:9d269630-8daf-46df-a0ce-1c0aaf87180c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6dae0ace-1893-4317-a790-9340b98e11f2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11794',
  'x-ms-correlation-request-id',
  '9d80a946-a4a6-4511-b990-aba2f70fd387',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082845Z:9d80a946-a4a6-4511-b990-aba2f70fd387',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2b6295b9-0893-48ef-9fbc-c8db8903e89e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11793',
  'x-ms-correlation-request-id',
  '9666e08b-43b6-43fd-99e7-40df4400fd53',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082845Z:9666e08b-43b6-43fd-99e7-40df4400fd53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:836863b3-017b-4a89-8016-8b3d369bc19b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11792',
  'x-ms-correlation-request-id',
  '725afba1-094d-4b95-929b-59574f9b81bc',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082845Z:725afba1-094d-4b95-929b-59574f9b81bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5c7b2cb1-8063-482f-9d05-0978a0d47f66',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11791',
  'x-ms-correlation-request-id',
  '6229758d-eeaa-4f16-b82a-a1c2faed8d5f',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082846Z:6229758d-eeaa-4f16-b82a-a1c2faed8d5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ba7a48df-3381-4e57-8745-bb3017863028',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11790',
  'x-ms-correlation-request-id',
  'b628219e-e4bd-4eac-b883-77bfea5b09c1',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082846Z:b628219e-e4bd-4eac-b883-77bfea5b09c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ad94821b-fac0-485c-9e64-a1274218befd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11789',
  'x-ms-correlation-request-id',
  '49e268b6-1be1-47d5-9531-b7854983dc1f',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082846Z:49e268b6-1be1-47d5-9531-b7854983dc1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b1564a3b-6f86-4abf-a12b-031586aded35',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11788',
  'x-ms-correlation-request-id',
  '6b2b5e35-93fc-4b5b-a416-0fa6a9552ca8',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082846Z:6b2b5e35-93fc-4b5b-a416-0fa6a9552ca8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ba0d6d7f-8b98-4c97-847b-0d44373ae519',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11787',
  'x-ms-correlation-request-id',
  'a2a8a7d6-9a60-4c2e-8086-caed769c5620',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082847Z:a2a8a7d6-9a60-4c2e-8086-caed769c5620',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7fd0c5c6-a344-47b6-91a0-b5d72e5e7909',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11786',
  'x-ms-correlation-request-id',
  'aa520810-fa04-4a69-97d1-5afdc65fca26',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082847Z:aa520810-fa04-4a69-97d1-5afdc65fca26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:330e03e4-d70f-47c2-a4be-181c76c9493b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11785',
  'x-ms-correlation-request-id',
  'c6e499b4-b697-401c-8487-023705d1fc03',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082847Z:c6e499b4-b697-401c-8487-023705d1fc03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:db849b80-8957-4f92-a307-80878ab56538',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11784',
  'x-ms-correlation-request-id',
  'e5410433-d54b-4015-8b02-f0ebe022e459',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082847Z:e5410433-d54b-4015-8b02-f0ebe022e459',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9a2bb352-56f4-4631-892f-77a0f9af081f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11783',
  'x-ms-correlation-request-id',
  '73c66a6a-c6fd-4b55-99a7-c98c3e60efc5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082848Z:73c66a6a-c6fd-4b55-99a7-c98c3e60efc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7c872490-dd3f-4bef-98d9-67d5901c944e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11782',
  'x-ms-correlation-request-id',
  '30acbf89-506c-4599-9280-e5f314262485',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082848Z:30acbf89-506c-4599-9280-e5f314262485',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7fc928df-c53c-42b7-a87a-a9c7ba277960',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11781',
  'x-ms-correlation-request-id',
  'af003c16-513e-4000-a1c8-578f044ab09c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082848Z:af003c16-513e-4000-a1c8-578f044ab09c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b4ac282d-8390-48a1-bc5a-7c99db41dc94',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11780',
  'x-ms-correlation-request-id',
  'a9a3d759-9d63-4388-874e-b3fe6021d0d4',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082848Z:a9a3d759-9d63-4388-874e-b3fe6021d0d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:12c16c62-27c1-4101-aaa6-c6fa916b8eaf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11779',
  'x-ms-correlation-request-id',
  'a47b29c2-1164-421b-9e9b-62519f87db9a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082849Z:a47b29c2-1164-421b-9e9b-62519f87db9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fb7ba794-734a-4bcf-8f1f-aab2fe5eff7f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11778',
  'x-ms-correlation-request-id',
  'ea1e109c-696a-4854-835b-d29377c82070',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082849Z:ea1e109c-696a-4854-835b-d29377c82070',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f2979668-c01a-4e9b-af95-a9e5e73d8551',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11777',
  'x-ms-correlation-request-id',
  '3f687cd9-41e6-4989-916a-a90f1dc14dc6',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082849Z:3f687cd9-41e6-4989-916a-a90f1dc14dc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:89a370d5-7de4-4c70-a628-90b909283078',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11776',
  'x-ms-correlation-request-id',
  'b91815a9-e687-4779-afec-8b77f055fcba',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082849Z:b91815a9-e687-4779-afec-8b77f055fcba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b735bdee-4628-4026-8aa1-46c2f3a98e14',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11775',
  'x-ms-correlation-request-id',
  '522f2f51-ee7e-418a-ad87-ae3a73960e5d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082850Z:522f2f51-ee7e-418a-ad87-ae3a73960e5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0a4f9e8e-c87f-44cd-9b5a-1c774d841ecb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11774',
  'x-ms-correlation-request-id',
  '2e15051c-7e86-4ee6-a3b1-f8dc570a3122',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082850Z:2e15051c-7e86-4ee6-a3b1-f8dc570a3122',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e1cf2200-2532-48ca-99dd-f052ea8ab6f6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11773',
  'x-ms-correlation-request-id',
  '3424fdca-b6ac-4a07-b5e5-7fddbccd2b61',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082850Z:3424fdca-b6ac-4a07-b5e5-7fddbccd2b61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:434c3838-6237-4267-9885-ef76ba9939e3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11772',
  'x-ms-correlation-request-id',
  'd5a770a1-2225-4abd-898d-f8349bbb6006',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082850Z:d5a770a1-2225-4abd-898d-f8349bbb6006',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5e0cc52b-4873-4704-86b7-3052632d7d11',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11771',
  'x-ms-correlation-request-id',
  '11c2c073-0f11-4fb6-95ed-88d9f59cf14b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082851Z:11c2c073-0f11-4fb6-95ed-88d9f59cf14b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:63df6ea6-2567-4e2b-a5c1-49e2470608d5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11770',
  'x-ms-correlation-request-id',
  '70a8a9ef-c942-4acc-bc60-f57f4624f189',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082851Z:70a8a9ef-c942-4acc-bc60-f57f4624f189',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8e788856-8f6b-47b3-b4b5-8b7f1a085ead',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11769',
  'x-ms-correlation-request-id',
  'e0829414-5903-41b1-8870-7a7cedad0d85',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082851Z:e0829414-5903-41b1-8870-7a7cedad0d85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:998c4a75-1fce-4dee-9e8d-808066b42ca0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11768',
  'x-ms-correlation-request-id',
  '0e480e2d-97bf-4d44-98f6-dcbd6979ee61',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082851Z:0e480e2d-97bf-4d44-98f6-dcbd6979ee61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6d3f0bca-ca49-4083-8723-bd03d27502e8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11767',
  'x-ms-correlation-request-id',
  '39112727-de58-45a6-a422-7376d0a1388a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082852Z:39112727-de58-45a6-a422-7376d0a1388a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2f91e780-a6b0-4fc4-9088-64f7af34c68a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11766',
  'x-ms-correlation-request-id',
  '23c05b82-cc6b-4bef-bad5-a17f3972a58a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082852Z:23c05b82-cc6b-4bef-bad5-a17f3972a58a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a58f6868-dc21-465a-bb2c-6ff2561444ab',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11765',
  'x-ms-correlation-request-id',
  'd46fae3c-9e1f-4db2-98c9-cb5ac454332c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082852Z:d46fae3c-9e1f-4db2-98c9-cb5ac454332c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:23dbc672-d547-4c82-967d-903c59257fa3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11764',
  'x-ms-correlation-request-id',
  '598f8d5b-5af1-4b86-ab4b-77f69e729a7e',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082852Z:598f8d5b-5af1-4b86-ab4b-77f69e729a7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ba8c016b-795f-4c2e-96ee-d7478188c8dc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11763',
  'x-ms-correlation-request-id',
  '80a051a9-05dd-4a28-a13c-63632c89a2dc',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082853Z:80a051a9-05dd-4a28-a13c-63632c89a2dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:23b1fcdf-78f1-4cd9-9db2-6fb6eb55c41c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11762',
  'x-ms-correlation-request-id',
  '01babcd9-e4b6-4e72-a205-e218397bfa16',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082853Z:01babcd9-e4b6-4e72-a205-e218397bfa16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:20f50319-bd55-4605-9e85-bc8f4eed6a4d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11761',
  'x-ms-correlation-request-id',
  '403a7f5e-f2fb-46e0-a2e6-5079f1f7a084',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082853Z:403a7f5e-f2fb-46e0-a2e6-5079f1f7a084',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9d3ab01e-d5e3-472f-82ea-92a5f7e5df40',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11760',
  'x-ms-correlation-request-id',
  '870a0acd-c65f-41c4-bbaf-5f2dd7714b89',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082853Z:870a0acd-c65f-41c4-bbaf-5f2dd7714b89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c7f5ed6b-63d9-42a3-a211-a8e33484916c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11759',
  'x-ms-correlation-request-id',
  'e7c0af58-1f59-4274-8ea8-a02946961703',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082854Z:e7c0af58-1f59-4274-8ea8-a02946961703',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7dd6e266-67e7-4332-94c4-ad6e4df6cabc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11758',
  'x-ms-correlation-request-id',
  '821346ac-cf7f-456c-8d52-81b7cc7ca2d9',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082854Z:821346ac-cf7f-456c-8d52-81b7cc7ca2d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0e893d65-6297-4d75-b9ed-83aa3a91ad4b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11757',
  'x-ms-correlation-request-id',
  'bad85977-4e01-4f5d-95fb-7ad1e027ce82',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082854Z:bad85977-4e01-4f5d-95fb-7ad1e027ce82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f184d2b5-c54e-4030-8fc4-b891515f4591',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11756',
  'x-ms-correlation-request-id',
  '68029b31-7c83-4cf3-89d5-bae85c2263f2',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082854Z:68029b31-7c83-4cf3-89d5-bae85c2263f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2bcaaae6-1b9c-4da2-bbba-4ca24af54eaf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11755',
  'x-ms-correlation-request-id',
  '7e541459-8446-4a55-855f-dc11ff692ffb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082855Z:7e541459-8446-4a55-855f-dc11ff692ffb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c71f5804-4fea-409c-aee2-6a0b52286d2c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11754',
  'x-ms-correlation-request-id',
  'd9ef6e15-34b5-456b-8b0d-039cee9ce7c9',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082855Z:d9ef6e15-34b5-456b-8b0d-039cee9ce7c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:08cea5cf-4eb7-4ce4-9c1b-e585b029aaa3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11753',
  'x-ms-correlation-request-id',
  '7757a73e-b3a3-4017-9a93-52834165a202',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082855Z:7757a73e-b3a3-4017-9a93-52834165a202',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:18e2d2fc-ed55-47b5-9d88-c8dc548cfb0f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11752',
  'x-ms-correlation-request-id',
  '3277bd11-91fb-4f6d-b265-7afa98f68221',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082855Z:3277bd11-91fb-4f6d-b265-7afa98f68221',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fdd8c4c5-4421-4335-aa9b-e1081bc95da7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11751',
  'x-ms-correlation-request-id',
  '2910342e-170f-418f-8327-d7ec948988bb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082856Z:2910342e-170f-418f-8327-d7ec948988bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:297c7692-4c63-4995-bffb-97bb8a5fd2d5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11750',
  'x-ms-correlation-request-id',
  '97d23585-b890-4675-8a68-79f5daf28b99',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082856Z:97d23585-b890-4675-8a68-79f5daf28b99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9d3c4b89-5653-4c37-b618-767348a6ceaf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11749',
  'x-ms-correlation-request-id',
  'f74d2a36-7d28-445c-aca7-0816df459a7c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082856Z:f74d2a36-7d28-445c-aca7-0816df459a7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7bd9b7ad-e561-4f7e-8ee7-1ec27b4f27e7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11748',
  'x-ms-correlation-request-id',
  '3dd23941-eb5a-4c1d-a485-5323bfd1b549',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082856Z:3dd23941-eb5a-4c1d-a485-5323bfd1b549',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9608384b-563f-4ccc-84b2-d9dffcdeac36',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11747',
  'x-ms-correlation-request-id',
  '172f4a6c-9e77-4099-a932-75798c8da14b',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082857Z:172f4a6c-9e77-4099-a932-75798c8da14b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9652e105-d76c-4cae-8ce9-402225cdb092',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11746',
  'x-ms-correlation-request-id',
  '6f8d1386-1dae-4522-80e0-544702968703',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082857Z:6f8d1386-1dae-4522-80e0-544702968703',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f70143e0-4db5-4345-a097-53ef7bfe6b8b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11745',
  'x-ms-correlation-request-id',
  'b9a2d6b1-dcd0-4300-a6c2-6e0a65560a1c',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082857Z:b9a2d6b1-dcd0-4300-a6c2-6e0a65560a1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b09ce85e-7129-4419-9dde-1ba992dfbd29',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11744',
  'x-ms-correlation-request-id',
  'e2648734-35bc-4529-82a9-f7de20493638',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082857Z:e2648734-35bc-4529-82a9-f7de20493638',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:18b0e0e7-c893-48db-99a5-a7cc8ce3022c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11743',
  'x-ms-correlation-request-id',
  'b866b13a-06f8-4086-bfe9-ad12c9381b10',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082858Z:b866b13a-06f8-4086-bfe9-ad12c9381b10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:41e2191a-103b-485c-818e-4ff06fe12b30',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11742',
  'x-ms-correlation-request-id',
  'b37782a2-8805-47bf-9a38-465ae368c37d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082858Z:b37782a2-8805-47bf-9a38-465ae368c37d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7c267a4b-b39d-42bc-9fdf-3a63ae08abd9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11741',
  'x-ms-correlation-request-id',
  '5b866556-8801-421e-a5a6-0f7839e11106',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082858Z:5b866556-8801-421e-a5a6-0f7839e11106',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3c98cb12-872e-4810-b912-392efb533d5b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11740',
  'x-ms-correlation-request-id',
  'e906518b-1544-4ae4-8371-f484e1aa907a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082858Z:e906518b-1544-4ae4-8371-f484e1aa907a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0f40cc18-dfe8-4754-845a-e74936acd7a6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11739',
  'x-ms-correlation-request-id',
  'a9b3e449-889c-4a9c-97bc-3a75f9bcce64',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082859Z:a9b3e449-889c-4a9c-97bc-3a75f9bcce64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5253b935-4a9a-4584-8d19-01a051152cb2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11738',
  'x-ms-correlation-request-id',
  '3e5043c6-0a8d-4dba-ad7c-098b3ab5a3bd',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082859Z:3e5043c6-0a8d-4dba-ad7c-098b3ab5a3bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:eb45bbfe-bc7c-4c75-8a3a-1840fc78ad85',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11737',
  'x-ms-correlation-request-id',
  '05da5c2b-ac10-4f73-a4af-bffb273940e5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082859Z:05da5c2b-ac10-4f73-a4af-bffb273940e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:aba3f4d8-2938-43ad-a8a3-3ac8186ffbd7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11736',
  'x-ms-correlation-request-id',
  '63c4fc85-423e-48ae-bdac-7f9fa2a798da',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082859Z:63c4fc85-423e-48ae-bdac-7f9fa2a798da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:363ef30f-007f-44ae-8808-90229579caf4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11735',
  'x-ms-correlation-request-id',
  'f3ee27aa-65e1-495a-84be-7a8ecf1034bb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082900Z:f3ee27aa-65e1-495a-84be-7a8ecf1034bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7f9633c5-046e-491f-930b-2a98c99a32d2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11734',
  'x-ms-correlation-request-id',
  '5c2fd046-2ee4-41be-ae73-6cdf90b7b8b4',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082900Z:5c2fd046-2ee4-41be-ae73-6cdf90b7b8b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ffd287fd-734d-46ac-9d81-8d34f9777063',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11733',
  'x-ms-correlation-request-id',
  'f922d473-216f-4fd3-866a-006cdb2c80c0',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082900Z:f922d473-216f-4fd3-866a-006cdb2c80c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:784807ef-2175-40a9-9c57-4af850e64bac',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11732',
  'x-ms-correlation-request-id',
  '04cfff68-5a83-4a21-a925-2aff9a922e7a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082900Z:04cfff68-5a83-4a21-a925-2aff9a922e7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:28:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:35ccb711-3790-49b3-b38c-ccda45db1262',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11731',
  'x-ms-correlation-request-id',
  '880daaf1-eb7a-4a6c-a03d-dbb281c5b5cf',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082901Z:880daaf1-eb7a-4a6c-a03d-dbb281c5b5cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:aa0af5ed-2ec3-4691-816b-3ace4e5e5373',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11730',
  'x-ms-correlation-request-id',
  'b291ac0f-55a0-44e1-81a3-a025c754ca75',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082901Z:b291ac0f-55a0-44e1-81a3-a025c754ca75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1612006e-bcb1-4256-b410-6da53ad6cff5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11729',
  'x-ms-correlation-request-id',
  'bb75bd6c-3b7f-431b-933a-6109d5c791ba',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082901Z:bb75bd6c-3b7f-431b-933a-6109d5c791ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b14356db-4685-492b-9d5e-fff9ea8cd22d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11728',
  'x-ms-correlation-request-id',
  'a8c82bc0-1d13-4bda-b07c-bc16b9ba5648',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082901Z:a8c82bc0-1d13-4bda-b07c-bc16b9ba5648',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:625f30d6-6a15-475a-a193-28fa39325f6e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11727',
  'x-ms-correlation-request-id',
  '555876d2-94bd-4672-bdf1-bf3eec102bdb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082902Z:555876d2-94bd-4672-bdf1-bf3eec102bdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:bae05620-e769-4afe-a1c7-94312b19ec2a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11726',
  'x-ms-correlation-request-id',
  'bdd2d41b-f991-4db6-89e5-43d16cb1aea2',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082902Z:bdd2d41b-f991-4db6-89e5-43d16cb1aea2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e9cbef6a-19ea-4ac9-bc57-d874e72f13fe',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11725',
  'x-ms-correlation-request-id',
  'f36519f4-88e3-4016-9ee4-b1b1f7eb50a5',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082902Z:f36519f4-88e3-4016-9ee4-b1b1f7eb50a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8c273cef-9387-4f94-aaef-a7e92cc927c2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11724',
  'x-ms-correlation-request-id',
  'c2945717-dbf6-4f69-8e36-5e8aca1d410d',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082902Z:c2945717-dbf6-4f69-8e36-5e8aca1d410d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9a9611a1-4520-46f4-a39a-d0ec55fc2b5c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11723',
  'x-ms-correlation-request-id',
  '75bd093b-307a-4cb5-a67d-74e91011498a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T082902Z:75bd093b-307a-4cb5-a67d-74e91011498a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:18427b1d-dc2c-424b-b6c3-4057de04392f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '01dc4d44-ab9b-4086-8f15-bf85c3df0c60',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082905Z:01dc4d44-ab9b-4086-8f15-bf85c3df0c60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:64ce0660-c9f2-435b-b108-5abf7cd6b97d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '2c58434f-84fc-4e9c-abd6-e2f51502c6c5',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082906Z:2c58434f-84fc-4e9c-abd6-e2f51502c6c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:14225344-d46b-4883-8502-7060539b1013',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  '8be034cc-8771-4300-8a40-e5bdd5c6fd16',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082906Z:8be034cc-8771-4300-8a40-e5bdd5c6fd16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:665c6247-546e-4c8d-ab71-d16670084c65',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  '04d5dcf2-fc21-4a92-85eb-55b78dd80456',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082906Z:04d5dcf2-fc21-4a92-85eb-55b78dd80456',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3258b1b2-fc29-4481-8a7d-83670a724984',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11995',
  'x-ms-correlation-request-id',
  '09b20926-aaff-4903-acca-0cbb99aa7b76',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082906Z:09b20926-aaff-4903-acca-0cbb99aa7b76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:d75b82d3-0743-4a86-a6c7-8402c6685173',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11994',
  'x-ms-correlation-request-id',
  'fb4c4aa8-ff50-46e8-afb9-91d5dfbb58b8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082907Z:fb4c4aa8-ff50-46e8-afb9-91d5dfbb58b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2fff4954-6762-431d-9e67-3aa4e57ae62d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11993',
  'x-ms-correlation-request-id',
  'cd94b11b-600c-4b26-87b6-5c8644f0d00e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082907Z:cd94b11b-600c-4b26-87b6-5c8644f0d00e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:68e86b18-0a31-43ea-b582-3e50622be02a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-correlation-request-id',
  'c988c75b-18a3-4596-ad45-1f1513bb9c65',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082907Z:c988c75b-18a3-4596-ad45-1f1513bb9c65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2782641a-6bee-4f54-b8ce-c77143881b95',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11991',
  'x-ms-correlation-request-id',
  'ccdfe02c-4fb9-4f23-abb7-b7224bcfd3a8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082907Z:ccdfe02c-4fb9-4f23-abb7-b7224bcfd3a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:d00f2ce7-94c1-49ba-b505-32c7c0f93305',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11990',
  'x-ms-correlation-request-id',
  'c09179fa-bb48-407d-90c1-c33fd525eace',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082908Z:c09179fa-bb48-407d-90c1-c33fd525eace',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:704ff4d8-9eae-4f31-bac5-e5a23dbd17fc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11989',
  'x-ms-correlation-request-id',
  '7fa00838-af21-4890-befb-e87e626e5811',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082908Z:7fa00838-af21-4890-befb-e87e626e5811',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:07bb9cf3-3bd7-4476-8ba1-71c2f9809d12',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11988',
  'x-ms-correlation-request-id',
  '826e0b89-b2b8-4715-9651-63aa694ede66',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082908Z:826e0b89-b2b8-4715-9651-63aa694ede66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:57f27392-d28d-4c1d-9e89-61cd0da80c17',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11987',
  'x-ms-correlation-request-id',
  '518d29c5-0aaf-430c-be64-12f06f5e539d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082908Z:518d29c5-0aaf-430c-be64-12f06f5e539d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fe9fb51e-01e7-4c11-87bc-229ac69971f1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11986',
  'x-ms-correlation-request-id',
  '00aa7ca8-4cd9-4302-947e-8539062311c4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082909Z:00aa7ca8-4cd9-4302-947e-8539062311c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7b008136-14d6-4e25-85a5-fd1fa4063a06',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11985',
  'x-ms-correlation-request-id',
  'c49b360c-ef60-498e-877f-dc8f179b699d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082909Z:c49b360c-ef60-498e-877f-dc8f179b699d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9e44c122-0f1f-4eb6-82b2-50fb1f06ca28',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11984',
  'x-ms-correlation-request-id',
  '56285c4a-ce29-46a0-b961-cdcadc0b986d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082909Z:56285c4a-ce29-46a0-b961-cdcadc0b986d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:884d5d5d-607c-44f3-8dec-3e2e2c671000',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11983',
  'x-ms-correlation-request-id',
  '428a8a93-cd39-46ca-a079-75f63cdcfb30',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082909Z:428a8a93-cd39-46ca-a079-75f63cdcfb30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0a88ad27-3f73-4986-8076-91500d2437e5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11982',
  'x-ms-correlation-request-id',
  '0fcb5fee-d61b-4603-9202-c13ef9474184',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082910Z:0fcb5fee-d61b-4603-9202-c13ef9474184',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:381998f6-26bf-4eee-a296-942464e1fd2f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11981',
  'x-ms-correlation-request-id',
  'bbde4ab6-c8cd-4e07-9f26-8403383e4a02',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082910Z:bbde4ab6-c8cd-4e07-9f26-8403383e4a02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1c7c61e5-1471-4396-8243-704e0e27b95e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11980',
  'x-ms-correlation-request-id',
  'de38f118-db3b-4bdd-97be-882e7e991e2b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082910Z:de38f118-db3b-4bdd-97be-882e7e991e2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:767bdb89-1261-4c68-97d2-d7f9677c38e2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11979',
  'x-ms-correlation-request-id',
  'bd23c753-76c5-4f6a-96fc-db309b452555',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082910Z:bd23c753-76c5-4f6a-96fc-db309b452555',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:15b70f05-2ce2-43d2-b1df-6947d140ea63',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11978',
  'x-ms-correlation-request-id',
  '2a7e6188-60f6-45b1-9d88-456dba0c2c22',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082911Z:2a7e6188-60f6-45b1-9d88-456dba0c2c22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2001e628-21e7-47bf-9149-1a0eca296bb2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11977',
  'x-ms-correlation-request-id',
  'eeb7fdc0-1cb4-4eef-a838-f077eb6a599b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082911Z:eeb7fdc0-1cb4-4eef-a838-f077eb6a599b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2b9fbc2c-ab58-4105-b17c-bfdf8bc1c43f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11976',
  'x-ms-correlation-request-id',
  'e0fbc67c-e1a1-434e-842a-9df92e3a21de',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082911Z:e0fbc67c-e1a1-434e-842a-9df92e3a21de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fe35f3e9-ff25-4228-914d-6861fce73d4d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11975',
  'x-ms-correlation-request-id',
  '1d3dfd84-fd3e-44a8-939d-8d7ba80724ad',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082911Z:1d3dfd84-fd3e-44a8-939d-8d7ba80724ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:91c9a1dd-32f3-4f21-a0bd-00a06dc06e0a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11974',
  'x-ms-correlation-request-id',
  'fa32c607-5996-44fb-a873-38681ad51751',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082912Z:fa32c607-5996-44fb-a873-38681ad51751',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:57930eaa-fddf-4645-8adc-cfc992ff19bb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11973',
  'x-ms-correlation-request-id',
  'bcef1f23-fb4a-4303-932f-6cbc4e945426',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082912Z:bcef1f23-fb4a-4303-932f-6cbc4e945426',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:550817f3-4fda-46c5-879b-ece731f8f2a7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11972',
  'x-ms-correlation-request-id',
  '74341c6a-c074-4648-9c4e-2c19d68e91a6',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082912Z:74341c6a-c074-4648-9c4e-2c19d68e91a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:bf51cebb-b362-4491-9eb6-b7b541d45f61',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11971',
  'x-ms-correlation-request-id',
  'c0974434-e72c-4272-967a-cee2120a7918',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082912Z:c0974434-e72c-4272-967a-cee2120a7918',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6de2218c-9800-4e79-9580-8bd586ad1a5c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11970',
  'x-ms-correlation-request-id',
  '14b47cbd-17fc-4f00-9906-a88629327e88',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082913Z:14b47cbd-17fc-4f00-9906-a88629327e88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f2845c41-7b40-4dd5-a249-9ef397604746',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11969',
  'x-ms-correlation-request-id',
  '0be12bc7-367e-43e6-a61d-c47c36c229c0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082913Z:0be12bc7-367e-43e6-a61d-c47c36c229c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:cd803b93-11e6-48a7-89c1-3e4d7c133151',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11968',
  'x-ms-correlation-request-id',
  '320f310f-7ee1-4d75-a0c3-e21939305d9c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082913Z:320f310f-7ee1-4d75-a0c3-e21939305d9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c681df67-8388-46ae-b4e5-f126f75987cc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11967',
  'x-ms-correlation-request-id',
  '75d2f2f8-a919-4575-b478-8abc2ea93c56',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082913Z:75d2f2f8-a919-4575-b478-8abc2ea93c56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9f50cdb8-7a2a-48f9-99dc-a9fe727f8f94',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11966',
  'x-ms-correlation-request-id',
  '2ff9a15d-cc1a-456d-a1ad-0d8c4108fc36',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082914Z:2ff9a15d-cc1a-456d-a1ad-0d8c4108fc36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:62f2bab4-bfeb-4be4-b889-595bed55bcb2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11965',
  'x-ms-correlation-request-id',
  'be5f72aa-a780-42e8-b287-fe126f79f9eb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082914Z:be5f72aa-a780-42e8-b287-fe126f79f9eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8c8c80e1-a560-4f1e-90dc-26588f496186',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11964',
  'x-ms-correlation-request-id',
  '41bb6b00-7ae4-4f5f-be9a-22c086f51a97',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082914Z:41bb6b00-7ae4-4f5f-be9a-22c086f51a97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1e3352a9-ac9d-456b-bd5f-aaf37b23e0d8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11963',
  'x-ms-correlation-request-id',
  '98815f8d-3c18-457b-abf0-fc5a5333a948',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082914Z:98815f8d-3c18-457b-abf0-fc5a5333a948',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:819f2833-f4c7-468a-bada-002670e8aab3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11962',
  'x-ms-correlation-request-id',
  '93bf2e34-0eb7-471d-a0e8-91f9b4c70bb0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082915Z:93bf2e34-0eb7-471d-a0e8-91f9b4c70bb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4009dcc9-a485-4e8a-826f-d0e65bbcda47',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11961',
  'x-ms-correlation-request-id',
  'bdf2bc55-df10-4979-9bc4-f5fd738c9620',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082915Z:bdf2bc55-df10-4979-9bc4-f5fd738c9620',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a714b8e9-6fce-4759-b4f9-646694c325aa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11960',
  'x-ms-correlation-request-id',
  'efc749bc-eadb-44dd-af70-4b900f80c73f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082915Z:efc749bc-eadb-44dd-af70-4b900f80c73f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:eb19e3f0-5a1a-4b6d-89f6-148c597962e1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11959',
  'x-ms-correlation-request-id',
  'f875687f-48a8-43d5-a7a3-f6fcfdf382b0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082915Z:f875687f-48a8-43d5-a7a3-f6fcfdf382b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1316c788-4c81-4d85-a93d-66d1f339c7ed',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11958',
  'x-ms-correlation-request-id',
  'baa3ba74-72d6-4368-9f1c-a5bff70fa062',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082916Z:baa3ba74-72d6-4368-9f1c-a5bff70fa062',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:babae004-a342-4bfd-afd6-34803dbf9312',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11957',
  'x-ms-correlation-request-id',
  '87059977-59e4-4fea-bbee-1a820dd52c51',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082916Z:87059977-59e4-4fea-bbee-1a820dd52c51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7e995d75-b731-4ea0-bead-0f22dc240e28',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11956',
  'x-ms-correlation-request-id',
  '35c706a1-7cab-4243-a924-ef52e7ab836d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082916Z:35c706a1-7cab-4243-a924-ef52e7ab836d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:074b84c1-2ec9-4725-af2c-ccb3cc7207a8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11955',
  'x-ms-correlation-request-id',
  'bdd529ca-a75c-46e8-959f-08f1dfbaca4f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082916Z:bdd529ca-a75c-46e8-959f-08f1dfbaca4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:da270987-6546-4d79-82b2-e471bbdcb969',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11954',
  'x-ms-correlation-request-id',
  'f25b7a85-d3a4-43eb-a01c-1f18cd7cc014',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082917Z:f25b7a85-d3a4-43eb-a01c-1f18cd7cc014',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a547d10e-eb4b-4808-843e-fb4592b1605e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11953',
  'x-ms-correlation-request-id',
  '4cee118b-91ce-4676-a2ca-c9ad1f488ced',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082917Z:4cee118b-91ce-4676-a2ca-c9ad1f488ced',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7a4d03f2-c22a-4bc4-b04b-3a63aaa5ae19',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11952',
  'x-ms-correlation-request-id',
  'f9313ecd-1b98-41a1-90bb-6d6b5b5d482e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082917Z:f9313ecd-1b98-41a1-90bb-6d6b5b5d482e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:edd34ec3-779a-45a2-8284-8b95f4d919f2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11951',
  'x-ms-correlation-request-id',
  '320dd56d-c76d-4bfb-91a6-29c119b79deb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082917Z:320dd56d-c76d-4bfb-91a6-29c119b79deb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ad610b17-ab0c-4d65-8d7e-978e7172e758',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11950',
  'x-ms-correlation-request-id',
  '9a007a70-70ca-4a5a-bf90-b57fb8b26ce0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082918Z:9a007a70-70ca-4a5a-bf90-b57fb8b26ce0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fee389da-66b3-4b19-bd70-e9003e440220',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11949',
  'x-ms-correlation-request-id',
  'dc0359c3-9f8b-4fe5-a04b-8b7988cca36a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082918Z:dc0359c3-9f8b-4fe5-a04b-8b7988cca36a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f383c1b0-5ecd-4e76-92a6-d915c6142ffd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11948',
  'x-ms-correlation-request-id',
  '6ef63c87-823e-47e8-a291-73382d112944',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082918Z:6ef63c87-823e-47e8-a291-73382d112944',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c02eb123-07e5-41bc-ae1e-d44a6c0e2e3a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11947',
  'x-ms-correlation-request-id',
  '708e86c2-c4f1-479a-aced-11c718651bf5',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082918Z:708e86c2-c4f1-479a-aced-11c718651bf5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7145be06-865a-415a-a250-865b3c560bde',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11946',
  'x-ms-correlation-request-id',
  '091b9a2a-ed9b-4f27-a724-d60a8450609c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082919Z:091b9a2a-ed9b-4f27-a724-d60a8450609c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1552ccb6-b065-47fd-bdd4-90f636479764',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11945',
  'x-ms-correlation-request-id',
  '4a0b4f08-2a42-4349-b30d-eae7c257c0b3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082919Z:4a0b4f08-2a42-4349-b30d-eae7c257c0b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b07fcb5e-6d3a-491d-9d54-7846d7f77ed0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11944',
  'x-ms-correlation-request-id',
  '5d9ab8c1-af21-41ee-803b-4791abdcddf6',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082919Z:5d9ab8c1-af21-41ee-803b-4791abdcddf6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:62e086b9-926f-4827-8469-e4a873783902',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11943',
  'x-ms-correlation-request-id',
  '2b742d04-3d4a-458d-9e12-431dbd185606',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082919Z:2b742d04-3d4a-458d-9e12-431dbd185606',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f85bc924-1e4b-4648-a31a-9c44aa9ebe57',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11942',
  'x-ms-correlation-request-id',
  'd9ec5254-40fd-48fc-9bc2-754da3635f2a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082920Z:d9ec5254-40fd-48fc-9bc2-754da3635f2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0368c427-ff2b-4763-be1a-b20171a9e9f1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11941',
  'x-ms-correlation-request-id',
  '687f25b2-b651-4af3-8a38-191097dbbe72',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082920Z:687f25b2-b651-4af3-8a38-191097dbbe72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:82b8a922-334b-4d9b-8a9c-1949177d8eb1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11940',
  'x-ms-correlation-request-id',
  '8a5b16fc-aead-48f8-9012-1bc7023664e0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082920Z:8a5b16fc-aead-48f8-9012-1bc7023664e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:eec0d3f2-77e3-4712-af40-2b1fc8a87827',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11939',
  'x-ms-correlation-request-id',
  'ce89276f-685f-4f26-8820-239cdc74624d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082920Z:ce89276f-685f-4f26-8820-239cdc74624d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:898cffb4-ebe8-40dc-bdae-7d9fa23d14fe',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11938',
  'x-ms-correlation-request-id',
  '3cef708c-5e64-4660-856a-17ff2eed4062',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082921Z:3cef708c-5e64-4660-856a-17ff2eed4062',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b043deda-cea7-44a5-90fe-d5442b44bdf2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11937',
  'x-ms-correlation-request-id',
  'cf4b80ed-96f4-459a-b442-b851a4c4e5a4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082921Z:cf4b80ed-96f4-459a-b442-b851a4c4e5a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c8f956af-266a-4bee-8dd8-0ba89f00b687',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11936',
  'x-ms-correlation-request-id',
  'a16301bb-5d1c-4425-8e2b-e38efe6dfe59',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082921Z:a16301bb-5d1c-4425-8e2b-e38efe6dfe59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:dc4ba734-594c-4588-922d-e0cc961f886b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11935',
  'x-ms-correlation-request-id',
  '1db256bf-4d40-4033-a7e9-643434084979',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082921Z:1db256bf-4d40-4033-a7e9-643434084979',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6186b78a-0dd9-4788-8f51-9a9737bbb5a8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11934',
  'x-ms-correlation-request-id',
  '437aedc6-d646-463e-a474-74d629da57f8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082922Z:437aedc6-d646-463e-a474-74d629da57f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:bcb042ee-8aa3-4204-8ce9-c20e9fcb6265',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11933',
  'x-ms-correlation-request-id',
  '100602db-be3c-437c-a80e-ccecf9fa224f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082922Z:100602db-be3c-437c-a80e-ccecf9fa224f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4c7f128e-77d6-4027-9e93-673c4da77b9b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-correlation-request-id',
  'bfa845db-a094-4350-a8a1-3e008cfcf65e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082922Z:bfa845db-a094-4350-a8a1-3e008cfcf65e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:900c9f56-f3c3-4446-af73-be57af43c889',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11931',
  'x-ms-correlation-request-id',
  'bc19a5a1-a5b8-49e7-8504-7375ffe45313',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082922Z:bc19a5a1-a5b8-49e7-8504-7375ffe45313',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9948a13d-9988-48ec-a4b4-52e34d6d4fe5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-correlation-request-id',
  'b2893307-19fb-444c-8d9f-bc77455448b1',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082923Z:b2893307-19fb-444c-8d9f-bc77455448b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:62510d18-345e-4cef-b476-17651340c8c4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11929',
  'x-ms-correlation-request-id',
  '87698552-455c-4ea3-8a9e-80693ee5eabd',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082923Z:87698552-455c-4ea3-8a9e-80693ee5eabd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5f360215-7db9-4538-b7be-bccfeaac368f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11928',
  'x-ms-correlation-request-id',
  'ac047345-e931-4f2d-b634-df2f2a1b3eca',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082923Z:ac047345-e931-4f2d-b634-df2f2a1b3eca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ee6433a2-e842-4b83-b739-01c5d19ddc7a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11927',
  'x-ms-correlation-request-id',
  '37af2134-7436-4225-b1a4-d2c10227a017',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082923Z:37af2134-7436-4225-b1a4-d2c10227a017',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:44c8b8d6-350a-4887-89ea-3ed153e900f0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11926',
  'x-ms-correlation-request-id',
  '7c829b08-a4c9-4b6d-a627-89a2c370f642',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082924Z:7c829b08-a4c9-4b6d-a627-89a2c370f642',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:61b8dec3-10c4-4c7e-aeb3-2cf88d5935b5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11925',
  'x-ms-correlation-request-id',
  'c681ac82-8886-4be1-b6e3-8df5c180e744',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082924Z:c681ac82-8886-4be1-b6e3-8df5c180e744',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b19d2e5e-c6da-4aba-a39f-19fedd663774',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11924',
  'x-ms-correlation-request-id',
  'b7066ddb-db31-4fe4-9a0b-a8104c499f05',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082924Z:b7066ddb-db31-4fe4-9a0b-a8104c499f05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a572a9d6-1f3a-4739-9cac-86187ab0c0e8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11923',
  'x-ms-correlation-request-id',
  '3485b47a-571e-495e-81a1-0fa3583a0f8d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082924Z:3485b47a-571e-495e-81a1-0fa3583a0f8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:93259091-4ddc-4a87-b6e3-9a16791239a7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11922',
  'x-ms-correlation-request-id',
  'dc17cf26-27f5-448e-81b8-9fdfd05dd74e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082925Z:dc17cf26-27f5-448e-81b8-9fdfd05dd74e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:216377f3-f9e2-4612-8b3a-f09baa2e64db',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11921',
  'x-ms-correlation-request-id',
  'fc2ac0bc-29f8-470e-a373-323518f97cb0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082925Z:fc2ac0bc-29f8-470e-a373-323518f97cb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:65330591-0e60-45f9-a3a4-4bf102acddc6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11920',
  'x-ms-correlation-request-id',
  '4b09d096-b327-4d52-9f0a-7264f6621e1e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082925Z:4b09d096-b327-4d52-9f0a-7264f6621e1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:d3e54459-732b-4923-9808-7cea6d56a4ae',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11919',
  'x-ms-correlation-request-id',
  '55eea447-f65e-4cf2-8c85-c8f941b3acac',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082925Z:55eea447-f65e-4cf2-8c85-c8f941b3acac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:11acc0a2-f197-4e2d-8f45-b230a2ca478d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11918',
  'x-ms-correlation-request-id',
  'e155d0f0-dde7-4091-af5e-7f0039f573fe',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082926Z:e155d0f0-dde7-4091-af5e-7f0039f573fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2488f66b-46d1-4137-9e95-ea1230b646f8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11917',
  'x-ms-correlation-request-id',
  'd06e7ff9-9c31-473b-a20a-31ab883942df',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082926Z:d06e7ff9-9c31-473b-a20a-31ab883942df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:47fc16cf-0e94-47df-9875-a793a5a2904c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11916',
  'x-ms-correlation-request-id',
  'bd030fac-c489-4055-ad48-2afa837e7b54',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082926Z:bd030fac-c489-4055-ad48-2afa837e7b54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8b939370-fc0f-49c7-841e-a250679dd27e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11915',
  'x-ms-correlation-request-id',
  'da8291cc-0be2-4f8b-9481-71c304c34546',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082926Z:da8291cc-0be2-4f8b-9481-71c304c34546',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5e49fa7f-45ef-480f-b2de-1d8a15967d08',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11914',
  'x-ms-correlation-request-id',
  '1396c356-8e87-4e5d-98dd-e3436183ac4c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082927Z:1396c356-8e87-4e5d-98dd-e3436183ac4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0ad9db99-aae4-49c5-94cd-58c5a8a7e255',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11913',
  'x-ms-correlation-request-id',
  '29f75e8b-1064-4cb8-adb6-d383e84170bb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082927Z:29f75e8b-1064-4cb8-adb6-d383e84170bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7b3a614c-6345-4b7a-9d4f-80abdf28ef0b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11912',
  'x-ms-correlation-request-id',
  '3841d815-d96d-4cab-919d-524702833d6e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082927Z:3841d815-d96d-4cab-919d-524702833d6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0b592664-f0b4-4548-bda2-0df54f0744ce',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11911',
  'x-ms-correlation-request-id',
  '17c1e768-b67d-41f9-9528-1f2f91393ad3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082927Z:17c1e768-b67d-41f9-9528-1f2f91393ad3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8f1120cb-1ef9-4508-9404-35be0cee2c2a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11910',
  'x-ms-correlation-request-id',
  '4018af55-8c26-40d4-a902-a5f3bc380763',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082928Z:4018af55-8c26-40d4-a902-a5f3bc380763',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:07b80131-9e0c-48ca-838f-d1b2ad38ad06',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11909',
  'x-ms-correlation-request-id',
  '9e933f44-8f28-4b36-94f9-8119ad8c8058',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082928Z:9e933f44-8f28-4b36-94f9-8119ad8c8058',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:03852a6a-3988-4e63-9619-5e369e9fcebf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11908',
  'x-ms-correlation-request-id',
  '34289be5-e18a-400c-8ded-4a4d0d053a55',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082928Z:34289be5-e18a-400c-8ded-4a4d0d053a55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:0cb7f310-d821-4547-b260-7b4ffbf69fa9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11907',
  'x-ms-correlation-request-id',
  'aac14612-9a96-4efd-90d1-ccd4366e866f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082928Z:aac14612-9a96-4efd-90d1-ccd4366e866f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1ae9ee6c-6485-4e51-989c-a101cca9ff76',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11906',
  'x-ms-correlation-request-id',
  'e20e81f2-ae37-4a44-826d-fa7c31b92736',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082929Z:e20e81f2-ae37-4a44-826d-fa7c31b92736',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:17998807-6f3e-4ecc-baa2-e6fb198ff5e7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11905',
  'x-ms-correlation-request-id',
  '67f670b6-8ca2-4191-b012-5f1207ec9a6f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082929Z:67f670b6-8ca2-4191-b012-5f1207ec9a6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:cc297628-c962-4252-b69d-6119e5df8b35',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-correlation-request-id',
  '106ef4f1-1c0a-485e-8d5c-9675474c317b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082929Z:106ef4f1-1c0a-485e-8d5c-9675474c317b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:254956bb-88de-42fc-8914-2d999b2dd00f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11903',
  'x-ms-correlation-request-id',
  '4a83b5f2-60ae-4fa3-b684-f5f8696860f2',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082930Z:4a83b5f2-60ae-4fa3-b684-f5f8696860f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6dbcf980-d773-4e63-8e17-84ff4c7cc9c2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11902',
  'x-ms-correlation-request-id',
  '7cce44ed-e2b2-4c2f-a1c5-b61ea2d83942',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082930Z:7cce44ed-e2b2-4c2f-a1c5-b61ea2d83942',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5b312eea-db45-42ad-94c2-dd3bed0664b3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11901',
  'x-ms-correlation-request-id',
  '4e142e4c-d3b3-40a4-940c-56a4feed8b6d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082930Z:4e142e4c-d3b3-40a4-940c-56a4feed8b6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c2bc6e4b-0f27-4931-8e2f-21c3637cfe5e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11900',
  'x-ms-correlation-request-id',
  'bdc01abb-476b-4847-8924-52ac84726ce3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082930Z:bdc01abb-476b-4847-8924-52ac84726ce3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:710316e0-9806-45b3-a65a-5ea697cfa455',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11899',
  'x-ms-correlation-request-id',
  '7d161c97-1bab-4f6b-bd99-1310eb8e6f87',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082931Z:7d161c97-1bab-4f6b-bd99-1310eb8e6f87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fc4a0973-174e-40db-9aaa-da138f89ac74',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11898',
  'x-ms-correlation-request-id',
  '70f22e6e-a418-4218-abe1-87937a91167a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082931Z:70f22e6e-a418-4218-abe1-87937a91167a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a8a1c942-0b9e-4fbb-915d-2ddf85ff8abb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11897',
  'x-ms-correlation-request-id',
  '014ed05b-e834-401e-bbe3-28499e9822c4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082931Z:014ed05b-e834-401e-bbe3-28499e9822c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:243eef7d-d039-4e84-9313-18ce79d19c9b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11896',
  'x-ms-correlation-request-id',
  'acd06296-2ec4-4606-8720-824f0fcb73e0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082931Z:acd06296-2ec4-4606-8720-824f0fcb73e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6ceef9f8-df89-4e49-8ab7-9c07fa2c2825',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11895',
  'x-ms-correlation-request-id',
  '9b80bfb8-f7f3-4f84-b5b8-6f9abc81503c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082932Z:9b80bfb8-f7f3-4f84-b5b8-6f9abc81503c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a53e1f16-12c3-40b0-8575-1420d9134f30',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11894',
  'x-ms-correlation-request-id',
  '31e48b9c-3fbb-4e31-b9de-05cf6dcd40fb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082932Z:31e48b9c-3fbb-4e31-b9de-05cf6dcd40fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:92c3438f-65f8-4903-9637-4eb0223e46e3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11893',
  'x-ms-correlation-request-id',
  'ebd53d12-99f1-475a-bd39-fc73989f1c55',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082932Z:ebd53d12-99f1-475a-bd39-fc73989f1c55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:854921a3-bee4-467c-845c-27647807f285',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11892',
  'x-ms-correlation-request-id',
  '81139b7a-7c4f-40d1-b2de-4a101eafc3bb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082932Z:81139b7a-7c4f-40d1-b2de-4a101eafc3bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c5c3cf02-860f-4929-9864-f0f7d02fe0db',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11891',
  'x-ms-correlation-request-id',
  '54192b40-6717-4441-9791-4fb6d3b1a018',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082933Z:54192b40-6717-4441-9791-4fb6d3b1a018',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:cc3babbc-d3ce-4fcc-accd-436303b6d75b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11890',
  'x-ms-correlation-request-id',
  '2f787889-cd82-4c9d-9105-9df13f8b1212',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082933Z:2f787889-cd82-4c9d-9105-9df13f8b1212',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8a61ad98-0b62-46e4-ad34-17fa80fc086b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11889',
  'x-ms-correlation-request-id',
  '0a2ec453-7214-410f-bab2-5805962c7180',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082933Z:0a2ec453-7214-410f-bab2-5805962c7180',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1b0be80a-277d-4801-a57c-a08167008ab4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11888',
  'x-ms-correlation-request-id',
  'c5221f75-e711-47b6-96e2-e87d4d494f45',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082933Z:c5221f75-e711-47b6-96e2-e87d4d494f45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:695def34-571f-47b4-be0e-eeb543b71417',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11887',
  'x-ms-correlation-request-id',
  'e77bf82d-a769-4108-a6c7-7d0d92bb6115',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082934Z:e77bf82d-a769-4108-a6c7-7d0d92bb6115',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8142f252-34ad-4591-8e1b-247be4021c06',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11886',
  'x-ms-correlation-request-id',
  'b8c3fae0-9971-46b2-b077-cf8f28864178',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082934Z:b8c3fae0-9971-46b2-b077-cf8f28864178',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a4853298-bb8a-452f-afa3-2d80636e0c95',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11885',
  'x-ms-correlation-request-id',
  '209ae15a-a804-4673-aaaf-b7993885d642',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082934Z:209ae15a-a804-4673-aaaf-b7993885d642',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:d89158a5-78b9-4fc4-9e01-0fa7e1594a1d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11884',
  'x-ms-correlation-request-id',
  '71657826-f3bb-4d78-972c-7e7598ae7112',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082934Z:71657826-f3bb-4d78-972c-7e7598ae7112',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3da7c748-1e22-4344-8e8c-fbb94eb3f3ad',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11883',
  'x-ms-correlation-request-id',
  '5369d931-904c-4127-8b20-69e392a301cb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082935Z:5369d931-904c-4127-8b20-69e392a301cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:93568c0f-d31b-417e-835d-36dd7372ba9a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11882',
  'x-ms-correlation-request-id',
  '93f6015f-37a6-4107-a2ea-78655ca09c3f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082935Z:93f6015f-37a6-4107-a2ea-78655ca09c3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f9e8f24c-1cf9-4222-85d0-f9facf9736c2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11881',
  'x-ms-correlation-request-id',
  '6c02ba5e-ed7a-428f-813e-ffa09c1de2a3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082935Z:6c02ba5e-ed7a-428f-813e-ffa09c1de2a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a735ca68-ac74-44de-9c6d-133575df99b3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11880',
  'x-ms-correlation-request-id',
  '18ca0ae4-4712-4614-bda7-96e5a6fa1f14',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082935Z:18ca0ae4-4712-4614-bda7-96e5a6fa1f14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c3f0cfbb-5d60-47cb-baee-df345b52571f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11879',
  'x-ms-correlation-request-id',
  '6292114a-a3c7-4fb1-b6c7-0806f1d9e2af',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082936Z:6292114a-a3c7-4fb1-b6c7-0806f1d9e2af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8c7af241-dfaa-4a1a-945b-a50a4e74d3aa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11878',
  'x-ms-correlation-request-id',
  'f62b93ee-c6ae-4828-a9a9-e5384adadc67',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082936Z:f62b93ee-c6ae-4828-a9a9-e5384adadc67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4bde1b70-055b-4284-8ce6-2e363ad7e263',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11877',
  'x-ms-correlation-request-id',
  '30397cdc-2317-489f-97ed-5b0cc396b057',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082936Z:30397cdc-2317-489f-97ed-5b0cc396b057',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e1790dba-c54c-4794-8760-ac6b7ffe341e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11876',
  'x-ms-correlation-request-id',
  '98c9fe99-65d0-406d-a3e5-f78516502181',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082936Z:98c9fe99-65d0-406d-a3e5-f78516502181',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:cc0cf864-4ab6-4098-aa17-705013f47bf4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11875',
  'x-ms-correlation-request-id',
  'd55dda8b-b653-4e19-b257-8c374df6a92a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082937Z:d55dda8b-b653-4e19-b257-8c374df6a92a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:7aa12bbe-cf7b-44d1-948a-25082927a53d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11874',
  'x-ms-correlation-request-id',
  'e2038136-489b-436e-b3ec-8014ec28490e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082937Z:e2038136-489b-436e-b3ec-8014ec28490e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:53daf553-4b11-481e-b7e9-06d6fa35675e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11873',
  'x-ms-correlation-request-id',
  'a704e61c-5fb7-4cdb-b68e-2c92d13f1532',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082937Z:a704e61c-5fb7-4cdb-b68e-2c92d13f1532',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:038ef4bc-decd-4b53-890b-56e4971fe446',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11872',
  'x-ms-correlation-request-id',
  '8e217af8-6f1e-432c-bca3-46d21ddb7a31',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082937Z:8e217af8-6f1e-432c-bca3-46d21ddb7a31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:199e73d8-7c61-4aec-83ae-3254e4dd0d41',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11871',
  'x-ms-correlation-request-id',
  '7aeb9d3c-c7ea-43bb-a86e-ae0264ebd0e1',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082938Z:7aeb9d3c-c7ea-43bb-a86e-ae0264ebd0e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:d4c99896-513a-4eab-9423-3d16e78d0419',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11870',
  'x-ms-correlation-request-id',
  'eb6f8a5e-a522-45eb-a780-6bc69e844de0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082938Z:eb6f8a5e-a522-45eb-a780-6bc69e844de0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ea989817-44c0-41e2-b62f-3624cfd8ccf7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11869',
  'x-ms-correlation-request-id',
  'f4cb32c3-ac2c-4eed-9788-7faf9d0a4882',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082938Z:f4cb32c3-ac2c-4eed-9788-7faf9d0a4882',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:26249f61-02df-4d4f-a02a-21a77c65bb57',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11868',
  'x-ms-correlation-request-id',
  'ea4c0bd7-43f2-431c-9bf2-13cbf59e13f2',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082938Z:ea4c0bd7-43f2-431c-9bf2-13cbf59e13f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8db9aeb5-ce84-4546-b47b-4b7082be0551',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11867',
  'x-ms-correlation-request-id',
  'e25079fa-b100-4899-a143-db7248115655',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082939Z:e25079fa-b100-4899-a143-db7248115655',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6cfb9ea2-ee9f-49fc-b432-f054275dc878',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11866',
  'x-ms-correlation-request-id',
  '5e48902d-d6e3-4959-8b3f-1227e6520f70',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082939Z:5e48902d-d6e3-4959-8b3f-1227e6520f70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:826dbe7c-fe2b-46bd-a7df-99ba5cce331b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11865',
  'x-ms-correlation-request-id',
  'e8215663-db23-48ac-a417-7a27452e290e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082939Z:e8215663-db23-48ac-a417-7a27452e290e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3c2f7f99-a4fd-4818-a0f4-dd5d2dfcaffb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11864',
  'x-ms-correlation-request-id',
  'bee08989-21cc-46d7-afaf-408690ae4848',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082939Z:bee08989-21cc-46d7-afaf-408690ae4848',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:764f3386-437a-4ab0-aa07-5bd22af48e1c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11863',
  'x-ms-correlation-request-id',
  '335ca200-59c6-4f42-a9a5-c97d6da034b0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082940Z:335ca200-59c6-4f42-a9a5-c97d6da034b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e6167b12-700b-4e84-8493-0f1bd422d796',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11862',
  'x-ms-correlation-request-id',
  'e9770234-bba8-4361-b1c4-1bc8372a537a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082940Z:e9770234-bba8-4361-b1c4-1bc8372a537a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b685dd0b-c006-4ea3-ba47-f0c973da3588',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11861',
  'x-ms-correlation-request-id',
  '90a0972d-760c-4328-b451-32e185e6ed15',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082940Z:90a0972d-760c-4328-b451-32e185e6ed15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5984f40b-0683-46b5-9af7-d8e46c3f6a8f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11860',
  'x-ms-correlation-request-id',
  'b1220477-82c0-42cf-9ea5-a3d6f8bdfb34',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082940Z:b1220477-82c0-42cf-9ea5-a3d6f8bdfb34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5d15e118-9547-418f-9a69-0ae777bcd2cb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11859',
  'x-ms-correlation-request-id',
  'ee1d57b6-139d-4428-ba2a-642e94f4b476',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082941Z:ee1d57b6-139d-4428-ba2a-642e94f4b476',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fce044b6-a15a-454d-93cf-e2383078251f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11858',
  'x-ms-correlation-request-id',
  '7581b50b-df5f-4329-9934-5ee3ae0e25a7',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082941Z:7581b50b-df5f-4329-9934-5ee3ae0e25a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:aa483020-7d8d-4d31-85cb-56743aada0c3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11857',
  'x-ms-correlation-request-id',
  '267ae1f0-f7a7-4ebf-bbfc-04f73d3bec88',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082941Z:267ae1f0-f7a7-4ebf-bbfc-04f73d3bec88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:792a3aa0-10c7-4ebb-ab8e-6943c5586267',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11856',
  'x-ms-correlation-request-id',
  '8641086f-7f4c-4769-945b-7d246b190756',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082941Z:8641086f-7f4c-4769-945b-7d246b190756',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:62c1e6ca-25a5-4c7e-b55e-4ef0621b4501',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11855',
  'x-ms-correlation-request-id',
  'ad01d31c-0860-40f2-99f5-4d20b1aaead0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082942Z:ad01d31c-0860-40f2-99f5-4d20b1aaead0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ec355e6c-e7c8-4027-8aaf-9a56c6b68073',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11854',
  'x-ms-correlation-request-id',
  'bc950444-f66a-49c2-81fa-6fd0039d4569',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082942Z:bc950444-f66a-49c2-81fa-6fd0039d4569',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b729fdc2-bb80-490d-8aba-a6fe98e986ae',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11853',
  'x-ms-correlation-request-id',
  'f65f6160-49f5-4d71-84ac-9afd02b52f54',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082942Z:f65f6160-49f5-4d71-84ac-9afd02b52f54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2a6ace83-6969-407f-8b07-fae5aa9931ab',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11852',
  'x-ms-correlation-request-id',
  '863c8514-7ffa-4fa6-9964-381230093025',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082942Z:863c8514-7ffa-4fa6-9964-381230093025',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:fceb5b4a-94b9-4937-9675-6c2a27622ab9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11851',
  'x-ms-correlation-request-id',
  '6796af8c-5be3-414f-af15-aa5118c18ab0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082943Z:6796af8c-5be3-414f-af15-aa5118c18ab0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:016bb24e-c344-4f1f-9c4d-e0b44a15dd76',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11850',
  'x-ms-correlation-request-id',
  '2b609cc3-914f-44bd-9b30-1ef64da5e45d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082943Z:2b609cc3-914f-44bd-9b30-1ef64da5e45d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a5cef721-95d6-40b3-8369-df83b21f1c62',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11849',
  'x-ms-correlation-request-id',
  '9c5fc269-b08d-45d4-9a56-2e33391d3185',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082943Z:9c5fc269-b08d-45d4-9a56-2e33391d3185',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b3bbacf1-40b4-49a2-8b4b-1cf0bb98d31f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11848',
  'x-ms-correlation-request-id',
  'a9d04320-d989-439d-b38c-6544330e80ec',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082943Z:a9d04320-d989-439d-b38c-6544330e80ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:240a8d08-bd9b-446d-a899-50363691a3fd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11847',
  'x-ms-correlation-request-id',
  'c14ca68b-04bf-414d-8830-8bf22a49ff23',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082944Z:c14ca68b-04bf-414d-8830-8bf22a49ff23',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e84f62b9-e86d-496f-8dfe-bda9f0bffcd6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11846',
  'x-ms-correlation-request-id',
  '9f0a6f5c-09ce-4f5b-a20b-e6bf852b4afc',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082944Z:9f0a6f5c-09ce-4f5b-a20b-e6bf852b4afc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c5c45893-45d7-4977-8458-ac984e41c1c6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11845',
  'x-ms-correlation-request-id',
  '078efac1-09d9-4867-9ea2-7b0706db0149',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082944Z:078efac1-09d9-4867-9ea2-7b0706db0149',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8551512e-528d-4870-b7da-742520d9a660',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11844',
  'x-ms-correlation-request-id',
  'f49a850f-1198-45e4-8b8e-13a0e14bc807',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082944Z:f49a850f-1198-45e4-8b8e-13a0e14bc807',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:06480ad6-493c-4a40-8465-de1b1cd9a85b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11843',
  'x-ms-correlation-request-id',
  '19a0105f-03c9-4b80-bd8f-855d7dce8e17',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082945Z:19a0105f-03c9-4b80-bd8f-855d7dce8e17',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a453933f-8338-4a14-bd57-821daf47f8f0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11842',
  'x-ms-correlation-request-id',
  '2e13714c-8d3d-4b53-8cae-d5cea4f9a1a6',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082945Z:2e13714c-8d3d-4b53-8cae-d5cea4f9a1a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:496a40ab-b6b1-495f-a5ca-eb69201266cd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11841',
  'x-ms-correlation-request-id',
  'b5cd765f-275d-4b2f-a5b0-cae6b78bc2e5',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082945Z:b5cd765f-275d-4b2f-a5b0-cae6b78bc2e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:67bde021-23dd-42e2-b3ec-507b7022f14d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11840',
  'x-ms-correlation-request-id',
  'd8f45836-5fab-44f7-bdff-0703170db7c3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082945Z:d8f45836-5fab-44f7-bdff-0703170db7c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:3048eccb-ac5d-425e-8955-eb3c5e4e8b2f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11839',
  'x-ms-correlation-request-id',
  '0c73543c-de8f-4ad6-a6ee-cd309d9fb719',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082946Z:0c73543c-de8f-4ad6-a6ee-cd309d9fb719',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4215c634-a54a-4bf3-97d9-d8c3822497bf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11838',
  'x-ms-correlation-request-id',
  'b4ca3a49-f189-44af-be75-a8546fc5e169',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082946Z:b4ca3a49-f189-44af-be75-a8546fc5e169',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:012b061a-a38e-4c87-b608-a873ba156bdd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11837',
  'x-ms-correlation-request-id',
  '9cd1fbc7-ba6f-4029-985b-c70c7ae0ffe4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082946Z:9cd1fbc7-ba6f-4029-985b-c70c7ae0ffe4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a68501d3-7347-4c8a-a1bb-885c7262e780',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11836',
  'x-ms-correlation-request-id',
  '3e09c047-574d-47b5-ac72-98c005b15df4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082946Z:3e09c047-574d-47b5-ac72-98c005b15df4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:78099d29-8242-4264-b9ac-d98c66496e50',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11835',
  'x-ms-correlation-request-id',
  'ffea8c04-1a7b-44a1-b7f2-cb1de547e508',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082947Z:ffea8c04-1a7b-44a1-b7f2-cb1de547e508',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:874c9a51-3852-488c-af83-2a3fd857b96f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11834',
  'x-ms-correlation-request-id',
  '5ebde285-3c07-47ca-a265-2da988dbf30f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082947Z:5ebde285-3c07-47ca-a265-2da988dbf30f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:c5415846-b593-4df8-9514-821a3a4fc4ea',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11833',
  'x-ms-correlation-request-id',
  '671d0e35-8aee-41a1-b433-f02a721e1607',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082947Z:671d0e35-8aee-41a1-b433-f02a721e1607',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f0ead924-6fb1-4c7a-8c01-223ecdb1014a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11832',
  'x-ms-correlation-request-id',
  '445da0d1-7418-478c-a9bc-0689164756b9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082947Z:445da0d1-7418-478c-a9bc-0689164756b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:31e75619-ff04-47bf-b27d-54113a2c3d95',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11831',
  'x-ms-correlation-request-id',
  '8676f94a-3a36-4447-8364-9facb558c865',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082948Z:8676f94a-3a36-4447-8364-9facb558c865',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f1de75ed-7455-49b9-9292-cac0ff265edd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11830',
  'x-ms-correlation-request-id',
  'd5892940-c2b5-42de-a697-dd1a0fdf07ed',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082948Z:d5892940-c2b5-42de-a697-dd1a0fdf07ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8d355d14-3682-4736-85d7-ac56672ad0c0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11829',
  'x-ms-correlation-request-id',
  'c4534116-6500-4e07-8504-078017a616e6',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082948Z:c4534116-6500-4e07-8504-078017a616e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:abd95c51-cca3-43e8-8d9c-a28653ccb817',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11828',
  'x-ms-correlation-request-id',
  '7d50e8b0-2b24-4342-be36-2c041903ff65',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082948Z:7d50e8b0-2b24-4342-be36-2c041903ff65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:075d135e-c386-4fde-abea-5a5d8a08a188',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11827',
  'x-ms-correlation-request-id',
  '5c7598b2-d497-46c1-b734-b0fcb38c937f',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082949Z:5c7598b2-d497-46c1-b734-b0fcb38c937f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:768495fe-40dc-4fba-8472-5e99ed5df1ce',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11826',
  'x-ms-correlation-request-id',
  '80a598cd-13bf-4847-bbd5-2bb3d7665844',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082949Z:80a598cd-13bf-4847-bbd5-2bb3d7665844',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:acd76e97-0014-4d84-877c-e1fd2a6bed76',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11825',
  'x-ms-correlation-request-id',
  '59add141-1dca-49fb-8bd7-d9109fc8ca4b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082949Z:59add141-1dca-49fb-8bd7-d9109fc8ca4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5771686b-b169-4b42-aeb8-531a00986ccd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11824',
  'x-ms-correlation-request-id',
  '5beb69f7-d585-4340-8622-e0e359d3aebe',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082949Z:5beb69f7-d585-4340-8622-e0e359d3aebe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:573f73db-d28c-44cb-99f6-a68cfe9a9a23',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11823',
  'x-ms-correlation-request-id',
  '400f6eab-064a-4458-81f3-99558452eb42',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082950Z:400f6eab-064a-4458-81f3-99558452eb42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:9444ae23-d421-4de6-aaa4-77981e8183f6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11822',
  'x-ms-correlation-request-id',
  '887a6a86-9282-43ec-9814-39dc2c3a6db0',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082950Z:887a6a86-9282-43ec-9814-39dc2c3a6db0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f53e408f-0e4b-4dfa-b8b8-45437500ece9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11821',
  'x-ms-correlation-request-id',
  'd82de9f7-45f7-44f2-89c8-078cea438a25',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082950Z:d82de9f7-45f7-44f2-89c8-078cea438a25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:863097e2-8962-4d8e-b811-aa17ed9c79a0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11820',
  'x-ms-correlation-request-id',
  '158d926e-95ee-435e-b751-2289c9a10791',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082950Z:158d926e-95ee-435e-b751-2289c9a10791',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:8e580429-bbee-49e5-8e00-cca6804028fa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11819',
  'x-ms-correlation-request-id',
  'cf149782-c245-479c-8429-79bab120753d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082951Z:cf149782-c245-479c-8429-79bab120753d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:efb58269-cf35-43d5-ac67-74a3199a6304',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11818',
  'x-ms-correlation-request-id',
  '94bbe7bd-5375-4c9a-96da-233e17e4c9f9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082951Z:94bbe7bd-5375-4c9a-96da-233e17e4c9f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:00717ab6-552b-4c30-a72b-43569c4eaa45',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11817',
  'x-ms-correlation-request-id',
  'efa69f67-ef82-40a6-a018-cd54192b0023',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082951Z:efa69f67-ef82-40a6-a018-cd54192b0023',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:b6f90367-1c46-43c3-a2c9-16cfec7df783',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11816',
  'x-ms-correlation-request-id',
  '0516e79e-036b-4f8e-a1ec-f403a5744042',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082951Z:0516e79e-036b-4f8e-a1ec-f403a5744042',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5eb8d7db-00e2-4b02-8fcc-37624b5d6b3f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11815',
  'x-ms-correlation-request-id',
  'fb3a2253-abb6-4891-9ced-bd367028a879',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082952Z:fb3a2253-abb6-4891-9ced-bd367028a879',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:71cd5aff-e554-40d3-807e-2bc5d4a6e321',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11814',
  'x-ms-correlation-request-id',
  '6c6074cf-6cd2-4ea3-b6f8-a743612151ec',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082952Z:6c6074cf-6cd2-4ea3-b6f8-a743612151ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ff9cda99-e018-40bd-a0a2-3ff283a1f800',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11813',
  'x-ms-correlation-request-id',
  'c0a4cb14-45ea-4b37-9433-73dabb80b037',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082952Z:c0a4cb14-45ea-4b37-9433-73dabb80b037',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:42b34bb8-d95f-416b-aaaa-eade3bb3265f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11812',
  'x-ms-correlation-request-id',
  'b095dd4a-c2f3-44ee-b20f-456db0d58026',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082952Z:b095dd4a-c2f3-44ee-b20f-456db0d58026',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:28c972ae-547d-47c2-b7a7-8481c088c02b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11811',
  'x-ms-correlation-request-id',
  'b9532df8-668e-461e-a40d-e60fa54a4f0c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082953Z:b9532df8-668e-461e-a40d-e60fa54a4f0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:f5854b98-39a9-4a2f-96b6-c9a295b403ac',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11810',
  'x-ms-correlation-request-id',
  '0c0c2365-5459-44ab-8bfa-71a9b692f9c9',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082953Z:0c0c2365-5459-44ab-8bfa-71a9b692f9c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:642c2bf6-d043-4c33-acad-b271e2dd6753',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11809',
  'x-ms-correlation-request-id',
  '350b0d5b-4476-40b2-ae9f-6a891c852e38',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082953Z:350b0d5b-4476-40b2-ae9f-6a891c852e38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ce77dba1-93e3-42ec-99c1-8538730cbc9e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11808',
  'x-ms-correlation-request-id',
  '3f8288d5-94ba-4562-b89f-72a8af29873d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082953Z:3f8288d5-94ba-4562-b89f-72a8af29873d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:adacd578-61c9-4034-b2c0-9880053cc98b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11807',
  'x-ms-correlation-request-id',
  '37716c24-700b-4b0e-b56d-dc80ed7761eb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082954Z:37716c24-700b-4b0e-b56d-dc80ed7761eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e66e5c27-202b-46c6-a9c6-014bc5877a21',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11806',
  'x-ms-correlation-request-id',
  'e6ce1796-82db-4a0b-b403-8549946535e3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082954Z:e6ce1796-82db-4a0b-b403-8549946535e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6d27bc88-fdee-465b-b726-198745485a10',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11805',
  'x-ms-correlation-request-id',
  'e6659b92-18ae-41a2-af6a-facd4c77748e',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082954Z:e6659b92-18ae-41a2-af6a-facd4c77748e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:6b77916b-db0f-4135-b90e-75c43e965360',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11804',
  'x-ms-correlation-request-id',
  '42a74823-7be0-42ec-a1cb-503dd0f2718a',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082954Z:42a74823-7be0-42ec-a1cb-503dd0f2718a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:24fbbd39-eff6-403f-86f3-f9a2236ef0af',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11803',
  'x-ms-correlation-request-id',
  'de8a3337-c501-4e77-8573-ebcf4bfecb29',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082955Z:de8a3337-c501-4e77-8573-ebcf4bfecb29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:239002e1-ef05-4809-a419-99f11277d251',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11802',
  'x-ms-correlation-request-id',
  '90fee7d6-354e-46bb-9855-b8275cb96590',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082955Z:90fee7d6-354e-46bb-9855-b8275cb96590',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:5d92afc4-b06e-422c-9223-d1aedf0977fa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11801',
  'x-ms-correlation-request-id',
  '9a717f0f-6366-4fd6-9563-a7ef9fdcd1a4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082955Z:9a717f0f-6366-4fd6-9563-a7ef9fdcd1a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:ee8c9410-bc73-400c-8bc2-17406d29a10d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11800',
  'x-ms-correlation-request-id',
  '162eec16-56c3-49ee-a1ce-9f78aa67a31d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082955Z:162eec16-56c3-49ee-a1ce-9f78aa67a31d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:11161667-6cdc-40ea-924e-4baafef02ed5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11799',
  'x-ms-correlation-request-id',
  '6a17520b-a213-40b9-8d37-95e565f030e8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082956Z:6a17520b-a213-40b9-8d37-95e565f030e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:98a0c871-ffb6-446e-b363-95e0604cd61b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11798',
  'x-ms-correlation-request-id',
  '05a9e642-98ec-42c0-8625-561f224b9279',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082956Z:05a9e642-98ec-42c0-8625-561f224b9279',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a71510ba-8364-4716-9615-9813dd7e7794',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11797',
  'x-ms-correlation-request-id',
  'fcd20039-26f3-47b9-b882-857c95525c12',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082956Z:fcd20039-26f3-47b9-b882-857c95525c12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:71dcb33e-97ab-4c57-bf2c-3644caa6fc70',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11796',
  'x-ms-correlation-request-id',
  'b1f0e553-df0e-401d-823f-c65815b79bfb',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082956Z:b1f0e553-df0e-401d-823f-c65815b79bfb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:a6226a04-cb91-4fc2-9086-1ea895fc4913',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11795',
  'x-ms-correlation-request-id',
  'ffd76765-d140-40c4-957c-e3f331c42d2c',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082957Z:ffd76765-d140-40c4-957c-e3f331c42d2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:66a6ab96-de57-40c6-b723-2daaa3e9c9dd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11794',
  'x-ms-correlation-request-id',
  '42bfbeb0-6184-42e9-9f31-bbe2d43ecbc5',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082957Z:42bfbeb0-6184-42e9-9f31-bbe2d43ecbc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:07f02bb4-804a-48f6-b87c-d4cb5bbc2975',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11793',
  'x-ms-correlation-request-id',
  '480305e7-ce86-49e7-9640-b6e6ad7a7786',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082957Z:480305e7-ce86-49e7-9640-b6e6ad7a7786',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:2d68110f-dddc-41d8-b6c8-8f2cd83cd764',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11792',
  'x-ms-correlation-request-id',
  '2c182fd8-7664-4fe5-8826-4346143af394',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082957Z:2c182fd8-7664-4fe5-8826-4346143af394',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:1ff1c882-85b3-4228-995f-5621f85942c6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11791',
  'x-ms-correlation-request-id',
  'dbbb97ea-4688-4594-81f9-17917ef42a9b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082958Z:dbbb97ea-4688-4594-81f9-17917ef42a9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e4929b94-ef88-4525-8aaa-af256c8027c3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11790',
  'x-ms-correlation-request-id',
  'fecb6c8e-7e94-421f-a067-c3e37d84d2ec',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082958Z:fecb6c8e-7e94-421f-a067-c3e37d84d2ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:11bdca76-083f-4e5e-a5cf-8025d3a127d0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11789',
  'x-ms-correlation-request-id',
  'f2ba995d-a18c-4ba9-9e96-8cbe6e0e10c1',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082958Z:f2ba995d-a18c-4ba9-9e96-8cbe6e0e10c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:e7bf0d4f-cdeb-4eec-8e50-84513320e481',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11788',
  'x-ms-correlation-request-id',
  'f26f2d7b-a219-49a6-aa52-a12e0d351ea5',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082958Z:f26f2d7b-a219-49a6-aa52-a12e0d351ea5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'westus:4b24d04b-db78-4bac-a5fc-90587d7ce153',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11787',
  'x-ms-correlation-request-id',
  '9e6e6681-bf4f-4706-8b08-562561a0fe3d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082959Z:9e6e6681-bf4f-4706-8b08-562561a0fe3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
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
  'westus:19d15a05-575f-40cd-85d4-26f074c64d0d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11786',
  'x-ms-correlation-request-id',
  '56feea57-c408-4171-9bd7-73fb6ee8de4d',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082959Z:56feea57-c408-4171-9bd7-73fb6ee8de4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/workspaces/myworkspacexx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478f7ef1478b6c995de4b3577953adeb69fe795dad5767b38f1e7d74b7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7f6a1347717d73fddb479d3ee7d34fa6895d5d9226ff39a7bcd97d9a4cc9f51bfd96275026cce8b69869ef06d7bbdca0983275555d29b9759b9a63fcfb3b2c97fc9485f7d51bd5c4fca627ab6baf18565d67e9eb5f95576fd225bd0e7b6f9ebb62e9617ee05b4dcbe90a61fd18bab3a27acf3d3e5b4be662a78efc6bb5a294eb7eae86a5b9a6f172bf456e7a560d8acb2698e5f3641984db87d4624beba9f5f4ef3ea6a4fa0fca27551e767cbf33a6bda7a3d6dd7ef350233836fb20b9e286dfce5e4a7f369eb9affe28fb2d58a70d729fb6896b5d9a42ea66f1b6ae3fed8ce9797455d2d17f9b2a556844ffed12fa15e9ab6aa89eb8ea7d36abd6c6f1eabb6ef8d563f5738afdfae6f02f5bacd96b3ac9efdfe9fbf7a0d0097cbbc3d9ecd68d4cdcb3a3f2fde6d7a797767bc7bef210f8064e8b26868ecd48260b6f8faf57a3acdf3593ea357b2753bafeae2074c1f22e4f72076c5725aacb292a5eb61f6603f3bfff47c7bb67bffdef6febdfd83ed870707d976bef7e983bd877b3b933c7f4870eaaacc9f125ecb0280f8cd83fc1ebd78ffc17676707ebebdbf7f6fba9d3db83fddde3bcf0fa6fb93e9e4d37bf73ffa25df1f7d34ad73426cf6e41a63aa0abcbb7f9e7ffa70efe0c1f6f9cebd3dea756f6f3bbbbffbe9f6c1fec124fb34cb1f105cead59b5bee32dfc948c0ef91c47fba3bddde9fedee6d1f9c7f3add264df0e0fececeeef4fe340335d72b9afa1f6a8f5755fd96e585dfba778ff4d283fbf70feeed7dbaf77017806d83afea925a10d4ed6eab31fd2ffb01890921af7c3b26b6a09795824fe99f370518eba3bd9dbddd6d4266f7c19b9d83477b0f1eed3f18dfdbbfb7fbf0e0d39f023e3ce6bbcdfa9bd29c7799d166a435ef7e514cebaaa9cedb31e1a378deb5c3c32bf68f77ef08f965c618773f56e6be011a356cdeae318d0a86989c0507832c2b9929faf88a705c371ffd","92ff071029c5e256060000"], [
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
  'westus:8a331b81-8561-4027-8ef1-5d384b173542',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '1799',
  'x-ms-correlation-request-id',
  '77e84ecd-6e41-414c-a5dc-f7869342599b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T082959Z:77e84ecd-6e41-414c-a5dc-f7869342599b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:29:58 GMT'
]);
