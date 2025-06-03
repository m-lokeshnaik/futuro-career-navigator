
import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  onAnalysisComplete: (score: number) => void;
}

const ResumeUpload = ({ onAnalysisComplete }: ResumeUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const jobDescription = "Data Analyst position requiring SQL, Python, statistics, data visualization, and machine learning skills. Experience with Tableau, Excel, and database management preferred.";

  const mockAnalysis = {
    score: 78,
    strengths: ["SQL", "Python", "Data Analysis", "Excel"],
    gaps: ["Machine Learning", "Tableau", "Statistics", "Database Management"],
    recommendations: [
      "Complete a Machine Learning course to increase match score by 15%",
      "Learn Tableau for data visualization expertise",
      "Strengthen statistical analysis skills"
    ]
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFile(files[0]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type === "application/pdf" || selectedFile.type.includes("word")) {
      setFile(selectedFile);
      toast({
        title: "Resume uploaded successfully!",
        description: "Ready to analyze your resume against job requirements.",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
    }
  };

  const analyzeResume = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const intervals = [
      { delay: 500, progress: 20, message: "Parsing resume content..." },
      { delay: 1000, progress: 45, message: "Extracting skills and experience..." },
      { delay: 1500, progress: 70, message: "Comparing with job requirements..." },
      { delay: 2000, progress: 90, message: "Generating insights..." },
      { delay: 2500, progress: 100, message: "Analysis complete!" }
    ];

    for (const interval of intervals) {
      await new Promise(resolve => setTimeout(resolve, interval.delay));
      setProgress(interval.progress);
    }

    setMatchScore(mockAnalysis.score);
    setAnalysisComplete(true);
    setIsAnalyzing(false);
    onAnalysisComplete(mockAnalysis.score);

    toast({
      title: "Analysis Complete!",
      description: `Your resume matches ${mockAnalysis.score}% with the job requirements.`,
    });
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysisComplete(false);
    setMatchScore(0);
    setProgress(0);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-career-blue-600" />
          Resume Analysis & Job Matching
        </CardTitle>
        <CardDescription>
          Upload your resume to get an AI-powered analysis and job match score
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Description Preview */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-medium text-sm text-gray-700 mb-2">Target Job Description:</h4>
          <p className="text-sm text-gray-600">{jobDescription}</p>
        </div>

        {!file && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragActive
                ? "border-career-blue-500 bg-career-blue-50"
                : "border-gray-300 hover:border-career-blue-400"
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
            <p className="text-gray-500 mb-4">Drag and drop your resume here, or click to browse</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
              id="resume-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="resume-upload" className="cursor-pointer">
                Choose File
              </label>
            </Button>
          </div>
        )}

        {file && !analysisComplete && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button variant="outline" size="sm" onClick={resetAnalysis}>
                Remove
              </Button>
            </div>

            {isAnalyzing && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-career-blue-600 animate-pulse" />
                  <span className="text-sm font-medium">Analyzing resume...</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <Button 
              onClick={analyzeResume} 
              disabled={isAnalyzing}
              className="w-full bg-career-blue-600 hover:bg-career-blue-700"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </div>
        )}

        {analysisComplete && (
          <div className="space-y-6">
            {/* Match Score */}
            <div className="text-center p-6 bg-gradient-to-r from-career-green-50 to-career-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-career-blue-600 mb-2">{matchScore}%</div>
              <p className="text-lg font-medium mb-2">Job Match Score</p>
              <Progress value={matchScore} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">
                {matchScore >= 80 ? "Excellent match!" : matchScore >= 60 ? "Good match with room for improvement" : "Consider strengthening key skills"}
              </p>
            </div>

            {/* Strengths */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Matched Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {mockAnalysis.strengths.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skill Gaps */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {mockAnalysis.gaps.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-medium mb-3">Improvement Recommendations</h4>
              <ul className="space-y-2">
                {mockAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 bg-career-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={resetAnalysis} variant="outline" className="flex-1">
                Analyze Another Resume
              </Button>
              <Button className="flex-1 bg-career-green-600 hover:bg-career-green-700">
                Get Learning Plan
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
