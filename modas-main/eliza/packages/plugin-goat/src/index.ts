import type { Plugin } from "@ai16z/eliza";
import { getOnChainActions } from "./actions";
import { erc20, USDC } from "@goat-sdk/plugin-erc20";
import { sendETH } from "@goat-sdk/core";
import { getWalletClient, getWalletProvider } from "./wallet";

async function createGoatPlugin(
    getSetting: (key: string) => string | undefined
): Promise<Plugin> {
    const walletClient = getWalletClient(getSetting);
    const actions = await getOnChainActions({
        wallet: walletClient,
        // Add plugins here based on what actions you want to use
        // See all available plugins at https://ohmygoat.dev/chains-wallets-plugins#plugins
        plugins: [
            sendETH(),
            erc20({
                tokens: [
                    USDC,
                    {
                    decimals: 18,
                    symbol: "MoDAS",
                    name: "MoDAS Token",
                    chains: {
                        "919": {
                            contractAddress: "0x92951AB7015F4907542B1578394E978d3BAd0C14",
                            },
                        },
                    },
                ],
            }),
        ],
    });

    return {
        name: "[GOAT] Onchain Actions",
        description: "Base integration plugin",
        providers: [getWalletProvider(walletClient)],
        evaluators: [],
        services: [],
        actions: actions,
    };
}

export default createGoatPlugin;
