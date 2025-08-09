import { Routes } from '@angular/router';

export const routes: Routes = [
     {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
     {
        path:'login',
        loadComponent:() => import('./features/auth/login/login').then(c => c.Login)
    }, 
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
    {
        path: 'printer-board',
        loadComponent: () => import('./features/printer/printer-board/printer-board').then(c => c.PrinterBoard)
    },
     {
        path: 'branch-board',
        loadComponent: () => import('./features/branch/branch-board/branch-board').then(c => c.BranchBoard)
    },

];
