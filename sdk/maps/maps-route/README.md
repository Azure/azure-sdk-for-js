# Azure Maps Route client library for JavaScript/TypeScript

The Route Directions and Route Matrix APIs in Azure Maps Route Service can be used to calculate the estimated arrival times (ETAs) for each requested route. Route APIs consider factors such as real-time traffic information and historic traffic data, like the typical road speeds on the requested day of the week and time of day. The APIs return the shortest or fastest routes available to multiple destinations at a time in sequence or in optimized order, based on time or distance. Users can also request specialized routes and details for walkers, bicyclists, and commercial vehicles like trucks.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Maps Route client.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-route) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route/samples) |
[Product Information](https://docs.microsoft.com/rest/api/maps/route)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].
- An [Azure Maps account](https://docs.microsoft.com/azure/azure-maps/how-to-manage-account-keys). You can create the resource via the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

If you use Azure CLI, replace `<resource-group-name>` and `<map-account-name>` of your choice, and select a proper [pricing tier](https://docs.microsoft.com/azure/azure-maps/choose-pricing-tier) based on your needs via the `<sku-name>` parameter. Please refer to [this page](https://docs.microsoft.com/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create) for more details.

```bash
az maps account create --resource-group <resource-group-name> --name <map-account-name> --sku <sku-name>
```

### Install the `@azure/maps-route` package

Install the Azure Maps Route client library with `npm`:

```bash
npm install @azure/maps-route
```

### Create and authenticate a `MapsRouteClient`

To create a client object to access the Azure Maps Route APIs, you will need a `credential` object. The Azure Maps Route client can use an Azure Active Directory credential or an Azure Key credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

You will also need to specify the Azure Maps resource you intend to use by specifying the `clientId` in the client options.
The Azure Maps resource client id can be found in the Authentication sections in the Azure Maps resource. Please refer to the [documentation](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication#view-authentication-details) on how to find it.

```javascript
import { MapsRouteClient } from "@azure/maps-route";
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();
const client = new MapsRouteClient(credential, "<maps-account-client-id>");
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscription Key.

```javascript
import { MapsRouteClient, AzureKeyCredential } from "@azure/maps-route";

const credential = new AzureKeyCredential("<subscription-key>");
const client = new MapsRouteClient(credential);
```

## Key concepts

### MapsRouteClient

`MapsRouteClient` is the primary interface for developers using the Azure Maps Route client library. Explore the methods on this client object to understand the different features of the Azure Maps Route service that you can access.

## Examples

The following sections provide several code snippets covering some of the most common Azure Maps Route tasks, including:

- [Request historic and real-time data](#request-historic-and-real-time-data)
- [Request a route for a commercial vehicle](#request-a-route-for-a-commercial-vehicle)
- [Calculate and optimize a multi-stop route](#calculate-and-optimize-a-multi-stop-route)

### Request historic and real-time data

By default, the Route service assumes the traveling mode is a car and the departure time is now. It returns route based on real-time traffic conditions unless a route calculation request specifies otherwise.

To retrieve the route direction, you need to pass in the parameters the coordinates through which the route is calculated, delimited by a colon. A minimum of two coordinates is required. The first one is the origin and the last is the destination of the route.

By default, the Route service will return an array of coordinates. The response will contain the coordinates that make up the path in a list named points. Route response also includes the distance from the start of the route and the estimated elapsed time. These values can be used to calculate the average speed for the entire route.

```javascript
const routeDirectionsResult = await client.getRouteDirections([
  { latitude: 51.368752, longitude: -0.118332 },
  { latitude: 41.385426, longitude: -0.128929 },
]);
```

### Request a route for a commercial vehicle

The service supports commercial vehicle routing, covering commercial trucks routing. The APIs consider specified limits. Such as, the height and weight of the vehicle, and if the vehicle is carrying hazardous cargo. For example, if a vehicle is carrying flammable, the routing engine avoid certain tunnels that are near residential areas.

```javascript
const routeDirectionsResult = await client.getRouteDirections(
  [
    { latitude: 51.368752, longitude: -0.118332 },
    { latitude: 41.385426, longitude: -0.128929 },
  ],
  {
    vehicleWidth: 2,
    vehicleHeight: 2,
    isCommercialVehicle: true,
    vehicleLoadType: KnownVehicleLoadType.USHazmatClass1,
    travelMode: "truck",
  }
);
```

### Calculate and optimize a multi-stop route

Azure Maps currently provides two forms of route optimizations:

- Optimizations based on the requested route type, without changing the order of waypoints. You can find the [supported route types here](https://docs.microsoft.com/rest/api/maps/route/post-route-directions?tabs=HTTP#routetype).
- Traveling salesman optimization, which changes the order of the waypoints to obtain the best order to visit each stop

For multi-stop routing, up to 150 waypoints may be specified in a single route request. The starting and ending coordinate locations can be the same, as would be the case with a round trip. But you need to provide at least one additional waypoint to make the route calculation. Waypoints can be added to the query in-between the origin and destination coordinates.

If you want to optimize the best order to visit the given waypoints, then you need to specify `computeBestWaypointOrder=true`. This scenario is also known as the traveling salesman optimization problem.

```javascript
const routeDirectionsResult = await client.getRouteDirections(
  [
    { latitude: 47.606544, longitude: -122.336502 },
    { latitude: 47.759892, longitude: -122.204821 },
    { latitude: 47.670682, longitude: -122.120415 },
    { latitude: 47.480133, longitude: -122.213369 },
  ],
  {
    computeBestWaypointOrder: true,
  }
);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-route%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.maps/new-azmapsaccount
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
