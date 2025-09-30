import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  TrendingDown, 
  AlertTriangle, 
  Trophy, 
  Calendar,
  BookOpen,
  Target,
  Award,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";

const atRiskStudents = [
  { name: "John Smith", attendance: 65, score: 72, risk: "high", id: "JS001" },
  { name: "Emily Chen", attendance: 78, score: 68, risk: "medium", id: "EC002" },
  { name: "Michael Brown", attendance: 82, score: 65, risk: "medium", id: "MB003" },
  { name: "Sarah Wilson", attendance: 55, score: 58, risk: "high", id: "SW004" }
];

const classOverview = [
  { subject: "Mathematics", totalStudents: 28, atRisk: 4, avgAttendance: 78, avgScore: 75 },
  { subject: "History", totalStudents: 25, atRisk: 2, avgAttendance: 85, avgScore: 82 },
  { subject: "Science", totalStudents: 30, atRisk: 5, avgAttendance: 73, avgScore: 79 },
  { subject: "English", totalStudents: 27, atRisk: 3, avgAttendance: 81, avgScore: 77 }
];

const recentActivities = [
  { type: "assignment", student: "Alex Johnson", action: "submitted Math Assignment #3", time: "2 hours ago", status: "success" },
  { type: "attendance", student: "Maria Garcia", action: "marked absent from History class", time: "1 day ago", status: "warning" },
  { type: "counseling", student: "David Lee", action: "requested counseling session", time: "2 days ago", status: "info" },
  { type: "achievement", student: "Lisa Wang", action: "earned 'Perfect Attendance' badge", time: "3 days ago", status: "success" }
];

export default function TeacherDashboard() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-destructive bg-destructive-light";
      case "medium": return "text-warning bg-warning-light";
      case "low": return "text-success bg-success-light";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getActivityIcon = (type: string, status: string) => {
    switch (type) {
      case "assignment":
        return status === "success" ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Clock className="w-4 h-4 text-warning" />;
      case "attendance":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "counseling":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "achievement":
        return <Trophy className="w-4 h-4 text-success" />;
      default:
        return <BookOpen className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 p-6 rounded-lg border border-border/50">
          <h1 className="text-3xl font-bold text-foreground mb-2">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Monitor and support your students' academic journey.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">110</div>
              <p className="text-xs text-muted-foreground">Across 4 classes</p>
            </CardContent>
          </Card>

          {/* At-Risk Students */}
          <Card className="border-destructive/20 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
              <TrendingDown className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive mb-2">14</div>
              <p className="text-xs text-muted-foreground">Require intervention</p>
            </CardContent>
          </Card>

          {/* Average Attendance */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <Calendar className="w-4 h-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">79%</div>
              <Progress value={79} className="mb-2" />
              <p className="text-xs text-muted-foreground">Institution target: 85%</p>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">45</div>
              <p className="text-xs text-muted-foreground">Awarded this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* At-Risk Students */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span>At-Risk Students</span>
              </CardTitle>
              <CardDescription>Students requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {atRiskStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Attendance: {student.attendance}% | Score: {student.score}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getRiskColor(student.risk)} border-0`}>
                      {student.risk.toUpperCase()}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Assist
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="destructive" className="w-full">
                View All At-Risk Students
              </Button>
            </CardContent>
          </Card>

          {/* Class Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Class Overview</span>
              </CardTitle>
              <CardDescription>Performance summary by subject</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {classOverview.map((classItem, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{classItem.subject}</h4>
                    <Badge variant="outline">
                      {classItem.totalStudents} students
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Attendance</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={classItem.avgAttendance} className="flex-1" />
                        <span className="font-medium text-foreground">{classItem.avgAttendance}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Avg Score</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={classItem.avgScore} className="flex-1" />
                        <span className="font-medium text-foreground">{classItem.avgScore}%</span>
                      </div>
                    </div>
                  </div>
                  {classItem.atRisk > 0 && (
                    <div className="mt-3 flex items-center text-destructive">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      <span className="text-sm">{classItem.atRisk} students at risk</span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-accent" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest student activities and events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                {getActivityIcon(activity.type, activity.status)}
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    <span className="text-primary">{activity.student}</span> {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </CardContent>
        </Card>

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
                <Users className="w-6 h-6 text-primary" />
                <span>View All Students</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Calendar className="w-6 h-6 text-accent" />
                <span>Take Attendance</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Trophy className="w-6 h-6 text-success" />
                <span>Award Points</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <AlertTriangle className="w-6 h-6 text-warning" />
                <span>Send Alert</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}