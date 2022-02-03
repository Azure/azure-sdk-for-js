let nock = require('nock');

module.exports.hash = "48a95a5bdb6afdc15326e20292a72db3";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-164264029164800862"},"newDate":{}}

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
  'cf75a4ca-b70d-4a60-af1b-edd7b5dd1900',
  'x-ms-ests-server',
  '2.1.12261.17 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgH_ouI37iVNht5HUoTChoc; expires=Sat, 19-Feb-2022 00:58:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQjKdCVOli8B6dAPqv5GT5LKBlhmk2GpmyOzMwaurAChbjEe0-F5lgzcY_3QgM_5HwgMp7u0CLb4CPDGY9pl93cPgI-0KVxz-cZ0Grk-axXMvaYz-cy6wAjI0Rkbnt1JYVfKi8G5DEzuoXEIYmci7pIA2NIdSLnIiZxHoi1zJTXggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 00:58:11 GMT',
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
  'd8bf2c84-1499-461b-af23-3b5c5707ab00',
  'x-ms-ests-server',
  '2.1.12261.22 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnH5e_Oem3tGqz2BuorCXB4; expires=Sat, 19-Feb-2022 00:58:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevriloZkzZwr2WVv0DcrrChFxihDZOpO8Ho1aan_wJBWycMjncmbeKVeliQnKcDHWGMDbCgBPG-HrL0VmtJ904tsNxtl5S6cOs8yf_HSEXfhBCeKoGDdOcid6ywMIvolCwp7h4-hG43fRu2ykpqrI6K7lGwB8H1lljSSh9NCbIEncUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 00:58:11 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=df345b99-8b67-40e6-8b68-ec0f8fd05b5b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '00a3b76e-c857-4c48-b43e-e64cacb1d800',
  'x-ms-ests-server',
  '2.1.12261.22 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtT0wj7MI2pElHMqOuW5Bu4; expires=Sat, 19-Feb-2022 00:58:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 00:58:11 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-164264029164800862","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aac803e7-e828-45c9-9b17-125171eb4420","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/65f1be59-c4fb-4d68-bb23-c301299b91c2',
  'x-request-id',
  '66c48b6e-1ae2-480a-a5e6-da82c1bd9041',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '66c48b6e-1ae2-480a-a5e6-da82c1bd9041',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/65f1be59-c4fb-4d68-bb23-c301299b91c2')
  .reply(200, {"anomalyAlertingConfigurationId":"65f1be59-c4fb-4d68-bb23-c301299b91c2","name":"js-alert-config2-164264029164800862","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aac803e7-e828-45c9-9b17-125171eb4420","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c8acc930-ed2a-4ffd-b9d5-49c11c95940e',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  'c8acc930-ed2a-4ffd-b9d5-49c11c95940e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/aac803e7-e828-45c9-9b17-125171eb4420/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"1d83f8a5-3b6e-4ce1-bee3-198f7f4d9e86","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aac803e7-e828-45c9-9b17-125171eb4420","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"aac803e7-e828-45c9-9b17-125171eb4420","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"65f1be59-c4fb-4d68-bb23-c301299b91c2","name":"js-alert-config2-164264029164800862","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aac803e7-e828-45c9-9b17-125171eb4420","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bee43376-57a8-4bc6-b67e-08308a94f59a',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  'bee43376-57a8-4bc6-b67e-08308a94f59a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/aac803e7-e828-45c9-9b17-125171eb4420/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"1d83f8a5-3b6e-4ce1-bee3-198f7f4d9e86","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aac803e7-e828-45c9-9b17-125171eb4420","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"aac803e7-e828-45c9-9b17-125171eb4420","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"65f1be59-c4fb-4d68-bb23-c301299b91c2","name":"js-alert-config2-164264029164800862","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aac803e7-e828-45c9-9b17-125171eb4420","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '444dcdc7-3675-47ba-849a-ad9abec609d4',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '444dcdc7-3675-47ba-849a-ad9abec609d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/65f1be59-c4fb-4d68-bb23-c301299b91c2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b0235499-a936-499d-8bf9-6da3294e457f',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'b0235499-a936-499d-8bf9-6da3294e457f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:12 GMT'
]);
