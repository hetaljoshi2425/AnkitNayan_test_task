import { useRoutes } from "react-router-dom";
import Home from "../Container/Home";
import FirstFile from "../pages/Content/FirstFile";

const ROUTES = [
    {
        path: "/",
        element: <Home />,
        children: [
            {
                index: true,
                element: <FirstFile />,
            },
        ],
    }]
export const RouteWrapper = () => {
    const routes = useRoutes(ROUTES);
    return routes;
};
