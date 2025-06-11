export const BASE_URL_API = import.meta.env.VITE_BASE_URL;

if (!BASE_URL_API) {
    throw new Error('VITE_BASE_URL_API is missing from environment variables');
}

export const requests = {
    /* documents  */
    documents: BASE_URL_API + 'documents/',
    singleDocument: BASE_URL_API + 'tables_data/',
    uploadDocument: BASE_URL_API + 'upload_doc/',
    download: BASE_URL_API + 'download/', 

}