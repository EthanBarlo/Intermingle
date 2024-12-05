<?php

namespace EthanBarlo\Intermingle\Commands;

use Illuminate\Console\Command;

class IntermingleCommand extends Command
{
    public $signature = 'intermingle';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
