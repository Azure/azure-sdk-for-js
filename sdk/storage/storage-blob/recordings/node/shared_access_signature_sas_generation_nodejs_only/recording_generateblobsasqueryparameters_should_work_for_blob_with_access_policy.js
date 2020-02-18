let nock = require('nock');

module.exports.hash = "3cb5c4582b0390ed1e8efa63d30cba98";

module.exports.testInfo = {"uniqueName":{"container":"container158193961904309572","blob":"blob158193961937103133"},"newDate":{"now":"2020-02-17T11:40:19.042Z","tmr":"2020-02-17T11:40:19.043Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158193961904309572')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Feb 2020 11:40:19 GMT',
  'ETag',
  '"0x8D7B39E2A4C7E5D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534ecd2-b01e-0004-1e87-e5d202000000',
  'x-ms-client-request-id',
  '58753461-3999-4c9b-a912-17dd75bc9dbe',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 11:40:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158193961904309572/blob158193961937103133')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Feb 2020 11:40:19 GMT',
  'ETag',
  '"0x8D7B39E2A7F575B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534edac-b01e-0004-6e87-e5d202000000',
  'x-ms-client-request-id',
  '0138b448-bf86-4292-951c-da51243af795',
  'x-ms-version',
  '2019-07-07',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 17 Feb 2020 11:40:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158193961904309572', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2020-02-17T11:35:19.0420000Z</Start><Expiry>2020-02-18T11:40:19.0430000Z</Expiry></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Feb 2020 11:40:19 GMT',
  'ETag',
  '"0x8D7B39E2AB0FFBA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534ee0e-b01e-0004-4b87-e5d202000000',
  'x-ms-client-request-id',
  'ac2c37e4-2089-4da6-8760-fc7579680b88',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 11:40:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158193961904309572/blob158193961937103133')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 17 Feb 2020 11:40:19 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7B39E2A7F575B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534ee7e-b01e-0004-2d87-e5d202000000',
  'x-ms-client-request-id',
  'bfb9f5e8-9dbc-450b-a027-85d6bd1463b7',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Mon, 17 Feb 2020 11:40:19 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 17 Feb 2020 11:40:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158193961904309572')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534eeff-b01e-0004-2187-e5d202000000',
  'x-ms-client-request-id',
  '85ddfaeb-8631-43d0-b669-928cf9d9092b',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 11:40:20 GMT'
]);
