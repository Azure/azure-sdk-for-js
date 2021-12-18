let nock = require('nock');

module.exports.hash = "8e11f10139199a6e1c9a18956ada78c6";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-163978571283208756"},"newDate":{}}

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
  'abedb8dc-4b61-428b-887d-e52984e42b00',
  'x-ms-ests-server',
  '2.1.12261.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag_DnIuLMmBChDxvjxhsXxI; expires=Mon, 17-Jan-2022 00:01:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMoB1-sYIC3jVtDSO8XH-DM5CdmEh6CE-qRhJI4qdH6dpE2bouniO6e7qPedGWiYUwWhmshoQzaxCN8Te_PF70oZWug4G_dQOu2mToK60ee_LjIjyjDmW4QzpdFG1tGwa5xnSOP8cnssNxK0RfK5slZso0ywvqOq-fBfZmsH9CFIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Dec 2021 00:01:52 GMT',
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
  'cf1bc9f9-9095-440a-b084-191043a72e00',
  'x-ms-ests-server',
  '2.1.12261.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoRBbnG7ynBIiIFFoUfRcb4; expires=Mon, 17-Jan-2022 00:01:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevroIrdjo1Ju1931Gb7_aXjB1jjLYFzWLzjTmffhAAmNN2_Vh2Xz-lxt-5fPXG2tmJc1Snmb7OhP-OzaKbMJZQaW9M9b2iYeoFtwlT95W-yHsU4NQB12YeERNIdqrRsEFQ3nbczpmhAL6kST6VgIlwWTc8KceluwAjbXFe2gxIpW4EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Dec 2021 00:01:52 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a0f22c9e-9e89-4136-ab40-7c936fecf5e1&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6232bbd4-1db8-4e53-87a7-5f5dd67f2900',
  'x-ms-ests-server',
  '2.1.12261.15 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjaLtVsAuqxOp__S1g-fee_GLH8mAQAAAPAbT9kOAAAA; expires=Mon, 17-Jan-2022 00:01:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Dec 2021 00:01:52 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-163978571283208756","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"f81de174-394a-4b9b-ae28-316be2a18b14","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint//metricsadvisor/v1.0/alert/anomaly/configurations/74f9b0c3-9dc5-4ad8-9d82-c6b96c47f247',
  'x-request-id',
  '3e491e51-018b-4678-8365-6fb9ee3166a9',
  'x-envoy-upstream-service-time',
  '223',
  'apim-request-id',
  '3e491e51-018b-4678-8365-6fb9ee3166a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/74f9b0c3-9dc5-4ad8-9d82-c6b96c47f247')
  .reply(200, {"anomalyAlertingConfigurationId":"74f9b0c3-9dc5-4ad8-9d82-c6b96c47f247","name":"js-alert-config2-163978571283208756","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"f81de174-394a-4b9b-ae28-316be2a18b14","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cc39417a-f1db-4d53-9147-8506b1122cef',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'cc39417a-f1db-4d53-9147-8506b1122cef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/f81de174-394a-4b9b-ae28-316be2a18b14/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"4916955c-7272-4a17-b440-a6aa8cd1883f","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"f81de174-394a-4b9b-ae28-316be2a18b14","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"f81de174-394a-4b9b-ae28-316be2a18b14","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"74f9b0c3-9dc5-4ad8-9d82-c6b96c47f247","name":"js-alert-config2-163978571283208756","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"f81de174-394a-4b9b-ae28-316be2a18b14","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9ccc0f33-3e32-496f-a372-28aa8656d86f',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '9ccc0f33-3e32-496f-a372-28aa8656d86f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/f81de174-394a-4b9b-ae28-316be2a18b14/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"4916955c-7272-4a17-b440-a6aa8cd1883f","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"f81de174-394a-4b9b-ae28-316be2a18b14","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"f81de174-394a-4b9b-ae28-316be2a18b14","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"74f9b0c3-9dc5-4ad8-9d82-c6b96c47f247","name":"js-alert-config2-163978571283208756","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"f81de174-394a-4b9b-ae28-316be2a18b14","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'aafae1d7-b018-44ae-a09d-469d4bff8b77',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  'aafae1d7-b018-44ae-a09d-469d4bff8b77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/74f9b0c3-9dc5-4ad8-9d82-c6b96c47f247')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8c0af5cc-2b8e-4faf-bf3b-70438122cc8e',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '8c0af5cc-2b8e-4faf-bf3b-70438122cc8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:54 GMT'
]);
