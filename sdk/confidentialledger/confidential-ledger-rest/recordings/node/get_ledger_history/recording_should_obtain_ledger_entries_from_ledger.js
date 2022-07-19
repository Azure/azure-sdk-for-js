let nock = require('nock');

module.exports.hash = "5946730e6a8b6a5a72d0e7c9dc3497c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Fri, 08 Jul 2022 18:42:17 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '7d15536e-fc4a-4b0f-8ef8-ae9cccec077d',
  'x-ms-client-request-id',
  'c242c829-5509-4c45-80df-ac292a8bb683',
  'x-ms-machineName',
  'identityservice-6499ffbf45-bt47c',
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
  '2.16481',
  'x-ms-client-request-id',
  '38c53cb3-9c4d-423e-ac48-8d779be63bce',
  'x-ms-request-id',
  '1148539101'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/current')
  .query(true)
  .reply(200, {"collectionId":"subledger:0","contents":"typescript post test","transactionId":"2.16481"}, [
  'content-length',
  '90',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.16481',
  'x-ms-client-request-id',
  'dbb7dd4e-c13e-4709-9925-fb1815ea9884',
  'x-ms-request-id',
  '1981419234'
]);
