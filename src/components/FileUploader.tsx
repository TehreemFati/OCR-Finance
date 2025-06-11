import React from 'react';

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
    acceptedTypes?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    onFileSelect,
    acceptedTypes = '.pdf',
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            console.log(e.target.files)
            onFileSelect(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files?.length) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const preventDefault = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    return (
        <div
            className="border border-2 border-secondary rounded p-5 text-center bg-white shadow-sm"
            style={{ width: '100%', maxWidth: '420px', cursor: 'pointer' }}
            onDrop={handleDrop}
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
        >
            <i className="bi bi-cloud-arrow-up-fill fs-1 text-primary mb-3"></i>
            <h5 className="mb-3">Drag & Drop or Click to Upload</h5>

            <input
                type="file"
                accept={acceptedTypes}
                className="form-control mb-2"
                onChange={handleChange}
            />

            <small className="text-muted">Accepted: PDF</small>
        </div>
    );
};

export default FileUploader;
