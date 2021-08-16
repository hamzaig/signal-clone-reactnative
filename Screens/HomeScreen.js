import React, { useEffect, useState } from 'react'
import { useLayoutEffect } from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomListItem from '../Components/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"



const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
            return setChats(snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            }));
        });

        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'left',
            title: "Signal",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar onPress={signOut} rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddChat")}
                        activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        })

    }, [navigation])
    // console.log(chats);


    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id, https://pbs.twimg.com/profile_images/1426475364788932608/_qDFN_Cp_400x400.jpg
                chatName,
        })
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {chats.map(({ id, data: { chatName } }) => {
                    return (<CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />)
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})
