/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";

export interface Curso {
  codigo: (number | null)[];
  nomeMateria: (string | null)[];
  professorMinistrante: (string | null)[];
}

export interface DataProps {
  bestFitnessScore: number;
  contIteracoes: number;
  iteracoesTotal: number;
  objTabela: Curso[];
  tempoExecucao: number;
  status?: number;
}

interface TableClassProps {
  data: DataProps;
}

const TableClass = ({ data }: TableClassProps) => {
  // Ordem dos cursos
  const ordemCursos = [
    "Ciência da Computação",
    "Engenharia Química",
    "Engenharia Mecânica",
    "Técnico em Administração",
    "Técnico em Informática para Internet",
    "Técnico em Mecatrônica",
  ];

  // Identifica cursos técnicos
  const cursosTecnicos = [
    "Técnico em Administração",
    "Técnico em Informática para Internet",
    "Técnico em Mecatrônica",
  ];

  // Função para mapear os dados dos cursos com nome e melhor fitness score
  const cursosComNomesEFitness = data.objTabela.map((curso, index) => ({
    ...curso,
    nomeCurso: ordemCursos[index],
  }));

  // Ordenando os cursos de acordo com a ordem que estou recebendo a lista do backend
  const cursosOrdenados = [...cursosComNomesEFitness].sort((a, b) => {
    const indexA = ordemCursos.indexOf(a.nomeCurso);
    const indexB = ordemCursos.indexOf(b.nomeCurso);
    return indexA - indexB;
  });

  // Formatação do tempo de ms para segundos
  const formatTime = (ms: number) => {
    const seconds = ms / 1000;
    return seconds.toFixed(2);
  };

  // Organiza as aulas por fase e por dia da semana
  const organizarAulasPorFaseEDia = (curso: any) => {
    const diasDaSemana = [
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
    ];

    const fasesAulas: { [key: string]: { [key: string]: any[] } } = {
      "1° fase": {},
      "2° fase": {},
      "3° fase": {},
      "4° fase": {},
      "6° fase": {},
      "8° fase": {},
    };
  
    const isEngenhariaQuimica = curso.nomeCurso === "Engenharia Química";
  
    // Define as fases para diferenciar os técnicos e ajustar para Engenharia Química, restrição de 6 fases
    const fases = isEngenhariaQuimica
      ? [
          { fase: "2° fase", horario: ["08h - 10h", "10h - 12h"] },
          { fase: "4° fase", horario: ["08h - 10h", "10h - 12h"] },
          { fase: "6° fase", horario: ["08h - 10h", "10h - 12h"] },
        ]
      : cursosTecnicos.includes(curso.nomeCurso)
      ? [
          { fase: "1° fase", horario: ["08h - 10h", "10h - 12h"] },
          { fase: "2° fase", horario: ["08h - 10h", "10h - 12h"] },
          { fase: "3° fase", horario: ["08h - 10h", "10h - 12h"] },
          { fase: "4° fase", horario: ["08h - 10h", "10h - 12h"] },
        ]
      : [
          { fase: "2° fase", horario: ["08h - 10h", "10h - 12h"] },
          { fase: "4° fase", horario: ["08h - 10h", "10h - 12h"] },
          { fase: "6° fase", horario: ["08h - 10h", "10h - 12h"] },
          { fase: "8° fase", horario: ["08h - 10h", "10h - 12h"] },
        ];
  
    // Organiza as aulas por fase e dentro de cada fase, por dia da semana
    curso.codigo.forEach((codigo: any, idx: any) => {
      if (codigo !== -1 && codigo !== null) {
        const faseIdx = Math.floor(idx / 10);
        const horarioIdx = idx % 10 < 5 ? 0 : 1;
  
        const fase = fases[faseIdx].fase;
        const diaIdx = idx % 5;
        const dia = diasDaSemana[diaIdx];
  
        if (!fasesAulas[fase][dia]) {
          fasesAulas[fase][dia] = [];
        }
  
        fasesAulas[fase][dia].push({
          fase,
          horario: fases[faseIdx].horario[horarioIdx],
          codigo,
          nomeMateria: curso.nomeMateria[idx],
          professor: curso.professorMinistrante[idx],
        });
      }
    });
  
    return fasesAulas;
  };

  return (
    <div className="overflow-x-auto p-3 m-6">
      <h1 className="font-semibold text-2xl text-center text-white bg-teal-800 rounded-sm p-4 mb-4">
        Algoritmo Genético - Timetabling Resultados
      </h1>
      <div className="text-center text-sm mb-4 space-x-3">
        <Badge className="rounded-md">
          <span className="text-sm font-semibold">
            Qtd. Iterações sem melhoria: {data.contIteracoes}
          </span>
        </Badge>
        <Badge className="rounded-md">
          <span className="text-sm font-semibold">
            Qtd. Máxima de iterações: {data.iteracoesTotal}
          </span>
        </Badge>
        <Badge className="rounded-md">
          <span className="text-sm font-semibold">
            Nota do melhor cromossomo: {data.bestFitnessScore} (max = 6000)
          </span>
        </Badge>
        <Badge className="rounded-md">
          <span className="text-sm font-semibold">
            Tempo de execução: {formatTime(data.tempoExecucao)} segundos (
            {data.tempoExecucao}ms)
          </span>
        </Badge>
      </div>
      {cursosOrdenados.map((curso, index) => {
        const fasesAulas = organizarAulasPorFaseEDia(curso);

        return (
          <div key={index} className="my-6">
            <div className="flex justify-center items-center text-center bg-neutral-300 rounded-sm p-1 mb-4 space-x-2">
              <h2 className="text-xl font-semibold">{curso.nomeCurso}</h2>  
            </div>

            {Object.keys(fasesAulas).map((fase, faseIdx) => {
              const diasDaFase = fasesAulas[fase];

              if (Object.keys(diasDaFase).length === 0) return null;

              return (
                <div key={faseIdx} className="my-4">
                  <h3 className="text-xl font-semibold mb-2">{fase}</h3>
                  <hr className="bg-teal-800 text-teal-800" />
                  {Object.keys(diasDaFase).map((dia, diaIdx) => {
                    const aulasNoDia = diasDaFase[dia];
                    if (aulasNoDia.length === 0) return null;

                    return (
                      <div key={diaIdx} className="my-4 px-4 py-2">
                        <h4 className="text-lg font-semibold">{dia}</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableCell className="w-1/12">Horário</TableCell>
                              <TableCell className="w-1/12">Código</TableCell>
                              <TableCell className="w-1/12">Matéria</TableCell>
                              <TableCell className="w-1/12">
                                Professor
                              </TableCell>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {aulasNoDia.map((aula, aulaIdx) => (
                              <TableRow key={aulaIdx}>
                                <TableCell>{aula.horario}</TableCell>
                                <TableCell>{aula.codigo}</TableCell>
                                <TableCell>{aula.nomeMateria}</TableCell>
                                <TableCell>{aula.professor}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TableClass;
