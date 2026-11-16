// ── Udaan Mock Data ──
// Pre-seeded data so the app looks active and lived-in on first render.

export const mentors = [
  {
    id: 'm1',
    name: 'Sneha Iyer',
    gender: 'female',
    initials: 'SI',
    title: 'VP of Engineering',
    company: 'Razorpay',
    industry: 'FinTech',
    yearsExp: 12,
    timezone: 'IST (UTC+5:30)',
    timezoneOffset: 5.5,
    bio: 'Passionate about scaling engineering teams and building inclusive cultures. Former Flipkart, now leading platform engineering at Razorpay.',
    skills: ['System Design', 'Leadership', 'Scaling', 'Cloud Architecture'],
    style: 'Direct Coaching',
    availability: 'Tue/Thu 10am-12pm IST',
    avatarColor: 'bg-teal-500',
  },
  {
    id: 'm2',
    name: 'Arjun Mehta',
    gender: 'male',
    initials: 'AM',
    title: 'Senior Product Manager',
    company: 'Swiggy',
    industry: 'Consumer Tech',
    yearsExp: 8,
    timezone: 'IST (UTC+5:30)',
    timezoneOffset: 5.5,
    bio: 'Product leader specializing in growth and engagement. Love helping PMs navigate the transition from IC to leadership.',
    skills: ['Product Strategy', 'Agile', 'Communication', 'Leadership'],
    style: 'Guided Discovery',
    availability: 'Mon/Wed 2pm-4pm IST',
    avatarColor: 'bg-blue-500',
  },
  {
    id: 'm3',
    name: 'Priya Venkatesh',
    gender: 'female',
    initials: 'PV',
    title: 'Data Science Director',
    company: 'PhonePe',
    industry: 'FinTech / Payments',
    yearsExp: 10,
    timezone: 'IST (UTC+5:30)',
    timezoneOffset: 5.5,
    bio: 'Leading recommendation systems at PhonePe. PhD in ML from IISc Bangalore. Committed to increasing diversity in data science.',
    skills: ['Machine Learning', 'Data Analysis', 'Python', 'Leadership'],
    style: 'Guided Discovery',
    availability: 'Wed/Fri 9am-11am IST',
    avatarColor: 'bg-purple-500',
  },
  {
    id: 'm4',
    name: 'Karthik Raman',
    gender: 'male',
    initials: 'KR',
    title: 'Staff Software Engineer',
    company: 'Zerodha',
    industry: 'FinTech / Trading',
    yearsExp: 9,
    timezone: 'IST (UTC+5:30)',
    timezoneOffset: 5.5,
    bio: 'Full-stack engineer who loves mentoring junior devs through real-world projects. Built Zerodha Kite frontend & microservices.',
    skills: ['React', 'JavaScript', 'System Design', 'Cloud Architecture'],
    style: 'Direct Coaching',
    availability: 'Tue/Thu 3pm-5pm IST',
    avatarColor: 'bg-orange-500',
  },
  {
    id: 'm5',
    name: 'Ananya Sharma',
    gender: 'female',
    initials: 'AS',
    title: 'Chief Design Officer',
    company: 'CRED',
    industry: 'FinTech / Design',
    yearsExp: 15,
    timezone: 'IST (UTC+5:30)',
    timezoneOffset: 5.5,
    bio: 'Design leader with 15 years across agencies and top tech firms. Helping product designers master design systems & research.',
    skills: ['UX Research', 'Design Systems', 'Leadership', 'Communication'],
    style: 'Career Sponsor',
    availability: 'Mon/Wed 10am-12pm IST',
    avatarColor: 'bg-pink-500',
  },
  {
    id: 'm6',
    name: 'Rohan Deshmukh',
    gender: 'male',
    initials: 'RD',
    title: 'Engineering Manager',
    company: 'Meesho',
    industry: 'E-Commerce',
    yearsExp: 7,
    timezone: 'IST (UTC+5:30)',
    timezoneOffset: 5.5,
    bio: 'Transitioned from IC to EM 3 years ago. I help engineers master Agile delivery, career growth, and team communication.',
    skills: ['Leadership', 'Agile', 'Communication', 'System Design'],
    style: 'Accountability Partner',
    availability: 'Tue/Fri 1pm-3pm IST',
    avatarColor: 'bg-indigo-500',
  },
  {
    id: 'm7',
    name: 'Vikram Bhat',
    gender: 'male',
    initials: 'VB',
    title: 'Tech Lead & Cloud Architect',
    company: 'Google India',
    industry: 'Cloud Infrastructure',
    yearsExp: 11,
    timezone: 'IST (UTC+5:30)',
    timezoneOffset: 5.5,
    bio: 'Tech Lead at Google Cloud. Mentoring developers on high-throughput microservices, Kubernetes, and technical leadership.',
    skills: ['Cloud Architecture', 'System Design', 'Leadership', 'Python'],
    style: 'Direct Coaching',
    availability: 'Mon/Wed 11am-1pm IST',
    avatarColor: 'bg-slate-700',
  },
  {
    id: 'm8',
    name: 'Meera Krishnan',
    gender: 'female',
    initials: 'MK',
    title: 'Staff Data Scientist',
    company: 'Flipkart',
    industry: 'E-Commerce / AI',
    yearsExp: 10,
    timezone: 'IST (UTC+5:30)',
    timezoneOffset: 5.5,
    bio: 'Staff DS at Flipkart leading search ranking models. Passionate about helping analysts transition into full-stack Data Science & ML.',
    skills: ['Machine Learning', 'Data Analysis', 'Python', 'Product Strategy'],
    style: 'Guided Discovery',
    availability: 'Tue/Thu 9am-11am IST',
    avatarColor: 'bg-violet-600',
  },
];

