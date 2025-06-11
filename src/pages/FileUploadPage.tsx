import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import { apiCall } from '../services/apiService';
import { requests } from '../services/requests';

const FileUploadPage = () => {
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileUpload = async (file: File) => {
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await apiCall({
                url: requests.uploadDocument,
                method: 'post',
                params: formData,
            });

            const documentId = response?.document_id;

            if (documentId) {
                navigate(`/invoices/${documentId}`);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center">
            <div className="text-center py-5">
                <FileUploader onFileSelect={handleFileUpload} />

                {isUploading && (
                    <div className="mt-4">
                        <div className="spinner-border text-primary" role="status" />
                        <p className="mt-2 text-muted">Uploading...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploadPage;
