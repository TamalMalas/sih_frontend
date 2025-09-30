import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, Award, Users, TrendingUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">EduTrack</span>
          </div>
          <Link to="/auth">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Empowering Students,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Preventing Dropouts</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              A comprehensive platform that tracks student progress, identifies at-risk students, 
              and provides the support they need to succeed in their educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started Today
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-accent/20 to-warning/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-success/20 to-primary/20 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose EduTrack?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools to monitor, support, and motivate students at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Early Risk Detection",
                description: "Identify students at risk of dropping out through comprehensive tracking and analytics.",
                color: "from-destructive to-warning"
              },
              {
                icon: TrendingUp,
                title: "Progress Monitoring",
                description: "Track attendance, grades, and assignment submissions with color-coded status indicators.",
                color: "from-primary to-primary-dark"
              },
              {
                icon: Award,
                title: "Gamified Learning",
                description: "Motivate students with rewards, achievements, and a digital wallet system.",
                color: "from-accent to-warning"
              },
              {
                icon: Users,
                title: "Teacher Dashboard",
                description: "Comprehensive tools for educators to monitor and support their students effectively.",
                color: "from-success to-primary"
              },
              {
                icon: Heart,
                title: "Student Wellbeing",
                description: "Built-in counseling request system and mental health support resources.",
                color: "from-warning to-destructive"
              },
              {
                icon: GraduationCap,
                title: "Institution Analytics",
                description: "Detailed insights and reports for educational institutions to improve retention rates.",
                color: "from-primary to-accent"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Transform Education?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of institutions already using EduTrack to improve student outcomes.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Your Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}