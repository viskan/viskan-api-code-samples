import * as client from "openid-client";

const server = "https://connect.visma.com";
const clientId = "...";
const clientSecret = "...";
const scopes = [
    "viskan:warehouse:read",
];

console.log("Getting OAuth 2.0 configuration from the identity portal");
const config = await client.discovery(new URL(server), clientId, clientSecret);

const scope = scopes.join(" ");
const tokenData = new Map<string, client.TokenEndpointResponse & client.TokenEndpointResponseHelpers>();

/**
 * Gets an access token for the given `tenantId`. If a non-expired token already exist, it will be returned.
 * 
 * It is important to call this function each time you want to send a request to Viskan API, as this function assures
 * that the token is still valid.
 *
 * @param tenantId The ID of the tenant to get an access token for.
 * @returns The generated access token.
 * @example
 * const accessToken = await getAccessToken("0aeef885-2e99-4318-afaa-0d797c450240");
 * const response = fetch("https://api.viskan.com/warehouse-management/warehouse/warehouses", {
 *     headers: {
 *         Authorization: `Bearer ${accessToken}`,
 *         Accept: "application/json",
 *     },
 * });
 */
export const getAccessToken = async (tenantId: string) => {
    let tokens = tokenData.get(tenantId);
    if (tokens === undefined || (tokens?.expiresIn() ?? 0) < 5) {
        console.log("Requesting a new access token for tenant", tenantId)
        tokens = await client.clientCredentialsGrant(config, {
            scope,
            tenant_id: tenantId,
        });

        tokenData.set(tenantId, tokens);
    }

    return tokens.access_token;
};
