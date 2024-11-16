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
  mutacao: z.number().min(0).max(100).optional(),
  qtdElitismo: z.number().min(0).optional(),
  iteracoes: z.number().min(0).optional(),
  iteracoesSemMelhoria: z.number().min(0).optional(),
});

export default function MainForm() {
  const [probabilidadeCruzamento, setProbabilidadeCruzamento] = useState<number | undefined>(0);
  const [mutacao, setMutacao] = useState<number | undefined>(0);
  const [qtdElitismo, setQtdElitismo] = useState<number | undefined>(0);
  const [iteracoes, setIteracoes] = useState<number | undefined>(0);
  const [iteracoesSemMelhoria, setIteracoesSemMelhoria] = useState<number | undefined>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue("probabilidadeCruzamento", probabilidadeCruzamento ?? 0);
    form.setValue("mutacao", mutacao ?? 0);
    form.setValue("qtdElitismo", qtdElitismo ?? 0);
    form.setValue("iteracoes", iteracoes ?? 0);
    form.setValue("iteracoesSemMelhoria", iteracoesSemMelhoria ?? 0);
  }, [
    probabilidadeCruzamento, mutacao, qtdElitismo, iteracoes, iteracoesSemMelhoria, form
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
                    placeholder=""
                    type="number"
                    {...field}
                    value={probabilidadeCruzamento ?? 0} 
                    onChange={(e) => setProbabilidadeCruzamento(Number(e.target.value))}
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
            name="mutacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Probabilidade de Mutação</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    {...field}
                    value={mutacao ?? 0}
                    onChange={(e) => setMutacao(Number(e.target.value))}
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
                    placeholder=""
                    type="number"
                    {...field}
                    value={qtdElitismo ?? 0} 
                    onChange={(e) => setQtdElitismo(Number(e.target.value))}
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
                    placeholder=""
                    type="number"
                    {...field}
                    value={iteracoes ?? 0} 
                    onChange={(e) => setIteracoes(Number(e.target.value))}
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
                    placeholder=""
                    type="number"
                    {...field}
                    value={iteracoesSemMelhoria ?? 0} 
                    onChange={(e) => setIteracoesSemMelhoria(Number(e.target.value))}
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
