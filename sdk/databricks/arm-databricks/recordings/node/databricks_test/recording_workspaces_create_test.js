let nock = require('nock');

module.exports.hash = "3fe90fd4a3ac0efd8e72b9107429758e";

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
  '63473ea3-57a1-4d77-a964-768b8a190500',
  'x-ms-ests-server',
  '2.1.12171.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AqysGwu11l1LiRFPYXZgL14; expires=Sun, 28-Nov-2021 07:20:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkmVwsd8_XLj9jhc1p5nJPeYxO1arKfo2q0h5rD3_b5rRUEkQKVIe-V9m4WtBiMQZrciut9Hmd_LA1oNOlAESqqhiKSIwxA_7ybgGb_JxJLvo2wvS_akwmr998JH9tZpLbsL4ZJHOEi6tX1uXz8guRsNHeKRjIJqJpk02Y4_MM-kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 07:20:19 GMT',
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
  'da72c021-5610-4913-b51e-bdcfadc70300',
  'x-ms-ests-server',
  '2.1.12171.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqMSWN-6kqtKrBZdWIWbNDY; expires=Sun, 28-Nov-2021 07:20:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsN8YHcoqH616B1yueNBhBAZ_ZS5PnAoaAXFaWGFQiBGPr3hy6qlcQA4M_ZY8vGwXhA_okl63Dz5o_dQ5PLdsdDn8CTIeg2Vug0S6pz9BMNguku2m3QYsNOBJ8olUVvjap30yceZ9SK9asOiM6KsCb0ctXa5A0rriG1jg_VYGo64gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 07:20:19 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b344efc6-0cdd-48a2-8ead-8098f12a720b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '63473ea3-57a1-4d77-a964-768b8d190500',
  'x-ms-ests-server',
  '2.1.12171.15 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhFlM5hxPRpOlNUxTiJDIIMWPr5BAQAAALSXDdkOAAAA; expires=Sun, 28-Nov-2021 07:20:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 07:20:20 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/workspaces/myworkspacexx', {"location":"westus","sku":{"name":"Standard"},"properties":{"managedResourceGroupId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest2"}})
  .query(true)
  .reply(201, {"properties":{"managedResourceGroupId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest2","provisioningState":"Accepted","authorizations":[{"principalId":"9a74af6f-d153-4348-988a-e2672920bee9","roleDefinitionId":"8e3af657-a8ff-443c-a75c-2fe8c4bcb635"}],"createdBy":{"oid":"f76f8265-6a7e-4a2f-91d8-502be6f04df4","applicationId":"azure_client_id"},"updatedBy":{"oid":"f76f8265-6a7e-4a2f-91d8-502be6f04df4","applicationId":"azure_client_id"},"createdDateTime":"2021-10-29T07:20:26.6917451Z"},"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/workspaces/myworkspacexx","name":"myworkspacexx","type":"Microsoft.Databricks/workspaces","sku":{"name":"Standard"},"location":"westus"}, [
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
  '15',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'x-ms-request-id',
  'westus:080636c7-db84-411d-857c-2f2f25e23c34',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  '73e43886-a401-416c-b21a-c90fa6f462b7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072028Z:73e43886-a401-416c-b21a-c90fa6f462b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8ed770b6-1500-4a1a-964e-7587e6cff2b1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11982',
  'x-ms-correlation-request-id',
  '7777d42d-03f3-45f1-84a4-ee511aff1db6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072028Z:7777d42d-03f3-45f1-84a4-ee511aff1db6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f349580a-c49e-4983-8a80-c657b2e3fcb0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11981',
  'x-ms-correlation-request-id',
  '21271701-88f3-414a-a433-a8d62445927d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072028Z:21271701-88f3-414a-a433-a8d62445927d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6ef95322-1b6d-485b-9e88-3a92ffc53cf5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11980',
  'x-ms-correlation-request-id',
  '14208f73-5d09-4482-b104-982c4706d8ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072029Z:14208f73-5d09-4482-b104-982c4706d8ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c63fa291-4d76-4bf4-a80c-b5d6bd2bc655',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11979',
  'x-ms-correlation-request-id',
  'a8e06a91-f04b-41c6-83b2-2a03178d390e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072029Z:a8e06a91-f04b-41c6-83b2-2a03178d390e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3e31d0bd-a338-4d2b-a6a8-8ee8d0f9ff5e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11978',
  'x-ms-correlation-request-id',
  '45558c74-f17b-4a46-8df9-a4b26521c9d4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072029Z:45558c74-f17b-4a46-8df9-a4b26521c9d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3dfa9cda-a3dd-479a-b108-b439733aafe3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11977',
  'x-ms-correlation-request-id',
  'fe66b792-5712-49b5-a454-d8293de6d665',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072030Z:fe66b792-5712-49b5-a454-d8293de6d665',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8012c013-5a58-4b61-843e-7fd3ed6e4c54',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11976',
  'x-ms-correlation-request-id',
  '4301f1bb-b2e9-4b28-b185-94d82095d2a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072030Z:4301f1bb-b2e9-4b28-b185-94d82095d2a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a083d2f9-7616-47f1-8370-69cb8b622dd1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11975',
  'x-ms-correlation-request-id',
  'a20f4ceb-bc3c-4810-a3bf-0b2ddd673cc6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072030Z:a20f4ceb-bc3c-4810-a3bf-0b2ddd673cc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7d9d1797-d8fe-4351-a593-467c4ba3a4e0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11974',
  'x-ms-correlation-request-id',
  'db13df83-53fb-4ccf-930d-b75cd4860a8f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072031Z:db13df83-53fb-4ccf-930d-b75cd4860a8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b7554388-ff35-440a-83a9-fdee87988d94',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11973',
  'x-ms-correlation-request-id',
  '296dbcd9-79b6-4ce7-86cb-245f3876b274',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072031Z:296dbcd9-79b6-4ce7-86cb-245f3876b274',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2f44517e-2dd9-468e-bf04-197ebe399dc7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11972',
  'x-ms-correlation-request-id',
  '0870b427-181b-44a7-b64b-fa60bcc1966d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072031Z:0870b427-181b-44a7-b64b-fa60bcc1966d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:38a06a5a-0168-458d-8158-a16765926509',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11971',
  'x-ms-correlation-request-id',
  '7c4c9edf-9e4a-459a-bf19-0cba76491bf2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072031Z:7c4c9edf-9e4a-459a-bf19-0cba76491bf2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c3a21dbd-3583-4087-bcad-ca504186ccd6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11970',
  'x-ms-correlation-request-id',
  '957c919e-ad33-46c6-9a86-ffaf09f9c640',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072032Z:957c919e-ad33-46c6-9a86-ffaf09f9c640',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0555536b-392f-4e8b-b525-0e8e3ebcf12e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11969',
  'x-ms-correlation-request-id',
  '77af0e9e-5b6b-49e7-915d-577838440a43',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072032Z:77af0e9e-5b6b-49e7-915d-577838440a43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a5512ee4-76b6-401c-8e38-ee71a8ac68ee',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11968',
  'x-ms-correlation-request-id',
  'c03f8956-a09a-458e-9dae-a38b3cd2c7d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072032Z:c03f8956-a09a-458e-9dae-a38b3cd2c7d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:08c1ca41-a4c5-43c7-b5ea-30d02a0ef4d5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11967',
  'x-ms-correlation-request-id',
  'e1d03912-6146-478f-ab80-7c6423dfcae3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072033Z:e1d03912-6146-478f-ab80-7c6423dfcae3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7f8f71be-f313-4fca-ab70-2c03c65cacbb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11966',
  'x-ms-correlation-request-id',
  'a599a7f7-1f0c-4cce-9f13-9c2f40e93432',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072033Z:a599a7f7-1f0c-4cce-9f13-9c2f40e93432',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4da38181-a3f9-4324-ba79-fd1c19147601',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11965',
  'x-ms-correlation-request-id',
  '7cb224e2-4cea-4ca8-a6c3-ea7b6ca19356',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072033Z:7cb224e2-4cea-4ca8-a6c3-ea7b6ca19356',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a7604473-fd86-446c-9a48-e56bcdf485b4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11964',
  'x-ms-correlation-request-id',
  'ae7cd29a-2735-4251-9d8f-0f43acf1b0bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072034Z:ae7cd29a-2735-4251-9d8f-0f43acf1b0bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:36c93e55-6e8d-44ce-82d0-2e4c4c5e3061',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11963',
  'x-ms-correlation-request-id',
  'd3c4e8ec-1832-420a-9c46-f1140903cb2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072034Z:d3c4e8ec-1832-420a-9c46-f1140903cb2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:09be64f1-d8ae-49de-8c12-6fbd91df5772',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11962',
  'x-ms-correlation-request-id',
  'eea3f5bd-eda9-4fa0-a2db-baf2c4f317b9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072034Z:eea3f5bd-eda9-4fa0-a2db-baf2c4f317b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:eeecd08e-7e85-4360-8d88-7fcd7a747859',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11961',
  'x-ms-correlation-request-id',
  'c249b6c3-e1b0-454a-8dfe-5d41f393f313',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072035Z:c249b6c3-e1b0-454a-8dfe-5d41f393f313',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ad5ae4f8-2caf-4de7-91db-bb54260f572b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11960',
  'x-ms-correlation-request-id',
  'f87e3242-73a1-4bcf-8139-3026e8a18b50',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072035Z:f87e3242-73a1-4bcf-8139-3026e8a18b50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e446341e-e665-4f78-b6de-87d2a92b0f42',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11959',
  'x-ms-correlation-request-id',
  'b0aecc6a-257e-492f-b2a5-6e1524f3c1cc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072035Z:b0aecc6a-257e-492f-b2a5-6e1524f3c1cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:66883959-949d-4159-87af-fe13c6d9ec8c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11958',
  'x-ms-correlation-request-id',
  '8f997375-bdec-43ea-81d5-23e37ca44450',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072036Z:8f997375-bdec-43ea-81d5-23e37ca44450',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:51b79973-4fa9-4a15-95ef-1bc0bc6fcca3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11957',
  'x-ms-correlation-request-id',
  '48994dc2-d92a-4fc8-bb4b-89a2c3916b72',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072036Z:48994dc2-d92a-4fc8-bb4b-89a2c3916b72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:292afbea-475a-4ee1-8be4-6439b8a6b089',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11956',
  'x-ms-correlation-request-id',
  '2fd01474-90c3-4fd5-a7c0-202c699268d5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072036Z:2fd01474-90c3-4fd5-a7c0-202c699268d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:81b86768-8256-4d5d-9bfb-78b3f2f8516c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11955',
  'x-ms-correlation-request-id',
  'f1c9352d-8347-4e10-981b-8aa656ba656f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072036Z:f1c9352d-8347-4e10-981b-8aa656ba656f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b1d69471-e113-4725-9626-45e2a3c4dabd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11954',
  'x-ms-correlation-request-id',
  'ac12dccc-410a-4eb3-bd3c-464c0c79ace6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072037Z:ac12dccc-410a-4eb3-bd3c-464c0c79ace6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e20deed0-684d-40db-a3a4-4e1237fb03af',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11953',
  'x-ms-correlation-request-id',
  '57328e5c-b02d-4fd3-8d68-39562510e188',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072037Z:57328e5c-b02d-4fd3-8d68-39562510e188',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ef358a8d-5b80-45a4-9b08-2cf7687d66a3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11952',
  'x-ms-correlation-request-id',
  '9ec7dbc8-4b5d-45ff-b9e8-abe74fcefbab',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072037Z:9ec7dbc8-4b5d-45ff-b9e8-abe74fcefbab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:78544263-6a23-4563-b8f7-c1ae1bd36200',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11951',
  'x-ms-correlation-request-id',
  '7de52175-5bc6-4502-9688-23dcccba9ef3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072038Z:7de52175-5bc6-4502-9688-23dcccba9ef3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:41663f54-0a19-4c30-889c-3e1e8fc375ab',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11950',
  'x-ms-correlation-request-id',
  'a7332f45-ac2a-43ce-9c62-cf21b57649d8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072038Z:a7332f45-ac2a-43ce-9c62-cf21b57649d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3d8aa86d-33ef-4413-8b1c-1ee2efb1405e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11949',
  'x-ms-correlation-request-id',
  'e0c259f4-3081-4936-96f8-e99b792f4350',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072038Z:e0c259f4-3081-4936-96f8-e99b792f4350',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6637ba90-3a72-4204-9a88-74965cc0743a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11948',
  'x-ms-correlation-request-id',
  '6664bfd9-1b13-466f-9e24-ce8c8b556470',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072039Z:6664bfd9-1b13-466f-9e24-ce8c8b556470',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3a69d7f5-9da5-4bb0-8810-8ee4d667d22c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11947',
  'x-ms-correlation-request-id',
  'c9cd742d-4936-4fab-a90f-d2e284a5420c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072039Z:c9cd742d-4936-4fab-a90f-d2e284a5420c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bf2038c6-e2a3-4555-8a55-3e6ddb7127b3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11946',
  'x-ms-correlation-request-id',
  '877cc1cd-92ec-4546-ad42-cbd5e314b36a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072039Z:877cc1cd-92ec-4546-ad42-cbd5e314b36a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4399d24f-a0b3-4770-9b42-f9c277f2d081',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11945',
  'x-ms-correlation-request-id',
  '9a43f333-bf3d-4b36-8fc3-a6737a932045',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072039Z:9a43f333-bf3d-4b36-8fc3-a6737a932045',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:374bf854-7553-4fbb-8195-007d1f503067',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11944',
  'x-ms-correlation-request-id',
  '9c5fe8de-5e09-41a5-b3e6-54eebd5cf8c8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072040Z:9c5fe8de-5e09-41a5-b3e6-54eebd5cf8c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b5c787fa-0a8d-4438-a768-447427a2fb71',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11943',
  'x-ms-correlation-request-id',
  'a7d29d86-b079-4780-a76f-dabf5ec617b7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072040Z:a7d29d86-b079-4780-a76f-dabf5ec617b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:acaf6bd4-1a5a-498b-b35c-bdd03c825945',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11942',
  'x-ms-correlation-request-id',
  '05e68250-263e-45b9-b4b0-245d77c5e7fd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072040Z:05e68250-263e-45b9-b4b0-245d77c5e7fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f2b8ff69-570b-4aee-b2dd-47a72813a0cc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11941',
  'x-ms-correlation-request-id',
  'ae62c845-c8f2-4b48-abf5-9dd684602da4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072041Z:ae62c845-c8f2-4b48-abf5-9dd684602da4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2bcf434f-19dc-43f7-84fe-b8f3074980bf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11940',
  'x-ms-correlation-request-id',
  'c6cec03f-675d-4a8b-adf4-0beee9c91c7c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072041Z:c6cec03f-675d-4a8b-adf4-0beee9c91c7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d6a94ace-357e-4600-8c01-dfc6ea2dd7b6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11939',
  'x-ms-correlation-request-id',
  'b702d2ec-ef27-4f8a-8513-fc8debb26559',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072041Z:b702d2ec-ef27-4f8a-8513-fc8debb26559',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ec89fbee-c622-4dab-9bc6-32aad4c6fffa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11938',
  'x-ms-correlation-request-id',
  'c32ae995-000c-4d94-b306-3f87f2cb0197',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072042Z:c32ae995-000c-4d94-b306-3f87f2cb0197',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:febf4e80-54ec-42cb-a161-a32642b7fdb9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11937',
  'x-ms-correlation-request-id',
  'dd3bdde2-c677-45a2-ae93-e2cb8b6698f0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072042Z:dd3bdde2-c677-45a2-ae93-e2cb8b6698f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:642e4802-f1af-4d01-bb41-6b9e330bd3fb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11936',
  'x-ms-correlation-request-id',
  '4a8a7703-e785-4b4d-8fa5-0d9ff9b7443c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072042Z:4a8a7703-e785-4b4d-8fa5-0d9ff9b7443c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f6f53174-2536-4693-b615-f0703f5bcd69',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11935',
  'x-ms-correlation-request-id',
  '5d6535de-63ea-4e6c-bb54-28debcb3f397',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072043Z:5d6535de-63ea-4e6c-bb54-28debcb3f397',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:679fa807-2946-4da9-acd8-c88eff6af331',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11934',
  'x-ms-correlation-request-id',
  '627cde90-f00a-4b9b-b6f0-70fafd85a457',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072043Z:627cde90-f00a-4b9b-b6f0-70fafd85a457',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:be25cc64-c591-4a9b-baed-e38cb8d35459',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11933',
  'x-ms-correlation-request-id',
  'a04eec4b-5845-44a1-bcac-10a2fd7d21e4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072043Z:a04eec4b-5845-44a1-bcac-10a2fd7d21e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2e841805-8379-4a62-bf01-065546b106fe',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-correlation-request-id',
  '030f9729-30c5-41cf-be91-d4c6bac60297',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072043Z:030f9729-30c5-41cf-be91-d4c6bac60297',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:97155be7-bfcc-4df4-8d37-911497b4e5e8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11931',
  'x-ms-correlation-request-id',
  '13ad083b-5d4c-41d7-9156-79eede2ab941',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072044Z:13ad083b-5d4c-41d7-9156-79eede2ab941',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:235a0ba3-c745-4450-8519-ce6e06be4782',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-correlation-request-id',
  '95466b4a-7303-4fe9-b44b-54b6d6dea00d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072044Z:95466b4a-7303-4fe9-b44b-54b6d6dea00d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:58b65501-a11e-4e8a-a8af-5854c24d8e85',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11929',
  'x-ms-correlation-request-id',
  'f2afc51c-8b9e-4951-bb96-d6694ccaa000',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072044Z:f2afc51c-8b9e-4951-bb96-d6694ccaa000',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9f492c11-61f5-4229-b1ce-3a1b94af4c29',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11928',
  'x-ms-correlation-request-id',
  'aad3e198-0d1b-44cb-b818-993e0bbef81b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072045Z:aad3e198-0d1b-44cb-b818-993e0bbef81b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0726b7ec-b8b6-475e-99d1-16aefbf74ef6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11927',
  'x-ms-correlation-request-id',
  '854b8baf-bc44-477e-bfc7-dc453bd3e346',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072045Z:854b8baf-bc44-477e-bfc7-dc453bd3e346',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:33b2cb69-76e1-403f-acc6-5532c0e8f795',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11926',
  'x-ms-correlation-request-id',
  '177bd1a0-ee33-4cfa-bde0-e763c01fe6da',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072045Z:177bd1a0-ee33-4cfa-bde0-e763c01fe6da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:59d204e4-7797-46f0-b15c-314ffde90955',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11925',
  'x-ms-correlation-request-id',
  '15e04599-cae3-42be-b2f5-687164483600',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072045Z:15e04599-cae3-42be-b2f5-687164483600',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bb30a8c4-7308-496f-b40f-91bf93eff0f7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11924',
  'x-ms-correlation-request-id',
  '9a83daab-a718-432c-814e-13329df20084',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072046Z:9a83daab-a718-432c-814e-13329df20084',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a092c942-0c8e-473b-b08d-c52052f56112',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11923',
  'x-ms-correlation-request-id',
  '040646e1-bb76-4ec9-a17d-0eebbc22b95f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072046Z:040646e1-bb76-4ec9-a17d-0eebbc22b95f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7fac994a-ac49-43dd-8e54-a93d1358ffe9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11922',
  'x-ms-correlation-request-id',
  '9541428c-58cd-4ae4-ab67-09c6d6257176',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072046Z:9541428c-58cd-4ae4-ab67-09c6d6257176',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d6e28ff6-0470-4a68-b9e8-cd62d60b94cc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11921',
  'x-ms-correlation-request-id',
  '25108111-5343-4938-aaf7-017ea7858e70',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072047Z:25108111-5343-4938-aaf7-017ea7858e70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1dbb6da9-2a2a-4b10-aab7-db3d49940a14',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11920',
  'x-ms-correlation-request-id',
  'a9ee2925-38d3-42ed-8077-582b362df5d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072047Z:a9ee2925-38d3-42ed-8077-582b362df5d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:df89f085-476e-474c-b2a9-a835f6b06a18',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11919',
  'x-ms-correlation-request-id',
  '09afdac1-a864-47e7-8e6e-ded9c5445674',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072047Z:09afdac1-a864-47e7-8e6e-ded9c5445674',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:434f9525-420c-4c3a-bc89-ae76991b3372',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11918',
  'x-ms-correlation-request-id',
  'a9fa53b2-f260-4837-a044-87b0abeb0587',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072048Z:a9fa53b2-f260-4837-a044-87b0abeb0587',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ba9bd6a0-8289-44d0-b7ce-7ca4b7e3ff11',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11917',
  'x-ms-correlation-request-id',
  '7ff39128-a31e-4eb6-b8e5-fa64bb0bc414',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072048Z:7ff39128-a31e-4eb6-b8e5-fa64bb0bc414',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e5868550-a854-48cc-86cb-d428ec14d5d4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11916',
  'x-ms-correlation-request-id',
  'f3210f79-c8c9-43df-8bb2-bfa56834d0ef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072048Z:f3210f79-c8c9-43df-8bb2-bfa56834d0ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9d164937-9785-4d7d-83e5-4b7916483fed',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11915',
  'x-ms-correlation-request-id',
  '7dd339d8-3921-46fc-8d58-4fa583c25716',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072048Z:7dd339d8-3921-46fc-8d58-4fa583c25716',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4349c7e1-cd21-49b2-a7d4-dcbe23743d57',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11914',
  'x-ms-correlation-request-id',
  '73572ca0-fbdc-4ffa-9802-38ee68a2b353',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072049Z:73572ca0-fbdc-4ffa-9802-38ee68a2b353',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e5e99ffd-e3db-4fd1-93a3-f1f07bc87920',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11913',
  'x-ms-correlation-request-id',
  '68c3c46a-6128-465c-872e-520810d638bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072049Z:68c3c46a-6128-465c-872e-520810d638bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:69759b27-6536-44e7-9052-9da49b76ec8f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11912',
  'x-ms-correlation-request-id',
  'a71bcf90-ea49-46eb-9c4e-d4389da6122f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072049Z:a71bcf90-ea49-46eb-9c4e-d4389da6122f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:26494203-8a92-4045-b7dd-a676a27653ce',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11911',
  'x-ms-correlation-request-id',
  '7412479b-1c59-4556-a19f-ec0ec6484879',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072050Z:7412479b-1c59-4556-a19f-ec0ec6484879',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:631ff36c-ae05-4650-a5a2-e881b8c7f07e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11910',
  'x-ms-correlation-request-id',
  '156be051-1875-4ca8-b46c-8604f191284e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072050Z:156be051-1875-4ca8-b46c-8604f191284e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b856337f-5d5f-4d61-bf0c-24c268b44a71',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11909',
  'x-ms-correlation-request-id',
  '8a7811c0-ab6d-4e85-8c2d-2e37e27a5e09',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072050Z:8a7811c0-ab6d-4e85-8c2d-2e37e27a5e09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0fd6217b-1881-4926-9695-c7f43bba5673',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11908',
  'x-ms-correlation-request-id',
  '442e31df-4177-45d9-bd0d-7db98b422338',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072051Z:442e31df-4177-45d9-bd0d-7db98b422338',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f64cd179-df5c-43fd-b350-1cb84cdc04f1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11907',
  'x-ms-correlation-request-id',
  '9fa768e4-d293-423b-b040-8cc2508ab8fb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072051Z:9fa768e4-d293-423b-b040-8cc2508ab8fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f27ebac9-1542-4735-9f4c-ac8a4a5c7db5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11906',
  'x-ms-correlation-request-id',
  'a9e00161-948f-4049-9fa9-236bd71c431f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072051Z:a9e00161-948f-4049-9fa9-236bd71c431f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bc7b5647-9db6-4409-8e5a-4add54997b82',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11905',
  'x-ms-correlation-request-id',
  '406cd2af-2ae8-4b8a-a78b-b9ffc15580cc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072051Z:406cd2af-2ae8-4b8a-a78b-b9ffc15580cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:372ebaa0-7efe-4b91-ba1f-0f742b3c3f0f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-correlation-request-id',
  'd60df2b3-20de-4d79-a0ee-cc29f456a24e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072052Z:d60df2b3-20de-4d79-a0ee-cc29f456a24e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:42a5c6e3-8ae3-4fa9-bb31-64001aafa2cb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11903',
  'x-ms-correlation-request-id',
  '3b977af2-2e35-48eb-aaf8-914bccdf7f5c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072052Z:3b977af2-2e35-48eb-aaf8-914bccdf7f5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:59a92053-aa84-4c2f-a435-ffdb5ff4e506',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11902',
  'x-ms-correlation-request-id',
  '3eb943bf-cef4-4bce-8f9d-b538e0eedb04',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072052Z:3eb943bf-cef4-4bce-8f9d-b538e0eedb04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bde18a6f-5421-4956-b46b-7995ed7c173c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11901',
  'x-ms-correlation-request-id',
  'fcaa77fc-480c-4d02-b901-b05e27d6645e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072053Z:fcaa77fc-480c-4d02-b901-b05e27d6645e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5ba8fb9c-e650-42c3-9f24-010767c7ea3a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11900',
  'x-ms-correlation-request-id',
  'c0e22f01-029e-4267-8b10-7881d8c42f8e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072053Z:c0e22f01-029e-4267-8b10-7881d8c42f8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:983dea9d-b951-433d-bd05-2eb1caaaf699',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11899',
  'x-ms-correlation-request-id',
  'a87924cd-91b3-4b89-8e68-0fde56dc7f64',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072053Z:a87924cd-91b3-4b89-8e68-0fde56dc7f64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:91644dba-ec86-474d-8aa9-0b250b3f8e96',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11898',
  'x-ms-correlation-request-id',
  '7f9f923c-eace-4c0c-8e49-2f72e38f3e7f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072053Z:7f9f923c-eace-4c0c-8e49-2f72e38f3e7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:872a9d39-c3e7-45ec-8206-3a1883bd3c46',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11897',
  'x-ms-correlation-request-id',
  '9a59d316-acd1-43ca-8649-3bdd345593df',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072054Z:9a59d316-acd1-43ca-8649-3bdd345593df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e5e9aac8-9d13-4c30-9a2f-43095bbea355',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11896',
  'x-ms-correlation-request-id',
  '7103dd17-86b0-47f2-a2b2-f87d3161c2bd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072054Z:7103dd17-86b0-47f2-a2b2-f87d3161c2bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:cf9aef50-d17c-4050-83fb-397ea0e4f8af',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11895',
  'x-ms-correlation-request-id',
  'fac8778e-5120-4933-bb6d-718c19253994',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072054Z:fac8778e-5120-4933-bb6d-718c19253994',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1cabc257-79ce-48bc-8746-79eed6c10ce1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11894',
  'x-ms-correlation-request-id',
  '338ad1c2-fe3f-4d57-ae6f-672afdc433b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072055Z:338ad1c2-fe3f-4d57-ae6f-672afdc433b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:df29d140-ee34-4f4e-b584-5c2906758889',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11893',
  'x-ms-correlation-request-id',
  '25471a51-ef84-4331-82d4-f3b728d9fe9e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072055Z:25471a51-ef84-4331-82d4-f3b728d9fe9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2c3a3e68-a0a9-4980-ac59-e69783fc8bdd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11892',
  'x-ms-correlation-request-id',
  '9bc928de-b9cd-4828-a4a8-15596ff8a71f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072055Z:9bc928de-b9cd-4828-a4a8-15596ff8a71f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2fd6c603-9526-4b24-91b2-4394429ed622',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11891',
  'x-ms-correlation-request-id',
  'e7886c7e-f8fe-4aec-8aa1-b54628b9feec',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072056Z:e7886c7e-f8fe-4aec-8aa1-b54628b9feec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0f8d684d-9337-4dd6-9dd2-78bc24835346',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11890',
  'x-ms-correlation-request-id',
  '7a5cb625-43ec-495c-b011-ebffa4bae27f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072056Z:7a5cb625-43ec-495c-b011-ebffa4bae27f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:920e6634-aff2-4fda-888d-145629efeceb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11889',
  'x-ms-correlation-request-id',
  '3dd0ab60-d302-40cb-b34d-4280014b1408',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072056Z:3dd0ab60-d302-40cb-b34d-4280014b1408',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:357c08d7-0c7f-4167-804c-48b1ec66dd2a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11888',
  'x-ms-correlation-request-id',
  '72f059e4-35ed-4eb1-9678-30822741a807',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072056Z:72f059e4-35ed-4eb1-9678-30822741a807',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3e2bd16d-7c0b-4e29-8cd8-297005cdcab8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11887',
  'x-ms-correlation-request-id',
  'a8565741-3de2-47d2-85d2-34cb6e1dc0b6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072057Z:a8565741-3de2-47d2-85d2-34cb6e1dc0b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0c37b684-819b-49c0-91f8-fb75852ae4db',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11886',
  'x-ms-correlation-request-id',
  'c90b5637-c6cc-47e9-8387-7e882f39b748',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072057Z:c90b5637-c6cc-47e9-8387-7e882f39b748',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:62c31525-39f5-4930-92b5-5d2eaba257c1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11885',
  'x-ms-correlation-request-id',
  '627a204d-e597-4afc-b986-0c8d9c12c91a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072057Z:627a204d-e597-4afc-b986-0c8d9c12c91a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7bcdd978-1713-4c37-b721-d69f25b6d0b6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11884',
  'x-ms-correlation-request-id',
  'db10fa5e-c3aa-48b5-a5d7-d2cb1f9a622d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072058Z:db10fa5e-c3aa-48b5-a5d7-d2cb1f9a622d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a8363255-fc51-498d-907a-b50321d2bd34',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11883',
  'x-ms-correlation-request-id',
  'ea379da2-295c-447e-9ab5-70a4030526b0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072058Z:ea379da2-295c-447e-9ab5-70a4030526b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9fb07d84-1dfc-4813-9ca2-e4c8ce9c9859',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11882',
  'x-ms-correlation-request-id',
  '92588735-6a11-4acf-9102-de61c179465c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072058Z:92588735-6a11-4acf-9102-de61c179465c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:429aa2e4-e443-4b05-b42f-adad120fc713',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11881',
  'x-ms-correlation-request-id',
  '5bdc7f31-b0ea-4cdd-a73f-9cd13d893c86',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072059Z:5bdc7f31-b0ea-4cdd-a73f-9cd13d893c86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:59c6b575-9d49-4078-962a-5ecf53f0e66e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11880',
  'x-ms-correlation-request-id',
  'e26ddee6-de33-4f57-be82-ae119430d156',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072059Z:e26ddee6-de33-4f57-be82-ae119430d156',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4e7b7834-c055-42b8-b704-143edaf5275b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11879',
  'x-ms-correlation-request-id',
  'e9da3b54-3929-410f-9add-1c4a80447e13',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072059Z:e9da3b54-3929-410f-9add-1c4a80447e13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c31a55a1-746c-4181-a7f8-98b22a4ff715',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11878',
  'x-ms-correlation-request-id',
  '3a72abec-1d47-4301-ae29-714d69cbccb2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072059Z:3a72abec-1d47-4301-ae29-714d69cbccb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ddf016b6-60cf-4e2b-8624-e6b41be59da2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11877',
  'x-ms-correlation-request-id',
  'c732f9a8-18b3-40c4-a2d5-918a1dc46c83',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072100Z:c732f9a8-18b3-40c4-a2d5-918a1dc46c83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:20:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d379b2ea-be41-4d84-b675-8b874b424d33',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11876',
  'x-ms-correlation-request-id',
  'd07cadbf-795b-42e1-bac8-26ad128f0a3a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072100Z:d07cadbf-795b-42e1-bac8-26ad128f0a3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:83bae743-88e3-48eb-b847-7a0b18fb8c3d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11875',
  'x-ms-correlation-request-id',
  '42d398e4-f1be-47d4-80ad-4b40cd2b1633',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072100Z:42d398e4-f1be-47d4-80ad-4b40cd2b1633',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c129c9c0-ba0f-4f26-bae2-72e131a335b0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11874',
  'x-ms-correlation-request-id',
  '6f2e8352-0961-4186-bf0c-1770ec5e4154',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072101Z:6f2e8352-0961-4186-bf0c-1770ec5e4154',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:069318fb-849a-4fbf-8eef-f0ce644fc64f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11873',
  'x-ms-correlation-request-id',
  '8fe530cf-ec72-43dd-80af-990d1d642a65',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072101Z:8fe530cf-ec72-43dd-80af-990d1d642a65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b2275999-b85a-4c7b-bd99-c36ffdaa1b85',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11872',
  'x-ms-correlation-request-id',
  'ade9272b-0458-45ab-90a2-a1b90b4f3046',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072101Z:ade9272b-0458-45ab-90a2-a1b90b4f3046',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:258b590a-789c-4f7a-84c2-2f60735d309b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11871',
  'x-ms-correlation-request-id',
  '1851628f-f388-4475-8cbd-cd3a44064269',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072101Z:1851628f-f388-4475-8cbd-cd3a44064269',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3780c210-6cd3-4032-9776-e2a8c585d8a5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11870',
  'x-ms-correlation-request-id',
  '57ed89dc-01b0-47b5-bd72-de45f020001d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072102Z:57ed89dc-01b0-47b5-bd72-de45f020001d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9b7830c3-29fa-4846-9ec0-a0556facb3f1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11869',
  'x-ms-correlation-request-id',
  '710924bb-5354-458c-8455-32599fcfbbfa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072102Z:710924bb-5354-458c-8455-32599fcfbbfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8ea55726-7c7c-4861-a00c-ee2fade0fa94',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11868',
  'x-ms-correlation-request-id',
  '48e5c3a0-98fa-4155-a830-07fe47ff9745',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072102Z:48e5c3a0-98fa-4155-a830-07fe47ff9745',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c46dba56-9337-4600-be1d-904274012e0a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11867',
  'x-ms-correlation-request-id',
  '742b5065-2a1d-4782-81b6-f4b9432cb6d3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072103Z:742b5065-2a1d-4782-81b6-f4b9432cb6d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5caf94ec-00f9-462b-b68e-4de44e685268',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11866',
  'x-ms-correlation-request-id',
  'c40cb126-b223-4416-a20f-282a11e62e7e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072103Z:c40cb126-b223-4416-a20f-282a11e62e7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e7831f4d-c0bc-4552-b944-73584cce661b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11865',
  'x-ms-correlation-request-id',
  '43e91748-67f7-4eb6-9800-24d1cff28d43',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072103Z:43e91748-67f7-4eb6-9800-24d1cff28d43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:80d34880-0e7b-42ab-a71f-f413100eb558',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11864',
  'x-ms-correlation-request-id',
  'ecb64f56-20a6-4a91-aca6-1b21531d8355',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072103Z:ecb64f56-20a6-4a91-aca6-1b21531d8355',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b1425e17-7b37-4f82-ba90-103dc3c71fdb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11863',
  'x-ms-correlation-request-id',
  '23022623-c00c-4273-bd4e-e02ee7004fe1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072104Z:23022623-c00c-4273-bd4e-e02ee7004fe1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e2403dc4-d4c0-4718-97fa-b2e2911a7919',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11862',
  'x-ms-correlation-request-id',
  '71984f0a-ddc3-4087-9d85-664a1a899acb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072104Z:71984f0a-ddc3-4087-9d85-664a1a899acb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:25ee91ab-47ac-4a8d-9d0a-dc50634dff69',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11861',
  'x-ms-correlation-request-id',
  'abc8a3d7-63dd-417f-8f63-4254675aa635',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072104Z:abc8a3d7-63dd-417f-8f63-4254675aa635',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:62ace442-ad4d-4a84-a33f-89ad23999b78',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11860',
  'x-ms-correlation-request-id',
  '015ad6e9-5145-4a75-9a81-2e0b187b500a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072105Z:015ad6e9-5145-4a75-9a81-2e0b187b500a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:339c6869-995b-4a39-8a46-3a77a592c7f8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11859',
  'x-ms-correlation-request-id',
  '2bf08c45-fd95-40a0-890c-d479e61513d9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072105Z:2bf08c45-fd95-40a0-890c-d479e61513d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3345c254-9eee-4d75-9215-a227d2fd961b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11858',
  'x-ms-correlation-request-id',
  '81886768-f7bc-4ef0-9202-2c9941e06d9a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072105Z:81886768-f7bc-4ef0-9202-2c9941e06d9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1baf2208-a07e-4997-90d7-497c6df996a0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11857',
  'x-ms-correlation-request-id',
  '1842f4d4-1861-483e-9c1a-51138e2a9fae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072106Z:1842f4d4-1861-483e-9c1a-51138e2a9fae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:410f26cf-6d83-4d3b-aa8e-c66c837601cd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11856',
  'x-ms-correlation-request-id',
  '1371496d-e211-4231-b278-0230b1ff4cf4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072106Z:1371496d-e211-4231-b278-0230b1ff4cf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:20c3d6c0-3759-44dd-8792-10ee82b3066c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11855',
  'x-ms-correlation-request-id',
  'f97a8a90-86d8-40ac-adce-751e48de4014',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072106Z:f97a8a90-86d8-40ac-adce-751e48de4014',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:21bcff79-bf54-4574-b41c-fdcac5d32463',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11854',
  'x-ms-correlation-request-id',
  '80cf542f-530c-4581-9963-d4e13ce24d7a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072106Z:80cf542f-530c-4581-9963-d4e13ce24d7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:23f94a7b-4763-4fd3-a97e-d0744c076a29',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11853',
  'x-ms-correlation-request-id',
  '1c655a65-0505-4240-a1a7-d45e1db4fdbb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072107Z:1c655a65-0505-4240-a1a7-d45e1db4fdbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1f3cf948-4720-4121-bb5e-e51b066bb7f1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11852',
  'x-ms-correlation-request-id',
  '9f178e2b-4441-4a9d-a9a6-17d7c20bd649',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072107Z:9f178e2b-4441-4a9d-a9a6-17d7c20bd649',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7c0c0882-b377-49a0-937a-32eef62a8153',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11851',
  'x-ms-correlation-request-id',
  'c635c103-485f-4bad-86ad-6ba4547c6007',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072107Z:c635c103-485f-4bad-86ad-6ba4547c6007',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:059e919a-987b-4ff7-be61-eb06cfab3e7c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11850',
  'x-ms-correlation-request-id',
  '8cd363c2-0c80-4b8f-9172-bad612032e89',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072108Z:8cd363c2-0c80-4b8f-9172-bad612032e89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6e609b70-1c15-49e6-a640-7ca3c3cf4e94',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11849',
  'x-ms-correlation-request-id',
  '82cc3ab6-ed51-4c2b-a73b-9ae5e20ba317',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072108Z:82cc3ab6-ed51-4c2b-a73b-9ae5e20ba317',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e66ae5fd-39b7-40ea-9da7-da57c03e6662',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11848',
  'x-ms-correlation-request-id',
  'f31705da-79ad-4626-bd1b-2b3383a8b819',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072108Z:f31705da-79ad-4626-bd1b-2b3383a8b819',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1c294a2f-1efe-48eb-87ee-a0a58cd56ec5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11847',
  'x-ms-correlation-request-id',
  '27f8efe9-ad3a-42ed-a12d-bcfae07289b0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072109Z:27f8efe9-ad3a-42ed-a12d-bcfae07289b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:78ed9ead-629a-4c6e-b046-c3b45c2eb3fb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11846',
  'x-ms-correlation-request-id',
  '25c11d99-b7c1-4dcf-b4e8-1fc982460033',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072109Z:25c11d99-b7c1-4dcf-b4e8-1fc982460033',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3b7de6d0-46ff-4824-8be0-c27317a81dc2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11845',
  'x-ms-correlation-request-id',
  '5f558a5d-7f82-4516-8ebe-4697805b1264',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072109Z:5f558a5d-7f82-4516-8ebe-4697805b1264',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:afd78069-2b59-44d1-b1bf-49a6a2ae8c2b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11844',
  'x-ms-correlation-request-id',
  '25eda17f-842f-48cb-a9b6-a39c900832b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072109Z:25eda17f-842f-48cb-a9b6-a39c900832b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6971144a-261a-46c9-a6e4-c1d27435e46b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11843',
  'x-ms-correlation-request-id',
  '5cdeffd2-afcc-4b41-8c7f-a425c8c644e8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072110Z:5cdeffd2-afcc-4b41-8c7f-a425c8c644e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f4812e34-f79b-4f06-b1d0-5f54e261fc64',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11842',
  'x-ms-correlation-request-id',
  'f160aec1-5fc5-4399-8f1a-162b796b0a6d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072110Z:f160aec1-5fc5-4399-8f1a-162b796b0a6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8034da4e-74cc-4223-a713-6775e94b6fcf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11841',
  'x-ms-correlation-request-id',
  'cdecef04-316d-4962-bbd2-854915d9ee69',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072110Z:cdecef04-316d-4962-bbd2-854915d9ee69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a028dc84-cbdb-4e42-9ec8-3813f91d3347',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11840',
  'x-ms-correlation-request-id',
  'e2382dcc-3c27-42a3-bc5b-751ce26d4c22',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072111Z:e2382dcc-3c27-42a3-bc5b-751ce26d4c22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:74409334-8ca2-472d-87a2-9dd099078e5d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11839',
  'x-ms-correlation-request-id',
  'a4d34756-40c7-49d9-902c-01c2a216110e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072111Z:a4d34756-40c7-49d9-902c-01c2a216110e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6fbc41bd-bbd1-4394-9705-1f301cce1717',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11838',
  'x-ms-correlation-request-id',
  '158f4f53-e7b6-4183-8940-9ac36909c186',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072111Z:158f4f53-e7b6-4183-8940-9ac36909c186',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8d64b7f4-9e65-44c4-b800-28aab006a113',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11837',
  'x-ms-correlation-request-id',
  '690f21c6-b274-4a5d-a686-6e82b9666d2e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072112Z:690f21c6-b274-4a5d-a686-6e82b9666d2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:56e3bf40-02a1-49da-9ee1-90ba5f8784a4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11836',
  'x-ms-correlation-request-id',
  '6e38d8bd-2f17-4b9a-9033-d9f18f7fb689',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072112Z:6e38d8bd-2f17-4b9a-9033-d9f18f7fb689',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0c88d446-9c60-4856-b1a0-4a0c322f34db',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11835',
  'x-ms-correlation-request-id',
  'b55cb5d9-d6f0-447c-95ee-e45736bd4e88',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072112Z:b55cb5d9-d6f0-447c-95ee-e45736bd4e88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:10b7d253-2e0b-4650-a301-d112073b42f2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11834',
  'x-ms-correlation-request-id',
  '021714f4-f679-486f-b0a5-468407ea1ffa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072112Z:021714f4-f679-486f-b0a5-468407ea1ffa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d4593e63-0e6a-4f29-87d5-89b93c74bb7e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11833',
  'x-ms-correlation-request-id',
  '5b7582b5-316e-488f-a4d5-bad924dc1885',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072113Z:5b7582b5-316e-488f-a4d5-bad924dc1885',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a277cbb0-df68-47d7-abda-8bbde591288e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11832',
  'x-ms-correlation-request-id',
  '5c6f4ac0-ee12-40f2-8c17-38521900e87b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072113Z:5c6f4ac0-ee12-40f2-8c17-38521900e87b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ca1f428d-4070-4b24-8f15-98a94795e763',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11831',
  'x-ms-correlation-request-id',
  'c1a4eee9-650e-4d36-b8ee-df312b2c9aa1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072113Z:c1a4eee9-650e-4d36-b8ee-df312b2c9aa1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fef5b77d-d1e2-47c9-a39a-678608419af6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11830',
  'x-ms-correlation-request-id',
  '2f043cba-39f6-4a3c-b2b8-dd44ed63d51d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072114Z:2f043cba-39f6-4a3c-b2b8-dd44ed63d51d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9a3269ec-d727-4c5b-9ad4-be454fe9edd7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11829',
  'x-ms-correlation-request-id',
  '8ec3a09a-5f71-4946-bfbc-f71b54c5bb81',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072114Z:8ec3a09a-5f71-4946-bfbc-f71b54c5bb81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fd3c1be1-059f-4eb0-8900-957fb14e7240',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11828',
  'x-ms-correlation-request-id',
  '92a30be3-dbf9-4c20-9811-c948fea37e6b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072114Z:92a30be3-dbf9-4c20-9811-c948fea37e6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3fff0ed6-609e-4401-a2f4-f18728adaaef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11827',
  'x-ms-correlation-request-id',
  '157fb761-d2cc-47c9-b238-4d76f413c7d6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072115Z:157fb761-d2cc-47c9-b238-4d76f413c7d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:681f422a-c812-4464-a6e2-d44337b85a14',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11826',
  'x-ms-correlation-request-id',
  '5cb26efe-94cf-4433-9d71-24328b8cac28',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072115Z:5cb26efe-94cf-4433-9d71-24328b8cac28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a73a8f74-6047-4366-9e8c-d5352f09366c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11825',
  'x-ms-correlation-request-id',
  '913a943a-a903-48c4-978b-6c0d5ab49193',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072115Z:913a943a-a903-48c4-978b-6c0d5ab49193',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ed68f042-4104-4223-880d-b848e9f1987c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11824',
  'x-ms-correlation-request-id',
  'd55ae816-0d5b-4f4d-8e93-c0911822dde8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072116Z:d55ae816-0d5b-4f4d-8e93-c0911822dde8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7058fc20-00fc-4a5d-83d8-a9494a65fc5e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11823',
  'x-ms-correlation-request-id',
  '4b38bfb3-de4b-4be4-b259-409964306e4a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072116Z:4b38bfb3-de4b-4be4-b259-409964306e4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ee605757-b6b1-41b6-a52c-b1df749941cf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11822',
  'x-ms-correlation-request-id',
  '234389ac-b573-4229-ab3b-e6d4a88a2e73',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072116Z:234389ac-b573-4229-ab3b-e6d4a88a2e73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:826886f5-5ac1-4b3b-821d-1ea369dcbbc2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11821',
  'x-ms-correlation-request-id',
  '0683f0a6-a9bd-46af-8d7a-d5db75f26e11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072116Z:0683f0a6-a9bd-46af-8d7a-d5db75f26e11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3d126f90-d70d-45a6-a175-0eff184f9024',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11820',
  'x-ms-correlation-request-id',
  '557fad09-9e8e-4f9d-a05a-8fdd7c9cc263',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072117Z:557fad09-9e8e-4f9d-a05a-8fdd7c9cc263',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4dea57f2-da3a-468e-833b-8e3b21ee2d16',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11819',
  'x-ms-correlation-request-id',
  '78c49982-611a-4c82-8921-97e4bba0371b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072117Z:78c49982-611a-4c82-8921-97e4bba0371b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:61828d72-fe6a-433c-a348-03ff3151dcaa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11818',
  'x-ms-correlation-request-id',
  'ee81c579-9f67-4833-a743-14c28fb99bde',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072117Z:ee81c579-9f67-4833-a743-14c28fb99bde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9f89068b-24ef-45fd-b329-1ca6b4cca9b6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11817',
  'x-ms-correlation-request-id',
  'a0a3bc26-0991-49a5-b993-4b579ad654c1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072118Z:a0a3bc26-0991-49a5-b993-4b579ad654c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c8861b41-cbb0-43e9-a5f1-fc625ac715c1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11816',
  'x-ms-correlation-request-id',
  'c07efab0-1d70-482a-ac46-a6f7678cd805',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072118Z:c07efab0-1d70-482a-ac46-a6f7678cd805',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7dbfbeb4-b417-46f6-a9a6-0b3c680717aa',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11815',
  'x-ms-correlation-request-id',
  'c5358400-440b-4793-b91a-1df7240ee2a3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072118Z:c5358400-440b-4793-b91a-1df7240ee2a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:379fceb0-e96b-4048-aeb5-bdea4009e703',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11814',
  'x-ms-correlation-request-id',
  'c2849938-b331-4878-9ca9-c8827e24a07c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072119Z:c2849938-b331-4878-9ca9-c8827e24a07c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3c94d85f-be36-4d3f-913c-b331c4755851',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11813',
  'x-ms-correlation-request-id',
  'efc11263-b3e6-496c-8313-95c76bf19c5e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072119Z:efc11263-b3e6-496c-8313-95c76bf19c5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:99cc3730-a337-4cb2-b3ab-909f2cef7fd0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11812',
  'x-ms-correlation-request-id',
  'bd7db023-72b8-4391-82f2-ada02d478e87',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072119Z:bd7db023-72b8-4391-82f2-ada02d478e87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:29556d6e-f2f6-48c8-9b3f-83765708e4ec',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11811',
  'x-ms-correlation-request-id',
  '1059a782-1c59-4016-a02a-14228ff50b53',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072119Z:1059a782-1c59-4016-a02a-14228ff50b53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:18d4a5e2-ebbf-43d9-87c5-b8a8d8432066',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11810',
  'x-ms-correlation-request-id',
  '66e7e6f3-0c4c-4fda-8cd2-824204e4a4d3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072120Z:66e7e6f3-0c4c-4fda-8cd2-824204e4a4d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:79b62199-c6f7-4ed8-8a8f-4e795b31c19b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11809',
  'x-ms-correlation-request-id',
  '337de6f5-39bb-4ff7-a28f-68d5511a8eaf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072120Z:337de6f5-39bb-4ff7-a28f-68d5511a8eaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b551289b-78de-49ce-8f35-af91c5853402',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11808',
  'x-ms-correlation-request-id',
  'd091442e-f5f9-4837-aef5-b989a9c24243',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072120Z:d091442e-f5f9-4837-aef5-b989a9c24243',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8c1abd84-ad09-4da8-a9f9-c05a2e221078',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11807',
  'x-ms-correlation-request-id',
  '51c0ac56-9300-4b75-b6d4-bbbcdcb615f0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072121Z:51c0ac56-9300-4b75-b6d4-bbbcdcb615f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:48799c38-16d0-4926-a40b-7f2abad8c7ef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11806',
  'x-ms-correlation-request-id',
  'd663ee8b-25e9-4c6c-8afa-7658b9f744f8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072121Z:d663ee8b-25e9-4c6c-8afa-7658b9f744f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6ef472ef-05a0-4056-b3e2-e69790ca7569',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11805',
  'x-ms-correlation-request-id',
  'fc8788c2-396d-4ccf-afd3-69c1cf4dd9a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072121Z:fc8788c2-396d-4ccf-afd3-69c1cf4dd9a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5945a1a3-be4f-4dc9-a742-48be9cc3ef55',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11804',
  'x-ms-correlation-request-id',
  '44b5ed38-1138-45d5-b881-fe66a2204194',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072122Z:44b5ed38-1138-45d5-b881-fe66a2204194',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:48b3835a-f77f-4f15-8f8d-6df06d4e7922',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11803',
  'x-ms-correlation-request-id',
  'a5106ded-42b3-47f5-9e06-4b7c0a231ba1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072122Z:a5106ded-42b3-47f5-9e06-4b7c0a231ba1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1d281f4c-d8b6-4d4c-93f2-2a69bcab6ccb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11802',
  'x-ms-correlation-request-id',
  'ba97068c-4217-4554-892b-7718c0c4e91f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072122Z:ba97068c-4217-4554-892b-7718c0c4e91f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3cffc55a-717c-4b5a-8bd4-e2ae367cd5ba',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11801',
  'x-ms-correlation-request-id',
  '57e93c1b-291b-4fbb-b49d-1723021425e9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072122Z:57e93c1b-291b-4fbb-b49d-1723021425e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:df4eaaa4-3974-48fd-a8a4-a4a5909c03b3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11800',
  'x-ms-correlation-request-id',
  'ce0c6621-7dac-4b0e-9327-d3052e472457',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072123Z:ce0c6621-7dac-4b0e-9327-d3052e472457',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fe5cfbae-e874-41c9-91b1-c8d33a7e6d76',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11799',
  'x-ms-correlation-request-id',
  '94a9fa93-d594-44a1-be17-8003adafc777',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072123Z:94a9fa93-d594-44a1-be17-8003adafc777',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bbfc66ae-ebb5-4189-8a6e-94d8f64b0e6d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11798',
  'x-ms-correlation-request-id',
  'ae16acb4-542c-4281-a841-014fb81dd998',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072123Z:ae16acb4-542c-4281-a841-014fb81dd998',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:092a444f-1e0e-4f26-ba74-e363665e99e4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11797',
  'x-ms-correlation-request-id',
  '53270886-5454-4fb0-8302-aa315182acdf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072124Z:53270886-5454-4fb0-8302-aa315182acdf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:efc93569-7d74-4cf5-8573-6c0f7709f100',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11796',
  'x-ms-correlation-request-id',
  '72e96a92-0102-4c66-bb81-418213ec6e43',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072124Z:72e96a92-0102-4c66-bb81-418213ec6e43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f8269ee4-75f8-4972-80a1-8a18d48cfd4f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11795',
  'x-ms-correlation-request-id',
  '403f1ad2-998e-4878-8431-3854674f831b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072124Z:403f1ad2-998e-4878-8431-3854674f831b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:46f8b8b7-6a52-4afd-94fa-2bd157e69ffc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11794',
  'x-ms-correlation-request-id',
  'b31490d6-6641-49ab-a518-890edfdbb56e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072125Z:b31490d6-6641-49ab-a518-890edfdbb56e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b8aa0f3c-c20e-498a-9f18-408f02af517e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11793',
  'x-ms-correlation-request-id',
  '3efc3bb3-d6a6-426f-830c-9fe2f1ecf92b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072125Z:3efc3bb3-d6a6-426f-830c-9fe2f1ecf92b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2e8105fc-d61c-4acf-a633-c13e8090f771',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11792',
  'x-ms-correlation-request-id',
  'c00cd613-c591-43c4-a941-e40e2a0fafef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072125Z:c00cd613-c591-43c4-a941-e40e2a0fafef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a69f08a1-89ae-4f63-a761-a8ad96530c4a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11791',
  'x-ms-correlation-request-id',
  'b56674a0-ddee-4b84-b9eb-72032bda8eff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072125Z:b56674a0-ddee-4b84-b9eb-72032bda8eff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1a13c7f1-34b7-4f94-9c31-98f39c5533e2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11790',
  'x-ms-correlation-request-id',
  '001f8a94-05c0-4273-b572-b2ecf9e6b4fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072126Z:001f8a94-05c0-4273-b572-b2ecf9e6b4fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c81ea897-74f0-44e1-8683-a89a6a80018c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11789',
  'x-ms-correlation-request-id',
  '665bfa80-c8a6-4610-abd1-17e6a831e302',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072126Z:665bfa80-c8a6-4610-abd1-17e6a831e302',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5011f9d3-b670-4579-99e5-1d90f0dfb182',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11788',
  'x-ms-correlation-request-id',
  '3104a4c8-6aa8-457a-babe-eea633332241',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072126Z:3104a4c8-6aa8-457a-babe-eea633332241',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f7f7d10d-a45e-47c8-9f3d-18145deace81',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11787',
  'x-ms-correlation-request-id',
  '49f5e013-d437-4331-82e9-f99a0ab7bce3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072127Z:49f5e013-d437-4331-82e9-f99a0ab7bce3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b61d6c82-7043-4ebc-bf16-2c37c21570b0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11786',
  'x-ms-correlation-request-id',
  'd261a6f3-d0d1-40c2-9b11-0b5e6db2f296',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072127Z:d261a6f3-d0d1-40c2-9b11-0b5e6db2f296',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4ee3127a-8448-48f5-83f2-4294fb4809fb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11785',
  'x-ms-correlation-request-id',
  '7494dd9f-78a3-46ec-8b91-f21c7e587b9c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072127Z:7494dd9f-78a3-46ec-8b91-f21c7e587b9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:07cf5051-9659-4554-8977-afc9b3790d99',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11784',
  'x-ms-correlation-request-id',
  'e0486f02-64f0-46cc-bb86-c0d296ba9843',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072127Z:e0486f02-64f0-46cc-bb86-c0d296ba9843',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5d164275-7dfd-4637-a3db-bc22c60718af',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11783',
  'x-ms-correlation-request-id',
  'a63dcfe8-f2c5-424c-9e3a-c26fefa4b46d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072128Z:a63dcfe8-f2c5-424c-9e3a-c26fefa4b46d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5ebac31b-682f-4e53-89ff-6d7b5a73ab19',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11782',
  'x-ms-correlation-request-id',
  'f2670e61-27dd-4e12-aaf5-7e9f9288ff79',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072128Z:f2670e61-27dd-4e12-aaf5-7e9f9288ff79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8a4a6523-15c6-4cd1-9b36-ffca343dd6cc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11781',
  'x-ms-correlation-request-id',
  '177a9973-4103-463c-a2dc-392f893132c5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072128Z:177a9973-4103-463c-a2dc-392f893132c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0ec23b10-8f18-46e2-8cc2-3938f7d42169',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11780',
  'x-ms-correlation-request-id',
  '36bb63ea-d921-4741-af5c-0abafd7e9b43',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072129Z:36bb63ea-d921-4741-af5c-0abafd7e9b43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:21ab819a-8e7d-437c-a3eb-a69b26ef2b82',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11779',
  'x-ms-correlation-request-id',
  '134057dc-d6c2-4294-8e54-74e733048e22',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072129Z:134057dc-d6c2-4294-8e54-74e733048e22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:39140e17-7d1e-4e4c-87f9-6c77419fb150',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11778',
  'x-ms-correlation-request-id',
  '5e6e1787-e958-43d6-a353-58dd7aae7eb5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072129Z:5e6e1787-e958-43d6-a353-58dd7aae7eb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:87ab8369-e7a1-433d-baa5-971b89180eca',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11777',
  'x-ms-correlation-request-id',
  '26c52526-5303-4845-be64-4157f92cdb5d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072129Z:26c52526-5303-4845-be64-4157f92cdb5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9d97ece1-b58a-42c6-bb5b-dea245da8c0e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11776',
  'x-ms-correlation-request-id',
  'cb5f5532-4040-4ff4-8a47-798e7bb57b20',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072130Z:cb5f5532-4040-4ff4-8a47-798e7bb57b20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7f841a39-e8dc-4118-8270-41b77bf86923',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11775',
  'x-ms-correlation-request-id',
  '6664d174-d87f-42de-9fe9-6fc35b575aed',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072130Z:6664d174-d87f-42de-9fe9-6fc35b575aed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fcf40f5c-ff82-4e59-8622-d872898654e3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11774',
  'x-ms-correlation-request-id',
  '804cc3e3-b8c2-4c83-af0d-7de759e843ef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072130Z:804cc3e3-b8c2-4c83-af0d-7de759e843ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4fd0575f-b266-4c42-86e6-ec861c79db10',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11773',
  'x-ms-correlation-request-id',
  '88529ff7-9842-4c98-b9db-39ea8d6cee7d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072131Z:88529ff7-9842-4c98-b9db-39ea8d6cee7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:39295d02-66bd-42c8-b9ae-77f56a10e52a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11772',
  'x-ms-correlation-request-id',
  'dd2fd01a-09be-4978-b3aa-f5be3df1ba3c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072131Z:dd2fd01a-09be-4978-b3aa-f5be3df1ba3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a4a727dd-72d3-4e8f-963d-508672d909ab',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11771',
  'x-ms-correlation-request-id',
  '96559b34-05e5-4917-809d-62491be6f509',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072131Z:96559b34-05e5-4917-809d-62491be6f509',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5bad9e3f-e50a-4d18-9df7-6bb4976e9aff',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11770',
  'x-ms-correlation-request-id',
  'ae7584f4-a030-4723-a65f-cdbf84509394',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072132Z:ae7584f4-a030-4723-a65f-cdbf84509394',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:576a5215-89cc-4af0-bf20-9429b17cd469',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11769',
  'x-ms-correlation-request-id',
  '53044070-c887-4763-814d-93043d4fdfcf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072132Z:53044070-c887-4763-814d-93043d4fdfcf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d0355a65-b09b-446c-b0e8-f4f9b1370ee4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11768',
  'x-ms-correlation-request-id',
  '2b49f3b7-cd24-4546-9443-74af716b7ff8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072132Z:2b49f3b7-cd24-4546-9443-74af716b7ff8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f3eb1ef0-2c9c-4321-9c37-ce82421574ad',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11767',
  'x-ms-correlation-request-id',
  '64a1697e-ca50-4109-b40d-ca3f9bf1d2a2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072132Z:64a1697e-ca50-4109-b40d-ca3f9bf1d2a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:66c07462-a4d1-4f0f-9db7-e50ba9da3e3c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11766',
  'x-ms-correlation-request-id',
  'eef87139-e545-495d-92f9-140b6eb5734f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072133Z:eef87139-e545-495d-92f9-140b6eb5734f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:87f4f3d1-80df-49e0-91e8-94bd39b65290',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11765',
  'x-ms-correlation-request-id',
  'f528e840-7122-44a0-b190-d77de6eab821',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072133Z:f528e840-7122-44a0-b190-d77de6eab821',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b5c41d84-4dd5-46b0-ad11-690b365db407',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11764',
  'x-ms-correlation-request-id',
  'aff76242-0301-4449-9fe0-78105ecf53b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072133Z:aff76242-0301-4449-9fe0-78105ecf53b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0941dc61-98d1-4a40-a87b-30f22872d68a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11763',
  'x-ms-correlation-request-id',
  'ca3d82d1-a43d-4588-88b4-5b66ad0fdd6c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072134Z:ca3d82d1-a43d-4588-88b4-5b66ad0fdd6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:304a464e-0e8b-4ac1-90ec-4e8a97fe7480',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11762',
  'x-ms-correlation-request-id',
  '9831f761-7478-4db6-9e46-67a1452c2b2c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072134Z:9831f761-7478-4db6-9e46-67a1452c2b2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7643231f-5134-43f4-aced-6b80daeea89d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11761',
  'x-ms-correlation-request-id',
  '2a332486-e03a-4a91-8c92-e614d0305643',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072134Z:2a332486-e03a-4a91-8c92-e614d0305643',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b34139e2-1d37-4707-b577-d840cc4d46bf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11760',
  'x-ms-correlation-request-id',
  'b18eeb37-fa2e-4ce9-a54c-d5e4a990c6d6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072135Z:b18eeb37-fa2e-4ce9-a54c-d5e4a990c6d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:367b0f80-1f47-45ee-b0f5-67436cdc5363',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11759',
  'x-ms-correlation-request-id',
  'f983efc6-cb95-41bc-adb3-fd2d7d1bb4c5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072135Z:f983efc6-cb95-41bc-adb3-fd2d7d1bb4c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ccbb748c-de4a-4df1-9a31-a0bc716a67cb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11758',
  'x-ms-correlation-request-id',
  '8f771352-2d58-4ab9-a023-bb0239cf7f13',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072135Z:8f771352-2d58-4ab9-a023-bb0239cf7f13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f2e85e7e-7c00-4a40-bf2d-d41a483d0f3e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11757',
  'x-ms-correlation-request-id',
  '79e037db-f8ef-4480-a32f-08099ed7238f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072135Z:79e037db-f8ef-4480-a32f-08099ed7238f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:82f7504f-479f-45b8-89aa-e00e2ea85820',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11756',
  'x-ms-correlation-request-id',
  'b1a44e1f-4eba-4f0f-b6a5-e2905c6e90bb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072136Z:b1a44e1f-4eba-4f0f-b6a5-e2905c6e90bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9632c66f-6f7f-42cc-ba9b-85ba5c0b76cd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11755',
  'x-ms-correlation-request-id',
  '3f28325e-1275-4d19-b871-ce48055c187f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072136Z:3f28325e-1275-4d19-b871-ce48055c187f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:45145e1b-fb6e-4720-be88-a74c41bf54cc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11754',
  'x-ms-correlation-request-id',
  '8891b455-69ce-4ff9-96a6-cab624095062',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072137Z:8891b455-69ce-4ff9-96a6-cab624095062',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:47153c6c-6228-42ca-ab45-56bc0c9931eb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11753',
  'x-ms-correlation-request-id',
  'c0798e29-1e8a-479d-b2dc-2ae485f88e34',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072137Z:c0798e29-1e8a-479d-b2dc-2ae485f88e34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dc13eb7f-3501-4901-b32f-2041dee67175',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11752',
  'x-ms-correlation-request-id',
  '13b53715-516e-47e4-99e3-16f00c735b9b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072137Z:13b53715-516e-47e4-99e3-16f00c735b9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7b7540b9-5bc8-46bb-a5d2-a264778c76b9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11751',
  'x-ms-correlation-request-id',
  'c6aa348f-062a-43d4-9fb4-44d0294e3da2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072138Z:c6aa348f-062a-43d4-9fb4-44d0294e3da2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8987c84f-5bae-4023-8761-72fbea841bba',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11750',
  'x-ms-correlation-request-id',
  '354a6527-18e6-4726-8172-cb4bee3c5531',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072138Z:354a6527-18e6-4726-8172-cb4bee3c5531',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c1c74a0e-e9d3-4c4a-81f6-52c7c35b0cdd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11749',
  'x-ms-correlation-request-id',
  '04197bca-c30b-4181-b00c-bab5e4528bf9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072138Z:04197bca-c30b-4181-b00c-bab5e4528bf9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dd1f925d-c70e-495e-be5e-b7f32f0ce80f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11748',
  'x-ms-correlation-request-id',
  '20d2358b-9b3a-4fd5-8894-7f85e28266d3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072139Z:20d2358b-9b3a-4fd5-8894-7f85e28266d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:831943fb-9227-491e-91e9-38677e41d35d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11747',
  'x-ms-correlation-request-id',
  'ddc73d3b-be5b-499e-95c9-da965fb678e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072139Z:ddc73d3b-be5b-499e-95c9-da965fb678e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:53bdf6fa-f73d-4fb1-a068-e9187b00f2cb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11746',
  'x-ms-correlation-request-id',
  '46339221-b205-49b5-aae3-2eeee0a9e975',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072139Z:46339221-b205-49b5-aae3-2eeee0a9e975',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3da641d1-64c8-4e9d-917d-196b1fdd1629',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11745',
  'x-ms-correlation-request-id',
  'b91fb8b5-be5a-48c8-8696-62e1903ab5d3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072139Z:b91fb8b5-be5a-48c8-8696-62e1903ab5d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:42d4ec86-1dd2-4212-ba20-12e8d90195d3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11744',
  'x-ms-correlation-request-id',
  '3fd94297-de7c-44a9-b9e4-e99a2949c065',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072140Z:3fd94297-de7c-44a9-b9e4-e99a2949c065',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e2e4cf36-0f2a-4a7e-8db1-e7c63ea575c9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11743',
  'x-ms-correlation-request-id',
  '4af81839-02a7-4315-b8e5-4393491331ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072140Z:4af81839-02a7-4315-b8e5-4393491331ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:565c3a28-007f-4c72-9091-43fc85857f02',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11742',
  'x-ms-correlation-request-id',
  '5a405040-fceb-4ed7-a11a-bda78d53b0e9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072140Z:5a405040-fceb-4ed7-a11a-bda78d53b0e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f72b9455-45da-436b-a47c-98a38ac32aeb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11741',
  'x-ms-correlation-request-id',
  'd0637401-ac77-4640-b2a7-fd658da72464',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072141Z:d0637401-ac77-4640-b2a7-fd658da72464',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0d872364-c6bb-4c0b-9b50-d16ff3a588d0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11740',
  'x-ms-correlation-request-id',
  '4ba53cca-130d-4fd4-b959-81fc0ffddd5c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072141Z:4ba53cca-130d-4fd4-b959-81fc0ffddd5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bb8d0993-b1a8-4045-a07a-9599890f76ae',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11739',
  'x-ms-correlation-request-id',
  '424c25db-b6b8-447e-9821-1f53edf40a8b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072141Z:424c25db-b6b8-447e-9821-1f53edf40a8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:40 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c0788d4c-b2fe-40a6-bf4f-b388a197393f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11738',
  'x-ms-correlation-request-id',
  '57af0756-bf28-4b4f-8d43-091b01682263',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072141Z:57af0756-bf28-4b4f-8d43-091b01682263',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0ffb3373-228d-43c8-9b9c-2dbadfc46088',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11737',
  'x-ms-correlation-request-id',
  '133dee58-bbca-4527-8dce-e185121684a2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072142Z:133dee58-bbca-4527-8dce-e185121684a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4d3fae3c-6849-4165-87e3-a59c7da8d405',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11736',
  'x-ms-correlation-request-id',
  'bb335003-ed08-4484-a9d8-5c8b81969223',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072142Z:bb335003-ed08-4484-a9d8-5c8b81969223',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:41 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:28710e67-c3de-4331-a350-f96ca597ec41',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11735',
  'x-ms-correlation-request-id',
  '85579d2a-c4a7-4be1-86e2-67fe2c1571e9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072142Z:85579d2a-c4a7-4be1-86e2-67fe2c1571e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:426ca786-a6b9-4cd1-9de5-13686979f2ab',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11734',
  'x-ms-correlation-request-id',
  '33d8f974-5b11-4ec3-9b4c-e3007fddcf3a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072143Z:33d8f974-5b11-4ec3-9b4c-e3007fddcf3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5310b535-4680-4ce0-be34-589f1df87ce4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11733',
  'x-ms-correlation-request-id',
  '278b081b-fc86-406b-8049-06dc83271070',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072143Z:278b081b-fc86-406b-8049-06dc83271070',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:42 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:58443a08-52c5-48ed-838a-e23df2e6a9c3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11732',
  'x-ms-correlation-request-id',
  'c18a6702-9dad-4362-921a-38c44c9691d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072143Z:c18a6702-9dad-4362-921a-38c44c9691d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b887e7eb-3aa5-4153-9cc9-74fa2c320037',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11731',
  'x-ms-correlation-request-id',
  '682d3819-01bc-45ee-aadf-566bbf73b36e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072144Z:682d3819-01bc-45ee-aadf-566bbf73b36e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0a3203a2-3158-45e5-bf21-8dab1668ea06',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11730',
  'x-ms-correlation-request-id',
  'd1bfefbc-ce40-4fc9-b893-efc6624ade65',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072144Z:d1bfefbc-ce40-4fc9-b893-efc6624ade65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:43 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c880e863-c654-48f1-9f68-546701e6b2dd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11729',
  'x-ms-correlation-request-id',
  '81516cae-5cb4-4470-bb85-029e7fd07399',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072144Z:81516cae-5cb4-4470-bb85-029e7fd07399',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e72d99fc-3294-4306-b24d-268220995e5b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11728',
  'x-ms-correlation-request-id',
  '8f8e54ec-d72f-430a-834a-a95d68ef863b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072145Z:8f8e54ec-d72f-430a-834a-a95d68ef863b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:51b88aa3-cd81-40d4-ba82-8fe4b0188f8d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11727',
  'x-ms-correlation-request-id',
  '35e6ac3e-584d-4839-a1c8-71cd468716a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072145Z:35e6ac3e-584d-4839-a1c8-71cd468716a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fbaf5c1b-dc62-431e-ad75-e665547a303b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11726',
  'x-ms-correlation-request-id',
  '3c11031f-e960-4c2e-8989-251c4a5bfc89',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072145Z:3c11031f-e960-4c2e-8989-251c4a5bfc89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e29a3f5f-ca0e-4208-b37d-8fd69dd6d4d9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11725',
  'x-ms-correlation-request-id',
  'fe5cddff-9101-459e-a5ae-8c2fc30fe8ff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072145Z:fe5cddff-9101-459e-a5ae-8c2fc30fe8ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9dc9dee8-469b-4ecf-9556-035d18312138',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11724',
  'x-ms-correlation-request-id',
  '49d47319-ccd1-41bc-93d0-6f5c2a885503',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072146Z:49d47319-ccd1-41bc-93d0-6f5c2a885503',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a2f13529-dd2b-40fb-8979-f75b6e056fb1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11723',
  'x-ms-correlation-request-id',
  '9f1a2a39-852e-4b15-8783-b441f4d76a4e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072146Z:9f1a2a39-852e-4b15-8783-b441f4d76a4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:45 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d96c3689-1d8e-4202-9441-5984d53e1129',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11722',
  'x-ms-correlation-request-id',
  '976ee818-cc2d-4d98-b9bb-52f825330ec8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072146Z:976ee818-cc2d-4d98-b9bb-52f825330ec8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c25b8980-ac38-4a83-b44b-d28b1204ce05',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11721',
  'x-ms-correlation-request-id',
  'c9f16db7-d75c-48c4-be9b-baadf5f3857b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072147Z:c9f16db7-d75c-48c4-be9b-baadf5f3857b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:92f6ea3f-d07f-4394-9827-2c160ab73633',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11720',
  'x-ms-correlation-request-id',
  '06ae93d7-4cc2-49e4-9b37-34223a217865',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072147Z:06ae93d7-4cc2-49e4-9b37-34223a217865',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:46 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8d6642d3-8d40-4f2d-960f-f1fdb2afdd08',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11719',
  'x-ms-correlation-request-id',
  '810b6e6c-d94f-4cb1-8471-b7d52aa6dcef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072147Z:810b6e6c-d94f-4cb1-8471-b7d52aa6dcef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5725e63e-9315-4b2b-adf0-72e9b5966795',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11718',
  'x-ms-correlation-request-id',
  '6384ca88-86bc-4ba5-83e9-1537a2a12ba1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072148Z:6384ca88-86bc-4ba5-83e9-1537a2a12ba1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e6dd1784-3455-4d0c-b09e-dc24f72b3076',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11717',
  'x-ms-correlation-request-id',
  '3f0e2e6e-5bdf-40c9-b8b6-daac55740647',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072148Z:3f0e2e6e-5bdf-40c9-b8b6-daac55740647',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:004030bd-30bf-45d5-a2ad-221537efa99d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11716',
  'x-ms-correlation-request-id',
  'b0ee6980-41b5-4f4e-a4ba-e939488b2960',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072149Z:b0ee6980-41b5-4f4e-a4ba-e939488b2960',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:da53a750-4eca-4433-a0e3-b9c92f015e55',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11715',
  'x-ms-correlation-request-id',
  '6dd09d7d-3be0-41b0-8105-f763a77a3fe7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072149Z:6dd09d7d-3be0-41b0-8105-f763a77a3fe7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:40c3c4de-ffc3-4474-a500-cae8489dfcac',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11714',
  'x-ms-correlation-request-id',
  '3b743763-0ec7-4ab4-a50b-6114ddfeefee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072149Z:3b743763-0ec7-4ab4-a50b-6114ddfeefee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:48 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6995364b-5268-4d7b-b51c-784dc1e2850a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11713',
  'x-ms-correlation-request-id',
  '7d5a440f-6a2d-49db-b041-22e6a29db13b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072150Z:7d5a440f-6a2d-49db-b041-22e6a29db13b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ef8e23c9-a496-4a04-8d45-ca45136ba7b2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11712',
  'x-ms-correlation-request-id',
  '8021c02b-a188-46cd-9258-44e3a7da03d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072150Z:8021c02b-a188-46cd-9258-44e3a7da03d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dd39f4d6-d066-4aa3-b8a1-914fc851d564',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11711',
  'x-ms-correlation-request-id',
  '231fb65d-4e3c-4cb7-bda5-abc5b02f03a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072150Z:231fb65d-4e3c-4cb7-bda5-abc5b02f03a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9e12b146-5771-4ee8-9cc5-088a5559c687',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11710',
  'x-ms-correlation-request-id',
  'ab37bdcf-cfd0-4823-9661-90436aca3b36',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072151Z:ab37bdcf-cfd0-4823-9661-90436aca3b36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e30ab37f-c10a-4314-8163-ec4d8e2891ae',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11709',
  'x-ms-correlation-request-id',
  'ae3c07a5-3606-4ef4-9840-56939e1e18b1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072151Z:ae3c07a5-3606-4ef4-9840-56939e1e18b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b3adb04b-039b-4257-a55e-3c1830903a98',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11708',
  'x-ms-correlation-request-id',
  '1cf7b9c3-972f-4abe-94d0-cbc897b8af3c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072151Z:1cf7b9c3-972f-4abe-94d0-cbc897b8af3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:128c995c-6e19-41c7-8e65-7cb2e79a55f5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11707',
  'x-ms-correlation-request-id',
  'cdc5bd0e-2332-44e5-a1d6-52d3b2588541',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072152Z:cdc5bd0e-2332-44e5-a1d6-52d3b2588541',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ec591e0e-885a-46be-9b8c-c2724da6bcd5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11706',
  'x-ms-correlation-request-id',
  'bbada0e4-f1ed-45fa-93d4-f824ae2dd5b7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072152Z:bbada0e4-f1ed-45fa-93d4-f824ae2dd5b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:69181100-b171-4657-9670-aa24d303c46f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11705',
  'x-ms-correlation-request-id',
  'f5e63441-2c63-4937-bab3-ddd3da1b6f83',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072152Z:f5e63441-2c63-4937-bab3-ddd3da1b6f83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4470a07a-85dc-46fe-b65e-f800806076ee',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11704',
  'x-ms-correlation-request-id',
  'f865c121-3475-442e-be71-2d625e42a579',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072152Z:f865c121-3475-442e-be71-2d625e42a579',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f461ea23-cfc3-4cba-a3e3-852ad5f0e00b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11703',
  'x-ms-correlation-request-id',
  'bb5ba86f-3977-4a84-9a31-b7466697d24a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072153Z:bb5ba86f-3977-4a84-9a31-b7466697d24a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ab864430-21a2-4e1c-bfe0-7136391e6e1d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11702',
  'x-ms-correlation-request-id',
  'b5d3fff0-f419-4c2f-b466-4e211bb287da',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072153Z:b5d3fff0-f419-4c2f-b466-4e211bb287da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c3c6f717-5a49-42e8-848d-77c2538f924a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11701',
  'x-ms-correlation-request-id',
  '4a91aa8f-3978-4e06-8efb-976cecce9f8e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072153Z:4a91aa8f-3978-4e06-8efb-976cecce9f8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:52 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8878d112-0b5d-410f-8b50-eaf006181240',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11700',
  'x-ms-correlation-request-id',
  '4bb5c1b3-710a-4498-b155-1c8a40cc3f3f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072154Z:4bb5c1b3-710a-4498-b155-1c8a40cc3f3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:759108e9-1f67-4054-9547-c7943d9589e6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11699',
  'x-ms-correlation-request-id',
  'd04da027-1b70-432b-8e5c-2390539c1363',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072154Z:d04da027-1b70-432b-8e5c-2390539c1363',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7c303636-43cf-4b29-85c9-0057a77a0bf0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11698',
  'x-ms-correlation-request-id',
  '428862a0-241b-4fc0-aa3f-e07f0c89a585',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072154Z:428862a0-241b-4fc0-aa3f-e07f0c89a585',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:53 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:07d7dddc-eec7-4ea5-80cb-f2d39e3c5500',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11697',
  'x-ms-correlation-request-id',
  '713b7507-ba2e-4543-8061-d562cc6f037e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072155Z:713b7507-ba2e-4543-8061-d562cc6f037e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:84195f44-5668-4587-8270-6c86ccefc16b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11696',
  'x-ms-correlation-request-id',
  'cb1f7886-88dc-4728-ab3b-6e6b1256b1e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072155Z:cb1f7886-88dc-4728-ab3b-6e6b1256b1e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e509b767-f71f-4955-bec8-d77a596d464f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11695',
  'x-ms-correlation-request-id',
  '91fcc277-f877-4e69-ba4b-f6ed698b60d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072155Z:91fcc277-f877-4e69-ba4b-f6ed698b60d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:54 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:755ce3d7-4abe-4411-a206-95aa5bda7fb4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11694',
  'x-ms-correlation-request-id',
  'f764292e-3800-4d86-b76a-9da48b8305ba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072155Z:f764292e-3800-4d86-b76a-9da48b8305ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e2655246-5ccf-4176-96c3-fb8c339c3195',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11693',
  'x-ms-correlation-request-id',
  'd2423ef3-93c5-4c25-8083-7280afb2f721',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072156Z:d2423ef3-93c5-4c25-8083-7280afb2f721',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ddb04b7d-1904-4f2f-873a-fd176d7f1a9f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11692',
  'x-ms-correlation-request-id',
  '0bc498c2-282d-420e-906d-dba3bedbcf07',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072156Z:0bc498c2-282d-420e-906d-dba3bedbcf07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:df11ee95-f459-4e76-a3e7-c0fff5d7bb93',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11691',
  'x-ms-correlation-request-id',
  '050e0745-08df-4e7c-911a-d1a59e19e026',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072156Z:050e0745-08df-4e7c-911a-d1a59e19e026',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:55 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ccd91ecd-1ce5-4c7e-a1a3-156ec3e33f1f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11690',
  'x-ms-correlation-request-id',
  '71c7de07-0b2c-483f-89d4-6e0c2b02d8da',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072157Z:71c7de07-0b2c-483f-89d4-6e0c2b02d8da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5afac9a0-b4e9-4683-97d8-48cfe2231c93',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11689',
  'x-ms-correlation-request-id',
  'd3d3e18b-1830-435f-b082-c7c985b1bdc4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072157Z:d3d3e18b-1830-435f-b082-c7c985b1bdc4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:002ef6ba-b080-4e4c-bee0-a7e5729021be',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11688',
  'x-ms-correlation-request-id',
  'fd342b58-23dc-44ef-93fb-feca59ba7c65',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072157Z:fd342b58-23dc-44ef-93fb-feca59ba7c65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:56 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0eed2b4e-9b6a-419f-a2d1-8fecadfc4cbf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11687',
  'x-ms-correlation-request-id',
  '04be3f29-7541-4644-a4af-1a80b1396cda',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072158Z:04be3f29-7541-4644-a4af-1a80b1396cda',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4faeab73-ee80-4340-be1b-cabb54a7799e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11686',
  'x-ms-correlation-request-id',
  '46b33e40-bad4-4c3c-a522-b25b58af37a0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072158Z:46b33e40-bad4-4c3c-a522-b25b58af37a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6f82c0f8-658c-422d-8021-5d76ce274cb9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11685',
  'x-ms-correlation-request-id',
  '43513954-f6cb-49aa-a913-d605be15d029',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072158Z:43513954-f6cb-49aa-a913-d605be15d029',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:57 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2048cc30-c3b9-48f0-8d53-ee687e452980',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11684',
  'x-ms-correlation-request-id',
  'd2f13e9b-f764-4f9a-aa10-7f94ad5c0ad6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072158Z:d2f13e9b-f764-4f9a-aa10-7f94ad5c0ad6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0a7a7f91-8272-438c-b982-7ce0e0a4d62d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11683',
  'x-ms-correlation-request-id',
  'a96e4118-20bd-4a3c-a23a-64ba856126a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072159Z:a96e4118-20bd-4a3c-a23a-64ba856126a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7a4d1960-b347-4fee-9f10-04175a6053d6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11682',
  'x-ms-correlation-request-id',
  '9df72327-479a-41b2-9be1-6c0877c1bbaf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072159Z:9df72327-479a-41b2-9be1-6c0877c1bbaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b178fd2f-b055-4f65-893d-34dfd8ec5e66',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11681',
  'x-ms-correlation-request-id',
  '9612074d-536e-40cd-8035-786addec4474',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072159Z:9612074d-536e-40cd-8035-786addec4474',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:58 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3603794e-15bb-4bf4-8ee4-454e55689a81',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11680',
  'x-ms-correlation-request-id',
  'f8c22d71-f7cd-41f3-aa87-1c413575c552',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072200Z:f8c22d71-f7cd-41f3-aa87-1c413575c552',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:72bf3589-e05f-494c-b469-7093f57ebb77',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11679',
  'x-ms-correlation-request-id',
  '549ea24a-fa3d-4d3c-bc40-b2589e489199',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072200Z:549ea24a-fa3d-4d3c-bc40-b2589e489199',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:03429031-1253-4c98-9afc-8a289f83d300',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11678',
  'x-ms-correlation-request-id',
  '740c3eaa-533c-4fab-913a-ce388bd82c14',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072200Z:740c3eaa-533c-4fab-913a-ce388bd82c14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:21:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:07a7e71a-d3c2-482a-a917-59c1539bfbd0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11677',
  'x-ms-correlation-request-id',
  'fc2b11a0-2746-4a62-b068-54cc8026e33f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072201Z:fc2b11a0-2746-4a62-b068-54cc8026e33f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3c04805d-06ff-4763-a3a7-499d31480e59',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11676',
  'x-ms-correlation-request-id',
  '102efcbc-3f1c-4e22-842b-b9f3cd795d4a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072201Z:102efcbc-3f1c-4e22-842b-b9f3cd795d4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e65ed2c1-1694-4196-ad77-cdf28e0a5399',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11675',
  'x-ms-correlation-request-id',
  'a30c9638-1678-4da2-9d52-b512ccea6b1d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072201Z:a30c9638-1678-4da2-9d52-b512ccea6b1d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:0b7a25a7-d4f3-4783-ac57-f4c152959eb5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11674',
  'x-ms-correlation-request-id',
  'e82b0270-e1f1-4e1f-86bb-895290a3268a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072201Z:e82b0270-e1f1-4e1f-86bb-895290a3268a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:00 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3c47a134-cd34-429a-a709-c4ceb4c8077b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11673',
  'x-ms-correlation-request-id',
  '4f481b4d-2511-4784-a081-4c7a1c72e81d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072202Z:4f481b4d-2511-4784-a081-4c7a1c72e81d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:44804b01-cd7e-4ca4-80ad-37fcb13cafa3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11672',
  'x-ms-correlation-request-id',
  'c552c8f2-fee1-4ca5-8960-d37ea3d0a360',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072202Z:c552c8f2-fee1-4ca5-8960-d37ea3d0a360',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:623d0e5b-928e-4b01-9381-222b4749b7f7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11671',
  'x-ms-correlation-request-id',
  '1712be79-8630-4db1-b7a1-e70555642ad3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072202Z:1712be79-8630-4db1-b7a1-e70555642ad3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:01 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8880560f-f23a-495a-bbbb-9dd2d2a3da21',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11670',
  'x-ms-correlation-request-id',
  'e81c6da5-8bc1-49e4-8949-7a90c6e2b519',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072203Z:e81c6da5-8bc1-49e4-8949-7a90c6e2b519',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e449df0b-3059-4b0e-8294-7e74c0c40add',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11669',
  'x-ms-correlation-request-id',
  'e109840b-8716-40ab-89bf-6da23233b5b9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072203Z:e109840b-8716-40ab-89bf-6da23233b5b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:56653809-e995-41cc-909a-0cc94f103556',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11668',
  'x-ms-correlation-request-id',
  '63c273e0-95e9-4132-b701-127c666f78e1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072203Z:63c273e0-95e9-4132-b701-127c666f78e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:527f701a-6a10-4b1b-8e63-8e5692552104',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11667',
  'x-ms-correlation-request-id',
  '2cb37ed2-b7f4-4e12-94bb-541fd4b35042',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072204Z:2cb37ed2-b7f4-4e12-94bb-541fd4b35042',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7080123c-f6e4-450e-9692-8857a9875700',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11666',
  'x-ms-correlation-request-id',
  '0abc5783-3463-49bc-8276-b27c9af97ba3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072204Z:0abc5783-3463-49bc-8276-b27c9af97ba3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b9f1740a-fdee-4518-b228-b80d25070e04',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11665',
  'x-ms-correlation-request-id',
  '13a00aa1-bb85-4770-9f8b-2022fb3fc592',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072204Z:13a00aa1-bb85-4770-9f8b-2022fb3fc592',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e71fdaa2-d2c7-4805-a8e3-319c280ca830',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11664',
  'x-ms-correlation-request-id',
  '96c6a052-7780-4790-8fd7-9045fc4ac911',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072205Z:96c6a052-7780-4790-8fd7-9045fc4ac911',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:244b1257-03b9-47df-ab37-f4e16df533b5',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11663',
  'x-ms-correlation-request-id',
  'c762a085-879d-43cd-a5c8-2efcac28e8c4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072205Z:c762a085-879d-43cd-a5c8-2efcac28e8c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:29d78e78-3e2c-4cdd-b450-5f578e83016d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11662',
  'x-ms-correlation-request-id',
  '297af7d4-9992-4677-bc3e-db1108d53ca4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072205Z:297af7d4-9992-4677-bc3e-db1108d53ca4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e21ff394-5ffd-44f8-a88b-e86a7e66726d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11661',
  'x-ms-correlation-request-id',
  'e6afc134-4a8b-400b-b80d-bcbc2c2fdee3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072205Z:e6afc134-4a8b-400b-b80d-bcbc2c2fdee3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1e3ff5ba-f464-448f-a2d9-583e16b04466',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11660',
  'x-ms-correlation-request-id',
  '7b4e2f75-dee8-4dc6-923a-ec763cb09758',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072206Z:7b4e2f75-dee8-4dc6-923a-ec763cb09758',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5ac627ef-b74f-4c26-8f7e-470cff163794',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11659',
  'x-ms-correlation-request-id',
  '0cf2ff9e-485b-46c6-8bf2-3edae536dd73',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072206Z:0cf2ff9e-485b-46c6-8bf2-3edae536dd73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:32a29263-af2f-45c0-bfd0-0ba3d6675c94',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11658',
  'x-ms-correlation-request-id',
  'caf0b647-7aed-4749-92e6-65a317f61d86',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072206Z:caf0b647-7aed-4749-92e6-65a317f61d86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3ddab673-606c-43ec-a1c4-e7380dd19943',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11657',
  'x-ms-correlation-request-id',
  '6c3f09e5-33d8-4f05-bb23-d94d327ead01',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072207Z:6c3f09e5-33d8-4f05-bb23-d94d327ead01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:cdae008c-9869-45a3-b24f-2161c51f9fe3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11656',
  'x-ms-correlation-request-id',
  '97b6705f-e960-4112-9cdc-afa6367ead20',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072207Z:97b6705f-e960-4112-9cdc-afa6367ead20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5645ca86-7949-4021-a76a-766db3d94e03',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11655',
  'x-ms-correlation-request-id',
  '6ebda406-c198-495d-b280-28a36f0b334d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072207Z:6ebda406-c198-495d-b280-28a36f0b334d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:07 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2f987a9e-7f31-484b-a603-8d7a54c5311a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11654',
  'x-ms-correlation-request-id',
  'f8aa5e41-6f97-4e58-aa17-01abc70b68cc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072208Z:f8aa5e41-6f97-4e58-aa17-01abc70b68cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:09248655-5d9e-468d-9cbb-ee87fe5ceec4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11653',
  'x-ms-correlation-request-id',
  'e9d56459-b40f-413c-b284-398de5f78b43',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072208Z:e9d56459-b40f-413c-b284-398de5f78b43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:beab439f-b0a2-41f2-967a-c9785bb91a25',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11652',
  'x-ms-correlation-request-id',
  '71775657-1002-4aed-b2da-ecabb2f42485',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072208Z:71775657-1002-4aed-b2da-ecabb2f42485',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:3ca53f56-7090-4a74-9dfe-eed37cd2f55a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11651',
  'x-ms-correlation-request-id',
  'f01b7de5-5b21-4d77-9e36-6640bcad110c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072208Z:f01b7de5-5b21-4d77-9e36-6640bcad110c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:08 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6c863956-31eb-4bce-9ec7-714b90e56a17',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11650',
  'x-ms-correlation-request-id',
  '6ac329e1-cc00-4efd-9b67-a084684260a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072209Z:6ac329e1-cc00-4efd-9b67-a084684260a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:79917e41-7c7a-4333-92e5-90aa02531aad',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11649',
  'x-ms-correlation-request-id',
  '5196d69a-df8f-4267-a3fe-002582cca59a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072209Z:5196d69a-df8f-4267-a3fe-002582cca59a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c8dc01c1-19f2-4095-ad50-6e393c981a2b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11648',
  'x-ms-correlation-request-id',
  'a33a611a-b08e-416b-9f78-966811b9d263',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072209Z:a33a611a-b08e-416b-9f78-966811b9d263',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:82350ed5-a2b5-432d-a61f-bd5c3244fea1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11647',
  'x-ms-correlation-request-id',
  '0a9c3966-a809-4e46-befa-a5099f6e6d99',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072210Z:0a9c3966-a809-4e46-befa-a5099f6e6d99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d1bf9877-f41a-45a5-8369-297d7a4121fb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11646',
  'x-ms-correlation-request-id',
  'dd40fd03-d07b-4d52-95cd-247fdac5bd11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072210Z:dd40fd03-d07b-4d52-95cd-247fdac5bd11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:53f5ab2d-029a-49eb-b5fc-6225125f1793',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11645',
  'x-ms-correlation-request-id',
  '99676dc4-1e2b-4579-963e-bfe1a825983e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072210Z:99676dc4-1e2b-4579-963e-bfe1a825983e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:83a4b93d-3500-4919-9c8b-f7bc7bc71f6e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11644',
  'x-ms-correlation-request-id',
  '4e3f2056-73bb-49cb-a520-aff21de839af',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072210Z:4e3f2056-73bb-49cb-a520-aff21de839af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:10 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4613f772-7564-4eb9-b53a-0c5bc0f58008',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11643',
  'x-ms-correlation-request-id',
  'c8b97807-eb5f-45a6-a432-38960162d577',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072211Z:c8b97807-eb5f-45a6-a432-38960162d577',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:282d765f-ad6b-4fd7-b966-ae233d37003b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11642',
  'x-ms-correlation-request-id',
  '13eb46c3-fb5c-427a-b2f9-41c351690a26',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072211Z:13eb46c3-fb5c-427a-b2f9-41c351690a26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:747cf778-e65d-41b9-9994-ffed774decc1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11641',
  'x-ms-correlation-request-id',
  'e9925836-8987-4134-b5e7-537c0be5a8bc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072211Z:e9925836-8987-4134-b5e7-537c0be5a8bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4cda5a9d-1953-4088-b754-a8999edf59c6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11640',
  'x-ms-correlation-request-id',
  '81db1d5c-1aaf-410a-ad8e-ce3ff4dca616',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072212Z:81db1d5c-1aaf-410a-ad8e-ce3ff4dca616',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d67d75db-4e29-4a14-9c38-110d394cef83',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11639',
  'x-ms-correlation-request-id',
  'f96d0425-121a-4f49-a8e5-7dcbd69a4a1e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072212Z:f96d0425-121a-4f49-a8e5-7dcbd69a4a1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:61871b56-9178-461f-93b2-c81f8a982001',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11638',
  'x-ms-correlation-request-id',
  'c6bbb119-dd04-498d-92a8-7a3ce352832b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072212Z:c6bbb119-dd04-498d-92a8-7a3ce352832b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:12 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e2c090e2-8b65-4540-91d7-389d2e8caf8b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11637',
  'x-ms-correlation-request-id',
  '62ab1e72-760f-48b9-a154-8fae79708e47',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072213Z:62ab1e72-760f-48b9-a154-8fae79708e47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4116a575-e648-41a6-9950-8cdaa00f7838',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11636',
  'x-ms-correlation-request-id',
  'd7a57009-de5a-42eb-946f-65d9f8894ab2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072213Z:d7a57009-de5a-42eb-946f-65d9f8894ab2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:1ac9d7e1-54e6-4742-9e9f-cd80ddd6e709',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11635',
  'x-ms-correlation-request-id',
  '9bf8df78-1471-40bb-8b5f-cb9ac77606a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072213Z:9bf8df78-1471-40bb-8b5f-cb9ac77606a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:64953a61-0983-4b12-a993-80e14964ac19',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11634',
  'x-ms-correlation-request-id',
  'c3c46db1-2f5c-45b8-bd3c-66c683860b4b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072214Z:c3c46db1-2f5c-45b8-bd3c-66c683860b4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d088032a-3a88-4f32-836d-81ef6dc602c4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11633',
  'x-ms-correlation-request-id',
  '3d995514-4c8c-4f09-85d3-0b7ee87013ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072214Z:3d995514-4c8c-4f09-85d3-0b7ee87013ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:08f20700-100c-41f6-b26f-5f06f6e75d75',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11632',
  'x-ms-correlation-request-id',
  'caf67864-c6e3-4eb7-81af-d881c9a9ae20',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072214Z:caf67864-c6e3-4eb7-81af-d881c9a9ae20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:889a0d31-26c1-4966-8582-ce48119b4ffe',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11631',
  'x-ms-correlation-request-id',
  '2d5a5382-224c-4bc6-879f-a92b1fc6e597',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072214Z:2d5a5382-224c-4bc6-879f-a92b1fc6e597',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:14 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:617d972f-bfd6-486c-bee2-d0e909a8eebf',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11630',
  'x-ms-correlation-request-id',
  '6610e80f-93b0-413a-955e-4e99854ba9ae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072215Z:6610e80f-93b0-413a-955e-4e99854ba9ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9258029c-9bc0-4d8d-8c30-affb18c2568e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11629',
  'x-ms-correlation-request-id',
  '7bf842cc-6f7f-46dc-91a8-98e191999fa1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072215Z:7bf842cc-6f7f-46dc-91a8-98e191999fa1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f9d31e67-4975-4530-a899-8436340fea63',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11628',
  'x-ms-correlation-request-id',
  'ca9d20bb-23ac-4214-b313-774f29e30457',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072215Z:ca9d20bb-23ac-4214-b313-774f29e30457',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:15 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bd304dd7-a4b3-4c35-a971-6e55cbd0d55e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11627',
  'x-ms-correlation-request-id',
  'fdb8d169-344c-42fd-8ae7-d8ee49a8baa8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072216Z:fdb8d169-344c-42fd-8ae7-d8ee49a8baa8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:eb15ff0a-9539-4b8d-8588-9bc412060cbc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11626',
  'x-ms-correlation-request-id',
  'd53d8624-cc82-4122-a2e8-0f94f51d450b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072216Z:d53d8624-cc82-4122-a2e8-0f94f51d450b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:6b11af32-957a-46f6-b7a1-dc676ea6d986',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11625',
  'x-ms-correlation-request-id',
  '33540e60-ca5a-47d6-b44e-49f26179e8da',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072216Z:33540e60-ca5a-47d6-b44e-49f26179e8da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:76929150-4476-4c03-89e3-09311434105c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11624',
  'x-ms-correlation-request-id',
  '4136b54c-0c74-4105-9dfd-5eca43552bb6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072217Z:4136b54c-0c74-4105-9dfd-5eca43552bb6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:74161b6d-0ded-4b29-94d1-f9917abcaf0a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11623',
  'x-ms-correlation-request-id',
  'd68ae1d9-199e-4c82-9563-30df8afb7a5e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072217Z:d68ae1d9-199e-4c82-9563-30df8afb7a5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:5de4df4e-cfcf-4b59-9622-db28bbc4efc6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11622',
  'x-ms-correlation-request-id',
  'f63f5f6c-c494-4c59-81a3-7cb67551ed38',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072217Z:f63f5f6c-c494-4c59-81a3-7cb67551ed38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:17 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a6f94c2f-781e-438e-b26e-e92ee88620ef',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11621',
  'x-ms-correlation-request-id',
  'e2c6e6b2-6e51-482f-9ff8-ed94d1faef68',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072218Z:e2c6e6b2-6e51-482f-9ff8-ed94d1faef68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:17503f7f-3ef1-4619-9da5-f662312083a3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11620',
  'x-ms-correlation-request-id',
  '31ba7e84-2221-4a70-aa9a-b89296bd0ae8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072218Z:31ba7e84-2221-4a70-aa9a-b89296bd0ae8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b6ea514f-3573-4b38-8d8a-8320171bacb7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11619',
  'x-ms-correlation-request-id',
  'db8afe34-fad0-4e5b-b888-b26fe68c5239',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072218Z:db8afe34-fad0-4e5b-b888-b26fe68c5239',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8c2dcec6-d8eb-41ad-a541-5d69c9880659',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11618',
  'x-ms-correlation-request-id',
  'e545469e-535c-497c-ae8c-8ba03c6b720c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072218Z:e545469e-535c-497c-ae8c-8ba03c6b720c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fce260d6-3dbf-436e-bc7c-5201312600ad',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11617',
  'x-ms-correlation-request-id',
  '5c9ad251-8bfb-4b8b-af91-92293a2775ba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072219Z:5c9ad251-8bfb-4b8b-af91-92293a2775ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:33d2c0cc-0309-49e9-bfbd-b04c380d4c9c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11616',
  'x-ms-correlation-request-id',
  '2f136d21-9095-4da2-97f4-769e979fe17a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072219Z:2f136d21-9095-4da2-97f4-769e979fe17a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b861ba74-fb83-4ceb-a0ac-f3a28a32b456',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11615',
  'x-ms-correlation-request-id',
  'a30f10d7-4d1a-4786-b997-e243db278cd1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072219Z:a30f10d7-4d1a-4786-b997-e243db278cd1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:19 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e90df192-ce8d-4aa7-8e53-94cdf89dd018',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11614',
  'x-ms-correlation-request-id',
  'c569b5bb-bd1c-4d3b-b3e8-02a408cada3a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072220Z:c569b5bb-bd1c-4d3b-b3e8-02a408cada3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ddaf9844-deec-46a3-98ae-9f9106dfc041',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11613',
  'x-ms-correlation-request-id',
  'fb13d50b-002b-4330-a0d5-cfe9e78d3ce5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072220Z:fb13d50b-002b-4330-a0d5-cfe9e78d3ce5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:42d4ef90-b7ab-48a7-a4ad-49b988bbf140',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11612',
  'x-ms-correlation-request-id',
  '89e676ac-f922-4834-8516-487478bb5053',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072220Z:89e676ac-f922-4834-8516-487478bb5053',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:de4750ca-f9a4-493a-b22a-817aec67e725',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11611',
  'x-ms-correlation-request-id',
  'a969a884-b848-4ffd-b94d-b3ace553c725',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072221Z:a969a884-b848-4ffd-b94d-b3ace553c725',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a7afbcc2-d6de-4bda-900c-e0db8a911b0c',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11610',
  'x-ms-correlation-request-id',
  'ea2f65bb-8cf8-4542-bc93-16645de71015',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072221Z:ea2f65bb-8cf8-4542-bc93-16645de71015',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d6c9220b-e873-4bef-8f07-47674dcab93d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11609',
  'x-ms-correlation-request-id',
  '6e914390-fab0-42e6-95c9-6a4424d79e52',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072221Z:6e914390-fab0-42e6-95c9-6a4424d79e52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:308f0302-b855-44a2-9fbc-230e90817da2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11608',
  'x-ms-correlation-request-id',
  '26f135a7-0be9-4d92-8ff7-64180390ac77',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072222Z:26f135a7-0be9-4d92-8ff7-64180390ac77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:822718ac-d002-4d9b-96fc-504cda8dac3a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11607',
  'x-ms-correlation-request-id',
  '40bdda22-579b-4045-ae0d-d419d72c25f4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072222Z:40bdda22-579b-4045-ae0d-d419d72c25f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:301ea049-c7ce-4be5-874f-b327e5285b14',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11606',
  'x-ms-correlation-request-id',
  '0696800d-c161-4eb6-9a4d-c6a5bb117aba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072222Z:0696800d-c161-4eb6-9a4d-c6a5bb117aba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e65ea987-7b4d-41da-a8c2-c4897f25b692',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11605',
  'x-ms-correlation-request-id',
  '33d221d7-5980-4400-8341-9615263115eb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072222Z:33d221d7-5980-4400-8341-9615263115eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2ae1d59f-3450-464f-b841-0055598cdb34',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11604',
  'x-ms-correlation-request-id',
  '4cf2b691-67a6-4ba2-92f9-691a6619de13',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072223Z:4cf2b691-67a6-4ba2-92f9-691a6619de13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:c3ef53cd-0bbc-48a8-9812-30ada49c0d01',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11603',
  'x-ms-correlation-request-id',
  '73fc7f7c-fc84-449b-9ba2-c0277d7beebd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072223Z:73fc7f7c-fc84-449b-9ba2-c0277d7beebd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:845567e7-0a12-4755-913e-2c7282c1d01b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11602',
  'x-ms-correlation-request-id',
  '02628c17-dbfe-43c8-b1eb-0b679182cb2e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072223Z:02628c17-dbfe-43c8-b1eb-0b679182cb2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:85db17ed-dee0-4660-aa73-f2c2fe51bf72',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11601',
  'x-ms-correlation-request-id',
  '0a9de00c-dfae-4bba-a74f-93e89fd978ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072224Z:0a9de00c-dfae-4bba-a74f-93e89fd978ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d6c6762d-f743-4292-9996-d0addc35b8ce',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11600',
  'x-ms-correlation-request-id',
  'a6f295b8-7483-4779-a4b3-4acab94e5548',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072224Z:a6f295b8-7483-4779-a4b3-4acab94e5548',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:21163b59-1523-448f-a7a2-f93e126a441b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11599',
  'x-ms-correlation-request-id',
  'ac7da63a-f8ba-4872-97c7-3978bf3e1e21',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072224Z:ac7da63a-f8ba-4872-97c7-3978bf3e1e21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f398c03f-707f-4f53-b023-16f4c5bdce5f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11598',
  'x-ms-correlation-request-id',
  '8a3b858e-bc07-4b93-896a-7b643346098d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072224Z:8a3b858e-bc07-4b93-896a-7b643346098d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:24 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e4ba80b5-8853-472c-8f01-e9a05ea757e1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11597',
  'x-ms-correlation-request-id',
  '9af56bea-70a6-4c53-b0ec-5a5f8444e639',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072225Z:9af56bea-70a6-4c53-b0ec-5a5f8444e639',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:dc18fbc4-3cba-480e-857d-b7af042791da',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11596',
  'x-ms-correlation-request-id',
  '6d5d8d2d-3cb3-4a78-8729-21cc182e80e9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072225Z:6d5d8d2d-3cb3-4a78-8729-21cc182e80e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a53c4a87-d5ef-4a0e-952a-9000628b7c25',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11595',
  'x-ms-correlation-request-id',
  'edbb7a63-a800-4b17-a80b-69e47156e328',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072225Z:edbb7a63-a800-4b17-a80b-69e47156e328',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a4a68500-bd1a-4162-9816-2ec9eeb92131',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11594',
  'x-ms-correlation-request-id',
  'f7a33222-c51c-4d9f-80b6-7443da35764b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072226Z:f7a33222-c51c-4d9f-80b6-7443da35764b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:aeb6dada-3e30-4cc0-b534-f7533ebd6e2b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11593',
  'x-ms-correlation-request-id',
  '12127240-8717-481d-a4da-b34fb6d8d9c0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072226Z:12127240-8717-481d-a4da-b34fb6d8d9c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:ece5fcef-5ceb-4ecc-b8dc-c0cb100fa0a9',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11592',
  'x-ms-correlation-request-id',
  'd04591a3-df3e-447e-8f27-effe6ebd3a98',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072226Z:d04591a3-df3e-447e-8f27-effe6ebd3a98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2f29ce94-a4b7-4bc4-88da-e6f56ad4fad2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11591',
  'x-ms-correlation-request-id',
  'b25c4be2-d5cc-40e6-8d79-b3e3117bfb11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072227Z:b25c4be2-d5cc-40e6-8d79-b3e3117bfb11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:681a4328-bbe1-4948-9014-8a29acbd9bdc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11590',
  'x-ms-correlation-request-id',
  '5aa93463-7111-4ac0-908e-d1fbd9a2ecf0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072227Z:5aa93463-7111-4ac0-908e-d1fbd9a2ecf0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:638b2731-b8f8-44ae-b58b-b75741d62c42',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11589',
  'x-ms-correlation-request-id',
  '47a00f77-89c9-468f-91c0-0433a255db52',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072227Z:47a00f77-89c9-468f-91c0-0433a255db52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:24902345-8d1a-47ce-a51f-8f4a45946f73',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11588',
  'x-ms-correlation-request-id',
  '4ca59646-fa3e-4e30-9108-95ed48b0674e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072227Z:4ca59646-fa3e-4e30-9108-95ed48b0674e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:03ad2a42-2da0-4384-b66c-45274da5345d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11587',
  'x-ms-correlation-request-id',
  'e8e826a7-4f66-4ebf-8450-280fec4bb956',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072228Z:e8e826a7-4f66-4ebf-8450-280fec4bb956',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:a7ad5c45-f0e1-430b-aaf1-1c2adea70fa8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11586',
  'x-ms-correlation-request-id',
  'bf0779e1-202f-479e-bb84-aa499e1995af',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072228Z:bf0779e1-202f-479e-bb84-aa499e1995af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:60b5778e-ecb7-4ec4-a362-e8a411b19051',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11585',
  'x-ms-correlation-request-id',
  '780ae633-3d4e-47dc-bb8b-0ba3acef44bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072228Z:780ae633-3d4e-47dc-bb8b-0ba3acef44bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:b1a7f358-8600-4209-ae98-0553f90af687',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11584',
  'x-ms-correlation-request-id',
  'caebc99d-222f-4fdc-a750-4e933c392df4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072229Z:caebc99d-222f-4fdc-a750-4e933c392df4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:996ab4af-1de4-4b22-811a-de54dbf74407',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11583',
  'x-ms-correlation-request-id',
  '4d8cc213-3fb3-4cd2-8efc-839c78797339',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072229Z:4d8cc213-3fb3-4cd2-8efc-839c78797339',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:84387fe6-e546-40a9-a54a-30e532f2a693',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11582',
  'x-ms-correlation-request-id',
  'b4f9fb2f-12be-4f2e-9c70-489affa61169',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072229Z:b4f9fb2f-12be-4f2e-9c70-489affa61169',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7860db36-3693-439d-b01b-3c6f928aa708',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11581',
  'x-ms-correlation-request-id',
  '6f60ce34-4efb-43ff-afe6-469958862dbd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072230Z:6f60ce34-4efb-43ff-afe6-469958862dbd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:29 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:2b71475c-fbdc-4a34-8c35-6865e98e000e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11580',
  'x-ms-correlation-request-id',
  '45e09437-994b-4f05-85d1-4d2f7a346a99',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072230Z:45e09437-994b-4f05-85d1-4d2f7a346a99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:bbf9d0f5-65d4-4bb1-b2b2-4cb0355716e4',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11579',
  'x-ms-correlation-request-id',
  '7eb149e8-a9f2-4ed2-8bdf-59ff92b24b9e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072230Z:7eb149e8-a9f2-4ed2-8bdf-59ff92b24b9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:51632392-ec95-4db7-ae13-e44458103fcc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11578',
  'x-ms-correlation-request-id',
  '450c893a-a5ee-4895-b96a-ce41131a1449',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072230Z:450c893a-a5ee-4895-b96a-ce41131a1449',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:be21adc8-ddb2-43f1-98e6-ab282ac251d7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11577',
  'x-ms-correlation-request-id',
  '9fd09116-f7db-4e16-b46d-85f84fb97265',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072231Z:9fd09116-f7db-4e16-b46d-85f84fb97265',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f816ec7f-e5b4-4457-b98c-abed038845ac',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11576',
  'x-ms-correlation-request-id',
  'bd9f04f8-3da1-44d9-907e-77baec07e811',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072231Z:bd9f04f8-3da1-44d9-907e-77baec07e811',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:27fdfd6f-fb8f-4d85-9955-d7ae9508e13e',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11575',
  'x-ms-correlation-request-id',
  '80c8ac88-1aee-407b-b07d-49eabb6d96cd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072231Z:80c8ac88-1aee-407b-b07d-49eabb6d96cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:f740671f-5bcf-4d0e-b124-4311e78aab9a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11574',
  'x-ms-correlation-request-id',
  'd851b317-385a-4180-bfb1-5fa61b2be953',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072232Z:d851b317-385a-4180-bfb1-5fa61b2be953',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:18a8a068-e510-4a9c-b0ce-0e3a5d117eb8',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11573',
  'x-ms-correlation-request-id',
  '30987d58-1fe1-41ef-8fe8-393be26ada57',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072232Z:30987d58-1fe1-41ef-8fe8-393be26ada57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:16fbf2ba-a628-414c-b911-1c8a2e3dbd33',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11572',
  'x-ms-correlation-request-id',
  '73ffdfb3-32f8-4215-9dd4-56817cdd7c13',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072232Z:73ffdfb3-32f8-4215-9dd4-56817cdd7c13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:61e961be-1e2e-452f-8f53-a09d455d9e85',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11571',
  'x-ms-correlation-request-id',
  '34ff0d39-f570-4763-a325-1f1f0a1fedc3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072232Z:34ff0d39-f570-4763-a325-1f1f0a1fedc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4e978976-0108-4fbf-9026-980db5119e15',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11570',
  'x-ms-correlation-request-id',
  '0066aa74-7bb8-420a-b862-0604ca6a9e1b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072233Z:0066aa74-7bb8-420a-b862-0604ca6a9e1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:9139955a-8fdd-4f1d-9b8d-ee547bbbf06a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11569',
  'x-ms-correlation-request-id',
  '3d8c5510-f545-49b3-9fc5-7609626a252e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072233Z:3d8c5510-f545-49b3-9fc5-7609626a252e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:4b20e47a-3174-4383-b630-114fcc3d42dd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11568',
  'x-ms-correlation-request-id',
  '3b9f577c-c7fb-4302-a241-7fa0b26e4627',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072233Z:3b9f577c-c7fb-4302-a241-7fa0b26e4627',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8d58a653-c473-4866-ae54-ede041685647',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11567',
  'x-ms-correlation-request-id',
  '47f5d3c6-6d29-4056-8245-0410412335e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072234Z:47f5d3c6-6d29-4056-8245-0410412335e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:8a50fc6c-778a-4ac4-a4f7-d5907442c5a7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11566',
  'x-ms-correlation-request-id',
  'a3ebdf6e-f05d-4a99-a427-23ef8cf298fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072234Z:a3ebdf6e-f05d-4a99-a427-23ef8cf298fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:432099a4-9f95-413b-9ccc-e163ea964266',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11565',
  'x-ms-correlation-request-id',
  'dc064f02-b59e-4826-aeb3-fa5baf09ed59',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072234Z:dc064f02-b59e-4826-aeb3-fa5baf09ed59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:e3b27d7f-bff5-4e43-95cb-610a70e115e7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11564',
  'x-ms-correlation-request-id',
  '3c1174f5-2e3f-402b-b8a8-bfd8587c67eb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072235Z:3c1174f5-2e3f-402b-b8a8-bfd8587c67eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:96f2271c-6dd0-46b2-a600-82010909564a',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11563',
  'x-ms-correlation-request-id',
  'd67e2c24-41ee-4d62-aabc-37b75febb914',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072235Z:d67e2c24-41ee-4d62-aabc-37b75febb914',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:22a970c3-6d13-4c15-9b41-0c1649bbc6f0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11562',
  'x-ms-correlation-request-id',
  '4cfb2a87-3254-40e5-8d26-c3e32491f114',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072235Z:4cfb2a87-3254-40e5-8d26-c3e32491f114',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d4684310-123b-47a0-9b25-4766260da1c7',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11561',
  'x-ms-correlation-request-id',
  'dc6bc28e-4204-4ca5-b212-d812ded90a88',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072235Z:dc6bc28e-4204-4ca5-b212-d812ded90a88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:697ad314-5f93-45dc-975d-6c9bdb6cc1bd',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11560',
  'x-ms-correlation-request-id',
  '3b609d13-c66e-4af5-8abb-d74008293b1f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072236Z:3b609d13-c66e-4af5-8abb-d74008293b1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:35 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:56818002-24f1-4afc-8c71-7c514640dca1',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11559',
  'x-ms-correlation-request-id',
  '6f13844c-d70d-4e04-bacb-fd4056177fc2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072236Z:6f13844c-d70d-4e04-bacb-fd4056177fc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:06166205-42f4-425b-8837-f4ec8a138c11',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11558',
  'x-ms-correlation-request-id',
  '18bb3601-de6d-45f0-ab81-c6d665de384c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072236Z:18bb3601-de6d-45f0-ab81-c6d665de384c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:616f1276-c295-454f-8045-cb4f5e0ab7b2',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11557',
  'x-ms-correlation-request-id',
  '224137a2-5712-41b5-8e2e-b37093413a77',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072237Z:224137a2-5712-41b5-8e2e-b37093413a77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:36 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7a210124-72e8-4065-af79-1030e5bab406',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11556',
  'x-ms-correlation-request-id',
  '446cca1c-ab62-4647-b3cb-a39de2754b00',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072237Z:446cca1c-ab62-4647-b3cb-a39de2754b00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d86259cf-10eb-4705-8962-7085649ca818',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11555',
  'x-ms-correlation-request-id',
  '4a136003-96ba-4c4d-8ead-73c0cec96b24',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072237Z:4a136003-96ba-4c4d-8ead-73c0cec96b24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:d5973899-1fcf-4b24-a419-b2620ce8b0ea',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11554',
  'x-ms-correlation-request-id',
  '620b3efb-b148-4113-9b6a-3a25e5fc347c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072237Z:620b3efb-b148-4113-9b6a-3a25e5fc347c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:83bd6d0e-7f92-4c3c-92ae-d105a55ea6a0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11553',
  'x-ms-correlation-request-id',
  '77fb6271-eea8-4785-ae52-3c8785e3a660',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072238Z:77fb6271-eea8-4785-ae52-3c8785e3a660',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:fad2011c-5f64-4944-b3d1-9f7cf59983f6',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11552',
  'x-ms-correlation-request-id',
  '25586647-ad9c-4327-becf-b64d1cdf5ce1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072238Z:25586647-ad9c-4327-becf-b64d1cdf5ce1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:399a84da-9375-40e8-8f20-8a7f53b6a655',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11551',
  'x-ms-correlation-request-id',
  'ea32575d-35b7-4ab2-bb81-301213e58e35',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072238Z:ea32575d-35b7-4ab2-bb81-301213e58e35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:72e567b0-cefc-433c-a3ef-a186b892df8b',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11550',
  'x-ms-correlation-request-id',
  'f1c43be8-b15d-4876-9bb4-a3cdbc507c0b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072239Z:f1c43be8-b15d-4876-9bb4-a3cdbc507c0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9')
  .query(true)
  .reply(202, {"status":"Accepted"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/locations/westus/operationStatuses/eyJmdWxseVF1YWxpZmllZEFwcGxpYW5jZUlkIjoiL3N1YnNjcmlwdGlvbnMvOTJmOTVkOGYtM2M2Ny00MTI0LTkxYzctOGNmMDdjZGJmMjQxL3Jlc291cmNlR3JvdXBzL215anN0ZXN0L3Byb3ZpZGVycy9NaWNyb3NvZnQuRGF0YWJyaWNrcy93b3Jrc3BhY2VzL215d29ya3NwYWNleHgiLCJqb2JJZCI6IkFwcGxpYW5jZVByb3Zpc2lvbmluZ0pvYjoyRFJHQToyRE1ZSlNURVNUOjJETVlXT1JLU1BBQ0VYWCJ9?api-version=2021-04-01-preview',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'westus:7b3ab94b-01ba-4745-83bf-39406d429ab3',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11549',
  'x-ms-correlation-request-id',
  'ca1ecef6-e163-4f62-a109-27ea179b9963',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072239Z:ca1ecef6-e163-4f62-a109-27ea179b9963',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:39 GMT'
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
  'westus:bb9c3d1d-a71a-4d15-815e-73a11a35a83d',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11548',
  'x-ms-correlation-request-id',
  'dff342c3-18b2-4444-a54c-74ab0681804f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072239Z:dff342c3-18b2-4444-a54c-74ab0681804f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/workspaces/myworkspacexx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478f7ef1478b6c995de4b3577953adeb69fe795dad5767b38f1e7d74b7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7f6a1347717d73fddb479d3ee7d34fa6895d5d9226ff39a7bcd97d9a4cc9f51bfd96275026cce8b69869ef06d7bbdca0983275555d29b9759b9a63fcfb3b2c97fc9485f7d51bd5c4fca627ab6baf18565d67e9eb5f95576fd225bd0e7b6f9ebb62e9617ee05b4dcbe90a61fd18bab3a27acf3d3e5b4be662a78efc6bb5a294eb7eae86a5b9a6f172bf456e7a560d8acb2698e5f3641984db87d4624beba9f5f4ef3ea6a4fa0fca27551e767cbf33a6bda7a3d6dd7ef350233836fb20b9e286dfce5e4a7f369eb9affe28fb2d58a70d729fb6896b5d9a42ea66f1b6ae3fed8ce9797455d2d17f9b2a556844ffed12fa15e9ab6aa89eb8ea7d36abd6c6f1eabb6ef8d563f5738afdfae6f02f5bacd96b3ac9efdfe9fbf7a0d0097cbbc3d9ecd68d4cdcb3a3f2fde6d7a797767bc7bef210f8064e8b26868ecd48260b6f8faf57a3acdf3593ea357b2753bafeae2074c1f22e4f72076c5725aacb292a5eb61f6603f3bfff47c7bb67bffdef6febdfd83ed870707d976bef7e983bd877b3b933c7f4870eaaacc9f125ecb0280f8cd83fc1ebd78ffc17676707ebebdbf7f6fba9d3db83fddde3bcf0fa6fb93e9e4d37bf73ffa25df1f7d34ad73426cf6e41a63aa0abc7bfee0d3f383bd4fef6f7f9a3dc8b7f7b3bd7312e2d9c1f6fd9dbd49fee9f9cefeec7c9f7af5e696bb3ccff61f64bbf776b6cf33ea687f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff01a8b95ed1d4ff507bbcaaeab72c2ffcd6eebdfb9f1e3c7c7870fffedec3fdfd9d4f09b06df0555d528b6c36d9eeb61a7f3ace7e405242b82bdb8e892be85d25e053fae74d01befa686f676f777b77677befe19b9d078ff6761eedd1db0f771fecdfdffd29a0c343bedbacbf29c57997f96c464af3ee17c5b4ae9aeabc1d133e8ae75d3b3abc62ff78f78e905f668c71f763e5ed1ba051c3e6ed1ab3a86088c7596e30c8b29289a28faf08c775f3d1","2ff97f001a915c2e55060000"], [
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
  'westus:a7ee02a5-e085-4c27-8fad-55e09ecfe981',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11547',
  'x-ms-correlation-request-id',
  '0b754462-b054-4808-b095-77756cfcb219',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072240Z:0b754462-b054-4808-b095-77756cfcb219',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:39 GMT'
]);
