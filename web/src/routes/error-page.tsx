import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import "."
export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    if(!isRouteErrorResponse(error)){
        return<div>Something wrong happen</div>
    }
    return(    
        <div className="text-center text-red-700">
            <h1>Page not found</h1>
            <p>Sorry, but the page you were trying to view does not exist.</p>
            <p>
                <i>{error.statusText}  </i>
            </p>
        </div>
    );
}