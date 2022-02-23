import React from 'react'
import { Image, View, SafeAreaView } from 'react-native'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import NavFavorites from '../components/NavFavorites';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import env from '../Env/env';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    source={{ uri: 'https://links.papareact.com/gzs' }}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                />
                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 18
                        }
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    minLength={2}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        dispatch(setDestination(null))
                    }}
                    enablePoweredByContainer={false}
                    placeholder="Where from?"
                    query={{
                        key: env.googleApiKey,
                        language: 'en'
                    }}
                />
                <NavOptions />
                <NavFavorites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen