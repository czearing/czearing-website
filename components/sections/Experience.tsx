import styles from './Experience.module.css';

const roles = [
  {
    company: 'Microsoft',
    title: 'Software Engineer',
    period: 'Jun 2023 - Present',
    location: 'Redmond, WA',
    current: true,
    bullets: [
      'Building features for M365 Lighthouse to drive Copilot adoption in the SMB segment.',
      'Reduced API calls by over 50% through call deduplication and logic optimization.',
      'Integrated ESLint, led unit test coverage initiatives, and set up Storybook for component documentation.',
    ],
  },
  {
    company: 'Pongo AI',
    title: 'Co-Founder, CTO',
    period: 'Sep 2021 - Apr 2022',
    location: 'Redmond, WA',
    current: false,
    bullets: [
      'Led end-to-end technical strategy for an AI platform modernizing e-commerce experiences.',
      'Built a scalable component library, multiple production web apps, and a React Native mobile app.',
      'Directed product development and supported fundraising through technical due diligence.',
    ],
  },
  {
    company: 'Microsoft',
    title: 'Software Engineer Intern',
    period: 'Jul 2021 - Sep 2021',
    location: 'Remote',
    current: false,
    bullets: [
      'Contributed to Fluent UI V9, leading development of the Switch and Slider components.',
      'Built conformance tests across all components and implemented visual regression testing for light and dark themes.',
    ],
  },
  {
    company: 'Microsoft',
    title: 'Open Source Developer',
    period: 'Jul 2020 - Dec 2020',
    location: 'Remote',
    current: false,
    bullets: [
      'Contributed to Fluent UI V8, refactoring class-based components to functional.',
      'Expanded unit test coverage and fixed numerous component bugs across the library.',
    ],
  },
];

export function Experience() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Experience</h2>
      <div className={styles.list}>
        {roles.map((role, i) => (
          <div key={i} className={styles.entry}>
            <div className={styles.header}>
              <div className={styles.left}>
                <span className={`${styles.company} ${role.current ? styles.current : ''}`}>
                  {role.company}
                </span>
                <span className={styles.title}>{role.title}</span>
              </div>
              <div className={styles.right}>
                <span className={styles.period}>{role.period}</span>
                <span className={styles.location}>{role.location}</span>
              </div>
            </div>
            <ul className={styles.bullets}>
              {role.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
