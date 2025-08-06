import { Home, Facebook, Instagram, Linkedin, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Home className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold">Palanca Real</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              O portal imobiliário líder em Angola, conectando pessoas aos seus lares dos sonhos há mais de 5 anos. 
              Confiança, experiência e excelência em cada transação.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a href="#" className="bg-green-500 p-2 sm:p-3 rounded-lg hover:bg-green-600 transition-colors touch-target" data-testid="social-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-green-500 p-2 sm:p-3 rounded-lg hover:bg-green-600 transition-colors touch-target" data-testid="social-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-green-500 p-2 sm:p-3 rounded-lg hover:bg-green-600 transition-colors touch-target" data-testid="social-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-green-500 p-2 sm:p-3 rounded-lg hover:bg-green-600 transition-colors touch-target" data-testid="social-whatsapp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-green-500 transition-colors cursor-pointer" data-testid="footer-about">
                    Sobre Nós
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <span className="text-gray-400 hover:text-green-500 transition-colors cursor-pointer" data-testid="footer-how-it-works">
                    Como Funciona
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/list-property">
                  <span className="text-gray-400 hover:text-green-500 transition-colors cursor-pointer" data-testid="footer-list-property">
                    Anunciar Imóvel
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/agents">
                  <span className="text-gray-400 hover:text-green-500 transition-colors cursor-pointer" data-testid="footer-agents">
                    Nossos Agentes
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-gray-400 hover:text-green-500 transition-colors cursor-pointer" data-testid="footer-blog">
                    Blog
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-green-500 transition-colors" data-testid="footer-contact">
                    Contacto
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="text-green-500 w-5 h-5" />
                <span className="text-gray-400" data-testid="contact-address">Rua da Missão, Luanda</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-green-500 w-5 h-5" />
                <span className="text-gray-400" data-testid="contact-phone">+244 923 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-green-500 w-5 h-5" />
                <span className="text-gray-400" data-testid="contact-email">info@palancareal.ao</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="text-green-500 w-5 h-5" />
                <span className="text-gray-400" data-testid="contact-hours">Seg-Sex: 8h-18h</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0" data-testid="copyright">
            © 2024 Palanca Real. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy">
              <a className="text-gray-400 hover:text-green-500 transition-colors" data-testid="footer-privacy">
                Política de Privacidade
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-gray-400 hover:text-green-500 transition-colors" data-testid="footer-terms">
                Termos de Uso
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
