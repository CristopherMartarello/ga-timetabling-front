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
  probabilidade_cruzamento: z.number().min(0).max(100).optional(),
  mutacao: z.number().min(0).max(100).optional(),
  qtd_elitismo: z.number().min(0).optional(),
  iteracoes: z.number().min(0).optional(),
  iteracoes_sem_melhoria: z.number().min(0).optional(),
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
    form.setValue("probabilidade_cruzamento", probabilidadeCruzamento ?? 0);
    form.setValue("mutacao", mutacao ?? 0);
    form.setValue("qtd_elitismo", qtdElitismo ?? 0);
    form.setValue("iteracoes", iteracoes ?? 0);
    form.setValue("iteracoes_sem_melhoria", iteracoesSemMelhoria ?? 0);
  }, [
    probabilidadeCruzamento, mutacao, qtdElitismo, iteracoes, iteracoesSemMelhoria, form
  ]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
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
            name="probabilidade_cruzamento"
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
            name="qtd_elitismo"
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
            name="iteracoes_sem_melhoria"
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
