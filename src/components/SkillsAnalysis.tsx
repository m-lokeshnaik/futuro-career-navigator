
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Target, Award, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface SkillsAnalysisProps {
  matchScore: number;
}

const SkillsAnalysis = ({ matchScore }: SkillsAnalysisProps) => {
  const skillsData = [
    { skill: "SQL", current: 85, required: 90, gap: 5 },
    { skill: "Python", current: 75, required: 85, gap: 10 },
    { skill: "Statistics", current: 45, required: 80, gap: 35 },
    { skill: "Machine Learning", current: 30, required: 75, gap: 45 },
    { skill: "Tableau", current: 20, required: 70, gap: 50 },
    { skill: "Excel", current: 90, required: 85, gap: 0 }
  ];

  const chartData = skillsData.map(skill => ({
    name: skill.skill,
    Current: skill.current,
    Required: skill.required,
    Gap: skill.gap
  }));

  const radarData = skillsData.map(skill => ({
    skill: skill.skill,
    current: skill.current,
    required: skill.required
  }));

  const careerProgression = [
    { role: "Junior Analyst", match: 65, skills: ["Excel", "SQL Basics"] },
    { role: "Data Analyst", match: matchScore || 78, skills: ["SQL", "Python", "Visualization"], current: true },
    { role: "Senior Analyst", match: 45, skills: ["Advanced Analytics", "ML", "Leadership"] },
    { role: "Data Scientist", match: 25, skills: ["Machine Learning", "Deep Learning", "Research"] }
  ];

  const prioritySkills = skillsData
    .filter(skill => skill.gap > 20)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Overall Skills Assessment */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-career-green-600" />
            Skills Gap Analysis
          </CardTitle>
          <CardDescription>
            Detailed breakdown of your skills vs. market requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Skills Radar Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Current Level"
                  dataKey="current"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Required Level"
                  dataKey="required"
                  stroke="#3b82f6"
                  fill="transparent"
                  strokeDasharray="5 5"
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-4">
            <h4 className="font-medium">Individual Skill Assessment</h4>
            {skillsData.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{skill.current}%</span>
                    <Badge 
                      variant={skill.gap === 0 ? "default" : skill.gap <= 15 ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {skill.gap === 0 ? "✓ Met" : `${skill.gap}% gap`}
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={skill.required} className="h-2 bg-gray-200" />
                  <Progress 
                    value={skill.current} 
                    className="h-2 absolute top-0 bg-transparent" 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Skills */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-orange-600" />
            Priority Skills to Develop
          </CardTitle>
          <CardDescription>
            Focus on these skills for maximum career impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {prioritySkills.map((skill, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">{skill.skill}</h4>
                  <Badge variant="destructive" className="text-xs">
                    High Impact
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    Current: {skill.current}% → Target: {skill.required}%
                  </div>
                  <Progress value={(skill.current / skill.required) * 100} className="h-1" />
                  <div className="text-xs text-gray-500">
                    +{Math.round((skill.gap / skill.required) * 15)}% potential match score increase
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Progression */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-career-purple-600" />
            Career Progression Path
          </CardTitle>
          <CardDescription>
            See how your skills align with different career levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerProgression.map((role, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 transition-all ${
                role.current 
                  ? "border-career-blue-500 bg-career-blue-50" 
                  : role.match >= 60 
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{role.role}</h4>
                    {role.current && (
                      <Badge className="bg-career-blue-600">
                        Current Target
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      role.match >= 60 ? "text-green-600" : "text-orange-600"
                    }`}>
                      {role.match}% match
                    </span>
                    {role.match >= 60 && <Award className="h-4 w-4 text-green-600" />}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {role.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Progress value={role.match} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Comparison Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Skills vs. Market Requirements</CardTitle>
          <CardDescription>
            Visual comparison of your current skills and job market demands
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Current" fill="#22c55e" name="Your Level" />
                <Bar dataKey="Required" fill="#3b82f6" name="Required Level" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1 bg-career-green-600 hover:bg-career-green-700">
          Get Personalized Learning Plan
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        <Button variant="outline" className="flex-1">
          Schedule Career Consultation
        </Button>
        <Button variant="outline" className="flex-1">
          Download Skills Report
        </Button>
      </div>
    </div>
  );
};

export default SkillsAnalysis;
