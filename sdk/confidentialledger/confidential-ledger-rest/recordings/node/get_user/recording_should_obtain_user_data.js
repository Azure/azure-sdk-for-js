let nock = require('nock');

module.exports.hash = "a36f9c1acbcb1d7f23c2a8bfb8b3d963";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Mon, 11 Jul 2022 20:28:41 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  'b4b8eea4-cc39-47bf-a6b1-ff3a1cd9bcdc',
  'x-ms-client-request-id',
  '5d6ce643-c031-472f-8749-08929f161f02',
  'x-ms-machineName',
  'identityservice-555869b65b-t46r5',
  'x-ms-image-digest',
  'sha256:882aaa027c6a13390418cc070e29736d7255c85700ea0a3bde9eb7f85430c4b8',
  'x-ms-image-tag',
  '1.0.02013.15-4a5efc93f503a8000a23b4c5112a67c7be116764'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/users/ec667af1-0642-45f0-be8a-b76758a35dde')
  .query(true)
  .reply(200, {"assignedRole":"Administrator","userId":"ec667af1-0642-45f0-be8a-b76758a35dde"}, [
  'content-length',
  '80',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.16777',
  'x-ms-client-request-id',
  'ccc26df1-174e-40af-8738-86bc42404f8b',
  'x-ms-request-id',
  '121609897'
]);
