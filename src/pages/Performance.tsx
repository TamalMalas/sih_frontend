import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, Award, AlertTriangle, BookOpen, Target } from "lucide-react";

// Mock data for performance overview
const classPerformance = {
  averageGPA: 3.1,
  passRate: 87,
  improvementRate: 23,
  atRiskStudents: 8
};

const subjectPerformance = [
  { 
    subject: "Mathematics", 
    averageScore: 78, 
    passRate: 82, 
    topPerformer: "Alice Johnson",
    strugglingStudents: 3,
    trend: "up"
  },
  { 
    subject: "Physics", 
    averageScore: 74, 
    passRate: 79, 
    topPerformer: "David Wilson",
    strugglingStudents: 5,
    trend: "stable"
  },
  { 
    subject: "Chemistry", 
    averageScore: 81, 
    passRate: 88, 
    topPerformer: "Eve Brown",
    strugglingStudents: 2,
    trend: "up"
  },
  { 
    subject: "Biology", 
    averageScore: 76, 
    passRate: 85, 
    topPerformer: "Frank Miller",
    strugglingStudents: 4,
    trend: "down"
  },
];

const topPerformers = [
  { name: "Alice Johnson", gpa: 3.9, improvement: "+0.3", subjects: ["Math", "Chemistry"] },
  { name: "David Wilson", gpa: 3.7, improvement: "+0.2", subjects: ["Physics", "Biology"] },
  { name: "Frank Miller", gpa: 3.6, improvement: "+0.4", subjects: ["Biology", "Math"] },
  { name: "Grace Lee", gpa: 3.5, improvement: "+0.1", subjects: ["Chemistry", "Physics"] },
];

const strugglingStudents = [
  { name: "Carol Davis", gpa: 2.1, decline: "-0.4", subjects: ["Math", "Physics"], risk: "High" },
  { name: "Bob Smith", gpa: 2.4, decline: "-0.2", subjects: ["Chemistry"], risk: "Medium" },
  { name: "Henry Kim", gpa: 2.3, decline: "-0.3", subjects: ["Biology", "Math"], risk: "High" },
];

function getTrendIcon(trend: string) {
  if (trend === "up") return "📈";
  if (trend === "down") return "📉";
  return "➡️";
}

function getPerformanceColor(score: number) {
  if (score >= 85) return "text-success";
  if (score >= 75) return "text-primary";
  if (score >= 65) return "text-warning";
  return "text-destructive";
}

function getRiskColor(risk: string) {
  switch (risk) {
    case "High": return "text-destructive";
    case "Medium": return "text-warning";
    case "Low": return "text-success";
    default: return "text-muted-foreground";
  }
}

export default function Performance() {
  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Performance Analytics</h1>
            <p className="text-muted-foreground">Track and analyze student academic performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="current-semester">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-semester">Current Semester</SelectItem>
                <SelectItem value="last-semester">Last Semester</SelectItem>
                <SelectItem value="academic-year">Academic Year</SelectItem>
              </SelectContent>
            </Select>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Overall Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Class Average GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classPerformance.averageGPA}</div>
              <Progress value={(classPerformance.averageGPA / 4.0) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{classPerformance.passRate}%</div>
              <p className="text-sm text-muted-foreground">Students passing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{classPerformance.improvementRate}%</div>
              <p className="text-sm text-muted-foreground">Students improving</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{classPerformance.atRiskStudents}</div>
              <p className="text-sm text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Subject Performance Overview
            </CardTitle>
            <CardDescription>Detailed breakdown of performance by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {subjectPerformance.map((subject) => (
                <div key={subject.subject} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{subject.subject}</span>
                      <span className="text-lg">{getTrendIcon(subject.trend)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-semibold ${getPerformanceColor(subject.averageScore)}`}>
                        {subject.averageScore}% avg
                      </span>
                      <Badge variant="outline">
                        {subject.passRate}% pass rate
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Top Performer: </span>
                      <span className="font-medium">{subject.topPerformer}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Struggling: </span>
                      <span className="font-medium text-warning">{subject.strugglingStudents} students</span>
                    </div>
                    <div className="text-right md:text-left">
                      <Progress value={subject.averageScore} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Top Performers
              </CardTitle>
              <CardDescription>Students with outstanding academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((student, index) => (
                  <div key={student.name} className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Strong in: {student.subjects.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success">{student.gpa}</p>
                      <p className="text-sm text-success">{student.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Struggling Students */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Students Needing Support
              </CardTitle>
              <CardDescription>Students requiring additional academic support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strugglingStudents.map((student) => (
                  <div key={student.name} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Struggling with: {student.subjects.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-destructive">{student.gpa}</p>
                        <p className="text-sm text-destructive">{student.decline}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={getRiskColor(student.risk)}
                      >
                        {student.risk}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Support
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Recommendations */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Performance Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-success">Celebrate Success:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Recognize top performers in Mathematics and Chemistry</li>
                  <li>• Share improvement success stories with the class</li>
                  <li>• Consider peer tutoring opportunities</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-warning">Areas for Improvement:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Provide additional support for Physics concepts</li>
                  <li>• Schedule individual consultations for at-risk students</li>
                  <li>• Consider supplementary materials for struggling topics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}