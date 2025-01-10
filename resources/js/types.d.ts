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
    $wire: Wire;
    children: any[];
    snapshot: any;
    shapshotEncoded: string;
}

export type Wire = {
    $parent: Wire | null;
    $el: HTMLElement;
    $id: string;
    $get: (key: string) => any;
    $set: (key: string, value: any, live: boolean) => void;
    $toggle: (key: string, live: boolean) => void;
    $call: (method: string, ...args: any[]) => Promise<any>;
    $watch: (key: string, callback: (value: any) => void) => void;
    $refresh: () => void;
    $commit: () => void;
    $on: (event: string, callback: (...args: any[]) => void) => void;
    $dispatch: (event: string, params: object) => void;
    $dispatchTo: (component: string, event: string, params: object) => void;
    $dispatchSelf: (event: string, params: object) => void;
    $upload: (name: string, file:File, finish: (response: any) => void, error: (response: any) => void, progress: (event: { detail: { progress: number } } ) => void) => Promise<void>;
    $uploadMultiple: (name: string, files: File[], finish: (response: any) => void, error: (response: any) => void, progress: (event: { detail: { progress: number } } ) => void) => Promise<void>;
    $removeUpload: (name: string, tmpFilename: string, finish: (response: any) => void, error: (response: any) => void) => Promise<void>;
    __instance: () => LivewireComponent;
}

interface Window {
    Intermingle: {
        components: ComponentsMap;
        renderedComponents: {
            [key: string]: RenderedComponent
        };
        config: Omit<Config, 'renderers'> & {
            renderers: {
                [key: string]: RenderFunction
            };
        }
    } | undefined;
}

type Config = {
    renderers: IntermingleRenderer[];
    renderAttempts: number;
    renderDelay: number;
}

type RenderedComponent = {
    componentName: string;
    updateProps: (livewireComponent: LivewireComponent, props: any) => void;
    cleanup: CleanupCallback;
}

type RenderFunction = (componentName: string, livewireComponent: LivewireComponent, IntermingleComponent: any, props: any) => RenderedComponent;

type IntermingleRenderer = {
    type: string;
    renderComponent: RenderFunction;
}