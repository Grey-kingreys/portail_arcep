import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import arcepLogo from "@/assets/arcep-logo-reference.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={arcepLogo.src} alt="ARCEP Niger" className="h-12 w-auto"/>
              <div>
                <p className="font-display font-bold text-sm text-white">ARCEP Niger</p>
                <p className="text-[10px] text-white/60">Autorité de Régulation</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Portail unique des services numériques de l'Autorité de Régulation des Communications Électroniques et de la Poste du Niger.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/espace-operateur" className="hover:text-primary transition-colors">Licences & Autorisations</Link></li>
              <li><Link href="/espace-consommateur" className="hover:text-primary transition-colors">Plaintes Consommateurs</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Assignation de Fréquences</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Homologation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Qualité de Service</a></li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-primary transition-colors">Documents réglementaires</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Rapports & Statistiques</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                Niamey, Niger
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                +227 20 73 XX XX
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                contact@arcep.ne
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© 2025 ARCEP Niger. Tous droits réservés.</p>
          <p>Portail des services numériques</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
