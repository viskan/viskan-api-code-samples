import { endpoint } from "./endpoint.mjs";
import { getAccessToken } from "./get-access-token.mjs";

const accessToken = await getAccessToken();

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
