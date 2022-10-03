let nock = require('nock');

module.exports.hash = "560374c7cf67bdf9cf29943418c80a71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Fri, 08 Jul 2022 18:42:18 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  'a277a154-d199-47cd-8d5a-327e78dc3271',
  'x-ms-client-request-id',
  'e4636063-d5a6-42c5-86c2-cb006acac270',
  'x-ms-machineName',
  'identityservice-6499ffbf45-bt47c',
  'x-ms-image-digest',
  'sha256:7a76c9097c3450987501c23e71a3e16b89f727059ab6de727807ac97b808810e',
  'x-ms-image-tag',
  '1.0.01999.541-e02672ed644876c9cf10c5494e0203a0dc9da070'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/app/transactions', {"contents":"typescript post test"})
  .query(true)
  .reply(200, {"collectionId":"subledger:0"}, [
  'content-length',
  '30',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.16482',
  'x-ms-client-request-id',
  '0f04fbed-f4f4-4b42-8875-64fdd031dc17',
  'x-ms-request-id',
  '1107386588'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/2.16482/status')
  .query(true)
  .reply(200, {"state":"Pending","transactionId":"2.16482"}, [
  'content-length',
  '45',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.16482',
  'x-ms-client-request-id',
  '2b591d00-69ad-4417-9b6b-d8597bd64095',
  'x-ms-request-id',
  '2015547460'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/2.16482/receipt')
  .query(true)
  .reply(406, {"error":{"code":"UncommittedLedgerEntry","message":"The specified transaction (2.16482) is not committed yet, please wait until the service reports a transaction id at least as high."}}, [
  'content-length',
  '186',
  'content-type',
  'application/json',
  'x-ms-client-request-id',
  'ec47c7e3-1229-432b-8fb3-58701529e2c0',
  'x-ms-request-id',
  '995460329'
]);
