let nock = require('nock');

module.exports.hash = "12a39abc66f6c1550354670721badfee";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240389700291","file":"file158368240392404878"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240389700291')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6ED4C25"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f30ec-601e-0014-5760-f586fa000000',
  'x-ms-client-request-id',
  'd307ddaf-5ea6-45e0-b3fc-e96d60fa6271',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);
