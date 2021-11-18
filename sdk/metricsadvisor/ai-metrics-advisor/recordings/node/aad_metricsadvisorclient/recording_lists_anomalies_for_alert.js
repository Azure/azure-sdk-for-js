let nock = require('nock');

module.exports.hash = "219c37028cccc0a6300faa00a1ccbd59";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'c4ce595f-a6bb-4bfb-966d-c389599dca00',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmE3I5lv1R1JnorIcSldtSQ; expires=Thu, 16-Dec-2021 00:32:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUhfmVJ5e-ewKwokVPmjgv23IGGS4BQFPEb15kF5VEXU-063LZE_7gTlcAMsIdyEQVYFROYvRcj7woFPOIm7_8aU4bXCY5DUlTwKHFn7gBoemxNd9V-DZC4MhxENWPxLhBgKKnE8HWrKuU9wBTK2KRIldPpdi2J2lL3oR_gqR3LAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 00:32:25 GMT',
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
  '3ef643a3-9510-4812-bf46-04f941c23c00',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AlSrhS-zUnpEgHKP1GWAOB4; expires=Thu, 16-Dec-2021 00:32:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9SP-L1lf4CDR4d3SqDN1CaTjgET77MQjWoPqQ21vnnQ9EO4TlGnMsgWQ9yIEYNAvWEkq6D9uVyS3fw55_4jcu1nVaBbY7vMd6neCfxruCXp-QqMX-FCUO72VJn7E5MfKCPgSHEEOgYxODyFmTwuAqaCEQ50Y4gBA1lNgTQLQDQwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 00:32:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=458f881c-2f49-40f4-8c9b-a9f463e808f9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a60316e7-1860-4a77-b48a-9bf7b2f88700',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AouXr9sp9XFKrhhtqyrlBhs; expires=Thu, 16-Dec-2021 00:32:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 00:32:25 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"__SUM__","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"High","anomalyStatus":"Active","value":55791561.8,"expectedValue":52146711.57082515}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Seoul","category":"Office Products"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":17763.6,"expectedValue":14939.115446142221}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Miami","category":"Office Products"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":44140,"expectedValue":40165.21522314834}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Seoul","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":3637272.6,"expectedValue":3457374.1827957006}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Tianjin","category":"Home & Garden"},"property":{"anomalySeverity":"Low","anomalyStatus":"Active","value":18544,"expectedValue":18573.49119556344}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Cairo","category":"Handmade"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":313939.2,"expectedValue":302983.7349080156}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"__SUM__","category":"Handmade"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":5713417,"expectedValue":5388312.2772086505}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Karachi","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"High","anomalyStatus":"Active","value":30842491,"expectedValue":29220589.251529176}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"__SUM__","category":"__SUM__"},"property":{"anomalySeverity":"High","anomalyStatus":"Active","value":65120708.60000002,"expectedValue":60928226.58873364}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"New York","category":"__SUM__"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":2118757.4,"expectedValue":1990588.000879956}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Seoul","category":"Home & Garden"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":15958.6,"expectedValue":14801.412700077344}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Seoul","category":"__SUM__"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":3929462.2,"expectedValue":3747040.46482205}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"New York","category":"Home & Garden"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":50246.6,"expectedValue":47199.46740307129}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Cairo","category":"Office Products"},"property":{"anomalySeverity":"Low","anomalyStatus":"Active","value":99554.2,"expectedValue":98790.40651653314}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Karachi","category":"__SUM__"},"property":{"anomalySeverity":"High","anomalyStatus":"Active","value":36613489.2,"expectedValue":34723916.07924643}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"__SUM__","category":"Office Products"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":2129348.4,"expectedValue":2047309.0353815206}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Karachi","category":"Office Products"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":1465438.4,"expectedValue":1406478.7844450518}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Karachi","category":"Handmade"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":3390417.8,"expectedValue":3219749.022546579}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"New York","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":1819508.4,"expectedValue":1702650.3766832482}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"New York","category":"Handmade"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":172878.8,"expectedValue":162880.98413497326}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Istanbul","category":"Home & Garden"},"property":{"anomalySeverity":"Low","anomalyStatus":"Active","value":10715.2,"expectedValue":9806.569582296583}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Karachi","category":"Home & Garden"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":915052,"expectedValue":860381.6543449762}}]}, [
  'Content-Length',
  '10393',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fccb5764-da2e-48af-824a-97a8e3e9ff8c',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  'fccb5764-da2e-48af-824a-97a8e3e9ff8c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:24 GMT'
]);
