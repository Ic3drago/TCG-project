
import { useEffect, useMemo, useState } from 'react';
import { categories, products } from '../models/gameData';
import { CalculadoraGanancias } from '../models/ProfitCalculator';

export const useStoreController = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [activeSectionId, setActiveSectionId] = useState(categories[0].sections[0].id);
  const [cartItems, setCartItems] = useState([]);

  const currentCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) ?? categories[0],
    [activeCategoryId]
  );

  useEffect(() => {
    setActiveSectionId(currentCategory.sections[0]?.id ?? '');
  }, [currentCategory]);

  const currentSection = useMemo(
    () => currentCategory.sections.find((section) => section.id === activeSectionId) ?? currentCategory.sections[0],
    [currentCategory, activeSectionId]
  );

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => product.category === activeCategoryId && product.section === activeSectionId)
        .map((product) => ({
          ...product,
          ...CalculadoraGanancias.calcularGananciaBs(product.baseCost)
        })),
    [activeCategoryId, activeSectionId]
  );

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.precioVenta * item.quantity, 0).toFixed(2),
    [cartItems]
  );

  const changeCategory = (id) => {
    setActiveCategoryId(id);
  };

  const changeSection = (id) => {
    setActiveSectionId(id);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return {
    categories,
    currentCategory,
    currentSection,
    sections: currentCategory.sections,
    products: filteredProducts,
    cartItems,
    cartCount,
    cartTotal,
    changeCategory,
    changeSection,
    addToCart
  };
};
