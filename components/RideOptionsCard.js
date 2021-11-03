import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import 'intl';
import 'intl/locale-data/jsonp/id-ID'
import 'intl/locale-data/jsonp/en'
import CurrencyFormat from 'react-currency-format';

// images
import logoTruck from "../assets/image/Truck-Delivery.png";

const data = [
    {
        id: "Uber-X-123",
        title: "Uber X",
        multiplier: 1,
        // image: logoTruck,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        // image: logoTruck,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        // image: logoTruck,
        image: "https://links.papareact.com/7pf",
    },
];

// If we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

// Define Thousand separator and Decimal separator
const thouSep = ".";
const decSep = ",";

// Format to money
const toMoney = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) {
        return m === ',' ? thouSep : decSep;
    });
}

const IDR = 1234567.89;


const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    // onPress={() => console.log("Test Balik Cuy...")}
                    onPress={() => navigation.navigate("NavigateCard")}
                    // style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                    style={tw`absolute top-3 left-3 z-50 p-3 bg-gray-300 w-20 px-4 py-2 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" color="black" />
                </TouchableOpacity>
                <Text style={tw`text-center font-bold py-5 text-xl`}> Select a Ride - {travelTimeInformation?.distance?.text} </Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-3 ${id === selected?.id && "bg-gray-200"}`}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain"
                            }}
                            // source={image}
                            source={{uri: item.image}}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-bold`}>{title}</Text>
                            <Text> {travelTimeInformation?.duration?.text} Travel Time </Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {/* {new Intl.NumberFormat('en-GB', { */}
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                // currency: 'GBP'
                                currency: 'IDR'
                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 rounded-full ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-xl`}> Choose {selected?.title} </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default RideOptionsCard;

const styles = StyleSheet.create({})
