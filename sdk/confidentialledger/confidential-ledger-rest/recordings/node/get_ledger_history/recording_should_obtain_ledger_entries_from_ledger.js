let nock = require('nock');

module.exports.hash = "5946730e6a8b6a5a72d0e7c9dc3497c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Thu, 07 Jul 2022 19:12:03 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '07202e97-b250-4a73-82bd-032387e0a2ef',
  'x-ms-client-request-id',
  'dd184a2e-a0fd-4df1-81be-7e5df1ebda2b',
  'x-ms-machineName',
  'identityservice-6499ffbf45-pnv6t',
  'x-ms-image-digest',
  'sha256:7a76c9097c3450987501c23e71a3e16b89f727059ab6de727807ac97b808810e',
  'x-ms-image-tag',
  '1.0.01999.541-e02672ed644876c9cf10c5494e0203a0dc9da070'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions')
  .query(true)
  .reply(200, {"entries":[],"nextLink":"/app/transactions?api-version=2022-05-13&collectionId=subledger:0&fromTransactionId=2.52","state":"Loading"}, [
  'content-length',
  '147',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.11281',
  'x-ms-client-request-id',
  '0dd844d5-15fc-45df-90e5-865903a8adb5',
  'x-ms-request-id',
  '515789798'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/current')
  .query(true)
  .reply(200, {"collectionId":"subledger:0","contents":"typescript post test","transactionId":"2.11281"}, [
  'content-length',
  '90',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.11281',
  'x-ms-client-request-id',
  '09fdb48c-ec38-41a0-b562-78bcd4df89f0',
  'x-ms-request-id',
  '757412252'
]);
