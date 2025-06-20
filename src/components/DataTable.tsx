import React from 'react';
import { calculateTotalBalance, type BalanceRow } from '../utils/utils';

interface DataTableProps {
    data: any;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    if (!data.length) return <p>No data available</p>;

    // Get all column keys from the first row
    const columns = Object.keys(data[0]);
    const numericColumn = columns.find(col =>
       col.toUpperCase() === 'BALANCE'
    );

    const total = numericColumn
        ? calculateTotalBalance(data as BalanceRow[])
        : null;

    console.log(total)

    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col} className={col === 'AMOUNT' ? 'text-end' : undefined}>{col}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row:any, idx:number) => (
                    <tr key={idx}>
                        {columns.map((col) => (
                            <td key={col} className={col === 'AMOUNT' ? 'text-end' : undefined}>
                                {row[col]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
