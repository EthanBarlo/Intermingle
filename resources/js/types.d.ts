type CleanupCallback = () => void;

type ComponentsMap = {
    [key: string]: {
        type: string;
        component: any;
    }
}

type LivewireComponent = {
    el: HTMLElement;
    id: string;
    name: string;
    effects: any;
    canonical: any;
    ephemeral: any;
    reactive: any;
    $wire: any;
    children: any[];
    snapshot: any;
    shapshotEncoded: string;
}

interface Window {
    Intermingle: {
        initialized: boolean;
        components: ComponentsMap;
        renderers: {
            [key: string]: RenderFunction
        };
    } | undefined;
}

type RenderFunction = (livewireComponent: LivewireComponent, IntermingleComponent: any, props: any) => CleanupCallback;

type IntermingleRenderer = {
    type: string;
    renderComponent: RenderFunction;
}