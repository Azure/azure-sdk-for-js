import * as v09 from "../../2016-09-01";
import * as v12 from "../../2016-12-01";

export const VirtualNetworkGatewayConnections = v09.VirtualNetworkGatewayConnections;
export const RouteFilters = v12.RouteFilters;

const ctx = new v09.NetworkManagementClientContext(null as any, null as any);
const foo = new RouteFilters(ctx);
