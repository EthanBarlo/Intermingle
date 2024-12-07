<?php

namespace EthanBarlo\Intermingle\Concerns;

use Illuminate\Support\Facades\Vite;

trait InteractsWithIntermingles
{
    public function render()
    {
        return view('intermingle::livewire.component');
    }

    public function getAssetUrl(): string
    {
        return Vite::asset($this->component());
    }
}
