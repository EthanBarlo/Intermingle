@assets
    <script type="module" src="{{ $this->getAssetUrl() }}"></script>
@endassets


<div data-intermingle-component="{{ $this->component() }}" data-intermingle-props="{{ json_encode($this->props()) }}">
    <div wire:ignore class="intermingle-root"></div>
</div>