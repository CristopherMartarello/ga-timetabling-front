import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  export interface Curso {
    codigo: (number | null)[];
    nomeMateria: (string | null)[];
    professorMinistrante: (string | null)[];
  }
  
  export interface DataProps {
    bestFitnessScore: [];
    contIteracoes: number;
    objTabela: Curso[];
    tempoExecucao: number;
  }
  
  interface TableClassProps {
    data: DataProps; 
  }
  
  const AditionalInfo = ({ data }: TableClassProps) => {
    return (
      <div className="overflow-x-auto">
        {data.objTabela.map((curso, index) => (
          <div key={index} className="my-6">
            <h2 className="text-2xl font-semibold mb-4">Curso {index + 1}</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Horário</TableCell>
                  <TableCell>Matéria</TableCell>
                  <TableCell>Professor</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {curso.codigo.map((code, idx) => {
                  if (code === -1 || code === null) return null;
                  return (
                    <TableRow key={idx}>
                      <TableCell>{`Horário ${code}`}</TableCell>
                      <TableCell>{curso.nomeMateria[idx]}</TableCell>
                      <TableCell>{curso.professorMinistrante[idx]}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    );
  };
  
  export default AditionalInfo;
  