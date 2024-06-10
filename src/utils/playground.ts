import { endpointIds } from "@/data/constants";

export function isValidTool(tool: string) {
    const tools = Object.keys(endpointIds).map((endpoint) =>
        endpoint.toLowerCase().replace(" ", "-")
    );
    return tools.includes(tool);
}
