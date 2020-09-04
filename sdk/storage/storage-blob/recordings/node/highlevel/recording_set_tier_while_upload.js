let nock = require('nock');

module.exports.hash = "a18dce0586d7a166f92e5c66f5646f3b";

module.exports.testInfo = {"uniqueName":{"container":"container159210828196209785","blob":"blob159210828199308862"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828196209785')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:01 GMT',
  'ETag',
  '"0x8D81019EDA0BAA6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309cfa-201e-003e-5402-42dadf000000',
  'x-ms-client-request-id',
  '90b800fc-19c1-4bae-908d-c2f10fefe97a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:18:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210828196209785')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309e47-201e-003e-0a02-42dadf000000',
  'x-ms-client-request-id',
  '63ff77c4-163e-4e9d-b4b6-39b7f855644e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:18:01 GMT'
]);
