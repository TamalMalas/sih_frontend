import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Coins, 
  Gift, 
  Star,
  Trophy,
  Award,
  Target,
  BookOpen,
  Calendar,
  TrendingUp,
  ShoppingBag
} from "lucide-react";

const rewardHistory = [
  { type: "earned", activity: "Perfect Attendance Week", points: 50, date: "2024-01-15", icon: Calendar },
  { type: "earned", activity: "Assignment Submitted Early", points: 25, date: "2024-01-14", icon: BookOpen },
  { type: "redeemed", activity: "Study Guide Access", points: -100, date: "2024-01-12", icon: ShoppingBag },
  { type: "earned", activity: "Math Quiz - Grade A", points: 75, date: "2024-01-10", icon: Trophy },
  { type: "earned", activity: "Helped Classmate", points: 30, date: "2024-01-08", icon: Award }
];

const availableRewards = [
  {
    id: 1,
    title: "Extended Library Access",
    description: "24/7 access to digital library for one month",
    cost: 200,
    category: "Academic",
    icon: BookOpen
  },
  {
    id: 2,
    title: "Homework Extension Pass",
    description: "One-time 48-hour extension for any assignment",
    cost: 150,
    category: "Academic",
    icon: Calendar
  },
  {
    id: 3,
    title: "Study Room Booking Priority",
    description: "Priority booking for study rooms during exam period",
    cost: 300,
    category: "Facilities",
    icon: Target
  },
  {
    id: 4,
    title: "Campus Store Voucher",
    description: "$10 voucher for campus bookstore",
    cost: 500,
    category: "Shopping",
    icon: ShoppingBag
  },
  {
    id: 5,
    title: "Free Tutoring Session",
    description: "One-on-one tutoring session with peer tutor",
    cost: 250,
    category: "Academic",
    icon: Star
  },
  {
    id: 6,
    title: "Parking Pass",
    description: "One-day premium parking pass",
    cost: 100,
    category: "Facilities",
    icon: Gift
  }
];

const achievements = [
  { title: "Early Bird", description: "Submitted 5 assignments early", unlocked: true, icon: Star },
  { title: "Perfect Week", description: "100% attendance for a week", unlocked: true, icon: Calendar },
  { title: "A+ Student", description: "Received grade A on 10 assignments", unlocked: false, progress: 7, icon: Trophy },
  { title: "Helper", description: "Helped 5 classmates", unlocked: false, progress: 3, icon: Award }
];

export default function Wallet() {
  const currentPoints = 1240;
  const totalEarned = 2850;
  const totalSpent = 1610;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic": return "bg-primary-light text-primary";
      case "Facilities": return "bg-accent-light text-accent";
      case "Shopping": return "bg-success-light text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/10 via-warning/10 to-success/10 p-6 rounded-lg border border-border/50">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reward Wallet</h1>
          <p className="text-muted-foreground">Earn points and redeem exciting rewards for your achievements!</p>
        </div>

        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-warning/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Points</CardTitle>
              <Coins className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent mb-2">{currentPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Available to spend</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <TrendingUp className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">{totalEarned.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <ShoppingBag className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">{totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total redeemed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Rewards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-accent" />
                <span>Available Rewards</span>
              </CardTitle>
              <CardDescription>Redeem your points for these exciting rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableRewards.map((reward) => (
                <div key={reward.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <reward.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{reward.title}</h4>
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                      </div>
                    </div>
                    <Badge className={`${getCategoryColor(reward.category)} border-0`}>
                      {reward.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-accent" />
                      <span className="font-bold text-accent">{reward.cost} points</span>
                    </div>
                    <Button 
                      variant={currentPoints >= reward.cost ? "default" : "outline"}
                      size="sm"
                      disabled={currentPoints < reward.cost}
                    >
                      {currentPoints >= reward.cost ? "Redeem" : "Insufficient Points"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Your latest point earnings and redemptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rewardHistory.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === "earned" ? "bg-success/10" : "bg-destructive/10"
                  }`}>
                    <activity.icon className={`w-4 h-4 ${
                      activity.type === "earned" ? "text-success" : "text-destructive"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.activity}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className={`font-bold ${
                    activity.type === "earned" ? "text-success" : "text-destructive"
                  }`}>
                    {activity.type === "earned" ? "+" : ""}{activity.points}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Full History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span>Achievements</span>
            </CardTitle>
            <CardDescription>Track your progress and unlock special badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-4 border rounded-lg ${
                  achievement.unlocked 
                    ? "border-success bg-success/5" 
                    : "border-border bg-muted/30"
                }`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? "bg-success text-white" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <achievement.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="bg-success text-white">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                  {!achievement.unlocked && achievement.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{achievement.progress}/10</span>
                      </div>
                      <Progress value={(achievement.progress / 10) * 100} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}