import React, { useState } from 'react';
import DataTable from './DataTable';

const invoiceData = {
    monthly: {
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
    },
    annual: {
        'Average Monthly Revenue': '$4,050,036.00',
        'Average Monthly True Revenue': '$3,534,036.00',
        'Average Monthly Non-True Revenue': '$516,000.00',
        'Average Monthly Expenses': '$3,436,248.00',
        'Average Gross Profit': '$613,788.00',
    }
};

const InvoiceTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'monthly' | 'annual'>('monthly');

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Invoice Summary Scorecard</h2>

            <ul className="nav nav-tabs mb-3">
                {(['monthly', 'annual'] as const).map((tab) => (
                    <li className="nav-item" key={tab}>
                        <button
                            className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>

            <DataTable data={invoiceData[activeTab]} />
        </div>
    );
};

export default InvoiceTabs;
