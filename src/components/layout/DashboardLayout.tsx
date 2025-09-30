import { Navigation } from "./Navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: "student" | "teacher";
}

export function DashboardLayout({ children, userRole = "student" }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 fixed inset-y-0 left-0 z-50">
        <Navigation userRole={userRole} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}