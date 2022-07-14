let nock = require('nock');

module.exports.hash = "625bc0f003f3f4e2dff8efda30dc594a";

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
  '4e50339b-7b19-446a-895a-1099d17d3700',
  'x-ms-ests-server',
  '2.1.13201.7 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ApLg1flMJsBOjTUK1t7uTeM; expires=Sat, 13-Aug-2022 02:58:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLW5X7NolpBNv2odEwua37yuWuZoNOaPbsIbryo7wC80qsWs7QfSINwO-tgbKe7CXkNIeRis2KSY1remWj0_Xv04EN88EYKlZaHw_Mvaa2WgEuf8zy1aLGZuHVhO2Lf0NfJxYJPUdC-cLu1ggpnNIlSx59LQ1sEqREBj69o5VImwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:43 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '0a98694e-9c3e-4de9-bb6b-be8b81ebb200',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Anfb3yB9iBpJu35Xkx-3SQs; expires=Sat, 13-Aug-2022 02:58:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrF4J6_NVygR_TJuKaldVzbMy51QCWanmE-WAJxoIvWr6O-gih2xiQOxjji_BDYs-xeSkXaZWtdwp4H83TETR6-zcIgVxTgqMUMV3n17lxSXLMvqcou7TAyg1dnVTgwit54ngbeCEB80UhCK9moQFGHa2I-LWarEZ1EdlOHncie0IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:43 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fff3b8f2-718a-4514-bb79-481cef29771c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '9a23c7b6-1992-4dce-a667-f38fe3bf7c00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AvzRH6XB3mlAsUA6K5oo0EA; expires=Sat, 13-Aug-2022 02:58:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:43 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/json')
  .query(true)
  .reply(200, {"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":7,"numResults":10,"offset":0,"totalResults":61,"fuzzyLevel":1},"results":[{"type":"Street","id":"US/STR/p0/3996343","score":2.1169600487,"matchConfidence":{"score":1},"address":{"streetName":"Pizza Lane","municipality":"Woodville","countrySecondarySubdivision":"Wilkinson","countrySubdivision":"MS","countrySubdivisionName":"Mississippi","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Woodville, MS","localName":"Woodville"},"position":{"lat":31.08642,"lon":-91.30197},"viewport":{"topLeftPoint":{"lat":31.08883,"lon":-91.30422},"btmRightPoint":{"lat":31.08593,"lon":-91.30157}}},{"type":"Street","id":"BR/STR/p0/35148","score":2.0962057114,"matchConfidence":{"score":0.9217806096498575},"address":{"streetName":"Rua Luíz Pizza","municipality":"Assis","countrySubdivision":"São Paulo","postalCode":"19800, 19814","extendedPostalCode":"19800-170, 19814-010, 19814-350, 19814-351","countryCode":"BR","country":"Brasil","countryCodeISO3":"BRA","freeformAddress":"Rua Luíz Pizza, 19800, 19814, Assis","localName":"Assis"},"position":{"lat":-22.65827,"lon":-50.41392},"viewport":{"topLeftPoint":{"lat":-22.65412,"lon":-50.414},"btmRightPoint":{"lat":-22.6616,"lon":-50.41386}}},{"type":"Street","id":"BR/STR/p0/708828","score":2.0962057114,"matchConfidence":{"score":0.8980523079843756},"address":{"streetName":"Rua Toledo Pizza","municipality":"Laguna","countrySubdivision":"Santa Catarina","countryCode":"BR","country":"Brasil","countryCodeISO3":"BRA","freeformAddress":"Rua Toledo Pizza, Laguna","localName":"Laguna"},"position":{"lat":-28.48941,"lon":-48.77317},"viewport":{"topLeftPoint":{"lat":-28.48071,"lon":-48.78341},"btmRightPoint":{"lat":-28.49869,"lon":-48.76294}}},{"type":"Street","id":"BR/STR/p0/715919","score":2.0962057114,"matchConfidence":{"score":0.8980523079843756},"address":{"streetName":"Rua Toledo Pizza","municipalitySubdivision":"Chácaras Rio-Petrópolis","municipality":"Duque de Caxias","countrySubdivision":"Rio de Janeiro","postalCode":"25041, 25230","extendedPostalCode":"25041-580","countryCode":"BR","country":"Brasil","countryCodeISO3":"BRA","freeformAddress":"Rua Toledo Pizza, 25041-580, Duque de Caxias","localName":"Duque de Caxias"},"position":{"lat":-22.6724,"lon":-43.29262},"viewport":{"topLeftPoint":{"lat":-22.67157,"lon":-43.29272},"btmRightPoint":{"lat":-22.67344,"lon":-43.29204}}},{"type":"Street","id":"IT/STR/p0/72554","score":2.0959999561,"matchConfidence":{"score":1},"address":{"streetName":"Strada Pizzà","municipality":"Torricella Verzate","countrySecondarySubdivision":"Pavia","countrySubdivision":"Lombardia","postalCode":"27050","countryCode":"IT","country":"Italia","countryCodeISO3":"ITA","freeformAddress":"Strada Pizzà, 27050 Torricella Verzate","localName":"Torricella Verzate"},"position":{"lat":45.02043,"lon":9.17392},"viewport":{"topLeftPoint":{"lat":45.0206,"lon":9.1726},"btmRightPoint":{"lat":45.02023,"lon":9.17464}}},{"type":"Street","id":"US/STR/p0/55199","score":2.0959999561,"matchConfidence":{"score":1},"address":{"streetName":"Pizza Lane","municipality":"Stambaugh","countrySecondarySubdivision":"Iron","countrySubdivision":"MI","countrySubdivisionName":"Michigan","postalCode":"49935","extendedPostalCode":"49935-8901","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Iron River, MI 49935","localName":"Iron River"},"position":{"lat":46.06282,"lon":-88.71562},"viewport":{"topLeftPoint":{"lat":46.06563,"lon":-88.71685},"btmRightPoint":{"lat":46.06023,"lon":-88.71399}}},{"type":"Street","id":"US/STR/p0/5076918","score":2.0959999561,"matchConfidence":{"score":1},"address":{"streetName":"Pizza Lane","municipality":"Dover","countrySecondarySubdivision":"Hillsborough","countrySubdivision":"FL","countrySubdivisionName":"Florida","postalCode":"33527","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Dover, FL 33527","localName":"Dover"},"position":{"lat":27.97313,"lon":-82.24548},"viewport":{"topLeftPoint":{"lat":27.97433,"lon":-82.24578},"btmRightPoint":{"lat":27.97163,"lon":-82.24548}}},{"type":"Street","id":"US/STR/p1/6289702","score":2.0959999561,"matchConfidence":{"score":1},"address":{"streetName":"Pizza Lane","municipality":"Wilson","countrySecondarySubdivision":"Teton","countrySubdivision":"WY","countrySubdivisionName":"Wyoming","postalCode":"83014","extendedPostalCode":"83014-9164","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Wilson, WY 83014","localName":"Wilson"},"position":{"lat":43.51855,"lon":-110.84023},"viewport":{"topLeftPoint":{"lat":43.51882,"lon":-110.84204},"btmRightPoint":{"lat":43.51846,"lon":-110.83869}}},{"type":"Street","id":"US/STR/p2/6065930","score":2.0959999561,"matchConfidence":{"score":1},"address":{"streetName":"Pizza Lane","municipality":"Eastern","countrySecondarySubdivision":"Pendleton","countrySubdivision":"WV","countrySubdivisionName":"West Virginia","postalCode":"26802","extendedPostalCode":"26802-8016, 26802-8043","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pizza Lane, Brandywine, WV 26802","localName":"Brandywine"},"position":{"lat":38.62674,"lon":-79.24476},"viewport":{"topLeftPoint":{"lat":38.62697,"lon":-79.2452},"btmRightPoint":{"lat":38.62645,"lon":-79.24399}}},{"type":"Street","id":"BR/STR/p0/766116","score":2.075854063,"matchConfidence":{"score":0.8836086123781745},"address":{"streetName":"Rua Doutor Luiz Pizza","municipality":"Assis","countrySubdivision":"São Paulo","countryCode":"BR","country":"Brasil","countryCodeISO3":"BRA","freeformAddress":"Rua Doutor Luiz Pizza, Assis","localName":"Assis"},"position":{"lat":-22.65898,"lon":-50.4139},"viewport":{"topLeftPoint":{"lat":-22.65658,"lon":-50.41393},"btmRightPoint":{"lat":-22.6591,"lon":-50.4139}}}]}, [
  'Content-Length',
  '5933',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 6AFFCC7FDF294478A638219B0083D7A9 Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:44Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:43 GMT'
]);
