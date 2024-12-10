import renderIntermingleComponent from "./renderIntermingleComponent";
import {
    getComponentName,
    getProps,
    getRenderedComponent,
    setRenderedComponent,
} from "./utils";

export default async function initializeIntermingle(
    Livewire: any,
    config: Config
) {
    const { renderers, renderAttempts = 1, renderDelay = 0 } = config;

    window.Intermingle = {
        components: {},
        renderedComponents: {},
        config: {
            renderers: Object.fromEntries(renderers.map(r => [r.type, r.renderComponent])),
            renderAttempts,
            renderDelay,
        },
    };

    // Handle component initialization
    Livewire.hook("component.init", async ({ component, cleanup }) => {
        const componentName = getComponentName(component.el);

        if (!componentName) {
            return; // Not an intermingle component
        }

        try {
            const renderedComponent = await renderIntermingleComponent(component, componentName);
            setRenderedComponent(component.id, renderedComponent);
            cleanup(() => renderedComponent.cleanup());
        } catch (e) {
            throw new Error("Error rendering intermingle component: " + e);
        }
    });

    // Handle component updates
    Livewire.hook("morph.updated", ({ el, component }) => {
        try {
            const rendered = getRenderedComponent(component.id);
            let props = getProps(component.el);
            rendered.updateProps(component, props);
        } catch (e) {
            return; // Not an intermingle rendered component - silently ignore
        }
    });
}