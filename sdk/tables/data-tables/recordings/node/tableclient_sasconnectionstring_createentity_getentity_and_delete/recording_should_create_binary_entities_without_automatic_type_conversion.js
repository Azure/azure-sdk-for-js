let nock = require('nock');

module.exports.hash = "80cf87fdd21f28e690711cf1fa09c675";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"CreateBinary_SASConnectionStringnode","RowKey":"second_SASConnectionStringnode","binary":"QmFy","binary@odata.type":"Edm.Binary","binaryMetadata":"QmFy","binaryMetadata@odata.type":"Edm.Binary"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-10-18T20%3A22%3A00.7019109Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='CreateBinary_SASConnectionStringnode',RowKey='second_SASConnectionStringnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '483254cb-c002-0060-3e5d-c4c49d000000',
  'x-ms-client-request-id',
  '255ea98e-d667-4d8a-98ef-3964258aa8db',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='CreateBinary_SASConnectionStringnode',RowKey='second_SASConnectionStringnode')",
  'Date',
  'Mon, 18 Oct 2021 20:22:00 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='CreateBinary_SASConnectionStringnode',RowKey='second_SASConnectionStringnode')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-10-18T20%3A22%3A00.7019109Z'\"","PartitionKey":"CreateBinary_SASConnectionStringnode","RowKey":"second_SASConnectionStringnode","Timestamp":"2021-10-18T20:22:00.7019109Z","binary@odata.type":"Edm.Binary","binary":"QmFy","binaryMetadata@odata.type":"Edm.Binary","binaryMetadata":"QmFy"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-10-18T20%3A22%3A00.7019109Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '483254d6-c002-0060-495d-c4c49d000000',
  'x-ms-client-request-id',
  '88a144a1-b98c-4e52-b472-a5b3afd87084',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 Oct 2021 20:22:00 GMT'
]);
