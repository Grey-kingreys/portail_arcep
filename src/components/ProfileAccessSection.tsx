import { Building2, Users, Landmark, Globe2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const profiles = [
  {
    icon: Building2,
    title: "Opérateurs Télécoms & Postaux",
    description: "Demandes de licences, déclarations QoS, ressources en numérotation, homologation d'équipements.",
    color: "bg-primary/10 text-primary",
    link: "/espace-operateur",
  },
  {
    icon: Users,
    title: "Consommateurs & Usagers",
    description: "Déposer une plainte, suivre une réclamation, consulter vos droits et les indicateurs qualité.",
    color: "bg-secondary/10 text-secondary",
    link: "/espace-consommateur",
  },
  {
    icon: Landmark,
    title: "Institutions Partenaires",
    description: "Accès aux rapports statistiques, décisions réglementaires et données du secteur.",
    color: "bg-primary/10 text-primary",
    link: "#",
  },
  {
    icon: Globe2,
    title: "Grand Public",
    description: "Actualités du secteur, documents réglementaires, guides et procédures disponibles en téléchargement.",
    color: "bg-secondary/10 text-secondary",
    link: "#",
  },
];

const ProfileAccessSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Accès par <span className="text-primary">profil</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un accueil personnalisé selon votre profil pour accéder directement aux services qui vous concernent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <Link key={profile.title} href={profile.link}>
            <Card
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-transparent hover:border-primary/20 h-full"
            >
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className={`p-3 rounded-xl ${profile.color}`}>
                  <profile.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {profile.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {profile.description}
                  </p>
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileAccessSection;
