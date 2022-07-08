let nock = require('nock');

module.exports.hash = "1cc0e4d30adf2168f27ab3f87351dd05";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Fri, 08 Jul 2022 18:42:19 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '30d43733-726e-4be9-8121-437c7cc1babe',
  'x-ms-client-request-id',
  '1d70dcab-0036-44bc-80cb-0c3472677786',
  'x-ms-machineName',
  'identityservice-6499ffbf45-bt47c',
  'x-ms-image-digest',
  'sha256:7a76c9097c3450987501c23e71a3e16b89f727059ab6de727807ac97b808810e',
  'x-ms-image-tag',
  '1.0.01999.541-e02672ed644876c9cf10c5494e0203a0dc9da070'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/app/transactions', {"contents":"post ledger entry test"})
  .query(true)
  .reply(200, {"collectionId":"collectionPost:0"}, [
  'content-length',
  '35',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.16484',
  'x-ms-client-request-id',
  'bb89fa9e-6c1e-4cdf-b686-82d5288a7a4d',
  'x-ms-request-id',
  '1573350601'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/2.16484/status')
  .query(true)
  .reply(200, {"state":"Pending","transactionId":"2.16484"}, [
  'content-length',
  '45',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.16484',
  'x-ms-client-request-id',
  '25d7ea64-ed2f-4c46-8678-f3e7dbe035be',
  'x-ms-request-id',
  '149544907'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/2.16484/receipt')
  .query(true)
  .reply(406, {"error":{"code":"UncommittedLedgerEntry","message":"The specified transaction (2.16484) is not committed yet, please wait until the service reports a transaction id at least as high."}}, [
  'content-length',
  '186',
  'content-type',
  'application/json',
  'x-ms-client-request-id',
  '6119b3a4-06f5-48d1-8040-acd5b591efd8',
  'x-ms-request-id',
  '2020018347'
]);
