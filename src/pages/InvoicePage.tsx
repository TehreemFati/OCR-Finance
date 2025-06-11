// pages/InvoicePage.tsx
import React, { useState } from 'react';
// import BreadcrumbNav from '../components/BreadcrumbNav';
import DetailsTable from '../components/DetailsTable';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/ModalComponent';
import { useDocuments } from '../services/queries';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { formatedDate } from '../services/utils';
import Pagination from '../components/Pagination';
import { listingLimitValues } from '../types/enums';

const InvoicePage: React.FC = () => {
    // const headers: string[] = ['Owner', 'App Number', 'Date Created', 'Statements']    
    const headers: string[] = ['File Name', 'Date Created']

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    // const [limit, setLimit] = useState(Number(listingLimitEnum.TEN));
    const [limit, setLimit] = useState<number>(listingLimitValues[0]);


    const skip = (currentPage - 1) * limit;
    const { data, isLoading, error } = useDocuments({ skip, limit });
    const totalDocs = data?.count || 0;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    const handleDelete = () => {
        setShowModal(false);
    };

    if (isLoading) return <Loader />;

    return (
        <>
            {error && <Toast message={error.message || 'Something went wrong'} />}
            <div className="mt-4">
                {/* <BreadcrumbNav pageTitle={"Invoices"} /> */}
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                    <h5 className="mb-2">Documents</h5>
                </div>

                <DetailsTable headers={headers}
                    action={true}
                    actionClass={'stick-row'}
                    attachment={false}
                    attachmentTitle={''}>
                    {data?.documents?.length > 0 ? data?.documents?.map((data: any) => (
                        <tr key={data?.id}>
                            <td>{data?.filename}</td>
                            <td>{data?.created_at ? formatedDate(data?.created_at) : ''}</td>
                            <td className='text-center stick-row'>
                                <i className="bi bi-eye text-primary me-2" role='button' onClick={() => navigate(`/invoices/${data?.id}`)} />
                                <i className="bi bi-trash text-danger" role='button' onClick={() => setShowModal(true)} />
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={headers.length + 1} className="text-center text-muted">
                                No documents found
                            </td>
                        </tr>)}
                </DetailsTable>
                <Pagination
                    currentPage={currentPage}
                    limit={limit}
                    totalCount={totalDocs}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                />
            </div>
            <Modal
                show={showModal}
                title="Delete Article"
                msg="Do you want to delete this article?"
                btn="Yes"
                onSubmit={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};

export default InvoicePage;
