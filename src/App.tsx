import "./App.css";
import { AppLayout } from "./components/AppLayout";
import { ProductGrid } from "./components/ProductGrid";
import { TopBar } from "./components/TopBar";

function App() {
  

  return (
    <AppLayout>
      <TopBar/>
      <ProductGrid/>
    </AppLayout>
  );
}

export default App;
