import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import env from '../Env/env';
import { setDestination } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import NavFavorites from './NavFavorites';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <View style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0,
                            backgroundColor: 'white',
                            paddingTop: 20,
                            zIndex: 1
                        },
                        textInput: {
                            fontSize: 18,
                            borderRadius: 0,
                            backgroundColor: '#DDDDDF'
                        },
                        textInputContainer: {
                            paddingHorizontal: 20,
                            paddingBottom: 0
                        }
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    minLength={2}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        navigation.navigate('RideOptionsCard')
                    }}
                    enablePoweredByContainer={false}
                    placeholder="Where to?"
                    query={{
                        key: env.googleApiKey,
                        language: 'en'
                    }}
                />
            </View>
            <View>
                <NavFavorites />
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('RideOptionsCard')
                }} style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavigateCard
