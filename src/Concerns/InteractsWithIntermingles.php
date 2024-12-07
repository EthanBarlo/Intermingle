<?php

namespace EthanBarlo\Intermingle\Concerns;

trait InteractsWithIntermingles
{
    public function render()
    {
        return view('intermingle::livewire.component');
    }
}
