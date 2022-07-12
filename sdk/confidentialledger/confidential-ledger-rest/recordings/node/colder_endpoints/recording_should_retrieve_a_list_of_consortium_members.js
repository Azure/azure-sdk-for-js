let nock = require('nock');

module.exports.hash = "13802c79e02b4fee488f24f8f8b04aee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Fri, 08 Jul 2022 18:37:44 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  'e3c0fead-587a-49c4-b8e3-d6b3af0b0ff5',
  'x-ms-client-request-id',
  '69195421-f8eb-47b1-94a3-f212dad1f5d1',
  'x-ms-machineName',
  'identityservice-6499ffbf45-pnv6t',
  'x-ms-image-digest',
  'sha256:7a76c9097c3450987501c23e71a3e16b89f727059ab6de727807ac97b808810e',
  'x-ms-image-tag',
  '1.0.01999.541-e02672ed644876c9cf10c5494e0203a0dc9da070'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/governance/members')
  .query(true)
  .reply(200, {"members":[{"certificate":"-----BEGIN CERTIFICATE-----\nMIIB9jCCAX2gAwIBAgIQNZFo2yl5QayDo8eUrcHTPTAKBggqhkjOPQQDAzAgMR4w\nHAYDVQQDExVDQ0YgR292ZXJub3IgSWRlbnRpdHkwHhcNMjIwNzA2MjA1MDM4WhcN\nMjIxMDA2MjEwMDM4WjAgMR4wHAYDVQQDExVDQ0YgR292ZXJub3IgSWRlbnRpdHkw\ndjAQBgcqhkjOPQIBBgUrgQQAIgNiAATPkVSLEU1pwFhqhIMdiLrcS6OO6DQrH8cE\n38YmPttml3JxhaQdHgQOcrK3VoQTIb4TpfgzKpkra/OuGvCIaWuQElaObOzbRA8c\nBp9TgsOVFc7CNmtKwNgBV9WBDTr2IUajfDB6MA4GA1UdDwEB/wQEAwIHgDAJBgNV\nHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAW\ngBRtHOfyGu6BbNhT+xhFXCyccFQB7TAdBgNVHQ4EFgQUbRzn8hrugWzYU/sYRVws\nnHBUAe0wCgYIKoZIzj0EAwMDZwAwZAIwLWJfzfqsV5w7lJvYW/MYf+THAzPhSy2S\nGYccyNu4eSaNeFKb9kxiCN1z78zBRQZDAjBa3fSRPY2TmmzkMcPSQFTrloM7+SIz\nhUc+SldmEPm9Pyjr4hlrJo2AGiQB4LX9cj8=\n-----END CERTIFICATE-----","id":"8f342f65f88282c78a0aafd075f97286add83fb0111bd3e929203ec87f57f0f8"}]}, [
  'content-length',
  '856',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.14250',
  'x-ms-client-request-id',
  'ad6ad98c-cf98-4597-9101-85cff14c93ac',
  'x-ms-request-id',
  '1848216483'
]);
