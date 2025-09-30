import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Students from "./pages/Students";
import Assignments from "./pages/Assignments";
import Wallet from "./pages/Wallet";
import Attendance from "./pages/Attendance";
import Scores from "./pages/Scores";
import Settings from "./pages/Settings";
import AttendanceOverview from "./pages/AttendanceOverview";
import Performance from "./pages/Performance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/attendance-overview" element={<AttendanceOverview />} />
          <Route path="/performance" element={<Performance />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
