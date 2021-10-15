let nock = require('nock');

module.exports.hash = "322d467b8d45b1d35853c220ed663b12";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.7791241Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-10-15T16:13:10.7791241Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.8101458Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-10-15T16:13:10.8101458Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.1533859Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-10-15T16:13:11.1533859Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.1864094Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-10-15T16:13:11.1864094Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.2194321Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-10-15T16:13:11.2194321Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.2504534Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-10-15T16:13:11.2504534Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.2814751Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-10-15T16:13:11.2814751Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.3235049Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-10-15T16:13:11.3235049Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.3545262Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-10-15T16:13:11.3545262Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.3925528Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-10-15T16:13:11.3925528Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.4245752Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-10-15T16:13:11.4245752Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.4575987Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-10-15T16:13:11.4575987Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.8421682Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-10-15T16:13:10.8421682Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.8781934Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-10-15T16:13:10.8781934Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.9122172Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-10-15T16:13:10.9122172Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.9432389Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-10-15T16:13:10.9432389Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.0182918Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-10-15T16:13:11.0182918Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.0553173Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-10-15T16:13:11.0553173Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.0933439Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-10-15T16:13:11.0933439Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.1233645Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-10-15T16:13:11.1233645Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.7450999Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-10-15T16:13:10.7450999Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e427-c002-000d-65df-c16eb3000000',
  'x-ms-client-request-id',
  'dc4aca20-fa49-48bf-b527-1fe24407f24b',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:11 GMT'
]);
