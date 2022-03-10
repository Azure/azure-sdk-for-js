let nock = require('nock');

module.exports.hash = "e41e8b13d709ebe9f2985e8b5ac8b012";

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
  'd7c2de0b-ee7f-4a61-84b1-3a8930fc9200',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ao2uRgXnaGpAsdUPMpc2XYQ; expires=Sat, 09-Apr-2022 06:34:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnY1HJ9_998Iw2irCFzN3HgM01LsvghQBqdH-qtxZHEe7NwGkzZDE5qJnSeQ3oPQgd75bDIbOGCQF9dyd9MUSNp4Mq3JHYqwfYswThSqzyQXS0WdinEEL4ciQg0-TzLzvzqCAdc76ve4PTlm2sR-N9ZZDWMlTo4ssaaHzW1-mdJkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:24 GMT',
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
  '0150eeb8-a189-4f03-a9cf-b167164c1400',
  'x-ms-ests-server',
  '2.1.12559.4 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlWSudYgLgxFizIEgsRMOlM; expires=Sat, 09-Apr-2022 06:34:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevryt59dYn7F2hKpOi4GNjnLf8Xi16pxW_zVxwND1cnQUSMO4ndcOE5-i9MP5OtUqOVJX9iNg3P0OYgrv-LTGR66L_YfCZebojfgWArm8RRh5N4gcpyhx45eKTHUs5F1x7-wIn-5RU3S7mM_zR_7MWXEYhW4-i00kNPwjl4mHXNFlggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=47937e9a-abf0-45af-b26c-8ce4e1115bef&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '7a5d755b-f546-4f61-bc19-509ce63d1b00',
  'x-ms-ests-server',
  '2.1.12559.4 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnxSpWz3bVROhoJLNCuaShQ; expires=Sat, 09-Apr-2022 06:34:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:25 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/address/batch/json', {"batchItems":[{"query":"?query=400 Broad St, Seattle, WA 98109&limit=3"},{"query":"?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},{"query":"?query=350 5th Ave, New York, NY 10118&limit=1"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/address/batch/<batch-id>?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: EF81F11D867F4D9FA09808C2ABBD1932 Ref B: TPE30EDGE0408 Ref C: 2022-03-10T06:34:26Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:26 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"400 broad st seattle wa 98109","queryType":"NON_NEAR","queryTime":100,"numResults":2,"offset":0,"totalResults":2,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/17733634","score":11.9729099274,"address":{"streetNumber":"400","streetName":"Broad Street","municipalitySubdivision":"Queen Anne","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4607","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.62039,"lon":-122.34928},"viewport":{"topLeftPoint":{"lat":47.62129,"lon":-122.35061},"btmRightPoint":{"lat":47.61949,"lon":-122.34795}},"entryPoints":[{"type":"main","position":{"lat":47.61982,"lon":-122.34886}}]},{"type":"Street","id":"US/STR/p2/1535374","score":10.22519207,"address":{"streetName":"Broad Street","municipalitySubdivision":"South Lake Union","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4942","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.61911,"lon":-122.3497},"viewport":{"topLeftPoint":{"lat":47.61965,"lon":-122.35041},"btmRightPoint":{"lat":47.61857,"lon":-122.349}}}]}},{"statusCode":200,"response":{"summary":{"query":"one microsoft way redmond wa 98052","queryType":"NON_NEAR","queryTime":121,"numResults":3,"offset":0,"totalResults":3510,"fuzzyLevel":2},"results":[{"type":"Street","id":"US/STR/p2/1440117","score":10.22519207,"address":{"streetName":"Microsoft Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-6399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Microsoft Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64016,"lon":-122.1245},"viewport":{"topLeftPoint":{"lat":47.64016,"lon":-122.12466},"btmRightPoint":{"lat":47.64012,"lon":-122.12424}}},{"type":"Street","id":"US/STR/p1/1918987","score":10.0968618393,"address":{"streetName":"157th Avenue Northeast","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5344, 98052-5399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"157th Avenue Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64351,"lon":-122.13056},"viewport":{"topLeftPoint":{"lat":47.64471,"lon":-122.13058},"btmRightPoint":{"lat":47.6425,"lon":-122.13014}}},{"type":"Street","id":"US/STR/p1/1925283","score":7.9237017632,"address":{"streetName":"Redmond Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-0008, 98052-0578, 98052-0908, 98052-1504, 98052-3824, 98052-3827, 98052-3829, 98052-3830, 98052-3831, 98052-3832, 98052-3833, 98052-3834, 98052-3835, 98052-3836, 98052-3862, 98052-4060, 98052-4403, 98052-4404, 98052-4405, 98052-4406, 98052-4407, 98052-4429, 98052-4433, 98052-4434, 98052-4435, 98052-4448, 98052-4449, 98052-4450, 98052-4472, 98052-4906, 98052-4907, 98052-4909, 98052-4913, 98052-5000, 98052-5006, 98052-5011, 98052-5012, 98052-5016, 98052-5079","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Redmond Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.66985,"lon":-122.10805},"viewport":{"topLeftPoint":{"lat":47.67519,"lon":-122.1244},"btmRightPoint":{"lat":47.6572,"lon":-122.0977}}}]}},{"statusCode":200,"response":{"summary":{"query":"350 5th ave new york ny 10118","queryType":"NON_NEAR","queryTime":159,"numResults":1,"offset":0,"totalResults":840,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p0/22207648","score":12.0984487534,"address":{"streetNumber":"350","streetName":"5th Avenue","municipalitySubdivision":"Midtown South","municipality":"New York","countrySecondarySubdivision":"New York","countrySubdivision":"NY","countrySubdivisionName":"New York","postalCode":"10001","extendedPostalCode":"10001-3105","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"350 5th Avenue, New York, NY 10001","localName":"New York"},"position":{"lat":40.74817,"lon":-73.985},"viewport":{"topLeftPoint":{"lat":40.74907,"lon":-73.98619},"btmRightPoint":{"lat":40.74727,"lon":-73.98381}},"entryPoints":[{"type":"main","position":{"lat":40.74808,"lon":-73.98482}}]}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: DD159D1A7DDF4B41A98AAD0705EB0BAF Ref B: TPE30EDGE0408 Ref C: 2022-03-10T06:34:26Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:26 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"400 broad st seattle wa 98109","queryType":"NON_NEAR","queryTime":100,"numResults":2,"offset":0,"totalResults":2,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/17733634","score":11.9729099274,"address":{"streetNumber":"400","streetName":"Broad Street","municipalitySubdivision":"Queen Anne","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4607","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.62039,"lon":-122.34928},"viewport":{"topLeftPoint":{"lat":47.62129,"lon":-122.35061},"btmRightPoint":{"lat":47.61949,"lon":-122.34795}},"entryPoints":[{"type":"main","position":{"lat":47.61982,"lon":-122.34886}}]},{"type":"Street","id":"US/STR/p2/1535374","score":10.22519207,"address":{"streetName":"Broad Street","municipalitySubdivision":"South Lake Union","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4942","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.61911,"lon":-122.3497},"viewport":{"topLeftPoint":{"lat":47.61965,"lon":-122.35041},"btmRightPoint":{"lat":47.61857,"lon":-122.349}}}]}},{"statusCode":200,"response":{"summary":{"query":"one microsoft way redmond wa 98052","queryType":"NON_NEAR","queryTime":121,"numResults":3,"offset":0,"totalResults":3510,"fuzzyLevel":2},"results":[{"type":"Street","id":"US/STR/p2/1440117","score":10.22519207,"address":{"streetName":"Microsoft Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-6399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Microsoft Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64016,"lon":-122.1245},"viewport":{"topLeftPoint":{"lat":47.64016,"lon":-122.12466},"btmRightPoint":{"lat":47.64012,"lon":-122.12424}}},{"type":"Street","id":"US/STR/p1/1918987","score":10.0968618393,"address":{"streetName":"157th Avenue Northeast","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5344, 98052-5399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"157th Avenue Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64351,"lon":-122.13056},"viewport":{"topLeftPoint":{"lat":47.64471,"lon":-122.13058},"btmRightPoint":{"lat":47.6425,"lon":-122.13014}}},{"type":"Street","id":"US/STR/p1/1925283","score":7.9237017632,"address":{"streetName":"Redmond Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-0008, 98052-0578, 98052-0908, 98052-1504, 98052-3824, 98052-3827, 98052-3829, 98052-3830, 98052-3831, 98052-3832, 98052-3833, 98052-3834, 98052-3835, 98052-3836, 98052-3862, 98052-4060, 98052-4403, 98052-4404, 98052-4405, 98052-4406, 98052-4407, 98052-4429, 98052-4433, 98052-4434, 98052-4435, 98052-4448, 98052-4449, 98052-4450, 98052-4472, 98052-4906, 98052-4907, 98052-4909, 98052-4913, 98052-5000, 98052-5006, 98052-5011, 98052-5012, 98052-5016, 98052-5079","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Redmond Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.66985,"lon":-122.10805},"viewport":{"topLeftPoint":{"lat":47.67519,"lon":-122.1244},"btmRightPoint":{"lat":47.6572,"lon":-122.0977}}}]}},{"statusCode":200,"response":{"summary":{"query":"350 5th ave new york ny 10118","queryType":"NON_NEAR","queryTime":159,"numResults":1,"offset":0,"totalResults":840,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p0/22207648","score":12.0984487534,"address":{"streetNumber":"350","streetName":"5th Avenue","municipalitySubdivision":"Midtown South","municipality":"New York","countrySecondarySubdivision":"New York","countrySubdivision":"NY","countrySubdivisionName":"New York","postalCode":"10001","extendedPostalCode":"10001-3105","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"350 5th Avenue, New York, NY 10001","localName":"New York"},"position":{"lat":40.74817,"lon":-73.985},"viewport":{"topLeftPoint":{"lat":40.74907,"lon":-73.98619},"btmRightPoint":{"lat":40.74727,"lon":-73.98381}},"entryPoints":[{"type":"main","position":{"lat":40.74808,"lon":-73.98482}}]}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 8E24D11BDFEC4447921CB68676CE84E1 Ref B: TPE30EDGE0408 Ref C: 2022-03-10T06:34:26Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:26 GMT'
]);
