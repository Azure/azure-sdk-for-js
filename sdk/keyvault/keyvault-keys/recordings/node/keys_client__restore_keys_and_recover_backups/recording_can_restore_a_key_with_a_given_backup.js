let nock = require('nock');

module.exports.hash = "b05d46163893a80af1f7d4b4874fbfc9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/create')
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
  '26f9395f-17fe-4320-a5e7-cd7871ad48c8',
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
  '995515c4-8f09-43d7-bcd8-dfc4e1c10101',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlYh5w5_onJDnZLEqg70g4sA4qsDEAAAAKwDvtcOAAAA; expires=Thu, 18-Mar-2021 18:20:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:20:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wWJ_q3cAsBTmPhf9YZ1z-60FqxCWrZIWtseGQv6kuklYMJgotCIb0h27p4lGJhPq772nXgYWWt90xZRSB4snYZQ4Bqiak0jK7YumpY1KnFA9uZjggz8DokzK46qoedlAa5QAeG2tO_eKuqywFCnddfDYEtdXmbF9I6vCGAWPIgxuUssLCGQ8OkbjfrvbXNf6d8LBUJAhkNBqVjgijTCAdyq0eoY_5WKMABlZ-pUhqmfuUz2t5HgB8ikg_7mklSVaOxEvU6WSSoBlF0bLH69XNL2g8IqrgUuXk0uyDKHs_qp9_BMA8AaQ3QbB7gZ9Zu8izRtLU2glZklCF8Gz1Lg8pQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499657,"updated":1613499657,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'af191bb8-8a77-487a-b868-19ccbc008a99',
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
  'Tue, 16 Feb 2021 18:20:57 GMT',
  'Content-Length',
  '743'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRXFFZndwM05fNTRkM09SVmhaZmtVMlNfMDlHZklvMmlHNHVfVFF2ZzBzZXQtUEExUEdpUUR2T09lNTk4LXFFZUxJWXRXeDVUcjZWQjJxOUdzTHRtbElBM1hhQXdNNXZJVmpSOUEtemYyUERWc2VRb3pWUGVweUxfLVVWLUdYZ21vSnFxVDFfN0ZuZXFFWXg0ZjZweXhCaWdBRTFhSG9qLWxhRWZJM2x2d0dWREJrbXNKQ1ZQNHJ1V0VCQ2R2Ump2UG1sTzdwZGt5ZXdPRE55Qk5rdmlxckl4UFBQZ0x4N2p2X1dVUmJnVDF2MERRQlJUQUpHRWFGTjdjZlZTd05QWGtwa3dIYXlCMHk3X0hTVzhCSTc4Q1JvWno0Z2JUUk5mRUwtWEUzeDZxYTUzRHpPMDB1MENTbnBJSUN3OVZwZU1SUVpIVkF6eGs1aUROSzJZNVlZQkRRLlNvd3ByemNocThkYnhLMXFreFFrZFEuMWxyQW9ZcUdPejBJVmZEeVJ2Y3Y1VWc5bHZWbDdRUHZXTHlNWkViS19wY1UzeGdjMjNoMDFJdm9uWFlCTTRzNExhTkNlNGdQYmQzWG5TQzl1dWpUVDQzR1hXYU9OQ0JTQmRidVZYR0VnejN2aTN6N3ZIU21mSElMbmI5QmVCT3JfSGxMejVFMTB4dHZ2YXdZMlkzQk43b1h4NllTVGRJR2lKY2xYdWdDcHg1WEt4LUtab1FRNHo3Z1Y4SEpUYTN1aVpoSUxPclE0V0Y2X0hNQUVXSWtMQnRyS0dXYWkwMmlFNkpubFB0SkpWOXdRdElpcVg1Z2NVRUFNdEo4YUc0NXl3MDVZYmNBdXZSam1tNThNQ0ZXVWRDY1F5SXM3SjRZNFRNQnJlZS1aUEJ0cWNOczQ0bUFyYzVlckdTcGJ2Q051bWtJWGtmYlJCeDBCRVo2c0VhVEhDOTFaTjdDa0dzdVVPTkQwQ2xmRjFDd01rZjVZTG5vSVZjMXRPck1QajV1YWQwTnBaRFFjZmZxRWJReWROUUpXSzh1VlJIb2dyZ29sZlZfeGJBYTZ0ZEE0b2dUVWRFZmVYT0IweFVFdkJaTVNIaXBOWkhhVWE0WnJ1RU1MTldielRmMHI4WHpqbURfQTZTQ290cEZLMlNXeFRIRG9sRkNJNVF3Z19SVmlrU0FBMTZvNjRJRjZYaUFvVWpKZ1FQQzJFbGljeS1KVUJ2WWJRX25rdGpfV3BSMmFNYU8ydnhpT0o3T1FLaV9qdHFkdTI1SVFXbzlmYW8zTzF3WHByMGRQdXpHNEdUdEZEbDJhajhLZEw2TV9EMjd5X3VRQUFZdUZ5Z0t1ckpYUGlaY0Y4dlQ2Z1FHbXd6b2Nta3AxbnRVanExdk1YUDR3LS0yZTRtYWRET01jekZQbm42Ui1CbFZqYzZYZEN4SlBPa1laTzJUUUVjQTZSQ3ViYzJCbEYzZHBUV1p5MjFtR3VwZ05LdElOdldsMjZDSm8zRnIyUmh3bzBJd0xhSUMxOC10cld6dVhOT0Y5UzBEdEdrandTcGs1ZzJnMDlWbWc2bWJYcGV0WGRBYVJhRjAwNUFiQWx4S0tYWnNVd29ZNnBHdGt6NjRnbkk1UHdWc2F4cUl1SzhqMmhmckxFa25Nak9VSEtlVVZabjNubDN3a0hsYUdCN0NxN2VBY3pBMzBCNUUzSWt4NFM4N3pOXy1raHk3OEEzMGUyWFVmdlo2MV9jQkhfdUVXM0p1YWdVUTlVVTQ2SU41YjBuTjZfUEZPLW9TNW5LbkJucm03bC0wQ1BmdFdma0JlclZtSUZiTE84Uld5bVNFX1ZNNFJFa1NwSHlDR0pZMnhzbWZIUEtFMFBUSEdXZHJVVm9XaGE5RGhLeDlFejRBX0I5ekxaaVpmbEpOdGNEdFctZnFxc1BqN3daMVNWV1dvME42VG5PbllOaGhxS2JsUFFpNEpZMUdaUEVsd1VhaU9mTXBDUndHWU1MSnVfd1d3T2hEazhYV1ZVMzdRT21CbnNOenU4ZWF6WHd0Q2xnaldFeDhfQXNDdElXTVVTeWZ3LXhMYUNvTHNKa0xLektia1o1bkJJaEl6blFOUHdKNHNEZVI3RjNTbE1PZkxPZ0o4QlpmZmtmcmVzYzc4ZG42a1ZoeHdqbmpaODlxRDZUMEZJRDlnOGxvTExPbDlmRUxsajN4V3Y4dzRWOE5zcG5BN0RwdWpIN2RZT3o5M1ZsUERZdGZFUEMySmxlNmp0elc4ZHlkSzJrenVEY2p4Q3JpTnhnQlFWeHY2Y3dUQzJIUjVnRGlGT1Z4dlREUWd0VXRoajR6dHBpS1BuOE5JN1V0RENITzdkQWxLZDB6UWxLMXZaZG5nUGk3MXpqemVRNVhCMXBNaDJqaHNfbVJSTEt6SWNTSHMyelZSdENYT0lrdGJHZzNNYzdCeC1tbk80cklud3U5S1YxeWhKeHlTbkNVQ1VmeWdRZzFRMkZtTEczV0FXNGluZHhUUFFkZlc3cGFnMjRDb3h4em9DbDFoQWdRWnU4NThfRUxLYWhvRmVNVjRlTEhoZ2RZU2EtbkZKX3FiUTlocVh4dlYxLWk3cEZIdDdfY01td213MERJdjZ0dmM1YmZBUk5lZ01ud0l4ZzFMMmdBNDcxLTRKTVhQOHNKNU05b0hXR3FaTUVweHY5VVBBaF9lMnBsSEV5RFg5dXRkWW1UUjk3SmVLMk1KdTV0ZmxvdmMwUXkwRGR1dHJud29sTHJoSUJGcmZRVGU2T0F3V3I3TC1JU09peUJUOE85bnNaQWZFamhNT2psNjRfQWFSMEhRM2RJWGtyYm9FUUVWUVl1dGRRaUVLMnIxaEFvWFk5UUR2WTJhN2llakhGVHpVRUpnakFyazAxSl8wOVF1bVBmMXZGSFZ6LVM2V1VOcmFGTW5UU3hmeTVoblhmMUU3c1NRV3NGdW1YZm9JY2lNQmVnTGZ5c2l1UzNwZENNWGxoaTloV2d5YklHSmE3UnltbGotSklNdzZ5U2Zka0pLRks2YnJ0QUZuTmk2SlZpVHpncUN5QUx1MnhPOU9yaDhKOG5hdkI3N09vY1A0aWdSVklkZ0ZjNUtzOU9VRnItWUdZRm9jekFiSkYyNHRvdDdVOUN0X0lyd1JHUHA0YmdJdFJ0RVJkRUgzU0NNNlR1Z05uYWt4c0VITGYwcW9SeVF2anV2Wi1Mbjg3Y3F0SVNtQXVMQV8xSEhfb0hEeGU5QlNGU0RDcFNObnRVOE9HNzdaVFNGOTZNYkcyOXdxd0VSSURhM01VQnBzbFhVOXd5OXdKSHhnMGxVWkd4NmpsellaM3Jva2o0V0t3czJqQXYwRWV5RWR3bUJIU2Q2aGc4VUZGSHB4dlctOXV6NVJEMVF0VGFBblo5bEd3X2ZrZzJFc01wWHZHQlhqUUl3YlRnU2U5ajhnTWxPLWRMYTZHdDhpUHBFRXdNREpQYmZob1NDYmZuQ2p1d3BlYXNqemNzR0tpZE1CRE5kNktNTnhQbmZrVkl0aFhvUkh0ZVdTRXZRbUdxYXJOaDdPNEZFWU1ESzhueW9hS1d3bnJBYV9hVEh5M3I3ejREVmFFTC1TS0JYdnR1b2hHRHdWalViVUd3Ylg3Vk1RZVRLTmR6bFJmQ2FERUlJaHFydVVkYW80d2paVXJnOXBLSEF1eTRRa0ZHZ0VNa196QjdEY2NDbGpPaXlMcUpFX2N4elVWTHFHQWYzT2F3ZmZlZldXSXM5ZVgyZHRPeHRkSElwZm9fakFGZWx2LTJfRm9FazhqOGdwRUpEWXM4ejZGSlhIVzlLVjlVazhDUVNXRTlWMDNwRGhsNVFmTFdLSTF3Ym5XcHZzQVpYblJPQ1NhanFVem90bDRkT25za3V5RTFLbTU3NVlnZmJ1NDVNd3pRRHdSNW1NN21SSkJyckJ4SDJDNTkwQWR5QkNpd2wwVDIyQUZzWHp3WWZaQ3c5STNMMEszRGtGbThOUVUxendmekMxTHVQU05KQVpJa0lTaEx1Y2k3aGJhakdnNF9SWDZxeURMQm12Um9Hc25IaXFoVzg1Yk51TUpQbVl2TEptNDJqaW1LbGpfR1V1cG9ucWFHZGctVTZ3Z09CTDRONHQ1VFlwNEY3cE1XZTdWeTh0U1hOTXM4UjdyeURjQU9EZEo2S0x0dmV0VTVvYkdOZk1ERC1ZVE1nT3RLNHlGaGVSa1R4dXZ4MmUyRlFsNjFtQmoxMm9zZ3lqMnB4Vm5yZ0k0dFBlWEVhMTA1SlEwMFg4QXNwVkNEY1JwYVF6ZnJaSHR5dXdWNmJoTXlSamtVWDYzNWdlbXpkMXVxeVRYc2V5WmlGSVFGQjJnOTczZXZmNEFNNVJRd1Y2cHIzdm9OdU5Bc1hjWjlqenlQSHlna2ZJOFhCLVVMTHZzQWlxNjVTLThORVdfOVBpWGxfTzF1SGFjTWVmMXJWeVpzeWZfaGw0MHBjbGRzY200YjFHMWVYaElBUjNKX3JpV3N5MXRJcGhITTVyQkFtMVk2YS1GTm9uOEVCWXEyUGJGNnlwbEl1TGFTMUY4Ml82S1VHcDVLN3E2WkFpM1lSSkdyUnhocFVNN2RLVXd5dFNpbFVPMnpwcHRITUNhcUo5VXVoRzI4NGJQUWRnWlZCNEZuOUZ2UnVodUQ4akt4QlNUYmttT1hLREVndERnRjhsRVBmb0llaGp1RURKM0QwNURwVHgwWkJTa1lGNW5qRHFVcG52cW1jRkZfUHhicmpSekhUbno4Q201MkhWZmlGQ1k4TkV5Y1JBaElBc3VsX1dueVlvS0FEVFVlcjFtTFNIYWpGaUkzbWVORFVZVW5Xd3FkRzFWYWFITVREWTVlMk5veGdsdUh6OE50N3RWem1LUERBVkJPaGVJMzBZblpxRzdGMDk3cnpxU05yZ1BvTnVTVHpndkhsT2lRUkctdU1iUWdEVnhkNjV5R202dmgzV0xNdFJmMGxfVzVCS0VLcm8zaHhnVjVkZEIyTEJTZWUtNWxzWk1ZZVJucnFlWlNKTWlKNGswMExFNTA1aVk3LU84VG0tcmh2RktULTlqalZIOWs4WEZaZVdtbTBkaGptb3JaanBNSE5TNnltRUYtVHJ2R2dTaDAyOWhHdU9raTNMQi1TMmNlOVdIaUFKS2YxTnZPVU1CRENCdDB4NmFyT0FQNEFaRWpDY0pudUhIaWt1YWNQemM2T1NOazZ2NmVyX0xlVGs0cnBGM09vRGF0eEtVWl9yUFVReTBoazdxQTJmZ3FVajFlRUQxYm9oOU9lU2VmZEVVeXE3S2NsSS0zZHg1YTlWMThLdjVScm81WE40TGNKYXpXSTM2ZnlkelczeUZ5bHNxYVJaQ29ydXJvMVY0MGZZc1pDelZQTFZuNXc2T3ZzRVpDc0l4VC1ZNWNvYmJ3cnpiRjNJU282ZmtrRjJYSjJHeW9zdjlybEdKUHU2ZF9GV0RnaXU3aFBpaFBhOVZVbzJqTjI2bU1ISmtzMzNFS2o0U2hzaXptTjU1RThzeVBSUzVsY0o3ajRnRHdCRVZyM191clNCaFg0UE4wY0JXb3FJY09DVGVRb3hrMFRuY1ctZ0dvdHg0bWJFWGRFcTJwNjBVdVBBZUJkbEUzQy1DWm4wempKV3J0UFJ2SGlwOWpxOXBMWG1mb1VkbDdIUnVheVRHYmxHY1NISG9BX2h6ZnMtU0tldWVaM1R3eElRa1BnTm51bTRMSTFlSFZheDZuTWNVOC1vZjJjWW95SHRVVHdLbDEwRkNSRnpXLWZWeGR3cERtT0l1cEtKeFFQb0l5N0o4dU5iaGlLMnp1cXVCTUwwbzdhNVhkS3RJd25oQ0RsaFFEdFF0dml0ZERmZEdEX1lMdUJtMEJobzBUZlBPQWRXellRRzZ5TG5lTWtkTWYzd2R4MC10SjVPbVNDN0lyU0pTMGE4N1luMFVMaFV2VnZSV3MtVVlleHRnSzVQdFhvcEZLaXdRbFhZV2ZsNndFQmIzZ3FWN2tLYUlveDlrRFZuWldCUVJvTHNjWWtBUWwteHNnaHJxdWItZnBBdlBpaWg3ZjJyUk5ydV9pVHJzemdMY05wWTFrMWRLaER3cU96WDdqVVM4bnNxWjA2NXhtZzZEaHNsZkVvU1U1QkNEOFZxck52N29oYm84NXo4dWZJcldBQWhUY3FycEFSLThRS2FhLWtrbllfRTMzWm1reXBLRl9kbjNuY21vWFpTeDkyUFRoaXhTZnE3N2FGUWlsYU5EREZnM0FxRm9mYU1NMTRvMzM5MDVjUE4tTF9BQTNhTEdzaUJmcE9reTdxWVhyZWI2cElBcVAtOTc3OWlYdnM5T2tueU5OTnVkQXhPcGhsc3JGNzZNV1VnZ0hfbjVheTVCVGVWaVBsdEFRX21lbEtpM3UxUkFVSDNXd2FkX29vd1ZzR0NjREh3REg4R0JndXhsWTFXZ3F3elBPVnJjdUIxbF9wQ0YyQWplWWVtT1hnN3lYenlmSHE1X0l0Vk9CNlBCTngwN3ZTWUxZYUt5VVdUTFl4NWRCem94Y0VONTRDUm9nZ1Yybm81MUw3MkNWYUtTdEJPUHlnTElXQlZiOVZhMHg3WkFsVkQzTTBOVnFJbnBoSVdxVUYzVVd5d2p2Q2Z1X1pFZmpxUlpYOUVyd0tLQ0J3NXFWdUtXUWMwaUxrazg5U3liM1FndWZ1WEQ5N01FOEFjV25mc1h0SWRkbnFkOTBsX2VFYlR3XzhsTTlycnZkOHB2OTJQRmJUcFlkVlFNOWx2azBWbmliaGo2NS1jSlpvSEs0UjBIb1hPTlhaWlpJQWViUEVDRVlvVUtIUFlNT09nWHppNWdETFZFVTdMdTZuRDlIMWE4Sjlab0xIWGdZZkQ4NXV4S0pRVkR5cFNIY2VrSlRacm40dHZTLVlRejd0MFREeHRpTENOTHVNb0RnbnJ4LW5DWmItRFNyNGt1NVhkTnFaVWFWdWVqaXVSUEU0TmFCV3owSlRNdEg5UUVhbTFkYzRYUDVMMVRCemtYdlBLMlV3dDEwc3ExWjlHdTlkMk1VOGpKcl91REtSRWU5YmlhRmtBSHZfTzk5V0RWVjJ1UUo1RlhLM25uOXhIbU9OcER4RlpXUWc1LUdSLWh0QlMxYTBlMnd4MFQwcTFOUXI2S3dNR3FGcDFOTkJ0cUc5UnNFTHJ4Uk1hMmUxVzlkMU9ydE5DdGlNQmRRdnJ3c0x5Y1BST25rcHRPTXk5YWlEakdPSDZPSW1BY2FQbUNaREFUMUh4V25MTndYTjQ3ejhVQTQ3QU1xX193LVU0eGh6a2NDbGpPSnVHOTVFeUZBOVhDM3hvVHF0Y0YyQ3lLVGdGT2RRLWxKSmJpMDZzSzZWNVhCUnIyUHpqcGtiZldsYjVhcHM0NjVnd1JKemhtVjVHTGo4Q1dLTlhZcHBGN0trdUlBZjMtaEE0aWh4TTVkZkNSUVF6aXB5STdWQjJIMDVBLTZiZW03Yl9hbTJIZjJnY2xEODJMWk41eGFNNHhscGVkODFIMmFZcjlhbDBTNFlxNHFnbEhqaEdVTklFWkswWXUxX2VOX3JadjhEMFo2aGdiRTZCNnAtZ0p4SktCcGhXc0tYYmtTZEhVU2ZuWDdPaWs0NW9LT2ZoZGdDQjUwRFprSE5JZXNuWUhMVm4xNTl5ZEVodmJiMlVRU0RWMzVuZUlvSF9WRVhWRlRpVGxaTEVlWHVWRzIzeXVyOE40cWFnbGpCTzY4NDhJQ0Y1N19rUUQ5VlV2eW5KVm9xU2hvb2tpeHo0OUxXaFQwbFBuMndQWEhLZkpkc3NxT0M2ZXpHaGQxMXlfNHBTUkhfUTUzUFZFZFpUUDk2aV9xbk54OFFTUHpyRGh5WUVVWEM4TjdFQ0RZNDR0c2lqU25PSDZoV0FaYTJUVW5qOGo3UG5nN19iaEtoZjJIV2ZUOW9jYzVsekZqLTV4N1ktdHh6bl91YkpWZ0RkSzBwcFFZRlQ1SVVPQVBiRzdGTDc0MnJtd1ljVHlma2U1ZTVpUjdEQkpZeVpEMHJJTEVnME1qZm42OU9wT1EzZ0VnV1p6ZWdMUUUtaElENDlPS2lYc1hEWkoyZGhRQm5nNVJGSWR0cFZaNXk0SGFmT0FOYzJFUVJtb2dRZWdvS0RZTDdWNnk1WGcwYzZVNTlxd1RKTzNwdjVYdDE4Nkg5TVdvbmRZWGVwR0hwLVJZU0NjdGtzaFBiSHdnZ1NOeG5ZVHU4b3dQeWdHUDBvSzJfMUNBcmRfczZXX0E0QWUwMjJIQThNSVg4eFlOSjZrUl9qQ0lSTWVKNzFQM0tTaURsV2FRdThjOXFwZVpoZ0J6WXpKZ1pDYnZiNEhvYjAtZXJzZ1JueklJRWdaZ0F5dnVLT3lWN2RfNmF0VC1HNGNyNlFYMThPb3FIeTgzSGg4elpDcUItZWJsbWRPQm5vdFZJS2F0dWVlOWpMX3k0U2t5cWhycVFpWGY2akhlQ0hSenFzZjgyRkc1S1dMWmx5MjVXRDdIZ2xlWWh1WUZ2c0dzS3QxaUctVVFPOTY2V2c2TTZoYjNpaEcybm1JN21WWDNTTTdnZ2FZYWtUYXh6TzE2cWgtSGlDU3BuVGFHekRRVWZreGNIR3Noa2tEbTNoVHFqVmRtMWVGZVdZWi1qY3RNVDRDLXAwNnFuLTRrUW5hdHFvdUYtaE0zbkpXTWVDQmpTWWlTeWdZZ3pjWkUyRnpUSnpSRk0zVmJsYkJqbnlHVUVhWmxjdVJLV2s1LS1YWEd6V2dBR196cWwxSXllekNmS3c0ai01TjZveHRGYlowM0pnS3pzMlladHZPQ1c5YXMwQlBBV1oyY3RqVlBVUmNGUVZmaW9kRkJTRnJCRTBUVF9MOW83LUhkS3dPb1VyR1Bsd2ZEWmpXTFFQLUVqYjlTRTlZa2dRTUc4X053YWJyMjZkVE9QRlp0bmNHLXhLU0hEMkZSQ2x4SUJWdUs2RkJUd2tEdHBDZnlIZmdYbkEyWWpvT3pSMG0zU2Y0cWJkdU40cUd4YjJHakNTbWdHd0ZqUWZ1bW82c2tjQndjRUhhNUNSZVZQMmpxM1YyYVkxY0dHM0R4RjE2a1EwQ1VCeUdWRkgwSHF2NF9fRjBkMmJoNUJ6OWpqeDA1SmFQUnRVMXNlSGlIdlBybFRhWnJETWd2UE5zZDBocm5uR3pOdERmYU5KdnNQbDhTVUxxNlVBQkVnZEVobkhjeUk2dzlYRzZZUF9GMXJ3LVVZVXJzTXhfMXFkWmZ2UW9MSlNkN3ZJeVVYWUkxU2pHZGw1RWlxLVRyTkw3ZTZUY1g5Q3JfWjliMTN3VmRINHFpd0psWkFKamI3alhmWnNRanctUWRldmhGRVQtNlA5MHJKTFluZmNIU3dnYmRVcjdIV3p2WndRYlBzanRjdzMtek50TTAxckxpbXVEakxvdGxIWHZ0cTBrZ3UyYmNWM2RHQUlYMTd6ZjhGOGV3bVF2amxyWVV3RzZtWFM4TExzQW8xY1ppVlFRMTU0ZFl3M3p2enpQQ2pJa3dLN2xvbG1Cd21YNUo0X2pIby1oYzhCckJHLS1FS2ZfQWN0emJmUVJNN2JUMnJEbVdLa2NxZVVCZDBqVlBPeGZ2VzE4emlMOUprRm1wUzJZZjQ2SkJGVEtPQkNxQ0tlamEtQ2lxOWlsX3BCMXVybnV4b2xLeDY5YW5jOUJXeDBSdUp6ZnF3R2FTa1Zua0VHakF2MzNYQVVNMUxteERFVGJWbHVJT1ZCTEloN2dITzMyWUl1UHlScG9kV2M0U2ZveGZPNVZDejNHbHJUZElRaG91YjNfZG9nN0ItaE9RWFpsYlNjNXdUYjlWYXRGalZ6dUFDOVB5OUM2Tmc0eFRfenZ4MllGY0ZBS0g3am5CVUJUNlN6RC0zdV95SnAxbXFvcEhaRVA4QURKa3ktQU4tMUtYd0FZeVlFakZpaE9hYTc5d3pGbWN1d2t3aDdBRmFlUDk5ZThhWkZEa2xOd0FKN0tMeUFFTlJDRlNLT2Vvb1JQMGhrekhOVTRiZFdFQWxySUlxdHFPXy1TUlBoc2YxRTNpUFlURXJMQUJRMlcxdEVvSUE2RG11N0dTdjJFTG5RQ1BuOGNxZEZZSXlnbDl3N0M0b2hSc3BWdDlMUW1KTmwzei0tc2dyMHFpNng4dmV1blpMd0Rtcm0teDh6TzZYc2dhdXQybHh1a3g4RmUzVFlvLjBXUl9xc09VanBBcktqMkZhSmQ3dHZGWXQ3aXItZ1g2RXdQSmZwT1F0d1U"}, [
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
  '776aab48-2d04-4c0a-88c5-5c2224b387ce',
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
  '10471'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1613499657,"scheduledPurgeDate":1614104457,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wWJ_q3cAsBTmPhf9YZ1z-60FqxCWrZIWtseGQv6kuklYMJgotCIb0h27p4lGJhPq772nXgYWWt90xZRSB4snYZQ4Bqiak0jK7YumpY1KnFA9uZjggz8DokzK46qoedlAa5QAeG2tO_eKuqywFCnddfDYEtdXmbF9I6vCGAWPIgxuUssLCGQ8OkbjfrvbXNf6d8LBUJAhkNBqVjgijTCAdyq0eoY_5WKMABlZ-pUhqmfuUz2t5HgB8ikg_7mklSVaOxEvU6WSSoBlF0bLH69XNL2g8IqrgUuXk0uyDKHs_qp9_BMA8AaQ3QbB7gZ9Zu8izRtLU2glZklCF8Gz1Lg8pQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499657,"updated":1613499657,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'e9cf15d4-b72d-4f4f-a637-a44505ce89b9',
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
  'Tue, 16 Feb 2021 18:20:57 GMT',
  'Content-Length',
  '931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6cf1663b-9cb9-490c-98a0-8ab53286c434',
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
  'Tue, 16 Feb 2021 18:20:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7eb9df13-3404-428b-9549-24b686fbb564',
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
  'Tue, 16 Feb 2021 18:20:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '374c953e-6aec-445f-ba4d-a084d883e0e4',
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
  'Tue, 16 Feb 2021 18:20:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '8e8a23e0-52af-4ee7-aca0-641d88be8219',
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
  'Tue, 16 Feb 2021 18:21:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'aced33b0-7b36-4c13-b397-8f5d22cbd38a',
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
  'Tue, 16 Feb 2021 18:21:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '84d47ff0-528a-4887-baf0-405d81240c41',
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
  'Tue, 16 Feb 2021 18:21:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1613499657,"scheduledPurgeDate":1614104457,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wWJ_q3cAsBTmPhf9YZ1z-60FqxCWrZIWtseGQv6kuklYMJgotCIb0h27p4lGJhPq772nXgYWWt90xZRSB4snYZQ4Bqiak0jK7YumpY1KnFA9uZjggz8DokzK46qoedlAa5QAeG2tO_eKuqywFCnddfDYEtdXmbF9I6vCGAWPIgxuUssLCGQ8OkbjfrvbXNf6d8LBUJAhkNBqVjgijTCAdyq0eoY_5WKMABlZ-pUhqmfuUz2t5HgB8ikg_7mklSVaOxEvU6WSSoBlF0bLH69XNL2g8IqrgUuXk0uyDKHs_qp9_BMA8AaQ3QbB7gZ9Zu8izRtLU2glZklCF8Gz1Lg8pQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499657,"updated":1613499657,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '8c059981-7fc9-4122-b785-9fc6cf83d8ff',
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
  'Tue, 16 Feb 2021 18:21:07 GMT',
  'Content-Length',
  '931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
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
  '3abe17fb-4151-4696-8708-1ed2fe6f2f77',
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
  'Tue, 16 Feb 2021 18:21:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRXFFZndwM05fNTRkM09SVmhaZmtVMlNfMDlHZklvMmlHNHVfVFF2ZzBzZXQtUEExUEdpUUR2T09lNTk4LXFFZUxJWXRXeDVUcjZWQjJxOUdzTHRtbElBM1hhQXdNNXZJVmpSOUEtemYyUERWc2VRb3pWUGVweUxfLVVWLUdYZ21vSnFxVDFfN0ZuZXFFWXg0ZjZweXhCaWdBRTFhSG9qLWxhRWZJM2x2d0dWREJrbXNKQ1ZQNHJ1V0VCQ2R2Ump2UG1sTzdwZGt5ZXdPRE55Qk5rdmlxckl4UFBQZ0x4N2p2X1dVUmJnVDF2MERRQlJUQUpHRWFGTjdjZlZTd05QWGtwa3dIYXlCMHk3X0hTVzhCSTc4Q1JvWno0Z2JUUk5mRUwtWEUzeDZxYTUzRHpPMDB1MENTbnBJSUN3OVZwZU1SUVpIVkF6eGs1aUROSzJZNVlZQkRRLlNvd3ByemNocThkYnhLMXFreFFrZFEuMWxyQW9ZcUdPejBJVmZEeVJ2Y3Y1VWc5bHZWbDdRUHZXTHlNWkViS19wY1UzeGdjMjNoMDFJdm9uWFlCTTRzNExhTkNlNGdQYmQzWG5TQzl1dWpUVDQzR1hXYU9OQ0JTQmRidVZYR0VnejN2aTN6N3ZIU21mSElMbmI5QmVCT3JfSGxMejVFMTB4dHZ2YXdZMlkzQk43b1h4NllTVGRJR2lKY2xYdWdDcHg1WEt4LUtab1FRNHo3Z1Y4SEpUYTN1aVpoSUxPclE0V0Y2X0hNQUVXSWtMQnRyS0dXYWkwMmlFNkpubFB0SkpWOXdRdElpcVg1Z2NVRUFNdEo4YUc0NXl3MDVZYmNBdXZSam1tNThNQ0ZXVWRDY1F5SXM3SjRZNFRNQnJlZS1aUEJ0cWNOczQ0bUFyYzVlckdTcGJ2Q051bWtJWGtmYlJCeDBCRVo2c0VhVEhDOTFaTjdDa0dzdVVPTkQwQ2xmRjFDd01rZjVZTG5vSVZjMXRPck1QajV1YWQwTnBaRFFjZmZxRWJReWROUUpXSzh1VlJIb2dyZ29sZlZfeGJBYTZ0ZEE0b2dUVWRFZmVYT0IweFVFdkJaTVNIaXBOWkhhVWE0WnJ1RU1MTldielRmMHI4WHpqbURfQTZTQ290cEZLMlNXeFRIRG9sRkNJNVF3Z19SVmlrU0FBMTZvNjRJRjZYaUFvVWpKZ1FQQzJFbGljeS1KVUJ2WWJRX25rdGpfV3BSMmFNYU8ydnhpT0o3T1FLaV9qdHFkdTI1SVFXbzlmYW8zTzF3WHByMGRQdXpHNEdUdEZEbDJhajhLZEw2TV9EMjd5X3VRQUFZdUZ5Z0t1ckpYUGlaY0Y4dlQ2Z1FHbXd6b2Nta3AxbnRVanExdk1YUDR3LS0yZTRtYWRET01jekZQbm42Ui1CbFZqYzZYZEN4SlBPa1laTzJUUUVjQTZSQ3ViYzJCbEYzZHBUV1p5MjFtR3VwZ05LdElOdldsMjZDSm8zRnIyUmh3bzBJd0xhSUMxOC10cld6dVhOT0Y5UzBEdEdrandTcGs1ZzJnMDlWbWc2bWJYcGV0WGRBYVJhRjAwNUFiQWx4S0tYWnNVd29ZNnBHdGt6NjRnbkk1UHdWc2F4cUl1SzhqMmhmckxFa25Nak9VSEtlVVZabjNubDN3a0hsYUdCN0NxN2VBY3pBMzBCNUUzSWt4NFM4N3pOXy1raHk3OEEzMGUyWFVmdlo2MV9jQkhfdUVXM0p1YWdVUTlVVTQ2SU41YjBuTjZfUEZPLW9TNW5LbkJucm03bC0wQ1BmdFdma0JlclZtSUZiTE84Uld5bVNFX1ZNNFJFa1NwSHlDR0pZMnhzbWZIUEtFMFBUSEdXZHJVVm9XaGE5RGhLeDlFejRBX0I5ekxaaVpmbEpOdGNEdFctZnFxc1BqN3daMVNWV1dvME42VG5PbllOaGhxS2JsUFFpNEpZMUdaUEVsd1VhaU9mTXBDUndHWU1MSnVfd1d3T2hEazhYV1ZVMzdRT21CbnNOenU4ZWF6WHd0Q2xnaldFeDhfQXNDdElXTVVTeWZ3LXhMYUNvTHNKa0xLektia1o1bkJJaEl6blFOUHdKNHNEZVI3RjNTbE1PZkxPZ0o4QlpmZmtmcmVzYzc4ZG42a1ZoeHdqbmpaODlxRDZUMEZJRDlnOGxvTExPbDlmRUxsajN4V3Y4dzRWOE5zcG5BN0RwdWpIN2RZT3o5M1ZsUERZdGZFUEMySmxlNmp0elc4ZHlkSzJrenVEY2p4Q3JpTnhnQlFWeHY2Y3dUQzJIUjVnRGlGT1Z4dlREUWd0VXRoajR6dHBpS1BuOE5JN1V0RENITzdkQWxLZDB6UWxLMXZaZG5nUGk3MXpqemVRNVhCMXBNaDJqaHNfbVJSTEt6SWNTSHMyelZSdENYT0lrdGJHZzNNYzdCeC1tbk80cklud3U5S1YxeWhKeHlTbkNVQ1VmeWdRZzFRMkZtTEczV0FXNGluZHhUUFFkZlc3cGFnMjRDb3h4em9DbDFoQWdRWnU4NThfRUxLYWhvRmVNVjRlTEhoZ2RZU2EtbkZKX3FiUTlocVh4dlYxLWk3cEZIdDdfY01td213MERJdjZ0dmM1YmZBUk5lZ01ud0l4ZzFMMmdBNDcxLTRKTVhQOHNKNU05b0hXR3FaTUVweHY5VVBBaF9lMnBsSEV5RFg5dXRkWW1UUjk3SmVLMk1KdTV0ZmxvdmMwUXkwRGR1dHJud29sTHJoSUJGcmZRVGU2T0F3V3I3TC1JU09peUJUOE85bnNaQWZFamhNT2psNjRfQWFSMEhRM2RJWGtyYm9FUUVWUVl1dGRRaUVLMnIxaEFvWFk5UUR2WTJhN2llakhGVHpVRUpnakFyazAxSl8wOVF1bVBmMXZGSFZ6LVM2V1VOcmFGTW5UU3hmeTVoblhmMUU3c1NRV3NGdW1YZm9JY2lNQmVnTGZ5c2l1UzNwZENNWGxoaTloV2d5YklHSmE3UnltbGotSklNdzZ5U2Zka0pLRks2YnJ0QUZuTmk2SlZpVHpncUN5QUx1MnhPOU9yaDhKOG5hdkI3N09vY1A0aWdSVklkZ0ZjNUtzOU9VRnItWUdZRm9jekFiSkYyNHRvdDdVOUN0X0lyd1JHUHA0YmdJdFJ0RVJkRUgzU0NNNlR1Z05uYWt4c0VITGYwcW9SeVF2anV2Wi1Mbjg3Y3F0SVNtQXVMQV8xSEhfb0hEeGU5QlNGU0RDcFNObnRVOE9HNzdaVFNGOTZNYkcyOXdxd0VSSURhM01VQnBzbFhVOXd5OXdKSHhnMGxVWkd4NmpsellaM3Jva2o0V0t3czJqQXYwRWV5RWR3bUJIU2Q2aGc4VUZGSHB4dlctOXV6NVJEMVF0VGFBblo5bEd3X2ZrZzJFc01wWHZHQlhqUUl3YlRnU2U5ajhnTWxPLWRMYTZHdDhpUHBFRXdNREpQYmZob1NDYmZuQ2p1d3BlYXNqemNzR0tpZE1CRE5kNktNTnhQbmZrVkl0aFhvUkh0ZVdTRXZRbUdxYXJOaDdPNEZFWU1ESzhueW9hS1d3bnJBYV9hVEh5M3I3ejREVmFFTC1TS0JYdnR1b2hHRHdWalViVUd3Ylg3Vk1RZVRLTmR6bFJmQ2FERUlJaHFydVVkYW80d2paVXJnOXBLSEF1eTRRa0ZHZ0VNa196QjdEY2NDbGpPaXlMcUpFX2N4elVWTHFHQWYzT2F3ZmZlZldXSXM5ZVgyZHRPeHRkSElwZm9fakFGZWx2LTJfRm9FazhqOGdwRUpEWXM4ejZGSlhIVzlLVjlVazhDUVNXRTlWMDNwRGhsNVFmTFdLSTF3Ym5XcHZzQVpYblJPQ1NhanFVem90bDRkT25za3V5RTFLbTU3NVlnZmJ1NDVNd3pRRHdSNW1NN21SSkJyckJ4SDJDNTkwQWR5QkNpd2wwVDIyQUZzWHp3WWZaQ3c5STNMMEszRGtGbThOUVUxendmekMxTHVQU05KQVpJa0lTaEx1Y2k3aGJhakdnNF9SWDZxeURMQm12Um9Hc25IaXFoVzg1Yk51TUpQbVl2TEptNDJqaW1LbGpfR1V1cG9ucWFHZGctVTZ3Z09CTDRONHQ1VFlwNEY3cE1XZTdWeTh0U1hOTXM4UjdyeURjQU9EZEo2S0x0dmV0VTVvYkdOZk1ERC1ZVE1nT3RLNHlGaGVSa1R4dXZ4MmUyRlFsNjFtQmoxMm9zZ3lqMnB4Vm5yZ0k0dFBlWEVhMTA1SlEwMFg4QXNwVkNEY1JwYVF6ZnJaSHR5dXdWNmJoTXlSamtVWDYzNWdlbXpkMXVxeVRYc2V5WmlGSVFGQjJnOTczZXZmNEFNNVJRd1Y2cHIzdm9OdU5Bc1hjWjlqenlQSHlna2ZJOFhCLVVMTHZzQWlxNjVTLThORVdfOVBpWGxfTzF1SGFjTWVmMXJWeVpzeWZfaGw0MHBjbGRzY200YjFHMWVYaElBUjNKX3JpV3N5MXRJcGhITTVyQkFtMVk2YS1GTm9uOEVCWXEyUGJGNnlwbEl1TGFTMUY4Ml82S1VHcDVLN3E2WkFpM1lSSkdyUnhocFVNN2RLVXd5dFNpbFVPMnpwcHRITUNhcUo5VXVoRzI4NGJQUWRnWlZCNEZuOUZ2UnVodUQ4akt4QlNUYmttT1hLREVndERnRjhsRVBmb0llaGp1RURKM0QwNURwVHgwWkJTa1lGNW5qRHFVcG52cW1jRkZfUHhicmpSekhUbno4Q201MkhWZmlGQ1k4TkV5Y1JBaElBc3VsX1dueVlvS0FEVFVlcjFtTFNIYWpGaUkzbWVORFVZVW5Xd3FkRzFWYWFITVREWTVlMk5veGdsdUh6OE50N3RWem1LUERBVkJPaGVJMzBZblpxRzdGMDk3cnpxU05yZ1BvTnVTVHpndkhsT2lRUkctdU1iUWdEVnhkNjV5R202dmgzV0xNdFJmMGxfVzVCS0VLcm8zaHhnVjVkZEIyTEJTZWUtNWxzWk1ZZVJucnFlWlNKTWlKNGswMExFNTA1aVk3LU84VG0tcmh2RktULTlqalZIOWs4WEZaZVdtbTBkaGptb3JaanBNSE5TNnltRUYtVHJ2R2dTaDAyOWhHdU9raTNMQi1TMmNlOVdIaUFKS2YxTnZPVU1CRENCdDB4NmFyT0FQNEFaRWpDY0pudUhIaWt1YWNQemM2T1NOazZ2NmVyX0xlVGs0cnBGM09vRGF0eEtVWl9yUFVReTBoazdxQTJmZ3FVajFlRUQxYm9oOU9lU2VmZEVVeXE3S2NsSS0zZHg1YTlWMThLdjVScm81WE40TGNKYXpXSTM2ZnlkelczeUZ5bHNxYVJaQ29ydXJvMVY0MGZZc1pDelZQTFZuNXc2T3ZzRVpDc0l4VC1ZNWNvYmJ3cnpiRjNJU282ZmtrRjJYSjJHeW9zdjlybEdKUHU2ZF9GV0RnaXU3aFBpaFBhOVZVbzJqTjI2bU1ISmtzMzNFS2o0U2hzaXptTjU1RThzeVBSUzVsY0o3ajRnRHdCRVZyM191clNCaFg0UE4wY0JXb3FJY09DVGVRb3hrMFRuY1ctZ0dvdHg0bWJFWGRFcTJwNjBVdVBBZUJkbEUzQy1DWm4wempKV3J0UFJ2SGlwOWpxOXBMWG1mb1VkbDdIUnVheVRHYmxHY1NISG9BX2h6ZnMtU0tldWVaM1R3eElRa1BnTm51bTRMSTFlSFZheDZuTWNVOC1vZjJjWW95SHRVVHdLbDEwRkNSRnpXLWZWeGR3cERtT0l1cEtKeFFQb0l5N0o4dU5iaGlLMnp1cXVCTUwwbzdhNVhkS3RJd25oQ0RsaFFEdFF0dml0ZERmZEdEX1lMdUJtMEJobzBUZlBPQWRXellRRzZ5TG5lTWtkTWYzd2R4MC10SjVPbVNDN0lyU0pTMGE4N1luMFVMaFV2VnZSV3MtVVlleHRnSzVQdFhvcEZLaXdRbFhZV2ZsNndFQmIzZ3FWN2tLYUlveDlrRFZuWldCUVJvTHNjWWtBUWwteHNnaHJxdWItZnBBdlBpaWg3ZjJyUk5ydV9pVHJzemdMY05wWTFrMWRLaER3cU96WDdqVVM4bnNxWjA2NXhtZzZEaHNsZkVvU1U1QkNEOFZxck52N29oYm84NXo4dWZJcldBQWhUY3FycEFSLThRS2FhLWtrbllfRTMzWm1reXBLRl9kbjNuY21vWFpTeDkyUFRoaXhTZnE3N2FGUWlsYU5EREZnM0FxRm9mYU1NMTRvMzM5MDVjUE4tTF9BQTNhTEdzaUJmcE9reTdxWVhyZWI2cElBcVAtOTc3OWlYdnM5T2tueU5OTnVkQXhPcGhsc3JGNzZNV1VnZ0hfbjVheTVCVGVWaVBsdEFRX21lbEtpM3UxUkFVSDNXd2FkX29vd1ZzR0NjREh3REg4R0JndXhsWTFXZ3F3elBPVnJjdUIxbF9wQ0YyQWplWWVtT1hnN3lYenlmSHE1X0l0Vk9CNlBCTngwN3ZTWUxZYUt5VVdUTFl4NWRCem94Y0VONTRDUm9nZ1Yybm81MUw3MkNWYUtTdEJPUHlnTElXQlZiOVZhMHg3WkFsVkQzTTBOVnFJbnBoSVdxVUYzVVd5d2p2Q2Z1X1pFZmpxUlpYOUVyd0tLQ0J3NXFWdUtXUWMwaUxrazg5U3liM1FndWZ1WEQ5N01FOEFjV25mc1h0SWRkbnFkOTBsX2VFYlR3XzhsTTlycnZkOHB2OTJQRmJUcFlkVlFNOWx2azBWbmliaGo2NS1jSlpvSEs0UjBIb1hPTlhaWlpJQWViUEVDRVlvVUtIUFlNT09nWHppNWdETFZFVTdMdTZuRDlIMWE4Sjlab0xIWGdZZkQ4NXV4S0pRVkR5cFNIY2VrSlRacm40dHZTLVlRejd0MFREeHRpTENOTHVNb0RnbnJ4LW5DWmItRFNyNGt1NVhkTnFaVWFWdWVqaXVSUEU0TmFCV3owSlRNdEg5UUVhbTFkYzRYUDVMMVRCemtYdlBLMlV3dDEwc3ExWjlHdTlkMk1VOGpKcl91REtSRWU5YmlhRmtBSHZfTzk5V0RWVjJ1UUo1RlhLM25uOXhIbU9OcER4RlpXUWc1LUdSLWh0QlMxYTBlMnd4MFQwcTFOUXI2S3dNR3FGcDFOTkJ0cUc5UnNFTHJ4Uk1hMmUxVzlkMU9ydE5DdGlNQmRRdnJ3c0x5Y1BST25rcHRPTXk5YWlEakdPSDZPSW1BY2FQbUNaREFUMUh4V25MTndYTjQ3ejhVQTQ3QU1xX193LVU0eGh6a2NDbGpPSnVHOTVFeUZBOVhDM3hvVHF0Y0YyQ3lLVGdGT2RRLWxKSmJpMDZzSzZWNVhCUnIyUHpqcGtiZldsYjVhcHM0NjVnd1JKemhtVjVHTGo4Q1dLTlhZcHBGN0trdUlBZjMtaEE0aWh4TTVkZkNSUVF6aXB5STdWQjJIMDVBLTZiZW03Yl9hbTJIZjJnY2xEODJMWk41eGFNNHhscGVkODFIMmFZcjlhbDBTNFlxNHFnbEhqaEdVTklFWkswWXUxX2VOX3JadjhEMFo2aGdiRTZCNnAtZ0p4SktCcGhXc0tYYmtTZEhVU2ZuWDdPaWs0NW9LT2ZoZGdDQjUwRFprSE5JZXNuWUhMVm4xNTl5ZEVodmJiMlVRU0RWMzVuZUlvSF9WRVhWRlRpVGxaTEVlWHVWRzIzeXVyOE40cWFnbGpCTzY4NDhJQ0Y1N19rUUQ5VlV2eW5KVm9xU2hvb2tpeHo0OUxXaFQwbFBuMndQWEhLZkpkc3NxT0M2ZXpHaGQxMXlfNHBTUkhfUTUzUFZFZFpUUDk2aV9xbk54OFFTUHpyRGh5WUVVWEM4TjdFQ0RZNDR0c2lqU25PSDZoV0FaYTJUVW5qOGo3UG5nN19iaEtoZjJIV2ZUOW9jYzVsekZqLTV4N1ktdHh6bl91YkpWZ0RkSzBwcFFZRlQ1SVVPQVBiRzdGTDc0MnJtd1ljVHlma2U1ZTVpUjdEQkpZeVpEMHJJTEVnME1qZm42OU9wT1EzZ0VnV1p6ZWdMUUUtaElENDlPS2lYc1hEWkoyZGhRQm5nNVJGSWR0cFZaNXk0SGFmT0FOYzJFUVJtb2dRZWdvS0RZTDdWNnk1WGcwYzZVNTlxd1RKTzNwdjVYdDE4Nkg5TVdvbmRZWGVwR0hwLVJZU0NjdGtzaFBiSHdnZ1NOeG5ZVHU4b3dQeWdHUDBvSzJfMUNBcmRfczZXX0E0QWUwMjJIQThNSVg4eFlOSjZrUl9qQ0lSTWVKNzFQM0tTaURsV2FRdThjOXFwZVpoZ0J6WXpKZ1pDYnZiNEhvYjAtZXJzZ1JueklJRWdaZ0F5dnVLT3lWN2RfNmF0VC1HNGNyNlFYMThPb3FIeTgzSGg4elpDcUItZWJsbWRPQm5vdFZJS2F0dWVlOWpMX3k0U2t5cWhycVFpWGY2akhlQ0hSenFzZjgyRkc1S1dMWmx5MjVXRDdIZ2xlWWh1WUZ2c0dzS3QxaUctVVFPOTY2V2c2TTZoYjNpaEcybm1JN21WWDNTTTdnZ2FZYWtUYXh6TzE2cWgtSGlDU3BuVGFHekRRVWZreGNIR3Noa2tEbTNoVHFqVmRtMWVGZVdZWi1qY3RNVDRDLXAwNnFuLTRrUW5hdHFvdUYtaE0zbkpXTWVDQmpTWWlTeWdZZ3pjWkUyRnpUSnpSRk0zVmJsYkJqbnlHVUVhWmxjdVJLV2s1LS1YWEd6V2dBR196cWwxSXllekNmS3c0ai01TjZveHRGYlowM0pnS3pzMlladHZPQ1c5YXMwQlBBV1oyY3RqVlBVUmNGUVZmaW9kRkJTRnJCRTBUVF9MOW83LUhkS3dPb1VyR1Bsd2ZEWmpXTFFQLUVqYjlTRTlZa2dRTUc4X053YWJyMjZkVE9QRlp0bmNHLXhLU0hEMkZSQ2x4SUJWdUs2RkJUd2tEdHBDZnlIZmdYbkEyWWpvT3pSMG0zU2Y0cWJkdU40cUd4YjJHakNTbWdHd0ZqUWZ1bW82c2tjQndjRUhhNUNSZVZQMmpxM1YyYVkxY0dHM0R4RjE2a1EwQ1VCeUdWRkgwSHF2NF9fRjBkMmJoNUJ6OWpqeDA1SmFQUnRVMXNlSGlIdlBybFRhWnJETWd2UE5zZDBocm5uR3pOdERmYU5KdnNQbDhTVUxxNlVBQkVnZEVobkhjeUk2dzlYRzZZUF9GMXJ3LVVZVXJzTXhfMXFkWmZ2UW9MSlNkN3ZJeVVYWUkxU2pHZGw1RWlxLVRyTkw3ZTZUY1g5Q3JfWjliMTN3VmRINHFpd0psWkFKamI3alhmWnNRanctUWRldmhGRVQtNlA5MHJKTFluZmNIU3dnYmRVcjdIV3p2WndRYlBzanRjdzMtek50TTAxckxpbXVEakxvdGxIWHZ0cTBrZ3UyYmNWM2RHQUlYMTd6ZjhGOGV3bVF2amxyWVV3RzZtWFM4TExzQW8xY1ppVlFRMTU0ZFl3M3p2enpQQ2pJa3dLN2xvbG1Cd21YNUo0X2pIby1oYzhCckJHLS1FS2ZfQWN0emJmUVJNN2JUMnJEbVdLa2NxZVVCZDBqVlBPeGZ2VzE4emlMOUprRm1wUzJZZjQ2SkJGVEtPQkNxQ0tlamEtQ2lxOWlsX3BCMXVybnV4b2xLeDY5YW5jOUJXeDBSdUp6ZnF3R2FTa1Zua0VHakF2MzNYQVVNMUxteERFVGJWbHVJT1ZCTEloN2dITzMyWUl1UHlScG9kV2M0U2ZveGZPNVZDejNHbHJUZElRaG91YjNfZG9nN0ItaE9RWFpsYlNjNXdUYjlWYXRGalZ6dUFDOVB5OUM2Tmc0eFRfenZ4MllGY0ZBS0g3am5CVUJUNlN6RC0zdV95SnAxbXFvcEhaRVA4QURKa3ktQU4tMUtYd0FZeVlFakZpaE9hYTc5d3pGbWN1d2t3aDdBRmFlUDk5ZThhWkZEa2xOd0FKN0tMeUFFTlJDRlNLT2Vvb1JQMGhrekhOVTRiZFdFQWxySUlxdHFPXy1TUlBoc2YxRTNpUFlURXJMQUJRMlcxdEVvSUE2RG11N0dTdjJFTG5RQ1BuOGNxZEZZSXlnbDl3N0M0b2hSc3BWdDlMUW1KTmwzei0tc2dyMHFpNng4dmV1blpMd0Rtcm0teDh6TzZYc2dhdXQybHh1a3g4RmUzVFlvLjBXUl9xc09VanBBcktqMkZhSmQ3dHZGWXQ3aXItZ1g2RXdQSmZwT1F0d1U"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '53943189-ccb5-4d8f-80a3-a0641bf45ee1',
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
  'Tue, 16 Feb 2021 18:21:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRXFFZndwM05fNTRkM09SVmhaZmtVMlNfMDlHZklvMmlHNHVfVFF2ZzBzZXQtUEExUEdpUUR2T09lNTk4LXFFZUxJWXRXeDVUcjZWQjJxOUdzTHRtbElBM1hhQXdNNXZJVmpSOUEtemYyUERWc2VRb3pWUGVweUxfLVVWLUdYZ21vSnFxVDFfN0ZuZXFFWXg0ZjZweXhCaWdBRTFhSG9qLWxhRWZJM2x2d0dWREJrbXNKQ1ZQNHJ1V0VCQ2R2Ump2UG1sTzdwZGt5ZXdPRE55Qk5rdmlxckl4UFBQZ0x4N2p2X1dVUmJnVDF2MERRQlJUQUpHRWFGTjdjZlZTd05QWGtwa3dIYXlCMHk3X0hTVzhCSTc4Q1JvWno0Z2JUUk5mRUwtWEUzeDZxYTUzRHpPMDB1MENTbnBJSUN3OVZwZU1SUVpIVkF6eGs1aUROSzJZNVlZQkRRLlNvd3ByemNocThkYnhLMXFreFFrZFEuMWxyQW9ZcUdPejBJVmZEeVJ2Y3Y1VWc5bHZWbDdRUHZXTHlNWkViS19wY1UzeGdjMjNoMDFJdm9uWFlCTTRzNExhTkNlNGdQYmQzWG5TQzl1dWpUVDQzR1hXYU9OQ0JTQmRidVZYR0VnejN2aTN6N3ZIU21mSElMbmI5QmVCT3JfSGxMejVFMTB4dHZ2YXdZMlkzQk43b1h4NllTVGRJR2lKY2xYdWdDcHg1WEt4LUtab1FRNHo3Z1Y4SEpUYTN1aVpoSUxPclE0V0Y2X0hNQUVXSWtMQnRyS0dXYWkwMmlFNkpubFB0SkpWOXdRdElpcVg1Z2NVRUFNdEo4YUc0NXl3MDVZYmNBdXZSam1tNThNQ0ZXVWRDY1F5SXM3SjRZNFRNQnJlZS1aUEJ0cWNOczQ0bUFyYzVlckdTcGJ2Q051bWtJWGtmYlJCeDBCRVo2c0VhVEhDOTFaTjdDa0dzdVVPTkQwQ2xmRjFDd01rZjVZTG5vSVZjMXRPck1QajV1YWQwTnBaRFFjZmZxRWJReWROUUpXSzh1VlJIb2dyZ29sZlZfeGJBYTZ0ZEE0b2dUVWRFZmVYT0IweFVFdkJaTVNIaXBOWkhhVWE0WnJ1RU1MTldielRmMHI4WHpqbURfQTZTQ290cEZLMlNXeFRIRG9sRkNJNVF3Z19SVmlrU0FBMTZvNjRJRjZYaUFvVWpKZ1FQQzJFbGljeS1KVUJ2WWJRX25rdGpfV3BSMmFNYU8ydnhpT0o3T1FLaV9qdHFkdTI1SVFXbzlmYW8zTzF3WHByMGRQdXpHNEdUdEZEbDJhajhLZEw2TV9EMjd5X3VRQUFZdUZ5Z0t1ckpYUGlaY0Y4dlQ2Z1FHbXd6b2Nta3AxbnRVanExdk1YUDR3LS0yZTRtYWRET01jekZQbm42Ui1CbFZqYzZYZEN4SlBPa1laTzJUUUVjQTZSQ3ViYzJCbEYzZHBUV1p5MjFtR3VwZ05LdElOdldsMjZDSm8zRnIyUmh3bzBJd0xhSUMxOC10cld6dVhOT0Y5UzBEdEdrandTcGs1ZzJnMDlWbWc2bWJYcGV0WGRBYVJhRjAwNUFiQWx4S0tYWnNVd29ZNnBHdGt6NjRnbkk1UHdWc2F4cUl1SzhqMmhmckxFa25Nak9VSEtlVVZabjNubDN3a0hsYUdCN0NxN2VBY3pBMzBCNUUzSWt4NFM4N3pOXy1raHk3OEEzMGUyWFVmdlo2MV9jQkhfdUVXM0p1YWdVUTlVVTQ2SU41YjBuTjZfUEZPLW9TNW5LbkJucm03bC0wQ1BmdFdma0JlclZtSUZiTE84Uld5bVNFX1ZNNFJFa1NwSHlDR0pZMnhzbWZIUEtFMFBUSEdXZHJVVm9XaGE5RGhLeDlFejRBX0I5ekxaaVpmbEpOdGNEdFctZnFxc1BqN3daMVNWV1dvME42VG5PbllOaGhxS2JsUFFpNEpZMUdaUEVsd1VhaU9mTXBDUndHWU1MSnVfd1d3T2hEazhYV1ZVMzdRT21CbnNOenU4ZWF6WHd0Q2xnaldFeDhfQXNDdElXTVVTeWZ3LXhMYUNvTHNKa0xLektia1o1bkJJaEl6blFOUHdKNHNEZVI3RjNTbE1PZkxPZ0o4QlpmZmtmcmVzYzc4ZG42a1ZoeHdqbmpaODlxRDZUMEZJRDlnOGxvTExPbDlmRUxsajN4V3Y4dzRWOE5zcG5BN0RwdWpIN2RZT3o5M1ZsUERZdGZFUEMySmxlNmp0elc4ZHlkSzJrenVEY2p4Q3JpTnhnQlFWeHY2Y3dUQzJIUjVnRGlGT1Z4dlREUWd0VXRoajR6dHBpS1BuOE5JN1V0RENITzdkQWxLZDB6UWxLMXZaZG5nUGk3MXpqemVRNVhCMXBNaDJqaHNfbVJSTEt6SWNTSHMyelZSdENYT0lrdGJHZzNNYzdCeC1tbk80cklud3U5S1YxeWhKeHlTbkNVQ1VmeWdRZzFRMkZtTEczV0FXNGluZHhUUFFkZlc3cGFnMjRDb3h4em9DbDFoQWdRWnU4NThfRUxLYWhvRmVNVjRlTEhoZ2RZU2EtbkZKX3FiUTlocVh4dlYxLWk3cEZIdDdfY01td213MERJdjZ0dmM1YmZBUk5lZ01ud0l4ZzFMMmdBNDcxLTRKTVhQOHNKNU05b0hXR3FaTUVweHY5VVBBaF9lMnBsSEV5RFg5dXRkWW1UUjk3SmVLMk1KdTV0ZmxvdmMwUXkwRGR1dHJud29sTHJoSUJGcmZRVGU2T0F3V3I3TC1JU09peUJUOE85bnNaQWZFamhNT2psNjRfQWFSMEhRM2RJWGtyYm9FUUVWUVl1dGRRaUVLMnIxaEFvWFk5UUR2WTJhN2llakhGVHpVRUpnakFyazAxSl8wOVF1bVBmMXZGSFZ6LVM2V1VOcmFGTW5UU3hmeTVoblhmMUU3c1NRV3NGdW1YZm9JY2lNQmVnTGZ5c2l1UzNwZENNWGxoaTloV2d5YklHSmE3UnltbGotSklNdzZ5U2Zka0pLRks2YnJ0QUZuTmk2SlZpVHpncUN5QUx1MnhPOU9yaDhKOG5hdkI3N09vY1A0aWdSVklkZ0ZjNUtzOU9VRnItWUdZRm9jekFiSkYyNHRvdDdVOUN0X0lyd1JHUHA0YmdJdFJ0RVJkRUgzU0NNNlR1Z05uYWt4c0VITGYwcW9SeVF2anV2Wi1Mbjg3Y3F0SVNtQXVMQV8xSEhfb0hEeGU5QlNGU0RDcFNObnRVOE9HNzdaVFNGOTZNYkcyOXdxd0VSSURhM01VQnBzbFhVOXd5OXdKSHhnMGxVWkd4NmpsellaM3Jva2o0V0t3czJqQXYwRWV5RWR3bUJIU2Q2aGc4VUZGSHB4dlctOXV6NVJEMVF0VGFBblo5bEd3X2ZrZzJFc01wWHZHQlhqUUl3YlRnU2U5ajhnTWxPLWRMYTZHdDhpUHBFRXdNREpQYmZob1NDYmZuQ2p1d3BlYXNqemNzR0tpZE1CRE5kNktNTnhQbmZrVkl0aFhvUkh0ZVdTRXZRbUdxYXJOaDdPNEZFWU1ESzhueW9hS1d3bnJBYV9hVEh5M3I3ejREVmFFTC1TS0JYdnR1b2hHRHdWalViVUd3Ylg3Vk1RZVRLTmR6bFJmQ2FERUlJaHFydVVkYW80d2paVXJnOXBLSEF1eTRRa0ZHZ0VNa196QjdEY2NDbGpPaXlMcUpFX2N4elVWTHFHQWYzT2F3ZmZlZldXSXM5ZVgyZHRPeHRkSElwZm9fakFGZWx2LTJfRm9FazhqOGdwRUpEWXM4ejZGSlhIVzlLVjlVazhDUVNXRTlWMDNwRGhsNVFmTFdLSTF3Ym5XcHZzQVpYblJPQ1NhanFVem90bDRkT25za3V5RTFLbTU3NVlnZmJ1NDVNd3pRRHdSNW1NN21SSkJyckJ4SDJDNTkwQWR5QkNpd2wwVDIyQUZzWHp3WWZaQ3c5STNMMEszRGtGbThOUVUxendmekMxTHVQU05KQVpJa0lTaEx1Y2k3aGJhakdnNF9SWDZxeURMQm12Um9Hc25IaXFoVzg1Yk51TUpQbVl2TEptNDJqaW1LbGpfR1V1cG9ucWFHZGctVTZ3Z09CTDRONHQ1VFlwNEY3cE1XZTdWeTh0U1hOTXM4UjdyeURjQU9EZEo2S0x0dmV0VTVvYkdOZk1ERC1ZVE1nT3RLNHlGaGVSa1R4dXZ4MmUyRlFsNjFtQmoxMm9zZ3lqMnB4Vm5yZ0k0dFBlWEVhMTA1SlEwMFg4QXNwVkNEY1JwYVF6ZnJaSHR5dXdWNmJoTXlSamtVWDYzNWdlbXpkMXVxeVRYc2V5WmlGSVFGQjJnOTczZXZmNEFNNVJRd1Y2cHIzdm9OdU5Bc1hjWjlqenlQSHlna2ZJOFhCLVVMTHZzQWlxNjVTLThORVdfOVBpWGxfTzF1SGFjTWVmMXJWeVpzeWZfaGw0MHBjbGRzY200YjFHMWVYaElBUjNKX3JpV3N5MXRJcGhITTVyQkFtMVk2YS1GTm9uOEVCWXEyUGJGNnlwbEl1TGFTMUY4Ml82S1VHcDVLN3E2WkFpM1lSSkdyUnhocFVNN2RLVXd5dFNpbFVPMnpwcHRITUNhcUo5VXVoRzI4NGJQUWRnWlZCNEZuOUZ2UnVodUQ4akt4QlNUYmttT1hLREVndERnRjhsRVBmb0llaGp1RURKM0QwNURwVHgwWkJTa1lGNW5qRHFVcG52cW1jRkZfUHhicmpSekhUbno4Q201MkhWZmlGQ1k4TkV5Y1JBaElBc3VsX1dueVlvS0FEVFVlcjFtTFNIYWpGaUkzbWVORFVZVW5Xd3FkRzFWYWFITVREWTVlMk5veGdsdUh6OE50N3RWem1LUERBVkJPaGVJMzBZblpxRzdGMDk3cnpxU05yZ1BvTnVTVHpndkhsT2lRUkctdU1iUWdEVnhkNjV5R202dmgzV0xNdFJmMGxfVzVCS0VLcm8zaHhnVjVkZEIyTEJTZWUtNWxzWk1ZZVJucnFlWlNKTWlKNGswMExFNTA1aVk3LU84VG0tcmh2RktULTlqalZIOWs4WEZaZVdtbTBkaGptb3JaanBNSE5TNnltRUYtVHJ2R2dTaDAyOWhHdU9raTNMQi1TMmNlOVdIaUFKS2YxTnZPVU1CRENCdDB4NmFyT0FQNEFaRWpDY0pudUhIaWt1YWNQemM2T1NOazZ2NmVyX0xlVGs0cnBGM09vRGF0eEtVWl9yUFVReTBoazdxQTJmZ3FVajFlRUQxYm9oOU9lU2VmZEVVeXE3S2NsSS0zZHg1YTlWMThLdjVScm81WE40TGNKYXpXSTM2ZnlkelczeUZ5bHNxYVJaQ29ydXJvMVY0MGZZc1pDelZQTFZuNXc2T3ZzRVpDc0l4VC1ZNWNvYmJ3cnpiRjNJU282ZmtrRjJYSjJHeW9zdjlybEdKUHU2ZF9GV0RnaXU3aFBpaFBhOVZVbzJqTjI2bU1ISmtzMzNFS2o0U2hzaXptTjU1RThzeVBSUzVsY0o3ajRnRHdCRVZyM191clNCaFg0UE4wY0JXb3FJY09DVGVRb3hrMFRuY1ctZ0dvdHg0bWJFWGRFcTJwNjBVdVBBZUJkbEUzQy1DWm4wempKV3J0UFJ2SGlwOWpxOXBMWG1mb1VkbDdIUnVheVRHYmxHY1NISG9BX2h6ZnMtU0tldWVaM1R3eElRa1BnTm51bTRMSTFlSFZheDZuTWNVOC1vZjJjWW95SHRVVHdLbDEwRkNSRnpXLWZWeGR3cERtT0l1cEtKeFFQb0l5N0o4dU5iaGlLMnp1cXVCTUwwbzdhNVhkS3RJd25oQ0RsaFFEdFF0dml0ZERmZEdEX1lMdUJtMEJobzBUZlBPQWRXellRRzZ5TG5lTWtkTWYzd2R4MC10SjVPbVNDN0lyU0pTMGE4N1luMFVMaFV2VnZSV3MtVVlleHRnSzVQdFhvcEZLaXdRbFhZV2ZsNndFQmIzZ3FWN2tLYUlveDlrRFZuWldCUVJvTHNjWWtBUWwteHNnaHJxdWItZnBBdlBpaWg3ZjJyUk5ydV9pVHJzemdMY05wWTFrMWRLaER3cU96WDdqVVM4bnNxWjA2NXhtZzZEaHNsZkVvU1U1QkNEOFZxck52N29oYm84NXo4dWZJcldBQWhUY3FycEFSLThRS2FhLWtrbllfRTMzWm1reXBLRl9kbjNuY21vWFpTeDkyUFRoaXhTZnE3N2FGUWlsYU5EREZnM0FxRm9mYU1NMTRvMzM5MDVjUE4tTF9BQTNhTEdzaUJmcE9reTdxWVhyZWI2cElBcVAtOTc3OWlYdnM5T2tueU5OTnVkQXhPcGhsc3JGNzZNV1VnZ0hfbjVheTVCVGVWaVBsdEFRX21lbEtpM3UxUkFVSDNXd2FkX29vd1ZzR0NjREh3REg4R0JndXhsWTFXZ3F3elBPVnJjdUIxbF9wQ0YyQWplWWVtT1hnN3lYenlmSHE1X0l0Vk9CNlBCTngwN3ZTWUxZYUt5VVdUTFl4NWRCem94Y0VONTRDUm9nZ1Yybm81MUw3MkNWYUtTdEJPUHlnTElXQlZiOVZhMHg3WkFsVkQzTTBOVnFJbnBoSVdxVUYzVVd5d2p2Q2Z1X1pFZmpxUlpYOUVyd0tLQ0J3NXFWdUtXUWMwaUxrazg5U3liM1FndWZ1WEQ5N01FOEFjV25mc1h0SWRkbnFkOTBsX2VFYlR3XzhsTTlycnZkOHB2OTJQRmJUcFlkVlFNOWx2azBWbmliaGo2NS1jSlpvSEs0UjBIb1hPTlhaWlpJQWViUEVDRVlvVUtIUFlNT09nWHppNWdETFZFVTdMdTZuRDlIMWE4Sjlab0xIWGdZZkQ4NXV4S0pRVkR5cFNIY2VrSlRacm40dHZTLVlRejd0MFREeHRpTENOTHVNb0RnbnJ4LW5DWmItRFNyNGt1NVhkTnFaVWFWdWVqaXVSUEU0TmFCV3owSlRNdEg5UUVhbTFkYzRYUDVMMVRCemtYdlBLMlV3dDEwc3ExWjlHdTlkMk1VOGpKcl91REtSRWU5YmlhRmtBSHZfTzk5V0RWVjJ1UUo1RlhLM25uOXhIbU9OcER4RlpXUWc1LUdSLWh0QlMxYTBlMnd4MFQwcTFOUXI2S3dNR3FGcDFOTkJ0cUc5UnNFTHJ4Uk1hMmUxVzlkMU9ydE5DdGlNQmRRdnJ3c0x5Y1BST25rcHRPTXk5YWlEakdPSDZPSW1BY2FQbUNaREFUMUh4V25MTndYTjQ3ejhVQTQ3QU1xX193LVU0eGh6a2NDbGpPSnVHOTVFeUZBOVhDM3hvVHF0Y0YyQ3lLVGdGT2RRLWxKSmJpMDZzSzZWNVhCUnIyUHpqcGtiZldsYjVhcHM0NjVnd1JKemhtVjVHTGo4Q1dLTlhZcHBGN0trdUlBZjMtaEE0aWh4TTVkZkNSUVF6aXB5STdWQjJIMDVBLTZiZW03Yl9hbTJIZjJnY2xEODJMWk41eGFNNHhscGVkODFIMmFZcjlhbDBTNFlxNHFnbEhqaEdVTklFWkswWXUxX2VOX3JadjhEMFo2aGdiRTZCNnAtZ0p4SktCcGhXc0tYYmtTZEhVU2ZuWDdPaWs0NW9LT2ZoZGdDQjUwRFprSE5JZXNuWUhMVm4xNTl5ZEVodmJiMlVRU0RWMzVuZUlvSF9WRVhWRlRpVGxaTEVlWHVWRzIzeXVyOE40cWFnbGpCTzY4NDhJQ0Y1N19rUUQ5VlV2eW5KVm9xU2hvb2tpeHo0OUxXaFQwbFBuMndQWEhLZkpkc3NxT0M2ZXpHaGQxMXlfNHBTUkhfUTUzUFZFZFpUUDk2aV9xbk54OFFTUHpyRGh5WUVVWEM4TjdFQ0RZNDR0c2lqU25PSDZoV0FaYTJUVW5qOGo3UG5nN19iaEtoZjJIV2ZUOW9jYzVsekZqLTV4N1ktdHh6bl91YkpWZ0RkSzBwcFFZRlQ1SVVPQVBiRzdGTDc0MnJtd1ljVHlma2U1ZTVpUjdEQkpZeVpEMHJJTEVnME1qZm42OU9wT1EzZ0VnV1p6ZWdMUUUtaElENDlPS2lYc1hEWkoyZGhRQm5nNVJGSWR0cFZaNXk0SGFmT0FOYzJFUVJtb2dRZWdvS0RZTDdWNnk1WGcwYzZVNTlxd1RKTzNwdjVYdDE4Nkg5TVdvbmRZWGVwR0hwLVJZU0NjdGtzaFBiSHdnZ1NOeG5ZVHU4b3dQeWdHUDBvSzJfMUNBcmRfczZXX0E0QWUwMjJIQThNSVg4eFlOSjZrUl9qQ0lSTWVKNzFQM0tTaURsV2FRdThjOXFwZVpoZ0J6WXpKZ1pDYnZiNEhvYjAtZXJzZ1JueklJRWdaZ0F5dnVLT3lWN2RfNmF0VC1HNGNyNlFYMThPb3FIeTgzSGg4elpDcUItZWJsbWRPQm5vdFZJS2F0dWVlOWpMX3k0U2t5cWhycVFpWGY2akhlQ0hSenFzZjgyRkc1S1dMWmx5MjVXRDdIZ2xlWWh1WUZ2c0dzS3QxaUctVVFPOTY2V2c2TTZoYjNpaEcybm1JN21WWDNTTTdnZ2FZYWtUYXh6TzE2cWgtSGlDU3BuVGFHekRRVWZreGNIR3Noa2tEbTNoVHFqVmRtMWVGZVdZWi1qY3RNVDRDLXAwNnFuLTRrUW5hdHFvdUYtaE0zbkpXTWVDQmpTWWlTeWdZZ3pjWkUyRnpUSnpSRk0zVmJsYkJqbnlHVUVhWmxjdVJLV2s1LS1YWEd6V2dBR196cWwxSXllekNmS3c0ai01TjZveHRGYlowM0pnS3pzMlladHZPQ1c5YXMwQlBBV1oyY3RqVlBVUmNGUVZmaW9kRkJTRnJCRTBUVF9MOW83LUhkS3dPb1VyR1Bsd2ZEWmpXTFFQLUVqYjlTRTlZa2dRTUc4X053YWJyMjZkVE9QRlp0bmNHLXhLU0hEMkZSQ2x4SUJWdUs2RkJUd2tEdHBDZnlIZmdYbkEyWWpvT3pSMG0zU2Y0cWJkdU40cUd4YjJHakNTbWdHd0ZqUWZ1bW82c2tjQndjRUhhNUNSZVZQMmpxM1YyYVkxY0dHM0R4RjE2a1EwQ1VCeUdWRkgwSHF2NF9fRjBkMmJoNUJ6OWpqeDA1SmFQUnRVMXNlSGlIdlBybFRhWnJETWd2UE5zZDBocm5uR3pOdERmYU5KdnNQbDhTVUxxNlVBQkVnZEVobkhjeUk2dzlYRzZZUF9GMXJ3LVVZVXJzTXhfMXFkWmZ2UW9MSlNkN3ZJeVVYWUkxU2pHZGw1RWlxLVRyTkw3ZTZUY1g5Q3JfWjliMTN3VmRINHFpd0psWkFKamI3alhmWnNRanctUWRldmhGRVQtNlA5MHJKTFluZmNIU3dnYmRVcjdIV3p2WndRYlBzanRjdzMtek50TTAxckxpbXVEakxvdGxIWHZ0cTBrZ3UyYmNWM2RHQUlYMTd6ZjhGOGV3bVF2amxyWVV3RzZtWFM4TExzQW8xY1ppVlFRMTU0ZFl3M3p2enpQQ2pJa3dLN2xvbG1Cd21YNUo0X2pIby1oYzhCckJHLS1FS2ZfQWN0emJmUVJNN2JUMnJEbVdLa2NxZVVCZDBqVlBPeGZ2VzE4emlMOUprRm1wUzJZZjQ2SkJGVEtPQkNxQ0tlamEtQ2lxOWlsX3BCMXVybnV4b2xLeDY5YW5jOUJXeDBSdUp6ZnF3R2FTa1Zua0VHakF2MzNYQVVNMUxteERFVGJWbHVJT1ZCTEloN2dITzMyWUl1UHlScG9kV2M0U2ZveGZPNVZDejNHbHJUZElRaG91YjNfZG9nN0ItaE9RWFpsYlNjNXdUYjlWYXRGalZ6dUFDOVB5OUM2Tmc0eFRfenZ4MllGY0ZBS0g3am5CVUJUNlN6RC0zdV95SnAxbXFvcEhaRVA4QURKa3ktQU4tMUtYd0FZeVlFakZpaE9hYTc5d3pGbWN1d2t3aDdBRmFlUDk5ZThhWkZEa2xOd0FKN0tMeUFFTlJDRlNLT2Vvb1JQMGhrekhOVTRiZFdFQWxySUlxdHFPXy1TUlBoc2YxRTNpUFlURXJMQUJRMlcxdEVvSUE2RG11N0dTdjJFTG5RQ1BuOGNxZEZZSXlnbDl3N0M0b2hSc3BWdDlMUW1KTmwzei0tc2dyMHFpNng4dmV1blpMd0Rtcm0teDh6TzZYc2dhdXQybHh1a3g4RmUzVFlvLjBXUl9xc09VanBBcktqMkZhSmQ3dHZGWXQ3aXItZ1g2RXdQSmZwT1F0d1U"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7b65f53a-cd33-4c92-9bbf-2b8a0eb563f3',
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
  'Tue, 16 Feb 2021 18:21:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRXFFZndwM05fNTRkM09SVmhaZmtVMlNfMDlHZklvMmlHNHVfVFF2ZzBzZXQtUEExUEdpUUR2T09lNTk4LXFFZUxJWXRXeDVUcjZWQjJxOUdzTHRtbElBM1hhQXdNNXZJVmpSOUEtemYyUERWc2VRb3pWUGVweUxfLVVWLUdYZ21vSnFxVDFfN0ZuZXFFWXg0ZjZweXhCaWdBRTFhSG9qLWxhRWZJM2x2d0dWREJrbXNKQ1ZQNHJ1V0VCQ2R2Ump2UG1sTzdwZGt5ZXdPRE55Qk5rdmlxckl4UFBQZ0x4N2p2X1dVUmJnVDF2MERRQlJUQUpHRWFGTjdjZlZTd05QWGtwa3dIYXlCMHk3X0hTVzhCSTc4Q1JvWno0Z2JUUk5mRUwtWEUzeDZxYTUzRHpPMDB1MENTbnBJSUN3OVZwZU1SUVpIVkF6eGs1aUROSzJZNVlZQkRRLlNvd3ByemNocThkYnhLMXFreFFrZFEuMWxyQW9ZcUdPejBJVmZEeVJ2Y3Y1VWc5bHZWbDdRUHZXTHlNWkViS19wY1UzeGdjMjNoMDFJdm9uWFlCTTRzNExhTkNlNGdQYmQzWG5TQzl1dWpUVDQzR1hXYU9OQ0JTQmRidVZYR0VnejN2aTN6N3ZIU21mSElMbmI5QmVCT3JfSGxMejVFMTB4dHZ2YXdZMlkzQk43b1h4NllTVGRJR2lKY2xYdWdDcHg1WEt4LUtab1FRNHo3Z1Y4SEpUYTN1aVpoSUxPclE0V0Y2X0hNQUVXSWtMQnRyS0dXYWkwMmlFNkpubFB0SkpWOXdRdElpcVg1Z2NVRUFNdEo4YUc0NXl3MDVZYmNBdXZSam1tNThNQ0ZXVWRDY1F5SXM3SjRZNFRNQnJlZS1aUEJ0cWNOczQ0bUFyYzVlckdTcGJ2Q051bWtJWGtmYlJCeDBCRVo2c0VhVEhDOTFaTjdDa0dzdVVPTkQwQ2xmRjFDd01rZjVZTG5vSVZjMXRPck1QajV1YWQwTnBaRFFjZmZxRWJReWROUUpXSzh1VlJIb2dyZ29sZlZfeGJBYTZ0ZEE0b2dUVWRFZmVYT0IweFVFdkJaTVNIaXBOWkhhVWE0WnJ1RU1MTldielRmMHI4WHpqbURfQTZTQ290cEZLMlNXeFRIRG9sRkNJNVF3Z19SVmlrU0FBMTZvNjRJRjZYaUFvVWpKZ1FQQzJFbGljeS1KVUJ2WWJRX25rdGpfV3BSMmFNYU8ydnhpT0o3T1FLaV9qdHFkdTI1SVFXbzlmYW8zTzF3WHByMGRQdXpHNEdUdEZEbDJhajhLZEw2TV9EMjd5X3VRQUFZdUZ5Z0t1ckpYUGlaY0Y4dlQ2Z1FHbXd6b2Nta3AxbnRVanExdk1YUDR3LS0yZTRtYWRET01jekZQbm42Ui1CbFZqYzZYZEN4SlBPa1laTzJUUUVjQTZSQ3ViYzJCbEYzZHBUV1p5MjFtR3VwZ05LdElOdldsMjZDSm8zRnIyUmh3bzBJd0xhSUMxOC10cld6dVhOT0Y5UzBEdEdrandTcGs1ZzJnMDlWbWc2bWJYcGV0WGRBYVJhRjAwNUFiQWx4S0tYWnNVd29ZNnBHdGt6NjRnbkk1UHdWc2F4cUl1SzhqMmhmckxFa25Nak9VSEtlVVZabjNubDN3a0hsYUdCN0NxN2VBY3pBMzBCNUUzSWt4NFM4N3pOXy1raHk3OEEzMGUyWFVmdlo2MV9jQkhfdUVXM0p1YWdVUTlVVTQ2SU41YjBuTjZfUEZPLW9TNW5LbkJucm03bC0wQ1BmdFdma0JlclZtSUZiTE84Uld5bVNFX1ZNNFJFa1NwSHlDR0pZMnhzbWZIUEtFMFBUSEdXZHJVVm9XaGE5RGhLeDlFejRBX0I5ekxaaVpmbEpOdGNEdFctZnFxc1BqN3daMVNWV1dvME42VG5PbllOaGhxS2JsUFFpNEpZMUdaUEVsd1VhaU9mTXBDUndHWU1MSnVfd1d3T2hEazhYV1ZVMzdRT21CbnNOenU4ZWF6WHd0Q2xnaldFeDhfQXNDdElXTVVTeWZ3LXhMYUNvTHNKa0xLektia1o1bkJJaEl6blFOUHdKNHNEZVI3RjNTbE1PZkxPZ0o4QlpmZmtmcmVzYzc4ZG42a1ZoeHdqbmpaODlxRDZUMEZJRDlnOGxvTExPbDlmRUxsajN4V3Y4dzRWOE5zcG5BN0RwdWpIN2RZT3o5M1ZsUERZdGZFUEMySmxlNmp0elc4ZHlkSzJrenVEY2p4Q3JpTnhnQlFWeHY2Y3dUQzJIUjVnRGlGT1Z4dlREUWd0VXRoajR6dHBpS1BuOE5JN1V0RENITzdkQWxLZDB6UWxLMXZaZG5nUGk3MXpqemVRNVhCMXBNaDJqaHNfbVJSTEt6SWNTSHMyelZSdENYT0lrdGJHZzNNYzdCeC1tbk80cklud3U5S1YxeWhKeHlTbkNVQ1VmeWdRZzFRMkZtTEczV0FXNGluZHhUUFFkZlc3cGFnMjRDb3h4em9DbDFoQWdRWnU4NThfRUxLYWhvRmVNVjRlTEhoZ2RZU2EtbkZKX3FiUTlocVh4dlYxLWk3cEZIdDdfY01td213MERJdjZ0dmM1YmZBUk5lZ01ud0l4ZzFMMmdBNDcxLTRKTVhQOHNKNU05b0hXR3FaTUVweHY5VVBBaF9lMnBsSEV5RFg5dXRkWW1UUjk3SmVLMk1KdTV0ZmxvdmMwUXkwRGR1dHJud29sTHJoSUJGcmZRVGU2T0F3V3I3TC1JU09peUJUOE85bnNaQWZFamhNT2psNjRfQWFSMEhRM2RJWGtyYm9FUUVWUVl1dGRRaUVLMnIxaEFvWFk5UUR2WTJhN2llakhGVHpVRUpnakFyazAxSl8wOVF1bVBmMXZGSFZ6LVM2V1VOcmFGTW5UU3hmeTVoblhmMUU3c1NRV3NGdW1YZm9JY2lNQmVnTGZ5c2l1UzNwZENNWGxoaTloV2d5YklHSmE3UnltbGotSklNdzZ5U2Zka0pLRks2YnJ0QUZuTmk2SlZpVHpncUN5QUx1MnhPOU9yaDhKOG5hdkI3N09vY1A0aWdSVklkZ0ZjNUtzOU9VRnItWUdZRm9jekFiSkYyNHRvdDdVOUN0X0lyd1JHUHA0YmdJdFJ0RVJkRUgzU0NNNlR1Z05uYWt4c0VITGYwcW9SeVF2anV2Wi1Mbjg3Y3F0SVNtQXVMQV8xSEhfb0hEeGU5QlNGU0RDcFNObnRVOE9HNzdaVFNGOTZNYkcyOXdxd0VSSURhM01VQnBzbFhVOXd5OXdKSHhnMGxVWkd4NmpsellaM3Jva2o0V0t3czJqQXYwRWV5RWR3bUJIU2Q2aGc4VUZGSHB4dlctOXV6NVJEMVF0VGFBblo5bEd3X2ZrZzJFc01wWHZHQlhqUUl3YlRnU2U5ajhnTWxPLWRMYTZHdDhpUHBFRXdNREpQYmZob1NDYmZuQ2p1d3BlYXNqemNzR0tpZE1CRE5kNktNTnhQbmZrVkl0aFhvUkh0ZVdTRXZRbUdxYXJOaDdPNEZFWU1ESzhueW9hS1d3bnJBYV9hVEh5M3I3ejREVmFFTC1TS0JYdnR1b2hHRHdWalViVUd3Ylg3Vk1RZVRLTmR6bFJmQ2FERUlJaHFydVVkYW80d2paVXJnOXBLSEF1eTRRa0ZHZ0VNa196QjdEY2NDbGpPaXlMcUpFX2N4elVWTHFHQWYzT2F3ZmZlZldXSXM5ZVgyZHRPeHRkSElwZm9fakFGZWx2LTJfRm9FazhqOGdwRUpEWXM4ejZGSlhIVzlLVjlVazhDUVNXRTlWMDNwRGhsNVFmTFdLSTF3Ym5XcHZzQVpYblJPQ1NhanFVem90bDRkT25za3V5RTFLbTU3NVlnZmJ1NDVNd3pRRHdSNW1NN21SSkJyckJ4SDJDNTkwQWR5QkNpd2wwVDIyQUZzWHp3WWZaQ3c5STNMMEszRGtGbThOUVUxendmekMxTHVQU05KQVpJa0lTaEx1Y2k3aGJhakdnNF9SWDZxeURMQm12Um9Hc25IaXFoVzg1Yk51TUpQbVl2TEptNDJqaW1LbGpfR1V1cG9ucWFHZGctVTZ3Z09CTDRONHQ1VFlwNEY3cE1XZTdWeTh0U1hOTXM4UjdyeURjQU9EZEo2S0x0dmV0VTVvYkdOZk1ERC1ZVE1nT3RLNHlGaGVSa1R4dXZ4MmUyRlFsNjFtQmoxMm9zZ3lqMnB4Vm5yZ0k0dFBlWEVhMTA1SlEwMFg4QXNwVkNEY1JwYVF6ZnJaSHR5dXdWNmJoTXlSamtVWDYzNWdlbXpkMXVxeVRYc2V5WmlGSVFGQjJnOTczZXZmNEFNNVJRd1Y2cHIzdm9OdU5Bc1hjWjlqenlQSHlna2ZJOFhCLVVMTHZzQWlxNjVTLThORVdfOVBpWGxfTzF1SGFjTWVmMXJWeVpzeWZfaGw0MHBjbGRzY200YjFHMWVYaElBUjNKX3JpV3N5MXRJcGhITTVyQkFtMVk2YS1GTm9uOEVCWXEyUGJGNnlwbEl1TGFTMUY4Ml82S1VHcDVLN3E2WkFpM1lSSkdyUnhocFVNN2RLVXd5dFNpbFVPMnpwcHRITUNhcUo5VXVoRzI4NGJQUWRnWlZCNEZuOUZ2UnVodUQ4akt4QlNUYmttT1hLREVndERnRjhsRVBmb0llaGp1RURKM0QwNURwVHgwWkJTa1lGNW5qRHFVcG52cW1jRkZfUHhicmpSekhUbno4Q201MkhWZmlGQ1k4TkV5Y1JBaElBc3VsX1dueVlvS0FEVFVlcjFtTFNIYWpGaUkzbWVORFVZVW5Xd3FkRzFWYWFITVREWTVlMk5veGdsdUh6OE50N3RWem1LUERBVkJPaGVJMzBZblpxRzdGMDk3cnpxU05yZ1BvTnVTVHpndkhsT2lRUkctdU1iUWdEVnhkNjV5R202dmgzV0xNdFJmMGxfVzVCS0VLcm8zaHhnVjVkZEIyTEJTZWUtNWxzWk1ZZVJucnFlWlNKTWlKNGswMExFNTA1aVk3LU84VG0tcmh2RktULTlqalZIOWs4WEZaZVdtbTBkaGptb3JaanBNSE5TNnltRUYtVHJ2R2dTaDAyOWhHdU9raTNMQi1TMmNlOVdIaUFKS2YxTnZPVU1CRENCdDB4NmFyT0FQNEFaRWpDY0pudUhIaWt1YWNQemM2T1NOazZ2NmVyX0xlVGs0cnBGM09vRGF0eEtVWl9yUFVReTBoazdxQTJmZ3FVajFlRUQxYm9oOU9lU2VmZEVVeXE3S2NsSS0zZHg1YTlWMThLdjVScm81WE40TGNKYXpXSTM2ZnlkelczeUZ5bHNxYVJaQ29ydXJvMVY0MGZZc1pDelZQTFZuNXc2T3ZzRVpDc0l4VC1ZNWNvYmJ3cnpiRjNJU282ZmtrRjJYSjJHeW9zdjlybEdKUHU2ZF9GV0RnaXU3aFBpaFBhOVZVbzJqTjI2bU1ISmtzMzNFS2o0U2hzaXptTjU1RThzeVBSUzVsY0o3ajRnRHdCRVZyM191clNCaFg0UE4wY0JXb3FJY09DVGVRb3hrMFRuY1ctZ0dvdHg0bWJFWGRFcTJwNjBVdVBBZUJkbEUzQy1DWm4wempKV3J0UFJ2SGlwOWpxOXBMWG1mb1VkbDdIUnVheVRHYmxHY1NISG9BX2h6ZnMtU0tldWVaM1R3eElRa1BnTm51bTRMSTFlSFZheDZuTWNVOC1vZjJjWW95SHRVVHdLbDEwRkNSRnpXLWZWeGR3cERtT0l1cEtKeFFQb0l5N0o4dU5iaGlLMnp1cXVCTUwwbzdhNVhkS3RJd25oQ0RsaFFEdFF0dml0ZERmZEdEX1lMdUJtMEJobzBUZlBPQWRXellRRzZ5TG5lTWtkTWYzd2R4MC10SjVPbVNDN0lyU0pTMGE4N1luMFVMaFV2VnZSV3MtVVlleHRnSzVQdFhvcEZLaXdRbFhZV2ZsNndFQmIzZ3FWN2tLYUlveDlrRFZuWldCUVJvTHNjWWtBUWwteHNnaHJxdWItZnBBdlBpaWg3ZjJyUk5ydV9pVHJzemdMY05wWTFrMWRLaER3cU96WDdqVVM4bnNxWjA2NXhtZzZEaHNsZkVvU1U1QkNEOFZxck52N29oYm84NXo4dWZJcldBQWhUY3FycEFSLThRS2FhLWtrbllfRTMzWm1reXBLRl9kbjNuY21vWFpTeDkyUFRoaXhTZnE3N2FGUWlsYU5EREZnM0FxRm9mYU1NMTRvMzM5MDVjUE4tTF9BQTNhTEdzaUJmcE9reTdxWVhyZWI2cElBcVAtOTc3OWlYdnM5T2tueU5OTnVkQXhPcGhsc3JGNzZNV1VnZ0hfbjVheTVCVGVWaVBsdEFRX21lbEtpM3UxUkFVSDNXd2FkX29vd1ZzR0NjREh3REg4R0JndXhsWTFXZ3F3elBPVnJjdUIxbF9wQ0YyQWplWWVtT1hnN3lYenlmSHE1X0l0Vk9CNlBCTngwN3ZTWUxZYUt5VVdUTFl4NWRCem94Y0VONTRDUm9nZ1Yybm81MUw3MkNWYUtTdEJPUHlnTElXQlZiOVZhMHg3WkFsVkQzTTBOVnFJbnBoSVdxVUYzVVd5d2p2Q2Z1X1pFZmpxUlpYOUVyd0tLQ0J3NXFWdUtXUWMwaUxrazg5U3liM1FndWZ1WEQ5N01FOEFjV25mc1h0SWRkbnFkOTBsX2VFYlR3XzhsTTlycnZkOHB2OTJQRmJUcFlkVlFNOWx2azBWbmliaGo2NS1jSlpvSEs0UjBIb1hPTlhaWlpJQWViUEVDRVlvVUtIUFlNT09nWHppNWdETFZFVTdMdTZuRDlIMWE4Sjlab0xIWGdZZkQ4NXV4S0pRVkR5cFNIY2VrSlRacm40dHZTLVlRejd0MFREeHRpTENOTHVNb0RnbnJ4LW5DWmItRFNyNGt1NVhkTnFaVWFWdWVqaXVSUEU0TmFCV3owSlRNdEg5UUVhbTFkYzRYUDVMMVRCemtYdlBLMlV3dDEwc3ExWjlHdTlkMk1VOGpKcl91REtSRWU5YmlhRmtBSHZfTzk5V0RWVjJ1UUo1RlhLM25uOXhIbU9OcER4RlpXUWc1LUdSLWh0QlMxYTBlMnd4MFQwcTFOUXI2S3dNR3FGcDFOTkJ0cUc5UnNFTHJ4Uk1hMmUxVzlkMU9ydE5DdGlNQmRRdnJ3c0x5Y1BST25rcHRPTXk5YWlEakdPSDZPSW1BY2FQbUNaREFUMUh4V25MTndYTjQ3ejhVQTQ3QU1xX193LVU0eGh6a2NDbGpPSnVHOTVFeUZBOVhDM3hvVHF0Y0YyQ3lLVGdGT2RRLWxKSmJpMDZzSzZWNVhCUnIyUHpqcGtiZldsYjVhcHM0NjVnd1JKemhtVjVHTGo4Q1dLTlhZcHBGN0trdUlBZjMtaEE0aWh4TTVkZkNSUVF6aXB5STdWQjJIMDVBLTZiZW03Yl9hbTJIZjJnY2xEODJMWk41eGFNNHhscGVkODFIMmFZcjlhbDBTNFlxNHFnbEhqaEdVTklFWkswWXUxX2VOX3JadjhEMFo2aGdiRTZCNnAtZ0p4SktCcGhXc0tYYmtTZEhVU2ZuWDdPaWs0NW9LT2ZoZGdDQjUwRFprSE5JZXNuWUhMVm4xNTl5ZEVodmJiMlVRU0RWMzVuZUlvSF9WRVhWRlRpVGxaTEVlWHVWRzIzeXVyOE40cWFnbGpCTzY4NDhJQ0Y1N19rUUQ5VlV2eW5KVm9xU2hvb2tpeHo0OUxXaFQwbFBuMndQWEhLZkpkc3NxT0M2ZXpHaGQxMXlfNHBTUkhfUTUzUFZFZFpUUDk2aV9xbk54OFFTUHpyRGh5WUVVWEM4TjdFQ0RZNDR0c2lqU25PSDZoV0FaYTJUVW5qOGo3UG5nN19iaEtoZjJIV2ZUOW9jYzVsekZqLTV4N1ktdHh6bl91YkpWZ0RkSzBwcFFZRlQ1SVVPQVBiRzdGTDc0MnJtd1ljVHlma2U1ZTVpUjdEQkpZeVpEMHJJTEVnME1qZm42OU9wT1EzZ0VnV1p6ZWdMUUUtaElENDlPS2lYc1hEWkoyZGhRQm5nNVJGSWR0cFZaNXk0SGFmT0FOYzJFUVJtb2dRZWdvS0RZTDdWNnk1WGcwYzZVNTlxd1RKTzNwdjVYdDE4Nkg5TVdvbmRZWGVwR0hwLVJZU0NjdGtzaFBiSHdnZ1NOeG5ZVHU4b3dQeWdHUDBvSzJfMUNBcmRfczZXX0E0QWUwMjJIQThNSVg4eFlOSjZrUl9qQ0lSTWVKNzFQM0tTaURsV2FRdThjOXFwZVpoZ0J6WXpKZ1pDYnZiNEhvYjAtZXJzZ1JueklJRWdaZ0F5dnVLT3lWN2RfNmF0VC1HNGNyNlFYMThPb3FIeTgzSGg4elpDcUItZWJsbWRPQm5vdFZJS2F0dWVlOWpMX3k0U2t5cWhycVFpWGY2akhlQ0hSenFzZjgyRkc1S1dMWmx5MjVXRDdIZ2xlWWh1WUZ2c0dzS3QxaUctVVFPOTY2V2c2TTZoYjNpaEcybm1JN21WWDNTTTdnZ2FZYWtUYXh6TzE2cWgtSGlDU3BuVGFHekRRVWZreGNIR3Noa2tEbTNoVHFqVmRtMWVGZVdZWi1qY3RNVDRDLXAwNnFuLTRrUW5hdHFvdUYtaE0zbkpXTWVDQmpTWWlTeWdZZ3pjWkUyRnpUSnpSRk0zVmJsYkJqbnlHVUVhWmxjdVJLV2s1LS1YWEd6V2dBR196cWwxSXllekNmS3c0ai01TjZveHRGYlowM0pnS3pzMlladHZPQ1c5YXMwQlBBV1oyY3RqVlBVUmNGUVZmaW9kRkJTRnJCRTBUVF9MOW83LUhkS3dPb1VyR1Bsd2ZEWmpXTFFQLUVqYjlTRTlZa2dRTUc4X053YWJyMjZkVE9QRlp0bmNHLXhLU0hEMkZSQ2x4SUJWdUs2RkJUd2tEdHBDZnlIZmdYbkEyWWpvT3pSMG0zU2Y0cWJkdU40cUd4YjJHakNTbWdHd0ZqUWZ1bW82c2tjQndjRUhhNUNSZVZQMmpxM1YyYVkxY0dHM0R4RjE2a1EwQ1VCeUdWRkgwSHF2NF9fRjBkMmJoNUJ6OWpqeDA1SmFQUnRVMXNlSGlIdlBybFRhWnJETWd2UE5zZDBocm5uR3pOdERmYU5KdnNQbDhTVUxxNlVBQkVnZEVobkhjeUk2dzlYRzZZUF9GMXJ3LVVZVXJzTXhfMXFkWmZ2UW9MSlNkN3ZJeVVYWUkxU2pHZGw1RWlxLVRyTkw3ZTZUY1g5Q3JfWjliMTN3VmRINHFpd0psWkFKamI3alhmWnNRanctUWRldmhGRVQtNlA5MHJKTFluZmNIU3dnYmRVcjdIV3p2WndRYlBzanRjdzMtek50TTAxckxpbXVEakxvdGxIWHZ0cTBrZ3UyYmNWM2RHQUlYMTd6ZjhGOGV3bVF2amxyWVV3RzZtWFM4TExzQW8xY1ppVlFRMTU0ZFl3M3p2enpQQ2pJa3dLN2xvbG1Cd21YNUo0X2pIby1oYzhCckJHLS1FS2ZfQWN0emJmUVJNN2JUMnJEbVdLa2NxZVVCZDBqVlBPeGZ2VzE4emlMOUprRm1wUzJZZjQ2SkJGVEtPQkNxQ0tlamEtQ2lxOWlsX3BCMXVybnV4b2xLeDY5YW5jOUJXeDBSdUp6ZnF3R2FTa1Zua0VHakF2MzNYQVVNMUxteERFVGJWbHVJT1ZCTEloN2dITzMyWUl1UHlScG9kV2M0U2ZveGZPNVZDejNHbHJUZElRaG91YjNfZG9nN0ItaE9RWFpsYlNjNXdUYjlWYXRGalZ6dUFDOVB5OUM2Tmc0eFRfenZ4MllGY0ZBS0g3am5CVUJUNlN6RC0zdV95SnAxbXFvcEhaRVA4QURKa3ktQU4tMUtYd0FZeVlFakZpaE9hYTc5d3pGbWN1d2t3aDdBRmFlUDk5ZThhWkZEa2xOd0FKN0tMeUFFTlJDRlNLT2Vvb1JQMGhrekhOVTRiZFdFQWxySUlxdHFPXy1TUlBoc2YxRTNpUFlURXJMQUJRMlcxdEVvSUE2RG11N0dTdjJFTG5RQ1BuOGNxZEZZSXlnbDl3N0M0b2hSc3BWdDlMUW1KTmwzei0tc2dyMHFpNng4dmV1blpMd0Rtcm0teDh6TzZYc2dhdXQybHh1a3g4RmUzVFlvLjBXUl9xc09VanBBcktqMkZhSmQ3dHZGWXQ3aXItZ1g2RXdQSmZwT1F0d1U"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'da11e261-4077-4864-9f06-9fb4cae17237',
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
  'Tue, 16 Feb 2021 18:21:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRXFFZndwM05fNTRkM09SVmhaZmtVMlNfMDlHZklvMmlHNHVfVFF2ZzBzZXQtUEExUEdpUUR2T09lNTk4LXFFZUxJWXRXeDVUcjZWQjJxOUdzTHRtbElBM1hhQXdNNXZJVmpSOUEtemYyUERWc2VRb3pWUGVweUxfLVVWLUdYZ21vSnFxVDFfN0ZuZXFFWXg0ZjZweXhCaWdBRTFhSG9qLWxhRWZJM2x2d0dWREJrbXNKQ1ZQNHJ1V0VCQ2R2Ump2UG1sTzdwZGt5ZXdPRE55Qk5rdmlxckl4UFBQZ0x4N2p2X1dVUmJnVDF2MERRQlJUQUpHRWFGTjdjZlZTd05QWGtwa3dIYXlCMHk3X0hTVzhCSTc4Q1JvWno0Z2JUUk5mRUwtWEUzeDZxYTUzRHpPMDB1MENTbnBJSUN3OVZwZU1SUVpIVkF6eGs1aUROSzJZNVlZQkRRLlNvd3ByemNocThkYnhLMXFreFFrZFEuMWxyQW9ZcUdPejBJVmZEeVJ2Y3Y1VWc5bHZWbDdRUHZXTHlNWkViS19wY1UzeGdjMjNoMDFJdm9uWFlCTTRzNExhTkNlNGdQYmQzWG5TQzl1dWpUVDQzR1hXYU9OQ0JTQmRidVZYR0VnejN2aTN6N3ZIU21mSElMbmI5QmVCT3JfSGxMejVFMTB4dHZ2YXdZMlkzQk43b1h4NllTVGRJR2lKY2xYdWdDcHg1WEt4LUtab1FRNHo3Z1Y4SEpUYTN1aVpoSUxPclE0V0Y2X0hNQUVXSWtMQnRyS0dXYWkwMmlFNkpubFB0SkpWOXdRdElpcVg1Z2NVRUFNdEo4YUc0NXl3MDVZYmNBdXZSam1tNThNQ0ZXVWRDY1F5SXM3SjRZNFRNQnJlZS1aUEJ0cWNOczQ0bUFyYzVlckdTcGJ2Q051bWtJWGtmYlJCeDBCRVo2c0VhVEhDOTFaTjdDa0dzdVVPTkQwQ2xmRjFDd01rZjVZTG5vSVZjMXRPck1QajV1YWQwTnBaRFFjZmZxRWJReWROUUpXSzh1VlJIb2dyZ29sZlZfeGJBYTZ0ZEE0b2dUVWRFZmVYT0IweFVFdkJaTVNIaXBOWkhhVWE0WnJ1RU1MTldielRmMHI4WHpqbURfQTZTQ290cEZLMlNXeFRIRG9sRkNJNVF3Z19SVmlrU0FBMTZvNjRJRjZYaUFvVWpKZ1FQQzJFbGljeS1KVUJ2WWJRX25rdGpfV3BSMmFNYU8ydnhpT0o3T1FLaV9qdHFkdTI1SVFXbzlmYW8zTzF3WHByMGRQdXpHNEdUdEZEbDJhajhLZEw2TV9EMjd5X3VRQUFZdUZ5Z0t1ckpYUGlaY0Y4dlQ2Z1FHbXd6b2Nta3AxbnRVanExdk1YUDR3LS0yZTRtYWRET01jekZQbm42Ui1CbFZqYzZYZEN4SlBPa1laTzJUUUVjQTZSQ3ViYzJCbEYzZHBUV1p5MjFtR3VwZ05LdElOdldsMjZDSm8zRnIyUmh3bzBJd0xhSUMxOC10cld6dVhOT0Y5UzBEdEdrandTcGs1ZzJnMDlWbWc2bWJYcGV0WGRBYVJhRjAwNUFiQWx4S0tYWnNVd29ZNnBHdGt6NjRnbkk1UHdWc2F4cUl1SzhqMmhmckxFa25Nak9VSEtlVVZabjNubDN3a0hsYUdCN0NxN2VBY3pBMzBCNUUzSWt4NFM4N3pOXy1raHk3OEEzMGUyWFVmdlo2MV9jQkhfdUVXM0p1YWdVUTlVVTQ2SU41YjBuTjZfUEZPLW9TNW5LbkJucm03bC0wQ1BmdFdma0JlclZtSUZiTE84Uld5bVNFX1ZNNFJFa1NwSHlDR0pZMnhzbWZIUEtFMFBUSEdXZHJVVm9XaGE5RGhLeDlFejRBX0I5ekxaaVpmbEpOdGNEdFctZnFxc1BqN3daMVNWV1dvME42VG5PbllOaGhxS2JsUFFpNEpZMUdaUEVsd1VhaU9mTXBDUndHWU1MSnVfd1d3T2hEazhYV1ZVMzdRT21CbnNOenU4ZWF6WHd0Q2xnaldFeDhfQXNDdElXTVVTeWZ3LXhMYUNvTHNKa0xLektia1o1bkJJaEl6blFOUHdKNHNEZVI3RjNTbE1PZkxPZ0o4QlpmZmtmcmVzYzc4ZG42a1ZoeHdqbmpaODlxRDZUMEZJRDlnOGxvTExPbDlmRUxsajN4V3Y4dzRWOE5zcG5BN0RwdWpIN2RZT3o5M1ZsUERZdGZFUEMySmxlNmp0elc4ZHlkSzJrenVEY2p4Q3JpTnhnQlFWeHY2Y3dUQzJIUjVnRGlGT1Z4dlREUWd0VXRoajR6dHBpS1BuOE5JN1V0RENITzdkQWxLZDB6UWxLMXZaZG5nUGk3MXpqemVRNVhCMXBNaDJqaHNfbVJSTEt6SWNTSHMyelZSdENYT0lrdGJHZzNNYzdCeC1tbk80cklud3U5S1YxeWhKeHlTbkNVQ1VmeWdRZzFRMkZtTEczV0FXNGluZHhUUFFkZlc3cGFnMjRDb3h4em9DbDFoQWdRWnU4NThfRUxLYWhvRmVNVjRlTEhoZ2RZU2EtbkZKX3FiUTlocVh4dlYxLWk3cEZIdDdfY01td213MERJdjZ0dmM1YmZBUk5lZ01ud0l4ZzFMMmdBNDcxLTRKTVhQOHNKNU05b0hXR3FaTUVweHY5VVBBaF9lMnBsSEV5RFg5dXRkWW1UUjk3SmVLMk1KdTV0ZmxvdmMwUXkwRGR1dHJud29sTHJoSUJGcmZRVGU2T0F3V3I3TC1JU09peUJUOE85bnNaQWZFamhNT2psNjRfQWFSMEhRM2RJWGtyYm9FUUVWUVl1dGRRaUVLMnIxaEFvWFk5UUR2WTJhN2llakhGVHpVRUpnakFyazAxSl8wOVF1bVBmMXZGSFZ6LVM2V1VOcmFGTW5UU3hmeTVoblhmMUU3c1NRV3NGdW1YZm9JY2lNQmVnTGZ5c2l1UzNwZENNWGxoaTloV2d5YklHSmE3UnltbGotSklNdzZ5U2Zka0pLRks2YnJ0QUZuTmk2SlZpVHpncUN5QUx1MnhPOU9yaDhKOG5hdkI3N09vY1A0aWdSVklkZ0ZjNUtzOU9VRnItWUdZRm9jekFiSkYyNHRvdDdVOUN0X0lyd1JHUHA0YmdJdFJ0RVJkRUgzU0NNNlR1Z05uYWt4c0VITGYwcW9SeVF2anV2Wi1Mbjg3Y3F0SVNtQXVMQV8xSEhfb0hEeGU5QlNGU0RDcFNObnRVOE9HNzdaVFNGOTZNYkcyOXdxd0VSSURhM01VQnBzbFhVOXd5OXdKSHhnMGxVWkd4NmpsellaM3Jva2o0V0t3czJqQXYwRWV5RWR3bUJIU2Q2aGc4VUZGSHB4dlctOXV6NVJEMVF0VGFBblo5bEd3X2ZrZzJFc01wWHZHQlhqUUl3YlRnU2U5ajhnTWxPLWRMYTZHdDhpUHBFRXdNREpQYmZob1NDYmZuQ2p1d3BlYXNqemNzR0tpZE1CRE5kNktNTnhQbmZrVkl0aFhvUkh0ZVdTRXZRbUdxYXJOaDdPNEZFWU1ESzhueW9hS1d3bnJBYV9hVEh5M3I3ejREVmFFTC1TS0JYdnR1b2hHRHdWalViVUd3Ylg3Vk1RZVRLTmR6bFJmQ2FERUlJaHFydVVkYW80d2paVXJnOXBLSEF1eTRRa0ZHZ0VNa196QjdEY2NDbGpPaXlMcUpFX2N4elVWTHFHQWYzT2F3ZmZlZldXSXM5ZVgyZHRPeHRkSElwZm9fakFGZWx2LTJfRm9FazhqOGdwRUpEWXM4ejZGSlhIVzlLVjlVazhDUVNXRTlWMDNwRGhsNVFmTFdLSTF3Ym5XcHZzQVpYblJPQ1NhanFVem90bDRkT25za3V5RTFLbTU3NVlnZmJ1NDVNd3pRRHdSNW1NN21SSkJyckJ4SDJDNTkwQWR5QkNpd2wwVDIyQUZzWHp3WWZaQ3c5STNMMEszRGtGbThOUVUxendmekMxTHVQU05KQVpJa0lTaEx1Y2k3aGJhakdnNF9SWDZxeURMQm12Um9Hc25IaXFoVzg1Yk51TUpQbVl2TEptNDJqaW1LbGpfR1V1cG9ucWFHZGctVTZ3Z09CTDRONHQ1VFlwNEY3cE1XZTdWeTh0U1hOTXM4UjdyeURjQU9EZEo2S0x0dmV0VTVvYkdOZk1ERC1ZVE1nT3RLNHlGaGVSa1R4dXZ4MmUyRlFsNjFtQmoxMm9zZ3lqMnB4Vm5yZ0k0dFBlWEVhMTA1SlEwMFg4QXNwVkNEY1JwYVF6ZnJaSHR5dXdWNmJoTXlSamtVWDYzNWdlbXpkMXVxeVRYc2V5WmlGSVFGQjJnOTczZXZmNEFNNVJRd1Y2cHIzdm9OdU5Bc1hjWjlqenlQSHlna2ZJOFhCLVVMTHZzQWlxNjVTLThORVdfOVBpWGxfTzF1SGFjTWVmMXJWeVpzeWZfaGw0MHBjbGRzY200YjFHMWVYaElBUjNKX3JpV3N5MXRJcGhITTVyQkFtMVk2YS1GTm9uOEVCWXEyUGJGNnlwbEl1TGFTMUY4Ml82S1VHcDVLN3E2WkFpM1lSSkdyUnhocFVNN2RLVXd5dFNpbFVPMnpwcHRITUNhcUo5VXVoRzI4NGJQUWRnWlZCNEZuOUZ2UnVodUQ4akt4QlNUYmttT1hLREVndERnRjhsRVBmb0llaGp1RURKM0QwNURwVHgwWkJTa1lGNW5qRHFVcG52cW1jRkZfUHhicmpSekhUbno4Q201MkhWZmlGQ1k4TkV5Y1JBaElBc3VsX1dueVlvS0FEVFVlcjFtTFNIYWpGaUkzbWVORFVZVW5Xd3FkRzFWYWFITVREWTVlMk5veGdsdUh6OE50N3RWem1LUERBVkJPaGVJMzBZblpxRzdGMDk3cnpxU05yZ1BvTnVTVHpndkhsT2lRUkctdU1iUWdEVnhkNjV5R202dmgzV0xNdFJmMGxfVzVCS0VLcm8zaHhnVjVkZEIyTEJTZWUtNWxzWk1ZZVJucnFlWlNKTWlKNGswMExFNTA1aVk3LU84VG0tcmh2RktULTlqalZIOWs4WEZaZVdtbTBkaGptb3JaanBNSE5TNnltRUYtVHJ2R2dTaDAyOWhHdU9raTNMQi1TMmNlOVdIaUFKS2YxTnZPVU1CRENCdDB4NmFyT0FQNEFaRWpDY0pudUhIaWt1YWNQemM2T1NOazZ2NmVyX0xlVGs0cnBGM09vRGF0eEtVWl9yUFVReTBoazdxQTJmZ3FVajFlRUQxYm9oOU9lU2VmZEVVeXE3S2NsSS0zZHg1YTlWMThLdjVScm81WE40TGNKYXpXSTM2ZnlkelczeUZ5bHNxYVJaQ29ydXJvMVY0MGZZc1pDelZQTFZuNXc2T3ZzRVpDc0l4VC1ZNWNvYmJ3cnpiRjNJU282ZmtrRjJYSjJHeW9zdjlybEdKUHU2ZF9GV0RnaXU3aFBpaFBhOVZVbzJqTjI2bU1ISmtzMzNFS2o0U2hzaXptTjU1RThzeVBSUzVsY0o3ajRnRHdCRVZyM191clNCaFg0UE4wY0JXb3FJY09DVGVRb3hrMFRuY1ctZ0dvdHg0bWJFWGRFcTJwNjBVdVBBZUJkbEUzQy1DWm4wempKV3J0UFJ2SGlwOWpxOXBMWG1mb1VkbDdIUnVheVRHYmxHY1NISG9BX2h6ZnMtU0tldWVaM1R3eElRa1BnTm51bTRMSTFlSFZheDZuTWNVOC1vZjJjWW95SHRVVHdLbDEwRkNSRnpXLWZWeGR3cERtT0l1cEtKeFFQb0l5N0o4dU5iaGlLMnp1cXVCTUwwbzdhNVhkS3RJd25oQ0RsaFFEdFF0dml0ZERmZEdEX1lMdUJtMEJobzBUZlBPQWRXellRRzZ5TG5lTWtkTWYzd2R4MC10SjVPbVNDN0lyU0pTMGE4N1luMFVMaFV2VnZSV3MtVVlleHRnSzVQdFhvcEZLaXdRbFhZV2ZsNndFQmIzZ3FWN2tLYUlveDlrRFZuWldCUVJvTHNjWWtBUWwteHNnaHJxdWItZnBBdlBpaWg3ZjJyUk5ydV9pVHJzemdMY05wWTFrMWRLaER3cU96WDdqVVM4bnNxWjA2NXhtZzZEaHNsZkVvU1U1QkNEOFZxck52N29oYm84NXo4dWZJcldBQWhUY3FycEFSLThRS2FhLWtrbllfRTMzWm1reXBLRl9kbjNuY21vWFpTeDkyUFRoaXhTZnE3N2FGUWlsYU5EREZnM0FxRm9mYU1NMTRvMzM5MDVjUE4tTF9BQTNhTEdzaUJmcE9reTdxWVhyZWI2cElBcVAtOTc3OWlYdnM5T2tueU5OTnVkQXhPcGhsc3JGNzZNV1VnZ0hfbjVheTVCVGVWaVBsdEFRX21lbEtpM3UxUkFVSDNXd2FkX29vd1ZzR0NjREh3REg4R0JndXhsWTFXZ3F3elBPVnJjdUIxbF9wQ0YyQWplWWVtT1hnN3lYenlmSHE1X0l0Vk9CNlBCTngwN3ZTWUxZYUt5VVdUTFl4NWRCem94Y0VONTRDUm9nZ1Yybm81MUw3MkNWYUtTdEJPUHlnTElXQlZiOVZhMHg3WkFsVkQzTTBOVnFJbnBoSVdxVUYzVVd5d2p2Q2Z1X1pFZmpxUlpYOUVyd0tLQ0J3NXFWdUtXUWMwaUxrazg5U3liM1FndWZ1WEQ5N01FOEFjV25mc1h0SWRkbnFkOTBsX2VFYlR3XzhsTTlycnZkOHB2OTJQRmJUcFlkVlFNOWx2azBWbmliaGo2NS1jSlpvSEs0UjBIb1hPTlhaWlpJQWViUEVDRVlvVUtIUFlNT09nWHppNWdETFZFVTdMdTZuRDlIMWE4Sjlab0xIWGdZZkQ4NXV4S0pRVkR5cFNIY2VrSlRacm40dHZTLVlRejd0MFREeHRpTENOTHVNb0RnbnJ4LW5DWmItRFNyNGt1NVhkTnFaVWFWdWVqaXVSUEU0TmFCV3owSlRNdEg5UUVhbTFkYzRYUDVMMVRCemtYdlBLMlV3dDEwc3ExWjlHdTlkMk1VOGpKcl91REtSRWU5YmlhRmtBSHZfTzk5V0RWVjJ1UUo1RlhLM25uOXhIbU9OcER4RlpXUWc1LUdSLWh0QlMxYTBlMnd4MFQwcTFOUXI2S3dNR3FGcDFOTkJ0cUc5UnNFTHJ4Uk1hMmUxVzlkMU9ydE5DdGlNQmRRdnJ3c0x5Y1BST25rcHRPTXk5YWlEakdPSDZPSW1BY2FQbUNaREFUMUh4V25MTndYTjQ3ejhVQTQ3QU1xX193LVU0eGh6a2NDbGpPSnVHOTVFeUZBOVhDM3hvVHF0Y0YyQ3lLVGdGT2RRLWxKSmJpMDZzSzZWNVhCUnIyUHpqcGtiZldsYjVhcHM0NjVnd1JKemhtVjVHTGo4Q1dLTlhZcHBGN0trdUlBZjMtaEE0aWh4TTVkZkNSUVF6aXB5STdWQjJIMDVBLTZiZW03Yl9hbTJIZjJnY2xEODJMWk41eGFNNHhscGVkODFIMmFZcjlhbDBTNFlxNHFnbEhqaEdVTklFWkswWXUxX2VOX3JadjhEMFo2aGdiRTZCNnAtZ0p4SktCcGhXc0tYYmtTZEhVU2ZuWDdPaWs0NW9LT2ZoZGdDQjUwRFprSE5JZXNuWUhMVm4xNTl5ZEVodmJiMlVRU0RWMzVuZUlvSF9WRVhWRlRpVGxaTEVlWHVWRzIzeXVyOE40cWFnbGpCTzY4NDhJQ0Y1N19rUUQ5VlV2eW5KVm9xU2hvb2tpeHo0OUxXaFQwbFBuMndQWEhLZkpkc3NxT0M2ZXpHaGQxMXlfNHBTUkhfUTUzUFZFZFpUUDk2aV9xbk54OFFTUHpyRGh5WUVVWEM4TjdFQ0RZNDR0c2lqU25PSDZoV0FaYTJUVW5qOGo3UG5nN19iaEtoZjJIV2ZUOW9jYzVsekZqLTV4N1ktdHh6bl91YkpWZ0RkSzBwcFFZRlQ1SVVPQVBiRzdGTDc0MnJtd1ljVHlma2U1ZTVpUjdEQkpZeVpEMHJJTEVnME1qZm42OU9wT1EzZ0VnV1p6ZWdMUUUtaElENDlPS2lYc1hEWkoyZGhRQm5nNVJGSWR0cFZaNXk0SGFmT0FOYzJFUVJtb2dRZWdvS0RZTDdWNnk1WGcwYzZVNTlxd1RKTzNwdjVYdDE4Nkg5TVdvbmRZWGVwR0hwLVJZU0NjdGtzaFBiSHdnZ1NOeG5ZVHU4b3dQeWdHUDBvSzJfMUNBcmRfczZXX0E0QWUwMjJIQThNSVg4eFlOSjZrUl9qQ0lSTWVKNzFQM0tTaURsV2FRdThjOXFwZVpoZ0J6WXpKZ1pDYnZiNEhvYjAtZXJzZ1JueklJRWdaZ0F5dnVLT3lWN2RfNmF0VC1HNGNyNlFYMThPb3FIeTgzSGg4elpDcUItZWJsbWRPQm5vdFZJS2F0dWVlOWpMX3k0U2t5cWhycVFpWGY2akhlQ0hSenFzZjgyRkc1S1dMWmx5MjVXRDdIZ2xlWWh1WUZ2c0dzS3QxaUctVVFPOTY2V2c2TTZoYjNpaEcybm1JN21WWDNTTTdnZ2FZYWtUYXh6TzE2cWgtSGlDU3BuVGFHekRRVWZreGNIR3Noa2tEbTNoVHFqVmRtMWVGZVdZWi1qY3RNVDRDLXAwNnFuLTRrUW5hdHFvdUYtaE0zbkpXTWVDQmpTWWlTeWdZZ3pjWkUyRnpUSnpSRk0zVmJsYkJqbnlHVUVhWmxjdVJLV2s1LS1YWEd6V2dBR196cWwxSXllekNmS3c0ai01TjZveHRGYlowM0pnS3pzMlladHZPQ1c5YXMwQlBBV1oyY3RqVlBVUmNGUVZmaW9kRkJTRnJCRTBUVF9MOW83LUhkS3dPb1VyR1Bsd2ZEWmpXTFFQLUVqYjlTRTlZa2dRTUc4X053YWJyMjZkVE9QRlp0bmNHLXhLU0hEMkZSQ2x4SUJWdUs2RkJUd2tEdHBDZnlIZmdYbkEyWWpvT3pSMG0zU2Y0cWJkdU40cUd4YjJHakNTbWdHd0ZqUWZ1bW82c2tjQndjRUhhNUNSZVZQMmpxM1YyYVkxY0dHM0R4RjE2a1EwQ1VCeUdWRkgwSHF2NF9fRjBkMmJoNUJ6OWpqeDA1SmFQUnRVMXNlSGlIdlBybFRhWnJETWd2UE5zZDBocm5uR3pOdERmYU5KdnNQbDhTVUxxNlVBQkVnZEVobkhjeUk2dzlYRzZZUF9GMXJ3LVVZVXJzTXhfMXFkWmZ2UW9MSlNkN3ZJeVVYWUkxU2pHZGw1RWlxLVRyTkw3ZTZUY1g5Q3JfWjliMTN3VmRINHFpd0psWkFKamI3alhmWnNRanctUWRldmhGRVQtNlA5MHJKTFluZmNIU3dnYmRVcjdIV3p2WndRYlBzanRjdzMtek50TTAxckxpbXVEakxvdGxIWHZ0cTBrZ3UyYmNWM2RHQUlYMTd6ZjhGOGV3bVF2amxyWVV3RzZtWFM4TExzQW8xY1ppVlFRMTU0ZFl3M3p2enpQQ2pJa3dLN2xvbG1Cd21YNUo0X2pIby1oYzhCckJHLS1FS2ZfQWN0emJmUVJNN2JUMnJEbVdLa2NxZVVCZDBqVlBPeGZ2VzE4emlMOUprRm1wUzJZZjQ2SkJGVEtPQkNxQ0tlamEtQ2lxOWlsX3BCMXVybnV4b2xLeDY5YW5jOUJXeDBSdUp6ZnF3R2FTa1Zua0VHakF2MzNYQVVNMUxteERFVGJWbHVJT1ZCTEloN2dITzMyWUl1UHlScG9kV2M0U2ZveGZPNVZDejNHbHJUZElRaG91YjNfZG9nN0ItaE9RWFpsYlNjNXdUYjlWYXRGalZ6dUFDOVB5OUM2Tmc0eFRfenZ4MllGY0ZBS0g3am5CVUJUNlN6RC0zdV95SnAxbXFvcEhaRVA4QURKa3ktQU4tMUtYd0FZeVlFakZpaE9hYTc5d3pGbWN1d2t3aDdBRmFlUDk5ZThhWkZEa2xOd0FKN0tMeUFFTlJDRlNLT2Vvb1JQMGhrekhOVTRiZFdFQWxySUlxdHFPXy1TUlBoc2YxRTNpUFlURXJMQUJRMlcxdEVvSUE2RG11N0dTdjJFTG5RQ1BuOGNxZEZZSXlnbDl3N0M0b2hSc3BWdDlMUW1KTmwzei0tc2dyMHFpNng4dmV1blpMd0Rtcm0teDh6TzZYc2dhdXQybHh1a3g4RmUzVFlvLjBXUl9xc09VanBBcktqMkZhSmQ3dHZGWXQ3aXItZ1g2RXdQSmZwT1F0d1U"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '91f1a7cb-03db-45d0-a21b-6b8527fbf0b9',
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
  'Tue, 16 Feb 2021 18:21:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRXFFZndwM05fNTRkM09SVmhaZmtVMlNfMDlHZklvMmlHNHVfVFF2ZzBzZXQtUEExUEdpUUR2T09lNTk4LXFFZUxJWXRXeDVUcjZWQjJxOUdzTHRtbElBM1hhQXdNNXZJVmpSOUEtemYyUERWc2VRb3pWUGVweUxfLVVWLUdYZ21vSnFxVDFfN0ZuZXFFWXg0ZjZweXhCaWdBRTFhSG9qLWxhRWZJM2x2d0dWREJrbXNKQ1ZQNHJ1V0VCQ2R2Ump2UG1sTzdwZGt5ZXdPRE55Qk5rdmlxckl4UFBQZ0x4N2p2X1dVUmJnVDF2MERRQlJUQUpHRWFGTjdjZlZTd05QWGtwa3dIYXlCMHk3X0hTVzhCSTc4Q1JvWno0Z2JUUk5mRUwtWEUzeDZxYTUzRHpPMDB1MENTbnBJSUN3OVZwZU1SUVpIVkF6eGs1aUROSzJZNVlZQkRRLlNvd3ByemNocThkYnhLMXFreFFrZFEuMWxyQW9ZcUdPejBJVmZEeVJ2Y3Y1VWc5bHZWbDdRUHZXTHlNWkViS19wY1UzeGdjMjNoMDFJdm9uWFlCTTRzNExhTkNlNGdQYmQzWG5TQzl1dWpUVDQzR1hXYU9OQ0JTQmRidVZYR0VnejN2aTN6N3ZIU21mSElMbmI5QmVCT3JfSGxMejVFMTB4dHZ2YXdZMlkzQk43b1h4NllTVGRJR2lKY2xYdWdDcHg1WEt4LUtab1FRNHo3Z1Y4SEpUYTN1aVpoSUxPclE0V0Y2X0hNQUVXSWtMQnRyS0dXYWkwMmlFNkpubFB0SkpWOXdRdElpcVg1Z2NVRUFNdEo4YUc0NXl3MDVZYmNBdXZSam1tNThNQ0ZXVWRDY1F5SXM3SjRZNFRNQnJlZS1aUEJ0cWNOczQ0bUFyYzVlckdTcGJ2Q051bWtJWGtmYlJCeDBCRVo2c0VhVEhDOTFaTjdDa0dzdVVPTkQwQ2xmRjFDd01rZjVZTG5vSVZjMXRPck1QajV1YWQwTnBaRFFjZmZxRWJReWROUUpXSzh1VlJIb2dyZ29sZlZfeGJBYTZ0ZEE0b2dUVWRFZmVYT0IweFVFdkJaTVNIaXBOWkhhVWE0WnJ1RU1MTldielRmMHI4WHpqbURfQTZTQ290cEZLMlNXeFRIRG9sRkNJNVF3Z19SVmlrU0FBMTZvNjRJRjZYaUFvVWpKZ1FQQzJFbGljeS1KVUJ2WWJRX25rdGpfV3BSMmFNYU8ydnhpT0o3T1FLaV9qdHFkdTI1SVFXbzlmYW8zTzF3WHByMGRQdXpHNEdUdEZEbDJhajhLZEw2TV9EMjd5X3VRQUFZdUZ5Z0t1ckpYUGlaY0Y4dlQ2Z1FHbXd6b2Nta3AxbnRVanExdk1YUDR3LS0yZTRtYWRET01jekZQbm42Ui1CbFZqYzZYZEN4SlBPa1laTzJUUUVjQTZSQ3ViYzJCbEYzZHBUV1p5MjFtR3VwZ05LdElOdldsMjZDSm8zRnIyUmh3bzBJd0xhSUMxOC10cld6dVhOT0Y5UzBEdEdrandTcGs1ZzJnMDlWbWc2bWJYcGV0WGRBYVJhRjAwNUFiQWx4S0tYWnNVd29ZNnBHdGt6NjRnbkk1UHdWc2F4cUl1SzhqMmhmckxFa25Nak9VSEtlVVZabjNubDN3a0hsYUdCN0NxN2VBY3pBMzBCNUUzSWt4NFM4N3pOXy1raHk3OEEzMGUyWFVmdlo2MV9jQkhfdUVXM0p1YWdVUTlVVTQ2SU41YjBuTjZfUEZPLW9TNW5LbkJucm03bC0wQ1BmdFdma0JlclZtSUZiTE84Uld5bVNFX1ZNNFJFa1NwSHlDR0pZMnhzbWZIUEtFMFBUSEdXZHJVVm9XaGE5RGhLeDlFejRBX0I5ekxaaVpmbEpOdGNEdFctZnFxc1BqN3daMVNWV1dvME42VG5PbllOaGhxS2JsUFFpNEpZMUdaUEVsd1VhaU9mTXBDUndHWU1MSnVfd1d3T2hEazhYV1ZVMzdRT21CbnNOenU4ZWF6WHd0Q2xnaldFeDhfQXNDdElXTVVTeWZ3LXhMYUNvTHNKa0xLektia1o1bkJJaEl6blFOUHdKNHNEZVI3RjNTbE1PZkxPZ0o4QlpmZmtmcmVzYzc4ZG42a1ZoeHdqbmpaODlxRDZUMEZJRDlnOGxvTExPbDlmRUxsajN4V3Y4dzRWOE5zcG5BN0RwdWpIN2RZT3o5M1ZsUERZdGZFUEMySmxlNmp0elc4ZHlkSzJrenVEY2p4Q3JpTnhnQlFWeHY2Y3dUQzJIUjVnRGlGT1Z4dlREUWd0VXRoajR6dHBpS1BuOE5JN1V0RENITzdkQWxLZDB6UWxLMXZaZG5nUGk3MXpqemVRNVhCMXBNaDJqaHNfbVJSTEt6SWNTSHMyelZSdENYT0lrdGJHZzNNYzdCeC1tbk80cklud3U5S1YxeWhKeHlTbkNVQ1VmeWdRZzFRMkZtTEczV0FXNGluZHhUUFFkZlc3cGFnMjRDb3h4em9DbDFoQWdRWnU4NThfRUxLYWhvRmVNVjRlTEhoZ2RZU2EtbkZKX3FiUTlocVh4dlYxLWk3cEZIdDdfY01td213MERJdjZ0dmM1YmZBUk5lZ01ud0l4ZzFMMmdBNDcxLTRKTVhQOHNKNU05b0hXR3FaTUVweHY5VVBBaF9lMnBsSEV5RFg5dXRkWW1UUjk3SmVLMk1KdTV0ZmxvdmMwUXkwRGR1dHJud29sTHJoSUJGcmZRVGU2T0F3V3I3TC1JU09peUJUOE85bnNaQWZFamhNT2psNjRfQWFSMEhRM2RJWGtyYm9FUUVWUVl1dGRRaUVLMnIxaEFvWFk5UUR2WTJhN2llakhGVHpVRUpnakFyazAxSl8wOVF1bVBmMXZGSFZ6LVM2V1VOcmFGTW5UU3hmeTVoblhmMUU3c1NRV3NGdW1YZm9JY2lNQmVnTGZ5c2l1UzNwZENNWGxoaTloV2d5YklHSmE3UnltbGotSklNdzZ5U2Zka0pLRks2YnJ0QUZuTmk2SlZpVHpncUN5QUx1MnhPOU9yaDhKOG5hdkI3N09vY1A0aWdSVklkZ0ZjNUtzOU9VRnItWUdZRm9jekFiSkYyNHRvdDdVOUN0X0lyd1JHUHA0YmdJdFJ0RVJkRUgzU0NNNlR1Z05uYWt4c0VITGYwcW9SeVF2anV2Wi1Mbjg3Y3F0SVNtQXVMQV8xSEhfb0hEeGU5QlNGU0RDcFNObnRVOE9HNzdaVFNGOTZNYkcyOXdxd0VSSURhM01VQnBzbFhVOXd5OXdKSHhnMGxVWkd4NmpsellaM3Jva2o0V0t3czJqQXYwRWV5RWR3bUJIU2Q2aGc4VUZGSHB4dlctOXV6NVJEMVF0VGFBblo5bEd3X2ZrZzJFc01wWHZHQlhqUUl3YlRnU2U5ajhnTWxPLWRMYTZHdDhpUHBFRXdNREpQYmZob1NDYmZuQ2p1d3BlYXNqemNzR0tpZE1CRE5kNktNTnhQbmZrVkl0aFhvUkh0ZVdTRXZRbUdxYXJOaDdPNEZFWU1ESzhueW9hS1d3bnJBYV9hVEh5M3I3ejREVmFFTC1TS0JYdnR1b2hHRHdWalViVUd3Ylg3Vk1RZVRLTmR6bFJmQ2FERUlJaHFydVVkYW80d2paVXJnOXBLSEF1eTRRa0ZHZ0VNa196QjdEY2NDbGpPaXlMcUpFX2N4elVWTHFHQWYzT2F3ZmZlZldXSXM5ZVgyZHRPeHRkSElwZm9fakFGZWx2LTJfRm9FazhqOGdwRUpEWXM4ejZGSlhIVzlLVjlVazhDUVNXRTlWMDNwRGhsNVFmTFdLSTF3Ym5XcHZzQVpYblJPQ1NhanFVem90bDRkT25za3V5RTFLbTU3NVlnZmJ1NDVNd3pRRHdSNW1NN21SSkJyckJ4SDJDNTkwQWR5QkNpd2wwVDIyQUZzWHp3WWZaQ3c5STNMMEszRGtGbThOUVUxendmekMxTHVQU05KQVpJa0lTaEx1Y2k3aGJhakdnNF9SWDZxeURMQm12Um9Hc25IaXFoVzg1Yk51TUpQbVl2TEptNDJqaW1LbGpfR1V1cG9ucWFHZGctVTZ3Z09CTDRONHQ1VFlwNEY3cE1XZTdWeTh0U1hOTXM4UjdyeURjQU9EZEo2S0x0dmV0VTVvYkdOZk1ERC1ZVE1nT3RLNHlGaGVSa1R4dXZ4MmUyRlFsNjFtQmoxMm9zZ3lqMnB4Vm5yZ0k0dFBlWEVhMTA1SlEwMFg4QXNwVkNEY1JwYVF6ZnJaSHR5dXdWNmJoTXlSamtVWDYzNWdlbXpkMXVxeVRYc2V5WmlGSVFGQjJnOTczZXZmNEFNNVJRd1Y2cHIzdm9OdU5Bc1hjWjlqenlQSHlna2ZJOFhCLVVMTHZzQWlxNjVTLThORVdfOVBpWGxfTzF1SGFjTWVmMXJWeVpzeWZfaGw0MHBjbGRzY200YjFHMWVYaElBUjNKX3JpV3N5MXRJcGhITTVyQkFtMVk2YS1GTm9uOEVCWXEyUGJGNnlwbEl1TGFTMUY4Ml82S1VHcDVLN3E2WkFpM1lSSkdyUnhocFVNN2RLVXd5dFNpbFVPMnpwcHRITUNhcUo5VXVoRzI4NGJQUWRnWlZCNEZuOUZ2UnVodUQ4akt4QlNUYmttT1hLREVndERnRjhsRVBmb0llaGp1RURKM0QwNURwVHgwWkJTa1lGNW5qRHFVcG52cW1jRkZfUHhicmpSekhUbno4Q201MkhWZmlGQ1k4TkV5Y1JBaElBc3VsX1dueVlvS0FEVFVlcjFtTFNIYWpGaUkzbWVORFVZVW5Xd3FkRzFWYWFITVREWTVlMk5veGdsdUh6OE50N3RWem1LUERBVkJPaGVJMzBZblpxRzdGMDk3cnpxU05yZ1BvTnVTVHpndkhsT2lRUkctdU1iUWdEVnhkNjV5R202dmgzV0xNdFJmMGxfVzVCS0VLcm8zaHhnVjVkZEIyTEJTZWUtNWxzWk1ZZVJucnFlWlNKTWlKNGswMExFNTA1aVk3LU84VG0tcmh2RktULTlqalZIOWs4WEZaZVdtbTBkaGptb3JaanBNSE5TNnltRUYtVHJ2R2dTaDAyOWhHdU9raTNMQi1TMmNlOVdIaUFKS2YxTnZPVU1CRENCdDB4NmFyT0FQNEFaRWpDY0pudUhIaWt1YWNQemM2T1NOazZ2NmVyX0xlVGs0cnBGM09vRGF0eEtVWl9yUFVReTBoazdxQTJmZ3FVajFlRUQxYm9oOU9lU2VmZEVVeXE3S2NsSS0zZHg1YTlWMThLdjVScm81WE40TGNKYXpXSTM2ZnlkelczeUZ5bHNxYVJaQ29ydXJvMVY0MGZZc1pDelZQTFZuNXc2T3ZzRVpDc0l4VC1ZNWNvYmJ3cnpiRjNJU282ZmtrRjJYSjJHeW9zdjlybEdKUHU2ZF9GV0RnaXU3aFBpaFBhOVZVbzJqTjI2bU1ISmtzMzNFS2o0U2hzaXptTjU1RThzeVBSUzVsY0o3ajRnRHdCRVZyM191clNCaFg0UE4wY0JXb3FJY09DVGVRb3hrMFRuY1ctZ0dvdHg0bWJFWGRFcTJwNjBVdVBBZUJkbEUzQy1DWm4wempKV3J0UFJ2SGlwOWpxOXBMWG1mb1VkbDdIUnVheVRHYmxHY1NISG9BX2h6ZnMtU0tldWVaM1R3eElRa1BnTm51bTRMSTFlSFZheDZuTWNVOC1vZjJjWW95SHRVVHdLbDEwRkNSRnpXLWZWeGR3cERtT0l1cEtKeFFQb0l5N0o4dU5iaGlLMnp1cXVCTUwwbzdhNVhkS3RJd25oQ0RsaFFEdFF0dml0ZERmZEdEX1lMdUJtMEJobzBUZlBPQWRXellRRzZ5TG5lTWtkTWYzd2R4MC10SjVPbVNDN0lyU0pTMGE4N1luMFVMaFV2VnZSV3MtVVlleHRnSzVQdFhvcEZLaXdRbFhZV2ZsNndFQmIzZ3FWN2tLYUlveDlrRFZuWldCUVJvTHNjWWtBUWwteHNnaHJxdWItZnBBdlBpaWg3ZjJyUk5ydV9pVHJzemdMY05wWTFrMWRLaER3cU96WDdqVVM4bnNxWjA2NXhtZzZEaHNsZkVvU1U1QkNEOFZxck52N29oYm84NXo4dWZJcldBQWhUY3FycEFSLThRS2FhLWtrbllfRTMzWm1reXBLRl9kbjNuY21vWFpTeDkyUFRoaXhTZnE3N2FGUWlsYU5EREZnM0FxRm9mYU1NMTRvMzM5MDVjUE4tTF9BQTNhTEdzaUJmcE9reTdxWVhyZWI2cElBcVAtOTc3OWlYdnM5T2tueU5OTnVkQXhPcGhsc3JGNzZNV1VnZ0hfbjVheTVCVGVWaVBsdEFRX21lbEtpM3UxUkFVSDNXd2FkX29vd1ZzR0NjREh3REg4R0JndXhsWTFXZ3F3elBPVnJjdUIxbF9wQ0YyQWplWWVtT1hnN3lYenlmSHE1X0l0Vk9CNlBCTngwN3ZTWUxZYUt5VVdUTFl4NWRCem94Y0VONTRDUm9nZ1Yybm81MUw3MkNWYUtTdEJPUHlnTElXQlZiOVZhMHg3WkFsVkQzTTBOVnFJbnBoSVdxVUYzVVd5d2p2Q2Z1X1pFZmpxUlpYOUVyd0tLQ0J3NXFWdUtXUWMwaUxrazg5U3liM1FndWZ1WEQ5N01FOEFjV25mc1h0SWRkbnFkOTBsX2VFYlR3XzhsTTlycnZkOHB2OTJQRmJUcFlkVlFNOWx2azBWbmliaGo2NS1jSlpvSEs0UjBIb1hPTlhaWlpJQWViUEVDRVlvVUtIUFlNT09nWHppNWdETFZFVTdMdTZuRDlIMWE4Sjlab0xIWGdZZkQ4NXV4S0pRVkR5cFNIY2VrSlRacm40dHZTLVlRejd0MFREeHRpTENOTHVNb0RnbnJ4LW5DWmItRFNyNGt1NVhkTnFaVWFWdWVqaXVSUEU0TmFCV3owSlRNdEg5UUVhbTFkYzRYUDVMMVRCemtYdlBLMlV3dDEwc3ExWjlHdTlkMk1VOGpKcl91REtSRWU5YmlhRmtBSHZfTzk5V0RWVjJ1UUo1RlhLM25uOXhIbU9OcER4RlpXUWc1LUdSLWh0QlMxYTBlMnd4MFQwcTFOUXI2S3dNR3FGcDFOTkJ0cUc5UnNFTHJ4Uk1hMmUxVzlkMU9ydE5DdGlNQmRRdnJ3c0x5Y1BST25rcHRPTXk5YWlEakdPSDZPSW1BY2FQbUNaREFUMUh4V25MTndYTjQ3ejhVQTQ3QU1xX193LVU0eGh6a2NDbGpPSnVHOTVFeUZBOVhDM3hvVHF0Y0YyQ3lLVGdGT2RRLWxKSmJpMDZzSzZWNVhCUnIyUHpqcGtiZldsYjVhcHM0NjVnd1JKemhtVjVHTGo4Q1dLTlhZcHBGN0trdUlBZjMtaEE0aWh4TTVkZkNSUVF6aXB5STdWQjJIMDVBLTZiZW03Yl9hbTJIZjJnY2xEODJMWk41eGFNNHhscGVkODFIMmFZcjlhbDBTNFlxNHFnbEhqaEdVTklFWkswWXUxX2VOX3JadjhEMFo2aGdiRTZCNnAtZ0p4SktCcGhXc0tYYmtTZEhVU2ZuWDdPaWs0NW9LT2ZoZGdDQjUwRFprSE5JZXNuWUhMVm4xNTl5ZEVodmJiMlVRU0RWMzVuZUlvSF9WRVhWRlRpVGxaTEVlWHVWRzIzeXVyOE40cWFnbGpCTzY4NDhJQ0Y1N19rUUQ5VlV2eW5KVm9xU2hvb2tpeHo0OUxXaFQwbFBuMndQWEhLZkpkc3NxT0M2ZXpHaGQxMXlfNHBTUkhfUTUzUFZFZFpUUDk2aV9xbk54OFFTUHpyRGh5WUVVWEM4TjdFQ0RZNDR0c2lqU25PSDZoV0FaYTJUVW5qOGo3UG5nN19iaEtoZjJIV2ZUOW9jYzVsekZqLTV4N1ktdHh6bl91YkpWZ0RkSzBwcFFZRlQ1SVVPQVBiRzdGTDc0MnJtd1ljVHlma2U1ZTVpUjdEQkpZeVpEMHJJTEVnME1qZm42OU9wT1EzZ0VnV1p6ZWdMUUUtaElENDlPS2lYc1hEWkoyZGhRQm5nNVJGSWR0cFZaNXk0SGFmT0FOYzJFUVJtb2dRZWdvS0RZTDdWNnk1WGcwYzZVNTlxd1RKTzNwdjVYdDE4Nkg5TVdvbmRZWGVwR0hwLVJZU0NjdGtzaFBiSHdnZ1NOeG5ZVHU4b3dQeWdHUDBvSzJfMUNBcmRfczZXX0E0QWUwMjJIQThNSVg4eFlOSjZrUl9qQ0lSTWVKNzFQM0tTaURsV2FRdThjOXFwZVpoZ0J6WXpKZ1pDYnZiNEhvYjAtZXJzZ1JueklJRWdaZ0F5dnVLT3lWN2RfNmF0VC1HNGNyNlFYMThPb3FIeTgzSGg4elpDcUItZWJsbWRPQm5vdFZJS2F0dWVlOWpMX3k0U2t5cWhycVFpWGY2akhlQ0hSenFzZjgyRkc1S1dMWmx5MjVXRDdIZ2xlWWh1WUZ2c0dzS3QxaUctVVFPOTY2V2c2TTZoYjNpaEcybm1JN21WWDNTTTdnZ2FZYWtUYXh6TzE2cWgtSGlDU3BuVGFHekRRVWZreGNIR3Noa2tEbTNoVHFqVmRtMWVGZVdZWi1qY3RNVDRDLXAwNnFuLTRrUW5hdHFvdUYtaE0zbkpXTWVDQmpTWWlTeWdZZ3pjWkUyRnpUSnpSRk0zVmJsYkJqbnlHVUVhWmxjdVJLV2s1LS1YWEd6V2dBR196cWwxSXllekNmS3c0ai01TjZveHRGYlowM0pnS3pzMlladHZPQ1c5YXMwQlBBV1oyY3RqVlBVUmNGUVZmaW9kRkJTRnJCRTBUVF9MOW83LUhkS3dPb1VyR1Bsd2ZEWmpXTFFQLUVqYjlTRTlZa2dRTUc4X053YWJyMjZkVE9QRlp0bmNHLXhLU0hEMkZSQ2x4SUJWdUs2RkJUd2tEdHBDZnlIZmdYbkEyWWpvT3pSMG0zU2Y0cWJkdU40cUd4YjJHakNTbWdHd0ZqUWZ1bW82c2tjQndjRUhhNUNSZVZQMmpxM1YyYVkxY0dHM0R4RjE2a1EwQ1VCeUdWRkgwSHF2NF9fRjBkMmJoNUJ6OWpqeDA1SmFQUnRVMXNlSGlIdlBybFRhWnJETWd2UE5zZDBocm5uR3pOdERmYU5KdnNQbDhTVUxxNlVBQkVnZEVobkhjeUk2dzlYRzZZUF9GMXJ3LVVZVXJzTXhfMXFkWmZ2UW9MSlNkN3ZJeVVYWUkxU2pHZGw1RWlxLVRyTkw3ZTZUY1g5Q3JfWjliMTN3VmRINHFpd0psWkFKamI3alhmWnNRanctUWRldmhGRVQtNlA5MHJKTFluZmNIU3dnYmRVcjdIV3p2WndRYlBzanRjdzMtek50TTAxckxpbXVEakxvdGxIWHZ0cTBrZ3UyYmNWM2RHQUlYMTd6ZjhGOGV3bVF2amxyWVV3RzZtWFM4TExzQW8xY1ppVlFRMTU0ZFl3M3p2enpQQ2pJa3dLN2xvbG1Cd21YNUo0X2pIby1oYzhCckJHLS1FS2ZfQWN0emJmUVJNN2JUMnJEbVdLa2NxZVVCZDBqVlBPeGZ2VzE4emlMOUprRm1wUzJZZjQ2SkJGVEtPQkNxQ0tlamEtQ2lxOWlsX3BCMXVybnV4b2xLeDY5YW5jOUJXeDBSdUp6ZnF3R2FTa1Zua0VHakF2MzNYQVVNMUxteERFVGJWbHVJT1ZCTEloN2dITzMyWUl1UHlScG9kV2M0U2ZveGZPNVZDejNHbHJUZElRaG91YjNfZG9nN0ItaE9RWFpsYlNjNXdUYjlWYXRGalZ6dUFDOVB5OUM2Tmc0eFRfenZ4MllGY0ZBS0g3am5CVUJUNlN6RC0zdV95SnAxbXFvcEhaRVA4QURKa3ktQU4tMUtYd0FZeVlFakZpaE9hYTc5d3pGbWN1d2t3aDdBRmFlUDk5ZThhWkZEa2xOd0FKN0tMeUFFTlJDRlNLT2Vvb1JQMGhrekhOVTRiZFdFQWxySUlxdHFPXy1TUlBoc2YxRTNpUFlURXJMQUJRMlcxdEVvSUE2RG11N0dTdjJFTG5RQ1BuOGNxZEZZSXlnbDl3N0M0b2hSc3BWdDlMUW1KTmwzei0tc2dyMHFpNng4dmV1blpMd0Rtcm0teDh6TzZYc2dhdXQybHh1a3g4RmUzVFlvLjBXUl9xc09VanBBcktqMkZhSmQ3dHZGWXQ3aXItZ1g2RXdQSmZwT1F0d1U"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '64912b8c-a7f7-4def-a1e9-a1f608096318',
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
  'Tue, 16 Feb 2021 18:21:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRXFFZndwM05fNTRkM09SVmhaZmtVMlNfMDlHZklvMmlHNHVfVFF2ZzBzZXQtUEExUEdpUUR2T09lNTk4LXFFZUxJWXRXeDVUcjZWQjJxOUdzTHRtbElBM1hhQXdNNXZJVmpSOUEtemYyUERWc2VRb3pWUGVweUxfLVVWLUdYZ21vSnFxVDFfN0ZuZXFFWXg0ZjZweXhCaWdBRTFhSG9qLWxhRWZJM2x2d0dWREJrbXNKQ1ZQNHJ1V0VCQ2R2Ump2UG1sTzdwZGt5ZXdPRE55Qk5rdmlxckl4UFBQZ0x4N2p2X1dVUmJnVDF2MERRQlJUQUpHRWFGTjdjZlZTd05QWGtwa3dIYXlCMHk3X0hTVzhCSTc4Q1JvWno0Z2JUUk5mRUwtWEUzeDZxYTUzRHpPMDB1MENTbnBJSUN3OVZwZU1SUVpIVkF6eGs1aUROSzJZNVlZQkRRLlNvd3ByemNocThkYnhLMXFreFFrZFEuMWxyQW9ZcUdPejBJVmZEeVJ2Y3Y1VWc5bHZWbDdRUHZXTHlNWkViS19wY1UzeGdjMjNoMDFJdm9uWFlCTTRzNExhTkNlNGdQYmQzWG5TQzl1dWpUVDQzR1hXYU9OQ0JTQmRidVZYR0VnejN2aTN6N3ZIU21mSElMbmI5QmVCT3JfSGxMejVFMTB4dHZ2YXdZMlkzQk43b1h4NllTVGRJR2lKY2xYdWdDcHg1WEt4LUtab1FRNHo3Z1Y4SEpUYTN1aVpoSUxPclE0V0Y2X0hNQUVXSWtMQnRyS0dXYWkwMmlFNkpubFB0SkpWOXdRdElpcVg1Z2NVRUFNdEo4YUc0NXl3MDVZYmNBdXZSam1tNThNQ0ZXVWRDY1F5SXM3SjRZNFRNQnJlZS1aUEJ0cWNOczQ0bUFyYzVlckdTcGJ2Q051bWtJWGtmYlJCeDBCRVo2c0VhVEhDOTFaTjdDa0dzdVVPTkQwQ2xmRjFDd01rZjVZTG5vSVZjMXRPck1QajV1YWQwTnBaRFFjZmZxRWJReWROUUpXSzh1VlJIb2dyZ29sZlZfeGJBYTZ0ZEE0b2dUVWRFZmVYT0IweFVFdkJaTVNIaXBOWkhhVWE0WnJ1RU1MTldielRmMHI4WHpqbURfQTZTQ290cEZLMlNXeFRIRG9sRkNJNVF3Z19SVmlrU0FBMTZvNjRJRjZYaUFvVWpKZ1FQQzJFbGljeS1KVUJ2WWJRX25rdGpfV3BSMmFNYU8ydnhpT0o3T1FLaV9qdHFkdTI1SVFXbzlmYW8zTzF3WHByMGRQdXpHNEdUdEZEbDJhajhLZEw2TV9EMjd5X3VRQUFZdUZ5Z0t1ckpYUGlaY0Y4dlQ2Z1FHbXd6b2Nta3AxbnRVanExdk1YUDR3LS0yZTRtYWRET01jekZQbm42Ui1CbFZqYzZYZEN4SlBPa1laTzJUUUVjQTZSQ3ViYzJCbEYzZHBUV1p5MjFtR3VwZ05LdElOdldsMjZDSm8zRnIyUmh3bzBJd0xhSUMxOC10cld6dVhOT0Y5UzBEdEdrandTcGs1ZzJnMDlWbWc2bWJYcGV0WGRBYVJhRjAwNUFiQWx4S0tYWnNVd29ZNnBHdGt6NjRnbkk1UHdWc2F4cUl1SzhqMmhmckxFa25Nak9VSEtlVVZabjNubDN3a0hsYUdCN0NxN2VBY3pBMzBCNUUzSWt4NFM4N3pOXy1raHk3OEEzMGUyWFVmdlo2MV9jQkhfdUVXM0p1YWdVUTlVVTQ2SU41YjBuTjZfUEZPLW9TNW5LbkJucm03bC0wQ1BmdFdma0JlclZtSUZiTE84Uld5bVNFX1ZNNFJFa1NwSHlDR0pZMnhzbWZIUEtFMFBUSEdXZHJVVm9XaGE5RGhLeDlFejRBX0I5ekxaaVpmbEpOdGNEdFctZnFxc1BqN3daMVNWV1dvME42VG5PbllOaGhxS2JsUFFpNEpZMUdaUEVsd1VhaU9mTXBDUndHWU1MSnVfd1d3T2hEazhYV1ZVMzdRT21CbnNOenU4ZWF6WHd0Q2xnaldFeDhfQXNDdElXTVVTeWZ3LXhMYUNvTHNKa0xLektia1o1bkJJaEl6blFOUHdKNHNEZVI3RjNTbE1PZkxPZ0o4QlpmZmtmcmVzYzc4ZG42a1ZoeHdqbmpaODlxRDZUMEZJRDlnOGxvTExPbDlmRUxsajN4V3Y4dzRWOE5zcG5BN0RwdWpIN2RZT3o5M1ZsUERZdGZFUEMySmxlNmp0elc4ZHlkSzJrenVEY2p4Q3JpTnhnQlFWeHY2Y3dUQzJIUjVnRGlGT1Z4dlREUWd0VXRoajR6dHBpS1BuOE5JN1V0RENITzdkQWxLZDB6UWxLMXZaZG5nUGk3MXpqemVRNVhCMXBNaDJqaHNfbVJSTEt6SWNTSHMyelZSdENYT0lrdGJHZzNNYzdCeC1tbk80cklud3U5S1YxeWhKeHlTbkNVQ1VmeWdRZzFRMkZtTEczV0FXNGluZHhUUFFkZlc3cGFnMjRDb3h4em9DbDFoQWdRWnU4NThfRUxLYWhvRmVNVjRlTEhoZ2RZU2EtbkZKX3FiUTlocVh4dlYxLWk3cEZIdDdfY01td213MERJdjZ0dmM1YmZBUk5lZ01ud0l4ZzFMMmdBNDcxLTRKTVhQOHNKNU05b0hXR3FaTUVweHY5VVBBaF9lMnBsSEV5RFg5dXRkWW1UUjk3SmVLMk1KdTV0ZmxvdmMwUXkwRGR1dHJud29sTHJoSUJGcmZRVGU2T0F3V3I3TC1JU09peUJUOE85bnNaQWZFamhNT2psNjRfQWFSMEhRM2RJWGtyYm9FUUVWUVl1dGRRaUVLMnIxaEFvWFk5UUR2WTJhN2llakhGVHpVRUpnakFyazAxSl8wOVF1bVBmMXZGSFZ6LVM2V1VOcmFGTW5UU3hmeTVoblhmMUU3c1NRV3NGdW1YZm9JY2lNQmVnTGZ5c2l1UzNwZENNWGxoaTloV2d5YklHSmE3UnltbGotSklNdzZ5U2Zka0pLRks2YnJ0QUZuTmk2SlZpVHpncUN5QUx1MnhPOU9yaDhKOG5hdkI3N09vY1A0aWdSVklkZ0ZjNUtzOU9VRnItWUdZRm9jekFiSkYyNHRvdDdVOUN0X0lyd1JHUHA0YmdJdFJ0RVJkRUgzU0NNNlR1Z05uYWt4c0VITGYwcW9SeVF2anV2Wi1Mbjg3Y3F0SVNtQXVMQV8xSEhfb0hEeGU5QlNGU0RDcFNObnRVOE9HNzdaVFNGOTZNYkcyOXdxd0VSSURhM01VQnBzbFhVOXd5OXdKSHhnMGxVWkd4NmpsellaM3Jva2o0V0t3czJqQXYwRWV5RWR3bUJIU2Q2aGc4VUZGSHB4dlctOXV6NVJEMVF0VGFBblo5bEd3X2ZrZzJFc01wWHZHQlhqUUl3YlRnU2U5ajhnTWxPLWRMYTZHdDhpUHBFRXdNREpQYmZob1NDYmZuQ2p1d3BlYXNqemNzR0tpZE1CRE5kNktNTnhQbmZrVkl0aFhvUkh0ZVdTRXZRbUdxYXJOaDdPNEZFWU1ESzhueW9hS1d3bnJBYV9hVEh5M3I3ejREVmFFTC1TS0JYdnR1b2hHRHdWalViVUd3Ylg3Vk1RZVRLTmR6bFJmQ2FERUlJaHFydVVkYW80d2paVXJnOXBLSEF1eTRRa0ZHZ0VNa196QjdEY2NDbGpPaXlMcUpFX2N4elVWTHFHQWYzT2F3ZmZlZldXSXM5ZVgyZHRPeHRkSElwZm9fakFGZWx2LTJfRm9FazhqOGdwRUpEWXM4ejZGSlhIVzlLVjlVazhDUVNXRTlWMDNwRGhsNVFmTFdLSTF3Ym5XcHZzQVpYblJPQ1NhanFVem90bDRkT25za3V5RTFLbTU3NVlnZmJ1NDVNd3pRRHdSNW1NN21SSkJyckJ4SDJDNTkwQWR5QkNpd2wwVDIyQUZzWHp3WWZaQ3c5STNMMEszRGtGbThOUVUxendmekMxTHVQU05KQVpJa0lTaEx1Y2k3aGJhakdnNF9SWDZxeURMQm12Um9Hc25IaXFoVzg1Yk51TUpQbVl2TEptNDJqaW1LbGpfR1V1cG9ucWFHZGctVTZ3Z09CTDRONHQ1VFlwNEY3cE1XZTdWeTh0U1hOTXM4UjdyeURjQU9EZEo2S0x0dmV0VTVvYkdOZk1ERC1ZVE1nT3RLNHlGaGVSa1R4dXZ4MmUyRlFsNjFtQmoxMm9zZ3lqMnB4Vm5yZ0k0dFBlWEVhMTA1SlEwMFg4QXNwVkNEY1JwYVF6ZnJaSHR5dXdWNmJoTXlSamtVWDYzNWdlbXpkMXVxeVRYc2V5WmlGSVFGQjJnOTczZXZmNEFNNVJRd1Y2cHIzdm9OdU5Bc1hjWjlqenlQSHlna2ZJOFhCLVVMTHZzQWlxNjVTLThORVdfOVBpWGxfTzF1SGFjTWVmMXJWeVpzeWZfaGw0MHBjbGRzY200YjFHMWVYaElBUjNKX3JpV3N5MXRJcGhITTVyQkFtMVk2YS1GTm9uOEVCWXEyUGJGNnlwbEl1TGFTMUY4Ml82S1VHcDVLN3E2WkFpM1lSSkdyUnhocFVNN2RLVXd5dFNpbFVPMnpwcHRITUNhcUo5VXVoRzI4NGJQUWRnWlZCNEZuOUZ2UnVodUQ4akt4QlNUYmttT1hLREVndERnRjhsRVBmb0llaGp1RURKM0QwNURwVHgwWkJTa1lGNW5qRHFVcG52cW1jRkZfUHhicmpSekhUbno4Q201MkhWZmlGQ1k4TkV5Y1JBaElBc3VsX1dueVlvS0FEVFVlcjFtTFNIYWpGaUkzbWVORFVZVW5Xd3FkRzFWYWFITVREWTVlMk5veGdsdUh6OE50N3RWem1LUERBVkJPaGVJMzBZblpxRzdGMDk3cnpxU05yZ1BvTnVTVHpndkhsT2lRUkctdU1iUWdEVnhkNjV5R202dmgzV0xNdFJmMGxfVzVCS0VLcm8zaHhnVjVkZEIyTEJTZWUtNWxzWk1ZZVJucnFlWlNKTWlKNGswMExFNTA1aVk3LU84VG0tcmh2RktULTlqalZIOWs4WEZaZVdtbTBkaGptb3JaanBNSE5TNnltRUYtVHJ2R2dTaDAyOWhHdU9raTNMQi1TMmNlOVdIaUFKS2YxTnZPVU1CRENCdDB4NmFyT0FQNEFaRWpDY0pudUhIaWt1YWNQemM2T1NOazZ2NmVyX0xlVGs0cnBGM09vRGF0eEtVWl9yUFVReTBoazdxQTJmZ3FVajFlRUQxYm9oOU9lU2VmZEVVeXE3S2NsSS0zZHg1YTlWMThLdjVScm81WE40TGNKYXpXSTM2ZnlkelczeUZ5bHNxYVJaQ29ydXJvMVY0MGZZc1pDelZQTFZuNXc2T3ZzRVpDc0l4VC1ZNWNvYmJ3cnpiRjNJU282ZmtrRjJYSjJHeW9zdjlybEdKUHU2ZF9GV0RnaXU3aFBpaFBhOVZVbzJqTjI2bU1ISmtzMzNFS2o0U2hzaXptTjU1RThzeVBSUzVsY0o3ajRnRHdCRVZyM191clNCaFg0UE4wY0JXb3FJY09DVGVRb3hrMFRuY1ctZ0dvdHg0bWJFWGRFcTJwNjBVdVBBZUJkbEUzQy1DWm4wempKV3J0UFJ2SGlwOWpxOXBMWG1mb1VkbDdIUnVheVRHYmxHY1NISG9BX2h6ZnMtU0tldWVaM1R3eElRa1BnTm51bTRMSTFlSFZheDZuTWNVOC1vZjJjWW95SHRVVHdLbDEwRkNSRnpXLWZWeGR3cERtT0l1cEtKeFFQb0l5N0o4dU5iaGlLMnp1cXVCTUwwbzdhNVhkS3RJd25oQ0RsaFFEdFF0dml0ZERmZEdEX1lMdUJtMEJobzBUZlBPQWRXellRRzZ5TG5lTWtkTWYzd2R4MC10SjVPbVNDN0lyU0pTMGE4N1luMFVMaFV2VnZSV3MtVVlleHRnSzVQdFhvcEZLaXdRbFhZV2ZsNndFQmIzZ3FWN2tLYUlveDlrRFZuWldCUVJvTHNjWWtBUWwteHNnaHJxdWItZnBBdlBpaWg3ZjJyUk5ydV9pVHJzemdMY05wWTFrMWRLaER3cU96WDdqVVM4bnNxWjA2NXhtZzZEaHNsZkVvU1U1QkNEOFZxck52N29oYm84NXo4dWZJcldBQWhUY3FycEFSLThRS2FhLWtrbllfRTMzWm1reXBLRl9kbjNuY21vWFpTeDkyUFRoaXhTZnE3N2FGUWlsYU5EREZnM0FxRm9mYU1NMTRvMzM5MDVjUE4tTF9BQTNhTEdzaUJmcE9reTdxWVhyZWI2cElBcVAtOTc3OWlYdnM5T2tueU5OTnVkQXhPcGhsc3JGNzZNV1VnZ0hfbjVheTVCVGVWaVBsdEFRX21lbEtpM3UxUkFVSDNXd2FkX29vd1ZzR0NjREh3REg4R0JndXhsWTFXZ3F3elBPVnJjdUIxbF9wQ0YyQWplWWVtT1hnN3lYenlmSHE1X0l0Vk9CNlBCTngwN3ZTWUxZYUt5VVdUTFl4NWRCem94Y0VONTRDUm9nZ1Yybm81MUw3MkNWYUtTdEJPUHlnTElXQlZiOVZhMHg3WkFsVkQzTTBOVnFJbnBoSVdxVUYzVVd5d2p2Q2Z1X1pFZmpxUlpYOUVyd0tLQ0J3NXFWdUtXUWMwaUxrazg5U3liM1FndWZ1WEQ5N01FOEFjV25mc1h0SWRkbnFkOTBsX2VFYlR3XzhsTTlycnZkOHB2OTJQRmJUcFlkVlFNOWx2azBWbmliaGo2NS1jSlpvSEs0UjBIb1hPTlhaWlpJQWViUEVDRVlvVUtIUFlNT09nWHppNWdETFZFVTdMdTZuRDlIMWE4Sjlab0xIWGdZZkQ4NXV4S0pRVkR5cFNIY2VrSlRacm40dHZTLVlRejd0MFREeHRpTENOTHVNb0RnbnJ4LW5DWmItRFNyNGt1NVhkTnFaVWFWdWVqaXVSUEU0TmFCV3owSlRNdEg5UUVhbTFkYzRYUDVMMVRCemtYdlBLMlV3dDEwc3ExWjlHdTlkMk1VOGpKcl91REtSRWU5YmlhRmtBSHZfTzk5V0RWVjJ1UUo1RlhLM25uOXhIbU9OcER4RlpXUWc1LUdSLWh0QlMxYTBlMnd4MFQwcTFOUXI2S3dNR3FGcDFOTkJ0cUc5UnNFTHJ4Uk1hMmUxVzlkMU9ydE5DdGlNQmRRdnJ3c0x5Y1BST25rcHRPTXk5YWlEakdPSDZPSW1BY2FQbUNaREFUMUh4V25MTndYTjQ3ejhVQTQ3QU1xX193LVU0eGh6a2NDbGpPSnVHOTVFeUZBOVhDM3hvVHF0Y0YyQ3lLVGdGT2RRLWxKSmJpMDZzSzZWNVhCUnIyUHpqcGtiZldsYjVhcHM0NjVnd1JKemhtVjVHTGo4Q1dLTlhZcHBGN0trdUlBZjMtaEE0aWh4TTVkZkNSUVF6aXB5STdWQjJIMDVBLTZiZW03Yl9hbTJIZjJnY2xEODJMWk41eGFNNHhscGVkODFIMmFZcjlhbDBTNFlxNHFnbEhqaEdVTklFWkswWXUxX2VOX3JadjhEMFo2aGdiRTZCNnAtZ0p4SktCcGhXc0tYYmtTZEhVU2ZuWDdPaWs0NW9LT2ZoZGdDQjUwRFprSE5JZXNuWUhMVm4xNTl5ZEVodmJiMlVRU0RWMzVuZUlvSF9WRVhWRlRpVGxaTEVlWHVWRzIzeXVyOE40cWFnbGpCTzY4NDhJQ0Y1N19rUUQ5VlV2eW5KVm9xU2hvb2tpeHo0OUxXaFQwbFBuMndQWEhLZkpkc3NxT0M2ZXpHaGQxMXlfNHBTUkhfUTUzUFZFZFpUUDk2aV9xbk54OFFTUHpyRGh5WUVVWEM4TjdFQ0RZNDR0c2lqU25PSDZoV0FaYTJUVW5qOGo3UG5nN19iaEtoZjJIV2ZUOW9jYzVsekZqLTV4N1ktdHh6bl91YkpWZ0RkSzBwcFFZRlQ1SVVPQVBiRzdGTDc0MnJtd1ljVHlma2U1ZTVpUjdEQkpZeVpEMHJJTEVnME1qZm42OU9wT1EzZ0VnV1p6ZWdMUUUtaElENDlPS2lYc1hEWkoyZGhRQm5nNVJGSWR0cFZaNXk0SGFmT0FOYzJFUVJtb2dRZWdvS0RZTDdWNnk1WGcwYzZVNTlxd1RKTzNwdjVYdDE4Nkg5TVdvbmRZWGVwR0hwLVJZU0NjdGtzaFBiSHdnZ1NOeG5ZVHU4b3dQeWdHUDBvSzJfMUNBcmRfczZXX0E0QWUwMjJIQThNSVg4eFlOSjZrUl9qQ0lSTWVKNzFQM0tTaURsV2FRdThjOXFwZVpoZ0J6WXpKZ1pDYnZiNEhvYjAtZXJzZ1JueklJRWdaZ0F5dnVLT3lWN2RfNmF0VC1HNGNyNlFYMThPb3FIeTgzSGg4elpDcUItZWJsbWRPQm5vdFZJS2F0dWVlOWpMX3k0U2t5cWhycVFpWGY2akhlQ0hSenFzZjgyRkc1S1dMWmx5MjVXRDdIZ2xlWWh1WUZ2c0dzS3QxaUctVVFPOTY2V2c2TTZoYjNpaEcybm1JN21WWDNTTTdnZ2FZYWtUYXh6TzE2cWgtSGlDU3BuVGFHekRRVWZreGNIR3Noa2tEbTNoVHFqVmRtMWVGZVdZWi1qY3RNVDRDLXAwNnFuLTRrUW5hdHFvdUYtaE0zbkpXTWVDQmpTWWlTeWdZZ3pjWkUyRnpUSnpSRk0zVmJsYkJqbnlHVUVhWmxjdVJLV2s1LS1YWEd6V2dBR196cWwxSXllekNmS3c0ai01TjZveHRGYlowM0pnS3pzMlladHZPQ1c5YXMwQlBBV1oyY3RqVlBVUmNGUVZmaW9kRkJTRnJCRTBUVF9MOW83LUhkS3dPb1VyR1Bsd2ZEWmpXTFFQLUVqYjlTRTlZa2dRTUc4X053YWJyMjZkVE9QRlp0bmNHLXhLU0hEMkZSQ2x4SUJWdUs2RkJUd2tEdHBDZnlIZmdYbkEyWWpvT3pSMG0zU2Y0cWJkdU40cUd4YjJHakNTbWdHd0ZqUWZ1bW82c2tjQndjRUhhNUNSZVZQMmpxM1YyYVkxY0dHM0R4RjE2a1EwQ1VCeUdWRkgwSHF2NF9fRjBkMmJoNUJ6OWpqeDA1SmFQUnRVMXNlSGlIdlBybFRhWnJETWd2UE5zZDBocm5uR3pOdERmYU5KdnNQbDhTVUxxNlVBQkVnZEVobkhjeUk2dzlYRzZZUF9GMXJ3LVVZVXJzTXhfMXFkWmZ2UW9MSlNkN3ZJeVVYWUkxU2pHZGw1RWlxLVRyTkw3ZTZUY1g5Q3JfWjliMTN3VmRINHFpd0psWkFKamI3alhmWnNRanctUWRldmhGRVQtNlA5MHJKTFluZmNIU3dnYmRVcjdIV3p2WndRYlBzanRjdzMtek50TTAxckxpbXVEakxvdGxIWHZ0cTBrZ3UyYmNWM2RHQUlYMTd6ZjhGOGV3bVF2amxyWVV3RzZtWFM4TExzQW8xY1ppVlFRMTU0ZFl3M3p2enpQQ2pJa3dLN2xvbG1Cd21YNUo0X2pIby1oYzhCckJHLS1FS2ZfQWN0emJmUVJNN2JUMnJEbVdLa2NxZVVCZDBqVlBPeGZ2VzE4emlMOUprRm1wUzJZZjQ2SkJGVEtPQkNxQ0tlamEtQ2lxOWlsX3BCMXVybnV4b2xLeDY5YW5jOUJXeDBSdUp6ZnF3R2FTa1Zua0VHakF2MzNYQVVNMUxteERFVGJWbHVJT1ZCTEloN2dITzMyWUl1UHlScG9kV2M0U2ZveGZPNVZDejNHbHJUZElRaG91YjNfZG9nN0ItaE9RWFpsYlNjNXdUYjlWYXRGalZ6dUFDOVB5OUM2Tmc0eFRfenZ4MllGY0ZBS0g3am5CVUJUNlN6RC0zdV95SnAxbXFvcEhaRVA4QURKa3ktQU4tMUtYd0FZeVlFakZpaE9hYTc5d3pGbWN1d2t3aDdBRmFlUDk5ZThhWkZEa2xOd0FKN0tMeUFFTlJDRlNLT2Vvb1JQMGhrekhOVTRiZFdFQWxySUlxdHFPXy1TUlBoc2YxRTNpUFlURXJMQUJRMlcxdEVvSUE2RG11N0dTdjJFTG5RQ1BuOGNxZEZZSXlnbDl3N0M0b2hSc3BWdDlMUW1KTmwzei0tc2dyMHFpNng4dmV1blpMd0Rtcm0teDh6TzZYc2dhdXQybHh1a3g4RmUzVFlvLjBXUl9xc09VanBBcktqMkZhSmQ3dHZGWXQ3aXItZ1g2RXdQSmZwT1F0d1U"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wWJ_q3cAsBTmPhf9YZ1z-60FqxCWrZIWtseGQv6kuklYMJgotCIb0h27p4lGJhPq772nXgYWWt90xZRSB4snYZQ4Bqiak0jK7YumpY1KnFA9uZjggz8DokzK46qoedlAa5QAeG2tO_eKuqywFCnddfDYEtdXmbF9I6vCGAWPIgxuUssLCGQ8OkbjfrvbXNf6d8LBUJAhkNBqVjgijTCAdyq0eoY_5WKMABlZ-pUhqmfuUz2t5HgB8ikg_7mklSVaOxEvU6WSSoBlF0bLH69XNL2g8IqrgUuXk0uyDKHs_qp9_BMA8AaQ3QbB7gZ9Zu8izRtLU2glZklCF8Gz1Lg8pQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499657,"updated":1613499657,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'b287bd1e-682c-4686-bf4b-bd4e8a4b028b',
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
  'Tue, 16 Feb 2021 18:21:16 GMT',
  'Content-Length',
  '743'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1613499676,"scheduledPurgeDate":1614104476,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wWJ_q3cAsBTmPhf9YZ1z-60FqxCWrZIWtseGQv6kuklYMJgotCIb0h27p4lGJhPq772nXgYWWt90xZRSB4snYZQ4Bqiak0jK7YumpY1KnFA9uZjggz8DokzK46qoedlAa5QAeG2tO_eKuqywFCnddfDYEtdXmbF9I6vCGAWPIgxuUssLCGQ8OkbjfrvbXNf6d8LBUJAhkNBqVjgijTCAdyq0eoY_5WKMABlZ-pUhqmfuUz2t5HgB8ikg_7mklSVaOxEvU6WSSoBlF0bLH69XNL2g8IqrgUuXk0uyDKHs_qp9_BMA8AaQ3QbB7gZ9Zu8izRtLU2glZklCF8Gz1Lg8pQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499657,"updated":1613499657,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'd115ffbb-5860-4bb6-8227-d59abb41f563',
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
  'Tue, 16 Feb 2021 18:21:16 GMT',
  'Content-Length',
  '931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3a2a1bd0-bfcf-461c-83ed-0cb01f41437f',
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
  'Tue, 16 Feb 2021 18:21:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1bd2196e-e344-45bb-b1d9-2a2b825b846e',
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
  'Tue, 16 Feb 2021 18:21:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a21bf48b-5bbd-4223-9376-3552783bc023',
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
  'Tue, 16 Feb 2021 18:21:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '780f2565-ecd5-4e3a-9992-f38ebbf6388a',
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
  'Tue, 16 Feb 2021 18:21:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2da61eab-0d73-4982-94ce-f8ba3036530a',
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
  'Tue, 16 Feb 2021 18:21:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '56ef1d9e-669f-443c-ae5e-b4367f957ff8',
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
  'Tue, 16 Feb 2021 18:21:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1613499676,"scheduledPurgeDate":1614104476,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/a54c022c06e9465e8388b32fbb90c4f2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wWJ_q3cAsBTmPhf9YZ1z-60FqxCWrZIWtseGQv6kuklYMJgotCIb0h27p4lGJhPq772nXgYWWt90xZRSB4snYZQ4Bqiak0jK7YumpY1KnFA9uZjggz8DokzK46qoedlAa5QAeG2tO_eKuqywFCnddfDYEtdXmbF9I6vCGAWPIgxuUssLCGQ8OkbjfrvbXNf6d8LBUJAhkNBqVjgijTCAdyq0eoY_5WKMABlZ-pUhqmfuUz2t5HgB8ikg_7mklSVaOxEvU6WSSoBlF0bLH69XNL2g8IqrgUuXk0uyDKHs_qp9_BMA8AaQ3QbB7gZ9Zu8izRtLU2glZklCF8Gz1Lg8pQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499657,"updated":1613499657,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'a206bb38-9727-44df-8386-f0dd4fca4d10',
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
  'Tue, 16 Feb 2021 18:21:27 GMT',
  'Content-Length',
  '931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
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
  'e757c378-a69c-4bc5-b441-2717e83e5d73',
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
  'Tue, 16 Feb 2021 18:21:27 GMT'
]);
