import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./page-not-found.component";
import { UserTableComponent } from "./pages//user-table/user-table.component";
import { UserDetailComponent } from "./pages/user-detail/user-detail.component";

const routes: Routes = [
  { path: "users", component: UserTableComponent },
  { path: "user-detail/:role/:id", component: UserDetailComponent },
  { path: "user-detail/:role", component: UserDetailComponent },
  { path: "", redirectTo: "/users", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
