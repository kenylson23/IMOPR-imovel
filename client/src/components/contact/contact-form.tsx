import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Telefone deve ter pelo menos 9 dígitos"),
  interest: z.string().min(1, "Selecione seu interesse"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContactFormProps {
  propertyId?: string;
  agentId?: string;
  compact?: boolean;
}

export default function ContactForm({ propertyId, agentId, compact = false }: ContactFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const interest = watch("interest");

  const createContactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const contactData = {
        ...data,
        propertyId,
        agentId,
      };
      return apiRequest("POST", "/api/contacts", contactData);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contacto em breve.",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    createContactMutation.mutate(data);
  };

  const containerClass = compact 
    ? "space-y-4" 
    : "bg-white rounded-2xl p-8 text-gray-900";

  const gridClass = compact 
    ? "space-y-4" 
    : "grid grid-cols-1 md:grid-cols-2 gap-6";

  return (
    <div className={containerClass}>
      <form onSubmit={handleSubmit(onSubmit)} className={gridClass} data-testid="contact-form">
        <div className={compact ? "" : "md:col-span-1"}>
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Seu nome completo"
            className={errors.name ? "border-red-500" : ""}
            data-testid="input-name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className={compact ? "" : "md:col-span-1"}>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="seu@email.com"
            className={errors.email ? "border-red-500" : ""}
            data-testid="input-email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className={compact ? "" : "md:col-span-1"}>
          <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+244 XXX XXX XXX"
            className={errors.phone ? "border-red-500" : ""}
            data-testid="input-phone"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className={compact ? "" : "md:col-span-1"}>
          <Label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
            Interesse
          </Label>
          <Select 
            value={interest} 
            onValueChange={(value) => setValue("interest", value)}
            data-testid="select-interest"
          >
            <SelectTrigger className={errors.interest ? "border-red-500" : ""}>
              <SelectValue placeholder="Selecione seu interesse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comprar">Comprar</SelectItem>
              <SelectItem value="vender">Vender</SelectItem>
              <SelectItem value="arrendar">Arrendar</SelectItem>
              <SelectItem value="investir">Investir</SelectItem>
            </SelectContent>
          </Select>
          {errors.interest && (
            <p className="text-red-500 text-sm mt-1">{errors.interest.message}</p>
          )}
        </div>

        <div className={compact ? "" : "md:col-span-2"}>
          <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Mensagem
          </Label>
          <Textarea
            id="message"
            rows={compact ? 3 : 4}
            {...register("message")}
            placeholder={propertyId ? "Estou interessado nesta propriedade..." : "Conte-nos sobre o que está procurando..."}
            className={errors.message ? "border-red-500" : ""}
            data-testid="textarea-message"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className={compact ? "" : "md:col-span-2"}>
          <Button
            type="submit"
            disabled={createContactMutation.isPending}
            className="w-full bg-green-500 text-white hover:bg-green-600"
            data-testid="button-submit-contact"
          >
            {createContactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
          </Button>
        </div>
      </form>
    </div>
  );
}
