import React from 'react'

interface DetailsTableProps {
    headers: string[];
    action?: boolean;
    actionClass: string;
    attachment?: boolean;
    attachmentTitle?: string;
    children: any
}

const DetailsTable: React.FC<DetailsTableProps> = (
    {
        headers,
        action,
        actionClass,
        attachment,
        attachmentTitle,
        children
    }
) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped mb-0">
                <thead className='sticky-header'>
                    <tr>
                        {/* Dynamically render column headers based on the 'headers' prop */}
                        {headers?.map((head: string, idx: number) =>
                            <th scope='col' key={idx}>{head}</th>
                        )}
                        {/* Conditionally render attachment column if 'attachment' prop exists */}
                        {attachment && <th scope="col" className={`text-center ${actionClass}`}>{attachmentTitle}</th>}
                        {/* Conditionally render actions column if 'action' prop exists */}
                        {action && <th scope="col" className={`text-center ${actionClass}`}>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {/* Render table rows based on the 'children' prop */}
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default DetailsTable