import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  UserPlus, 
  Download,
  Mail,
  Phone,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

const studentsData = [
  { id: "ST001", name: "John Smith", email: "john.smith@edu.com", phone: "+1234567890", class: "Mathematics", attendance: 65, score: 72, risk: "high", trend: "down" },
  { id: "ST002", name: "Emily Chen", email: "emily.chen@edu.com", phone: "+1234567891", class: "History", attendance: 85, score: 88, risk: "low", trend: "up" },
  { id: "ST003", name: "Michael Brown", email: "michael.brown@edu.com", phone: "+1234567892", class: "Science", attendance: 82, score: 65, risk: "medium", trend: "down" },
  { id: "ST004", name: "Sarah Wilson", email: "sarah.wilson@edu.com", phone: "+1234567893", class: "Mathematics", attendance: 55, score: 58, risk: "high", trend: "down" },
  { id: "ST005", name: "Alex Johnson", email: "alex.johnson@edu.com", phone: "+1234567894", class: "English", attendance: 92, score: 95, risk: "low", trend: "up" },
  { id: "ST006", name: "Maria Garcia", email: "maria.garcia@edu.com", phone: "+1234567895", class: "History", attendance: 78, score: 82, risk: "medium", trend: "stable" },
  { id: "ST007", name: "David Lee", email: "david.lee@edu.com", phone: "+1234567896", class: "Science", attendance: 88, score: 90, risk: "low", trend: "up" },
  { id: "ST008", name: "Lisa Wang", email: "lisa.wang@edu.com", phone: "+1234567897", class: "Mathematics", attendance: 95, score: 97, risk: "low", trend: "up" },
  { id: "ST009", name: "James Taylor", email: "james.taylor@edu.com", phone: "+1234567898", class: "English", attendance: 70, score: 68, risk: "medium", trend: "down" },
  { id: "ST010", name: "Anna Martinez", email: "anna.martinez@edu.com", phone: "+1234567899", class: "Science", attendance: 62, score: 64, risk: "high", trend: "down" }
];

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [filterClass, setFilterClass] = useState<string>("all");

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-destructive bg-destructive/10";
      case "medium": return "text-warning bg-warning/10";
      case "low": return "text-success bg-success/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-success" />;
      case "down": return <TrendingDown className="w-4 h-4 text-destructive" />;
      case "stable": return <Minus className="w-4 h-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === "all" || student.risk === filterRisk;
    const matchesClass = filterClass === "all" || student.class === filterClass;
    return matchesSearch && matchesRisk && matchesClass;
  });

  const classes = [...new Set(studentsData.map(s => s.class))];
  const riskStats = {
    high: studentsData.filter(s => s.risk === "high").length,
    medium: studentsData.filter(s => s.risk === "medium").length,
    low: studentsData.filter(s => s.risk === "low").length
  };

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Students</h1>
            <p className="text-muted-foreground">Manage and monitor all your students</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Risk Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-destructive/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-destructive" />
                High Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{riskStats.high}</div>
              <p className="text-xs text-muted-foreground">Need immediate attention</p>
            </CardContent>
          </Card>
          <Card className="border-warning/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
                Medium Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{riskStats.medium}</div>
              <p className="text-xs text-muted-foreground">Monitor closely</p>
            </CardContent>
          </Card>
          <Card className="border-success/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-success" />
                Low Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{riskStats.low}</div>
              <p className="text-xs text-muted-foreground">Performing well</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>All Students ({filteredStudents.length})</CardTitle>
            <CardDescription>Search and filter your students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Students List */}
            <div className="space-y-3">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No students found matching your criteria</p>
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors gap-4"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{student.name}</h4>
                          <Badge variant="outline" className="text-xs">{student.id}</Badge>
                          {getTrendIcon(student.trend)}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {student.email}
                          </span>
                          <span className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {student.phone}
                          </span>
                          <span className="font-medium text-foreground">{student.class}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="grid grid-cols-2 gap-3 flex-1 sm:flex-initial">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                          <p className="font-semibold text-foreground">{student.attendance}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Score</p>
                          <p className="font-semibold text-foreground">{student.score}%</p>
                        </div>
                      </div>
                      <Badge className={`${getRiskColor(student.risk)} border-0 uppercase text-xs`}>
                        {student.risk}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
