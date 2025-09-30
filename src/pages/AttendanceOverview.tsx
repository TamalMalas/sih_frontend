import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingDown, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for teacher attendance overview
const classStats = {
  totalStudents: 45,
  presentToday: 38,
  absentToday: 7,
  averageAttendance: 84
};

const students = [
  { id: 1, name: "Alice Johnson", attendance: 95, status: "Present", lastAbsent: "Never", riskLevel: "Low" },
  { id: 2, name: "Bob Smith", attendance: 78, status: "Present", lastAbsent: "2 days ago", riskLevel: "Medium" },
  { id: 3, name: "Carol Davis", attendance: 45, status: "Absent", lastAbsent: "Today", riskLevel: "High" },
  { id: 4, name: "David Wilson", attendance: 89, status: "Present", lastAbsent: "1 week ago", riskLevel: "Low" },
  { id: 5, name: "Eve Brown", attendance: 62, status: "Absent", lastAbsent: "Today", riskLevel: "Medium" },
  { id: 6, name: "Frank Miller", attendance: 91, status: "Present", lastAbsent: "3 days ago", riskLevel: "Low" },
  { id: 7, name: "Grace Lee", attendance: 38, status: "Absent", lastAbsent: "Today", riskLevel: "High" },
  { id: 8, name: "Henry Kim", attendance: 85, status: "Present", lastAbsent: "1 day ago", riskLevel: "Low" },
];

const subjectAttendance = [
  { subject: "Mathematics", averageAttendance: 87, totalClasses: 25, presentToday: 35, totalStudents: 40 },
  { subject: "Physics", averageAttendance: 82, totalClasses: 22, presentToday: 32, totalStudents: 38 },
  { subject: "Chemistry", averageAttendance: 79, totalClasses: 20, presentToday: 30, totalStudents: 36 },
  { subject: "Biology", averageAttendance: 85, totalClasses: 18, presentToday: 33, totalStudents: 38 },
];

function getRiskColor(riskLevel: string) {
  switch (riskLevel) {
    case "High": return "text-destructive";
    case "Medium": return "text-warning";
    case "Low": return "text-success";
    default: return "text-muted-foreground";
  }
}

function getRiskBackground(riskLevel: string) {
  switch (riskLevel) {
    case "High": return "bg-destructive/10";
    case "Medium": return "bg-warning/10";
    case "Low": return "bg-success/10";
    default: return "bg-muted/10";
  }
}

function getAttendanceColor(percentage: number) {
  if (percentage >= 80) return "text-success";
  if (percentage >= 60) return "text-warning";
  return "text-destructive";
}

export default function AttendanceOverview() {
  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance Overview</h1>
            <p className="text-muted-foreground">Monitor and manage student attendance across all classes</p>
          </div>
          <Users className="w-8 h-8 text-primary" />
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classStats.totalStudents}</div>
              <p className="text-sm text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{classStats.presentToday}</div>
              <p className="text-sm text-muted-foreground">
                {Math.round((classStats.presentToday / classStats.totalStudents) * 100)}% attendance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{classStats.absentToday}</div>
              <p className="text-sm text-muted-foreground">Students absent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classStats.averageAttendance}%</div>
              <Progress value={classStats.averageAttendance} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
            <CardDescription>Today's attendance breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectAttendance.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {subject.presentToday}/{subject.totalStudents} present
                      </span>
                      <Badge variant="outline" className={getAttendanceColor(subject.averageAttendance)}>
                        {subject.averageAttendance}% avg
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={(subject.presentToday / subject.totalStudents) * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student List with Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Student Attendance
            </CardTitle>
            <CardDescription>Individual student attendance tracking</CardDescription>
            
            {/* Filters */}
            <div className="flex gap-4 pt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="present">Present Today</SelectItem>
                  <SelectItem value="absent">Absent Today</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="space-y-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last absent: {student.lastAbsent}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-semibold ${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </p>
                      <p className="text-sm text-muted-foreground">Attendance</p>
                    </div>
                    
                    <Badge
                      variant="outline"
                      className={`${getRiskBackground(student.riskLevel)} ${getRiskColor(student.riskLevel)}`}
                    >
                      {student.riskLevel} Risk
                    </Badge>
                    
                    <Badge
                      variant={student.status === "Present" ? "default" : "destructive"}
                    >
                      {student.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* At-Risk Students Alert */}
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <TrendingDown className="w-5 h-5" />
              At-Risk Students Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              {students.filter(s => s.riskLevel === "High").length} students have critically low attendance and need immediate attention.
            </p>
            <div className="space-y-2">
              {students.filter(s => s.riskLevel === "High").map((student) => (
                <div key={student.id} className="flex items-center justify-between p-2 bg-background rounded">
                  <span>{student.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-destructive font-semibold">{student.attendance}%</span>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}