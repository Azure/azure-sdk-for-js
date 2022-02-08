let nock = require('nock');

module.exports.hash = "4cfa2015f7ecb7f57b5895eee0b1e371";

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
  '0fa9f056-7102-4303-bbb5-a4f48f5dc100',
  'x-ms-ests-server',
  '2.1.12381.24 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmnkPnlMTltHnknDVs6mH0s; expires=Thu, 03-Mar-2022 22:01:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrqSgaic73HV0lusw5_ZVJsI1FJpHwoxhzpoaHb5gLAl57w7f7-OXVdhuAh-NZTmlpY0cxN6F6MQURdrHS4rmZcWh9RtYdSeHmp3VBoThLDgrTnybAvMu1nCZLen3UAHGGMNOD5wNULI4gexxB54nhitripMtcIQzM7ZmFegchRwggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:01:43 GMT',
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
  '01f44cc9-2428-423a-bc9d-b1481e5aa000',
  'x-ms-ests-server',
  '2.1.12381.24 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtmxjI_ICoZBt3ajDIiGuds; expires=Thu, 03-Mar-2022 22:01:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_7eQY2B18ZixcUgIwpY1a911xW2YoEAMCZdN-Av8tl8-5O4cb0zgJI3DUiahvzhzf6Ak2WrbClZuCaceYGFC84-OXqkzbvl9TjR4PMGlIKmuR9NojaPVPD1RFd6pNhCLFg--2VT8anHwQ5G0rDfqMTBuel2bgt-Jj_V_w2eQ8JogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:01:43 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2de3b343-fc64-46cb-8156-64ddb43c0be9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '78258b61-c672-4d4a-9c73-5d1d54909d00',
  'x-ms-ests-server',
  '2.1.12381.24 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aijm_ninMwZAu24EnTsUtk6U1ubLAQAAAMeki9kOAAAA; expires=Thu, 03-Mar-2022 22:01:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:01:43 GMT',
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
  'https://endpoint/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/4e53c119-4ff7-4ecc-9d0f-4c3d6e649e68?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '1218',
  'apim-request-id',
  '4e53c119-4ff7-4ecc-9d0f-4c3d6e649e68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:01:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/4e53c119-4ff7-4ecc-9d0f-4c3d6e649e68')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2022-02-01T22:01:44Z","lastUpdatedDateTime":"2022-02-01T22:01:44Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '881171b6-3d94-4e04-9dcd-035ca6320650',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:01:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/4e53c119-4ff7-4ecc-9d0f-4c3d6e649e68')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2022-02-01T22:01:44Z","lastUpdatedDateTime":"2022-02-01T22:01:44Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'f6af6c9b-a735-4849-b31e-283bb3cc6c92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:01:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-businessCard/analyzeResults/4e53c119-4ff7-4ecc-9d0f-4c3d6e649e68')
  .query(true)
  .reply(200, {"status":"succeeded","createdDateTime":"2022-02-01T22:01:44Z","lastUpdatedDateTime":"2022-02-01T22:01:48Z","analyzeResult":{"apiVersion":"2022-01-30-preview","modelId":"prebuilt-businessCard","stringIndexType":"textElements","content":"Dr. Avery Smith\nSenior Researcher\nCloud & Al Department\navery.smith@contoso.com\nhttps://www.contoso.com/\nmob: +44 (0) 7911 123456\ntel: +44 (0) 20 9876 5432\nfax: +44 (0) 20 6789 2345\nContoso\n2 Kingdom Street\nPaddington, London, W2 6BD","pages":[{"pageNumber":1,"angle":-16.0258,"width":4032,"height":3024,"unit":"pixel","words":[{"content":"Dr.","boundingBox":[417,1158,651,1105,680,1212,447,1260],"confidence":0.994,"span":{"offset":0,"length":3}},{"content":"Avery","boundingBox":[683,1098,1104,1000,1132,1109,712,1205],"confidence":0.999,"span":{"offset":4,"length":5}},{"content":"Smith","boundingBox":[1171,983,1562,886,1589,992,1199,1092],"confidence":0.994,"span":{"offset":10,"length":5}},{"content":"Senior","boundingBox":[454,1315,758,1240,774,1311,471,1383],"confidence":0.999,"span":{"offset":16,"length":6}},{"content":"Researcher","boundingBox":[783,1233,1303,1108,1317,1176,799,1305],"confidence":0.956,"span":{"offset":23,"length":10}},{"content":"Cloud","boundingBox":[475,1412,735,1348,753,1424,494,1483],"confidence":0.999,"span":{"offset":34,"length":5}},{"content":"&","boundingBox":[789,1334,835,1323,853,1400,808,1411],"confidence":0.981,"span":{"offset":40,"length":1}},{"content":"Al","boundingBox":[899,1308,1006,1282,1024,1358,917,1385],"confidence":0.785,"span":{"offset":42,"length":2}},{"content":"Department","boundingBox":[1023,1278,1578,1144,1595,1208,1041,1354],"confidence":0.995,"span":{"offset":45,"length":10}},{"content":"avery.smith@contoso.com","boundingBox":[2106,937,2903,708,2918,764,2122,992],"confidence":0.969,"span":{"offset":56,"length":23}},{"content":"https://www.contoso.com/","boundingBox":[2118,1007,2987,765,3003,819,2140,1073],"confidence":0.969,"span":{"offset":80,"length":24}},{"content":"mob:","boundingBox":[2242,1102,2417,1045,2437,1110,2262,1159],"confidence":0.992,"span":{"offset":105,"length":4}},{"content":"+44","boundingBox":[2430,1041,2547,1004,2566,1073,2450,1106],"confidence":0.998,"span":{"offset":110,"length":3}},{"content":"(0)","boundingBox":[2562,999,2659,969,2679,1039,2581,1068],"confidence":0.983,"span":{"offset":114,"length":3}},{"content":"7911","boundingBox":[2672,965,2828,919,2847,988,2691,1035],"confidence":0.993,"span":{"offset":118,"length":4}},{"content":"123456","boundingBox":[2842,915,3063,853,3081,913,2861,983],"confidence":0.999,"span":{"offset":123,"length":6}},{"content":"tel:","boundingBox":[2341,1163,2455,1124,2475,1191,2362,1224],"confidence":0.994,"span":{"offset":130,"length":4}},{"content":"+44","boundingBox":[2468,1120,2584,1082,2604,1153,2488,1187],"confidence":0.998,"span":{"offset":135,"length":3}},{"content":"(0)","boundingBox":[2604,1076,2700,1045,2720,1117,2624,1147],"confidence":0.977,"span":{"offset":139,"length":3}},{"content":"20","boundingBox":[2714,1041,2786,1019,2805,1091,2733,1113],"confidence":0.998,"span":{"offset":143,"length":2}},{"content":"9876","boundingBox":[2802,1014,2958,967,2977,1036,2821,1086],"confidence":0.994,"span":{"offset":146,"length":4}},{"content":"5432","boundingBox":[2974,963,3127,919,3144,980,2992,1031],"confidence":0.994,"span":{"offset":151,"length":4}},{"content":"fax:","boundingBox":[2375,1242,2505,1200,2525,1268,2396,1304],"confidence":0.993,"span":{"offset":156,"length":4}},{"content":"+44","boundingBox":[2519,1196,2642,1156,2662,1228,2539,1264],"confidence":0.994,"span":{"offset":161,"length":3}},{"content":"(0)","boundingBox":[2658,1151,2757,1120,2776,1193,2678,1223],"confidence":0.994,"span":{"offset":165,"length":3}},{"content":"20","boundingBox":[2770,1116,2844,1092,2863,1166,2790,1189],"confidence":0.998,"span":{"offset":169,"length":2}},{"content":"6789","boundingBox":[2860,1087,3019,1037,3038,1108,2879,1160],"confidence":0.977,"span":{"offset":172,"length":4}},{"content":"2345","boundingBox":[3035,1032,3186,985,3204,1050,3054,1102],"confidence":0.994,"span":{"offset":177,"length":4}},{"content":"Contoso","boundingBox":[1148,1896,2247,1585,2307,1753,1208,2105],"confidence":0.998,"span":{"offset":182,"length":7}},{"content":"2","boundingBox":[1238,2142,1287,2126,1313,2204,1265,2220],"confidence":0.982,"span":{"offset":190,"length":1}},{"content":"Kingdom","boundingBox":[1315,2116,1685,1991,1710,2072,1341,2196],"confidence":0.998,"span":{"offset":192,"length":7}},{"content":"Street","boundingBox":[1754,1968,2022,1877,2045,1949,1778,2047],"confidence":1,"span":{"offset":200,"length":6}},{"content":"Paddington,","boundingBox":[1279,2259,1853,2061,1883,2155,1311,2350],"confidence":0.995,"span":{"offset":207,"length":11}},{"content":"London,","boundingBox":[1871,2055,2232,1926,2261,2016,1901,2148],"confidence":0.997,"span":{"offset":219,"length":7}},{"content":"W2","boundingBox":[2250,1919,2386,1869,2414,1957,2279,2009],"confidence":0.998,"span":{"offset":227,"length":2}},{"content":"6BD","boundingBox":[2403,1863,2560,1805,2588,1889,2432,1950],"confidence":0.997,"span":{"offset":230,"length":3}}],"lines":[{"content":"Dr. Avery Smith","boundingBox":[416,1156,1609,874,1635,987,443,1260],"spans":[{"offset":0,"length":15}]},{"content":"Senior Researcher","boundingBox":[451,1314,1315,1104,1330,1173,468,1383],"spans":[{"offset":16,"length":17}]},{"content":"Cloud & Al Department","boundingBox":[472,1412,1591,1141,1608,1212,491,1483],"spans":[{"offset":34,"length":21}]},{"content":"avery.smith@contoso.com","boundingBox":[2104,929,2934,699,2953,754,2119,992],"spans":[{"offset":56,"length":23}]},{"content":"https://www.contoso.com/","boundingBox":[2116,1006,2985,765,3003,824,2135,1073],"spans":[{"offset":80,"length":24}]},{"content":"mob: +44 (0) 7911 123456","boundingBox":[2242,1095,3073,850,3093,912,2260,1159],"spans":[{"offset":105,"length":24}]},{"content":"tel: +44 (0) 20 9876 5432","boundingBox":[2339,1158,3134,916,3154,980,2359,1224],"spans":[{"offset":130,"length":25}]},{"content":"fax: +44 (0) 20 6789 2345","boundingBox":[2373,1241,3197,981,3217,1051,2395,1304],"spans":[{"offset":156,"length":25}]},{"content":"Contoso","boundingBox":[1148,1887,2317,1569,2376,1750,1206,2104],"spans":[{"offset":182,"length":7}]},{"content":"2 Kingdom Street","boundingBox":[1235,2142,2025,1874,2049,1952,1263,2220],"spans":[{"offset":190,"length":16}]},{"content":"Paddington, London, W2 6BD","boundingBox":[1278,2259,2574,1798,2605,1892,1312,2350],"spans":[{"offset":207,"length":26}]}],"spans":[{"offset":0,"length":233}]}],"styles":[],"documents":[{"docType":"businessCard","boundingRegions":[{"pageNumber":1,"boundingBox":[0,0,4032,0,4032,3024,0,3024]}],"fields":{"Addresses":{"type":"array","valueArray":[{"type":"string","valueString":"2 Kingdom Street Paddington, London, W2 6BD","content":"2 Kingdom Street Paddington, London, W2 6BD","boundingRegions":[{"pageNumber":1,"boundingBox":[1238,2142,2519,1689,2595,1904,1313,2356]}],"confidence":0.958,"spans":[{"offset":190,"length":43}]}]},"CompanyNames":{"type":"array","valueArray":[{"type":"string","valueString":"Contoso","content":"Contoso","boundingRegions":[{"pageNumber":1,"boundingBox":[1148,1896,2247,1585,2307,1753,1208,2105]}],"confidence":0.95,"spans":[{"offset":182,"length":7}]}]},"ContactNames":{"type":"array","valueArray":[{"type":"object","valueObject":{"FirstName":{"type":"string","valueString":"Avery","content":"Avery","boundingRegions":[{"pageNumber":1,"boundingBox":[683,1098,1104,1000,1132,1109,712,1205]}],"confidence":0.979,"spans":[{"offset":4,"length":5}]},"LastName":{"type":"string","valueString":"Smith","content":"Smith","boundingRegions":[{"pageNumber":1,"boundingBox":[1171,983,1562,886,1589,992,1199,1092]}],"confidence":0.984,"spans":[{"offset":10,"length":5}]}},"content":"Dr. Avery Smith","boundingRegions":[{"pageNumber":1,"boundingBox":[415,1151,1564,885,1592,1003,442,1268]}],"confidence":0.973,"spans":[{"offset":0,"length":15}]}]},"Departments":{"type":"array","valueArray":[{"type":"string","valueString":"Cloud & Al Department","content":"Cloud & Al Department","boundingRegions":[{"pageNumber":1,"boundingBox":[475,1410,1579,1143,1598,1220,493,1487]}],"confidence":0.858,"spans":[{"offset":34,"length":21}]}]},"Emails":{"type":"array","valueArray":[{"type":"string","valueString":"avery.smith@contoso.com","content":"avery.smith@contoso.com","boundingRegions":[{"pageNumber":1,"boundingBox":[2106,937,2903,708,2918,764,2122,992]}],"confidence":0.968,"spans":[{"offset":56,"length":23}]}]},"Faxes":{"type":"array","valueArray":[{"type":"phoneNumber","content":"+44 (0) 20 6789 2345","boundingRegions":[{"pageNumber":1,"boundingBox":[2517,1196,3185,982,3209,1056,2541,1269]}],"confidence":0.986,"spans":[{"offset":161,"length":20}]}]},"JobTitles":{"type":"array","valueArray":[{"type":"string","valueString":"Senior Researcher","content":"Senior Researcher","boundingRegions":[{"pageNumber":1,"boundingBox":[453,1313,1303,1107,1320,1179,471,1384]}],"confidence":0.979,"spans":[{"offset":16,"length":17}]}]},"Locale":{"type":"string","valueString":"en-IN","confidence":1},"MobilePhones":{"type":"array","valueArray":[{"type":"phoneNumber","content":"+44 (0) 7911 123456","boundingRegions":[{"pageNumber":1,"boundingBox":[2429,1038,3062,848,3083,918,2450,1108]}],"confidence":0.984,"spans":[{"offset":110,"length":19}]}]},"Websites":{"type":"array","valueArray":[{"type":"string","valueString":"https://www.contoso.com/","content":"https://www.contoso.com/","boundingRegions":[{"pageNumber":1,"boundingBox":[2118,1007,2987,765,3003,819,2140,1073]}],"confidence":0.977,"spans":[{"offset":80,"length":24}]}]},"WorkPhones":{"type":"array","valueArray":[{"type":"phoneNumber","content":"+44 (0) 20 9876 5432","boundingRegions":[{"pageNumber":1,"boundingBox":[2466,1118,3125,913,3147,985,2489,1189]}],"confidence":0.971,"spans":[{"offset":135,"length":20}]}]}},"confidence":1,"spans":[{"offset":0,"length":233}]}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  'a86e4d87-bcaa-41be-ae45-497e553dfef8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:01:50 GMT'
]);
