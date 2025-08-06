import { Phone, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Agent } from "@shared/schema";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="text-center glass-strong hover-lift rounded-3xl" data-testid={`agent-card-${agent.id}`}>
      <CardContent className="p-fluid-sm">
        <img
          src={agent.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"}
          alt={agent.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h3 className="typography-subheading text-gray-900 mb-2" data-testid={`agent-name-${agent.id}`}>
          {agent.name}
        </h3>
        <p className="typography-body text-green-600 font-medium mb-4" data-testid={`agent-specialty-${agent.id}`}>
          {agent.specialty}
        </p>
        <div className="text-sm text-gray-600 mb-4 space-y-1">
          <div data-testid={`agent-experience-${agent.id}`}>
            {agent.experience} anos de experiência
          </div>
          <div data-testid={`agent-sales-${agent.id}`}>
            {agent.salesCount}+ vendas concluídas
          </div>
        </div>
        <div className="flex justify-center gap-fluid-xs">
          <Button 
            variant="outline" 
            size="icon" 
            className="glass hover-lift rounded-xl hover:bg-green-50 hover:border-green-300"
            data-testid={`button-phone-${agent.id}`}
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="glass hover-lift rounded-xl hover:bg-green-50 hover:border-green-300"
            data-testid={`button-email-${agent.id}`}
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="glass hover-lift rounded-xl hover:bg-green-50 hover:border-green-300"
            data-testid={`button-whatsapp-${agent.id}`}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
