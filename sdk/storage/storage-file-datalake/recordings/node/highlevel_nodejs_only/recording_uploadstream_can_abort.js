let nock = require('nock');

module.exports.hash = "10dc6ef0ed69ee578b97a0d82d6b1e11";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240295205203","file":"file158368240297700136"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240295205203')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E65D49A3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2e6a-601e-0014-1660-f586fa000000',
  'x-ms-client-request-id',
  '6261a950-dc38-49d5-a268-c67535ad27f0',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);
