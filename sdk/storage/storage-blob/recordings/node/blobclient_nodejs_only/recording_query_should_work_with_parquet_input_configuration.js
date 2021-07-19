let nock = require('nock');

module.exports.hash = "5aa58db3204cc61a3015df2482a4b39d";

module.exports.testInfo = {"uniqueName":{"container":"container162633552226909262","blob":"blob162633552359703138"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162633552226909262')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 15 Jul 2021 07:52:03 GMT',
  'ETag',
  '"0x8D947656F509948"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3463625b-801e-0027-094e-799a14000000',
  'x-ms-client-request-id',
  'dd9d8067-273e-4b90-a4ad-373c8cc513df',
  'x-ms-version',
  '2020-08-04',
  'Date',
  'Thu, 15 Jul 2021 07:52:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162633552226909262/blob162633552359703138', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 15 Jul 2021 07:52:03 GMT',
  'ETag',
  '"0x8D947656F8C0F15"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3463628e-801e-0027-394e-799a14000000',
  'x-ms-client-request-id',
  'dec30909-1b80-445c-82cc-544d3fed5eb1',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 15 Jul 2021 07:52:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162633552226909262')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '346362be-801e-0027-694e-799a14000000',
  'x-ms-client-request-id',
  '57723702-0fa5-4642-9ea5-e08252b1443e',
  'x-ms-version',
  '2020-08-04',
  'Date',
  'Thu, 15 Jul 2021 07:52:03 GMT'
]);
