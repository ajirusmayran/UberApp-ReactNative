import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

// images
import logo from '../assets/image/Logo-CV-HajarAswad.png';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                    // How to call local path images
                    // source={logo}

                    // How to call local images inline
                    // source={require('../assets/image/Logo-CV-HajarAswad.png')}

                // How to call images online
                source={{
                    uri: "https://links.papareact.com/gzs",
                    // uri: "https://letket.com/wp-content/uploads/2021/06/logo-social-1080x630.png",
                    // uri: "../assets/image/Logo-CV-HajarAswad.png",
                    // uri: logo,
                }}
                />

                <GooglePlacesAutocomplete
                    placeholder="Where From?"
                    // placeholder="Darimana?"
                    // placeholder="Enter Location"
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                            backgroundColor: "#EDEDED",
                            color: "black"
                        },
                    }}
                    onPress={(data, details = null) => {
                        // console.log(data);
                        // console.log(details);
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description
                            })
                        );
                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    // returnKeyType={"default"}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    // autoFocus={false}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        // language: "en",
                        language: 'id',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: "blue",
    },
});
