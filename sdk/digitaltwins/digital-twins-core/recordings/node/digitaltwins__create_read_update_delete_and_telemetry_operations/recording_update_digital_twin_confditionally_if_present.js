let nock = require('nock');

module.exports.hash = "ad853e83e35bb228e2f4270042cad23f";

module.exports.testInfo = {"uniqueName":{"update-digitaltwin-conditionally-if-present":"digitalTwin162506689623800937"},"newDate":{}}

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
  'eb6d3868-7e05-49e9-8e9e-d320432f9200',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgEAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrIuf-5jPkvuKoXEnAol8CwBNlOPLemJ-U71xbKfKrqz1aFdaPRoiKtqwAb9vbCXNxIqblzcormqVT9hpGZxGO6omoxsxEHWO16MyAhYg087aJSK5iuUG-7b-sYBuipmnmPhSGdWqi-2O0E3jfyCgnTS7gDtXpM_lEONw5aPdXBvogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT',
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
  'b1b01582-f8fa-460c-a911-28f44f643801',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgEAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKlRJKQ7l73k6puztLgDnioSyVImj6jLc6EpaaaszBSoIOP_826MnOWuLljTjKX3T_oa7cHyjzc3gVeETfof9417Vs2bbw7b_ZUM7T76Gnsv74qyB_BegCR-HcDhDPCLzQ2jaR0yJsG8vY1Bg_XBSqDG4l0JIFaWSB3jwKf5uiE0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=ec23a2fa-d187-414e-9209-6766121d221e&client_secret=azure_client_secret")
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
  '28812791-b9ec-449e-b425-0faacebb1f01',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgEAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTTestBuilding%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTTestBuilding;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '214',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-12588befe914974caafe5511eaa41b57-3c949a12bc449046-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:14.9172219+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-4507fa5412126d41bbf61d7cb9ebccc3-5a90f59b99f66148-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin162506689623800937')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin162506689623800937. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins http://aka.ms/adtv2query."}}, [
  'Content-Length',
  '282',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-801e1d2f96010549ad0975252a13a24f-e1ec0c50bca7ff4d-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin162506689623800937', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin162506689623800937","$etag":"W/\"74ccf69b-765d-4b75-be41-9cc53dfc3d8d\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2021-06-30T15:28:15.0977544Z"}}}, [
  'Content-Length',
  '244',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"74ccf69b-765d-4b75-be41-9cc53dfc3d8d"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-ba9e8ba79fcc3e4c9c8b7a1141e58c7b-ed209cb04ea9d744-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/digitalTwin162506689623800937', [{"op":"replace","path":"/AverageTemperature","value":42}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"a170b03b-0ef9-4173-8191-c1e69bbac0e2"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-86343aea0f86584b8d51c71ea86ef3d8-adc0b9ccc96a8d45-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/digitalTwin162506689623800937')
  .query(true)
  .reply(200, {"$dtId":"digitalTwin162506689623800937","$etag":"W/\"a170b03b-0ef9-4173-8191-c1e69bbac0e2\"","AverageTemperature":42,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2021-06-30T15:28:15.1556271Z"}}}, [
  'Content-Length',
  '244',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"a170b03b-0ef9-4173-8191-c1e69bbac0e2"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-1d9869f3df2be5418b404e61cb0c888a-04e4054472a09c45-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin162506689623800937')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-3fe48b24d19f2e4ea22814abc5eb2ec3-1cd15b9f8bb2cf42-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTTestBuilding%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-9cde20f75725ea4f92d2a807fa4c6a51-b58e618d2e175942-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:14 GMT'
]);
