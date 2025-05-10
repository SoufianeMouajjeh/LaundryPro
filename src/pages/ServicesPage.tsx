import * as React from 'react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Plus, Minus, ShoppingCart, Package, Shirt, Sparkles } from 'lucide-react';

// Define interfaces
interface LaundryItem {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  service_id: number;
}

interface Service {
  id: number;
  name: string;
  description: string;
  pricing_info: string;
  items: LaundryItem[];
  icon: React.ReactNode;
}

// Sample data
const sampleServices: Service[] = [
  {
    id: 1,
    name: "Wash & Fold",
    description: "Professional washing and folding service for your clothes",
    pricing_info: "Starting at $2.50 per pound",
    icon: <Shirt className="h-6 w-6" />,
    items: [
      {
        id: 101,
        name: "Regular Clothing",
        description: "T-shirts, pants, socks, underwear",
        price: 2.50,
        unit: "lb",
        service_id: 1
      },
      {
        id: 102,
        name: "Delicate Items",
        description: "Silk, wool, and other delicate fabrics",
        price: 4.00,
        unit: "lb",
        service_id: 1
      }
    ]
  },
  {
    id: 2,
    name: "Dry Cleaning",
    description: "Professional dry cleaning for your delicate and special garments",
    pricing_info: "Starting at $5.00 per item",
    icon: <Sparkles className="h-6 w-6" />,
    items: [
      {
        id: 201,
        name: "Suits",
        description: "Full suit dry cleaning",
        price: 15.00,
        unit: "item",
        service_id: 2
      },
      {
        id: 202,
        name: "Dresses",
        description: "Formal and casual dresses",
        price: 12.00,
        unit: "item",
        service_id: 2
      },
      {
        id: 203,
        name: "Silk Blouses",
        description: "Delicate silk tops and blouses",
        price: 8.00,
        unit: "item",
        service_id: 2
      },
      {
        id: 204,
        name: "Wool Sweaters",
        description: "Hand-knitted and wool sweaters",
        price: 9.00,
        unit: "item",
        service_id: 2
      },
      {
        id: 205,
        name: "Leather Jackets",
        description: "Premium leather cleaning and conditioning",
        price: 25.00,
        unit: "item",
        service_id: 2
      },
      {
        id: 206,
        name: "Wedding Dresses",
        description: "Specialized cleaning for wedding gowns",
        price: 75.00,
        unit: "item",
        service_id: 2
      },
      {
        id: 207,
        name: "Fur Coats",
        description: "Professional fur cleaning and maintenance",
        price: 50.00,
        unit: "item",
        service_id: 2
      },
      {
        id: 208,
        name: "Cashmere Items",
        description: "Premium cashmere cleaning",
        price: 12.00,
        unit: "item",
        service_id: 2
      }
    ]
  },
  {
    id: 3,
    name: "Special Care",
    description: "Expert care for your most delicate items",
    pricing_info: "Specialized pricing for unique items",
    icon: <Package className="h-6 w-6" />,
    items: [
      {
        id: 301,
        name: "Vintage Clothing",
        description: "Specialized cleaning for vintage and antique garments",
        price: 20.00,
        unit: "item",
        service_id: 3
      },
      {
        id: 302,
        name: "Handmade Items",
        description: "Careful cleaning for handmade and artisanal pieces",
        price: 15.00,
        unit: "item",
        service_id: 3
      },
      {
        id: 303,
        name: "Embellished Garments",
        description: "Special care for items with beads, sequins, or embroidery",
        price: 18.00,
        unit: "item",
        service_id: 3
      },
      {
        id: 304,
        name: "Lace Items",
        description: "Delicate cleaning for lace and intricate fabrics",
        price: 12.00,
        unit: "item",
        service_id: 3
      }
    ]
  }
];

const ServicesPage: React.FC = () => {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (itemId: number, change: number) => {
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
      unit: item.unit,
      serviceId: item.service_id,
      quantity: quantity
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">LaundryPro Services</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional laundry services tailored to your needs. Experience the LaundryPro difference.
          </p>
        </div>

        <div className="space-y-12">
          {sampleServices.map((service) => (
            <Card key={service.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/20">
              <CardHeader className="bg-muted/50 transition-colors duration-200 hover:bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary transition-all duration-200 hover:bg-primary hover:text-white hover:scale-110">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{service.name}</CardTitle>
                      <Badge variant="secondary" className="text-sm">
                        {service.pricing_info}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2 text-base">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.items.map((item) => (
                    <Card key={item.id} className="relative hover:shadow-md transition-all duration-200 hover:scale-[1.02] group hover:border-primary/20">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg transition-colors duration-200 group-hover:text-primary">{item.name}</h3>
                            <p className="text-sm text-muted-foreground group-hover:text-primary/70">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-medium transition-colors duration-200 group-hover:text-primary">
                              ${item.price.toFixed(2)} 
                              <span className="text-sm text-muted-foreground ml-1 group-hover:text-primary/70">
                                /{item.unit}
                              </span>
                            </p>
                          </div>
                          <Separator className="group-hover:bg-primary/20" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="h-8 w-8 transition-all duration-200 hover:bg-primary hover:text-white hover:scale-110 active:scale-95"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium transition-colors duration-200 group-hover:text-primary">
                                {quantities[item.id] || 1}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="h-8 w-8 transition-all duration-200 hover:bg-primary hover:text-white hover:scale-110 active:scale-95"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              onClick={() => handleAddToCart(item)}
                              className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md hover:bg-primary/90"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

