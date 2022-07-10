let nock = require('nock');

module.exports.hash = "a36f9c1acbcb1d7f23c2a8bfb8b3d963";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASCgAwIBAgIQMNwF270tS2Ex6jsW6jP46TAKBggqhkjOPQQDAjAWMRQw\nEgYDVQQDDAtDQ0YgTmV0d29yazAeFw0yMjA3MDYyMTA0NDBaFw0yMjEwMDQyMTA0\nMzlaMBYxFDASBgNVBAMMC0NDRiBOZXR3b3JrMFkwEwYHKoZIzj0CAQYIKoZIzj0D\nAQcDQgAEDUWr/JYiEUnNS+4Ndfcci6yGRXhVWSnabgvShqrdxW4RBmsKZ+qsAWJP\nnavsVjf8Zgd8gghMm1y4Zl4PoHzTxKNQME4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4E\nFgQUiIlVb/2YkHp4mXRhBuLaadG82zYwHwYDVR0jBBgwFoAUiIlVb/2YkHp4mXRh\nBuLaadG82zYwCgYIKoZIzj0EAwIDSAAwRQIgfYFw63rQ8RrH0BBs6yWbYbm+OWCq\nwyWR8oAT90gwHtACIQDNJ3eIewMJNDtUSJaRYhOIOu10evuW63wBLP/kftLAmw==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Sun, 10 Jul 2022 20:30:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '6bad9093-f8f7-4357-ba6f-f1e988e4cdb2',
  'x-ms-client-request-id',
  'd4b67428-a763-41be-9cd8-f3a91a7ff695',
  'x-ms-machineName',
  'identityservice-6499ffbf45-bt47c',
  'x-ms-image-digest',
  'sha256:7a76c9097c3450987501c23e71a3e16b89f727059ab6de727807ac97b808810e',
  'x-ms-image-tag',
  '1.0.01999.541-e02672ed644876c9cf10c5494e0203a0dc9da070'
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
  '2.16681',
  'x-ms-client-request-id',
  '6f7d5bd0-144b-489a-b000-c98f5f5c7cbc',
  'x-ms-request-id',
  '499235230'
]);
