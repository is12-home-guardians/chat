import React from "react";
import MainLayout from "src/components/wrappers/MainLayout";
import RouterHistory from "src/components/wrappers/RouterHistory";

// Do not change of componet order
export default (
    {
        children
    }: React.Props<{}>
) => (
    <RouterHistory>
        <MainLayout>
            {children}
        </MainLayout>
    </RouterHistory>
);
