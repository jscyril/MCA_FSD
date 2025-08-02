import { useState } from "react";
import { Link } from "react-router";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "SocialHub is great for connecting with friends!",
    },
    {
      name: "Mike Chen",
      text: "Love using this platform for my business.",
    },
    {
      name: "Emily Davis",
      text: "Easy to use and very helpful for networking.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-[#ffffff] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center py-16">
          <h1 className="text-5xl font-bold text-[#003049] mb-6">
            Welcome to SocialHub
          </h1>
          <p className="text-xl text-[#003049] mb-8 max-w-3xl mx-auto">
            Connect with people around the world and share your experiences on
            our social networking platform.
          </p>
          <div className="space-x-4">
            <Link
              to="/contact"
              className="bg-[#C1121F] text-[#ffffff] px-8 py-4 rounded font-semibold hover:bg-[#780000]"
            >
              Join Now
            </Link>
            <Link
              to="/services"
              className="bg-[#669BBC] text-[#ffffff] px-8 py-4 rounded font-semibold hover:bg-[#003049]"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section className="py-16">
          <div className="bg-[#003049] text-[#ffffff] py-12 rounded-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Platform Statistics</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">10M+</div>
                <div className="text-[#669BBC]">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50M+</div>
                <div className="text-[#669BBC]">Posts Shared</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-[#669BBC]">Communities</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-[#669BBC]">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-[#003049] mb-12">
            Why Choose SocialHub?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#669BBC] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#003049]">
                Global Community
              </h3>
              <p className="text-[#003049]">
                Connect with people from around the world.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#C1121F] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#003049]">
                Privacy First
              </h3>
              <p className="text-[#003049]">Your data is secure with us.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#780000] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#003049]">
                Fast Performance
              </h3>
              <p className="text-[#003049]">Quick and reliable platform.</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-[#003049] mb-12">
            What Users Say
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-lg text-[#003049] mb-4">
                "{testimonials[currentTestimonial].text}"
              </p>
              <h4 className="font-semibold text-[#003049]">
                {testimonials[currentTestimonial].name}
              </h4>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={prevTestimonial}
                className="bg-[#669BBC] text-[#ffffff] px-4 py-2 rounded hover:bg-[#003049]"
              >
                Previous
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-[#669BBC] text-[#ffffff] px-4 py-2 rounded hover:bg-[#003049]"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="bg-[#C1121F] text-[#ffffff] py-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Join thousands of users on SocialHub today.
            </p>
            <Link
              to="/contact"
              className="bg-[#ffffff] text-[#C1121F] px-8 py-3 rounded font-semibold hover:bg-white"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
