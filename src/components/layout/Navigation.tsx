import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Trophy, 
  Wallet, 
  Settings,
  LogOut,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const studentNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Assignments", path: "/assignments" },
  { icon: Calendar, label: "Attendance", path: "/attendance" },
  { icon: Trophy, label: "Scores", path: "/scores" },
  { icon: Wallet, label: "Wallet", path: "/wallet" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const teacherNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/teacher-dashboard" },
  { icon: GraduationCap, label: "Students", path: "/students" },
  { icon: Calendar, label: "Attendance", path: "/attendance-overview" },
  { icon: Trophy, label: "Performance", path: "/performance" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface NavigationProps {
  userRole?: "student" | "teacher";
}

export function Navigation({ userRole = "student" }: NavigationProps) {
  const location = useLocation();
  const navItems = userRole === "teacher" ? teacherNavItems : studentNavItems;

  return (
    <nav className="flex flex-col h-full bg-card border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-foreground">EduTrack</span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full flex items-center space-x-3 text-muted-foreground hover:text-foreground"
          onClick={() => {
            // Handle logout
            window.location.href = "/";
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}