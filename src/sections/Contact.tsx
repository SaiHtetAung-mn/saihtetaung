import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { SiLinkedin, SiLine } from 'react-icons/si'
import personalInfo from '../data/personal-info.json'

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
      className="min-h-screen bg-white px-4 py-20 text-black sm:px-6 lg:px-8 dark:bg-black dark:text-white"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-4xl font-bold text-black sm:text-5xl dark:text-white">
            Get In Touch
          </h2>
          <p className="text-xl text-black/65 dark:text-white/65">
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
            <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
              Contact Information
            </h3>
            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-start">
                  <div className="mr-4 flex-shrink-0 text-4xl text-current opacity-70">
                    <link.icon />
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">{link.label}</p>
                    <p className="text-black/65 dark:text-white/65">{link.value}</p>
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
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-black/15 bg-white px-4 py-2 text-black outline-none transition-colors focus:border-black dark:border-white/20 dark:bg-black dark:text-white dark:focus:border-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-black/15 bg-white px-4 py-2 text-black outline-none transition-colors focus:border-black dark:border-white/20 dark:bg-black dark:text-white dark:focus:border-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-lg border border-black/15 bg-white px-4 py-2 text-black outline-none transition-colors focus:border-black dark:border-white/20 dark:bg-black dark:text-white dark:focus:border-white"
                placeholder="Your message"
              />
            </div>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-black bg-black px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
            {feedback && <p className="text-center text-sm text-black/65 dark:text-white/65">{feedback}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