export const mentees = [
  {
    id: 'me1',
    name: 'Aditya Kulkarni',
    gender: 'male',
    email: 'aditya.k@techstartup.in',
    initials: 'AK',
    title: 'Junior Software Engineer',
    company: 'TechStartup Labs',
    targetRole: 'Senior Software Engineer',
    skills: ['JavaScript', 'React', 'Python'],
    goals: ['System design skills', 'Get promoted to senior', 'Build side projects'],
    avatarColor: 'bg-cyan-500',
  },
  {
    id: 'me2',
    name: 'Nisha Agarwal',
    gender: 'female',
    email: 'nisha.a@deloitte.in',
    initials: 'NA',
    title: 'Product Analyst',
    company: 'Deloitte India',
    targetRole: 'Product Manager',
    skills: ['Product Strategy', 'Data Analysis', 'UX Research'],
    goals: ['Transition to PM role', 'Build product sense', 'Network in tech'],
    avatarColor: 'bg-rose-500',
  },
  {
    id: 'me3',
    name: 'Rahul Nair',
    gender: 'male',
    email: 'rahul.n@designcraft.in',
    initials: 'RN',
    title: 'UX Designer',
    company: 'DesignCraft Studio',
    targetRole: 'Design Lead',
    skills: ['UX Research', 'Design Systems', 'Communication'],
    goals: ['Leadership skills', 'Portfolio review', 'Design systems experience'],
    avatarColor: 'bg-amber-500',
  },
  {
    id: 'me4',
    name: 'Shruti Joshi',
    gender: 'female',
    email: 'shruti.j@apollo.in',
    initials: 'SJ',
    title: 'Data Analyst',
    company: 'Apollo Health',
    targetRole: 'Data Scientist',
    skills: ['Python', 'Data Analysis', 'Machine Learning'],
    goals: ['Learn ML fundamentals', 'Build portfolio', 'Land DS role'],
    avatarColor: 'bg-emerald-500',
  },
];

// Pre-seeded demo user
export const currentUser = {
  ...mentees[0],
  role: 'mentee',
};

export const currentMentor = mentors[0];

