import React, { useState, useEffect } from 'react'
import { 
    View,
    Activein,
    ActivityIndicator,
    StyleSheet,
    StatusBar
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Geolocations from '@react-native-community/geolocation'


function App() {
    const [loading, setLoading] = useState(true);
    const [coordinates, setCoordinates] = useState();

    useEffect(() => {
        Geolocations.getCurrentPosition(
            ({ coords }) => {
                // console.log(coords);
                setCoordinates(coords);
                setLoading(false);
            },
            error => {
                console.log(error);
            },
            // { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );
    }, [])

    return(
        <View style={styles.container}>
            <StatusBar  translucent backgroundColor="transparent" barStyle='dark-content' />
            {
                loading ?
                <ActivityIndicator size="large" />
                : 
                <MapView
                    initialRegion={{
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        latitudeDelta: 0.0068,
                        longitudeDelta: 0.0068,
                    }}
                    style={styles.map}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "#7516c1",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default App;