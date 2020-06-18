let nock = require('nock');

module.exports.hash = "6570011696cb27db60113e5906f453e2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240354001437","file":"file158368240356701663"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240354001437')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6B71579"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f3029-601e-0014-2b60-f586fa000000',
  'x-ms-client-request-id',
  '5ccdcbcd-a6bf-4ee5-8884-dbd41f1b69fa',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);
