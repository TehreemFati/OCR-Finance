import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status}</h1>
                <p>{error.statusText}</p>
                <pre>{JSON.stringify(error.data)}</pre>
            </div>
        );
    }

    return (
        <div>
            <h1>Something went wrong</h1>
            <pre>{error instanceof Error ? error.message : String(error)}</pre>
        </div>
    );
}
