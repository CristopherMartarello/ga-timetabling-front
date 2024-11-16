"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";

// Validação com Zod
const formSchema = z.object({
  probabilidadeCruzamento: z.number().min(0).max(100).optional(),
  probabilidadeMutacao: z.number().min(0).max(100).optional(),
  qtdElitismo: z.number().min(0).optional(),
  iteracoes: z.number().min(0).optional(),
  iteracoesSemMelhoria: z.number().min(0).optional(),
});

export default function MainForm() {
  const [probabilidadeCruzamento, setProbabilidadeCruzamento] = useState<number | undefined>(undefined);
  const [probabilidadeMutacao, setMutacao] = useState<number | undefined>(undefined);
  const [qtdElitismo, setQtdElitismo] = useState<number | undefined>(undefined);
  const [iteracoes, setIteracoes] = useState<number | undefined>(undefined);
  const [iteracoesSemMelhoria, setIteracoesSemMelhoria] = useState<number | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue("probabilidadeCruzamento", probabilidadeCruzamento);
    form.setValue("probabilidadeMutacao", probabilidadeMutacao);
    form.setValue("qtdElitismo", qtdElitismo);
    form.setValue("iteracoes", iteracoes);
    form.setValue("iteracoesSemMelhoria", iteracoesSemMelhoria);
  }, [
    probabilidadeCruzamento, probabilidadeMutacao, qtdElitismo, iteracoes, iteracoesSemMelhoria, form
  ]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:8080/api/configure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | undefined>>, value: string) => {
    if (value === "") {
      setter(undefined); 
    } else {
      setter(Number(value));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 max-w-3xl h-full mx-auto p-10 bg-neutral-100"
      >
        <h1 className="font-semibold text-lg">
          Algoritmo Genético - Definições
        </h1>
        <div className="flex flex-col flex-grow space-y-8">
          <FormField
            control={form.control}
            name="probabilidadeCruzamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Probabilidade de Cruzamento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite um valor"
                    type="number"
                    {...field}
                    value={probabilidadeCruzamento === undefined ? "" : probabilidadeCruzamento} 
                    onChange={(e) => handleInputChange(setProbabilidadeCruzamento, e.target.value)} 
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Apenas valores entre 0 ~ 100
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="probabilidadeMutacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Probabilidade de Mutação</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite um valor"
                    type="number"
                    {...field}
                    value={probabilidadeMutacao === undefined ? "" : probabilidadeMutacao} 
                    onChange={(e) => handleInputChange(setMutacao, e.target.value)} 
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Apenas valores entre 0 ~ 100
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qtdElitismo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtd. Cromossomos por Elitismo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite um valor"
                    type="number"
                    {...field}
                    value={qtdElitismo === undefined ? "" : qtdElitismo} 
                    onChange={(e) => handleInputChange(setQtdElitismo, e.target.value)} 
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Insira a quantidade de cromossomos selecionados por elitismo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="iteracoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtd. Máxima de Iterações</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite um valor"
                    type="number"
                    {...field}
                    value={iteracoes === undefined ? "" : iteracoes} 
                    onChange={(e) => handleInputChange(setIteracoes, e.target.value)} 
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Informe a quantidade máxima de iterações possíveis
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="iteracoesSemMelhoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtd. Interações sem Melhoria</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite um valor"
                    type="number"
                    {...field}
                    value={iteracoesSemMelhoria === undefined ? "" : iteracoesSemMelhoria} 
                    onChange={(e) => handleInputChange(setIteracoesSemMelhoria, e.target.value)} 
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Quantidade de iterações sem melhorias que deve ser atingida
                  para a busca ser interrompida
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="p-6 mx-auto w-2/3" type="submit">
          <Send /> Calcular
        </Button>
      </form>
    </Form>
  );
}