export const matches = [
  {
    id: 'match1',
    mentor: mentors[0], // Sneha
    score: 94,
    reasons: [
      { label: 'Complementary Skills', value: 36, detail: 'System Design + Scaling mastery' },
      { label: 'Timezone Overlap', value: 30, detail: '6 overlapping hours daily in IST' },
      { label: 'Industry Match', value: 28, detail: 'Engineering leadership in Tech' },
    ],
  },
  {
    id: 'match2',
    mentor: mentors[3], // Karthik
    score: 89,
    reasons: [
      { label: 'Complementary Skills', value: 32, detail: 'React & Frontend architecture at scale' },
      { label: 'Timezone Overlap', value: 30, detail: '7 overlapping hours daily' },
      { label: 'Industry Match', value: 27, detail: 'FinTech / High performance web' },
    ],
  },
  {
    id: 'match3',
    mentor: mentors[6], // Vikram
    score: 86,
    reasons: [
      { label: 'Complementary Skills', value: 30, detail: 'Cloud Architecture & Google Tech Lead experience' },
      { label: 'Timezone Overlap', value: 28, detail: '5 overlapping hours daily' },
      { label: 'Industry Match', value: 28, detail: 'Cloud infrastructure focus' },
    ],
  },
  {
    id: 'match4',
    mentor: mentors[1], // Arjun
    score: 81,
    reasons: [
      { label: 'Complementary Skills', value: 24, detail: 'Product strategy for technical leads' },
      { label: 'Timezone Overlap', value: 30, detail: '5 overlapping hours daily' },
      { label: 'Industry Match', value: 27, detail: 'Fast-paced consumer tech' },
    ],
  },
  {
    id: 'match5',
    mentor: mentors[2], // Priya
    score: 78,
    reasons: [
      { label: 'Complementary Skills', value: 28, detail: 'Machine learning fundamentals for Python devs' },
      { label: 'Timezone Overlap', value: 24, detail: '4 overlapping hours daily' },
      { label: 'Industry Match', value: 26, detail: 'FinTech / Data platform' },
    ],
  },
  {
    id: 'match6',
    mentor: mentors[5], // Rohan
    score: 85,
    reasons: [
      { label: 'Complementary Skills', value: 30, detail: 'Agile team leadership & career growth' },
      { label: 'Timezone Overlap', value: 29, detail: '5 overlapping hours daily' },
      { label: 'Industry Match', value: 26, detail: 'E-Commerce / Scale-up culture' },
    ],
  },
  {
    id: 'match7',
    mentor: mentors[4], // Ananya
    score: 72,
    reasons: [
      { label: 'Complementary Skills', value: 20, detail: 'Design system thinking for engineers' },
      { label: 'Timezone Overlap', value: 26, detail: '3 overlapping hours daily' },
      { label: 'Industry Match', value: 26, detail: 'FinTech / Design overlap' },
    ],
  },
  {
    id: 'match8',
    mentor: mentors[7], // Meera
    score: 79,
    reasons: [
      { label: 'Complementary Skills', value: 26, detail: 'Data Science & algorithm optimization' },
      { label: 'Timezone Overlap', value: 28, detail: '6 overlapping hours daily' },
      { label: 'Industry Match', value: 25, detail: 'E-Commerce recommendation models' },
    ],
  },
];

