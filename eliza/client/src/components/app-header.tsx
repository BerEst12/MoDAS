import { MessageSquare, LineChart, Briefcase, ChevronDown, Loader2 } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import logo from "../assets/logo.svg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

export function AppHeader() {
    const location = useLocation();
    const { agentId } = useParams();
    const { address, isConnected } = useAccount();
    const { connect, isPending } = useConnect();
    const { disconnect } = useDisconnect();
    const [isConnecting, setIsConnecting] = useState(false);

    const { data: balance } = useBalance({
        address
    });

    const currentAgentId = agentId || 'acc5e818-17b3-0509-8411-89882fdb9ce3';

    const menuItems = [
        { icon: MessageSquare, label: "Chat", path: `/app/chat/${currentAgentId}` },
        { icon: LineChart, label: "Analytics", path: "/app/analytics" },
        { icon: Briefcase, label: "Portfolio", path: "/app/portfolio" },
    ];

    const handleConnect = useCallback(async () => {
        if (isConnecting || isPending) return;
        try {
            setIsConnecting(true);
            await connect({ connector: injected() });
        } catch (error) {
            console.error('Failed to connect:', error);
        } finally {
            setIsConnecting(false);
        }
    }, [connect, isConnecting, isPending]);

    const handleDisconnect = useCallback(() => {
        disconnect();
    }, [disconnect]);

    const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
    const displayBalance = balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : '';

    return (
        <div className="h-12 flex items-center justify-between px-4 border-b border-white/[0.08] bg-background">
            <div className="flex items-center">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-sm font-semibold mr-8 hover:opacity-90"
                >
                    <img src={logo} alt="MoDAS Logo" className="h-6 w-6" />
                    <span className="bg-gradient-to-r from-brand-yellow to-brand-green bg-clip-text text-transparent">MoDAS</span>
                </Link>
                <nav className="flex items-center gap-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.path.includes('chat')
                            ? location.pathname.includes('chat')
                            : location.pathname.includes(item.path.split('/').pop() || '');

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                replace={false}
                                className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors
                                    ${isActive
                                        ? 'text-foreground bg-white/[0.06]'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div>
                {!isConnected ? (
                    <Button
                        onClick={handleConnect}
                        disabled={isConnecting || isPending}
                        className="bg-brand-yellow text-black hover:bg-brand-yellow/90 flex items-center gap-2"
                    >
                        {(isConnecting || isPending) ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Connecting...</span>
                            </>
                        ) : (
                            <span>Connect Wallet</span>
                        )}
                    </Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-medium">
                                        {displayAddress}
                                    </span>
                                    {displayBalance && (
                                        <span className="text-xs text-muted-foreground">
                                            {displayBalance}
                                        </span>
                                    )}
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="text-red-500 focus:text-red-500 cursor-pointer"
                                onClick={handleDisconnect}
                            >
                                Disconnect
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}
