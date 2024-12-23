import { createConfig, http, WagmiProvider } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { modeTestnet } from 'viem/chains';
import { useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

const config = createConfig({
    chains: [modeTestnet],
    connectors: [injected()],
    transports: {
        [modeTestnet.id]: http()
    }
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {mounted ? children : null}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
