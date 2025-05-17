import { useState } from "react";
import { products, services } from "@/lib/products";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Casuals");

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Nos Produits</h1>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>{services.pressingKilo.name}</CardTitle>
            <CardDescription>
              {services.pressingKilo.price} DHS / {services.pressingKilo.unit}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{services.repassage.name}</CardTitle>
            <CardDescription>
              +{services.repassage.minItems} produits (minimum de panier)
              <br />
              Repassage Uniquement = Prix Nettoyage - {services.repassage.discount * 100}%
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Categories Tabs */}
      <Tabs defaultValue={selectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <Card key={product.id}>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">
                          {product.price} DHS
                          {product.subcategory === "per_m2" && " / m²"}
                        </span>
                        <Button size="sm" className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Ajouter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 