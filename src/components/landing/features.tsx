import { BookOpen, Code, Users, Zap } from "lucide-react";

const features = [
  {
    name: "Easy to Use",
    description:
      "Our intuitive interface makes it simple to create, edit, and manage your blog posts.",
    icon: BookOpen,
  },
  {
    name: "Collaborative",
    description:
      "Invite team members and collaborate on content creation and management.",
    icon: Users,
  },
  {
    name: "Fast and Responsive",
    description:
      "Built with Next.js and Appwrite for lightning-fast performance and responsiveness.",
    icon: Zap,
  },
  {
    name: "Free and Open Source",
    description:
      "Demo Blog is free and open source, so you can use it for your own projects.",
    icon: Code,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white mb-12" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to start blogging
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Demo Blog provides all the tools you need to create, manage, and
            grow your blog.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
