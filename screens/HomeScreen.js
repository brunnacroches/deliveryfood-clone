// HomeScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
import {
    AdjustmentsVerticalIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    UserIcon
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeatureRow from '../components/FeatureRow';
import createClient from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategory, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        });
    }, []);

    useEffect(() => {
        createClient
            .fetch(
            `
                *[_type == "featured"] {
                    ...,
                restaurants[]->{
                    ...,
                    dishes[]->
                }
                }
            `
        )
        .then((data) => {
            setFeaturedCategories(data);
        });
    }, []);

    return (
        <SafeAreaView className="bg-white pt-5">
                {/* Header */}
                <View className="flex-row pb-3 items-center mx-4 space-x-2">
                    <Image
                        source={{
                            uri: "https://links.papareact.com/wru",
                        }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />

                    <View className="flex-1">
                        <Text className="font-bold text-gray-400 text-xs">
                            Deliver Now!
                        </Text>
                        <Text className="font-bold text-xl">
                            Current Location
                            <ChevronDownIcon size={20} color="#00CCBB" />
                        </Text>
                    </View>

                    <UserIcon size={35} color="#00CCBB" />
                </View>

                {/* Search */}
                <View className="flex-row items-center space-x-2 pb-2 mx-4">
                    <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                        <MagnifyingGlassIcon color="gray" size={20}/>
                        <TextInput placeholder="Restaurant and cuisines"
                        keyboardType="default"
                        />
                    </View>

                    <AdjustmentsVerticalIcon color="#00CCBB"/>
                </View>

                {/* Body */}
                <ScrollView className='bg-gray-100 flex-1'>
                    {/* Categories */}
                    <Categories/>

                    {/* Feature */}

                    {featuredCategory?.map(category => (
                        <FeatureRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
