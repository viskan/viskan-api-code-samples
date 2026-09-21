import * as client from "openid-client";
import { endpoint } from "./endpoint.mjs";

const clientId = "...";
const clientSecret = "...";
const scopes = [
    "warehouse:read",
];

const config = new client.Configuration({
    issuer: endpoint,
    token_endpoint: `${endpoint}/auth/oauth2/token`,
}, clientId, clientSecret);

const scope = scopes.join(" ");
let tokens: (client.TokenEndpointResponse & client.TokenEndpointResponseHelpers) | undefined;

/**
 * Gets an access token from the Viskan OAuth 2.0 server. If a non-expired token already exist, it will be returned.
 * 
 * It is important to call this function each time you want to send a request to Viskan API, as this function assures
 * that the token is still valid.
 *
 * @returns The generated access token.
 * @example
 * const accessToken = await getAccessToken();
 * const response = fetch("https://api.v2.viskan.com/warehouse-management/warehouse/warehouses", {
 *     headers: {
 *         Authorization: `Bearer ${accessToken}`,
 *         Accept: "application/json",
 *     },
 * });
 */
export const getAccessToken = async () => {
    if (tokens === undefined || (tokens.expiresIn() ?? 0) < 5) {
        console.log("Requesting a new access token");
        tokens = await client.clientCredentialsGrant(config, {
            scope,
        });
    }

    return tokens.access_token;
};
