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
import { Send, Loader } from "lucide-react"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResponse } from "@/context/ResponseContext";

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
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();
  const { setResponseData } = useResponse();


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
    console.log(values);
    setIsLoading(true);
    
    if (qtdElitismo !== undefined && qtdElitismo % 2 !== 0) {
      alert('A quantidade de cromossomos por elitismo deve ser par');
      setIsLoading(false);
      return;
    }

    const updatedValues = {
      probabilidadeCruzamento: probabilidadeCruzamento ?? 0,
      probabilidadeMutacao: probabilidadeMutacao ?? 0,
      qtdElitismo: qtdElitismo ?? 0,
      iteracoes: iteracoes ?? 0,
      iteracoesSemMelhoria: iteracoesSemMelhoria ?? 0,
    };


    try {
      const response = await fetch("http://localhost:8080/api/configure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues),
      });
  
      const responseData = await response.json();
      console.log(responseData);

      setResponseData(responseData);
  
      toast.success("Configurações enviadas com sucesso!");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Falha ao enviar formulário. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
      router.push('/results'); 
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | undefined>>, value: string) => {
    if (value === "") {
      setter(undefined); 
    } else {
      setter(Number(value));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-200"> 
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 max-w-full lg:max-w-3xl w-full sm:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto p-4 sm:p-6 lg:p-10 bg-neutral-100 shadow-lg rounded-lg"
        >
          <h1 className="font-semibold text-lg text-center text-white bg-teal-800 rounded-sm p-4">
            Algoritmo Genético - Timetabling
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
                  <FormLabel>Qtd. Iterações sem Melhoria</FormLabel>
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

          <Button
            className="p-4 sm:p-6 mx-auto w-full lg:w-2/3 bg-teal-900 hover:bg-teal-700"
            type="submit"
            disabled={isLoading} 
          >
            {isLoading ? (
              <Loader className="animate-spin mr-2" size={20} /> 
            ) : (
              <Send />
            )}
            {isLoading ? "Enviando..." : "Calcular"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
