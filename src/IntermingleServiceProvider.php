<?php

namespace EthanBarlo\Intermingle;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use EthanBarlo\Intermingle\Commands\IntermingleCommand;

class IntermingleServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('intermingle')
            ->hasConfigFile()
            ->hasViews()
            ->hasMigration('create_intermingle_table')
            ->hasCommand(IntermingleCommand::class);
    }
}
