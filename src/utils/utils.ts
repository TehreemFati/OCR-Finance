export type BalanceRow = {
    DATE: string;
    BALANCE: string;
};

export const calculateTotalBalance = (rows: BalanceRow[]): number => {
    return rows
        .filter(row => row.DATE !== "TOTAL")
        .map(row => {
            const raw = row.BALANCE.replace(/,/g, '').trim();
            if (!raw) return 0;

            const isNegative = raw.endsWith('-');
            const numberPart = isNegative ? raw.slice(0, -1) : raw;
            const parsed = parseFloat(numberPart);
            return isNegative ? -parsed : parsed;
        })
        .reduce((acc, val) => acc + val, 0);
};
