// import axios from 'axios';

// export interface ApiCallProps {
//     url: string;
//     method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
//     params?: any;
// }

// export const apiCall = async ({
//     url,
//     method = 'get',
//     params,
// }: ApiCallProps): Promise<any> => {
//     try {
//         const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

//         const headers: Record<string, string> = {
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json'
//         };
//         if (token) headers['Authorization'] = `Bearer ${token}`;

//         // Check if params is FormData
//         const isFormData = params instanceof FormData;
//         if (!isFormData) {
//             headers['Content-Type'] = 'application/json';
//         }

//         const client = axios.create({             
//             headers
//         });

//         let response;

//         switch (method) {
//             case 'post':
//                 response = await client.post(url, params);
//                 break;
//             case 'put':
//                 response = await client.put(url, params);
//                 break;
//             case 'patch':
//                 response = await client.patch(url, params);
//                 break;
//             case 'delete':
//                 response = await client.delete(url, { params });
//                 break;
//             default:
//                 response = await client.get(url, { params });
//         }

//         return response.data;
//     } catch (error: any) {
//         if (axios.isAxiosError(error)) {
//             throw error.response?.data?.message || 'Something went wrong';
//         }
//         throw error.message || 'Unknown error';
//     }
// };


import axios from 'axios';
import axiosInstance from './axiosInstance';

export interface ApiCallProps {
  url: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  params?: any;
}

export const apiCall = async ({
  url,
  method = 'get',
  params = {},
}: ApiCallProps): Promise<any> => {
  try {
    const isFormData = params instanceof FormData;
    const headers: Record<string, string> = isFormData ? {} : { 
      'ngrok-skip-browser-warning': "true",
      'Content-Type': 'application/json' 
    };

    const response = await axiosInstance.request({
      url,
      method,
      headers: {
        ...axiosInstance.defaults.headers.common, // Preserve interceptor headers
        ...headers,
      },
      ...(method === 'get' || method === 'delete' ? { params } : { data: params }),
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        throw new Error('Unauthorized: Please log in again.');
      } else if (status === 403) {
        throw new Error('Forbidden: You do not have access.');
      } else {
        throw new Error(error.response?.data?.message || 'Something went wrong');
      }
    } else {
      throw new Error('Network error or server is unreachable');
    }
  }
};