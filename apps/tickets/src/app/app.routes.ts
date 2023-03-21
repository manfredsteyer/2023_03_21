import { loadRemoteModule } from '@angular-architects/module-federation';
import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ConfigService } from '@flight-demo/shared/util-config';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WebComponentWrapper, WebComponentWrapperOptions, startsWith } from '@angular-architects/module-federation-tools';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'checkin',
    loadComponent: () => loadRemoteModule('checkin', './Component')
      .then(m => m.AppComponent)
  },
  {
    path: 'angular2',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry:
        'https://gray-pond-030798810.azurestaticapps.net/remoteEntry.js',
      remoteName: 'angular2',
      exposedModule: './web-components',
      elementName: 'angular2-element', // <angular2-element>
    } as WebComponentWrapperOptions,
  },

  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry:
        'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },

  {
    // url: ''
    matcher: startsWith('angular3'),  // angular3
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry:
        'https://gray-river-0b8c23a10.azurestaticapps.net/remoteEntry.js',
      remoteName: 'angular3',
      exposedModule: './web-components',
      elementName: 'angular3-element',
    } as WebComponentWrapperOptions,
  },



  {
    path: '',
    resolve: {
      config: () => inject(ConfigService).loaded$,
    },
    children: [
      {
        path: 'flight-booking',
        loadChildren: () =>
          import('@flight-demo/tickets/feature-booking').then(
            (m) => m.FLIGHT_BOOKING_ROUTES
          ),
      },
      {
        path: 'next-flights',
        loadChildren: () =>
          import('@flight-demo/tickets/feature-next-flights').then(
            (m) => m.NextFlightsModule
          ),
      },
      {
        path: 'about',
        component: AboutComponent,
      },

      // This _needs_ to be the last route!!
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
