let nock = require('nock');

module.exports.hash = "1dc24c3af9f06657cc3007727c78b2a0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canlistsecretsbypage-0')
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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3faf5867-2453-46f8-bbcd-e708c784361c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:32 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  'ecd4c659-acd5-4f1d-bddb-57421fc80201',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjhLuZuq86JIiAynL2WQzPI_aSJHAQAAAGiIhtYOAAAA; expires=Sat, 25-Jul-2020 11:58:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 11:58:32 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canlistsecretsbypage-0', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretsbypage-0/9ac74656210b4ce697eeb57adb8d2862","attributes":{"enabled":true,"created":1593086312,"updated":1593086312,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd4e000a9-b8c3-40df-a1dc-55eefc8059d1',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:32 GMT',
  'Content-Length',
  '293'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canlistsecretsbypage-1', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretsbypage-1/a109a15cdf3d4d989ffa739d4af076ab","attributes":{"enabled":true,"created":1593086312,"updated":1593086312,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '43d30b81-e5c7-4f38-819b-0f161306fc45',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:32 GMT',
  'Content-Length',
  '293'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-4692998543963032-0","managed":true,"attributes":{"enabled":true,"nbf":1591055496,"exp":1622592096,"created":1591056096,"updated":1591056096,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-4692998543963032-1","managed":true,"attributes":{"enabled":true,"nbf":1591055496,"exp":1622592096,"created":1591056096,"updated":1591056096,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-736458759457715-0","managed":true,"attributes":{"enabled":true,"nbf":1591055109,"exp":1622591709,"created":1591055710,"updated":1591055710,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-736458759457715-1","managed":true,"attributes":{"enabled":true,"nbf":1591055109,"exp":1622591709,"created":1591055710,"updated":1591055710,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXdJWE5sWTNKbGRDOURTRUZNVEVWT1IwVkJWVlJJUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVTlPUTBWQlZWUklSVTVVU1VOQlZFVkVUa1ZYVWtWUlZVVlRWRk5UU0U5VlRFUk9UMVJCVlZSSVJVNVVTVU5CVkVWQlIwRkpUaTB4TkRRd01qRTVNVFEyT1RVd09EQTNOQzB3SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '00efcdff-374e-4492-b143-6a7e9e7595d9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:32 GMT',
  'Content-Length',
  '1931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretsbypage-0","attributes":{"enabled":true,"created":1593086312,"updated":1593086312,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretsbypage-1","attributes":{"enabled":true,"created":1593086312,"updated":1593086312,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRBd01ETTRPVEU0TURBd05EY3pNREl3TlRJd0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2da4bd3f-d6cf-4a78-a49b-7f9b1ed41459',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:33 GMT',
  'Content-Length',
  '932'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-00038918000473020520","managed":true,"attributes":{"enabled":true,"nbf":1591062937,"exp":1622599537,"created":1591063537,"updated":1591063537,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRJeU9EWTVOamc0T0RZeE16UTRPVGN3SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '39cc4f04-f28e-409f-8894-d0e3ddc0b352',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:33 GMT',
  'Content-Length',
  '810'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRnd09UYzFOamMxTnpFME1ESTFPVEV3SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '90f72868-15f8-4242-abcb-ed154704cbbc',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:33 GMT',
  'Content-Length',
  '434'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTA1UFRrSkJVMFUyTkZORlExSkZWRlpCVEZWRkxUY3dOVEl6TVRRNU5UWTBOek0wTkRRd0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fb42a217-dfec-4150-8372-5f756c500fc8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:33 GMT',
  'Content-Length',
  '439'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE1qUXhORFkxTkRreE9UZzNOVGMwTWpnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9b1e33de-e4cc-4bfb-bd8e-2c65a308ebee',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:34 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE56azVNRGcyTnpJNE5qWTNPVFl5TWlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '988627a0-834e-4250-8533-e1afd87bd6c3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:34 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMHlNakkyT0RjNU56VTVNamcyTkRZNE5pRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9f8c941e-c80c-4c4d-b9d7-9a391acaeb89',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:34 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDBPVGM1TWpnM05UQTBNRGd6TXpVMElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9d6f1286-d9ad-40b3-99b8-2e372a1227b4',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:36 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDROek16TWpNNU1EYzVOVE0xTXpJNUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b75fd8dd-2284-44de-9e3e-96685b226790',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:36 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlZKRlFVUkJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZKVTFOVlJWSXROVGsxTnpnek16ZzRNRE0xT1RFeU55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9e0be3c3-55c3-4dd3-aade-01aea3ae228b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:36 GMT',
  'Content-Length',
  '407'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMHlNamczT1RjMk9UQXhPVGN3TURJeE15RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2230b264-790d-4e14-afb5-0852516c2714',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:37 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMDRNek0xTXpVMU9ERTFPVE00TVRreUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e9800e1f-8e0f-4f2f-92be-d2f9f04c8ade',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:37 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkpVMEZDVEVWQlEwVlNWRWxHU1VOQlZFVXRNakl6TWpJeU16azFNVEU1Tmpjd05UY2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fbbb7551-083b-4518-9dc2-aea2e8664352',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:37 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMwek9EQXhPRGs0TWpVMU1Ea3pNRFU1SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '28630032-cbf0-49ba-80db-87aac2690b5d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:37 GMT',
  'Content-Length',
  '370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMwNU9UYzVPVFl4Tnprek9EazVOREk0SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '399217cb-3997-4831-bb04-855d93eecd16',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:38 GMT',
  'Content-Length',
  '370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZOVFJVTlNSVlJKVGxCTFExTXhNa1pQVWsxQlZDMHlPVFUxTnpJNU9ESTROakF4TXpFMk55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '255566a4-b35c-4bdd-819f-759d9fc9ab14',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:38 GMT',
  'Content-Length',
  '407'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZkSlZFaFNSVkZWUlZOVVQxQlVTVTlPVTFSSlRVVlBWVlF0T0RZeE5qTTJOamszTVRnek5qY3lOaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3c48dd9f-3e73-4363-a14b-5722fc783f1c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:38 GMT',
  'Content-Length',
  '412'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZWVTBsT1IwSkZSMGxPUkVWTVJWUkZRMFZTVkVsR1NVTkJWRVZUVUU5TVRFVlNMVFUwT1RrNE9ERTROalk1T1RNd01UY2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f6b0fcd3-4c21-411f-80d5-e894ea1fd191',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:38 GMT',
  'Content-Length',
  '439'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE1qUTFPRFV3TkRrMU5ETXpNVGt4TURRd0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c111980e-17d3-4a8c-8c48-544b0d685a84',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:39 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE5UVXpNRE13TXpBeU1USXhPRFF6TnpFaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '32a7ae3b-a922-47d6-ba2d-0d2f99377758',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:39 GMT',
  'Content-Length',
  '370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE9EWTVOVE01T0RrM056ZzFNVEV4TUNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b1845149-163e-4155-9e71-544949dbea82',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:39 GMT',
  'Content-Length',
  '370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TWpjM01URTVOekU1TmpBM05UazVOREVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2670ad55-f89f-4208-aacf-847ad82b3f82',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:40 GMT',
  'Content-Length',
  '380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TmpRd09EazJORE0zTmpVM01qQTFOekFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '280bcc4d-58b3-4427-8f01-936f58be1598',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:40 GMT',
  'Content-Length',
  '380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0T1RjeE9URTNPREEwTVRNNE1qRTVOVEVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a670202a-8aaf-4fda-8986-172ceee2fc5c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:40 GMT',
  'Content-Length',
  '380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRRek9EYzFNRE0xTkRRM09EWXlNVFUwTUNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a69b79d5-34cf-4677-8984-8b3b0761b53d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:41 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRjMk16UTJORFkxTkRFM01UTTJPVGt4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '78f66e42-3960-4c21-88f6-5c92104231a2',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:41 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3hJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEEzTWpJM01UZ3pOelE0TXpBMk1EUXpNQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c84e213a-6aa8-4bf2-b39c-9b56c5f0d1a0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:41 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3hJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEl5TWpJMU5qSXdPRFV5T0RVeU5EWTRNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dcaee534-0154-46bc-bbfd-d5951a0c232e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:42 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVFl3TkRFeE5EazVOamcwTkRVeE1ERXdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bfd44ac1-af3e-411c-895c-a84f528fe060',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:42 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODQhTURBd01Ea3lJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRVVJEUVU1RFJVeEJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZUVDFCRlVrRlVTVTlPTFRNNU56Z3dOalEzTnpjNU1qTXdPVEUxSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e5e49c6c-88a9-4f70-82d7-15c98440e590',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:42 GMT',
  'Content-Length',
  '418'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRMDlXUlZKQlJFVk1SVlJGUkVORlVsUkpSa2xEUVZSRkxUSTROVFkxT0RjMU5EUXdNRE0xTkRnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2bc9dfbe-0b75-4c9a-875e-7d5c6c2a8a82',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:42 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVJQVWtWQlEwVlNWRWxHU1VOQlZFVXRNemsyTURVeE56SXdOamN3T1RRME1pRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '713ef742-9950-4d25-aeb0-d340d1b194b6',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:43 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwd01UWTBNREEyT1RBMU9EVTVORFUxTVNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b37e1244-9a68-4bb6-9bba-483129374740',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:43 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkweU9UQXdORFF6TmpRM01EQXdNakV5TmlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2b875a96-d6de-4343-a953-54f84f5972fc',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:43 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwMk5EazFNVE14TWpnM05UazRPRGcxSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '54284b65-3bee-4568-962e-4fe73de28518',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:43 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMwd05UZ3lNRGcwTURVM05qTTRORGN5TWpZaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a1fbe9c6-5648-4a0c-88dc-4bb68693e4ad',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:44 GMT',
  'Content-Length',
  '402'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZ3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMwM01USTFPVEV6TkRRd01UY3lOVEEzSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c31a84bd-4fa5-42af-9bfb-83fd0bed3034',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:44 GMT',
  'Content-Length',
  '402'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODQhTURBd01Ea3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlZFaEZURUZVUlZOVVZrVlNVMGxQVGs5R1FVTkZVbFJKUmtsRFFWUkZWa0ZNVlVVdE16azNPRGt3T1RNMk1EUTROell6TnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3cfe3f9c-228c-41a2-aee7-af56c0e6936a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:46 GMT',
  'Content-Length',
  '418'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE1qUXhOVFF4T1RNd09EazVNak01TWpVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '19c317dc-6015-44e1-a13a-46bbebd3aa26',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:46 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE5qazRNREE0T0RJME5UTTBNalU0TkNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd596c130-c92c-4b67-a60b-d07cb933c4fe',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:46 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMHhNREl3TnpNNE1qUTFNREl5TURBek55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '52f5112d-6b0f-4d23-aaf4-094d07d541dd',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:46 GMT',
  'Content-Length',
  '391'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMDFPREUwTlRZM056a3hOamMwTmpjMElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '36b87ec2-777f-40e7-a20c-77f86291707b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:47 GMT',
  'Content-Length',
  '391'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSQzAyTnpZMk1qVXdNRGM1TmpnME9ETXlJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '037f5d11-abd3-4157-b9cc-6a35d24f8350',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:47 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSRUpaUjBWVVZFbE9SMVJJUlZCUFRFeEZVa1pTVDAxSFJWUkRSVkpVU1VaSlEwRlVSVTlRUlZKQlZFbFBUaTA0TXpnd09UQTJORFl3TXpreU9EUXhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'be47e42c-6c10-4c70-be93-a89b0f280d8b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:47 GMT',
  'Content-Length',
  '476'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUkVWTVJWUkZSQzA1TURjM01EYzBNVGN3T1RneE9UazBJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dd156495-56b1-4ecd-8319-5232c1eb0708',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:48 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3lJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhRa1ZIU1U1RVJVeEZWRVZEUlZKVVNVWkpRMEZVUlZOUVQweE1SVkl0TWpRek5qVXlNVEE1TnpZMk9UazFNalVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '87509233-1390-46d1-bb67-0a36f2f6f0c9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:48 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhSMFZVUkVWTVJWUkZSRU5GVWxSSlJrbERRVlJGTFRNM016SXlOek0wTlRneE9EZzNOamcwSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9a83882d-4500-4115-8879-8f66bd09593a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:48 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a6f1fa00-cd29-4d87-8638-e88f48f5bc07',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:48 GMT',
  'Content-Length',
  '28'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistsecretsbypage-0","deletedDate":1593086328,"scheduledPurgeDate":1600862328,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretsbypage-0/9ac74656210b4ce697eeb57adb8d2862","attributes":{"enabled":true,"created":1593086312,"updated":1593086312,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e184b9b9-93ba-4333-b3a2-2b80a339f0de',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:48 GMT',
  'Content-Length',
  '463'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e371a5fc-a776-4e25-a762-e6f8942968d3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7f71b2ef-cf8a-45f8-a7c6-ed39cbe46712',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '49cdfac6-2f96-4e20-93d6-2e0ec174f45e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f1569716-4840-4c83-9fa8-f962a701c1e5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '528026c6-f153-4baf-8b83-1db2bd8cccc9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7387daf2-e6d0-42f9-b376-e01d1d470744',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '35e7adf3-bc07-4a66-9e85-8693b63493fa',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:58:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c5642592-add7-4bb9-b16b-dce0be3da2c5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a4800128-1be9-4e1a-87c1-9d4c8a22abaf',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8f7fe537-85ee-4aac-ae89-58a04dc99794',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e7ba4f99-064c-4450-8290-e0104253aa8a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistsecretsbypage-0","deletedDate":1593086328,"scheduledPurgeDate":1600862328,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretsbypage-0/9ac74656210b4ce697eeb57adb8d2862","attributes":{"enabled":true,"created":1593086312,"updated":1593086312,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '973dbfb7-6ce9-4798-8d47-b62250bfa74a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:10 GMT',
  'Content-Length',
  '463'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/listSecretName-canlistsecretsbypage-0')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4be503fb-f45d-4765-b9f5-baf29b8e747f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistsecretsbypage-1","deletedDate":1593086350,"scheduledPurgeDate":1600862350,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretsbypage-1/a109a15cdf3d4d989ffa739d4af076ab","attributes":{"enabled":true,"created":1593086312,"updated":1593086312,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '09d64c8e-0b32-4135-bcc0-076a8adc9f97',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:10 GMT',
  'Content-Length',
  '463'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ac9d2c71-d27f-4517-bf0b-444114f9206d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f757869e-288d-4499-afc2-88b228af8ced',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '735fef75-b2fd-4829-a325-62abb2d87997',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fa2b0d95-0c5f-44c1-bf49-e639f3425eff',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '750a5f25-bf1a-4248-9409-014c03f39473',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '184d8af8-ecd5-43fb-b444-b9004ba1bdd8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '195311ad-60cd-4954-aae2-d6f66233afd1',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistsecretsbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4ba77847-ec9a-4b73-8cf3-1a0dd610e0ab',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistsecretsbypage-1","deletedDate":1593086350,"scheduledPurgeDate":1600862350,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretsbypage-1/a109a15cdf3d4d989ffa739d4af076ab","attributes":{"enabled":true,"created":1593086312,"updated":1593086312,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c9e8ba05-32ad-49cb-99e5-5ba8f529877f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:23 GMT',
  'Content-Length',
  '463'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/listSecretName-canlistsecretsbypage-1')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4317140b-2e7d-4d2c-8215-577f23c238f3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 11:59:23 GMT'
]);
