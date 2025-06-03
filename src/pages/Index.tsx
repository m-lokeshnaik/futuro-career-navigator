
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileUp, Brain, TrendingUp, BookOpen, Users, Target, Upload, MessageSquare, BarChart3 } from "lucide-react";
import ResumeUpload from "@/components/ResumeUpload";
import CareerChat from "@/components/CareerChat";
import SkillsAnalysis from "@/components/SkillsAnalysis";
import LearningPath from "@/components/LearningPath";

const Index = () => {
  const [activeSection, setActiveSection] = useState("upload");
  const [resumeAnalyzed, setResumeAnalyzed] = useState(false);
  const [matchScore, setMatchScore] = useState(0);

  const features = [
    {
      icon: FileUp,
      title: "Smart Resume Analysis",
      description: "AI-powered resume scanning with job match scoring and skill gap identification"
    },
    {
      icon: Brain,
      title: "AI Career Coach",
      description: "Personalized career guidance powered by advanced language models"
    },
    {
      icon: TrendingUp,
      title: "Skills Gap Analysis",
      description: "Identify missing skills and get targeted improvement recommendations"
    },
    {
      icon: BookOpen,
      title: "Learning Path Generator",
      description: "Curated learning roadmaps from top platforms like Coursera and Udemy"
    }
  ];

  const stats = [
    { label: "Career Paths Discovered", value: "10,000+", icon: Target },
    { label: "Skills Analyzed", value: "50,000+", icon: TrendingUp },
    { label: "Learning Hours Saved", value: "100,000+", icon: BookOpen },
    { label: "Success Stories", value: "2,500+", icon: Users }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-career-blue-600/10 to-career-purple-600/10 blur-3xl"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-career-blue-100 text-career-blue-700 hover:bg-career-blue-200">
              🚀 AI-Powered Career Intelligence
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Your <span className="gradient-text">AI Career</span>
              <br />
              Copilot
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover personalized career paths, identify skill gaps, and accelerate your professional growth with state-of-the-art AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-career-blue-600 hover:bg-career-blue-700 text-lg px-8 py-3"
                onClick={() => setActiveSection("upload")}
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-3"
                onClick={() => setActiveSection("demo")}
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-career-blue-600" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful AI-Driven Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage cutting-edge technology to transform your career journey with personalized insights and recommendations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-career-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Experience AI Career Intelligence</h2>
            <p className="text-xl text-gray-600">
              Try our core features and see how AI can accelerate your career growth
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={activeSection === "upload" ? "default" : "outline"}
              onClick={() => setActiveSection("upload")}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Resume Analysis
            </Button>
            <Button
              variant={activeSection === "chat" ? "default" : "outline"}
              onClick={() => setActiveSection("chat")}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              AI Career Coach
            </Button>
            <Button
              variant={activeSection === "skills" ? "default" : "outline"}
              onClick={() => setActiveSection("skills")}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Skills Analysis
            </Button>
            <Button
              variant={activeSection === "learning" ? "default" : "outline"}
              onClick={() => setActiveSection("learning")}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Learning Path
            </Button>
          </div>

          {/* Content Sections */}
          <div className="max-w-4xl mx-auto">
            {activeSection === "upload" && (
              <ResumeUpload 
                onAnalysisComplete={(score) => {
                  setResumeAnalyzed(true);
                  setMatchScore(score);
                }}
              />
            )}
            {activeSection === "chat" && <CareerChat />}
            {activeSection === "skills" && <SkillsAnalysis matchScore={matchScore} />}
            {activeSection === "learning" && <LearningPath />}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-career-blue-600 to-career-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have accelerated their career growth with AI Career Copilot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-career-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
