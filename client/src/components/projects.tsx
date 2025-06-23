import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

export default function Projects() {
  const [, setLocation] = useLocation();

  const projects = [
    {
      title: "E-commerce API Platform",
      description:
        "Scalable FastAPI-based e-commerce backend handling 10K+ daily orders. Features include inventory management, payment processing, and real-time notifications.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      technologies: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
      github: "https://github.com/alexmorgan/ecommerce-api",
      demo: "#",
    },
    {
      title: "Real-time Analytics Engine",
      description:
        "High-performance data processing pipeline built with Node.js and Elasticsearch. Processes 1M+ events per hour with sub-second query response times.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      technologies: ["Node.js", "Elasticsearch", "Apache Kafka", "AWS"],
      github: "https://github.com/alexmorgan/analytics-engine",
      demo: "#",
    },
    {
      title: "Microservices Chat Platform",
      description:
        "Distributed chat system with separate services for users, messages, and notifications. Built with Python microservices and WebSocket real-time communication.",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      technologies: ["Python", "WebSockets", "MongoDB", "Kubernetes"],
      github: "https://github.com/alexmorgan/chat-microservices",
      demo: "#",
    },
  ];

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      FastAPI: "bg-blue-100 text-blue-700",
      PostgreSQL: "bg-green-100 text-green-700",
      Redis: "bg-purple-100 text-purple-700",
      Docker: "bg-orange-100 text-orange-700",
      "Node.js": "bg-green-100 text-green-700",
      Elasticsearch: "bg-yellow-100 text-yellow-700",
      "Apache Kafka": "bg-red-100 text-red-700",
      AWS: "bg-blue-100 text-blue-700",
      Python: "bg-blue-100 text-blue-700",
      WebSockets: "bg-purple-100 text-purple-700",
      MongoDB: "bg-green-100 text-green-700",
      Kubernetes: "bg-orange-100 text-orange-700",
    };
    return colors[tech] || "bg-gray-100 text-gray-700";
  };

  return (
    <section id="projects" className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Backend systems and APIs I've built to solve real-world problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      className={`px-3 py-1 text-sm rounded-full ${getTechColor(
                        tech
                      )}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="flex items-center text-slate-600 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center text-slate-600 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <Button
            onClick={() => setLocation("/projects")}
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mr-4"
          >
            View Technical Concepts & System Design
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            asChild
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <a
              href="https://github.com/sharooque7"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Projects on GitHub
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
