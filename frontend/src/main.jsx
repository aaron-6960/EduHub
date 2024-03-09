import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Ask, Question, Dashboard, Login, ToDo, Home, Find, EditProfile } from "./pages";
import Chat from "./pages/Chat/Chat.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: "todo",
        element: <ProtectedRoute><ToDo /></ProtectedRoute>,
      },
      {
        path: "ask",
        element: <ProtectedRoute><Ask /></ProtectedRoute>,
      },
      {
        path: "question/:slug",
        element: <ProtectedRoute><Question /></ProtectedRoute>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "chat",
        element: <ProtectedRoute><Chat /></ProtectedRoute>,
      },
      {
        path:"",
        element: <ProtectedRoute><Home/></ProtectedRoute>,
        children: [
          {
            path:"",
            element: <Find/>
          },{
            path:"profile",
            element: <EditProfile/>
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
