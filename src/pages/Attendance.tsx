import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for attendance
const attendanceData = {
  overall: 78,
  thisWeek: 85,
  thisMonth: 76,
  streak: 3
};

const weeklyAttendance = [
  { day: "Mon", present: true, date: "Dec 18" },
  { day: "Tue", present: true, date: "Dec 19" },
  { day: "Wed", present: false, date: "Dec 20" },
  { day: "Thu", present: true, date: "Dec 21" },
  { day: "Fri", present: true, date: "Dec 22" },
];

const monthlyStats = [
  { subject: "Mathematics", attendance: 92, classes: 25, present: 23 },
  { subject: "Physics", attendance: 78, classes: 22, present: 17 },
  { subject: "Chemistry", attendance: 85, classes: 20, present: 17 },
  { subject: "Biology", attendance: 90, classes: 18, present: 16 },
  { subject: "English", attendance: 88, classes: 24, present: 21 },
];

function getAttendanceColor(percentage: number) {
  if (percentage >= 80) return "text-success";
  if (percentage >= 60) return "text-warning";
  return "text-destructive";
}

function getAttendanceBackground(percentage: number) {
  if (percentage >= 80) return "bg-success/10";
  if (percentage >= 60) return "bg-warning/10";
  return "bg-destructive/10";
}

export default function Attendance() {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
            <p className="text-muted-foreground">Track your class attendance and participation</p>
          </div>
          <Calendar className="w-8 h-8 text-primary" />
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Overall</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.overall}%</div>
              <Progress value={attendanceData.overall} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.thisWeek}%</div>
              <Progress value={attendanceData.thisWeek} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.thisMonth}%</div>
              <Progress value={attendanceData.thisMonth} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.streak}</div>
              <p className="text-sm text-muted-foreground">days present</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              This Week's Attendance
            </CardTitle>
            <CardDescription>Your daily attendance for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {weeklyAttendance.map((day) => (
                <div key={day.day} className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {day.day}
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {day.date}
                  </div>
                  <div
                    className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                      day.present
                        ? "bg-success text-success-foreground"
                        : "bg-destructive text-destructive-foreground"
                    }`}
                  >
                    {day.present ? "✓" : "✗"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Subject-wise Attendance
            </CardTitle>
            <CardDescription>Your attendance breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {monthlyStats.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {subject.present}/{subject.classes} classes
                    </span>
                    <Badge
                      variant="outline"
                      className={`${getAttendanceBackground(subject.attendance)} ${getAttendanceColor(subject.attendance)}`}
                    >
                      {subject.attendance}%
                    </Badge>
                  </div>
                </div>
                <Progress value={subject.attendance} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alert for Low Attendance */}
        {attendanceData.overall < 80 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                Attendance Warning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Your overall attendance is below 80%. Consider improving your attendance to avoid academic penalties.
                Contact your advisor for support if needed.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}