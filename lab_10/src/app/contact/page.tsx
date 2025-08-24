export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">
              Connect With Us
            </h1>
            <p className="text-xl text-gray-600">
              Join our community or get support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-100">
              <h2 className="text-2xl font-bold text-blue-600 mb-6">
                Send us a message
              </h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-100 mb-6">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 text-white">
                      📧
                    </div>
                    <div>
                      <p className="font-semibold text-blue-600">Email</p>
                      <p className="text-gray-600">hello@socialhub.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 text-white">
                      💬
                    </div>
                    <div>
                      <p className="font-semibold text-blue-600">Live Chat</p>
                      <p className="text-gray-600">Available 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 text-white">
                      🌍
                    </div>
                    <div>
                      <p className="font-semibold text-blue-600">
                        Global Community
                      </p>
                      <p className="text-gray-600">200+ countries worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">
                  Follow Us
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                    📘 Facebook
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                    🐦 Twitter
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                    📷 Instagram
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                    💼 LinkedIn
                  </button>
                </div>
                <p className="text-gray-600 text-center mt-4 text-sm">
                  Join millions of users connecting on SocialHub
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I create an account?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Click the "Join Now" button and follow the simple registration
                  process. You'll be connected in minutes!
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is SocialHub free to use?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Yes! SocialHub is completely free to use with optional premium
                  features for enhanced experience.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I report inappropriate content?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Use the report button on any post or message. Our moderation
                  team reviews reports within 24 hours.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I delete my account?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Yes, you can permanently delete your account anytime from your
                  account settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
