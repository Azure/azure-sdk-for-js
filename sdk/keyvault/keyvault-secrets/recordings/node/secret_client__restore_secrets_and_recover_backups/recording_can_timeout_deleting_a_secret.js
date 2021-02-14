let nock = require('nock');

module.exports.hash = "d0b80eaad097be136d7952300cad26e2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
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
  '3c9aaf31-e984-4168-9eab-41b670f06582',
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
  'Thu, 25 Jun 2020 12:05:56 GMT'
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
  '136e811f-365e-4f14-9697-95fac3701a00',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqUto1BZgrBEtJNJj_ICWs0_aSJHAQAAACSKhtYOAAAA; expires=Sat, 25-Jul-2020 12:05:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:05:57 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/d5a8aa04251a4b448c076452c4d13e63","attributes":{"enabled":true,"created":1593086757,"updated":1593086757,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'dc074fc9-e41b-429d-b9dd-721f05fa63d5',
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
  'Thu, 25 Jun 2020 12:05:57 GMT',
  'Content-Length',
  '306'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLmpmaFZuZUZ1bkxHYld4cmVIR1NpN1lvdi1sczNqNUs5T21yVDNQSFRfM3BVV2lWWFBNTE9ZWElQZlhnNWQ0RkpSR01HOGNla1Z3ZktBV19wa25RUllSSURmNHhYQ0JCUmIzOTcyMjNCdENobWt5Sm44UXpCM0hoM25helJoUDR1aFNwclVTMTFKMG9YaEo4T3F6aFBjZnItMm1fYVdmYWRHMENWRGJiODZmLU9qSDI2Q0FaS2ZkR0N0SjhVOVlFOTRGLWtNY1NoaXR1WnJNVWhCWlMybUc4anE0dXBJMjV2aVRJX2doUkZNWDF1dC0zcVBjS0tyem5oRkhaYmt4YU5hTTNMa3NDdURMUlJ5clNLX2w4V3ROeHpHMnBZSEtfSGV4eU5CYnQ0amNiQ0QwcmZUNkU3d1FDYVpZcmlvdTRBdHJsQTVXV1BIeTVhSDZlYnQzb0RMUS4wTThTanVRSmpfUFV6VjJuREJHdDVRLlpZZ0RfZGl6OEFzSHYwcllpWGk2Nlp3ZmNYOEt2R1pHMXE0dXVZU0kxNXpZUnQyMjJCcmRHRk1uQTBJN0pFbm9icFktenRsMHdFd3ZIb3dtQWJ5dmI5aTRvY3ZMenRwZlpIc1dDb2x0cmtRWC1OeFhoaG14QUt3QTRQLXNLZWczVlZkOHd1SlpDYzlwWjl6ME5hNTFpWVY4VlZMdkpDRGRjRk9ZNi1pQno1c0UyRU4xMTlud0VmN1pkN21rQXB1RExRYU1sSVJwQ0dNNE8zUjhHQi1KZEFEN2ZpLUlqcEFoT19MMWlRNFN6YTQ4YzZ4WF95bm42RXpFMktrS2FqYzNhR3IzUF9weGxXQWpibFFLaWNkYUxjdDZtczZfcGlnWUJHMjE2bjVXVFpzZTB3SFdNMTVsVXVJbW0tNFpaOW90dFRldDVQWExweVVzNmRNY1pnSHBFbzlwRFlnV3h5SkpxZWprNnM1UGpkdVF0aFZ4NDM5SS05c3dfZnNQeGtBb0d3bkw4elloNDREOFdSbkRRVU4xd3Vtb3FuTUhfVlY2WXVTRGFkdXRiaXpUTzV3RHk5TTg5aVpYSkhHem1XLUNGcHlNUk11c3NkcGhpR25Rb2h4aUZBRGF1SC1CTXJtanYtRmI4d1ZlQlRpVXVjSEFjbkV5WGpTb1NPYlBEdFV0LXpUZUVkWXhDQlFsOHRyUnE3MUR2ZHpkc0JETzRwUnF4WEo4dUtuZnppd0Qzak85NHQ2X1h6ejJodjRibW42N1B4d3I1Zk01VXVsUjhUblFlZmtBdDJWYWJZRUd5cUxTWUFOVVRsR0RLWUhTT2xEMkJJTVFvYUpkakt2SW9tT0dJYXQxZUJSbl9UTFZtd3hyaldTUmVraExvX1plckRYQklsMkVJckM5MjNPSlRSOEllcXllLVZVWkJpX0ZyaHJnakRRZDBneWhWTTh0NlE5aVB3X0p6ZUZzS2hqbzludWw5OXkyQms5a3JzUVdMQkRGZC1ERV9PQmM1d0d2SnFDMUhab3ppamdzMU5GTjl1c2ZLZTI5Yjdtckg2Rm9LUzNUV3hQMHJOMVRoTWVTcjJveEdQdndKc0FHR3VJdUxoZHpTTVVyaEJOMjFWVTRDYVVwVExLVFlxMVRYNmxmdHpMSGQtQUlVbjFGRmtCYk5hRDRhWE10UWQtMXJMUTd1TWJDOGtVeXBCaDA3QW5uN1RyTFZaVGppSVYtUDBia2hhUmUyZjQ0TU9LNS1PeEJ3Ml9JbGFlNlcyY0ZPcEMzU3ZwcEMxd0FxU0phb2xQcUNFWFh1VHJ2d3lMY2U0dXZSR1FLUnZBNUszcngtYWZ4Mi1DbFZtaU9nZFJmbndjRGtLX2llODRoWmV4ZlB6cEtMV28wSEZBdzBfa1l0Mk52UlVoUldNd3BxNWxocUFwSFd6bDFjT2RTX0txakxudk9hWEZ5cWQzLURZdXBDakhpemg2VTNlejdVTms2SEtsUmtjb2wxNXBKd3F4NnVnOTg4SkMyUWNxREhNbGFKa0JHa0Ntb29NOTBtTTdLNUJXNGJYc3h2c2RvYjNMZjR4Yk8xcmpOUU1wWE0zWk5BUkg3WFVrNlY0cURnalFLWkJCYWl0WmE4YjNmVnpnNGlXSUg2ZkNnNFNuTmtCZm1FX2ZnQmltNzFnZUhRTlpEYV9qVkhOcXdycWp1VEFickUwWUhoQUZtQmJubnJXTUxoblktNnQ4N3RNeV9GT2dYM1Q3ak44U0FpSk1tbUVWeUVhX0VjY0RmUXg0QU9XRXptRENfZjZGYmtBMFFpQmphdU51Zzc3Q2oxNDdyM0NEajRKcXRiRGdaanFqVkFTb252Y3FDMzU2X1pnLU56dXZ4NmVoeHR2WVpwNC1RalFTeUxCdEdoZ0NPLVNfN1VvZUFrUUZIckpyWUNGS1MyaVUyY2VHcEw1cGlpU21PNHBOTmtfSVBFTnJXcld2blNxekN4c09uQlVtWkxlbk5QSUV0NmVicGR5dXExMHpSZDI4NXVxa1ZlUTdqbkZ1TVdwcEhRVFRFQVFMSHI5cjlKMjlPUWc1bTZWaGZkRGYwN0NTbHRUaFVJR254cWpjRUNweWlwUUJRWFhoQ0pib1NCUWx5Zmx1ejFqZ1JJUmNQZTBuUEllOExnYkNkU1lDQlJOUkNNajFLMFF4VVduTGRRUXhKUTBTSnRQT2pLMVdqdFJjTjVvX0NsN2VselRKU21kN0VWSU9uV0xJOGRaSWJjVGlaRnJqQ2RJNFdZazlzMlNEOUJSUHVZSmdvM0RqczlMVmVNTVQ0V0dnMjFuWERnZ2UxOHZ6a1dxRHJDdjVwQk9rUlVBeUJ2cFEtaHYwdHhVUUt2Um5Ka2RaZExxUnliMzUteU91akRJV0ZCSWRSNHhicmhYSHN5TTlEMU4xWElwcml5eWs2OVl5bjZhbUItMWJGRkJqRjVBQUdvOTlHMmNWVnZHTVdNX2JhMDk0V0lmWTJucW44QnZrVXp2eDRUVk03eXV1TmxHbXVmc3JHekpnZTF6dENydHd2eVNFM0p1YWNpYlozZ0JBdmdhMlRKYjdRSlgya2dhdGltN3hPMEdKbFY1MVhnR2RpNkFSQ2VEUEs2eF84UnozODhqUUhnOEcxb1V1NkN5elh2em8xRm05UURfMEVqMXdXVnB0ckxiNW5PaEFpS0czQ0JFV29MVllmWXkzZ0VuS1hGdExCNmUtc1B4WmdIZ2ZncjNMWFVISXM4clhwLWE5RC1ILVZseTJqVmJxQW9kbUJoc0NPMXBtelhYNkFaeUFtdmx3a1hsZFJlTlhNQWYtNXJvNk42Tlktb0V1OGJ6VnNEbmFXMklOUUhzUnRVRHlmc3VGS2pkeDV1YlFhRlVPcFFVQThJSVp0RzdTOERYNFJfd2dUSFVjZ0VZQUc0ZmFtT2lZdk44NGJUdk9zNlFqZmgzQnNUbzc3QUFKWm11dVFJdHlLWnlTWXJJM3dINlA3WHFEeXVLdVRwOE9ZcjVkSTdydzNQOG5LbGV1TUVhZzZTZldiNFZuSVl6SzFpa1RHUXhleVp1SWYtUUxnNlh4MVRHV1RqdGtUbVNTbllUb284cWhhcm44cC1SQjlLRmR2cWljektsUWVMNERCRk1yUnZSc0VBMVJMVm9pV2l5aERBZllBeDM3RVFfbXFhOXZPRk53LWduZVQwOGMwV3VKVXdhdGhsYXNUT2Z6Zmd2SXJGdU9DeWxJY0pKS042aTctU1pPcHVBSW1US0RnTzZLWncyQXFEcWhaUWFON2tSOXBidnFtNHBydG14S2MzTUxfVHMyT0NkQzROUElwMy02MmtYVm1tSUVlMXNtSEpHN2tCZmpVX3lpTnc4TkpzWjZDekFXcE4wOHR2YmtmNjBfQkZPcXFkaHI2VnZwOGVaWm1iYjFfRGhESnUzamlvWEE4eTlIcUFOVmlFSU5uWFVwS2RmQXA1Q01ET1VLQ3prdzdINnp3ekRNSnRvNzVBSnhlaWVOX29PM0QzSVFHbkZ2eXUtMVdDNnktT1ZrSmxTSDFKRmpDY3N4cU1kUERPeEhiM1J2OUFIaFcwTVJiNEVhd2JmcERIYnRtUDFVRVo0YnRvVHBQUXRDbWN1RmtnWmozQndkVW5EV0ZxYm41eFJ4Z0NRbXFPNUpyakN5dHNiblc4dHJsZDlDRXdUeVliZDhBb3JVcWFDNE5TZm1abmhHcGNyUlJKUXBkWFFkVDJSSDQtck5xWEpoWWtubzdsa2MzR2JZSVA3enFqamJEN1ZrcF9vYWlFMVFVd0kyQnRyY1ljWEcza25UUHZvNmJrOGtVa2VTb1ptRkdYZnVjUHJsVGlFVTVvcUZlNmRnQlhBZmZiYVE4MnpuMGlqeG9TWHRLNVJoeE5MQm9uajdDNFQwbXU2bTBNS1QzZTFKY0h6QUQ2cXVKbDRBTk00clJ5dWZBSVNqcDlzajBMaGlzb0ZuT1hTWVpBZzZwcmQ5ZzFEX1JiRnQzTUlKek5SWmNpUXRjQU1wbzgzUkdhTG0xRkp5WUdSTzRtdkhnQWJVUkptN1FQaVFxbTY1aWtEZTJVVGZrY0RaNHBrZkt0RmU0S19HSk5LMU0zaTNTVFEtYXo0bDRnTUNaRVhmdmtSQWFDSHZvUWFTWUU3T2lrbnpwQ21vVHVfNk1ubUsxdVpuZnlzSHVmMW5CUFptMWJHVFVGaGVkOGFPdjZuc1FvN0hMMlI0X0hjVmdCdHhEUUljTzZ1ZkZRNGhrWUF2bDgxblpRRm15ZUwzQXdXeGNtSW1xelhTTC1ndmMxUHdzSnlxdUpYMFh5YjRMMDEwR0t5MWZhdHBCZTlmZjhBbmhCTkEtV3R6azk5eTdEbGJFRExoSF81eGdnbDl2d0ZMYjI3dFloNVhWeFZJWmI0M2ZvN3p2MHhBc05GamRTYmdfR1RCa0duQUR6RDZ6VDRSN1ZJT2JTUDNZMWhIdHdSZkFCbUVMOHlJMGJlczhEazY0eWR6Si1iMllpRURPZVNuYmxJbWxRekUzQ3lPdE1ZSkV4dUlYUFFBNjNzUDZxNnBPSGUtNlZfTVJubGVFUE0tbHRZZHowZFFzdGVaOHNGTUZlZ01YbktDNGM4NkREejlJb0NEY3RPam41R3RXWVNINEQyTmRGYjNaX1pqSGtNRXFfcm5EOHhtTVJHYmR5MW5yVVk5UF94dUhHdDRaczdnR19HSG5UaUkzRkhnNGZQcmhFTFpKSFVMbmVGOGY0SWVIM01za3pkYUFWZHZZM0lHdkp1U0w1QUdORnNMS3QxMTc1UktXSE5sMS16dlRMZVY0LUM1ODlKbWV6SHNhVVhMd1ZHVWVYN3IycmRxR1hSVnRwaF9kR0p5QTZDWEFGR1FDc3o3aFlIU25YWG1xZlRDVWF3Rkg0ZWVvZ1F0RFZpQnA3OU5IQ3IxWjMwMDZUdnBxQzJ5X2E2U2hZQm05WmlHVFV0TUt6clA4RjZCa1FnaGFFRjBVbFZSenlHa3I1SkdyR2EzYnFUODlCTnl5eC1xTUw2V3F6Q3U3cEJibFNPcHpjWmp4WWlJMHp3dVFucGs4djlIMXFBUzlZVEtJYTl4blVIeDEwcG8xWW1zN3ZrckM2UTVHRTBscjhnb2M3cHBrY1l4RWZPSzV6OF9vSlhQTllIQjdaN21yUlhtQkRlTlVKWjNDeXFtR1htc2JJY3FiYWpMOV83VGF2czRWNkZfNUxRdHJGSzllNGY1bW1NMkpLWGRSV0daRVEtbkFWRXVCUFdqbUV4TTl3OTl3d2tsRmlRMEpjVFZWcWZzN0ZjS3pnSUpZS0ZjZ19ibTJpeHp4ejU5X3FOQk1CVEtFRGppYm9PR3d1cTUxLWpuZ05qZkhwaGtnZVlFdHVIeUMxRGd0TF9WLXR6WGdsaTNZODd1X0NzbEpBLWhjWXJQcG4xMWx0cEplaTdpVEhib2phR0h0MWRTTUlqUDBPLUw5N2xEU1lVUmRaQkpwcG5GOWQtN3FfMkRiWnZ6QTNrMTdIZ2QzMGJabVlYcjZKTVJFSWlEZndvd0xzY05HbGJDYU16V2J5QU15T05zT2t6eHJGY1VIT1RoWDdHbHpMQjk5eUN6N3hNNzRzMW1tU0xidEVFWmdyU2M1WEppTF9Dc1A1SUNkQ0h0QS1CUjNrRnRDMEk5YkJMTG5qTXMyRFhhOFVHTkd6U2tSRW9hRDlGYkpfX2p2ekNRWTVFUlprRFk2STd6NFBqdDZYMEozeGZwUGt6a3dlZkdqeXVDZFNFNnRsOXA0LVJ3UkIzT25GbVlTLWp0bFphei0tY3dfTS1jbklWV29fV1dnODh1Q2JETFNYTWxJNWUtcHNJUGNHTXFlS3E2VnpEejZfbWhWa3k5Y3VhaC1qVUE3aW1YVW1vdmFmOW1SQjMtd3BmcGRHN2g3dDFOcnNzNHNyUnVXOW9Fd0RCQ1FwTUMzMk5MZUNJUjZsZU9YeU9Qc2NBNzA0eHVLWmpuV1E5RVFFZzZUY2Z3eTRMUXpBcXhaNm1Pd3R3UHMtZHBCS1dMTXlLRnRyYmhOaUFRWE1GaW1idzlSMVBwZlN5bnlmQ2xmcDlkTnA1dmVZU3NjSmJ0OHdXQzhSQWJTUmZvTU1DTDV0dkdxWm90T0ljNVdCMjQ3QTQ4WFNwVG5nM29KcVRsUHJSdDMzUTI3Ny1LY1Y0V01KbEp4RmlKNFVnQ1lCekoydmpVWnJGamQzbHZvZUd5OXkxa2VwbE42UV9QaTNWZl9xZDFvNU5oWHpsOXAycUxLT1UwbG5IV1NmZGpQRUEwU0dMV0ZuV1JDNFBGTnRvZ1hHQ2tYY1d0M19TWHJCZ2ZPdzNvemJfYkZfUWtOMVFSeG1UWWJLT00ydmphTm05eTd3ZVdFdGZ4aFNDVTRzT05tLWw0aXBlZUQ5MkhGc1NTRDlSZlkyU1ZxNnhpajU2THBHYUpnUFFBUjk4NzNGQm1LUFRhanpsRWZVa0lVb0MtRndWTWVwdnMxSUdGWW9uUzlmNU5zRHJMOGwxNDIzUzV5LTlCTnhYRU9RNVZuQ3E1dXVodWo5ODUtVXlpdF9YNG56YWdnTktEbWVMSUV1dHhWcjlyVGYwc3RYQ1p0RkZZdVNiZklieHpZSG9zNnFDak1rbHFBaTN6QndCUUItcTlLTHljV3BFNEh6T0ozaFpUcUxHNXJlSmtXbDBKSGdYazM0bTJLYUlxQ1NlV0doQUdXekJlXzVKamQ0LXg3dUE3a013THJjRC1Hb1pzaWZmQmhCWmJZMnRTT1NSeG5mdk5FZmhrOFdGbHdoSmZudFFDWWJScFJnRDh1T20tTHFZN3pGZk5ZaThnb0QzQ0pBekwwTzQzTGZ2Y3pWWkY2V0hoLXJ5QTNpT2dmZlFoblQ4eVVvdnljZldPRFhkQUVpcHE4THYxaDBmMnM5eHFkNjdnZXc2c0xpenZhQl9FVEtickFwWkU3MWJPLUx6YUhUVFpzZmRnQk5MVXhmeXhvcGJIYnV3ekcuUzgtWXZxQmdfTTVJeVRYSy1jT3l6dw"}, [
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
  '5b751293-7af6-458f-9dbc-d39370d89e56',
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
  'Thu, 25 Jun 2020 12:05:57 GMT',
  'Content-Length',
  '7738'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1593086757,"scheduledPurgeDate":1600862757,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/d5a8aa04251a4b448c076452c4d13e63","attributes":{"enabled":true,"created":1593086757,"updated":1593086757,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'dd4e3460-5f78-41d5-a40c-7931b9339d14',
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
  'Thu, 25 Jun 2020 12:05:57 GMT',
  'Content-Length',
  '489'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4b1caecc-c658-4a0a-90c4-6648109c7e42',
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
  'Thu, 25 Jun 2020 12:05:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '574d09d3-fdd6-4a0f-a357-c0a7cc389a9c',
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
  'Thu, 25 Jun 2020 12:05:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1de61faa-3525-4c9c-915a-f03a0354e0e1',
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
  'Thu, 25 Jun 2020 12:05:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c6f47678-59b3-427f-81bb-f44df1bb43d3',
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
  'Thu, 25 Jun 2020 12:06:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cdc2df7c-a8ef-484d-96f4-45855b7922e5',
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
  'Thu, 25 Jun 2020 12:06:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fd7a4779-38d4-4bac-a4a0-6af7e0a71394',
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
  'Thu, 25 Jun 2020 12:06:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9f9c4783-0502-4a5e-851e-a762bd0d59ce',
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
  'Thu, 25 Jun 2020 12:06:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1a5a44ef-3825-43a6-88a6-bc47057f8571',
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
  'Thu, 25 Jun 2020 12:06:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1593086757,"scheduledPurgeDate":1600862757,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/d5a8aa04251a4b448c076452c4d13e63","attributes":{"enabled":true,"created":1593086757,"updated":1593086757,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'e5ef093e-61e4-4c9d-a046-60f8f2628474',
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
  'Thu, 25 Jun 2020 12:06:12 GMT',
  'Content-Length',
  '489'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
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
  'a0bb3bbe-1a18-4d83-86c0-7b293c399a1e',
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
  'Thu, 25 Jun 2020 12:06:12 GMT'
]);