export const kanbanGoals = {
  'todo': [
    {
      id: 'g1',
      title: 'Complete System Design Deep Dive',
      description: 'Study core distributed system concepts: load balancing, consistent hashing, caching strategies, and database partitioning.',
      resources: [
        { title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer' },
        { title: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/' }
      ],
      tags: [{ label: 'Learning', color: 'bg-blue-100 text-blue-700' }, { label: 'Technical', color: 'bg-purple-100 text-purple-700' }],
      progress: 0,
      mentorComment: 'Focus first on Chapter 5 & 6 (Replication & Partitioning).',
      dueDate: '2026-10-01',
    },
    {
      id: 'g2',
      title: 'Write Tech Blog on React Performance',
      description: 'Draft a technical breakdown on optimizing React 18 render lifecycles, memoization pitfalls, and concurrent features.',
      resources: [
        { title: 'React 18 Performance Guide', url: 'https://react.dev/learn' },
        { title: 'Web Vitals & React Metrics', url: 'https://web.dev/vitals/' }
      ],
      tags: [{ label: 'Content', color: 'bg-pink-100 text-pink-700' }],
      progress: 0,
      mentorComment: null,
      dueDate: '2026-10-15',
    },
    {
      id: 'g3',
      title: 'Prepare Mock Architectural Interview',
      description: 'Complete a live 45-minute whiteboard simulation designing an URL shortener with rate limiting and analytics pipeline.',
      resources: [
        { title: 'Mock Interview Rubric & Criteria', url: 'https://interviewing.io/guides/system-design-interview' }
      ],
      tags: [{ label: 'Career', color: 'bg-amber-100 text-amber-700' }, { label: 'Practice', color: 'bg-green-100 text-green-700' }],
      progress: 0,
      mentorComment: "Let's schedule this for our upcoming session!",
      dueDate: '2026-09-25',
    },
  ],
  'in-progress': [
    {
      id: 'g4',
      title: 'Build Full-Stack Portfolio Platform',
      description: 'Ship an interactive portfolio showing production architectural diagrams, open-source work, and live benchmark demos.',
      resources: [
        { title: 'Tailwind UI Patterns', url: 'https://tailwindui.com/' },
        { title: 'Vercel Deployment Best Practices', url: 'https://vercel.com/docs' }
      ],
      tags: [{ label: 'Project', color: 'bg-indigo-100 text-indigo-700' }, { label: 'Frontend', color: 'bg-cyan-100 text-cyan-700' }],
      progress: 65,
      mentorComment: 'Looking sharp! Make sure to highlight the metrics and latency gains in your case studies.',
      dueDate: '2026-09-30',
      isActive: true,
    },
    {
      id: 'g5',
      title: 'Read "Designing Data-Intensive Applications"',
      description: 'Working through Martin Kleppmann\'s definitive text on distributed storage, transactions, and consensus protocols.',
      resources: [
        { title: 'O\'Reilly DDIA Overview', url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/' }
      ],
      tags: [{ label: 'Learning', color: 'bg-blue-100 text-blue-700' }],
      progress: 40,
      mentorComment: 'Pay extra attention to Raft vs Paxos consensus mechanisms in Part III.',
      dueDate: '2026-10-20',
    },
    {
      id: 'g6',
      title: 'Contribute to Open Source Project',
      description: 'Submitted first PR to open-source developer tooling repository; addressing reviewer comments on test coverage.',
      resources: [
        { title: 'GitHub First Contributions', url: 'https://github.com/firstcontributions/first-contributions' }
      ],
      tags: [{ label: 'Technical', color: 'bg-purple-100 text-purple-700' }, { label: 'Networking', color: 'bg-rose-100 text-rose-700' }],
      progress: 25,
      mentorComment: null,
      dueDate: '2026-11-01',
    },
  ],
  'completed': [
    {
      id: 'g7',
      title: 'Revamp LinkedIn & Tech Resume',
      description: 'Re-written resume using the Google X-Y-Z formula (Accomplished [X] as measured by [Y], by doing [Z]).',
      resources: [
        { title: 'Tech Resume Guide (Careercup)', url: 'https://www.careercup.com/resume' }
      ],
      tags: [{ label: 'Career', color: 'bg-amber-100 text-amber-700' }],
      progress: 100,
      mentorComment: 'Excellent headline! Quantified metrics stand out much better now.',
      dueDate: '2026-09-10',
    },
    {
      id: 'g8',
      title: 'Complete Modern JavaScript & Concurrency Deep Dive',
      description: 'Explored event loop microtasks/macrotasks, Web Workers, memory leak debugging, and modern ES2024 features.',
      resources: [
        { title: 'MDN JavaScript Concurrency Model', url: 'https://developer.mozilla.org/' }
      ],
      tags: [{ label: 'Learning', color: 'bg-blue-100 text-blue-700' }, { label: 'Technical', color: 'bg-purple-100 text-purple-700' }],
      progress: 100,
      mentorComment: null,
      dueDate: '2026-09-05',
    },
    {
      id: 'g9',
      title: 'Attend Bengaluru Tech Networking Summit',
      description: 'Participated in Bengaluru engineering roundtable; connected with leads from Razorpay, Swiggy, and Zerodha.',
      resources: [
        { title: 'Bengaluru Tech Meetups', url: 'https://www.meetup.com/' }
      ],
      tags: [{ label: 'Networking', color: 'bg-rose-100 text-rose-700' }],
      progress: 100,
      mentorComment: 'Great connections made! Follow up with the platform team contact.',
      dueDate: '2026-09-01',
    },
  ],
};

export const chatMessages = [
  {
    id: 'c1',
    senderId: 'm1',
    senderName: 'Sneha Iyer',
    senderInitials: 'SI',
    avatarColor: 'bg-teal-500',
    text: 'Hey Aditya! Welcome aboard. I\'ve been looking forward to mentoring you. Let\'s start by discussing your goals for the next quarter.',
    timestamp: '2026-09-12T09:00:00Z',
    isCurrentUser: false,
  },
  {
    id: 'c2',
    senderId: 'me1',
    senderName: 'Aditya Kulkarni',
    senderInitials: 'AK',
    avatarColor: 'bg-cyan-500',
    text: 'Hi Sneha! Thanks so much for accepting my request. I\'m really excited to work with you. My main goal right now is to level up my system design skills so I can get promoted to Senior Engineer.',
    timestamp: '2026-09-12T09:15:00Z',
    isCurrentUser: true,
  },
  {
    id: 'c3',
    senderId: 'm1',
    senderName: 'Sneha Iyer',
    senderInitials: 'SI',
    avatarColor: 'bg-teal-500',
    text: 'That\'s a great goal! I went through the same transition at Flipkart. Let\'s break it down: (1) learn the fundamentals, (2) practice with real problems, (3) do mock design reviews. Sound good?',
    timestamp: '2026-09-12T09:22:00Z',
    isCurrentUser: false,
  },
  {
    id: 'c4',
    senderId: 'me1',
    senderName: 'Aditya Kulkarni',
    senderInitials: 'AK',
    avatarColor: 'bg-cyan-500',
    text: 'Absolutely! I\'ve started the "Designing Data-Intensive Applications" book. Should I also look into any specific system design resources?',
    timestamp: '2026-09-12T09:30:00Z',
    isCurrentUser: true,
  },
  {
    id: 'c5',
    senderId: 'm1',
    senderName: 'Sneha Iyer',
    senderInitials: 'SI',
    avatarColor: 'bg-teal-500',
    text: 'DDIA is perfect — focus on chapters 5-7 first. I also recommend the System Design Primer on GitHub. Let\'s set up your portfolio site as a practical project too. I added it to our goal board!',
    timestamp: '2026-09-12T09:45:00Z',
    isCurrentUser: false,
  },
  {
    id: 'c6',
    senderId: 'me1',
    senderName: 'Aditya Kulkarni',
    senderInitials: 'AK',
    avatarColor: 'bg-cyan-500',
    text: 'Saw that on the Kanban board — love it! I\'ve already started wireframing. Can we do a review in our next session?',
    timestamp: '2026-09-12T10:00:00Z',
    isCurrentUser: true,
  },
  {
    id: 'c7',
    senderId: 'm1',
    senderName: 'Sneha Iyer',
    senderInitials: 'SI',
    avatarColor: 'bg-teal-500',
    text: 'Definitely! Let\'s block time on Thursday. I\'ll look at what you have and we can iterate.',
    timestamp: '2026-09-12T10:10:00Z',
    isCurrentUser: false,
  },
  {
    id: 'c8',
    senderId: 'me1',
    senderName: 'Aditya Kulkarni',
    senderInitials: 'AK',
    avatarColor: 'bg-cyan-500',
    text: 'Will do! Thanks Sneha, really appreciate your guidance. See you then! 💪',
    timestamp: '2026-09-13T14:45:00Z',
    isCurrentUser: true,
  },
];

export const chatTemplates = [
  { id: 't1', label: 'Resume Review Request', icon: '📄', text: 'Hi! I\'ve updated my resume and would love your feedback. I\'ve focused on quantifying my impact and highlighting relevant projects. Could we review it in our next session?' },
  { id: 't2', label: 'Skill Gap Discussion', icon: '🎯', text: 'I\'ve been reflecting on the skills I need to develop for my target role. Can we discuss the key gaps and create an action plan to address them?' },
  { id: 't3', label: 'Goal Check-in', icon: '✅', text: 'Quick check-in on my current goals! Here\'s my progress update: [Share updates]. Any adjustments you\'d suggest?' },
  { id: 't4', label: 'Meeting Follow-up', icon: '📝', text: 'Thanks for our last session! Here are my key takeaways and action items: [List items]. Did I miss anything important?' },
  { id: 't5', label: 'Career Pivot Exploration', icon: '🔄', text: 'I\'m exploring a potential career pivot and would love your perspective. Can we discuss the pros/cons and what steps I should take to prepare?' },
];

export const userSchedule = [
  { day: 0, startHour: 9, endHour: 12 },
  { day: 0, startHour: 14, endHour: 17 },
  { day: 1, startHour: 10, endHour: 13 },
  { day: 1, startHour: 15, endHour: 18 },
  { day: 2, startHour: 9, endHour: 11 },
  { day: 2, startHour: 13, endHour: 16 },
  { day: 3, startHour: 10, endHour: 12 },
  { day: 3, startHour: 14, endHour: 17 },
  { day: 4, startHour: 9, endHour: 12 },
  { day: 4, startHour: 14, endHour: 16 },
];

export const mentorSchedule = [
  { day: 0, startHour: 12, endHour: 15 },
  { day: 1, startHour: 10, endHour: 12 },
  { day: 1, startHour: 16, endHour: 19 },
  { day: 2, startHour: 9, endHour: 11 },
  { day: 2, startHour: 14, endHour: 17 },
  { day: 3, startHour: 10, endHour: 12 },
  { day: 3, startHour: 15, endHour: 18 },
  { day: 4, startHour: 11, endHour: 14 },
];

export const upcomingMeetings = [
  {
    id: 'meet1',
    title: 'Portfolio Review Session',
    mentor: mentors[0],
    date: '2026-09-18',
    time: '10:00 AM',
    timezone: 'IST',
    duration: '45 min',
    type: 'Video Call',
  },
  {
    id: 'meet2',
    title: 'System Design Deep-Dive',
    mentor: mentors[0],
    date: '2026-09-22',
    time: '10:00 AM',
    timezone: 'IST',
    duration: '60 min',
    type: 'Video Call',
  },
  {
    id: 'meet3',
    title: 'Mock Interview Practice',
    mentor: mentors[0],
    date: '2026-09-25',
    time: '2:00 PM',
    timezone: 'IST',
    duration: '90 min',
    type: 'Video Call',
  },
];

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const hours = Array.from({ length: 12 }, (_, i) => i + 9);
