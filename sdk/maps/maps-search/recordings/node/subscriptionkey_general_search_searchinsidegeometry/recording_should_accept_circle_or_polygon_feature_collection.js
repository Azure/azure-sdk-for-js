let nock = require('nock');

module.exports.hash = "2d56eeb9f973839e97f69061dc42a955";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/geometry/json', {"geometry":{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-121.43576049804686,38.7524152343544],[-121.43301391601562,38.70660472542312],[-121.36434936523438,38.712059855877314],[-121.43576049804686,38.7524152343544]]]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-121.43576049804686,38.7524152343544]},"properties":{"subType":"Circle","radius":5000}}]}})
  .query(true)
  .reply(200, {"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":21,"numResults":3,"offset":0,"totalResults":3,"fuzzyLevel":1},"results":[{"type":"POI","id":"840069009080627","score":2.1455070972,"info":"search:ta:840069009080627-US","poi":{"name":"Pizzeria Classico","phone":"+1 916-339-9244","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3535","streetName":"Elverta Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-4721","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3535 Elverta Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71883,"lon":-121.38094},"viewport":{"topLeftPoint":{"lat":38.71973,"lon":-121.38209},"btmRightPoint":{"lat":38.71793,"lon":-121.37979}},"entryPoints":[{"type":"main","position":{"lat":38.71848,"lon":-121.38091}}]},{"type":"POI","id":"840069019394045","score":2.1454956532,"info":"search:ta:840069019394045-US","poi":{"name":"Round Table Pizza","phone":"+1 916-723-8665","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"https://ordering.roundtablepizza.com/Site/ex12","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"7909","streetName":"Walerga Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-5722","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"7909 Walerga Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71302,"lon":-121.36609},"viewport":{"topLeftPoint":{"lat":38.71421,"lon":-121.36762},"btmRightPoint":{"lat":38.71183,"lon":-121.36456}},"entryPoints":[{"type":"main","position":{"lat":38.71306,"lon":-121.36456}}]},{"type":"POI","id":"840069002628285","score":2.1454501152,"info":"search:ta:840069002628285-US","poi":{"name":"Mama Mia Pizza","phone":"+1 916-334-7200","categorySet":[{"id":7315036}],"url":"www.mamamiapizzaantelope.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3535","streetName":"Elverta Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-4721","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3535 Elverta Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71883,"lon":-121.38094},"viewport":{"topLeftPoint":{"lat":38.71973,"lon":-121.38209},"btmRightPoint":{"lat":38.71793,"lon":-121.37979}},"entryPoints":[{"type":"main","position":{"lat":38.71848,"lon":-121.38091}}]}]}, [
  'Content-Length',
  '3242',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding,X-HTTP-Method-Override',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 538ACD86B37A4B0E89D04406991021AC Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:31Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:30 GMT'
]);
