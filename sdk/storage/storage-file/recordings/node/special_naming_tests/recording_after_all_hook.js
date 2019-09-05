let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1share-with-dash156767546706905738')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ae216eb6-d01a-00cd-02cb-63c769000000',
  'x-ms-client-request-id',
  '2db5663e-2e60-4a51-8842-db0a6bb855c8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:50 GMT',
  'Connection',
  'close' ]);

