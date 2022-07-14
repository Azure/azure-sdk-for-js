let nock = require('nock');

module.exports.hash = "ead090bc492cc519e8a197f242c8d309";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '4fd50c23-d922-47a8-b32b-705e5b5ab000',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=An0CejGHPotBtBRM8sV_370; expires=Sat, 13-Aug-2022 02:58:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrcc4v-09EfVLXwWMl81xCHJvICzbTtOycnCtDDgrcwBF9HNewgus6gxm8Mfcyh7TW-pMGcK_AVnPiz3NNuEHI2QwlG1sSFYgMWQco7t0q73jbk2TIvFxRFmFObOZApetL0v8AOA3qfgf4jTjIcIUwYe5Wz6naq5NBRDtBZsTLNfQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:44 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c048e434-ffa3-4741-8fe9-fcf9ed08ad08&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '4d4bf598-c8df-41cd-8121-9500f2477a00',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqsP8BRosItDnCP52vJoXffhHQjEAQAAAGR9YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:44 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/structured/json')
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"countryCode is missing or empty"}}, [
  'Content-Length',
  '79',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 1706BB8CAC6F4EB3B2E58B6D09062088 Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:45Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:44 GMT'
]);

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
  '4f57ac4a-40f3-41d4-b93c-4030d2f23200',
  'x-ms-ests-server',
  '2.1.13201.7 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlARxVgHNBhOjRDGzsR96pA; expires=Sat, 13-Aug-2022 02:58:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrbFwsPW2kgaaqujiJIeoTZc0kWN-XMSfD3oUKDefuEpB1DvZb1ooVbkTNgDm7eJGAEYHRLKKcUHY0KUcyv5Rj82q_TlI-TIXz5ea-_LAGRR2VFFZaPpsiVe1NWtEe-jIcEl-YDs_dhAU9J3xc1b-VCOYktam2uJPUJa4p2ioP8VYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:44 GMT',
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
  '7031c3b2-5555-47c9-82a2-276f8e467400',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AiBtPyOQSUFLha4cZYphNq0; expires=Sat, 13-Aug-2022 02:58:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevral51jmf22G39Ns3kK3acvn_3EzDdjUFiZdcgjRVu7ON2cL7wpeO3ivXFX90Fb4k9nlJx-51X1ZpptqOQYMrmFPJwdjx29Baf6DDxJgtUVHg8TM0kGt_bg_ijUgSApbkKJ_8QX4C18M2ee9XGaeuLugozdXL_Drbb46PuVoT7MLEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:45 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1c66f707-27e0-4055-a036-4985d7096652&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '45360b1e-81cc-44e5-b18e-ef5741c87d00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlsUypxUFEZDsg2K2qEY6VHhHQjEAQAAAGV9YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:45 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/structured/json')
  .query(true)
  .reply(200, {"summary":{"query":"ne 24th street 15127 redmond 98052 wa","queryType":"NON_NEAR","queryTime":47,"numResults":10,"offset":0,"totalResults":30,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p0/16562612","score":14.1640310287,"address":{"streetNumber":"15127","streetName":"Northeast 24th Street","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5544","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"15127 Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63096,"lon":-122.13814},"viewport":{"topLeftPoint":{"lat":47.63186,"lon":-122.13947},"btmRightPoint":{"lat":47.63006,"lon":-122.13681}},"entryPoints":[{"type":"main","position":{"lat":47.63149,"lon":-122.13853}},{"type":"minor","position":{"lat":47.6308,"lon":-122.1385}}]},{"type":"Cross Street","id":"US/XSTR/p2/3294409","score":10.7666654587,"address":{"streetName":"Northeast 24th Street & Bel Red Road, Bellevue Redmond Road","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98007","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Northeast 24th Street & Bel Red Road, Bellevue, WA 98007","localName":"Bellevue"},"position":{"lat":47.63162,"lon":-122.13401},"viewport":{"topLeftPoint":{"lat":47.63252,"lon":-122.13534},"btmRightPoint":{"lat":47.63072,"lon":-122.13268}}},{"type":"Cross Street","id":"US/XSTR/p2/3294410","score":10.6782073975,"address":{"streetName":"Bel Red Road, Bellevue Redmond Road & Northeast 24th Street","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Bel Red Road & Northeast 24th Street, Bellevue, WA 98052","localName":"Bellevue"},"position":{"lat":47.63162,"lon":-122.13401},"viewport":{"topLeftPoint":{"lat":47.63252,"lon":-122.13534},"btmRightPoint":{"lat":47.63072,"lon":-122.13268}}},{"type":"Cross Street","id":"US/XSTR/p0/3003507","score":10.4268474579,"address":{"streetName":"186th Avenue Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"186th Avenue Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63111,"lon":-122.09087},"viewport":{"topLeftPoint":{"lat":47.63201,"lon":-122.0922},"btmRightPoint":{"lat":47.63021,"lon":-122.08954}}},{"type":"Cross Street","id":"US/XSTR/p0/3003510","score":10.4268474579,"address":{"streetName":"Northeast 24th Street & West Lake Sammamish Parkway Northeast","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Northeast 24th Street & West Lake Sammamish Parkway Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63115,"lon":-122.08847},"viewport":{"topLeftPoint":{"lat":47.63205,"lon":-122.0898},"btmRightPoint":{"lat":47.63025,"lon":-122.08714}}},{"type":"Cross Street","id":"US/XSTR/p0/3003511","score":10.4268474579,"address":{"streetName":"185th Place Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"185th Place Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63112,"lon":-122.09299},"viewport":{"topLeftPoint":{"lat":47.63202,"lon":-122.09432},"btmRightPoint":{"lat":47.63022,"lon":-122.09166}}},{"type":"Cross Street","id":"US/XSTR/p0/3003514","score":10.4268474579,"address":{"streetName":"Northeast 24th Street & 184th Avenue Northeast","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Northeast 24th Street & 184th Avenue Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63113,"lon":-122.09434},"viewport":{"topLeftPoint":{"lat":47.63203,"lon":-122.09567},"btmRightPoint":{"lat":47.63023,"lon":-122.09301}}},{"type":"Cross Street","id":"US/XSTR/p0/3003515","score":10.4268474579,"address":{"streetName":"183rd Court Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"183rd Court Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63112,"lon":-122.09543},"viewport":{"topLeftPoint":{"lat":47.63202,"lon":-122.09676},"btmRightPoint":{"lat":47.63022,"lon":-122.0941}}},{"type":"Cross Street","id":"US/XSTR/p0/3003517","score":10.4268474579,"address":{"streetName":"182nd Avenue Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"182nd Avenue Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63113,"lon":-122.09751},"viewport":{"topLeftPoint":{"lat":47.63203,"lon":-122.09884},"btmRightPoint":{"lat":47.63023,"lon":-122.09618}}},{"type":"Cross Street","id":"US/XSTR/p0/3003519","score":10.4268474579,"address":{"streetName":"180th Place Northeast & Northeast 24th Street","municipalitySubdivision":"Idylwood","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"180th Place Northeast & Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63115,"lon":-122.09968},"viewport":{"topLeftPoint":{"lat":47.63205,"lon":-122.10101},"btmRightPoint":{"lat":47.63025,"lon":-122.09835}}}]}, [
  'Content-Length',
  '6884',
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
  'Ref A: 18BB893E73DB47668A6828AE251B86FB Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:46Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:45 GMT'
]);
