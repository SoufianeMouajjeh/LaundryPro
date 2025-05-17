import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, MessageCircle, Shield, Sparkles, Truck, Scissors, Package, Leaf, Award, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              BIENVENUE DANS L'UNIVERS PRESSING APP
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              UNE EXPERTISE QUI PREND SOIN DE VOS TEXTILES
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Découvrez nos soins experts <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Nettoyage de qualité supérieure</h3>
              <p className="text-muted-foreground">
                Pour un blanc éclatant, des couleurs ravivées et une durabilité optimale de vos textiles
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Technologie éco-performante</h3>
              <p className="text-muted-foreground">
                Respectueuse de l'Environnement et de la Santé avec des produits biodégradables
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Programmes exclusifs</h3>
              <p className="text-muted-foreground">
                Permettant de traiter les tissus les plus délicats avec le plus grand soin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">NOS SERVICES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pressing</CardTitle>
                <CardDescription>
                  Pour des blancs éclatants et des couleurs préservées
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Blanchisserie</CardTitle>
                <CardDescription>
                  Un coup de fraîcheur pour vos tissus d'intérieur
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Scissors className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Retoucherie</CardTitle>
                <CardDescription>
                  Donnez une deuxième vie à vos vêtements
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">UNE APPLICATION MOBILE À LA POINTE DE LA TECHNOLOGIE</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Commandez via l'App</h3>
                <p className="text-muted-foreground">Choisissez les dates et les horaires de votre choix</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Nous collectons vos vêtements</h3>
                <p className="text-muted-foreground">Chez vous ou au bureau</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Votre linge propre est livré</h3>
                <p className="text-muted-foreground">En 48h à votre domicile</p>
              </div>
            </div>
            <Button size="lg" className="mt-12 bg-primary hover:bg-primary/90">
              Télécharger l'application <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">POURQUOI NOUS CHOISIR ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Star className="h-8 w-8" />, title: "SANTÉ", description: "Produits respectueux de votre santé" },
              { icon: <Shield className="h-8 w-8" />, title: "CONFORT", description: "Service à domicile simple et efficace" },
              { icon: <Leaf className="h-8 w-8" />, title: "ÉCOLOGIE", description: "Engagement environnemental" },
              { icon: <Sparkles className="h-8 w-8" />, title: "TECHNOLOGIE", description: "Application mobile innovante" }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">UNE QUESTION ?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Notre équipe est disponible pour vous aider.
            Contactez-nous par WhatsApp, téléphone ou e-mail.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Nous contacter <MessageCircle className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
} 