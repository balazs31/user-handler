import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }  from './page-not-found.component';
import { UserTableComponent }  from './user-table/user-table.component';

const routes: Routes = [
    { path: 'users', component: UserTableComponent },
	// { path: 'update-user/:id', component: UpdateUserComponent }, 
	{ path: '', redirectTo: '/users', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{ }
