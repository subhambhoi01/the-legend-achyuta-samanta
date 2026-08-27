import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SpiritualJourney } from './pages/spiritual-journey/spiritual-journey';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },
    {
    path: 'spiritual-journey',
    component: SpiritualJourney,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
