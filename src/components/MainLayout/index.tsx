
import { Outlet } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { TopBar } from "@/components/TopBar";

export function MainLayout() {
  return (
    <AppLayout>
      <TopBar/>
      <Outlet /> 
    </AppLayout>
  );
}