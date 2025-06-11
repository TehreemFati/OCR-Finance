import type React from "react";

interface BreadcrumbNavProps {
    pageTitle?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ pageTitle }) => (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
        </ol>
    </nav>
);

export default BreadcrumbNav;
