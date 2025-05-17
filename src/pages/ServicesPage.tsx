import * as React from 'react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

// Define interfaces
interface LaundryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
}

// Sample data
const services: LaundryItem[] = [
  // Casuals
  {
    id: "jeans",
    name: "Jeans",
    description: "Nettoyage professionnel de jeans pour une fraîcheur longue durée",
    price: 15,
    category: "Casuals"
  },
  {
    id: "chemise",
    name: "Chemise",
    description: "Lavée, repassée, soigneusement pliée et prête à porter",
    price: 13,
    category: "Casuals"
  },
  {
    id: "costume",
    name: "Costume",
    description: "Pressing complet pour vos ensembles professionnels",
    price: 30,
    category: "Casuals"
  },
  {
    id: "jacket",
    name: "Jacket",
    description: "Soins experts pour vos vestes de ville",
    price: 25,
    category: "Casuals"
  },
  {
    id: "pull",
    name: "Pull",
    description: "Spécial laine et cachemire pour un résultat parfait",
    price: 15,
    category: "Casuals"
  },
  {
    id: "tshirt",
    name: "T-shirt",
    description: "Lavage quotidien avec soin professionnel",
    price: 12,
    category: "Casuals"
  },
  {
    id: "robe",
    name: "Robe",
    description: "Traitement délicat pour vos robes, tout en douceur",
    price: 50,
    category: "Casuals"
  },
  {
    id: "jupe",
    name: "Jupe",
    description: "Pressing impeccable pour toutes vos jupes",
    price: 30,
    category: "Casuals"
  },

  // Traditionnels
  {
    id: "caftan",
    name: "Caftan",
    description: "Nettoyage selon les normes traditionnelles",
    price: 50,
    category: "Traditionnels"
  },
  {
    id: "takchita",
    name: "Takchita",
    description: "Traitement spécial pour vos tenues traditionnelles",
    price: 100,
    category: "Traditionnels"
  },
  {
    id: "djellaba",
    name: "Djellaba",
    description: "Nettoyage professionnel pour vos djellabas",
    price: 40,
    category: "Traditionnels"
  },
  {
    id: "jabador",
    name: "Jabador",
    description: "Entretien soigné pour vos ensembles traditionnels",
    price: 50,
    category: "Traditionnels"
  },

  // Linge Maison
  {
    id: "couette",
    name: "Couette",
    description: "Nettoyage professionnel pour vos couettes",
    price: 30,
    category: "Linge Maison"
  },
  {
    id: "oreiller",
    name: "Oreiller",
    description: "Lavage soigné pour vos oreillers",
    price: 20,
    category: "Linge Maison"
  },
  {
    id: "tapis",
    name: "Tapis",
    description: "Lavage professionnel au m² pour tapis",
    price: 20,
    category: "Linge Maison",
    subcategory: "per_m2"
  },
  {
    id: "nappe",
    name: "Nappe de Table",
    description: "Nettoyage soigné pour vos nappes",
    price: 15,
    category: "Linge Maison"
  },
  {
    id: "drap2",
    name: "Drap 2 Places",
    description: "Lavage professionnel de drap pour lit double",
    price: 18,
    category: "Linge Maison"
  },
  {
    id: "drap1",
    name: "Drap 1 Place",
    description: "Nettoyage soigné de drap pour lit simple",
    price: 10,
    category: "Linge Maison"
  }
];

const ServicesPage: React.FC = () => {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change)
    }));
  };

  const handleAddToCart = (item: LaundryItem) => {
    const quantity = quantities[item.id] || 1;
    addItem({
      itemId: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      unit: undefined
    });
  };

  const categories = Array.from(new Set(services.map(item => item.category)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Nos Services</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez nos services de pressing et de nettoyage à sec professionnels
          </p>
        </div>

        {/* Special Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Pressing au Kilo</CardTitle>
              <CardDescription>30 DHS / kg</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repassage Uniquement</CardTitle>
              <CardDescription>
                +5 produits (minimum de panier)
                <br />
                Repassage Uniquement = Prix Nettoyage - 35%
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Categories */}
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter(item => item.category === category)
                .map(item => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">
                          {item.price} DHS
                          {item.subcategory === "per_m2" && " / m²"}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {quantities[item.id] || 1}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleAddToCart(item)}
                            className="ml-2"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;

