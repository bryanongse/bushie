import React,{useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native';

function Sendphoto(props) {
    const sendPicture = () => {
        fetch('http://192.168.1.166:8080/photo',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: props.image
        })
        .then(resp=>resp.json())
        .catch(error=>console.log(error))
    }

    useEffect(() =>{
        sendPicture()
    },[])

    return (
        <View>
            <Text style={{fontSize:25}}>image uploaded</Text>
        </View>
    )
}

export default Sendphoto
