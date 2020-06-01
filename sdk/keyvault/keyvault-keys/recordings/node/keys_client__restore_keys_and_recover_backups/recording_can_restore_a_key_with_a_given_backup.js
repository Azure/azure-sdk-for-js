let nock = require('nock');

module.exports.hash = "08e1be45bb267a02c76dd1050b474ed8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/create')
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
  'e0b3cfe9-0145-4400-ae22-b37aa33b8e1b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:36 GMT'
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
  '3c55a989-3201-49d8-8260-a8047bc08500',
  'x-ms-ests-server',
  '2.1.10656.6 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au4nF91_0k9EjAxackLGWTA_aSJHAQAAAP3qZtYOAAAA; expires=Wed, 01-Jul-2020 12:26:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Mon, 01 Jun 2020 12:26:37 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uqVexb6Fg2l4KL2H5DiRAx4K62LPFwSso4rFkf0mLFaJhAgcXD2kzdf24hF_CwULjGmzxbocpCB-jEOscstqvAELqs4zf5DyOC72hcrxreBncjbI2IjHgEq9v7lIYnySYTaENgUK8a_EHdujoah8B2M20MkazoOTmalICp4DoTZD4KYHsN88VnlDqpUThpzgTbFICApYPqDg-1v23GSQfOLa8chegFv6C4iYdSEjOltpy-YWRsqpjYMKyPuInPIX48oU0trrdAYDkAY4hbcpIRQfp-Tf2SSs89JL7z3T1LUQJt-LNugtx5F-K52kVHMfcSghhzEI8BeNSPSeHVyMLQ","e":"AQAB"},"attributes":{"enabled":true,"created":1591014397,"updated":1591014397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '89d10b2e-c2aa-4d8f-91a1-4fac9a6cca1c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:37 GMT',
  'Content-Length',
  '736'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"}, [
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
  '54e6b567-a25d-43b7-8cfe-8f83023d1c90',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:37 GMT',
  'Content-Length',
  '10379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1591014398,"scheduledPurgeDate":1598790398,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uqVexb6Fg2l4KL2H5DiRAx4K62LPFwSso4rFkf0mLFaJhAgcXD2kzdf24hF_CwULjGmzxbocpCB-jEOscstqvAELqs4zf5DyOC72hcrxreBncjbI2IjHgEq9v7lIYnySYTaENgUK8a_EHdujoah8B2M20MkazoOTmalICp4DoTZD4KYHsN88VnlDqpUThpzgTbFICApYPqDg-1v23GSQfOLa8chegFv6C4iYdSEjOltpy-YWRsqpjYMKyPuInPIX48oU0trrdAYDkAY4hbcpIRQfp-Tf2SSs89JL7z3T1LUQJt-LNugtx5F-K52kVHMfcSghhzEI8BeNSPSeHVyMLQ","e":"AQAB"},"attributes":{"enabled":true,"created":1591014397,"updated":1591014397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '1aa5e8c7-2f02-4ae4-ad4f-80722839159c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:37 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9117da7c-e8d1-40c3-b854-f81eeafb4901',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f9e75f9a-ec41-4e32-a7b3-e633af8538c8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '821c3d33-7bc3-476a-8b6a-4fbabb7f46f8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6beed84c-690e-4f88-b70f-f2b8c92c096f',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '206fb75c-1e4f-4555-81f5-8b2a2af54e5b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '891771f1-7302-45df-b4ba-8ea14c58aca8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1591014398,"scheduledPurgeDate":1598790398,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uqVexb6Fg2l4KL2H5DiRAx4K62LPFwSso4rFkf0mLFaJhAgcXD2kzdf24hF_CwULjGmzxbocpCB-jEOscstqvAELqs4zf5DyOC72hcrxreBncjbI2IjHgEq9v7lIYnySYTaENgUK8a_EHdujoah8B2M20MkazoOTmalICp4DoTZD4KYHsN88VnlDqpUThpzgTbFICApYPqDg-1v23GSQfOLa8chegFv6C4iYdSEjOltpy-YWRsqpjYMKyPuInPIX48oU0trrdAYDkAY4hbcpIRQfp-Tf2SSs89JL7z3T1LUQJt-LNugtx5F-K52kVHMfcSghhzEI8BeNSPSeHVyMLQ","e":"AQAB"},"attributes":{"enabled":true,"created":1591014397,"updated":1591014397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '0873259c-bb0b-4a1f-8538-38f6629b94f4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:47 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  '97b33df6-cfba-43c9-9744-f6d8100af9d7',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242 - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ec91628f-a8ed-4768-af1b-a4b338f7109f',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242 - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a5d2691a-6ed3-49f8-95cc-c1bcfc1e747a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242 - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3608bbd6-7de8-4a94-b958-a88b930e59f4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242 - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b3ce5901-b807-4b13-a631-9a3e7b0c0ba4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242 - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e32ba904-c20f-4938-89e5-5de6923c16c5',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242 - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd2714d76-b95c-4551-86b5-635fc317d6b8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242 - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '168c7765-c47b-4f4e-8bc8-0afbb116b738',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:26:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242 - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '765afaed-fe5e-45ba-a87a-82daf9d6d486',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242 - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '80a00394-790e-41ce-8252-cd41bd982d8e',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLnFacXp2eTBiY3N4Si1pbDBVMDBObTJvaDBYNzNtcFNWOTF3bklOX3lwbUxFZS1od2FmV0c4T3Jhc093b09Tc0xxNnRTQVp0RURhZktDOG1faEVBeWxtZ0h5Unp2eDdKTDdhSUF3UldDYW9Zcm40aGxzMU1qRGV3dGswUm1xM2QtU21kZkpVNFZadkxWNlRudkw5QWJjYUp5Y2hlUjVYd19hR2NOdlY1dFBmeThoc0d6WkhSTGVVYzBTVkhpeFp5N3ZfOHQ0ZnV2aE1yR3dCMERIVzE3d3lXbDhxYjZaalN5N1ZWVTdoaXNZVUphZTRfRkVMb1F5dWRkWDJLSkt2RlozLVFyTm1ZdnpmVG9FOEF6X3F0WlhMRHBpY09mS0VrR0ZPckx2LWJzNGZ3WEUtX0hJRmdCMWJ0bGZsaFhGSGJYVjdBeF96eUhZSzF0TnlSbmg0aGJwUS5uX2VfVzQ3OWxNSnRYcmMySjRlM2tnLjUzUDQxOXdNcUZVdGpiV2pvVUJjMGN0OHJ0VWdhVEJCZlZzTGJPRnUtLVV0TTNJOFJCMERWSjBNY3ZtRlhXNWRHcHNzdkcxNlV5WDJCV0tVeUduLXVqWE1CMnRRcDVJRkVDVUF4SXV2MHhsLW1IcTYwVDRzaXhUd3lGNEZ2SUJJMHJIV1FyNUdQSUpRRkpGcmRTOXBfcFFKa1ZWRFlkR0ljTUtjS01EZGxVbTRLVHFVejk1QnJkYmFQZWJPV2plVVV6ekFtQ2lGb210aFJ6cm5yb2J5bkdsWjZVMHRteFNRNnZydDU1dGVnR240d1E3SzBEbHFKN3poUEx0RW1KZ0RBbDN4QUY3Q0ozYTNrWmw0RU13Y04wQjNndWU3akZUMVFORnU3alV5bkFoSVBnNzI2T0hzV1o5bU0tOWNfQ3ZxamlEc29WbjZKdndjY01nZ2lrNFpwNUxIajJvQUNrXzc5dWxMcWVYWll2UHpRc0JqbnNNVmFBeTJ6TUZLNmJCLWxRV05xRHBXZEQ1SnZpSTlicXlTWkNKbXVuUzBRSWpSczlmMVlWM0t3N1FObUZHUVhhakhjSWl5MS1peG9xSmdmNzlVUGZVUmRNTXNjUnppbkFXVzhTT1RrdFVXSTRHSElKNFo4NHRPaXRJQVFkZkl4VW9DM0d4Q1lzZXRYWU82LTAzME5qMEpSOWdpaF9wQ0VFeG1wMFZZS0pERUtvTklma3JMcTZaeWNrR1piZEg0SVdWYmE2bFRBMFgyYzBCZHFGZnlIWkRPMHFkSU9oRzFIU1dZVC14VjJGRkVaWFIxcnNGT0RSM1V0ckZETFJuZjRiRnpHcVFQMEk4dW1rTm8wV2d3a1RFcTJaamtHUVNBNE9BelFDUXNsMzdOOWtxQ3FQeEFJSThwWmxMc0pza0RNc2lkRnhIM3NwTExManRCNUNEdXRGeHhDRm5MWW1yMVlCdnV4SlVLVUNQTEo4a0hzUS1qRHBmTDJvTjdRbktrQ0FHXzNFQjl3UmI5NWFHLU1NSTAxTkxvb2pzMFZ2b00wOExXQ1hjbHctVzZjTHRVV19OMmJVTUF1U095RkV1YVFoRjRDbzYwSVJYLUVHcVkzYnk4S0F2SThSTlZBaEM5ZFZkVWVnbV92Z0FQMjRKZm1YUmZTXzFZMlZpdGJzcDZDcnhwX2hUalRYT1BDcThlWTlwX0RXOHprZm1reDMxUFIzbzN1SVJJTWZENmotVWxuV3o2MEZ3SzNfUkExWFQ3OU92UDN6UGhqTnQyaHh1bHl3blRYUzVnMmJEWTJJNm52c0U2VnY5QXRqNElILUM1dVc3eUNNVXYzeU91cnpyUlAzeVFMLWpwaDZHUVNuLWlmb2NHN0pIVkpFM0paaFRrMm5ic3RSbFZZbXlkSUM1QkllVk9SVkFqWTQxTnZOanBVVFhBMzF6UXE4YV8xQnVIRnp3Z0NpdlB0RkdIQl9hZkFEdk5NeVhlWXVaVUVfa2MtZkU1UXI3T2M5SmdIazRkZW1KTVpWcHdHdzBsWXpjdFhyQ19mOGJuRDBOMzI0V2tWTGlCXzAyZnBSd1FNY29Wb210elV6dUJKQ2ZfNUx6cm5vSnhVdWlQRzgxZE5NbnB0Smo3ZmtRZW9zY1RfV0ZvYTVhVk9WT0FjMkZWeWlWLXoxUl9mcVluRnJ2V0xHQlZlYUxSZU9STFZnMXpJdEZSSHBBdHF1QnJTS0R4U0FHZS1lMzhXNEphVzFDMGtiOFA4QmI3QXdOSFY3RkxKQi1PRmRtMThZcXNQUTV6MV9LSkhlS2tnVGVfVDk2enpEcTE4R19FNHVDTXREd1JGN05PM3hJYWF5MTVENDM2MHNZYmhFX1RUMXNVYWotTjdyeU04UU9veFhqeVJQa1VrTUlOOUxCb1BpWE1GTmNJRlI2eHdKUmdOeVhVQ3JNMF9qTTMtWWkzYi1qM216VG43QllMX3B3NVBubTk5NThOYnk0RGc1c1p5bmFHYXhzTUhjaUV0VTA3ZFBIMGR3b3pod3hJR1RXNENSeFdsLUFRRFRWb01xWVJXT010dmdfazVqNzRFZDRwVXlpUnFTSXhQTkJ1VXgtWWRlQ2NBaFlwZTA4anZhaVowcENxWE53cV9MSk1zR2RzbGxLZnJscVo0bmI4S3RxdGRNZFhWd0lCbEw0UF96TEtuWlI4ZkJnYVlpUTg3OVp4a0dVdGE4ckMweHdjVWxYNDZBV0N6bHZiUWR0ZFU1SGNvX0NSa3BSNi16SnNDYlIyc0toZkxKdTY2WjNaVDk2V001Q3FDNUhUS0lYR0UzcklXLVkzeWhRbGhiRG5ZU0JUMmp5MlRaMmt0akpqTER4OFVkV0VhckFLZno5R2RoUXhVUWlUbFVzSWVMT1ZYc2FvRnpZT0RGR3ZaTG1kc09fN2h4RHpibTkySDFFWXZ5WXZ1RzEzbXlxWmMtOHlCaE83aWlrVUEwTHFQNUQ4bEJaeHJRQ2x0aFRxSmdwbVpTRVpkeGdKM3lBaXh0WVRTcHcyWXBRTjFSSUxxSkw0am5fdWlmeGxJakcwZmstR1pSbzZvZGpFT0JKWXVhc3FGZk5Jd0V4THItWEZUSFpuUXNZbjEzSXYxbTBvNWRjc2FCOEg2ZWk1d1o2c21BYkZQQndmektTWjV2Y0tuMFpxaG9sZUljRDRFZ3RocGdHd21HRVRDVmJTT2wyV3hORHpnU2w5TGdKb0NjYzlVZkstRVdQaVdPbDgwNVJhTjJtb0dEVk42SGxJbWd3RVdIVEU3Rms2RHNWNVFDM09ZUTAxakI2SHJUSng0UzZhMXJrRVNJc2VBNjMxLW9iX3d6SkpEOHY1ZlV2bkRQN1ZVLWdYbUdoV2t3UGdraUMxaTBHcW5md0JMenZKa2RKd1ViQnlnSVV6bXJoRU96b29qZHNXRjdzVmpKZVVFbkVtdHNJRTA5ejFqVHRNYlFpU3QzMk1GU0ZESjNmbzEzNUNqYkgtSml3X19SN3ZZblB4aGtzMk1nMnlsUTlUYlp6OE92REpnWDA5TXh1Nkc5N2V5eC1mQ1lFWEUxV2JwOUtFYVRwOThTSEUzQTBXNlliY1cxdXFoYjlYUnRHamNGT1hSRm1pSVd5ZUlNMVpDNWFpRFBiWWFUUHJHOFBiY1lNTG5JVzNJbDRwZHhaTk9CWjJoRnVkWUUtQTVxQ1JvS2E0T0EzNjlESmduWDlLMWVwcU5sNnVhWkZsc1YxOG5nOEEtRS1xVHA4V1V2LVg3aVd3aWNJb3dXZlBpd2JGVU4zOHBQTUl3bVh2cWd2aHl1M2cxUm9OU3pZZ0lpczk5RDlzTEF1bl9fS2RzTS1PMDNSUy1KY1EwQlNDa1VLM3JZS2hBQVk4N3hCVmxZQ2NJUDMwdkdUQ0RkN3YyMVpQNHhpVG9SckFjTzFTSWZNOGxiZGRsWWljS1RMUzVyV09QMVZBY3ZvM1p4S3RoLXdFT0NtUEw0cm5jM05SWTc3NGxsbzNjTFNYTzU2MWNiQk5uN2ZnNERfR3ZVekJWdlZfNXJSOFZDQ0FZbnZKbWRkYkk4UV9vaURIakZVOFA3My1PYXBCbTJmSHR0a2VMbzNWWTUzQUNVd0ZmT2RlcFNpeExvbTF4ZTVWc0E0TU1pRFowejU2VTNQbjlGYUU4UXJGVGxYeWdHMW90RGhzeTUxOXBfWk56MXJMOGx1Q0txUDB6aXdSdTRRb0NzejUwdFR2M1A3MXdDbEwyLWJybjUzNHV0Y3drc1J1cEpydWtQOWJiZ01CRjhheERrWUFNQ2RoZ3EwT21rQ3NFRURKaktmUUw2MWMzbldnOS1yUWVuRUJySVFtaWRkX1ZjS2JndGpmaXFZcUd0cjBSeVFrREI1Yzh3T0dHOF9hR3o5SFVQMnNlTWdMajg4THRabDNHOWlmb2Z1ekZrd2tJX3JqMFlEbnc5YXV1RkhiWGVaZlRkTE1BTjFvYzJOMlpGdkhxRmlQQjExZGZLWHVONUNYWkhXWGZyLWx6dGZuOVdMcThLUS1jbWR3Z29GUHVmVG1HWTVybWpVeDJkcHFSb0JtUjktYlZHN0NiY1hjMFZoTmZaQ3d2VkRjdlZzdmRnRjhxYUhNV01UQzlQVTcxcVIxUTJ1OUstSmJ3QVJrLW53X0UzR05FMXNLcUU4OVNkd3lLajlvdkVwVlZoV013NkM4dE1pMkl5TFYwVGV3cUhSZmEzbnhlekFkYTEzaklQRTQyVnpCZi01MXRGVXhLV0k0c2pwQ1NUVE9DQlVITF9vMUk3RzUybWpLbGdSS3VWb3I5LUYwdVE2RkNLZ0Z0VURzYVFQbjFfd3VBbUhRZnRBQ25UMnpISGMyc2xwbGd2UERoWjg1cnAzMXk3cHQzaWZFXy0wNVpzbFhnc3M5LWRpT2xhbkNQUGJQanBYRkwxVTh6RlZnQ3ZfU0QtWTVvVzF2NkVQeVJiMXE5SWN3b09iakhUQjJlZnlSRVRmVWNMYnN3Wm0wTmEzVmxMMXFLUjJjd0ZrM3hlY2ZwdVRLOEUtUE5OWWRTc0loVWtZMVhWcXVWd2psS2hOX1lOdHBKbzd3WV9GVDg2WC1XcEZKLUZVckFfR200VFBBQlV3ZW0wckpPcjBLRnM4MzFtVW1uRmNGVWFaTUpiMFI5WEttYlU3bjJFY3hLQlhZRl84cm81M3ExMUp3MXRWelg1Z3hKcm03OS1FcHZuX1V4X2kzMjRjUldNM2JfVFdNenpqOGk0YTkzZWNWd0U2QkJuU2FyNzhWenlFVnZvS3M3UFpiOVlWYndFbUtXWnQ4MEFONkdzTDdjNVJFcVM4QVp0djY1R1ZIN2NrUUNyR0xnbVFlWlZPZjhnbWRfa0U3RGdBQWQzUGxsMWRWZzZROWRQZElKRkNCbHFsLUI5UWZqeWo5M0kyeURCUTE5ai1UbHhXM05FNzRxSXNxV3RJbmJ4UVVmTUNzSHY1MXJNeFE3bnNxYm5PWlNkMklTR3c5ZXNDVEl6dkxCUUZuQnB6dnNkR1pULUplbHA3MU9aZFhZOTFILVFRRFVpZDV1WUluRWxyNDlJYWUxMERPc0hvcHZKeTFaTDlxT0NmWXlmc3VFWmZjQ1NyeXA5eTJVcWRVdDJ0V1ZnN282LW5uaDlfUE55eEFUQl9RZEVXeVpNaGQyeUlLblRJQnhJX09UNWxFN2NvekpTa2tVcXZkekpaVFMxbUN0cUdJVkJJZ2EwZ0htM3g5R1VkYkRKTC1QRUhDTXljekl3MGJNMDY0UG5OWEctdk1lalBtUDFLZ0lTU2lqVEJfUlc3dm0xRU5vR3kxRF9hWVprSDgyNHJMVjROWk9Ea0NfZWxJc2p5dklYdW5vZkN2Wk5KYTl5ZlUyQ3daRUp2cWs1QXkzcnJUTUQtcVRMYVloVjRmTE5GTE1pWktiUzE3eUxxTXVQSUJ5RlhrcTh3aGdtZVRiM251cnNtUGx6dmdhYmFBYkwzSmVITDlpOXczdTZxQXdEVVBzbXpNQlZYOW5GZGZObnJ1eklaVG9MeVIxNkwwcnJEWGY4eXdXSVdSUWtLY0JDNTFGSnh3Y29RWnZ0cm5UTThnNzhSeGdLRURNdWhKcEFxLUhuRW5UOHBxLUNCUFpuZHVyUHJEdTZuV0Q3RU1ES2NCUDBGeFptUnZNdERpTEdJNUppa0tiRDFfY0pITnZjTHIyYXBmbnF5bzFYbDJGTXdjR2ZHUmdZYXlsUm9LMWJtTkRqcDFPWWZ0My0zaUZmYl94M1Y1dmhxUEJSOFgyTElwZ0RhSk5Kcm1rNlV2MzQzd2dPX1JvdkJsSW9WRVZXWFB6SHc5OTBsdW5ISFJEOWxkNU5DRVdNVnMzS0l6LU5zMmFpWExGRWVqVFNLcEhja1RxN1hmREQ0YTlOTmJCS2hLYXZ3U0szdE9GTGlVMkV1aW1nWjAwS28xb3FHNUxfQTZ4ZzduYVl4cGxWUFJaaEZncHE0aFR3YXcxaFpfVzg0cGpnZGV5QjJrMXM2ODZXZkVzWGFXb1cwRGRxcFhIdUhoTF9LSUJReWZENURPTUdDZ3M5THdVRmZCSXNiTzhzazBnRWVMZFRXVGFjWGx6bERWU0dSeHRsbUhPWmM0NVE1Y3JRenpVQ1dkOWI0UUF5ZHd1dExPUWg1YXN4MmFGN0RyblZlVmJfTWNIV3lWQ3dZNktRWTExbVR0Vm83RWtrTno2YWRIN3VBZHdMMUI3UmF5R1ktbjc3ODA3X1VHNUI1MHY0NHhlZ2ZmQ2s1cDFtWjh3WXZvTlJuZVlqUy1iME1qVXpGSHBpUFZIdS1GZTVMSmNlSFhpbXpPT2NNbjJxTElXUmc5X21Xckt1dDhodXFydlc5Skhzb3U0YkVqZGZEbGtTQXJZU3VxNmNsUndsQ3BnRFo1N3hrTDR4RTBPUmpnSERKelNEMi1qYWVBSTVhelNSQjVsR0pmelZpclJaMDF6TDhyYWlnNS1QSzdOU3JkTDdJYlBBZHNtZk1rZXVaQkg2T2k3MUlGUmhTZlNGdGs4SkNfb0NMNGRSa1ExNDhUTlgwRHlYUkUwamZrTnBncDRhRGNoYlZzVnBSYnVYc1BWel9jVzRPejd5U3EwOGNqUTJqU3BxYzFiZ2F3UENpYXU5R0IzdEFGRWZHc2M5VExLd3RfRm83cVJOeXIzT001TW1NZk96RjZjT1JBUnJPS09USFBtcjZEcE92Yl9pWTBZaF9kOXd0VDBCU1RnaEtLYTdYYy1pVEZQWWJRZEx2QnRVOG1nUDhNSVJ6dmpjVDl0Y1hRemU2WDNFLVkyV01FaEJzdzcxTGhaTExhaldvb1VfRk1QcV9XNVFjRDlPVDMxSkZfTER1QUNxc0xaV0FzUGt5RWpVRV81MzBtZi16cDNEZVhXYTVPUEZlSTJzRi1XR0VpMVBkMW9VZzNkcXEtSFA4YTB0V2UxUEZjZWdPd21RdUpDQ1Y3YzNISThBVkJxam1BS3d0dlh6RERTZE41bDI5Wkt4Q0JnYkVzbHpQYTB1bDc0ejdhQkZScjhoWUp3T0VwSF84MzZiVWdyN3pvdG1pZ3ZFT0RtVFJQaWZleGVVdVlxeHFMV1dfSkVSYV9XY2hOYlpMeURXclAzVGJkQ040MWFaWjUyTFlxdXZpN2pjSnlFS3VtQkxfM2JKQjIwcmpEVEdRb05WRmZyVl9jVzdCZmdKdjVzeHNsOHFXN2s5bFo3d1ZxeUY0LVVhMk5HWDhRNEZ4dURCMm1nZHBvV0tmVXA0MmZPVTEzM0dBVzI5cUdveU9sOE81VHpXRWNQQlhFT2Eza0FBUUhWbmxnSTdCTWlFUWdVQlFXUHZ2OUtSWWY5bnVpRWwwMTVGZkxIb1ZtMXVwWEZINkZkUjBTNGt0dmFhRmt4amF4S01PNERVU0JIM3pRWHloUUlIWkdrV21XXzdVNTNvNTBPSGdHTG5hUTd1endxcjlaX2Z6U21LZWY2cFdpXzNnbERJcVFEbmhRc09IckFwWVNzZjlDSEc5MTRTcC1MakM0MDdla2J1a0lCdGN2WVVFcEpJWFJ5R01vXzNNcmxMSGF1Nk1vdnhOaEJHT09paUc1UWdJRkRuaU5yaFdYREpPNU15QUxTc3NzVzREMUZwRGMzQ3BFUWxrck43b3V2bEtJRDllSlZtMmxtOGlNTlByQVBJaXViQ1JkQjJZYzBYbmJaMVRNemwyM3V6R3BwMWdxd293WTNUNDdBazFzQTlqZGlGY19Hb0p5N2ZvMUlQYU9ybkg3UzlScXdjZUljYTVUbmRRd012eW15MFp5QjNvNVZiWXhyRmRYLUV5RFNyOTc5THhERGVLV1BFZnpQTHM4Y2VqZEdpV2x6bURhTk1fbF9vNEcwTTJPSnRYY0JkRlEtRXNERDVsWTlDTjM0dUZ5VU9iU3hmOWhfQ0tiUWFXVFp3S0hjeU13LTAzeUxCMDVfVTZxVU9HX081X2JWOTkxdjluSmtOWWRjTC14ZzJBc05LN2F4eVZXM3FKS3l5Q3RLdURnalJhWGYyS0pWMzdrY25jWVNjQl91aHlaRktISjJJa093a0FNTUpnR3ByYklXamJMN0FpNnY3TUhfdU9CVGlqSzlZbVVnc0YxakQ4dV9BNG5pRjVmSFVpTUVaM3dtbmxEM3NZMEllMmFOMUlvZDVqWFg2bzVBNHZxdEFpTHpBeFRvTVZvbVBBZTlsLVBhbm5aMFlRRGstdldxV2cxNzNVLTFTS3lWcmtyU1c2ZW1wdVBqSGxlVkVTQ05wVTBMTjY2dTFRc2pTUm5DeGJTTklVOW1vQmh3elROdEhBNFhDUG40Y01pa25GcVRuNDVueF9zZXhmcV95RWphRWFLNUJsUW4yOGw3alg3VG41RjBPYklmcGFpUDJkVl83eWN5dktuNmFSN1lPTEExNDRBSXlaUy0xY3ppOVhrSEo3LTVUTThYZDNia0RkRFE4b0FWVUhFX1ZWdGkyRnlzNXRrX25VV1Q3eGh2ZXJpczcwZFU1by0tb2hpN3RaUFBuSHFFYmFxeGlSTko3U1pPakVJbU9weVluMmJwWThiSk1JUW93Z08zQmNsRWdCUF9VamRBRHhzZU9DNkI2ZXRJZ0g4ZFE1RkdSN2lja29OMmwzUV9rZ0Q1TklUZTlXMkNIUlg0TDJQZm9SeWt3UHFjcFBKejJoNGxmaVM3UzBJSVo4dVdFcTdpS2EwQnBPRHFVSDFfX0lRSlJnVnlKSkk5TkFMdW92cFJCZy1MWmpkWS00emh3SG9zRWlDZ09aU284eXhLNVNLbExyU0lveTdBOXJaXzRDY3pvWkhMTEFURFZKcEpBdzY5b0lOd3dSOTBjQk9zOUtSX0FSeUhPeXM4UG9pWC1iU3hKT1RscUhJb3JGcS1yQ3p3MjRQR09JZXQ4V0R5Nm5pSWtKTk1weGJPdmVHTzQ1X25mcXRuSXAwNXZFRHpBR0tISEY0ZWJyc01DbE0xbkdudnVFZ0NtSGx0X2pGT2YwZEU2SkotOGMyUWdNLW1ucExQRkYzQ1ZFRHR1My1hbUYzUnFJY21SZS1HbkhjMHR0dTFFSWNTdTZuSjNGVzNtWUpLOTlKV1N1U1pUaER3YmlJWGt6SnUtSjNtYnBCWG9LaG45OHc2TU4xRGtaRUtKQ1J4TTBveVhmbkhRbXppVFJ1TEx0a3VJc3VjR0pRSnZ3QmI5TnltdU0xclI5RUtlVlBkUUU5U2pwTlN2MDNyMmhnX0gzd3NBeUhlanpBeDdDelg0VUtLREdwSXZWd2s3NV95LU1WMmtKblQ0Zi1CeDJKTWVYVmZQSjJhd1RNdERLaF9udkhiLWNRWlhBdmhic2JhbEtVMkpMY2Jqc0hDTmdXbTlkMnJ5aGtYZ0Y2SGdTcDBSM21fM1dBS0RZV1BzcHlURGNnN1FnQUs1QldOemNwcGNJbTZBcTRQOFBCb0tkdlcwT0J4cnlKODdqWmhtX3V6TndkUkRQaXQ3Wi13NWwyZnpCNnpXclk2R3ZDdEMtakdnaVp2Tk9hUWhDZmt2Ukdrekx3VHQ4TkJZck9tX0ppUWJSa2VkMWh1NWdnN0E5bGp0VUZ1ckF2d1FHSFhadzlkQ3BackpIcmloV0E3OGNCTXRUbW1ZZ3p3MTcwTGRMRVZ4RzNaR2F1LkpoeWJxNjVSQzN3bERra3JzbVVHR0E"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uqVexb6Fg2l4KL2H5DiRAx4K62LPFwSso4rFkf0mLFaJhAgcXD2kzdf24hF_CwULjGmzxbocpCB-jEOscstqvAELqs4zf5DyOC72hcrxreBncjbI2IjHgEq9v7lIYnySYTaENgUK8a_EHdujoah8B2M20MkazoOTmalICp4DoTZD4KYHsN88VnlDqpUThpzgTbFICApYPqDg-1v23GSQfOLa8chegFv6C4iYdSEjOltpy-YWRsqpjYMKyPuInPIX48oU0trrdAYDkAY4hbcpIRQfp-Tf2SSs89JL7z3T1LUQJt-LNugtx5F-K52kVHMfcSghhzEI8BeNSPSeHVyMLQ","e":"AQAB"},"attributes":{"enabled":true,"created":1591014397,"updated":1591014397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'db6179a4-9b17-4182-89e1-93fd03bff7ac',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:04 GMT',
  'Content-Length',
  '736'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1591014425,"scheduledPurgeDate":1598790425,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uqVexb6Fg2l4KL2H5DiRAx4K62LPFwSso4rFkf0mLFaJhAgcXD2kzdf24hF_CwULjGmzxbocpCB-jEOscstqvAELqs4zf5DyOC72hcrxreBncjbI2IjHgEq9v7lIYnySYTaENgUK8a_EHdujoah8B2M20MkazoOTmalICp4DoTZD4KYHsN88VnlDqpUThpzgTbFICApYPqDg-1v23GSQfOLa8chegFv6C4iYdSEjOltpy-YWRsqpjYMKyPuInPIX48oU0trrdAYDkAY4hbcpIRQfp-Tf2SSs89JL7z3T1LUQJt-LNugtx5F-K52kVHMfcSghhzEI8BeNSPSeHVyMLQ","e":"AQAB"},"attributes":{"enabled":true,"created":1591014397,"updated":1591014397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '4a5e7b16-971e-436b-a4ef-1eac35688fa0',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:04 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b0c33eb8-9fba-4905-9e67-c6cd4faf0a9d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e1d28974-db5e-47b8-852f-efbac567b150',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '287631c9-24e0-4ce2-80b0-e676173c0dae',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9076d0eb-caea-43f4-af1d-3d36a00fbe1b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bf280d30-3d5a-4788-8703-385960f80189',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e073cf7e-ca84-4559-8236-c9908da09b99',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1591014425,"scheduledPurgeDate":1598790425,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/07b3e7bb9c6f46dc958ca83c5a3b1242","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uqVexb6Fg2l4KL2H5DiRAx4K62LPFwSso4rFkf0mLFaJhAgcXD2kzdf24hF_CwULjGmzxbocpCB-jEOscstqvAELqs4zf5DyOC72hcrxreBncjbI2IjHgEq9v7lIYnySYTaENgUK8a_EHdujoah8B2M20MkazoOTmalICp4DoTZD4KYHsN88VnlDqpUThpzgTbFICApYPqDg-1v23GSQfOLa8chegFv6C4iYdSEjOltpy-YWRsqpjYMKyPuInPIX48oU0trrdAYDkAY4hbcpIRQfp-Tf2SSs89JL7z3T1LUQJt-LNugtx5F-K52kVHMfcSghhzEI8BeNSPSeHVyMLQ","e":"AQAB"},"attributes":{"enabled":true,"created":1591014397,"updated":1591014397,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '3d223ace-593d-4cc9-85d4-9141aa620922',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:15 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  '8975a2b7-f499-4355-91b0-d00ea3b8be5a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.2.58;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Jun 2020 12:27:15 GMT'
]);
