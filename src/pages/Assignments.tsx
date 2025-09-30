import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Upload,
  Calendar,
  FileText
} from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Math Assignment #3: Calculus Problems",
    subject: "Mathematics",
    dueDate: "2024-01-15",
    status: "pending",
    description: "Complete exercises 1-20 from Chapter 5",
    points: 100,
    submitted: false
  },
  {
    id: 2,
    title: "History Essay: World War II Analysis",
    subject: "History", 
    dueDate: "2024-01-18",
    status: "submitted",
    description: "Write a 1000-word essay analyzing the causes of WWII",
    points: 150,
    submitted: true,
    submittedDate: "2024-01-16"
  },
  {
    id: 3,
    title: "Science Lab Report: Chemical Reactions",
    subject: "Science",
    dueDate: "2024-01-20",
    status: "overdue", 
    description: "Submit lab report with experimental results and analysis",
    points: 120,
    submitted: false
  },
  {
    id: 4,
    title: "English Presentation: Shakespeare Analysis",
    subject: "English",
    dueDate: "2024-01-25",
    status: "pending",
    description: "10-minute presentation on themes in Hamlet",
    points: 130,
    submitted: false
  },
  {
    id: 5,
    title: "Math Quiz: Trigonometry",
    subject: "Mathematics", 
    dueDate: "2024-01-12",
    status: "submitted",
    description: "Online quiz covering sine, cosine, and tangent functions",
    points: 80,
    submitted: true,
    submittedDate: "2024-01-11",
    grade: "A-",
    score: 88
  }
];

export default function Assignments() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted": return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "overdue": return <XCircle className="w-4 h-4 text-destructive" />;
      case "pending": return <Clock className="w-4 h-4 text-warning" />;
      default: return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted": return <Badge variant="secondary" className="bg-success-light text-success">Submitted</Badge>;
      case "overdue": return <Badge variant="secondary" className="bg-destructive-light text-destructive">Overdue</Badge>; 
      case "pending": return <Badge variant="secondary" className="bg-warning-light text-warning">Pending</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `Due in ${diffDays} days`;
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
            <p className="text-muted-foreground">Manage your coursework and submissions</p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search assignments..."
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <BookOpen className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{assignments.length}</div>
              <p className="text-xs text-muted-foreground">Assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="w-4 h-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {assignments.filter(a => a.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Need submission</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <XCircle className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {assignments.filter(a => a.status === "overdue").length}
              </div>
              <p className="text-xs text-muted-foreground">Past deadline</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {assignments.filter(a => a.status === "submitted").length}
              </div>
              <p className="text-xs text-muted-foreground">Submitted</p>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    {getStatusIcon(assignment.status)}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {assignment.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {assignment.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{assignment.subject}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{getDaysUntilDue(assignment.dueDate)}</span>
                        </span>
                        <span>{assignment.points} points</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(assignment.status)}
                  </div>
                </div>

                {/* Submission Info */}
                {assignment.submitted && (
                  <div className="bg-success-light/50 p-3 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm text-success">
                          Submitted on {assignment.submittedDate}
                        </span>
                      </div>
                      {assignment.grade && (
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-success text-white">
                            {assignment.grade}
                          </Badge>
                          <span className="text-sm text-success">{assignment.score}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  {!assignment.submitted && (
                    <Button 
                      variant={assignment.status === "overdue" ? "destructive" : "default"}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Submit Assignment</span>
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {assignment.submitted && (
                    <Button variant="ghost" size="sm">
                      View Submission
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}