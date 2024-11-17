"use client";
import Image from "next/image";
import { useResponse } from "../../context/ResponseContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TableClass, { DataProps } from "@/components/TableClass";

function Results() {
  const { responseData } = useResponse<DataProps>();
  const router = useRouter();

  const backToMenu = () => {
    router.push('/');
  };

  useEffect(() => {
    if (!responseData) {
      backToMenu();
    }
  }, [responseData]);

  return (
    <div>
      {responseData && responseData.status !== 500 ? (
        <>
          <TableClass data={responseData} />
        </>
      ) : (
        <div className="flex flex-col h-screen text-center justify-center items-center">
          <Image
            src="/images/not-found-file.png"
            alt="Imagem de erro"
            width={200}
            height={200}
            className="object-cover"
          />
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl text-red-500 font-semibold mt-6">
              Oops, parece que algo não deu certo.
            </h2>
            <p className="text-gray-600 mt-4">Por favor, verifique os parâmetros e tente novamente!</p>
            <Button className="w-1/3" onClick={backToMenu}>Voltar</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
