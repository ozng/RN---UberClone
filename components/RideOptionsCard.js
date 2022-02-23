import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { selecttravelTimeInformation } from '../slices/navSlice'

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Uber-XL-456",
        title: "UberXL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "Uber-LUX-789",
        title: "UberLUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf"
    },
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selecttravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                    onPress={() => navigation.navigate('NavigateCard')}
                >
                    <Icon
                        name="chevron-left"
                        type="fontawesome"
                    />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a ride - {travelTimeInformation?.distance.text}</Text>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setSelected(item)}
                            style={tw`flex-row items-center justify-between px-10 ${item.id === selected?.id && "bg-gray-200"}`}
                        >
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'contain'
                                }}
                                source={{ uri: item.image }}
                            />
                            <View style={tw`-ml-6`}>
                                <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                                <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
                            </View>
                            <Text style={tw`text-xl`}>
                                $ {((travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier) / 100).toFixed(2)}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-black py-3 mx-5 ${!selected && "bg-gray-300"}`}
                >
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard