import { useQuery } from '@tanstack/react-query';
import { apiCall } from './apiService';
import { requests } from './requests';
import axios from 'axios';

export const useDocuments = (filters = {}) => 
    useQuery<any>({
        queryKey: ['documents', filters],
        queryFn: () => apiCall({  
            url: requests.documents, 
            method: 'get', 
            params: filters,
        }),
        retry: false,
        // retry: 1,
        // retryDelay: attemptIndex => Math.min(1000 * 1 ** attemptIndex, 3000),
    });

export const useSingleDocument = (id: string | undefined) => 
    useQuery({
        queryKey: ['singleDocument', id],
        queryFn: () => apiCall({  
            url: `${requests.singleDocument}${id}`, 
            method: 'get', 
        }),
        enabled: !!id,
        retry: false,
        // staleTime: 5 * 60 * 1000,
    });

export const useDownloadExcelDocument = (id?: number) => {
    return useQuery({
        queryKey: ['downloadExcel', id],
        queryFn: async () => {
            const response = await axios.get(`${requests.download}${id}`, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            return blob; // return blob to use in UI
        },
        enabled: false, // prevent auto execution
        retry: false,
    });
};

