import { AppLayout } from "../AppLayout";
import { TopBar } from "../TopBar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <AppLayout>
      <TopBar />
      <Outlet /> 
    </AppLayout>
  );
}