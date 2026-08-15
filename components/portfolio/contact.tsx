import { siteConfig } from "@/data/portfolio-data"
import { Mail, Linkedin, Instagram } from "lucide-react"
import { RobloxIcon, DiscordIcon } from "@/components/icons"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Want to chat about a project or just say hi? I&apos;m always available for a conversation.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Email */}
          <div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-muted-foreground/50 transition-colors"
            >
              <div className="p-2 bg-secondary rounded-md text-muted-foreground group-hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="text-foreground font-medium group-hover:text-accent transition-colors">
                  {siteConfig.email}
                </div>
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3">
            {siteConfig.social.roblox && (
              <SocialLink
                href={siteConfig.social.roblox}
                icon={<RobloxIcon className="w-5 h-5" />}
                label="Roblox"
              />
            )}
            {siteConfig.social.instagram && (
              <SocialLink
                href={siteConfig.social.instagram}
                icon={<Instagram className="w-5 h-5" />}
                label="Instagram"
              />
            )}
            {siteConfig.social.linkedin && (
              <SocialLink
                href={siteConfig.social.linkedin}
                icon={<Linkedin className="w-5 h-5" />}
                label="LinkedIn"
              />
            )}
            {siteConfig.social.discord && (
              <div className="group flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg">
                <DiscordIcon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm text-muted-foreground">{siteConfig.social.discord}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:border-muted-foreground/50 transition-colors"
      aria-label={label}
    >
      <span className="text-muted-foreground group-hover:text-accent transition-colors">
        {icon}
      </span>
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </a>
  )
}
