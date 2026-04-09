import Image from 'next/image';
import { ExternalLinkIcon } from '../Icons';
import styles from './Projects.module.css';

const projects = [
  {
    name: 'Cebus',
    description:
      'An accessible, open-source React component library built for performance and developer experience. Designed with a focus on clean APIs, theming, and WCAG compliance.',
    tags: ['React', 'TypeScript', 'CSS', 'Storybook'],
    href: 'https://github.com/cebus-org/cebus',
    image: 'https://opengraph.githubassets.com/1/cebus-org/cebus',
    icon: 'https://avatars.githubusercontent.com/cebus-org' as string | undefined,
  },
  {
    name: 'Fluent UI',
    description:
      'Core contributions to Microsoft\'s open-source design system. Built the Switch and Slider components in V9, implemented conformance and visual regression testing infrastructure, and refactored V8 components to functional patterns.',
    tags: ['React', 'TypeScript', 'Open Source', 'Design Systems'],
    href: 'https://github.com/microsoft/fluentui',
    image: 'https://opengraph.githubassets.com/1/microsoft/fluentui',
    icon: 'https://avatars.githubusercontent.com/microsoft' as string | undefined,
  },
  {
    name: 'Book Cook',
    description:
      'An AI-powered recipe management app for building a personal digital cookbook. Generate custom recipes tailored to your preferences, organize your collection, and plan meals collaboratively.',
    tags: ['React', 'Next.js', 'TypeScript', 'AI'],
    href: 'https://github.com/Book-Cook/book-cook',
    image: 'https://opengraph.githubassets.com/1/Book-Cook/book-cook',
    icon: 'https://avatars.githubusercontent.com/Book-Cook' as string | undefined,
  },
  {
    name: 'Pongo AI',
    description:
      'Full-stack AI platform modernizing e-commerce. As co-founder and CTO, built the component library, production web applications, and a cross-platform React Native mobile app from the ground up.',
    tags: ['React Native', 'Node.js', 'AI', 'TypeScript'],
    href: null,
    image: undefined as string | undefined,
    icon: undefined as string | undefined,
  },
];

export function Projects() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.grid}>
        {projects.map((project) => {
          const cardContent = (
            <>
              {project.image && (
                <div className={styles.thumbnail}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 720px) 100vw, 280px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className={styles.cardHeader}>
                <div className={styles.nameRow}>
                  {project.icon && (
                    <Image
                      src={project.icon}
                      alt={`${project.name} logo`}
                      width={20}
                      height={20}
                      className={styles.icon}
                    />
                  )}
                  <h3 className={styles.name}>{project.name}</h3>
                </div>
                {project.href && (
                  <span className={styles.externalLink} aria-hidden="true">
                    <ExternalLinkIcon size={14} />
                  </span>
                )}
              </div>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </>
          );

          return project.href ? (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              aria-label={`View ${project.name} on GitHub`}
            >
              {cardContent}
            </a>
          ) : (
            <div key={project.name} className={styles.card}>
              {cardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
