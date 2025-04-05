import { getAccessToken } from "./get-access-token.mjs";

const tenantId = "4be5cb2e-4274-4e9f-b606-6b58dc73a297";
const endpoint = "https://api.viskan.com";

const accessToken = await getAccessToken(tenantId);

console.log("Fetching warehouses from Viskan API");
const response = await fetch(`${endpoint}/warehouse-management/warehouse/warehouses?resultsPerPage=5`, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
    },
});

const data = await response.json();

console.log("Response from Viskan API:");
console.log(data);
