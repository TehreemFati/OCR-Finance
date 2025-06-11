// pages/InvoicePage.tsx
import React, { useState } from 'react';
import AccordionSection from '../components/AccordionSection';
import ActionButtons from '../components/ActionButtons';
import BreadcrumbNav from '../components/BreadcrumbNav';
// import RevenueLineChart from '../components/LineChart';
import DataTable from '../components/DataTable';
import { useParams } from 'react-router-dom';
import { useSingleDocument } from '../services/queries';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import DocumentAccordion from '../components/DocumentAccordion';

const sectionIds = ['one', 'two', 'three', 'four', 'five'];

const InvoiceDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, error } = useSingleDocument(id);

    // All sections open by default
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        sectionIds.reduce((acc, id) => ({ ...acc, [id]: true }), {})
    );

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const revenueStatistics = {
        'Average Monthly Revenue': '$337,503.00',
        'Average Monthly True Revenue': '$294,503.00',
        'Average Monthly Non-True Revenue': '$43,000.00',
        'Average Monthly Expenses': '$286,354.00',
        'Average Gross Profit': '$51,149.00',
        'Combined Average Daily Balance': '$93,477.72',
        'Combined Average Daily True Balance': '$57,811.05',
        'Minimum Monthly True Revenue': '$294,502.80',
        'Average Monthly Factoring Revenue': '$0.00',
        'Average Monthly Credit Card Revenue': '$2,332.00',
        'MCA Withhold Percent': '5%',
        'Days Negative': '0',
        'Combined Days Negative': '0',
        'Low Days': '0',
    };

    const statementsSummary: any = {
        'Total Invoices': 124,
        'Paid Invoices': 118,
        'Unpaid Invoices': 6,
        'Average Days to Pay': 23,
        'Outstanding Balance': '$45,320.00',
    };

    const mcaByMonth = {
        'January': '$50,000.00',
        'February': '$45,000.00',
        'March': '$60,000.00',
        'April': '$55,000.00',
        'May': '$52,000.00',
    };

    const repeatingTransactions = {
        'Rent': '$2,000.00',
        'Software Subscription': '$500.00',
        'Marketing': '$1,200.00',
        'Utilities': '$300.00',
        'Salaries': '$15,000.00',
        'Office Supplies': '$150.00',
        'Insurance': '$400.00',
        'Miscellaneous': '$350.00',
    };

    if (data && data.tables && !data.tables.some((t: any) => t.table_id === 1000 || t.table_id === 999 || t.table_id === 998)) {
        data.tables = [...data.tables, {
            table_id: 998,
            table_name: "Repeating Transactions",
            table_data: [
                { DATE: "2024-12-02", DESCRIPTION: "Credibly DES:8886641444 ID:XXXXXXXXX INDN:PINK POLISH NAIL", AMOUNT: "$888.48", MEMO: "ID:9471419528 CCD", NUMBER: "0" },
                { DATE: "2024-12-03", DESCRIPTION: "Credibly DES:8886641444 ID:XXXXXXXXX INDN:PINK POLISH NAIL", AMOUNT: "$888.48", MEMO: "ID:9471419528 CCD", NUMBER: "0" },
                { DATE: "2024-12-04", DESCRIPTION: "Credibly DES:8886641444 ID:XXXXXXXXX INDN:PINK POLISH NAIL", AMOUNT: "$888.48", MEMO: "ID:9471419528 CCD", NUMBER: "0" },
                { DATE: "2024-12-05", DESCRIPTION: "Credibly DES:8886641444 ID:XXXXXXXXX INDN:PINK POLISH NAIL", AMOUNT: "$888.48", MEMO: "ID:9471419528 CCD", NUMBER: "0" },
            ]
        }, {
            table_id: 999,
            table_name: "MCA Transactions",
            table_data: [
                { ACCOUNT: 'xxxx6929', DATE: "2024-12-02", DESCRIPTION: "Credibly DES:8886641444 ID:XXXXXXXXX INDN:PINK POLISH NAIL", AMOUNT: "$888.48", MEMO: "ID:9471419528 CCD", NUMBER: "0" },
                { ACCOUNT: 'xxxx6929', DATE: "2024-12-03", DESCRIPTION: "Credibly DES:8886641444 ID:XXXXXXXXX INDN:PINK POLISH NAIL", AMOUNT: "$888.48", MEMO: "ID:9471419528 CCD", NUMBER: "0" },
                { ACCOUNT: 'xxxx6929', DATE: "2024-12-04", DESCRIPTION: "Credibly DES:8886641444 ID:XXXXXXXXX INDN:PINK POLISH NAIL", AMOUNT: "$888.48", MEMO: "ID:9471419528 CCD", NUMBER: "0" },
                { ACCOUNT: 'xxxx6929', DATE: "2024-12-05", DESCRIPTION: "Credibly DES:8886641444 ID:XXXXXXXXX INDN:PINK POLISH NAIL", AMOUNT: "$888.48", MEMO: "ID:9471419528 CCD", NUMBER: "0" },
            ]
        }, {
            table_id: 1000,
            table_name: "Overdraft Transactions",
            table_data: [
                { DATE: "2025-02-24", DESCRIPTION: "Fee", AMOUNT: "$10.00", MEMO: "OVERDRAFT ITEM FEE FOR ACTIVITY OF 02-24", NUMBER: "0" },
            ]
        }];
    }

    if (isLoading) return <Loader />;

    return (
        <>
            {error && <Toast message={error.message || 'Something went wrong'} />}
            <div className="container mt-4">
                <BreadcrumbNav pageTitle={"Invoice Detail"} />
                <ActionButtons doc={data} />

                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                    <h5 className="mb-2">{data?.document_filename}</h5>
                </div>

                <DocumentAccordion document={data} />

                {/* <div className="accordion" id="invoiceAccordion">
                    <AccordionSection
                        id="one"
                        title="Revenue Statistics"
                        isOpen={openSections['one']}
                        onToggle={() => toggleSection('one')}
                    >
                        <DataTable data={revenueStatistics} />
                    </AccordionSection>
                    <AccordionSection
                        id="three"
                        title="Statements Summary"
                        isOpen={openSections['three']}
                        onToggle={() => toggleSection('three')}
                    >
                        <DataTable data={statementsSummary} />
                    </AccordionSection>

                    <AccordionSection
                        id="four"
                        title="MCA By Month"
                        isOpen={openSections['four']}
                        onToggle={() => toggleSection('four')}
                    >
                        <DataTable data={mcaByMonth} />
                    </AccordionSection>

                    <AccordionSection
                        id="five"
                        title="Repeating Transactions (8)"
                        isOpen={openSections['five']}
                        onToggle={() => toggleSection('five')}
                    >
                        <DataTable data={repeatingTransactions} />
                    </AccordionSection>
                </div> */}
            </div>
        </>
    );
};

export default InvoiceDetailPage;
