let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1share-with-dash156758488943009996')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f52c29ea-201a-00c9-45f8-624a6e000000',
  'x-ms-client-request-id',
  '8dd5714a-db04-4a1f-93cd-385c04ef2a47',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:14:51 GMT',
  'Connection',
  'close' ]);

