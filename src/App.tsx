import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorldLayout from "@/components/WorldLayout";
import Index from "./pages/Index";
import Sketchbook from "./pages/Sketchbook";

import Companions from "./pages/Companions";
import Reflections from "./pages/Reflections";
import RestrictedArea from "./pages/RestrictedArea";
import ResearchWing from "./pages/ResearchWing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WorldLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/wall" element={<Sketchbook />} />
            
            <Route path="/pets" element={<Companions />} />
            <Route path="/mood" element={<Reflections />} />
            <Route path="/lindsay-only" element={<RestrictedArea />} />
            <Route path="/audiology" element={<ResearchWing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WorldLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
