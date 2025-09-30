import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, BookOpen, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for scores
const overallGPA = 3.2;
const semesterGPA = 3.4;

const subjectScores = [
  { 
    subject: "Mathematics", 
    currentGrade: "B+", 
    percentage: 87, 
    trend: "up",
    assignments: 8,
    completed: 7
  },
  { 
    subject: "Physics", 
    currentGrade: "B", 
    percentage: 82, 
    trend: "up",
    assignments: 6,
    completed: 5
  },
  { 
    subject: "Chemistry", 
    currentGrade: "A-", 
    percentage: 89, 
    trend: "stable",
    assignments: 7,
    completed: 6
  },
  { 
    subject: "Biology", 
    currentGrade: "B+", 
    percentage: 85, 
    trend: "down",
    assignments: 5,
    completed: 4
  },
  { 
    subject: "English", 
    currentGrade: "A", 
    percentage: 93, 
    trend: "up",
    assignments: 9,
    completed: 8
  },
];

const recentExams = [
  { subject: "Mathematics", exam: "Mid-term", score: 85, maxScore: 100, date: "Dec 15" },
  { subject: "Physics", exam: "Quiz 3", score: 78, maxScore: 100, date: "Dec 18" },
  { subject: "Chemistry", exam: "Lab Test", score: 92, maxScore: 100, date: "Dec 20" },
  { subject: "Biology", exam: "Assignment", score: 88, maxScore: 100, date: "Dec 22" },
];

function getGradeColor(grade: string) {
  if (grade.startsWith("A")) return "text-success";
  if (grade.startsWith("B")) return "text-primary";
  if (grade.startsWith("C")) return "text-warning";
  return "text-destructive";
}

function getTrendIcon(trend: string) {
  if (trend === "up") return "📈";
  if (trend === "down") return "📉";
  return "➡️";
}

function getScoreColor(percentage: number) {
  if (percentage >= 90) return "text-success";
  if (percentage >= 80) return "text-primary";
  if (percentage >= 70) return "text-warning";
  return "text-destructive";
}

export default function Scores() {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Scores & Grades</h1>
            <p className="text-muted-foreground">Track your academic performance and progress</p>
          </div>
          <Trophy className="w-8 h-8 text-primary" />
        </div>

        {/* GPA Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Overall GPA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{overallGPA}</div>
              <p className="text-sm text-muted-foreground">Out of 4.0</p>
              <Progress value={(overallGPA / 4.0) * 100} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                This Semester
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{semesterGPA}</div>
              <p className="text-sm text-muted-foreground">Current semester GPA</p>
              <Progress value={(semesterGPA / 4.0) * 100} className="mt-3" />
            </CardContent>
          </Card>
        </div>

        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Subject Performance
            </CardTitle>
            <CardDescription>Your current grades and progress in each subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjectScores.map((subject) => (
              <div key={subject.subject} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="text-lg">{getTrendIcon(subject.trend)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getGradeColor(subject.currentGrade)}
                    >
                      {subject.currentGrade}
                    </Badge>
                    <span className={`font-semibold ${getScoreColor(subject.percentage)}`}>
                      {subject.percentage}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Assignments: {subject.completed}/{subject.assignments}</span>
                  <span>Progress</span>
                </div>
                <Progress value={subject.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Exams */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Exam Results</CardTitle>
            <CardDescription>Your latest test and exam scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{exam.subject}</p>
                    <p className="text-sm text-muted-foreground">{exam.exam}</p>
                    <p className="text-xs text-muted-foreground">{exam.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {exam.score}/{exam.maxScore}
                    </div>
                    <div className={`text-sm ${getScoreColor((exam.score / exam.maxScore) * 100)}`}>
                      {Math.round((exam.score / exam.maxScore) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Tips */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Performance Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Focus on improving your lowest performing subjects</li>
              <li>• Complete all assignments on time to maintain your grades</li>
              <li>• Consider forming study groups for challenging subjects</li>
              <li>• Reach out to teachers during office hours for extra help</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}