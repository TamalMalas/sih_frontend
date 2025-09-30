import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  AlertTriangle, 
  Clock,
  CheckCircle2,
  XCircle,
  Coins,
  Star,
  Target
} from "lucide-react";

const attendanceData = {
  percentage: 75,
  status: "medium",
  totalClasses: 40,
  attended: 30,
  missed: 10
};

const assignmentData = [
  { title: "Math Assignment #3", dueDate: "2024-01-15", status: "pending", subject: "Mathematics" },
  { title: "History Essay", dueDate: "2024-01-18", status: "submitted", subject: "History" },
  { title: "Science Lab Report", dueDate: "2024-01-20", status: "overdue", subject: "Science" },
  { title: "English Presentation", dueDate: "2024-01-25", status: "pending", subject: "English" }
];

const recentScores = [
  { subject: "Mathematics", score: 85, grade: "A", recent: true },
  { subject: "History", score: 78, grade: "B+", recent: true },
  { subject: "Science", score: 92, grade: "A", recent: false },
  { subject: "English", score: 88, grade: "A-", recent: false }
];

export default function StudentDashboard() {
  const getAttendanceColor = (status: string) => {
    switch (status) {
      case "high": return "text-success";
      case "medium": return "text-warning";
      case "low": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted": return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "overdue": return <XCircle className="w-4 h-4 text-destructive" />;
      case "pending": return <Clock className="w-4 h-4 text-warning" />;
      default: return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
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

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 p-6 rounded-lg border border-border/50">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Here's your academic progress overview.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Attendance */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Calendar className={`w-4 h-4 ${getAttendanceColor(attendanceData.status)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">{attendanceData.percentage}%</div>
              <Progress value={attendanceData.percentage} className="mb-2" />
              <p className="text-xs text-muted-foreground">
                {attendanceData.attended}/{attendanceData.totalClasses} classes attended
              </p>
            </CardContent>
          </Card>

          {/* Assignments */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <BookOpen className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">3</div>
              <p className="text-xs text-muted-foreground">Pending submissions</p>
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          {/* Average Score */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Trophy className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">85.8</div>
              <p className="text-xs text-success">+2.3 from last month</p>
              <TrendingUp className="w-4 h-4 text-success mt-1" />
            </CardContent>
          </Card>

          {/* Reward Points */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
              <Coins className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">1,240</div>
              <p className="text-xs text-muted-foreground">Available to redeem</p>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-accent hover:text-accent/80 mt-1">
                View Wallet
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Recent Assignments</span>
              </CardTitle>
              <CardDescription>Your upcoming and recent assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignmentData.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(assignment.status)}
                    <div>
                      <p className="font-medium text-foreground">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.subject} • Due {assignment.dueDate}</p>
                    </div>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Assignments
              </Button>
            </CardContent>
          </Card>

          {/* Recent Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span>Recent Scores</span>
              </CardTitle>
              <CardDescription>Your latest academic performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentScores.map((score, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      score.score >= 90 ? 'bg-success-light text-success' : 
                      score.score >= 80 ? 'bg-warning-light text-warning' : 
                      'bg-destructive-light text-destructive'
                    }`}>
                      <span className="font-bold">{score.grade}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{score.subject}</p>
                      <p className="text-sm text-muted-foreground">Score: {score.score}%</p>
                    </div>
                  </div>
                  {score.recent && (
                    <Badge variant="secondary" className="bg-primary-light text-primary">
                      <Star className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Scores
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* At-Risk Alert */}
        {attendanceData.percentage < 80 && (
          <Card className="border-warning bg-warning-light/50">
            <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                <span>Attendance Alert</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-warning mb-4">
                Your attendance is below the recommended 80%. Consider speaking with a counselor for support.
              </p>
              <div className="flex space-x-3">
                <Button variant="warning" size="sm">
                  Request Counseling
                </Button>
                <Button variant="outline" size="sm">
                  View Attendance Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <span>Submit Assignment</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Calendar className="w-6 h-6 text-accent" />
                <span>Check Schedule</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Trophy className="w-6 h-6 text-success" />
                <span>View Achievements</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Coins className="w-6 h-6 text-warning" />
                <span>Redeem Rewards</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}