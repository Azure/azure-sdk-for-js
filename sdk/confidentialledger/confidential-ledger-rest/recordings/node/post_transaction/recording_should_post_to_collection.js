let nock = require('nock');

module.exports.hash = "1cc0e4d30adf2168f27ab3f87351dd05";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Thu, 07 Jul 2022 19:12:07 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '8cc18f08-1c11-4811-8c90-8a60ff4f193b',
  'x-ms-client-request-id',
  'efd056aa-03f5-4f45-ac38-63b56b5cc9a2',
  'x-ms-machineName',
  'identityservice-6499ffbf45-pnv6t',
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
  '2.11284',
  'x-ms-client-request-id',
  '233daef8-45e7-4902-bc58-d6cce8c55ce0',
  'x-ms-request-id',
  '1460552392'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/2.11284/status')
  .query(true)
  .reply(200, {"state":"Pending","transactionId":"2.11284"}, [
  'content-length',
  '45',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.11284',
  'x-ms-client-request-id',
  'b273c757-b8e1-483c-bece-ee4da5a60221',
  'x-ms-request-id',
  '1379827811'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/2.11284/receipt')
  .query(true)
  .reply(406, {"error":{"code":"UncommittedLedgerEntry","message":"The specified transaction (2.11284) is not committed yet, please wait until the service reports a transaction id at least as high."}}, [
  'content-length',
  '186',
  'content-type',
  'application/json',
  'x-ms-client-request-id',
  'c57c826a-0d86-4bbe-856b-7b3e273fcb6a',
  'x-ms-request-id',
  '2124618138'
]);
