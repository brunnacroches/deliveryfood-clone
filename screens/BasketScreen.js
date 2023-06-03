import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
// import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketItems } from '../features/basketSlice';
import { selectRestaurant } from '../features/restaurantSlice';


const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupItemsInBasket(groupedItems);
    }, [items]);


    return (
    <SafeAreaView>
        <View>
            <View>
                <View>
                    <Text className="text-lg font-bold text-center">Bakest</Text>
                    <Text className="text-center text-gray-400">
                        {restaurant.title}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={navigation.goBack}
                    className='rounded-full bg-gray-100 absolute top-3 right-5'
                >
                    <XMarkIcon color='#00CCBB' height={50} width={50} />
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default BasketScreen;