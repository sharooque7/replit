import { Check } from "lucide-react";

export default function About() {
  const backendTechnologies = [
    "Python/FastAPI",
    "Node.js/Express",
    "PostgreSQL/MongoDB",
    "Docker/Kubernetes"
  ];

  const devopsTools = [
    "AWS/GCP",
    "Redis/Elasticsearch",
    "CI/CD Pipelines",
    "Microservices"
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">About Me</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Passionate backend engineer with a focus on building robust, scalable systems
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Backend development workspace with multiple monitors" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-secondary mb-6">Building the Engine Behind Great Applications</h3>
            <p className="text-slate-600 mb-6">
              With 5+ years of experience in backend development, I specialize in creating efficient, 
              maintainable systems that scale. I'm passionate about clean architecture, performance 
              optimization, and building APIs that developers love to work with.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-secondary mb-3">Backend Technologies</h4>
                <ul className="space-y-2 text-slate-600">
                  {backendTechnologies.map((tech) => (
                    <li key={tech} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-secondary mb-3">DevOps & Tools</h4>
                <ul className="space-y-2 text-slate-600">
                  {devopsTools.map((tool) => (
                    <li key={tool} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-600 italic">
                "I believe great backend systems are invisible to users but essential for developers. 
                My goal is to build infrastructure that's reliable, performant, and joy to work with."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
