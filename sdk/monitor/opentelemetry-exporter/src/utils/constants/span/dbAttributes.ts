import * as conventions from "@opentelemetry/semantic-conventions";

export const { DB_TYPE } = conventions.DatabaseAttribute;
export const { DB_INSTANCE } = conventions.DatabaseAttribute;
export const { DB_STATEMENT } = conventions.DatabaseAttribute;
export const PEER_ADDRESS = conventions.GeneralAttribute.NET_PEER_ADDRESS;
export const PEER_HOSTNAME = conventions.GeneralAttribute.NET_PEER_HOSTNAME;

// Optionals
export const PEER_PORT = conventions.GeneralAttribute.NET_PEER_PORT;
export const PEER_IPV4 = conventions.GeneralAttribute.NET_PEER_IPV4;
export const PEER_IPV6 = conventions.GeneralAttribute.NET_PEER_IPV6;
export const PEER_SERVICE = conventions.GeneralAttribute.NET_PEER_SERVICE;
