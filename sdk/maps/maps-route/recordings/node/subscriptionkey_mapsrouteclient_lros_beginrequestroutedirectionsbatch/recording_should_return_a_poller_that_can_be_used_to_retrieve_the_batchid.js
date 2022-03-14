let nock = require('nock');

module.exports.hash = "b3e44808ccc6d5c8cf10f97f5fb8471d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/directions/batch/json', {"batchItems":[{"query":"?query=47.620659,-122.348934:47.610101,-122.342015&routeType=eco&travelMode=bicycle&traffic=false"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/route/directions/batch/<batch-id>?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: F620060A19154360BEB1CD4D509B3079 Ref B: TPE30EDGE0518 Ref C: 2022-03-14T03:12:29Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:28 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/directions/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"formatVersion":"0.0.12","routes":[{"summary":{"lengthInMeters":1754,"travelTimeInSeconds":396,"trafficDelayInSeconds":0,"departureTime":"2022-03-14T03:12:30+00:00","arrivalTime":"2022-03-14T03:19:05+00:00"},"legs":[{"summary":{"lengthInMeters":1754,"travelTimeInSeconds":396,"trafficDelayInSeconds":0,"departureTime":"2022-03-14T03:12:30+00:00","arrivalTime":"2022-03-14T03:19:05+00:00"},"points":[{"latitude":47.62095,"longitude":-122.34892},{"latitude":47.62094,"longitude":-122.3485},{"latitude":47.62094,"longitude":-122.34767},{"latitude":47.62095,"longitude":-122.3476},{"latitude":47.62079,"longitude":-122.34761},{"latitude":47.62066,"longitude":-122.34761},{"latitude":47.62026,"longitude":-122.34761},{"latitude":47.61973,"longitude":-122.34761},{"latitude":47.61958,"longitude":-122.34761},{"latitude":47.61934,"longitude":-122.34761},{"latitude":47.61904,"longitude":-122.34761},{"latitude":47.61898,"longitude":-122.34762},{"latitude":47.6188,"longitude":-122.34762},{"latitude":47.61857,"longitude":-122.34762},{"latitude":47.61833,"longitude":-122.34763},{"latitude":47.61815,"longitude":-122.34766},{"latitude":47.61812,"longitude":-122.34767},{"latitude":47.61805,"longitude":-122.34771},{"latitude":47.6178,"longitude":-122.34805},{"latitude":47.61764,"longitude":-122.34825},{"latitude":47.61745,"longitude":-122.34849},{"latitude":47.61712,"longitude":-122.34889},{"latitude":47.61679,"longitude":-122.34932},{"latitude":47.61645,"longitude":-122.34977},{"latitude":47.61612,"longitude":-122.35019},{"latitude":47.61579,"longitude":-122.35062},{"latitude":47.61557,"longitude":-122.35025},{"latitude":47.61523,"longitude":-122.34968},{"latitude":47.61475,"longitude":-122.34886},{"latitude":47.61468,"longitude":-122.34875},{"latitude":47.61415,"longitude":-122.34786},{"latitude":47.61412,"longitude":-122.3478},{"latitude":47.61408,"longitude":-122.34772},{"latitude":47.614,"longitude":-122.34759},{"latitude":47.6137,"longitude":-122.34709},{"latitude":47.61336,"longitude":-122.34651},{"latitude":47.61284,"longitude":-122.34563},{"latitude":47.61259,"longitude":-122.34521},{"latitude":47.61229,"longitude":-122.34472},{"latitude":47.61183,"longitude":-122.34394},{"latitude":47.61171,"longitude":-122.34375},{"latitude":47.61166,"longitude":-122.34366},{"latitude":47.61149,"longitude":-122.34337},{"latitude":47.61135,"longitude":-122.34312},{"latitude":47.61104,"longitude":-122.3426},{"latitude":47.61038,"longitude":-122.34152},{"latitude":47.61028,"longitude":-122.34136},{"latitude":47.61025,"longitude":-122.3414},{"latitude":47.60996,"longitude":-122.34174},{"latitude":47.61011,"longitude":-122.342}]}],"sections":[{"startPointIndex":0,"endPointIndex":49,"sectionType":"TRAVEL_MODE","travelMode":"bicycle"}]}]}}],"summary":{"successfulRequests":1,"totalRequests":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 6B231D37943D4EA1AEA975BA016C1E26 Ref B: TPE30EDGE0518 Ref C: 2022-03-14T03:12:29Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:29 GMT'
]);
