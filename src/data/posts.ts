export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured?: boolean;
  content: string[];
};

export const posts: BlogPost[] = [
  {
    slug: 'ai-tutors-and-the-next-learning-loop',
    title: 'AI Tutors and the Next Learning Loop',
    excerpt:
      'Adaptive tutoring tools are becoming less like answer engines and more like patient learning partners.',
    category: 'AI in Education',
    tags: ['AI', 'Learning Science', 'EdTech'],
    date: 'Apr 18, 2026',
    readTime: '7 min read',
    author: 'Maya Chen',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    content: [
      'The most promising AI tutoring systems do not simply produce faster answers. They create tighter learning loops by watching for confusion, checking partial understanding, and changing the next prompt based on what a learner actually needs.',
      'That shift matters because education is not a content delivery problem. It is a feedback problem. Students need the right challenge, at the right time, with enough context to keep going independently.',
      'Schools that adopt AI tutors thoughtfully will treat them as practice infrastructure. Teachers still set goals, review evidence, and shape the culture of the classroom, while software handles some of the repetition that makes mastery possible.',
    ],
  },
  {
    slug: 'research-notebooks-for-modern-teams',
    title: 'Research Notebooks for Modern Teams',
    excerpt:
      'A practical framework for turning scattered experiments into durable, searchable team knowledge.',
    category: 'Research',
    tags: ['Research', 'Knowledge Management'],
    date: 'Apr 12, 2026',
    readTime: '6 min read',
    author: 'Jon Bell',
    image:
      'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    content: [
      'Research notes become valuable when they can survive the week they were written in. A good notebook captures the question, method, evidence, decision, and next experiment without forcing researchers into ceremony.',
      'The best team systems use consistent metadata and lightweight templates. That makes old work discoverable without making current work miserable.',
      'Modern research teams should think of notebooks as product infrastructure. They reduce repeated work, make onboarding faster, and give leaders a clearer view of which assumptions are supported by evidence.',
    ],
  },
  {
    slug: 'small-language-models-on-campus',
    title: 'Small Language Models on Campus',
    excerpt:
      'Why universities are testing smaller domain-tuned models for privacy-aware teaching and research workflows.',
    category: 'Technology',
    tags: ['LLMs', 'Privacy', 'Higher Ed'],
    date: 'Apr 5, 2026',
    readTime: '5 min read',
    author: 'Priya Nair',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Small language models are attractive to universities because they can be tuned for local policies, academic language, and constrained tasks without the cost profile of massive general models.',
      'The tradeoff is focus. Smaller models need clearer workflows and stronger evaluation, but they can be easier to audit and deploy in sensitive environments.',
      'For campuses, the winning pattern may be a mixed stack: large models for broad reasoning, small models for repeatable institutional work, and human review wherever stakes are high.',
    ],
  },
  {
    slug: 'designing-better-digital-libraries',
    title: 'Designing Better Digital Libraries',
    excerpt:
      'Digital collections become more useful when search, context, and citation workflows are designed together.',
    category: 'Education',
    tags: ['Libraries', 'UX', 'Education'],
    date: 'Mar 29, 2026',
    readTime: '4 min read',
    author: 'Maya Chen',
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    content: [
      'A digital library is more than a search box. Readers need a path from discovery to comprehension to reuse, especially when sources are dense or unfamiliar.',
      'That means richer previews, clearer provenance, and citation tools that feel native to the reading flow.',
      'The most effective library products reduce friction without flattening complexity. They help people understand why a source matters before asking them to commit to it.',
    ],
  },
  {
    slug: 'the-classroom-as-a-lab',
    title: 'The Classroom as a Lab',
    excerpt:
      'Teachers are using rapid cycles of observation and revision to improve learning experiences week by week.',
    category: 'Learning Design',
    tags: ['Teaching', 'Experimentation'],
    date: 'Mar 21, 2026',
    readTime: '6 min read',
    author: 'Jon Bell',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Treating the classroom as a lab does not mean turning students into data points. It means making teaching decisions observable and revisable.',
      'Small experiments can answer questions like which examples unlock discussion, which prompts reveal misconceptions, and where students need more practice.',
      'The key is humility. Teachers collect signals, adapt the design, and keep the human relationship at the center of the work.',
    ],
  },
  {
    slug: 'building-an-ai-reading-stack',
    title: 'Building an AI Reading Stack',
    excerpt:
      'A modern reading workflow can combine summarization, source tracking, and reflection without losing rigor.',
    category: 'AI Tools',
    tags: ['AI', 'Productivity', 'Research'],
    date: 'Mar 14, 2026',
    readTime: '8 min read',
    author: 'Priya Nair',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    content: [
      'AI can make reading faster, but speed alone is not the goal. A strong reading stack helps you decide what deserves deep attention and what can be safely skimmed.',
      'Use AI to generate questions, compare arguments, and surface definitions. Keep citations and original excerpts close so interpretation remains grounded.',
      'The healthiest workflows preserve friction at the right moments. Reflection, disagreement, and source checking should remain part of the reading process.',
    ],
  },
];
