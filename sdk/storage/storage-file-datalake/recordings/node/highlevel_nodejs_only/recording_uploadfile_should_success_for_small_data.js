let nock = require('nock');

module.exports.hash = "788349dcb635b12f1781cda7b96584f4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240330105913","file":"file158368240332905406"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240330105913')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E69295B9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2f77-601e-0014-0960-f586fa000000',
  'x-ms-client-request-id',
  '8cb53b25-c564-4c83-8cc4-20ad68ded2e3',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);
