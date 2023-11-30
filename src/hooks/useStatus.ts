import { useQuery } from "react-query";
import api from "../services/api";


export type StatusResponse = {
  message: string;
  success: string;
  data: Status[];
  dateTime: string;
};


export type Status = {
  id: string;
  sala: string,
  medico: string,
  paciente: string,
  checkIn?: number,
  medicacao?: number,
  inicioPrevisto: string,
  processamento: string,
  liberacao: string,
  desempenho: string,
  abastecimento: string
}


export async function getStatus(): Promise<StatusResponse> {
  const { data } = await api.get('states');

  return data;
}

export function useStatus() {
  return useQuery(['status'], () => getStatus(), {
    staleTime: 1000 * 60 * 1, //1 minutos
    refetchInterval: 1000 * 60 * 1 //1 minutos
  })
}