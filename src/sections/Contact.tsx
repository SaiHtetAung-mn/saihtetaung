import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { SiLinkedin, SiLine } from 'react-icons/si'
import personalInfo from '../data/personal-info.json'
import ScrollFloatTitle from '../components/ScrollFloatTitle'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const formspreeFormId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
  const formspreeEndpoint = formspreeFormId ? `https://formspree.io/f/${formspreeFormId}` : null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formspreeEndpoint) {
      setFeedback('Oops, something went wrong. Please try again in a moment.')
      return
    }

    setIsSubmitting(true)
    setFeedback(null)
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }

      setFeedback('Thanks! Your message is on its way to my inbox.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error(error)
      setFeedback('Oops, something went wrong. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactLinks = [
    { icon: MdEmail, label: 'Email', value: personalInfo.email },
    { icon: SiLinkedin, label: 'LinkedIn', value: personalInfo.linkedin },
    { icon: MdLocationOn, label: 'Address', value: personalInfo.address },
    { icon: SiLine, label: 'LINE', value: personalInfo.line },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  return (
    <section
      id="contact"
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
              { text: 'Get In' },
              { text: 'Touch', accent: true },
            ]}
          />
          <p className="text-xl text-secondary">
            I'd love to hear from you. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <ScrollFloatTitle
              as="h3"
              className="mb-6 text-2xl font-bold text-primary"
              segments={[{ text: 'Contact Information' }]}
            />
            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-start">
                  <div className="mr-4 flex-shrink-0 text-4xl text-current opacity-70">
                    <link.icon />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{link.label}</p>
                    <p className="text-secondary">{link.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-secondary">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border/70 bg-surface px-4 py-2 text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-secondary">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border/70 bg-surface px-4 py-2 text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-secondary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-lg border border-border/70 bg-surface px-4 py-2 text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
                placeholder="Your message"
              />
            </div>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-accent bg-accent px-8 py-3 font-semibold text-accent-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
            {feedback && <p className="text-center text-sm text-secondary">{feedback}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
