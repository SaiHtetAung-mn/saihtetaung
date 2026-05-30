import React from 'react';
import { motion } from 'framer-motion'
import certificationsData from '../data/education'
import { FaGraduationCap } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { MdOpenInNew } from 'react-icons/md';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import ScrollFloatTitle from '../components/ScrollFloatTitle';

export function Education() {
  const educationItems = certificationsData.educations;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  }

  const certifications = certificationsData.certifications;
  const achievements = certificationsData.achievements;
  return (
    <section
      id="education"
      className="min-h-screen bg-background px-4 py-20 text-primary sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <ScrollFloatTitle
            className="mb-4 text-4xl font-bold text-primary sm:text-5xl"
            segments={[
              { text: 'Education &' },
              { text: 'Achievements', accent: true },
            ]}
          />
          <p className="text-xl text-secondary">
            My academic background and professional certifications
          </p>
        </motion.div>

        {/* Education Section */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-2">
            <div className="text-4xl mr-2 flex-shrink-0">
              <FaGraduationCap className='text-accent'/>
            </div>
            <ScrollFloatTitle
              as="h3"
              className="text-2xl font-bold text-primary sm:text-3xl"
              segments={[{ text: 'Education' }]}
            />
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {educationItems.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border-l border-border/70 py-4 pl-4 sm:pl-8"
              >
                <div className="relative flex flex-col sm:flex-row items-stretch gap-6 min-h-[140px]">
                  <div className="w-full sm:w-32 md:w-40 h-full rounded-lg overflow-hidden flex items-stretch">
                    <ImageWithSkeleton
                      src={edu.school_image ? `/${edu.school_image}` : ''}
                      alt={edu.school}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '140px', maxHeight: '100%', background: '' }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                      {edu.year}
                    </p>
                    <h4 className="mt-2 text-2xl font-bold text-primary">
                      {edu.degree}
                    </h4>
                    <p className="mt-1 flex items-center gap-2 text-lg text-secondary">
                      {edu.school}
                      {edu.school_link && (
                        <a
                          href={edu.school_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full p-1.5 text-primary/60 transition-colors hover:bg-accent hover:text-accent-foreground"
                          title={`Visit ${edu.school}`}
                        >
                          <MdOpenInNew className="text-sm" />
                        </a>
                      )}
                    </p>
                    {edu.verify_link && (
                      <a
                        href={edu.verify_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block w-fit rounded border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        Verify Degree →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="mb-8 flex items-center gap-2">
            <div className="text-4xl mr-2 flex-shrink-0">
              <GiAchievement className="text-accent" />
            </div>
            <ScrollFloatTitle
              as="h3"
              className="text-2xl font-bold text-primary sm:text-3xl"
              segments={[{ text: 'Certifications' }]}
            />
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="rounded-lg border border-border/60 bg-surface p-6 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-surface sm:h-16 sm:w-16">
                    {cert.imageUrl ? (
                      <ImageWithSkeleton
                        src={cert.imageUrl}
                        alt={`${cert.title} badge`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-primary">
                        {cert.title?.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold tracking-wide text-secondary">
                      {cert.year}
                    </p>
                    <h4 className="mt-1 text-lg font-bold text-primary">
                      {cert.title}
                    </h4>
                    <p className="mt-1 text-secondary">
                      {cert.issuer}
                    </p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block rounded border border-border px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        View Certificate →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-2">
              <div className="text-4xl mr-2 flex-shrink-0">
                <GiAchievement className='text-accent'/>
              </div>
              <ScrollFloatTitle
                as="h3"
                className="text-2xl font-bold text-primary sm:text-3xl"
                segments={[{ text: 'Achievements' }]}
              />
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="relative flex min-h-[220px] items-end overflow-hidden rounded-lg border border-border/60 transition-colors"
                >
                  {/* Multiple images: crossfade animation */}
                  {Array.isArray(ach.image) ? (
                    <CrossfadeImages images={ach.image} />
                  ) : (
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{
                        backgroundImage: `url(/${ach.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(10%)',
                        zIndex: 0,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 z-[1] bg-primary/45" />
                  <div className="relative z-10 w-full rounded-b-lg bg-primary/70 p-6">
                    <p className="text-sm font-semibold tracking-wide text-background/75">
                      {ach.year}
                    </p>
                    <h4 className="text-lg font-bold text-background mt-1">
                      {ach.title}
                    </h4>
                    <p className="mt-1 text-background/80">
                      {ach.issuer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

export function CrossfadeImages({ images }: { images: string[] }) {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="absolute inset-0 w-full h-full">
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 w-full h-full"
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url(/${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(10%)',
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
}
