{/* rnfe "Snippets" (trechos de código)*/}
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import createClient, { urlFor } from '../sanity';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      createClient
        .fetch(
          `
          *[_type == "category"]
      `
      ).then((data) => {
        setCategories(data);
    });
    }, [])

  return (
    <ScrollView
        contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
    >
        {categories.map((category) => (
            <CategoryCard
            key={category._id}
            imgUrl={urlFor(category.image).width(200).url()}
            title={category.name}
        />
    ))}
    </ScrollView>
  );
};

export default Categories;