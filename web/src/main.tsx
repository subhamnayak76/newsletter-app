import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { SignupPage ,ErrorPage} from "./routes/index.ts";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { ConfirmEmailSent } from "./routes/confirm-email-sent";

const router = createBrowserRouter ([
  {
  path:"/",
  element: <SignupPage/>,
  errorElement: <ErrorPage/>
  
   },
   {
    path: "/confirm-email-sent",
    element: <ConfirmEmailSent />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
