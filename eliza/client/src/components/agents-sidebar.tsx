import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface Agent {
    id: string;
    name: string;
    description?: string;
}

export function AgentsSidebar() {
    const { agentId: currentAgentId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { data: agents, isLoading, error } = useQuery<Agent[]>({
        queryKey: ["agents"],
        queryFn: async () => {
            const res = await fetch("/api/agents");
            const data = await res.json();
            return data.agents;
        },
    });

    // Only navigate to first agent if we're on a chat page and no agent is selected
    useEffect(() => {
        if (location.pathname.includes('/chat') && !currentAgentId && agents && agents.length > 0) {
            navigate(`/app/chat/${agents[0].id}`);
        }
    }, [currentAgentId, agents, navigate, location]);

    return (
        <div className="h-full flex flex-col bg-background">
            <div className="h-14 flex items-center px-4 border-b">
                <span className="text-base font-semibold">Mode DeFi Agents Swarm</span>
            </div>
            <div className="flex-1 p-2 space-y-2 overflow-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                ) : error ? (
                    <div className="p-4 text-sm text-red-500 text-center">
                        Failed to load agents
                    </div>
                ) : agents?.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">
                        No agents available
                    </div>
                ) : (
                    agents?.map((agent) => (
                        <Link
                            key={agent.id}
                            to={`/app/chat/${agent.id}`}
                            className={`
                                flex items-center p-3
                                rounded-lg transition-all duration-200
                                hover:bg-accent cursor-pointer
                                ${currentAgentId === agent.id ? 'bg-accent/50' : ''}
                            `}
                        >
                            <div className="flex-1 min-w-0">
                                <p className={`font-medium truncate ${currentAgentId === agent.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {agent.name}
                                </p>
                                {agent.description && (
                                    <p className="text-sm text-muted-foreground truncate mt-1">
                                        {agent.description}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
