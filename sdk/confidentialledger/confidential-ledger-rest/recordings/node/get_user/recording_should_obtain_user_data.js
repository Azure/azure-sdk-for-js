let nock = require('nock');

module.exports.hash = "a36f9c1acbcb1d7f23c2a8bfb8b3d963";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Mon, 11 Jul 2022 21:12:39 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '421454e9-d972-40f9-a1d7-1aaa3975dc04',
  'x-ms-client-request-id',
  '2dffc8c8-66b6-4ced-ac94-fd15803ff963',
  'x-ms-machineName',
  'identityservice-555869b65b-9pfc9',
  'x-ms-image-digest',
  'sha256:882aaa027c6a13390418cc070e29736d7255c85700ea0a3bde9eb7f85430c4b8',
  'x-ms-image-tag',
  '1.0.02013.15-4a5efc93f503a8000a23b4c5112a67c7be116764'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/users/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, {"assignedRole":"Administrator","userId":"00000000-0000-0000-0000-000000000000"}, [
  'content-length',
  '80',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.16779',
  'x-ms-client-request-id',
  '037049f4-6ec7-4978-844d-4aa60e1bb8d7',
  'x-ms-request-id',
  '337336436'
]);
