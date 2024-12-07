import React from "react";
import { createRoot } from "react-dom/client";
import LivewireContext from "./contexts/LivewireContext";

export default {
    type: "react",
    renderComponent: (componentName, livewireComponent, IntermingleComponent, props) => {
        const root_element = livewireComponent.el.querySelector(".intermingle-root")

        if(!root_element){
            throw new Error("Intermingle root element not found")
        }

        const root = createRoot(root_element)
        
        // Creating a function here to allow us to update the props
        // While maintaining the same root element thus maintaining any state
        const renderComponent = (livewireComponent: LivewireComponent, props: any) => {
            root.render(
                <LivewireContext.Provider value={livewireComponent}>
                    <IntermingleComponent {...props} />
                </LivewireContext.Provider>
            );
        }

        renderComponent(livewireComponent, props);

        return {
            componentName,
            updateProps: renderComponent,
            cleanup: () => {
                root.unmount()
            }
        }
    }
} as IntermingleRenderer;
