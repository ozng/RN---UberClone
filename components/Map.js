import React, { useRef, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import tw from 'twrnc'
import { selectOrigin, selectDestination, setTravelInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions';
import env from '../Env/env'

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) {
            return;
        }

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {
                top: 100, right: 100, bottom: 100, left: 99
            }
        })
    }, [origin, destination])

    useEffect(() => {
        if (!origin || !destination) {
            return;
        }
        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${destination.description}&destinations=${origin.description}&key=${env.googleApiKey}`)
                .then((res) => res.json())
                .then(data => {
                    dispatch(setTravelInformation(data.rows[0].elements[0]));
                })

        }

        getTravelTime();
    }, [origin, destination, env.googleApiKey])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.010,
                longitudeDelta: 0.010,
            }}
        >
            {
                origin && destination && (
                    <MapViewDirections
                        origin={origin.description}
                        destination={destination.description}
                        apikey={env.googleApiKey}
                        strokeWidth={3}
                        strokeColor='purple'
                        lineDashPattern={[0]}
                    />
                )
            }
            {
                origin?.location && (
                    <Marker
                        coordinate={{
                            latitude: origin.location.lat,
                            longitude: origin.location.lng,
                        }}
                        title="Origin"
                        description={origin.description}
                        identifier="origin"
                    />
                )
            }
            {
                destination?.location && (
                    <Marker
                        coordinate={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng,
                        }}
                        title="Destination"
                        description={destination.description}
                        identifier="destination"
                    />
                )
            }
        </MapView>
    )
}

export default Map
