let nock = require('nock');

module.exports.hash = "8e11f10139199a6e1c9a18956ada78c6";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-163702272743709606"},"newDate":{}}

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
  '6147c5bf-89aa-49c9-9704-f90c1b24b800',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnvSqW4TZPBJiu450iXGVqo; expires=Thu, 16-Dec-2021 00:32:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWopX3xMIxqthUVwJ52Go_lilJaJvN_kaMh7RsGmPXyrnNlY4RuTMC2TOx8VEVWjxac5wSEPBMWfYn41TwpiflYIuNLb8O044DMVyRDb5SWjghjW9FTi_NSs0fpNHxKBYuwMaznvN-1DTrpVuGUcEQ834K336Z5hoc1Y5Pa2eLbkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 00:32:07 GMT',
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
  '308c4b98-d239-4f79-9af3-c4b2ad8d7c00',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnLlFCt8ZFhDk4rn6cZmkr0; expires=Thu, 16-Dec-2021 00:32:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKRSopWaZ-lNxr7Bmk3qYa2rXCEtRcX_CblcR5Y0ROpcLXSXmRwd2x7vplWbdJZp6ceGtli0Vub8PyG7JoTEfNx_1TJWkBS59O6_H5jUw0UXWbedRwTW3JeVIDujozM3mZ58Y3RnV5nKgHXs4BdR39ICcMCoauou5i09Qkkjpqx8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 00:32:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8ff7fc80-c3c1-4b10-8acb-b36065a1c268&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '3510bc4d-52f1-4db9-9804-b5f48b673a00',
  'x-ms-ests-server',
  '2.1.12231.7 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=As84kfMQbmFOlZQaCdkc1E7GLH8mAQAAAAfzJNkOAAAA; expires=Thu, 16-Dec-2021 00:32:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 00:32:07 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-163702272743709606","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"90f26592-f985-4ee1-93cc-103ff41b58f4","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/adc7f279-7294-455f-b179-72806a47110c',
  'x-request-id',
  'c503ef4e-abb8-4af9-bb31-07d40ce1140b',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  'c503ef4e-abb8-4af9-bb31-07d40ce1140b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/adc7f279-7294-455f-b179-72806a47110c')
  .reply(200, {"anomalyAlertingConfigurationId":"adc7f279-7294-455f-b179-72806a47110c","name":"js-alert-config2-163702272743709606","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"90f26592-f985-4ee1-93cc-103ff41b58f4","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0b45cc2f-4d58-48ab-a85d-9448e311333c',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '0b45cc2f-4d58-48ab-a85d-9448e311333c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/90f26592-f985-4ee1-93cc-103ff41b58f4/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"901669a8-c168-4bcb-8fbb-cd2f411330a6","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"90f26592-f985-4ee1-93cc-103ff41b58f4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"90f26592-f985-4ee1-93cc-103ff41b58f4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"adc7f279-7294-455f-b179-72806a47110c","name":"js-alert-config2-163702272743709606","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"90f26592-f985-4ee1-93cc-103ff41b58f4","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a90c8a42-abf0-43ec-b5c2-a59e7e482625',
  'x-envoy-upstream-service-time',
  '260',
  'apim-request-id',
  'a90c8a42-abf0-43ec-b5c2-a59e7e482625',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/90f26592-f985-4ee1-93cc-103ff41b58f4/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"901669a8-c168-4bcb-8fbb-cd2f411330a6","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"90f26592-f985-4ee1-93cc-103ff41b58f4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"90f26592-f985-4ee1-93cc-103ff41b58f4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"adc7f279-7294-455f-b179-72806a47110c","name":"js-alert-config2-163702272743709606","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"90f26592-f985-4ee1-93cc-103ff41b58f4","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '11fa80b9-07b5-438a-8680-f49a2859ba42',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '11fa80b9-07b5-438a-8680-f49a2859ba42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/adc7f279-7294-455f-b179-72806a47110c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c40ea8f0-94ca-4cfa-867b-6f1387989e82',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  'c40ea8f0-94ca-4cfa-867b-6f1387989e82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:08 GMT'
]);
