import { useNavigate } from 'react-router-dom';
import { Rocket, Users, Target, Brain, Calendar, ArrowRight, Star, Sparkles } from 'lucide-react';
import InkTrail from '../components/ui/InkTrail';

const stats = [
  { label: 'Matches Made', value: '2,400+', icon: Users },
  { label: 'Satisfaction Rate', value: '95%', icon: Star },
  { label: 'Goals Completed', value: '8,200+', icon: Target },
  { label: 'Active Mentors', value: '680+', icon: Brain },
];

const features = [
  {
    icon: Sparkles,
    title: 'Explainable AI Matching',
    description: 'See exactly why each mentor is recommended — skills alignment, timezone overlap, and industry fit scored transparently.',
  },
  {
    icon: Target,
    title: 'Kanban Goal Tracking',
    description: 'Replace boring checklists with a shared Trello-style board. Drag goals through To-Do → In-Progress → Completed.',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Instantly see overlapping free time across timezones. Book sessions in one click, no back-and-forth emails.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Ink Trail Effect */}
      <InkTrail />

      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Udaan</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/mentee')}
              className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2"
            >
              Demo Dashboard
            </button>
            <button
              onClick={() => navigate('/register/mentee')}
              className="text-sm bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Mentor Matching
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Find the mentor who{' '}
            <span className="text-primary-600">changes everything.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Udaan connects ambitious professionals with experienced mentors through
            transparent AI matching, structured goal tracking, and smart scheduling.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register/mentee')}
              className="w-full sm:w-auto bg-primary-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              I'm a Mentee
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/register/mentor')}
              className="w-full sm:w-auto border-2 border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:border-primary-300 hover:text-primary-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              I'm a Mentor
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why teams choose Udaan</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Built for corporate HR and university career centers who demand measurable outcomes.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to accelerate your growth?</h2>
          <p className="text-primary-100 mb-8 max-w-lg mx-auto">
            Join thousands of professionals already building meaningful mentorship connections.
          </p>
          <button
            onClick={() => navigate('/register/mentee')}
            className="bg-white text-primary-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-primary-50 transition-colors"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Udaan</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 Udaan. Built for the future of mentorship.</p>
        </div>
      </footer>
    </div>
  );
}
