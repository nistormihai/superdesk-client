define([
    'jquery',
    'angular',
    'require',
    'bootstrap-daterange',
    './resources',
    './controllers/ingest',
    './controllers/settings',
    './controllers/ref',
    './directives',
    './filters',
    './services',
    './ingest-widget/ingest',
    './stats-widget/stats',
    './panes/info/info'
], function($, angular, require) {
    'use strict';

    var app = angular.module('superdesk.items', [
        'superdesk.items.resources',
        //'superdesk.items.directives',
        'superdesk.items.filters',
        'superdesk.items.services',
        'superdesk.widgets.ingest',
        'superdesk.widgets.ingeststats',
        'superdesk.panes.info'
    ]);

    app.controller('RefController', require('./controllers/ref'));

    app.value('providerTypes', {
        aap: {
            label: 'AAP',
            templateUrl: require.toUrl('./views/settings/aapConfig.html')
        },
        reuters: {
            label: 'Reuters',
            templateUrl: require.toUrl('./views/settings/reutersConfig.html')
        }
    });

    app.config(['superdeskProvider', function(superdesk) {
        superdesk
            .permission('items-manage', {
                label: gettext('Manage ingest items'),
                permissions: {items: {write: true}}
            })
            .permission('items-read', {
                label: gettext('Read ingest items'),
                permissions: {items: {read: true}}
            });
    }]);

    app.config(['superdeskProvider', function(superdesk) {
        superdesk

            /*
            .activity('/ingest', {
                when: '/ingest/:id?',
                label: gettext('Ingest'),
                templateUrl: 'scripts/superdesk-items/views/ingest.html',
                controller: require('./controllers/ingest'),
                priority: -500,
                category: superdesk.MENU_MAIN,
                filters: [
                    {
                        action: superdesk.ACTION_VIEW,
                        type: 'ingest'
                    }
                ]
            })
            */

            .activity('/settings/ingest', {
                label: gettext('Ingest Feed'),
                templateUrl: require.toUrl('./views/settings/settings.html'),
                controller: require('./controllers/settings'),
                category: superdesk.MENU_SETTINGS
            });

            /*
            .activity('add-scratchpad', {
                label: gettext('Add to scratchpad'),
                icon: 'plus',
                controller: ['scratchpadService', 'data', function(scratchpadService, data) {
                    if (scratchpadService.checkItemExists(data)) {
                        scratchpadService.removeItem(data);
                    } else {
                        scratchpadService.addItem(data);
                    }
                }],
                filters: [
                    {action: 'list', type: 'ingest'}
                ]
            });
            */
    }]);

    app.filter('characterCount', function() {
        return function(input) {
            return $(input).text().length;
        };
    });

    app.filter('wordCount', function() {
        var nonchar = /[^\w]/g;
        var whitesp = /\s+/;
        return function(input) {
            var text = $(input).text();
            return text.replace(nonchar, ' ').split(whitesp).length;
        };
    });

    return app;
});