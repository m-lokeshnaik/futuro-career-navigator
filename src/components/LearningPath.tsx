
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Play, CheckCircle, Trophy, ExternalLink } from "lucide-react";

const LearningPath = () => {
  const learningPaths = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      description: "Master the basics of ML algorithms and applications",
      priority: "High",
      estimatedTime: "8 weeks",
      difficulty: "Intermediate",
      progress: 0,
      courses: [
        {
          title: "Introduction to Machine Learning",
          provider: "Coursera",
          duration: "4 weeks",
          rating: 4.8,
          price: "Free",
          status: "available"
        },
        {
          title: "Hands-On Machine Learning",
          provider: "Udemy",
          duration: "3 weeks",
          rating: 4.6,
          price: "$49.99",
          status: "available"
        },
        {
          title: "ML Practical Projects",
          provider: "YouTube",
          duration: "1 week",
          rating: 4.5,
          price: "Free",
          status: "available"
        }
      ]
    },
    {
      id: 2,
      title: "Advanced SQL & Database Management",
      description: "Become proficient in complex queries and database optimization",
      priority: "Medium",
      estimatedTime: "6 weeks",
      difficulty: "Intermediate",
      progress: 25,
      courses: [
        {
          title: "Advanced SQL Queries",
          provider: "DataCamp",
          duration: "2 weeks",
          rating: 4.7,
          price: "$29/month",
          status: "in-progress"
        },
        {
          title: "Database Design & Optimization",
          provider: "Coursera",
          duration: "3 weeks",
          rating: 4.6,
          price: "Free",
          status: "available"
        },
        {
          title: "Real-World SQL Projects",
          provider: "YouTube",
          duration: "1 week",
          rating: 4.4,
          price: "Free",
          status: "available"
        }
      ]
    },
    {
      id: 3,
      title: "Data Visualization with Tableau",
      description: "Create compelling visualizations and dashboards",
      priority: "High",
      estimatedTime: "4 weeks",
      difficulty: "Beginner",
      progress: 0,
      courses: [
        {
          title: "Tableau Fundamentals",
          provider: "Tableau",
          duration: "2 weeks",
          rating: 4.9,
          price: "Free",
          status: "available"
        },
        {
          title: "Advanced Tableau Techniques",
          provider: "Udemy",
          duration: "2 weeks",
          rating: 4.5,
          price: "$39.99",
          status: "available"
        }
      ]
    }
  ];

  const achievements = [
    { title: "First Course Completed", icon: "🎯", unlocked: false },
    { title: "Week Streak", icon: "🔥", unlocked: false },
    { title: "Skill Master", icon: "⚡", unlocked: false },
    { title: "Learning Champion", icon: "🏆", unlocked: false }
  ];

  const weeklyGoal = {
    target: 10,
    completed: 3,
    unit: "hours"
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-600";
      case "Intermediate": return "text-yellow-600";
      case "Advanced": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-career-blue-100 rounded-lg">
                <Trophy className="h-5 w-5 text-career-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Weekly Goal</h3>
                <p className="text-sm text-gray-600">{weeklyGoal.completed}/{weeklyGoal.target} {weeklyGoal.unit}</p>
              </div>
            </div>
            <Progress value={(weeklyGoal.completed / weeklyGoal.target) * 100} className="h-2" />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-career-green-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-career-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Active Paths</h3>
                <p className="text-sm text-gray-600">3 learning tracks</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-career-green-600">18 weeks</div>
            <p className="text-xs text-gray-500">Total estimated time</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-career-purple-100 rounded-lg">
                <Star className="h-5 w-5 text-career-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Achievements</h3>
                <p className="text-sm text-gray-600">0/4 unlocked</p>
              </div>
            </div>
            <div className="flex gap-1">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`text-lg ${achievement.unlocked ? "opacity-100" : "opacity-30"}`}
                  title={achievement.title}
                >
                  {achievement.icon}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Paths */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Personalized Learning Paths</h3>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Export Schedule
          </Button>
        </div>

        {learningPaths.map((path) => (
          <Card key={path.id} className="glass-card">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-3">
                    {path.title}
                    <Badge className={getPriorityColor(path.priority)}>
                      {path.priority} Priority
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {path.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {path.estimatedTime}
                  </div>
                  <div className={`font-medium ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </div>
                </div>
              </div>
              {path.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{path.progress}% complete</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {path.courses.map((course, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {course.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : course.status === "in-progress" ? (
                        <Play className="h-5 w-5 text-career-blue-600" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{course.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{course.provider}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-400" />
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {course.price}
                      </Badge>
                      <Button 
                        size="sm"
                        variant={course.status === "in-progress" ? "default" : "outline"}
                      >
                        {course.status === "completed" ? "Completed" :
                         course.status === "in-progress" ? "Continue" : "Start"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1"
                  variant={path.progress > 0 ? "default" : "outline"}
                >
                  {path.progress > 0 ? "Continue Learning" : "Start Path"}
                </Button>
                <Button variant="outline">
                  Customize
                </Button>
                <Button variant="outline">
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Fast track your learning with these recommended actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <BookOpen className="h-6 w-6 text-career-blue-600" />
              <span className="text-sm font-medium">Browse All Courses</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Star className="h-6 w-6 text-career-purple-600" />
              <span className="text-sm font-medium">Join Study Groups</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Trophy className="h-6 w-6 text-career-green-600" />
              <span className="text-sm font-medium">Track Progress</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Clock className="h-6 w-6 text-orange-600" />
              <span className="text-sm font-medium">Set Reminders</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPath;
