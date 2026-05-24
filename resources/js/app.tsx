import "../css/app.css";
// import './bootstrap';

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import BasicLayout from "@/Layouts/BasicLayout";
const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        );
        const adminPages = ["Dashboard", "Users/Index", "Reports/Index"];
        page.then((module: any) => {
            if (adminPages.includes(name)) {
                module.default.layout =
                    module.default.layout ??
                    ((page: React.ReactNode) => (
                        <BasicLayout>{page}</BasicLayout>
                    ));
            }
        });

        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
