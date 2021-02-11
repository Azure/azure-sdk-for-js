let nock = require('nock');

module.exports.hash = "20240b7cf5f1de67f4df82b0aec42f84";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
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
  'fbd37ad8-56c7-427e-bb74-72d9b7e33b61',
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
  'Thu, 25 Jun 2020 12:07:10 GMT'
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
  '70e20be0-3610-4ec0-85b2-68d91ce90c01',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=ApeaKcK6IP1GovTxgmMnvv8_aSJHAQAAAG6KhtYOAAAA; expires=Sat, 25-Jul-2020 12:07:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:07:09 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-4692998543963032-0","managed":true,"attributes":{"enabled":true,"nbf":1591055496,"exp":1622592096,"created":1591056096,"updated":1591056096,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-4692998543963032-1","managed":true,"attributes":{"enabled":true,"nbf":1591055496,"exp":1622592096,"created":1591056096,"updated":1591056096,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-736458759457715-0","managed":true,"attributes":{"enabled":true,"nbf":1591055109,"exp":1622591709,"created":1591055710,"updated":1591055710,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-736458759457715-1","managed":true,"attributes":{"enabled":true,"nbf":1591055109,"exp":1622591709,"created":1591055710,"updated":1591055710,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJWE5sWTNKbGRDOURTRUZNVEVWT1IwVkJWVlJJUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVUZWVkVoRlRsUkpRMEZVU1U5T1UwaFBWVXhFVjA5U1MwWlBVbEJCVWtGTVRFVk1Va1ZSVlVWVFZGTXRPREl6TVRFNE9UWXdNREEyTkRjME15MHhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '95cb47bc-dcb1-42cd-b1fd-e646b2c25497',
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
  'Thu, 25 Jun 2020 12:07:10 GMT',
  'Content-Length',
  '1909'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-4692998543963032-0')
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation \"delete\" is not allowed as this object's lifetime is managed by Key Vault.","innererror":{"code":"SecretManagedByKeyVault"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c7899a0b-41a3-425d-9692-c79bc6922874',
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
  'Thu, 25 Jun 2020 12:07:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-4692998543963032-1')
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation \"delete\" is not allowed as this object's lifetime is managed by Key Vault.","innererror":{"code":"SecretManagedByKeyVault"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a45694c2-b0ef-4985-85f8-70855465b83b',
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
  'Thu, 25 Jun 2020 12:07:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-736458759457715-0')
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation \"delete\" is not allowed as this object's lifetime is managed by Key Vault.","innererror":{"code":"SecretManagedByKeyVault"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '73e3236f-c71b-4465-9b71-761e17d683a4',
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
  'Thu, 25 Jun 2020 12:07:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests-736458759457715-1')
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation \"delete\" is not allowed as this object's lifetime is managed by Key Vault.","innererror":{"code":"SecretManagedByKeyVault"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '125d7a0e-743e-46cf-8505-ab03bbf520dd',
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
  'Thu, 25 Jun 2020 12:07:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-00038918000473020520","managed":true,"attributes":{"enabled":true,"nbf":1591062937,"exp":1622599537,"created":1591063537,"updated":1591063537,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXlJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRBek1UVXhOemN5TURVNE16UTBNRGN4TUNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'ac710f43-4c9a-45e7-8a39-5a01777865f4',
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
  'Thu, 25 Jun 2020 12:07:11 GMT',
  'Content-Length',
  '810'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-00038918000473020520')
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation \"delete\" is not allowed as this object's lifetime is managed by Key Vault.","innererror":{"code":"SecretManagedByKeyVault"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '348f5b7a-f840-477b-855f-091169037ddc',
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
  'Thu, 25 Jun 2020 12:07:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRJM01UY3hNakEyTXprME56WTFNekV4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '5987ff5d-a033-4dc7-86c4-5694fb36d6b5',
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
  'Thu, 25 Jun 2020 12:07:11 GMT',
  'Content-Length',
  '434'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRneU9ERTJNamszTVRnNU1UWTNOREV4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '3b50ebe3-8e4e-45a9-821e-feaaf84ded86',
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
  'Thu, 25 Jun 2020 12:07:12 GMT',
  'Content-Length',
  '434'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTA1UFRrSkJVMFUyTkZORlExSkZWRlpCVEZWRkxUZ3lNakV5TURZME16STVOamM0TWpjeElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '863a7eb4-954c-4932-85fe-391459991425',
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
  'Thu, 25 Jun 2020 12:07:12 GMT',
  'Content-Length',
  '439'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE1qWTJPVGszTVRnM05qQTNORGt4TnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'b3223f0e-0de4-47a3-8648-d64d1dc72947',
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
  'Thu, 25 Jun 2020 12:07:12 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE9EVTBNamMwTmpVek9Ua3dOek0yT1NFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'd91b5d56-dd13-4ed0-9f64-f806f22fd37a',
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
  'Thu, 25 Jun 2020 12:07:13 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMHlNelF3TXprNE16QXdNalF4T1RnMklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '6db44bea-e30b-4903-b324-fce536dc848a',
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
  'Thu, 25 Jun 2020 12:07:13 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDFNVEkwTVRFeE5qY3dPRGt3TmpneklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'bf4d2773-de7c-4c45-b1a5-ea9fe7aee9ba',
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
  'Thu, 25 Jun 2020 12:07:13 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDVNamc1TVRjME1UWXhPVEkwTnpZNUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '73d91caf-40af-425a-954e-fc51943d139d',
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
  'Thu, 25 Jun 2020 12:07:14 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlZKRlFVUkJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZKVTFOVlJWSXROalV4TWpnME5UTTBNREEwTURFMU5DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '945b3929-0063-4ba7-8c05-0db1db5af062',
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
  'Thu, 25 Jun 2020 12:07:14 GMT',
  'Content-Length',
  '407'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMHlNemc1TkRZek1USTJNVFl4TmpneE55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '8c295d92-23ed-4303-b36e-157e1830313a',
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
  'Thu, 25 Jun 2020 12:07:14 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMDVOVGc0TURNeE1qZzBNak0yT0RBeUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '7c24025b-7c33-4465-9539-e42cb9c68e4e',
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
  'Thu, 25 Jun 2020 12:07:15 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkpVMEZDVEVWQlEwVlNWRWxHU1VOQlZFVXROamd3T0RjMU5qSTNORFV3TmpNM09DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '2b90686b-6677-4f11-a09e-0b57de658592',
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
  'Thu, 25 Jun 2020 12:07:15 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMwME56UTJOVEl6TVRnNU56WTBPVFF5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'cf5f40f7-2a45-487b-bda9-3aa8703fcf63',
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
  'Thu, 25 Jun 2020 12:07:15 GMT',
  'Content-Length',
  '370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZOVFJVTlNSVlJKVGxCRlRVWlBVazFCVkMwd05qZ3pOamt4TXpNeE16VTJOamszTWlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '25b8bedf-5207-4b15-9a48-21af13f3a171',
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
  'Thu, 25 Jun 2020 12:07:15 GMT',
  'Content-Length',
  '402'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZOVFJVTlNSVlJKVGxCTFExTXhNa1pQVWsxQlZDMDJNRGd4TURNek1UTTNPRGM1TURRMklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'a7c58f63-c546-4348-9632-5f1c02577831',
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
  'Thu, 25 Jun 2020 12:07:16 GMT',
  'Content-Length',
  '407'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVV0TURBMk1UZzJNRGcwTnpnNU1EUTROamsySVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '22f67d3e-5c5a-46d9-bfe9-fd1bf654f9af',
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
  'Thu, 25 Jun 2020 12:07:16 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE1EUTROamd4T1RRMU5EUTNNVEk0TVRJd0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '376540ec-e849-4818-b0ca-16104ca29d94',
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
  'Thu, 25 Jun 2020 12:07:16 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE1qWTJNRFExTVRNNU9UWXhPVE14TWpReElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '94b6e251-a006-4414-972b-fec2276d2131',
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
  'Thu, 25 Jun 2020 12:07:17 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE5qVXhOakk1TWpjeE1ESTBNelF4TkRBaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '73e89433-f435-438a-a212-0c390406ed5a',
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
  'Thu, 25 Jun 2020 12:07:17 GMT',
  'Content-Length',
  '370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE9EazVOVGt6TnpReU5qRTNNVFUyTVRFaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'e39248fd-8c00-4d47-8c5c-840481fb158d',
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
  'Thu, 25 Jun 2020 12:07:17 GMT',
  'Content-Length',
  '370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TXpZMk16WXhOREF5TmprMk9EazJPVEFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'ec5e3a32-e59d-4f2c-9fdd-51c9e408e4bb',
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
  'Thu, 25 Jun 2020 12:07:18 GMT',
  'Content-Length',
  '380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TmpReE5URTRNelU1T1RNME16UTVOVEVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '96e3b20a-7509-4a22-af97-4e1024706321',
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
  'Thu, 25 Jun 2020 12:07:18 GMT',
  'Content-Length',
  '380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRBME1ETTROVFF6T1RFMU16YzRNRFUzTUNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '624232a1-989c-496f-b404-d8222ac8779a',
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
  'Thu, 25 Jun 2020 12:07:18 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRVME5qSXdOemN6TlRRME1UY3lOell4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '77064452-ebba-4718-b8a2-a6705b9b48c6',
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
  'Thu, 25 Jun 2020 12:07:20 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRnME1UazFNak14TlRrNE5qazVNREl3SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '3c1d326b-dcc9-4589-8c8d-419b9aebdfc4',
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
  'Thu, 25 Jun 2020 12:07:20 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3hJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEEzTkRNeU16QXhNVGt4TVRNd01UUXlNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '4d746233-be46-4b90-9fe5-4d7c9aa41775',
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
  'Thu, 25 Jun 2020 12:07:20 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEkzT1Rjd056STRNRFl5T0RBeU1EVXdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '8ace2aa5-747e-4f0b-a0bd-116665f91478',
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
  'Thu, 25 Jun 2020 12:07:20 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVGMxTVRFNE9UZzBOelV3TlRrMU1URXhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '997e4e38-9a56-45f6-a02f-f9587755cecb',
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
  'Thu, 25 Jun 2020 12:07:21 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3hJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRVVJEUVU1RFJVeEJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZUVDFCRlVrRlVTVTlPTFRVMk5qVTNNVEl3TlRVek1ETTJNakloTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '82f0d6e7-3d5a-49e5-b96d-5a4db2bcb1e0',
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
  'Thu, 25 Jun 2020 12:07:21 GMT',
  'Content-Length',
  '412'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRMDlXUlZKQlJFVk1SVlJGUkVORlVsUkpSa2xEUVZSRkxUVTJPRGM1TVRVd016QTVOREV4TkNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '47c2942d-48b0-4e9e-b87a-5e390781b50c',
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
  'Thu, 25 Jun 2020 12:07:21 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVJQVWtWQlEwVlNWRWxHU1VOQlZFVXRORGsyT1RNMU1qQTBNelkwTlRnMk5TRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '0a277590-bba2-44d0-bc72-04b64a18bc9e',
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
  'Thu, 25 Jun 2020 12:07:22 GMT',
  'Content-Length',
  '375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwd05ESXlOakkyTkRZd016UTBNREU1T1RZaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'd9e0b7cb-3ca0-42d1-bffd-ad1d532b4b2c',
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
  'Thu, 25 Jun 2020 12:07:22 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwek1UazFNamt3TnpZNU9EY3hPRE0wTnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'e0feaa99-3cf6-4915-a7a8-3b2e2c13a355',
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
  'Thu, 25 Jun 2020 12:07:22 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwMk9UQTBNVFk1TmpJM016UXlNelUySVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '25db0ba7-0572-4455-98c7-7ef2b74de8df',
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
  'Thu, 25 Jun 2020 12:07:23 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3lJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMweE9ETTVOVGd3TlRrNE1USXlOVGtoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '822bf026-fdef-44b5-9d2b-e42a19cf8c15',
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
  'Thu, 25 Jun 2020 12:07:23 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZ3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMwNE1EUXdPVEF5TnpNMU16a3pPRE16SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '9ccae488-14b0-425a-9a66-1c96b8452eb4',
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
  'Thu, 25 Jun 2020 12:07:23 GMT',
  'Content-Length',
  '402'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODQhTURBd01Ea3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlZFaEZURUZVUlZOVVZrVlNVMGxQVGs5R1FVTkZVbFJKUmtsRFFWUkZWa0ZNVlVVdE5USTBNakV3T1RVNU5qUTFNelF6T1NFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '010c237f-645a-43dd-8778-7af3cc4c0eb0',
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
  'Thu, 25 Jun 2020 12:07:24 GMT',
  'Content-Length',
  '418'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE16STVOakV5TlRnMU1qVTJOekEwTkRVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '0b6408f5-2130-4a9b-bc60-df2933f177c5',
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
  'Thu, 25 Jun 2020 12:07:24 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE9URTVNVFV6TWpNek5ESTVOelUyTXlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '342749fc-72f5-4167-ba24-aa88d69a570b',
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
  'Thu, 25 Jun 2020 12:07:24 GMT',
  'Content-Length',
  '386'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMHhNemN3TXpnNU1EZzRPRFEyTWpVM09DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '96cd4d4a-7e14-4d3d-b701-3db4f45fdba7',
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
  'Thu, 25 Jun 2020 12:07:25 GMT',
  'Content-Length',
  '391'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMDJNVGsxT0RnNU16SXhOREV3TlRJMElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'b919e0b9-9c81-46ae-abc8-bc5d5f9b1f6a',
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
  'Thu, 25 Jun 2020 12:07:25 GMT',
  'Content-Length',
  '391'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSQzAzTlRFNE5UUTFOamsxTlRVME9EVXlJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '030a58e5-4f96-4220-8514-0f9637c1a7b9',
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
  'Thu, 25 Jun 2020 12:07:25 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSRUpaUjBWVVZFbE9SMVJJUlZCUFRFeEZVa1pTVDAxSFJWUkRSVkpVU1VaSlEwRlVSVTlRUlZKQlZFbFBUaTA1TmpjMk16Z3lOakF4TkRjek56RWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'dec7e66b-2871-4f01-b1f3-218eaeb22e15',
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
  'Thu, 25 Jun 2020 12:07:25 GMT',
  'Content-Length',
  '471'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUkVWTVJWUkZSQzFWVGtSRlJrbE9SVVFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'c7094b86-0584-4cf6-87de-27e4307fc95a',
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
  'Thu, 25 Jun 2020 12:07:26 GMT',
  'Content-Length',
  '380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3lJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhRa1ZIU1U1RVJVeEZWRVZEUlZKVVNVWkpRMEZVUlZOUVQweE1SVkl0TXprek16QTJORGt5TVRVMU9ETXdNalVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '3cf0b27b-b892-40d5-8aaa-f90a5304fd55',
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
  'Thu, 25 Jun 2020 12:07:26 GMT',
  'Content-Length',
  '396'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhSMFZVUkVWTVJWUkZSRU5GVWxSSlJrbERRVlJGTFRRME1qazFOVGN6TWpnM05EY3pOalkySVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '7f651eb6-bbce-4e11-8534-0fc3357b3ac0',
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
  'Thu, 25 Jun 2020 12:07:26 GMT',
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
  'd8e733b3-7062-4fdd-afe2-706e55acff06',
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
  'Thu, 25 Jun 2020 12:07:27 GMT',
  'Content-Length',
  '28'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrecoveradeletedasecretwithrequestOptionstimeout-560849837107557","deletedDate":1593086672,"scheduledPurgeDate":1600862672,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrecoveradeletedasecretwithrequestOptionstimeout-560849837107557","attributes":{"enabled":true,"created":1593086671,"updated":1593086671,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMzYhTURBd01UTXhJWE5sWTNKbGRDOURTRUZNVEVWT1IwVkJWVlJJUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVUZWVkVoRlRsUkpRMEZVU1U5T1UwaFBWVXhFVjA5U1MwWlBVbEJCVWtGTVRFVk1Va1ZSVlVWVFZGTXRORFk1TWprNU9EVTBNemsyTXpBek1pMHdMelZDUVVWR01rRTJNVU14UXpRMU5UTkNNRGszTmprd05ETTFNa0kyUlRBNUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '678d76db-ec80-4a0d-a923-c648301fccf4',
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
  'Thu, 25 Jun 2020 12:07:27 GMT',
  'Content-Length',
  '998'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-canrecoveradeletedasecretwithrequestOptionstimeout-560849837107557')
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
  'c25291e5-70bb-473f-beaa-983677760b3f',
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
  'Thu, 25 Jun 2020 12:07:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJWE5sWTNKbGRDOURTRUZNVEVWT1IwVkJWVlJJUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVUZWVkVoRlRsUkpRMEZVU1U5T1UwaFBWVXhFVjA5U1MwWlBVbEJCVWtGTVRFVk1Va1ZSVlVWVFZGTXRPREl6TVRFNE9UWXdNREEyTkRjME15MHhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'c0da9bce-e925-4267-bb28-71d8c5783eaf',
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
  'Thu, 25 Jun 2020 12:07:27 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDghTURBd01UUXlJWE5sWTNKbGRDOURTRUZNVEVWT1IwVkJWVlJJUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVTlPUTBWQlZWUklSVTVVU1VOQlZFVkVUa1ZYVWtWUlZVVlRWRk5UU0U5VlRFUk9UMVJCVlZSSVJVNVVTVU5CVkVWQlIwRkpUaTA0TnpnMk56YzJPRGM1TXpjNE9USTJMVEV2UWtGQ09UZ3dPRFEzUlRoQ05ESTFSVGxHTnpKRE5URkZOekJFTXpBMlJrRWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '19adcc13-9978-46df-a1c3-4a93ac8bca2a',
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
  'Thu, 25 Jun 2020 12:07:27 GMT',
  'Content-Length',
  '510'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXlJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRBek1UVXhOemN5TURVNE16UTBNRGN4TUNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '195ab412-e4fe-4929-8f6b-e8137097ebda',
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
  'Thu, 25 Jun 2020 12:07:27 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDAhTURBd01UTTFJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRBM056TXhOREk1TkRNM01EazVNelEyTUM5QlFUSTFSVVkxTkVNeE9UazBRMEV3T0RrM01FRTBNek16UVVJNVFqbEVNQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '9caae3f6-fba1-47ca-b27b-50bf184f84d9',
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
  'Thu, 25 Jun 2020 12:07:27 GMT',
  'Content-Length',
  '499'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRJM01UY3hNakEyTXprME56WTFNekV4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '918f3e92-d51b-4676-bcc5-38f803ac173d',
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
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMzYhTURBd01UTXpJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRRME9ESTJNVEkyTnpNNU1EWXdOekF2TmpWQ1JVTTNOMEl6UmtWR05EVkZNRUpHTkRCRFJFRTJOa0l3UVRaQlJqQWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '8e340cea-0996-438e-928d-cae911165bfe',
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
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '494'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRneU9ERTJNamszTVRnNU1UWTNOREV4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '84133bd9-2cfb-4147-8e04-8fcafbf72b3c',
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
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDQhTURBd01UTTRJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTA1UFRrSkJVMFUyTkZORlExSkZWRlpCVEZWRkxURTBNamM0TWpVd016VXhOakEzTkRFek1TODNNVU13TkRVMk5EazNSVGcwTXpNMVFUUTFNVGhET0VRMU0wUXdRVE16TmlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '21b0222c-4573-4053-8abe-45d16bd91b50',
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
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '505'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTA1UFRrSkJVMFUyTkZORlExSkZWRlpCVEZWRkxUZ3lNakV5TURZME16STVOamM0TWpjeElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '5449205f-e3ab-4219-9efe-6d36b6371f47',
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
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE1EVTVNekl6TVRnd056TTJOVFEwT0RVMkx6QTVNamMzTVRKQk16UTBNVFJCTkVSQ1FVVTVPVUpHUkRGRk9EUTJOa1ZCSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '581428ba-ff55-4740-aeb4-01233b98231d',
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
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '457'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE1qWTJPVGszTVRnM05qQTNORGt4TnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '82ff9d74-a413-44f6-93cf-984e4951749e',
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
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE5UUTROemMxTmpZME1UUTVNVEF4TlM5Qk5ERTBNVEUzUkVRMU1FRTBRVGxGT0RJeE5qVXdSVFF5UWpRME5ETTNOaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '4478ab82-a47d-41c0-bc78-e4009728bf7e',
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
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE9EVTBNamMwTmpVek9Ua3dOek0yT1NFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '274b61be-7ac7-4880-8d90-b4ffe88bc849',
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
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXlJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMHdNell6T0RNMk1UWXhOemMzTmpZME1pOUNOelpGUkRVNU9VWTFNak0wTWpVMFFUVTJRMFkzTkRjMU56aEZSRUl4TVNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'e9c32c90-14fd-4a2c-b5ac-6837f437bb72',
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
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMHlNelF3TXprNE16QXdNalF4T1RnMklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '4713538b-5b28-4511-bb1e-4bc6343f6a93',
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
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXlJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMHpPVGt4T0RjNE5qRTBNek15TmpBeU5DOUNRa016TTBOQ01FVTROVEUwUkRrMlFUbENOVGcxTWpNM1F6UXlNRUk1UWlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '2a9651b2-5595-4a9a-ba6a-6f9479baead6',
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
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDFNVEkwTVRFeE5qY3dPRGt3TmpneklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'd09e79fd-4696-4549-bdfa-31014a74c1b3',
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
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDJOVFl5TWpBeE5UTXlNVFkyTkRFMkx6aEJOamhHUmpFeFFqWkRRalEzUWtOQlFrSXhNakF4UmtaR016azVOVEkzSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'eb5c6d7b-4056-4ec0-9c3d-454ff59eec3d',
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
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDVNamc1TVRjME1UWXhPVEkwTnpZNUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'ffa415c3-79a2-4939-a096-977c47a7143b',
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
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjAhTURBd01USXhJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlZKRlFVUkJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZKVTFOVlJWSXRNVGN3TnpRMk5qWTVOakF5TURBMU5qa3ZNRE5CTUVFMk16Z3pRelkxTkRFNVFqbEZOelZHUVVVeE5qUXdNVU00TWpNaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'c8abee44-b315-4de4-85f3-656fbddd4775',
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
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '473'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlZKRlFVUkJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZKVTFOVlJWSXROalV4TWpnME5UTTBNREEwTURFMU5DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'f540eb8e-8886-43a3-a5fb-a51d68b141e0',
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
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '414'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjAhTURBd01USXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlZKRlFVUkJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZKVTFOVlJWSXRPVGt4TVRNMU56VTRPRFF6TmpVeU1pOUdSalE0UkRNM01qUXpSakEwTmpsRlFqYzJNelJGUkRNNVJERkNOalkyTVNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'e1afba73-8d60-499e-879e-8abc7e76d6b5',
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
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '473'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMHlNemc1TkRZek1USTJNVFl4TmpneE55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '82baaa18-702b-4c4f-b97b-05b84ff0eeaf',
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
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMDJNVEF3TnpnM01qRXdOak00T1RnMUx6STJNa1UyTVVVM1JEVXdNVFF3TmtWQlFqTTFSa1F3UVRsQ016UTVSa00wSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '8ba0b7b3-c8bb-4ef4-8c1f-17079d35cff9',
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
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMDVOVGc0TURNeE1qZzBNak0yT0RBeUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'f4a9543b-ba3a-4bc4-87c9-5ce279b2bd70',
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
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJWZEpWRWhTUlZGVlJWTlVUMUJVU1U5T1UxUkpUVVZQVlZRdE9EVXhOVFF4TkRVMk1qUTVNelUxTlM4d09URkNNMFk1UlRSQlFVUTBRVE5FUWpCRVJUWXpORU01TURZNFJEUTFNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'dbddcc5e-ed06-43a0-9150-7a3147402b63',
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
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkpVMEZDVEVWQlEwVlNWRWxHU1VOQlZFVXROamd3T0RjMU5qSTNORFV3TmpNM09DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '91747ba8-508c-40d5-a2e1-a227fa068bd0',
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
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMweE5EWTFNVGcxTmpFM01UVTVNalF6Tnk4NFFqRXdORUV4TjBJME5UZzBNek0xT0VSQlJERkRORE16TmtVMlJESXhPU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'fca8eb6c-5776-4061-8030-8cd74ad516cb',
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
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMwME56UTJOVEl6TVRnNU56WTBPVFF5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '53b94518-1725-46e7-971b-d3ba135a5bd4',
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
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMwNE1EUXdNREkxT0RrNE9UazVPVGMwTHpNeFF6UXdORFV6UXpnNE9EUkNNa1JDUWpsQlJqWXlRVUZFUmtWRk0wRkRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '3bc19da9-36b8-42ad-baed-d5d8960d5656',
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
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZOVFJVTlNSVlJKVGxCRlRVWlBVazFCVkMwd05qZ3pOamt4TXpNeE16VTJOamszTWlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'cc5f958e-0707-4d85-afcc-d652b2fe3e04',
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
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '409'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTYhTURBd01URTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZOVFJVTlNSVlJKVGxCRlRVWlBVazFCVkMwM05ETTRNREEyT1RVd05qUXlNRFEwTHpORU5FWXlRalpHUmtSQk1qUTRORUk0TmtWRk4wWTVRelUwT1VKRVJEY3lJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'd43aae29-09a2-4159-8c3c-f0c6d6a42b31',
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
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '467'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZOVFJVTlNSVlJKVGxCTFExTXhNa1pQVWsxQlZDMDJNRGd4TURNek1UTTNPRGM1TURRMklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '7f3bfbe4-59b3-4166-b5a2-852f6fc085d2',
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
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '414'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USXpJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZkSlZFaFNSVkZWUlZOVVQxQlVTVTlPVTFSSlRVVlBWVlF0TkRJeU16TXdOVFk1TWpJNE5ETXlOeTg0UXpKRFJrSkRRakpCTkVJMFJURTJRVFpETlRZM1F6STFNakkzUVRJNE9TRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'cace8175-6755-4e42-8597-704d1691283d',
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
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '478'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVV0TURBMk1UZzJNRGcwTnpnNU1EUTROamsySVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'cc0e76dc-85d7-4c51-9afa-a464efcce2f0',
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
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVV0TmpNMk1EUXhPVGszTWprM05qYzRNeTlDTURkR016YzVSVGsyTkRrMFJFVXpPRGRET1RrNE0wSTBOekkxUVRFeU5TRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '27e61f0d-9363-4c3a-b7b1-a7cf0fae21a9',
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
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE1EUTROamd4T1RRMU5EUTNNVEk0TVRJd0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '0a1f4328-0622-48e1-9844-f57d748eb6a2',
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
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE1UVXpOak00TkRFME9EY3dNREU0T1RVd0x6SkZSRE16UVRkRE56TTVPVFJCTkRjNFFqTTNPVGc1TkRJeU1VSkZOVE5CSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '36fcd9b8-5566-4ee7-830f-e7d4805e01d6',
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
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE1qWTJNRFExTVRNNU9UWXhPVE14TWpReElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '56c1cc76-ff4f-4ea8-a6ee-6f5a45170ebf',
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
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01UQXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE5EYzBOakkxT1RnMU9EYzFOekE0TlRFdk9URkdOalpCTlRBMFJqTkROREF6TWpreU1UUkdRMFV6UmtNelEwRTRPRGdoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '0cb90f00-ca62-4cfb-aed8-2db709812444',
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
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE5qVXhOakk1TWpjeE1ESTBNelF4TkRBaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '9030de89-7940-4a18-8e17-ca25c318d8d2',
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
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01UQXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE56RTNNREF5TlRRM016Y3lPRGMyTnpBdlJUWTBPRVl4UmtKR1JUQkZORFpEUlRsRVFqWkdRamREUkVFMlJVWXlRMFloTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '4333152c-1642-47c1-9fc6-273e4ec71b57',
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
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE9EazVOVGt6TnpReU5qRTNNVFUyTVRFaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '97894110-e537-46f8-a849-61a1aeaf15b8',
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
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TURrek16TXpOakF3TkRjNE1ESTFPRFl4THpVM1F6UkRORUpEUWpKQlF6UkdOREU0UkRGR1JURkdRVFl3UlVVd05UYzRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '1f225433-4f0f-483b-a0b6-b21eadf54d68',
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
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TXpZMk16WXhOREF5TmprMk9EazJPVEFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '59dd0ebd-9b8b-4428-9422-738d944053ca',
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
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TkRreE1qYzNPVEV6TmpnM01UZzVNQzgxTVRnNE5USkZRelV6TmtRMFJFTkdRamsyTlRaRU9VSTNPRFkyUlRFM1FpRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '3794e0bb-16cf-45e7-961c-b042193f330d',
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
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TmpReE5URTRNelU1T1RNME16UTVOVEVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'ee769cc6-93c1-401f-b164-ddfe5ea5426e',
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
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0T0RjMk56TXpPVE0wT1RNNU5ESTJOVEV2TVVFME16RTRSREExTVVNNU5EY3dPRGt3TVRKRFJUZzROekUzT1RBMU1Ea2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '39ce6fe5-9079-4e49-93ec-871efa146eb3',
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
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRBME1ETTROVFF6T1RFMU16YzRNRFUzTUNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '6b201f6d-5581-445e-89f0-d36d51d2178a',
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
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRFMk1EY3hOamcyTnprek1ETTJNekl5TUM5RVJEUTJPRGd6T0RjMlFVRTBNVEJHUWpCRU1rRXpOemt6TWpORE5qY3lPQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '47be42c5-1ca0-4f83-9e7e-86cc1c463a61',
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
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRVME5qSXdOemN6TlRRME1UY3lOell4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '52b5900b-029d-4499-8b44-439344becb49',
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
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRZMU1USTJNRGcxTlRNM01qWXlORGt4THpGRU56RTBRVEEyUmtWR1FUUXdSRVk1Tnpjek9FVkNOVVU0T1VNM056UTBJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'fe6fa36f-e736-4e8a-90b8-107b35435ffa',
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
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRnME1UazFNak14TlRrNE5qazVNREl3SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'edb98d52-fec5-4d20-9a89-108586aaf695',
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
  'Thu, 25 Jun 2020 12:07:35 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRreU1EUTRNRGd3TlRBMU9UQTNNemd3THpKRE1UTTFSRVl4UlRJeFJUUTVOMEk0TmpoRk1FTTVPRUkyTkVKRk1UZERJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '13135ab4-4b23-4c3d-bdd2-6d8b92ca0eb8',
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
  'Thu, 25 Jun 2020 12:07:35 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3hJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEEzTkRNeU16QXhNVGt4TVRNd01UUXlNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '07787154-09c8-4448-8b5a-94c49c4030af',
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
  'Thu, 25 Jun 2020 12:07:35 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEUxTWprMk56azJOelF3T0RRd05USTBNUzh6TTBGR1JVTkZOVE5CTURZMFJqY3pRamN4TXpBd1JUbERNek0xT0VGQ1FpRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '5ae54c1b-5648-4c95-a40d-096d7a9c097f',
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
  'Thu, 25 Jun 2020 12:07:35 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEkzT1Rjd056STRNRFl5T0RBeU1EVXdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '75ab28ab-a45a-4a43-b4e6-9f7ba3a6f53a',
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
  'Thu, 25 Jun 2020 12:07:35 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URXpJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVFE1TVRJeU1qZzFOVEF5TlRrMU5qRXdMelUxTTBGRU5rWTNNRGt4UlRRMU16VkNPVVU0TlRNeU9VWXpRemxETTBWRUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '2cd4ca72-5b46-4d2e-b01d-157f16a0bbe8',
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
  'Thu, 25 Jun 2020 12:07:35 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVGMxTVRFNE9UZzBOelV3TlRrMU1URXhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '97f99c02-186a-41ba-896a-b7e7e1529f9d',
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
  'Thu, 25 Jun 2020 12:07:35 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRVVJEUVU1RFJVeEJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZUVDFCRlVrRlVTVTlPTFRFM09EY3dORFF3TURVM056RTNOVFl6THpZMk1qaEVNMEUxTjBRNVJqUkVNVFU0T0VRNU1qZEVRVUU1UWpaR09UZzRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '48e3248e-58c0-4a30-9af1-a913bf8b9137',
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
  'Thu, 25 Jun 2020 12:07:35 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3hJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRVVJEUVU1RFJVeEJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZUVDFCRlVrRlVTVTlPTFRVMk5qVTNNVEl3TlRVek1ETTJNakloTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '1414f42e-d05d-481f-bf0a-57e99c54b0bf',
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
  'Thu, 25 Jun 2020 12:07:36 GMT',
  'Content-Length',
  '419'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRVVJEUVU1RFJVeEJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZUVDFCRlVrRlVTVTlPTFRnNE1EazJNVGd5TVRNMU56VXlORFV2TkVFMFJUazBRekE1TjBORk5EUXpOVGc0UVVaRlFrVkZORVZHUkRrMFJEa2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'e567cb6f-5700-48aa-86c8-dbeecefcce3b',
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
  'Thu, 25 Jun 2020 12:07:36 GMT',
  'Content-Length',
  '478'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRMDlXUlZKQlJFVk1SVlJGUkVORlVsUkpSa2xEUVZSRkxUVTJPRGM1TVRVd016QTVOREV4TkNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '7a423939-9bfa-4ae1-9b54-62f95250d0d0',
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
  'Thu, 25 Jun 2020 12:07:36 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDAhTURBd01UTTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRMDlXUlZKQlJFVk1SVlJGUkVORlVsUkpSa2xEUVZSRlYwbFVTRkpGVVZWRlUxUlBVRlJKVDA1VFZFbE5SVTlWVkMwME16TXdPVEUzT0RjM01qVTBPVEUyTHpCQlEwTTVNekV6UXpGQk56UkNNekpCTnpkQk56STFSa00zUWtVek9UUkZJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'b30d6c12-0151-4925-a576-52e3eee96793',
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
  'Thu, 25 Jun 2020 12:07:36 GMT',
  'Content-Length',
  '499'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVJQVWtWQlEwVlNWRWxHU1VOQlZFVXRORGsyT1RNMU1qQTBNelkwTlRnMk5TRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'f5bcb5cb-d131-4579-ba73-c98b5c923fa4',
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
  'Thu, 25 Jun 2020 12:07:36 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjAhTURBd01USXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVJQVWtWQlMwVlpWMGxVU0ZKRlVWVkZVMVJQVUZSSlQwNVRWRWxOUlU5VlZDMHhNek16TXpZd05EZ3pORGsxTmpZME55OURNRFZEUVRjNFEwTTRSRUkwTmtVMFFqZzBRVE01TnpVeU5VTkVRekkxUWlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'bfe6c829-c673-44ca-a199-9204c3279f6f',
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
  'Thu, 25 Jun 2020 12:07:36 GMT',
  'Content-Length',
  '473'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwd05ESXlOakkyTkRZd016UTBNREU1T1RZaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'a9271532-c6bc-435e-b13e-ec0dd0d7f208',
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
  'Thu, 25 Jun 2020 12:07:36 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkweE5qSTNOekkzTmpneE1URTBPVEUwTkM4MVJVWkZOemhDTkVRM1F6azBOek5FT0VReVJUTkJNVE5FUXpORU9FVkRNaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '0baf5ff9-6188-40ed-8526-3dc56511cd1a',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwek1UazFNamt3TnpZNU9EY3hPRE0wTnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'feb98b3d-37e3-4619-9a0e-50c04e46e460',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwMU1qVXpNVE01TmpBeU9UazFPVEUxTHpRM05FWkNPRVJFUVVZNE5qUTNOalk1UkRjeU1rVTJNVEEwTUVOQk5rUkRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '9dfc34b1-725e-4ed8-8847-ea25eb9b3269',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwMk9UQTBNVFk1TmpJM016UXlNelUySVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'b5a4e047-f9e6-4ba1-8036-df5b36572df7',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwNU1ETTVPVEExTWpBME9UazNNelV5TDBZMk5VUkNPRGMxT1RjME5UUTRNa0k0T1RGR1JqTTJSVVU0UlVKRU1FVkNJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'a1701ece-0355-425b-9c61-5b1164a72ea3',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3lJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMweE9ETTVOVGd3TlRrNE1USXlOVGtoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'd29e501e-0da5-4c6e-8a87-09e0273f6794',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTYhTURBd01URTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMwek56RTNOVEkxTWpBMU5UUTBOek00TXk4eU1VTTRRamxEUkRWRlJVTTBNa05FT0RjeVFVTkNOamRGUmtZMlJVTkJOU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '589a4c85-3306-41fc-94a1-9527f04db53a',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '467'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZ3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMwNE1EUXdPVEF5TnpNMU16a3pPRE16SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '994b7f61-a609-484d-ad75-01859c254a34',
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
  'Thu, 25 Jun 2020 12:07:37 GMT',
  'Content-Length',
  '409'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlZFaEZURUZVUlZOVVZrVlNVMGxQVGs5R1FVTkZVbFJKUmtsRFFWUkZWa0ZNVlVVdE1qQTJNRGd5TlRVeU1qRTBPREF6TVM4NE16bENPVVU1TlRFMk5UWTBPVUZDT0RFeU16VTROVUpFTXpnNVJqaEZOaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'dced7ba8-ef23-4dd7-a73b-8deada88ca80',
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
  'Thu, 25 Jun 2020 12:07:38 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODQhTURBd01Ea3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlZFaEZURUZVUlZOVVZrVlNVMGxQVGs5R1FVTkZVbFJKUmtsRFFWUkZWa0ZNVlVVdE5USTBNakV3T1RVNU5qUTFNelF6T1NFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '907e569f-e8b9-4885-b795-174368bbb795',
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
  'Thu, 25 Jun 2020 12:07:38 GMT',
  'Content-Length',
  '425'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlZFaEZURUZVUlZOVVZrVlNVMGxQVGs5R1FVTkZVbFJKUmtsRFFWUkZWa0ZNVlVVdE9UQTBOakkwTXpZeE5qRXpNVE13Tmk5R05UUTJOek5DTjBNMk1VSTBOa1k1UVVJMlF6a3lSVGRETlRoR1JFTTRPQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'f4bfc44e-c788-4a4d-9dc9-64e54b664568',
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
  'Thu, 25 Jun 2020 12:07:38 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE16STVOakV5TlRnMU1qVTJOekEwTkRVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '50596260-06ca-4018-8aee-1c19a7c00d21',
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
  'Thu, 25 Jun 2020 12:07:38 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE5UZzBNREEyTmpRMU9UVXlOekk1TVM4Mk9FUXhPRVl6UlRkRk5FWTBNekZCUWpGQ1FrSkRRakZFTmpGQk9UaEVSQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '6a9045a7-6cab-4bba-bb2c-81323f1cd92c',
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
  'Thu, 25 Jun 2020 12:07:38 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE9URTVNVFV6TWpNek5ESTVOelUyTXlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '445ee5e7-018d-42d8-bec9-9ca0bf323caa',
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
  'Thu, 25 Jun 2020 12:07:38 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVORlVsUkpSa2xEUVZSRlYwbFVTRkpGVVZWRlUxUlBVRlJKVDA1VFZFbE5SVTlWVkMwM01UTTVOVEkxTkRrek1UWXlNakF5THpZME1EQTRRelUwTkVNMU16UkZOVFpCT0RjM016TTJNRFpETkVKR05EWkRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'cc993eee-a798-4d6e-beb8-9ba08fc00aae',
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
  'Thu, 25 Jun 2020 12:07:38 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMHhNemN3TXpnNU1EZzRPRFEyTWpVM09DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'ba3a9a08-083a-4402-b11c-148026f37b4b',
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
  'Thu, 25 Jun 2020 12:07:38 GMT',
  'Content-Length',
  '398'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMHpPVGN3TXpFNU1URTJPVGd3TURreUx6WTBOek0xTWpKR1F6TTJOVFF3TWtNNE9UTXdNVEU1T1RoQ1JFTTJOa1JESVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '070f26c8-e1a9-4cd3-b84a-46db735896f0',
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
  'Thu, 25 Jun 2020 12:07:39 GMT',
  'Content-Length',
  '457'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMDJNVGsxT0RnNU16SXhOREV3TlRJMElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '7ab3941b-fc2d-491c-a307-cf96ce3ff33e',
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
  'Thu, 25 Jun 2020 12:07:39 GMT',
  'Content-Length',
  '398'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URXpJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSQzB3TnpneE5URXpOREUyTVRFeE1UVTNMekl6UmpOQk16TTFSVGhDTVRRMk4wVkNOamRCUkRCQ016WkVOa1ZGTTBNNElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '11d7749c-886b-4be8-bc74-d88d7e167d22',
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
  'Thu, 25 Jun 2020 12:07:39 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSQzAzTlRFNE5UUTFOamsxTlRVME9EVXlJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '618f4be9-7c66-43d2-8a4d-f2e8f4dd1cfc',
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
  'Thu, 25 Jun 2020 12:07:39 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNzIhTURBd01UVTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSRUpaUjBWVVZFbE9SMVJJUlZCUFRFeEZVa1pTVDAxSFJWUkRSVkpVU1VaSlEwRlVSVTlRUlZKQlZFbFBUaTB4TlRJek5ESTNOalkzTURFd05UazFMek0yTTBRM1FVUTFNRGhDTXpSRU5qRkNORVUyTWpVM1FqazFOekl4TVRWRklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '7f25c46c-707e-4f9d-b516-1c64c15423ad',
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
  'Thu, 25 Jun 2020 12:07:39 GMT',
  'Content-Length',
  '542'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSRUpaUjBWVVZFbE9SMVJJUlZCUFRFeEZVa1pTVDAxSFJWUkRSVkpVU1VaSlEwRlVSVTlRUlZKQlZFbFBUaTA1TmpjMk16Z3lOakF4TkRjek56RWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'c2cbebca-d754-426a-ab41-dfb764359f92',
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
  'Thu, 25 Jun 2020 12:07:39 GMT',
  'Content-Length',
  '478'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUkVWTVJWUkZSQzB6Tnpnek9ESTFNakF6TVRJeE1qUTVOQzgzTmtKRE1qWkRRMFk1UkVFMFJEZEZPVUl4TnpnM09FSTVOVGxFTlRNelF5RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'dcd20f4f-c92a-4292-a88e-a49f88e5e8ff',
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
  'Thu, 25 Jun 2020 12:07:39 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUkVWTVJWUkZSQzFWVGtSRlJrbE9SVVFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'eb13fdef-b645-4c4d-8575-d3388d08cb1b',
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
  'Thu, 25 Jun 2020 12:07:39 GMT',
  'Content-Length',
  '387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUVWtWRFQxWkZVa1ZFTFRjd09UQXdORFkxTXpBeE1qRTROVFF2TUVGRVJUVkNSRVExUlVRNE5FVXhOa0l6TWtNM1FUYzNNRGMyTmpsRU1Ua2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'd67e44fa-1aad-4e77-a738-ace01e7324bc',
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
  'Thu, 25 Jun 2020 12:07:39 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3lJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhRa1ZIU1U1RVJVeEZWRVZEUlZKVVNVWkpRMEZVUlZOUVQweE1SVkl0TXprek16QTJORGt5TVRVMU9ETXdNalVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'ea8c5c14-b576-4131-a84f-eeb8783ef725',
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
  'Thu, 25 Jun 2020 12:07:40 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhRa1ZIU1U1RVJVeEZWRVZEUlZKVVNVWkpRMEZVUlZOUVQweE1SVkl0T0Rnd016TTFORFl6TURjMk1EWXdOeTgzTVVNNE9EVkdSRUUwTTBVME5qbENPRVE1UXpNeVFUWkJSRVl3T0RBME5DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'fe9a54e3-472d-4735-931c-7ea103796c34',
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
  'Thu, 25 Jun 2020 12:07:40 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhSMFZVUkVWTVJWUkZSRU5GVWxSSlJrbERRVlJGTFRRME1qazFOVGN6TWpnM05EY3pOalkySVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '770703eb-ca34-4e8b-b516-deeb90246b98',
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
  'Thu, 25 Jun 2020 12:07:40 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhSMFZVUkVWTVJWUkZSRU5GVWxSSlJrbERRVlJGTFRrMk5EazVOVGMyTWpZMU1qVXlPRE12T1RGRVFUWTRNREZGTkRCQ05FUXlNMEV5TmtSQ1FrSkdRa1JFT0RVd05qSWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '34098aeb-3b8f-4190-8273-97a1f8b3bed8',
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
  'Thu, 25 Jun 2020 12:07:40 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
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
  '466602c7-390a-4056-a96e-4b0c4c606f82',
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
  'Thu, 25 Jun 2020 12:07:40 GMT',
  'Content-Length',
  '28'
]);
