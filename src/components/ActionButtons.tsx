import React from 'react';
import { useDownloadExcelDocument } from '../services/queries';
import { toast } from 'react-toastify';
import { requests } from '../services/requests';

interface Document {
    document_id: number;
    document_filename: string;
}

interface DocumentAccordionProps {
    doc: Document;
}

const ActionButtons: React.FC<DocumentAccordionProps> = ({ doc }) => {
    const { isFetching } = useDownloadExcelDocument(doc?.document_id);

    // const handleDownload = async () => {
    //     try {
    //         const { data: blob } = await refetch();

    //         if (!blob) {
    //             throw new Error('No data received');
    //         }

    //         const excelBlob = new Blob([blob], {
    //             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //         });

    //         const url = window.URL.createObjectURL(excelBlob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = `document_${doc?.document_filename || 'download'}.xlsx`;
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //         toast.success('Excel file downloaded successfully!');
    //     } catch (err) {
    //         toast.error('Download failed');
    //         console.error('Download error:', err);
    //     }
    // };

    const handleDownload = (id:number) => {
        const fileUrl = `${requests.download}${id}`;
        toast.success('Excel file downloaded successfully!');
        window.open(fileUrl, '_self');
    };

    return (
        <div className="mb-4 d-flex gap-2">
            <button className="btn btn-primary">Print</button>
            <button className="btn btn-secondary">Share</button>
            <button className="btn btn-success" onClick={() => handleDownload(doc?.document_id)} disabled={isFetching}>
                {isFetching ? 'Downloading...' : 'Download Excel'}
            </button>
        </div>
    );
};

export default ActionButtons;
