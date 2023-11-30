import { useQuery } from "react-query";
import api from "../services/api";


export type VersatilityResponse = {
    message: string;
    success: boolean;
    data: Versatility[];
    dateTime: string;
}

export type Versatility = {
    id: string;
    nome: string;
    estacaoDeTrabalho: string;
    alerta: string;
}


export async function getVersatility(): Promise<VersatilityResponse> {
    const { data } = await api.get('versatilities');

    return data;
}



export function useVersatility() {
    return useQuery(['versatilidade'], () => getVersatility(), {
        staleTime: 1000 * 60 * 1, //1 minutos
        refetchInterval: 1000 * 60 * 1 //1 minutos
    })
}