// src/router/index.tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import FileUploadPage from '../pages/FileUploadPage';
import InvoicePage from '../pages/InvoicePage';
import ErrorPage from '../components/ErrorPage';
import InvoiceDetailPage from '../pages/InvoiceDetailPage';
// import LoginPage from '../pages/LoginPage';
// import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <InvoicePage /> },
            {
                path: 'invoices',
                children: [
                    { index: true, element: <InvoicePage /> },
                    { path: ':id', element: <InvoiceDetailPage /> },
                    { path: 'new', element: <FileUploadPage /> },
                ],
            },
        ],
        // children: [
        //     {
        //         path: 'login',
        //         element: <LoginPage />,
        //     },
        //     {
        //         path: '/',
        //         element: <ProtectedRoute />,
        //         children: [
        //             { index: true, element: <InvoicePage /> },
        //             {
        //                 path: 'invoices',
        //                 children: [
        //                     { index: true, element: <InvoicePage /> },
        //                     { path: ':id', element: <InvoiceDetailPage /> },
        //                     { path: 'new', element: <FileUploadPage /> },
        //                 ],
        //             },
        //         ],
        //     },
        // ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
