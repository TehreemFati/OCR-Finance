import React, { useState } from 'react';
import AccordionSection from './AccordionSection';
import DataTable from './DataTable';

interface TableDataRow {
    [key: string]: string; // keys are column names, values are cell strings
}

interface Table {
    table_id: number;
    extracted_at: string;
    table_name: string;
    table_data: TableDataRow[];
}

interface Document {
    document_id: number;
    document_filename: string;
    tables: Table[];
}

interface DocumentAccordionProps {
    document: Document;
}

const DocumentAccordion: React.FC<DocumentAccordionProps> = ({ document }) => {
    // IDs as strings for state keys
    const sectionIds = document.tables.map((table) => table.table_id.toString());

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        sectionIds.reduce((acc, id) => ({ ...acc, [id]: true }), {})
    );

    const toggleSection = (id: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
  
    // const dailyBalanceTable = document.tables.find(t => t.table_name === "DAILY_BALANCE");
// const totalBalance = calculateTotalBalance(dailyBalanceTable?.table_data ?? []);

    return (
        <div className="accordion" id="documentAccordion">
            {document.tables.map(({ table_id, table_name, table_data }) => (
                <AccordionSection
                    key={table_id}
                    id={table_id.toString()}
                    // title={`Table ${table_id} - Extracted at ${extracted_at}`}
                    title={table_name}
                    isOpen={openSections[table_id.toString()]}
                    onToggle={() => toggleSection(table_id.toString())}
                >
                    <DataTable data={table_data} />
                </AccordionSection>
            ))}
        </div>
    );
};

export default DocumentAccordion;
