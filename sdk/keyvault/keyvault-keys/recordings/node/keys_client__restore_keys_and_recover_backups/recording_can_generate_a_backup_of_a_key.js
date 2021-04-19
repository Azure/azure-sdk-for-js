let nock = require('nock');

module.exports.hash = "28a9161c8a67695e99a7daf926ebb976";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/create')
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
  'westus2',
  'x-ms-request-id',
  'fa3b86ca-5cf7-402e-b166-c55b36b83148',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:47 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '6ffac599-7487-4784-ac52-4fed25752c00',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AlYh5w5_onJDnZLEqg70g4sA4qsDEAAAAKwDvtcOAAAA; expires=Thu, 18-Mar-2021 18:20:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:20:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/82c5491d92df4467ac1ba982d578e3b5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5isa9HncMmmjyjfso4SjuVoruJKzZ4q7-Bc4loeQbsLwR3dbErVC0Z1otZ8C7vATECWZz-gk74zYmtz7vZJfkRax2hyrfrb5qiqAByw49Zyy8XKKLiJRMoQ0aazIDt58Gb3F2B5P6wGuiCqSdgc-3XPu2hem4Bq3lhq6fEzChter40f-Ldo_zbGjM2tCWlgH-BGN4CHr7e3jkhP4UYPREK_B0VP5QyrCKi0hbXMn9DGrLDkWlrxgI5ycuquM9ip9qHJZMVbLJcaF_TUYVUDeqT2vEwJqP_9PchsqHi7VBR8nDxf-r9e-xjfSz3kPIf0jn5oXK7yRq7IHdCC0qEyk2Q","e":"AQAB"},"attributes":{"enabled":true,"created":1613499648,"updated":1613499648,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '8bdd8ef2-c581-442b-a962-41f5fe6c9fc2',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:47 GMT',
  'Content-Length',
  '737'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaExkWWo4WFRtRkMyTHNzY29DYW5McHRJdHdxZFJmZnBmRFp0S2h0ckctV1VLYjdXSnRFR3FfWlFsR2ZoVmVCR3Q5M1otdlpqTXBSYWlMWVlZWkFkMUtsMW9aLUhGUm9PbUF1LUN1R2FpalR2OFpsRXFuUzB6ZDB5ejJ3ZUpYLUVLRzJSSVhRTnA1d3JheGhOR1AyTURFbDVwUFQ0TGMwNTZpOVk3Qmg5QVJyR21zc01kNzY3Zk1jREhwMnlPUEswbmZHemVHa21uSVM2dWhfTzh5eFdaVzlVZFNUY3RhZlhmN0phQkFpVHlIZ0pscXJreXdfbE10TnFzWWgyT0RtR1hCdjFZX3c3UWdETGZ4cDJDNWg0c2g4NUhkLXk2MUxMZzlMcU5BZUE2MFF0S1QxaUxmWWlaQkJiREladlowcDJGOG4yOGVHUG5sREluZkFoRkZBU3l3LkhuZXRJT2dCblgwV1VOWGNiTlFiWXcub19yYmdySTl4d0JrMTQ1MGJmNnBMOGk1aW9PeDk0b0poOEJtOUQwUmNVRERRODNRV21xWVNqbHNMV1R4Q0ZPdXUwcTNzNFZzOHBsT05kdkRKZjZsRGlqaGVIYWh2MGs5ZWFmYUx1eW1rUlhwVXBvaF9GNldZX0h0NGF5VXZ5NmJ0dzlfcXVYNEFhbjFHNVZxSHhqWHl5MkJPdXhYcWtndkpJR0RLY0UzcFI3bXF6VDdRSjFTVllZNjY4RVJCVkdaTU5xQUVQX3pRd25yY2NyeFRmb0dXS0RxVmJwZ3hONTJuMWNXdWdheVRpMGdCd2hrYlY1bDNPb05Ta0xURTgzSnVES2JWaGdjamRDekRsblpHc0JzV0F1ZkY5ZmsySElyeC14bmxacWltZmJtOTltX012SUFkQXhoTFZTMjhFMjM3UVBMdW90alZXQnNmZXFDcklWWU1oZkpxYnRoaUdYVjRxZFNnZGt6eU51OElKcXhxQUxJRWpBclVPZENEOXNTVVU3SXBnWFkzREJTVVJJMTFrcmtoVzhKU1ZYVndmZkZ4cU1ZUXpGS2tfc2UwS2VQRGk5Wmtsa0o3M0JwVW94bVV2V3hPdVZqTU1CQS1QZDBNR2NyeEc2ZTQ2SWRmR0t0YjFwWGpJdXFPM1RPQzRxVW03UUkwalNVVURTUUZmS1RfdGc4VHNyZ0c0V281RGN3WGRVbTJFQWxrRkJNSzJiZGtsUzdfRWd0UE9meS1wRnZSRGVPQ3BsZU16OTg3OUpUVXpjWWhkR0xBZGIyY3Ixck9mYmxoQkx2Rkh3ZHJtYlphak8zYWJLX2hLN1RDUjcxeEdiYjVOaWNpWGJ0RTFSRWhtSng4UTB1c09EY1dyWUVXVmZiaVN6NmlkamcteDBRclgzTzd2R1ZaRDJaWC1WXzNSUUtnd3NsTHdKOVlvSjYzd25hNkxmNDBlU1VkOTNPcEVIZ0FYZzlqbmFrQ09xd3UwX0xMVTNoMXVXanpDbU05U1F0TmF6VWQtbGl1RG5SWHJPSS1KSWpVNXQ1aW9LNVRRVnh4R0NBT3JSdkI4N09DSk1JdWdGblpLU3gycHc1dklRWG1wbjg0X3Z4dGpzYlA4QkszdTNBOVl6N2NMMjJzdnU1MmIyZlhNOUFsa1d0SnA2N0xSQ0xRcWJVUzdSbGEyVU1kemp3X051Q09taE9zSDBUcE1DV3poVEltLWM1LVN0OXJPZGJlRTlRQVdYZGRYM002OG53TExiYW5ORENkbzJ0MDhZX3h0ZF80b2otT3ZNbHRvb1lmVHBtVGg1eUI2ZmhFRktSSG83YzQ4M3o1RTl1bm41UTFLanI5Z20yd0lkRlNDYkN1Wnl6LUNKc0ljT3pmU0xiOGhOMmJkVGN5M0Q0d1M1YlpPTW5fYXdIaEg0alNnbWZ0TWF3QzFzZlR4bi1tNzJEWUtJV1NiTjV4QUxhZUxIeU5ONmlieUlGMExPUU1BMGl6dHE4UWF0dUhaQmlXdkVqdDMwUUFicHdqSjZGaWVsU0lIdFZQcmVxakpsWkpRM0lRMm9vc0JwWTE5VGR5WGFmSDZ5LWMtSXkxOWphS3dQc3hUejNlOXR1OWU2Rlh1NURDTDlPVWVhMWFwUFVkT0hJbHJDbjFWZXdTUFh6TVRXYk1DXzhjVEVzMFgzLXZYbV9obVNHR3ZyTThtZmhlSDFjRTVtX09wYk1uOE04SEREQzFUQ3NzemUtWU1xN2xXYXVMYXotOFpDTkJnWW1XeWU2NXQ3U0NDLTI1ZHgtYXRNZWpkOVVuUXEzd1VHelN0Rkk5QmtTZkphRGp1NUs2OWh0cXhrZFZsTFdoOFFpdEh6NE5kX0FOampMRHc1bjhVMklJZUhVekVDdFhJNEVQR3lJbGlFNWctNzllTXVXeXhsU053cHJMSVZSVXdnaUhBVElBMHBMNndBWGFvUEZyekJ3THNhRVUzdEl5OGkwMFo2cjVtM2prX0hFc1JBR2RiRVFaazRycDlBTzVDOGRrakQ4QXAwSlFmUlZ1M0JVcmpWMC1KbzlkNE12aC1Ja0k2MElNcmFhRkZ1dnU3R2M2VnFCMVRDWFF5REY5NW1uNFRkLWZtb1Z5a0hMbFdBcTlEUlFjWG5GMkNSUU5uaExfZ0p4SWtfMFFXc2hWd0hWVjFQMUtLd04tMmpZa01YR2UyRmdzUndaYlBHZzk0X0xiaV9zdENvNG9uMzU3UXlISVNIelFSdTVRVVZZTmNYbV8wbmdPcThERG1jX2lBWVFJeEMyNUk1VS1OWUh4M1pxVUpzSDB4bVhDV2x3RXdJQjN1LVBQREJCNWd5VXRfRU1Mc3ctQUVUZi1qTnREUU9vUlhVUFhjZWoxWTVLYjhfZXpIdXhpbE0wYnpzN05kMWlPQWlFbVBmWTNsV3dScW5ucEduYUxJdnlBTGlXZUJEQkZDMGo4eWhLU0E4WEVBSExrT0JyaUI5R1RoYUhrUDQ1ZzFGcVBlWjBxazNvR1ZHc2lrUmFkWms2NnlwODE5UjlWR1pqZXM3WkdyMEVWWGxKTFI5Q3hsWi1rN2xKQmJMajZFVnJWeE5kQ3Z3cW1PdHFoT2JpREE5WEpRVXV6dEprNkV5Mi1HZFRfX2pYZFJLZ0o2QXc2Mk54bnBqbzd6bTlxOVl6VTVxVGhaNmZPaW1MUEFoQy1NQXNUdnBzUzhvNXExblgwLXZGS2x3UUxpUG5NQ2NjeTdUOHpMNm1FVHpLWXF1QTZsVzhJTVlyVVlHTGdDQUphR2g2RDJQSmFrdGJ2UmJ6eTV3MXF1X3VtNkNpdGloOHJ2ektiUkZJRTR1ODN3aUVQMHI0cHZzeXI3ckJNLUdsZ1E1Nm1mX3hLRFhBemE3dVI4RXVXTVhjUU1GYVV6TXp2THgxWGZsVW9Na0dSZERSZFUxZDI2N0ptOXROeE1MaGZXeXU5bG5jWWU4Qkl0cFZLenhYczV4UTFMTGdYTEYwTTR5U1N4dzJ0dkx4eWQ5X09WRUtCOGRYRWgtTlluckFoSUo5Smhza3RHMUZ5ek94cWhUM1pBdGx6Z1JEdm10aTBoM1dZNHJ1aUFwMk1fUUlxbjJ3X2dMWmlIUUs4OUlDNV9aaTZxT244MGlqanB2LUduQ2ttZmpMMzVxcE81c1o2NU5wdm9nM1k2MmZLRkRnbmF6anJBYS1iZEltR3pULThhNjhCRVdEN290aE5nbDdYUzd5cGFXRlNoSGVOXzZKaUVEd0JMQ1YycWlUaHF4V3ltTndlNGp4aXhCc3dWMy1ndXlpLVJYS0VFN2h6bF9YYjVHN3M1UDRYUkRreFRmZkllVmR2STJGWmo0b0NLelhaZE0zYXNnZk5GQ1ZNeFcwUWFyMXFVakVPMUk5blVTZEt6MklIdEQzdVM0eWdVUjRqTUtINlpFNlRHeDExTmN3cHJQNEtPVTUtR2JYV0NJUGF0NmIwLWFIR2ZnWW9XMTRFMGFGY3ppUTNRZW96RVJFN3JOSVJpY2JCTU9KS3dlYlZWVWY3cVdSV2xYYVo0Rl83Mzg2Ulo0aGtCUVdMN1k5bmZhRkh3aE9peTRRcFM3V1A3RHkwampBQ2ZUOGY4TVFuV2lSbXo1QmNwMml5dG84T0trWUJDbUE0elduRElvSlVjY1hHWnpDTE10UTdnMkhfc2tWRnlSNXFEZGltZTN4Q2NYcnV0NG9KcTRRc1Qxc1ZlRWsyRmZ2bDBHOEFVQTBWbWczUVZXYU41bU42blVyWC1NQ3FiUnY5MVlxUjFUTU44MDllaWQ2cEZNTU1qY2U0X1dDX2NvdEpscmRSZ1pFMmVWQlcyMG1xb0tTYjRVRzB2akNuYXZuWWlBQk5WQU1SbUtUbEhGV2c1LWNwOGJlVWYtSDVRdXNQcEJjYkREUmpIaWJsYjJvNl9YdjRMQTZRenNqXzUzWV9Rc0dNV0RuSnVPek9Samc5SmluLTNFcTVqVkx3OEd2eDlISFB6aWd3VEpoMTFyX3VZeVZ3bU4zdlFpRnotOEl3NGR0TzNNTmJlNUd1SjltdDZQNW53V0R2TXBZR2VJam9nMENxMG1LdFM2LTRIX3Q0aXJKdUs3WFI1Z0xRUHdwY2FrSC1HYXZzQTNGaW00c0pJRjlLVUVxODBhek9EU1BBNURLSUNJNlcwbElHQ0hnOGdfUWx0NlJaVWJIRVJ5S2xZcGtDMWkyZno2TlpKdzBYVk9LbE1KdVNERXZfZFVRb2gzc2RRWHZ3cFRQRGthUVBCQ3J4ODQ4b2RHZjNpYzE2Vk10OW8wM0JpclI1TU8wNmI2SlM5Q1NCZDIySy12YzdLZ3lCbEdhdWpSQ283eWFPaFVhT29zZ05EZ3IxWm53bUY4ZGo0dUhoX3h6cGE2d0VBd0VhQjkzbFRsRV94bWZLR0xTNURxRS1jYjhnVmRDWFNRSEVYUXZ4VHZxTUU1U3ByVHk0M1hRNTVzdGVhTnhobGo1aGg2dF82RXRsLWFFQlg3Qi1nVWZEWjdKMlBfR1dQZ3lYd1FyNFVmOW1mWkRGYWxOVFBMUFVMX1B4M3hmdjFYOHhVc3RjZ29jREZjam52THp2YXNvbHJxNXVuSG9ROER2clNlMHdfdnZ2Wk9LR2pIaDV2Z1A0ZHlYbkV0ckxUM1RxOUI2Y29IVTlsS1RwMERleG1sYjZDY0M2NDQwLU80cWVJVFFXcU5BVmFSRmRaWlZpT3lGM1N5cGxSemM3QXBCQzdFb29XRzJSeXJKQndrYUstaFlGQmhiaXRSbF8zNmhneUFPY0RiblF1cHhrem1pWlZUV2djQmdTcUFIUVlUVFZlR0o2eVJuZXkzeFZQTF9vLXJEMjY4Rk5Mck9leTdlbFg3MkxoeHVVbGQ5QlNDMG5EZ3VWaW9BY0tlLU9hSEhJdGFKT09MV3RhV1FoVTVKZGdhWFoybHUyM2JDbmdFSEJQeTBPOEp2WEpDV0dxRlpTb1V1RHlYb1pMM0ppb0pFZEpRQTJZcnJNSzFBTEpPWXBqYmlUQUg3bWM0X0c3QjcyQ2NVOFBSWXRQdy1VbXZ1dmV4ZWRhZlUyZ0pqbzFtaTZ3cHRBV3lvVlJWbUVIWHNjOXIzTDktM0liLURKM3Bwdm82aHlQMjlvelVnVHA0LUZQdFktUGlwbmh4Sm9QLU5PWVhWWUlrdzQ0alRfcWM1SnF2RGlCUXNPSDViNDVFRzhTUGNIS0FuaW1ScTM2ajJseHc3WFROS3hGaHRhOWIweTJ1bTZlT1hqcmdwRnFrRmpNQmZKR21UUkFZZ2tIWVhZYTU0NVJzVExscVM1YnBlZlZqdEpuRXRtcUtQX254bTFHRlhzUm1lZVRWLWJHanctd1pCYTlVMV94NENVclpWTndVNG04SEYtc2gtNlR0cko0dlZ5b1hEOXdyQmZ1Z2E2TUFEMzB4THc3VGQxano1azJJNXVVQTdubnJ1ZzFRT2g4ZEt4RzlLS1UwUkNqeVJYbWlOYVBXUE55Z2ZkeVhQVHp2WUg5ZV94T3gwZ3lra0k3RW5WbjJhT3gtWW9TazVSbjRhZFRNak9YRTFVUWZVNEplX3hRQmw3Nmw0Q3lqWk9EdDlvQWpwN290cXN3R24wMHJadmN6Nm1XY0d1QzloUVpMU2dpaFpxQUVpSjFLS0VZTWhZcTRFeTUzQlNCbXc2V3RMeldfYUdraFR4cDB2dC1qcEk3cHh2MmpIWUFEa2dXbXJMWEI1TmNzV0U3bmZqNndCcE1YNzdfdjliME9xZWlCZnIwZERMREw2ZUFfQjRWbHZXNmV2WWwxRjhsS2hZcU5hSC02NjBVQ3l6MFpwZW1VQ2c0ekN3a3E2UXFmQmFYcS1zb2d0N1hVRUdIQTB2N3hzSzFtTTR2ZTV6U3RnZ2FST081aGFaWi1tZGJtRVhGdHdtOVN4SDJIa0VHZEphNms2Nm9KRkt3cnVFTVk1cEoya3o0QlF4ZUpfZ1Z4STVYcXR5bTlXcDJ4Skpwd0hNaFpBWkV2MmR1ckttalJWcEdlaTlSUWswWVF3RDd2dnpZZ3NYc3hYT1hGeE9RZzdFVEdYTElnd2lBTnpnYm93WkxHelgtQkt1WWhmRktST1otc09VdGtGUUNJMERiTnN4cjEySlFtSmc3enVIa1gwUzA0emF1bGpYMUZzeGN2azRhSkQ3clNZRGEyUEh2MG5vYVhzNVIyUnoyUHlqZTJ2WnoxQWU2bW9aRU5DXzZhYl8wOF9ORFJwRVkxcXVnSENDQXRDT0Z5b21hdWR6ZFlpaHNMZUppWS0yYkV1M0dYVWRlT2FsSDZBRnEwUWVjZWl4VlJYa0xGSkY3ZXBUZVBsRHpPWXptTUJrSzBPakRMVDFzQTJodGF0Z2s5OW9fZzdURzB5ZmJaOG9HcE1Xd256V2I1NGduSUYyMFZHZWIyWW1UWFVlZm9nVnhlckdyQTNtQXhmRlp2dzRsb09kTnFiS05jX1JHRlpTWERZTW9WdmpxR2p0SW91U013cUxMckZZLUMxNjZ1R2V2a0p0aW9zMGQwcXVDT2RsZk54ZWtsd1o0SXR4NGZaYy15S1NPUlBXT1ZJejU1eHI2VHVuZm5YTFV3Vjl2Wlh3SXFDRk1rV3BfRHpuaklwRmphTk5ud05EZkttaDBodFgxUW5YQVU0MUxlRkY0dnRRbUg3SkZvaTlFVHYxZ2hjeTRhay1jUWVBRlRQcHZXY3RIbHRISURmdFFESnFIT3NScGZLNXJCanB1MzRoMzRxa2dTZFllcXRxSGxLOHlfWUJDM0ZwS0gyeHFBQWUyZ0FqMTE1OGc2VzdFMTZENDBTTGZJaFh0eWJqZ0xKWTlOc1habnIwRDdOd3U3VTlwbkRCVHBVYTZoWEZCVVpZTXdRTDJjbzJGRTR5cHJVLTB1R3R5SzB1b1FWZ0dOVVBFNjJkOEdzOFhLVXV0QXlGTmtOcm1UN1poOUp0QmN3aDFWVXhTOC1tVHdHU0VnRHM0MkljSU4wMl9SNklhU21vSFRNTjREYmphek9IcUN6eFk3aUNqYkhWT3dIeUVUSVVuXzZtcDJ4M1Z3eThJdnU1UHdJWE01ZW1ibkszRFZPVS11NUIzQ3FFYzg4VkVqd3dCel9obTBNeXBSTDhhdzhJOFZiVlEtbFRYdl9GTjJWQUU3S1hvSWhqcjFCZjlkR3d0U295U3M0ek9sVVEwcFRVZFQwQWlTWTA5TzZzVDc1QTJScVRzUFk3bm92OThub3d3bnpqSXpscTc1TmF2Nmp2OFpwVDktU0RHd2ZLWHktU1ltLUR4NDdiM3NtRHlLeXplOG54clRSVUlzZGJkcnJDSUh6ZEVndl9KVF9LaTFjV3FjelB5b3FVUkxZOWdOaW5xNndZNU50dkw4dzlqQjl2SDNZdlRvMzdNMm9rZGhsM1dVbzVMbzNRWTBPbFNUNVpsWXJUWmVnZjg5Sk1qbmJfMmYyekd2cmluRnhlUmRCdW5uQnBndWE4UWVtRnFFQjNmSnNmTERqUEloZEtRYXJxSFZjNUxhZE1uWDNNZXM3YjRqTkxBU3JlNTJkV0pFWFd4eHBDS3FfcEtSSE5ieXJURTU4QXJCOXZXLVc3NXcyT1Iwc0dPY2Rhd1pNdmhudTJVVFBHWnFMNU16LW9pM1Y5cWNjazlJMGMxdE1tbHhCQmtkS29IRlF1THh2dDBKUGxyOGFNc2MxUTd3cFhQazJyT1Vnanp1SXJ1bXAtaHVYc3ZIWUZOcEpsXzgyWDB1dVV2S3dJMFhQZnc5TG4zMktQVF96N0RNdVU4bWJWVFNtcmdzaktzTDhFa1lOeEgyTU5kVVlxZmNabER4aFl3UkVGc0dPYVFJMVN0MkgxSzBKMC1CUXB3cUs5OVRMd0F0eUdxYTdXY2RvYXJOcGdMNmluX004MnhvYllPVnBBZzU5Qld3Y0RLY3ZXMWlfRFZKanBWNWt3a3B2eHQzREs3TGw3T0ZKYUpHaEJwVWo5NXJocmV0Zjc2ZUlfdUtmWWNacXpucTFRRExkcVAzZXpqZHVobkJ6ZDFpQmtMMzduYURRSERFSDdKQ1FVeTEzN1lfb3RIdGdZTjlGQ0QtOEl6Q1BXN1NIRlZoZ095UlFKTnZRYVU3Xy1GZU9TNUFCYTlkNmVNc2V1Q2Q2V3ZyZ0wyMm4zREhyYUQtR0NIZUZ0bFRZTVYtTUhKbmRsSUlNT1RIWXc4NklGRmFPOEJGd0RiMDgtU050Ym55MjNTSDRqMkM2Y3NGckpIVFFlbXE1R2EzRXpvZDVTMWw5MUtWUGlYZE5QTmdGTkJCRkdXRHZlcy1ZR3I3SnJja2ZoREFlT2w4cjB0ZjBhSEdXWjZ5OHYtX0U0Y2x6Z1hnS0tTQ3NFVThIWDRfZlZJVDNDY2FIdnpIajk5MHNzUm5zN1ppeWtNSGtSaG5xTmw3X1BRMVMzRlNsTTVJd20wYy14eHhhdVdMMkpuSXpfcGNlX3c5SnpsZTRuYnFxeUlxTG5Jck42OTlnRU53UU13QmhERi0xM3Vfckc2ekxHbjdjY252RU05anBRa0R4elp2YTFvcXlyRThfYmJFSTFQWXl5SDlKWVktQUYzV3dUUE9UY2JTaXdlYlctaDVIaEVlSjRQMmY2ZWhQVEtTb1ViOWdfZ1JHUUhFV2pBUnBVMmFlaUdLakFDZHotNFBsbGNxSVZ2RWx4VExFWlQyekI2ZDUwZ29sTV8tcURTaVFrWklIelVaSk56MFVzRU1ubUVzY2NDNkJQZFNfMV93c0t0X2RVSDF2TzBmSWp5MWtsMGVSRm9FRkk4Q0xSbHJYSUtaWDQtcEQ0RXZidUVqb0VCRjRYMEdDSVIzUGtwZVZId1BpRUo5b3I3RDJqQ1RLTk1pUWw5em9RMmMwb290MF8za01ncU13dDJMM0xxRVpDZVBLY3JmYUJ5SWE5YzhPTEtrZ1UtdkZnOTV2amJSd01GbTFqazNraGhIaXpYQlBjRDdwd0xEMks3WTJJeHVnbkhlY3JOLVNsTDZzN3pTc29wTGdqcTBsY0hEMFNPSlU3Y3VFOEM3UzNHX0FiNG9LQThmdDVqUFhTVERLYnhrSHRYYUJwUGpGLXliZWZDRmxXcmI2NjNhU1c3MkZhMGhxQmhoWWh2VzF3aC1VSHlnZnhjN1l2Vk1GY29NaHlJS3g2VXMxWUxJcnBTOUVZSmppUk9VVHVjWEJxS2k0RUtGQm83eGFLS0NPTTFEeF9vZUFubHFCd09TVTBrY01aQk15Vk1xVzduZ1NKek1pbHItR2dmaHZ6bXJ4NDE1YzN1S3NnaFc5WmdaUzJhMElySHhQVEdXd0JpNzhocVpPSUxpZUFlSHpSa0NvT2FuR1o1eXI1WFpjQVhlZGtSSGZXTHgzZk5oNkhTdWRkTGZnZ0dyTTl2WmRmZTM0azduVXd5S1dobjdQSVhxTXpBd0JQWFZzVDBJZ2U0NW1JQzFCWnVsVFhGUnlobUtMYjdxSUk1MlhrR2NlVUY0ZUdLTHk2XzliRkRCWWpCZ09HSWFuZGRIT0RBR0h3SU1hcGpDbUZBbVpNMHMyWW5yZXhnV0dwZExQNXlSOURHcWl6YkE3WWZ5bVlaeDBLOEg4SE83R0pHSEtYRndWcjVaTFZGYVE3ZE9XQkJVVkdoRnBvQUlTZzk0Yk5aRzltdlF1cnh5aHhaUnpaOGpNSTR4cmtBLmE2VjQza2ZVWWk0MTFOdGs0OGdnZkx0UjJYZVEyN2k4RWZqZ1g3OEpHRVk"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '635e4205-46dd-4eba-b3cf-c08fa1807e5c',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:47 GMT',
  'Content-Length',
  '10443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1613499648,"scheduledPurgeDate":1614104448,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/82c5491d92df4467ac1ba982d578e3b5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5isa9HncMmmjyjfso4SjuVoruJKzZ4q7-Bc4loeQbsLwR3dbErVC0Z1otZ8C7vATECWZz-gk74zYmtz7vZJfkRax2hyrfrb5qiqAByw49Zyy8XKKLiJRMoQ0aazIDt58Gb3F2B5P6wGuiCqSdgc-3XPu2hem4Bq3lhq6fEzChter40f-Ldo_zbGjM2tCWlgH-BGN4CHr7e3jkhP4UYPREK_B0VP5QyrCKi0hbXMn9DGrLDkWlrxgI5ycuquM9ip9qHJZMVbLJcaF_TUYVUDeqT2vEwJqP_9PchsqHi7VBR8nDxf-r9e-xjfSz3kPIf0jn5oXK7yRq7IHdCC0qEyk2Q","e":"AQAB"},"attributes":{"enabled":true,"created":1613499648,"updated":1613499648,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '84e9753b-4fc9-415a-8354-21f86cbf024f',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:47 GMT',
  'Content-Length',
  '919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a7bf057e-472b-4c3a-9262-4bf710938b0b',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '936ad85d-afcd-4953-b4bd-9f0a7cb08017',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3e611f84-516b-41fb-8ef1-365b2bf4ff54',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd9a09d6b-6c85-4b92-8f94-158a77d23971',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e57fdd27-faab-4aa6-a797-f68172134fb4',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1613499648,"scheduledPurgeDate":1614104448,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/82c5491d92df4467ac1ba982d578e3b5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5isa9HncMmmjyjfso4SjuVoruJKzZ4q7-Bc4loeQbsLwR3dbErVC0Z1otZ8C7vATECWZz-gk74zYmtz7vZJfkRax2hyrfrb5qiqAByw49Zyy8XKKLiJRMoQ0aazIDt58Gb3F2B5P6wGuiCqSdgc-3XPu2hem4Bq3lhq6fEzChter40f-Ldo_zbGjM2tCWlgH-BGN4CHr7e3jkhP4UYPREK_B0VP5QyrCKi0hbXMn9DGrLDkWlrxgI5ycuquM9ip9qHJZMVbLJcaF_TUYVUDeqT2vEwJqP_9PchsqHi7VBR8nDxf-r9e-xjfSz3kPIf0jn5oXK7yRq7IHdCC0qEyk2Q","e":"AQAB"},"attributes":{"enabled":true,"created":1613499648,"updated":1613499648,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd35d265b-0d69-41e0-9d2e-c9145122a1c4',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:56 GMT',
  'Content-Length',
  '919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4927a026-4d90-4d44-9269-fb5806ad06ca',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:20:56 GMT'
]);
