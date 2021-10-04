let nock = require('nock');

module.exports.hash = "11648f09d662ae1e1d4f336a4e5a8f0c";

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
  'ce3ba763-ede5-4edb-83d1-d26faa420a00',
  'x-ms-ests-server',
  '2.1.12071.28 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AsCK8uV6XmdJorlmV9Vd9sg; expires=Wed, 03-Nov-2021 18:20:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrqFE6Mq2myq8Pb7Qn91K3P26o6cGpo-ztimshQZaoa5bToT7csagNv50KdMOcvhnbQrC_bC9IBpK5ln89TI_1iMk9393vRbShRjjq65OctIn-rCwx-p2igeJTyQME0VwQWUkJxJD8g-6D-bBlXrZF0xenqdO0TAl_64YQMJlIe0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:20:51 GMT',
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
  '511996ed-38c2-4eb7-9c95-23b8678b5000',
  'x-ms-ests-server',
  '2.1.12071.28 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ao1YD8jetrpOmE06d4J6MSA; expires=Wed, 03-Nov-2021 18:20:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_U9DIvqqKjwqOovh-ib5qgX8KAQayhccWfATs3pv6b9FPZ6mmc2o8023LznPu0zAIBW0QlNIjwvi7JxhugunhrQMo6egbMzrmIbhiZ0CO74Uko2Tqo2zCp-kjayYIsnwAYiE4TTOofjkX-02cL9QI54h3N5OnHg2j3okYhiCvBAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:20:51 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=42b3207c-77e9-44b7-ae55-9591b97807f6&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '4d3531ec-ed2c-47b4-8b5c-f6714ce44a00',
  'x-ms-ests-server',
  '2.1.12071.28 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhhKi79y9nVBlkZlrfffBGk; expires=Wed, 03-Nov-2021 18:20:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:20:51 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/prebuilt-businessCard:analyze', {"urlSource":"https://storageaccount/testingdata/businessCard.jpg?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/fd9cafa7-bad5-42c4-aa26-7d8f7b0fc55a?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '547',
  'apim-request-id',
  'fd9cafa7-bad5-42c4-aa26-7d8f7b0fc55a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:20:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/fd9cafa7-bad5-42c4-aa26-7d8f7b0fc55a')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2021-10-04T18:20:52Z","lastUpdatedDateTime":"2021-10-04T18:20:52Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '57066f60-1060-4977-8983-f33fe1585694',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:20:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/fd9cafa7-bad5-42c4-aa26-7d8f7b0fc55a')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2021-10-04T18:20:52Z","lastUpdatedDateTime":"2021-10-04T18:20:52Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'c074361c-a0e6-4750-ba14-0665521657f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:20:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/fd9cafa7-bad5-42c4-aa26-7d8f7b0fc55a')
  .query(true)
  .reply(200, {"status":"succeeded","createdDateTime":"2021-10-04T18:20:52Z","lastUpdatedDateTime":"2021-10-04T18:20:54Z","analyzeResult":{"apiVersion":"2021-09-30-preview","modelId":"prebuilt-businessCard","stringIndexType":"textElements","content":"Dr. Avery Smith\nSenior Researcher\nCloud & Al Department\navery.smith@contoso.com\nhttps://www.contoso.com/\nmob: +44 (0) 7911 123456\ntel: +44 (0) 20 9876 5432\nfax: +44 (0) 20 6789 2345\nContoso\nO\n2 Kingdom Street\nPaddington, London, W2 6BD","pages":[{"pageNumber":1,"angle":-15.8319,"width":4032,"height":3024,"unit":"pixel","words":[{"content":"Dr.","boundingBox":[422,1161,641,1114,661,1216,441,1258],"confidence":0.998,"span":{"offset":0,"length":3}},{"content":"Avery","boundingBox":[661,1109,1104,1006,1127,1113,682,1211],"confidence":0.995,"span":{"offset":4,"length":5}},{"content":"Smith","boundingBox":[1158,992,1565,888,1591,994,1182,1099],"confidence":0.995,"span":{"offset":10,"length":5}},{"content":"Senior","boundingBox":[450,1317,757,1240,773,1310,465,1383],"confidence":0.997,"span":{"offset":16,"length":6}},{"content":"Researcher","boundingBox":[771,1236,1304,1108,1321,1175,786,1307],"confidence":0.993,"span":{"offset":23,"length":10}},{"content":"Cloud","boundingBox":[475,1414,732,1351,749,1422,493,1483],"confidence":0.995,"span":{"offset":34,"length":5}},{"content":"&","boundingBox":[778,1340,819,1330,836,1401,795,1411],"confidence":0.994,"span":{"offset":40,"length":1}},{"content":"Al","boundingBox":[888,1313,998,1286,1014,1358,904,1385],"confidence":0.773,"span":{"offset":42,"length":2}},{"content":"Department","boundingBox":[1012,1282,1585,1142,1600,1209,1028,1354],"confidence":0.996,"span":{"offset":45,"length":10}},{"content":"avery.smith@contoso.com","boundingBox":[2107,938,2902,713,2915,762,2119,984],"confidence":0.988,"span":{"offset":56,"length":23}},{"content":"https://www.contoso.com/","boundingBox":[2121,1006,2990,762,3003,822,2137,1070],"confidence":0.992,"span":{"offset":80,"length":24}},{"content":"mob:","boundingBox":[2243,1103,2415,1048,2432,1112,2259,1163],"confidence":0.993,"span":{"offset":105,"length":4}},{"content":"+44","boundingBox":[2428,1045,2547,1007,2563,1072,2444,1108],"confidence":0.994,"span":{"offset":110,"length":3}},{"content":"(0)","boundingBox":[2559,1004,2658,973,2675,1039,2576,1069],"confidence":0.997,"span":{"offset":114,"length":3}},{"content":"7911","boundingBox":[2671,969,2823,923,2839,988,2687,1035],"confidence":0.989,"span":{"offset":118,"length":4}},{"content":"123456","boundingBox":[2836,919,3063,851,3079,913,2852,984],"confidence":0.983,"span":{"offset":123,"length":6}},{"content":"tel:","boundingBox":[2338,1165,2452,1127,2469,1189,2355,1219],"confidence":0.991,"span":{"offset":130,"length":4}},{"content":"+44","boundingBox":[2464,1124,2586,1084,2603,1150,2481,1185],"confidence":0.989,"span":{"offset":135,"length":3}},{"content":"(0)","boundingBox":[2599,1080,2693,1050,2709,1119,2615,1147],"confidence":0.997,"span":{"offset":139,"length":3}},{"content":"20","boundingBox":[2705,1047,2783,1022,2799,1091,2721,1115],"confidence":0.983,"span":{"offset":143,"length":2}},{"content":"9876","boundingBox":[2799,1017,2959,969,2975,1034,2815,1086],"confidence":0.991,"span":{"offset":146,"length":4}},{"content":"5432","boundingBox":[2972,965,3128,919,3143,977,2987,1030],"confidence":0.992,"span":{"offset":151,"length":4}},{"content":"fax:","boundingBox":[2375,1244,2510,1202,2527,1267,2392,1304],"confidence":0.983,"span":{"offset":156,"length":4}},{"content":"+44","boundingBox":[2522,1198,2640,1161,2658,1228,2540,1263],"confidence":0.997,"span":{"offset":161,"length":3}},{"content":"(0)","boundingBox":[2652,1157,2749,1127,2767,1194,2670,1224],"confidence":0.997,"span":{"offset":165,"length":3}},{"content":"20","boundingBox":[2761,1123,2841,1098,2860,1165,2780,1190],"confidence":0.988,"span":{"offset":169,"length":2}},{"content":"6789","boundingBox":[2858,1093,3017,1042,3036,1107,2876,1160],"confidence":0.983,"span":{"offset":172,"length":4}},{"content":"2345","boundingBox":[3030,1038,3185,989,3204,1050,3049,1103],"confidence":0.961,"span":{"offset":177,"length":4}},{"content":"Contoso","boundingBox":[1145,1900,2243,1597,2298,1748,1206,2106],"confidence":0.997,"span":{"offset":182,"length":7}},{"content":"O","boundingBox":[631,2075,855,2032,926,2430,687,2472],"confidence":0.907,"span":{"offset":190,"length":1}},{"content":"2","boundingBox":[1234,2141,1287,2124,1314,2208,1260,2224],"confidence":0.984,"span":{"offset":192,"length":1}},{"content":"Kingdom","boundingBox":[1303,2119,1683,1992,1711,2074,1330,2203],"confidence":0.997,"span":{"offset":194,"length":7}},{"content":"Street","boundingBox":[1736,1974,2020,1874,2049,1943,1764,2055],"confidence":0.997,"span":{"offset":202,"length":6}},{"content":"Paddington,","boundingBox":[1277,2262,1843,2069,1871,2158,1305,2349],"confidence":0.995,"span":{"offset":209,"length":11}},{"content":"London,","boundingBox":[1859,2063,2219,1936,2247,2020,1887,2152],"confidence":0.997,"span":{"offset":221,"length":7}},{"content":"W2","boundingBox":[2235,1930,2379,1879,2407,1958,2263,2013],"confidence":0.998,"span":{"offset":229,"length":2}},{"content":"6BD","boundingBox":[2395,1873,2555,1815,2583,1889,2423,1952],"confidence":0.997,"span":{"offset":232,"length":3}}],"lines":[{"content":"Dr. Avery Smith","boundingBox":[421,1157,1612,875,1638,989,444,1258],"spans":[{"offset":0,"length":15}]},{"content":"Senior Researcher","boundingBox":[450,1315,1316,1105,1333,1172,465,1383],"spans":[{"offset":16,"length":17}]},{"content":"Cloud & Al Department","boundingBox":[475,1414,1593,1140,1609,1209,492,1483],"spans":[{"offset":34,"length":21}]},{"content":"avery.smith@contoso.com","boundingBox":[2107,932,2937,703,2952,753,2120,984],"spans":[{"offset":56,"length":23}]},{"content":"https://www.contoso.com/","boundingBox":[2120,1006,2988,761,3003,822,2136,1069],"spans":[{"offset":80,"length":24}]},{"content":"mob: +44 (0) 7911 123456","boundingBox":[2242,1101,3076,846,3094,908,2259,1163],"spans":[{"offset":105,"length":24}]},{"content":"tel: +44 (0) 20 9876 5432","boundingBox":[2337,1160,3134,917,3151,979,2356,1219],"spans":[{"offset":130,"length":25}]},{"content":"fax: +44 (0) 20 6789 2345","boundingBox":[2375,1244,3195,985,3215,1051,2394,1304],"spans":[{"offset":156,"length":25}]},{"content":"Contoso","boundingBox":[1145,1901,2319,1578,2372,1749,1205,2105],"spans":[{"offset":182,"length":7}]},{"content":"O","boundingBox":[631,2072,1063,2006,1106,2387,688,2473],"spans":[{"offset":190,"length":1}]},{"content":"2 Kingdom Street","boundingBox":[1233,2141,2024,1872,2051,1953,1262,2224],"spans":[{"offset":192,"length":16}]},{"content":"Paddington, London, W2 6BD","boundingBox":[1277,2263,2572,1808,2601,1894,1307,2349],"spans":[{"offset":209,"length":26}]}],"spans":[{"offset":0,"length":235}]}],"documents":[{"docType":"prebuilt:businesscard","boundingRegions":[{"pageNumber":1,"boundingBox":[0,0,4032,0,4032,3024,0,3024]}],"fields":{"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","content":"2 Kingdom Street Paddington, London, W2 6BD","boundingRegions":[{"pageNumber":1,"boundingBox":[1231,2142,2509,1682,2587,1900,1309,2360]}],"confidence":0.97,"spans":[{"offset":192,"length":43}]}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","content":"Contoso","boundingRegions":[{"pageNumber":1,"boundingBox":[1145,1900,2243,1597,2298,1748,1206,2106]}],"confidence":0.681,"spans":[{"offset":182,"length":7}]}]},"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","content":"Avery","boundingRegions":[{"pageNumber":1,"boundingBox":[661,1109,1104,1006,1127,1113,682,1211]}],"spans":[{"offset":4,"length":5}]},"LastName":{"type":"string","valueString":"Smith","content":"Smith","boundingRegions":[{"pageNumber":1,"boundingBox":[1158,992,1565,888,1591,994,1182,1099]}],"spans":[{"offset":10,"length":5}]}},"content":"Dr. Avery Smith","boundingRegions":[{"pageNumber":1,"boundingBox":[416,1148,1567,888,1594,1007,443,1268]}],"confidence":0.978,"spans":[{"offset":0,"length":15}]}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","content":"Cloud & Al Department","boundingRegions":[{"pageNumber":1,"boundingBox":[475,1413,1585,1142,1603,1215,492,1485]}],"confidence":0.989,"spans":[{"offset":34,"length":21}]}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","content":"avery.smith@contoso.com","boundingRegions":[{"pageNumber":1,"boundingBox":[2107,938,2902,713,2915,762,2119,984]}],"confidence":0.99,"spans":[{"offset":56,"length":23}]}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","content":"+44 (0) 20 6789 2345","boundingRegions":[{"pageNumber":1,"boundingBox":[2519,1197,3185,989,3206,1057,2541,1265]}],"confidence":0.99,"spans":[{"offset":161,"length":20}]}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","content":"Senior Researcher","boundingRegions":[{"pageNumber":1,"boundingBox":[448,1315,1304,1106,1321,1177,465,1385]}],"confidence":0.99,"spans":[{"offset":16,"length":17}]}]},"Locale":{"type":"string","valueString":"en-IN","confidence":1},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","content":"+44 (0) 7911 123456","boundingRegions":[{"pageNumber":1,"boundingBox":[2425,1044,3062,849,3082,914,2444,1110]}],"confidence":0.99,"spans":[{"offset":110,"length":19}]}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","content":"https://www.contoso.com/","boundingRegions":[{"pageNumber":1,"boundingBox":[2121,1006,2990,762,3003,822,2137,1070]}],"confidence":0.99,"spans":[{"offset":80,"length":24}]}]},"WorkPhones":{"type":"array","valueArray":[{"type":"phoneNumber","content":"+44 (0) 20 9876 5432","boundingRegions":[{"pageNumber":1,"boundingBox":[2461,1122,3127,915,3148,982,2483,1190]}],"confidence":0.989,"spans":[{"offset":135,"length":20}]}]}},"confidence":1,"spans":[{"offset":0,"length":235}]}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '625f6966-1521-4436-9d4a-2f040bf868c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:20:57 GMT'
]);
