let nock = require('nock');

module.exports.hash = "bc4be6e810a91755d8a90ee9cb11d364";

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
  '11a5f869-4d33-4778-a7a9-2687518d0300',
  'x-ms-ests-server',
  '2.1.12381.24 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtvsEx-z6CBKqZYWWO5FaA0; expires=Thu, 03-Mar-2022 22:01:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjMR03FbBbPzO6RLvCvN3ALKtOx5zjxtnFZW-jdZNPgniklJJ7jGJAi8Aoq9ICFbMydN-igq2iZFkBzrF4QfNMdPdUe2XYAzfR6hm1hLpYLX2hTqiWrhOVgarSrZ2W1djbaA_SKhDPVpImEDpTAUndAKnINP28BLdwk3SCazdc74gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:01:35 GMT',
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
  '4a223cbd-1603-4e73-bee9-7c10ba089900',
  'x-ms-ests-server',
  '2.1.12381.24 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArvRkkxNPnpGnbgM3C5IgOE; expires=Thu, 03-Mar-2022 22:01:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8kvK9PqII0l3DdVREQO1yyJ4sDfAeCXs6z7lbbCKUZJCL16siNKoqZJ-_YshJzv9ZhGoXhApgeryXN87645MXHYJ0tqBHm8dG5EOCPxmHBXpuEsubv8_gnhtFNhZc6DC9G6DWi6trHF587LUQ-ua6WrJNPNeMdBXBwEboVmUzlAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:01:35 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1b54c381-4293-4704-bcb5-1aef16af272d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd1c512c0-6c9a-49f2-83ed-0bf35db83f00',
  'x-ms-ests-server',
  '2.1.12381.24 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhWi_B0BnqdHqT824EDJ4Ns; expires=Thu, 03-Mar-2022 22:01:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:01:35 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/prebuilt-businessCard:analyze', {"urlSource":"https://storageaccount/testingdata/businessCard.png?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/dca37213-fe84-47d4-8cb8-84ec6af947c5?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '1659',
  'apim-request-id',
  'dca37213-fe84-47d4-8cb8-84ec6af947c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:01:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/dca37213-fe84-47d4-8cb8-84ec6af947c5')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2022-02-01T22:01:37Z","lastUpdatedDateTime":"2022-02-01T22:01:37Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '5d937135-361e-4cbd-acab-a1363c3a0f01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:01:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/dca37213-fe84-47d4-8cb8-84ec6af947c5')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2022-02-01T22:01:37Z","lastUpdatedDateTime":"2022-02-01T22:01:37Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'c6857b8f-83c9-42ac-aeb4-466ea52b50b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:01:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/dca37213-fe84-47d4-8cb8-84ec6af947c5')
  .query(true)
  .reply(200, {"status":"succeeded","createdDateTime":"2022-02-01T22:01:37Z","lastUpdatedDateTime":"2022-02-01T22:01:42Z","analyzeResult":{"apiVersion":"2022-01-30-preview","modelId":"prebuilt-businessCard","stringIndexType":"textElements","content":"Dr. Avery Smith\nSenior Researcher\nCloud & Al Department\navery.smith@contoso.com\nhttps://www.contoso.com/\nmob: +44 (0) 7911 123456\ntel: +44 (0) 20 9876 5432\nfax: +44 (0) 20 6789 2345\nContoso\n2 Kingdom Street\nPaddington, London, W2 6BD","pages":[{"pageNumber":1,"angle":-16.312,"width":4032,"height":3024,"unit":"pixel","words":[{"content":"Dr.","boundingBox":[418,1159,656,1105,684,1211,446,1260],"confidence":0.994,"span":{"offset":0,"length":3}},{"content":"Avery","boundingBox":[681,1099,1104,1000,1132,1108,709,1206],"confidence":0.999,"span":{"offset":4,"length":5}},{"content":"Smith","boundingBox":[1171,984,1558,888,1586,991,1199,1092],"confidence":0.999,"span":{"offset":10,"length":5}},{"content":"Senior","boundingBox":[454,1315,756,1240,772,1312,471,1383],"confidence":1,"span":{"offset":16,"length":6}},{"content":"Researcher","boundingBox":[785,1233,1303,1108,1319,1176,802,1305],"confidence":0.995,"span":{"offset":23,"length":10}},{"content":"Cloud","boundingBox":[477,1412,734,1348,753,1424,495,1483],"confidence":0.999,"span":{"offset":34,"length":5}},{"content":"&","boundingBox":[789,1334,834,1323,853,1400,808,1411],"confidence":0.975,"span":{"offset":40,"length":1}},{"content":"Al","boundingBox":[899,1308,1006,1282,1025,1358,917,1385],"confidence":0.82,"span":{"offset":42,"length":2}},{"content":"Department","boundingBox":[1023,1278,1584,1144,1603,1206,1041,1354],"confidence":0.995,"span":{"offset":45,"length":10}},{"content":"avery.smith@contoso.com","boundingBox":[2106,937,2904,709,2920,764,2122,993],"confidence":0.967,"span":{"offset":56,"length":23}},{"content":"https://www.contoso.com/","boundingBox":[2121,1006,2989,765,3002,819,2143,1072],"confidence":0.967,"span":{"offset":80,"length":24}},{"content":"mob:","boundingBox":[2243,1103,2416,1045,2435,1110,2262,1159],"confidence":0.992,"span":{"offset":105,"length":4}},{"content":"+44","boundingBox":[2429,1041,2544,1005,2563,1073,2448,1106],"confidence":0.982,"span":{"offset":110,"length":3}},{"content":"(0)","boundingBox":[2563,999,2660,969,2679,1038,2582,1067],"confidence":0.983,"span":{"offset":114,"length":3}},{"content":"7911","boundingBox":[2673,965,2827,919,2846,988,2692,1034],"confidence":0.993,"span":{"offset":118,"length":4}},{"content":"123456","boundingBox":[2846,914,3065,853,3084,913,2865,982],"confidence":0.997,"span":{"offset":123,"length":6}},{"content":"tel:","boundingBox":[2339,1162,2454,1125,2477,1191,2363,1225],"confidence":0.994,"span":{"offset":130,"length":4}},{"content":"+44","boundingBox":[2467,1121,2584,1083,2606,1151,2490,1187],"confidence":0.998,"span":{"offset":135,"length":3}},{"content":"(0)","boundingBox":[2600,1078,2697,1047,2718,1117,2622,1146],"confidence":0.994,"span":{"offset":139,"length":3}},{"content":"20","boundingBox":[2710,1043,2783,1020,2804,1090,2732,1112],"confidence":0.998,"span":{"offset":143,"length":2}},{"content":"9876","boundingBox":[2799,1015,2956,966,2976,1035,2820,1085],"confidence":0.99,"span":{"offset":146,"length":4}},{"content":"5432","boundingBox":[2972,962,3125,915,3144,981,2991,1030],"confidence":0.994,"span":{"offset":151,"length":4}},{"content":"fax:","boundingBox":[2375,1242,2507,1200,2526,1268,2394,1305],"confidence":0.993,"span":{"offset":156,"length":4}},{"content":"+44","boundingBox":[2521,1196,2642,1157,2661,1229,2539,1264],"confidence":0.994,"span":{"offset":161,"length":3}},{"content":"(0)","boundingBox":[2657,1152,2759,1120,2778,1193,2676,1224],"confidence":0.994,"span":{"offset":165,"length":3}},{"content":"20","boundingBox":[2772,1116,2845,1093,2864,1166,2791,1189],"confidence":0.998,"span":{"offset":169,"length":2}},{"content":"6789","boundingBox":[2865,1087,3017,1040,3036,1109,2884,1159],"confidence":0.994,"span":{"offset":172,"length":4}},{"content":"2345","boundingBox":[3037,1034,3190,988,3209,1048,3056,1102],"confidence":0.994,"span":{"offset":177,"length":4}},{"content":"Contoso","boundingBox":[1144,1899,2244,1582,2308,1753,1193,2106],"confidence":0.998,"span":{"offset":182,"length":7}},{"content":"2","boundingBox":[1239,2142,1283,2127,1309,2205,1266,2219],"confidence":0.994,"span":{"offset":190,"length":1}},{"content":"Kingdom","boundingBox":[1316,2116,1682,1992,1707,2073,1342,2195],"confidence":0.998,"span":{"offset":192,"length":7}},{"content":"Street","boundingBox":[1751,1969,2024,1876,2048,1947,1776,2048],"confidence":0.999,"span":{"offset":200,"length":6}},{"content":"Paddington,","boundingBox":[1283,2264,1857,2068,1885,2146,1310,2342],"confidence":0.995,"span":{"offset":207,"length":11}},{"content":"London,","boundingBox":[1872,2062,2233,1933,2261,2009,1900,2140],"confidence":0.997,"span":{"offset":219,"length":7}},{"content":"W2","boundingBox":[2248,1927,2388,1876,2416,1952,2276,2004],"confidence":0.997,"span":{"offset":227,"length":2}},{"content":"6BD","boundingBox":[2405,1870,2555,1814,2583,1888,2433,1945],"confidence":0.997,"span":{"offset":230,"length":3}}],"lines":[{"content":"Dr. Avery Smith","boundingBox":[417,1158,1606,876,1631,987,444,1260],"spans":[{"offset":0,"length":15}]},{"content":"Senior Researcher","boundingBox":[452,1314,1314,1105,1330,1174,469,1383],"spans":[{"offset":16,"length":17}]},{"content":"Cloud & Al Department","boundingBox":[476,1411,1586,1144,1603,1214,495,1483],"spans":[{"offset":34,"length":21}]},{"content":"avery.smith@contoso.com","boundingBox":[2104,929,2934,700,2952,754,2119,993],"spans":[{"offset":56,"length":23}]},{"content":"https://www.contoso.com/","boundingBox":[2121,1005,2987,765,3003,824,2140,1072],"spans":[{"offset":80,"length":24}]},{"content":"mob: +44 (0) 7911 123456","boundingBox":[2242,1095,3072,851,3093,912,2260,1159],"spans":[{"offset":105,"length":24}]},{"content":"tel: +44 (0) 20 9876 5432","boundingBox":[2336,1160,3136,911,3155,977,2357,1225],"spans":[{"offset":130,"length":25}]},{"content":"fax: +44 (0) 20 6789 2345","boundingBox":[2373,1241,3195,986,3215,1053,2393,1305],"spans":[{"offset":156,"length":25}]},{"content":"Contoso","boundingBox":[1143,1894,2316,1565,2376,1744,1192,2105],"spans":[{"offset":182,"length":7}]},{"content":"2 Kingdom Street","boundingBox":[1236,2142,2022,1876,2048,1953,1264,2219],"spans":[{"offset":190,"length":16}]},{"content":"Paddington, London, W2 6BD","boundingBox":[1282,2264,2575,1806,2602,1888,1312,2342],"spans":[{"offset":207,"length":26}]}],"spans":[{"offset":0,"length":233}]}],"styles":[],"documents":[{"docType":"businessCard","boundingRegions":[{"pageNumber":1,"boundingBox":[0,0,4032,0,4032,3024,0,3024]}],"fields":{"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","content":"2 Kingdom Street Paddington, London, W2 6BD","boundingRegions":[{"pageNumber":1,"boundingBox":[1239,2142,2512,1689,2586,1896,1313,2350]}],"confidence":0.958,"spans":[{"offset":190,"length":43}]}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","content":"Contoso","boundingRegions":[{"pageNumber":1,"boundingBox":[1144,1899,2244,1582,2308,1753,1193,2106]}],"confidence":0.951,"spans":[{"offset":182,"length":7}]}]},"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","content":"Avery","boundingRegions":[{"pageNumber":1,"boundingBox":[681,1099,1104,1000,1132,1108,709,1206]}],"confidence":0.98,"spans":[{"offset":4,"length":5}]},"LastName":{"type":"string","valueString":"Smith","content":"Smith","boundingRegions":[{"pageNumber":1,"boundingBox":[1171,984,1558,888,1586,991,1199,1092]}],"confidence":0.985,"spans":[{"offset":10,"length":5}]}},"content":"Dr. Avery Smith","boundingRegions":[{"pageNumber":1,"boundingBox":[417,1154,1562,887,1588,1002,443,1268]}],"confidence":0.973,"spans":[{"offset":0,"length":15}]}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","content":"Cloud & Al Department","boundingRegions":[{"pageNumber":1,"boundingBox":[477,1410,1587,1139,1606,1217,496,1488]}],"confidence":0.868,"spans":[{"offset":34,"length":21}]}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","content":"avery.smith@contoso.com","boundingRegions":[{"pageNumber":1,"boundingBox":[2106,937,2904,709,2920,764,2122,993]}],"confidence":0.964,"spans":[{"offset":56,"length":23}]}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","content":"+44 (0) 20 6789 2345","boundingRegions":[{"pageNumber":1,"boundingBox":[2518,1196,3189,984,3212,1056,2540,1268]}],"confidence":0.987,"spans":[{"offset":161,"length":20}]}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","content":"Senior Researcher","boundingRegions":[{"pageNumber":1,"boundingBox":[454,1313,1303,1108,1320,1180,471,1385]}],"confidence":0.98,"spans":[{"offset":16,"length":17}]}]},"Locale":{"type":"string","valueString":"en-US","confidence":1},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","content":"+44 (0) 7911 123456","boundingRegions":[{"pageNumber":1,"boundingBox":[2428,1038,3065,848,3085,917,2448,1107]}],"confidence":0.984,"spans":[{"offset":110,"length":19}]}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","content":"https://www.contoso.com/","boundingRegions":[{"pageNumber":1,"boundingBox":[2121,1006,2989,765,3002,819,2143,1072]}],"confidence":0.977,"spans":[{"offset":80,"length":24}]}]},"WorkPhones":{"type":"array","valueArray":[{"type":"phoneNumber","content":"+44 (0) 20 9876 5432","boundingRegions":[{"pageNumber":1,"boundingBox":[2466,1119,3124,913,3146,983,2488,1189]}],"confidence":0.971,"spans":[{"offset":135,"length":20}]}]}},"confidence":1,"spans":[{"offset":0,"length":233}]}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '996234f7-56a5-4491-ab03-21e4a0c57e53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:01:43 GMT'
]);
