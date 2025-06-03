
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, Lightbulb, Briefcase, GraduationCap } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const CareerChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Career Coach. I can help you with career guidance, skill development, interview preparation, and more. What would you like to discuss today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "What skills should I learn for a Data Analyst role?",
    "How can I transition from marketing to tech?",
    "Give me mock interview questions for my resume",
    "What are the highest paying careers in AI?"
  ];

  const mockResponses = {
    "data analyst": "For a Data Analyst role, focus on these key skills:\n\n📊 **Technical Skills:**\n• SQL for database queries\n• Python/R for analysis\n• Excel for reporting\n• Tableau/Power BI for visualization\n\n📈 **Statistical Skills:**\n• Descriptive statistics\n• Hypothesis testing\n• Regression analysis\n\n💼 **Business Skills:**\n• Problem-solving\n• Communication\n• Domain knowledge\n\nI recommend starting with SQL and Python - they're the foundation for most data roles!",
    "transition": "Career transitions can be exciting! Here's a strategic approach:\n\n🎯 **1. Identify Transferable Skills**\n• Project management\n• Communication\n• Problem-solving\n• Client relations\n\n🚀 **2. Bridge the Gap**\n• Take online courses\n• Build portfolio projects\n• Network in your target industry\n• Consider bootcamps or certifications\n\n📝 **3. Craft Your Story**\n• Highlight relevant experience\n• Show passion for the new field\n• Demonstrate learning agility\n\nWhat specific tech role interests you most?",
    "interview": "Here are some common interview questions tailored to your background:\n\n**Technical Questions:**\n• \"Walk me through your data analysis process\"\n• \"How do you handle missing data?\"\n• \"Explain a complex project you've worked on\"\n\n**Behavioral Questions:**\n• \"Tell me about a time you solved a difficult problem\"\n• \"How do you prioritize multiple deadlines?\"\n• \"Describe your experience working with stakeholders\"\n\n**Preparation Tips:**\n• Practice with real datasets\n• Prepare STAR method examples\n• Research the company's data challenges\n\nWould you like me to dive deeper into any of these areas?",
    "ai careers": "AI is one of the fastest-growing fields! Here are high-paying AI careers:\n\n💰 **Top Paying Roles:**\n• Machine Learning Engineer ($150k-$300k+)\n• AI Research Scientist ($200k-$400k+)\n• Data Scientist ($120k-$250k+)\n• AI Product Manager ($140k-$280k+)\n\n📚 **Skills to Develop:**\n• Python/R programming\n• Machine learning frameworks (TensorFlow, PyTorch)\n• Statistics and mathematics\n• Cloud platforms (AWS, GCP, Azure)\n\n🎓 **Getting Started:**\n• Online courses (Coursera, edX)\n• Kaggle competitions\n• Personal AI projects\n• Master's in AI/ML (optional but helpful)\n\nThe field is very accessible if you're willing to learn!"
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputMessage.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate AI response based on keywords
    let aiResponse = "I understand you're asking about career development. Let me provide some personalized guidance based on current industry trends and best practices.\n\nCould you tell me more about your specific situation or goals? This will help me give you more targeted advice.";

    const lowerMessage = messageText.toLowerCase();
    if (lowerMessage.includes("data analyst") || lowerMessage.includes("sql") || lowerMessage.includes("python")) {
      aiResponse = mockResponses["data analyst"];
    } else if (lowerMessage.includes("transition") || lowerMessage.includes("marketing") || lowerMessage.includes("tech")) {
      aiResponse = mockResponses["transition"];
    } else if (lowerMessage.includes("interview") || lowerMessage.includes("mock") || lowerMessage.includes("questions")) {
      aiResponse = mockResponses["interview"];
    } else if (lowerMessage.includes("ai") || lowerMessage.includes("highest paying")) {
      aiResponse = mockResponses["ai careers"];
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponse,
      sender: "ai",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="glass-card h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-career-purple-600" />
          AI Career Coach
        </CardTitle>
        <CardDescription>
          Get personalized career guidance powered by advanced AI
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "ai" && (
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-career-purple-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-career-purple-600" />
                  </div>
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                  message.sender === "user"
                    ? "bg-career-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.content}
              </div>
              {message.sender === "user" && (
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-career-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-career-blue-600" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-career-purple-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-career-purple-600" />
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Try asking about:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto p-3 text-xs"
                  onClick={() => handleSendMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your career..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isTyping}
            size="icon"
            className="bg-career-purple-600 hover:bg-career-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerChat;
