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
  `W/"datetime'2021-10-18T19%3A42%3A39.9039775Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='CreateBinary_SASConnectionStringnode',RowKey='second_SASConnectionStringnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'edc5c48d-a002-00b7-2258-c48eba000000',
  'x-ms-client-request-id',
  '0e88f397-516a-4698-927e-ba306ad06ff0',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='CreateBinary_SASConnectionStringnode',RowKey='second_SASConnectionStringnode')",
  'Date',
  'Mon, 18 Oct 2021 19:42:39 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='CreateBinary_SASConnectionStringnode',RowKey='second_SASConnectionStringnode')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-10-18T19%3A42%3A39.9039775Z'\"","PartitionKey":"CreateBinary_SASConnectionStringnode","RowKey":"second_SASConnectionStringnode","Timestamp":"2021-10-18T19:42:39.9039775Z","binary@odata.type":"Edm.Binary","binary":"QmFy","binaryMetadata@odata.type":"Edm.Binary","binaryMetadata":"QmFy"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-10-18T19%3A42%3A39.9039775Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'edc5c4a2-a002-00b7-3358-c48eba000000',
  'x-ms-client-request-id',
  'b9681ee8-10cd-48ac-896d-cd6546050490',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 Oct 2021 19:42:39 GMT'
]);
