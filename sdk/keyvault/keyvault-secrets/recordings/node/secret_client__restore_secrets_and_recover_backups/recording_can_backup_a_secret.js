let nock = require('nock');

module.exports.hash = "d9b266a98c31754155e3c9e8b5f8ef15";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9f30c611-f82f-48f6-92f9-4df7d0170d16',
  'x-ms-request-id',
  '55e9f89b-c1e4-46e5-bc50-4ce92b6ca1c6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:25 GMT'
]);

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
  '0645719d-1f97-4ee7-9039-c3ed26a48001',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgEcO6Mgn-9Lr10m3z7WdtjmR1YbAwAAAICrG9gOAAAA; expires=Fri, 28-May-2021 19:20:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSF9DuB23ZTZnpZi-qL85IC7RQO996OcUjN8_kDU82c8NppKHi94l6Z0afVHCaDX2Ona33b63wUUAz5IqJHy0iNW_xmVxrT-IEubIH2iSSKErZhSStPG1F_NWVKXbZppVT25zZlSzLTYK69623187YXYjfiaGPHUStRG4-b7K8RsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:20:24 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'b3f7ae6a-d847-4425-b47a-9ebdba80e900',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgEcO6Mgn-9Lr10m3z7WdtjmR1YbAwAAAICrG9gOAAAA; expires=Fri, 28-May-2021 19:20:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhdPbeEJ7J-UlO1Lw1AOsm3dTKK44wgNX7j7t7y4G0EAi7nBpo3zXJ-MBZThpbAfhoKnGkzRbDJHmWKaxF1gwLA7MtZRxd4_KwpEzUH8M50bAiT4eCYbSQQbS6r4UDDtn7ElJLHWtQbuexUsH79igxpHlwuPM1XhUs4aWUeULJ74gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:20:24 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  'b3f7ae6a-d847-4425-b47a-9ebdc080e900',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgEcO6Mgn-9Lr10m3z7WdtjmR1YbBAAAAICrG9gOAAAA; expires=Fri, 28-May-2021 19:20:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:20:24 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canbackupasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/a1eca6d2b76a41b2801fbf4d4480ae32","attributes":{"enabled":true,"created":1619637625,"updated":1619637625,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9f30c611-f82f-48f6-92f9-4df7d0170d16',
  'x-ms-request-id',
  'df3befae-721e-4dab-b14b-ef6aa1722804',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:25 GMT',
  'Content-Length',
  '299'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canbackupasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAudFJHdnN2ZzNmOXZWOWIxVDQ1by1odkd5SFZVUEptajNwSnkwcGd0MTEwcVJYUGdMdmdXNHE5RmMwX2Z5U1dESFNaRUJmYXlVcXFGb0RJTXZRelNKSGpnRTVhS2M4MzhmZjZ6cTJsbVBHSXVya0VpMG1wZGFKbFIzWW1RYXFXUzNSWHNWczVjVmZVNGxiR083Uk5YdzhKczFrbTVROGpMVnJVTWVSWUhPbVFCQnNReTkyWFlILVhwT3pOS1MtVVRQVENsTU8tRTVDYURrak96Q2FwdGxpdVcwbzhhNG4xLUxOZ3N2RkFRUTdiUEJtQU40WWM5VmIzY3QwZzFETUhMbnlrdlZQckVnSGVpT2dMQ2RvWHpvMl9VbTRLNm9Od0daTHY2SUg3Q3pUUzA0djBFS1ZTT2RGNmgxWFVpcjY2N2YtUndhaTNibXJfazlaaUxpbnRHak9BLlc5eEY3ZUJ6QjNIblVJVWh4ZVhMMFEuSG9KRjU0MElqOGFXWjZmUVpBN0k2VGJnU19RcXF2LXE4ck1KallOQmU5dlgxT0Y1TFQyVlYyamRxRWhDb0JqQmlHNTdfSDdZb1lCUUlXaU15Ti1weWFEUE1HVmo1NzRqQWN2NWs1NlkzTmpudU84ZVI0aHhSMVU5b2JBaEhuX3l2cUhEZ1lncUdIU2gzOTZ6TndKRDBoNTdtYWozWTZZMEVYcmFqY0NFVkRDcEdnRWMydVRJNTRjaFhrUEV3LWNjemFGdlBQdWFyM3N6NjUteDVIbmpab3R2NkxlcGlQdjNqb1psczFfMlhpMGRkQTdlcnBZNllOaFM4ZDJEblZUbGxSWjh6WUdZTXpHVDF2YVhWN0RnMmxHX0Q2X3BFVVhuVGt6T1czdHFfMU5iVkpfa1BZdnBtTUUwUkVwbG9SR1U1TGpDN0VwRDdNVExEQl9pcGNCWXkzS0JmaHJPTzk0TklxTnpFU2tYNUZxYW80Y3dOT2QyRHJxT05WYWFEQjBzZHdyeDF0NXlxRW9DYTlwRVk3ZW1ONFN0VnQyeUMzOWFLLXZjUEVuaWlETkhQTlVoU0ltQ1p6WGV4UWFDdmU4Zlp0OWRBRWtjZ0lBVHdLZE4zdEZZbjNBdklqYzB4bVVsZWF5dkFlcjdwRnM0LVVYbW1oZ3RIMlFfYV9OMV84RjJGT2hHZXA3UWI3QThzSDlSSll4OTFma0J0Z2ZYcmt0c2pXZGpNM0VlSi1OMWE0aDlCNnhmbVZNZnFfNWkyZXc4NjM4Z2kyZ3lqVFpGYmk0eVVPME1WYmFFN1MxUG1hQ2N2azEzYXMwVmx2dElFbW5tTTJwT2htdnVidU9Xb1N4RjVwcVVvRV9lZVRoVGJ0MDIzYll2NHF4cFByck53b01qR0dDTFVRb3FuNEFpWm9CUklSRkJOZXBGYS02M05EWU5HN05PQVdqQ3Y2dUpib0ozMVVoZVhtSVhEUVhfTXpCcnlXZTRhc243OUdmSVMxZUpscFYxT0pjVHE4SVdDeVdha3dWSDJTVTVDUzNKaDJBdVp3VjZqLS0zRm1GZk1USFR3cWR6djFIYlB1RXZ0c1RSazUtLU93RE5HMWRyQ0hVR2lubmlqRHZkMGU0elhjNE5uQmR0WjVpbG9MdlBwamp2ZDNWMkJtS2JjTnBMR01Ua1dndnJJUTFlNnpRdGNWbzV5R1QwZG1CcTJHNEJMcjJqNjcwcXRhRjBZQjRxZDJRdnpRRGx0WHpqR2ZMX0RFODZPN2lyRGtaNHhrZ0UwaWNvdHRCQ01pRUNoZ2h0elNkMmV6aWoyQ0tuazJwMUVfaHBUYWlkazdrVm9FOUlTR283OEdDZzJ1eHh1SGl5Vm1aVmF4SlJDdGtHM0UwV2xRclRUSndKX280VWwtWDdqdHBDTU1HOXBXSk1TRDRfcjZ0bG9sWnU1SXNQaVRwV3MzYkhTQksxbXgtbHBwQm5lWTVYUHpNcnZPSHlOaVA4Q3ItQ2MyQV9TS2NBcTV5N0VudDFfbGxKeERVaXV4c0FfVkNneTM4Ykw3U1l3bDZ5eHVPaHF2UzVEX2JBQmRzVGlSQXQtT1FPdjlaMS1KMHhjZDhSdm51SjJfYUdMYWZycm01aW5MOG5BOVEzQmN3a2xYQVdVUkpBSmQwSC1aQ0h2OE1IMmx6bGhydHBmN1dWcjVFd0ZPSUY5NjM2R2xhSTJGcl9JendkLWJmbkdPRWNURktPY1hmWmlSdUdiN1Y0T2cwSVNJZGtGVDE0cDN2TWJQWHBiRTVQMWczdFQ4MFJ5QWNnU3JEclloZURVTzY5WHBWUFdoODdGN2pqRzZsV0hjZUprSVNjekZWSmtLb0ptbWdJZW1WQWhQRmpZRWpPUXpWSHVQeHF6N2d3WjZtamxMcVpFeThYNWFIZnM5QzBTVUhzM0pfSnk3cWt4RXZ2d0QyTDRTLTZkcjdCMUQ4RmxqUko4TXAtY294ZVNxNVBTeEg3SGVZSXc3MDZCN1FCSUtXcldhS296a1JCc1Bpc0ZTZXQ0eFBOZ2Y4RmZCVTNVNXM3T09uSm16WlJyVmJzWGRQTnRRUzhaRkxZeUZFNVN0MWtkbmZnYV8wdm1kaEl2TVowR1c4cVNOLTkzdWF0NnI3TGJZYnlQTUpXTGNraHVXemtJeE1KeENFSmJjREgyZGdxTFViV1FUeGF5QW8wNjNYdFlXbWFrcTlkWENCamdkcTVPekF5aHlERGFFZllCZ2puQy1Yb2pBVVJKV0RhMjNTT091cVljRHV2aDV0bE1yNDh0YmhRZllmdjhJLXlENy1LV28zT0lCbE1NSklmcmY2TWVDSWQxcWwyNVpleWlleDk0aWFFdVNhYmQ2Sk1jOW1XT3I0NkU4aXloZXpyd3VzekZsdG1JTkdhXzRRTmM3Y3JUeG5aRF9SVG9BRXBYRzBVUlJhcHhYT0d5REFvMGZrX1BzeG5LbU9vN3FPTTh3Umk4SG1hT2tja1dlMHpQSVh0MTRxWkFvdUZjNVlBb202Y1JmSURJci1tSnR4eVJVM1lhSUxsMXE2RmF1VDJjYmk2YTNTSlg1U3UzdncyY0NkaWxXYzUxWk80MEFXY0ZOd01NbGZwMTNiazg0b1F5aUtScTR0MnZ2TGF1ZC01dWNfcDRIX3NORDRxZEhsbXFIV2hyUFpEeS1URFdPSWVHMFVmN0JJS0JPTnloVjhYYmVoUk9GNktySU00Ri1oc1kwOFltemY4VFBRZmwyVktycWRiWG1LMWE1M2lPaXlkdkdVYU53OXVwVG5fOWo4ajVQeVhPMGNLeGVkeWhzQXliWlMzTGhjcXd1TERidmVoRUlUdUdHUzBOckRMT0haaExwWm1Dc3ZRYV96ZjA5Z0Z4dTZ5UmlreVJiZFJYakJZU2lXQU01Z21lQnhuWWJuYlpVcmFGZDh3MWN4d0pseWJzRldHRnlBMF83Ukp5SjZCMlp1bzdaaEJaMkJiMGNtVlBUa3dYRE1Jdi0wUzZiZlpoT0g3WWxUckdCTHo4ZlUyYTdHbW5Kc0pVTzVqd3hfLVR4N2hPb0ljM0Q3d0ZWaHBKYmJrTmgwazJtTXQ1Z0MtQl9oWXJpS2laTVJRdG5UV2E1bERncGNMblk4b21iUFR4Z3pOZ0ptNHV6N25Wd0hxcXZzb0laZVg5YU5hTGNoY2FDenIwRTR6MkoxdUYtV28xLUVQQm9kMkU5cEhSNFhRVHpDMDVMcmNFT1NBMWcyNWhZeEdtN3pWMjRWd1V6WEhMRmNvZng1NkpEV0hDRUc5TWFaang1OVZlNnBVV0IwWG5yWFMxekhKcEJtMEdpYTJHZ1dWU3ZEbkRvTC0tRXAyTjNwM3V2cUtVZFYxbW94N0RoczQyV1hiYkM4RktBYjFVTW83ZVVCeEMwekd0R3NCZm85ejE0b1JpV3FZVzU3RkM4RmFvdzJZZE5meHdteWxtd1lFa1Q5ZV90NnFvVWdYVV9zdGt5cEJMZHl2Z1pXYWc2YnBqZ3pxOUk4NUhJbW90SVl4djc4bkxMS0ZMazlhdmdEVGNVVEJTb3h0WDFtZ0h5MFdaS2JMVFV5cVFVeG13S3R2aW0tNVRMa24yZ0NJbXF3cUY3MWJXZlU5T25TM2hrR2dpbk1WY0VZWVlFVWlKUkZzZTVIN0JsbzZucklCT3dQajM5ektoOGpMcTkxN1doU3dSQm44UGVFYndHV1dVNUw3UVM0c1ZTNGdRVnBnbWt4dlNUbnBqUGFlOHZ2eDlZMUxwRDh3c21PUkNBU1dhanhQTFhSaUtBS2YyWVdQNTRXbHExSjVvWmxuYXlzdmtGa0xwdGJKLWFhbktyem0xSWhMdExRR0g4bmMyYkF5VTBjeVQ5Tkt1YWxkN001c1Nsa1FXTVN6X01kTTBGMkpBM082cEJnd2k1eDZTQnBUdjZpZllCZXgzeFhjdG5UMXhLWHd5b1p5VDU5a0p2Tld3Wng1YndOUzk5QldlRERNWjZkN1lvWnpEWUg5VWFrVGo2WTNYWWNRUUJqdWlxbVM4VnBROVptU1U3S0pmVkgyRHpJWUJxS3BURFNJVkxqcnU5Um9SVGhoUzg3TGFXb0dhVUJSRGtlUXZWTExGbUt2M2x0S0IxVGRtTnpQQ2FWZ2Ztc2MwWFlZaU96OF9aRmVoZThoUUVxaWhDdEdPNFVVNWRGSkV0V3U5X3lsWWFmSFRIRFpnN0J0V2Z5X3M1X25qc2EydkwyOFoxWnZLZ1MyQ3ZYNHpfYlF1TWZmVVBKTldYaW00S0JkRWtyZUhQUlJ0ZVJPX21kMUxyMXVjb3RuZzhhV3RaRDJoeGQzZnBrbUxta09rMTJ0ZW42eXlldXI1bUxHVy1qSHZkUW4xVld5UDY2R2p1S0l0ZlVWWl9nX0dCdHBzT1FfQTdnRUpLZE8yMW5Md3RLUHN1R2VwRTJfMjh0Q2d0bDVOVUJzd1JiZXgtU2x6a3h1clZLcDhSMTFxZERWQTZMa3lWQjVWanZYTHBPT2JYTFdQd0d1ZzdUS1RPUFJjdnh5b1h1X0hHazFWUFZhd3lHMnp5UFQ5U2VuUWd1Skd6TWJiX1FiXy12NGd2NnNqT0EtMGFrX3kwYlNJYjF3elZ1QVdEY3RTTDBuSkRBWXlOTUF4eWx3ZTdQZTFkdWhMNHpoRnVrWjBFQnVZQkllTmhiNVFFeGNkd01IUjE4RnFiS3V3aFhxdEhpenZUc2dURVlKSXpmRHhvLVJiRjFmcE1NTU91Y3RiOHYwUHpPdnRXVEk1Zm5xU1BWSExBeW9YTW9HUkUwdF92TDZaZS04MHFmd25BS0NkMFBKR1JTZXVWbFlzT1FwMkZaWVo0NjZjNjRFMW9jOEo4NjVMY09lUWlLR2lIRW5PSnZJZnkxLU5xVzVyanBucjZVVEt2amY2MjlsZmJTN1l5aC1OSktQYXh2bDZiMmVpcXNHdXlRb1pKSUZFY0wtVDJQaHJNRDlkLVRJbmJYOWlMbGhaNFlMcExrZTNhbWlubE1qX1A0aHJUXzM4ZlBpeU5vclk3M0t6aFgycFYwVDNuakQtcVhTVzB5MnhFcDJ3am1Tdkh3X0Yta0xXc29zQWRkS19HUFItbzV0bkNyeHNOVXJ1a0hqVmJGcGNvZDY4bjVjT0I3eWF3NnNWYkgtdmJDZVV4eGg1clIwVEp4QnE5OXZQZlZyY3lhY3N2UFNFU3lhTnd2cW1Vb1VCazFaaGFHWmVob1lCT281MzNua0wyZVBDSzRINkNzTEtENDExakxyc2lvUW1IWERwUk1vZWJZU0dCTENYSFVnWHZFY25DbV9HVVBYV1Q0c2cyQWp3d3VSUnFGTnQ2UmUwZHNJVTgzVE9HRjhMWlBpTVBVbjVKbEhFNGJlanoxSi05bXhaQmlhQnNRNTEyVU5adC1jNjVoSW5kWXNDZVp6aFJ2ZXYycEt4bzQtNFlHcHNNZlRoSXZyMkVQYU5rNnJiZG1YMUNKQTBvMVhLanQzWVEuZ0R0dzFxZW14ZWZaRmduV0lYWGx2cUZMSHZ0RmRvUUcxei1nX1ZnZzZXMA"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9c6052c5-1d7f-4880-baa6-da00dac303da',
  'x-ms-request-id',
  '29c0c85d-2839-46b3-872b-8f53f5779ee3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:25 GMT',
  'Content-Length',
  '6266'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canbackupasecret-","deletedDate":1619637626,"scheduledPurgeDate":1627413626,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/a1eca6d2b76a41b2801fbf4d4480ae32","attributes":{"enabled":true,"created":1619637625,"updated":1619637625,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '97b550ff-68b5-4f16-b0e7-95bddfc635cc',
  'x-ms-request-id',
  'a380281b-4082-4c27-a87b-f112c9fe9b9d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:26 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f8f5cd73-c927-41d3-a0eb-53d4221606a1',
  'x-ms-request-id',
  'a2f9afd3-acfa-4d0c-b41d-7ff161458b2a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '839ccbf6-adfa-409c-8939-51cf74b774af',
  'x-ms-request-id',
  'f18d873b-07be-44d2-9366-03e0ad82fc21',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ba823a77-491f-4d58-b45a-78bd52578600',
  'x-ms-request-id',
  'cfffb3a4-bafa-45d8-bb68-6140f4f3adc1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '816943a0-706d-4156-baee-2826f1ed9fac',
  'x-ms-request-id',
  'ee927866-0e95-4107-a9ae-fe2edd6a363c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cc552cce-44e6-431e-a22a-9330fd9286fe',
  'x-ms-request-id',
  '48ae4f3a-4cfb-4f24-a071-a12fb73c8368',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f5dfa237-6bfc-4c0c-86de-395a1b343a29',
  'x-ms-request-id',
  '3e38ab95-3155-43fb-bca5-00bd0c5ffd35',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f7c247c1-02ab-449c-98b4-af36f3e16a06',
  'x-ms-request-id',
  '599f8238-c269-47f3-83c4-c437c48edf1c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c7264bb0-1b39-4099-9812-1dc55eed7c11',
  'x-ms-request-id',
  '02e1dada-3ed3-408a-8b26-9992c7749647',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bf2c03c4-2ae4-4d30-a963-1530ac354a6e',
  'x-ms-request-id',
  'd30a97c4-654f-4bd4-bb1c-ad0372984798',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '014a18cc-f9fd-41cf-901a-4245265d3310',
  'x-ms-request-id',
  '9b44866a-dc98-47ab-af5d-4542e41444e2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '52d37c46-5ae6-4cc0-836a-62fb173d77f0',
  'x-ms-request-id',
  'f50a6d55-fb62-4314-be9c-dd9c2e0f7758',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0f05398f-2844-447b-82f8-87d69434fd14',
  'x-ms-request-id',
  '082feca0-a260-4850-8648-3bdced485f2f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2757571d-8475-4b6d-93c8-03646558cb74',
  'x-ms-request-id',
  'c89c0b6b-91f0-48ee-9070-fd665b0cafcc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1bc4efae-6833-4eb4-86d2-1ee4c184e427',
  'x-ms-request-id',
  'da2c9703-5a74-4c65-bf86-bc3cbbff4fa3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3e4b509c-bdbb-4855-99b4-1adb2a3bec6b',
  'x-ms-request-id',
  'b7b8b018-87a8-463a-9e88-461c41fb2988',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ab2ca107-e109-4445-9f38-70fe56060bc8',
  'x-ms-request-id',
  'da66a1ef-f368-4f42-8f7f-e4747dd9e128',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5a76a563-c1a5-4bfa-bb2d-753c8ea24fa4',
  'x-ms-request-id',
  '08bf3c64-c3f5-434b-b735-7b6535736671',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:20:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b0f458fa-aa31-43ba-ac06-b361d084de08',
  'x-ms-request-id',
  '9d4548d6-e1bc-4386-a282-610aa46c39ba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1bafa56f-4432-4815-b4d9-489ceb57a423',
  'x-ms-request-id',
  'cf422442-f708-4aa5-a43a-673b25c09e13',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '301bd779-80c7-4408-b518-6b7391fba46d',
  'x-ms-request-id',
  '2ff92949-4d8b-4eae-a599-2f1c245a452f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ae5ad2a5-57e4-4e0e-b0a7-f5dc1a985106',
  'x-ms-request-id',
  'e2b66b93-7bf2-46d1-abff-e5003eb9aa03',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '872ea199-ddb6-4a1c-8831-f3b81352949e',
  'x-ms-request-id',
  '52892491-91a7-4524-adf0-d9fc2f046434',
  'x-ms-keyvault-service-version',
  '1.2.265.0',addr=IP_ADDRESS
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canbackupasecret-","deletedDate":1619637626,"scheduledPurgeDate":1627413626,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/a1eca6d2b76a41b2801fbf4d4480ae32","attributes":{"enabled":true,"created":1619637625,"updated":1619637625,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7cca6e9d-4796-42d2-9924-3b55db3b0ec7',
  'x-ms-request-id',
  '0b33cb4e-15e9-4a04-8632-9a9606f7a616',
  'x-ms-keyvault-service-version',
  '1.2.265.0',addr=IP_ADDRESS
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:10 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f5b1f6e9-a67d-49ff-a926-3f34f1a099ee',
  'x-ms-request-id',
  '56e52385-36d2-4f26-aec4-078ddfd8b4dd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:10 GMT'
]);
