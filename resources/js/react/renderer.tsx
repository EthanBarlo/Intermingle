import React from "react";
import { createRoot } from "react-dom/client";
import LivewireContext from "./contexts/LivewireContext";


export default {
    type: "react",
    renderComponent: (livewireComponent, IntermingleComponent, props) => {
        const root = createRoot(livewireComponent.el)
        
        root.render(
            <LivewireContext value={livewireComponent}>
                <IntermingleComponent {...props} />
            </LivewireContext>
        );

        return () => root.unmount();
    }
} as IntermingleRenderer;
